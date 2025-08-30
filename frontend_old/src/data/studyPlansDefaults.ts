/**
 * Study Plans Default Values and Configuration
 * Constants extracted from useStudyPlans hook for better maintainability
 */

/**
 * Study plans initialization configuration
 */
export const STUDY_PLANS_CONFIG = {
  INITIAL_LOAD_DELAY: 800, // API simulation delay in milliseconds
  LESSON_LOADING_DELAY: 300, // Delay when loading individual lessons
  COMPLETION_SAVE_DELAY: 800, // Delay when saving lesson completion
  SCHEDULE_SAVE_DELAY: 300, // Delay when saving study schedule
  CUSTOM_PLAN_SAVE_DELAY: 500, // Delay when creating custom plans
} as const

/**
 * Score thresholds for lesson completion status
 */
export const COMPLETION_SCORE_THRESHOLDS = {
  MASTERY_THRESHOLD: 80, // Score required for "mastered" status
  COMPLETION_THRESHOLD: 0, // Minimum score for "completed" status
} as const

/**
 * XP and gamification rewards
 */
export const GAMIFICATION_REWARDS = {
  DEFAULT_XP_REWARD: 50, // Default XP for lesson completion
  DEFAULT_LESSON_TIME: 15, // Default estimated lesson time in minutes
} as const

/**
 * Badge unlock thresholds
 */
export const BADGE_UNLOCK_THRESHOLDS = {
  FIRST_MILESTONE_LESSONS: 10, // Lessons required for first milestone badge
  PERFECTIONIST_SCORE: 95, // Score required for perfectionist badge
} as const

/**
 * Achievement badge templates
 */
export const ACHIEVEMENT_BADGES = {
  FIRST_MILESTONE: {
    id: 'first_milestone',
    name: 'First Milestone',
    description: 'Completed your first 10 lessons',
    type: 'bronze' as const,
    icon: '<Trophy className="w-4 h-4 inline" />',
    criteria: { type: 'lessons_completed' as const, threshold: 10 },
    rarity: 20,
    xpReward: 100
  },
  PERFECTIONIST: {
    id: 'perfectionist',
    name: 'Perfectionist', 
    description: 'Achieved a perfect score',
    type: 'gold' as const,
    icon: '<Star className="w-4 h-4 inline" />',
    criteria: { type: 'score' as const, threshold: 95 },
    rarity: 5,
    xpReward: 250
  }
} as const

/**
 * Badge unlock sound timing
 */
export const BADGE_SOUND_DELAY = 500 // Milliseconds to delay badge unlock sound

/**
 * Progress calculation constants
 */
export const PROGRESS_CALCULATION = {
  PERCENTAGE_ROUNDING: true, // Whether to round progress percentages
  MAX_PERCENTAGE: 100, // Maximum progress percentage cap
} as const