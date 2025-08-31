import { apiClient } from '../apiClient'
import type { UserStats, UserProfile, UserPreferences } from '../../types/user'

export class UserService {
  
  async getUserProfile(): Promise<UserProfile> {
    try {
      const response = await apiClient.get<UserProfile>('/users/profile')
      return response
    } catch (error) {
      console.error('Failed to fetch user profile:', error)
      throw error
    }
  }

  async getUserStats(): Promise<UserStats> {
    try {
      const response = await apiClient.get<UserStats>('/users/statistics')
      return response
    } catch (error) {
      console.error('Failed to fetch user stats:', error)
      // Fallback to default stats if API fails
      return {
        total_games: 0,
        win_rate: 0,
        current_streak: 0,
        best_streak: 0,
        total_puzzles_solved: 0,
        puzzle_accuracy: 0,
        study_time_total: 0,
        achievements_unlocked: 0
      }
    }
  }

  async updateUserProfile(profile: Partial<UserProfile>): Promise<UserProfile> {
    try {
      const response = await apiClient.put<UserProfile>('/users/profile', profile)
      return response
    } catch (error) {
      console.error('Failed to update user profile:', error)
      throw error
    }
  }

  async getUserPreferences(): Promise<UserPreferences> {
    try {
      const response = await apiClient.get<UserPreferences>('/users/preferences')
      return response
    } catch (error) {
      console.error('Failed to fetch user preferences:', error)
      // Fallback to default preferences if API fails
      return {
        theme: 'default',
        board_style: 'classic',
        piece_set: 'standard',
        sound_enabled: true,
        auto_queen: true,
        show_legal_moves: true
      }
    }
  }

  async updateUserPreferences(preferences: Partial<UserPreferences>): Promise<UserPreferences> {
    try {
      const response = await apiClient.put<UserPreferences>('/users/preferences', preferences)
      return response
    } catch (error) {
      console.error('Failed to update user preferences:', error)
      throw error
    }
  }
}

export const userService = new UserService()