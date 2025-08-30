/**
 * Puzzle Selection Default Filter Values
 * Constants extracted from usePuzzleSelection hook for better maintainability
 */

import type { PuzzleSelectionFilters } from '@/types/puzzleSelection'

/**
 * Default filter values for puzzle selection
 * Extracted from usePuzzleSelection hook line 23-28
 */
export const defaultPuzzleSelectionFilters: PuzzleSelectionFilters = {
  difficulty: [],
  categories: [],
  showCompleted: true,
  sortBy: 'recent'
}

/**
 * Navigation fallback routes
 */
export const PUZZLE_NAVIGATION_FALLBACKS = {
  DEFAULT_CATEGORY_ROUTE: '/puzzles/tactical',
} as const