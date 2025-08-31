import express from 'express';
import { getOpenings, getOpeningById, getOpeningsByEco } from '../controllers/openingController';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Opening:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the opening
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         name:
 *           type: string
 *           description: Name of the chess opening
 *           example: "Sicilian Defense"
 *         eco_code:
 *           type: string
 *           nullable: true
 *           description: ECO (Encyclopedia of Chess Openings) code
 *           example: "B20"
 *         moves:
 *           type: string
 *           description: JSON array of moves in the opening
 *           example: "[\"e4\", \"c5\"]"
 *         description:
 *           type: string
 *           nullable: true
 *           description: Detailed description of the opening
 *           example: "The Sicilian Defense is a chess opening that begins with the moves 1.e4 c5."
 *         popularity_score:
 *           type: integer
 *           description: Popularity score of the opening
 *           example: 85
 *         difficulty_level:
 *           type: string
 *           nullable: true
 *           description: Difficulty level of the opening
 *           enum: [beginner, intermediate, advanced]
 *           example: "intermediate"
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *           example: "2024-01-01T12:00:00Z"
 * 
 *     OpeningWithMoves:
 *       allOf:
 *         - $ref: '#/components/schemas/Opening'
 *         - type: object
 *           properties:
 *             moves:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OpeningMove'
 *               description: Array of detailed moves for the opening
 * 
 *     OpeningMove:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the move
 *           example: "550e8400-e29b-41d4-a716-446655440001"
 *         opening_id:
 *           type: string
 *           description: Reference to the opening this move belongs to
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         move_number:
 *           type: integer
 *           description: Sequential number of the move
 *           example: 1
 *         move_notation:
 *           type: string
 *           description: Chess notation for the move
 *           example: "e4"
 *         fen_after_move:
 *           type: string
 *           nullable: true
 *           description: FEN notation after this move
 *           example: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1"
 *         theory_explanation:
 *           type: string
 *           nullable: true
 *           description: Theoretical explanation of the move
 *           example: "Opening the center and controlling the d5 and f5 squares"
 * 
 *     OpeningsListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates if the request was successful
 *           example: true
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Opening'
 *           description: Array of openings
 *         total:
 *           type: integer
 *           description: Total number of openings matching the criteria
 *           example: 150
 *         limit:
 *           type: integer
 *           description: Maximum number of items returned
 *           example: 50
 *         offset:
 *           type: integer
 *           description: Number of items skipped
 *           example: 0
 * 
 *     OpeningResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates if the request was successful
 *           example: true
 *         data:
 *           $ref: '#/components/schemas/OpeningWithMoves'
 * 
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates the request failed
 *           example: false
 *         error:
 *           type: string
 *           description: Error message
 *           example: "Failed to fetch openings"
 * 
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 *   parameters:
 *     OpeningId:
 *       name: id
 *       in: path
 *       required: true
 *       description: Unique identifier for the opening
 *       schema:
 *         type: string
 *       example: "550e8400-e29b-41d4-a716-446655440000"
 * 
 *     EcoCode:
 *       name: eco
 *       in: path
 *       required: true
 *       description: ECO (Encyclopedia of Chess Openings) code
 *       schema:
 *         type: string
 *         pattern: '^[A-E][0-9]{2}$'
 *       example: "B20"
 * 
 *     SearchQuery:
 *       name: search
 *       in: query
 *       description: Search term to filter openings by name or description
 *       schema:
 *         type: string
 *       example: "sicilian"
 * 
 *     EcoQuery:
 *       name: eco
 *       in: query
 *       description: Filter by ECO code
 *       schema:
 *         type: string
 *         pattern: '^[A-E][0-9]{2}$'
 *       example: "B20"
 * 
 *     DifficultyQuery:
 *       name: difficulty
 *       in: query
 *       description: Filter by difficulty level
 *       schema:
 *         type: string
 *         enum: [beginner, intermediate, advanced]
 *       example: "intermediate"
 * 
 *     LimitQuery:
 *       name: limit
 *       in: query
 *       description: Maximum number of items to return (default 50)
 *       schema:
 *         type: integer
 *         minimum: 1
 *         maximum: 100
 *         default: 50
 *       example: 20
 * 
 *     OffsetQuery:
 *       name: offset
 *       in: query
 *       description: Number of items to skip (default 0)
 *       schema:
 *         type: integer
 *         minimum: 0
 *         default: 0
 *       example: 0
 */

