import { useCallback } from 'react'
import { useToast } from '../use-toast'
import { NOTIFICATION_TYPES } from '../../constants/notifications'
import type { NotificationType } from '../../constants/notifications'
import type { ToastActionElement } from '../../components/ui/toast'

export interface NotificationOptions {
  description?: string
  action?: ToastActionElement
  duration?: number
}

export interface NotificationActions {
  showSuccess: (message: string, options?: NotificationOptions) => void
  showError: (message: string, options?: NotificationOptions) => void
  showWarning: (message: string, options?: NotificationOptions) => void
  showInfo: (message: string, options?: NotificationOptions) => void
  showLoading: (message: string, options?: Omit<NotificationOptions, 'duration'>) => void
  showGameResult: (won: boolean, details?: string, eloChange?: number) => void
  showPuzzleSolved: (difficulty: string, timeSpent: number) => void
  showAchievement: (achievementName: string, description?: string) => void
  showRatingChange: (oldRating: number, newRating: number) => void
  dismiss: (toastId: string) => void
  dismissAll: () => void
}

export const useNotifications = (): NotificationActions => {
  const { toast } = useToast()

  const showNotification = useCallback((
    type: NotificationType, 
    message: string, 
    options: NotificationOptions = {}
  ) => {
    const config = NOTIFICATION_TYPES[type]

    const toastOptions = {
      title: message,
      description: options.description,
      duration: options.duration ?? config.duration,
      action: options.action,
      variant: config.variant === 'destructive' ? 'destructive' as const : 'default' as const
    }

    // Remove undefined values
    Object.keys(toastOptions).forEach(key => {
      if ((toastOptions as any)[key] === undefined) {
        delete (toastOptions as any)[key]
      }
    })

    return toast(toastOptions)
  }, [toast])

  const showSuccess = useCallback((message: string, options?: NotificationOptions) => {
    showNotification('SUCCESS', message, options)
  }, [showNotification])

  const showError = useCallback((message: string, options?: NotificationOptions) => {
    showNotification('ERROR', message, options)
  }, [showNotification])

  const showWarning = useCallback((message: string, options?: NotificationOptions) => {
    showNotification('WARNING', message, options)
  }, [showNotification])

  const showInfo = useCallback((message: string, options?: NotificationOptions) => {
    showNotification('INFO', message, options)
  }, [showNotification])

  const showLoading = useCallback((message: string, options?: Omit<NotificationOptions, 'duration'>) => {
    showNotification('LOADING', message, { ...options, duration: 0 })
  }, [showNotification])

  // Chess-specific notification methods
  const showGameResult = useCallback((won: boolean, details?: string, eloChange?: number) => {
    const type = won ? 'GAME_WON' : 'GAME_LOST'
    const message = won ? 'Congratulations!' : 'Better luck next time!'
    
    let description = details
    if (eloChange) {
      const change = eloChange > 0 ? `+${eloChange}` : `${eloChange}`
      description = description 
        ? `${description} (Rating: ${change})`
        : `Rating change: ${change}`
    }

    showNotification(type, message, { description })
  }, [showNotification])

  const showPuzzleSolved = useCallback((difficulty: string, timeSpent: number) => {
    const message = `${difficulty} puzzle solved!`
    const description = `Completed in ${timeSpent}s`
    showNotification('PUZZLE_SOLVED', message, { description })
  }, [showNotification])

  const showAchievement = useCallback((achievementName: string, description?: string) => {
    showNotification('ACHIEVEMENT_UNLOCKED', achievementName, { 
      description,
      duration: 8000 // Longer duration for achievements
    })
  }, [showNotification])

  const showRatingChange = useCallback((oldRating: number, newRating: number) => {
    const change = newRating - oldRating
    const changeText = change > 0 ? `+${change}` : `${change}`
    const message = `${oldRating} → ${newRating}`
    const description = `Rating change: ${changeText}`
    
    showNotification('RATING_CHANGED', message, { description })
  }, [showNotification])

  const dismiss = useCallback(() => {
    // V3 toast doesn't expose dismiss by id - dismiss all
    // Individual toast dismissal would need to be implemented differently
    console.log('Dismiss functionality limited in v3 toast')
  }, [])

  const dismissAll = useCallback(() => {
    // V3 toast dismiss all would need custom implementation
    console.log('Dismiss all functionality limited in v3 toast')
  }, [])

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showLoading,
    showGameResult,
    showPuzzleSolved,
    showAchievement,
    showRatingChange,
    dismiss,
    dismissAll
  }
}