import express from 'express';
import { getTutorials, getTutorialById, createTutorial, updateTutorial, deleteTutorial, getTutorialsByCategory, getTutorialsByDifficulty, getTutorialSteps, createTutorialStep, startTutorial, completeStep, getUserTutorialProgress, getTutorialCategories } from '../controllers/tutorialController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// GET /api/tutorials - Get all tutorials
router.get('/', getTutorials);

// GET /api/tutorials/categories - Get tutorial categories
router.get('/categories', getTutorialCategories);

// GET /api/tutorials/category/:category - Get tutorials by category
router.get('/category/:category', getTutorialsByCategory);

// GET /api/tutorials/difficulty/:difficulty - Get tutorials by difficulty
router.get('/difficulty/:difficulty', getTutorialsByDifficulty);

// GET /api/tutorials/:id - Get specific tutorial with steps
router.get('/:id', getTutorialById);

// GET /api/tutorials/:tutorialId/steps - Get tutorial steps
router.get('/:tutorialId/steps', getTutorialSteps);

// GET /api/tutorials/progress/:tutorialId - Get user tutorial progress (requires auth)
router.get('/progress/:tutorialId', authenticateToken, getUserTutorialProgress);

// GET /api/tutorials/progress - Get all user tutorial progress (requires auth)
router.get('/progress', authenticateToken, getUserTutorialProgress);

// POST /api/tutorials - Create new tutorial (admin only)
router.post('/', createTutorial);

// POST /api/tutorials/:tutorialId/steps - Create tutorial step (admin only)
router.post('/:tutorialId/steps', createTutorialStep);

// POST /api/tutorials/:tutorialId/start - Start tutorial (requires auth)
router.post('/:tutorialId/start', authenticateToken, startTutorial);

// POST /api/tutorials/:tutorialId/steps/:stepId/complete - Complete tutorial step (requires auth)
router.post('/:tutorialId/steps/:stepId/complete', authenticateToken, completeStep);

// PUT /api/tutorials/:id - Update tutorial (admin only)
router.put('/:id', updateTutorial);

// DELETE /api/tutorials/:id - Delete tutorial (admin only)
router.delete('/:id', deleteTutorial);

export default router;