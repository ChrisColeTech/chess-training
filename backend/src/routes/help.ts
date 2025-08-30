import express from 'express';
import { getHelpContent, getHelpContentById, createHelpContent, updateHelpContent, deleteHelpContent, getHelpContentByCategory, getHelpContentByTopic, getFeaturedHelpContent, getPopularHelpContent, searchHelpContent, getHelpCategories, getHelpTopics, getRecentlyUpdatedContent, getHelpContentStats, getSuggestedContent } from '../controllers/helpController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// GET /api/help - Get help content
router.get('/', getHelpContent);

// GET /api/help/search - Search help content
router.get('/search', searchHelpContent);

// GET /api/help/categories - Get all help categories
router.get('/categories', getHelpCategories);

// GET /api/help/topics - Get all help topics
router.get('/topics', getHelpTopics);

// GET /api/help/featured - Get featured help content
router.get('/featured', getFeaturedHelpContent);

// GET /api/help/popular - Get popular help content
router.get('/popular', getPopularHelpContent);

// GET /api/help/recent - Get recently updated content
router.get('/recent', getRecentlyUpdatedContent);

// GET /api/help/stats - Get help content statistics
router.get('/stats', getHelpContentStats);

// GET /api/help/category/:category - Get help content by category
router.get('/category/:category', getHelpContentByCategory);

// GET /api/help/topic/:topic - Get help content by topic
router.get('/topic/:topic', getHelpContentByTopic);

// GET /api/help/:id - Get specific help content
router.get('/:id', getHelpContentById);

// GET /api/help/:id/suggested - Get suggested content for article
router.get('/:id/suggested', getSuggestedContent);

// POST /api/help - Create new help content (admin only)
router.post('/', createHelpContent);

// PUT /api/help/:id - Update help content (admin only)
router.put('/:id', updateHelpContent);

// DELETE /api/help/:id - Delete help content (admin only)
router.delete('/:id', deleteHelpContent);

export default router;