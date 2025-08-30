/**
 * Learning Path Types
 * Contains all TypeScript interfaces and types for personalized learning paths and skill tree visualization
 */

/**
 * Skill mastery levels
 */
export type SkillLevel = 'Not Started' | 'Beginner' | 'Developing' | 'Proficient' | 'Advanced' | 'Mastered'

/**
 * Learning path difficulty progression
 */
export type PathDifficulty = 'Foundation' | 'Intermediate' | 'Advanced' | 'Expert' | 'Master'

/**
 * Skill categories in chess learning
 */
export type SkillCategory = 
  | 'Opening Theory'
  | 'Tactical Patterns' 
  | 'Endgame Technique'
  | 'Positional Understanding'
  | 'Calculation Skills'
  | 'Strategic Planning'
  | 'Time Management'
  | 'Psychological Preparation'

/**
 * Learning objective types
 */
export type LearningObjectiveType = 
  | 'Knowledge'
  | 'Application' 
  | 'Analysis'
  | 'Synthesis'
  | 'Evaluation'

/**
 * Recommendation priority levels
 */
export type RecommendationPriority = 'Low' | 'Medium' | 'High' | 'Critical'

/**
 * Study session intensity levels
 */
export type SessionIntensity = 'Light' | 'Moderate' | 'Intensive' | 'Tournament Prep'

/**
 * Represents a single skill node in the skill tree
 */
export interface SkillNode {
  /** Unique skill identifier */
  id: string
  
  /** Skill name */
  name: string
  
  /** Skill description */
  description: string
  
  /** Skill category */
  category: SkillCategory
  
  /** Current mastery level */
  masteryLevel: SkillLevel
  
  /** Mastery progress (0-100) */
  masteryProgress: number
  
  /** Prerequisites skill IDs */
  prerequisites: string[]
  
  /** Skills unlocked by mastering this */
  unlocks: string[]
  
  /** Position in skill tree visualization */
  position: {
    x: number
    y: number
    level: number
  }
  
  /** Visual representation */
  visual: {
    icon: string
    color: string
    shape: 'circle' | 'diamond' | 'hexagon' | 'star'
    glowIntensity: number
  }
  
  /** Associated learning content */
  associatedContent: {
    pathId: string
    moduleId: string
    lessonIds: string[]
  }[]
  
  /** Skill metrics */
  metrics: {
    timeSpent: number // minutes
    practiceAttempts: number
    successRate: number
    lastPracticed: number
    difficulty: PathDifficulty
  }
  
  /** Whether skill is currently unlocked */
  isUnlocked: boolean
  
  /** Whether skill is featured/highlighted */
  isFeatured: boolean
}

/**
 * Learning path branch in the skill tree
 */
export interface LearningBranch {
  /** Branch identifier */
  id: string
  
  /** Branch name */
  name: string
  
  /** Branch theme/color */
  theme: string
  
  /** Skills in this branch */
  skillIds: string[]
  
  /** Branch completion progress */
  completion: {
    skillsMastered: number
    totalSkills: number
    percentage: number
  }
  
  /** Branch difficulty */
  difficulty: PathDifficulty
  
  /** Estimated completion time */
  estimatedHours: number
}

/**
 * Personalized learning recommendation
 */
export interface LearningRecommendation {
  /** Recommendation identifier */
  id: string
  
  /** Recommendation type */
  type: 'skill_focus' | 'weakness_improvement' | 'strength_building' | 'balanced_practice' | 'exam_prep'
  
  /** Target skill */
  targetSkill: SkillNode
  
  /** Recommended content */
  recommendedContent: {
    pathId: string
    moduleId: string
    lessonId: string
    estimatedTime: number
  }[]
  
  /** Recommendation rationale */
  reasoning: string
  
  /** Expected improvement */
  expectedImprovement: {
    skillIncrease: number
    masteryGain: number
    timeToComplete: number
  }
  
  /** Priority level */
  priority: RecommendationPriority
  
  /** Confidence score */
  confidence: number // 0-1
  
  /** Personalization factors */
  personalization: {
    basedOnWeaknesses: string[]
    basedOnGoals: string[]
    basedOnHistory: string[]
  }
  
  /** Expires at */
  expiresAt: number
}

/**
 * Learning objective with measurable outcomes
 */
export interface LearningObjective {
  /** Objective identifier */
  id: string
  
  /** Objective title */
  title: string
  
  /** Objective description */
  description: string
  
  /** Objective type */
  type: LearningObjectiveType
  
  /** Target skill */
  targetSkill: string
  
  /** Success criteria */
  criteria: {
    description: string
    target: number
    current: number
    unit: string
    deadline?: number
  }[]
  
  /** Objective progress */
  progress: {
    status: 'not_started' | 'in_progress' | 'completed' | 'overdue'
    completion: number // 0-100
    milestones: {
      id: string
      title: string
      completed: boolean
      completedAt?: number
    }[]
  }
  
  /** Associated study plan */
  studyPlan: {
    totalSessions: number
    completedSessions: number
    nextSession?: number
  }
}

/**
 * Adaptive difficulty adjustment system
 */
