import express from 'express';
import { getHelpContent, getHelpContentById, createHelpContent, updateHelpContent, deleteHelpContent, getHelpContentByCategory, getHelpContentByTopic, getFeaturedHelpContent, getPopularHelpContent, searchHelpContent, getHelpCategories, getHelpTopics, getRecentlyUpdatedContent, getHelpContentStats, getSuggestedContent } from '../controllers/helpController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     HelpContent:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the help content
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         title:
 *           type: string
 *           description: Title of the help article
 *           example: "How to Castle in Chess"
 *         content:
 *           type: string
 *           description: Main content of the help article
 *           example: "Castling is a special move in chess involving the king and either rook..."
 *         category:
 *           type: string
 *           description: Category of the help content
 *           example: "chess-rules"
 *         topic:
 *           type: string
 *           description: Specific topic within the category
 *           example: "special-moves"
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Tags associated with the content
 *           example: ["castling", "king-safety", "beginner"]
 *         status:
 *           type: string
 *           enum: ["published", "draft", "archived"]
 *           description: Publication status of the content
 *           example: "published"
 *         view_count:
 *           type: integer
 *           description: Number of times the content has been viewed
 *           example: 1250
 *         helpful_votes:
 *           type: integer
 *           description: Number of helpful votes received
 *           example: 85
 *         is_featured:
 *           type: boolean
 *           description: Whether the content is featured
 *           example: true
 *         order_index:
 *           type: integer
 *           description: Order index for sorting
 *           example: 1
 *         related_articles:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/HelpContent'
 *           description: Related help articles
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the content was created
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the content was last updated
 *     CreateHelpContent:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - category
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the help article
 *           example: "How to Castle in Chess"
 *         content:
 *           type: string
 *           description: Main content of the help article
 *           example: "Castling is a special move in chess involving the king and either rook..."
 *         category:
 *           type: string
 *           description: Category of the help content
 *           example: "chess-rules"
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Tags associated with the content
 *           example: ["castling", "king-safety", "beginner"]
 *     UpdateHelpContent:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the help article
 *           example: "How to Castle in Chess - Updated"
 *         content:
 *           type: string
 *           description: Main content of the help article
 *           example: "Castling is a special move in chess involving the king and either rook..."
 *         category:
 *           type: string
 *           description: Category of the help content
 *           example: "chess-rules"
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Tags associated with the content
 *           example: ["castling", "king-safety", "beginner"]
 *     HelpCategory:
 *       type: object
 *       properties:
 *         category:
 *           type: string
 *           description: Name of the category
 *           example: "chess-rules"
 *         article_count:
 *           type: integer
 *           description: Number of articles in this category
 *           example: 25
 *         topic_count:
 *           type: integer
 *           description: Number of unique topics in this category
 *           example: 8
 *         total_views:
 *           type: integer
 *           description: Total views across all articles in category
 *           example: 15750
 *         last_updated:
 *           type: string
 *           format: date-time
 *           description: Timestamp of most recent update in category
 *     HelpTopic:
 *       type: object
 *       properties:
 *         topic:
 *           type: string
 *           description: Name of the topic
 *           example: "special-moves"
 *         category:
 *           type: string
 *           description: Category this topic belongs to
 *           example: "chess-rules"
 *         article_count:
 *           type: integer
 *           description: Number of articles for this topic
 *           example: 5
 *         total_views:
 *           type: integer
 *           description: Total views for this topic
 *           example: 3250
 *         last_updated:
 *           type: string
 *           format: date-time
 *           description: Timestamp of most recent update for this topic
 *     HelpStats:
 *       type: object
 *       properties:
 *         totalArticles:
 *           type: integer
 *           description: Total number of help articles
 *           example: 150
 *         publishedArticles:
 *           type: integer
 *           description: Number of published articles
 *           example: 135
 *         draftArticles:
 *           type: integer
 *           description: Number of draft articles
 *           example: 15
 *         featuredArticles:
 *           type: integer
 *           description: Number of featured articles
 *           example: 10
 *         categories:
 *           type: integer
 *           description: Number of categories
 *           example: 8
 *         topics:
 *           type: integer
 *           description: Number of topics
 *           example: 32
 *         totalViews:
 *           type: integer
 *           description: Total views across all articles
 *           example: 85750
 *         avgViewsPerArticle:
 *           type: integer
 *           description: Average views per article
 *           example: 572
 *     PaginatedHelpResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/HelpContent'
 *         total:
 *           type: integer
 *           description: Total number of items available
 *           example: 150
 *         limit:
 *           type: integer
 *           description: Number of items per page
 *           example: 50
 *         offset:
 *           type: integer
 *           description: Starting position for pagination
 *           example: 0
 *     HelpContentResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           $ref: '#/components/schemas/HelpContent'
 *     HelpSearchResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/HelpContent'
 *         query:
 *           type: string
 *           description: The search query used
 *           example: "castling"
 *         count:
 *           type: integer
 *           description: Number of results returned
 *           example: 3
 */

