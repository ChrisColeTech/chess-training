import express from 'express';
import { getSubscriptions, getSubscriptionById, getUserActiveSubscription, getUserSubscriptionHistory, createSubscription, updateSubscription, cancelSubscription, renewSubscription, reactivateSubscription, getSubscriptionStats, getOverallSubscriptionStats, getSubscriptionsByPlanType, getExpiringSubscriptions, getSubscriptionsForRenewal, getChurnRate, getRevenueByPeriod, checkAndUpdateExpiredSubscriptions } from '../controllers/subscriptionController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Subscription:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the subscription
 *         userId:
 *           type: string
 *           description: ID of the user who owns the subscription
 *         planType:
 *           type: string
 *           enum: [basic, premium, pro]
 *           description: Type of subscription plan
 *         status:
 *           type: string
 *           enum: [active, expired, cancelled, suspended]
 *           description: Current status of the subscription
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: When the subscription started
 *         endDate:
 *           type: string
 *           format: date-time
 *           description: When the subscription ends
 *         cancelDate:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: When the subscription was cancelled
 *         cancelReason:
 *           type: string
 *           nullable: true
 *           description: Reason for cancellation
 *         price:
 *           type: number
 *           format: float
 *           description: Price paid for the subscription
 *         currency:
 *           type: string
 *           default: USD
 *           description: Currency of the subscription price
 *         autoRenew:
 *           type: boolean
 *           description: Whether the subscription auto-renews
 *         paymentMethodId:
 *           type: string
 *           nullable: true
 *           description: ID of the payment method used
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: When the subscription was created
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: When the subscription was last updated
 * 
 *     SubscriptionCreate:
 *       type: object
 *       required:
 *         - userId
 *         - planType
 *         - price
 *       properties:
 *         userId:
 *           type: string
 *           description: ID of the user
 *         planType:
 *           type: string
 *           enum: [basic, premium, pro]
 *           description: Type of subscription plan
 *         price:
 *           type: number
 *           format: float
 *           description: Price of the subscription
 *         currency:
 *           type: string
 *           default: USD
 *           description: Currency of the subscription price
 *         autoRenew:
 *           type: boolean
 *           default: true
 *           description: Whether the subscription should auto-renew
 *         paymentMethodId:
 *           type: string
 *           description: ID of the payment method to use
 * 
 *     SubscriptionUpdate:
 *       type: object
 *       properties:
 *         planType:
 *           type: string
 *           enum: [basic, premium, pro]
 *           description: Type of subscription plan
 *         autoRenew:
 *           type: boolean
 *           description: Whether the subscription should auto-renew
 *         paymentMethodId:
 *           type: string
 *           description: ID of the payment method to use
 * 
 *     SubscriptionCancel:
 *       type: object
 *       properties:
 *         reason:
 *           type: string
 *           description: Reason for cancellation
 * 
 *     SubscriptionRenew:
 *       type: object
 *       properties:
 *         planType:
 *           type: string
 *           enum: [basic, premium, pro]
 *           description: Type of subscription plan for renewal
 *         paymentMethodId:
 *           type: string
 *           description: ID of the payment method to use
 * 
 *     SubscriptionStats:
 *       type: object
 *       properties:
 *         totalSubscriptions:
 *           type: integer
 *           description: Total number of subscriptions
 *         activeSubscriptions:
 *           type: integer
 *           description: Number of active subscriptions
 *         expiredSubscriptions:
 *           type: integer
 *           description: Number of expired subscriptions
 *         cancelledSubscriptions:
 *           type: integer
 *           description: Number of cancelled subscriptions
 *         totalRevenue:
 *           type: number
 *           format: float
 *           description: Total revenue from subscriptions
 *         averageSubscriptionValue:
 *           type: number
 *           format: float
 *           description: Average value per subscription
 * 
 *     RevenueData:
 *       type: object
 *       properties:
 *         period:
 *           type: string
 *           description: Time period (month/year)
 *         revenue:
 *           type: number
 *           format: float
 *           description: Revenue for the period
 *         subscriptionCount:
 *           type: integer
 *           description: Number of subscriptions in the period
 * 
 *     PlanTypeStats:
 *       type: object
 *       properties:
 *         planType:
 *           type: string
 *           description: Name of the plan type
 *         count:
 *           type: integer
 *           description: Number of subscriptions for this plan type
 *         revenue:
 *           type: number
 *           format: float
 *           description: Total revenue for this plan type
 * 
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * tags:
 *   - name: Subscriptions
 *     description: Subscription management and analytics
 */

