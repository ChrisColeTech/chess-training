/**
 * User Puzzle Preferences - DATABASE PART
 * User-specific puzzle settings that should be persisted in database
 */

import type { CustomPuzzleDifficulty, PuzzleSource } from '@/types/customPuzzles'

export interface UserPuzzlePreferences {
  userId: string
  preferredDifficulties: CustomPuzzleDifficulty[]
  preferredSources: PuzzleSource[]
  ratingRange: {
    min: number
    max: number
  }
  themes: string[] // preferred puzzle themes
  autoAdvance: boolean
  showHints: boolean
  timeLimit?: number // seconds per puzzle
  createdAt: string
  updatedAt: string
}

/**
 * Default puzzle preferences for new users
 */
export const defaultUserPuzzlePreferences: Omit<UserPuzzlePreferences, 'userId' | 'createdAt' | 'updatedAt'> = {
  preferredDifficulties: ['Beginner', 'Intermediate'],
  preferredSources: ['user-created', 'community'],
  ratingRange: {
    min: 400,
    max: 2800
  },
  themes: [],
  autoAdvance: false,
  showHints: true,
  timeLimit: undefined
}