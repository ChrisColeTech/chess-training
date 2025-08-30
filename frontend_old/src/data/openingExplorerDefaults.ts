/**
 * Opening Explorer Default Values and Configuration
 * Constants extracted from useOpeningExplorer hook for better maintainability
 */

/**
 * Default board configuration
 * Extracted from useOpeningExplorer hook line 37
 */
export const DEFAULT_BOARD_ORIENTATION = 'white' as const

/**
 * Default UI tab selection  
 * Extracted from useOpeningExplorer hook line 57
 */
export const DEFAULT_EXPLORER_TAB = 'overview' as const

/**
 * Chess move configuration
 */
export const CHESS_MOVE_CONFIG = {
  AUTO_PROMOTION_PIECE: 'q', // Always promote to queen for simplicity
} as const

/**
 * Search and filtering configuration
 */
export const SEARCH_CONFIG = {
  AUTO_SEARCH_DELAY: 300, // Debounce delay for auto-search in milliseconds
} as const

/**
 * Error fallback routes
 */
export const FALLBACK_ROUTES = {
  DEFAULT_PUZZLE_CATEGORY: '/puzzles/tactical',
} as const