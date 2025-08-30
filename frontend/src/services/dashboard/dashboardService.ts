import { userApiClient } from '../api/UserApiClient'
import type { 
  DailyGoal, 
  UserActivity, 
  PerformanceAnalyticsData,
  RecentGamesData,
  AchievementData,
  AdvancedMetricsData,
  ExtendedDashboardData
} from '../../types/dashboard'
import type { 
  RecentActivity,
  DashboardStats 
} from '../../types/user'

/**
 * DashboardService - SRP: Orchestrates dashboard data from multiple API clients
 * Follows Document 19 architecture with real API integration (NO MOCK FALLBACKS)
 */
export class DashboardService {
  
  /**
   * Get dashboard statistics - NO FALLBACK, let errors bubble up
   * Uses correct /user/dashboard-stats endpoint with caching
   */
  async getDashboardStats(): Promise<DashboardStats> {
    return await userApiClient.getDashboardStats();
  }

  /**
   * Calculate daily goals from dashboard stats - Following Document 19 pattern
   * Daily goals are derived data, not a separate endpoint
   */
  async getDailyGoals(): Promise<DailyGoal[]> {
    const stats = await this.getDashboardStats();
    
    // Calculate daily progress from stats (business logic should be in a separate utility)
    return this.calculateDailyGoals(stats);
  }

  /**
   * Calculate daily goals from dashboard stats (DRY principle - reusable logic)
   */
  private calculateDailyGoals(stats: any): DailyGoal[] {
    // TODO: Replace with real daily goal calculation logic based on user preferences
    const today = new Date().toDateString();
    const dailyGamesPlayed = stats.games_change || 0; // Today's games from stats
    const dailyPuzzlesSolved = stats.puzzles_solved_today || 0; // From stats if available
    const dailyStudyMinutes = stats.study_minutes_today || 0; // From stats if available

    return [
      {
        id: 'games-played',
        type: 'games',
        label: 'Play Games',
        current: dailyGamesPlayed,
        target: 3,
        completed: dailyGamesPlayed >= 3
      },
      {
        id: 'puzzles-solved',
        type: 'puzzles', 
        label: 'Solve Puzzles',
        current: dailyPuzzlesSolved,
        target: 10,
        completed: dailyPuzzlesSolved >= 10
      },
      {
        id: 'study-time',
        type: 'study',
        label: 'Study Time (mins)',
        current: dailyStudyMinutes,
        target: 30,
        completed: dailyStudyMinutes >= 30
      }
    ];
  }

  /**
   * Get user activity - NO FALLBACK, let errors bubble up
   * Uses correct /user/activity endpoint with caching
   */
  async getUserActivity(): Promise<RecentActivity[]> {
    return await userApiClient.getActivity();
  }

  /**
   * Get recent games for dashboard - Following Document 19 requirements
   * Uses games API with limit and status filters  
   */
  async getRecentGames(): Promise<any[]> { // TODO: Add proper type
    // TODO: Implement with GameApiClient once created
    // For now, return empty array until we have the GameApiClient
    console.warn('getRecentGames not yet implemented - need GameApiClient');
    return [];
  }

  /**
   * Get recent achievements for dashboard - Following Document 19 requirements
   * Uses achievements API with recent filter
   */
  async getRecentAchievements(): Promise<any[]> { // TODO: Add proper type
    const result = await userApiClient.getAchievements(true);
    return result.achievements || [];
  }

  /**
   * Get combined dashboard data for parallel loading (Document 19 performance pattern)
   * Loads all dashboard data in parallel for optimal performance
   */
  async getDashboardData(): Promise<{
    stats: any;
    dailyGoals: DailyGoal[];
    activity: RecentActivity[];
    recentGames: any[];
    achievements: any[];
  }> {
    // Parallel API calls for better performance (Document 19 pattern)
    const [stats, activity, recentGames, achievements] = await Promise.all([
      this.getDashboardStats(),
      this.getUserActivity(), 
      this.getRecentGames(),
      this.getRecentAchievements()
    ]);

    // Calculate daily goals from stats (derived data)
    const dailyGoals = this.calculateDailyGoals(stats);

    return {
      stats,
      dailyGoals,
      activity,
      recentGames,
      achievements
    };
  }
}

// Export singleton instance following DRY principle
export const dashboardService = new DashboardService();