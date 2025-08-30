import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { TutorialService } from '../services/tutorialService';

const tutorialService = new TutorialService();

export const getTutorials = async (req: Request, res: Response) => {
  try {
    const result = await tutorialService.getAllTutorials(req.query);
    res.json({
      success: true,
      data: result.tutorials,
      total: result.total,
      limit: result.limit,
      offset: result.offset
    });
  } catch (error) {
    console.error('Error fetching tutorials:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch tutorials'
    });
  }
};

export const getTutorialById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tutorial = await tutorialService.getTutorialById(id);
    
    res.json({
      success: true,
      data: tutorial
    });
  } catch (error) {
    if ((error as any).message === 'Tutorial not found') {
      return res.status(404).json({
        success: false,
        error: 'Tutorial not found'
      });
    }
    
    console.error('Error fetching tutorial:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch tutorial'
    });
  }
};

export const createTutorial = async (req: Request, res: Response) => {
  try {
    const tutorial = await tutorialService.createTutorial(req.body);
    
    res.status(201).json({
      success: true,
      data: tutorial
    });
  } catch (error) {
    console.error('Error creating tutorial:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create tutorial'
    });
  }
};

export const updateTutorial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tutorial = await tutorialService.updateTutorial(id, req.body);
    
    res.json({
      success: true,
      data: tutorial
    });
  } catch (error) {
    if ((error as any).message === 'Tutorial not found') {
      return res.status(404).json({
        success: false,
        error: 'Tutorial not found'
      });
    }
    
    console.error('Error updating tutorial:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update tutorial'
    });
  }
};

export const deleteTutorial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tutorial = await tutorialService.deleteTutorial(id);
    
    res.json({
      success: true,
      data: tutorial,
      message: 'Tutorial deleted successfully'
    });
  } catch (error) {
    if ((error as any).message === 'Tutorial not found') {
      return res.status(404).json({
        success: false,
        error: 'Tutorial not found'
      });
    }
    
    console.error('Error deleting tutorial:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete tutorial'
    });
  }
};

export const getTutorialsByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const tutorials = await tutorialService.getTutorialsByCategory(category);
    
    res.json({
      success: true,
      data: tutorials
    });
  } catch (error) {
    console.error('Error fetching tutorials by category:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch tutorials by category'
    });
  }
};

export const getTutorialSteps = async (req: Request, res: Response) => {
  try {
    const { tutorialId } = req.params;
    const { stepNumber } = req.query;
    
    const steps = await tutorialService.getTutorialSteps({
      tutorialId,
      stepNumber: stepNumber ? Number(stepNumber) : undefined
    });
    
    res.json({
      success: true,
      data: steps
    });
  } catch (error) {
    if ((error as any).message === 'Tutorial step not found') {
      return res.status(404).json({
        success: false,
        error: 'Tutorial step not found'
      });
    }
    
    console.error('Error fetching tutorial steps:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch tutorial steps'
    });
  }
};

export const createTutorialStep = async (req: Request, res: Response) => {
  try {
    const { tutorialId } = req.params;
    const step = await tutorialService.createTutorialStep(tutorialId, req.body);
    
    res.status(201).json({
      success: true,
      data: step
    });
  } catch (error) {
    console.error('Error creating tutorial step:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create tutorial step'
    });
  }
};

export const startTutorial = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { tutorialId } = req.params;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }
    
    const result = await tutorialService.startTutorial(userId, tutorialId);
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    if ((error as any).message === 'Tutorial not found') {
      return res.status(404).json({
        success: false,
        error: 'Tutorial not found'
      });
    }
    
    console.error('Error starting tutorial:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to start tutorial'
    });
  }
};

export const completeStep = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { tutorialId, stepId } = req.params;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }
    
    const result = await tutorialService.completeStep(userId, tutorialId, stepId, req.body);
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error completing tutorial step:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to complete tutorial step'
    });
  }
};

export const getUserTutorialProgress = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { tutorialId } = req.params;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }
    
    const progress = await tutorialService.getUserTutorialProgress({
      userId,
      tutorialId: tutorialId || undefined,
      completed: req.query.completed ? req.query.completed === 'true' : undefined
    });
    
    res.json({
      success: true,
      data: progress
    });
  } catch (error) {
    console.error('Error fetching user tutorial progress:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user tutorial progress'
    });
  }
};

export const getTutorialCategories = async (req: Request, res: Response) => {
  try {
    const categories = await tutorialService.getTutorialCategories();
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching tutorial categories:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch tutorial categories'
    });
  }
};

export const getTutorialsByDifficulty = async (req: Request, res: Response) => {
  try {
    const { difficulty } = req.params;
    const tutorials = await tutorialService.getTutorialsByDifficulty(difficulty, req.query);
    
    res.json({
      success: true,
      data: tutorials
    });
  } catch (error) {
    console.error('Error fetching tutorials by difficulty:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch tutorials by difficulty'
    });
  }
};