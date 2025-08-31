import { ApiClient } from '../apiClient'

export interface DashboardStats {
  chess_elo: number
  puzzle_rating: number
  games_played: number
  study_hours: number
  games_won: number
  games_lost: number
  games_drawn: number
  puzzles_solved: number
  daily_streak: number
  last_active: string
}

export interface PuzzleStats {
  total_solved: number
  rating: number
  daily_solved: number
  streak: number
  accuracy: number
  themes: {
    [key: string]: {
      solved: number
      rating: number
    }
  }
}

export interface GameStats {
  total_games: number
  wins: number
  losses: number
  draws: number
  rating: number
  recent_games: Array<{
    id: string
    opponent: string
    result: 'win' | 'loss' | 'draw'
    rating_change: number
    date: string
  }>
}

export class StatsApiClient {
  private apiClient: ApiClient
  
  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient
  }

  async getDashboardStats(): Promise<DashboardStats> {
    return this.apiClient.get<DashboardStats>('/user/dashboard-stats')
  }

  /**
   * Get puzzle statistics
   * Endpoint: GET /api/puzzles/stats  
   */
  async getPuzzleStats(): Promise<PuzzleStats> {
    return this.apiClient.get<PuzzleStats>('/puzzles/stats')
  }

  /**
   * Get game statistics with recent games
   * Endpoint: GET /api/games?limit=5&status=completed
   */
  async getRecentGames(limit: number = 5): Promise<GameStats> {
    return this.apiClient.get<GameStats>(`/games?limit=${limit}&status=completed`)
  }

  /**
   * Get user progress statistics
   * Endpoint: GET /api/users/progress
   */
  async getUserProgress(): Promise<{
    daily_goals: {
      games: { current: number; target: number }
      puzzles: { current: number; target: number }  
      study_time: { current: number; target: number }
    }
    weekly_progress: {
      elo_change: number
      games_played: number
      puzzles_solved: number
      study_hours: number
    }
  }> {
    return this.apiClient.get('/users/progress')
  }
}