import express from 'express';
import { UserController } from '../controllers/userController';
import { authenticateToken } from '../middleware/auth';
import { body, validationResult } from 'express-validator';

const router = express.Router();
const userController = new UserController();

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

// All user routes require authentication
router.use(authenticateToken);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get user profile
 *     description: Retrieve the complete profile information for the authenticated user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       allOf:
 *                         - $ref: '#/components/schemas/User'
 *                         - type: object
 *                           properties:
 *                             preferences:
 *                               type: object
 *                               description: User preferences and settings
 *                               properties:
 *                                 theme:
 *                                   type: string
 *                                   enum: [light, dark]
 *                                   example: dark
 *                                 boardStyle:
 *                                   type: string
 *                                   example: wooden
 *                                 pieceSet:
 *                                   type: string
 *                                   example: classic
 *                                 difficulty:
 *                                   type: string
 *                                   enum: [beginner, intermediate, advanced, expert]
 *                                   example: intermediate
 *                             statistics:
 *                               type: object
 *                               description: User performance statistics
 *                               properties:
 *                                 gamesPlayed:
 *                                   type: integer
 *                                   example: 150
 *                                 puzzlesSolved:
 *                                   type: integer
 *                                   example: 235
 *                                 winRate:
 *                                   type: number
 *                                   format: float
 *                                   example: 65.5
 *       401:
 *         description: Unauthorized - valid authentication token required
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
 */
// Get user profile
router.get('/profile',
  userController.getProfile
);

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Update user profile
 *     description: Update the profile information and preferences for the authenticated user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               preferences:
 *                 type: object
 *                 description: User preferences and settings to update
 *                 properties:
 *                   theme:
 *                     type: string
 *                     enum: [light, dark]
 *                     description: UI theme preference
 *                     example: dark
 *                   boardStyle:
 *                     type: string
 *                     description: Chess board visual style
 *                     example: wooden
 *                   pieceSet:
 *                     type: string
 *                     description: Chess piece set style
 *                     example: classic
 *                   difficulty:
 *                     type: string
 *                     enum: [beginner, intermediate, advanced, expert]
 *                     description: Preferred puzzle difficulty
 *                     example: intermediate
 *                   soundEnabled:
 *                     type: boolean
 *                     description: Enable/disable sound effects
 *                     example: true
 *                   showCoordinates:
 *                     type: boolean
 *                     description: Show board coordinates
 *                     example: true
 *               username:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 20
 *                 pattern: ^[a-zA-Z0-9_]+$
 *                 description: Updated username (optional)
 *                 example: chess_master_2024
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Updated email address (optional)
 *                 example: updated.email@example.com
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error - invalid preferences object or other validation failures
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - valid authentication token required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: User not found
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
 */
// Update user profile
router.put('/profile',
  [
    body('preferences')
      .isObject()
      .withMessage('Preferences must be an object')
  ],
  validateRequest,
  userController.updateProfile
);

