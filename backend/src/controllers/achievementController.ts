import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { AchievementService } from '../services/achievementService';

const achievementService = new AchievementService();

export const getAchievements = async (req: Request, res: Response) => {
  try {
    const result = await achievementService.getAllAchievements(req.query);
    res.json({
      success: true,
      data: result.achievements,
      total: result.total,
      limit: result.limit,
      offset: result.offset
    });
  } catch (error) {
    console.error('Error fetching achievements:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch achievements'
    });
  }
};

export const getAchievementById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const achievement = await achievementService.getAchievementById(id);
    
    res.json({
      success: true,
      data: achievement
    });
  } catch (error) {
    if ((error as any).message === 'Achievement not found') {
      return res.status(404).json({
        success: false,
        error: 'Achievement not found'
      });
    }
    
    console.error('Error fetching achievement:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch achievement'
    });
  }
};

export const getUserAchievements = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }
    
    const achievements = await achievementService.getUserAchievements({
      userId,
      ...req.query
    });
    
    res.json({
      success: true,
      data: achievements
    });
  } catch (error) {
    console.error('Error fetching user achievements:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user achievements'
    });
  }
};

export const earnAchievement = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { achievementId } = req.params;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }
    
    const achievement = await achievementService.earnAchievement(userId, achievementId, req.body);
    
    res.json({
      success: true,
      data: achievement,
      message: 'Achievement earned successfully'
    });
  } catch (error) {
    if ((error as any).message === 'Achievement not found') {
      return res.status(404).json({
        success: false,
        error: 'Achievement not found'
      });
    }
    
    if ((error as any).message === 'Achievement already earned') {
      return res.status(409).json({
        success: false,
        error: 'Achievement already earned'
      });
    }
    
    console.error('Error earning achievement:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to earn achievement'
    });
  }
};

export const updateAchievementProgress = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { achievementId } = req.params;
    const { progress, metadata } = req.body;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }
    
    const achievement = await achievementService.updateAchievementProgress(userId, achievementId, progress, metadata);
    
    res.json({
      success: true,
      data: achievement
    });
  } catch (error) {
    console.error('Error updating achievement progress:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update achievement progress'
    });
  }
};

export const getUserAchievementStats = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }
    
    const stats = await achievementService.getUserAchievementStats({
      userId,
      ...req.query
    });
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching user achievement stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user achievement stats'
    });
  }
};

export const getAchievementCategories = async (req: Request, res: Response) => {
  try {
    const categories = await achievementService.getAchievementCategories();
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching achievement categories:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch achievement categories'
    });
  }
};

export const checkAchievementEligibility = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { achievementId } = req.params;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }
    
    const eligibility = await achievementService.checkAchievementEligibility(userId, achievementId);
    
    res.json({
      success: true,
      data: eligibility
    });
  } catch (error) {
    console.error('Error checking achievement eligibility:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to check achievement eligibility'
    });
  }
};

// New frontend compatibility methods
export const getAchievementsByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const achievements = await achievementService.getAchievementsByCategory(category);
    
    res.json({
      success: true,
      data: achievements
    });
  } catch (error) {
    console.error('Error fetching achievements by category:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch achievements by category'
    });
  }
};

export const getAchievementProgress = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { achievementId } = req.params;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }
    
    const progress = await achievementService.getAchievementProgress(userId, achievementId);
    
    res.json({
      success: true,
      data: progress
    });
  } catch (error) {
    if ((error as any).message === 'Achievement not found') {
      return res.status(404).json({
        success: false,
        error: 'Achievement not found'
      });
    }
    
    console.error('Error fetching achievement progress:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch achievement progress'
    });
  }
};

export const getRecentAchievements = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }
    
    const limit = parseInt(req.query.limit as string) || 10;
    const achievements = await achievementService.getRecentAchievements(userId, limit);
    
    res.json({
      success: true,
      data: achievements
    });
  } catch (error) {
    console.error('Error fetching recent achievements:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch recent achievements'
    });
  }
};

export const getAchievementLeaderboard = async (req: Request, res: Response) => {
  try {
    const { achievementId } = req.params;
    const limit = parseInt(req.query.limit as string) || 50;
    
    const leaderboard = await achievementService.getAchievementLeaderboard(achievementId, limit);
    
    res.json({
      success: true,
      data: leaderboard
    });
  } catch (error) {
    console.error('Error fetching achievement leaderboard:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch achievement leaderboard'
    });
  }
};