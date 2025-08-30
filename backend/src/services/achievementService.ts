import { Database } from '../utils/database';

export interface AchievementQuery {
  category?: string;
  difficulty?: string;
  active?: boolean;
  limit?: number;
  offset?: number;
}

export interface UserAchievementQuery {
  userId: string;
  achievementId?: string;
  earned?: boolean;
  category?: string;
  dateFrom?: string;
  dateTo?: string;
  limit?: number;
  offset?: number;
}

export interface CreateAchievementData {
  name: string;
  description: string;
  category: string;
  difficulty_level: string;
  criteria: any;
  points: number;
  badge_icon?: string;
  badge_color?: string;
  is_secret?: boolean;
}

export interface UpdateAchievementData {
  name?: string;
  description?: string;
  category?: string;
  difficulty_level?: string;
  criteria?: any;
  points?: number;
  badge_icon?: string;
  badge_color?: string;
  is_secret?: boolean;
  is_active?: boolean;
}

export interface EarnAchievementData {
  progress?: number;
  metadata?: any;
}

export interface AchievementStatsQuery {
  userId: string;
  category?: string;
}

export class AchievementService {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  // Achievements
  async getAllAchievements(query: AchievementQuery) {
    const { category, difficulty, active, limit = 50, offset = 0 } = query;
    
    let sqlQuery = 'SELECT * FROM achievements WHERE 1=1';
    const params: any[] = [];
    
    if (category) {
      sqlQuery += ' AND category = ?';
      params.push(category);
    }
    
    if (difficulty) {
      sqlQuery += ' AND difficulty_level = ?';
      params.push(difficulty);
    }
    
    if (active !== undefined) {
      sqlQuery += ' AND is_active = ?';
      params.push(active ? 1 : 0);
    }
    
    sqlQuery += ' ORDER BY points DESC, name LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));
    
    const achievements = await this.db.getAll(sqlQuery, params);
    
    const totalQuery = 'SELECT COUNT(*) as total FROM achievements WHERE 1=1' + 
      (category ? ' AND category = ?' : '') +
      (difficulty ? ' AND difficulty_level = ?' : '') +
      (active !== undefined ? ' AND is_active = ?' : '');
    
    const countParams: any[] = [];
    if (category) countParams.push(category);
    if (difficulty) countParams.push(difficulty);
    if (active !== undefined) countParams.push(active ? 1 : 0);
    
    const totalResult = await this.db.get(totalQuery, countParams);
    
    return {
      achievements,
      total: totalResult.total,
      limit: Number(limit),
      offset: Number(offset)
    };
  }

  async getAchievementById(id: string) {
    const achievement = await this.db.get('SELECT * FROM achievements WHERE id = ?', [id]);
    
    if (!achievement) {
      throw new Error('Achievement not found');
    }
    
    return achievement;
  }

  async createAchievement(data: CreateAchievementData) {
    const { name, description, category, difficulty_level, criteria, points, badge_icon, badge_color, is_secret } = data;
    
    const achievementId = await this.db.run(`
      INSERT INTO achievements (name, description, category, difficulty_level, criteria, points, badge_icon, badge_color, is_secret, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
    `, [name, description, category, difficulty_level, JSON.stringify(criteria), points, 
        badge_icon, badge_color, is_secret ? 1 : 0]);
    
    return await this.getAchievementById(achievementId.toString());
  }

