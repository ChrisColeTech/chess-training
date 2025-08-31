import express from 'express';
import { getTutorials, getTutorialById, createTutorial, updateTutorial, deleteTutorial, getTutorialsByCategory, getTutorialsByDifficulty, getTutorialSteps, createTutorialStep, startTutorial, completeStep, getUserTutorialProgress, getTutorialCategories } from '../controllers/tutorialController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Tutorial:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - description
 *         - category
 *         - difficulty
 *         - estimatedDuration
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the tutorial
 *         title:
 *           type: string
 *           description: Title of the tutorial
 *         description:
 *           type: string
 *           description: Detailed description of the tutorial
 *         category:
 *           type: string
 *           description: Category of the tutorial (e.g., opening, middlegame, endgame)
 *         difficulty:
 *           type: string
 *           enum: [beginner, intermediate, advanced]
 *           description: Difficulty level of the tutorial
 *         estimatedDuration:
 *           type: integer
 *           description: Estimated duration in minutes
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *     TutorialStep:
 *       type: object
 *       required:
 *         - id
 *         - tutorialId
 *         - stepNumber
 *         - title
 *         - content
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the step
 *         tutorialId:
 *           type: integer
 *           description: ID of the parent tutorial
 *         stepNumber:
 *           type: integer
 *           description: Order number of the step
 *         title:
 *           type: string
 *           description: Title of the step
 *         content:
 *           type: string
 *           description: Content of the step
 *         position:
 *           type: string
 *           description: Chess position in FEN notation
 *         move:
 *           type: string
 *           description: Chess move in algebraic notation
 *     UserTutorialProgress:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         userId:
 *           type: integer
 *         tutorialId:
 *           type: integer
 *         currentStepId:
 *           type: integer
 *         isCompleted:
 *           type: boolean
 *         completedSteps:
 *           type: array
 *           items:
 *             type: integer
 *         startedAt:
 *           type: string
 *           format: date-time
 *         completedAt:
 *           type: string
 *           format: date-time
 *     CreateTutorialRequest:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - category
 *         - difficulty
 *         - estimatedDuration
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         category:
 *           type: string
 *         difficulty:
 *           type: string
 *           enum: [beginner, intermediate, advanced]
 *         estimatedDuration:
 *           type: integer
 *     CreateTutorialStepRequest:
 *       type: object
 *       required:
 *         - stepNumber
 *         - title
 *         - content
 *       properties:
 *         stepNumber:
 *           type: integer
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         position:
 *           type: string
 *         move:
 *           type: string
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *         message:
 *           type: string
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/tutorials:
 *   get:
 *     summary: Get all tutorials
 *     description: Retrieve a list of all available chess tutorials
 *     tags: [Tutorials]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of tutorials per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term to filter tutorials by title or description
 *     responses:
 *       200:
 *         description: List of tutorials retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tutorials:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Tutorial'
 *                 totalCount:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', getTutorials);

