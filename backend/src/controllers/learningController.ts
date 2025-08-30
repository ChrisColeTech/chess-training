import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { LearningService } from '../services/learningService';

const learningService = new LearningService();

export const getLearningPaths = async (req: Request, res: Response) => {
  try {
    const result = await learningService.getAllLearningPaths(req.query);
    res.json({
      success: true,
      data: result.learningPaths,
      total: result.total,
      limit: result.limit,
      offset: result.offset
    });
  } catch (error) {
    console.error('Error fetching learning paths:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch learning paths'
    });
  }
};

export const getLearningPathById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const learningPath = await learningService.getLearningPathById(id);
    
    res.json({
      success: true,
      data: learningPath
    });
  } catch (error) {
    if ((error as any).message === 'Learning path not found') {
      return res.status(404).json({
        success: false,
        error: 'Learning path not found'
      });
    }
    
    console.error('Error fetching learning path:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch learning path'
    });
  }
};

export const createLearningPath = async (req: Request, res: Response) => {
  try {
    const learningPath = await learningService.createLearningPath(req.body);
    
    res.status(201).json({
      success: true,
      data: learningPath
    });
  } catch (error) {
    console.error('Error creating learning path:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create learning path'
    });
  }
};

export const updateLearningPath = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const learningPath = await learningService.updateLearningPath(id, req.body);
    
    res.json({
      success: true,
      data: learningPath
    });
  } catch (error) {
    if ((error as any).message === 'Learning path not found') {
      return res.status(404).json({
        success: false,
        error: 'Learning path not found'
      });
    }
    
    console.error('Error updating learning path:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update learning path'
    });
  }
};

export const getLearningModules = async (req: Request, res: Response) => {
  try {
    const modules = await learningService.getAllLearningModules(req.query);
    
    res.json({
      success: true,
      data: modules
    });
  } catch (error) {
    console.error('Error fetching learning modules:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch learning modules'
    });
  }
};

export const getLearningModuleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const module = await learningService.getLearningModuleById(id);
    
    res.json({
      success: true,
      data: module
    });
  } catch (error) {
    if ((error as any).message === 'Learning module not found') {
      return res.status(404).json({
        success: false,
        error: 'Learning module not found'
      });
    }
    
    console.error('Error fetching learning module:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch learning module'
    });
  }
};

export const createLearningModule = async (req: Request, res: Response) => {
  try {
    const module = await learningService.createLearningModule(req.body);
    
    res.status(201).json({
      success: true,
      data: module
    });
  } catch (error) {
    console.error('Error creating learning module:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create learning module'
    });
  }
};

export const startLearningPath = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { learningPathId } = req.params;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }
    
    const result = await learningService.startLearningPath(userId, learningPathId);
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    if ((error as any).message === 'Learning path not found') {
      return res.status(404).json({
        success: false,
        error: 'Learning path not found'
      });
    }
    
    console.error('Error starting learning path:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to start learning path'
    });
  }
};

export const updateModuleProgress = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { moduleId } = req.params;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }
    
    const progress = await learningService.updateModuleProgress(userId, moduleId, req.body);
    
    res.json({
      success: true,
      data: progress
    });
  } catch (error) {
    console.error('Error updating module progress:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update module progress'
    });
  }
};

export const getUserLearningProgress = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { learningPathId, learningModuleId } = req.params;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }
    
    const progress = await learningService.getUserLearningProgress({
      userId,
      learningPathId: learningPathId || undefined,
      learningModuleId: learningModuleId || undefined,
      completed: req.query.completed ? req.query.completed === 'true' : undefined
    });
    
    res.json({
      success: true,
      data: progress
    });
  } catch (error) {
    console.error('Error fetching user learning progress:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user learning progress'
    });
  }
};

export const getLearningPathStats = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { learningPathId } = req.params;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }
    
    const stats = await learningService.getLearningPathStats(userId, learningPathId);
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching learning path stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch learning path stats'
    });
  }
};

export const getLearningCategories = async (req: Request, res: Response) => {
  try {
    const categories = await learningService.getLearningCategories();
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching learning categories:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch learning categories'
    });
  }
};