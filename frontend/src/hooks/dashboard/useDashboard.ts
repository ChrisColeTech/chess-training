import { useState, useEffect, useMemo } from 'react'
import { useAuth } from '../auth/useAuth'
import { dashboardService } from '../../services/dashboard/dashboardService'
import { userService } from '../../services/user/userService'
import type { DashboardStats, DailyGoal, UserActivity } from '../../types/dashboard'
import type { UserStats } from '../../types/user'

export interface StatsCard {
  id: string
  title: string
  value: string
  change: string
  changePositive: boolean
  icon: string
  color: string
}

export interface DashboardState {
  stats: DashboardStats | null
  userStats: UserStats | null
  dailyGoals: DailyGoal[]
  recentActivity: UserActivity[]
  statsCards: StatsCard[]
  isLoading: boolean
  error: string | null
}

export interface DashboardActions {
  refreshData: () => Promise<void>
  updateGoalProgress: (goalId: string, progress: number) => Promise<void>
  markGoalComplete: (goalId: string) => void
}

export const useDashboard = (): DashboardState & DashboardActions => {
  const { user } = useAuth()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [dailyGoals, setDailyGoals] = useState<DailyGoal[]>([])
  const [recentActivity, setRecentActivity] = useState<UserActivity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch all dashboard data
  const fetchDashboardData = async () => {
    if (!user) return

    setIsLoading(true)
    setError(null)

    try {
      const [dashboardStats, userData, goals, activity] = await Promise.all([
        dashboardService.getDashboardStats(),
        userService.getUserStats(),
        dashboardService.getDailyGoals(),
        dashboardService.getUserActivity()
      ])

      setStats(dashboardStats)
      setUserStats(userData)
      setDailyGoals(goals)
      setRecentActivity(activity)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data')
      console.error('Dashboard data fetch failed:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Initial data fetch
  useEffect(() => {
    fetchDashboardData()
  }, [user])

  // Dashboard stats cards with real data
  const statsCards = useMemo(() => {
    if (!stats) return []

    return [
      {
        id: 'chess-elo',
        title: 'Current ELO',
        value: stats.chess_elo.toString(),
        change: stats.rating_change > 0 ? `+${stats.rating_change}` : stats.rating_change.toString(),
        changePositive: stats.rating_change >= 0,
        icon: 'king',
        color: stats.rating_change >= 0 ? 'text-green-400' : 'text-red-400'
      },
      {
        id: 'puzzle-rating',
        title: 'Puzzle Rating',
        value: stats.puzzle_rating.toString(),
        change: stats.puzzle_rating_change > 0 ? `+${stats.puzzle_rating_change}` : stats.puzzle_rating_change.toString(),
        changePositive: stats.puzzle_rating_change >= 0,
        icon: 'pawn',
        color: stats.puzzle_rating_change >= 0 ? 'text-blue-400' : 'text-red-400'
      },
      {
        id: 'games-played',
        title: 'Games Played',
        value: stats.games_played.toString(),
        change: stats.games_change > 0 ? `+${stats.games_change}` : stats.games_change.toString(),
        changePositive: stats.games_change >= 0,
        icon: 'queen',
        color: 'text-purple-400'
      },
      {
        id: 'study-hours',
        title: 'Study Hours',
        value: stats.study_hours.toFixed(1),
        change: stats.study_hours_change > 0 ? `+${stats.study_hours_change.toFixed(1)}` : stats.study_hours_change.toFixed(1),
        changePositive: stats.study_hours_change >= 0,
        icon: 'clock',
        color: 'text-orange-400'
      }
    ]
  }, [stats])

  // Format recent activity for display
  const formattedActivity = useMemo(() => {
    return recentActivity.map(activity => ({
      ...activity,
      timeFormatted: formatTimeAgo(activity.created_at)
    }))
  }, [recentActivity])

  // Actions
  const refreshData = async (): Promise<void> => {
    await fetchDashboardData()
  }

  const updateGoalProgress = async (goalId: string, progress: number): Promise<void> => {
    try {
      await dashboardService.updateDailyGoal(goalId, progress)
      
      // Update local state
      setDailyGoals(goals => 
        goals.map(goal => 
          goal.id === goalId 
            ? { ...goal, current: progress, completed: progress >= goal.target }
            : goal
        )
      )
    } catch (err) {
      console.error('Failed to update goal progress:', err)
      throw err
    }
  }

  const markGoalComplete = (goalId: string): void => {
    setDailyGoals(goals => 
      goals.map(goal => 
        goal.id === goalId 
          ? { ...goal, completed: true }
          : goal
      )
    )
  }

  return {
    stats,
    userStats,
    dailyGoals,
    recentActivity: formattedActivity,
    isLoading,
    error,
    refreshData,
    updateGoalProgress,
    markGoalComplete,
    // Computed values for easy access
    statsCards
  }
}

// Helper function to format time ago
const formatTimeAgo = (dateString: string): string => {
  const now = new Date()
  const date = new Date(dateString)
  const diffInMs = now.getTime() - date.getTime()
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`
  } else if (diffInDays === 1) {
    return '1 day ago'
  } else {
    return `${diffInDays} days ago`
  }
}