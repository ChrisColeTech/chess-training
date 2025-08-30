import { Crown, Trophy, Target, Zap, Clock, Star, Shield, Sword } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface BadgeConfig {
  id: string
  label: string
  icon: LucideIcon
  variant: 'default' | 'secondary' | 'destructive' | 'outline'
  colorClass: string
  threshold?: number
}

export interface ELORatingBadge {
  id: string
  label: string
  minRating: number
  maxRating: number
  icon: LucideIcon
  variant: 'default' | 'secondary' | 'destructive' | 'outline'
  colorClass: string
}

export const NOTIFICATION_BADGES: Record<string, BadgeConfig> = {
  UNREAD_MESSAGES: {
    id: 'unread-messages',
    label: 'New Messages',
    icon: Target,
    variant: 'destructive',
    colorClass: 'bg-red-500 text-white'
  },
  ACHIEVEMENT_UNLOCKED: {
    id: 'achievement',
    label: 'Achievement',
    icon: Trophy,
    variant: 'default',
    colorClass: 'bg-yellow-500 text-black'
  },
  RATING_CHANGE: {
    id: 'rating-change',
    label: 'Rating Updated',
    icon: Crown,
    variant: 'secondary',
    colorClass: 'bg-blue-500 text-white'
  },
  PUZZLE_STREAK: {
    id: 'puzzle-streak',
    label: 'Streak',
    icon: Zap,
    variant: 'outline',
    colorClass: 'bg-purple-500 text-white'
  }
}

export const ELO_RATING_BADGES: ELORatingBadge[] = [
  {
    id: 'beginner',
    label: 'Beginner',
    minRating: 0,
    maxRating: 999,
    icon: Target,
    variant: 'secondary',
    colorClass: 'bg-gray-500 text-white'
  },
  {
    id: 'novice',
    label: 'Novice',
    minRating: 1000,
    maxRating: 1199,
    icon: Shield,
    variant: 'outline',
    colorClass: 'bg-green-600 text-white'
  },
  {
    id: 'intermediate',
    label: 'Intermediate',
    minRating: 1200,
    maxRating: 1399,
    icon: Sword,
    variant: 'default',
    colorClass: 'bg-blue-600 text-white'
  },
  {
    id: 'advanced',
    label: 'Advanced',
    minRating: 1400,
    maxRating: 1599,
    icon: Star,
    variant: 'default',
    colorClass: 'bg-purple-600 text-white'
  },
  {
    id: 'expert',
    label: 'Expert',
    minRating: 1600,
    maxRating: 1799,
    icon: Crown,
    variant: 'default',
    colorClass: 'bg-orange-600 text-white'
  },
  {
    id: 'master',
    label: 'Master',
    minRating: 1800,
    maxRating: 2199,
    icon: Trophy,
    variant: 'default',
    colorClass: 'bg-red-600 text-white'
  },
  {
    id: 'grandmaster',
    label: 'Grandmaster',
    minRating: 2200,
    maxRating: 9999,
    icon: Crown,
    variant: 'default',
    colorClass: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold'
  }
]

export const STATUS_BADGES: Record<string, BadgeConfig> = {
  ONLINE: {
    id: 'online',
    label: 'Online',
    icon: Zap,
    variant: 'default',
    colorClass: 'bg-green-500 text-white'
  },
  OFFLINE: {
    id: 'offline',
    label: 'Offline',
    icon: Clock,
    variant: 'secondary',
    colorClass: 'bg-gray-500 text-white'
  },
  IN_GAME: {
    id: 'in-game',
    label: 'In Game',
    icon: Target,
    variant: 'destructive',
    colorClass: 'bg-blue-500 text-white'
  },
  STUDYING: {
    id: 'studying',
    label: 'Studying',
    icon: Star,
    variant: 'outline',
    colorClass: 'bg-purple-500 text-white'
  }
}

export const getBadgeForELO = (rating: number): ELORatingBadge => {
  return ELO_RATING_BADGES.find(badge => 
    rating >= badge.minRating && rating <= badge.maxRating
  ) || ELO_RATING_BADGES[0]
}

export const getBadgeVariant = (type: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
  const badge = NOTIFICATION_BADGES[type] || STATUS_BADGES[type]
  return badge?.variant || 'default'
}