/**
 * @swagger
 * /api/users/dashboard-stats:
 *   get:
 *     summary: Get dashboard statistics
 *     description: Retrieve comprehensive dashboard statistics and analytics for the authenticated user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved successfully
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
 *                         overview:
 *                           type: object
 *                           description: Overall user performance overview
 *                           properties:
 *                             totalGames:
 *                               type: integer
 *                               description: Total number of games played
 *                               example: 85
 *                             totalPuzzles:
 *                               type: integer
 *                               description: Total number of puzzles attempted
 *                               example: 342
 *                             currentRating:
 *                               type: integer
 *                               description: Current chess rating
 *                               example: 1650
 *                             ratingChange:
 *                               type: integer
 *                               description: Rating change in last 30 days
 *                               example: 45
 *                         recentActivity:
 *                           type: object
 *                           description: Recent activity summary
 *                           properties:
 *                             gamesThisWeek:
 *                               type: integer
 *                               example: 12
 *                             puzzlesThisWeek:
 *                               type: integer
 *                               example: 28
 *                             studyTimeThisWeek:
 *                               type: integer
 *                               description: Study time in minutes
 *                               example: 180
 *                         performance:
 *                           type: object
 *                           description: Performance metrics
 *                           properties:
 *                             winRate:
 *                               type: number
 *                               format: float
 *                               description: Win rate percentage
 *                               example: 62.5
 *                             puzzleAccuracy:
 *                               type: number
 *                               format: float
 *                               description: Puzzle solving accuracy percentage
 *                               example: 78.3
 *                             averageGameTime:
 *                               type: integer
 *                               description: Average game time in minutes
 *                               example: 15
 *                             favoriteOpening:
 *                               type: string
 *                               description: Most frequently played opening
 *                               example: "Sicilian Defense"
 *                         goals:
 *                           type: object
 *                           description: User goals and progress
 *                           properties:
 *                             dailyPuzzleGoal:
 *                               type: integer
 *                               example: 10
 *                             dailyPuzzleProgress:
 *                               type: integer
 *                               example: 7
 *                             weeklyGamesGoal:
 *                               type: integer
 *                               example: 20
 *                             weeklyGamesProgress:
 *                               type: integer
 *                               example: 12
 *       401:
 *         description: Unauthorized - valid authentication token required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: User not found
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
 */
// Get dashboard stats (referenced in API docs)
router.get('/dashboard-stats', 
  userController.getDashboardStats
);

/**
 * @swagger
 * /api/users/preferences:
 *   get:
 *     summary: Get user preferences
 *     description: Retrieve the current preferences and settings for the authenticated user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User preferences retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       description: User preferences and settings
 *                       properties:
 *                         theme:
 *                           type: string
 *                           enum: [light, dark]
 *                           description: UI theme preference
 *                           example: dark
 *                         boardStyle:
 *                           type: string
 *                           description: Chess board visual style
 *                           example: wooden
 *                         pieceSet:
 *                           type: string
 *                           description: Chess piece set style
 *                           example: classic
 *                         difficulty:
 *                           type: string
 *                           enum: [beginner, intermediate, advanced, expert]
 *                           description: Preferred puzzle difficulty
 *                           example: intermediate
 *                         soundEnabled:
 *                           type: boolean
 *                           description: Enable/disable sound effects
 *                           example: true
 *                         showCoordinates:
 *                           type: boolean
 *                           description: Show board coordinates
 *                           example: true
 *                         autoPromoteQueen:
 *                           type: boolean
 *                           description: Auto-promote pawns to queen
 *                           example: false
 *                         confirmMoves:
 *                           type: boolean
 *                           description: Require move confirmation
 *                           example: false
 *                         animationSpeed:
 *                           type: string
 *                           enum: [slow, normal, fast, none]
 *                           description: Piece movement animation speed
 *                           example: normal
 *                         timeControl:
 *                           type: object
 *                           description: Preferred time control settings
 *                           properties:
 *                             baseTime:
 *                               type: integer
 *                               description: Base time in minutes
 *                               example: 10
 *                             increment:
 *                               type: integer
 *                               description: Time increment in seconds
 *                               example: 5
 *       401:
 *         description: Unauthorized - valid authentication token required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: User not found
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
 */
// Simplified endpoints for frontend compatibility
router.get('/preferences', 
  userController.getPreferences
);

