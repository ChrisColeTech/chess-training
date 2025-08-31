import express from 'express';
import { GameController } from '../controllers/gameController';
import { authenticateToken } from '../middleware/auth';
import { body, param, validationResult } from 'express-validator';

const router = express.Router();
const gameController = new GameController();

// Validation middleware
const validateRequest = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation error',
      details: errors.array()
    });
  }
  next();
};

// All game routes require authentication
router.use(authenticateToken);

/**
 * @swagger
 * /api/games/create:
 *   post:
 *     summary: Create a new chess game
 *     description: Start a new chess game against AI opponent
 *     tags: [Games]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - aiLevel
 *               - userColor
 *             properties:
 *               aiLevel:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 description: AI opponent difficulty level
 *                 example: 3
 *               userColor:
 *                 type: string
 *                 enum: [white, black]
 *                 description: Color the user wants to play
 *                 example: white
 *               timeControl:
 *                 type: string
 *                 description: Game time control format
 *                 example: "10+5"
 *     responses:
 *       201:
 *         description: Game created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Game'
 *       400:
 *         description: Invalid request parameters
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
// Create game
router.post('/create',
  [
    body('aiLevel')
      .isInt({ min: 1, max: 5 })
      .withMessage('AI level must be between 1 and 5'),
    body('color')
      .isIn(['white', 'black', 'random'])
      .withMessage('Color must be white, black, or random'),
    body('timeControl')
      .optional()
      .isString()
      .withMessage('Time control must be a string')
  ],
  validateRequest,
  gameController.createGame
);

/**
 * @swagger
 * /api/games/{gameId}/move:
 *   post:
 *     summary: Make a move in a chess game
 *     description: Submit a chess move for the specified game and receive AI response
 *     tags: [Games]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: gameId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Unique identifier of the chess game
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - move
 *             properties:
 *               move:
 *                 type: object
 *                 required:
 *                   - from
 *                   - to
 *                 properties:
 *                   from:
 *                     type: string
 *                     pattern: '^[a-h][1-8]$'
 *                     description: Source square in algebraic notation
 *                     example: "e2"
 *                   to:
 *                     type: string
 *                     pattern: '^[a-h][1-8]$'
 *                     description: Destination square in algebraic notation
 *                     example: "e4"
 *                   promotion:
 *                     type: string
 *                     enum: ["q", "r", "b", "n"]
 *                     description: Piece to promote to (queen, rook, bishop, knight)
 *                     example: "q"
 *                 description: Chess move details
 *     responses:
 *       200:
 *         description: Move executed successfully with AI response
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
 *                         game:
 *                           $ref: '#/components/schemas/Game'
 *                         aiMove:
 *                           type: object
 *                           properties:
 *                             from:
 *                               type: string
 *                               example: "d7"
 *                             to:
 *                               type: string
 *                               example: "d5"
 *                           description: AI's response move
 *                         gameStatus:
 *                           type: string
 *                           enum: ["active", "checkmate", "stalemate", "draw"]
 *                           description: Current status of the game
 *       400:
 *         description: Invalid move or game state
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Game not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       422:
 *         description: Invalid move format or validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
// Make move
router.post('/:gameId/move',
  [
    param('gameId')
      .isUUID()
      .withMessage('Invalid game ID format'),
    body('move.from')
      .matches(/^[a-h][1-8]$/)
      .withMessage('From square must be in format like e2'),
    body('move.to')
      .matches(/^[a-h][1-8]$/)
      .withMessage('To square must be in format like e4'),
    body('move.promotion')
      .optional()
      .isIn(['q', 'r', 'b', 'n'])
      .withMessage('Promotion piece must be q, r, b, or n')
  ],
  validateRequest,
  gameController.makeMove
);

/**
 * @swagger
 * /api/games/{gameId}:
 *   get:
 *     summary: Get a specific chess game
 *     description: Retrieve detailed information about a specific chess game by its ID
 *     tags: [Games]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: gameId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Unique identifier of the chess game
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: Game retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       allOf:
 *                         - $ref: '#/components/schemas/Game'
 *                         - type: object
 *                           properties:
 *                             currentPosition:
 *                               type: string
 *                               description: Current board position in FEN notation
 *                               example: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1"
 *                             moveHistory:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   move:
 *                                     type: string
 *                                     example: "e2e4"
 *                                   san:
 *                                     type: string
 *                                     example: "e4"
 *                                   timestamp:
 *                                     type: string
 *                                     format: 'date-time'
 *                               description: Complete move history
 *                             isUserTurn:
 *                               type: boolean
 *                               description: Whether it's the user's turn to move
 *       400:
 *         description: Invalid game ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Access denied - User is not a participant in this game
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Game not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
// Get game
router.get('/:gameId',
  [
    param('gameId')
      .isUUID()
      .withMessage('Invalid game ID format')
  ],
  validateRequest,
  gameController.getGame
);

/**
 * @swagger
 * /api/games:
 *   get:
 *     summary: Get all games for the authenticated user
 *     description: Retrieve a list of all chess games associated with the authenticated user
 *     tags: [Games]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: ["active", "completed", "abandoned"]
 *         description: Filter games by status
 *         example: "active"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *         description: Maximum number of games to return
 *         example: 10
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         description: Number of games to skip for pagination
 *         example: 0
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: ["created_at", "updated_at", "status"]
 *           default: "created_at"
 *         description: Field to sort games by
 *         example: "created_at"
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: ["asc", "desc"]
 *           default: "desc"
 *         description: Sort order
 *         example: "desc"
 *     responses:
 *       200:
 *         description: Games retrieved successfully
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
 *                         games:
 *                           type: array
 *                           items:
 *                             allOf:
 *                               - $ref: '#/components/schemas/Game'
 *                               - type: object
 *                                 properties:
 *                                   opponent:
 *                                     type: string
 *                                     description: Opponent name or AI level
 *                                     example: "AI Level 3"
 *                                   userColor:
 *                                     type: string
 *                                     enum: ["white", "black"]
 *                                     description: Color the user played
 *                                   duration:
 *                                     type: integer
 *                                     description: Game duration in seconds
 *                                     example: 1800
 *                         total:
 *                           type: integer
 *                           description: Total number of games matching criteria
 *                           example: 45
 *                         hasMore:
 *                           type: boolean
 *                           description: Whether more games are available
 *                           example: true
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       422:
 *         description: Invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
// Get all games (list)
router.get('/', 
  gameController.getAllGames
);

/**
 * @swagger
 * /api/games/history:
 *   get:
 *     summary: Get user's game history with statistics
 *     description: Retrieve comprehensive game history and performance statistics for the authenticated user
 *     tags: [Games]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: timeframe
 *         schema:
 *           type: string
 *           enum: ["week", "month", "year", "all"]
 *           default: "month"
 *         description: Time period for history analysis
 *         example: "month"
 *       - in: query
 *         name: gameType
 *         schema:
 *           type: string
 *           enum: ["ai", "human", "all"]
 *           default: "all"
 *         description: Type of games to include
 *         example: "ai"
 *       - in: query
 *         name: includeAnalysis
 *         schema:
 *           type: boolean
 *           default: false
 *         description: Whether to include game analysis data
 *         example: true
 *     responses:
 *       200:
 *         description: Game history retrieved successfully
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
 *                         games:
 *                           type: array
 *                           items:
 *                             allOf:
 *                               - $ref: '#/components/schemas/Game'
 *                               - type: object
 *                                 properties:
 *                                   analysis:
 *                                     type: object
 *                                     properties:
 *                                       accuracy:
 *                                         type: number
 *                                         example: 85.6
 *                                       blunders:
 *                                         type: integer
 *                                         example: 2
 *                                       mistakes:
 *                                         type: integer
 *                                         example: 1
 *                                       inaccuracies:
 *                                         type: integer
 *                                         example: 4
 *                                     description: Game analysis data (if requested)
 *                         statistics:
 *                           type: object
 *                           properties:
 *                             totalGames:
 *                               type: integer
 *                               description: Total number of games played
 *                               example: 127
 *                             wins:
 *                               type: integer
 *                               description: Number of games won
 *                               example: 68
 *                             losses:
 *                               type: integer
 *                               description: Number of games lost
 *                               example: 45
 *                             draws:
 *                               type: integer
 *                               description: Number of games drawn
 *                               example: 14
 *                             winRate:
 *                               type: number
 *                               description: Win percentage
 *                               example: 53.5
 *                             averageGameLength:
 *                               type: integer
 *                               description: Average game duration in moves
 *                               example: 42
 *                             ratingChange:
 *                               type: integer
 *                               description: Rating change over time period
 *                               example: 125
 *                             favoriteOpenings:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   name:
 *                                     type: string
 *                                     example: "Italian Game"
 *                                   count:
 *                                     type: integer
 *                                     example: 15
 *                                   winRate:
 *                                     type: number
 *                                     example: 66.7
 *                               description: Most played openings with statistics
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       422:
 *         description: Invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
// Get game history
router.get('/history',
  gameController.getGameHistory
);

/**
 * @swagger
 * /api/games/{gameId}:
 *   delete:
 *     summary: Delete a chess game
 *     description: Permanently delete a chess game. Only the game creator or participants can delete a game.
 *     tags: [Games]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: gameId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Unique identifier of the chess game to delete
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: Game deleted successfully
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
 *                         gameId:
 *                           type: string
 *                           format: uuid
 *                           description: ID of the deleted game
 *                           example: "550e8400-e29b-41d4-a716-446655440000"
 *                         deletedAt:
 *                           type: string
 *                           format: 'date-time'
 *                           description: Timestamp when the game was deleted
 *                     message:
 *                       type: string
 *                       example: "Game deleted successfully"
 *       400:
 *         description: Invalid game ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden - User does not have permission to delete this game
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Game not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Cannot delete active game - Game must be completed first
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
// Delete game
router.delete('/:gameId',
  [
    param('gameId')
      .isUUID()
      .withMessage('Invalid game ID format')
  ],
  validateRequest,
  gameController.deleteGame
);

/**
 * @swagger
 * /api/games/{gameId}/analysis:
 *   post:
 *     summary: Analyze a chess game
 *     description: Request computer analysis of a completed chess game using a chess engine
 *     tags: [Games]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: gameId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Unique identifier of the chess game to analyze
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               engine:
 *                 type: string
 *                 default: "stockfish"
 *                 enum: ["stockfish", "leela", "komodo"]
 *                 description: Chess engine to use for analysis
 *                 example: "stockfish"
 *               depth:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 20
 *                 default: 15
 *                 description: Analysis depth (higher = more accurate but slower)
 *                 example: 15
 *               includeOpeningBook:
 *                 type: boolean
 *                 default: true
 *                 description: Whether to include opening book analysis
 *                 example: true
 *               includeEndgameTablebase:
 *                 type: boolean
 *                 default: true
 *                 description: Whether to use endgame tablebases
 *                 example: true
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
 *                       type: object
 *                       properties:
 *                         gameId:
 *                           type: string
 *                           format: uuid
 *                           example: "550e8400-e29b-41d4-a716-446655440000"
 *                         analysis:
 *                           type: object
 *                           properties:
 *                             engine:
 *                               type: string
 *                               example: "Stockfish 16"
 *                             depth:
 *                               type: integer
 *                               example: 15
 *                             analysisTime:
 *                               type: integer
 *                               description: Analysis time in seconds
 *                               example: 45
 *                             overallAccuracy:
 *                               type: object
 *                               properties:
 *                                 white:
 *                                   type: number
 *                                   example: 87.3
 *                                 black:
 *                                   type: number
 *                                   example: 82.1
 *                               description: Overall accuracy percentages
 *                             moveAnalysis:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   moveNumber:
 *                                     type: integer
 *                                     example: 12
 *                                   move:
 *                                     type: string
 *                                     example: "Nf3"
 *                                   evaluation:
 *                                     type: number
 *                                     description: Position evaluation in centipawns
 *                                     example: 0.34
 *                                   bestMove:
 *                                     type: string
 *                                     example: "Nc3"
 *                                   classification:
 *                                     type: string
 *                                     enum: ["book", "excellent", "good", "inaccuracy", "mistake", "blunder"]
 *                                     example: "good"
 *                                   comment:
 *                                     type: string
 *                                     example: "Solid development move"
 *                               description: Detailed analysis for each move
 *                             mistakes:
 *                               type: object
 *                               properties:
 *                                 white:
 *                                   type: object
 *                                   properties:
 *                                     blunders:
 *                                       type: integer
 *                                       example: 1
 *                                     mistakes:
 *                                       type: integer
 *                                       example: 2
 *                                     inaccuracies:
 *                                       type: integer
 *                                       example: 4
 *                                 black:
 *                                   type: object
 *                                   properties:
 *                                     blunders:
 *                                       type: integer
 *                                       example: 2
 *                                     mistakes:
 *                                       type: integer
 *                                       example: 1
 *                                     inaccuracies:
 *                                       type: integer
 *                                       example: 3
 *                             openingAnalysis:
 *                               type: object
 *                               properties:
 *                                 name:
 *                                   type: string
 *                                   example: "Italian Game: Classical Variation"
 *                                 eco:
 *                                   type: string
 *                                   example: "C53"
 *                                 evaluation:
 *                                   type: string
 *                                   example: "Balanced opening with good chances for both sides"
 *                         createdAt:
 *                           type: string
 *                           format: 'date-time'
 *                           description: When the analysis was completed
 *       400:
 *         description: Invalid game ID format or analysis parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Access denied - User is not a participant in this game
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Game not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Game is not completed - Only completed games can be analyzed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       422:
 *         description: Invalid analysis parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       503:
 *         description: Analysis service temporarily unavailable
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
// Analyze game
router.post('/:gameId/analysis',
  [
    param('gameId')
      .isUUID()
      .withMessage('Invalid game ID format'),
    body('engine')
      .optional()
      .isString()
      .withMessage('Engine must be a string'),
    body('depth')
      .optional()
      .isInt({ min: 1, max: 20 })
      .withMessage('Depth must be between 1 and 20')
  ],
  validateRequest,
  gameController.analyzeGame
);

export default router;