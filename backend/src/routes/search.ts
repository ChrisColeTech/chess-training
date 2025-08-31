import express from 'express';
import { SearchController } from '../controllers/searchController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();
const searchController = new SearchController();

/**
 * @swagger
 * components:
 *   schemas:
 *     SearchResult:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the search result
 *         title:
 *           type: string
 *           description: Title or name of the result
 *         type:
 *           type: string
 *           enum: [puzzle, game, tutorial, learning-path]
 *           description: Type of content
 *         description:
 *           type: string
 *           description: Brief description of the content
 *         relevance_score:
 *           type: number
 *           description: Search relevance score (0-1)
 *         metadata:
 *           type: object
 *           description: Additional type-specific metadata
 *     PaginationInfo:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *           description: Current page number
 *         limit:
 *           type: integer
 *           description: Items per page
 *         total:
 *           type: integer
 *           description: Total number of results
 *         totalPages:
 *           type: integer
 *           description: Total number of pages
 *     SearchResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/SearchResult'
 *         pagination:
 *           $ref: '#/components/schemas/PaginationInfo'
 *         query:
 *           type: string
 *           description: Original search query
 *     SavedSearch:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Saved search identifier
 *         query:
 *           type: string
 *           description: Search query
 *         filters:
 *           type: object
 *           description: Applied search filters
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *     SearchSuggestion:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *           description: Suggested search term
 *         type:
 *           type: string
 *           description: Type of suggestion
 *         frequency:
 *           type: integer
 *           description: How often this term is searched
 *     PopularSearch:
 *       type: object
 *       properties:
 *         query:
 *           type: string
 *           description: Popular search query
 *         count:
 *           type: integer
 *           description: Number of times searched
 *         trending:
 *           type: boolean
 *           description: Whether this is currently trending
 */

/**
 * @swagger
 * /api/search:
 *   get:
 *     tags:
 *       - Search
 *     summary: Global search across all content types
 *     description: Performs a comprehensive search across puzzles, games, tutorials, and learning paths
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search query string
 *         example: "chess tactics"
 *       - in: query
 *         name: type
 *         required: false
 *         schema:
 *           type: string
 *           enum: [puzzle, game, tutorial, learning-path]
 *         description: Filter results by content type
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 50
 *         description: Number of results per page
 *     responses:
 *       200:
 *         description: Search completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SearchResponse'
 *             example:
 *               success: true
 *               data:
 *                 - id: "puzzle_001"
 *                   title: "Knight Fork Tactics"
 *                   type: "puzzle"
 *                   description: "Learn the knight fork tactical pattern"
 *                   relevance_score: 0.95
 *                   metadata:
 *                     difficulty: "intermediate"
 *                     rating: 1400
 *                 - id: "tutorial_005"
 *                   title: "Basic Chess Tactics"
 *                   type: "tutorial"
 *                   description: "Introduction to fundamental tactical patterns"
 *                   relevance_score: 0.88
 *                   metadata:
 *                     duration: "45 minutes"
 *                     difficulty: "beginner"
 *               pagination:
 *                 page: 1
 *                 limit: 50
 *                 total: 127
 *                 totalPages: 3
 *               query: "chess tactics"
 *       400:
 *         description: Invalid search parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Search query is required"
 *       500:
 *         description: Search service error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               error: "Search failed"
 */
router.get('/', searchController.globalSearch);

