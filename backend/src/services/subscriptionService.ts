import { Database } from '../utils/database';

export interface SubscriptionQuery {
  userId?: string;
  status?: string;
  planType?: string;
  active?: boolean;
  expiringBefore?: string;
  limit?: number;
  offset?: number;
}

export interface CreateSubscriptionData {
  user_id: string;
  plan_type: string;
  status: string;
  start_date: string;
  end_date: string;
  price: number;
  currency: string;
  payment_method?: string;
  billing_cycle?: string;
  auto_renewal?: boolean;
}

export interface UpdateSubscriptionData {
  status?: string;
  end_date?: string;
  price?: number;
  auto_renewal?: boolean;
  cancellation_reason?: string;
}

export interface SubscriptionStatsQuery {
  dateFrom?: string;
  dateTo?: string;
  groupBy?: 'day' | 'week' | 'month';
}

export interface RenewalData {
  end_date: string;
  price: number;
  billing_cycle: string;
}

export class SubscriptionService {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  // Subscriptions
  async getAllSubscriptions(query: SubscriptionQuery) {
    const { active, limit = 50, offset = 0 } = query;
    
    let sqlQuery = 'SELECT * FROM subscriptions WHERE 1=1';
    const params: any[] = [];
    
    if (active !== undefined) {
      sqlQuery += ' AND is_active = ?';
      params.push(active ? 1 : 0);
    }
    
    sqlQuery += ' ORDER BY price ASC LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));
    
    const subscriptions = await this.db.getAll(sqlQuery, params);
    
    let totalQuery = 'SELECT COUNT(*) as total FROM subscriptions WHERE 1=1';
    const countParams: any[] = [];
    
    if (active !== undefined) {
      totalQuery += ' AND is_active = ?';
      countParams.push(active ? 1 : 0);
    }
    
    const totalResult = await this.db.get(totalQuery, countParams);
    
    return {
      subscriptions,
      total: totalResult.total,
      limit: Number(limit),
      offset: Number(offset)
    };
  }

  async getSubscriptionById(id: string) {
    const subscription = await this.db.get('SELECT * FROM subscriptions WHERE id = ?', [id]);
    
    if (!subscription) {
      throw new Error('Subscription not found');
    }
    
    return subscription;
  }

  async getUserActiveSubscription(userId: string) {
    const subscription = await this.db.get(`
      SELECT * FROM subscriptions 
      WHERE user_id = ? AND status = 'active' AND end_date > datetime('now')
      ORDER BY end_date DESC
      LIMIT 1
    `, [userId]);
    
    return subscription;
  }

  async getUserSubscriptionHistory(userId: string) {
    const subscriptions = await this.db.getAll(`
      SELECT * FROM subscriptions 
      WHERE user_id = ?
      ORDER BY created_at DESC
    `, [userId]);
    
    return subscriptions;
  }

  async createSubscription(data: CreateSubscriptionData) {
    const { user_id, plan_type, status, start_date, end_date, price, currency, 
            payment_method, billing_cycle, auto_renewal } = data;
    
    // Check if user already has an active subscription
    const existingSubscription = await this.getUserActiveSubscription(user_id);
    
    if (existingSubscription && status === 'active') {
      throw new Error('User already has an active subscription');
    }
    
    const subscriptionId = await this.db.run(`
      INSERT INTO subscriptions (user_id, plan_type, status, start_date, end_date, price, currency, 
                                 payment_method, billing_cycle, auto_renewal)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [user_id, plan_type, status, start_date, end_date, price, currency, 
        payment_method, billing_cycle, auto_renewal ? 1 : 0]);
    
    return await this.getSubscriptionById(subscriptionId.toString());
  }

  async updateSubscription(id: string, data: UpdateSubscriptionData) {
    const existing = await this.getSubscriptionById(id);
    
    const { status, end_date, price, auto_renewal, cancellation_reason } = data;
    
    await this.db.run(`
      UPDATE subscriptions 
      SET status = ?, end_date = ?, price = ?, auto_renewal = ?, cancellation_reason = ?, 
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [status || existing.status, end_date || existing.end_date, 
        price !== undefined ? price : existing.price, 
        auto_renewal !== undefined ? (auto_renewal ? 1 : 0) : existing.auto_renewal,
        cancellation_reason || existing.cancellation_reason, id]);
    
    return await this.getSubscriptionById(id);
  }