/**
 * @swagger
 * /api/help:
 *   get:
 *     summary: Get help content with optional filtering
 *     description: Retrieve help content with support for pagination and filtering by category, topic, search terms, and status
 *     tags: [Help]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *         example: "chess-rules"
 *       - in: query
 *         name: topic
 *         schema:
 *           type: string
 *         description: Filter by topic
 *         example: "special-moves"
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in title, content, or tags
 *         example: "castling"
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: ["published", "draft", "archived"]
 *         description: Filter by publication status
 *         example: "published"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 50
 *         description: Number of items per page
 *         example: 20
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         description: Number of items to skip for pagination
 *         example: 0
 *     responses:
 *       200:
 *         description: Successfully retrieved help content
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedHelpResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', getHelpContent);

/**
 * @swagger
 * /api/help/search:
 *   get:
 *     summary: Search help content
 *     description: Search for help articles using query text with optional category filtering and relevance scoring
 *     tags: [Help]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search query text
 *         example: "castling king safety"
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter results by category
 *         example: "chess-rules"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 20
 *         description: Maximum number of search results
 *         example: 10
 *     responses:
 *       200:
 *         description: Search results retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HelpSearchResponse'
 *       400:
 *         description: Bad request - missing search query
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Search query is required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/search', searchHelpContent);

/**
 * @swagger
 * /api/help/categories:
 *   get:
 *     summary: Get all help categories
 *     description: Retrieve all available help categories with article counts and statistics
 *     tags: [Help]
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
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
 *                     $ref: '#/components/schemas/HelpCategory'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/categories', getHelpCategories);

/**
 * @swagger
 * /api/help/topics:
 *   get:
 *     summary: Get all help topics
 *     description: Retrieve all available help topics, optionally filtered by category
 *     tags: [Help]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter topics by category
 *         example: "chess-rules"
 *     responses:
 *       200:
 *         description: Topics retrieved successfully
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
 *                     $ref: '#/components/schemas/HelpTopic'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/topics', getHelpTopics);

/**
 * @swagger
 * /api/help/featured:
 *   get:
 *     summary: Get featured help content
 *     description: Retrieve featured help articles sorted by helpful votes and view count
 *     tags: [Help]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 10
 *         description: Number of featured articles to return
 *         example: 5
 *     responses:
 *       200:
 *         description: Featured content retrieved successfully
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
 *                     $ref: '#/components/schemas/HelpContent'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/featured', getFeaturedHelpContent);

/**
 * @swagger
 * /api/help/popular:
 *   get:
 *     summary: Get popular help content
 *     description: Retrieve most popular help articles sorted by view count
 *     tags: [Help]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 10
 *         description: Number of popular articles to return
 *         example: 5
 *     responses:
 *       200:
 *         description: Popular content retrieved successfully
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
 *                     $ref: '#/components/schemas/HelpContent'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/popular', getPopularHelpContent);

/**
 * @swagger
 * /api/help/recent:
 *   get:
 *     summary: Get recently updated help content
 *     description: Retrieve recently updated help articles sorted by update timestamp
 *     tags: [Help]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 10
 *         description: Number of recent articles to return
 *         example: 5
 *     responses:
 *       200:
 *         description: Recent content retrieved successfully
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
 *                     $ref: '#/components/schemas/HelpContent'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/recent', getRecentlyUpdatedContent);

/**
 * @swagger
 * /api/help/stats:
 *   get:
 *     summary: Get help content statistics
 *     description: Retrieve comprehensive statistics about help content including article counts, categories, topics, and view metrics
 *     tags: [Help]
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/HelpStats'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/stats', getHelpContentStats);

/**
 * @swagger
 * /api/help/category/{category}:
 *   get:
 *     summary: Get help content by category
 *     description: Retrieve all help articles within a specific category, sorted by popularity
 *     tags: [Help]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: The category name to filter by
 *         example: "chess-rules"
 *     responses:
 *       200:
 *         description: Category content retrieved successfully
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
 *                     $ref: '#/components/schemas/HelpContent'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/category/:category', getHelpContentByCategory);

/**
 * @swagger
 * /api/help/topic/{topic}:
 *   get:
 *     summary: Get help content by topic
 *     description: Retrieve all help articles related to a specific topic, sorted by popularity
 *     tags: [Help]
 *     parameters:
 *       - in: path
 *         name: topic
 *         required: true
 *         schema:
 *           type: string
 *         description: The topic name to filter by
 *         example: "special-moves"
 *     responses:
 *       200:
 *         description: Topic content retrieved successfully
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
 *                     $ref: '#/components/schemas/HelpContent'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/topic/:topic', getHelpContentByTopic);

/**
 * @swagger
 * /api/help/{id}:
 *   get:
 *     summary: Get specific help content by ID
 *     description: Retrieve a specific help article by its unique identifier. This also increments the view count for the article.
 *     tags: [Help]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the help content
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Help content retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HelpContentResponse'
 *       404:
 *         description: Help content not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Help content not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', getHelpContentById);

/**
 * @swagger
 * /api/help/{id}/suggested:
 *   get:
 *     summary: Get suggested content for a help article
 *     description: Retrieve related/suggested help articles based on the current article's category, topic, and tags
 *     tags: [Help]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the help content
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 20
 *           default: 5
 *         description: Number of suggested articles to return
 *         example: 3
 *     responses:
 *       200:
 *         description: Suggested content retrieved successfully
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
 *                     $ref: '#/components/schemas/HelpContent'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id/suggested', getSuggestedContent);

/**
 * @swagger
 * /api/help:
 *   post:
 *     summary: Create new help content
 *     description: Create a new help article. This endpoint requires admin authentication.
 *     tags: [Help]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateHelpContent'
 *     responses:
 *       201:
 *         description: Help content created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HelpContentResponse'
 *       400:
 *         description: Bad request - validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Validation error"
 *                 details:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Unauthorized - admin access required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Admin access required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', createHelpContent);

/**
 * @swagger
 * /api/help/{id}:
 *   put:
 *     summary: Update help content
 *     description: Update an existing help article. This endpoint requires admin authentication.
 *     tags: [Help]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the help content to update
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateHelpContent'
 *     responses:
 *       200:
 *         description: Help content updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HelpContentResponse'
 *       400:
 *         description: Bad request - validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Validation error"
 *                 details:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Unauthorized - admin access required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Admin access required"
 *       404:
 *         description: Help content not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Help content not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id', updateHelpContent);

/**
 * @swagger
 * /api/help/{id}:
 *   delete:
 *     summary: Delete help content
 *     description: Delete a help article permanently. This endpoint requires admin authentication.
 *     tags: [Help]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the help content to delete
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Help content deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/HelpContent'
 *                 message:
 *                   type: string
 *                   example: "Help content deleted successfully"
 *       401:
 *         description: Unauthorized - admin access required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Admin access required"
 *       404:
 *         description: Help content not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Help content not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', deleteHelpContent);

export default router;