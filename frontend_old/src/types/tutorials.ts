/**
 * Tutorials Types
 * Contains all TypeScript interfaces and types for the interactive tutorials system
 */

/**
 * Tutorial difficulty levels
 */
export type TutorialDifficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'

/**
 * Tutorial categories
 */
export type TutorialCategory = 
  | 'basics'
  | 'interface'
  | 'puzzles'
  | 'analysis'
  | 'openings'
  | 'endgames'
  | 'strategy'
  | 'tactics'
  | 'settings'
  | 'features'

/**
 * Tutorial completion status
 */
export type TutorialStatus = 'not_started' | 'in_progress' | 'completed' | 'skipped'

/**
 * Tutorial step types
 */
export type TutorialStepType = 
  | 'introduction'
  | 'demonstration'
  | 'interaction'
  | 'practice'
  | 'quiz'
  | 'summary'

/**
 * Video player states
 */
export type VideoPlayerState = 'idle' | 'playing' | 'paused' | 'ended' | 'error'

/**
 * Achievement tier levels
 */
export type AchievementTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond'

/**
 * Rating scale for tutorial feedback
 */
export type TutorialRating = 1 | 2 | 3 | 4 | 5

/**
 * Represents a single tutorial step
 */
export interface TutorialStep {
  /** Unique step identifier */
  id: string
  
  /** Step type */
  type: TutorialStepType
  
  /** Step title */
  title: string
  
  /** Step description/content */
  description: string
  
  /** Optional instruction text */
  instruction?: string
  
  /** Step duration estimate in seconds */
  estimatedDuration: number
  
  /** Whether this step is interactive */
  isInteractive: boolean
  
  /** Required actions to complete step */
  requiredActions?: string[]
  
  /** Optional video content */
  video?: {
    url: string
    thumbnailUrl: string
    duration: number
    subtitles?: string
  }
  
  /** Optional image/screenshot */
  image?: {
    url: string
    alt: string
    caption?: string
  }
  
  /** Interactive element selectors for highlighting */
  interactiveElements?: {
    selector: string
    action: 'click' | 'hover' | 'input' | 'highlight'
    description: string
  }[]
  
  /** Quiz questions for quiz-type steps */
  quiz?: {
    question: string
    options: string[]
    correctAnswer: number
    explanation: string
  }[]
  
  /** Completion criteria */
  completionCriteria?: {
    type: 'automatic' | 'manual' | 'quiz_score' | 'interaction'
    threshold?: number
  }
}

/**
 * Represents a complete tutorial
 */
export interface Tutorial {
  /** Unique tutorial identifier */
  id: string
  
  /** Tutorial title */
  title: string
  
  /** Brief tutorial description */
  description: string
  
  /** Detailed tutorial summary */
  summary: string
  
  /** Tutorial category */
  category: TutorialCategory
  
  /** Difficulty level */
  difficulty: TutorialDifficulty
  
  /** Estimated completion time in minutes */
  estimatedDuration: number
  
  /** Tutorial steps */
  steps: TutorialStep[]
  
  /** Tutorial thumbnail image */
  thumbnailUrl: string
  
  /** Tags for search and filtering */
  tags: string[]
  
  /** Prerequisites (other tutorial IDs) */
  prerequisites: string[]
  
  /** Learning objectives */
  learningObjectives: string[]
  
  /** Tutorial version */
  version: string
  
  /** Creation date */
  createdAt: number
  
  /** Last update date */
  updatedAt: number
  
  /** Average rating */
  averageRating: number
  
  /** Number of ratings */
  ratingCount: number
  
  /** Completion rate percentage */
  completionRate: number
  
  /** Whether tutorial is featured */
  isFeatured: boolean
  
  /** Whether tutorial is new */
  isNew: boolean
  
  /** Whether tutorial is recommended for user */
  isRecommended: boolean
  
  /** Unlock requirements */
  unlockRequirements?: {
    completedTutorials?: string[]
    minimumRating?: number
    achievementsRequired?: string[]
  }
  
  /** Whether tutorial is unlocked for user */
  isUnlocked: boolean
  
  /** Related tutorials */
  relatedTutorials: string[]
  
  /** Tutorial type/format */
  type?: 'video' | 'interactive' | 'text' | 'mixed'
  
  /** Tutorial instructor/author */
  instructor?: {
    name: string
    title: string
    avatar?: string
  }
  
  /** View count */
  views: number
}

/**
 * User's progress on a specific tutorial
 */
