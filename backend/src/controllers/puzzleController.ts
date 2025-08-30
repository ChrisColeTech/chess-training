import { Request, Response } from 'express';
import { PuzzleService } from '../services/puzzleService';
import { AuthenticatedRequest } from '../middleware/auth';

export class PuzzleController {
  private puzzleService = new PuzzleService();

  // Get all puzzles (public endpoint for browsing)
  getAllPuzzles = async (req: Request, res: Response) => {
    try {
      const { page = 1, limit = 50, difficulty, themes } = req.query;
      
      const puzzles = await this.puzzleService.getAllPuzzles({
        page: Number(page),
        limit: Number(limit),
        difficulty: difficulty as string,
        themes: themes as string
      });
      
      res.json({
        success: true,
        data: puzzles.data,
        pagination: puzzles.pagination
      });
    } catch (error: any) {
      console.error('Get all puzzles error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get puzzles'
      });
    }
  };

  // Get puzzles by category (public endpoint)
  getPuzzlesByCategory = async (req: Request, res: Response) => {
    try {
      const { category } = req.params;
      const { page = 1, limit = 20 } = req.query;
      
      const puzzles = await this.puzzleService.getPuzzlesByCategory(category, {
        page: Number(page),
        limit: Number(limit)
      });
      
      res.json({
        success: true,
        data: {
          puzzles: puzzles.data,
          total: puzzles.pagination.total
        }
      });
    } catch (error: any) {
      console.error('Get puzzles by category error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get puzzles by category'
      });
    }
  };

  // Get puzzles by difficulty (public endpoint)  
  getPuzzlesByDifficulty = async (req: Request, res: Response) => {
    try {
      const { difficulty } = req.params;
      const { page = 1, limit = 20 } = req.query;
      
      const puzzles = await this.puzzleService.getPuzzlesByDifficulty(difficulty, {
        page: Number(page),
        limit: Number(limit)
      });
      
      res.json({
        success: true,
        data: {
          puzzles: puzzles.data,
          total: puzzles.pagination.total
        }
      });
    } catch (error: any) {
      console.error('Get puzzles by difficulty error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get puzzles by difficulty'
      });
    }
  };

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
      
      if ((error as any).message === 'User not found') {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }
      
      if ((error as any).message === 'No puzzles available') {
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
      
      if ((error as any).message === 'Puzzle not found') {
        return res.status(404).json({
          success: false,
          error: 'Puzzle not found'
        });
      }
      
      if ((error as any).message === 'User not found') {
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
      
      if ((error as any).message === 'Puzzle not found') {
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