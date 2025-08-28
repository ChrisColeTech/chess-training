/**
 * Achievement System Types
 * Comprehensive interfaces for the chess training achievements and gamification system
 */


/**
 * Achievement rarity levels with gaming progression
 */
export type AchievementRarity = 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic'

/**
 * Achievement categories for organization
 */
export type AchievementCategory = 
  | 'Tactical' 
  | 'Rating' 
  | 'Study' 
  | 'Special' 
  | 'Endgame'
  | 'Opening'
  | 'Puzzles'
  | 'Games'
  | 'Streaks'
  | 'Milestones'

/**
 * Achievement status states
 */
export type AchievementStatus = 'locked' | 'available' | 'in_progress' | 'completed'

/**
 * Achievement unlock conditions
 */
export interface AchievementUnlockCondition {
  /** Type of condition */
  type: 'rating' | 'games_played' | 'puzzles_solved' | 'study_hours' | 'streak' | 'accuracy' | 'achievement'
  
  /** Target value to reach */
  target: number
  
  /** Current progress towards target */
  current?: number
  
  /** Human-readable description */
  description: string
  
  /** Required achievements (for chained unlocks) */
  requiredAchievements?: string[]
  
  /** Minimum time period (for streaks) */
  timeFrame?: 'daily' | 'weekly' | 'monthly' | 'all_time'
}

/**
 * Achievement reward information
 */
export interface AchievementReward {
  /** Experience points awarded */
  xp: number
  
  /** Badge/trophy identifier */
  badge?: string
  
  /** Title unlock */
  title?: string
  
  /** Special unlocks (themes, pieces, etc.) */
  unlocks?: string[]
  
  /** Currency reward (for future features) */
  coins?: number
  
  /** Human-readable description */
  description: string
}

/**
 * Core achievement data structure
 */
export interface Achievement {
  /** Unique identifier */
  id: string
  
  /** Display name */
  title: string
  
  /** Detailed description */
  description: string
  
  /** Gaming-themed lore text */
  lore?: string
  
  /** Icon component or name */
  icon: string
  
  /** Achievement category */
  category: AchievementCategory
  
  /** Rarity level */
  rarity: AchievementRarity
  
  /** Current status */
  status: AchievementStatus
  
  /** Unlock conditions */
  conditions: AchievementUnlockCondition[]
  
  /** Reward information */
  reward: AchievementReward
  
  /** When it was earned (if completed) */
  earnedAt?: Date
  
  /** Progress percentage (0-100) */
  progress: number
  
  /** Whether it's hidden until unlocked */
  isHidden: boolean
  
  /** Whether it's a secret achievement */
  isSecret: boolean
  
  /** Chain/series this achievement belongs to */
  series?: string
  
  /** Position in series */
  seriesOrder?: number
  
  /** Tags for searching/filtering */
  tags: string[]
  
  /** Difficulty rating (1-5) */
  difficulty: number
}

/**
 * Achievement series/chain information
 */
export interface AchievementSeries {
  /** Series identifier */
  id: string
  
  /** Series name */
  name: string
  
  /** Series description */
  description: string
  
  /** Series icon */
  icon: string
  
  /** Achievement IDs in order */
  achievementIds: string[]
  
  /** Total achievements in series */
  totalCount: number
  
  /** Completed achievements count */
  completedCount: number
  
  /** Series progress percentage */
  progress: number
  
  /** Bonus reward for completing entire series */
  seriesReward?: AchievementReward
}

/**
 * Achievement statistics
 */
export interface AchievementStats {
  /** Total achievements available */
  totalAchievements: number
  
  /** Completed achievements */
  completedAchievements: number
  
  /** Completion percentage */
  completionRate: number
  
  /** Total XP earned from achievements */
  totalXpEarned: number
  
  /** Achievements by rarity */
  byRarity: Record<AchievementRarity, {
    total: number
    completed: number
    rate: number
  }>
  
