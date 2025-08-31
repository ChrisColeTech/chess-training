import express from 'express';
import { Database } from '../utils/database';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';

const router = express.Router();
const db = Database.getInstance();

/**
 * @swagger
 * components:
 *   schemas:
 *     UserPuzzlePreferences:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the preferences
 *         user_id:
 *           type: integer
 *           description: ID of the user these preferences belong to
 *         preferred_themes:
 *           type: string
 *           description: JSON string of preferred puzzle themes
 *           example: '["tactics", "endgame", "opening"]'
 *         difficulty_range_min:
 *           type: integer
 *           description: Minimum difficulty rating
 *           minimum: 0
 *           maximum: 3000
 *         difficulty_range_max:
 *           type: integer
 *           description: Maximum difficulty rating
 *           minimum: 0
 *           maximum: 3000
 *         time_limit:
 *           type: integer
 *           description: Time limit for puzzles in seconds
 *           minimum: 0
 *         show_hints:
 *           type: boolean
 *           description: Whether to show hints during puzzles
 *         auto_next_puzzle:
 *           type: boolean
 *           description: Whether to automatically load next puzzle
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *     UserPuzzlePreferencesResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           $ref: '#/components/schemas/UserPuzzlePreferences'
 *     UserPuzzlePreferencesUpdateRequest:
 *       type: object
 *       properties:
 *         preferred_themes:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of preferred puzzle themes
 *           example: ["tactics", "endgame", "opening"]
 *         difficulty_range_min:
 *           type: integer
 *           description: Minimum difficulty rating
 *           minimum: 0
 *           maximum: 3000
 *           example: 1000
 *         difficulty_range_max:
 *           type: integer
 *           description: Maximum difficulty rating
 *           minimum: 0
 *           maximum: 3000
 *           example: 2000
 *         time_limit:
 *           type: integer
 *           description: Time limit for puzzles in seconds
 *           minimum: 0
 *           example: 300
 *         show_hints:
 *           type: boolean
 *           description: Whether to show hints during puzzles
 *           example: true
 *         auto_next_puzzle:
 *           type: boolean
 *           description: Whether to automatically load next puzzle
 *           example: true
 *       required:
 *         - preferred_themes
 *         - difficulty_range_min
 *         - difficulty_range_max
 *         - time_limit
 *         - show_hints
 *         - auto_next_puzzle
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         error:
 *           type: string
 *           description: Error message
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/user-puzzle-preferences:
 *   get:
 *     summary: Get user puzzle preferences
 *     description: Retrieve the authenticated user's puzzle preferences. Creates default preferences if none exist.
 *     tags:
 *       - User Puzzle Preferences
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user puzzle preferences
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPuzzlePreferencesResponse'
 *             example:
 *               success: true
 *               data:
 *                 id: 1
 *                 user_id: 123
 *                 preferred_themes: '["tactics", "endgame"]'
 *                 difficulty_range_min: 1000
 *                 difficulty_range_max: 2000
 *                 time_limit: 300
 *                 show_hints: true
 *                 auto_next_puzzle: true
 *                 created_at: "2023-01-01T00:00:00Z"
 *                 updated_at: "2023-01-01T00:00:00Z"
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Authentication required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Failed to fetch user puzzle preferences"
 */
router.get('/', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }
    
    const preferences = await db.get('SELECT * FROM user_puzzle_preferences WHERE user_id = ?', [userId]);
    
    if (!preferences) {
      // Create default preferences if none exist
      const defaultPrefs = {
        user_id: userId,
        preferred_themes: JSON.stringify(['tactics', 'endgame']),
        difficulty_range_min: 1000,
        difficulty_range_max: 2000,
        time_limit: 300,
        show_hints: 1,
        auto_next_puzzle: 1
      };
      
      const prefId = await db.run(`
        INSERT INTO user_puzzle_preferences (user_id, preferred_themes, difficulty_range_min, difficulty_range_max, time_limit, show_hints, auto_next_puzzle)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [defaultPrefs.user_id, defaultPrefs.preferred_themes, defaultPrefs.difficulty_range_min, defaultPrefs.difficulty_range_max, defaultPrefs.time_limit, defaultPrefs.show_hints, defaultPrefs.auto_next_puzzle]);
      
      const newPrefs = await db.get('SELECT * FROM user_puzzle_preferences WHERE id = ?', [prefId]);
      return res.json({
        success: true,
        data: newPrefs
      });
    }
    
    res.json({
      success: true,
      data: preferences
    });
  } catch (error) {
    console.error('Error fetching user puzzle preferences:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user puzzle preferences'
    });
  }
});

/**
 * @swagger
 * /api/user-puzzle-preferences:
 *   put:
 *     summary: Update user puzzle preferences
 *     description: Update the authenticated user's puzzle preferences. Creates new preferences if none exist.
 *     tags:
 *       - User Puzzle Preferences
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserPuzzlePreferencesUpdateRequest'
 *           example:
 *             preferred_themes: ["tactics", "endgame", "opening"]
 *             difficulty_range_min: 1200
 *             difficulty_range_max: 1800
 *             time_limit: 180
 *             show_hints: false
 *             auto_next_puzzle: true
 *     responses:
 *       200:
 *         description: Successfully updated user puzzle preferences
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPuzzlePreferencesResponse'
 *             example:
 *               success: true
 *               data:
 *                 id: 1
 *                 user_id: 123
 *                 preferred_themes: '["tactics", "endgame", "opening"]'
 *                 difficulty_range_min: 1200
 *                 difficulty_range_max: 1800
 *                 time_limit: 180
 *                 show_hints: false
 *                 auto_next_puzzle: true
 *                 created_at: "2023-01-01T00:00:00Z"
 *                 updated_at: "2023-01-02T00:00:00Z"
 *       400:
 *         description: Bad request - Invalid request body or validation errors
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Invalid difficulty range: minimum must be less than maximum"
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Authentication required"
 *       422:
 *         description: Unprocessable entity - Invalid data format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "preferred_themes must be an array of strings"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Failed to update user puzzle preferences"
 */
router.put('/', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }
    
    const { preferred_themes, difficulty_range_min, difficulty_range_max, time_limit, show_hints, auto_next_puzzle } = req.body;
    
    // Check if preferences exist
    const existing = await db.get('SELECT id FROM user_puzzle_preferences WHERE user_id = ?', [userId]);
    
    if (existing) {
      // Update existing preferences
      await db.run(`
        UPDATE user_puzzle_preferences 
        SET preferred_themes = ?, difficulty_range_min = ?, difficulty_range_max = ?, 
            time_limit = ?, show_hints = ?, auto_next_puzzle = ?, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ?
      `, [JSON.stringify(preferred_themes), difficulty_range_min, difficulty_range_max, time_limit, show_hints ? 1 : 0, auto_next_puzzle ? 1 : 0, userId]);
    } else {
      // Create new preferences
      await db.run(`
        INSERT INTO user_puzzle_preferences (user_id, preferred_themes, difficulty_range_min, difficulty_range_max, time_limit, show_hints, auto_next_puzzle)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [userId, JSON.stringify(preferred_themes), difficulty_range_min, difficulty_range_max, time_limit, show_hints ? 1 : 0, auto_next_puzzle ? 1 : 0]);
    }
    
    const updatedPrefs = await db.get('SELECT * FROM user_puzzle_preferences WHERE user_id = ?', [userId]);
    
    res.json({
      success: true,
      data: updatedPrefs
    });
  } catch (error) {
    console.error('Error updating user puzzle preferences:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update user puzzle preferences'
    });
  }
});

export default router;