/**
 * @swagger
 * /api/users/preferences:
 *   put:
 *     summary: Update user preferences
 *     description: Update specific preferences and settings for the authenticated user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: User preferences to update (all fields optional)
 *             properties:
 *               theme:
 *                 type: string
 *                 enum: [light, dark]
 *                 description: UI theme preference
 *                 example: dark
 *               boardStyle:
 *                 type: string
 *                 description: Chess board visual style
 *                 example: wooden
 *               pieceSet:
 *                 type: string
 *                 description: Chess piece set style
 *                 example: classic
 *               difficulty:
 *                 type: string
 *                 enum: [beginner, intermediate, advanced, expert]
 *                 description: Preferred puzzle difficulty
 *                 example: intermediate
 *               soundEnabled:
 *                 type: boolean
 *                 description: Enable/disable sound effects
 *                 example: true
 *               showCoordinates:
 *                 type: boolean
 *                 description: Show board coordinates
 *                 example: true
 *               autoPromoteQueen:
 *                 type: boolean
 *                 description: Auto-promote pawns to queen
 *                 example: false
 *               confirmMoves:
 *                 type: boolean
 *                 description: Require move confirmation
 *                 example: false
 *               animationSpeed:
 *                 type: string
 *                 enum: [slow, normal, fast, none]
 *                 description: Piece movement animation speed
 *                 example: normal
 *               timeControl:
 *                 type: object
 *                 description: Preferred time control settings
 *                 properties:
 *                   baseTime:
 *                     type: integer
 *                     minimum: 1
 *                     maximum: 180
 *                     description: Base time in minutes
 *                     example: 10
 *                   increment:
 *                     type: integer
 *                     minimum: 0
 *                     maximum: 60
 *                     description: Time increment in seconds
 *                     example: 5
 *     responses:
 *       200:
 *         description: User preferences updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       description: Updated user preferences
 *                       properties:
 *                         theme:
 *                           type: string
 *                           enum: [light, dark]
 *                           example: dark
 *                         boardStyle:
 *                           type: string
 *                           example: wooden
 *                         pieceSet:
 *                           type: string
 *                           example: classic
 *                         difficulty:
 *                           type: string
 *                           enum: [beginner, intermediate, advanced, expert]
 *                           example: intermediate
 *                         soundEnabled:
 *                           type: boolean
 *                           example: true
 *                         showCoordinates:
 *                           type: boolean
 *                           example: true
 *                         autoPromoteQueen:
 *                           type: boolean
 *                           example: false
 *                         confirmMoves:
 *                           type: boolean
 *                           example: false
 *                         animationSpeed:
 *                           type: string
 *                           enum: [slow, normal, fast, none]
 *                           example: normal
 *                         timeControl:
 *                           type: object
 *                           properties:
 *                             baseTime:
 *                               type: integer
 *                               example: 10
 *                             increment:
 *                               type: integer
 *                               example: 5
 *       400:
 *         description: Validation error - invalid preferences object or invalid field values
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               validation_error:
 *                 summary: Validation error example
 *                 value:
 *                   success: false
 *                   error: "Validation error"
 *                   details: [
 *                     {
 *                       "field": "theme",
 *                       "message": "Theme must be either 'light' or 'dark'"
 *                     }
 *                   ]
 *       401:
 *         description: Unauthorized - valid authentication token required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: User not found
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
 */
router.put('/preferences',
  [
    body().isObject().withMessage('Preferences must be an object')
  ],
  validateRequest,
  userController.updatePreferences
);