/**
 * @swagger
 * /api/subscriptions:
 *   get:
 *     summary: Get all subscriptions (admin only)
 *     tags: [Subscriptions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, expired, cancelled, suspended]
 *         description: Filter by subscription status
 *       - in: query
 *         name: planType
 *         schema:
 *           type: string
 *           enum: [basic, premium, pro]
 *         description: Filter by plan type
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
 *         description: Successfully retrieved subscriptions
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
 *                     $ref: '#/components/schemas/Subscription'
 *                 total:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 offset:
 *                   type: integer
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
router.get('/', getSubscriptions);

/**
 * @swagger
 * /api/subscriptions/stats:
 *   get:
 *     summary: Get subscription statistics (admin only)
 *     tags: [Subscriptions]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved subscription statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/SubscriptionStats'
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
router.get('/stats', getSubscriptionStats);

/**
 * @swagger
 * /api/subscriptions/stats/overall:
 *   get:
 *     summary: Get overall subscription statistics (admin only)
 *     tags: [Subscriptions]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved overall subscription statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/SubscriptionStats'
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
router.get('/stats/overall', getOverallSubscriptionStats);

/**
 * @swagger
 * /api/subscriptions/stats/plans:
 *   get:
 *     summary: Get subscriptions by plan type (admin only)
 *     tags: [Subscriptions]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved subscription statistics by plan type
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
 *                     $ref: '#/components/schemas/PlanTypeStats'
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
router.get('/stats/plans', getSubscriptionsByPlanType);

/**
 * @swagger
 * /api/subscriptions/stats/churn:
 *   get:
 *     summary: Get churn rate (admin only)
 *     tags: [Subscriptions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [month, year]
 *           default: month
 *         description: Time period for churn calculation
 *     responses:
 *       200:
 *         description: Successfully retrieved churn rate
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     churnRate:
 *                       type: number
 *                       format: float
 *                       description: Churn rate as a percentage
 *                     period:
 *                       type: string
 *                       description: Time period used for calculation
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
router.get('/stats/churn', getChurnRate);

/**
 * @swagger
 * /api/subscriptions/stats/revenue:
 *   get:
 *     summary: Get revenue by period (admin only)
 *     tags: [Subscriptions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [month, year]
 *           default: month
 *         description: Time period for revenue aggregation
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for revenue period
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for revenue period
 *     responses:
 *       200:
 *         description: Successfully retrieved revenue data
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
 *                     $ref: '#/components/schemas/RevenueData'
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
router.get('/stats/revenue', getRevenueByPeriod);

/**
 * @swagger
 * /api/subscriptions/expiring:
 *   get:
 *     summary: Get expiring subscriptions (admin only)
 *     tags: [Subscriptions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: days
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 90
 *           default: 30
 *         description: Number of days ahead to check for expiring subscriptions
 *     responses:
 *       200:
 *         description: Successfully retrieved expiring subscriptions
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
 *                     $ref: '#/components/schemas/Subscription'
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
router.get('/expiring', getExpiringSubscriptions);

/**
 * @swagger
 * /api/subscriptions/renewal:
 *   get:
 *     summary: Get subscriptions for renewal (admin only)
 *     tags: [Subscriptions]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved subscriptions ready for renewal
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
 *                     $ref: '#/components/schemas/Subscription'
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
router.get('/renewal', getSubscriptionsForRenewal);

/**
 * @swagger
 * /api/subscriptions/user/me:
 *   get:
 *     summary: Get current user's active subscription
 *     tags: [Subscriptions]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user's active subscription
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Subscription'
 *       401:
 *         description: Unauthorized - Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: No active subscription found
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
router.get('/user/me', authenticateToken, getUserActiveSubscription);

/**
 * @swagger
 * /api/subscriptions/user/me/history:
 *   get:
 *     summary: Get current user's subscription history
 *     tags: [Subscriptions]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user's subscription history
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
 *                     $ref: '#/components/schemas/Subscription'
 *       401:
 *         description: Unauthorized - Authentication required
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
router.get('/user/me/history', authenticateToken, getUserSubscriptionHistory);

/**
 * @swagger
 * /api/subscriptions/{id}:
 *   get:
 *     summary: Get specific subscription
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subscription ID
 *     responses:
 *       200:
 *         description: Successfully retrieved subscription
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Subscription'
 *       404:
 *         description: Subscription not found
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
router.get('/:id', getSubscriptionById);

/**
 * @swagger
 * /api/subscriptions:
 *   post:
 *     summary: Create new subscription
 *     tags: [Subscriptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubscriptionCreate'
 *     responses:
 *       201:
 *         description: Subscription created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Subscription'
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: User already has an active subscription
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
router.post('/', createSubscription);

/**
 * @swagger
 * /api/subscriptions/maintenance/expired:
 *   post:
 *     summary: Check and update expired subscriptions (admin only)
 *     tags: [Subscriptions]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully checked and updated expired subscriptions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     updatedCount:
 *                       type: integer
 *                       description: Number of subscriptions updated
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
router.post('/maintenance/expired', checkAndUpdateExpiredSubscriptions);

/**
 * @swagger
 * /api/subscriptions/{id}:
 *   put:
 *     summary: Update subscription
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subscription ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubscriptionUpdate'
 *     responses:
 *       200:
 *         description: Subscription updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Subscription'
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Subscription not found
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
router.put('/:id', updateSubscription);

/**
 * @swagger
 * /api/subscriptions/{id}/cancel:
 *   put:
 *     summary: Cancel subscription
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subscription ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubscriptionCancel'
 *     responses:
 *       200:
 *         description: Subscription cancelled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Subscription'
 *                 message:
 *                   type: string
 *                   example: Subscription cancelled successfully
 *       404:
 *         description: Subscription not found
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
router.put('/:id/cancel', cancelSubscription);

/**
 * @swagger
 * /api/subscriptions/{id}/renew:
 *   put:
 *     summary: Renew subscription
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subscription ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubscriptionRenew'
 *     responses:
 *       200:
 *         description: Subscription renewed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Subscription'
 *                 message:
 *                   type: string
 *                   example: Subscription renewed successfully
 *       404:
 *         description: Subscription not found
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
router.put('/:id/renew', renewSubscription);

/**
 * @swagger
 * /api/subscriptions/{id}/reactivate:
 *   put:
 *     summary: Reactivate subscription
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subscription ID
 *     responses:
 *       200:
 *         description: Subscription reactivated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Subscription'
 *                 message:
 *                   type: string
 *                   example: Subscription reactivated successfully
 *       404:
 *         description: Subscription not found
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
router.put('/:id/reactivate', reactivateSubscription);

export default router;