/**
 * @swagger
 * /api/openings:
 *   get:
 *     tags:
 *       - Openings
 *     summary: Get all chess openings
 *     description: Retrieve a paginated list of chess openings with optional filtering by search term, ECO code, and difficulty level
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/SearchQuery'
 *       - $ref: '#/components/parameters/EcoQuery'
 *       - $ref: '#/components/parameters/DifficultyQuery'
 *       - $ref: '#/components/parameters/LimitQuery'
 *       - $ref: '#/components/parameters/OffsetQuery'
 *     responses:
 *       200:
 *         description: Successfully retrieved openings
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OpeningsListResponse'
 *             examples:
 *               success:
 *                 summary: Successful response
 *                 value:
 *                   success: true
 *                   data:
 *                     - id: "550e8400-e29b-41d4-a716-446655440000"
 *                       name: "Sicilian Defense"
 *                       eco_code: "B20"
 *                       moves: "[\"e4\", \"c5\"]"
 *                       description: "The Sicilian Defense is a chess opening that begins with the moves 1.e4 c5."
 *                       popularity_score: 85
 *                       difficulty_level: "intermediate"
 *                       created_at: "2024-01-01T12:00:00Z"
 *                   total: 150
 *                   limit: 50
 *                   offset: 0
 *       400:
 *         description: Invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               invalid_difficulty:
 *                 summary: Invalid difficulty level
 *                 value:
 *                   success: false
 *                   error: "Invalid difficulty level. Must be one of: beginner, intermediate, advanced"
 *               invalid_eco:
 *                 summary: Invalid ECO code format
 *                 value:
 *                   success: false
 *                   error: "Invalid ECO code format. Must match pattern [A-E][0-9]{2}"
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               unauthorized:
 *                 summary: Missing or invalid token
 *                 value:
 *                   success: false
 *                   error: "Unauthorized access"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               server_error:
 *                 summary: Database connection error
 *                 value:
 *                   success: false
 *                   error: "Failed to fetch openings"
 */
router.get('/', getOpenings);

/**
 * @swagger
 * /api/openings/eco/{eco}:
 *   get:
 *     tags:
 *       - Openings
 *     summary: Get openings by ECO code
 *     description: Retrieve all chess openings that match a specific ECO (Encyclopedia of Chess Openings) code, ordered by popularity
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/EcoCode'
 *     responses:
 *       200:
 *         description: Successfully retrieved openings for the ECO code
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Opening'
 *             examples:
 *               success:
 *                 summary: Successful response for B20
 *                 value:
 *                   success: true
 *                   data:
 *                     - id: "550e8400-e29b-41d4-a716-446655440000"
 *                       name: "Sicilian Defense"
 *                       eco_code: "B20"
 *                       moves: "[\"e4\", \"c5\"]"
 *                       description: "The Sicilian Defense is a chess opening that begins with the moves 1.e4 c5."
 *                       popularity_score: 85
 *                       difficulty_level: "intermediate"
 *                       created_at: "2024-01-01T12:00:00Z"
 *                     - id: "550e8400-e29b-41d4-a716-446655440001"
 *                       name: "Sicilian Defense: Bowdler Attack"
 *                       eco_code: "B20"
 *                       moves: "[\"e4\", \"c5\", \"Bc4\"]"
 *                       description: "An aggressive but dubious continuation in the Sicilian Defense."
 *                       popularity_score: 25
 *                       difficulty_level: "beginner"
 *                       created_at: "2024-01-01T12:00:00Z"
 *               empty_result:
 *                 summary: No openings found for ECO code
 *                 value:
 *                   success: true
 *                   data: []
 *       400:
 *         description: Invalid ECO code format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               invalid_eco_format:
 *                 summary: ECO code doesn't match required pattern
 *                 value:
 *                   success: false
 *                   error: "Invalid ECO code format. Must match pattern [A-E][0-9]{2}"
 *               invalid_eco_characters:
 *                 summary: ECO code contains invalid characters
 *                 value:
 *                   success: false
 *                   error: "ECO code must start with letters A-E followed by two digits"
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               unauthorized:
 *                 summary: Missing or invalid token
 *                 value:
 *                   success: false
 *                   error: "Unauthorized access"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               server_error:
 *                 summary: Database query failed
 *                 value:
 *                   success: false
 *                   error: "Failed to fetch openings by ECO"
 */
