import { Database } from '../utils/database';
import { v4 as uuidv4 } from 'uuid';

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  data?: any;
  read: boolean;
  createdAt: Date;
  readAt?: Date;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  inApp: boolean;
  gameReminders: boolean;
  puzzleReminders: boolean;
  achievementAlerts: boolean;
  tournamentUpdates: boolean;
  systemUpdates: boolean;
  quietHoursEnabled: boolean;
  quietHoursStart: string;
  quietHoursEnd: string;
}

export class NotificationsService {
  private db = Database.getInstance();

  async getUserNotifications(userId: string, options: {
    page: number;
    limit: number;
    unreadOnly?: boolean;
  }): Promise<{
    data: Notification[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    const { page, limit, unreadOnly } = options;
    const offset = (page - 1) * limit;

    let whereClause = 'WHERE user_id = ?';
    const params = [userId];

    if (unreadOnly) {
      whereClause += ' AND read = 0';
    }

    // Get total count
    const totalResult = await this.db.db.get(
      `SELECT COUNT(*) as total FROM user_notifications ${whereClause}`,
      params
    );
    const total = totalResult?.total || 0;

    // Get notifications
    const notifications = await this.db.db.all(`
      SELECT * FROM user_notifications 
      ${whereClause} 
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?
    `, [...params, limit, offset]);

    const formattedNotifications = notifications.map((notif: any) => ({
      id: notif.id,
      userId: notif.user_id,
      type: notif.type,
      title: notif.title,
      message: notif.message,
      data: notif.data ? JSON.parse(notif.data) : null,
      read: notif.read === 1,
      createdAt: new Date(notif.created_at),
      readAt: notif.read_at ? new Date(notif.read_at) : undefined
    }));

    return {
      data: formattedNotifications,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async markAsRead(userId: string, notificationId: string): Promise<void> {
    await this.db.db.run(`
      UPDATE user_notifications 
      SET read = 1, read_at = datetime('now') 
      WHERE id = ? AND user_id = ?
    `, [notificationId, userId]);
  }

  async markAllAsRead(userId: string): Promise<void> {
    await this.db.db.run(`
      UPDATE user_notifications 
      SET read = 1, read_at = datetime('now') 
      WHERE user_id = ? AND read = 0
    `, [userId]);
  }

  async deleteNotification(userId: string, notificationId: string): Promise<void> {
    await this.db.db.run(`
      DELETE FROM user_notifications 
      WHERE id = ? AND user_id = ?
    `, [notificationId, userId]);
  }

  async createNotification(notification: {
    userId: string;
    type: string;
    title: string;
    message: string;
    data?: any;
  }): Promise<string> {
    const id = uuidv4();
    
    await this.db.db.run(`
      INSERT INTO user_notifications (id, user_id, type, title, message, data, read, created_at)
      VALUES (?, ?, ?, ?, ?, ?, 0, datetime('now'))
    `, [
      id,
      notification.userId,
      notification.type,
      notification.title,
      notification.message,
      notification.data ? JSON.stringify(notification.data) : null
    ]);

    return id;
  }

  async getNotificationSettings(userId: string): Promise<NotificationSettings> {
    const settings = await this.db.db.get(
      'SELECT * FROM user_settings WHERE user_id = ?',
      [userId]
    );

    return {
      email: settings?.email_notifications === 1,
      push: settings?.push_notifications === 1,
      inApp: settings?.in_app_notifications !== 0, // Default to true
      gameReminders: settings?.game_reminders === 1,
      puzzleReminders: settings?.puzzle_reminders === 1,
      achievementAlerts: settings?.achievement_alerts === 1,
      tournamentUpdates: settings?.tournament_updates === 1,
      systemUpdates: settings?.system_updates !== 0, // Default to true
      quietHoursEnabled: settings?.quiet_hours_enabled === 1,
      quietHoursStart: settings?.quiet_hours_start || '22:00',
      quietHoursEnd: settings?.quiet_hours_end || '07:00'
    };
  }

  async updateNotificationSettings(userId: string, settings: Partial<NotificationSettings>): Promise<NotificationSettings> {
    await this.db.db.run(`
      INSERT OR REPLACE INTO user_settings (
        user_id, email_notifications, push_notifications, in_app_notifications,
        game_reminders, puzzle_reminders, achievement_alerts,
        tournament_updates, system_updates, quiet_hours_enabled,
        quiet_hours_start, quiet_hours_end, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `, [
      userId,
      settings.email ? 1 : 0,
      settings.push ? 1 : 0,
      settings.inApp ? 1 : 0,
      settings.gameReminders ? 1 : 0,
      settings.puzzleReminders ? 1 : 0,
      settings.achievementAlerts ? 1 : 0,
      settings.tournamentUpdates ? 1 : 0,
      settings.systemUpdates ? 1 : 0,
      settings.quietHoursEnabled ? 1 : 0,
      settings.quietHoursStart,
      settings.quietHoursEnd
    ]);

    return this.getNotificationSettings(userId);
  }

  async getUnreadCount(userId: string): Promise<number> {
    const result = await this.db.db.get(`
      SELECT COUNT(*) as count 
      FROM user_notifications 
      WHERE user_id = ? AND read = 0
    `, [userId]);

    return result?.count || 0;
  }
}