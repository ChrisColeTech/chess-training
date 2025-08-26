import { Response } from 'express';
import { PuzzleService } from '../services/puzzleService';
import { AuthenticatedRequest } from '../middleware/auth';

export class PuzzleController {
  private puzzleService = new PuzzleService();

  getNextPuzzle = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
      }

      const puzzle = await this.puzzleService.getNextPuzzle(userId);
      
      res.json({
        success: true,
        puzzle
      });
    } catch (error: any) {
      console.error('Get next puzzle error:', error);
      
      if (error.message === 'User not found') {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }
      
      if (error.message === 'No puzzles available') {
        return res.status(404).json({
          success: false,
          error: 'No puzzles available'
        });
      }

      res.status(500).json({
        success: false,
        error: 'Failed to get puzzle'
      });
    }
  };

  solvePuzzle = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { puzzleId } = req.params;
      const { moves, timeTaken } = req.body;
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
      }

      if (!puzzleId) {
        return res.status(400).json({
          success: false,
          error: 'Puzzle ID required'
        });
      }

      if (!moves || !Array.isArray(moves)) {
        return res.status(400).json({
          success: false,
          error: 'Moves array required'
        });
      }

      if (typeof timeTaken !== 'number' || timeTaken < 0) {
        return res.status(400).json({
          success: false,
          error: 'Valid time taken required'
        });
      }

      const result = await this.puzzleService.solvePuzzle(userId, puzzleId, {
        moves,
        timeTaken
      });
      
      res.json({
        success: true,
        ...result
      });
    } catch (error: any) {
      console.error('Solve puzzle error:', error);
      
      if (error.message === 'Puzzle not found') {
        return res.status(404).json({
          success: false,
          error: 'Puzzle not found'
        });
      }
      
      if (error.message === 'User not found') {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      res.status(500).json({
        success: false,
        error: 'Failed to solve puzzle'
      });
    }
  };

  getHint = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { puzzleId } = req.params;
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
      }

      if (!puzzleId) {
        return res.status(400).json({
          success: false,
          error: 'Puzzle ID required'
        });
      }

      const result = await this.puzzleService.getHint(userId, puzzleId);
      
      res.json({
        success: true,
        ...result
      });
    } catch (error: any) {
      console.error('Get hint error:', error);
      
      if (error.message === 'Puzzle not found') {
        return res.status(404).json({
          success: false,
          error: 'Puzzle not found'
        });
      }

      res.status(500).json({
        success: false,
        error: 'Failed to get hint'
      });
    }
  };

  getPuzzleStats = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'User not authenticated'
        });
      }

      const stats = await this.puzzleService.getPuzzleStats(userId);
      
      res.json({
        success: true,
        stats
      });
    } catch (error: any) {
      console.error('Get puzzle stats error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get puzzle stats'
      });
    }
  };
}