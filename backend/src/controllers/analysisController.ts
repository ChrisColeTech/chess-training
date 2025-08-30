import { Request, Response } from 'express';
import { AnalysisService } from '../services/analysisService';

const analysisService = new AnalysisService();

export const getAnalysisPositions = async (req: Request, res: Response) => {
  try {
    const result = await analysisService.getAllAnalysisPositions(req.query);
    res.json({
      success: true,
      data: result.positions,
      total: result.total,
      limit: result.limit,
      offset: result.offset
    });
  } catch (error) {
    console.error('Error fetching analysis positions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch analysis positions'
    });
  }
};

export const getAnalysisPositionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const position = await analysisService.getAnalysisPositionById(id);
    
    res.json({
      success: true,
      data: position
    });
  } catch (error) {
    if ((error as any).message === 'Analysis position not found') {
      return res.status(404).json({
        success: false,
        error: 'Analysis position not found'
      });
    }
    
    console.error('Error fetching analysis position:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch analysis position'
    });
  }
};

export const createAnalysisPosition = async (req: Request, res: Response) => {
  try {
    const position = await analysisService.createAnalysisPosition(req.body);
    
    res.status(201).json({
      success: true,
      data: position
    });
  } catch (error) {
    console.error('Error creating analysis position:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create analysis position'
    });
  }
};

export const getEndgamePositions = async (req: Request, res: Response) => {
  try {
    const result = await analysisService.getAllEndgamePositions(req.query);
    res.json({
      success: true,
      data: result.positions,
      total: result.total,
      limit: result.limit,
      offset: result.offset
    });
  } catch (error) {
    console.error('Error fetching endgame positions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch endgame positions'
    });
  }
};

export const getEndgamePositionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const position = await analysisService.getEndgamePositionById(id);
    
    res.json({
      success: true,
      data: position
    });
  } catch (error) {
    if ((error as any).message === 'Endgame position not found') {
      return res.status(404).json({
        success: false,
        error: 'Endgame position not found'
      });
    }
    
    console.error('Error fetching endgame position:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch endgame position'
    });
  }
};

export const createEndgamePosition = async (req: Request, res: Response) => {
  try {
    const position = await analysisService.createEndgamePosition(req.body);
    
    res.status(201).json({
      success: true,
      data: position
    });
  } catch (error) {
    console.error('Error creating endgame position:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create endgame position'
    });
  }
};

export const analyzePosition = async (req: Request, res: Response) => {
  try {
    const analysis = await analysisService.analyzePosition(req.body);
    
    res.json({
      success: true,
      data: analysis
    });
  } catch (error) {
    console.error('Error analyzing position:', error);
    res.status(500).json({
      success: false,
      error: (error as any).message || 'Failed to analyze position'
    });
  }
};

export const getStoredAnalysis = async (req: Request, res: Response) => {
  try {
    const { fen } = req.params;
    const { engine } = req.query;
    
    const analysis = await analysisService.getStoredAnalysis(fen, engine as string);
    
    if (!analysis) {
      return res.status(404).json({
        success: false,
        error: 'No stored analysis found for this position'
      });
    }
    
    res.json({
      success: true,
      data: analysis
    });
  } catch (error) {
    console.error('Error fetching stored analysis:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch stored analysis'
    });
  }
};

export const searchPositions = async (req: Request, res: Response) => {
  try {
    const { q: query, type = 'both' } = req.query;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required'
      });
    }
    
    const results = await analysisService.searchPositions(
      query as string, 
      type as 'analysis' | 'endgame' | 'both'
    );
    
    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    console.error('Error searching positions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search positions'
    });
  }
};

export const getPositionStatistics = async (req: Request, res: Response) => {
  try {
    const stats = await analysisService.getPositionStatistics();
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching position statistics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch position statistics'
    });
  }
};

export const getAnalysisCategories = async (req: Request, res: Response) => {
  try {
    const categories = await analysisService.getAnalysisCategories();
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching analysis categories:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch analysis categories'
    });
  }
};

export const getEndgameCategories = async (req: Request, res: Response) => {
  try {
    const categories = await analysisService.getEndgameCategories();
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching endgame categories:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch endgame categories'
    });
  }
};

export const getEndgamePositionsByMaterial = async (req: Request, res: Response) => {
  try {
    const { material } = req.params;
    const positions = await analysisService.getEndgamePositionsByMaterial(material);
    
    res.json({
      success: true,
      data: positions
    });
  } catch (error) {
    console.error('Error fetching endgame positions by material:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch endgame positions by material'
    });
  }
};

// Missing frontend compatibility methods that I referenced but never implemented
export const analyzeGame = async (req: Request, res: Response) => {
  try {
    const { pgn, depth = 15 } = req.body;
    
    if (!pgn) {
      return res.status(400).json({
        success: false,
        error: 'PGN is required'
      });
    }

    const analysis = await analysisService.analyzeGame(pgn, { depth });
    
    res.json({
      success: true,
      data: analysis
    });
  } catch (error) {
    console.error('Error analyzing game:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to analyze game'
    });
  }
};

export const getBestMove = async (req: Request, res: Response) => {
  try {
    const { fen, depth = 15 } = req.body;
    
    if (!fen) {
      return res.status(400).json({
        success: false,
        error: 'FEN is required'
      });
    }

    const result = await analysisService.getBestMove(fen, depth);
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error getting best move:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get best move'
    });
  }
};

export const getOpeningIdentification = async (req: Request, res: Response) => {
  try {
    const { moves } = req.body;
    
    if (!moves || !Array.isArray(moves)) {
      return res.status(400).json({
        success: false,
        error: 'Moves array is required'
      });
    }

    const opening = await analysisService.identifyOpening(moves);
    
    res.json({
      success: true,
      data: opening
    });
  } catch (error) {
    console.error('Error identifying opening:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to identify opening'
    });
  }
};

export const evaluatePosition = async (req: Request, res: Response) => {
  try {
    const { fen } = req.body;
    
    if (!fen) {
      return res.status(400).json({
        success: false,
        error: 'FEN is required'
      });
    }

    const evaluation = await analysisService.evaluatePosition(fen);
    
    res.json({
      success: true,
      data: evaluation
    });
  } catch (error) {
    console.error('Error evaluating position:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to evaluate position'
    });
  }
};