import { Chess } from 'chess.js';
import { v4 as uuidv4 } from 'uuid';
import { Database } from '../utils/database';
import { AIService } from './aiService';
import { 
  Game, 
  GameMove, 
  GameState, 
  CreateGameRequest, 
  GameResponse, 
  MakeMoveResponse 
} from '../models/Game';

export class ChessService {
  private db = Database.getInstance();
  private aiService = new AIService();

  async createGame(userId: string, gameData: CreateGameRequest): Promise<{
    gameId: string;
    initialFen: string;
    aiMove?: any;
  }> {
    const { aiLevel, color, timeControl } = gameData;
    const gameId = uuidv4();
    const chess = new Chess();
    
    // Determine user color
    let userColor = color;
    if (color === 'random') {
      userColor = Math.random() < 0.5 ? 'white' : 'black';
    }
    
    // If user plays black, make AI first move
    let currentFen = chess.fen();
    let pgn = '';
    let aiMove = null;

    if (userColor === 'black') {
      const aiBestMove = await this.aiService.getBestMove(currentFen, aiLevel);
      aiMove = chess.move(aiBestMove);
      currentFen = chess.fen();
      pgn = chess.pgn();
    }

    await this.db.db.run(
      `INSERT INTO games (id, user_id, ai_level, user_color, current_fen, pgn, status, time_control)
       VALUES (?, ?, ?, ?, ?, ?, 'active', ?)`,
      [gameId, userId, aiLevel, userColor, currentFen, pgn, timeControl || null]
    );

    return {
      gameId,
      initialFen: currentFen,
      aiMove: aiMove ? {
        from: aiMove.from,
        to: aiMove.to,
        san: aiMove.san
      } : undefined
    };
  }

  async makeMove(gameId: string, userId: string, move: GameMove): Promise<MakeMoveResponse> {
    // Get game
    const game = await this.db.db.get(
      'SELECT * FROM games WHERE id = ? AND user_id = ? AND status = "active"',
      [gameId, userId]
    );

    if (!game) {
      throw new Error('Game not found');
    }

    const chess = new Chess(game.current_fen);

    // Validate and make user move
    try {
      const userMove = chess.move(move);
      if (!userMove) {
        return {
          success: false,
          legal: false,
          gameState: this.getGameState(chess),
          error: 'Illegal move'
        };
      }
    } catch (error) {
      return {
        success: false,
        legal: false,
        gameState: this.getGameState(chess),
        error: 'Illegal move'
      };
    }

    // Check if game is over after user move
    let gameState = this.getGameState(chess);
    let aiMove = null;
    let result = null;

    if (chess.isGameOver()) {
      result = this.getGameResult(chess);
      gameState.result = result;
    } else {
      // Get AI response
      try {
        const aiBestMove = await this.aiService.getBestMove(chess.fen(), game.ai_level);
        const aiMoveObj = chess.move(aiBestMove);
        
        if (aiMoveObj) {
          aiMove = {
            from: aiMoveObj.from,
            to: aiMoveObj.to,
            san: aiMoveObj.san
          };
          
          // Update game state after AI move
          gameState = this.getGameState(chess);
          
          if (chess.isGameOver()) {
            result = this.getGameResult(chess);
            gameState.result = result;
          }
        }
      } catch (error) {
        console.error('AI move error:', error);
        // Continue without AI move if there's an error
      }
    }

    // Update game in database
    const status = gameState.gameOver ? 'completed' : 'active';
    const completedAt = gameState.gameOver ? new Date().toISOString() : null;

    await this.db.db.run(
      `UPDATE games 
       SET current_fen = ?, pgn = ?, status = ?, result = ?, completed_at = ?
       WHERE id = ?`,
      [gameState.fen, chess.pgn(), status, result, completedAt, gameId]
    );

    // Update user rating if game completed
    if (gameState.gameOver && result) {
      await this.updateUserRating(userId, result, game.ai_level);
    }

    return {
      success: true,
      legal: true,
      gameState,
      aiMove: aiMove || undefined
    };
  }

