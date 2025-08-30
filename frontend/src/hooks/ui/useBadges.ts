import { useMemo, useEffect, useState } from 'react'
import { useAuth } from '../auth/useAuth'
import { dashboardService } from '../../services/dashboard/dashboardService'
import { userService } from '../../services/user/userService'
import { 
  getBadgeForELO, 
  NOTIFICATION_BADGES, 
  STATUS_BADGES, 
  type BadgeConfig,
  type ELORatingBadge 
} from '../../constants/badges'

export interface BadgeState {
  eloBadge: ELORatingBadge
  statusBadge: BadgeConfig
  notificationBadges: BadgeConfig[]
  unreadCount: number
}

export interface BadgeActions {
  getNotificationBadge: (type: string) => BadgeConfig | null
  getStatusBadge: (status: string) => BadgeConfig | null
  formatBadgeText: (badge: BadgeConfig, count?: number) => string
}

export const useBadges = (): BadgeState & BadgeActions => {
  const { user } = useAuth()
  const [dashboardStats, setDashboardStats] = useState<any>(null)
  const [userStats, setUserStats] = useState<any>(null)

  // Fetch real dashboard stats from API
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const stats = await dashboardService.getDashboardStats()
        setDashboardStats(stats)
      } catch (error) {
        console.error('Failed to fetch dashboard stats for badges:', error)
      }
    }

    const fetchUserStats = async () => {
      try {
        const stats = await userService.getUserStats()
        setUserStats(stats)
      } catch (error) {
        console.error('Failed to fetch user stats for badges:', error)
      }
    }

    if (user) {
      fetchDashboardStats()
      fetchUserStats()
    }
  }, [user])

  const eloBadge = useMemo(() => {
    const rating = dashboardStats?.chess_elo || user?.chess_elo || 1200
    return getBadgeForELO(rating)
  }, [dashboardStats?.chess_elo, user?.chess_elo])

  const statusBadge = useMemo(() => {
    // Default to online for now - could be expanded with real connection tracking
    return STATUS_BADGES.ONLINE
  }, [])

  const notificationBadges = useMemo(() => {
    const badges: BadgeConfig[] = []
    
    // Add achievement badge if user has recent achievements
    if (userStats?.achievements_unlocked > 0) {
      badges.push(NOTIFICATION_BADGES.ACHIEVEMENT_UNLOCKED)
    }

    // Add rating change badge if user's rating changed recently
    if (dashboardStats?.rating_change && dashboardStats.rating_change !== 0) {
      badges.push(NOTIFICATION_BADGES.RATING_CHANGE)
    }

    // Add puzzle streak badge if user has active streak
    if (userStats?.current_streak && userStats.current_streak > 0) {
      badges.push(NOTIFICATION_BADGES.PUZZLE_STREAK)
    }

    return badges
  }, [dashboardStats?.rating_change, userStats?.achievements_unlocked, userStats?.current_streak])

  const unreadCount = useMemo(() => {
    // TODO: This should come from a real notifications API endpoint
    // For now, return 0 since we don't have notification data
    return 0
  }, [user?.id])

  const getNotificationBadge = (type: string): BadgeConfig | null => {
    return NOTIFICATION_BADGES[type] || null
  }

  const getStatusBadge = (status: string): BadgeConfig | null => {
    return STATUS_BADGES[status] || null
  }

  const formatBadgeText = (badge: BadgeConfig, count?: number): string => {
    if (count && count > 1) {
      return `${count} ${badge.label}s`
    }
    return badge.label
  }

  return {
    eloBadge,
    statusBadge,
    notificationBadges,
    unreadCount,
    getNotificationBadge,
    getStatusBadge,
    formatBadgeText
  }
}