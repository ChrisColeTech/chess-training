import { useState, useEffect, useCallback, useMemo } from 'react'
import { soundFX } from '@/utils/soundEffects'
import {
  mockAchievements,
  mockAchievementSeries,
  mockAchievementStats,
  mockLeaderboard,
  mockNotifications,
  defaultAchievementFilters
} from '@/data/gamificationData'
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
  // Core achievement data
  const [achievements, setAchievements] = useState<Achievement[]>(mockAchievements)
  const [achievementSeries, setAchievementSeries] = useState<AchievementSeries[]>(mockAchievementSeries)
  const [stats, setStats] = useState<AchievementStats>(mockAchievementStats)
  const [leaderboard] = useState<AchievementLeaderboardEntry[]>(mockLeaderboard)
  const [notifications, setNotifications] = useState<AchievementNotification[]>(mockNotifications)

  // UI state
  const [filters, setFilters] = useState<AchievementFilters>(defaultAchievementFilters)
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
        achievement.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
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
      achievement.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
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

  /**
   * Check and update progress for a specific achievement
   */
  const checkAchievementProgress = useCallback(async (achievementId: string) => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate checking progress with backend/calculation
      await new Promise(resolve => setTimeout(resolve, 300))

      setAchievements(prev => prev.map(achievement => {
        if (achievement.id === achievementId) {
          // Mock progress update logic would go here
          // For now, just simulate a small progress increase for in_progress achievements
          if (achievement.status === 'in_progress') {
            const newProgress = Math.min(achievement.progress + Math.random() * 10, 100)
            const newStatus = newProgress >= 100 ? 'completed' : 'in_progress'
            
            if (newStatus === 'completed' && achievement.status === 'in_progress') {
              // Achievement just completed!
              soundFX.playSuccess()
              
              // Add notification
              const notification: AchievementNotification = {
                id: `notif_${Date.now()}`,
                achievement: { ...achievement, status: 'completed', progress: 100 },
                earnedAt: new Date(),
                isRead: false,
                isDismissed: false
              }
              
              setNotifications(prev => [notification, ...prev])
            }

            return {
              ...achievement,
              progress: newProgress,
              status: newStatus,
              earnedAt: newStatus === 'completed' ? new Date() : achievement.earnedAt
            }
          }
        }
        return achievement
      }))

      soundFX.playClick()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to check achievement progress')
      soundFX.playError()
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Share an achievement to a social platform
   */
  const shareAchievement = useCallback(async (
    achievement: Achievement, 
    platform: string, 
    message?: string
  ) => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate sharing API call
      await new Promise(resolve => setTimeout(resolve, 500))

      // Mock sharing logic
      console.log(`Sharing achievement "${achievement.title}" to ${platform}`, {
        message,
        achievement: achievement.title,
        rarity: achievement.rarity,
        xp: achievement.reward.xp
      })

      soundFX.playSuccess()
      
      // Could add share tracking to stats here
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to share achievement')
      soundFX.playError()
    } finally {
      setIsLoading(false)
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
    setError(null)
  }, [])

  /**
   * Update achievement statistics when achievements change
   */
  useEffect(() => {
    const completedAchievements = achievements.filter(a => a.status === 'completed')
    const totalXp = completedAchievements.reduce((sum, a) => sum + a.reward.xp, 0)

    const newStats: AchievementStats = {
      ...stats,
      completedAchievements: completedAchievements.length,
      completionRate: Math.round((completedAchievements.length / achievements.length) * 100),
      totalXpEarned: totalXp,
      recentlyEarned: completedAchievements
        .filter(a => a.earnedAt)
        .sort((a, b) => (b.earnedAt?.getTime() ?? 0) - (a.earnedAt?.getTime() ?? 0))
        .slice(0, 10),
      nearCompletion: achievements
        .filter(a => a.status === 'in_progress' && a.progress >= 75)
        .sort((a, b) => b.progress - a.progress)
    }

    // Update rarity and category stats
    Object.keys(newStats.byRarity).forEach(rarity => {
      const rarityAchievements = achievements.filter(a => a.rarity === rarity)
      const completedRarity = rarityAchievements.filter(a => a.status === 'completed')
      
      newStats.byRarity[rarity as keyof typeof newStats.byRarity] = {
        total: rarityAchievements.length,
        completed: completedRarity.length,
        rate: rarityAchievements.length > 0 
          ? Math.round((completedRarity.length / rarityAchievements.length) * 100) 
          : 0
      }
    })

    Object.keys(newStats.byCategory).forEach(category => {
      const categoryAchievements = achievements.filter(a => a.category === category)
      const completedCategory = categoryAchievements.filter(a => a.status === 'completed')
      
      newStats.byCategory[category as keyof typeof newStats.byCategory] = {
        total: categoryAchievements.length,
        completed: completedCategory.length,
        rate: categoryAchievements.length > 0 
          ? Math.round((completedCategory.length / categoryAchievements.length) * 100) 
          : 0
      }
    })

    setStats(newStats)
  }, [achievements])

  /**
   * Update achievement series progress when achievements change
   */
  useEffect(() => {
    setAchievementSeries(prev => prev.map(series => {
      const seriesAchievements = achievements.filter(a => a.series === series.id)
      const completedCount = seriesAchievements.filter(a => a.status === 'completed').length
      const progress = seriesAchievements.length > 0 
        ? Math.round((completedCount / seriesAchievements.length) * 100) 
        : 0

      return {
        ...series,
        completedCount,
        progress
      }
    }))
  }, [achievements])

  /**
   * Initialize achievements data on mount
   */
  useEffect(() => {
    // This would typically load from localStorage or API
    // For now, we're using mock data
    setIsLoading(false)
  }, [])

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
    error,
    clearError
  }
}