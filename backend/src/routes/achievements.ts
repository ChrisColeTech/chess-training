import express from 'express';
import { getAchievements, getAchievementById, getUserAchievements, earnAchievement, updateAchievementProgress, getUserAchievementStats, getAchievementCategories, checkAchievementEligibility, getAchievementsByCategory, getAchievementProgress, getRecentAchievements, getAchievementLeaderboard } from '../controllers/achievementController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Achievement:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the achievement
 *         name:
 *           type: string
 *           description: Name of the achievement
 *         description:
 *           type: string
 *           description: Description of the achievement
 *         category:
 *           type: string
 *           description: Category of the achievement
 *         difficulty_level:
 *           type: string
 *           description: Difficulty level of the achievement
 *         criteria:
 *           type: object
 *           description: JSON object containing achievement criteria
 *         points:
 *           type: integer
 *           description: Points awarded for completing the achievement
 *         badge_icon:
 *           type: string
 *           nullable: true
 *           description: Icon for the achievement badge
 *         badge_color:
 *           type: string
 *           nullable: true
 *           description: Color of the achievement badge
 *         is_secret:
 *           type: boolean
 *           description: Whether the achievement is secret
 *         is_active:
 *           type: boolean
 *           description: Whether the achievement is active
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the achievement was created
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the achievement was last updated
 *     
 *     UserAchievement:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the user achievement record
 *         user_id:
 *           type: string
 *           description: User identifier
 *         achievement_id:
 *           type: string
 *           description: Achievement identifier
 *         progress:
 *           type: number
 *           description: Progress towards completion (0-100)
 *         is_earned:
 *           type: boolean
 *           description: Whether the achievement has been earned
 *         earned_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Timestamp when the achievement was earned
 *         metadata:
 *           type: object
 *           nullable: true
 *           description: Additional metadata about the achievement progress
 *         achievement:
 *           $ref: '#/components/schemas/Achievement'
 *     
 *     AchievementStats:
 *       type: object
 *       properties:
 *         total_achievements:
 *           type: integer
 *           description: Total number of achievements available
 *         earned_achievements:
 *           type: integer
 *           description: Number of achievements earned by the user
 *         total_points:
 *           type: integer
 *           description: Total points earned from achievements
 *         completion_percentage:
 *           type: number
 *           description: Percentage of achievements completed
 *         categories:
 *           type: object
 *           description: Achievement statistics by category
 *     
 *     AchievementEligibility:
 *       type: object
 *       properties:
 *         eligible:
 *           type: boolean
 *           description: Whether the user is eligible for the achievement
 *         progress:
 *           type: number
 *           description: Current progress towards the achievement
 *         requirements_met:
 *           type: array
 *           items:
 *             type: string
 *           description: List of requirements that have been met
 *         requirements_pending:
 *           type: array
 *           items:
 *             type: string
 *           description: List of requirements that are still pending
 *     
 *     LeaderboardEntry:
 *       type: object
 *       properties:
 *         user_id:
 *           type: string
 *           description: User identifier
 *         username:
 *           type: string
 *           description: Username of the user
 *         earned_at:
 *           type: string
 *           format: date-time
 *           description: When the achievement was earned
 *         rank:
 *           type: integer
 *           description: User's rank on the leaderboard
 *         total_points:
 *           type: integer
 *           description: Total achievement points
 *     
 *     ApiResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Whether the request was successful
 *         data:
 *           description: Response data
 *         message:
 *           type: string
 *           description: Optional success message
 *         error:
 *           type: string
 *           description: Error message if request failed
 *     
 *     PaginatedAchievementResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/ApiResponse'
 *         - type: object
 *           properties:
 *             data:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Achievement'
 *             total:
 *               type: integer
 *               description: Total number of achievements
 *             limit:
 *               type: integer
 *               description: Number of items per page
 *             offset:
 *               type: integer
 *               description: Number of items skipped
 *     
 *     ProgressUpdate:
 *       type: object
 *       properties:
 *         progress:
 *           type: number
 *           minimum: 0
 *           maximum: 100
 *           description: Progress value (0-100)
 *         metadata:
 *           type: object
 *           description: Additional metadata about the progress
 *   
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/achievements:
 *   get:
 *     summary: Get all achievements
 *     description: Retrieve a paginated list of achievements with optional filtering
 *     tags:
 *       - Achievements
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by achievement category
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *         description: Filter by difficulty level
 *       - in: query
 *         name: active
 *         schema:
 *           type: boolean
 *         description: Filter by active status
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *           minimum: 1
 *           maximum: 100
 *         description: Number of achievements to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *           minimum: 0
 *         description: Number of achievements to skip
 *     responses:
 *       200:
 *         description: Successfully retrieved achievements
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedAchievementResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch achievements"
 */
