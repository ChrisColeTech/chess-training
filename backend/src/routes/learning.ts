import express from 'express';
import { getLearningPaths, getLearningPathById, createLearningPath, updateLearningPath, getLearningModules, getLearningModuleById, createLearningModule, startLearningPath, updateModuleProgress, getUserLearningProgress, getLearningPathStats, getLearningCategories } from '../controllers/learningController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// GET /api/learning/paths - Get all learning paths
router.get('/paths', getLearningPaths);

// GET /api/learning/paths/categories - Get learning path categories
router.get('/paths/categories', getLearningCategories);

// GET /api/learning/paths/:id - Get specific learning path
router.get('/paths/:id', getLearningPathById);

// GET /api/learning/paths/:learningPathId/stats - Get learning path stats for user (requires auth)
router.get('/paths/:learningPathId/stats', authenticateToken, getLearningPathStats);

// GET /api/learning/modules - Get all learning modules
router.get('/modules', getLearningModules);

// GET /api/learning/modules/:id - Get specific learning module
router.get('/modules/:id', getLearningModuleById);

// GET /api/learning/progress - Get user learning progress (requires auth)
router.get('/progress', authenticateToken, getUserLearningProgress);

// GET /api/learning/progress/:learningPathId - Get user progress for specific path (requires auth)
router.get('/progress/:learningPathId', authenticateToken, getUserLearningProgress);

// POST /api/learning/paths - Create new learning path (admin only)
router.post('/paths', createLearningPath);

// POST /api/learning/modules - Create new learning module (admin only)
router.post('/modules', createLearningModule);

// POST /api/learning/paths/:learningPathId/start - Start learning path (requires auth)
router.post('/paths/:learningPathId/start', authenticateToken, startLearningPath);

// PUT /api/learning/paths/:id - Update learning path (admin only)
router.put('/paths/:id', updateLearningPath);

// PUT /api/learning/modules/:moduleId/progress - Update module progress (requires auth)
router.put('/modules/:moduleId/progress', authenticateToken, updateModuleProgress);

export default router;