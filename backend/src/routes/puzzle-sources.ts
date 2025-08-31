import express from 'express';
import { Database } from '../utils/database';

const router = express.Router();
const db = Database.getInstance();

/**
 * @swagger
 * components:
 *   schemas:
 *     PuzzleSource:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the puzzle source
 *         name:
 *           type: string
 *           description: Name of the puzzle source
 *         description:
 *           type: string
 *           description: Description of the puzzle source
 *         url:
 *           type: string
 *           description: URL of the puzzle source
 *         is_active:
 *           type: boolean
 *           description: Whether the puzzle source is active
 *         total_puzzles:
 *           type: integer
 *           description: Total number of puzzles from this source
 *         average_rating:
 *           type: number
 *           description: Average rating of puzzles from this source
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *     PuzzleSourcesResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PuzzleSource'
 *         limit:
 *           type: integer
 *         offset:
 *           type: integer
 *     PuzzleSourceResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           $ref: '#/components/schemas/PuzzleSource'
 *     PuzzleSourceStats:
 *       type: object
 *       properties:
 *         total_sources:
 *           type: integer
 *           description: Total number of puzzle sources
 *         active_sources:
 *           type: integer
 *           description: Number of active puzzle sources
 *         total_puzzles:
 *           type: integer
 *           description: Total number of puzzles across all sources
 *         avg_rating:
 *           type: number
 *           description: Average rating across all puzzles
 *     PuzzleSourceStatsResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           $ref: '#/components/schemas/PuzzleSourceStats'
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
 * /api/puzzle-sources:
 *   get:
 *     summary: Get all puzzle sources
 *     description: Retrieve a list of all puzzle sources with optional filtering and pagination
 *     tags:
 *       - Puzzle Sources
 *     parameters:
 *       - in: query
 *         name: is_active
 *         schema:
 *           type: string
 *           enum: [true, false]
 *         description: Filter by active status
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *           minimum: 1
 *           maximum: 100
 *         description: Maximum number of results to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *           minimum: 0
 *         description: Number of results to skip
 *     responses:
 *       200:
 *         description: Successfully retrieved puzzle sources
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PuzzleSourcesResponse'
 *             example:
 *               success: true
 *               data:
 *                 - id: 1
 *                   name: "Chess.com Puzzles"
 *                   description: "Tactical puzzles from Chess.com"
 *                   url: "https://chess.com"
 *                   is_active: true
 *                   total_puzzles: 50000
 *                   average_rating: 1500.5
 *                   created_at: "2023-01-01T00:00:00Z"
 *                   updated_at: "2023-01-01T00:00:00Z"
 *               limit: 50
 *               offset: 0
 *       400:
 *         description: Bad request - Invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Failed to fetch puzzle sources"
 */
router.get('/', async (req, res) => {
  try {
    const { is_active, limit = 50, offset = 0 } = req.query;
    
    let query = 'SELECT * FROM puzzle_sources';
    let params: any[] = [];
    
    if (is_active !== undefined) {
      query += ' WHERE is_active = ?';
      params.push(is_active === 'true' ? 1 : 0);
    }
    
    query += ' ORDER BY name LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));
    
    const sources = await db.getAll(query, params);
    
    res.json({
      success: true,
      data: sources,
      limit: Number(limit),
      offset: Number(offset)
    });
  } catch (error) {
    console.error('Error fetching puzzle sources:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch puzzle sources'
    });
  }
});

/**
 * @swagger
 * /api/puzzle-sources/{id}:
 *   get:
 *     summary: Get specific puzzle source
 *     description: Retrieve a specific puzzle source by its ID
 *     tags:
 *       - Puzzle Sources
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique identifier of the puzzle source
 *     responses:
 *       200:
 *         description: Successfully retrieved puzzle source
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PuzzleSourceResponse'
 *             example:
 *               success: true
 *               data:
 *                 id: 1
 *                 name: "Chess.com Puzzles"
 *                 description: "Tactical puzzles from Chess.com"
 *                 url: "https://chess.com"
 *                 is_active: true
 *                 total_puzzles: 50000
 *                 average_rating: 1500.5
 *                 created_at: "2023-01-01T00:00:00Z"
 *                 updated_at: "2023-01-01T00:00:00Z"
 *       400:
 *         description: Bad request - Invalid ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Puzzle source not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Puzzle source not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Failed to fetch puzzle source"
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const source = await db.get('SELECT * FROM puzzle_sources WHERE id = ?', [id]);
    
    if (!source) {
      return res.status(404).json({
        success: false,
        error: 'Puzzle source not found'
      });
    }
    
    res.json({
      success: true,
      data: source
    });
  } catch (error) {
    console.error('Error fetching puzzle source:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch puzzle source'
    });
  }
});

/**
 * @swagger
 * /api/puzzle-sources/stats:
 *   get:
 *     summary: Get puzzle sources statistics
 *     description: Retrieve aggregate statistics for all puzzle sources
 *     tags:
 *       - Puzzle Sources
 *     responses:
 *       200:
 *         description: Successfully retrieved puzzle source statistics
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PuzzleSourceStatsResponse'
 *             example:
 *               success: true
 *               data:
 *                 total_sources: 5
 *                 active_sources: 3
 *                 total_puzzles: 250000
 *                 avg_rating: 1450.75
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Failed to fetch puzzle source stats"
 */
router.get('/stats', async (req, res) => {
  try {
    const stats = await db.get(`
      SELECT 
        COUNT(*) as total_sources,
        COUNT(CASE WHEN is_active = 1 THEN 1 END) as active_sources,
        SUM(total_puzzles) as total_puzzles,
        AVG(average_rating) as avg_rating
      FROM puzzle_sources
    `);
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching puzzle source stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch puzzle source stats'
    });
  }
});

export default router;