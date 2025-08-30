/**
 * Tutorials Default Values and Utilities
 * Constants extracted from useTutorials hook for better maintainability
 */

/**
 * Default filter and search values
 * Extracted from useTutorials hook line 44-47
 */
export const DEFAULT_TUTORIALS_FILTERS = {
  SELECTED_CATEGORY: 'All',
  SELECTED_LEVEL: 'All',
  SEARCH_TERM: '',
} as const

/**
 * Tutorial difficulty level color mappings
 * Extracted from useTutorials hook line 135-141
 */
export const TUTORIAL_LEVEL_COLORS = {
  Beginner: 'text-green-400 bg-green-900/20',
  Intermediate: 'text-yellow-400 bg-yellow-900/20', 
  Advanced: 'text-orange-400 bg-orange-900/20',
  Expert: 'text-red-400 bg-red-900/20',
  default: 'text-slate-400'
} as const

/**
 * Tutorial type icon mappings
 * Extracted from useTutorials hook line 145-150
 */
export const TUTORIAL_TYPE_ICONS = {
  video: '<Play className="w-4 h-4 inline" />',
  interactive: '<Target className="w-4 h-4 inline" />',
  article: '<Book className="w-4 h-4 inline" />',
  default: '<Play className="w-4 h-4 inline" />'
} as const

/**
 * Tutorial navigation paths
 */
export const TUTORIAL_NAVIGATION = {
  HELP_PATH: '/help',
} as const

/**
 * Search and filtering configuration
 */
export const SEARCH_CONFIG = {
  CASE_SENSITIVE: false, // Whether search is case sensitive
  SEARCH_FIELDS: ['title', 'description', 'tags'], // Fields to search in
} as const