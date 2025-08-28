import { useState, useEffect, useCallback } from 'react'
import { soundFX } from '@/utils/soundEffects'
import { generateMockProgressData, generateMockActivityData, generateMockSessions } from '@/data/userProgress'
import type { 
  ProgressOverviewHookReturn,
  TimePeriod,
  StatCard,
  QuickAction,
  PerformanceAnalytics,
  StudyStreak,
  SkillProgression,
  Achievement,
  Goal,
  LearningPath,
  TrainingSession,
  ActivityDataPoint,
  TrendDirection
} from '@/types/progressOverview'
import { TrendingUp, Trophy, Target, Clock, Flame, Zap, Star, Crown } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/**
 * Custom hook for managing progress overview dashboard state and logic
 * Handles data fetching, statistics calculation, and user interactions
 */
export const useProgressOverview = (): ProgressOverviewHookReturn => {
  // Core state
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<TimePeriod>('month')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Data state
  const [performanceAnalytics, setPerformanceAnalytics] = useState<PerformanceAnalytics>(
    generateMockProgressData().performanceAnalytics
  )
  const [studyStreak, setStudyStreak] = useState<StudyStreak>(
    generateMockProgressData().studyStreak
  )
  const [skillProgressions, setSkillProgressions] = useState<SkillProgression[]>(
    generateMockProgressData().skillProgressions
  )
  const [achievements, setAchievements] = useState<Achievement[]>(
    generateMockProgressData().achievements
  )
  const [goals, setGoals] = useState<Goal[]>(
    generateMockProgressData().goals
  )
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>(
    generateMockProgressData().learningPaths
  )
  const [recentSessions, setRecentSessions] = useState<TrainingSession[]>(
    generateMockSessions(10)
  )
  const [activityData, setActivityData] = useState<ActivityDataPoint[]>(
    generateMockActivityData(selectedTimePeriod)
  )

  /**
   * Update activity data when time period changes
   */
  useEffect(() => {
    const newActivityData = generateMockActivityData(selectedTimePeriod)
    setActivityData(newActivityData)
  }, [selectedTimePeriod])

  /**
   * Set time period and update data accordingly
   */
  const setTimePeriod = useCallback((period: TimePeriod) => {
    setSelectedTimePeriod(period)
    soundFX.playClick()
  }, [])

  /**
   * Refresh all dashboard data
   */
  const refreshData = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const newData = generateMockProgressData()
      setPerformanceAnalytics(newData.performanceAnalytics)
      setStudyStreak(newData.studyStreak)
      setSkillProgressions(newData.skillProgressions)
      setAchievements(newData.achievements)
      setGoals(newData.goals)
      setLearningPaths(newData.learningPaths)
      setRecentSessions(generateMockSessions(10))
      setActivityData(generateMockActivityData(selectedTimePeriod))

      soundFX.playSuccess()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to refresh data')
      soundFX.playError()
    } finally {
      setIsLoading(false)
    }
  }, [selectedTimePeriod])

  /**
   * Calculate trend direction based on change value
   */
  const calculateTrend = useCallback((change: number): TrendDirection => {
    if (change > 0) return 'up'
    if (change < 0) return 'down'
    return 'neutral'
  }, [])

  /**
   * Generate stats cards from current data
   */
  const statsCards = useCallback((): StatCard[] => {
    const ratingChange = performanceAnalytics.recentTrend.change
    const winRate = performanceAnalytics.gameStats.winRate
    const totalGames = performanceAnalytics.gameStats.totalGames
    const overallAccuracy = performanceAnalytics.accuracy.overall

    return [
      {
        id: 'current_rating',
        title: 'Current Rating',
        value: String(performanceAnalytics.overallRating),
        change: `${ratingChange >= 0 ? '+' : ''}${ratingChange} this ${selectedTimePeriod}`,
        trend: calculateTrend(ratingChange),
        icon: TrendingUp as LucideIcon,
        color: ratingChange >= 0 ? 'text-green-400' : 'text-red-400',
        priority: 1
      },
      {
        id: 'study_streak',
        title: 'Study Streak',
        value: `${studyStreak.current} days`,
        change: studyStreak.current >= studyStreak.longest ? 'Personal best!' : `Best: ${studyStreak.longest} days`,
        trend: (studyStreak.status === 'active' ? 'up' : 'neutral') as TrendDirection,
        icon: Flame as LucideIcon,
        color: 'text-orange-400',
        priority: 2
      },
      {
        id: 'win_rate',
        title: 'Win Rate',
        value: `${Math.round(winRate)}%`,
        change: `${totalGames} games played`,
        trend: (winRate >= 60 ? 'up' : winRate >= 40 ? 'neutral' : 'down') as TrendDirection,
        icon: Trophy as LucideIcon,
        color: 'text-yellow-400',
        priority: 3
      },
      {
        id: 'accuracy',
        title: 'Accuracy',
        value: `${Math.round(overallAccuracy)}%`,
        change: 'Overall performance',
        trend: (overallAccuracy >= 80 ? 'up' : overallAccuracy >= 70 ? 'neutral' : 'down') as TrendDirection,
        icon: Target as LucideIcon,
        color: 'text-blue-400',
        priority: 4
      },
      {
        id: 'peak_rating',
        title: 'Peak Rating',
        value: String(performanceAnalytics.peakRating),
        change: new Date(performanceAnalytics.peakRatingDate).toLocaleDateString(),
        trend: 'up' as TrendDirection,
        icon: Crown as LucideIcon,
        color: 'text-purple-400',
        priority: 5
      },
      {
        id: 'active_goals',
        title: 'Active Goals',
        value: String(goals.filter(g => g.status === 'active').length),
        change: `${goals.filter(g => g.status === 'completed').length} completed`,
        trend: 'up' as TrendDirection,
        icon: Star as LucideIcon,
        color: 'text-indigo-400',
        priority: 6
      }
    ].sort((a, b) => a.priority - b.priority)
  }, [performanceAnalytics, studyStreak, goals, selectedTimePeriod, calculateTrend])

  /**
   * Generate quick action buttons
   */
  const quickActions = useCallback((): QuickAction[] => {
    return [
      {
        id: 'solve_puzzles',
        title: 'Solve Puzzles',
        description: `Continue your ${studyStreak.current} day streak`,
        icon: Target,
        path: '/puzzles',
        color: 'text-blue-400',
        backgroundColor: 'bg-blue-600/30',
        isRecommended: true,
        priority: 1,
        estimatedTime: 15,
        streak: studyStreak.current
      },
      {
        id: 'play_game',
        title: 'Play Game',
        description: 'Test your skills against AI',
        icon: Trophy,
        path: '/play/computer',
        color: 'text-green-400',
        backgroundColor: 'bg-green-600/30',
        priority: 2,
        estimatedTime: 10
      },
      {
        id: 'study_openings',
        title: 'Study Openings',
        description: 'Improve your opening repertoire',
        icon: Zap,
        path: '/study/openings',
        color: 'text-purple-400',
        backgroundColor: 'bg-purple-600/30',
        priority: 3,
        estimatedTime: 20
      },
      {
        id: 'analyze_games',
        title: 'Analyze Games',
        description: 'Review your recent games',
        icon: Zap,
        path: '/play/review',
        color: 'text-yellow-400',
        backgroundColor: 'bg-yellow-600/30',
        priority: 4,
        estimatedTime: 25
      },
      {
        id: 'master_games',
        title: 'Master Games',
        description: 'Learn from grandmaster play',
        icon: Crown,
        path: '/study/masters',
        color: 'text-red-400',
        backgroundColor: 'bg-red-600/30',
        priority: 5,
        estimatedTime: 30
      },
      {
        id: 'endgame_practice',
        title: 'Endgame Practice',
        description: 'Master theoretical positions',
        icon: Clock,
        path: '/study/endgames',
        color: 'text-indigo-400',
        backgroundColor: 'bg-indigo-600/30',
        priority: 6,
        estimatedTime: 20
      }
    ].sort((a, b) => a.priority - b.priority)
  }, [studyStreak.current])

  /**
   * Calculate weekly progress summary
   */
  const weeklyProgress = useCallback(() => {
    const weekData = activityData.slice(-7) // Last 7 days
    
    return {
      puzzlesSolved: weekData.reduce((sum, day) => sum + day.puzzles, 0),
      studyTime: weekData.reduce((sum, day) => sum + day.studyTime, 0),
      gamesPlayed: weekData.reduce((sum, day) => sum + day.games, 0),
      improvement: weekData.length > 0 
        ? Math.round(weekData.reduce((sum, day) => sum + day.quality, 0) / weekData.length)
        : 0
    }
  }, [activityData])

  /**
   * Format rating for display
   */
  const formatRating = useCallback((rating: number): string => {
    if (rating >= 2400) return `${rating} (Master)`
    if (rating >= 2200) return `${rating} (Expert)`
    if (rating >= 2000) return `${rating} (Advanced)`
    if (rating >= 1800) return `${rating} (Intermediate)`
    if (rating >= 1600) return `${rating} (Improving)`
    return `${rating} (Beginner)`
  }, [])

  /**
   * Format duration in minutes to human readable
   */
  const formatDuration = useCallback((minutes: number): string => {
    if (minutes < 60) return `${minutes}m`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
  }, [])

  /**
   * Calculate progress percentage
   */
  const calculateProgress = useCallback((current: number, target: number): number => {
    if (target === 0) return 100
    return Math.min(Math.round((current / target) * 100), 100)
  }, [])

  /**
   * Clear error message
   */
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    // Core data
    performanceAnalytics,
    studyStreak,
    skillProgressions,
    achievements,
    goals,
    learningPaths,

    // Activity data
    recentSessions,
    activityData,

    // UI state
    selectedTimePeriod,
    isLoading,

    // Actions
    setTimePeriod,
    refreshData,

    // Computed values
    statsCards: statsCards(),
    quickActions: quickActions(),
    weeklyProgress: weeklyProgress(),

    // Utilities
    formatRating,
    formatDuration,
    calculateProgress,

    // Error handling
    error,
    clearError
  }
}