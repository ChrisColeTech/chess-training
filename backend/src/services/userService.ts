import { Database } from '../utils/database';

export interface UserQuery {
  search?: string;
  active?: boolean;
  limit?: number;
  offset?: number;
}

export interface ProfileQuery {
  userId: string;
}

export interface SettingsQuery {
  userId: string;
}

export interface ProgressQuery {
  userId: string;
  category?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface ProgressTrackingQuery {
  userId: string;
  activityType?: string;
  limit?: number;
  offset?: number;
}

export interface SessionQuery {
  userId: string;
  active?: boolean;
  limit?: number;
  offset?: number;
}

export interface StudyPlanQuery {
  userId: string;
  active?: boolean;
}

export interface PuzzlePreferencesQuery {
  userId: string;
}

export interface AnalyticsQuery {
  userId: string;
  metricType?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface UpdateProfileData {
  display_name?: string;
  bio?: string;
  avatar_url?: string;
  country?: string;
}

export interface UpdateSettingsData {
  theme?: string;
  notifications?: any;
  privacy?: any;
  game_preferences?: any;
}

export class UserService {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  // Users
  async getAllUsers(query: UserQuery) {
    const { search, active, limit = 50, offset = 0 } = query;
    
    let sqlQuery = 'SELECT id, username, email, created_at, is_active, last_login FROM users WHERE 1=1';
    const params: any[] = [];
    
    if (search) {
      sqlQuery += ' AND (username LIKE ? OR email LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }
    
    if (active !== undefined) {
      sqlQuery += ' AND is_active = ?';
      params.push(active ? 1 : 0);
    }
    
    sqlQuery += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));
    
    const users = await this.db.getAll(sqlQuery, params);
    
    const totalQuery = 'SELECT COUNT(*) as total FROM users WHERE 1=1' + 
      (search ? ' AND (username LIKE ? OR email LIKE ?)' : '') +
      (active !== undefined ? ' AND is_active = ?' : '');
    
    const countParams = search ? [`%${search}%`, `%${search}%`] : [];
    if (active !== undefined) countParams.push((active ? 1 : 0).toString());
    
    const totalResult = await this.db.get(totalQuery, countParams);
    
    return {
      users,
      total: totalResult.total,
      limit: Number(limit),
      offset: Number(offset)
    };
  }

  async getUserById(id: string) {
    const user = await this.db.get('SELECT id, username, email, created_at, is_active, last_login FROM users WHERE id = ?', [id]);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  }

  // User Profiles
  async getUserProfile(query: ProfileQuery) {
    const { userId } = query;
    
    const profile = await this.db.get(`
      SELECT up.*, u.username, u.email 
      FROM user_profiles up 
      JOIN users u ON up.user_id = u.id 
      WHERE up.user_id = ?
    `, [userId]);
    
    if (!profile) {
      throw new Error('User profile not found');
    }
    
    return profile;
  }

  async updateUserProfile(userId: string, data: UpdateProfileData) {
    const { display_name, bio, avatar_url, country } = data;
    
    // Check if profile exists
    const existingProfile = await this.db.get('SELECT id FROM user_profiles WHERE user_id = ?', [userId]);
    
    if (existingProfile) {
      // Update existing profile
      await this.db.run(`
        UPDATE user_profiles 
        SET display_name = ?, bio = ?, avatar_url = ?, country = ?, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ?
      `, [display_name, bio, avatar_url, country, userId]);
    } else {
      // Create new profile
      await this.db.run(`
        INSERT INTO user_profiles (user_id, display_name, bio, avatar_url, country)
        VALUES (?, ?, ?, ?, ?)
      `, [userId, display_name, bio, avatar_url, country]);
    }
    
    return await this.getUserProfile({ userId: userId.toString() });
  }

  // User Settings
  async getUserSettings(query: SettingsQuery) {
    const { userId } = query;
    
    const settings = await this.db.get('SELECT * FROM user_settings WHERE user_id = ?', [userId]);
    
    if (!settings) {
      throw new Error('User settings not found');
    }
    
    return settings;
  }

  async updateUserSettings(userId: string, data: UpdateSettingsData) {
    const { theme, notifications, privacy, game_preferences } = data;
    
    // Check if settings exist
    const existingSettings = await this.db.get('SELECT id FROM user_settings WHERE user_id = ?', [userId]);
    
    if (existingSettings) {
      // Update existing settings
      await this.db.run(`
        UPDATE user_settings 
        SET theme = ?, notifications = ?, privacy = ?, game_preferences = ?, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ?
      `, [theme, JSON.stringify(notifications), JSON.stringify(privacy), JSON.stringify(game_preferences), userId]);
    } else {
      // Create new settings
      await this.db.run(`
        INSERT INTO user_settings (user_id, theme, notifications, privacy, game_preferences)
        VALUES (?, ?, ?, ?, ?)
      `, [userId, theme, JSON.stringify(notifications), JSON.stringify(privacy), JSON.stringify(game_preferences)]);
    }
    
    return await this.getUserSettings({ userId: userId.toString() });
  }