router.get('/eco/:eco', getOpeningsByEco);

/**
 * @swagger
 * /api/openings/{id}:
 *   get:
 *     tags:
 *       - Openings
 *     summary: Get a specific chess opening
 *     description: Retrieve detailed information about a specific chess opening including all its moves and theoretical explanations
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/OpeningId'
 *     responses:
 *       200:
 *         description: Successfully retrieved the opening
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OpeningResponse'
 *             examples:
 *               success:
 *                 summary: Complete opening with moves
 *                 value:
 *                   success: true
 *                   data:
 *                     id: "550e8400-e29b-41d4-a716-446655440000"
 *                     name: "Sicilian Defense"
 *                     eco_code: "B20"
 *                     moves: "[\"e4\", \"c5\"]"
 *                     description: "The Sicilian Defense is a chess opening that begins with the moves 1.e4 c5."
 *                     popularity_score: 85
 *                     difficulty_level: "intermediate"
 *                     created_at: "2024-01-01T12:00:00Z"
 *                     detailed_moves:
 *                       - id: "move-001"
 *                         opening_id: "550e8400-e29b-41d4-a716-446655440000"
 *                         move_number: 1
 *                         move_notation: "e4"
 *                         fen_after_move: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1"
 *                         theory_explanation: "Opening the center and controlling the d5 and f5 squares"
 *                       - id: "move-002"
 *                         opening_id: "550e8400-e29b-41d4-a716-446655440000"
 *                         move_number: 2
 *                         move_notation: "c5"
 *                         fen_after_move: "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2"
 *                         theory_explanation: "Black challenges White's central control asymmetrically"
 *               opening_no_moves:
 *                 summary: Opening without detailed moves
 *                 value:
 *                   success: true
 *                   data:
 *                     id: "550e8400-e29b-41d4-a716-446655440000"
 *                     name: "King's Pawn Opening"
 *                     eco_code: "B00"
 *                     moves: "[\"e4\"]"
 *                     description: "The most popular first move in chess."
 *                     popularity_score: 95
 *                     difficulty_level: "beginner"
 *                     created_at: "2024-01-01T12:00:00Z"
 *                     detailed_moves: []
 *       400:
 *         description: Invalid opening ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               invalid_id_format:
 *                 summary: Malformed UUID
 *                 value:
 *                   success: false
 *                   error: "Invalid opening ID format"
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               unauthorized:
 *                 summary: Missing or invalid token
 *                 value:
 *                   success: false
 *                   error: "Unauthorized access"
 *       404:
 *         description: Opening not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               not_found:
 *                 summary: Opening does not exist
 *                 value:
 *                   success: false
 *                   error: "Opening not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               server_error:
 *                 summary: Database query failed
 *                 value:
 *                   success: false
 *                   error: "Failed to fetch opening"
 *               database_error:
 *                 summary: Database connection issue
 *                 value:
 *                   success: false
 *                   error: "Database connection failed"
 */
router.get('/:id', getOpeningById);

export default router;