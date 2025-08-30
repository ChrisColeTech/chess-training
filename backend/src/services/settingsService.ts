import { Database } from '../utils/database';

export interface UserSettings {
  theme: string;
  language: string;
  timezone: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  soundEnabled: boolean;
  animationsEnabled: boolean;
}

export interface BoardSettings {
  boardTheme: string;
  pieceSet: string;
  highlightLastMove: boolean;
  highlightLegalMoves: boolean;
  showCoordinates: boolean;
  autoQueen: boolean;
  soundEnabled: boolean;
  animationSpeed: number;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  gameReminders: boolean;
  puzzleReminders: boolean;
  achievementAlerts: boolean;
  quietHoursEnabled: boolean;
  quietHoursStart: string;
  quietHoursEnd: string;
}

export class SettingsService {
  private db = Database.getInstance();

  async getUserSettings(userId: string): Promise<UserSettings> {
    const settings = await this.db.db.get(
      'SELECT * FROM user_settings WHERE user_id = ?',
      [userId]
    );

    return {
      theme: settings?.theme || 'light',
      language: settings?.language || 'en',
      timezone: settings?.timezone || 'UTC',
      emailNotifications: settings?.email_notifications === 1,
      pushNotifications: settings?.push_notifications === 1,
      soundEnabled: settings?.sound_enabled === 1,
      animationsEnabled: settings?.animations_enabled === 1
    };
  }

  async updateUserSettings(userId: string, settings: Partial<UserSettings>): Promise<UserSettings> {
    await this.db.db.run(`
      INSERT OR REPLACE INTO user_settings (
        user_id, theme, language, timezone, email_notifications, 
        push_notifications, sound_enabled, animations_enabled, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `, [
      userId,
      settings.theme,
      settings.language,
      settings.timezone,
      settings.emailNotifications ? 1 : 0,
      settings.pushNotifications ? 1 : 0,
      settings.soundEnabled ? 1 : 0,
      settings.animationsEnabled ? 1 : 0
    ]);

    return this.getUserSettings(userId);
  }

  async getBoardSettings(userId: string): Promise<BoardSettings> {
    const settings = await this.db.db.get(
      'SELECT * FROM user_settings WHERE user_id = ?',
      [userId]
    );

    return {
      boardTheme: settings?.board_theme || 'brown',
      pieceSet: settings?.piece_set || 'classic',
      highlightLastMove: settings?.highlight_last_move === 1,
      highlightLegalMoves: settings?.highlight_legal_moves === 1,
      showCoordinates: settings?.show_coordinates === 1,
      autoQueen: settings?.auto_queen === 1,
      soundEnabled: settings?.sound_enabled === 1,
      animationSpeed: settings?.animation_speed || 1.0
    };
  }

  async updateBoardSettings(userId: string, settings: Partial<BoardSettings>): Promise<BoardSettings> {
    await this.db.db.run(`
      INSERT OR REPLACE INTO user_settings (
        user_id, board_theme, piece_set, highlight_last_move,
        highlight_legal_moves, show_coordinates, auto_queen,
        sound_enabled, animation_speed, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `, [
      userId,
      settings.boardTheme,
      settings.pieceSet,
      settings.highlightLastMove ? 1 : 0,
      settings.highlightLegalMoves ? 1 : 0,
      settings.showCoordinates ? 1 : 0,
      settings.autoQueen ? 1 : 0,
      settings.soundEnabled ? 1 : 0,
      settings.animationSpeed
    ]);

    return this.getBoardSettings(userId);
  }

  async getNotificationSettings(userId: string): Promise<NotificationSettings> {
    const settings = await this.db.db.get(
      'SELECT * FROM user_settings WHERE user_id = ?',
      [userId]
    );

    return {
      email: settings?.email_notifications === 1,
      push: settings?.push_notifications === 1,
      sms: settings?.sms_notifications === 1,
      gameReminders: settings?.game_reminders === 1,
      puzzleReminders: settings?.puzzle_reminders === 1,
      achievementAlerts: settings?.achievement_alerts === 1,
      quietHoursEnabled: settings?.quiet_hours_enabled === 1,
      quietHoursStart: settings?.quiet_hours_start || '22:00',
      quietHoursEnd: settings?.quiet_hours_end || '07:00'
    };
  }

  async updateNotificationSettings(userId: string, settings: Partial<NotificationSettings>): Promise<NotificationSettings> {
    await this.db.db.run(`
      INSERT OR REPLACE INTO user_settings (
        user_id, email_notifications, push_notifications, sms_notifications,
        game_reminders, puzzle_reminders, achievement_alerts,
        quiet_hours_enabled, quiet_hours_start, quiet_hours_end, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `, [
      userId,
      settings.email ? 1 : 0,
      settings.push ? 1 : 0,
      settings.sms ? 1 : 0,
      settings.gameReminders ? 1 : 0,
      settings.puzzleReminders ? 1 : 0,
      settings.achievementAlerts ? 1 : 0,
      settings.quietHoursEnabled ? 1 : 0,
      settings.quietHoursStart,
      settings.quietHoursEnd
    ]);

    return this.getNotificationSettings(userId);
  }
}