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
}