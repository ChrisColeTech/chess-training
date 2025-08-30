// Achievement API client following SRP
import { ApiClient } from '../ApiClient';
import { ErrorService } from '../ErrorService';
import type { 
  Achievement, 
  UserAchievement, 
  ApiResponse 
} from '../../types/api';

export class AchievementApiClient {
  constructor(private apiClient: ApiClient) {}

  // Single responsibility: Achievement system management
  async getAchievements(): Promise<Achievement[]> {
    try {
      const response = await this.apiClient.get<ApiResponse<Achievement[]>>('/achievements');
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getAchievementById(id: string): Promise<Achievement> {
    try {
      const response = await this.apiClient.get<ApiResponse<Achievement>>(`/achievements/${id}`);
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getUserAchievements(): Promise<UserAchievement[]> {
    try {
      const response = await this.apiClient.get<ApiResponse<UserAchievement[]>>('/achievements/user');
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  // Fix URL to match backend routes  
  async getAchievementProgress(achievementId: string): Promise<{
    achievement: Achievement;
    progress: number;
    unlocked: boolean;
    unlockedAt?: string;
  }> {
    try {
      const response = await this.apiClient.get<ApiResponse<{
        achievement: Achievement;
        progress: number;
        unlocked: boolean;
        unlockedAt?: string;
      }>>(`/achievements/${achievementId}/progress`);
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getAchievementsByCategory(category: string): Promise<Achievement[]> {
    try {
      const response = await this.apiClient.get<ApiResponse<Achievement[]>>(`/achievements/category/${category}`);
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async claimAchievement(achievementId: string): Promise<UserAchievement> {
    try {
      const response = await this.apiClient.post<ApiResponse<UserAchievement>>(`/achievements/${achievementId}/claim`);
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getRecentAchievements(limit: number = 10): Promise<UserAchievement[]> {
    try {
      const response = await this.apiClient.get<ApiResponse<UserAchievement[]>>(`/achievements/recent?limit=${limit}`);
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getAchievementCategories(): Promise<string[]> {
    try {
      const response = await this.apiClient.get<ApiResponse<string[]>>('/achievements/categories');
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getLeaderboard(achievementId?: string, limit: number = 50): Promise<Array<{
    userId: string;
    username: string;
    totalPoints: number;
    achievements: number;
  }>> {
    try {
      const url = achievementId 
        ? `/achievements/leaderboard/${achievementId}?limit=${limit}` 
        : `/achievements/leaderboard?limit=${limit}`;
      const response = await this.apiClient.get<ApiResponse<Array<{
        userId: string;
        username: string;
        totalPoints: number;
        achievements: number;
      }>>>(url);
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  // Achievement progress from progress endpoint
  async getAchievementsFromProgress(): Promise<Achievement[]> {
    try {
      const response = await this.apiClient.get<ApiResponse<Achievement[]>>('/progress/achievements');
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }
}