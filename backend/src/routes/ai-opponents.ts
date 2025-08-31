import express from 'express';
import { getAIOpponents, getAIOpponentById, createAIOpponent, updateAIOpponent, deleteAIOpponent, getBestMove, getAIOpponentsByLevel, getAIOpponentStats } from '../controllers/aiController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     AIOpponent:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the AI opponent
 *         name:
 *           type: string
 *           description: Name of the AI opponent
 *         description:
 *           type: string
 *           description: Description of the AI opponent's characteristics
 *         strength_rating:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *           description: Strength rating from 1 (beginner) to 5 (master)
 *         personality:
 *           type: string
 *           description: AI opponent's playing personality type
 *         playing_style:
 *           type: string
 *           description: AI opponent's chess playing style
 *         avatar_url:
 *           type: string
 *           format: uri
 *           description: URL to the AI opponent's avatar image
 *         is_available:
 *           type: boolean
 *           description: Whether the AI opponent is currently available for play
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: When the AI opponent was created
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: When the AI opponent was last updated
 * 
 *     AIOpponentCreate:
 *       type: object
 *       required:
 *         - name
 *         - strength_rating
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the AI opponent
 *         description:
 *           type: string
 *           description: Description of the AI opponent's characteristics
 *         strength_rating:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *           description: Strength rating from 1 (beginner) to 5 (master)
 *         personality:
 *           type: string
 *           description: AI opponent's playing personality type
 *         playing_style:
 *           type: string
 *           description: AI opponent's chess playing style
 *         avatar_url:
 *           type: string
 *           format: uri
 *           description: URL to the AI opponent's avatar image
 * 
 *     AIOpponentUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the AI opponent
 *         description:
 *           type: string
 *           description: Description of the AI opponent's characteristics
 *         strength_rating:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *           description: Strength rating from 1 (beginner) to 5 (master)
 *         personality:
 *           type: string
 *           description: AI opponent's playing personality type
 *         playing_style:
 *           type: string
 *           description: AI opponent's chess playing style
 *         avatar_url:
 *           type: string
 *           format: uri
 *           description: URL to the AI opponent's avatar image
 *         is_available:
 *           type: boolean
 *           description: Whether the AI opponent is available for play
 * 
 *     BestMoveRequest:
 *       type: object
 *       required:
 *         - fen
 *       properties:
 *         fen:
 *           type: string
 *           description: FEN notation of the current chess position
 *         aiLevel:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *           default: 3
 *           description: AI difficulty level
 * 
 *     BestMoveResponse:
 *       type: object
 *       properties:
 *         move:
 *           type: string
 *           description: Best move in algebraic notation
 *         fen:
 *           type: string
 *           description: FEN notation of the position
 *         aiLevel:
 *           type: integer
 *           description: AI level used for calculation
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: When the move was calculated
 * 
 *     AIOpponentStats:
 *       type: object
 *       properties:
 *         overview:
 *           type: object
 *           properties:
 *             totalOpponents:
 *               type: integer
 *               description: Total number of AI opponents
 *             activeOpponents:
 *               type: integer
 *               description: Number of active AI opponents
 *             minStrengthRating:
 *               type: integer
 *               description: Minimum strength rating available
 *             maxStrengthRating:
 *               type: integer
 *               description: Maximum strength rating available
 *             strengthLevels:
 *               type: integer
 *               description: Number of different strength levels
 *             personalities:
 *               type: integer
 *               description: Number of different personalities
 *         levelBreakdown:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               strength_rating:
 *                 type: integer
 *                 description: Strength rating level
 *               opponent_count:
 *                 type: integer
 *                 description: Number of opponents at this level
 *               personalities:
 *                 type: integer
 *                 description: Number of different personalities at this level
 * 
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: object
 *           description: Response data
 * 
 *     PaginatedResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/AIOpponent'
 *         total:
 *           type: integer
 *           description: Total number of items
 *         limit:
 *           type: integer
 *           description: Number of items per page
 *         offset:
 *           type: integer
 *           description: Number of items skipped
 * 
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         error:
 *           type: string
 *           description: Error message
 * 
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * tags:
 *   - name: AI Opponents
 *     description: AI opponent management and chess move calculation
 */

/**
 * @swagger
 * /api/ai-opponents:
 *   get:
 *     summary: Get all AI opponents
 *     tags: [AI Opponents]
 *     parameters:
 *       - in: query
 *         name: level
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *         description: Filter by strength rating level
 *       - in: query
 *         name: personality
 *         schema:
 *           type: string
 *         description: Filter by personality type
 *       - in: query
 *         name: active
 *         schema:
 *           type: boolean
 *         description: Filter by availability status
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 50
 *         description: Number of items to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         description: Number of items to skip
 *     responses:
 *       200:
 *         description: Successfully retrieved AI opponents
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', getAIOpponents);

/**
 * @swagger
 * /api/ai-opponents/stats:
 *   get:
 *     summary: Get AI opponent statistics
 *     tags: [AI Opponents]
 *     responses:
 *       200:
 *         description: Successfully retrieved AI opponent statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/AIOpponentStats'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/stats', getAIOpponentStats);

/**
 * @swagger
 * /api/ai-opponents/level/{level}:
 *   get:
 *     summary: Get opponents by skill level
 *     tags: [AI Opponents]
 *     parameters:
 *       - in: path
 *         name: level
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *         description: Strength rating level
 *     responses:
 *       200:
 *         description: Successfully retrieved AI opponents by level
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
 *                     $ref: '#/components/schemas/AIOpponent'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/level/:level', getAIOpponentsByLevel);

/**
 * @swagger
 * /api/ai-opponents/{id}:
 *   get:
 *     summary: Get specific AI opponent
 *     tags: [AI Opponents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: AI opponent ID
 *     responses:
 *       200:
 *         description: Successfully retrieved AI opponent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/AIOpponent'
 *       404:
 *         description: AI opponent not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', getAIOpponentById);

/**
 * @swagger
 * /api/ai-opponents:
 *   post:
 *     summary: Create new AI opponent (admin only)
 *     tags: [AI Opponents]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AIOpponentCreate'
 *     responses:
 *       201:
 *         description: AI opponent created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/AIOpponent'
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', createAIOpponent);

/**
 * @swagger
 * /api/ai-opponents/move:
 *   post:
 *     summary: Get best move from AI
 *     tags: [AI Opponents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BestMoveRequest'
 *     responses:
 *       200:
 *         description: Best move calculated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/BestMoveResponse'
 *       400:
 *         description: Invalid FEN or no legal moves available
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/move', getBestMove);

/**
 * @swagger
 * /api/ai-opponents/{id}:
 *   put:
 *     summary: Update AI opponent (admin only)
 *     tags: [AI Opponents]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: AI opponent ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AIOpponentUpdate'
 *     responses:
 *       200:
 *         description: AI opponent updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/AIOpponent'
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: AI opponent not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   delete:
 *     summary: Delete AI opponent (admin only)
 *     tags: [AI Opponents]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: AI opponent ID
 *     responses:
 *       200:
 *         description: AI opponent deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/AIOpponent'
 *                 message:
 *                   type: string
 *                   example: AI opponent deleted successfully
 *       401:
 *         description: Unauthorized - Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: AI opponent not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id', updateAIOpponent);

router.delete('/:id', deleteAIOpponent);

export default router;