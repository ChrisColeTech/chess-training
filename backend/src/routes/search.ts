import express from 'express';
import { SearchController } from '../controllers/searchController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();
const searchController = new SearchController();

// Public search routes (no authentication required for browsing)

// Global search
router.get('/', searchController.globalSearch);

// Search specific content types
router.get('/puzzles', searchController.searchPuzzles);
router.get('/games', searchController.searchGames);
router.get('/tutorials', searchController.searchTutorials);
router.get('/learning-paths', searchController.searchLearningPaths);

// Search utilities
router.get('/suggestions', searchController.getSearchSuggestions);
router.get('/popular', searchController.getPopularSearches);

// Saved searches (authenticated routes)
router.post('/save', authenticateToken, searchController.saveSearch);
router.get('/saved', authenticateToken, searchController.getSavedSearches);
router.delete('/saved/:id', authenticateToken, searchController.deleteSavedSearch);

export default router;