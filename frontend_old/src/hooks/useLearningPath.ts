import { useState, useEffect, useCallback, useRef } from 'react'
import { soundFX } from '@/utils/soundEffects'
import { useLearningPaths } from '@/hooks/learning/useLearningPaths'
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
 * Now uses API hooks instead of mock data
 */
export const useLearningPath = (): LearningPathHookReturn => {
  const {
    useLearningPathList,
    useLearningProgress,
    startLearningPath,
    updateModuleProgress,
    isStartingLearningPath,
    isUpdatingModuleProgress,
    startLearningPathError,
    updateModuleProgressError
  } = useLearningPaths()
  // Core state
  const [learningPath, setLearningPath] = useState<PersonalizedLearningPath | null>(null)
  const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(null)
  const [currentView, setCurrentView] = useState<'tree' | 'timeline' | 'analytics' | 'planning'>('tree')

  // Loading states - now using API hook states
  const [isLoading, setIsLoading] = useState(true)
  const [isGeneratingRecommendations, setIsGeneratingRecommendations] = useState(false)
  const isUpdatingPath = isUpdatingModuleProgress || isStartingLearningPath

  // Error handling - now includes API errors  
  const [error, setError] = useState<string | null>(null)
  const apiError = startLearningPathError || updateModuleProgressError

  // Refs for cleanup
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Use API hooks for data fetching
  const { data: learningPathsData, isLoading: isLoadingPaths, error: pathsError } = useLearningPathList()
  const { data: progressData, isLoading: isLoadingProgress, error: progressError } = useLearningProgress()

  /**
   * Convert API data to expected PersonalizedLearningPath format
   */
  const convertApiDataToLearningPath = useCallback((apiData: any, progress: any): PersonalizedLearningPath => {
    return {
      userId: 'current-user',
      pathId: apiData.id || 'default-path',
      progress: progress?.overallProgress || 0,
      skillTree: {
        nodes: apiData.modules?.map((module: any, index: number) => ({
          id: module.id || `skill-${index}`,
          name: module.title || module.name || `Skill ${index + 1}`,
          description: module.description || `Learn ${module.title || 'this skill'}`,
          masteryLevel: progress?.moduleProgress?.[module.id]?.level || 'Beginner',
          masteryProgress: progress?.moduleProgress?.[module.id]?.progress || 0,
          prerequisites: module.prerequisites || [],
          children: module.subModules?.map((sub: any) => sub.id) || [],
          position: { x: 100 + (index % 4) * 200, y: 100 + Math.floor(index / 4) * 150 },
          isUnlocked: progress?.moduleProgress?.[module.id]?.isUnlocked ?? true,
          isFeatured: index === 0, // First module is featured
          metrics: {
            timeSpent: progress?.moduleProgress?.[module.id]?.timeSpent || 0,
            successRate: progress?.moduleProgress?.[module.id]?.successRate || 0,
            lastPracticed: progress?.moduleProgress?.[module.id]?.lastPracticed || 0,
            totalAttempts: progress?.moduleProgress?.[module.id]?.attempts || 0,
            bestScore: progress?.moduleProgress?.[module.id]?.bestScore || 0
          }
        })) || [],
        connections: apiData.pathConnections || []
      },
      recommendations: generateDefaultRecommendations(apiData, progress),
      objectives: generateDefaultObjectives(apiData),
      milestones: generateDefaultMilestones(apiData, progress),
      weakAreas: generateDefaultWeakAreas(progress),
      plannedSessions: [],
      analytics: generateDefaultAnalytics(progress),
      lastUpdated: Date.now()
    }
  }, [])

  const generateDefaultRecommendations = useCallback((apiData: any, progress: any): LearningRecommendation[] => {
    return apiData.modules?.slice(0, 3).map((module: any, index: number) => ({
      id: `rec-${module.id || index}`,
      targetSkill: {
        id: module.id || `skill-${index}`,
        name: module.title || `Skill ${index + 1}`,
        category: module.category || 'General'
      },
      recommendationType: 'practice' as const,
      priority: ['High', 'Medium', 'Low'][index] as any,
      reasoning: `Focus on ${module.title || 'this area'} to improve your skills`,
      confidence: 0.85 - (index * 0.1),
      expectedImprovement: {
        skillIncrease: 15 - (index * 2),
        timeToAchieve: 7 + (index * 3),
        confidenceInterval: [0.7, 0.95]
      },
      recommendedContent: [{
        contentType: 'practice',
        estimatedTime: 30,
        difficulty: 'intermediate'
      }],
      expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000)
    })) || []
  }, [])

  const generateDefaultObjectives = useCallback((apiData: any): LearningObjective[] => {
    return [{
      id: 'obj-1',
      title: `Master ${apiData.title || 'Learning Path'}`,
      description: 'Complete all modules with high proficiency',
      targetDate: Date.now() + (30 * 24 * 60 * 60 * 1000),
      priority: 'High' as const,
      status: 'active' as const,
      progress: 0,
      milestones: ['Complete 3 modules', 'Achieve 80% average score', 'Pass final assessment']
    }]
  }, [])

  const generateDefaultMilestones = useCallback((apiData: any, progress: any) => {
    return [{
      id: 'milestone-1',
      title: 'First Steps',
      description: 'Complete your first learning module',
      type: 'progress' as const,
      requirement: { type: 'modules_completed' as const, threshold: 1 },
      status: (progress?.completedModules || 0) >= 1 ? 'achieved' as const : 'pending' as const,
      reward: { xp: 100, badge: 'First Steps' },
      achievedAt: (progress?.completedModules || 0) >= 1 ? Date.now() : undefined
    }]
  }, [])

  const generateDefaultWeakAreas = useCallback((progress: any): WeakArea[] => {
    return [{
      id: 'weak-1',
      category: 'Practice Consistency',
      severity: 'Medium' as const,
      description: 'Regular practice will improve retention',
      affectedSkills: ['skill-1', 'skill-2'],
      suggestedActions: ['Set daily study reminders', 'Practice for 15 minutes daily'],
      lastDetected: Date.now(),
      improvementTrend: 'stable' as const
    }]
  }, [])

  const generateDefaultAnalytics = useCallback((progress: any) => {
    return {
      studyTime: {
        thisWeek: progress?.weeklyStudyTime || 120,
        lastWeek: progress?.lastWeekStudyTime || 90,
        trend: 'increasing' as const
      },
      performance: {
        averageScore: progress?.averageScore || 75,
        improvementRate: progress?.improvementRate || 5,
        consistency: progress?.consistency || 70
      },
      engagement: {
        sessionsThisWeek: progress?.sessionsThisWeek || 4,
        averageSessionLength: progress?.averageSessionLength || 30,
        completionRate: progress?.completionRate || 85
      }
    }
  }, [])

  /**
   * Initialize learning path data from API
   */
  useEffect(() => {
    const initializeLearningPath = async () => {
      setIsLoading(isLoadingPaths || isLoadingProgress)
      setError(null)

      try {
        if (pathsError || progressError) {
          throw new Error(pathsError?.message || progressError?.message || 'Failed to load learning data')
        }

        if (learningPathsData && learningPathsData.length > 0) {
          // Convert API data to expected format
          const path = convertApiDataToLearningPath(learningPathsData[0], progressData)
          setLearningPath(path)
          
          // Auto-select a featured skill if available
          const featuredSkill = path.skillTree.nodes.find(node => node.isFeatured)
          if (featuredSkill) {
            setSelectedSkill(featuredSkill)
          }
          
          soundFX.playClick()
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load learning path')
        soundFX.playError()
      } finally {
        setIsLoading(false)
      }
    }

    if (!isLoadingPaths && !isLoadingProgress) {
      initializeLearningPath()
    }

    // Cleanup on unmount
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current)
      }
    }
  }, [learningPathsData, progressData, isLoadingPaths, isLoadingProgress, pathsError, progressError])

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
        // Use centralized priority order
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
        // Use centralized severity order
        const severityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 }
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
    error: error || apiError?.message,
    clearError
  }
}