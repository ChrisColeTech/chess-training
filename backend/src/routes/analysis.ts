import express from 'express';
import { getAnalysisPositions, getAnalysisPositionById, createAnalysisPosition, getEndgamePositions, getEndgamePositionById, createEndgamePosition, analyzePosition, getStoredAnalysis, searchPositions, getPositionStatistics, getAnalysisCategories, getEndgameCategories, getEndgamePositionsByMaterial, analyzeGame, getBestMove, getOpeningIdentification, evaluatePosition } from '../controllers/analysisController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ApiResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates if the request was successful
 *         data:
 *           type: object
 *           description: Response data (varies by endpoint)
 *         error:
 *           type: string
 *           description: Error message (only present when success is false)
 *     
 *     PaginatedResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/ApiResponse'
 *         - type: object
 *           properties:
 *             total:
 *               type: integer
 *               description: Total number of items
 *             limit:
 *               type: integer
 *               description: Items per page limit
 *             offset:
 *               type: integer
 *               description: Current offset
 *     
 *     AnalysisPosition:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the analysis position
 *         fen:
 *           type: string
 *           description: FEN notation of the chess position
 *         category:
 *           type: string
 *           description: Category of the analysis position
 *         title:
 *           type: string
 *           description: Title or name of the position
 *         description:
 *           type: string
 *           description: Description of the position
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *     
 *     EndgamePosition:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the endgame position
 *         fen:
 *           type: string
 *           description: FEN notation of the chess position
 *         material:
 *           type: string
 *           description: Material signature (e.g., "KQvKR")
 *         category:
 *           type: string
 *           description: Category of the endgame position
 *         title:
 *           type: string
 *           description: Title or name of the position
 *         description:
 *           type: string
 *           description: Description of the position
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *     
 *     PositionAnalysis:
 *       type: object
 *       properties:
 *         fen:
 *           type: string
 *           description: FEN notation of the analyzed position
 *         evaluation:
 *           type: number
 *           description: Position evaluation in centipawns
 *         bestMove:
 *           type: string
 *           description: Best move in algebraic notation
 *         depth:
 *           type: integer
 *           description: Analysis depth
 *         engine:
 *           type: string
 *           description: Chess engine used for analysis
 *     
 *     GameAnalysis:
 *       type: object
 *       properties:
 *         moves:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               move:
 *                 type: string
 *                 description: Move in algebraic notation
 *               evaluation:
 *                 type: number
 *                 description: Position evaluation after move
 *               bestMove:
 *                 type: string
 *                 description: Best move for the position
 *         accuracy:
 *           type: number
 *           description: Overall game accuracy percentage
 *     
 *     Opening:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Opening name
 *         eco:
 *           type: string
 *           description: ECO (Encyclopedia of Chess Openings) code
 *         moves:
 *           type: array
 *           items:
 *             type: string
 *           description: Opening moves in algebraic notation
 *     
 *     PositionStatistics:
 *       type: object
 *       properties:
 *         totalAnalysisPositions:
 *           type: integer
 *           description: Total number of analysis positions
 *         totalEndgamePositions:
 *           type: integer
 *           description: Total number of endgame positions
 *         categoriesBreakdown:
 *           type: object
 *           description: Breakdown of positions by category
 *     
 *     CreatePositionRequest:
 *       type: object
 *       required:
 *         - fen
 *         - title
 *         - category
 *       properties:
 *         fen:
 *           type: string
 *           description: FEN notation of the chess position
 *         title:
 *           type: string
 *           description: Title or name of the position
 *         category:
 *           type: string
 *           description: Category of the position
 *         description:
 *           type: string
 *           description: Optional description of the position
 *     
 *     CreateEndgamePositionRequest:
 *       type: object
 *       required:
 *         - fen
 *         - title
 *         - category
 *         - material
 *       properties:
 *         fen:
 *           type: string
 *           description: FEN notation of the chess position
 *         title:
 *           type: string
 *           description: Title or name of the position
 *         category:
 *           type: string
 *           description: Category of the endgame position
 *         material:
 *           type: string
 *           description: Material signature (e.g., "KQvKR")
 *         description:
 *           type: string
 *           description: Optional description of the position
 *     
 *     AnalyzePositionRequest:
 *       type: object
 *       required:
 *         - fen
 *       properties:
 *         fen:
 *           type: string
 *           description: FEN notation of the position to analyze
 *         depth:
 *           type: integer
 *           description: "Analysis depth (default: 15)"
 *           minimum: 1
 *           maximum: 30
 *         engine:
 *           type: string
 *           description: Chess engine to use for analysis
 *     
 *     AnalyzeGameRequest:
 *       type: object
 *       required:
 *         - pgn
 *       properties:
 *         pgn:
 *           type: string
 *           description: PGN notation of the game to analyze
 *         depth:
 *           type: integer
 *           description: "Analysis depth (default: 15)"
 *           minimum: 1
 *           maximum: 30
 *     
 *     BestMoveRequest:
 *       type: object
 *       required:
 *         - fen
 *       properties:
 *         fen:
 *           type: string
 *           description: FEN notation of the position
 *         depth:
 *           type: integer
 *           description: "Analysis depth (default: 15)"
 *           minimum: 1
 *           maximum: 30
 *     
 *     OpeningIdentificationRequest:
 *       type: object
 *       required:
 *         - moves
 *       properties:
 *         moves:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of moves in algebraic notation
 *     
 *     EvaluatePositionRequest:
 *       type: object
 *       required:
 *         - fen
 *       properties:
 *         fen:
 *           type: string
 *           description: FEN notation of the position to evaluate
 *   
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/analysis/positions:
 *   get:
 *     summary: Get analysis positions
 *     description: Retrieve a paginated list of analysis positions with optional filtering
 *     tags: [Analysis]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *         description: Number of positions to return per page
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         description: Number of positions to skip
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter positions by category
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in position titles and descriptions
 *     responses:
 *       200:
 *         description: Analysis positions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/PaginatedResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/AnalysisPosition'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: false
 *               error: "Failed to fetch analysis positions"
 */
