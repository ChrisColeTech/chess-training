import express from 'express';
import { getLearningPaths, getLearningPathById, createLearningPath, updateLearningPath, getLearningModules, getLearningModuleById, createLearningModule, startLearningPath, updateModuleProgress, getUserLearningProgress, getLearningPathStats, getLearningCategories } from '../controllers/learningController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     LearningPath:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the learning path
 *         title:
 *           type: string
 *           description: Title of the learning path
 *         description:
 *           type: string
 *           description: Detailed description of the learning path
 *         category:
 *           type: string
 *           description: Category of the learning path
 *         difficulty:
 *           type: string
 *           enum: [beginner, intermediate, advanced]
 *           description: Difficulty level of the learning path
 *         estimated_duration:
 *           type: integer
 *           description: Estimated duration in minutes
 *         prerequisites:
 *           type: string
 *           nullable: true
 *           description: Prerequisites for the learning path
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Tags associated with the learning path
 *         is_guided:
 *           type: boolean
 *           description: Whether the path is guided or self-paced
 *         status:
 *           type: string
 *           enum: [active, draft, archived]
 *           description: Status of the learning path
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *     LearningModule:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the learning module
 *         learning_path_id:
 *           type: string
 *           description: ID of the associated learning path
 *         title:
 *           type: string
 *           description: Title of the learning module
 *         description:
 *           type: string
 *           description: Description of the learning module
 *         content:
 *           type: string
 *           description: Module content
 *         module_type:
 *           type: string
 *           enum: [lesson, quiz, exercise, assessment]
 *           description: Type of the learning module
 *         order_index:
 *           type: integer
 *           description: Order of the module within the path
 *         estimated_duration:
 *           type: integer
 *           nullable: true
 *           description: Estimated duration in minutes
 *         interactive_elements:
 *           type: object
 *           nullable: true
 *           description: Interactive elements configuration
 *         assessment_criteria:
 *           type: object
 *           nullable: true
 *           description: Assessment criteria for the module
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *     UserProgress:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the progress record
 *         user_id:
 *           type: string
 *           description: ID of the user
 *         learning_path_id:
 *           type: string
 *           nullable: true
 *           description: ID of the learning path
 *         learning_module_id:
 *           type: string
 *           nullable: true
 *           description: ID of the learning module
 *         progress_percentage:
 *           type: number
 *           minimum: 0
 *           maximum: 100
 *           description: Progress percentage (0-100)
 *         time_spent:
 *           type: integer
 *           nullable: true
 *           description: Time spent in minutes
 *         score:
 *           type: number
 *           nullable: true
 *           description: Score achieved
 *         notes:
 *           type: string
 *           nullable: true
 *           description: User notes
 *         completed:
 *           type: boolean
 *           description: Whether the item is completed
 *         started_at:
 *           type: string
 *           format: date-time
 *           description: When the user started
 *         completed_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: When the user completed
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *     LearningPathStats:
 *       type: object
 *       properties:
 *         learning_path_id:
 *           type: string
 *           description: ID of the learning path
 *         total_modules:
 *           type: integer
 *           description: Total number of modules in the path
 *         completed_modules:
 *           type: integer
 *           description: Number of completed modules
 *         overall_progress:
 *           type: number
 *           description: Overall progress percentage
 *         total_time_spent:
 *           type: integer
 *           description: Total time spent in minutes
 *         average_score:
 *           type: number
 *           nullable: true
 *           description: Average score across modules
 *     Category:
 *       type: object
 *       properties:
 *         category:
 *           type: string
 *           description: Category name
 *         count:
 *           type: integer
 *           description: Number of learning paths in this category
 *     ApiResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Whether the request was successful
 *         data:
 *           description: Response data
 *         error:
 *           type: string
 *           description: Error message if request failed
 *     PaginatedResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/ApiResponse'
 *         - type: object
 *           properties:
 *             total:
 *               type: integer
 *               description: Total number of items
 *             limit:
 *               type: integer
 *               description: Number of items per page
 *             offset:
 *               type: integer
 *               description: Number of items skipped
 *     CreateLearningPathRequest:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - category
 *         - difficulty
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the learning path
 *         description:
 *           type: string
 *           description: Description of the learning path
 *         category:
 *           type: string
 *           description: Category of the learning path
 *         difficulty:
 *           type: string
 *           enum: [beginner, intermediate, advanced]
 *           description: Difficulty level
 *         estimated_duration:
 *           type: integer
 *           description: Estimated duration in minutes
 *         prerequisites:
 *           type: string
 *           description: Prerequisites for the path
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Tags for the path
 *         is_guided:
 *           type: boolean
 *           description: Whether the path is guided
 *     CreateLearningModuleRequest:
 *       type: object
 *       required:
 *         - learning_path_id
 *         - title
 *         - description
 *         - content
 *         - module_type
 *         - order_index
 *       properties:
 *         learning_path_id:
 *           type: string
 *           description: ID of the learning path
 *         title:
 *           type: string
 *           description: Title of the module
 *         description:
 *           type: string
 *           description: Description of the module
 *         content:
 *           type: string
 *           description: Module content
 *         module_type:
 *           type: string
 *           enum: [lesson, quiz, exercise, assessment]
 *           description: Type of module
 *         order_index:
 *           type: integer
 *           description: Order within the path
 *         estimated_duration:
 *           type: integer
 *           description: Estimated duration in minutes
 *         interactive_elements:
 *           type: object
 *           description: Interactive elements configuration
 *         assessment_criteria:
 *           type: object
 *           description: Assessment criteria
 *     UpdateProgressRequest:
 *       type: object
 *       properties:
 *         progress_percentage:
 *           type: number
 *           minimum: 0
 *           maximum: 100
 *           description: Progress percentage
 *         time_spent:
 *           type: integer
 *           description: Time spent in minutes
 *         score:
 *           type: number
 *           description: Score achieved
 *         notes:
 *           type: string
 *           description: User notes
 *         completed:
 *           type: boolean
 *           description: Whether completed
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/learning/paths:
 *   get:
 *     summary: Get all learning paths
 *     description: Retrieve a paginated list of learning paths with optional filtering
 *     tags: [Learning]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *           enum: [beginner, intermediate, advanced]
 *         description: Filter by difficulty level
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, draft, archived]
 *         description: Filter by status
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 50
 *         description: Number of items per page
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         description: Number of items to skip
 *     responses:
 *       200:
 *         description: Learning paths retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/PaginatedResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/LearningPath'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.get('/paths', getLearningPaths);

