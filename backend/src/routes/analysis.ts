import express from 'express';
import { getAnalysisPositions, getAnalysisPositionById, createAnalysisPosition, getEndgamePositions, getEndgamePositionById, createEndgamePosition, analyzePosition, getStoredAnalysis, searchPositions, getPositionStatistics, getAnalysisCategories, getEndgameCategories, getEndgamePositionsByMaterial, analyzeGame, getBestMove, getOpeningIdentification, evaluatePosition } from '../controllers/analysisController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// GET /api/analysis/positions - Get analysis positions
router.get('/positions', getAnalysisPositions);

// GET /api/analysis/positions/categories - Get analysis categories
router.get('/positions/categories', getAnalysisCategories);

// GET /api/analysis/positions/:id - Get specific analysis position
router.get('/positions/:id', getAnalysisPositionById);

// GET /api/analysis/endgame - Get endgame positions
router.get('/endgame', getEndgamePositions);

// GET /api/analysis/endgame/categories - Get endgame categories
router.get('/endgame/categories', getEndgameCategories);

// GET /api/analysis/endgame/material/:material - Get endgame positions by material
router.get('/endgame/material/:material', getEndgamePositionsByMaterial);

// GET /api/analysis/endgame/:id - Get specific endgame position
router.get('/endgame/:id', getEndgamePositionById);

// GET /api/analysis/search - Search positions
router.get('/search', searchPositions);

// GET /api/analysis/stats - Get position statistics
router.get('/stats', getPositionStatistics);

// GET /api/analysis/stored/:fen - Get stored analysis for position
router.get('/stored/:fen', getStoredAnalysis);

// POST /api/analysis/positions - Create analysis position (admin only)
router.post('/positions', createAnalysisPosition);

// POST /api/analysis/endgame - Create endgame position (admin only)
router.post('/endgame', createEndgamePosition);

// POST /api/analysis/analyze - Analyze position with engine
router.post('/analyze', analyzePosition);

// Frontend compatibility endpoints
// POST /api/analysis/position - Analyze position (frontend compatibility)
router.post('/position', authenticateToken, analyzePosition);

// POST /api/analysis/game - Analyze entire game
router.post('/game', authenticateToken, analyzeGame);

// POST /api/analysis/best-move - Get best move for position  
router.post('/best-move', authenticateToken, getBestMove);

// POST /api/analysis/opening - Identify opening from moves
router.post('/opening', getOpeningIdentification);

// POST /api/analysis/evaluate - Evaluate position
router.post('/evaluate', authenticateToken, evaluatePosition);

export default router;