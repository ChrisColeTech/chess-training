import express from 'express';
import { Database } from '../utils/database';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';

const router = express.Router();

// All progress routes require authentication
router.use(authenticateToken);

// GET /api/progress/overview - Get progress overview
router.get('/overview', async (req: AuthenticatedRequest, res) => {
  try {
    const db = Database.getInstance();
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }

    // Get user stats
    const user = await db.get('SELECT chess_elo, puzzle_rating FROM users WHERE id = ?', [userId]);
    
    // Get recent games count
    const todayGames = await db.get(`
      SELECT COUNT(*) as count 
      FROM games 
      WHERE user_id = ? AND date(started_at) = date('now')
    `, [userId]);

    // Get recent puzzle attempts count
    const todayPuzzles = await db.get(`
      SELECT COUNT(*) as count 
      FROM puzzle_attempts 
      WHERE user_id = ? AND date(attempted_at) = date('now')
    `, [userId]);

    // Get current streak (consecutive days with activity)
    const streakResult = await db.get(`
      WITH daily_activity AS (
        SELECT date(started_at) as activity_date
        FROM games 
        WHERE user_id = ?
        UNION
        SELECT date(attempted_at) as activity_date
        FROM puzzle_attempts 
        WHERE user_id = ?
      ),
      ordered_dates AS (
        SELECT activity_date,
               ROW_NUMBER() OVER (ORDER BY activity_date DESC) as rn,
               julianday(activity_date) as jd
        FROM daily_activity
        ORDER BY activity_date DESC
      ),
      streak_calc AS (
        SELECT activity_date,
               (julianday('now') - jd) as days_ago,
               rn - (julianday('now') - jd) as streak_group
        FROM ordered_dates
      )
      SELECT COUNT(*) as streak
      FROM streak_calc
      WHERE streak_group = (
        SELECT MAX(streak_group) 
        FROM streak_calc 
        WHERE days_ago >= 0
      )
    `, [userId, userId]);

    // Get total games and wins
    const gameStats = await db.get(`
      SELECT 
        COUNT(*) as total_games,
        SUM(CASE WHEN result = '1-0' THEN 1 ELSE 0 END) as wins,
        SUM(CASE WHEN result = '0-1' THEN 1 ELSE 0 END) as losses,
        SUM(CASE WHEN result = '1/2-1/2' THEN 1 ELSE 0 END) as draws
      FROM games 
      WHERE user_id = ? AND status = 'completed'
    `, [userId]);

    // Get total puzzles solved
    const puzzleStats = await db.get(`
      SELECT 
        COUNT(*) as total_attempts,
        SUM(CASE WHEN correct = 1 THEN 1 ELSE 0 END) as correct_attempts,
        AVG(time_taken) as avg_time
      FROM puzzle_attempts 
      WHERE user_id = ?
    `, [userId]);

    res.json({
      success: true,
      data: {
        ratings: {
          chess: user?.chess_elo || 1000,
          puzzle: user?.puzzle_rating || 1000
        },
        activity: {
          todayGames: todayGames?.count || 0,
          todayPuzzles: todayPuzzles?.count || 0,
          currentStreak: streakResult?.streak || 0
        },
        statistics: {
          games: {
            total: gameStats?.total_games || 0,
            wins: gameStats?.wins || 0,
            losses: gameStats?.losses || 0,
            draws: gameStats?.draws || 0,
            winRate: gameStats?.total_games > 0 ? (gameStats?.wins || 0) / gameStats.total_games : 0
          },
          puzzles: {
            total: puzzleStats?.total_attempts || 0,
            correct: puzzleStats?.correct_attempts || 0,
            accuracy: puzzleStats?.total_attempts > 0 ? (puzzleStats?.correct_attempts || 0) / puzzleStats.total_attempts : 0,
            avgTime: Math.round(puzzleStats?.avg_time || 0)
          }
        }
      }
    });
  } catch (error) {
    console.error('Error fetching progress overview:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch progress overview'
    });
  }
});

