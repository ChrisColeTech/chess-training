import { useMemo } from 'react'
import { useAuth } from '../auth/useAuth'
import { 
  DAILY_GOALS,
  WEEKLY_GOALS,
  calculateProgressPercentage,
  getELOProgressPercentage,
  getProgressColorScheme,
  formatProgressValue,
  type ProgressConfig,
  type ELOProgressConfig
} from '../../constants/progress'

export interface ProgressState {
  dailyGoals: Array<{
    config: ProgressConfig
    current: number
    percentage: number
    isComplete: boolean
    displayText: string
  }>
  weeklyGoals: Array<{
    config: ProgressConfig
    current: number
    percentage: number
    isComplete: boolean
    displayText: string
  }>
  eloProgress: {
    config: ELOProgressConfig
    percentage: number
    colorScheme: 'positive' | 'negative' | 'neutral'
    changeText: string
    progressText: string
  }
}

export interface ProgressActions {
  updateGoalProgress: (goalId: string, newValue: number) => void
  resetDailyGoals: () => void
  getGoalById: (goalId: string) => ProgressConfig | null
}

export const useProgress = (): ProgressState & ProgressActions => {
  const { user } = useAuth()

  // Mock current progress data - would come from real user data/backend
  const mockDailyProgress = {
    'games-played': 2,
    'puzzles-solved': 7,
    'study-time': 23,
    'win-streak': 3
  }

  const mockWeeklyProgress = {
    'total-games': 12,
    'puzzle-rating': 1150,
    'study-hours': 4.2,
    'tournament-points': 35
  }

  const dailyGoals = useMemo(() => {
    return Object.values(DAILY_GOALS).map(goal => {
      const current = mockDailyProgress[goal.id as keyof typeof mockDailyProgress] || 0
      const percentage = calculateProgressPercentage(current, goal.maxValue)
      const isComplete = percentage >= 100
      const displayText = `${formatProgressValue(current, goal.unit)} / ${formatProgressValue(goal.maxValue, goal.unit)}`

      return {
        config: goal,
        current,
        percentage,
        isComplete,
        displayText
      }
    })
  }, [])

  const weeklyGoals = useMemo(() => {
    return Object.values(WEEKLY_GOALS).map(goal => {
      const current = mockWeeklyProgress[goal.id as keyof typeof mockWeeklyProgress] || 0
      const percentage = calculateProgressPercentage(current, goal.maxValue)
      const isComplete = percentage >= 100
      const displayText = `${formatProgressValue(current, goal.unit)} / ${formatProgressValue(goal.maxValue, goal.unit)}`

      return {
        config: goal,
        current,
        percentage,
        isComplete,
        displayText
      }
    })
  }, [])

  const eloProgress = useMemo(() => {
    const currentRating = user?.chess_elo || 1200
    const targetRating = currentRating + 100 // Mock target
    const previousRating = currentRating - 23 // Mock previous (simulating recent gain)
    const ratingChange = currentRating - previousRating

    const config: ELOProgressConfig = {
      id: 'elo-progress',
      currentRating,
      targetRating,
      previousRating,
      ratingChange,
      colorScheme: getProgressColorScheme(ratingChange)
    }

    const percentage = getELOProgressPercentage(currentRating, targetRating, previousRating)
    const changeText = ratingChange > 0 ? `+${ratingChange}` : `${ratingChange}`
    const progressText = `${currentRating} → ${targetRating}`

    return {
      config,
      percentage,
      colorScheme: config.colorScheme,
      changeText,
      progressText
    }
  }, [user?.chess_elo])

  const updateGoalProgress = (goalId: string, newValue: number) => {
    // This would update the backend/store in a real implementation
    console.log(`Updating goal ${goalId} to ${newValue}`)
  }

  const resetDailyGoals = () => {
    // This would reset daily goals at midnight in a real implementation
    console.log('Resetting daily goals')
  }

  const getGoalById = (goalId: string): ProgressConfig | null => {
    return DAILY_GOALS[goalId] || WEEKLY_GOALS[goalId] || null
  }

  return {
    dailyGoals,
    weeklyGoals,
    eloProgress,
    updateGoalProgress,
    resetDailyGoals,
    getGoalById
  }
}