/**
 * Icon Helpers - Utility functions for rendering icons
 * No dependencies on mock data, only direct icon mappings
 */

import React from 'react'
import { 
  Target, Crown, Flame, Star, Zap, Shield, Sword, BookOpen, Lock,
  Trophy, TrendingUp, Gamepad, Clock, CheckCircle, Medal, Brain
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
  'Brain': Brain,
  
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

// Achievement-specific icon renderer with fallback
export const getAchievementIcon = (iconName: string) => {
  const IconComponent = iconMap[iconName as IconName]
  
  if (!IconComponent) {
    return React.createElement(Star, { className: "w-4 h-4 inline" })
  }
  
  // Handle react-icons differently
  if (iconName === 'FaBrain' || iconName === 'FaCrown' || iconName === 'GiSwordsPower') {
    return React.createElement(IconComponent, { className: "w-4 h-4 inline" })
  }
  
  return React.createElement(IconComponent, { className: "w-4 h-4 inline" })
}

// Activity icon renderer with fallback
export const getActivityIcon = (iconName: string) => {
  const IconComponent = iconMap[iconName as IconName]
  
  if (!IconComponent) {
    return React.createElement(Star, { className: "w-4 h-4 inline" })
  }
  
  // Handle react-icons differently
  if (iconName === 'FaBrain' || iconName === 'FaCrown' || iconName === 'GiSwordsPower') {
    return React.createElement(IconComponent, { className: "w-4 h-4 inline" })
  }
  
  return React.createElement(IconComponent, { className: "w-4 h-4 inline" })
}

// Profile icon component renderer with fallback
export const getProfileIconComponent = (iconName: string) => {
  const IconComponent = iconMap[iconName as IconName]
  return IconComponent || Star
}