import { useState, useCallback, useMemo } from 'react'
import { soundFX } from '@/utils/soundEffects'
import { useProgress } from './progress/useProgress'
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
  const [error, setError] = useState<string | null>(null)

  // API hooks
  const progress = useProgress()
  const overallProgressQuery = progress.useOverallProgress()
  const puzzleProgressQuery = progress.usePuzzleProgress()
  const tutorialProgressQuery = progress.useTutorialProgressStats()
  const learningPathProgressQuery = progress.useLearningPathProgressStats()
  const progressHistoryQuery = progress.useProgressHistory(30)
  const weeklyReportQuery = progress.useWeeklyReport()

  // Combine loading states
  const isLoading = overallProgressQuery.isLoading || 
                   puzzleProgressQuery.isLoading || 
                   tutorialProgressQuery.isLoading || 
                   learningPathProgressQuery.isLoading || 
                   progressHistoryQuery.isLoading || 
                   weeklyReportQuery.isLoading

  // Transform API data to expected formats
  const performanceAnalytics = useMemo((): PerformanceAnalytics => {
    const overallData = overallProgressQuery.data
    if (!overallData) {
      return {
        overallRating: 1200,
        peakRating: 1200,
        peakRatingDate: new Date().toISOString(),
        recentTrend: { change: 0, percentage: 0 },
        gameStats: { totalGames: 0, wins: 0, losses: 0, draws: 0, winRate: 0 },
        accuracy: { overall: 0, opening: 0, middlegame: 0, endgame: 0 }
      }
    }
    return {
      overallRating: overallData.rating || 1200,
      peakRating: overallData.peakRating || 1200,
      peakRatingDate: overallData.peakRatingDate || new Date().toISOString(),
      recentTrend: { 
        change: overallData.ratingChange || 0, 
        percentage: overallData.ratingChangePercent || 0 
      },
      gameStats: {
        totalGames: overallData.totalGames || 0,
        wins: overallData.wins || 0,
        losses: overallData.losses || 0,
        draws: overallData.draws || 0,
        winRate: overallData.winRate || 0
      },
      accuracy: {
        overall: overallData.accuracy || 0,
        opening: overallData.openingAccuracy || 0,
        middlegame: overallData.middlegameAccuracy || 0,
        endgame: overallData.endgameAccuracy || 0
      }
    }
  }, [overallProgressQuery.data])

  const studyStreak = useMemo((): StudyStreak => {
    const weeklyData = weeklyReportQuery.data
    return {
      current: weeklyData?.streaks.daily || 0,
      longest: weeklyData?.streaks.daily || 0,
      status: weeklyData?.streaks.daily > 0 ? 'active' : 'broken',
      lastActivity: new Date().toISOString()
    }
  }, [weeklyReportQuery.data])

  const skillProgressions = useMemo((): SkillProgression[] => {
    const puzzleData = puzzleProgressQuery.data
    const tutorialData = tutorialProgressQuery.data
    
    return [
      {
        id: 'tactics',
        name: 'Tactical Skills',
        currentLevel: Math.floor((puzzleData?.solved || 0) / 10),
        progress: (puzzleData?.solved || 0) % 10 * 10,
        totalXp: puzzleData?.solved || 0,
        category: 'Combat'
      },
      {
        id: 'strategy',
        name: 'Strategic Understanding',
        currentLevel: Math.floor((tutorialData?.completed || 0) / 5),
        progress: (tutorialData?.completed || 0) % 5 * 20,
        totalXp: tutorialData?.completed || 0,
        category: 'Knowledge'
      }
    ]
  }, [puzzleProgressQuery.data, tutorialProgressQuery.data])

  const achievements = useMemo((): Achievement[] => {
    const weeklyData = weeklyReportQuery.data
    return [
      {
        id: 'recent_achievements',
        title: 'Weekly Achievements',
        description: `Earned ${weeklyData?.achievements || 0} achievements this week`,
        category: 'Progress',
        rarity: 'Common' as const,
        xpReward: (weeklyData?.achievements || 0) * 10,
        earnedAt: weeklyData?.achievements ? new Date().toISOString() : undefined
      }
    ]
  }, [weeklyReportQuery.data])

  const goals = useMemo((): Goal[] => {
    return [
      {
        id: 'weekly_puzzles',
        title: 'Weekly Puzzle Goal',
        description: 'Solve puzzles consistently',
        target: 50,
        current: puzzleProgressQuery.data?.solved || 0,
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'active' as const,
        category: 'Training'
      }
    ]
  }, [puzzleProgressQuery.data])

  const learningPaths = useMemo((): LearningPath[] => {
    const learningData = learningPathProgressQuery.data
    return [
      {
        id: 'beginner_path',
        title: 'Beginner Path',
        description: 'Master the fundamentals',
        totalSteps: learningData?.total || 10,
        completedSteps: learningData?.completed || 0,
        currentStep: Math.min((learningData?.completed || 0) + 1, learningData?.total || 10),
        estimatedHours: learningData?.totalHours || 20,
        difficulty: 'Beginner' as const,
        category: 'Fundamentals'
      }
    ]
  }, [learningPathProgressQuery.data])

  const recentSessions = useMemo((): TrainingSession[] => {
    const historyData = progressHistoryQuery.data
    if (!historyData) return []
    
    return historyData.slice(0, 10).map((day, index) => ({
      id: `session_${index}`,
      type: 'Mixed Training',
      duration: day.learningMinutes,
      performance: Math.random() * 100, // Mock performance score
      completed: true,
      date: day.date,
      activities: [
        { type: 'Puzzles', count: day.puzzlesSolved },
        { type: 'Tutorials', count: day.tutorialSteps },
        { type: 'Games', count: day.gamesPlayed }
      ]
    }))
  }, [progressHistoryQuery.data])

  const activityData = useMemo((): ActivityDataPoint[] => {
    const historyData = progressHistoryQuery.data
    if (!historyData) return []
    
    return historyData.map(day => ({
      date: day.date,
      puzzles: day.puzzlesSolved,
      games: day.gamesPlayed,
      studyTime: day.learningMinutes,
      quality: Math.random() * 100 // Mock quality score
    }))
  }, [progressHistoryQuery.data])

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
    setError(null)
    
    try {
      await Promise.all([
        overallProgressQuery.refetch(),
        puzzleProgressQuery.refetch(),
        tutorialProgressQuery.refetch(),
        learningPathProgressQuery.refetch(),
        progressHistoryQuery.refetch(),
        weeklyReportQuery.refetch()
      ])
      soundFX.playSuccess()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to refresh data')
      soundFX.playError()
    }
  }, [overallProgressQuery, puzzleProgressQuery, tutorialProgressQuery, learningPathProgressQuery, progressHistoryQuery, weeklyReportQuery])

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
  const statsCards = useMemo((): StatCard[] => {
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
  const quickActions = useMemo((): QuickAction[] => {
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
  const weeklyProgress = useMemo(() => {
    const weeklyData = weeklyReportQuery.data
    if (!weeklyData) {
      return {
        puzzlesSolved: 0,
        studyTime: 0,
        gamesPlayed: 0,
        improvement: 0
      }
    }
    
    return {
      puzzlesSolved: weeklyData.puzzlesSolved,
      studyTime: weeklyData.learningHours * 60, // Convert to minutes
      gamesPlayed: weeklyData.gamesPlayed,
      improvement: Math.floor(Math.random() * 100) // Mock improvement score
    }
  }, [weeklyReportQuery.data])

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
    statsCards,
    quickActions,
    weeklyProgress,

    // Utilities
    formatRating,
    formatDuration,
    calculateProgress,

    // Error handling
    error: error || overallProgressQuery.error?.message || puzzleProgressQuery.error?.message || tutorialProgressQuery.error?.message || learningPathProgressQuery.error?.message || progressHistoryQuery.error?.message || weeklyReportQuery.error?.message || null,
    clearError
  }
}