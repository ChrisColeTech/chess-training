/**
 * Puzzle UI Configuration - FRONTEND PART
 * UI configurations and options for puzzle interface
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

// Default rating ranges for UI controls
export const defaultRatingRange = {
  min: 400,
  max: 2800
} as const

// UI configuration for puzzle difficulty display
export const difficultyUIConfig = {
  Beginner: {
    color: 'text-green-400',
    background: 'bg-green-400/10',
    border: 'border-green-400/30'
  },
  Intermediate: {
    color: 'text-blue-400',
    background: 'bg-blue-400/10',
    border: 'border-blue-400/30'
  },
  Advanced: {
    color: 'text-yellow-400',
    background: 'bg-yellow-400/10',
    border: 'border-yellow-400/30'
  },
  Expert: {
    color: 'text-red-400',
    background: 'bg-red-400/10',
    border: 'border-red-400/30'
  }
} as const

// UI configuration for puzzle sources
export const sourceUIConfig = {
  'user-created': {
    label: 'User Created',
    color: 'text-purple-400',
    icon: 'User'
  },
  'imported': {
    label: 'Imported',
    color: 'text-blue-400',
    icon: 'Download'
  },
  'community': {
    label: 'Community',
    color: 'text-green-400',
    icon: 'Users'
  },
  'lichess': {
    label: 'Lichess',
    color: 'text-orange-400',
    icon: 'ExternalLink'
  },
  'chess-com': {
    label: 'Chess.com',
    color: 'text-yellow-400',
    icon: 'ExternalLink'
  }
} as const