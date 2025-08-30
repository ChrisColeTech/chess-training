import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { NotificationsService } from '../services/notificationsService';

export class NotificationsController {
  private notificationsService = new NotificationsService();

  // Get user notifications
  getUserNotifications = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
      }

      const { page = 1, limit = 50, unreadOnly = false } = req.query;
      
      const notifications = await this.notificationsService.getUserNotifications(userId, {
        page: Number(page),
        limit: Number(limit),
        unreadOnly: unreadOnly === 'true'
      });
      
      res.json({
        success: true,
        data: notifications.data,
        pagination: notifications.pagination
      });
    } catch (error: any) {
      console.error('Get user notifications error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get notifications'
      });
    }
  };

  // Mark notification as read
  markAsRead = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      const { notificationId } = req.params;
      
      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
      }

      await this.notificationsService.markAsRead(userId, notificationId);
      
      res.json({
        success: true,
        message: 'Notification marked as read'
      });
    } catch (error: any) {
      console.error('Mark notification as read error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to mark notification as read'
      });
    }
  };

  // Mark all notifications as read
  markAllAsRead = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      
      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
      }

      await this.notificationsService.markAllAsRead(userId);
      
      res.json({
        success: true,
        message: 'All notifications marked as read'
      });
    } catch (error: any) {
      console.error('Mark all notifications as read error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to mark all notifications as read'
      });
    }
  };

  // Delete notification
  deleteNotification = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      const { notificationId } = req.params;
      
      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
      }

      await this.notificationsService.deleteNotification(userId, notificationId);
      
      res.json({
        success: true,
        message: 'Notification deleted'
      });
    } catch (error: any) {
      console.error('Delete notification error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete notification'
      });
    }
  };

  // Get notification settings
  getNotificationSettings = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      
      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
      }

      const settings = await this.notificationsService.getNotificationSettings(userId);
      
      res.json({
        success: true,
        data: settings
      });
    } catch (error: any) {
      console.error('Get notification settings error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get notification settings'
      });
    }
  };

  // Update notification settings
  updateNotificationSettings = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      
      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
      }

      const settings = await this.notificationsService.updateNotificationSettings(userId, req.body);
      
      res.json({
        success: true,
        data: settings
      });
    } catch (error: any) {
      console.error('Update notification settings error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update notification settings'
      });
    }
  };
}