router.get('/positions', getAnalysisPositions);

/**
 * @swagger
 * /api/analysis/positions/categories:
 *   get:
 *     summary: Get analysis categories
 *     description: Retrieve all available categories for analysis positions
 *     tags: [Analysis]
 *     responses:
 *       200:
 *         description: Analysis categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Tactics", "Strategy", "Endgames", "Openings"]
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: false
 *               error: "Failed to fetch analysis categories"
 */
router.get('/positions/categories', getAnalysisCategories);

/**
 * @swagger
 * /api/analysis/positions/{id}:
 *   get:
 *     summary: Get specific analysis position
 *     description: Retrieve a specific analysis position by its ID
 *     tags: [Analysis]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the analysis position
 *     responses:
 *       200:
 *         description: Analysis position retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/AnalysisPosition'
 *       404:
 *         description: Analysis position not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: false
 *               error: "Analysis position not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: false
 *               error: "Failed to fetch analysis position"
 */
router.get('/positions/:id', getAnalysisPositionById);

/**
 * @swagger
 * /api/analysis/endgame:
 *   get:
 *     summary: Get endgame positions
 *     description: Retrieve a paginated list of endgame positions with optional filtering
 *     tags: [Analysis]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *         description: Number of positions to return per page
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         description: Number of positions to skip
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter positions by category
 *       - in: query
 *         name: material
 *         schema:
 *           type: string
 *         description: Filter positions by material signature
 *     responses:
 *       200:
 *         description: Endgame positions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/PaginatedResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/EndgamePosition'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: false
 *               error: "Failed to fetch endgame positions"
 */
router.get('/endgame', getEndgamePositions);

/**
 * @swagger
 * /api/analysis/endgame/categories:
 *   get:
 *     summary: Get endgame categories
 *     description: Retrieve all available categories for endgame positions
 *     tags: [Analysis]
 *     responses:
 *       200:
 *         description: Endgame categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["King and Pawn", "Rook Endgames", "Queen Endgames", "Minor Piece Endgames"]
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: false
 *               error: "Failed to fetch endgame categories"
 */
router.get('/endgame/categories', getEndgameCategories);

/**
 * @swagger
 * /api/analysis/endgame/material/{material}:
 *   get:
 *     summary: Get endgame positions by material
 *     description: Retrieve endgame positions filtered by specific material signature
 *     tags: [Analysis]
 *     parameters:
 *       - in: path
 *         name: material
 *         required: true
 *         schema:
 *           type: string
 *         description: Material signature (e.g., "KQvKR", "KRvKR", "KPvK")
 *         example: "KQvKR"
 *     responses:
 *       200:
 *         description: Endgame positions by material retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/EndgamePosition'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: false
 *               error: "Failed to fetch endgame positions by material"
 */