  /** Achievements by category */
  byCategory: Record<AchievementCategory, {
    total: number
    completed: number
    rate: number
  }>
  
  /** Recent achievements (last 10) */
  recentlyEarned: Achievement[]
  
  /** Achievements close to completion */
  nearCompletion: Achievement[]
  
  /** Current longest streak */
  currentStreak: number
  
  /** Longest streak ever */
  longestStreak: number
  
  /** Average difficulty of completed achievements */
  averageDifficulty: number
}

/**
 * Achievement filter options
 */
export interface AchievementFilters {
  /** Filter by categories */
  categories: AchievementCategory[]
  
  /** Filter by rarities */
  rarities: AchievementRarity[]
  
  /** Filter by status */
  statuses: AchievementStatus[]
  
  /** Show only earned achievements */
  earnedOnly: boolean
  
  /** Show only available (unlocked but not completed) */
  availableOnly: boolean
  
  /** Show only hidden/secret achievements */
  secretOnly: boolean
  
  /** Search text */
  searchText: string
  
  /** Sort by field */
  sortBy: 'title' | 'rarity' | 'category' | 'progress' | 'earnedAt' | 'difficulty'
  
  /** Sort direction */
  sortDirection: 'asc' | 'desc'
  
  /** Difficulty range */
  difficultyRange: [number, number]
  
  /** Show only achievements from specific series */
  seriesFilter?: string
}

/**
 * Achievement sharing/social information
 */
export interface AchievementShare {
  /** Achievement being shared */
  achievement: Achievement
  
  /** Share timestamp */
  sharedAt: Date
  
  /** Share message/comment */
  message?: string
  
  /** Platform shared to */
  platform: 'internal' | 'discord' | 'twitter' | 'facebook'
  
  /** Reactions/likes received */
  reactions: number
  
  /** Comments received */
  comments: string[]
}

/**
 * Achievement leaderboard entry
 */
export interface AchievementLeaderboardEntry {
  /** User identifier */
  userId: string
  
  /** Username */
  username: string
  
  /** User avatar */
  avatar?: string
  
  /** Total achievements */
  totalAchievements: number
  
  /** Completion rate */
  completionRate: number
  
  /** Total XP from achievements */
  totalXp: number
  
  /** Rarest achievement earned */
  rarestAchievement?: Achievement
  
  /** Most recent achievement */
  latestAchievement?: Achievement
  
  /** Current rank */
  rank: number
  
  /** Previous rank (for change indicator) */
  previousRank?: number
}

/**
 * Achievement notification
 */
export interface AchievementNotification {
  /** Notification ID */
  id: string
  
  /** Achievement that was earned */
  achievement: Achievement
  
  /** When it was earned */
  earnedAt: Date
  
  /** Whether it's been seen */
  isRead: boolean
  
  /** Whether it's been dismissed */
  isDismissed: boolean
  
  /** Animation state for UI */
  isAnimating?: boolean
}

/**
 * Component Props Interfaces
 */

/**
 * Props for achievement card component
 */
export interface AchievementCardProps {
  /** Achievement to display */
  achievement: Achievement
  
  /** Whether to show progress bar */
  showProgress?: boolean
  
  /** Whether to show detailed info */
  showDetails?: boolean
  
  /** Click handler */
  onClick?: (achievement: Achievement) => void
  
  /** Theme from store */
  theme: any
  
  /** Size variant */
  size?: 'small' | 'medium' | 'large'
  
  /** Layout variant */
  variant?: 'card' | 'list' | 'compact'
}

/**
 * Props for achievement grid component
 */
export interface AchievementGridProps {
  /** Achievements to display */
  achievements: Achievement[]
  
  /** Loading state */
  isLoading: boolean
  
  /** Current filters */
  filters: AchievementFilters
  
  /** Filter change handler */
  onFiltersChange: (filters: AchievementFilters) => void
  
  /** Achievement click handler */
  onAchievementClick: (achievement: Achievement) => void
  