  // User Progress
  async getUserProgress(query: ProgressQuery) {
    const { userId, category, dateFrom, dateTo } = query;
    
    let sqlQuery = 'SELECT * FROM user_progress WHERE user_id = ?';
    const params: any[] = [userId];
    
    if (category) {
      sqlQuery += ' AND category = ?';
      params.push(category);
    }
    
    if (dateFrom) {
      sqlQuery += ' AND DATE(updated_at) >= ?';
      params.push(dateFrom);
    }
    
    if (dateTo) {
      sqlQuery += ' AND DATE(updated_at) <= ?';
      params.push(dateTo);
    }
    
    sqlQuery += ' ORDER BY updated_at DESC';
    
    const progress = await this.db.getAll(sqlQuery, params);
    
    return progress;
  }

  // User Progress Tracking
  async getUserProgressTracking(query: ProgressTrackingQuery) {
    const { userId, activityType, limit = 50, offset = 0 } = query;
    
    let sqlQuery = 'SELECT * FROM user_progress_tracking WHERE user_id = ?';
    const params: any[] = [userId];
    
    if (activityType) {
      sqlQuery += ' AND activity_type = ?';
      params.push(activityType);
    }
    
    sqlQuery += ' ORDER BY timestamp DESC LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));
    
    const tracking = await this.db.getAll(sqlQuery, params);
    
    return tracking;
  }

  // User Sessions
  async getUserSessions(query: SessionQuery) {
    const { userId, active, limit = 50, offset = 0 } = query;
    
    let sqlQuery = 'SELECT * FROM user_sessions WHERE user_id = ?';
    const params: any[] = [userId];
    
    if (active !== undefined) {
      sqlQuery += ' AND is_active = ?';
      params.push(active ? 1 : 0);
    }
    
    sqlQuery += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));
    
    const sessions = await this.db.getAll(sqlQuery, params);
    
    return sessions;
  }

  // User Study Plans
  async getUserStudyPlans(query: StudyPlanQuery) {
    const { userId, active } = query;
    
    let sqlQuery = 'SELECT * FROM user_study_plans WHERE user_id = ?';
    const params: any[] = [userId];
    
    if (active !== undefined) {
      sqlQuery += ' AND is_active = ?';
      params.push(active ? 1 : 0);
    }
    
    sqlQuery += ' ORDER BY created_at DESC';
    
    const studyPlans = await this.db.getAll(sqlQuery, params);
    
    return studyPlans;
  }

  // User Puzzle Preferences
  async getUserPuzzlePreferences(query: PuzzlePreferencesQuery) {
    const { userId } = query;
    
    const preferences = await this.db.get('SELECT * FROM user_puzzle_preferences WHERE user_id = ?', [userId]);
    
    if (!preferences) {
      throw new Error('User puzzle preferences not found');
    }
    
    return preferences;
  }

  async updateUserPuzzlePreferences(userId: string, preferences: any) {
    // Check if preferences exist
    const existing = await this.db.get('SELECT id FROM user_puzzle_preferences WHERE user_id = ?', [userId]);
    
    if (existing) {
      // Update existing preferences
      await this.db.run(`
        UPDATE user_puzzle_preferences 
        SET difficulty_range = ?, themes = ?, time_controls = ?, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ?
      `, [preferences.difficulty_range, JSON.stringify(preferences.themes), 
          JSON.stringify(preferences.time_controls), userId]);
    } else {
      // Create new preferences
      await this.db.run(`
        INSERT INTO user_puzzle_preferences (user_id, difficulty_range, themes, time_controls)
        VALUES (?, ?, ?, ?)
      `, [userId, preferences.difficulty_range, JSON.stringify(preferences.themes), 
          JSON.stringify(preferences.time_controls)]);
    }
    
    return await this.getUserPuzzlePreferences({ userId: userId.toString() });
  }

  // User Analytics
  async getUserAnalytics(query: AnalyticsQuery) {
    const { userId, metricType, dateFrom, dateTo } = query;
    
    let sqlQuery = 'SELECT * FROM user_analytics WHERE user_id = ?';
    const params: any[] = [userId];
    
    if (metricType) {
      sqlQuery += ' AND metric_type = ?';
      params.push(metricType);
    }
    
    if (dateFrom) {
      sqlQuery += ' AND DATE(recorded_at) >= ?';
      params.push(dateFrom);
    }
    
    if (dateTo) {
      sqlQuery += ' AND DATE(recorded_at) <= ?';
      params.push(dateTo);
    }
    
    sqlQuery += ' ORDER BY recorded_at DESC';
    
    const analytics = await this.db.getAll(sqlQuery, params);
    
    return analytics;
  }
}