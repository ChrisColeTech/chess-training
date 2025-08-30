import { useState, useCallback, useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { soundFX } from '@/utils/soundEffects'
import { apiService } from '@/services/api'
import { queryKeys } from '@/lib/query-client'
// Local constants replacing @/data/achievementConfigurations
const defaultAchievementFilters: AchievementFilters = {
  categories: [],
  rarities: [],
  statuses: [],
  earnedOnly: false,
  availableOnly: false,
  secretOnly: false,
  searchText: '',
  sortBy: 'title',
  sortDirection: 'asc',
  difficultyRange: [1, 5],
  seriesFilter: null
}
import type {
  Achievement,
  AchievementSeries,
  AchievementStats,
  AchievementLeaderboardEntry,
  AchievementNotification,
  AchievementFilters,
  AchievementsHookReturn
} from '@/types/achievements'

/**
 * Custom hook for managing chess achievements and gamification system
 * Handles achievement tracking, filtering, notifications, and leaderboards
 */
export const useAchievements = (): AchievementsHookReturn => {
  const queryClient = useQueryClient()

  // UI state
  const [filters, setFilters] = useState<AchievementFilters>(defaultAchievementFilters)
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)

  // API queries
  const achievementsQuery = useQuery({
    queryKey: queryKeys.achievements.all,
    queryFn: () => apiService.achievements.getAchievements(),
  })

  const userAchievementsQuery = useQuery({
    queryKey: queryKeys.achievements.user,
    queryFn: () => apiService.achievements.getUserAchievements(),
  })

  const categoriesQuery = useQuery({
    queryKey: queryKeys.achievements.categories,
    queryFn: () => apiService.achievements.getAchievementCategories(),
  })

  const leaderboardQuery = useQuery({
    queryKey: queryKeys.achievements.leaderboard(undefined, 50),
    queryFn: () => apiService.achievements.getLeaderboard(),
  })

  const recentAchievementsQuery = useQuery({
    queryKey: queryKeys.achievements.recent(10),
    queryFn: () => apiService.achievements.getRecentAchievements(10),
  })

  // Transform API data
  const achievements = useMemo(() => {
    if (!achievementsQuery.data || !userAchievementsQuery.data) return []
    
    // Combine achievement data with user progress
    return achievementsQuery.data.map(achievement => {
      const userAchievement = userAchievementsQuery.data.find(ua => ua.achievementId === achievement.id)
      
      return {
        ...achievement,
        status: userAchievement?.unlocked ? 'completed' : 
                userAchievement?.progress && userAchievement.progress > 0 ? 'in_progress' : 'available',
        progress: userAchievement?.progress || 0,
        earnedAt: userAchievement?.unlockedAt ? new Date(userAchievement.unlockedAt) : undefined
      } as Achievement
    })
  }, [achievementsQuery.data, userAchievementsQuery.data])

  // Generate achievement series from achievements
  const achievementSeries = useMemo(() => {
    const seriesMap = new Map<string, AchievementSeries>()
    
    achievements.forEach(achievement => {
      if (achievement.series) {
        if (!seriesMap.has(achievement.series)) {
          seriesMap.set(achievement.series, {
            id: achievement.series,
            name: achievement.series.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
            description: `Complete all ${achievement.series} achievements`,
            totalCount: 0,
            completedCount: 0,
            progress: 0
          })
        }
        
        const series = seriesMap.get(achievement.series)!
        series.totalCount++
        if (achievement.status === 'completed') {
          series.completedCount++
        }
        series.progress = Math.round((series.completedCount / series.totalCount) * 100)
      }
    })
    
    return Array.from(seriesMap.values())
  }, [achievements])

  // Generate achievement stats from achievements
  const stats = useMemo(() => {
    const completedAchievements = achievements.filter(a => a.status === 'completed')
    const totalXp = completedAchievements.reduce((sum, a) => sum + (a.reward?.xp || 0), 0)
    
    const byRarity = {
      Common: { total: 0, completed: 0, rate: 0 },
      Rare: { total: 0, completed: 0, rate: 0 },
      Epic: { total: 0, completed: 0, rate: 0 },
      Legendary: { total: 0, completed: 0, rate: 0 },
      Mythic: { total: 0, completed: 0, rate: 0 }
    }
    
    const byCategory = {
      Tactics: { total: 0, completed: 0, rate: 0 },
      Endgames: { total: 0, completed: 0, rate: 0 },
      Openings: { total: 0, completed: 0, rate: 0 },
      Strategy: { total: 0, completed: 0, rate: 0 },
      Puzzles: { total: 0, completed: 0, rate: 0 },
      Games: { total: 0, completed: 0, rate: 0 },
      Study: { total: 0, completed: 0, rate: 0 },
      Streaks: { total: 0, completed: 0, rate: 0 },
      Social: { total: 0, completed: 0, rate: 0 },
      Special: { total: 0, completed: 0, rate: 0 }
    }
    
    // Calculate stats by rarity and category
    achievements.forEach(achievement => {
      if (byRarity[achievement.rarity as keyof typeof byRarity]) {
        byRarity[achievement.rarity as keyof typeof byRarity].total++
        if (achievement.status === 'completed') {
          byRarity[achievement.rarity as keyof typeof byRarity].completed++
        }
      }
      
      if (byCategory[achievement.category as keyof typeof byCategory]) {
        byCategory[achievement.category as keyof typeof byCategory].total++
        if (achievement.status === 'completed') {
          byCategory[achievement.category as keyof typeof byCategory].completed++
        }
      }
    })
    
    // Calculate completion rates
    Object.keys(byRarity).forEach(rarity => {
      const rarityStats = byRarity[rarity as keyof typeof byRarity]
      rarityStats.rate = rarityStats.total > 0 ? Math.round((rarityStats.completed / rarityStats.total) * 100) : 0
    })
    
    Object.keys(byCategory).forEach(category => {
      const categoryStats = byCategory[category as keyof typeof byCategory]
      categoryStats.rate = categoryStats.total > 0 ? Math.round((categoryStats.completed / categoryStats.total) * 100) : 0
    })
    
    return {
      completedAchievements: completedAchievements.length,
      totalAchievements: achievements.length,
      completionRate: achievements.length > 0 ? Math.round((completedAchievements.length / achievements.length) * 100) : 0,
      totalXpEarned: totalXp,
      averageDifficulty: achievements.length > 0 ? 
        Math.round(achievements.reduce((sum, a) => sum + a.difficulty, 0) / achievements.length * 10) / 10 : 0,
      streak: 0, // Would need to calculate from earn dates
      longestStreak: 0, // Would need to calculate from earn dates
      recentlyEarned: completedAchievements
        .filter(a => a.earnedAt)
        .sort((a, b) => (b.earnedAt?.getTime() || 0) - (a.earnedAt?.getTime() || 0))
        .slice(0, 10),
      nearCompletion: achievements
        .filter(a => a.status === 'in_progress' && a.progress >= 75)
        .sort((a, b) => b.progress - a.progress),
      byRarity,
      byCategory
    } as AchievementStats
  }, [achievements])

  // Transform leaderboard data
  const leaderboard = useMemo(() => {
    return leaderboardQuery.data?.map(entry => ({
      userId: entry.userId,
      username: entry.username,
      totalXp: entry.totalPoints,
      totalAchievements: entry.achievements,
      completionRate: Math.round((entry.achievements / achievements.length) * 100),
      rank: leaderboardQuery.data!.indexOf(entry) + 1,
      avatar: undefined // Would need to add to API
    })) || []
  }, [leaderboardQuery.data, achievements.length])

  // Mock notifications (would typically come from API)
  const [notifications, setNotifications] = useState<AchievementNotification[]>([])

  // Loading and error states
  const isLoading = achievementsQuery.isLoading || userAchievementsQuery.isLoading || 
                   categoriesQuery.isLoading || leaderboardQuery.isLoading || 
                   recentAchievementsQuery.isLoading

  /**
   * Filter achievements based on current filter settings
   */
  const filteredAchievements = useMemo(() => {
    let filtered = [...achievements]

    // Filter by categories
    if (filters.categories.length > 0) {
      filtered = filtered.filter(achievement => 
        filters.categories.includes(achievement.category)
      )
    }

    // Filter by rarities
    if (filters.rarities.length > 0) {
      filtered = filtered.filter(achievement => 
        filters.rarities.includes(achievement.rarity)
      )
    }

    // Filter by status
    if (filters.statuses.length > 0) {
      filtered = filtered.filter(achievement => 
        filters.statuses.includes(achievement.status)
      )
    }

    // Filter by earned only
    if (filters.earnedOnly) {
      filtered = filtered.filter(achievement => 
        achievement.status === 'completed'
      )
    }

    // Filter by available only (unlocked but not completed)
    if (filters.availableOnly) {
      filtered = filtered.filter(achievement => 
        achievement.status === 'available' || achievement.status === 'in_progress'
      )
    }

    // Filter by secret only
    if (filters.secretOnly) {
      filtered = filtered.filter(achievement => 
        achievement.isSecret
      )
    }

    // Filter by search text
    if (filters.searchText.trim()) {
      const searchTerm = filters.searchText.toLowerCase()
      filtered = filtered.filter(achievement =>
        achievement.title.toLowerCase().includes(searchTerm) ||
        achievement.description.toLowerCase().includes(searchTerm) ||
        achievement.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        (achievement.lore && achievement.lore.toLowerCase().includes(searchTerm))
      )
    }

    // Filter by difficulty range
    filtered = filtered.filter(achievement =>
      achievement.difficulty >= filters.difficultyRange[0] &&
      achievement.difficulty <= filters.difficultyRange[1]
    )

    // Filter by series
    if (filters.seriesFilter) {
      filtered = filtered.filter(achievement => 
        achievement.series === filters.seriesFilter
      )
    }

    // Sort achievements
    filtered.sort((a, b) => {
      let comparison = 0
      
      switch (filters.sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title)
          break
        case 'rarity':
          const rarityOrder = { Common: 1, Rare: 2, Epic: 3, Legendary: 4, Mythic: 5 }
          comparison = rarityOrder[a.rarity] - rarityOrder[b.rarity]
          break
        case 'category':
          comparison = a.category.localeCompare(b.category)
          break
        case 'progress':
          comparison = a.progress - b.progress
          break
        case 'earnedAt':
          const aTime = a.earnedAt?.getTime() ?? 0
          const bTime = b.earnedAt?.getTime() ?? 0
          comparison = aTime - bTime
          break
        case 'difficulty':
          comparison = a.difficulty - b.difficulty
          break
        default:
          comparison = a.title.localeCompare(b.title)
      }
      
      return filters.sortDirection === 'asc' ? comparison : -comparison
    })

    return filtered
  }, [achievements, filters])

  /**
   * Get achievements that are close to completion (75%+ progress)
   */
  const nearCompletionAchievements = useMemo(() => {
    return achievements
      .filter(achievement => 
        achievement.status === 'in_progress' && 
        achievement.progress >= 75
      )
      .sort((a, b) => b.progress - a.progress)
  }, [achievements])

  /**
   * Get recommended achievements based on current progress and unlocked achievements
   */
  const recommendedAchievements = useMemo(() => {
    return achievements
      .filter(achievement => 
        (achievement.status === 'available' || achievement.status === 'in_progress') &&
        !achievement.isSecret &&
        achievement.difficulty <= 3 // Focus on easier achievements for recommendations
      )
      .sort((a, b) => {
        // Prioritize by progress, then by difficulty (easier first)
        if (a.progress !== b.progress) {
          return b.progress - a.progress
        }
        return a.difficulty - b.difficulty
      })
      .slice(0, 6) // Return top 6 recommendations
  }, [achievements])

  /**
   * Search achievements by query string
   */
  const searchAchievements = useCallback((query: string): Achievement[] => {
    if (!query.trim()) return achievements

    const searchTerm = query.toLowerCase()
    return achievements.filter(achievement =>
      achievement.title.toLowerCase().includes(searchTerm) ||
      achievement.description.toLowerCase().includes(searchTerm) ||
      achievement.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      (achievement.lore && achievement.lore.toLowerCase().includes(searchTerm))
    )
  }, [achievements])

  /**
   * Reset filters to default state
   */
  const resetFilters = useCallback(() => {
    setFilters(defaultAchievementFilters)
    soundFX.playClick()
  }, [])

  // Mutation for checking achievement progress
  const checkProgressMutation = useMutation({
    mutationFn: (achievementId: string) => apiService.achievements.getAchievementProgress(achievementId),
    onSuccess: (data) => {
      // Update the user achievements query cache
      queryClient.invalidateQueries({ queryKey: queryKeys.achievements.user })
      soundFX.playClick()
      
      // If achievement was just completed, show notification
      if (data.unlocked) {
        const notification: AchievementNotification = {
          id: `notif_${Date.now()}`,
          achievement: data.achievement as Achievement,
          earnedAt: new Date(data.unlockedAt || new Date()),
          isRead: false,
          isDismissed: false
        }
        setNotifications(prev => [notification, ...prev])
        soundFX.playSuccess()
      }
    },
    onError: () => {
      soundFX.playError()
    }
  })

  /**
   * Check and update progress for a specific achievement
   */
  const checkAchievementProgress = useCallback(async (achievementId: string) => {
    checkProgressMutation.mutate(achievementId)
  }, [checkProgressMutation])

  // Mutation for claiming achievements
  const claimAchievementMutation = useMutation({
    mutationFn: (achievementId: string) => apiService.achievements.claimAchievement(achievementId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.achievements.user })
      soundFX.playSuccess()
    },
    onError: () => {
      soundFX.playError()
    }
  })

  /**
   * Share an achievement to a social platform
   */
  const shareAchievement = useCallback(async (
    achievement: Achievement, 
    platform: string, 
    message?: string
  ) => {
    try {
      // Mock sharing logic - would integrate with actual social APIs
      console.log(`Sharing achievement "${achievement.title}" to ${platform}`, {
        message,
        achievement: achievement.title,
        rarity: achievement.rarity,
        xp: achievement.reward?.xp || 0
      })

      soundFX.playSuccess()
    } catch (error) {
      soundFX.playError()
    }
  }, [])

  /**
   * Mark a notification as read
   */
  const markNotificationRead = useCallback((notificationId: string) => {
    setNotifications(prev => prev.map(notification =>
      notification.id === notificationId
        ? { ...notification, isRead: true }
        : notification
    ))
    soundFX.playClick()
  }, [])

  /**
   * Dismiss a notification
   */
  const dismissNotification = useCallback((notificationId: string) => {
    setNotifications(prev => prev.filter(notification => 
      notification.id !== notificationId
    ))
    soundFX.playClick()
  }, [])

  /**
   * Clear error message
   */
  const clearError = useCallback(() => {
    queryClient.resetQueries({ queryKey: queryKeys.achievements.all })
    queryClient.resetQueries({ queryKey: queryKeys.achievements.user })
  }, [queryClient])

  return {
    // Data
    achievements,
    filteredAchievements,
    achievementSeries,
    stats,
    leaderboard,
    notifications,

    // Filters & Search
    filters,
    setFilters,
    resetFilters,
    searchAchievements,

    // Actions
    checkAchievementProgress,
    shareAchievement,
    markNotificationRead,
    dismissNotification,

    // State
    isLoading,
    selectedAchievement,
    setSelectedAchievement,

    // Computed
    nearCompletionAchievements,
    recommendedAchievements,

    // Error handling
    error: achievementsQuery.error?.message || userAchievementsQuery.error?.message || 
           categoriesQuery.error?.message || leaderboardQuery.error?.message || 
           recentAchievementsQuery.error?.message || checkProgressMutation.error?.message ||
           claimAchievementMutation.error?.message || null,
    clearError
  }
}