/**
 * Puzzle Session Default State Values
 * Constants extracted from usePuzzleSession hook for better maintainability
 */

import type { PuzzleSession } from '@/types/openingPuzzles'

/**
 * Default puzzle session state
 * Extracted from usePuzzleSession hook line 17-28
 */
export const defaultPuzzleSessionState: PuzzleSession = {
  currentPuzzleIndex: 0,
  boardPosition: '',
  moveCount: 0,
  hintsUsed: 0,
  status: 'unsolved',
  showHint: false,
  timeElapsed: 0,
  isTimerActive: false,
  userMoves: [],
  activeTab: 'puzzle'
}

/**
 * Puzzle session configuration constants
 */
export const PUZZLE_SESSION_CONFIG = {
  MAX_HINTS: 3, // Maximum number of hints available per puzzle
  AUTO_PROMOTE_PIECE: 'q', // Always promote to queen for simplicity
  THEORY_TAB_ON_COMPLETE: true, // Switch to theory tab when puzzle is completed
} as const

/**
 * Hint configuration
 * Maps hint number to hint property access
 */
export const HINT_MAPPING = {
  1: 'hint1',
  2: 'hint2', 
  3: 'hint3'
} as const