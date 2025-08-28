/**
 * Progress Overview Types
 * Contains all TypeScript interfaces and types for the progress overview dashboard
 */

import type { LucideIcon } from 'lucide-react'

/**
 * Time period for data analysis
 */
export type TimePeriod = 'week' | 'month' | 'year'

/**
 * Trend direction for statistics
 */
export type TrendDirection = 'up' | 'down' | 'neutral'

/**
 * Training session types
 */
export type SessionType = 'puzzle' | 'study' | 'game' | 'analysis' | 'opening' | 'endgame'

/**
 * Performance skill categories
 */
export type SkillCategory = 'tactics' | 'openings' | 'endgames' | 'strategy' | 'calculation' | 'time_management'

/**
 * Achievement status types
 */
export type AchievementStatus = 'locked' | 'in_progress' | 'completed' | 'mastered'

/**
 * Key performance indicator card data
 */
export interface StatCard {
  /** Unique identifier */
  id: string
  
  /** Display title */
  title: string
  
  /** Current value (string for formatted display) */
  value: string | number
  
  /** Change description */
  change: string
  
  /** Trend direction */
  trend: TrendDirection
  
  /** Icon component */
  icon: LucideIcon
  
  /** Color class for styling */
  color: string
  
  /** Optional subtitle */
  subtitle?: string
  
  /** Optional tooltip */
  tooltip?: string
  
  /** Priority for display order */
  priority: number
}

/**
 * Rating data point for progress tracking
 */
export interface RatingDataPoint {
  /** Date timestamp */
  date: number
  
  /** Rating value */
  rating: number
  
  /** Optional period label */
  label?: string
  
  /** Game type context */
  gameType?: 'blitz' | 'rapid' | 'classical' | 'puzzle'
}

/**
 * Daily activity data for visualization
 */
export interface ActivityDataPoint {
  /** Date string */
  date: string
  
  /** Day label (Mon, Tue, etc.) */
  day: string
  
  /** Puzzles solved */
  puzzles: number
  
  /** Study time in minutes */
  studyTime: number
  
  /** Games played */
  games: number
  
  /** Total time spent in minutes */
  totalTime: number
  
  /** Session quality score (0-100) */
  quality: number
}

/**
 * Training session entry for activity feed
 */
export interface TrainingSession {
  /** Unique identifier */
  id: string
  
  /** Session type */
  type: SessionType
  
  /** Display title */
  title: string
  
  /** Session description */
  description: string
  
  /** Duration in minutes */
  duration: number
  
  /** Performance score (0-100) */
  score: number
  
  /** Timestamp */
  timestamp: number
  
  /** Experience points gained */
  xpGained: number
  
  /** Accuracy percentage */
  accuracy?: number
  
  /** Rating change */
  ratingChange?: number
  
  /** Session-specific data */
  metadata?: {
    puzzlesSolved?: number
    gamesPlayed?: number
    openingsStudied?: number
    mistakesCount?: number
    timeSpent?: number
  }
}

/**
 * Achievement definition
 */
export interface Achievement {
  /** Unique identifier */
  id: string
  
  /** Display name */
  title: string
  
  /** Achievement description */
  description: string
  
  /** Icon component */
  icon: LucideIcon
  
  /** Current status */
  status: AchievementStatus
  
  /** Current progress value */
  progress: number
  
  /** Target value for completion */
  target: number
  
  /** Experience points reward */
  xpReward: number
  
  /** Achievement category */
  category: SkillCategory
  
  /** Rarity level */
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  
  /** Unlock requirements */
  requirements?: string[]
  
  /** Badge color/style */
  badgeColor: string
  
  /** Completion timestamp (if completed) */
  completedAt?: number
}

/**
 * Skill progression data
 */
export interface SkillProgression {
  /** Skill category */
  category: SkillCategory
  
  /** Display name */
  name: string
  
  /** Current level */
  level: number
  
  /** Progress towards next level (0-100) */
  progress: number
  
  /** Experience points */
  xp: number
  
  /** XP needed for next level */
  xpToNext: number
  
  /** Recent improvement percentage */
  improvement: number
  
  /** Color theme */
  color: string
  
  /** Icon component */
  icon: LucideIcon
}

/**
 * Performance analytics data
 */
export interface PerformanceAnalytics {
  /** Overall rating */
  overallRating: number
  
  /** Rating history */
  ratingHistory: RatingDataPoint[]
  
  /** Peak rating achieved */
  peakRating: number
  
  /** Peak rating date */
  peakRatingDate: number
  
  /** Win/loss/draw statistics */
  gameStats: {
    wins: number
    losses: number
    draws: number
    totalGames: number
    winRate: number
  }
  
  /** Time control performance */
  timeControlStats: {
    blitz: { rating: number; games: number; winRate: number }
    rapid: { rating: number; games: number; winRate: number }
    classical: { rating: number; games: number; winRate: number }
  }
  
  /** Recent performance trend */
  recentTrend: {
    direction: TrendDirection
    change: number
    period: TimePeriod
  }
  
  /** Accuracy metrics */
  accuracy: {
    overall: number
    tactical: number
    positional: number
    endgame: number
  }
}

/**
 * Study streak tracking
 */
export interface StudyStreak {
  /** Current streak in days */
  current: number
  
  /** Longest streak achieved */
  longest: number
  
  /** Last study date */
  lastStudyDate: number
  
  /** Streak start date */
  streakStartDate: number
  
  /** Days until milestone */
  daysToMilestone: number
  
  /** Next milestone target */
  nextMilestone: number
  
  /** Streak status */
  status: 'active' | 'broken' | 'new'
}

/**
 * Goal definition and tracking
 */
export interface Goal {
  /** Unique identifier */
  id: string
  
