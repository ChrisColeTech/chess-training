import express from 'express';
import { GameController } from '../controllers/gameController';
import { authenticateToken } from '../middleware/auth';
import { body, param, validationResult } from 'express-validator';

const router = express.Router();
const gameController = new GameController();

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

// All game routes require authentication
router.use(authenticateToken);

// Create game
router.post('/create',
  [
    body('aiLevel')
      .isInt({ min: 1, max: 5 })
      .withMessage('AI level must be between 1 and 5'),
    body('color')
      .isIn(['white', 'black', 'random'])
      .withMessage('Color must be white, black, or random'),
    body('timeControl')
      .optional()
      .isString()
      .withMessage('Time control must be a string')
  ],
  validateRequest,
  gameController.createGame
);

// Make move
router.post('/:gameId/move',
  [
    param('gameId')
      .isUUID()
      .withMessage('Invalid game ID format'),
    body('move.from')
      .matches(/^[a-h][1-8]$/)
      .withMessage('From square must be in format like e2'),
    body('move.to')
      .matches(/^[a-h][1-8]$/)
      .withMessage('To square must be in format like e4'),
    body('move.promotion')
      .optional()
      .isIn(['q', 'r', 'b', 'n'])
      .withMessage('Promotion piece must be q, r, b, or n')
  ],
  validateRequest,
  gameController.makeMove
);

// Get game
router.get('/:gameId',
  [
    param('gameId')
      .isUUID()
      .withMessage('Invalid game ID format')
  ],
  validateRequest,
  gameController.getGame
);

// Get all games (list)
router.get('/', 
  gameController.getAllGames
);

// Get game history
router.get('/history',
  gameController.getGameHistory
);

// Delete game
router.delete('/:gameId',
  [
    param('gameId')
      .isUUID()
      .withMessage('Invalid game ID format')
  ],
  validateRequest,
  gameController.deleteGame
);

// Analyze game
router.post('/:gameId/analysis',
  [
    param('gameId')
      .isUUID()
      .withMessage('Invalid game ID format'),
    body('engine')
      .optional()
      .isString()
      .withMessage('Engine must be a string'),
    body('depth')
      .optional()
      .isInt({ min: 1, max: 20 })
      .withMessage('Depth must be between 1 and 20')
  ],
  validateRequest,
  gameController.analyzeGame
);

export default router;