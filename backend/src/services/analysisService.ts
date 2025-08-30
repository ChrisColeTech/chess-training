import { Database } from '../utils/database';

export interface AnalysisPositionQuery {
  category?: string;
  difficulty?: string;
  fen?: string;
  tags?: string[];
  limit?: number;
  offset?: number;
}

export interface EndgamePositionQuery {
  category?: string;
  difficulty?: string;
  material?: string;
  result?: string;
  limit?: number;
  offset?: number;
}

export interface CreateAnalysisPositionData {
  fen: string;
  title: string;
  description?: string;
  category: string;
  difficulty: string;
  best_moves?: string[];
  analysis?: any;
  tags?: string[];
  source?: string;
}

export interface CreateEndgamePositionData {
  fen: string;
  title: string;
  description?: string;
  category: string;
  difficulty: string;
  material: string;
  result: string;
  key_moves?: string[];
  principle?: string;
  tags?: string[];
}

export interface PositionAnalysisRequest {
  fen: string;
  depth?: number;
  engine?: string;
  time_limit?: number;
}

export class AnalysisService {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  // Analysis Positions
  async getAllAnalysisPositions(query: AnalysisPositionQuery) {
    const { category, difficulty, fen, tags, limit = 50, offset = 0 } = query;
    
    let sqlQuery = 'SELECT * FROM analysis_positions WHERE 1=1';
    const params: any[] = [];
    
    if (category) {
      sqlQuery += ' AND category = ?';
      params.push(category);
    }
    
    if (difficulty) {
      sqlQuery += ' AND difficulty = ?';
      params.push(difficulty);
    }
    
    if (fen) {
      sqlQuery += ' AND fen = ?';
      params.push(fen);
    }
    
    if (tags && tags.length > 0) {
      for (const tag of tags) {
        sqlQuery += ' AND tags LIKE ?';
        params.push(`%${tag}%`);
      }
    }
    
    sqlQuery += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));
    
    const positions = await this.db.getAll(sqlQuery, params);
    
    const totalQuery = 'SELECT COUNT(*) as total FROM analysis_positions WHERE 1=1' + 
      (category ? ' AND category = ?' : '') +
      (difficulty ? ' AND difficulty = ?' : '') +
      (fen ? ' AND fen = ?' : '') +
      (tags ? tags.map(() => ' AND tags LIKE ?').join('') : '');
    
    const countParams: any[] = [];
    if (category) countParams.push(category);
    if (difficulty) countParams.push(difficulty);
    if (fen) countParams.push(fen);
    if (tags && tags.length > 0) {
      for (const tag of tags) {
        countParams.push(`%${tag}%`);
      }
    }
    
    const totalResult = await this.db.get(totalQuery, countParams);
    
    return {
      positions,
      total: totalResult.total,
      limit: Number(limit),
      offset: Number(offset)
    };
  }

  async getAnalysisPositionById(id: string) {
    const position = await this.db.get('SELECT * FROM analysis_positions WHERE id = ?', [id]);
    
    if (!position) {
      throw new Error('Analysis position not found');
    }
    
    return position;
  }

  async createAnalysisPosition(data: CreateAnalysisPositionData) {
    const { fen, title, description, category, difficulty, best_moves, analysis, tags, source } = data;
    
    const positionId = await this.db.run(`
      INSERT INTO analysis_positions (fen, title, description, category, difficulty, best_moves, analysis, tags, source)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [fen, title, description, category, difficulty, JSON.stringify(best_moves || []),
        JSON.stringify(analysis || {}), JSON.stringify(tags || []), source]);
    
    return await this.getAnalysisPositionById(positionId.toString());
  }

  async updateAnalysisPosition(id: string, data: Partial<CreateAnalysisPositionData>) {
    const existing = await this.getAnalysisPositionById(id);
    
    const { fen, title, description, category, difficulty, best_moves, analysis, tags, source } = data;
    
    await this.db.run(`
      UPDATE analysis_positions 
      SET fen = ?, title = ?, description = ?, category = ?, difficulty = ?, 
          best_moves = ?, analysis = ?, tags = ?, source = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [fen || existing.fen, title || existing.title, description || existing.description,
        category || existing.category, difficulty || existing.difficulty, 
        JSON.stringify(best_moves) || existing.best_moves, JSON.stringify(analysis) || existing.analysis,
        JSON.stringify(tags) || existing.tags, source || existing.source, id]);
    
    return await this.getAnalysisPositionById(id);
  }

  async deleteAnalysisPosition(id: string) {
    const position = await this.getAnalysisPositionById(id);
    
    await this.db.run('DELETE FROM analysis_positions WHERE id = ?', [id]);
    
    return position;
  }

  async getAnalysisPositionsByCategory(category: string) {
    const positions = await this.db.getAll(`
      SELECT * FROM analysis_positions 
      WHERE category = ?
      ORDER BY difficulty, created_at DESC
    `, [category]);
    
    return positions;
  }

  // Endgame Positions
  async getAllEndgamePositions(query: EndgamePositionQuery) {
    const { category, difficulty, material, result, limit = 50, offset = 0 } = query;
    
    let sqlQuery = 'SELECT * FROM endgame_positions WHERE 1=1';
    const params: any[] = [];
    
    if (category) {
      sqlQuery += ' AND category = ?';
      params.push(category);
    }
    
    if (difficulty) {
      sqlQuery += ' AND difficulty = ?';
      params.push(difficulty);
    }
    
    if (material) {
      sqlQuery += ' AND material = ?';
      params.push(material);
    }
    
    if (result) {
      sqlQuery += ' AND result = ?';
      params.push(result);
    }
    
    sqlQuery += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));
    
    const positions = await this.db.getAll(sqlQuery, params);
    
    const totalQuery = 'SELECT COUNT(*) as total FROM endgame_positions WHERE 1=1' + 
      (category ? ' AND category = ?' : '') +
      (difficulty ? ' AND difficulty = ?' : '') +
      (material ? ' AND material = ?' : '') +
      (result ? ' AND result = ?' : '');
    
    const countParams: any[] = [];
    if (category) countParams.push(category);
    if (difficulty) countParams.push(difficulty);
    if (material) countParams.push(material);
    if (result) countParams.push(result);
    
    const totalResult = await this.db.get(totalQuery, countParams);
    
    return {
      positions,
      total: totalResult.total,
      limit: Number(limit),
      offset: Number(offset)
    };
  }

  async getEndgamePositionById(id: string) {
    const position = await this.db.get('SELECT * FROM endgame_positions WHERE id = ?', [id]);
    
    if (!position) {
      throw new Error('Endgame position not found');
    }
    
    return position;
  }

  async createEndgamePosition(data: CreateEndgamePositionData) {
    const { fen, title, description, category, difficulty, material, result, key_moves, principle, tags } = data;
    
    const positionId = await this.db.run(`
      INSERT INTO endgame_positions (fen, title, description, category, difficulty, material, result, key_moves, principle, tags)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [fen, title, description, category, difficulty, material, result, 
        JSON.stringify(key_moves || []), principle, JSON.stringify(tags || [])]);
    
    return await this.getEndgamePositionById(positionId.toString());
  }

  async updateEndgamePosition(id: string, data: Partial<CreateEndgamePositionData>) {
    const existing = await this.getEndgamePositionById(id);
    
    const { fen, title, description, category, difficulty, material, result, key_moves, principle, tags } = data;
    
    await this.db.run(`
      UPDATE endgame_positions 
      SET fen = ?, title = ?, description = ?, category = ?, difficulty = ?, material = ?, 
          result = ?, key_moves = ?, principle = ?, tags = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [fen || existing.fen, title || existing.title, description || existing.description,
        category || existing.category, difficulty || existing.difficulty, material || existing.material,
        result || existing.result, JSON.stringify(key_moves) || existing.key_moves, 
        principle || existing.principle, JSON.stringify(tags) || existing.tags, id]);
    
    return await this.getEndgamePositionById(id);
  }

  async deleteEndgamePosition(id: string) {
    const position = await this.getEndgamePositionById(id);
    
    await this.db.run('DELETE FROM endgame_positions WHERE id = ?', [id]);
    
    return position;
  }

  async getEndgamePositionsByMaterial(material: string) {
    const positions = await this.db.getAll(`
      SELECT * FROM endgame_positions 
      WHERE material = ?
      ORDER BY difficulty, created_at DESC
    `, [material]);
    
    return positions;
  }

  // Position Analysis (Engine Integration)
  async analyzePosition(request: PositionAnalysisRequest) {
    const { fen, depth = 15, engine = 'stockfish', time_limit = 5000 } = request;
    
    try {
      // In a real implementation, this would integrate with an actual chess engine
      // For now, we'll return a mock analysis
      const mockAnalysis = {
        fen,
        bestMove: 'e2e4', // This would come from the engine
        evaluation: 0.25, // This would be the position evaluation
        pv: ['e2e4', 'e7e5', 'g1f3'], // Principal variation
        depth,
        nodes: 150000,
        time: time_limit,
        engine,
        analysis_date: new Date().toISOString()
      };
      
      // Store analysis in database for future reference
      await this.db.run(`
        INSERT OR REPLACE INTO position_analysis (fen, engine, depth, evaluation, best_move, principal_variation, analysis_data)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [fen, engine, depth, mockAnalysis.evaluation, mockAnalysis.bestMove, 
          JSON.stringify(mockAnalysis.pv), JSON.stringify(mockAnalysis)]);
      
      return mockAnalysis;
    } catch (error) {
      throw new Error(`Failed to analyze position: ${(error as any).message}`);
    }
  }

  async getStoredAnalysis(fen: string, engine: string = 'stockfish') {
    const analysis = await this.db.get(`
      SELECT * FROM position_analysis 
      WHERE fen = ? AND engine = ?
      ORDER BY created_at DESC 
      LIMIT 1
    `, [fen, engine]);
    
    if (!analysis) {
      return null;
    }
    
    return {
      ...analysis,
      analysis_data: JSON.parse(analysis.analysis_data),
      principal_variation: JSON.parse(analysis.principal_variation)
    };
  }

  async getPositionStatistics() {
    const stats = await this.db.get(`
      SELECT 
        (SELECT COUNT(*) FROM analysis_positions) as analysis_positions_count,
        (SELECT COUNT(*) FROM endgame_positions) as endgame_positions_count,
        (SELECT COUNT(DISTINCT category) FROM analysis_positions) as analysis_categories,
        (SELECT COUNT(DISTINCT category) FROM endgame_positions) as endgame_categories,
        (SELECT COUNT(DISTINCT material) FROM endgame_positions) as endgame_materials
    `);
    
    return {
      totalAnalysisPositions: stats.analysis_positions_count || 0,
      totalEndgamePositions: stats.endgame_positions_count || 0,
      analysisCategories: stats.analysis_categories || 0,
      endgameCategories: stats.endgame_categories || 0,
      endgameMaterials: stats.endgame_materials || 0
    };
  }

  async getAnalysisCategories() {
    const categories = await this.db.getAll(`
      SELECT 
        category,
        COUNT(*) as position_count,
        COUNT(DISTINCT difficulty) as difficulty_levels
      FROM analysis_positions
      GROUP BY category 
      ORDER BY position_count DESC
    `);
    
    return categories;
  }

  async getEndgameCategories() {
    const categories = await this.db.getAll(`
      SELECT 
        category,
        COUNT(*) as position_count,
        COUNT(DISTINCT material) as material_types,
        COUNT(DISTINCT result) as result_types
      FROM endgame_positions
      GROUP BY category 
      ORDER BY position_count DESC
    `);
    
    return categories;
  }

  async searchPositions(query: string, type: 'analysis' | 'endgame' | 'both' = 'both') {
    const searchTerm = `%${query}%`;
    let results: any[] = [];
    
    if (type === 'analysis' || type === 'both') {
      const analysisPositions = await this.db.getAll(`
        SELECT 'analysis' as type, * FROM analysis_positions 
        WHERE title LIKE ? OR description LIKE ? OR tags LIKE ?
      `, [searchTerm, searchTerm, searchTerm]);
      results = results.concat(analysisPositions);
    }
    
    if (type === 'endgame' || type === 'both') {
      const endgamePositions = await this.db.getAll(`
        SELECT 'endgame' as type, * FROM endgame_positions 
        WHERE title LIKE ? OR description LIKE ? OR principle LIKE ? OR tags LIKE ?
      `, [searchTerm, searchTerm, searchTerm, searchTerm]);
      results = results.concat(endgamePositions);
    }
    
    return results;
  }

  // Frontend compatibility methods using database
  async analyzeGame(pgn: string, options: { depth?: number } = {}): Promise<any> {
    // For POC, basic analysis. In production this would use chess engine
    const Chess = require('chess.js');
    const chess = new Chess();
    
    try {
      chess.loadPgn(pgn);
      const moves = chess.history({ verbose: true });
      
      const analysis = {
        moves: moves.map((move: any, index: number) => ({
          move: move.san,
          evaluation: Math.random() * 200 - 100, // Mock evaluation
          bestMove: 'Nf3', // Mock best move
          comment: this.generateMoveComment(move)
        })),
        accuracy: { white: 85, black: 82 },
        blunders: 2,
        mistakes: 4,
        inaccuracies: 6
      };

      return analysis;
    } catch (error) {
      throw new Error('Invalid PGN format');
    }
  }

  async getBestMove(fen: string, depth: number = 15): Promise<{ move: string; evaluation: number }> {
    // For POC, return mock data. In production this would use chess engine
    const Chess = require('chess.js');
    const chess = new Chess(fen);
    
    const legalMoves = chess.moves();
    if (legalMoves.length === 0) {
      throw new Error('No legal moves available');
    }

    // Return random legal move with mock evaluation
    const randomMove = legalMoves[Math.floor(Math.random() * legalMoves.length)];
    return {
      move: randomMove,
      evaluation: Math.random() * 100 - 50 // Mock evaluation
    };
  }

  async identifyOpening(moves: string[]): Promise<{ opening: string; eco: string; variation?: string }> {
    // Use existing openings database
    const moveString = moves.join(' ');
    
    const opening = await this.db.get(`
      SELECT name, eco_code, description
      FROM openings
      WHERE moves LIKE ?
      ORDER BY LENGTH(moves) DESC
      LIMIT 1
    `, [`%${moveString}%`]);

    if (opening) {
      return {
        opening: opening.name,
        eco: opening.eco_code,
        variation: opening.description
      };
    }

    // Fallback to basic pattern matching if no database match
    return this.identifyOpeningByPattern(moves);
  }

  async evaluatePosition(fen: string): Promise<{ evaluation: number; mate?: number }> {
    // For POC, basic material evaluation. In production use chess engine
    const Chess = require('chess.js');
    const chess = new Chess(fen);
    
    if (chess.isGameOver()) {
      if (chess.isCheckmate()) {
        return { evaluation: chess.turn() === 'w' ? -1000 : 1000, mate: 0 };
      }
      return { evaluation: 0 }; // Draw
    }

    // Basic material count evaluation
    const evaluation = this.calculateMaterialBalance(chess);
    
    return { evaluation };
  }

  private generateMoveComment(move: any): string {
    if (move.flags.includes('c')) return `Captures ${move.captured}`;
    if (move.flags.includes('k') || move.flags.includes('q')) return 'Castling';
    if (move.flags.includes('e')) return 'En passant capture';
    if (move.flags.includes('p')) return `Promotes to ${move.promotion}`;
    return 'Good move';
  }

  private identifyOpeningByPattern(moves: string[]): { opening: string; eco: string; variation?: string } {
    // Basic pattern matching for common openings
    const patterns = {
      'e4,e5': { opening: "King's Pawn Opening", eco: 'C20' },
      'e4,c5': { opening: 'Sicilian Defense', eco: 'B20' },
      'd4,d5': { opening: "Queen's Pawn Opening", eco: 'D00' },
      'Nf3,Nf6': { opening: 'Réti Opening', eco: 'A04' },
      'e4,e6': { opening: 'French Defense', eco: 'C00' }
    };

    const moveString = moves.slice(0, 2).join(',');
    return (patterns as any)[moveString] || { opening: 'Unknown Opening', eco: 'A00' };
  }

  private calculateMaterialBalance(chess: any): number {
    const pieceValues = {
      'p': 1, 'n': 3, 'b': 3, 'r': 5, 'q': 9, 'k': 0
    };

    let whiteValue = 0;
    let blackValue = 0;

    const board = chess.board();
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const piece = board[i][j];
        if (piece) {
          const value = (pieceValues as any)[piece.type.toLowerCase()] || 0;
          if (piece.color === 'w') {
            whiteValue += value;
          } else {
            blackValue += value;
          }
        }
      }
    }

    return (whiteValue - blackValue) * 100; // Convert to centipawns
  }
}