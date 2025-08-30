import express from 'express';
import { getSubscriptions, getSubscriptionById, getUserActiveSubscription, getUserSubscriptionHistory, createSubscription, updateSubscription, cancelSubscription, renewSubscription, reactivateSubscription, getSubscriptionStats, getOverallSubscriptionStats, getSubscriptionsByPlanType, getExpiringSubscriptions, getSubscriptionsForRenewal, getChurnRate, getRevenueByPeriod, checkAndUpdateExpiredSubscriptions } from '../controllers/subscriptionController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// GET /api/subscriptions - Get all subscriptions (admin only)
router.get('/', getSubscriptions);

// GET /api/subscriptions/stats - Get subscription statistics (admin only)
router.get('/stats', getSubscriptionStats);

// GET /api/subscriptions/stats/overall - Get overall subscription statistics (admin only)
router.get('/stats/overall', getOverallSubscriptionStats);

// GET /api/subscriptions/stats/plans - Get subscriptions by plan type (admin only)
router.get('/stats/plans', getSubscriptionsByPlanType);

// GET /api/subscriptions/stats/churn - Get churn rate (admin only)
router.get('/stats/churn', getChurnRate);

// GET /api/subscriptions/stats/revenue - Get revenue by period (admin only)
router.get('/stats/revenue', getRevenueByPeriod);

// GET /api/subscriptions/expiring - Get expiring subscriptions (admin only)
router.get('/expiring', getExpiringSubscriptions);

// GET /api/subscriptions/renewal - Get subscriptions for renewal (admin only)
router.get('/renewal', getSubscriptionsForRenewal);

// GET /api/subscriptions/user/me - Get current user's active subscription (requires auth)
router.get('/user/me', authenticateToken, getUserActiveSubscription);

// GET /api/subscriptions/user/me/history - Get current user's subscription history (requires auth)
router.get('/user/me/history', authenticateToken, getUserSubscriptionHistory);

// GET /api/subscriptions/:id - Get specific subscription
router.get('/:id', getSubscriptionById);

// POST /api/subscriptions - Create new subscription
router.post('/', createSubscription);

// POST /api/subscriptions/maintenance/expired - Check and update expired subscriptions (admin only)
router.post('/maintenance/expired', checkAndUpdateExpiredSubscriptions);

// PUT /api/subscriptions/:id - Update subscription
router.put('/:id', updateSubscription);

// PUT /api/subscriptions/:id/cancel - Cancel subscription
router.put('/:id/cancel', cancelSubscription);

// PUT /api/subscriptions/:id/renew - Renew subscription
router.put('/:id/renew', renewSubscription);

// PUT /api/subscriptions/:id/reactivate - Reactivate subscription
router.put('/:id/reactivate', reactivateSubscription);

export default router;