// GET /api/achievements - Get all achievements
router.get('/', getAchievements);

/**
 * @swagger
 * /api/achievements/categories:
 *   get:
 *     summary: Get achievement categories
 *     description: Retrieve all available achievement categories
 *     tags:
 *       - Achievements
 *     responses:
 *       200:
 *         description: Successfully retrieved achievement categories
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
 *                       example: ["puzzle", "game", "training", "streak"]
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch achievement categories"
 */
// GET /api/achievements/categories - Get achievement categories
router.get('/categories', getAchievementCategories);

/**
 * @swagger
 * /api/achievements/user:
 *   get:
 *     summary: Get current user's achievements
 *     description: Retrieve achievements for the authenticated user with optional filtering
 *     tags:
 *       - Achievements
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: earned
 *         schema:
 *           type: boolean
 *         description: Filter by earned status
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by achievement category
 *       - in: query
 *         name: dateFrom
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter achievements earned from this date
 *       - in: query
 *         name: dateTo
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter achievements earned until this date
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *           minimum: 1
 *           maximum: 100
 *         description: Number of achievements to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *           minimum: 0
 *         description: Number of achievements to skip
 *     responses:
 *       200:
 *         description: Successfully retrieved user achievements
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
 *                         $ref: '#/components/schemas/UserAchievement'
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Authentication required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch user achievements"
 */
// GET /api/achievements/user - Get current user's achievements (requires auth) - Frontend compatibility
router.get('/user', authenticateToken, getUserAchievements);

/**
 * @swagger
 * /api/achievements/user/me:
 *   get:
 *     summary: Get current user's achievements (backward compatibility)
 *     description: Retrieve achievements for the authenticated user - same as /user endpoint
 *     tags:
 *       - Achievements
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: earned
 *         schema:
 *           type: boolean
 *         description: Filter by earned status
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by achievement category
 *       - in: query
 *         name: dateFrom
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter achievements earned from this date
 *       - in: query
 *         name: dateTo
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter achievements earned until this date
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *           minimum: 1
 *           maximum: 100
 *         description: Number of achievements to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *           minimum: 0
 *         description: Number of achievements to skip
 *     responses:
 *       200:
 *         description: Successfully retrieved user achievements
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
 *                         $ref: '#/components/schemas/UserAchievement'
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Authentication required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch user achievements"
 */
// GET /api/achievements/user/me - Get current user's achievements (requires auth) - Backward compatibility
router.get('/user/me', authenticateToken, getUserAchievements);

/**
 * @swagger
 * /api/achievements/user/me/stats:
 *   get:
 *     summary: Get current user's achievement statistics
 *     description: Retrieve comprehensive achievement statistics for the authenticated user
 *     tags:
 *       - Achievements
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter statistics by achievement category
 *     responses:
 *       200:
 *         description: Successfully retrieved user achievement statistics
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/AchievementStats'
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Authentication required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch user achievement stats"
 */
// GET /api/achievements/user/me/stats - Get current user's achievement stats (requires auth)
router.get('/user/me/stats', authenticateToken, getUserAchievementStats);

