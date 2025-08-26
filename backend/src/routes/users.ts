import express from 'express';
import { UserController } from '../controllers/userController';
import { authenticateToken } from '../middleware/auth';
import { body, validationResult } from 'express-validator';

const router = express.Router();
const userController = new UserController();

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

// All user routes require authentication
router.use(authenticateToken);

// Get user profile
router.get('/profile',
  userController.getProfile
);

// Update user profile
router.put('/profile',
  [
    body('preferences')
      .isObject()
      .withMessage('Preferences must be an object')
  ],
  validateRequest,
  userController.updateProfile
);

export default router;