/**
 * @swagger
 * /api/learning/paths/categories:
 *   get:
 *     summary: Get learning path categories
 *     description: Retrieve all available learning path categories with counts
 *     tags: [Learning]
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Category'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.get('/paths/categories', getLearningCategories);

/**
 * @swagger
 * /api/learning/paths/{id}:
 *   get:
 *     summary: Get specific learning path
 *     description: Retrieve a specific learning path by its ID
 *     tags: [Learning]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Learning path ID
 *     responses:
 *       200:
 *         description: Learning path retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/LearningPath'
 *       404:
 *         description: Learning path not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.get('/paths/:id', getLearningPathById);

/**
 * @swagger
 * /api/learning/paths/{learningPathId}/stats:
 *   get:
 *     summary: Get learning path statistics for user
 *     description: Retrieve progress statistics for a specific learning path for the authenticated user
 *     tags: [Learning]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: learningPathId
 *         required: true
 *         schema:
 *           type: string
 *         description: Learning path ID
 *     responses:
 *       200:
 *         description: Learning path stats retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/LearningPathStats'
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.get('/paths/:learningPathId/stats', authenticateToken, getLearningPathStats);

/**
 * @swagger
 * /api/learning/modules:
 *   get:
 *     summary: Get all learning modules
 *     description: Retrieve a list of learning modules with optional filtering
 *     tags: [Learning]
 *     parameters:
 *       - in: query
 *         name: learningPathId
 *         schema:
 *           type: string
 *         description: Filter by learning path ID
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *           enum: [beginner, intermediate, advanced]
 *         description: Filter by difficulty level
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, draft, archived]
 *         description: Filter by status
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 50
 *         description: Number of items per page
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         description: Number of items to skip
 *     responses:
 *       200:
 *         description: Learning modules retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/LearningModule'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.get('/modules', getLearningModules);

/**
 * @swagger
 * /api/learning/modules/{id}:
 *   get:
 *     summary: Get specific learning module
 *     description: Retrieve a specific learning module by its ID
 *     tags: [Learning]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Learning module ID
 *     responses:
 *       200:
 *         description: Learning module retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/LearningModule'
 *       404:
 *         description: Learning module not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.get('/modules/:id', getLearningModuleById);

/**
 * @swagger
 * /api/learning/progress:
 *   get:
 *     summary: Get user learning progress
 *     description: Retrieve learning progress for the authenticated user across all learning paths and modules
 *     tags: [Learning]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: completed
 *         schema:
 *           type: boolean
 *         description: Filter by completion status
 *     responses:
 *       200:
 *         description: User learning progress retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/UserProgress'
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.get('/progress', authenticateToken, getUserLearningProgress);

/**
 * @swagger
 * /api/learning/progress/{learningPathId}:
 *   get:
 *     summary: Get user progress for specific learning path
 *     description: Retrieve learning progress for a specific learning path for the authenticated user
 *     tags: [Learning]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: learningPathId
 *         required: true
 *         schema:
 *           type: string
 *         description: Learning path ID
 *       - in: query
 *         name: completed
 *         schema:
 *           type: boolean
 *         description: Filter by completion status
 *     responses:
 *       200:
 *         description: User progress for learning path retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/UserProgress'
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.get('/progress/:learningPathId', authenticateToken, getUserLearningProgress);

/**
 * @swagger
 * /api/learning/paths:
 *   post:
 *     summary: Create new learning path
 *     description: Create a new learning path (admin only)
 *     tags: [Learning]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateLearningPathRequest'
 *     responses:
 *       201:
 *         description: Learning path created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/LearningPath'
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       403:
 *         description: Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.post('/paths', createLearningPath);

/**
 * @swagger
 * /api/learning/modules:
 *   post:
 *     summary: Create new learning module
 *     description: Create a new learning module (admin only)
 *     tags: [Learning]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateLearningModuleRequest'
 *     responses:
 *       201:
 *         description: Learning module created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/LearningModule'
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       403:
 *         description: Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.post('/modules', createLearningModule);

/**
 * @swagger
 * /api/learning/paths/{learningPathId}/start:
 *   post:
 *     summary: Start learning path
 *     description: Start a learning path for the authenticated user
 *     tags: [Learning]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: learningPathId
 *         required: true
 *         schema:
 *           type: string
 *         description: Learning path ID
 *     responses:
 *       200:
 *         description: Learning path started successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/UserProgress'
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Learning path not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.post('/paths/:learningPathId/start', authenticateToken, startLearningPath);

/**
 * @swagger
 * /api/learning/paths/{id}:
 *   put:
 *     summary: Update learning path
 *     description: Update an existing learning path (admin only)
 *     tags: [Learning]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Learning path ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateLearningPathRequest'
 *     responses:
 *       200:
 *         description: Learning path updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/LearningPath'
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       403:
 *         description: Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Learning path not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.put('/paths/:id', updateLearningPath);

/**
 * @swagger
 * /api/learning/modules/{moduleId}/progress:
 *   put:
 *     summary: Update module progress
 *     description: Update progress for a learning module for the authenticated user
 *     tags: [Learning]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         required: true
 *         schema:
 *           type: string
 *         description: Learning module ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProgressRequest'
 *     responses:
 *       200:
 *         description: Module progress updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/UserProgress'
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.put('/modules/:moduleId/progress', authenticateToken, updateModuleProgress);

export default router;