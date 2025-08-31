import express from 'express';
import { Database } from '../utils/database';

const router = express.Router();
const db = Database.getInstance();

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
 *         time_spent:
 *           type: integer
 *           description: Time spent on this move in seconds
 *         clock_time:
 *           type: integer
 *           description: Remaining time on the clock after this move
 *     GameReviewMoveResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates if the request was successful
 *         data:
 *           oneOf:
 *             - $ref: '#/components/schemas/GameReviewMove'
 *             - type: array
 *               items:
 *                 $ref: '#/components/schemas/GameReviewMove'
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
 * /api/game-review-moves:
 *   get:
 *     summary: Get all game review moves
 *     description: Retrieves a paginated list of game review moves, optionally filtered by review ID
 *     tags: [Game Review Moves]
 *     parameters:
 *       - in: query
 *         name: review_id
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Filter moves by specific game review ID
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 100
 *           minimum: 1
 *           maximum: 500
 *         description: Maximum number of moves to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *           minimum: 0
 *         description: Number of moves to skip for pagination
 *     responses:
 *       200:
 *         description: Successfully retrieved game review moves
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GameReviewMoveResponse'
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
 *                   time_spent: 15
 *                   clock_time: 585
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
 *                   time_spent: 12
 *                   clock_time: 588
 *               limit: 100
 *               offset: 0
 *       400:
 *         description: Bad request - Invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Invalid review_id parameter"
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
router.get('/', async (req, res) => {
  try {
    const { review_id, limit = 100, offset = 0 } = req.query;
    
    let query = 'SELECT * FROM game_review_moves';
    let params: any[] = [];
    
    if (review_id) {
      query += ' WHERE review_id = ?';
      params.push(review_id);
    }
    
    query += ' ORDER BY review_id, move_number LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));
    
    const moves = await db.getAll(query, params);
    
    res.json({
      success: true,
      data: moves,
      limit: Number(limit),
      offset: Number(offset)
    });
  } catch (error) {
    console.error('Error fetching game review moves:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch game review moves'
    });
  }
});

/**
 * @swagger
 * /api/game-review-moves/{id}:
 *   get:
 *     summary: Get a specific game review move
 *     description: Retrieves details of a single game review move by its ID
 *     tags: [Game Review Moves]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Unique identifier of the game review move
 *         example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved the game review move
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/GameReviewMoveResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/GameReviewMove'
 *             example:
 *               success: true
 *               data:
 *                 id: 1
 *                 review_id: 1
 *                 move_number: 1
 *                 move_notation: "e4"
 *                 position_fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1"
 *                 evaluation: 0.2
 *                 is_blunder: false
 *                 is_mistake: false
 *                 is_inaccuracy: false
 *                 best_move: "e4"
 *                 comment: "Standard opening move"
 *                 time_spent: 15
 *                 clock_time: 585
 *       400:
 *         description: Bad request - Invalid ID parameter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Invalid game review move ID"
 *       404:
 *         description: Game review move not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Game review move not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Failed to fetch game review move"
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const move = await db.get('SELECT * FROM game_review_moves WHERE id = ?', [id]);
    
    if (!move) {
      return res.status(404).json({
        success: false,
        error: 'Game review move not found'
      });
    }
    
    res.json({
      success: true,
      data: move
    });
  } catch (error) {
    console.error('Error fetching game review move:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch game review move'
    });
  }
});

export default router;