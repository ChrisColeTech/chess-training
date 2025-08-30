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
  created_at: string
  preferences: UserPreferences
}

export interface UserPreferences {
  theme: string
  board_style: string
  piece_style: string
  sound_enabled: boolean
  notifications_enabled: boolean
  auto_queen: boolean
  show_coordinates: boolean
  highlight_moves: boolean
}