/**
 * Skill Tree Configurations
 * Extracted from SkillTree component - mastery levels, colors, and visual settings
 */

import { Star, Lock, CheckCircle, TrendingUp, Clock } from 'lucide-react'

// Skill mastery level definitions
export type SkillLevel = 'Locked' | 'Beginner' | 'Developing' | 'Proficient' | 'Advanced' | 'Mastered'

// Mastery level configuration
export const masteryLevelConfig = {
  Mastered: {
    color: 'from-emerald-400 to-emerald-600',
    icon: CheckCircle,
    textColor: 'text-emerald-400'
  },
  Advanced: {
    color: 'from-blue-400 to-blue-600',
    icon: Star,
    textColor: 'text-blue-400'
  },
  Proficient: {
    color: 'from-indigo-400 to-indigo-600',
    icon: Star,
    textColor: 'text-indigo-400'
  },
  Developing: {
    color: 'from-yellow-400 to-orange-500',
    icon: TrendingUp,
    textColor: 'text-yellow-400'
  },
  Beginner: {
    color: 'from-purple-400 to-purple-600',
    icon: Star,
    textColor: 'text-purple-400'
  },
  Locked: {
    color: 'from-gray-400 to-gray-600',
    icon: Lock,
    textColor: 'text-gray-400'
  }
} as const

// Helper function to get mastery color
export const getMasteryColor = (level: SkillLevel) => {
  return masteryLevelConfig[level]?.color || 'from-gray-400 to-gray-600'
}

// Helper function to get mastery icon
export const getMasteryIcon = (level: SkillLevel, isUnlocked: boolean) => {
  if (!isUnlocked) return Lock
  
  return masteryLevelConfig[level]?.icon || Star
}

// Helper function to get mastery text color
export const getMasteryTextColor = (level: SkillLevel) => {
  return masteryLevelConfig[level]?.textColor || 'text-gray-400'
}

// Skill tree legend configuration
export const skillTreeLegend = [
  {
    level: 'Mastered' as const,
    color: 'bg-gradient-to-r from-emerald-400 to-emerald-600',
    label: 'Mastered'
  },
  {
    level: 'Advanced' as const,
    color: 'bg-gradient-to-r from-blue-400 to-blue-600',
    label: 'Advanced'
  },
  {
    level: 'Proficient' as const,
    color: 'bg-gradient-to-r from-indigo-400 to-indigo-600',
    label: 'Proficient'
  },
  {
    level: 'Developing' as const,
    color: 'bg-gradient-to-r from-yellow-400 to-orange-500',
    label: 'Developing'
  },
  {
    level: 'Beginner' as const,
    color: 'bg-gradient-to-r from-purple-400 to-purple-600',
    label: 'Beginner'
  }
] as const

// Connection types for skill nodes
export const connectionTypes = {
  prerequisite: {
    opacity: 0.6,
    strokeStyle: 'solid',
    label: 'Prerequisite'
  },
  enhancement: {
    opacity: 0.3,
    strokeStyle: 'dashed',
    label: 'Enhancement'
  },
  related: {
    opacity: 0.2,
    strokeStyle: 'dotted',
    label: 'Related'
  }
} as const

export type ConnectionType = keyof typeof connectionTypes

// Skill tree view modes
export const skillTreeViewModes = {
  overview: {
    label: 'Overview',
    description: 'Complete skill tree overview'
  },
  category: {
    label: 'By Category',
    description: 'Skills grouped by category'
  },
  progress: {
    label: 'Progress View',
    description: 'Focus on current progress'
  },
  mastery: {
    label: 'Mastery Levels',
    description: 'Skills grouped by mastery level'
  }
} as const

export type SkillTreeViewMode = keyof typeof skillTreeViewModes

// Glow intensity calculation helper
export const calculateGlowIntensity = (isUnlocked: boolean, isFeatured: boolean, masteryProgress: number) => {
  if (!isUnlocked) return 0
  if (isFeatured) return 1
  return masteryProgress / 100
}

// Progress ring calculation helper
export const calculateProgressRingOffset = (progress: number, radius: number = 46) => {
  const circumference = 2 * Math.PI * radius
  return circumference * (1 - progress / 100)
}

// Animation delays and timing
export const skillTreeAnimations = {
  nodeDelay: 100, // ms between node animations
  connectionDelay: 100, // ms between connection animations
  hoverDuration: 200, // ms for hover transitions
  progressDuration: 1000, // ms for progress animations
  glowPulseSpeed: 2000 // ms for glow pulse cycle
} as const

// Skill node visual configuration
export const skillNodeConfig = {
  baseSize: 24, // width and height in units
  iconSizes: {
    small: 16,
    medium: 20,
    large: 24,
    xlarge: 32
  },
  borderRadius: 'rounded-full',
  hoverScale: 1.1,
  selectedScale: 1.15,
  shadowIntensity: {
    none: '',
    light: 'shadow-lg',
    medium: 'shadow-xl',
    heavy: 'shadow-2xl'
  }
} as const

// Tooltip configuration
export const skillTooltipConfig = {
  maxWidth: 'max-w-xs',
  backgroundColor: 'bg-gray-900/95',
  backdropBlur: 'backdrop-blur-sm',
  borderColor: 'border-gray-700',
  textColor: 'text-white',
  fadeInDuration: 200,
  fadeOutDuration: 150,
  showDelay: 300,
  hideDelay: 100
} as const

// Featured skill indicator configuration
export const featuredSkillConfig = {
  ringColor: 'ring-yellow-400/60',
  starColor: 'text-yellow-400',
  animationSpeed: 3000, // ms for star rotation
  pulseSpeed: 1500 // ms for featured pulse
} as const