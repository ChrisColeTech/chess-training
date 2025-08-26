import { Response } from 'express';
import { ChessService } from '../services/chessService';
import { AuthenticatedRequest } from '../middleware/auth';

export class GameController {
  private chessService = new ChessService();

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
      
      if (error.message === 'Game not found') {
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
      
      if (error.message === 'Game not found') {
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
}