/**
 * @swagger
 * /api/achievements/{id}:
 *   get:
 *     summary: Get specific achievement by ID
 *     description: Retrieve detailed information about a specific achievement
 *     tags:
 *       - Achievements
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The achievement ID
 *     responses:
 *       200:
 *         description: Successfully retrieved achievement
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Achievement'
 *       404:
 *         description: Achievement not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Achievement not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch achievement"
 */
// GET /api/achievements/:id - Get specific achievement
router.get('/:id', getAchievementById);

/**
 * @swagger
 * /api/achievements/{achievementId}/eligibility:
 *   get:
 *     summary: Check achievement eligibility
 *     description: Check if the authenticated user is eligible for a specific achievement
 *     tags:
 *       - Achievements
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: achievementId
 *         required: true
 *         schema:
 *           type: string
 *         description: The achievement ID
 *     responses:
 *       200:
 *         description: Successfully checked achievement eligibility
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/AchievementEligibility'
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Authentication required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Failed to check achievement eligibility"
 */
// GET /api/achievements/:id/eligibility - Check achievement eligibility (requires auth)
router.get('/:achievementId/eligibility', authenticateToken, checkAchievementEligibility);

/**
 * @swagger
 * /api/achievements/{achievementId}/earn:
 *   post:
 *     summary: Earn achievement
 *     description: Mark an achievement as earned for the authenticated user
 *     tags:
 *       - Achievements
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: achievementId
 *         required: true
 *         schema:
 *           type: string
 *         description: The achievement ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               progress:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 100
 *                 description: Progress value (0-100)
 *               metadata:
 *                 type: object
 *                 description: Additional metadata about earning the achievement
 *     responses:
 *       200:
 *         description: Achievement earned successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/UserAchievement'
 *                     message:
 *                       type: string
 *                       example: "Achievement earned successfully"
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Authentication required"
 *       404:
 *         description: Achievement not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Achievement not found"
 *       409:
 *         description: Achievement already earned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Achievement already earned"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Failed to earn achievement"
 */
// POST /api/achievements/:id/earn - Earn achievement (requires auth)
router.post('/:achievementId/earn', authenticateToken, earnAchievement);

/**
 * @swagger
 * /api/achievements/{achievementId}/progress:
 *   put:
 *     summary: Update achievement progress
 *     description: Update progress towards an achievement for the authenticated user
 *     tags:
 *       - Achievements
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: achievementId
 *         required: true
 *         schema:
 *           type: string
 *         description: The achievement ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProgressUpdate'
 *     responses:
 *       200:
 *         description: Achievement progress updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/UserAchievement'
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Authentication required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Failed to update achievement progress"
 */
// PUT /api/achievements/:id/progress - Update achievement progress (requires auth)
router.put('/:achievementId/progress', authenticateToken, updateAchievementProgress);

/**
 * @swagger
 * /api/achievements/category/{category}:
 *   get:
 *     summary: Get achievements by category
 *     description: Retrieve all achievements belonging to a specific category
 *     tags:
 *       - Achievements
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: The achievement category
 *         example: "puzzle"
 *     responses:
 *       200:
 *         description: Successfully retrieved achievements by category
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
 *                         $ref: '#/components/schemas/Achievement'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch achievements by category"
 */
// Frontend compatibility routes
// GET /api/achievements/category/:category - Get achievements by category
router.get('/category/:category', getAchievementsByCategory);

