import express from 'express';
import { UserController } from '../controllers/userController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();
const userController = new UserController();

// All stats routes require authentication
router.use(authenticateToken);

// Get dashboard statistics
router.get('/dashboard',
  userController.getDashboardStats
);

export default router;