  /** Goal title */
  title: string
  
  /** Detailed description */
  description: string
  
  /** Target value */
  target: number
  
  /** Current progress */
  progress: number
  
  /** Target completion date */
  targetDate: number
  
  /** Goal category */
  category: SkillCategory
  
  /** Priority level */
  priority: 'low' | 'medium' | 'high'
  
  /** Status */
  status: 'active' | 'completed' | 'paused' | 'failed'
  
  /** Icon component */
  icon: LucideIcon
  
  /** Color theme */
  color: string
  
  /** Created timestamp */
  createdAt: number
  
  /** Completed timestamp (if completed) */
  completedAt?: number
}

/**
 * Learning path progress
 */
export interface LearningPath {
  /** Unique identifier */
  id: string
  
  /** Path name */
  name: string
  
  /** Description */
  description: string
  
  /** Total lessons */
  totalLessons: number
  
  /** Completed lessons */
  completedLessons: number
  
  /** Current lesson index */
  currentLesson: number
  
  /** Estimated completion time in hours */
  estimatedTime: number
  
  /** Time spent so far in hours */
  timeSpent: number
  
  /** Difficulty level */
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  
  /** Path category */
  category: SkillCategory
  
  /** Completion percentage */
  progress: number
  
  /** Next lesson title */
  nextLessonTitle: string
  
  /** Path icon */
  icon: LucideIcon
}

/**
 * Quick action item for dashboard shortcuts
 */
export interface QuickAction {
  /** Unique identifier */
  id: string
  
  /** Action title */
  title: string
  
  /** Description or subtitle */
  description: string
  
  /** Icon component */
  icon: LucideIcon
  
  /** Navigation path */
  path: string
  
  /** Color theme */
  color: string
  
  /** Background color */
  backgroundColor: string
  
  /** Recommended action */
  isRecommended?: boolean
  
  /** Action priority */
  priority: number
  
  /** Estimated time in minutes */
  estimatedTime?: number
  
  /** Current streak or progress */
  streak?: number
}

/**
 * Component props for StatsCards
 */
export interface StatsCardsProps {
  /** Statistics data */
  stats: StatCard[]
  
  /** Loading state */
  isLoading?: boolean
  
  /** Selected time period */
  timePeriod: TimePeriod
  
  /** Theme from store */
  theme: any
}

/**
 * Component props for ProgressCharts
 */
export interface ProgressChartsProps {
  /** Rating history data */
  ratingHistory: RatingDataPoint[]
  
  /** Activity data */
  activityData: ActivityDataPoint[]
  
  /** Loading state */
  isLoading?: boolean
  
  /** Selected time period */
  timePeriod: TimePeriod
  
  /** Theme from store */
  theme: any
}

/**
 * Component props for ActivityFeed
 */
export interface ActivityFeedProps {
  /** Training sessions */
  sessions: TrainingSession[]
  
  /** Loading state */
  isLoading?: boolean
  
  /** Max sessions to display */
  maxSessions?: number
  
  /** Theme from store */
  theme: any
}

/**
 * Component props for AchievementSection
 */
export interface AchievementSectionProps {
  /** Achievements data */
  achievements: Achievement[]
  
  /** Loading state */
  isLoading?: boolean
  
  /** Max achievements to display */
  maxAchievements?: number
  
  /** Show progress bars */
  showProgress?: boolean
  
  /** Theme from store */
  theme: any
}

/**
 * Component props for QuickActions
 */
export interface QuickActionsProps {
  /** Quick action items */
  actions: QuickAction[]
  
  /** Loading state */
  isLoading?: boolean
  
  /** Max actions to display */
  maxActions?: number
  
  /** Theme from store */
  theme: any
}

/**
 * Hook return type for useProgressOverview
 */
export interface ProgressOverviewHookReturn {
  // Core data
  performanceAnalytics: PerformanceAnalytics
  studyStreak: StudyStreak
  skillProgressions: SkillProgression[]
  achievements: Achievement[]
  goals: Goal[]
  learningPaths: LearningPath[]
  
  // Activity data
  recentSessions: TrainingSession[]
  activityData: ActivityDataPoint[]
  
  // UI state
  selectedTimePeriod: TimePeriod
  isLoading: boolean
  
  // Actions
  setTimePeriod: (period: TimePeriod) => void
  refreshData: () => Promise<void>
  
  // Computed values
  statsCards: StatCard[]
  quickActions: QuickAction[]
  weeklyProgress: {
    puzzlesSolved: number
    studyTime: number
    gamesPlayed: number
    improvement: number
  }
  
  // Utilities
  formatRating: (rating: number) => string
  formatDuration: (minutes: number) => string
  calculateProgress: (current: number, target: number) => number
  
  // Error handling
  error: string | null
  clearError: () => void
}

/**
 * Mock data configuration for different difficulty levels
 */
export interface MockDataConfig {
  /** Player skill level */
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  
  /** Rating range */
  ratingRange: { min: number; max: number }
  
  /** Activity level multiplier */
  activityMultiplier: number
  
  /** Achievement completion rate */
  achievementRate: number
  
  /** Study streak probability */
  streakProbability: number
}

/**
 * Command Center theme configuration
 */
export interface CommandCenterTheme {
  /** Primary command colors */
  commandPrimary: string
  
  /** Secondary command colors */
  commandSecondary: string
  
  /** Accent highlights */
  commandAccent: string
  
  /** Status indicators */
  statusColors: {
    operational: string
    warning: string
    critical: string
    offline: string
  }
  
  /** HUD elements */
  hudColors: {
    border: string
    background: string
    text: string
    highlight: string
  }
  
  /** Animation settings */
  animations: {
    pulse: boolean
    glow: boolean
    scan: boolean
  }
}