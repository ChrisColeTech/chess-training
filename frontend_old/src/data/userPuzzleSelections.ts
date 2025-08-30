/**
 * User Puzzle Selections - DATABASE PART
 * User puzzle selection preferences and history that should be persisted in database
 */

export interface UserPuzzleSelection {
  userId: string
  selectionHistory: PuzzleSelectionEntry[]
  favoriteThemes: string[]
  blacklistedThemes: string[]
  preferredTimeControl: 'blitz' | 'rapid' | 'untimed'
  difficultyProgression: {
    currentLevel: string
    autoProgression: boolean
    manualOverrides: string[]
  }
  customFilters: {
    ratingRange: { min: number; max: number }
    sources: string[]
    excludeSolved: boolean
    prioritizeWeakAreas: boolean
  }
  selectionAlgorithm: 'random' | 'adaptive' | 'progressive' | 'weakness-focused'
  createdAt: string
  updatedAt: string
}

export interface PuzzleSelectionEntry {
  timestamp: string
  puzzleId: string
  selectionReason: string
  userRating: number
  puzzleRating: number
  theme: string
  difficulty: string
  wasSkipped: boolean
  performance: number // 0-100
}

/**
 * Default puzzle selection preferences
 */
export const defaultPuzzleSelectionPrefs: Omit<UserPuzzleSelection, 'userId' | 'createdAt' | 'updatedAt'> = {
  selectionHistory: [],
  favoriteThemes: [],
  blacklistedThemes: [],
  preferredTimeControl: 'untimed',
  difficultyProgression: {
    currentLevel: 'Beginner',
    autoProgression: true,
    manualOverrides: []
  },
  customFilters: {
    ratingRange: { min: 400, max: 2800 },
    sources: ['community', 'user-created'],
    excludeSolved: false,
    prioritizeWeakAreas: true
  },
  selectionAlgorithm: 'adaptive'
}