/**
 * @swagger
 * /api/achievements/{achievementId}/progress:
 *   get:
 *     summary: Get achievement progress
 *     description: Get the current progress for a specific achievement for the authenticated user
 *     tags:
 *       - Achievements
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: achievementId
 *         required: true
 *         schema:
 *           type: string
 *         description: The achievement ID
 *     responses:
 *       200:
 *         description: Successfully retrieved achievement progress
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
 *                         progress:
 *                           type: number
 *                           description: Current progress (0-100)
 *                         is_earned:
 *                           type: boolean
 *                           description: Whether the achievement is earned
 *                         earned_at:
 *                           type: string
 *                           format: date-time
 *                           nullable: true
 *                           description: When the achievement was earned
 *                         metadata:
 *                           type: object
 *                           nullable: true
 *                           description: Additional progress metadata
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Authentication required"
 *       404:
 *         description: Achievement not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Achievement not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch achievement progress"
 */
// GET /api/achievements/:id/progress - Get achievement progress (requires auth)
router.get('/:achievementId/progress', authenticateToken, getAchievementProgress);

/**
 * @swagger
 * /api/achievements/{achievementId}/claim:
 *   post:
 *     summary: Claim achievement (frontend compatibility)
 *     description: Claim/earn an achievement for the authenticated user - alias for earn endpoint
 *     tags:
 *       - Achievements
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: achievementId
 *         required: true
 *         schema:
 *           type: string
 *         description: The achievement ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               progress:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 100
 *                 description: Progress value (0-100)
 *               metadata:
 *                 type: object
 *                 description: Additional metadata about claiming the achievement
 *     responses:
 *       200:
 *         description: Achievement claimed successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/UserAchievement'
 *                     message:
 *                       type: string
 *                       example: "Achievement earned successfully"
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Authentication required"
 *       404:
 *         description: Achievement not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Achievement not found"
 *       409:
 *         description: Achievement already earned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Achievement already earned"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Failed to earn achievement"
 */
// POST /api/achievements/:id/claim - Claim achievement (requires auth) - Frontend compatibility
router.post('/:achievementId/claim', authenticateToken, earnAchievement);

/**
 * @swagger
 * /api/achievements/recent:
 *   get:
 *     summary: Get recent achievements
 *     description: Retrieve recently earned achievements for the authenticated user
 *     tags:
 *       - Achievements
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *           minimum: 1
 *           maximum: 50
 *         description: Number of recent achievements to return
 *     responses:
 *       200:
 *         description: Successfully retrieved recent achievements
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
 *                         $ref: '#/components/schemas/UserAchievement'
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Authentication required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch recent achievements"
 */
// GET /api/achievements/recent - Get recent achievements (requires auth)
router.get('/recent', authenticateToken, getRecentAchievements);

/**
 * @swagger
 * /api/achievements/leaderboard:
 *   get:
 *     summary: Get achievement leaderboard
 *     description: Retrieve the global achievement leaderboard showing top performers
 *     tags:
 *       - Achievements
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *           minimum: 1
 *           maximum: 100
 *         description: Number of leaderboard entries to return
 *     responses:
 *       200:
 *         description: Successfully retrieved achievement leaderboard
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
 *                         $ref: '#/components/schemas/LeaderboardEntry'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch achievement leaderboard"
 */
// GET /api/achievements/leaderboard - Get achievement leaderboard
router.get('/leaderboard', getAchievementLeaderboard);

/**
 * @swagger
 * /api/achievements/leaderboard/{achievementId}:
 *   get:
 *     summary: Get specific achievement leaderboard
 *     description: Retrieve the leaderboard for a specific achievement showing who earned it first
 *     tags:
 *       - Achievements
 *     parameters:
 *       - in: path
 *         name: achievementId
 *         required: true
 *         schema:
 *           type: string
 *         description: The achievement ID
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *           minimum: 1
 *           maximum: 100
 *         description: Number of leaderboard entries to return
 *     responses:
 *       200:
 *         description: Successfully retrieved specific achievement leaderboard
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
 *                         $ref: '#/components/schemas/LeaderboardEntry'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch achievement leaderboard"
 */
// GET /api/achievements/leaderboard/:achievementId - Get specific achievement leaderboard
router.get('/leaderboard/:achievementId', getAchievementLeaderboard);

export default router;