  /** Theme from store */
  theme: any
  
  /** Grid columns */
  columns?: number
  
  /** Show empty state */
  showEmptyState?: boolean
}

/**
 * Props for achievement details modal
 */
export interface AchievementDetailsProps {
  /** Achievement to show details for */
  achievement: Achievement | null
  
  /** Whether modal is open */
  isOpen: boolean
  
  /** Close handler */
  onClose: () => void
  
  /** Share handler */
  onShare?: (achievement: Achievement) => void
  
  /** Theme from store */
  theme: any
  
  /** Related achievements in same series */
  seriesAchievements?: Achievement[]
}

/**
 * Props for achievement filters component
 */
export interface AchievementFiltersProps {
  /** Current filters */
  filters: AchievementFilters
  
  /** Filter change handler */
  onFiltersChange: (filters: AchievementFilters) => void
  
  /** Available filter options */
  availableCategories: AchievementCategory[]
  availableRarities: AchievementRarity[]
  
  /** Theme from store */
  theme: any
  
  /** Whether filters are collapsed */
  isCollapsed?: boolean
}

/**
 * Props for achievement stats component
 */
export interface AchievementStatsProps {
  /** Achievement statistics */
  stats: AchievementStats
  
  /** Theme from store */
  theme: any
  
  /** Show detailed breakdown */
  showDetails?: boolean
  
  /** Comparison data (for before/after) */
  comparisonStats?: AchievementStats
}

/**
 * Props for progress tracker component
 */
export interface ProgressTrackerProps {
  /** Current progress value */
  progress: number
  
  /** Maximum/target value */
  target: number
  
  /** Progress label */
  label: string
  
  /** Theme from store */
  theme: any
  
  /** Size variant */
  size?: 'small' | 'medium' | 'large'
  
  /** Show percentage */
  showPercentage?: boolean
  
  /** Animated progress */
  animated?: boolean
}

/**
 * Props for badge display component
 */
export interface BadgeDetailsProps {
  /** Badge/achievement to display */
  achievement: Achievement
  
  /** Display size */
  size: 'small' | 'medium' | 'large' | 'hero'
  
  /** Whether to show shine/glow effect */
  showEffects?: boolean
  
  /** Theme from store */
  theme: any
  
  /** Click handler */
  onClick?: () => void
  
  /** Whether badge is newly earned */
  isNew?: boolean
}

/**
 * Hook return type for useAchievements
 */
export interface AchievementsHookReturn {
  // Data
  achievements: Achievement[]
  filteredAchievements: Achievement[]
  achievementSeries: AchievementSeries[]
  stats: AchievementStats
  leaderboard: AchievementLeaderboardEntry[]
  notifications: AchievementNotification[]
  
  // Filters & Search
  filters: AchievementFilters
  setFilters: (filters: AchievementFilters) => void
  resetFilters: () => void
  searchAchievements: (query: string) => Achievement[]
  
  // Actions
  checkAchievementProgress: (achievementId: string) => void
  shareAchievement: (achievement: Achievement, platform: string, message?: string) => void
  markNotificationRead: (notificationId: string) => void
  dismissNotification: (notificationId: string) => void
  
  // State
  isLoading: boolean
  selectedAchievement: Achievement | null
  setSelectedAchievement: (achievement: Achievement | null) => void
  
  // Computed
  nearCompletionAchievements: Achievement[]
  recommendedAchievements: Achievement[]
  
  // Error handling
  error: string | null
  clearError: () => void
}

/**
 * Achievement progress tracking data
 */
export interface AchievementProgressData {
  /** Progress tracking by achievement ID */
  [achievementId: string]: {
    /** Current values for each condition */
    conditionProgress: Record<string, number>
    
    /** Last updated timestamp */
    lastUpdated: Date
    
    /** Progress history for analytics */
    progressHistory: Array<{
      date: Date
      progress: number
      milestone?: boolean
    }>
  }
}