export interface AdaptiveDifficulty {
  /** Current difficulty level */
  currentLevel: PathDifficulty
  
  /** Performance metrics */
  performance: {
    accuracy: number
    speed: number
    consistency: number
    improvement: number
  }
  
  /** Adjustment factors */
  adjustmentFactors: {
    recentPerformance: number
    streakBonus: number
    timeSpentFactor: number
    mistakeRecovery: number
  }
  
  /** Recommended next level */
  recommendedLevel: PathDifficulty
  
  /** Confidence in recommendation */
  confidence: number
}

/**
 * Study session planning data
 */
export interface StudySessionPlan {
  /** Session identifier */
  id: string
  
  /** Session title */
  title: string
  
  /** Planned start time */
  plannedStartTime: number
  
  /** Estimated duration in minutes */
  estimatedDuration: number
  
  /** Session intensity */
  intensity: SessionIntensity
  
  /** Planned content */
  plannedContent: {
    skillId: string
    contentType: 'theory' | 'practice' | 'assessment' | 'review'
    estimatedTime: number
    priority: RecommendationPriority
  }[]
  
  /** Session goals */
  goals: {
    primary: string[]
    secondary: string[]
    stretch: string[]
  }
  
  /** Prerequisites check */
  prerequisites: {
    skillId: string
    required: boolean
    current: number
    minimum: number
  }[]
  
  /** Success metrics */
  successMetrics: {
    targetAccuracy: number
    targetCompletion: number
    skillImprovement: number
  }
}

/**
 * Weak area identification and analysis
 */
export interface WeakArea {
  /** Area identifier */
  id: string
  
  /** Skill category */
  category: SkillCategory
  
  /** Specific skills affected */
  affectedSkills: string[]
  
  /** Weakness severity */
  severity: 'Minor' | 'Moderate' | 'Significant' | 'Critical'
  
  /** Analysis data */
  analysis: {
    identifiedAt: number
    confidence: number
    evidenceCount: number
    patterns: string[]
  }
  
  /** Impact assessment */
  impact: {
    currentRating: number
    potentialImprovement: number
    priorityScore: number
  }
  
  /** Recommended improvement plan */
  improvementPlan: {
    targetSkills: string[]
    recommendedContent: string[]
    estimatedTime: number
    expectedOutcome: string
  }
}

/**
 * Learning milestone with celebration
 */
export interface LearningMilestone {
  /** Milestone identifier */
  id: string
  
  /** Milestone title */
  title: string
  
  /** Milestone description */
  description: string
  
  /** Achievement criteria */
  criteria: {
    type: 'skill_mastery' | 'time_milestone' | 'consistency' | 'improvement' | 'breakthrough'
    threshold: number
    current: number
  }
  
  /** Milestone type */
  type: 'daily' | 'weekly' | 'monthly' | 'skill_based' | 'achievement'
  
  /** Celebration data */
  celebration: {
    icon: string
    animation: string
    message: string
    rewards: {
      xp: number
      badges: string[]
      unlocks: string[]
    }
  }
  
  /** Achievement status */
  status: 'pending' | 'achieved' | 'missed'
  
  /** Achievement timestamp */
  achievedAt?: number
}

/**
 * Analytics and insights data
 */
export interface LearningAnalytics {
  /** Time period for analytics */
  period: {
    start: number
    end: number
    type: 'day' | 'week' | 'month' | 'quarter' | 'year'
  }
  
  /** Performance trends */
  trends: {
    skillCategory: SkillCategory
    improvement: number
    trajectory: 'improving' | 'stable' | 'declining'
    confidence: number
  }[]
  
  /** Study patterns */
  patterns: {
    preferredTimes: number[]
    sessionLengths: number[]
    intensityPreference: SessionIntensity
    categoryFocus: SkillCategory[]
  }
  
  /** Achievements summary */
  achievements: {
    skillsMastered: number
    milestonesReached: number
    streaksAchieved: number
    improvementRate: number
  }
  
  /** Predictions */
  predictions: {
    nextMilestone: {
      milestone: string
      estimatedDate: number
      confidence: number
    }
    ratingProjection: {
      timeframe: number
      projected: number
      confidence: number
    }
    optimalSchedule: {
      frequency: number
      duration: number
      intensity: SessionIntensity
    }
  }
}

/**
 * Main learning path interface
 */
export interface PersonalizedLearningPath {
  /** User identifier */
  userId: string
  
  /** Path creation timestamp */
  createdAt: number
  
  /** Last updated timestamp */
  lastUpdated: number
  
  /** Skill tree structure */
  skillTree: {
    nodes: SkillNode[]
    branches: LearningBranch[]
    connections: {
      from: string
      to: string
      type: 'prerequisite' | 'enhancement' | 'alternative'
      strength: number
    }[]
  }
  
  /** Current learning objectives */
  objectives: LearningObjective[]
  
  /** Personalized recommendations */
  recommendations: LearningRecommendation[]
  
  /** Adaptive difficulty settings */
  adaptiveDifficulty: AdaptiveDifficulty
  
  /** Planned study sessions */
  plannedSessions: StudySessionPlan[]
  
