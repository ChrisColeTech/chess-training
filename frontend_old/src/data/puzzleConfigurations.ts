/**
 * Puzzle Configuration Options
 * Extracted from CustomPuzzleFilters.tsx component
 */

import type { CustomPuzzleDifficulty, PuzzleSource } from '@/types/customPuzzles'

export const puzzleDifficulties: CustomPuzzleDifficulty[] = [
  'Beginner', 
  'Intermediate', 
  'Advanced', 
  'Expert'
] as const

export const puzzleSources: PuzzleSource[] = [
  'user-created', 
  'imported', 
  'community', 
  'lichess', 
  'chess-com'
] as const

// Default rating ranges
export const defaultRatingRange = {
  min: 400,
  max: 2800
} as const