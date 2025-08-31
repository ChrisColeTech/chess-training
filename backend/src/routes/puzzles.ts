import express from 'express';
import { PuzzleController } from '../controllers/puzzleController';
import { authenticateToken } from '../middleware/auth';
import { body, param, validationResult } from 'express-validator';

const router = express.Router();
const puzzleController = new PuzzleController();

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

/**
 * @swagger
 * /api/puzzles:
 *   get:
 *     summary: Get all puzzles
 *     description: Retrieve a list of all available chess puzzles
 *     tags: [Puzzles]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of puzzles to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of puzzles to skip
 *     responses:
 *       200:
 *         description: List of puzzles retrieved successfully
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
 *                         $ref: '#/components/schemas/Puzzle'
 *       500:
 *         description: Internal server error
 */
// Public routes for browsing puzzles
router.get('/', puzzleController.getAllPuzzles);

/**
 * @swagger
 * /api/puzzles/category/{category}:
 *   get:
 *     summary: Get puzzles by category
 *     description: Retrieve chess puzzles filtered by a specific category (e.g., tactics, endgame, opening)
 *     tags: [Puzzles]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *           enum: [tactics, endgame, opening, middlegame, checkmate]
 *         description: The puzzle category to filter by
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of puzzles to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of puzzles to skip
 *     responses:
 *       200:
 *         description: Puzzles retrieved successfully
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
 *                         $ref: '#/components/schemas/Puzzle'
 *       400:
 *         description: Invalid category parameter
 *       404:
 *         description: No puzzles found for the specified category
 *       500:
 *         description: Internal server error
 */
router.get('/category/:category', puzzleController.getPuzzlesByCategory);

/**
 * @swagger
 * /api/puzzles/difficulty/{difficulty}:
 *   get:
 *     summary: Get puzzles by difficulty
 *     description: Retrieve chess puzzles filtered by difficulty level
 *     tags: [Puzzles]
 *     parameters:
 *       - in: path
 *         name: difficulty
 *         required: true
 *         schema:
 *           type: string
 *           enum: [beginner, intermediate, advanced, expert]
 *         description: The difficulty level to filter by
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of puzzles to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of puzzles to skip
 *     responses:
 *       200:
 *         description: Puzzles retrieved successfully
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
 *                         $ref: '#/components/schemas/Puzzle'
 *       400:
 *         description: Invalid difficulty parameter
 *       404:
 *         description: No puzzles found for the specified difficulty
 *       500:
 *         description: Internal server error
 */
router.get('/difficulty/:difficulty', puzzleController.getPuzzlesByDifficulty);

// All other puzzle routes require authentication
router.use(authenticateToken);

/**
 * @swagger
 * /api/puzzles/next:
 *   get:
 *     summary: Get next puzzle for user
 *     description: Retrieve the next appropriate puzzle for the authenticated user based on their progress and skill level
 *     tags: [Puzzles]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Next puzzle retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Puzzle'
 *       401:
 *         description: Unauthorized - valid authentication token required
 *       404:
 *         description: No more puzzles available for user
 *       500:
 *         description: Internal server error
 */
// Get next puzzle
router.get('/next',
  puzzleController.getNextPuzzle
);

/**
 * @swagger
 * /api/puzzles/{puzzleId}/solve:
 *   post:
 *     summary: Submit puzzle solution
 *     description: Submit a solution attempt for a specific puzzle and receive feedback on correctness
 *     tags: [Puzzles]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: puzzleId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The unique identifier of the puzzle to solve
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - moves
 *               - timeTaken
 *             properties:
 *               moves:
 *                 type: array
 *                 items:
 *                   type: string
 *                 minItems: 1
 *                 description: Array of chess moves in algebraic notation (e.g., ["Nf3", "e5", "Bc4"])
 *                 example: ["Qh5", "Nf6", "Qxf7#"]
 *               timeTaken:
 *                 type: integer
 *                 minimum: 0
 *                 description: Time taken to solve the puzzle in seconds
 *                 example: 45
 *     responses:
 *       200:
 *         description: Solution submitted successfully
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
 *                         correct:
 *                           type: boolean
 *                           description: Whether the solution was correct
 *                         rating:
 *                           type: number
 *                           description: Updated user rating (if applicable)
 *                         explanation:
 *                           type: string
 *                           description: Explanation of the correct solution
 *       400:
 *         description: Invalid request - validation errors in moves or timeTaken
 *       401:
 *         description: Unauthorized - valid authentication token required
 *       404:
 *         description: Puzzle not found
 *       500:
 *         description: Internal server error
 */
