/**
 * Study Plans Types
 * Contains all TypeScript interfaces and types for structured learning paths and study plans
 */

/**
 * Study difficulty levels
 */
export type StudyDifficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'Master'

/**
 * Lesson types available in the system
 */
export type LessonType = 
  | 'Theory' 
  | 'Practice' 
  | 'Puzzle' 
  | 'Game Analysis' 
  | 'Opening Study' 
  | 'Endgame Study'
  | 'Tactics'
  | 'Strategy'
  | 'Video'
  | 'Interactive'

/**
 * Completion status for lessons and modules
 */
export type CompletionStatus = 'not_started' | 'in_progress' | 'completed' | 'mastered'

/**
 * Learning path categories
 */
export type LearningCategory = 
  | 'Opening Mastery'
  | 'Tactical Training' 
  | 'Endgame Excellence'
  | 'Strategic Thinking'
  | 'Positional Play'
  | 'Attack & Defense'
  | 'Competition Prep'
  | 'Rating Improvement'

/**
 * Study schedule frequency
 */
export type StudyFrequency = 'Daily' | 'Every Other Day' | 'Weekly' | 'Custom'

/**
 * Achievement badge types
 */
export type BadgeType = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond'

/**
 * Represents a single lesson within a study module
 */
export interface StudyLesson {
  /** Unique lesson identifier */
  id: string
  
  /** Lesson title */
  title: string
  
  /** Lesson type classification */
  type: LessonType
  
  /** Brief description */
  description: string
  
  /** Estimated completion time in minutes */
  estimatedTime: number
  
  /** Lesson difficulty level */
  difficulty: StudyDifficulty
  
  /** Prerequisites lesson IDs */
  prerequisites: string[]
  
  /** Learning objectives */
  objectives: string[]
  
  /** Lesson content structure */
  content: {
    /** Main content sections */
    sections: LessonSection[]
    /** Interactive elements */
    interactive: InteractiveElement[]
    /** Assessment questions */
    assessment?: AssessmentQuestion[]
  }
  
  /** Completion tracking */
  completion: {
    status: CompletionStatus
    score?: number
    completedAt?: number
    timeSpent: number
    attempts: number
  }
  
  /** Gaming elements */
  gamification: {
    xpReward: number
    badgeReward?: string
    unlockReward?: string[]
  }
  
  /** Order within module */
  order: number
  
  /** Whether lesson is unlocked */
  isUnlocked: boolean
}

/**
 * Lesson content section
 */
export interface LessonSection {
  /** Section identifier */
  id: string
  
  /** Section title */
  title: string
  
  /** Section type */
  type: 'text' | 'video' | 'diagram' | 'interactive' | 'quiz'
  
  /** Section content */
  content: string
  
  /** Chess position (if applicable) */
  position?: string
  
  /** Additional resources */
  resources?: string[]
  
  /** Section order */
  order: number
}

/**
 * Interactive lesson element
 */
export interface InteractiveElement {
  /** Element identifier */
  id: string
  
  /** Element type */
  type: 'puzzle' | 'position_trainer' | 'move_practice' | 'quiz' | 'simulation'
  
  /** Element title */
  title: string
  
  /** Configuration for the interactive element */
  config: Record<string, any>
  
  /** Points awarded for completion */
  points: number
}

/**
 * Assessment question for lesson evaluation
 */
export interface AssessmentQuestion {
  /** Question identifier */
  id: string
  
  /** Question type */
  type: 'multiple_choice' | 'true_false' | 'move_input' | 'position_evaluation'
  
  /** Question text */
  question: string
  
  /** Answer options (for multiple choice) */
  options?: string[]
  
  /** Correct answer */
  correctAnswer: string | string[]
  
  /** Explanation of the answer */
  explanation: string
  
  /** Points value */
  points: number
}

/**
 * Represents a study module containing multiple lessons
 */
export interface StudyModule {
  /** Unique module identifier */
  id: string
  
  /** Module title */
  title: string
  
  /** Module description */
  description: string
  
  /** Module category */
  category: LearningCategory
  
  /** Module difficulty level */
  difficulty: StudyDifficulty
  
  /** Estimated total completion time in hours */
  estimatedHours: number
  
  /** Module icon/image */
  icon: string
  
  /** Lessons in this module */
  lessons: StudyLesson[]
  
  /** Module prerequisites */
  prerequisites: string[]
  
  /** Learning outcomes */
  learningOutcomes: string[]
  
  /** Module completion tracking */
  completion: {
    status: CompletionStatus
    progress: number // 0-100
    lessonsCompleted: number
    totalLessons: number
    completedAt?: number
    certificateEarned: boolean
  }
  
  /** Module order in learning path */
  order: number
  
  /** Whether module is unlocked */
  isUnlocked: boolean
}

/**
 * Represents a complete learning path
 */
export interface LearningPath {
  /** Unique path identifier */
  id: string
  
  /** Path title */
  title: string
  
  /** Path description */
  description: string
  
  /** Target skill level */
  targetLevel: StudyDifficulty
  
  /** Path category */
  category: LearningCategory
  
