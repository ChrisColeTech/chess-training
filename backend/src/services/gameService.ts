import { Database } from '../utils/database';

export interface GameQuery {
  userId?: string;
  status?: string;
  aiLevel?: number;
  timeControl?: string;
  dateFrom?: string;
  dateTo?: string;
  limit?: number;
  offset?: number;
}

export interface GameReviewQuery {
  gameId?: string;
  userId?: string;
  status?: string;
  limit?: number;
  offset?: number;
}

export interface GameReviewMoveQuery {
  gameReviewId: string;
  moveNumber?: number;
}

export interface CreateGameData {
  player_white?: string;
  player_black?: string;
  ai_level?: number;
  time_control?: string;
  initial_fen?: string;
}

export interface MakeMoveData {
  move_notation: string;
  fen_after: string;
  time_taken?: number;
}

export interface GameStatsQuery {
  userId: string;
  dateFrom?: string;
  dateTo?: string;
  groupBy?: 'day' | 'week' | 'month';
}

export class GameService {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  // Games
  async getAllGames(query: GameQuery) {
    const { userId, status, aiLevel, timeControl, dateFrom, dateTo, limit = 50, offset = 0 } = query;
    
    let sqlQuery = 'SELECT * FROM games WHERE 1=1';
    const params: any[] = [];
    
    if (userId) {
      sqlQuery += ' AND (player_white = ? OR player_black = ?)';
      params.push(userId, userId);
    }
    
    if (status) {
      sqlQuery += ' AND status = ?';
      params.push(status);
    }
    
    if (aiLevel) {
      sqlQuery += ' AND ai_level = ?';
      params.push(Number(aiLevel));
    }
    
    if (timeControl) {
      sqlQuery += ' AND time_control = ?';
      params.push(timeControl);
    }
    
    if (dateFrom) {
      sqlQuery += ' AND DATE(created_at) >= ?';
      params.push(dateFrom);
    }
    
    if (dateTo) {
      sqlQuery += ' AND DATE(created_at) <= ?';
      params.push(dateTo);
    }
    
    sqlQuery += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));
    
    const games = await this.db.getAll(sqlQuery, params);
    
    const totalQuery = 'SELECT COUNT(*) as total FROM games WHERE 1=1' + 
      (userId ? ' AND (player_white = ? OR player_black = ?)' : '') +
      (status ? ' AND status = ?' : '') +
      (aiLevel ? ' AND ai_level = ?' : '') +
      (timeControl ? ' AND time_control = ?' : '') +
      (dateFrom ? ' AND DATE(created_at) >= ?' : '') +
      (dateTo ? ' AND DATE(created_at) <= ?' : '');
    
    const countParams: any[] = [];
    if (userId) countParams.push(userId, userId);
    if (status) countParams.push(status);
    if (aiLevel) countParams.push(Number(aiLevel));
    if (timeControl) countParams.push(timeControl);
    if (dateFrom) countParams.push(dateFrom);
    if (dateTo) countParams.push(dateTo);
    
    const totalResult = await this.db.get(totalQuery, countParams);
    
    return {
      games,
      total: totalResult.total,
      limit: Number(limit),
      offset: Number(offset)
    };
  }

  async getGameById(id: string) {
    const game = await this.db.get('SELECT * FROM games WHERE id = ?', [id]);
    
    if (!game) {
      throw new Error('Game not found');
    }
    
    return game;
  }

  async createGame(data: CreateGameData) {
    const { player_white, player_black, ai_level, time_control, initial_fen } = data;
    
    const gameId = await this.db.run(`
      INSERT INTO games (player_white, player_black, ai_level, time_control, initial_fen, status, current_fen)
      VALUES (?, ?, ?, ?, ?, 'active', ?)
    `, [player_white, player_black, ai_level, time_control, initial_fen || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', 
        initial_fen || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1']);
    
    return await this.getGameById(gameId.toString());
  }

  async makeMove(gameId: string, data: MakeMoveData) {
    const { move_notation, fen_after, time_taken } = data;
    
    // Update game with new position
    await this.db.run(`
      UPDATE games 
      SET current_fen = ?, updated_at = CURRENT_TIMESTAMP, move_count = move_count + 1
      WHERE id = ?
    `, [fen_after, gameId]);
    
    // Record the move (this would typically be in a separate moves table)
    // For this service, we'll assume moves are stored as part of game state
    
    return await this.getGameById(gameId);
  }

  async endGame(gameId: string, result: string, endReason: string) {
    await this.db.run(`
      UPDATE games 
      SET status = 'completed', result = ?, end_reason = ?, ended_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [result, endReason, gameId]);
    
    return await this.getGameById(gameId);
  }

  async getGameStats(query: GameStatsQuery) {
    const { userId, dateFrom, dateTo, groupBy = 'day' } = query;
    
    let timeFormat = '%Y-%m-%d';
    if (groupBy === 'week') timeFormat = '%Y-W%W';
    if (groupBy === 'month') timeFormat = '%Y-%m';
    
    let sqlQuery = `
      SELECT 
        strftime('${timeFormat}', created_at) as period,
        COUNT(*) as total_games,
        SUM(CASE WHEN result = 'win' THEN 1 ELSE 0 END) as wins,
        SUM(CASE WHEN result = 'loss' THEN 1 ELSE 0 END) as losses,
        SUM(CASE WHEN result = 'draw' THEN 1 ELSE 0 END) as draws,
        AVG(CASE WHEN ended_at IS NOT NULL THEN 
          (julianday(ended_at) - julianday(created_at)) * 24 * 60 
          ELSE NULL END) as avg_duration_minutes
      FROM games 
      WHERE (player_white = ? OR player_black = ?)
    `;
    const params: any[] = [userId, userId];
    
    if (dateFrom) {
      sqlQuery += ' AND DATE(created_at) >= ?';
      params.push(dateFrom);
    }
    
    if (dateTo) {
      sqlQuery += ' AND DATE(created_at) <= ?';
      params.push(dateTo);
    }
    
    sqlQuery += ' GROUP BY period ORDER BY period DESC';
    
    const stats = await this.db.getAll(sqlQuery, params);
    
    return stats;
  }

  // Game Reviews
  async getGameReviews(query: GameReviewQuery) {
    const { gameId, userId, status, limit = 50, offset = 0 } = query;
    
    let sqlQuery = `
      SELECT gr.*, g.player_white, g.player_black, g.result
      FROM game_reviews gr 
      JOIN games g ON gr.game_id = g.id 
      WHERE 1=1
    `;
    const params: any[] = [];
    
    if (gameId) {
      sqlQuery += ' AND gr.game_id = ?';
      params.push(gameId);
    }
    
    if (userId) {
      sqlQuery += ' AND gr.reviewer_id = ?';
      params.push(userId);
    }
    
    if (status) {
      sqlQuery += ' AND gr.status = ?';
      params.push(status);
    }
    
    sqlQuery += ' ORDER BY gr.created_at DESC LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));
    
    const reviews = await this.db.getAll(sqlQuery, params);
    
    return reviews;
  }

  async getGameReviewById(id: string) {
    const review = await this.db.get(`
      SELECT gr.*, g.player_white, g.player_black, g.result, g.current_fen
      FROM game_reviews gr 
      JOIN games g ON gr.game_id = g.id 
      WHERE gr.id = ?
    `, [id]);
    
    if (!review) {
      throw new Error('Game review not found');
    }
    
    // Get review moves
    const moves = await this.db.getAll(`
      SELECT * FROM game_review_moves 
      WHERE game_review_id = ? 
      ORDER BY move_number
    `, [id]);
    
    return {
      ...review,
      moves: moves || []
    };
  }

  async createGameReview(gameId: string, reviewerId: string, data: any) {
    const { analysis_type, engine_used, depth, notes } = data;
    
    const reviewId = await this.db.run(`
      INSERT INTO game_reviews (game_id, reviewer_id, analysis_type, engine_used, depth, notes, status)
      VALUES (?, ?, ?, ?, ?, ?, 'pending')
    `, [gameId, reviewerId, analysis_type, engine_used, depth, notes]);
    
    return await this.getGameReviewById(reviewId.toString());
  }

  // Game Review Moves
  async getGameReviewMoves(query: GameReviewMoveQuery) {
    const { gameReviewId, moveNumber } = query;
    
    let sqlQuery = 'SELECT * FROM game_review_moves WHERE game_review_id = ?';
    const params: any[] = [gameReviewId];
    
    if (moveNumber !== undefined) {
      sqlQuery += ' AND move_number = ?';
      params.push(Number(moveNumber));
    }
    
    sqlQuery += ' ORDER BY move_number';
    
    const moves = await this.db.getAll(sqlQuery, params);
    
    return moves;
  }

  async addGameReviewMove(gameReviewId: string, moveData: any) {
    const { move_number, move_notation, evaluation, best_move, comment, time_spent } = moveData;
    
    const moveId = await this.db.run(`
      INSERT INTO game_review_moves (game_review_id, move_number, move_notation, evaluation, best_move, comment, time_spent)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [gameReviewId, move_number, move_notation, evaluation, best_move, comment, time_spent]);
    
    return moveId;
  }

  async getUserGameHistory(userId: string, limit: number = 20) {
    const games = await this.db.getAll(`
      SELECT * FROM games 
      WHERE player_white = ? OR player_black = ?
      ORDER BY created_at DESC 
      LIMIT ?
    `, [userId, userId, limit]);
    
    return games;
  }
}