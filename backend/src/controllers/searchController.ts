import { Request, Response } from 'express';
import { SearchService } from '../services/searchService';
import { AuthenticatedRequest } from '../middleware/auth';

export class SearchController {
  private searchService = new SearchService();

  // Global search across all content types
  globalSearch = async (req: Request, res: Response) => {
    try {
      const { q, type, page = 1, limit = 50 } = req.query;
      
      if (!q || typeof q !== 'string') {
        return res.status(400).json({
          success: false,
          error: 'Search query is required'
        });
      }

      const results = await this.searchService.globalSearch(q, {
        type: type as string,
        page: Number(page),
        limit: Number(limit)
      });
      
      res.json({
        success: true,
        data: results.data,
        pagination: results.pagination,
        query: q
      });
    } catch (error: any) {
      console.error('Global search error:', error);
      res.status(500).json({
        success: false,
        error: 'Search failed'
      });
    }
  };

  // Search puzzles
  searchPuzzles = async (req: Request, res: Response) => {
    try {
      const { q, difficulty, themes, rating_min, rating_max, page = 1, limit = 50 } = req.query;
      
      if (!q || typeof q !== 'string') {
        return res.status(400).json({
          success: false,
          error: 'Search query is required'
        });
      }

      const results = await this.searchService.searchPuzzles(q, {
        difficulty: difficulty as string,
        themes: themes as string,
        ratingMin: rating_min ? Number(rating_min) : undefined,
        ratingMax: rating_max ? Number(rating_max) : undefined,
        page: Number(page),
        limit: Number(limit)
      });
      
      res.json({
        success: true,
        data: results.data,
        pagination: results.pagination,
        query: q
      });
    } catch (error: any) {
      console.error('Search puzzles error:', error);
      res.status(500).json({
        success: false,
        error: 'Puzzle search failed'
      });
    }
  };

  // Search games
  searchGames = async (req: Request, res: Response) => {
    try {
      const { q, player, opening, result, year_min, year_max, page = 1, limit = 50 } = req.query;
      
      if (!q || typeof q !== 'string') {
        return res.status(400).json({
          success: false,
          error: 'Search query is required'
        });
      }

      const results = await this.searchService.searchGames(q, {
        player: player as string,
        opening: opening as string,
        result: result as string,
        yearMin: year_min ? Number(year_min) : undefined,
        yearMax: year_max ? Number(year_max) : undefined,
        page: Number(page),
        limit: Number(limit)
      });
      
      res.json({
        success: true,
        data: results.data,
        pagination: results.pagination,
        query: q
      });
    } catch (error: any) {
      console.error('Search games error:', error);
      res.status(500).json({
        success: false,
        error: 'Games search failed'
      });
    }
  };

  // Search tutorials
  searchTutorials = async (req: Request, res: Response) => {
    try {
      const { q, category, difficulty, page = 1, limit = 50 } = req.query;
      
      if (!q || typeof q !== 'string') {
        return res.status(400).json({
          success: false,
          error: 'Search query is required'
        });
      }

      const results = await this.searchService.searchTutorials(q, {
        category: category as string,
        difficulty: difficulty as string,
        page: Number(page),
        limit: Number(limit)
      });
      
      res.json({
        success: true,
        data: results.data,
        pagination: results.pagination,
        query: q
      });
    } catch (error: any) {
      console.error('Search tutorials error:', error);
      res.status(500).json({
        success: false,
        error: 'Tutorial search failed'
      });
    }
  };

  // Get search suggestions
  getSearchSuggestions = async (req: Request, res: Response) => {
    try {
      const { q, limit = 10 } = req.query;
      
      if (!q || typeof q !== 'string') {
        return res.status(400).json({
          success: false,
          error: 'Query is required for suggestions'
        });
      }

      const suggestions = await this.searchService.getSearchSuggestions(q, Number(limit));
      
      res.json({
        success: true,
        data: suggestions
      });
    } catch (error: any) {
      console.error('Get search suggestions error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get suggestions'
      });
    }
  };

  // Get popular searches
  getPopularSearches = async (req: Request, res: Response) => {
    try {
      const { limit = 10 } = req.query;
      
      const searches = await this.searchService.getPopularSearches(Number(limit));
      
      res.json({
        success: true,
        data: searches
      });
    } catch (error: any) {
      console.error('Get popular searches error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get popular searches'
      });
    }
  };

  // Missing methods for saved searches
  searchLearningPaths = async (req: Request, res: Response) => {
    try {
      const { q, category, difficulty, page = 1, limit = 50 } = req.query;
      
      if (!q || typeof q !== 'string') {
        return res.status(400).json({
          success: false,
          error: 'Search query is required'
        });
      }

      const results = await this.searchService.searchLearningPaths(q, {
        category: category as string,
        difficulty: difficulty as string,
        page: Number(page),
        limit: Number(limit)
      });
      
      res.json({
        success: true,
        data: results.data,
        pagination: results.pagination,
        query: q
      });
    } catch (error: any) {
      console.error('Search learning paths error:', error);
      res.status(500).json({
        success: false,
        error: 'Learning paths search failed'
      });
    }
  };

  saveSearch = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'Authentication required'
        });
      }

      const { query, filters } = req.body;
      if (!query) {
        return res.status(400).json({
          success: false,
          error: 'Query is required'
        });
      }

      const savedSearch = await this.searchService.saveSearch(userId, query, filters);
      
      res.json({
        success: true,
        data: savedSearch
      });
    } catch (error: any) {
      console.error('Save search error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to save search'
      });
    }
  };

  getSavedSearches = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'Authentication required'
        });
      }

      const searches = await this.searchService.getSavedSearches(userId);
      
      res.json({
        success: true,
        data: searches
      });
    } catch (error: any) {
      console.error('Get saved searches error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get saved searches'
      });
    }
  };

  deleteSavedSearch = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'Authentication required'
        });
      }

      const { id } = req.params;
      await this.searchService.deleteSavedSearch(userId, id);
      
      res.json({
        success: true,
        message: 'Search deleted successfully'
      });
    } catch (error: any) {
      console.error('Delete saved search error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete search'
      });
    }
  };
}