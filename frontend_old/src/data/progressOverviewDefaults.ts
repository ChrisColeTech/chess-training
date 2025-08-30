/**
 * Progress Overview Default Values and Constants
 * Constants extracted from useProgressOverview hook for better maintainability
 */

import type { TimePeriod } from '@/types/progressOverview'

/**
 * Default time period selection
 * Extracted from useProgressOverview hook line 28
 */
export const DEFAULT_TIME_PERIOD: TimePeriod = 'month'

/**
 * Progress overview loading configuration
 */
export const PROGRESS_OVERVIEW_CONFIG = {
  API_SIMULATION_DELAY: 800, // Milliseconds to simulate API loading
  RECENT_SESSIONS_LIMIT: 10, // Number of recent sessions to load
} as const

/**
 * Rating performance thresholds for trend calculation
 */
export const RATING_THRESHOLDS = {
  WIN_RATE_EXCELLENT: 60, // Win rate threshold for "up" trend
  WIN_RATE_GOOD: 40, // Win rate threshold for "neutral" trend
  ACCURACY_EXCELLENT: 80, // Accuracy threshold for "up" trend  
  ACCURACY_GOOD: 70, // Accuracy threshold for "neutral" trend
} as const

/**
 * Quick action configuration
 */
export const QUICK_ACTIONS_CONFIG = {
  RECOMMENDED_FLAG_CONDITIONS: {
    STREAK_BASED: true, // Recommend actions based on study streak
  },
  ESTIMATED_TIMES: {
    SOLVE_PUZZLES: 15,
    PLAY_GAME: 10,
    STUDY_OPENINGS: 20,
    ANALYZE_GAMES: 25,
    MASTER_GAMES: 30,
    ENDGAME_PRACTICE: 20,
  },
  PRIORITIES: {
    SOLVE_PUZZLES: 1,
    PLAY_GAME: 2,
    STUDY_OPENINGS: 3,
    ANALYZE_GAMES: 4,
    MASTER_GAMES: 5,
    ENDGAME_PRACTICE: 6,
  }
} as const

/**
 * Stats card priority ordering
 */
export const STATS_CARD_PRIORITIES = {
  CURRENT_RATING: 1,
  STUDY_STREAK: 2,
  WIN_RATE: 3,
  ACCURACY: 4,
  PEAK_RATING: 5,
  ACTIVE_GOALS: 6,
} as const