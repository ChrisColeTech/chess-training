import express from 'express';
import { Database } from '../utils/database';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';

const router = express.Router();
const db = Database.getInstance();

// GET /api/user-puzzle-preferences - Get user puzzle preferences (requires auth)
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

// PUT /api/user-puzzle-preferences - Update user puzzle preferences (requires auth)
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