/**
 * @swagger
 * /api/users/statistics:
 *   get:
 *     summary: Get user statistics
 *     description: Retrieve detailed performance statistics and analytics for the authenticated user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       description: Comprehensive user performance statistics
 *                       properties:
 *                         games:
 *                           type: object
 *                           description: Game-related statistics
 *                           properties:
 *                             total:
 *                               type: integer
 *                               description: Total games played
 *                               example: 245
 *                             wins:
 *                               type: integer
 *                               description: Total wins
 *                               example: 152
 *                             losses:
 *                               type: integer
 *                               description: Total losses
 *                               example: 78
 *                             draws:
 *                               type: integer
 *                               description: Total draws
 *                               example: 15
 *                             winRate:
 *                               type: number
 *                               format: float
 *                               description: Win rate percentage
 *                               example: 62.04
 *                             averageRating:
 *                               type: integer
 *                               description: Average opponent rating
 *                               example: 1580
 *                             ratingProgression:
 *                               type: array
 *                               description: Rating history over time
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   date:
 *                                     type: string
 *                                     format: date
 *                                     example: "2024-01-15"
 *                                   rating:
 *                                     type: integer
 *                                     example: 1650
 *                         puzzles:
 *                           type: object
 *                           description: Puzzle-solving statistics
 *                           properties:
 *                             total:
 *                               type: integer
 *                               description: Total puzzles attempted
 *                               example: 892
 *                             solved:
 *                               type: integer
 *                               description: Total puzzles solved correctly
 *                               example: 698
 *                             accuracy:
 *                               type: number
 *                               format: float
 *                               description: Puzzle solving accuracy percentage
 *                               example: 78.3
 *                             averageTime:
 *                               type: number
 *                               format: float
 *                               description: Average time per puzzle in seconds
 *                               example: 45.2
 *                             byDifficulty:
 *                               type: object
 *                               description: Statistics broken down by difficulty
 *                               properties:
 *                                 beginner:
 *                                   type: object
 *                                   properties:
 *                                     total: { type: integer, example: 250 }
 *                                     solved: { type: integer, example: 235 }
 *                                     accuracy: { type: number, format: float, example: 94.0 }
 *                                 intermediate:
 *                                   type: object
 *                                   properties:
 *                                     total: { type: integer, example: 420 }
 *                                     solved: { type: integer, example: 315 }
 *                                     accuracy: { type: number, format: float, example: 75.0 }
 *                                 advanced:
 *                                   type: object
 *                                   properties:
 *                                     total: { type: integer, example: 180 }
 *                                     solved: { type: integer, example: 126 }
 *                                     accuracy: { type: number, format: float, example: 70.0 }
 *                                 expert:
 *                                   type: object
 *                                   properties:
 *                                     total: { type: integer, example: 42 }
 *                                     solved: { type: integer, example: 22 }
 *                                     accuracy: { type: number, format: float, example: 52.4 }
 *                         openings:
 *                           type: object
 *                           description: Opening repertoire statistics
 *                           properties:
 *                             mostPlayed:
 *                               type: array
 *                               description: Most frequently played openings
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   name:
 *                                     type: string
 *                                     example: "Sicilian Defense"
 *                                   games:
 *                                     type: integer
 *                                     example: 45
 *                                   winRate:
 *                                     type: number
 *                                     format: float
 *                                     example: 68.9
 *                             whiteRepertoire:
 *                               type: integer
 *                               description: Number of different openings as White
 *                               example: 12
 *                             blackRepertoire:
 *                               type: integer
 *                               description: Number of different openings as Black
 *                               example: 8
 *                         timeSpent:
 *                           type: object
 *                           description: Time investment statistics
 *                           properties:
 *                             totalHours:
 *                               type: number
 *                               format: float
 *                               description: Total hours spent playing and studying
 *                               example: 127.5
 *                             averageSessionLength:
 *                               type: number
 *                               format: float
 *                               description: Average session length in minutes
 *                               example: 28.3
 *                             thisMonth:
 *                               type: number
 *                               format: float
 *                               description: Hours spent this month
 *                               example: 15.2
 *                         achievements:
 *                           type: array
 *                           description: Unlocked achievements and milestones
 *                           items:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                                 example: "first_win"
 *                               name:
 *                                 type: string
 *                                 example: "First Victory"
 *                               description:
 *                                 type: string
 *                                 example: "Win your first game"
 *                               unlockedAt:
 *                                 type: string
 *                                 format: date-time
 *                                 example: "2024-01-10T14:30:00Z"
 *       401:
 *         description: Unauthorized - valid authentication token required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: User not found
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
 */
router.get('/statistics',
  userController.getStatistics
);

