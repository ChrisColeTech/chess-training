// Profile API client following SRP
import { ApiClient } from '../ApiClient';
import { ErrorService } from '../ErrorService';
import type { 
  UserProfile, 
  UserPreferences, 
  UserStatistics, 
  ApiResponse 
} from '../../types/api';

export class ProfileApiClient {
  constructor(private apiClient: ApiClient) {}

  // Single responsibility: User profile and preferences management
  async getUserProfile(): Promise<UserProfile> {
    try {
      const response = await this.apiClient.get<ApiResponse<UserProfile>>('/user/profile');
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  // Use the backend routes that actually exist
  async getProfile(): Promise<UserProfile> {
    return this.getUserProfile();
  }

  async updateUserProfile(updates: Partial<Pick<UserProfile, 'username' | 'email'>>): Promise<UserProfile> {
    try {
      const response = await this.apiClient.put<ApiResponse<UserProfile>>('/profile', updates);
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getUserPreferences(): Promise<UserPreferences> {
    try {
      const response = await this.apiClient.get<ApiResponse<UserPreferences>>('/user/preferences');
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async updateUserPreferences(preferences: Partial<UserPreferences>): Promise<UserPreferences> {
    try {
      const response = await this.apiClient.put<ApiResponse<UserPreferences>>('/user/preferences', preferences);
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getUserStatistics(): Promise<UserStatistics> {
    try {
      const response = await this.apiClient.get<ApiResponse<UserStatistics>>('/user/statistics');
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  // Missing methods that the backend now supports
  async getStatistics(): Promise<UserStatistics> {
    return this.getUserStatistics();
  }

  async getDashboardStats(): Promise<{
    chessRating: number;
    puzzleRating: number;
    todayGames: number;
    todayPuzzles: number;
    currentStreak: number;
    recentGames: any[];
  }> {
    try {
      const response = await this.apiClient.get<ApiResponse<{
        chessRating: number;
        puzzleRating: number;
        todayGames: number;
        todayPuzzles: number;
        currentStreak: number;
        recentGames: any[];
      }>>('/user/dashboard-stats');
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getActivity(): Promise<{
    recentGames: any[];
    recentPuzzles: any[];
  }> {
    try {
      const response = await this.apiClient.get<ApiResponse<{
        recentGames: any[];
        recentPuzzles: any[];
      }>>('/user/activity');
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async updateRating(newRating: number): Promise<UserProfile> {
    try {
      const response = await this.apiClient.put<ApiResponse<UserProfile>>('/profile/rating', { rating: newRating });
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getPlayHistory(page: number = 1, limit: number = 20): Promise<{
    games: Array<{
      id: string;
      opponent: string;
      result: string;
      rating: number;
      date: string;
    }>;
    total: number;
  }> {
    try {
      const response = await this.apiClient.get<ApiResponse<{
        games: Array<{
          id: string;
          opponent: string;
          result: string;
          rating: number;
          date: string;
        }>;
        total: number;
      }>>(`/profile/play-history?page=${page}&limit=${limit}`);
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getRatingHistory(days: number = 30): Promise<Array<{ date: string; rating: number }>> {
    try {
      const response = await this.apiClient.get<ApiResponse<Array<{ date: string; rating: number }>>>(
        `/profile/rating-history?days=${days}`
      );
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async deleteAccount(): Promise<void> {
    try {
      await this.apiClient.delete('/profile');
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }
}