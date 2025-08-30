/**
 * User Puzzle Statistics - DATABASE PART
 * User puzzle progress and statistics that should be persisted in database
 */

export interface UserPuzzleStats {
  userId: string
  totalAttempts: number
  correctSolutions: number
  averageRating: number
  currentStreak: number
  longestStreak: number
  averageTime: number // seconds
  categoryStats: {
    [category: string]: {
      attempts: number
      correct: number
      averageRating: number
      bestTime: number
    }
  }
  difficultyStats: {
    [difficulty: string]: {
      attempts: number
      correct: number
      successRate: number
    }
  }
  recentSessions: PuzzleSession[]
  createdAt: string
  updatedAt: string
}

export interface PuzzleSession {
  sessionId: string
  date: string
  puzzlesSolved: number
  correctAnswers: number
  totalTime: number
  averageRating: number
  themes: string[]
}

/**
 * Default puzzle stats for new users
 */
export const defaultUserPuzzleStats: Omit<UserPuzzleStats, 'userId' | 'createdAt' | 'updatedAt'> = {
  totalAttempts: 0,
  correctSolutions: 0,
  averageRating: 0,
  currentStreak: 0,
  longestStreak: 0,
  averageTime: 0,
  categoryStats: {},
  difficultyStats: {},
  recentSessions: []
}