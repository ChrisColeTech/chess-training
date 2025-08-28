import { useState, useEffect, useCallback, useMemo } from 'react'
import { soundFX } from '@/utils/soundEffects'
import { mockLearningPaths, generateStudyProgress, generateRecommendations } from '@/data/learningPaths'
import type { 
  LearningPath,
  StudyModule,
  StudyLesson,
  StudyProgress,
  AchievementBadge,
  StudySchedule,
  StudyRecommendation,
  CustomStudyPlan,
  StudyPlansHookReturn,
  CompletionStatus
} from '@/types/studyPlans'

/**
 * Custom hook for managing study plans, learning paths, and user progress
 * Handles lesson navigation, progress tracking, and achievement management
 */
export const useStudyPlans = (): StudyPlansHookReturn => {
  // Core data state
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([])
  const [studyProgress, setStudyProgress] = useState<StudyProgress>(generateStudyProgress())
  const [availableBadges, setAvailableBadges] = useState<AchievementBadge[]>([])
  const [studySchedule, setStudySchedule] = useState<StudySchedule | null>(null)
  const [recommendations, setRecommendations] = useState<StudyRecommendation[]>([])
  const [customPlans, setCustomPlans] = useState<CustomStudyPlan[]>([])

  // Current selections
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null)
  const [currentModule, setCurrentModule] = useState<StudyModule | null>(null)
  const [currentLesson, setCurrentLesson] = useState<StudyLesson | null>(null)

  // Loading states
  const [isLoading, setIsLoading] = useState(true)
  const [isLessonLoading, setIsLessonLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Initialize data on component mount
   */
  useEffect(() => {
    const initializeData = async () => {
      try {
        setIsLoading(true)
        
        // Simulate API loading delay
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Load learning paths
        const paths = mockLearningPaths
        setLearningPaths(paths)
        
        // Auto-select first available path
        const firstAvailablePath = paths.find(path => path.isUnlocked && path.isEnrolled)
        if (firstAvailablePath) {
          setSelectedPath(firstAvailablePath)
          
          // Auto-select first unlocked module
          const firstModule = firstAvailablePath.modules.find(module => module.isUnlocked)
          if (firstModule) {
            setCurrentModule(firstModule)
            
            // Auto-select first incomplete lesson
            const nextLesson = firstModule.lessons.find(
              lesson => lesson.isUnlocked && lesson.completion.status !== 'completed'
            ) || firstModule.lessons[0]
            
            if (nextLesson) {
              setCurrentLesson(nextLesson)
            }
          }
        }
        
        // Generate recommendations
        const recs = generateRecommendations()
        setRecommendations(recs)
        
        // Initialize badges
        setAvailableBadges(studyProgress.achievements)
        
        soundFX.playClick()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize study plans')
        soundFX.playError()
      } finally {
        setIsLoading(false)
      }
    }

    initializeData()
  }, [])

  /**
   * Select a learning path
   */
  const selectPath = useCallback((path: LearningPath) => {
    setSelectedPath(path)
    
    // Auto-select appropriate module and lesson
    const firstUnlockedModule = path.modules.find(module => module.isUnlocked)
    if (firstUnlockedModule) {
      setCurrentModule(firstUnlockedModule)
      
      const nextLesson = firstUnlockedModule.lessons.find(
        lesson => lesson.isUnlocked && lesson.completion.status !== 'completed'
      ) || firstUnlockedModule.lessons[0]
      
      if (nextLesson) {
        setCurrentLesson(nextLesson)
      }
    }
    
    soundFX.playClick()
  }, [])

  /**
   * Enroll in a learning path
   */
  const enrollInPath = useCallback(async (pathId: string): Promise<void> => {
    try {
      setIsLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Update path enrollment status
      setLearningPaths(prev => prev.map(path => 
        path.id === pathId 
          ? { ...path, isEnrolled: true }
          : path
      ))
      
      // Update user progress
      setStudyProgress(prev => ({
        ...prev,
        pathProgress: {
          ...prev.pathProgress,
          [pathId]: {
            enrolledAt: Date.now(),
            progress: 0,
            lastStudied: 0,
            timeSpent: 0
          }
        }
      }))
      
      // Find and select the enrolled path
      const enrolledPath = learningPaths.find(path => path.id === pathId)
      if (enrolledPath) {
        selectPath({ ...enrolledPath, isEnrolled: true })
      }
      
      soundFX.playSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to enroll in learning path')
      soundFX.playError()
    } finally {
      setIsLoading(false)
    }
  }, [learningPaths, selectPath])

  /**
   * Select a study module
   */
  const selectModule = useCallback((module: StudyModule) => {
    if (!module.isUnlocked) {
      setError('This module is not yet unlocked')
      return
    }
    
    setCurrentModule(module)
    
    // Auto-select first available lesson
    const nextLesson = module.lessons.find(
      lesson => lesson.isUnlocked && lesson.completion.status !== 'completed'
    ) || module.lessons[0]
    
    if (nextLesson) {
      setCurrentLesson(nextLesson)
    }
    
    soundFX.playClick()
  }, [])

  /**
   * Select a specific lesson
   */
  const selectLesson = useCallback((lesson: StudyLesson) => {
    if (!lesson.isUnlocked) {
      setError('This lesson is not yet unlocked')
      return
    }
    
    setIsLessonLoading(true)
    
    // Simulate lesson loading
    setTimeout(() => {
      setCurrentLesson(lesson)
      setIsLessonLoading(false)
      soundFX.playClick()
    }, 300)
  }, [])

  /**
   * Complete a lesson and update progress
   */
  const completeLesson = useCallback(async (lessonId: string, score: number): Promise<void> => {
    try {
      if (!selectedPath || !currentModule) return
      
      setIsLessonLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const completionTime = Date.now()
      
      // Update lesson completion status
      setLearningPaths(prev => prev.map(path => 
        path.id === selectedPath.id 
          ? {
              ...path,
              modules: path.modules.map(module => 
                module.id === currentModule.id
                  ? {
                      ...module,
                      lessons: module.lessons.map(lesson => 
                        lesson.id === lessonId
                          ? {
                              ...lesson,
                              completion: {
                                ...lesson.completion,
                                status: score >= 80 ? 'mastered' : 'completed' as CompletionStatus,
                                score,
                                completedAt: completionTime,
                                timeSpent: lesson.completion.timeSpent + lesson.estimatedTime,
                                attempts: lesson.completion.attempts + 1
                              }
                            }
                          : lesson
                      )
                    }
                  : module
              )
            }
          : path
      ))
      
      // Update study progress
      const xpGained = currentLesson?.gamification.xpReward || 50
      setStudyProgress(prev => ({
        ...prev,
        totalXP: prev.totalXP + xpGained,
        totalStudyTime: prev.totalStudyTime + (currentLesson?.estimatedTime || 15),
        stats: {
          ...prev.stats,
          lessonsCompleted: prev.stats.lessonsCompleted + 1
        },
        pathProgress: {
          ...prev.pathProgress,
          [selectedPath.id]: {
            ...prev.pathProgress[selectedPath.id],
            lastStudied: completionTime,
            timeSpent: prev.pathProgress[selectedPath.id]?.timeSpent + (currentLesson?.estimatedTime || 15) || (currentLesson?.estimatedTime || 15)
          }
        }
      }))
      
      // Check for badge unlocks
      checkBadgeUnlocks(score)
      
      // Unlock next lesson if prerequisites are met
      unlockNextContent()
      
      // Play success sound
      if (score >= 90) {
        soundFX.playSuccess()
      } else if (score >= 70) {
        soundFX.playClick()
      } else {
        soundFX.playError()
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to complete lesson')
      soundFX.playError()
    } finally {
      setIsLessonLoading(false)
    }
  }, [selectedPath, currentModule, currentLesson])

  /**
   * Check and unlock achievement badges
   */
  const checkBadgeUnlocks = useCallback((score: number) => {
    setStudyProgress(prev => {
      const newAchievements = [...prev.achievements]
      let badgeEarned = false
      
      // Example badge logic - would be more sophisticated in production
      if (prev.stats.lessonsCompleted >= 10 && !newAchievements.find(badge => badge.id === 'first_milestone')) {
        newAchievements.push({
          id: 'first_milestone',
          name: 'First Milestone',
          description: 'Completed your first 10 lessons',
          type: 'bronze',
          icon: '<Trophy className="w-4 h-4 inline" />',
          criteria: { type: 'lessons_completed', threshold: 10 },
          rarity: 20,
          isEarned: true,
          earnedAt: Date.now(),
          xpReward: 100
        })
        badgeEarned = true
      }
      
      if (score >= 95 && !newAchievements.find(badge => badge.id === 'perfectionist')) {
        newAchievements.push({
          id: 'perfectionist',
          name: 'Perfectionist',
          description: 'Achieved a perfect score',
          type: 'gold',
          icon: '<Star className="w-4 h-4 inline" />',
          criteria: { type: 'score', threshold: 95 },
          rarity: 5,
          isEarned: true,
          earnedAt: Date.now(),
          xpReward: 250
        })
        badgeEarned = true
      }
      
      if (badgeEarned) {
        // Play special sound for badge unlock
        setTimeout(() => soundFX.playSuccess(), 500)
      }
      
      return {
        ...prev,
        achievements: newAchievements
      }
    })
  }, [])

  /**
   * Unlock next content based on completion
   */
  const unlockNextContent = useCallback(() => {
    if (!selectedPath || !currentModule || !currentLesson) return
    
    setLearningPaths(prev => prev.map(path => 
      path.id === selectedPath.id 
        ? {
            ...path,
            modules: path.modules.map(module => 
              module.id === currentModule.id
                ? {
                    ...module,
                    lessons: module.lessons.map((lesson, index) => {
                      // Unlock next lesson
                      if (lesson.id === currentLesson.id && index < module.lessons.length - 1) {
                        const nextLesson = module.lessons[index + 1]
                        return nextLesson
                      }
                      
                      // Unlock lesson if prerequisites are met
                      const prerequisitesMet = lesson.prerequisites.every(prereqId =>
                        module.lessons.find(l => l.id === prereqId)?.completion.status === 'completed' ||
                        module.lessons.find(l => l.id === prereqId)?.completion.status === 'mastered'
                      )
                      
                      return {
                        ...lesson,
                        isUnlocked: lesson.isUnlocked || prerequisitesMet
                      }
                    })
                  }
                : module
            )
          }
        : path
    ))
  }, [selectedPath, currentModule, currentLesson])

  /**
   * Navigate to next lesson
   */
  const navigateToNextLesson = useCallback((): boolean => {
    if (!currentModule || !currentLesson) return false
    
    const currentIndex = currentModule.lessons.findIndex(lesson => lesson.id === currentLesson.id)
    const nextLesson = currentModule.lessons[currentIndex + 1]
    
    if (nextLesson && nextLesson.isUnlocked) {
      selectLesson(nextLesson)
      return true
    }
    
    return false
  }, [currentModule, currentLesson, selectLesson])

  /**
   * Navigate to previous lesson
   */
  const navigateToPrevLesson = useCallback((): boolean => {
    if (!currentModule || !currentLesson) return false
    
    const currentIndex = currentModule.lessons.findIndex(lesson => lesson.id === currentLesson.id)
    const prevLesson = currentModule.lessons[currentIndex - 1]
    
    if (prevLesson) {
      selectLesson(prevLesson)
      return true
    }
    
    return false
  }, [currentModule, currentLesson, selectLesson])

  /**
   * Update study schedule
   */
  const updateSchedule = useCallback(async (schedule: StudySchedule): Promise<void> => {
    try {
      setIsLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300))
      
      setStudySchedule(schedule)
      
      // Update user progress with schedule
      setStudyProgress(prev => ({
        ...prev,
        schedule
      }))
      
      soundFX.playSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update schedule')
      soundFX.playError()
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Create a custom study plan
   */
  const createCustomPlan = useCallback(async (
    plan: Omit<CustomStudyPlan, 'id' | 'createdAt' | 'modifiedAt'>
  ): Promise<void> => {
    try {
      setIsLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const newPlan: CustomStudyPlan = {
        ...plan,
        id: `custom-${Date.now()}`,
        createdAt: Date.now(),
        modifiedAt: Date.now()
      }
      
      setCustomPlans(prev => [...prev, newPlan])
      soundFX.playSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create custom plan')
      soundFX.playError()
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Calculate progress for a specific path
   */
  const calculatePathProgress = useCallback((pathId: string): number => {
    const path = learningPaths.find(p => p.id === pathId)
    if (!path) return 0
    
    const totalLessons = path.modules.reduce((total, module) => total + module.lessons.length, 0)
    const completedLessons = path.modules.reduce((total, module) => 
      total + module.lessons.filter(lesson => 
        lesson.completion.status === 'completed' || lesson.completion.status === 'mastered'
      ).length, 0
    )
    
    return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
  }, [learningPaths])

  /**
   * Get recommended content based on user progress
   */
  const getRecommendedContent = useCallback((): StudyRecommendation[] => {
    return recommendations.filter(rec => rec.expiresAt > Date.now())
      .sort((a, b) => {
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      })
  }, [recommendations])

  /**
   * Get current study streak
   */
  const getStudyStreak = useCallback((): number => {
    return studyProgress.currentStreak
  }, [studyProgress.currentStreak])

  /**
   * Get today's goal progress
   */
  const getTodaysGoalProgress = useCallback((): number => {
    if (!studySchedule) return 0
    
    const today = new Date().toDateString()
    const todaysSessions = studyProgress.recentSessions.filter(
      session => new Date(session.startTime).toDateString() === today
    )
    
    const totalTimeToday = todaysSessions.reduce((total, session) => total + session.duration, 0)
    const dailyGoal = studySchedule.dailyGoal
    
    return dailyGoal > 0 ? Math.min(Math.round((totalTimeToday / dailyGoal) * 100), 100) : 0
  }, [studySchedule, studyProgress.recentSessions])

  /**
   * Clear error message
   */
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  /**
   * Handle tab change
   */
  const handleTabChange = useCallback((tab: string) => {
    // This could trigger different views or filter content based on tab
    // For now, we'll just update the current tab state if it exists
    console.log('Tab changed to:', tab)
  }, [])

  /**
   * Handle lesson completion
   */
  const handleLessonComplete = useCallback(async (lessonId: string, score: number) => {
    await completeLesson(lessonId, score)
  }, [completeLesson])

  /**
   * Get tab icon
   */
  const getTabIcon = useCallback((_tab: string) => {
    // Return appropriate icon based on tab type
    // This should return a React node, for now returning null
    return null
  }, [])

  // Memoized computed values
  const memoizedValues = useMemo(() => ({
    pathProgress: selectedPath ? calculatePathProgress(selectedPath.id) : 0,
    recommendedContent: getRecommendedContent(),
    studyStreak: getStudyStreak(),
    todaysGoalProgress: getTodaysGoalProgress()
  }), [selectedPath, calculatePathProgress, getRecommendedContent, getStudyStreak, getTodaysGoalProgress])

  return {
    // State data
    learningPaths,
    studyProgress,
    availableBadges,
    studySchedule,
    recommendations: memoizedValues.recommendedContent,
    customPlans,

    // Current selections
    selectedPath,
    currentModule,
    currentLesson,

    // Loading states
    isLoading,
    isLessonLoading,

    // Actions
    selectPath,
    enrollInPath,
    selectModule,
    selectLesson,
    completeLesson,
    updateSchedule,
    createCustomPlan,

    // Navigation
    navigateToNextLesson,
    navigateToPrevLesson,

    // Progress utilities
    calculatePathProgress,
    getRecommendedContent,
    getStudyStreak,
    getTodaysGoalProgress,

    // Error handling
    error,
    clearError,

    // UI handlers
    handleTabChange,
    handleLessonComplete,
    getTabIcon
  }
}