export interface TutorialProgress {
  /** Tutorial ID */
  tutorialId: string
  
  /** Overall completion status */
  status: TutorialStatus
  
  /** Current step index (0-based) */
  currentStepIndex: number
  
  /** Completed step indices */
  completedSteps: number[]
  
  /** Skipped step indices */
  skippedSteps: number[]
  
  /** Overall progress percentage (0-100) */
  progressPercentage: number
  
  /** Time spent in minutes */
  timeSpent: number
  
  /** Start timestamp */
  startedAt?: number
  
  /** Last accessed timestamp */
  lastAccessedAt: number
  
  /** Completion timestamp */
  completedAt?: number
  
  /** User's rating (if completed) */
  userRating?: TutorialRating
  
  /** User's written feedback */
  userFeedback?: string
  
  /** Number of times restarted */
  restartCount: number
  
  /** Quiz scores by step */
  quizScores?: Record<string, number>
  
  /** User notes during tutorial */
  notes?: string
}

/**
 * Tutorial achievement
 */
export interface TutorialAchievement {
  /** Unique achievement identifier */
  id: string
  
  /** Achievement name */
  name: string
  
  /** Achievement description */
  description: string
  
  /** Achievement icon identifier */
  icon: string
  
  /** Achievement tier */
  tier: AchievementTier
  
  /** Points awarded */
  points: number
  
  /** Requirements to unlock */
  requirements: {
    completedTutorials?: string[]
    categoriesCompleted?: TutorialCategory[]
    totalTutorials?: number
    perfectScores?: number
    timeConstraints?: {
      maxTimePerTutorial: number
      tutorialCount: number
    }
  }
  
  /** Whether achievement is unlocked */
  isUnlocked: boolean
  
  /** Unlock timestamp */
  unlockedAt?: number
  
  /** Rarity percentage */
  rarity: number
}

/**
 * Tutorial search filters
 */
export interface TutorialFilters {
  /** Category filter */
  category?: TutorialCategory
  
  /** Difficulty filter */
  difficulty?: TutorialDifficulty
  
  /** Completion status filter */
  status?: TutorialStatus
  
  /** Duration filter (max minutes) */
  maxDuration?: number
  
  /** Tags to include */
  tags?: string[]
  
  /** Show only featured tutorials */
  featuredOnly?: boolean
  
  /** Show only new tutorials */
  newOnly?: boolean
  
  /** Show only recommended tutorials */
  recommendedOnly?: boolean
  
  /** Minimum rating filter */
  minRating?: number
  
  /** Search query */
  searchQuery?: string
}

/**
 * Tutorial search and sort options
 */
export interface TutorialSortOptions {
  /** Sort field */
  sortBy: 'title' | 'difficulty' | 'duration' | 'rating' | 'completion' | 'created' | 'updated'
  
  /** Sort direction */
  sortOrder: 'asc' | 'desc'
}

/**
 * Video tutorial configuration
 */
export interface VideoTutorial {
  /** Tutorial ID this video belongs to */
  tutorialId: string
  
  /** Video URL */
  url: string
  
  /** Video title */
  title: string
  
  /** Video description */
  description: string
  
  /** Video thumbnail */
  thumbnailUrl: string
  
  /** Video duration in seconds */
  duration: number
  
  /** Video quality options */
  qualities: {
    resolution: string
    url: string
    bitrate: number
  }[]
  
  /** Subtitle tracks */
  subtitles: {
    language: string
    label: string
    url: string
  }[]
  
  /** Video chapters/timestamps */
  chapters: {
    title: string
    startTime: number
    endTime: number
    description?: string
  }[]
  
  /** Interactive elements synchronized with video */
  interactions: {
    timestamp: number
    type: 'popup' | 'highlight' | 'question' | 'note'
    content: string
    duration?: number
  }[]
}

/**
 * Mini-game configuration for practice sessions
 */
export interface TutorialMiniGame {
  /** Unique game identifier */
  id: string
  
  /** Game name */
  name: string
  
  /** Game description */
  description: string
  
  /** Game type */
  type: 'pattern_recognition' | 'move_sequence' | 'piece_placement' | 'calculation' | 'memory'
  
  /** Difficulty level */
  difficulty: TutorialDifficulty
  
  /** Game configuration */
  config: {
    timeLimit?: number
    attempts?: number
    targetScore?: number
    positions?: string[]
    sequences?: string[][]
  }
  
  /** Scoring system */
  scoring: {
    pointsPerCorrect: number
    pointsPerIncorrect: number
    timeBonus: boolean
    perfectBonus?: number
  }
  
