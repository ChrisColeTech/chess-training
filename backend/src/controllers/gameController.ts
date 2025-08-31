import { Response } from 'express';
import { ChessService } from '../services/chessService';
import { AIService } from '../services/aiService';
import { AuthenticatedRequest } from '../middleware/auth';

export class GameController {
  private chessService = new ChessService();
  private aiService = new AIService();

  createGame = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { aiLevel, color, timeControl } = req.body;
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
      }

      if (!aiLevel || aiLevel < 1 || aiLevel > 5) {
        return res.status(400).json({
          success: false,
          error: 'AI level must be between 1 and 5'
        });
      }

      if (!color || !['white', 'black', 'random'].includes(color)) {
        return res.status(400).json({
          success: false,
          error: 'Color must be white, black, or random'
        });
      }

      const result = await this.chessService.createGame(userId, {
        aiLevel,
        color,
        timeControl
      });
      
      res.json({
        success: true,
        ...result
      });
    } catch (error: any) {
      console.error('Create game error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create game'
      });
    }
  };

  makeMove = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { gameId } = req.params;
      const { move } = req.body;
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
      }

      if (!gameId) {
        return res.status(400).json({
          success: false,
          error: 'Game ID required'
        });
      }

      if (!move || !move.from || !move.to) {
        return res.status(400).json({
          success: false,
          error: 'Move must include from and to squares'
        });
      }

      const result = await this.chessService.makeMove(gameId, userId, move);
      res.json(result);
    } catch (error: any) {
      console.error('Make move error:', error);
      
      if ((error as any).message === 'Game not found') {
        return res.status(404).json({
          success: false,
          error: 'Game not found'
        });
      }

      res.status(500).json({
        success: false,
        error: 'Failed to make move'
      });
    }
  };

  getGame = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { gameId } = req.params;
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
      }

      if (!gameId) {
        return res.status(400).json({
          success: false,
          error: 'Game ID required'
        });
      }

      const game = await this.chessService.getGame(gameId, userId);
      
      res.json({
        success: true,
        game
      });
    } catch (error: any) {
      console.error('Get game error:', error);
      
      if ((error as any).message === 'Game not found') {
        return res.status(404).json({
          success: false,
          error: 'Game not found'
        });
      }

      res.status(500).json({
        success: false,
        error: 'Failed to get game'
      });
    }
  };

  getGameHistory = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
      }

      const games = await this.chessService.getGameHistory(userId);
      
      res.json({
        success: true,
        games
      });
    } catch (error: any) {
      console.error('Get game history error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get game history'
      });
    }
  };

  getAllGames = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
      }

      // Get all games for the user (both active and completed)
      const games = await this.chessService.getAllGames(userId);
      
      res.json({
        success: true,
        games
      });
    } catch (error: any) {
      console.error('Get all games error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get games'
      });
    }
  };

  deleteGame = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { gameId } = req.params;
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
      }

      if (!gameId) {
        return res.status(400).json({
          success: false,
          error: 'Game ID required'
        });
      }

      await this.chessService.deleteGame(gameId, userId);
      
      res.json({
        success: true,
        message: 'Game deleted successfully'
      });
    } catch (error: any) {
      console.error('Delete game error:', error);
      
      if ((error as any).message === 'Game not found') {
        return res.status(404).json({
          success: false,
          error: 'Game not found'
        });
      }

      if ((error as any).message === 'Cannot delete active game') {
        return res.status(400).json({
          success: false,
          error: 'Cannot delete active game'
        });
      }

      res.status(500).json({
        success: false,
        error: 'Failed to delete game'
      });
    }
  };

  analyzeGame = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { gameId } = req.params;
      const { engine = 'stockfish', depth = 15 } = req.body;
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
      }

      if (!gameId) {
        return res.status(400).json({
          success: false,
          error: 'Game ID required'
        });
      }

      const analysis = await this.chessService.analyzeGame(gameId, userId, {
        engine,
        depth
      });
      
      res.json({
        success: true,
        analysis
      });
    } catch (error: any) {
      console.error('Analyze game error:', error);
      
      if ((error as any).message === 'Game not found') {
        return res.status(404).json({
          success: false,
          error: 'Game not found'
        });
      }

      if ((error as any).message === 'Game not completed') {
        return res.status(400).json({
          success: false,
          error: 'Can only analyze completed games'
        });
      }

      res.status(500).json({
        success: false,
        error: 'Failed to analyze game'
      });
    }
  };

  getGameHints = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { gameId } = req.params;
      const { difficulty = 'intermediate' } = req.query;
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
      }

      if (!gameId) {
        return res.status(400).json({
          success: false,
          error: 'Game ID is required'
        });
      }

      // Get current game state (need raw game record to check status)
      const gameRecord = await this.chessService['db'].db.get(
        'SELECT * FROM games WHERE id = ? AND user_id = ?',
        [gameId, userId]
      );
      
      if (!gameRecord) {
        return res.status(404).json({
          success: false,
          error: 'Game not found'
        });
      }

      if (gameRecord.status !== 'active') {
        return res.status(400).json({
          success: false,
          error: 'Cannot get hints for inactive game'
        });
      }

      // Get hints for current position
      const hints = await this.aiService.getGameHints(
        gameRecord.current_fen, 
        difficulty as 'beginner' | 'intermediate' | 'advanced'
      );

      res.json({
        success: true,
        data: {
          gameId,
          hints,
          timestamp: new Date().toISOString()
        }
      });

    } catch (error) {
      console.error('Get game hints error:', error);
      
      if ((error as any).message === 'No legal moves available') {
        return res.status(400).json({
          success: false,
          error: 'No legal moves available in current position'
        });
      }

      res.status(500).json({
        success: false,
        error: 'Failed to get game hints'
      });
    }
  };
}