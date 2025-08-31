import express from 'express';
import { Database } from '../utils/database';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';

const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     UserProfile:
 *       type: object
 *       properties:
 *         user_id:
 *           type: string
 *           description: Unique identifier for the user
 *         display_name:
 *           type: string
 *           description: User's display name
 *         avatar_url:
 *           type: string
 *           description: URL to user's avatar image
 *         bio:
 *           type: string
 *           description: User's biography
 *         location:
 *           type: string
 *           description: User's location
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Account creation timestamp
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Profile last updated timestamp
 *     UserSettings:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           setting_key:
 *             type: string
 *             description: Setting identifier
 *           setting_value:
 *             type: string
 *             description: Setting value
 *           updated_at:
 *             type: string
 *             format: date-time
 *             description: Setting last updated timestamp
 *     UserProgress:
 *       type: object
 *       properties:
 *         progress:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 description: Progress category (e.g., 'puzzles', 'games')
 *               level:
 *                 type: integer
 *                 description: Current level in category
 *               experience:
 *                 type: integer
 *                 description: Experience points earned
 *               completed_at:
 *                 type: string
 *                 format: date-time
 *                 description: Completion timestamp
 *         tracking:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               metric:
 *                 type: string
 *                 description: Tracked metric name
 *               value:
 *                 type: number
 *                 description: Metric value
 *               recorded_at:
 *                 type: string
 *                 format: date-time
 *                 description: Recording timestamp
 *     StudyPlan:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Study plan identifier
 *         name:
 *           type: string
 *           description: Study plan name
 *         description:
 *           type: string
 *           description: Study plan description
 *         target_rating:
 *           type: integer
 *           description: Target rating goal
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *     UserAnalytics:
 *       type: object
 *       properties:
 *         metric_name:
 *           type: string
 *           description: Analytics metric name
 *         value:
 *           type: number
 *           description: Metric value
 *         period:
 *           type: string
 *           description: Time period for the metric
 *         recorded_at:
 *           type: string
 *           format: date-time
 *           description: Recording timestamp
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         error:
 *           type: string
 *           description: Error message
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: object
 *           description: Response data
 */

/**
 * @swagger
 * /api/profiles/{userId}:
 *   get:
 *     tags:
 *       - Profiles
 *     summary: Get user profile
 *     description: Retrieves the profile information for a specific user. Users can only access their own profile.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the user
 *         example: "user_123456"
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/UserProfile'
 *             example:
 *               success: true
 *               data:
 *                 user_id: "user_123456"
 *                 display_name: "ChessMaster2024"
 *                 avatar_url: "https://example.com/avatar.jpg"
 *                 bio: "Chess enthusiast and puzzle solver"
 *                 location: "New York, NY"
 *                 created_at: "2024-01-01T00:00:00Z"
 *                 updated_at: "2024-01-15T12:00:00Z"
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Authentication token required"
 *       403:
 *         description: Unauthorized access to user profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Unauthorized access to user profile"
 *       404:
 *         description: User profile not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "User profile not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Failed to fetch user profile"
 */
router.get('/:userId', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const db = Database.getInstance();
    const { userId } = req.params;
    
    if (req.user?.userId !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Unauthorized access to user profile'
      });
    }
    
    const profile = await db.get('SELECT * FROM user_profiles WHERE user_id = ?', [userId]);
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'User profile not found'
      });
    }
    
    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user profile'
    });
  }
});

/**
 * @swagger
 * /api/profiles/{userId}/settings:
 *   get:
 *     tags:
 *       - Profiles
 *     summary: Get user settings
 *     description: Retrieves all settings for a specific user. Users can only access their own settings.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the user
 *         example: "user_123456"
 *     responses:
 *       200:
 *         description: User settings retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/UserSettings'
 *             example:
 *               success: true
 *               data:
 *                 - setting_key: "theme"
 *                   setting_value: "dark"
 *                   updated_at: "2024-01-10T10:00:00Z"
 *                 - setting_key: "notifications"
 *                   setting_value: "enabled"
 *                   updated_at: "2024-01-05T15:30:00Z"
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Authentication token required"
 *       403:
 *         description: Unauthorized access to user settings
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Unauthorized access to user settings"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Failed to fetch user settings"
 */
router.get('/:userId/settings', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const db = Database.getInstance();
    const { userId } = req.params;
    
    if (req.user?.userId !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Unauthorized access to user settings'
      });
    }
    
    const settings = await db.getAll('SELECT * FROM user_settings WHERE user_id = ?', [userId]);
    
    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    console.error('Error fetching user settings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user settings'
    });
  }
});