  /** Instructions */
  instructions: string[]
  
  /** Success criteria */
  successCriteria: {
    minScore: number
    maxAttempts?: number
    timeLimit?: number
  }
}

/**
 * Quick start guide configuration
 */
export interface QuickStartGuide {
  /** Unique guide identifier */
  id: string
  
  /** Guide title */
  title: string
  
  /** Brief description */
  description: string
  
  /** Target user type */
  targetUser: 'beginner' | 'intermediate' | 'advanced' | 'returning'
  
  /** Essential tutorials in order */
  essentialTutorials: string[]
  
  /** Estimated completion time */
  estimatedTime: number
  
  /** Guide steps */
  steps: {
    title: string
    description: string
    tutorialId?: string
    action?: 'tutorial' | 'practice' | 'explore'
  }[]
  
  /** Completion reward */
  reward?: {
    points: number
    achievement?: string
    unlocks?: string[]
  }
}

/**
 * Tutorial statistics
 */
export interface TutorialStatistics {
  /** Total tutorials available */
  totalTutorials: number
  
  /** Tutorials completed */
  completedTutorials: number
  
  /** Tutorials in progress */
  inProgressTutorials: number
  
  /** Total time spent in hours */
  totalTimeSpent: number
  
  /** Average completion rate */
  averageCompletionRate: number
  
  /** Favorite category */
  favoriteCategory: TutorialCategory
  
  /** Achievements unlocked */
  achievementsUnlocked: number
  
  /** Total achievement points */
  totalPoints: number
  
  /** Learning streak (consecutive days) */
  learningStreak: number
  
  /** Completion by category */
  completionByCategory: Record<TutorialCategory, {
    total: number
    completed: number
    percentage: number
  }>
  
  /** Progress over time */
  progressHistory: {
    date: number
    tutorialsCompleted: number
    timeSpent: number
    points: number
  }[]
  
  /** Recent activity */
  recentActivity: {
    tutorialId: string
    action: 'started' | 'completed' | 'resumed'
    timestamp: number
  }[]
}

/**
 * Tutorial series grouping related tutorials
 */
export interface TutorialSeries {
  /** Unique series identifier */
  id: string
  
  /** Series title */
  title: string
  
  /** Series description */
  description: string
  
  /** Array of tutorial IDs in the series */
  tutorials: string[]
  
  /** Total duration estimate */
  totalDuration: string
  
  /** Series difficulty level */
  level: TutorialDifficulty
  
  /** Number of completed tutorials in series */
  completed: number
  
  /** Total number of tutorials in series */
  total: number
  
  /** Series thumbnail/icon */
  thumbnail: string
  
  /** Series instructor */
  instructor: string
  
  /** Series category */
  category: TutorialCategory
  
  /** Whether series is popular */
  isPopular?: boolean
}

/**
 * Tutorial recommendation
 */
export interface TutorialRecommendation {
  /** Tutorial being recommended */
  tutorial: Tutorial
  
  /** Recommendation score (0-100) */
  score: number
  
  /** Reason for recommendation */
  reason: 'based_on_progress' | 'popular' | 'difficulty_match' | 'interest_based' | 'prerequisite_completed'
  
  /** Explanation text */
  explanation: string
  
  /** Confidence level */
  confidence: 'low' | 'medium' | 'high'
}

/**
 * Props for tutorial launcher component
 */
export interface TutorialLauncherProps {
  /** Available tutorials */
  tutorials: Tutorial[]
  
  /** User's tutorial progress */
  progress: Record<string, TutorialProgress>
  
  /** Current filters */
  filters: TutorialFilters
  
  /** Current sort options */
  sortOptions: TutorialSortOptions
  
  /** Callback when tutorial is launched */
  onLaunchTutorial: (tutorialId: string) => void
  
  /** Callback when filters change */
  onFiltersChange: (filters: TutorialFilters) => void
  
  /** Callback when sort options change */
  onSortChange: (sortOptions: TutorialSortOptions) => void
  
  /** Whether tutorials are loading */
  isLoading: boolean
  
  /** Theme from store */
  theme: any
}

/**
 * Props for interactive guide component
 */
export interface InteractiveGuideProps {
  /** Current tutorial */
  tutorial: Tutorial
  
  /** User's progress on this tutorial */
  progress: TutorialProgress
  
  /** Current step index */
  currentStep: number
  
