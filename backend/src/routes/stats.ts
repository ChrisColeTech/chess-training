import express from 'express';
import { UserController } from '../controllers/userController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();
const userController = new UserController();

// All stats routes require authentication
router.use(authenticateToken);

/**
 * @swagger
 * components:
 *   schemas:
 *     DashboardStats:
 *       type: object
 *       properties:
 *         chess_elo:
 *           type: integer
 *           description: Current chess ELO rating
 *           example: 1200
 *         puzzle_rating:
 *           type: integer
 *           description: Current puzzle rating
 *           example: 1150
 *         games_played:
 *           type: integer
 *           description: Number of games played today
 *           example: 3
 *         study_hours:
 *           type: number
 *           description: Hours studied today (currently always 0)
 *           example: 0
 *         rating_change:
 *           type: integer
 *           description: Daily chess rating change (currently always 0)
 *           example: 0
 *         puzzle_rating_change:
 *           type: integer
 *           description: Daily puzzle rating change (currently always 0)
 *           example: 0
 *         games_change:
 *           type: integer
 *           description: Daily games change (currently always 0)
 *           example: 0
 *         study_hours_change:
 *           type: number
 *           description: Daily study hours change (currently always 0)
 *           example: 0
 *         puzzles_solved_today:
 *           type: integer
 *           description: Number of puzzles solved today
 *           example: 5
 *         study_minutes_today:
 *           type: integer
 *           description: Minutes studied today (currently always 0)
 *           example: 0
 *         currentStreak:
 *           type: integer
 *           description: Current consecutive days streak of puzzle solving
 *           example: 7
 *         recentGames:
 *           type: array
 *           description: Last 5 completed games
 *           items:
 *             type: object
 *             properties:
 *               result:
 *                 type: string
 *                 enum: ['1-0', '0-1', '1/2-1/2']
 *                 description: Game result (1-0 = win, 0-1 = loss, 1/2-1/2 = draw)
 *               aiLevel:
 *                 type: integer
 *                 description: AI difficulty level
 *                 minimum: 1
 *                 maximum: 10
 *               eloChange:
 *                 type: integer
 *                 description: ELO points gained or lost
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Game completion date (YYYY-MM-DD)
 *           example:
 *             - result: "1-0"
 *               aiLevel: 3
 *               eloChange: 14
 *               date: "2024-01-15"
 *             - result: "0-1"
 *               aiLevel: 4
 *               eloChange: -9
 *               date: "2024-01-14"
 *     DashboardStatsResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         stats:
 *           $ref: '#/components/schemas/DashboardStats'
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         error:
 *           type: string
 *           description: Error message describing what went wrong
 *           example: "User not authenticated"
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/stats/dashboard:
 *   get:
 *     summary: Get dashboard statistics for authenticated user
 *     description: Retrieves comprehensive dashboard statistics including ratings, daily activity, current streak, and recent game history for the authenticated user.
 *     tags:
 *       - Statistics
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DashboardStatsResponse'
 *             examples:
 *               success:
 *                 summary: Successful dashboard stats response
 *                 value:
 *                   success: true
 *                   stats:
 *                     chess_elo: 1200
 *                     puzzle_rating: 1150
 *                     games_played: 3
 *                     study_hours: 0
 *                     rating_change: 0
 *                     puzzle_rating_change: 0
 *                     games_change: 0
 *                     study_hours_change: 0
 *                     puzzles_solved_today: 5
 *                     study_minutes_today: 0
 *                     currentStreak: 7
 *                     recentGames:
 *                       - result: "1-0"
 *                         aiLevel: 3
 *                         eloChange: 14
 *                         date: "2024-01-15"
 *                       - result: "0-1"
 *                         aiLevel: 4
 *                         eloChange: -9
 *                         date: "2024-01-14"
 *       401:
 *         description: User not authenticated - missing or invalid JWT token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               not_authenticated:
 *                 summary: User not authenticated
 *                 value:
 *                   success: false
 *                   error: "User not authenticated"
 *               invalid_token:
 *                 summary: Invalid or expired token
 *                 value:
 *                   success: false
 *                   error: "Invalid token"
 *       404:
 *         description: User not found in database
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               user_not_found:
 *                 summary: User not found
 *                 value:
 *                   success: false
 *                   error: "User not found"
 *       500:
 *         description: Internal server error occurred while fetching dashboard statistics
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               server_error:
 *                 summary: Server error
 *                 value:
 *                   success: false
 *                   error: "Failed to get dashboard stats"
 *               database_error:
 *                 summary: Database connection error
 *                 value:
 *                   success: false
 *                   error: "Database connection failed"
 */
router.get('/dashboard',
  userController.getDashboardStats
);

export default router;