/**
 * @swagger
 * /api/tutorials/categories:
 *   get:
 *     summary: Get tutorial categories
 *     description: Retrieve a list of all available tutorial categories
 *     tags: [Tutorials]
 *     responses:
 *       200:
 *         description: List of categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["opening", "middlegame", "endgame", "tactics", "strategy"]
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/categories', getTutorialCategories);

/**
 * @swagger
 * /api/tutorials/category/{category}:
 *   get:
 *     summary: Get tutorials by category
 *     description: Retrieve tutorials filtered by a specific category
 *     tags: [Tutorials]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: Category to filter tutorials by
 *         example: opening
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of tutorials per page
 *     responses:
 *       200:
 *         description: Tutorials retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tutorials:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Tutorial'
 *                 totalCount:
 *                   type: integer
 *                 category:
 *                   type: string
 *       400:
 *         description: Invalid category provided
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: No tutorials found for the specified category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/category/:category', getTutorialsByCategory);

/**
 * @swagger
 * /api/tutorials/difficulty/{difficulty}:
 *   get:
 *     summary: Get tutorials by difficulty
 *     description: Retrieve tutorials filtered by difficulty level
 *     tags: [Tutorials]
 *     parameters:
 *       - in: path
 *         name: difficulty
 *         required: true
 *         schema:
 *           type: string
 *           enum: [beginner, intermediate, advanced]
 *         description: Difficulty level to filter tutorials by
 *         example: beginner
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of tutorials per page
 *     responses:
 *       200:
 *         description: Tutorials retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tutorials:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Tutorial'
 *                 totalCount:
 *                   type: integer
 *                 difficulty:
 *                   type: string
 *       400:
 *         description: Invalid difficulty level provided
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: No tutorials found for the specified difficulty
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/difficulty/:difficulty', getTutorialsByDifficulty);

/**
 * @swagger
 * /api/tutorials/{id}:
 *   get:
 *     summary: Get specific tutorial with steps
 *     description: Retrieve a specific tutorial by ID including its steps
 *     tags: [Tutorials]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique identifier of the tutorial
 *         example: 1
 *     responses:
 *       200:
 *         description: Tutorial retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tutorial:
 *                   allOf:
 *                     - $ref: '#/components/schemas/Tutorial'
 *                     - type: object
 *                       properties:
 *                         steps:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/TutorialStep'
 *       400:
 *         description: Invalid tutorial ID provided
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Tutorial not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', getTutorialById);

/**
 * @swagger
 * /api/tutorials/{tutorialId}/steps:
 *   get:
 *     summary: Get tutorial steps
 *     description: Retrieve all steps for a specific tutorial
 *     tags: [Tutorials]
 *     parameters:
 *       - in: path
 *         name: tutorialId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the tutorial
 *         example: 1
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Number of steps per page
 *     responses:
 *       200:
 *         description: Tutorial steps retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 steps:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TutorialStep'
 *                 totalCount:
 *                   type: integer
 *                 tutorialId:
 *                   type: integer
 *       400:
 *         description: Invalid tutorial ID provided
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Tutorial not found or no steps available
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:tutorialId/steps', getTutorialSteps);

/**
 * @swagger
 * /api/tutorials/progress/{tutorialId}:
 *   get:
 *     summary: Get user tutorial progress
 *     description: Retrieve the authenticated user's progress for a specific tutorial
 *     tags: [Tutorials]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tutorialId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the tutorial
 *         example: 1
 *     responses:
 *       200:
 *         description: Tutorial progress retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserTutorialProgress'
 *       401:
 *         description: Unauthorized - invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Tutorial not found or no progress available
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/progress/:tutorialId', authenticateToken, getUserTutorialProgress);

/**
 * @swagger
 * /api/tutorials/progress:
 *   get:
 *     summary: Get all user tutorial progress
 *     description: Retrieve the authenticated user's progress for all tutorials
 *     tags: [Tutorials]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Number of progress records per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [started, completed, all]
 *           default: all
 *         description: Filter by completion status
 *     responses:
 *       200:
 *         description: All tutorial progress retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 progress:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/UserTutorialProgress'
 *                 totalCount:
 *                   type: integer
 *       401:
 *         description: Unauthorized - invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/progress', authenticateToken, getUserTutorialProgress);

/**
 * @swagger
 * /api/tutorials:
 *   post:
 *     summary: Create new tutorial
 *     description: Create a new chess tutorial (admin only)
 *     tags: [Tutorials]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTutorialRequest'
 *           example:
 *             title: "King and Queen vs King Endgame"
 *             description: "Learn the fundamental technique for checkmating with king and queen against a lone king"
 *             category: "endgame"
 *             difficulty: "beginner"
 *             estimatedDuration: 15
 *     responses:
 *       201:
 *         description: Tutorial created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tutorial created successfully"
 *                 tutorial:
 *                   $ref: '#/components/schemas/Tutorial'
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', createTutorial);

/**
 * @swagger
 * /api/tutorials/{tutorialId}/steps:
 *   post:
 *     summary: Create tutorial step
 *     description: Create a new step for a specific tutorial (admin only)
 *     tags: [Tutorials]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tutorialId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the tutorial
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTutorialStepRequest'
 *           example:
 *             stepNumber: 1
 *             title: "Initial Position"
 *             content: "Start with the king and queen positioned to control the center"
 *             position: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
 *             move: "e4"
 *     responses:
 *       201:
 *         description: Tutorial step created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tutorial step created successfully"
 *                 step:
 *                   $ref: '#/components/schemas/TutorialStep'
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Tutorial not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/:tutorialId/steps', createTutorialStep);

/**
 * @swagger
 * /api/tutorials/{tutorialId}/start:
 *   post:
 *     summary: Start tutorial
 *     description: Start a tutorial for the authenticated user
 *     tags: [Tutorials]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tutorialId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the tutorial to start
 *         example: 1
 *     responses:
 *       201:
 *         description: Tutorial started successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tutorial started successfully"
 *                 progress:
 *                   $ref: '#/components/schemas/UserTutorialProgress'
 *       400:
 *         description: Invalid tutorial ID or tutorial already started
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Tutorial not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/:tutorialId/start', authenticateToken, startTutorial);

/**
 * @swagger
 * /api/tutorials/{tutorialId}/steps/{stepId}/complete:
 *   post:
 *     summary: Complete tutorial step
 *     description: Mark a specific tutorial step as completed for the authenticated user
 *     tags: [Tutorials]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tutorialId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the tutorial
 *         example: 1
 *       - in: path
 *         name: stepId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the step to complete
 *         example: 1
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userMove:
 *                 type: string
 *                 description: The move made by the user (optional for validation)
 *                 example: "e4"
 *               timeSpent:
 *                 type: integer
 *                 description: Time spent on this step in seconds
 *                 example: 30
 *     responses:
 *       200:
 *         description: Tutorial step completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Step completed successfully"
 *                 progress:
 *                   $ref: '#/components/schemas/UserTutorialProgress'
 *                 nextStep:
 *                   $ref: '#/components/schemas/TutorialStep'
 *       400:
 *         description: Invalid step ID or step already completed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Tutorial or step not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/:tutorialId/steps/:stepId/complete', authenticateToken, completeStep);

/**
 * @swagger
 * /api/tutorials/{id}:
 *   put:
 *     summary: Update tutorial
 *     description: Update an existing tutorial (admin only)
 *     tags: [Tutorials]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the tutorial to update
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Updated title of the tutorial
 *               description:
 *                 type: string
 *                 description: Updated description of the tutorial
 *               category:
 *                 type: string
 *                 description: Updated category of the tutorial
 *               difficulty:
 *                 type: string
 *                 enum: [beginner, intermediate, advanced]
 *                 description: Updated difficulty level
 *               estimatedDuration:
 *                 type: integer
 *                 description: Updated estimated duration in minutes
 *           example:
 *             title: "Advanced King and Queen vs King Endgame"
 *             description: "Master the advanced techniques for checkmating with king and queen"
 *             category: "endgame"
 *             difficulty: "intermediate"
 *             estimatedDuration: 25
 *     responses:
 *       200:
 *         description: Tutorial updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tutorial updated successfully"
 *                 tutorial:
 *                   $ref: '#/components/schemas/Tutorial'
 *       400:
 *         description: Invalid request data or tutorial ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Tutorial not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   delete:
 *     summary: Delete tutorial
 *     description: Delete an existing tutorial and all its steps (admin only)
 *     tags: [Tutorials]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the tutorial to delete
 *         example: 1
 *     responses:
 *       200:
 *         description: Tutorial deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tutorial deleted successfully"
 *                 deletedTutorialId:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Invalid tutorial ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Tutorial not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Conflict - tutorial has active users or dependencies
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', updateTutorial);

router.delete('/:id', deleteTutorial);

export default router;