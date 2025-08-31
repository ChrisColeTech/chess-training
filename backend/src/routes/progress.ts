import express from 'express';
import { Database } from '../utils/database';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';

const router = express.Router();

// All progress routes require authentication
router.use(authenticateToken);

/**
 * @swagger
 * components:
 *   schemas:
 *     ProgressOverview:
 *       type: object
 *       properties:
 *         ratings:
 *           type: object
 *           properties:
 *             chess:
 *               type: integer
 *               description: Current chess rating
 *               example: 1350
 *             puzzle:
 *               type: integer
 *               description: Current puzzle rating
 *               example: 1420
 *         activity:
 *           type: object
 *           properties:
 *             todayGames:
 *               type: integer
 *               description: Games played today
 *               example: 3
 *             todayPuzzles:
 *               type: integer
 *               description: Puzzles attempted today
 *               example: 15
 *             currentStreak:
 *               type: integer
 *               description: Current daily activity streak
 *               example: 7
 *         statistics:
 *           type: object
 *           properties:
 *             games:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 245
 *                 wins:
 *                   type: integer
 *                   example: 127
 *                 losses:
 *                   type: integer
 *                   example: 98
 *                 draws:
 *                   type: integer
 *                   example: 20
 *                 winRate:
 *                   type: number
 *                   format: float
 *                   example: 0.518
 *             puzzles:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 1523
 *                 correct:
 *                   type: integer
 *                   example: 1287
 *                 accuracy:
 *                   type: number
 *                   format: float
 *                   example: 0.845
 *                 avgTime:
 *                   type: integer
 *                   description: Average time in seconds
 *                   example: 45
 *     DetailedProgress:
 *       type: object
 *       properties:
 *         ratingHistory:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               avg_rating_change:
 *                 type: number
 *               attempts:
 *                 type: integer
 *         themePerformance:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               themes:
 *                 type: string
 *                 description: Tactical themes
 *               attempts:
 *                 type: integer
 *               accuracy:
 *                 type: number
 *               avg_time:
 *                 type: number
 *         hourlyPerformance:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               hour:
 *                 type: string
 *                 description: Hour of day (00-23)
 *               attempts:
 *                 type: integer
 *               accuracy:
 *                 type: number
 *         recentSessions:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               session_date:
 *                 type: string
 *                 format: date
 *               puzzles_solved:
 *                 type: integer
 *               accuracy:
 *                 type: number
 *               rating_change:
 *                 type: number
 *     Achievement:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Achievement identifier
 *         name:
 *           type: string
 *           description: Achievement name
 *         description:
 *           type: string
 *           description: Achievement description
 *         unlocked:
 *           type: boolean
 *           description: Whether achievement is unlocked
 *         progress:
 *           type: number
 *           description: Current progress toward achievement
 *         target:
 *           type: number
 *           description: Target value to unlock achievement
 *     LearningPath:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Learning path identifier
 *         name:
 *           type: string
 *           description: Learning path name
 *         description:
 *           type: string
 *           description: Learning path description
 *         category:
 *           type: string
 *           enum: [fundamentals, tactics, strategy, openings, endgames]
 *           description: Learning path category
 *         difficulty:
 *           type: string
 *           enum: [beginner, intermediate, advanced, expert]
 *           description: Difficulty level
 *         progress:
 *           type: number
 *           description: Completion progress (0-1)
 *         totalLessons:
 *           type: integer
 *           description: Total number of lessons
 *         completedLessons:
 *           type: integer
 *           description: Number of completed lessons
 *         estimatedTime:
 *           type: string
 *           description: Estimated completion time
 *         unlocked:
 *           type: boolean
 *           description: Whether path is unlocked
 */

/**
 * @swagger
 * /api/progress/overview:
 *   get:
 *     tags:
 *       - Progress
 *     summary: Get progress overview
 *     description: Retrieves a comprehensive overview of the user's progress including ratings, activity, and statistics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Progress overview retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/ProgressOverview'
 *             example:
 *               success: true
 *               data:
 *                 ratings:
 *                   chess: 1350
 *                   puzzle: 1420
 *                 activity:
 *                   todayGames: 3
 *                   todayPuzzles: 15
 *                   currentStreak: 7
 *                 statistics:
 *                   games:
 *                     total: 245
 *                     wins: 127
 *                     losses: 98
 *                     draws: 20
 *                     winRate: 0.518
 *                   puzzles:
 *                     total: 1523
 *                     correct: 1287
 *                     accuracy: 0.845
 *                     avgTime: 45
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Authentication required"
 *       500:
 *         description: Failed to fetch progress overview
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Failed to fetch progress overview"
 */
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

