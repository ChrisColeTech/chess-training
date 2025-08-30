// User-related type definitions following SRP principle
// Types are separate from implementation (services/clients)

export interface UserStats {
  total_games: number
  win_rate: number
  current_streak: number
  best_streak: number
  total_puzzles_solved: number
  puzzle_accuracy: number
  study_time_total: number
  achievements_unlocked: number
}

export interface UserProfile {
  id: string
  username: string
  email: string
  chess_elo: number
  puzzle_rating: number
  join_date: string
  last_active: string
  games_played: number
  puzzles_solved: number
  study_hours: number
  avatar?: string
  country?: string
  preferences: UserPreferences
}

export interface UserPreferences {
  theme: string
  board_style: string
  piece_set: string
  auto_queen: boolean
  show_legal_moves: boolean
  sound_enabled: boolean
}

export interface UserStatistics {
  overview: {
    total_games: number
    total_puzzles: number
    total_study_hours: number
    current_streak: number
    best_streak: number
  }
  ratings: {
    chess_elo: {
      current: number
      peak: number
      change_24h: number
      change_7d: number
      change_30d: number
    }
    puzzle_rating: {
      current: number
      peak: number
      change_24h: number
      change_7d: number
      change_30d: number
    }
  }
  performance: {
    win_rate: number
    puzzle_accuracy: number
    average_game_length: number
    favorite_openings: string[]
    strongest_puzzle_themes: string[]
  }
}

export interface RecentActivity {
  id: string
  type: 'game' | 'puzzle' | 'study' | 'achievement'
  description: string
  result?: 'win' | 'loss' | 'draw' | 'solved' | 'failed'
  points?: number
  rating_change?: number
  timestamp: string
  timeFormatted?: string // Computed field for display
  details?: {
    opponent?: string
    time_control?: string
    puzzle_theme?: string
    study_topic?: string
    achievement_name?: string
  }
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  category: 'games' | 'puzzles' | 'study' | 'progress'
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
  unlocked: boolean
  unlock_date?: string
  progress?: {
    current: number
    required: number
  }
}

export interface ProgressUpdate {
  gamesPlayed?: number
  puzzlesSolved?: number
  eloChange?: number
  timeSpent?: number
}

export interface DashboardStats {
  chess_elo: number
  puzzle_rating: number
  games_played: number
  study_hours: number
  rating_change: number
  puzzle_rating_change: number
  games_change: number
  study_hours_change: number
  // Additional fields that might come from backend
  puzzles_solved_today?: number
  study_minutes_today?: number
}