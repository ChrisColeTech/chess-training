/**
 * User Progress Tracking - DATABASE PART
 * User-specific progress data and achievement tracking that should be persisted in database
 */

export interface UserProgressData {
  userId: string
  currentPerformanceLevel: 'excellent' | 'good' | 'average' | 'needsWork'
  performanceValue: number
  progressMetrics: {
    tacticalRating: number
    puzzlesSolved: number
    studyStreak: number
    totalStudyTime: number // minutes
    gamesPlayed: number
    winLossRatio: number
    averageAccuracy: number
    improvement: number // percentage change
    milestoneReached: number // percentage of current milestone
  }
  achievements: string[] // achievement IDs
  lastActivity: string // ISO date
  progressHistory: ProgressSnapshot[]
  createdAt: string
  updatedAt: string
}

export interface ProgressSnapshot {
  date: string // ISO date
  performanceValue: number
  tacticalRating: number
  puzzlesSolved: number
  studyStreak: number
}

/**
 * Default user progress for new users
 */
export const defaultUserProgress: Omit<UserProgressData, 'userId' | 'createdAt' | 'updatedAt' | 'lastActivity'> = {
  currentPerformanceLevel: 'needsWork',
  performanceValue: 0,
  progressMetrics: {
    tacticalRating: 800,
    puzzlesSolved: 0,
    studyStreak: 0,
    totalStudyTime: 0,
    gamesPlayed: 0,
    winLossRatio: 0,
    averageAccuracy: 0,
    improvement: 0,
    milestoneReached: 0
  },
  achievements: [],
  progressHistory: []
}