  async cancelSubscription(id: string, reason?: string) {
    const subscription = await this.getSubscriptionById(id);
    
    await this.db.run(`
      UPDATE subscriptions 
      SET status = 'cancelled', auto_renewal = 0, cancellation_reason = ?, 
          cancelled_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [reason || 'User requested cancellation', id]);
    
    return await this.getSubscriptionById(id);
  }

  async renewSubscription(id: string, data: RenewalData) {
    const { end_date, price, billing_cycle } = data;
    
    await this.db.run(`
      UPDATE subscriptions 
      SET end_date = ?, price = ?, billing_cycle = ?, status = 'active', 
          last_renewal_date = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [end_date, price, billing_cycle, id]);
    
    return await this.getSubscriptionById(id);
  }

  async reactivateSubscription(id: string, newEndDate: string) {
    await this.db.run(`
      UPDATE subscriptions 
      SET status = 'active', end_date = ?, cancellation_reason = NULL, 
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [newEndDate, id]);
    
    return await this.getSubscriptionById(id);
  }

  // Subscription Analytics
  async getSubscriptionStats(query: SubscriptionStatsQuery) {
    const { dateFrom, dateTo, groupBy = 'month' } = query;
    
    let timeFormat = '%Y-%m';
    if (groupBy === 'day') timeFormat = '%Y-%m-%d';
    if (groupBy === 'week') timeFormat = '%Y-W%W';
    
    let sqlQuery = `
      SELECT 
        strftime('${timeFormat}', created_at) as period,
        COUNT(*) as new_subscriptions,
        SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active_subscriptions,
        SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled_subscriptions,
        SUM(price) as total_revenue,
        AVG(price) as avg_price,
        COUNT(DISTINCT plan_type) as plan_types
      FROM subscriptions 
      WHERE 1=1
    `;
    const params: any[] = [];
    
    if (dateFrom) {
      sqlQuery += ' AND DATE(created_at) >= ?';
      params.push(dateFrom);
    }
    
    if (dateTo) {
      sqlQuery += ' AND DATE(created_at) <= ?';
      params.push(dateTo);
    }
    
    sqlQuery += ' GROUP BY period ORDER BY period DESC';
    
    const stats = await this.db.getAll(sqlQuery, params);
    
    return stats;
  }

  async getOverallSubscriptionStats() {
    const stats = await this.db.get(`
      SELECT 
        COUNT(*) as total_subscriptions,
        COUNT(CASE WHEN status = 'active' AND end_date > datetime('now') THEN 1 END) as active_subscriptions,
        COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled_subscriptions,
        COUNT(CASE WHEN status = 'expired' OR end_date <= datetime('now') THEN 1 END) as expired_subscriptions,
        COUNT(CASE WHEN auto_renewal = 1 AND status = 'active' THEN 1 END) as auto_renewal_subscriptions,
        SUM(price) as total_revenue,
        AVG(price) as avg_subscription_price,
        COUNT(DISTINCT plan_type) as unique_plan_types,
        COUNT(DISTINCT user_id) as unique_subscribers
      FROM subscriptions
    `);
    
    return {
      totalSubscriptions: stats.total_subscriptions || 0,
      activeSubscriptions: stats.active_subscriptions || 0,
      cancelledSubscriptions: stats.cancelled_subscriptions || 0,
      expiredSubscriptions: stats.expired_subscriptions || 0,
      autoRenewalSubscriptions: stats.auto_renewal_subscriptions || 0,
      totalRevenue: stats.total_revenue || 0,
      avgSubscriptionPrice: Math.round((stats.avg_subscription_price || 0) * 100) / 100,
      uniquePlanTypes: stats.unique_plan_types || 0,
      uniqueSubscribers: stats.unique_subscribers || 0
    };
  }

  async getSubscriptionsByPlanType() {
    const planStats = await this.db.getAll(`
      SELECT 
        plan_type,
        COUNT(*) as total_subscriptions,
        COUNT(CASE WHEN status = 'active' AND end_date > datetime('now') THEN 1 END) as active_subscriptions,
        SUM(price) as total_revenue,
        AVG(price) as avg_price,
        MIN(price) as min_price,
        MAX(price) as max_price
      FROM subscriptions
      GROUP BY plan_type
      ORDER BY total_subscriptions DESC
    `);
    
    return planStats;
  }

  async getExpiringSubscriptions(daysAhead: number = 7) {
    const expiringSubscriptions = await this.db.getAll(`
      SELECT s.*, u.username, u.email, up.display_name
      FROM subscriptions s
      JOIN users u ON s.user_id = u.id
      LEFT JOIN user_profiles up ON s.user_id = up.user_id
      WHERE s.status = 'active' 
        AND s.end_date > datetime('now')
        AND s.end_date <= datetime('now', '+${daysAhead} days')
      ORDER BY s.end_date ASC
    `);
    
    return expiringSubscriptions;
  }

  async getSubscriptionsForRenewal() {
    const renewalCandidates = await this.db.getAll(`
      SELECT s.*, u.username, u.email
      FROM subscriptions s
      JOIN users u ON s.user_id = u.id
      WHERE s.status = 'active' 
        AND s.auto_renewal = 1
        AND s.end_date <= datetime('now', '+1 day')
      ORDER BY s.end_date ASC
    `);
    
    return renewalCandidates;
  }

  async getChurnRate(periodDays: number = 30) {
    const stats = await this.db.get(`
      SELECT 
        COUNT(CASE WHEN status = 'cancelled' AND cancelled_at >= datetime('now', '-${periodDays} days') THEN 1 END) as churned_subscriptions,
        COUNT(CASE WHEN status = 'active' AND created_at >= datetime('now', '-${periodDays} days') THEN 1 END) as new_subscriptions,
        COUNT(CASE WHEN status = 'active' AND end_date > datetime('now') THEN 1 END) as active_subscriptions
      FROM subscriptions
    `);
    
    const churnRate = stats.active_subscriptions > 0 ? 
      (stats.churned_subscriptions / stats.active_subscriptions) * 100 : 0;
    
    return {
      churnedSubscriptions: stats.churned_subscriptions || 0,
      newSubscriptions: stats.new_subscriptions || 0,
      activeSubscriptions: stats.active_subscriptions || 0,
      churnRate: Math.round(churnRate * 100) / 100,
      period: `${periodDays} days`
    };
  }

  async getRevenueByPeriod(period: 'daily' | 'weekly' | 'monthly' = 'monthly', limit: number = 12) {
    let timeFormat = '%Y-%m';
    let timeModifier = '-1 month';
    
    if (period === 'daily') {
      timeFormat = '%Y-%m-%d';
      timeModifier = '-1 day';
    } else if (period === 'weekly') {
      timeFormat = '%Y-W%W';
      timeModifier = '-1 week';
    }
    
    const revenue = await this.db.getAll(`
      SELECT 
        strftime('${timeFormat}', created_at) as period,
        SUM(price) as revenue,
        COUNT(*) as subscription_count,
        AVG(price) as avg_price
      FROM subscriptions
      WHERE created_at >= datetime('now', '${timeModifier}', '*${limit}')
        AND status IN ('active', 'cancelled', 'expired')
      GROUP BY period
      ORDER BY period DESC
      LIMIT ?
    `, [limit]);
    
    return revenue;
  }

  async updateSubscriptionStatus(id: string, newStatus: string) {
    await this.db.run(`
      UPDATE subscriptions 
      SET status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [newStatus, id]);
    
    return await this.getSubscriptionById(id);
  }

  async checkAndUpdateExpiredSubscriptions() {
    const expiredCount = await this.db.run(`
      UPDATE subscriptions 
      SET status = 'expired', updated_at = CURRENT_TIMESTAMP
      WHERE status = 'active' AND end_date <= datetime('now')
    `);
    
    return {
      updatedCount: expiredCount,
      message: `Updated ${expiredCount} expired subscriptions`
    };
  }
}