router.get('/endgame/material/:material', getEndgamePositionsByMaterial);

/**
 * @swagger
 * /api/analysis/endgame/{id}:
 *   get:
 *     summary: Get specific endgame position
 *     description: Retrieve a specific endgame position by its ID
 *     tags: [Analysis]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the endgame position
 *     responses:
 *       200:
 *         description: Endgame position retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/EndgamePosition'
 *       404:
 *         description: Endgame position not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: false
 *               error: "Endgame position not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: false
 *               error: "Failed to fetch endgame position"
 */
router.get('/endgame/:id', getEndgamePositionById);

/**
 * @swagger
 * /api/analysis/search:
 *   get:
 *     summary: Search positions
 *     description: Search for positions across analysis and endgame databases
 *     tags: [Analysis]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search query string
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [analysis, endgame, both]
 *           default: both
 *         description: Type of positions to search
 *     responses:
 *       200:
 *         description: Search completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         analysisPositions:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/AnalysisPosition'
 *                         endgamePositions:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/EndgamePosition'
 *       400:
 *         description: Bad request - missing search query
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: false
 *               error: "Search query is required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: false
 *               error: "Failed to search positions"
 */
router.get('/search', searchPositions);

/**
 * @swagger
 * /api/analysis/stats:
 *   get:
 *     summary: Get position statistics
 *     description: Retrieve statistical information about all positions in the database
 *     tags: [Analysis]
 *     responses:
 *       200:
 *         description: Position statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/PositionStatistics'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: false
 *               error: "Failed to fetch position statistics"
 */
router.get('/stats', getPositionStatistics);

/**
 * @swagger
 * /api/analysis/stored/{fen}:
 *   get:
 *     summary: Get stored analysis for position
 *     description: Retrieve previously computed analysis for a chess position using FEN notation
 *     tags: [Analysis]
 *     parameters:
 *       - in: path
 *         name: fen
 *         required: true
 *         schema:
 *           type: string
 *         description: FEN notation of the chess position (URL encoded)
 *         example: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
 *       - in: query
 *         name: engine
 *         schema:
 *           type: string
 *         description: Specific chess engine to filter analysis results
 *     responses:
 *       200:
 *         description: Stored analysis retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/PositionAnalysis'
 *       404:
 *         description: No stored analysis found for this position
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: false
 *               error: "No stored analysis found for this position"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: false
 *               error: "Failed to fetch stored analysis"
 */
router.get('/stored/:fen', getStoredAnalysis);

/**
 * @swagger
 * /api/analysis/positions:
 *   post:
 *     summary: Create analysis position
 *     description: Create a new analysis position (admin access required)
 *     tags: [Analysis]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePositionRequest'
 *           example:
 *             fen: "r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4"
 *             title: "Italian Game: Knight Attack"
 *             category: "Openings"
 *             description: "Classical Italian Game with knight development"
 *     responses:
 *       201:
 *         description: Analysis position created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/AnalysisPosition'
 *       400:
 *         description: Bad request - invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: false
 *               error: "Invalid FEN notation"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: false
 *               error: "Failed to create analysis position"
 */
router.post('/positions', createAnalysisPosition);

/**
 * @swagger
 * /api/analysis/endgame:
 *   post:
 *     summary: Create endgame position
 *     description: Create a new endgame position (admin access required)
 *     tags: [Analysis]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEndgamePositionRequest'
 *           example:
 *             fen: "8/8/8/8/8/3k4/3P4/3K4 w - - 0 1"
 *             title: "King and Pawn vs King"
 *             category: "King and Pawn"
 *             material: "KPvK"
 *             description: "Basic king and pawn endgame - opposition is key"
 *     responses:
 *       201:
 *         description: Endgame position created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/EndgamePosition'
 *       400:
 *         description: Bad request - invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: false
 *               error: "Invalid FEN notation"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: false
 *               error: "Failed to create endgame position"
 */
router.post('/endgame', createEndgamePosition);

