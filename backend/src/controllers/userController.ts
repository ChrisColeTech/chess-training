import { Response } from 'express';
import { AuthService } from '../services/authService';
import { AuthenticatedRequest } from '../middleware/auth';
import { Database } from '../utils/database';

export class UserController {
  private authService = new AuthService();
  private db = Database.getInstance();

  getProfile = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
      }

      const user = await this.authService.getUserById(userId);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      // Get additional stats
      const gameStats = await this.getGameStats(userId);
      const puzzleStats = await this.getPuzzleStats(userId);

      res.json({
        success: true,
        user: {
          ...user,
          gamesPlayed: gameStats.total,
          wins: gameStats.wins,
          losses: gameStats.losses,
          draws: gameStats.draws,
          puzzlesSolved: puzzleStats.solved,
          puzzleAccuracy: puzzleStats.accuracy
        }
      });
    } catch (error: any) {
      console.error('Get profile error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get profile'
      });
    }
  };

  updateProfile = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      const { preferences } = req.body;

      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
      }

      if (!preferences || typeof preferences !== 'object') {
        return res.status(400).json({
          success: false,
          error: 'Valid preferences object required'
        });
      }

      await this.authService.updateUserPreferences(userId, preferences);

      res.json({
        success: true,
        message: 'Profile updated successfully'
      });
    } catch (error: any) {
      console.error('Update profile error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update profile'
      });
    }
  };

  getDashboardStats = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
      }

      const user = await this.authService.getUserById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      // Get today's activities
      const todayStats = await this.getTodayStats(userId);
      
      // Get recent games
      const recentGames = await this.getRecentGames(userId);

      // Get current streak
      const streak = await this.getCurrentStreak(userId);

      res.json({
        success: true,
        stats: {
          chess_elo: user.chess_elo,
          puzzle_rating: user.puzzle_rating,
          games_played: todayStats.games, // Daily games played
          study_hours: 0, // TODO: Add study tracking
          rating_change: 0, // TODO: Calculate daily rating change
          puzzle_rating_change: 0, // TODO: Calculate daily puzzle rating change
          games_change: 0, // TODO: Calculate daily games change
          study_hours_change: 0, // TODO: Calculate daily study hours change
          puzzles_solved_today: todayStats.puzzles,
          study_minutes_today: 0, // TODO: Add study time tracking
          currentStreak: streak,
          recentGames: recentGames.slice(0, 5) // Last 5 games
        }
      });
    } catch (error: any) {
      console.error('Get dashboard stats error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get dashboard stats'
      });
    }
  };

  private async getGameStats(userId: string) {
    const stats = await this.db.db.get(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN result = '1-0' THEN 1 ELSE 0 END) as wins,
        SUM(CASE WHEN result = '0-1' THEN 1 ELSE 0 END) as losses,
        SUM(CASE WHEN result = '1/2-1/2' THEN 1 ELSE 0 END) as draws
      FROM games 
      WHERE user_id = ? AND status = 'completed'
    `, [userId]);

    return {
      total: stats.total || 0,
      wins: stats.wins || 0,
      losses: stats.losses || 0,
      draws: stats.draws || 0
    };
  }

  private async getPuzzleStats(userId: string) {
    const stats = await this.db.db.get(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN correct = 1 THEN 1 ELSE 0 END) as solved
      FROM puzzle_attempts 
      WHERE user_id = ?
    `, [userId]);

    const total = stats.total || 0;
    const solved = stats.solved || 0;
    const accuracy = total > 0 ? Math.round((solved / total) * 100) : 0;

    return { solved, accuracy };
  }

  private async getTodayStats(userId: string) {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

    const gameCount = await this.db.db.get(`
      SELECT COUNT(*) as count 
      FROM games 
      WHERE user_id = ? AND DATE(started_at) = ?
    `, [userId, today]);

    const puzzleCount = await this.db.db.get(`
      SELECT COUNT(*) as count 
      FROM puzzle_attempts 
      WHERE user_id = ? AND DATE(attempted_at) = ?
    `, [userId, today]);

    return {
      games: gameCount.count || 0,
      puzzles: puzzleCount.count || 0
    };
  }

  private async getRecentGames(userId: string) {
    const games = await this.db.db.all(`
      SELECT result, ai_level, completed_at, 
             CASE 
               WHEN result = '1-0' THEN (8 + ai_level * 2)
               WHEN result = '0-1' THEN -(5 + ai_level)
               ELSE 0
             END as elo_change
      FROM games 
      WHERE user_id = ? AND status = 'completed'
      ORDER BY completed_at DESC 
      LIMIT 10
    `, [userId]);

    return games.map((game: any) => ({
      result: game.result,
      aiLevel: game.ai_level,
      eloChange: game.elo_change,
      date: game.completed_at?.split('T')[0] // Just the date part
    }));
  }

  private async getCurrentStreak(userId: string): Promise<number> {
    // Simplified streak calculation - consecutive puzzle solving days
    const recentDays = await this.db.db.all(`
      SELECT DATE(attempted_at) as attempt_date,
             SUM(CASE WHEN correct = 1 THEN 1 ELSE 0 END) as solved_count
      FROM puzzle_attempts 
      WHERE user_id = ?
      AND attempted_at >= datetime('now', '-30 days')
      GROUP BY DATE(attempted_at)
      ORDER BY attempt_date DESC
    `, [userId]);

    let streak = 0;
    for (const day of recentDays) {
      if (day.solved_count > 0) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  }

  // Simplified endpoints for frontend compatibility
  getPreferences = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
      }

      const user = await this.authService.getUserById(userId);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      res.json({
        success: true,
        preferences: user.preferences || {}
      });
    } catch (error: any) {
      console.error('Get preferences error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get preferences'
      });
    }
  };

  updatePreferences = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      const preferences = req.body;

      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
      }

      if (!preferences || typeof preferences !== 'object') {
        return res.status(400).json({
          success: false,
          error: 'Valid preferences object required'
        });
      }

      await this.authService.updateUserPreferences(userId, preferences);

      res.json({
        success: true,
        message: 'Preferences updated successfully'
      });
    } catch (error: any) {
      console.error('Update preferences error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update preferences'
      });
    }
  };

  getStatistics = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
      }

      const user = await this.authService.getUserById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      // Get comprehensive stats
      const gameStats = await this.getGameStats(userId);
      const puzzleStats = await this.getPuzzleStats(userId);
      const todayStats = await this.getTodayStats(userId);
      const streak = await this.getCurrentStreak(userId);

      res.json({
        success: true,
        statistics: {
          ratings: {
            chess: user.chess_elo,
            puzzle: user.puzzle_rating
          },
          games: {
            total: gameStats.total,
            wins: gameStats.wins,
            losses: gameStats.losses,
            draws: gameStats.draws,
            winRate: gameStats.total > 0 ? Math.round((gameStats.wins / gameStats.total) * 100) : 0
          },
          puzzles: {
            solved: puzzleStats.solved,
            accuracy: puzzleStats.accuracy
          },
          activity: {
            todayGames: todayStats.games,
            todayPuzzles: todayStats.puzzles,
            streak: streak
          }
        }
      });
    } catch (error: any) {
      console.error('Get statistics error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get statistics'
      });
    }
  };

  getActivity = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
      }

      // Get recent activity
      const recentGames = await this.getRecentGames(userId);
      const recentPuzzles = await this.db.db.all(`
        SELECT 
          p.themes,
          pa.correct,
          pa.rating_change,
          pa.attempted_at
        FROM puzzle_attempts pa
        JOIN puzzles p ON pa.puzzle_id = p.id
        WHERE pa.user_id = ?
        ORDER BY pa.attempted_at DESC
        LIMIT 10
      `, [userId]);

      res.json({
        success: true,
        activity: {
          recentGames: recentGames,
          recentPuzzles: recentPuzzles.map((puzzle: any) => ({
            themes: puzzle.themes,
            correct: !!puzzle.correct,
            ratingChange: puzzle.rating_change,
            date: puzzle.attempted_at?.split('T')[0]
          }))
        }
      });
    } catch (error: any) {
      console.error('Get activity error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get activity'
      });
    }
  };
}