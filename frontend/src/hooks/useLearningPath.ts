import { useState, useEffect, useCallback, useRef } from 'react'
import { soundFX } from '@/utils/soundEffects'
import { generatePersonalizedLearningPath } from '@/data/adaptiveLearning'
import type {
  PersonalizedLearningPath,
  SkillNode,
  LearningRecommendation,
  StudySessionPlan,
  LearningObjective,
  WeakArea,
  LearningPathHookReturn
} from '@/types/learningPath'

/**
 * Custom hook for managing personalized learning path state and logic
 * Handles skill tree visualization, recommendations, progress tracking, and adaptive learning
 */
export const useLearningPath = (): LearningPathHookReturn => {
  // Core state
  const [learningPath, setLearningPath] = useState<PersonalizedLearningPath | null>(null)
  const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(null)
  const [currentView, setCurrentView] = useState<'tree' | 'timeline' | 'analytics' | 'planning'>('tree')

  // Loading states
  const [isLoading, setIsLoading] = useState(true)
  const [isGeneratingRecommendations, setIsGeneratingRecommendations] = useState(false)
  const [isUpdatingPath, setIsUpdatingPath] = useState(false)

  // Error handling
  const [error, setError] = useState<string | null>(null)

  // Refs for cleanup
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  /**
   * Initialize learning path data on component mount
   */
  useEffect(() => {
    const initializeLearningPath = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Simulate API delay for realistic loading experience
        await new Promise(resolve => setTimeout(resolve, 1200))
        
        const path = generatePersonalizedLearningPath()
        setLearningPath(path)
        
        // Auto-select a featured skill if available
        const featuredSkill = path.skillTree.nodes.find(node => node.isFeatured)
        if (featuredSkill) {
          setSelectedSkill(featuredSkill)
        }
        
        soundFX.playClick()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load learning path')
        soundFX.playError()
      } finally {
        setIsLoading(false)
      }
    }

    initializeLearningPath()

    // Cleanup on unmount
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current)
      }
    }
  }, [])

  /**
   * Auto-refresh recommendations and analytics periodically
   */
  useEffect(() => {
    if (!learningPath) return

    const refreshInterval = setInterval(() => {
      refreshRecommendations()
    }, 5 * 60 * 1000) // Every 5 minutes

    return () => clearInterval(refreshInterval)
  }, [learningPath])

  /**
   * Select a skill node in the skill tree
   */
  const selectSkill = useCallback((skill: SkillNode) => {
    setSelectedSkill(skill)
    soundFX.playClick()
    
    // Update last accessed time for analytics
    if (learningPath) {
      const updatedNodes = learningPath.skillTree.nodes.map(node =>
        node.id === skill.id
          ? { ...node, metrics: { ...node.metrics, lastPracticed: Date.now() } }
          : node
      )
      
      setLearningPath(prev => prev ? {
        ...prev,
        skillTree: { ...prev.skillTree, nodes: updatedNodes },
        lastUpdated: Date.now()
      } : prev)
    }
  }, [learningPath])

  /**
   * Focus on a specific skill for targeted study
   */
  const focusOnSkill = useCallback(async (skillId: string) => {
    if (!learningPath) return

    setIsUpdatingPath(true)
    setError(null)

    try {
      const skill = learningPath.skillTree.nodes.find(node => node.id === skillId)
      if (!skill) {
        throw new Error('Skill not found')
      }

      // Mark skill as featured and generate focused recommendations
      const updatedNodes = learningPath.skillTree.nodes.map(node => ({
        ...node,
        isFeatured: node.id === skillId
      }))

      // Generate new recommendations focused on this skill
      const focusedRecommendations = learningPath.recommendations.map(rec => ({
        ...rec,
        priority: rec.targetSkill.id === skillId ? 'High' as const : rec.priority
      }))

      // Create a focused study session plan
      const focusedSession: StudySessionPlan = {
        id: `focus-${skillId}-${Date.now()}`,
        title: `Focused Study: ${skill.name}`,
        plannedStartTime: Date.now() + (30 * 60 * 1000), // 30 minutes from now
        estimatedDuration: 45,
        intensity: 'Intensive',
        plannedContent: [
          {
            skillId: skillId,
            contentType: 'practice',
            estimatedTime: 35,
            priority: 'High'
          },
          {
            skillId: skillId,
            contentType: 'assessment',
            estimatedTime: 10,
            priority: 'Medium'
          }
        ],
        goals: {
          primary: [`Improve ${skill.name} mastery`, 'Address identified weaknesses'],
          secondary: ['Build confidence in this area'],
          stretch: ['Achieve breakthrough performance']
        },
        prerequisites: skill.prerequisites.map(prereqId => ({
          skillId: prereqId,
          required: true,
          current: learningPath.skillTree.nodes.find(n => n.id === prereqId)?.masteryProgress || 0,
          minimum: 50
        })),
        successMetrics: {
          targetAccuracy: Math.max(75, skill.metrics.successRate * 100 + 10),
          targetCompletion: 90,
          skillImprovement: 10
        }
      }

      setLearningPath(prev => prev ? {
        ...prev,
        skillTree: { ...prev.skillTree, nodes: updatedNodes },
        recommendations: focusedRecommendations,
        plannedSessions: [focusedSession, ...prev.plannedSessions.slice(0, 4)],
        lastUpdated: Date.now()
      } : prev)

      setSelectedSkill(skill)
      soundFX.playSuccess()
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to focus on skill')
      soundFX.playError()
    } finally {
      setIsUpdatingPath(false)
    }
  }, [learningPath])

  /**
   * Change the current view mode
   */
  const changeView = useCallback((view: 'tree' | 'timeline' | 'analytics' | 'planning') => {
    setCurrentView(view)
    soundFX.playClick()
  }, [])

  /**
   * Accept a learning recommendation
   */
  const acceptRecommendation = useCallback(async (recommendationId: string) => {
    if (!learningPath) return

    setIsUpdatingPath(true)
    setError(null)

    try {
      const recommendation = learningPath.recommendations.find(rec => rec.id === recommendationId)
      if (!recommendation) {
        throw new Error('Recommendation not found')
      }

      // Create a study session based on the recommendation
      const sessionPlan: StudySessionPlan = {
        id: `rec-${recommendationId}-${Date.now()}`,
        title: `Recommended: ${recommendation.targetSkill.name}`,
        plannedStartTime: Date.now() + (60 * 60 * 1000), // 1 hour from now
        estimatedDuration: recommendation.recommendedContent.reduce((sum, content) => sum + content.estimatedTime, 0),
        intensity: recommendation.priority === 'High' ? 'Intensive' : 'Moderate',
        plannedContent: recommendation.recommendedContent.map(content => ({
          skillId: recommendation.targetSkill.id,
          contentType: 'practice' as const,
          estimatedTime: content.estimatedTime,
          priority: recommendation.priority
        })),
        goals: {
          primary: [recommendation.reasoning],
          secondary: [`Expected ${recommendation.expectedImprovement.skillIncrease}% skill increase`],
          stretch: ['Exceed expected improvement targets']
        },
        prerequisites: recommendation.targetSkill.prerequisites.map(prereqId => ({
          skillId: prereqId,
          required: true,
          current: learningPath.skillTree.nodes.find(n => n.id === prereqId)?.masteryProgress || 0,
          minimum: 40
        })),
        successMetrics: {
          targetAccuracy: 80,
          targetCompletion: 90,
          skillImprovement: recommendation.expectedImprovement.skillIncrease
        }
      }

      // Remove accepted recommendation and add new session
      const updatedRecommendations = learningPath.recommendations.filter(rec => rec.id !== recommendationId)
      const updatedSessions = [sessionPlan, ...learningPath.plannedSessions]

      setLearningPath(prev => prev ? {
        ...prev,
        recommendations: updatedRecommendations,
        plannedSessions: updatedSessions,
        lastUpdated: Date.now()
      } : prev)

      soundFX.playSuccess()
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to accept recommendation')
      soundFX.playError()
    } finally {
      setIsUpdatingPath(false)
    }
  }, [learningPath])

  /**
   * Dismiss a learning recommendation
   */
  const dismissRecommendation = useCallback((recommendationId: string) => {
    if (!learningPath) return

    const updatedRecommendations = learningPath.recommendations.filter(rec => rec.id !== recommendationId)
    
    setLearningPath(prev => prev ? {
      ...prev,
      recommendations: updatedRecommendations,
      lastUpdated: Date.now()
    } : prev)

    soundFX.playClick()
  }, [learningPath])

  /**
   * Schedule a new study session
   */
  const scheduleStudySession = useCallback(async (session: StudySessionPlan) => {
    if (!learningPath) return

    setIsUpdatingPath(true)
    setError(null)

    try {
      // Validate session data
      if (!session.plannedContent.length) {
        throw new Error('Study session must have content')
      }

      const updatedSessions = [...learningPath.plannedSessions, session]
        .sort((a, b) => a.plannedStartTime - b.plannedStartTime)
        .slice(0, 10) // Keep only next 10 sessions

      setLearningPath(prev => prev ? {
        ...prev,
        plannedSessions: updatedSessions,
        lastUpdated: Date.now()
      } : prev)

      soundFX.playSuccess()
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to schedule session')
      soundFX.playError()
    } finally {
      setIsUpdatingPath(false)
    }
  }, [learningPath])

  /**
   * Update a learning objective
   */
  const updateObjective = useCallback((objectiveId: string, updates: Partial<LearningObjective>) => {
    if (!learningPath) return

    const updatedObjectives = learningPath.objectives.map(obj =>
      obj.id === objectiveId ? { ...obj, ...updates } : obj
    )

    setLearningPath(prev => prev ? {
      ...prev,
      objectives: updatedObjectives,
      lastUpdated: Date.now()
    } : prev)

    soundFX.playClick()
  }, [learningPath])

  /**
   * Celebrate a milestone achievement
   */
  const celebrateMilestone = useCallback((milestoneId: string) => {
    if (!learningPath) return

    const milestone = learningPath.milestones.find(m => m.id === milestoneId)
    if (!milestone || milestone.status === 'achieved') return

    const updatedMilestones = learningPath.milestones.map(m =>
      m.id === milestoneId ? { 
        ...m, 
        status: 'achieved' as const, 
        achievedAt: Date.now() 
      } : m
    )

    setLearningPath(prev => prev ? {
      ...prev,
      milestones: updatedMilestones,
      lastUpdated: Date.now()
    } : prev)

    // Play celebration sound and potentially show visual celebration
    soundFX.playSuccess()
    
    // Could trigger celebration animation here
    setTimeout(() => {
      soundFX.playClick() // Secondary celebration sound
    }, 500)
  }, [learningPath])

  /**
   * Get progress for a specific skill
   */
  const getSkillProgress = useCallback((skillId: string): number => {
    if (!learningPath) return 0
    
    const skill = learningPath.skillTree.nodes.find(node => node.id === skillId)
    return skill?.masteryProgress || 0
  }, [learningPath])

  /**
   * Get recommended next steps
   */
  const getRecommendedNextSteps = useCallback((): LearningRecommendation[] => {
    if (!learningPath) return []
    
    return learningPath.recommendations
      .filter(rec => rec.priority === 'High' || rec.priority === 'Critical')
      .sort((a, b) => {
        const priorityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 }
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      })
      .slice(0, 3)
  }, [learningPath])

  /**
   * Get weakest skill areas
   */
  const getWeakestAreas = useCallback((): WeakArea[] => {
    if (!learningPath) return []
    
    return learningPath.weakAreas
      .sort((a, b) => {
        const severityOrder = { 'Critical': 4, 'Significant': 3, 'Moderate': 2, 'Minor': 1 }
        return severityOrder[b.severity] - severityOrder[a.severity]
      })
      .slice(0, 3)
  }, [learningPath])

  /**
   * Predict improvement for a specific skill
   */
  const getPredictedImprovement = useCallback((skillId: string): number => {
    if (!learningPath) return 0

    const skill = learningPath.skillTree.nodes.find(node => node.id === skillId)
    if (!skill) return 0

    // Simple improvement prediction based on current progress and recent activity
    const currentProgress = skill.masteryProgress
    const timeSinceLastPractice = Date.now() - skill.metrics.lastPracticed
    const daysSinceLastPractice = timeSinceLastPractice / (24 * 60 * 60 * 1000)
    
    // Base improvement potential
    let improvement = 100 - currentProgress
    
    // Adjust based on recency of practice
    if (daysSinceLastPractice > 7) {
      improvement *= 0.7 // Reduce potential if not practiced recently
    } else if (daysSinceLastPractice < 1) {
      improvement *= 1.2 // Increase potential if practiced recently
    }
    
    // Adjust based on success rate
    improvement *= (skill.metrics.successRate + 0.5) // Range: 0.5-1.5
    
    return Math.min(Math.max(improvement, 5), 50) // Cap between 5-50 points
  }, [learningPath])

  /**
   * Refresh recommendations based on current progress
   */
  const refreshRecommendations = useCallback(async (): Promise<void> => {
    if (!learningPath) return

    setIsGeneratingRecommendations(true)
    setError(null)

    try {
      // Simulate AI recommendation generation
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // In a real app, this would call an AI service
      // For now, we'll simulate new recommendations based on current state
      const newRecommendations = learningPath.recommendations.map(rec => ({
        ...rec,
        confidence: Math.max(0.5, Math.min(0.95, rec.confidence + (Math.random() - 0.5) * 0.1)),
        expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000)
      }))

      setLearningPath(prev => prev ? {
        ...prev,
        recommendations: newRecommendations,
        lastUpdated: Date.now()
      } : prev)

      soundFX.playClick()
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh recommendations')
    } finally {
      setIsGeneratingRecommendations(false)
    }
  }, [learningPath])

  /**
   * Generate a personalized study plan
   */
  const generateStudyPlan = useCallback(async (preferences: any): Promise<StudySessionPlan[]> => {
    if (!learningPath) return []

    setIsUpdatingPath(true)
    
    try {
      // Simulate plan generation
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Generate sessions based on weak areas and preferences
      const planSessions: StudySessionPlan[] = []
      const weakSkills = learningPath.weakAreas.slice(0, 2)
      
      for (let i = 0; i < 5; i++) {
        const targetWeakArea = weakSkills[i % weakSkills.length]
        const session: StudySessionPlan = {
          id: `plan-session-${i + 1}`,
          title: `Study Plan Day ${i + 1}: ${targetWeakArea?.category || 'General Practice'}`,
          plannedStartTime: Date.now() + ((i + 1) * 24 * 60 * 60 * 1000),
          estimatedDuration: preferences.sessionLength || 45,
          intensity: preferences.intensity || 'Moderate',
          plannedContent: [
            {
              skillId: targetWeakArea?.affectedSkills[0] || 'basic-tactics',
              contentType: 'practice',
              estimatedTime: 30,
              priority: 'High'
            },
            {
              skillId: targetWeakArea?.affectedSkills[0] || 'basic-tactics',
              contentType: 'review',
              estimatedTime: 15,
              priority: 'Medium'
            }
          ],
          goals: {
            primary: [`Improve ${targetWeakArea?.category || 'chess skills'}`],
            secondary: ['Build consistency', 'Increase confidence'],
            stretch: ['Achieve breakthrough performance']
          },
          prerequisites: [],
          successMetrics: {
            targetAccuracy: 75,
            targetCompletion: 85,
            skillImprovement: 8
          }
        }
        planSessions.push(session)
      }

      return planSessions
      
    } finally {
      setIsUpdatingPath(false)
    }
  }, [learningPath])

  /**
   * Export progress data
   */
  const exportProgress = useCallback((): any => {
    if (!learningPath) return null

    return {
      exportDate: Date.now(),
      userId: learningPath.userId,
      overallProgress: learningPath.progress,
      skillProgress: learningPath.skillTree.nodes.map(node => ({
        skillId: node.id,
        name: node.name,
        masteryLevel: node.masteryLevel,
        masteryProgress: node.masteryProgress,
        timeSpent: node.metrics.timeSpent,
        successRate: node.metrics.successRate
      })),
      objectives: learningPath.objectives,
      achievements: learningPath.milestones.filter(m => m.status === 'achieved'),
      analytics: learningPath.analytics
    }
  }, [learningPath])

  /**
   * Clear error message
   */
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    // Core data
    learningPath,
    selectedSkill,
    currentView,

    // Loading states
    isLoading,
    isGeneratingRecommendations,
    isUpdatingPath,

    // Actions
    selectSkill,
    focusOnSkill,
    changeView,
    acceptRecommendation,
    dismissRecommendation,
    scheduleStudySession,
    updateObjective,
    celebrateMilestone,

    // Analytics and insights
    getSkillProgress,
    getRecommendedNextSteps,
    getWeakestAreas,
    getPredictedImprovement,

    // Utilities
    refreshRecommendations,
    generateStudyPlan,
    exportProgress,

    // Error handling
    error,
    clearError
  }
}