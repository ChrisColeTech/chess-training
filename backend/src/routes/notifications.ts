import express from 'express';
import { NotificationsController } from '../controllers/notificationsController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();
const notificationsController = new NotificationsController();

// All notification routes require authentication
router.use(authenticateToken);

// Get user notifications
router.get('/', notificationsController.getUserNotifications);

// Mark notification as read
router.put('/:notificationId/read', notificationsController.markAsRead);

// Mark all notifications as read
router.put('/read-all', notificationsController.markAllAsRead);

// Delete notification
router.delete('/:notificationId', notificationsController.deleteNotification);

// Notification settings routes
router.get('/settings', notificationsController.getNotificationSettings);
router.put('/settings', notificationsController.updateNotificationSettings);

export default router;