/**
 * Profile Utility Constants and Mappings
 * Constants extracted from useProfile hook for better maintainability
 */

/**
 * Rarity color mappings for achievements
 * Extracted from useProfile hook line 40-46
 */
export const RARITY_COLOR_MAPPING = {
  common: 'from-gray-500 to-gray-600',
  rare: 'from-blue-500 to-blue-600', 
  epic: 'from-purple-500 to-purple-600',
  legendary: 'from-yellow-500 to-orange-600',
  default: 'from-gray-500 to-gray-600'
} as const

/**
 * Activity type icon mappings
 * Extracted from useProfile hook line 50-56
 */
export const ACTIVITY_ICON_MAPPING = {
  puzzle: 'Target',
  game: 'Gamepad2',
  achievement: 'Trophy', 
  study: 'Brain',
  default: 'Star'
} as const

/**
 * Profile navigation configuration
 */
export const PROFILE_NAVIGATION = {
  EDIT_PROFILE_PATH: '/settings/account',
} as const