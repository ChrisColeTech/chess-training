import express from 'express';
import { Database } from '../utils/database';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';

const router = express.Router();
const db = Database.getInstance();

/**
 * @swagger
 * components:
 *   schemas:
 *     GameReview:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the game review
 *         game_id:
 *           type: string
 *           description: Identifier for the chess game
 *         review_date:
 *           type: string
 *           format: date-time
 *           description: Date when the review was created
 *         player_color:
 *           type: string
 *           enum: [white, black]
 *           description: Color played by the user
 *         opponent_rating:
 *           type: integer
 *           description: Rating of the opponent
 *         game_result:
 *           type: string
 *           enum: [win, loss, draw]
 *           description: Result of the game
 *         opening_name:
 *           type: string
 *           description: Name of the chess opening used
 *         total_moves:
 *           type: integer
 *           description: Total number of moves in the game
 *         blunders:
 *           type: integer
 *           description: Number of blunders made
 *         mistakes:
 *           type: integer
 *           description: Number of mistakes made
 *         inaccuracies:
 *           type: integer
 *           description: Number of inaccuracies made
 *         accuracy_percentage:
 *           type: number
 *           format: float
 *           description: Overall accuracy percentage
 *     GameReviewResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates if the request was successful
 *         data:
 *           oneOf:
 *             - $ref: '#/components/schemas/GameReview'
 *             - type: array
 *               items:
 *                 $ref: '#/components/schemas/GameReview'
 *         limit:
 *           type: integer
 *           description: Number of items per page (for paginated responses)
 *         offset:
 *           type: integer
 *           description: Number of items to skip (for paginated responses)
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         error:
 *           type: string
 *           description: Error message
 */

/**
 * @swagger
 * /api/game-reviews:
 *   get:
 *     summary: Get all game reviews
 *     description: Retrieves a paginated list of all game reviews ordered by review date (newest first)
 *     tags: [Game Reviews]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *           minimum: 1
 *           maximum: 100
 *         description: Maximum number of reviews to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *           minimum: 0
 *         description: Number of reviews to skip for pagination
 *     responses:
 *       200:
 *         description: Successfully retrieved game reviews
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GameReviewResponse'
 *             example:
 *               success: true
 *               data:
 *                 - id: 1
 *                   game_id: "abc123"
 *                   review_date: "2024-01-15T10:30:00Z"
 *                   player_color: "white"
 *                   opponent_rating: 1500
 *                   game_result: "win"
 *                   opening_name: "Sicilian Defense"
 *                   total_moves: 42
 *                   blunders: 1
 *                   mistakes: 2
 *                   inaccuracies: 3
 *                   accuracy_percentage: 85.5
 *               limit: 50
 *               offset: 0
 *       400:
 *         description: Bad request - Invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Invalid limit parameter"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Failed to fetch game reviews"
 */
router.get('/', async (req, res) => {
  try {
    const { limit = 50, offset = 0 } = req.query;
    const reviews = await db.getAll('SELECT * FROM game_reviews ORDER BY review_date DESC LIMIT ? OFFSET ?', [Number(limit), Number(offset)]);
    
    res.json({
      success: true,
      data: reviews,
      limit: Number(limit),
      offset: Number(offset)
    });
  } catch (error) {
    console.error('Error fetching game reviews:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch game reviews'
    });
  }
});

/**
 * @swagger
 * /api/game-reviews/{id}:
 *   get:
 *     summary: Get a specific game review
 *     description: Retrieves details of a single game review by its ID
 *     tags: [Game Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Unique identifier of the game review
 *         example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved the game review
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/GameReviewResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/GameReview'
 *             example:
 *               success: true
 *               data:
 *                 id: 1
 *                 game_id: "abc123"
 *                 review_date: "2024-01-15T10:30:00Z"
 *                 player_color: "white"
 *                 opponent_rating: 1500
 *                 game_result: "win"
 *                 opening_name: "Sicilian Defense"
 *                 total_moves: 42
 *                 blunders: 1
 *                 mistakes: 2
 *                 inaccuracies: 3
 *                 accuracy_percentage: 85.5
 *       400:
 *         description: Bad request - Invalid ID parameter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Invalid game review ID"
 *       404:
 *         description: Game review not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Game review not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Failed to fetch game review"
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const review = await db.get('SELECT * FROM game_reviews WHERE id = ?', [id]);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        error: 'Game review not found'
      });
    }
    
    res.json({
      success: true,
      data: review
    });
  } catch (error) {
    console.error('Error fetching game review:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch game review'
    });
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     GameReviewMove:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the move
 *         review_id:
 *           type: integer
 *           description: ID of the game review this move belongs to
 *         move_number:
 *           type: integer
 *           description: Sequential number of the move in the game
 *         move_notation:
 *           type: string
 *           description: Chess notation for the move (e.g., "e4", "Nf3")
 *         position_fen:
 *           type: string
 *           description: FEN notation of the board position after this move
 *         evaluation:
 *           type: number
 *           format: float
 *           description: Engine evaluation of the position
 *         is_blunder:
 *           type: boolean
 *           description: Whether this move was classified as a blunder
 *         is_mistake:
 *           type: boolean
 *           description: Whether this move was classified as a mistake
 *         is_inaccuracy:
 *           type: boolean
 *           description: Whether this move was classified as an inaccuracy
 *         best_move:
 *           type: string
 *           description: Engine's suggested best move
 *         comment:
 *           type: string
 *           description: Analysis comment for the move
 */

/**
 * @swagger
 * /api/game-reviews/{id}/moves:
 *   get:
 *     summary: Get moves for a specific game review
 *     description: Retrieves all moves associated with a specific game review, ordered by move number
 *     tags: [Game Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Unique identifier of the game review
 *         example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved game review moves
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
 *                     $ref: '#/components/schemas/GameReviewMove'
 *             example:
 *               success: true
 *               data:
 *                 - id: 1
 *                   review_id: 1
 *                   move_number: 1
 *                   move_notation: "e4"
 *                   position_fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1"
 *                   evaluation: 0.2
 *                   is_blunder: false
 *                   is_mistake: false
 *                   is_inaccuracy: false
 *                   best_move: "e4"
 *                   comment: "Standard opening move"
 *                 - id: 2
 *                   review_id: 1
 *                   move_number: 2
 *                   move_notation: "c5"
 *                   position_fen: "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2"
 *                   evaluation: 0.1
 *                   is_blunder: false
 *                   is_mistake: false
 *                   is_inaccuracy: false
 *                   best_move: "c5"
 *                   comment: "Sicilian Defense"
 *       400:
 *         description: Bad request - Invalid ID parameter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Invalid game review ID"
 *       404:
 *         description: Game review not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Game review not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Failed to fetch game review moves"
 */
router.get('/:id/moves', async (req, res) => {
  try {
    const { id } = req.params;
    const moves = await db.getAll('SELECT * FROM game_review_moves WHERE review_id = ? ORDER BY move_number', [id]);
    
    res.json({
      success: true,
      data: moves
    });
  } catch (error) {
    console.error('Error fetching game review moves:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch game review moves'
    });
  }
});

export default router;