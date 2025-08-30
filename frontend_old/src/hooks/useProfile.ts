import { useState, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { soundFX } from '@/utils/soundEffects'
import { useProfilePage } from '@/hooks/pages/useProfilePage'
import type { ProfileTab, Achievement } from '@/types/profile'

interface UseProfileOptions {
  // Future extensibility options
}

export const useProfile = (_options: UseProfileOptions = {}) => {
  const navigate = useNavigate()
  
  // Get profile data from API hook
  const { data: profileData, isLoading, error } = useProfilePage()

  // UI State
  const [selectedTab, setSelectedTab] = useState<ProfileTab>('overview')

  // Business logic handlers
  const handleTabChange = useCallback((tab: ProfileTab) => {
    setSelectedTab(tab)
    soundFX.playClick()
  }, [])

  const handleEditProfile = useCallback(() => {
    soundFX.playClick()
    navigate('/settings/account')
  }, [navigate])

  const handleQuickAction = useCallback((link: string) => {
    soundFX.playClick()
    navigate(link)
  }, [navigate])

  // Utility functions for data processing
  const getRarityColor = useCallback((rarity: string): string => {
    switch (rarity) {
      case 'common': return 'from-gray-500 to-gray-600'
      case 'rare': return 'from-blue-500 to-blue-600'
      case 'epic': return 'from-purple-500 to-purple-600'
      case 'legendary': return 'from-yellow-500 to-orange-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }, [])

  const getActivityIcon = useCallback((type: string) => {
    const icons = {
      puzzle: 'Target',
      game: 'Gamepad2', 
      achievement: 'Trophy',
      study: 'Brain'
    }
    return icons[type as keyof typeof icons] || 'Star'
  }, [])

  const calculateAchievementProgress = useCallback((achievement: Achievement): number => {
    return (achievement.progress / achievement.total) * 100
  }, [])

  // Clear error function
  const clearError = useCallback(() => {
    // Error clearing logic would go here
  }, [])

  return {
    // State
    selectedTab,
    isLoading,
    error,
    profileData,

    // Handlers (all business logic contained here)
    handleTabChange,
    handleEditProfile, 
    handleQuickAction,
    clearError,

    // Utility functions
    getRarityColor,
    getActivityIcon,
    calculateAchievementProgress,

    // Computed values - with null checks
    achievements: profileData?.achievements || [],
    quickActions: profileData?.quickActions || [],
    recentActivity: profileData?.recentActivity || [],
    userStats: profileData?.userStats
  }
}