/**
 * @swagger
 * /api/profiles/{userId}/progress:
 *   get:
 *     tags:
 *       - Profiles
 *     summary: Get user progress
 *     description: Retrieves progress data and tracking information for a specific user. Users can only access their own progress.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the user
 *         example: "user_123456"
 *     responses:
 *       200:
 *         description: User progress retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/UserProgress'
 *             example:
 *               success: true
 *               data:
 *                 progress:
 *                   - category: "puzzles"
 *                     level: 15
 *                     experience: 2500
 *                     completed_at: "2024-01-20T14:30:00Z"
 *                   - category: "games"
 *                     level: 8
 *                     experience: 1200
 *                     completed_at: "2024-01-18T09:15:00Z"
 *                 tracking:
 *                   - metric: "puzzle_accuracy"
 *                     value: 0.85
 *                     recorded_at: "2024-01-20T20:00:00Z"
 *                   - metric: "games_won"
 *                     value: 45
 *                     recorded_at: "2024-01-20T20:00:00Z"
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Authentication token required"
 *       403:
 *         description: Unauthorized access to user progress
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Unauthorized access to user progress"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Failed to fetch user progress"
 */
router.get('/:userId/progress', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const db = Database.getInstance();
    const { userId } = req.params;
    
    if (req.user?.userId !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Unauthorized access to user progress'
      });
    }
    
    const progress = await db.getAll('SELECT * FROM user_progress WHERE user_id = ?', [userId]);
    const tracking = await db.getAll('SELECT * FROM user_progress_tracking WHERE user_id = ?', [userId]);
    
    res.json({
      success: true,
      data: {
        progress,
        tracking
      }
    });
  } catch (error) {
    console.error('Error fetching user progress:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user progress'
    });
  }
});

/**
 * @swagger
 * /api/profiles/{userId}/study-plans:
 *   get:
 *     tags:
 *       - Profiles
 *     summary: Get user study plans
 *     description: Retrieves all study plans for a specific user. Users can only access their own study plans.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the user
 *         example: "user_123456"
 *     responses:
 *       200:
 *         description: User study plans retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/StudyPlan'
 *             example:
 *               success: true
 *               data:
 *                 - id: "plan_001"
 *                   name: "Tactical Mastery"
 *                   description: "Focus on improving tactical pattern recognition"
 *                   target_rating: 1500
 *                   created_at: "2024-01-01T12:00:00Z"
 *                   updated_at: "2024-01-15T16:30:00Z"
 *                 - id: "plan_002"
 *                   name: "Endgame Excellence"
 *                   description: "Master essential endgame techniques"
 *                   target_rating: 1600
 *                   created_at: "2024-01-10T08:00:00Z"
 *                   updated_at: "2024-01-20T11:15:00Z"
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Authentication token required"
 *       403:
 *         description: Unauthorized access to user study plans
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Unauthorized access to user study plans"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Failed to fetch user study plans"
 */
router.get('/:userId/study-plans', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const db = Database.getInstance();
    const { userId } = req.params;
    
    if (req.user?.userId !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Unauthorized access to user study plans'
      });
    }
    
    const studyPlans = await db.getAll('SELECT * FROM user_study_plans WHERE user_id = ?', [userId]);
    
    res.json({
      success: true,
      data: studyPlans
    });
  } catch (error) {
    console.error('Error fetching user study plans:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user study plans'
    });
  }
});

/**
 * @swagger
 * /api/profiles/{userId}/analytics:
 *   get:
 *     tags:
 *       - Profiles
 *     summary: Get user analytics
 *     description: Retrieves analytics data for a specific user including performance metrics and insights. Users can only access their own analytics.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the user
 *         example: "user_123456"
 *     responses:
 *       200:
 *         description: User analytics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/UserAnalytics'
 *             example:
 *               success: true
 *               data:
 *                 - metric_name: "puzzle_success_rate"
 *                   value: 0.87
 *                   period: "last_30_days"
 *                   recorded_at: "2024-01-20T23:59:59Z"
 *                 - metric_name: "average_game_duration"
 *                   value: 1250
 *                   period: "last_30_days"
 *                   recorded_at: "2024-01-20T23:59:59Z"
 *                 - metric_name: "rating_improvement"
 *                   value: 150
 *                   period: "last_30_days"
 *                   recorded_at: "2024-01-20T23:59:59Z"
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Authentication token required"
 *       403:
 *         description: Unauthorized access to user analytics
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Unauthorized access to user analytics"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Failed to fetch user analytics"
 */
router.get('/:userId/analytics', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const db = Database.getInstance();
    const { userId } = req.params;
    
    if (req.user?.userId !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Unauthorized access to user analytics'
      });
    }
    
    const analytics = await db.getAll('SELECT * FROM user_analytics WHERE user_id = ?', [userId]);
    
    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    console.error('Error fetching user analytics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user analytics'
    });
  }
});

export default router;