  /** Identified weak areas */
  weakAreas: WeakArea[]
  
  /** Learning milestones */
  milestones: LearningMilestone[]
  
  /** Analytics and insights */
  analytics: LearningAnalytics
  
  /** Path preferences */
  preferences: {
    focusAreas: SkillCategory[]
    learningStyle: 'visual' | 'practical' | 'theoretical' | 'mixed'
    pacePreference: 'relaxed' | 'steady' | 'intensive' | 'competitive'
    goalOrientation: 'improvement' | 'rating' | 'tournament' | 'enjoyment'
  }
  
  /** Overall progress summary */
  progress: {
    overallCompletion: number
    skillsStarted: number
    skillsMastered: number
    totalSkills: number
    currentLevel: PathDifficulty
    nextMajorMilestone: string
  }
}

/**
 * Props for SkillTree component
 */
export interface SkillTreeProps {
  /** Skill tree data */
  skillTree: PersonalizedLearningPath['skillTree']
  
  /** Selected skill node */
  selectedSkill: SkillNode | null
  
  /** Callback when skill is selected */
  onSkillSelect: (skill: SkillNode) => void
  
  /** Callback when skill is focused for study */
  onSkillFocus: (skillId: string) => void
  
  /** View mode */
  viewMode: 'overview' | 'category' | 'progress' | 'recommendations'
  
  /** Theme from store */
  theme: any
}

/**
 * Props for PathViewer component
 */
export interface PathViewerProps {
  /** Learning path data */
  learningPath: PersonalizedLearningPath
  
  /** Current view */
  currentView: 'tree' | 'timeline' | 'analytics' | 'planning'
  
  /** Callback when view changes */
  onViewChange: (view: 'tree' | 'timeline' | 'analytics' | 'planning') => void
  
  /** Theme from store */
  theme: any
}

/**
 * Props for RecommendationEngine component
 */
export interface RecommendationEngineProps {
  /** Learning recommendations */
  recommendations: LearningRecommendation[]
  
  /** Weak areas */
  weakAreas: WeakArea[]
  
  /** Callback when recommendation is accepted */
  onRecommendationAccept: (recommendationId: string) => void
  
  /** Callback when recommendation is dismissed */
  onRecommendationDismiss: (recommendationId: string) => void
  
  /** Theme from store */
  theme: any
}

/**
 * Props for LearningAnalytics component
 */
export interface LearningAnalyticsProps {
  /** Analytics data */
  analytics: LearningAnalytics
  
  /** Time period selection */
  selectedPeriod: 'day' | 'week' | 'month' | 'quarter' | 'year'
  
  /** Callback when period changes */
  onPeriodChange: (period: string) => void
  
  /** Theme from store */
  theme: any
}

/**
 * Props for StudyPlanner component
 */
export interface StudyPlannerProps {
  /** Planned study sessions */
  plannedSessions: StudySessionPlan[]
  
  /** Learning objectives */
  objectives: LearningObjective[]
  
  /** Callback when session is scheduled */
  onSessionSchedule: (session: StudySessionPlan) => void
  
  /** Callback when session is modified */
  onSessionModify: (sessionId: string, changes: Partial<StudySessionPlan>) => void
  
  /** Theme from store */
  theme: any
}

/**
 * Props for MilestoneTracker component
 */
export interface MilestoneTrackerProps {
  /** Learning milestones */
  milestones: LearningMilestone[]
  
  /** Recent achievements */
  recentAchievements: LearningMilestone[]
  
  /** Callback when milestone is celebrated */
  onMilestoneCelebrate: (milestoneId: string) => void
  
  /** Theme from store */
  theme: any
}

/**
 * Hook return type for useLearningPath
 */
export interface LearningPathHookReturn {
  // Core data
  learningPath: PersonalizedLearningPath | null
  selectedSkill: SkillNode | null
  currentView: 'tree' | 'timeline' | 'analytics' | 'planning'
  
  // Loading states
  isLoading: boolean
  isGeneratingRecommendations: boolean
  isUpdatingPath: boolean
  
  // Actions
  selectSkill: (skill: SkillNode) => void
  focusOnSkill: (skillId: string) => void
  changeView: (view: 'tree' | 'timeline' | 'analytics' | 'planning') => void
  acceptRecommendation: (recommendationId: string) => Promise<void>
  dismissRecommendation: (recommendationId: string) => void
  scheduleStudySession: (session: StudySessionPlan) => Promise<void>
  updateObjective: (objectiveId: string, updates: Partial<LearningObjective>) => void
  celebrateMilestone: (milestoneId: string) => void
  
  // Analytics and insights
  getSkillProgress: (skillId: string) => number
  getRecommendedNextSteps: () => LearningRecommendation[]
  getWeakestAreas: () => WeakArea[]
  getPredictedImprovement: (skillId: string) => number
  
  // Utilities
  refreshRecommendations: () => Promise<void>
  generateStudyPlan: (preferences: any) => Promise<StudySessionPlan[]>
  exportProgress: () => any
  
  // Error handling
  error: string | null
  clearError: () => void
}