/**
 * @swagger
 * /api/search/puzzles:
 *   get:
 *     tags:
 *       - Search
 *     summary: Search chess puzzles
 *     description: Search for chess puzzles with specific filters and criteria
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search query string
 *         example: "knight fork"
 *       - in: query
 *         name: difficulty
 *         required: false
 *         schema:
 *           type: string
 *           enum: [beginner, intermediate, advanced, expert]
 *         description: Filter by difficulty level
 *       - in: query
 *         name: themes
 *         required: false
 *         schema:
 *           type: string
 *         description: Comma-separated list of tactical themes
 *         example: "fork,pin,skewer"
 *       - in: query
 *         name: rating_min
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 500
 *         description: Minimum puzzle rating
 *       - in: query
 *         name: rating_max
 *         required: false
 *         schema:
 *           type: integer
 *           maximum: 3000
 *         description: Maximum puzzle rating
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 50
 *         description: Number of results per page
 *     responses:
 *       200:
 *         description: Puzzle search completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SearchResponse'
 *       400:
 *         description: Invalid search parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Puzzle search failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/search/games:
 *   get:
 *     tags:
 *       - Search
 *     summary: Search chess games
 *     description: Search for chess games with specific filters and criteria
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search query string
 *         example: "sicilian defense"
 *       - in: query
 *         name: player
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter by player name
 *       - in: query
 *         name: opening
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter by opening name
 *       - in: query
 *         name: result
 *         required: false
 *         schema:
 *           type: string
 *           enum: ["1-0", "0-1", "1/2-1/2"]
 *         description: Filter by game result
 *       - in: query
 *         name: year_min
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1800
 *         description: Minimum year for game
 *       - in: query
 *         name: year_max
 *         required: false
 *         schema:
 *           type: integer
 *           maximum: 2024
 *         description: Maximum year for game
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 50
 *         description: Number of results per page
 *     responses:
 *       200:
 *         description: Game search completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SearchResponse'
 *       400:
 *         description: Invalid search parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Games search failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/search/tutorials:
 *   get:
 *     tags:
 *       - Search
 *     summary: Search chess tutorials
 *     description: Search for chess tutorials and educational content
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search query string
 *         example: "endgame basics"
 *       - in: query
 *         name: category
 *         required: false
 *         schema:
 *           type: string
 *           enum: [openings, middlegame, endgame, tactics, strategy]
 *         description: Filter by tutorial category
 *       - in: query
 *         name: difficulty
 *         required: false
 *         schema:
 *           type: string
 *           enum: [beginner, intermediate, advanced, expert]
 *         description: Filter by difficulty level
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 50
 *         description: Number of results per page
 *     responses:
 *       200:
 *         description: Tutorial search completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SearchResponse'
 *       400:
 *         description: Invalid search parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Tutorial search failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/search/learning-paths:
 *   get:
 *     tags:
 *       - Search
 *     summary: Search learning paths
 *     description: Search for structured chess learning paths and courses
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search query string
 *         example: "beginner course"
 *       - in: query
 *         name: category
 *         required: false
 *         schema:
 *           type: string
 *           enum: [fundamentals, tactics, strategy, openings, endgames]
 *         description: Filter by learning path category
 *       - in: query
 *         name: difficulty
 *         required: false
 *         schema:
 *           type: string
 *           enum: [beginner, intermediate, advanced, expert]
 *         description: Filter by difficulty level
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 50
 *         description: Number of results per page
 *     responses:
 *       200:
 *         description: Learning path search completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SearchResponse'
 *       400:
 *         description: Invalid search parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Learning paths search failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/puzzles', searchController.searchPuzzles);
router.get('/games', searchController.searchGames);
router.get('/tutorials', searchController.searchTutorials);
router.get('/learning-paths', searchController.searchLearningPaths);

/**
 * @swagger
 * /api/search/suggestions:
 *   get:
 *     tags:
 *       - Search
 *     summary: Get search suggestions
 *     description: Get autocomplete suggestions for search queries
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Partial search query to get suggestions for
 *         example: "chess tac"
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 10
 *         description: Maximum number of suggestions to return
 *     responses:
 *       200:
 *         description: Search suggestions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/SearchSuggestion'
 *             example:
 *               success: true
 *               data:
 *                 - text: "chess tactics"
 *                   type: "popular"
 *                   frequency: 145
 *                 - text: "chess tactics for beginners"
 *                   type: "complete"
 *                   frequency: 89
 *                 - text: "tactical patterns"
 *                   type: "related"
 *                   frequency: 67
 *       400:
 *         description: Invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Failed to get suggestions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/search/popular:
 *   get:
 *     tags:
 *       - Search
 *     summary: Get popular searches
 *     description: Retrieve the most popular search queries across the platform
 *     parameters:
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 10
 *         description: Maximum number of popular searches to return
 *     responses:
 *       200:
 *         description: Popular searches retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PopularSearch'
 *             example:
 *               success: true
 *               data:
 *                 - query: "chess tactics"
 *                   count: 1247
 *                   trending: true
 *                 - query: "sicilian defense"
 *                   count: 892
 *                   trending: false
 *                 - query: "endgame patterns"
 *                   count: 634
 *                   trending: true
 *       500:
 *         description: Failed to get popular searches
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/suggestions', searchController.getSearchSuggestions);
router.get('/popular', searchController.getPopularSearches);

/**
 * @swagger
 * /api/search/save:
 *   post:
 *     tags:
 *       - Search
 *     summary: Save a search query
 *     description: Save a search query with filters for quick access later
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - query
 *             properties:
 *               query:
 *                 type: string
 *                 description: Search query to save
 *                 example: "chess tactics intermediate"
 *               filters:
 *                 type: object
 *                 description: Search filters to save with the query
 *                 example:
 *                   difficulty: "intermediate"
 *                   themes: "fork,pin"
 *                   rating_min: 1200
 *           example:
 *             query: "chess tactics intermediate"
 *             filters:
 *               difficulty: "intermediate"
 *               themes: "fork,pin"
 *               rating_min: 1200
 *     responses:
 *       200:
 *         description: Search saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/SavedSearch'
 *             example:
 *               success: true
 *               data:
 *                 id: "saved_123"
 *                 query: "chess tactics intermediate"
 *                 filters:
 *                   difficulty: "intermediate"
 *                   themes: "fork,pin"
 *                   rating_min: 1200
 *                 created_at: "2024-01-20T15:30:00Z"
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Failed to save search
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/search/saved:
 *   get:
 *     tags:
 *       - Search
 *     summary: Get saved searches
 *     description: Retrieve all saved searches for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Saved searches retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/SavedSearch'
 *             example:
 *               success: true
 *               data:
 *                 - id: "saved_123"
 *                   query: "chess tactics intermediate"
 *                   filters:
 *                     difficulty: "intermediate"
 *                     themes: "fork,pin"
 *                   created_at: "2024-01-20T15:30:00Z"
 *                 - id: "saved_124"
 *                   query: "sicilian defense games"
 *                   filters:
 *                     opening: "sicilian"
 *                     year_min: 2020
 *                   created_at: "2024-01-19T10:15:00Z"
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Failed to get saved searches
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/search/saved/{id}:
 *   delete:
 *     tags:
 *       - Search
 *     summary: Delete a saved search
 *     description: Remove a saved search from the user's collection
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the saved search
 *         example: "saved_123"
 *     responses:
 *       200:
 *         description: Saved search deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Search deleted successfully"
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Saved search not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Failed to delete search
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/save', authenticateToken, searchController.saveSearch);
router.get('/saved', authenticateToken, searchController.getSavedSearches);
router.delete('/saved/:id', authenticateToken, searchController.deleteSavedSearch);

export default router;