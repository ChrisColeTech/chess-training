/**
 * Achievement Configurations
 * Extracted from achievement components - rarity colors, progress settings, badge configurations
 */

import { Target, Trophy, Medal, Crown, Star } from 'lucide-react'

// Rarity system configuration
export const rarityConfig = {
  Common: {
    colors: {
      border: 'border-gray-500/50',
      bg: 'bg-gray-500/10',
      text: 'text-gray-400',
      glow: 'shadow-gray-500/20',
      gradient: 'from-gray-400 to-gray-600'
    },
    filterColor: 'text-gray-400 border-gray-500/50 bg-gray-500/10',
    icon: Target
  },
  Rare: {
    colors: {
      border: 'border-blue-500/50',
      bg: 'bg-blue-500/10',
      text: 'text-blue-400',
      glow: 'shadow-blue-500/20',
      gradient: 'from-blue-400 to-blue-600'
    },
    filterColor: 'text-blue-400 border-blue-500/50 bg-blue-500/10',
    icon: Trophy
  },
  Epic: {
    colors: {
      border: 'border-purple-500/50',
      bg: 'bg-purple-500/10',
      text: 'text-purple-400',
      glow: 'shadow-purple-500/20',
      gradient: 'from-purple-400 to-purple-600'
    },
    filterColor: 'text-purple-400 border-purple-500/50 bg-purple-500/10',
    icon: Medal
  },
  Legendary: {
    colors: {
      border: 'border-yellow-500/50',
      bg: 'bg-yellow-500/10',
      text: 'text-yellow-400',
      glow: 'shadow-yellow-500/20',
      gradient: 'from-yellow-400 to-orange-500'
    },
    filterColor: 'text-yellow-400 border-yellow-500/50 bg-yellow-500/10',
    icon: Crown
  },
  Mythic: {
    colors: {
      border: 'border-pink-500/50',
      bg: 'bg-pink-500/10',
      text: 'text-pink-400',
      glow: 'shadow-pink-500/20',
      gradient: 'from-pink-400 via-purple-500 to-cyan-400'
    },
    filterColor: 'text-pink-400 border-pink-500/50 bg-pink-500/10',
    icon: Star
  }
} as const

export type RarityLevel = keyof typeof rarityConfig

// Helper function to get rarity colors
export const getRarityColors = (rarity: RarityLevel) => {
  return rarityConfig[rarity]?.colors || {
    border: 'border-slate-500/50',
    bg: 'bg-slate-500/10',
    text: 'text-slate-400',
    glow: 'shadow-slate-500/20',
    gradient: 'from-slate-400 to-slate-600'
  }
}

// Helper function to get rarity filter color
export const getRarityFilterColor = (rarity: string) => {
  switch (rarity) {
    case 'Common': return 'text-gray-400 border-gray-500/50 bg-gray-500/10'
    case 'Rare': return 'text-blue-400 border-blue-500/50 bg-blue-500/10'
    case 'Epic': return 'text-purple-400 border-purple-500/50 bg-purple-500/10'
    case 'Legendary': return 'text-yellow-400 border-yellow-500/50 bg-yellow-500/10'
    case 'Mythic': return 'text-pink-400 border-pink-500/50 bg-pink-500/10'
    default: return 'text-slate-400 border-slate-500/50 bg-slate-500/10'
  }
}

// Helper function to get rarity icon
export const getRarityIcon = (rarity: string) => {
  switch (rarity) {
    case 'Common': return Target
    case 'Rare': return Trophy
    case 'Epic': return Medal
    case 'Legendary': return Crown
    case 'Mythic': return Star
    default: return Trophy
  }
}

// Helper function to get rarity color for stats
export const getRarityStatsColor = (rarity: string) => {
  switch (rarity) {
    case 'Common': return 'text-gray-400'
    case 'Rare': return 'text-blue-400'
    case 'Epic': return 'text-purple-400'
    case 'Legendary': return 'text-yellow-400'
    case 'Mythic': return 'text-pink-400'
    default: return 'text-slate-400'
  }
}

// Badge size configurations
export const badgeSizeConfig = {
  small: {
    container: 'w-12 h-12',
    icon: 16,
    border: 'border-2'
  },
  medium: {
    container: 'w-20 h-20',
    icon: 24,
    border: 'border-3'
  },
  large: {
    container: 'w-32 h-32',
    icon: 48,
    border: 'border-4'
  },
  hero: {
    container: 'w-48 h-48',
    icon: 72,
    border: 'border-6'
  }
} as const

export type BadgeSize = keyof typeof badgeSizeConfig

// Achievement card size configurations
export const achievementCardSizeConfig = {
  small: 'p-4',
  medium: 'p-6',
  large: 'p-8'
} as const

// Available categories for achievements
export const availableAchievementCategories = [
  'Tactics',
  'Endgames',
  'Openings',
  'Strategy',
  'Puzzles',
  'Games',
  'Study',
  'Streaks',
  'Social',
  'Special'
] as const

// Available rarities for achievements
export const availableAchievementRarities = [
  'Common',
  'Rare', 
  'Epic',
  'Legendary',
  'Mythic'
] as const

// Sort options for achievements
export const achievementSortOptions = [
  { key: 'title', label: 'Name' },
  { key: 'rarity', label: 'Rarity' },
  { key: 'category', label: 'Category' },
  { key: 'progress', label: 'Progress' },
  { key: 'earnedAt', label: 'Earned Date' },
  { key: 'difficulty', label: 'Difficulty' }
] as const

// Default filter state
export const defaultAchievementFilters = {
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
  seriesFilter: undefined
} as const

// Progress tracker size configurations
export const progressTrackerSizeConfig = {
  small: {
    height: 'h-2',
    textSize: 'text-xs',
    spacing: 'mb-1'
  },
  medium: {
    height: 'h-3',
    textSize: 'text-sm',
    spacing: 'mb-2'
  },
  large: {
    height: 'h-4',
    textSize: 'text-base',
    spacing: 'mb-3'
  }
} as const

export type ProgressTrackerSize = keyof typeof progressTrackerSizeConfig

// Helper function to format achievement date
export const formatAchievementDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

// Helper function to get difficulty stars
export const getDifficultyStars = (difficulty: number) => {
  return Array.from({ length: 5 }, (_, index) => ({
    filled: index < difficulty,
    key: index
  }))
}