  /** Path image/thumbnail */
  thumbnail: string
  
  /** Estimated total completion time in hours */
  totalHours: number
  
  /** Study modules in this path */
  modules: StudyModule[]
  
  /** Path prerequisites */
  prerequisites: {
    minRating?: number
    completedPaths?: string[]
    achievements?: string[]
  }
  
  /** Path completion tracking */
  completion: {
    status: CompletionStatus
    progress: number // 0-100
    modulesCompleted: number
    totalModules: number
    startedAt?: number
    completedAt?: number
    estimatedCompletionDate?: number
  }
  
  /** Path popularity and ratings */
  metrics: {
    enrolledUsers: number
    averageRating: number
    completionRate: number
    difficultyRating: number
  }
  
  /** Whether path is unlocked for user */
  isUnlocked: boolean
  
  /** Whether user is enrolled */
  isEnrolled: boolean
}

/**
 * Study schedule configuration
 */
export interface StudySchedule {
  /** Schedule identifier */
  id: string
  
  /** Study frequency */
  frequency: StudyFrequency
  
  /** Preferred study times */
  preferredTimes: {
    hour: number
    minute: number
  }[]
  
  /** Days of week (0 = Sunday) */
  daysOfWeek: number[]
  
  /** Session duration in minutes */
  sessionDuration: number
  
  /** Daily study goal in minutes */
  dailyGoal: number
  
  /** Weekly study goal in hours */
  weeklyGoal: number
  
  /** Schedule is active */
  isActive: boolean
  
  /** Next scheduled session */
  nextSession?: {
    date: number
    plannedContent: string[]
  }
}

/**
 * Achievement badge
 */
export interface AchievementBadge {
  /** Badge identifier */
  id: string
  
  /** Badge name */
  name: string
  
  /** Badge description */
  description: string
  
  /** Badge type/tier */
  type: BadgeType
  
  /** Badge icon */
  icon: string
  
  /** Unlock criteria */
  criteria: {
    type: 'lessons_completed' | 'paths_finished' | 'streak' | 'score' | 'time_spent'
    threshold: number
    category?: LearningCategory
  }
  
  /** Badge rarity */
  rarity: number // 0-100
  
  /** Whether badge is earned */
  isEarned: boolean
  
  /** When badge was earned */
  earnedAt?: number
  
  /** XP reward for earning */
  xpReward: number
}

/**
 * User study progress and statistics
 */
export interface StudyProgress {
  /** User identifier */
  userId: string
  
  /** Total study time in minutes */
  totalStudyTime: number
  
  /** Current study streak in days */
  currentStreak: number
  
  /** Longest study streak in days */
  longestStreak: number
  
  /** Total XP earned */
  totalXP: number
  
  /** Current level */
  level: number
  
  /** XP needed for next level */
  xpToNextLevel: number
  
  /** Learning paths progress */
  pathProgress: Record<string, {
    enrolledAt: number
    progress: number
    lastStudied: number
    timeSpent: number
  }>
  
  /** Completed achievements */
  achievements: AchievementBadge[]
  
  /** Study statistics */
  stats: {
    lessonsCompleted: number
    modulesCompleted: number
    pathsCompleted: number
    averageScore: number
    favoriteCategory: LearningCategory
    weeklyActivity: number[]
  }
  
  /** Current study schedule */
  schedule?: StudySchedule
  
  /** Recent study sessions */
  recentSessions: StudySession[]
}

/**
 * Individual study session record
 */
export interface StudySession {
  /** Session identifier */
  id: string
  
  /** Session start time */
  startTime: number
  
  /** Session end time */
  endTime: number
  
  /** Session duration in minutes */
  duration: number
  
  /** Content studied */
  contentStudied: {
    pathId: string
    moduleId: string
    lessonId: string
    completionStatus: CompletionStatus
  }[]
  
  /** XP earned this session */
  xpEarned: number
  
  /** Session performance */
  performance: {
    accuracy: number
    speed: number
    engagement: number
  }
  
  /** Session notes */
  notes?: string
}

/**
 * Custom study plan created by user
 */
export interface CustomStudyPlan {
  /** Plan identifier */
  id: string
  
  /** Plan name */
  name: string
  
  /** Plan description */
  description: string
  
  /** Selected lessons from various paths */
  selectedLessons: {
    pathId: string
    moduleId: string
    lessonId: string
    order: number
  }[]
  
  /** Plan schedule */
  schedule: StudySchedule
  
  /** Plan goals */
  goals: {
    targetCompletion: number
    dailyTime: number
    specificObjectives: string[]
  }
  
  /** Plan creation and modification */
  createdAt: number
  modifiedAt: number
  
  /** Plan progress */
  progress: {
    status: CompletionStatus
    completion: number
    lessonsCompleted: number
    totalLessons: number
  }
}

/**
 * Study recommendations based on user progress
 */
export interface StudyRecommendation {
  /** Recommendation identifier */
  id: string
  
  /** Recommendation type */
  type: 'next_lesson' | 'review' | 'challenge' | 'weak_area' | 'new_path'
  
  /** Recommended content */
  content: {
    pathId: string
    moduleId: string
    lessonId: string
  }
  