  async updateAchievement(id: string, data: UpdateAchievementData) {
    const existing = await this.getAchievementById(id);
    
    const { name, description, category, difficulty_level, criteria, points, badge_icon, badge_color, is_secret, is_active } = data;
    
    await this.db.run(`
      UPDATE achievements 
      SET name = ?, description = ?, category = ?, difficulty_level = ?, criteria = ?, points = ?, 
          badge_icon = ?, badge_color = ?, is_secret = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [name || existing.name, description || existing.description, category || existing.category,
        difficulty_level || existing.difficulty_level, JSON.stringify(criteria) || existing.criteria,
        points !== undefined ? points : existing.points, badge_icon || existing.badge_icon,
        badge_color || existing.badge_color, is_secret !== undefined ? (is_secret ? 1 : 0) : existing.is_secret,
        is_active !== undefined ? (is_active ? 1 : 0) : existing.is_active, id]);
    
    return await this.getAchievementById(id);
  }

  async deleteAchievement(id: string) {
    const achievement = await this.getAchievementById(id);
    
    // First delete all user achievements for this achievement
    await this.db.run('DELETE FROM user_achievements WHERE achievement_id = ?', [id]);
    
    // Then delete the achievement
    await this.db.run('DELETE FROM achievements WHERE id = ?', [id]);
    
    return achievement;
  }

  async getAchievementsByCategory(category: string) {
    const achievements = await this.db.getAll(`
      SELECT * FROM achievements 
      WHERE category = ? AND is_active = 1 
      ORDER BY difficulty_level, points DESC
    `, [category]);
    
    return achievements;
  }

  // User Achievements
  async getUserAchievements(query: UserAchievementQuery) {
    const { userId, achievementId, earned, category, dateFrom, dateTo, limit = 50, offset = 0 } = query;
    
    if (achievementId) {
      // Get specific user achievement
      const userAchievement = await this.db.get(`
        SELECT a.*, ua.earned_at, ua.progress, ua.metadata
        FROM achievements a
        LEFT JOIN user_achievements ua ON a.id = ua.achievement_id AND ua.user_id = ?
        WHERE a.id = ?
      `, [userId, achievementId]);
      
      if (!userAchievement) {
        throw new Error('Achievement not found');
      }
      
      return userAchievement;
    } else {
      // Get all user achievements with filters
      let sqlQuery = `
        SELECT a.*, ua.earned_at, ua.progress, ua.metadata,
               CASE WHEN ua.earned_at IS NOT NULL THEN 1 ELSE 0 END as is_earned
        FROM achievements a
        LEFT JOIN user_achievements ua ON a.id = ua.achievement_id AND ua.user_id = ?
        WHERE a.is_active = 1
      `;
      const params: any[] = [userId];
      
      if (earned !== undefined) {
        if (earned) {
          sqlQuery += ' AND ua.earned_at IS NOT NULL';
        } else {
          sqlQuery += ' AND ua.earned_at IS NULL';
        }
      }
      
      if (category) {
        sqlQuery += ' AND a.category = ?';
        params.push(category);
      }
      
      if (dateFrom && earned) {
        sqlQuery += ' AND DATE(ua.earned_at) >= ?';
        params.push(dateFrom);
      }
      
      if (dateTo && earned) {
        sqlQuery += ' AND DATE(ua.earned_at) <= ?';
        params.push(dateTo);
      }
      
      sqlQuery += ' ORDER BY ua.earned_at DESC NULLS LAST, a.points DESC LIMIT ? OFFSET ?';
      params.push(Number(limit), Number(offset));
      
      const userAchievements = await this.db.getAll(sqlQuery, params);
      
      return userAchievements;
    }
  }

  async earnAchievement(userId: string, achievementId: string, data: EarnAchievementData = {}) {
    const { progress = 100, metadata = {} } = data;
    
    // Check if achievement exists
    const achievement = await this.getAchievementById(achievementId);
    
    // Check if user already earned this achievement
    const existingUserAchievement = await this.db.get(`
      SELECT * FROM user_achievements 
      WHERE user_id = ? AND achievement_id = ?
    `, [userId, achievementId]);
    
    if (existingUserAchievement && existingUserAchievement.earned_at) {
      throw new Error('Achievement already earned');
    }
    
    if (existingUserAchievement) {
      // Update existing progress
      await this.db.run(`
        UPDATE user_achievements 
        SET progress = ?, earned_at = CURRENT_TIMESTAMP, metadata = ?, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ? AND achievement_id = ?
      `, [progress, JSON.stringify(metadata), userId, achievementId]);
    } else {
      // Create new user achievement
      await this.db.run(`
        INSERT INTO user_achievements (user_id, achievement_id, progress, earned_at, metadata)
        VALUES (?, ?, ?, CURRENT_TIMESTAMP, ?)
      `, [userId, achievementId, progress, JSON.stringify(metadata)]);
    }
    
    return {
      ...achievement,
      earned_at: new Date().toISOString(),
      progress,
      metadata
    };
  }

  async updateAchievementProgress(userId: string, achievementId: string, progress: number, metadata: any = {}) {
    // Check if achievement exists
    await this.getAchievementById(achievementId);
    
    const existingUserAchievement = await this.db.get(`
      SELECT * FROM user_achievements 
      WHERE user_id = ? AND achievement_id = ?
    `, [userId, achievementId]);
    
    if (existingUserAchievement) {
      // Update existing progress
      const shouldEarn = progress >= 100 && !existingUserAchievement.earned_at;
      
      await this.db.run(`
        UPDATE user_achievements 
        SET progress = ?, metadata = ?, earned_at = ?, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ? AND achievement_id = ?
      `, [progress, JSON.stringify(metadata), shouldEarn ? new Date().toISOString() : existingUserAchievement.earned_at, 
          userId, achievementId]);
    } else {
      // Create new progress entry
      const shouldEarn = progress >= 100;
      
      await this.db.run(`
        INSERT INTO user_achievements (user_id, achievement_id, progress, earned_at, metadata)
        VALUES (?, ?, ?, ?, ?)
      `, [userId, achievementId, progress, shouldEarn ? new Date().toISOString() : null, JSON.stringify(metadata)]);
    }
    
    return await this.getUserAchievements({ userId, achievementId });
  }

  async getUserAchievementStats(query: AchievementStatsQuery) {
    const { userId, category } = query;
    
    let statsQuery = `
      SELECT 
        COUNT(DISTINCT a.id) as total_achievements,
        COUNT(DISTINCT ua.achievement_id) as earned_achievements,
        COALESCE(SUM(CASE WHEN ua.earned_at IS NOT NULL THEN a.points ELSE 0 END), 0) as total_points,
        COUNT(DISTINCT CASE WHEN a.category = ? THEN a.id END) as category_total,
        COUNT(DISTINCT CASE WHEN a.category = ? AND ua.earned_at IS NOT NULL THEN ua.achievement_id END) as category_earned
      FROM achievements a
      LEFT JOIN user_achievements ua ON a.id = ua.achievement_id AND ua.user_id = ?
      WHERE a.is_active = 1
    `;
    const params: any[] = [category || '', category || '', userId];
    
    const stats = await this.db.get(statsQuery, params);
    
    // Get recent achievements
    const recentAchievements = await this.db.getAll(`
      SELECT a.name, a.points, a.badge_icon, ua.earned_at
      FROM user_achievements ua
      JOIN achievements a ON ua.achievement_id = a.id
      WHERE ua.user_id = ? AND ua.earned_at IS NOT NULL
      ORDER BY ua.earned_at DESC
      LIMIT 5
    `, [userId]);
    
    // Get achievement progress by category
    const categoryProgress = await this.db.getAll(`
      SELECT 
        a.category,
        COUNT(DISTINCT a.id) as total,
        COUNT(DISTINCT ua.achievement_id) as earned,
        COALESCE(SUM(CASE WHEN ua.earned_at IS NOT NULL THEN a.points ELSE 0 END), 0) as points
      FROM achievements a
      LEFT JOIN user_achievements ua ON a.id = ua.achievement_id AND ua.user_id = ?
      WHERE a.is_active = 1
      GROUP BY a.category
      ORDER BY points DESC
    `, [userId]);
    
    return {
      totalAchievements: stats.total_achievements,
      earnedAchievements: stats.earned_achievements,
      totalPoints: stats.total_points,
      completionPercentage: stats.total_achievements > 0 ? 
        Math.round((stats.earned_achievements / stats.total_achievements) * 100) : 0,
      categoryStats: category ? {
        total: stats.category_total,
        earned: stats.category_earned,
        completionPercentage: stats.category_total > 0 ? 
          Math.round((stats.category_earned / stats.category_total) * 100) : 0
      } : null,
      recentAchievements,
      categoryProgress
    };
  }

  async checkAchievementEligibility(userId: string, achievementId: string) {
    const achievement = await this.getAchievementById(achievementId);
    const criteria = JSON.parse(achievement.criteria);
    
    // This would contain complex logic to check if user meets criteria
    // For now, return a simplified check
    const userAchievement = await this.db.get(`
      SELECT * FROM user_achievements 
      WHERE user_id = ? AND achievement_id = ?
    `, [userId, achievementId]);
    
    return {
      eligible: !userAchievement || !userAchievement.earned_at,
      progress: userAchievement ? userAchievement.progress : 0,
      criteria,
      requirements: this.parseAchievementRequirements(criteria)
    };
  }

  private parseAchievementRequirements(criteria: any): string[] {
    // Convert criteria object to human-readable requirements
    const requirements: string[] = [];
    
    if (criteria.puzzles_solved) {
      requirements.push(`Solve ${criteria.puzzles_solved} puzzles`);
    }
    
    if (criteria.games_won) {
      requirements.push(`Win ${criteria.games_won} games`);
    }
    
    if (criteria.rating_threshold) {
      requirements.push(`Reach ${criteria.rating_threshold} rating`);
    }
    
    if (criteria.consecutive_days) {
      requirements.push(`Play for ${criteria.consecutive_days} consecutive days`);
    }
    
    if (criteria.time_limit) {
      requirements.push(`Complete within ${criteria.time_limit} seconds`);
    }
    
    return requirements.length > 0 ? requirements : ['Complete the specified task'];
  }

  async getAchievementCategories() {
    const categories = await this.db.getAll(`
      SELECT 
        category,
        COUNT(*) as achievement_count,
        SUM(points) as total_points,
        AVG(points) as avg_points
      FROM achievements 
      WHERE is_active = 1
      GROUP BY category 
      ORDER BY achievement_count DESC
    `);
    
    return categories;
  }

  // Missing methods referenced by controllers
  async getAchievementProgress(userId: string, achievementId: string) {
    const achievement = await this.getAchievementById(achievementId);
    
    const userAchievement = await this.db.get(`
      SELECT * FROM user_achievements 
      WHERE user_id = ? AND achievement_id = ?
    `, [userId, achievementId]);

    return {
      achievement,
      progress: userAchievement?.progress || 0,
      unlocked: userAchievement?.earned_at ? true : false,
      unlockedAt: userAchievement?.earned_at
    };
  }

  async getRecentAchievements(userId: string, limit: number = 10) {
    const recentAchievements = await this.db.getAll(`
      SELECT 
        ua.*,
        a.name,
        a.description,
        a.badge_icon,
        a.badge_color,
        a.points,
        a.category
      FROM user_achievements ua
      JOIN achievements a ON ua.achievement_id = a.id
      WHERE ua.user_id = ? AND ua.earned_at IS NOT NULL
      ORDER BY ua.earned_at DESC
      LIMIT ?
    `, [userId, limit]);

    return recentAchievements;
  }

  async getAchievementLeaderboard(achievementId?: string, limit: number = 50) {
    if (achievementId) {
      // Specific achievement leaderboard
      const leaderboard = await this.db.getAll(`
        SELECT 
          u.id as userId,
          u.username,
          ua.earned_at,
          ua.progress
        FROM user_achievements ua
        JOIN users u ON ua.user_id = u.id
        WHERE ua.achievement_id = ? AND ua.earned_at IS NOT NULL
        ORDER BY ua.earned_at ASC
        LIMIT ?
      `, [achievementId, limit]);

      return leaderboard;
    } else {
      // Overall leaderboard by total points
      const leaderboard = await this.db.getAll(`
        SELECT 
          u.id as userId,
          u.username,
          COUNT(ua.id) as achievements,
          COALESCE(SUM(a.points), 0) as totalPoints
        FROM users u
        LEFT JOIN user_achievements ua ON u.id = ua.user_id AND ua.earned_at IS NOT NULL
        LEFT JOIN achievements a ON ua.achievement_id = a.id
        GROUP BY u.id, u.username
        HAVING totalPoints > 0
        ORDER BY totalPoints DESC, achievements DESC
        LIMIT ?
      `, [limit]);

      return leaderboard;
    }
  }
}