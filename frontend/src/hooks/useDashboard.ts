import { useState, useEffect, useCallback } from 'react'
import { ApiClient } from '../services/apiClient'
import { StatsApiClient, type DashboardStats } from '../services/api/StatsApiClient'
import { GameApiClient, type GameHistory } from '../services/api/GameApiClient'
import { UserApiClient, type Achievement, type RecentActivity } from '../services/api/UserApiClient'

// Dashboard data types
export interface DashboardData {
  stats: DashboardStats | null
  recentGames: GameHistory['games']
  puzzleProgress: {
    rating: number
    solved_today: number
    accuracy: number
  } | null
  achievements: Achievement[]
  recentActivity: RecentActivity[]
  dailyGoals: {
    games: { current: number; target: number }
    puzzles: { current: number; target: number }
    study_time: { current: number; target: number }
  }
  isLoading: boolean
  error: string | null
}

export interface StatsCard {
  id: string
  title: string
  value: string | number
  change: string
  trend: 'up' | 'down' | 'neutral'
  icon: string
  pieceType: 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn'
}

// Calculate daily goals from stats data
const calculateDailyGoals = (stats: DashboardStats | null) => {
  if (!stats) {
    return {
      games: { current: 0, target: 5 },
      puzzles: { current: 0, target: 20 },
      study_time: { current: 0, target: 45 }
    }
  }

  // Mock daily progress calculation - in real app this would come from API
  return {
    games: { current: 3, target: 5 },
    puzzles: { current: 12, target: 20 },
    study_time: { current: 25, target: 45 }
  }
}

// Generate stats cards from API data
const generateStatsCards = (stats: DashboardStats | null): StatsCard[] => {
  if (!stats) return []

  return [
    {
      id: 'elo',
      title: 'Chess ELO',
      value: stats.chess_elo,
      change: '+12',
      trend: 'up' as const,
      icon: 'king',
      pieceType: 'king' as const
    },
    {
      id: 'puzzles',
      title: 'Puzzle Rating',
      value: stats.puzzle_rating,
      change: '+8',
      trend: 'up' as const,
      icon: 'pawn',
      pieceType: 'pawn' as const
    },
    {
      id: 'games',
      title: 'Games Played',
      value: stats.games_played,
      change: stats.games_played > 20 ? '+3' : '+1',
      trend: 'up' as const,
      icon: 'rook',
      pieceType: 'rook' as const
    },
    {
      id: 'study',
      title: 'Study Hours',
      value: `${stats.study_hours}h`,
      change: '+2.5h',
      trend: 'up' as const,
      icon: 'clock',
      pieceType: 'queen' as const
    }
  ]
}

export const useDashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    stats: null,
    recentGames: [],
    puzzleProgress: null,
    achievements: [],
    recentActivity: [],
    dailyGoals: {
      games: { current: 0, target: 5 },
      puzzles: { current: 0, target: 20 },
      study_time: { current: 0, target: 45 }
    },
    isLoading: true,
    error: null
  })

  // API client instances - following Document 12 architecture
  const apiClient = new ApiClient()
  const statsClient = new StatsApiClient(apiClient)
  const gameClient = new GameApiClient(apiClient)
  const userClient = new UserApiClient(apiClient)

  // Load dashboard data with parallel API calls (Document 20 pattern)
  const loadDashboardData = useCallback(async () => {
    try {
      setDashboardData(prev => ({ ...prev, isLoading: true, error: null }))

      // Parallel API calls for optimal performance (Document 20 pattern)
      const [statsResponse, gamesResponse, puzzleResponse, achievementsResponse, activityResponse] = 
        await Promise.all([
          statsClient.getDashboardStats().catch(err => {
            console.warn('Stats API failed:', err)
            return null
          }),
          gameClient.getAllGames(1, 5).catch(err => {
            console.warn('Games API failed:', err)
            return { games: [], total: 0, page: 1, limit: 5 }
          }),
          statsClient.getPuzzleStats().catch(err => {
            console.warn('Puzzle stats API failed:', err)
            return null
          }),
          userClient.getAchievements(true).catch(err => {
            console.warn('Achievements API failed:', err)
            return { achievements: [], total_unlocked: 0, total_available: 0, recent_unlocks: [] }
          }),
          userClient.getRecentActivity(5).catch(err => {
            console.warn('Recent activity API failed:', err)
            return { activities: [], has_more: false }
          })
        ])

      // Process and transform data
      const dailyGoals = calculateDailyGoals(statsResponse)
      
      const puzzleProgress = puzzleResponse ? {
        rating: puzzleResponse.rating,
        solved_today: puzzleResponse.daily_solved,
        accuracy: puzzleResponse.accuracy
      } : null

      // Update state with all loaded data
      setDashboardData({
        stats: statsResponse,
        recentGames: gamesResponse.games,
        puzzleProgress,
        achievements: achievementsResponse.achievements,
        recentActivity: activityResponse.activities,
        dailyGoals,
        isLoading: false,
        error: null
      })

    } catch (error) {
      console.error('Dashboard loading failed:', error)
      setDashboardData(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to load dashboard data'
      }))
    }
  }, [])

  // Auto-load data on mount
  useEffect(() => {
    loadDashboardData()
  }, [loadDashboardData])

  // Generate stats cards from current data
  const statsCards = generateStatsCards(dashboardData.stats)

  // Refresh function for manual reload
  const refreshData = useCallback(() => {
    loadDashboardData()
  }, [loadDashboardData])

  return {
    // Core data
    stats: dashboardData.stats,
    statsCards,
    recentActivity: dashboardData.recentActivity,
    recentGames: dashboardData.recentGames,
    achievements: dashboardData.achievements,
    dailyGoals: dashboardData.dailyGoals,
    puzzleProgress: dashboardData.puzzleProgress,
    
    // State
    isLoading: dashboardData.isLoading,
    error: dashboardData.error,
    
    // Actions
    refreshData
  }
}

// Export types for use in components  
export type { DashboardData as NewDashboardData }