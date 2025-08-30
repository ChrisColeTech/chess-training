import { Database } from '../utils/database';
import { Chess } from 'chess.js';
import { v4 as uuidv4 } from 'uuid';
import { 
  Puzzle, 
  PuzzleAttempt, 
  PuzzleResponse, 
  SolvePuzzleRequest, 
  SolvePuzzleResponse,
  HintResponse 
} from '../models/Puzzle';

export class PuzzleService {
  private db = Database.getInstance();

  async getAllPuzzles(options: {
    page: number;
    limit: number;
    difficulty?: string;
    themes?: string;
  }): Promise<{
    data: any[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    const { page, limit } = options;
    const offset = (page - 1) * limit;

    // Build WHERE clause based on filters
    let whereClause = '';
    const params: any[] = [];

    if (options.difficulty) {
      const difficultyRanges = {
        beginner: [800, 1200],
        intermediate: [1200, 1600],
        advanced: [1600, 2000],
        expert: [2000, 3000]
      };
      const range = difficultyRanges[options.difficulty.toLowerCase() as keyof typeof difficultyRanges];
      if (range) {
        whereClause = 'WHERE rating BETWEEN ? AND ?';
        params.push(...range);
      }
    }

    if (options.themes) {
      const themeFilter = whereClause ? 'AND' : 'WHERE';
      whereClause += ` ${themeFilter} themes LIKE ?`;
      params.push(`%"${options.themes}"%`);
    }

    // Get total count
    const totalResult = await this.db.db.get(
      `SELECT COUNT(*) as total FROM puzzles ${whereClause}`,
      params
    );
    const total = totalResult.total;

    // Get puzzles
    const puzzles = await this.db.db.all(
      `SELECT * FROM puzzles ${whereClause} ORDER BY rating ASC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    return {
      data: puzzles.map((puzzle: any) => this.formatPuzzleResponse(puzzle)),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async getPuzzlesByCategory(category: string, options: {
    page: number;
    limit: number;
  }): Promise<{
    data: any[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    const { page, limit } = options;
    const offset = (page - 1) * limit;

    // Filter by theme/category in the themes JSON field
    const whereClause = 'WHERE themes LIKE ?';
    const params = [`%"${category}"%`];

    // Get total count
    const totalResult = await this.db.db.get(
      `SELECT COUNT(*) as total FROM puzzles ${whereClause}`,
      params
    );
    const total = totalResult?.total || 0;

    // Get puzzles
    const puzzles = await this.db.db.all(
      `SELECT * FROM puzzles ${whereClause} ORDER BY rating ASC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    return {
      data: puzzles.map((puzzle: any) => this.formatPuzzleResponse(puzzle)),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async getPuzzlesByDifficulty(difficulty: string, options: {
    page: number;
    limit: number;
  }): Promise<{
    data: any[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    const { page, limit } = options;
    const offset = (page - 1) * limit;

    // Map difficulty to rating ranges
    const difficultyRanges = {
      beginner: [800, 1200],
      intermediate: [1200, 1600],
      advanced: [1600, 2000],
      expert: [2000, 3000]
    };

    const range = difficultyRanges[difficulty.toLowerCase() as keyof typeof difficultyRanges];
    if (!range) {
      return {
        data: [],
        pagination: {
          page,
          limit,
          total: 0,
          totalPages: 0
        }
      };
    }

    const whereClause = 'WHERE rating BETWEEN ? AND ?';
    const params = [range[0], range[1]];

    // Get total count
    const totalResult = await this.db.db.get(
      `SELECT COUNT(*) as total FROM puzzles ${whereClause}`,
      params
    );
    const total = totalResult?.total || 0;

    // Get puzzles
    const puzzles = await this.db.db.all(
      `SELECT * FROM puzzles ${whereClause} ORDER BY rating ASC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    return {
      data: puzzles.map((puzzle: any) => this.formatPuzzleResponse(puzzle)),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async getNextPuzzle(userId: string): Promise<PuzzleResponse> {
    const user = await this.db.db.get('SELECT puzzle_rating FROM users WHERE id = ?', [userId]);
    if (!user) throw new Error('User not found');

    const rating = user.puzzle_rating;
    const ratingRange = 150; // Wider range for POC

    // Get puzzle within rating range that user hasn't solved recently
    const puzzle = await this.db.db.get(`
      SELECT p.* FROM puzzles p
      LEFT JOIN puzzle_attempts pa ON p.id = pa.puzzle_id AND pa.user_id = ?
      WHERE p.rating BETWEEN ? AND ?
      AND (pa.id IS NULL OR pa.attempted_at < datetime('now', '-24 hours'))
      ORDER BY RANDOM()
      LIMIT 1
    `, [userId, rating - ratingRange, rating + ratingRange]);

    if (!puzzle) {
      // If no puzzles in range, get any puzzle not attempted recently
      const anyPuzzle = await this.db.db.get(`
        SELECT p.* FROM puzzles p
        LEFT JOIN puzzle_attempts pa ON p.id = pa.puzzle_id AND pa.user_id = ?
        WHERE (pa.id IS NULL OR pa.attempted_at < datetime('now', '-24 hours'))
        ORDER BY RANDOM()
        LIMIT 1
      `, [userId]);

      if (!anyPuzzle) {
        throw new Error('No puzzles available');
      }

      return this.formatPuzzleResponse(anyPuzzle);
    }

    return this.formatPuzzleResponse(puzzle);
  }

  async solvePuzzle(userId: string, puzzleId: string, solutionData: SolvePuzzleRequest): Promise<SolvePuzzleResponse> {
    const puzzle = await this.db.db.get('SELECT * FROM puzzles WHERE id = ?', [puzzleId]);
    if (!puzzle) throw new Error('Puzzle not found');

    const user = await this.db.db.get('SELECT puzzle_rating FROM users WHERE id = ?', [userId]);
    if (!user) throw new Error('User not found');

    const { moves, timeTaken } = solutionData;
    const solutionMoves = JSON.parse(puzzle.solution_moves);
    const isCorrect = this.checkSolution(moves, solutionMoves);

    // Calculate rating change using simplified algorithm
    const ratingDiff = puzzle.rating - user.puzzle_rating;
    let ratingChange = 0;

    if (isCorrect) {
      // Bonus for solving correctly
      ratingChange = Math.max(1, Math.min(25, 12 - Math.floor(ratingDiff / 100)));
      
      // Time bonus (faster solving gets slight bonus)
      if (timeTaken < 30000) { // Less than 30 seconds
        ratingChange += 2;
      } else if (timeTaken < 60000) { // Less than 1 minute
        ratingChange += 1;
      }
    } else {
      // Penalty for wrong answer
      ratingChange = Math.max(-25, Math.min(-1, -8 - Math.floor(ratingDiff / 150)));
    }

    const newRating = Math.max(800, Math.min(3000, user.puzzle_rating + ratingChange));

    // Save attempt
    const attemptId = uuidv4();
    await this.db.db.run(`
      INSERT INTO puzzle_attempts (id, user_id, puzzle_id, moves, correct, time_taken, rating_change)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [attemptId, userId, puzzleId, JSON.stringify(moves), isCorrect ? 1 : 0, timeTaken, ratingChange]);

    // Update user rating
    await this.db.db.run(
      'UPDATE users SET puzzle_rating = ?, updated_at = datetime("now") WHERE id = ?',
      [newRating, userId]
    );

    if (isCorrect) {
      return {
        correct: true,
        solution: solutionMoves,
        ratingChange,
        newRating,
        feedback: this.generateSuccessFeedback(timeTaken)
      };
    } else {
      return {
        correct: false,
        hint: this.generateHint(puzzle),
        ratingChange,
        newRating
      };
    }
  }

  async getHint(userId: string, puzzleId: string): Promise<HintResponse> {
    const puzzle = await this.db.db.get('SELECT * FROM puzzles WHERE id = ?', [puzzleId]);
    if (!puzzle) throw new Error('Puzzle not found');

    return {
      hint: this.generateHint(puzzle),
      hintsUsed: 1
    };
  }

  async getPuzzleStats(userId: string): Promise<any> {
    const stats = await this.db.db.get(`
      SELECT 
        COUNT(*) as totalAttempts,
        SUM(CASE WHEN correct = 1 THEN 1 ELSE 0 END) as correctAttempts,
        AVG(time_taken) as avgTimeMS,
        MAX(attempted_at) as lastAttempt
      FROM puzzle_attempts 
      WHERE user_id = ?
    `, [userId]);

    const user = await this.db.db.get('SELECT puzzle_rating FROM users WHERE id = ?', [userId]);

    return {
      totalAttempts: stats.totalAttempts || 0,
      correctAttempts: stats.correctAttempts || 0,
      accuracy: stats.totalAttempts ? (stats.correctAttempts / stats.totalAttempts * 100) : 0,
      avgTimeSeconds: stats.avgTimeMS ? Math.round(stats.avgTimeMS / 1000) : 0,
      currentRating: user?.puzzle_rating || 1000,
      lastAttempt: stats.lastAttempt
    };
  }

  private formatPuzzleResponse(puzzle: any): PuzzleResponse {
    return {
      id: puzzle.id,
      fen: puzzle.fen,
      solutionMoves: JSON.parse(puzzle.solution_moves),
      themes: JSON.parse(puzzle.themes),
      rating: puzzle.rating,
      description: puzzle.description
    };
  }

  private checkSolution(userMoves: string[], solutionMoves: string[]): boolean {
    if (userMoves.length === 0 || solutionMoves.length === 0) return false;
    
    // Check if user has made at least as many moves as the solution requires
    if (userMoves.length < solutionMoves.length) return false;
    
    // Check if all solution moves match the user moves in sequence
    for (let i = 0; i < solutionMoves.length; i++) {
      if (userMoves[i] !== solutionMoves[i]) {
        return false;
      }
    }
    
    return true;
  }

  private generateHint(puzzle: any): string {
    const themes = JSON.parse(puzzle.themes);
    
    const hintMap: { [key: string]: string } = {
      'fork': 'Look for a move that attacks multiple pieces at once',
      'pin': 'Consider moves that restrict an opponent piece from moving',
      'skewer': 'Find a way to attack a valuable piece through another piece',
      'discovery': 'Look for moves that reveal an attack from another piece',
      'deflection': 'Try to force the opponent piece away from its duty',
      'attraction': 'Lure the opponent piece to a worse square',
      'clearance': 'Clear a line for another piece to attack',
      'interference': 'Block an opponent piece from defending',
      'sacrifice': 'Consider giving up material for a bigger advantage',
      'mate': 'Look for checkmate in a few moves',
      'mateIn1': 'Find checkmate in one move',
      'mateIn2': 'Find checkmate in two moves',
      'endgame': 'Focus on king and pawn positioning',
      'middlegame': 'Look for tactical combinations',
      'opening': 'Develop pieces and control the center'
    };

    // Return hint for first matching theme
    for (const theme of themes) {
      if (hintMap[theme]) {
        return hintMap[theme];
      }
    }

    // Generic hints based on position analysis
    try {
      const chess = new Chess(puzzle.fen);
      const moves = chess.moves({ verbose: true });
      
      // Look for checks
      const checks = moves.filter(move => {
        chess.move(move);
        const isCheck = chess.inCheck();
        chess.undo();
        return isCheck;
      });
      
      if (checks.length > 0) {
        return 'Look for moves that give check';
      }
      
      // Look for captures
      const captures = moves.filter(move => move.captured);
      if (captures.length > 0) {
        return 'Consider capturing moves';
      }
      
      return 'Look for the strongest move in the position';
    } catch (error) {
      return 'Look for the best move in the position';
    }
  }

  private generateSuccessFeedback(timeTaken: number): string {
    if (timeTaken < 10000) {
      return 'Lightning fast! Excellent pattern recognition.';
    } else if (timeTaken < 30000) {
      return 'Great job! You found the solution quickly.';
    } else if (timeTaken < 60000) {
      return 'Well done! Keep practicing to improve your speed.';
    } else {
      return 'Correct! Good calculation, but try to find the pattern faster.';
    }
  }
}