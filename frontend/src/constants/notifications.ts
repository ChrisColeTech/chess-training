import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Info, 
  Loader2, 
  Crown,
  Trophy,
  Target,
  Zap
} from 'lucide-react'

export interface NotificationConfig {
  id: string
  title: string
  icon: any
  duration?: number
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'loading'
}

// Notification types for different chess app scenarios
export const NOTIFICATION_TYPES = {
  // General notifications
  SUCCESS: {
    id: 'success',
    title: 'Success',
    icon: CheckCircle,
    duration: 4000,
    variant: 'success' as const
  },
  ERROR: {
    id: 'error',
    title: 'Error',
    icon: XCircle,
    duration: 6000,
    variant: 'destructive' as const
  },
  WARNING: {
    id: 'warning',
    title: 'Warning',
    icon: AlertTriangle,
    duration: 5000,
    variant: 'warning' as const
  },
  INFO: {
    id: 'info',
    title: 'Information',
    icon: Info,
    duration: 4000,
    variant: 'default' as const
  },
  LOADING: {
    id: 'loading',
    title: 'Loading',
    icon: Loader2,
    duration: 0, // Don't auto-dismiss loading notifications
    variant: 'loading' as const
  },

  // Chess-specific notifications
  GAME_WON: {
    id: 'game-won',
    title: 'Victory!',
    icon: Trophy,
    duration: 6000,
    variant: 'success' as const
  },
  GAME_LOST: {
    id: 'game-lost',
    title: 'Game Over',
    icon: Target,
    duration: 5000,
    variant: 'default' as const
  },
  PUZZLE_SOLVED: {
    id: 'puzzle-solved',
    title: 'Puzzle Solved!',
    icon: Zap,
    duration: 4000,
    variant: 'success' as const
  },
  ACHIEVEMENT_UNLOCKED: {
    id: 'achievement',
    title: 'Achievement Unlocked!',
    icon: Crown,
    duration: 8000,
    variant: 'success' as const
  },
  RATING_CHANGED: {
    id: 'rating-change',
    title: 'Rating Updated',
    icon: Target,
    duration: 5000,
    variant: 'default' as const
  }
} as const

export type NotificationType = keyof typeof NOTIFICATION_TYPES

// Pre-configured alert variants for static alerts
export const ALERT_VARIANTS = {
  CONNECTION_ERROR: {
    variant: 'destructive' as const,
    title: 'Connection Error',
    description: 'Unable to connect to the chess server. Please check your internet connection.',
    icon: XCircle
  },
  ACCOUNT_VERIFICATION: {
    variant: 'warning' as const,
    title: 'Account Verification Required',
    description: 'Please verify your email address to access all features.',
    icon: AlertTriangle
  },
  GAME_SAVED: {
    variant: 'default' as const,
    title: 'Game Saved',
    description: 'Your game progress has been automatically saved.',
    icon: CheckCircle
  },
  PREMIUM_FEATURE: {
    variant: 'default' as const,
    title: 'Premium Feature',
    description: 'This feature is available to premium subscribers. Upgrade to access advanced training tools.',
    icon: Crown
  }
} as const

export type AlertVariantType = keyof typeof ALERT_VARIANTS