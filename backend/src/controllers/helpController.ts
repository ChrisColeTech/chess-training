import { Request, Response } from 'express';
import { HelpService } from '../services/helpService';

const helpService = new HelpService();

export const getHelpContent = async (req: Request, res: Response) => {
  try {
    const result = await helpService.getAllHelpContent(req.query);
    res.json({
      success: true,
      data: result.helpContent,
      total: result.total,
      limit: result.limit,
      offset: result.offset
    });
  } catch (error) {
    console.error('Error fetching help content:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch help content'
    });
  }
};

export const getHelpContentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const helpContent = await helpService.getHelpContentById(id);
    
    res.json({
      success: true,
      data: helpContent
    });
  } catch (error) {
    if ((error as any).message === 'Help content not found') {
      return res.status(404).json({
        success: false,
        error: 'Help content not found'
      });
    }
    
    console.error('Error fetching help content:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch help content'
    });
  }
};

export const createHelpContent = async (req: Request, res: Response) => {
  try {
    const helpContent = await helpService.createHelpContent(req.body);
    
    res.status(201).json({
      success: true,
      data: helpContent
    });
  } catch (error) {
    console.error('Error creating help content:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create help content'
    });
  }
};

export const updateHelpContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const helpContent = await helpService.updateHelpContent(id, req.body);
    
    res.json({
      success: true,
      data: helpContent
    });
  } catch (error) {
    if ((error as any).message === 'Help content not found') {
      return res.status(404).json({
        success: false,
        error: 'Help content not found'
      });
    }
    
    console.error('Error updating help content:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update help content'
    });
  }
};

export const deleteHelpContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const helpContent = await helpService.deleteHelpContent(id);
    
    res.json({
      success: true,
      data: helpContent,
      message: 'Help content deleted successfully'
    });
  } catch (error) {
    if ((error as any).message === 'Help content not found') {
      return res.status(404).json({
        success: false,
        error: 'Help content not found'
      });
    }
    
    console.error('Error deleting help content:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete help content'
    });
  }
};

export const getHelpContentByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const content = await helpService.getHelpContentByCategory(category);
    
    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error('Error fetching help content by category:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch help content by category'
    });
  }
};

export const getHelpContentByTopic = async (req: Request, res: Response) => {
  try {
    const { topic } = req.params;
    const content = await helpService.getHelpContentByTopic(topic);
    
    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error('Error fetching help content by topic:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch help content by topic'
    });
  }
};

export const getFeaturedHelpContent = async (req: Request, res: Response) => {
  try {
    const { limit = 10 } = req.query;
    const content = await helpService.getFeaturedHelpContent(Number(limit));
    
    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error('Error fetching featured help content:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch featured help content'
    });
  }
};

export const getPopularHelpContent = async (req: Request, res: Response) => {
  try {
    const { limit = 10 } = req.query;
    const content = await helpService.getPopularHelpContent(Number(limit));
    
    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error('Error fetching popular help content:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch popular help content'
    });
  }
};

export const searchHelpContent = async (req: Request, res: Response) => {
  try {
    const { q: query, category, limit = 20 } = req.query;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required'
      });
    }
    
    const results = await helpService.searchHelpContent({
      query: query as string,
      category: category as string,
      limit: Number(limit)
    });
    
    res.json({
      success: true,
      data: results,
      query: query,
      count: results.length
    });
  } catch (error) {
    console.error('Error searching help content:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search help content'
    });
  }
};

export const getHelpCategories = async (req: Request, res: Response) => {
  try {
    const categories = await helpService.getHelpCategories();
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching help categories:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch help categories'
    });
  }
};

export const getHelpTopics = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    const topics = await helpService.getHelpTopics(category as string);
    
    res.json({
      success: true,
      data: topics
    });
  } catch (error) {
    console.error('Error fetching help topics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch help topics'
    });
  }
};

export const getRecentlyUpdatedContent = async (req: Request, res: Response) => {
  try {
    const { limit = 10 } = req.query;
    const content = await helpService.getRecentlyUpdatedContent(Number(limit));
    
    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error('Error fetching recently updated content:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch recently updated content'
    });
  }
};

export const getHelpContentStats = async (req: Request, res: Response) => {
  try {
    const stats = await helpService.getHelpContentStats();
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching help content stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch help content stats'
    });
  }
};

export const getSuggestedContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { limit = 5 } = req.query;
    
    const suggestions = await helpService.getSuggestedContent(id, Number(limit));
    
    res.json({
      success: true,
      data: suggestions
    });
  } catch (error) {
    console.error('Error fetching suggested content:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch suggested content'
    });
  }
};