// GET /api/progress/detailed - Get detailed progress stats
router.get('/detailed', async (req: AuthenticatedRequest, res) => {
  try {
    const db = Database.getInstance();
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }

    // Get rating history (last 30 days)
    const ratingHistory = await db.getAll(`
      SELECT 
        date(attempted_at) as date,
        AVG(rating_change) as avg_rating_change,
        COUNT(*) as attempts
      FROM puzzle_attempts 
      WHERE user_id = ? 
        AND attempted_at >= date('now', '-30 days')
      GROUP BY date(attempted_at)
      ORDER BY date
    `, [userId]);

    // Get performance by puzzle theme
    const themePerformance = await db.getAll(`
      SELECT 
        p.themes,
        COUNT(*) as attempts,
        AVG(CASE WHEN pa.correct = 1 THEN 1.0 ELSE 0.0 END) as accuracy,
        AVG(pa.time_taken) as avg_time
      FROM puzzle_attempts pa
      JOIN puzzles p ON pa.puzzle_id = p.id
      WHERE pa.user_id = ?
      GROUP BY p.themes
      HAVING attempts >= 5
      ORDER BY accuracy DESC
    `, [userId]);

    // Get time-based performance (by hour of day)
    const hourlyPerformance = await db.getAll(`
      SELECT 
        strftime('%H', attempted_at) as hour,
        COUNT(*) as attempts,
        AVG(CASE WHEN correct = 1 THEN 1.0 ELSE 0.0 END) as accuracy
      FROM puzzle_attempts 
      WHERE user_id = ?
      GROUP BY strftime('%H', attempted_at)
      HAVING attempts >= 3
      ORDER BY hour
    `, [userId]);

    // Get recent performance trend (last 10 sessions)
    const recentSessions = await db.getAll(`
      SELECT 
        date(attempted_at) as session_date,
        COUNT(*) as puzzles_solved,
        AVG(CASE WHEN correct = 1 THEN 1.0 ELSE 0.0 END) as accuracy,
        SUM(rating_change) as rating_change
      FROM puzzle_attempts 
      WHERE user_id = ?
      GROUP BY date(attempted_at)
      ORDER BY session_date DESC
      LIMIT 10
    `, [userId]);

    res.json({
      success: true,
      data: {
        ratingHistory: ratingHistory || [],
        themePerformance: themePerformance || [],
        hourlyPerformance: hourlyPerformance || [],
        recentSessions: recentSessions || []
      }
    });
  } catch (error) {
    console.error('Error fetching detailed progress:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch detailed progress'
    });
  }
});

// GET /api/progress/achievements - Get user achievements
router.get('/achievements', async (req: AuthenticatedRequest, res) => {
  try {
    const db = Database.getInstance();
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }

    // Calculate achievement progress
    const gameStats = await db.get(`
      SELECT 
        COUNT(*) as total_games,
        SUM(CASE WHEN result = '1-0' THEN 1 ELSE 0 END) as wins
      FROM games 
      WHERE user_id = ? AND status = 'completed'
    `, [userId]);

    const puzzleStats = await db.get(`
      SELECT 
        COUNT(*) as total_attempts,
        SUM(CASE WHEN correct = 1 THEN 1 ELSE 0 END) as correct_attempts
      FROM puzzle_attempts 
      WHERE user_id = ?
    `, [userId]);

    const user = await db.get('SELECT puzzle_rating, chess_elo FROM users WHERE id = ?', [userId]);

    // Define achievements
    const achievements = [
      {
        id: 'first_game',
        name: 'First Game',
        description: 'Complete your first chess game',
        unlocked: (gameStats?.total_games || 0) >= 1,
        progress: Math.min((gameStats?.total_games || 0), 1),
        target: 1
      },
      {
        id: 'game_winner',
        name: 'Game Winner',
        description: 'Win your first chess game',
        unlocked: (gameStats?.wins || 0) >= 1,
        progress: Math.min((gameStats?.wins || 0), 1),
        target: 1
      },
      {
        id: 'puzzle_solver',
        name: 'Puzzle Solver',
        description: 'Solve your first puzzle',
        unlocked: (puzzleStats?.correct_attempts || 0) >= 1,
        progress: Math.min((puzzleStats?.correct_attempts || 0), 1),
        target: 1
      },
      {
        id: 'puzzle_master',
        name: 'Puzzle Master',
        description: 'Solve 100 puzzles',
        unlocked: (puzzleStats?.correct_attempts || 0) >= 100,
        progress: Math.min((puzzleStats?.correct_attempts || 0), 100),
        target: 100
      },
      {
        id: 'rating_climber',
        name: 'Rating Climber',
        description: 'Reach 1200 puzzle rating',
        unlocked: (user?.puzzle_rating || 0) >= 1200,
        progress: Math.min((user?.puzzle_rating || 0), 1200),
        target: 1200
      }
    ];

    res.json({
      success: true,
      data: achievements
    });
  } catch (error) {
    console.error('Error fetching achievements:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch achievements'
    });
  }
});

// GET /api/progress/learning-paths - Get learning path progress
router.get('/learning-paths', async (req: AuthenticatedRequest, res) => {
  try {
    const db = Database.getInstance();
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }

    // For now, return static learning paths
    // In a full implementation, these would be stored in the database
    const learningPaths = [
      {
        id: 'beginner_tactics',
        name: 'Beginner Tactics',
        description: 'Learn basic tactical patterns',
        category: 'tactics',
        difficulty: 'beginner',
        progress: 0, // Would be calculated based on user progress
        totalLessons: 10,
        completedLessons: 0,
        estimatedTime: '2-3 hours',
        unlocked: true
      },
      {
        id: 'opening_principles',
        name: 'Opening Principles',
        description: 'Master the fundamentals of chess openings',
        category: 'openings',
        difficulty: 'beginner',
        progress: 0,
        totalLessons: 8,
        completedLessons: 0,
        estimatedTime: '1-2 hours',
        unlocked: true
      },
      {
        id: 'endgame_basics',
        name: 'Endgame Basics',
        description: 'Essential endgame knowledge',
        category: 'endgames',
        difficulty: 'intermediate',
        progress: 0,
        totalLessons: 12,
        completedLessons: 0,
        estimatedTime: '3-4 hours',
        unlocked: false // Would unlock after completing beginner paths
      }
    ];

    res.json({
      success: true,
      data: learningPaths
    });
  } catch (error) {
    console.error('Error fetching learning paths:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch learning paths'
    });
  }
});

export default router;