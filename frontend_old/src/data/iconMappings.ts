/**
 * Centralized Icon Mappings
 * Extracted from multiple components to eliminate duplication
 */

import React from 'react'
import { 
  Target, Crown, Flame, Star, Zap, Shield, Sword, BookOpen, Lock,
  Trophy, TrendingUp, Gamepad, Clock, CheckCircle, Medal
} from 'lucide-react'
import { FaBrain, FaCrown } from 'react-icons/fa'
import { GiSwordsPower } from 'react-icons/gi'

// Main icon map used across the application
export const iconMap = {
  // Achievement icons
  'Trophy': Trophy,
  'Target': Target,
  'Crown': Crown,
  'Fire': Flame,
  'Flame': Flame,
  'Star': Star,
  'Zap': Zap,
  'Shield': Shield,
  'Sword': Sword,
  'BookOpen': BookOpen,
  'Lock': Lock,
  'CheckCircle': CheckCircle,
  'Medal': Medal,
  
  // Profile/Stats icons
  'TrendingUp': TrendingUp,
  'Gamepad2': Gamepad,
  'Gamepad': Gamepad,
  'Clock': Clock,
  
  // Special icons from react-icons
  'FaBrain': FaBrain,
  'FaCrown': FaCrown,
  'GiSwordsPower': GiSwordsPower
} as const

// Type for valid icon names
export type IconName = keyof typeof iconMap

// Helper function to get icon component safely
export const getIconComponent = (iconName: string): React.ComponentType<any> | null => {
  return iconMap[iconName as IconName] || null
}

// Achievement-specific icon map with wrapper components
export const achievementIconMap = {
  'Target': Target,
  'Crown': FaCrown,
  'Zap': Zap,
  'Sword': GiSwordsPower,
  'Trophy': Trophy,
  'Fire': Flame,
  'Flame': Flame,
  'Star': Star,
  'Shield': Shield,
  'BookOpen': BookOpen,
  'Lock': Lock,
  'CheckCircle': CheckCircle,
  'Medal': Medal
} as const

// Profile activity icon map with wrapper components
export const activityIconMap = {
  'Target': Target,
  'Gamepad2': Gamepad,
  'Trophy': Trophy,
  'FaBrain': FaBrain,
  'Star': Star
} as const

// Profile overview icon map
export const profileIconMap = {
  'Target': Target,
  'FaBrain': FaBrain,
  'TrendingUp': TrendingUp,
  'Shield': Shield,
  'Gamepad2': Gamepad,
  'Star': Star,
  'Trophy': Trophy,
  'Flame': Flame,
  'Clock': Clock
} as const

// Helper function to get achievement icon with fallback
export const getAchievementIcon = (iconName: string) => {
  const IconComponent = achievementIconMap[iconName as keyof typeof achievementIconMap]
  return IconComponent || Star
}

// Helper function to get activity icon with fallback
export const getActivityIcon = (iconName: string) => {
  const IconComponent = activityIconMap[iconName as keyof typeof activityIconMap]
  return IconComponent || Star
}

// Helper function to get profile icon component with fallback
export const getProfileIconComponent = (iconName: string) => {
  const IconComponent = profileIconMap[iconName as keyof typeof profileIconMap]
  return IconComponent || Star
}