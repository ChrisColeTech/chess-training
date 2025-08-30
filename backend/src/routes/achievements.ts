import express from 'express';
import { getAchievements, getAchievementById, getUserAchievements, earnAchievement, updateAchievementProgress, getUserAchievementStats, getAchievementCategories, checkAchievementEligibility, getAchievementsByCategory, getAchievementProgress, getRecentAchievements, getAchievementLeaderboard } from '../controllers/achievementController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// GET /api/achievements - Get all achievements
router.get('/', getAchievements);

// GET /api/achievements/categories - Get achievement categories
router.get('/categories', getAchievementCategories);

// GET /api/achievements/user - Get current user's achievements (requires auth) - Frontend compatibility
router.get('/user', authenticateToken, getUserAchievements);

// GET /api/achievements/user/me - Get current user's achievements (requires auth) - Backward compatibility
router.get('/user/me', authenticateToken, getUserAchievements);

// GET /api/achievements/user/me/stats - Get current user's achievement stats (requires auth)
router.get('/user/me/stats', authenticateToken, getUserAchievementStats);

// GET /api/achievements/:id - Get specific achievement
router.get('/:id', getAchievementById);

// GET /api/achievements/:id/eligibility - Check achievement eligibility (requires auth)
router.get('/:achievementId/eligibility', authenticateToken, checkAchievementEligibility);

// POST /api/achievements/:id/earn - Earn achievement (requires auth)
router.post('/:achievementId/earn', authenticateToken, earnAchievement);

// PUT /api/achievements/:id/progress - Update achievement progress (requires auth)
router.put('/:achievementId/progress', authenticateToken, updateAchievementProgress);

// Frontend compatibility routes
// GET /api/achievements/category/:category - Get achievements by category
router.get('/category/:category', getAchievementsByCategory);

// GET /api/achievements/:id/progress - Get achievement progress (requires auth)
router.get('/:achievementId/progress', authenticateToken, getAchievementProgress);

// POST /api/achievements/:id/claim - Claim achievement (requires auth) - Frontend compatibility
router.post('/:achievementId/claim', authenticateToken, earnAchievement);

// GET /api/achievements/recent - Get recent achievements (requires auth)
router.get('/recent', authenticateToken, getRecentAchievements);

// GET /api/achievements/leaderboard - Get achievement leaderboard
router.get('/leaderboard', getAchievementLeaderboard);

// GET /api/achievements/leaderboard/:achievementId - Get specific achievement leaderboard
router.get('/leaderboard/:achievementId', getAchievementLeaderboard);

export default router;