  async getGame(gameId: string, userId: string): Promise<GameResponse> {
    const game = await this.db.db.get(
      'SELECT * FROM games WHERE id = ? AND user_id = ?',
      [gameId, userId]
    );

    if (!game) {
      throw new Error('Game not found');
    }

    return {
      id: game.id,
      aiLevel: game.ai_level,
      currentFen: game.current_fen,
      pgn: game.pgn,
      result: game.result,
      gameOver: game.status === 'completed'
    };
  }

  async getGameHistory(userId: string): Promise<any[]> {
    const games = await this.db.db.all(
      `SELECT id, result, ai_level, completed_at 
       FROM games 
       WHERE user_id = ? AND status = 'completed' 
       ORDER BY completed_at DESC 
       LIMIT 10`,
      [userId]
    );

    return games.map((game: any) => ({
      id: game.id,
      result: game.result,
      aiLevel: game.ai_level,
      completedAt: game.completed_at,
      eloChange: this.calculateEloChange(game.result, game.ai_level)
    }));
  }

  private getGameState(chess: Chess): GameState {
    return {
      fen: chess.fen(),
      turn: chess.turn() === 'w' ? 'white' : 'black',
      check: chess.inCheck(),
      gameOver: chess.isGameOver(),
      result: chess.isGameOver() ? this.getGameResult(chess) : null
    };
  }

  private getGameResult(chess: Chess): string {
    if (chess.isCheckmate()) {
      return chess.turn() === 'w' ? '0-1' : '1-0';
    } else if (chess.isDraw()) {
      return '1/2-1/2';
    } else if (chess.isStalemate()) {
      return '1/2-1/2';
    } else if (chess.isThreefoldRepetition()) {
      return '1/2-1/2';
    } else if (chess.isInsufficientMaterial()) {
      return '1/2-1/2';
    }
    return '1/2-1/2'; // Default to draw for other cases
  }

  private async updateUserRating(userId: string, result: string, aiLevel: number): Promise<void> {
    const user = await this.db.db.get('SELECT chess_elo FROM users WHERE id = ?', [userId]);
    if (!user) return;

    let ratingChange = 0;
    const baseChange = 8 + (aiLevel * 2); // Harder AI gives more points

    if (result === '1-0') {
      ratingChange = baseChange;
    } else if (result === '0-1') {
      ratingChange = -Math.max(5, Math.floor(baseChange * 0.8));
    }
    // Draw = 0 change

    const newRating = Math.max(800, user.chess_elo + ratingChange);
    await this.db.db.run(
      'UPDATE users SET chess_elo = ?, updated_at = datetime("now") WHERE id = ?',
      [newRating, userId]
    );
  }

  private calculateEloChange(result: string, aiLevel: number): number {
    const baseChange = 8 + (aiLevel * 2);
    
    if (result === '1-0') return baseChange;
    if (result === '0-1') return -Math.max(5, Math.floor(baseChange * 0.8));
    return 0; // Draw
  }

  async getAllGames(userId: string): Promise<any[]> {
    const games = await this.db.db.all(
      `SELECT id, ai_level, user_color, current_fen, pgn, status, result, 
              time_control, started_at, completed_at
       FROM games 
       WHERE user_id = ? 
       ORDER BY started_at DESC`,
      [userId]
    );

    return games.map((game: any) => ({
      id: game.id,
      aiLevel: game.ai_level,
      userColor: game.user_color,
      currentFen: game.current_fen,
      pgn: game.pgn,
      status: game.status,
      result: game.result,
      timeControl: game.time_control,
      startedAt: game.started_at,
      completedAt: game.completed_at,
      eloChange: game.status === 'completed' ? this.calculateEloChange(game.result, game.ai_level) : 0
    }));
  }

  async deleteGame(gameId: string, userId: string): Promise<void> {
    // Check if game exists and belongs to user
    const game = await this.db.db.get(
      'SELECT * FROM games WHERE id = ? AND user_id = ?',
      [gameId, userId]
    );

    if (!game) {
      throw new Error('Game not found');
    }

    // Don't allow deleting active games
    if (game.status === 'active') {
      throw new Error('Cannot delete active game');
    }

    // Delete the game
    await this.db.db.run(
      'DELETE FROM games WHERE id = ? AND user_id = ?',
      [gameId, userId]
    );
  }

