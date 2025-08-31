import express from 'express';
import { Database } from '../utils/database';

const router = express.Router();
const db = Database.getInstance();

/**
 * @swagger
 * components:
 *   schemas:
 *     OpeningMove:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the opening move
 *         opening_id:
 *           type: integer
 *           description: ID of the chess opening this move belongs to
 *         move_number:
 *           type: integer
 *           description: Sequential number of the move in the opening
 *         move_notation:
 *           type: string
 *           description: Chess notation for the move (e.g., "e4", "Nf3")
 *         move_san:
 *           type: string
 *           description: Standard Algebraic Notation for the move
 *         move_uci:
 *           type: string
 *           description: Universal Chess Interface notation for the move
 *         position_fen:
 *           type: string
 *           description: FEN notation of the board position after this move
 *         is_main_line:
 *           type: boolean
 *           description: Whether this move is part of the main line of the opening
 *         variation_name:
 *           type: string
 *           description: Name of the variation if this move creates one
 *         comment:
 *           type: string
 *           description: Explanatory comment about the move
 *         eco_code:
 *           type: string
 *           description: Encyclopedia of Chess Openings code
 *         frequency:
 *           type: integer
 *           description: How often this move is played in practice
 *         win_rate:
 *           type: number
 *           format: float
 *           description: Win percentage for this move
 *     OpeningMoveResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates if the request was successful
 *         data:
 *           oneOf:
 *             - $ref: '#/components/schemas/OpeningMove'
 *             - type: array
 *               items:
 *                 $ref: '#/components/schemas/OpeningMove'
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
 * /api/opening-moves:
 *   get:
 *     summary: Get all opening moves
 *     description: Retrieves a paginated list of chess opening moves, optionally filtered by opening ID
 *     tags: [Opening Moves]
 *     parameters:
 *       - in: query
 *         name: opening_id
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Filter moves by specific opening ID
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *           minimum: 1
 *           maximum: 200
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
 *         description: Successfully retrieved opening moves
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OpeningMoveResponse'
 *             example:
 *               success: true
 *               data:
 *                 - id: 1
 *                   opening_id: 1
 *                   move_number: 1
 *                   move_notation: "e4"
 *                   move_san: "e4"
 *                   move_uci: "e2e4"
 *                   position_fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1"
 *                   is_main_line: true
 *                   variation_name: null
 *                   comment: "King's Pawn opening"
 *                   eco_code: "B00"
 *                   frequency: 85000
 *                   win_rate: 52.3
 *                 - id: 2
 *                   opening_id: 1
 *                   move_number: 2
 *                   move_notation: "c5"
 *                   move_san: "c5"
 *                   move_uci: "c7c5"
 *                   position_fen: "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2"
 *                   is_main_line: true
 *                   variation_name: "Sicilian Defense"
 *                   comment: "Most popular response to e4"
 *                   eco_code: "B20"
 *                   frequency: 45000
 *                   win_rate: 47.8
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
 *               error: "Invalid opening_id parameter"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Failed to fetch opening moves"
 */
router.get('/', async (req, res) => {
  try {
    const { opening_id, limit = 50, offset = 0 } = req.query;
    
    let query = 'SELECT * FROM opening_moves';
    let params: any[] = [];
    
    if (opening_id) {
      query += ' WHERE opening_id = ?';
      params.push(opening_id);
    }
    
    query += ' ORDER BY opening_id, move_number LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));
    
    const moves = await db.getAll(query, params);
    
    res.json({
      success: true,
      data: moves,
      limit: Number(limit),
      offset: Number(offset)
    });
  } catch (error) {
    console.error('Error fetching opening moves:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch opening moves'
    });
  }
});

/**
 * @swagger
 * /api/opening-moves/{id}:
 *   get:
 *     summary: Get a specific opening move
 *     description: Retrieves details of a single opening move by its ID
 *     tags: [Opening Moves]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Unique identifier of the opening move
 *         example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved the opening move
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/OpeningMoveResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/OpeningMove'
 *             example:
 *               success: true
 *               data:
 *                 id: 1
 *                 opening_id: 1
 *                 move_number: 1
 *                 move_notation: "e4"
 *                 move_san: "e4"
 *                 move_uci: "e2e4"
 *                 position_fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1"
 *                 is_main_line: true
 *                 variation_name: null
 *                 comment: "King's Pawn opening"
 *                 eco_code: "B00"
 *                 frequency: 85000
 *                 win_rate: 52.3
 *       400:
 *         description: Bad request - Invalid ID parameter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Invalid opening move ID"
 *       404:
 *         description: Opening move not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Opening move not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Failed to fetch opening move"
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const move = await db.get('SELECT * FROM opening_moves WHERE id = ?', [id]);
    
    if (!move) {
      return res.status(404).json({
        success: false,
        error: 'Opening move not found'
      });
    }
    
    res.json({
      success: true,
      data: move
    });
  } catch (error) {
    console.error('Error fetching opening move:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch opening move'
    });
  }
});

export default router;