import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { SubscriptionService } from '../services/subscriptionService';

const subscriptionService = new SubscriptionService();

export const getSubscriptions = async (req: Request, res: Response) => {
  try {
    const result = await subscriptionService.getAllSubscriptions(req.query);
    res.json({
      success: true,
      data: result.subscriptions,
      total: result.total,
      limit: result.limit,
      offset: result.offset
    });
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch subscriptions'
    });
  }
};

export const getSubscriptionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const subscription = await subscriptionService.getSubscriptionById(id);
    
    res.json({
      success: true,
      data: subscription
    });
  } catch (error) {
    if ((error as any).message === 'Subscription not found') {
      return res.status(404).json({
        success: false,
        error: 'Subscription not found'
      });
    }
    
    console.error('Error fetching subscription:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch subscription'
    });
  }
};

export const getUserActiveSubscription = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }
    
    const subscription = await subscriptionService.getUserActiveSubscription(userId);
    
    if (!subscription) {
      return res.status(404).json({
        success: false,
        error: 'No active subscription found'
      });
    }
    
    res.json({
      success: true,
      data: subscription
    });
  } catch (error) {
    console.error('Error fetching user active subscription:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user active subscription'
    });
  }
};

export const getUserSubscriptionHistory = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }
    
    const history = await subscriptionService.getUserSubscriptionHistory(userId);
    
    res.json({
      success: true,
      data: history
    });
  } catch (error) {
    console.error('Error fetching user subscription history:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user subscription history'
    });
  }
};

export const createSubscription = async (req: Request, res: Response) => {
  try {
    const subscription = await subscriptionService.createSubscription(req.body);
    
    res.status(201).json({
      success: true,
      data: subscription
    });
  } catch (error) {
    if ((error as any).message === 'User already has an active subscription') {
      return res.status(409).json({
        success: false,
        error: 'User already has an active subscription'
      });
    }
    
    console.error('Error creating subscription:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create subscription'
    });
  }
};

export const updateSubscription = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const subscription = await subscriptionService.updateSubscription(id, req.body);
    
    res.json({
      success: true,
      data: subscription
    });
  } catch (error) {
    if ((error as any).message === 'Subscription not found') {
      return res.status(404).json({
        success: false,
        error: 'Subscription not found'
      });
    }
    
    console.error('Error updating subscription:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update subscription'
    });
  }
};

export const cancelSubscription = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    
    const subscription = await subscriptionService.cancelSubscription(id, reason);
    
    res.json({
      success: true,
      data: subscription,
      message: 'Subscription cancelled successfully'
    });
  } catch (error) {
    if ((error as any).message === 'Subscription not found') {
      return res.status(404).json({
        success: false,
        error: 'Subscription not found'
      });
    }
    
    console.error('Error cancelling subscription:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to cancel subscription'
    });
  }
};

export const renewSubscription = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const subscription = await subscriptionService.renewSubscription(id, req.body);
    
    res.json({
      success: true,
      data: subscription,
      message: 'Subscription renewed successfully'
    });
  } catch (error) {
    if ((error as any).message === 'Subscription not found') {
      return res.status(404).json({
        success: false,
        error: 'Subscription not found'
      });
    }
    
    console.error('Error renewing subscription:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to renew subscription'
    });
  }
};

export const reactivateSubscription = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { newEndDate } = req.body;
    
    const subscription = await subscriptionService.reactivateSubscription(id, newEndDate);
    
    res.json({
      success: true,
      data: subscription,
      message: 'Subscription reactivated successfully'
    });
  } catch (error) {
    if ((error as any).message === 'Subscription not found') {
      return res.status(404).json({
        success: false,
        error: 'Subscription not found'
      });
    }
    
    console.error('Error reactivating subscription:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to reactivate subscription'
    });
  }
};

export const getSubscriptionStats = async (req: Request, res: Response) => {
  try {
    const stats = await subscriptionService.getSubscriptionStats(req.query);
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching subscription stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch subscription stats'
    });
  }
};

export const getOverallSubscriptionStats = async (req: Request, res: Response) => {
  try {
    const stats = await subscriptionService.getOverallSubscriptionStats();
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching overall subscription stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch overall subscription stats'
    });
  }
};

export const getSubscriptionsByPlanType = async (req: Request, res: Response) => {
  try {
    const stats = await subscriptionService.getSubscriptionsByPlanType();
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching subscriptions by plan type:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch subscriptions by plan type'
    });
  }
};

export const getExpiringSubscriptions = async (req: Request, res: Response) => {
  try {
    const { daysAhead = 7 } = req.query;
    const subscriptions = await subscriptionService.getExpiringSubscriptions(Number(daysAhead));
    
    res.json({
      success: true,
      data: subscriptions,
      daysAhead: Number(daysAhead)
    });
  } catch (error) {
    console.error('Error fetching expiring subscriptions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch expiring subscriptions'
    });
  }
};

export const getSubscriptionsForRenewal = async (req: Request, res: Response) => {
  try {
    const subscriptions = await subscriptionService.getSubscriptionsForRenewal();
    
    res.json({
      success: true,
      data: subscriptions
    });
  } catch (error) {
    console.error('Error fetching subscriptions for renewal:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch subscriptions for renewal'
    });
  }
};

export const getChurnRate = async (req: Request, res: Response) => {
  try {
    const { periodDays = 30 } = req.query;
    const churnData = await subscriptionService.getChurnRate(Number(periodDays));
    
    res.json({
      success: true,
      data: churnData
    });
  } catch (error) {
    console.error('Error fetching churn rate:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch churn rate'
    });
  }
};

export const getRevenueByPeriod = async (req: Request, res: Response) => {
  try {
    const { period = 'monthly', limit = 12 } = req.query;
    const revenue = await subscriptionService.getRevenueByPeriod(
      period as 'daily' | 'weekly' | 'monthly', 
      Number(limit)
    );
    
    res.json({
      success: true,
      data: revenue,
      period,
      limit: Number(limit)
    });
  } catch (error) {
    console.error('Error fetching revenue by period:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch revenue by period'
    });
  }
};

export const checkAndUpdateExpiredSubscriptions = async (req: Request, res: Response) => {
  try {
    const result = await subscriptionService.checkAndUpdateExpiredSubscriptions();
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error checking and updating expired subscriptions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to check and update expired subscriptions'
    });
  }
};