  async analyzeGame(gameId: string, userId: string, options: {
    engine?: string;
    depth?: number;
  }): Promise<any> {
    // Check if game exists and belongs to user
    const game = await this.db.db.get(
      'SELECT * FROM games WHERE id = ? AND user_id = ?',
      [gameId, userId]
    );

    if (!game) {
      throw new Error('Game not found');
    }

    // Only analyze completed games
    if (game.status !== 'completed') {
      throw new Error('Game not completed');
    }

    const chess = new Chess();
    const moves = game.pgn ? chess.loadPgn(game.pgn) : [];
    chess.reset();

    // Analyze each position in the game
    const analysis = [];
    const gameHistory = chess.history({ verbose: true });

    // For POC, provide basic analysis
    // In a full implementation, this would use an actual chess engine
    for (let i = 0; i < gameHistory.length; i++) {
      const move = gameHistory[i];
      chess.reset();
      
      // Play moves up to current position
      for (let j = 0; j < i; j++) {
        chess.move(gameHistory[j]);
      }

      const position = {
        moveNumber: Math.floor(i / 2) + 1,
        side: move.color === 'w' ? 'white' : 'black',
        move: move.san,
        fen: chess.fen(),
        evaluation: this.evaluatePosition(chess, move.color),
        bestMove: await this.getBestMoveForPosition(chess.fen(), options.depth || 15),
        comment: this.getMoveComment(chess, move)
      };

      analysis.push(position);
    }

    return {
      gameId,
      pgn: game.pgn,
      result: game.result,
      aiLevel: game.ai_level,
      analysis,
      summary: {
        totalMoves: gameHistory.length,
        accuracy: this.calculateAccuracy(analysis),
        mistakes: analysis.filter(pos => pos.evaluation < -100).length,
        blunders: analysis.filter(pos => pos.evaluation < -300).length
      },
      analyzedAt: new Date().toISOString(),
      engine: options.engine || 'stockfish',
      depth: options.depth || 15
    };
  }

  private evaluatePosition(chess: Chess, side: string): number {
    // Basic material evaluation for POC
    // In a full implementation, this would use an actual chess engine
    const pieceValues = {
      'p': 1, 'n': 3, 'b': 3, 'r': 5, 'q': 9, 'k': 0,
      'P': 1, 'N': 3, 'B': 3, 'R': 5, 'Q': 9, 'K': 0
    };

    let whiteValue = 0;
    let blackValue = 0;

    const board = chess.board();
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const piece = board[i][j];
        if (piece) {
          if (piece.color === 'w') {
            whiteValue += (pieceValues as any)[piece.type.toUpperCase()] || 0;
          } else {
            blackValue += (pieceValues as any)[piece.type.toLowerCase()] || 0;
          }
        }
      }
    }

    const materialBalance = whiteValue - blackValue;
    return side === 'w' ? materialBalance * 100 : -materialBalance * 100;
  }

  private async getBestMoveForPosition(fen: string, depth: number): Promise<string> {
    // In POC, return a random legal move
    // In full implementation, this would use chess engine
    const chess = new Chess(fen);
    const moves = chess.moves();
    return moves[Math.floor(Math.random() * moves.length)] || 'None';
  }

  private getMoveComment(chess: Chess, move: any): string {
    // Basic move comments for POC
    if (chess.inCheck()) {
      return 'Gives check';
    }
    if (move.captured) {
      return `Captures ${move.captured}`;
    }
    if (move.promotion) {
      return `Promotes to ${move.promotion}`;
    }
    return 'Normal move';
  }

  private calculateAccuracy(analysis: any[]): number {
    // Simple accuracy calculation for POC
    const goodMoves = analysis.filter(pos => pos.evaluation >= -50).length;
    return analysis.length > 0 ? Math.round((goodMoves / analysis.length) * 100) : 0;
  }
}