/**
 * @swagger
 * /api/progress/detailed:
 *   get:
 *     tags:
 *       - Progress
 *     summary: Get detailed progress statistics
 *     description: Retrieves detailed progress analytics including rating history, theme performance, hourly patterns, and recent session data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Detailed progress statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/DetailedProgress'
 *             example:
 *               success: true
 *               data:
 *                 ratingHistory:
 *                   - date: "2024-01-20"
 *                     avg_rating_change: 15.5
 *                     attempts: 12
 *                   - date: "2024-01-19"
 *                     avg_rating_change: -8.2
 *                     attempts: 8
 *                 themePerformance:
 *                   - themes: "fork,pin"
 *                     attempts: 45
 *                     accuracy: 0.89
 *                     avg_time: 38.5
 *                   - themes: "skewer,deflection"
 *                     attempts: 32
 *                     accuracy: 0.78
 *                     avg_time: 42.1
 *                 hourlyPerformance:
 *                   - hour: "14"
 *                     attempts: 89
 *                     accuracy: 0.91
 *                   - hour: "20"
 *                     attempts: 156
 *                     accuracy: 0.87
 *                 recentSessions:
 *                   - session_date: "2024-01-20"
 *                     puzzles_solved: 25
 *                     accuracy: 0.88
 *                     rating_change: 18
 *                   - session_date: "2024-01-19"
 *                     puzzles_solved: 15
 *                     accuracy: 0.73
 *                     rating_change: -5
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Failed to fetch detailed progress
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
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

/**
 * @swagger
 * /api/progress/achievements:
 *   get:
 *     tags:
 *       - Progress
 *     summary: Get user achievements
 *     description: Retrieves all achievements with their unlock status and progress
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User achievements retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Achievement'
 *             example:
 *               success: true
 *               data:
 *                 - id: "first_game"
 *                   name: "First Game"
 *                   description: "Complete your first chess game"
 *                   unlocked: true
 *                   progress: 1
 *                   target: 1
 *                 - id: "game_winner"
 *                   name: "Game Winner"
 *                   description: "Win your first chess game"
 *                   unlocked: true
 *                   progress: 1
 *                   target: 1
 *                 - id: "puzzle_solver"
 *                   name: "Puzzle Solver"
 *                   description: "Solve your first puzzle"
 *                   unlocked: true
 *                   progress: 1
 *                   target: 1
 *                 - id: "puzzle_master"
 *                   name: "Puzzle Master"
 *                   description: "Solve 100 puzzles"
 *                   unlocked: false
 *                   progress: 67
 *                   target: 100
 *                 - id: "rating_climber"
 *                   name: "Rating Climber"
 *                   description: "Reach 1200 puzzle rating"
 *                   unlocked: true
 *                   progress: 1200
 *                   target: 1200
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Failed to fetch achievements
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
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

/**
 * @swagger
 * /api/progress/learning-paths:
 *   get:
 *     tags:
 *       - Progress
 *     summary: Get learning path progress
 *     description: Retrieves all available learning paths with progress information and unlock status
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Learning paths retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/LearningPath'
 *             example:
 *               success: true
 *               data:
 *                 - id: "beginner_tactics"
 *                   name: "Beginner Tactics"
 *                   description: "Learn basic tactical patterns"
 *                   category: "tactics"
 *                   difficulty: "beginner"
 *                   progress: 0.3
 *                   totalLessons: 10
 *                   completedLessons: 3
 *                   estimatedTime: "2-3 hours"
 *                   unlocked: true
 *                 - id: "opening_principles"
 *                   name: "Opening Principles"
 *                   description: "Master the fundamentals of chess openings"
 *                   category: "openings"
 *                   difficulty: "beginner"
 *                   progress: 0
 *                   totalLessons: 8
 *                   completedLessons: 0
 *                   estimatedTime: "1-2 hours"
 *                   unlocked: true
 *                 - id: "endgame_basics"
 *                   name: "Endgame Basics"
 *                   description: "Essential endgame knowledge"
 *                   category: "endgames"
 *                   difficulty: "intermediate"
 *                   progress: 0
 *                   totalLessons: 12
 *                   completedLessons: 0
 *                   estimatedTime: "3-4 hours"
 *                   unlocked: false
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Failed to fetch learning paths
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
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