/**
 * @swagger
 * /api/analysis/analyze:
 *   post:
 *     summary: Analyze position with engine
 *     description: Analyze a chess position using a chess engine
 *     tags: [Analysis]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AnalyzePositionRequest'
 *           example:
 *             fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1"
 *             depth: 18
 *             engine: "stockfish"
 *     responses:
 *       200:
 *         description: Position analysis completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/PositionAnalysis'
 *       400:
 *         description: Bad request - invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: false
 *               error: "Invalid FEN notation"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: false
 *               error: "Failed to analyze position"
 */
router.post('/analyze', analyzePosition);

/**
 * @swagger
 * /api/analysis/position:
 *   post:
 *     summary: Analyze position (frontend compatibility)
 *     description: Analyze a chess position using a chess engine (requires authentication)
 *     tags: [Analysis]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AnalyzePositionRequest'
 *           example:
 *             fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1"
 *             depth: 18
 *             engine: "stockfish"
 *     responses:
 *       200:
 *         description: Position analysis completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/PositionAnalysis'
 *       400:
 *         description: Bad request - invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: false
 *               error: "Invalid FEN notation"
 *       401:
 *         description: Unauthorized - invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: false
 *               error: "Unauthorized"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: false
 *               error: "Failed to analyze position"
 */
router.post('/position', authenticateToken, analyzePosition);

/**
 * @swagger
 * /api/analysis/game:
 *   post:
 *     summary: Analyze entire game
 *     description: Analyze a complete chess game from PGN notation (requires authentication)
 *     tags: [Analysis]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AnalyzeGameRequest'
 *           example:
 *             pgn: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O"
 *             depth: 15
 *     responses:
 *       200:
 *         description: Game analysis completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/GameAnalysis'
 *       400:
 *         description: Bad request - invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: false
 *               error: "PGN is required"
 *       401:
 *         description: Unauthorized - invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: false
 *               error: "Unauthorized"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: false
 *               error: "Failed to analyze game"
 */
router.post('/game', authenticateToken, analyzeGame);

/**
 * @swagger
 * /api/analysis/best-move:
 *   post:
 *     summary: Get best move for position
 *     description: Get the best move for a given chess position (requires authentication)
 *     tags: [Analysis]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BestMoveRequest'
 *           example:
 *             fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1"
 *             depth: 18
 *     responses:
 *       200:
 *         description: Best move calculation completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         bestMove:
 *                           type: string
 *                           description: Best move in algebraic notation
 *                         evaluation:
 *                           type: number
 *                           description: Position evaluation in centipawns
 *                         depth:
 *                           type: integer
 *                           description: Analysis depth used
 *       400:
 *         description: Bad request - invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: false
 *               error: "FEN is required"
 *       401:
 *         description: Unauthorized - invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: false
 *               error: "Unauthorized"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: false
 *               error: "Failed to get best move"
 */
router.post('/best-move', authenticateToken, getBestMove);

/**
 * @swagger
 * /api/analysis/opening:
 *   post:
 *     summary: Identify opening from moves
 *     description: Identify the chess opening from a sequence of moves
 *     tags: [Analysis]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OpeningIdentificationRequest'
 *           example:
 *             moves: ["e4", "e5", "Nf3", "Nc6", "Bb5"]
 *     responses:
 *       200:
 *         description: Opening identification completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Opening'
 *       400:
 *         description: Bad request - invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: false
 *               error: "Moves array is required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: false
 *               error: "Failed to identify opening"
 */
router.post('/opening', getOpeningIdentification);

/**
 * @swagger
 * /api/analysis/evaluate:
 *   post:
 *     summary: Evaluate position
 *     description: Get a quick evaluation of a chess position (requires authentication)
 *     tags: [Analysis]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EvaluatePositionRequest'
 *           example:
 *             fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1"
 *     responses:
 *       200:
 *         description: Position evaluation completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         evaluation:
 *                           type: number
 *                           description: Position evaluation in centipawns
 *                         mate:
 *                           type: integer
 *                           description: Mate in X moves (if applicable)
 *                           nullable: true
 *                         fen:
 *                           type: string
 *                           description: FEN notation of the evaluated position
 *       400:
 *         description: Bad request - invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: false
 *               error: "FEN is required"
 *       401:
 *         description: Unauthorized - invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: false
 *               error: "Unauthorized"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: false
 *               error: "Failed to evaluate position"
 */
router.post('/evaluate', authenticateToken, evaluatePosition);

export default router;