// Solve puzzle
router.post('/:puzzleId/solve',
  [
    param('puzzleId')
      .isUUID()
      .withMessage('Invalid puzzle ID format'),
    body('moves')
      .isArray({ min: 1 })
      .withMessage('Moves must be a non-empty array'),
    body('moves.*')
      .isString()
      .withMessage('Each move must be a string'),
    body('timeTaken')
      .isInt({ min: 0 })
      .withMessage('Time taken must be a non-negative integer')
  ],
  validateRequest,
  puzzleController.solvePuzzle
);

/**
 * @swagger
 * /api/puzzles/{puzzleId}/hint:
 *   post:
 *     summary: Get puzzle hint
 *     description: Request a hint for a specific puzzle to help with solving
 *     tags: [Puzzles]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: puzzleId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The unique identifier of the puzzle to get a hint for
 *     responses:
 *       200:
 *         description: Hint retrieved successfully
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
 *                         hint:
 *                           type: string
 *                           description: A helpful hint for solving the puzzle
 *                           example: "Look for a discovered attack on the king"
 *                         hintLevel:
 *                           type: integer
 *                           description: The level of hint provided (1 = subtle, 2 = moderate, 3 = obvious)
 *                           example: 1
 *       400:
 *         description: Invalid puzzle ID format
 *       401:
 *         description: Unauthorized - valid authentication token required
 *       404:
 *         description: Puzzle not found
 *       429:
 *         description: Too many hint requests - rate limit exceeded
 *       500:
 *         description: Internal server error
 */
// Get hint
router.post('/:puzzleId/hint',
  [
    param('puzzleId')
      .isUUID()
      .withMessage('Invalid puzzle ID format')
  ],
  validateRequest,
  puzzleController.getHint
);

/**
 * @swagger
 * /api/puzzles/stats:
 *   get:
 *     summary: Get user puzzle statistics
 *     description: Retrieve comprehensive statistics about the authenticated user's puzzle-solving performance
 *     tags: [Puzzles]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Puzzle statistics retrieved successfully
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
 *                         totalAttempted:
 *                           type: integer
 *                           description: Total number of puzzles attempted
 *                           example: 150
 *                         totalSolved:
 *                           type: integer
 *                           description: Total number of puzzles solved correctly
 *                           example: 135
 *                         accuracyRate:
 *                           type: number
 *                           format: float
 *                           description: Overall accuracy rate as a percentage
 *                           example: 90.0
 *                         averageTime:
 *                           type: number
 *                           format: float
 *                           description: Average time taken to solve puzzles in seconds
 *                           example: 42.5
 *                         ratingProgress:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               date:
 *                                 type: string
 *                                 format: date
 *                               rating:
 *                                 type: number
 *                           description: Rating history over time
 *                         categoryStats:
 *                           type: object
 *                           additionalProperties:
 *                             type: object
 *                             properties:
 *                               attempted:
 *                                 type: integer
 *                               solved:
 *                                 type: integer
 *                               accuracy:
 *                                 type: number
 *                           description: Statistics broken down by puzzle category
 *                         difficultyStats:
 *                           type: object
 *                           additionalProperties:
 *                             type: object
 *                             properties:
 *                               attempted:
 *                                 type: integer
 *                               solved:
 *                                 type: integer
 *                               accuracy:
 *                                 type: number
 *                           description: Statistics broken down by difficulty level
 *       401:
 *         description: Unauthorized - valid authentication token required
 *       500:
 *         description: Internal server error
 */
// Get puzzle statistics
router.get('/stats',
  puzzleController.getPuzzleStats
);

export default router;