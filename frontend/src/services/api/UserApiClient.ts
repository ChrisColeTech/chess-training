import { ApiClient } from '../apiClient'
import type { 
  UserProfile, 
  Achievement, 
  RecentActivity, 
  UserStatistics,
  UserPreferences,
  ProgressUpdate,
  DashboardStats
} from '../../types/user'

/**
 * UserApiClient - SRP: Handles ONLY user-related API endpoints
 * Extends base ApiClient for DRY error handling, caching, and retry logic
 */
export class UserApiClient extends ApiClient {
  constructor() {
    super(); // Use the enhanced base ApiClient with caching, retry, etc.
  }

  /**
   * Get dashboard statistics (cached for 5 minutes) - CRITICAL for dashboard
   * Endpoint: GET /api/user/dashboard-stats
   */
  async getDashboardStats(): Promise<DashboardStats> {
    return this.get<DashboardStats>('/user/dashboard-stats', {
      cache: true,
      cacheTTL: 300000 // 5 minutes cache for dashboard stats
    });
  }

  /**
   * Get user activity feed (cached for 2 minutes) 
   * Endpoint: GET /api/user/activity
   */
  async getActivity(): Promise<RecentActivity[]> {
    return this.get<RecentActivity[]>('/user/activity', {
      cache: true,
      cacheTTL: 120000 // 2 minutes cache for activity
    });
  }

  /**
   * Get user profile information
   * Endpoint: GET /api/user/profile (CORRECTED)
   */
  async getUserProfile(): Promise<UserProfile> {
    return this.get<UserProfile>('/user/profile');
  }

  /**
   * Update user profile
   * Endpoint: PUT /api/user/profile (CORRECTED)
   */
  async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    const result = await this.put<UserProfile>('/user/profile', updates);
    // Clear caches after update
    this.clearCache();
    return result;
  }

  /**
   * Get user achievements (cached for 5 minutes)
   * Endpoint: GET /api/achievements?recent=true (for dashboard)
   * Endpoint: GET /api/achievements (for full list)
   */
  async getAchievements(recent: boolean = false): Promise<{
    achievements: Achievement[]
    total_unlocked: number
    total_available: number
    recent_unlocks: Achievement[]
  }> {
    const query = recent ? '?recent=true' : '';
    return this.get(`/achievements${query}`, {
      cache: true,
      cacheTTL: 300000 // 5 minutes cache for achievements
    });
  }

  /**
   * Get comprehensive user statistics (cached for 10 minutes)
   * Endpoint: GET /api/user/statistics (CORRECTED)
   */
  async getUserStatistics(): Promise<UserStatistics> {
    return this.get<UserStatistics>('/user/statistics', {
      cache: true,
      cacheTTL: 600000 // 10 minutes cache for statistics
    });
  }

  /**
   * Get user preferences
   * Endpoint: GET /api/user/preferences (CORRECTED)
   */
  async getPreferences(): Promise<UserProfile['preferences']> {
    return this.get<UserProfile['preferences']>('/user/preferences');
  }

  /**
   * Get user's game history with pagination (cached for 5 minutes)
   * Endpoint: GET /api/user/game-history (CORRECTED)
   */
  async getGameHistory(page: number = 1, limit: number = 20): Promise<{
    games: Array<{
      id: string
      opponent: string
      result: 'win' | 'loss' | 'draw'
      rating_change: number
      time_control: string
      opening: string
      moves_count: number
      accuracy?: number
      date: string
    }>
    total: number
    page: number
    limit: number
  }> {
    return this.get(`/user/game-history`, {
      params: { page, limit },
      cache: true,
      cacheTTL: 300000 // 5 minutes cache for game history
    });
  }

  /**
   * Update user preferences
   * Endpoint: PUT /api/user/preferences (CORRECTED)
   */
  async updatePreferences(preferences: Partial<UserProfile['preferences']>): Promise<{
    success: boolean
    preferences: UserProfile['preferences']
  }> {
    const result = await this.put<{
      success: boolean
      preferences: UserProfile['preferences']
    }>('/user/preferences', preferences);
    // Clear caches after update
    this.clearCache();
    return result;
  }

  /**
   * Check for new achievements (called after games/puzzles)
   * Endpoint: POST /api/achievements/check
   */
  async checkAchievements(): Promise<{
    new_achievements: Achievement[]
    updated_progress: Achievement[]
  }> {
    return this.post('/achievements/check');
  }
}

// Export singleton instance following DRY principle
export const userApiClient = new UserApiClient();