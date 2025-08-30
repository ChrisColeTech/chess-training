import express from 'express';
import { PuzzleController } from '../controllers/puzzleController';
import { authenticateToken } from '../middleware/auth';
import { body, param, validationResult } from 'express-validator';

const router = express.Router();
const puzzleController = new PuzzleController();

// Validation middleware
const validateRequest = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation error',
      details: errors.array()
    });
  }
  next();
};

// Public routes for browsing puzzles
router.get('/', puzzleController.getAllPuzzles);
router.get('/category/:category', puzzleController.getPuzzlesByCategory);
router.get('/difficulty/:difficulty', puzzleController.getPuzzlesByDifficulty);

// All other puzzle routes require authentication
router.use(authenticateToken);

// Get next puzzle
router.get('/next',
  puzzleController.getNextPuzzle
);

// Solve puzzle
router.post('/:puzzleId/solve',
  [
    param('puzzleId')
      .isUUID()
      .withMessage('Invalid puzzle ID format'),
    body('moves')
      .isArray({ min: 1 })
      .withMessage('Moves must be a non-empty array'),
    body('moves.*')
      .isString()
      .withMessage('Each move must be a string'),
    body('timeTaken')
      .isInt({ min: 0 })
      .withMessage('Time taken must be a non-negative integer')
  ],
  validateRequest,
  puzzleController.solvePuzzle
);

// Get hint
router.post('/:puzzleId/hint',
  [
    param('puzzleId')
      .isUUID()
      .withMessage('Invalid puzzle ID format')
  ],
  validateRequest,
  puzzleController.getHint
);

// Get puzzle statistics
router.get('/stats',
  puzzleController.getPuzzleStats
);

export default router;