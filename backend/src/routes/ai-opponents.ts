import express from 'express';
import { getAIOpponents, getAIOpponentById, createAIOpponent, updateAIOpponent, deleteAIOpponent, getBestMove, getAIOpponentsByLevel, getAIOpponentStats } from '../controllers/aiController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// GET /api/ai-opponents - Get all AI opponents
router.get('/', getAIOpponents);

// GET /api/ai-opponents/stats - Get AI opponent statistics
router.get('/stats', getAIOpponentStats);

// GET /api/ai-opponents/level/:level - Get opponents by skill level
router.get('/level/:level', getAIOpponentsByLevel);

// GET /api/ai-opponents/:id - Get specific AI opponent
router.get('/:id', getAIOpponentById);

// POST /api/ai-opponents - Create new AI opponent (admin only)
router.post('/', createAIOpponent);

// POST /api/ai-opponents/move - Get best move from AI
router.post('/move', getBestMove);

// PUT /api/ai-opponents/:id - Update AI opponent (admin only)
router.put('/:id', updateAIOpponent);

// DELETE /api/ai-opponents/:id - Delete AI opponent (admin only)
router.delete('/:id', deleteAIOpponent);

export default router;