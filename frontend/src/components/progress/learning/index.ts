/**
 * Learning Path Components
 * Export all learning path related components for easy importing
 */

export { default as SkillTree } from './SkillTree'
export { default as PathViewer } from './PathViewer'
export { default as RecommendationEngine } from './RecommendationEngine'
export { default as LearningAnalytics } from './LearningAnalytics'
export { default as StudyPlanner } from './StudyPlanner'
export { default as MilestoneTracker } from './MilestoneTracker'

// Re-export types for convenience
export type {
  SkillTreeProps,
  PathViewerProps,
  RecommendationEngineProps,
  LearningAnalyticsProps,
  StudyPlannerProps,
  MilestoneTrackerProps
} from '@/types/learningPath'