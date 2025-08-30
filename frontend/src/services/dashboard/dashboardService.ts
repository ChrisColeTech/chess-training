import { apiClient } from '../apiClient'
import type { DashboardStats, DailyGoal, UserActivity } from '../../types/dashboard'

export class DashboardService {
  
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      const response = await apiClient.get<DashboardStats>('/users/dashboard-stats')
      return response
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error)
      // Fallback to default stats if API fails
      return {
        chess_elo: 1200,
        puzzle_rating: 1150,
        games_played: 0,
        study_hours: 0,
        rating_change: 0,
        puzzle_rating_change: 0,
        games_change: 0,
        study_hours_change: 0
      }
    }
  }

  async getDailyGoals(): Promise<DailyGoal[]> {
    try {
      const response = await apiClient.get<DailyGoal[]>('/users/daily-goals')
      return response
    } catch (error) {
      console.error('Failed to fetch daily goals:', error)
      // Fallback to default goals if API fails
      return [
        {
          id: 'games-played',
          type: 'games',
          label: 'Play Games',
          current: 0,
          target: 3,
          completed: false
        },
        {
          id: 'puzzles-solved',
          type: 'puzzles', 
          label: 'Solve Puzzles',
          current: 0,
          target: 10,
          completed: false
        },
        {
          id: 'study-time',
          type: 'study',
          label: 'Study Time',
          current: 0,
          target: 30,
          completed: false
        }
      ]
    }
  }

  async getUserActivity(): Promise<UserActivity[]> {
    try {
      const response = await apiClient.get<UserActivity[]>('/users/activity')
      return response
    } catch (error) {
      console.error('Failed to fetch user activity:', error)
      // Fallback to empty activity if API fails
      return []
    }
  }

  async updateDailyGoal(goalId: string, progress: number): Promise<void> {
    try {
      await apiClient.post(`/users/daily-goals/${goalId}/progress`, {
        progress
      })
    } catch (error) {
      console.error('Failed to update daily goal:', error)
      throw error
    }
  }
}

export const dashboardService = new DashboardService()