  /** Callback when step is completed */
  onStepComplete: (stepIndex: number) => void
  
  /** Callback when step is skipped */
  onStepSkip: (stepIndex: number) => void
  
  /** Callback when tutorial is completed */
  onTutorialComplete: (rating?: TutorialRating, feedback?: string) => void
  
  /** Callback when tutorial is paused */
  onPause: () => void
  
  /** Callback when tutorial is resumed */
  onResume: () => void
  
  /** Callback when tutorial is restarted */
  onRestart: () => void
  
  /** Theme from store */
  theme: any
}

/**
 * Props for progress tracker component
 */
export interface ProgressTrackerProps {
  /** Tutorial statistics */
  statistics: TutorialStatistics
  
  /** Available achievements */
  achievements: TutorialAchievement[]
  
  /** Recent progress data */
  recentProgress: TutorialProgress[]
  
  /** Learning goals */
  learningGoals?: {
    dailyTarget: number
    weeklyTarget: number
    currentStreak: number
    bestStreak: number
  }
  
  /** Theme from store */
  theme: any
}

/**
 * Props for video player component
 */
export interface VideoPlayerProps {
  /** Video tutorial data */
  video: VideoTutorial
  
  /** Current playback time */
  currentTime: number
  
  /** Player state */
  playerState: VideoPlayerState
  
  /** Callback when time updates */
  onTimeUpdate: (time: number) => void
  
  /** Callback when state changes */
  onStateChange: (state: VideoPlayerState) => void
  
  /** Callback when chapter is selected */
  onChapterSelect: (chapterIndex: number) => void
  
  /** Callback when interaction is triggered */
  onInteractionTrigger: (interaction: any) => void
  
  /** Whether controls are visible */
  showControls: boolean
  
  /** Theme from store */
  theme: any
}

/**
 * Props for tutorial feedback component
 */
export interface TutorialFeedbackProps {
  /** Tutorial being rated */
  tutorial: Tutorial
  
  /** Current user rating */
  currentRating?: TutorialRating
  
  /** Current user feedback */
  currentFeedback?: string
  
  /** Callback when rating is submitted */
  onSubmitRating: (rating: TutorialRating, feedback?: string) => void
  
  /** Whether feedback is being submitted */
  isSubmitting: boolean
  
  /** Theme from store */
  theme: any
}

/**
 * Hook return type for useTutorials
 */
export interface TutorialsHookReturn {
  // Tutorial data
  tutorials: Tutorial[]
  videoTutorials: Record<string, VideoTutorial>
  miniGames: TutorialMiniGame[]
  quickStartGuides: QuickStartGuide[]
  
  // User progress
  progress: Record<string, TutorialProgress>
  statistics: TutorialStatistics
  achievements: TutorialAchievement[]
  
  // Current tutorial state
  currentTutorial: Tutorial | null
  currentTutorialProgress: TutorialProgress | null
  isInTutorial: boolean
  
  // Filtering and search
  filteredTutorials: Tutorial[]
  filters: TutorialFilters
  sortOptions: TutorialSortOptions
  searchQuery: string
  
  // Recommendations
  recommendations: TutorialRecommendation[]
  featuredTutorials: Tutorial[]
  recentTutorials: Tutorial[]
  
  // Loading states
  isLoading: boolean
  isVideoLoading: boolean
  isProgressSaving: boolean
  
  // Actions
  launchTutorial: (tutorialId: string) => void
  pauseTutorial: () => void
  resumeTutorial: () => void
  completeTutorial: (rating?: TutorialRating, feedback?: string) => void
  restartTutorial: (tutorialId: string) => void
  completeStep: (stepIndex: number) => void
  skipStep: (stepIndex: number) => void
  goToStep: (stepIndex: number) => void
  
  // Filtering and search
  setFilters: (filters: TutorialFilters) => void
  setSortOptions: (sortOptions: TutorialSortOptions) => void
  setSearchQuery: (query: string) => void
  clearFilters: () => void
  
  // Progress tracking
  updateProgress: (tutorialId: string, progress: Partial<TutorialProgress>) => void
  saveProgress: () => Promise<void>
  
  // Video controls
  playVideo: (tutorialId: string, stepIndex: number) => void
  pauseVideo: () => void
  seekVideo: (time: number) => void
  selectVideoChapter: (chapterIndex: number) => void
  
  // Mini-games
  startMiniGame: (gameId: string) => void
  completeMiniGame: (gameId: string, score: number) => void
  
  // Error handling
  error: string | null
  clearError: () => void
}