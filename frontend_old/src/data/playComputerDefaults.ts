/**
 * Play Computer Hook Default Settings
 * Constants extracted from usePlayComputer hook for better maintainability
 */

import type { GameSetup } from '@/types/playComputer'

/**
 * Default game setup configuration
 * Extracted from usePlayComputer hook line 27-33
 */
export const defaultGameSetup: Partial<GameSetup> = {
  playerColor: 'white',
  useOpeningBook: true,
  showHints: false,
  enableSounds: true
}

/**
 * Game timer constants
 */
export const GAME_TIMER_CONFIG = {
  INTERVAL_MS: 1000, // 1 second intervals
  TIME_FORFEIT_THRESHOLD: 0, // Time remaining threshold for forfeit
} as const

/**
 * Move timing constants
 */
export const MOVE_TIMING = {
  AI_MOVE_DELAY: 1000, // Delay before AI makes first move when playing black
  PLAYER_MOVE_DELAY: 500, // Delay before AI responds to player move
  INCREMENT_CALCULATION_DELAY: 100, // Delay for time increment calculation
} as const

/**
 * Draw offer probability
 * AI acceptance rate for draw offers (30% chance)
 */
export const DRAW_OFFER_ACCEPTANCE_RATE = 0.3

/**
 * Error timeout duration for temporary error messages
 */
export const ERROR_DISPLAY_TIMEOUT = 3000 // 3 seconds