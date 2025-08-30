import { useState, useEffect, useCallback, useMemo } from 'react'
import { soundFX } from '@/utils/soundEffects'
import { useLearningPaths } from '@/hooks/learning/useLearningPaths'
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
 * Now uses API hooks instead of mock data
 */
export const useStudyPlans = (): StudyPlansHookReturn => {
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
  // Core data state - now using API hooks
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([])
  const [studyProgress, setStudyProgress] = useState<StudyProgress>({
    totalXP: 0,
    currentStreak: 0,
    totalStudyTime: 0,
    pathProgress: {},
    achievements: [],
    stats: {
      lessonsCompleted: 0,
      averageScore: 0,
      totalPracticeTime: 0
    },
    recentSessions: []
  })
  
  // Use API hooks for data fetching
  const { data: apiLearningPaths, isLoading: isLoadingPaths, error: pathsError } = useLearningPathList()
  const { data: progressData, isLoading: isLoadingProgress, error: progressError } = useLearningProgress()
  const [availableBadges, setAvailableBadges] = useState<AchievementBadge[]>([])
  const [studySchedule, setStudySchedule] = useState<StudySchedule | null>(null)
  const [recommendations, setRecommendations] = useState<StudyRecommendation[]>([])
  const [customPlans, setCustomPlans] = useState<CustomStudyPlan[]>([])

  // Current selections
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null)
  const [currentModule, setCurrentModule] = useState<StudyModule | null>(null)
  const [currentLesson, setCurrentLesson] = useState<StudyLesson | null>(null)

  // Loading states - now using API hook states
  const [isLoading, setIsLoading] = useState(true)
  const [isLessonLoading, setIsLessonLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const apiError = startLearningPathError || updateModuleProgressError || pathsError || progressError

  /**
   * Convert API learning paths to expected LearningPath format
   */
  const convertApiDataToLearningPaths = useCallback((apiPaths: any[], progress: any): LearningPath[] => {
    return apiPaths.map((path: any, pathIndex: number) => ({
      id: path.id || `path-${pathIndex}`,
      title: path.title || path.name || `Learning Path ${pathIndex + 1}`,
      description: path.description || `Comprehensive learning path for ${path.title || 'chess skills'}`,
      category: path.category || 'General',
      difficulty: path.difficulty || 'Intermediate',
      estimatedDuration: path.estimatedDuration || '4 weeks',
      isUnlocked: progress?.pathProgress?.[path.id]?.isUnlocked ?? true,
      isEnrolled: progress?.pathProgress?.[path.id]?.isEnrolled ?? false,
      completionRate: progress?.pathProgress?.[path.id]?.progress || 0,
      lastAccessed: progress?.pathProgress?.[path.id]?.lastAccessed || 0,
      modules: path.modules?.map((module: any, moduleIndex: number) => convertApiModuleToStudyModule(module, moduleIndex, progress)) || [],
      prerequisites: path.prerequisites || [],
      rewards: path.rewards || { xp: 500, badge: 'Path Complete' },
      tags: path.tags || []
    }))
  }, [])

  const convertApiModuleToStudyModule = useCallback((apiModule: any, index: number, progress: any): StudyModule => {
    return {
      id: apiModule.id || `module-${index}`,
      title: apiModule.title || apiModule.name || `Module ${index + 1}`,
      description: apiModule.description || `Learn ${apiModule.title || 'this module'}`,
      orderIndex: index,
      isUnlocked: progress?.moduleProgress?.[apiModule.id]?.isUnlocked ?? (index === 0),
      estimatedDuration: apiModule.estimatedDuration || 60,
      lessons: apiModule.lessons?.map((lesson: any, lessonIndex: number) => convertApiLessonToStudyLesson(lesson, lessonIndex, progress)) || 
                generateDefaultLessons(apiModule.id || `module-${index}`, progress),
      prerequisites: apiModule.prerequisites || (index > 0 ? [`module-${index - 1}`] : [])
    }
  }, [])

  const convertApiLessonToStudyLesson = useCallback((apiLesson: any, index: number, progress: any): StudyLesson => {
    const lessonProgress = progress?.lessonProgress?.[apiLesson.id] || {}
    return {
      id: apiLesson.id || `lesson-${index}`,
      title: apiLesson.title || apiLesson.name || `Lesson ${index + 1}`,
      description: apiLesson.description || `Learn ${apiLesson.title || 'this lesson'}`,
      content: apiLesson.content || `Content for ${apiLesson.title || 'this lesson'}`,
      orderIndex: index,
      lessonType: apiLesson.type || 'theory',
      estimatedTime: apiLesson.estimatedTime || 15,
      isUnlocked: lessonProgress.isUnlocked ?? (index === 0),
      prerequisites: apiLesson.prerequisites || (index > 0 ? [`lesson-${index - 1}`] : []),
      completion: {
        status: lessonProgress.status || 'not_started',
        score: lessonProgress.score || 0,
        timeSpent: lessonProgress.timeSpent || 0,
        completedAt: lessonProgress.completedAt || 0,
        attempts: lessonProgress.attempts || 0
      },
      gamification: {
        xpReward: apiLesson.xpReward || 25,
        badges: apiLesson.badges || [],
        achievements: apiLesson.achievements || []
      }
    }
  }, [])

  const generateDefaultLessons = useCallback((moduleId: string, progress: any): StudyLesson[] => {
    return Array.from({ length: 3 }, (_, index) => ({
      id: `${moduleId}-lesson-${index}`,
      title: `Lesson ${index + 1}`,
      description: `Learn fundamental concepts in lesson ${index + 1}`,
      content: `Lesson content for ${moduleId} lesson ${index + 1}`,
      orderIndex: index,
      lessonType: 'theory' as const,
      estimatedTime: 15,
      isUnlocked: progress?.lessonProgress?.[`${moduleId}-lesson-${index}`]?.isUnlocked ?? (index === 0),
      prerequisites: index > 0 ? [`${moduleId}-lesson-${index - 1}`] : [],
      completion: {
        status: progress?.lessonProgress?.[`${moduleId}-lesson-${index}`]?.status || 'not_started' as CompletionStatus,
        score: 0,
        timeSpent: 0,
        completedAt: 0,
        attempts: 0
      },
      gamification: {
        xpReward: 25,
        badges: [],
        achievements: []
      }
    }))
  }, [])

  const convertApiProgressToStudyProgress = useCallback((apiProgress: any): StudyProgress => {
    return {
      totalXP: apiProgress.totalXP || 0,
      currentStreak: apiProgress.currentStreak || 0,
      totalStudyTime: apiProgress.totalStudyTime || 0,
      pathProgress: apiProgress.pathProgress || {},
      achievements: apiProgress.achievements || [],
      stats: {
        lessonsCompleted: apiProgress.stats?.lessonsCompleted || 0,
        averageScore: apiProgress.stats?.averageScore || 0,
        totalPracticeTime: apiProgress.stats?.totalPracticeTime || 0
      },
      recentSessions: apiProgress.recentSessions || [],
      schedule: apiProgress.schedule
    }
  }, [])

  const generateRecommendationsFromApi = useCallback((apiPaths: any[], progress: any): StudyRecommendation[] => {
    return apiPaths.slice(0, 3).map((path: any, index: number) => ({
      id: `rec-${path.id || index}`,
      type: ['skill_gap', 'review', 'new_content'][index % 3] as any,
      priority: ['high', 'medium', 'low'][index] as any,
      reason: `Recommended based on your progress in ${path.title || 'this area'}`,
      expectedBenefit: `Improve skills in ${path.category || 'chess fundamentals'}`,
      estimatedTime: 30 + (index * 10),
      expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000),
      metadata: {
        pathId: path.id,
        difficulty: path.difficulty || 'intermediate'
      }
    }))
  }, [])

  /**
   * Initialize data from API
   */
  useEffect(() => {
    const initializeData = async () => {
      try {
        setIsLoading(isLoadingPaths || isLoadingProgress)
        setError(null)
        
        if (apiError) {
          throw new Error(apiError.message || 'Failed to load data')
        }
        
        if (apiLearningPaths && apiLearningPaths.length > 0) {
          // Convert API data to expected format
          const paths = convertApiDataToLearningPaths(apiLearningPaths, progressData)
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
          
          // Generate recommendations from API data
          const recs = generateRecommendationsFromApi(apiLearningPaths, progressData)
          setRecommendations(recs)
          
          // Update study progress from API
          if (progressData) {
            setStudyProgress(convertApiProgressToStudyProgress(progressData))
          }
          
          // Initialize badges from progress
          setAvailableBadges(studyProgress.achievements)
          
          soundFX.playClick()
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize study plans')
        soundFX.playError()
      } finally {
        setIsLoading(false)
      }
    }

    if (!isLoadingPaths && !isLoadingProgress) {
      initializeData()
    }
  }, [apiLearningPaths, progressData, isLoadingPaths, isLoadingProgress, apiError])

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
   * Enroll in a learning path - now uses API
   */
  const enrollInPath = useCallback(async (pathId: string): Promise<void> => {
    try {
      setIsLoading(true)
      
      // Use API to start learning path
      await startLearningPath(pathId)
      
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
  }, [learningPaths, selectPath, startLearningPath])

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
      
      // Use API to update module progress based on lesson completion
      if (currentModule) {
        await updateModuleProgress({
          moduleId: currentModule.id,
          progress: Math.min(100, (score / 100) * 100)
        })
      }
      
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

    // Error handling - now includes API errors
    error: error || apiError?.message,
    clearError,

    // UI handlers
    handleTabChange,
    handleLessonComplete,
    getTabIcon
  }
}