export interface DashboardStats {
  chess_elo: number
  puzzle_rating: number
  games_played: number
  study_hours: number
  rating_change: number
  puzzle_rating_change: number
  games_change: number
  study_hours_change: number
}

export interface DailyGoal {
  id: string
  type: 'games' | 'puzzles' | 'study' | 'streak'
  label: string
  current: number
  target: number
  completed: boolean
}

export interface UserActivity {
  id: string
  type: 'win' | 'loss' | 'puzzle' | 'study'
  description: string
  opponent?: string
  rating_change?: number
  points?: number
  duration?: string
  created_at: string
  timeFormatted?: string
}