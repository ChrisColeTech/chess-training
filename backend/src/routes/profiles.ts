import express from 'express';
import { Database } from '../utils/database';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';

const router = express.Router();

// GET /api/profiles/:userId - Get user profile (requires auth)
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

// GET /api/profiles/:userId/settings - Get user settings
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

// GET /api/profiles/:userId/progress - Get user progress
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

// GET /api/profiles/:userId/study-plans - Get user study plans
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

// GET /api/profiles/:userId/analytics - Get user analytics
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