  /** Recommendation reason */
  reason: string
  
  /** Recommendation priority */
  priority: 'low' | 'medium' | 'high' | 'urgent'
  
  /** Estimated benefit */
  expectedBenefit: string
  
  /** Recommendation expires */
  expiresAt: number
}

/**
 * Props for PlanOverview component
 */
export interface PlanOverviewProps {
  /** Available learning paths */
  learningPaths: LearningPath[]
  
  /** User's progress data */
  progress: StudyProgress
  
  /** Selected path */
  selectedPath: LearningPath | null
  
  /** Callback when path is selected */
  onPathSelect: (path: LearningPath) => void
  
  /** Callback when enrolling in path */
  onEnroll: (pathId: string) => void
  
  /** Theme from store */
  theme: any
}

/**
 * Props for LessonViewer component
 */
export interface LessonViewerProps {
  /** Current lesson */
  lesson: StudyLesson | null
  
  /** Callback when lesson is completed */
  onLessonComplete: (lessonId: string, score: number) => void
  
  /** Callback when navigating to next lesson */
  onNextLesson: () => void
  
  /** Callback when navigating to previous lesson */
  onPrevLesson: () => void
  
  /** Whether lesson is loading */
  isLoading: boolean
  
  /** Theme from store */
  theme: any
}

/**
 * Props for ProgressTracker component
 */
export interface ProgressTrackerProps {
  /** User's study progress */
  progress: StudyProgress
  
  /** Current learning path */
  currentPath: LearningPath | null
  
  /** Study goals */
  goals: {
    dailyTime: number
    weeklyTime: number
    monthlyGoals: string[]
  }
  
  /** Theme from store */
  theme: any
}

/**
 * Props for StudyScheduler component
 */
export interface StudySchedulerProps {
  /** Current schedule */
  schedule: StudySchedule | null
  
  /** Callback when schedule is updated */
  onScheduleUpdate: (schedule: StudySchedule) => void
  
  /** Study recommendations */
  recommendations: StudyRecommendation[]
  
  /** Theme from store */
  theme: any
}

/**
 * Props for AchievementBadges component
 */
export interface AchievementBadgesProps {
  /** All available badges */
  badges: AchievementBadge[]
  
  /** Recently earned badges */
  recentBadges: AchievementBadge[]
  
  /** User's current progress toward badges */
  badgeProgress: Record<string, number>
  
  /** Theme from store */
  theme: any
}

/**
 * Hook return type for useStudyPlans
 */
export interface StudyPlansHookReturn {
  // State data
  learningPaths: LearningPath[]
  studyProgress: StudyProgress
  availableBadges: AchievementBadge[]
  studySchedule: StudySchedule | null
  recommendations: StudyRecommendation[]
  customPlans: CustomStudyPlan[]
  
  // Current selections
  selectedPath: LearningPath | null
  currentModule: StudyModule | null
  currentLesson: StudyLesson | null
  
  // Loading states
  isLoading: boolean
  isLessonLoading: boolean
  
  // Actions
  selectPath: (path: LearningPath) => void
  enrollInPath: (pathId: string) => Promise<void>
  selectModule: (module: StudyModule) => void
  selectLesson: (lesson: StudyLesson) => void
  completeLesson: (lessonId: string, score: number) => Promise<void>
  updateSchedule: (schedule: StudySchedule) => Promise<void>
  createCustomPlan: (plan: Omit<CustomStudyPlan, 'id' | 'createdAt' | 'modifiedAt'>) => Promise<void>
  
  // Navigation
  navigateToNextLesson: () => boolean
  navigateToPrevLesson: () => boolean
  
  // Progress utilities
  calculatePathProgress: (pathId: string) => number
  getRecommendedContent: () => StudyRecommendation[]
  getStudyStreak: () => number
  getTodaysGoalProgress: () => number
  
  // Error handling
  error: string | null
  clearError: () => void
  
  // UI handlers
  handleTabChange: (tab: string) => void
  handleLessonComplete: (lessonId: string, score: number) => Promise<void>
  getTabIcon: (tab: string) => React.ReactNode
}

/**
 * Service interface for study plans operations
 */
export interface StudyPlansService {
  /** Load all available learning paths */
  loadLearningPaths: () => Promise<LearningPath[]>
  
  /** Load user's study progress */
  loadStudyProgress: (userId: string) => Promise<StudyProgress>
  
  /** Enroll user in a learning path */
  enrollInPath: (userId: string, pathId: string) => Promise<boolean>
  
  /** Complete a lesson */
  completeLesson: (userId: string, lessonId: string, score: number) => Promise<boolean>
  
  /** Update study schedule */
  updateSchedule: (userId: string, schedule: StudySchedule) => Promise<boolean>
  
  /** Get personalized recommendations */
  getRecommendations: (userId: string) => Promise<StudyRecommendation[]>
  
  /** Create custom study plan */
  createCustomPlan: (userId: string, plan: CustomStudyPlan) => Promise<string>
  
  /** Record study session */
  recordStudySession: (userId: string, session: StudySession) => Promise<boolean>
}