/**
 * @swagger
 * /api/users/activity:
 *   get:
 *     summary: Get user activity history
 *     description: Retrieve the recent activity and engagement history for the authenticated user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *         description: Maximum number of activity items to return
 *         example: 20
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         description: Number of activity items to skip (for pagination)
 *         example: 0
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [game, puzzle, study, achievement, all]
 *           default: all
 *         description: Filter activities by type
 *         example: game
 *       - in: query
 *         name: date_from
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter activities from this date (YYYY-MM-DD)
 *         example: "2024-01-01"
 *       - in: query
 *         name: date_to
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter activities to this date (YYYY-MM-DD)
 *         example: "2024-01-31"
 *     responses:
 *       200:
 *         description: User activity history retrieved successfully
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
 *                         activities:
 *                           type: array
 *                           description: List of user activities
 *                           items:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                                 description: Unique activity identifier
 *                                 example: "act_1234567890"
 *                               type:
 *                                 type: string
 *                                 enum: [game, puzzle, study, achievement, login, profile_update]
 *                                 description: Type of activity
 *                                 example: "game"
 *                               timestamp:
 *                                 type: string
 *                                 format: date-time
 *                                 description: When the activity occurred
 *                                 example: "2024-01-15T10:30:00Z"
 *                               description:
 *                                 type: string
 *                                 description: Human-readable description of the activity
 *                                 example: "Won a game against player_123 (Rating: 1580)"
 *                               details:
 *                                 type: object
 *                                 description: Activity-specific details
 *                                 properties:
 *                                   result:
 *                                     type: string
 *                                     enum: [win, loss, draw, solved, failed, completed]
 *                                     example: "win"
 *                                   opponent:
 *                                     type: string
 *                                     description: Opponent username (for games)
 *                                     example: "player_123"
 *                                   opponentRating:
 *                                     type: integer
 *                                     description: Opponent rating (for games)
 *                                     example: 1580
 *                                   ratingChange:
 *                                     type: integer
 *                                     description: Rating change from this activity
 *                                     example: 12
 *                                   duration:
 *                                     type: integer
 *                                     description: Activity duration in seconds
 *                                     example: 1245
 *                                   puzzleDifficulty:
 *                                     type: string
 *                                     enum: [beginner, intermediate, advanced, expert]
 *                                     description: Puzzle difficulty (for puzzles)
 *                                     example: "intermediate"
 *                                   studyTopic:
 *                                     type: string
 *                                     description: Study topic (for study sessions)
 *                                     example: "Endgame Fundamentals"
 *                                   achievementName:
 *                                     type: string
 *                                     description: Achievement name (for achievements)
 *                                     example: "Puzzle Master"
 *                               metadata:
 *                                 type: object
 *                                 description: Additional metadata
 *                                 properties:
 *                                   source:
 *                                     type: string
 *                                     enum: [web, mobile, desktop]
 *                                     example: "web"
 *                                   gameMode:
 *                                     type: string
 *                                     enum: [rapid, blitz, bullet, classical]
 *                                     example: "rapid"
 *                                   timeControl:
 *                                     type: string
 *                                     example: "10+5"
 *                         pagination:
 *                           type: object
 *                           description: Pagination information
 *                           properties:
 *                             total:
 *                               type: integer
 *                               description: Total number of activities
 *                               example: 156
 *                             limit:
 *                               type: integer
 *                               description: Current page limit
 *                               example: 20
 *                             offset:
 *                               type: integer
 *                               description: Current page offset
 *                               example: 0
 *                             hasMore:
 *                               type: boolean
 *                               description: Whether there are more activities to fetch
 *                               example: true
 *                         summary:
 *                           type: object
 *                           description: Activity summary for the requested period
 *                           properties:
 *                             totalActivities:
 *                               type: integer
 *                               example: 45
 *                             gamesPlayed:
 *                               type: integer
 *                               example: 15
 *                             puzzlesSolved:
 *                               type: integer
 *                               example: 28
 *                             studySessions:
 *                               type: integer
 *                               example: 2
 *                             achievementsUnlocked:
 *                               type: integer
 *                               example: 1
 *                             totalTimeSpent:
 *                               type: integer
 *                               description: Total time spent in minutes
 *                               example: 420
 *       400:
 *         description: Bad request - invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               invalid_parameters:
 *                 summary: Invalid query parameters
 *                 value:
 *                   success: false
 *                   error: "Validation error"
 *                   details: [
 *                     {
 *                       "field": "limit",
 *                       "message": "Limit must be between 1 and 100"
 *                     }
 *                   ]
 *       401:
 *         description: Unauthorized - valid authentication token required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: User not found
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
 */
router.get('/activity',
  userController.getActivity
);

export default router;