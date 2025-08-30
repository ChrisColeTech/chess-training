/**
 * Puzzle Source Labels and Icons Mapping
 * Extracted from CustomPuzzleFilters.tsx and CustomPuzzleInfo.tsx components
 */

import type { PuzzleSource } from '@/types/customPuzzles'

export interface PuzzleSourceMapping {
  source: PuzzleSource
  label: string
  icon: string
  shortIcon: string
  color?: string
}

export const puzzleSourceMappings: PuzzleSourceMapping[] = [
  {
    source: 'user-created',
    label: 'User Created',
    icon: '✍️ User Created',
    shortIcon: '✍️',
    color: 'text-blue-400'
  },
  {
    source: 'imported',
    label: 'Imported',
    icon: '📥 Imported',
    shortIcon: '📥',
    color: 'text-green-400'
  },
  {
    source: 'community',
    label: 'Community',
    icon: '👥 Community',
    shortIcon: '👥',
    color: 'text-purple-400'
  },
  {
    source: 'lichess',
    label: 'Lichess',
    icon: '♜ Lichess',
    shortIcon: '♜',
    color: 'text-white'
  },
  {
    source: 'chess-com',
    label: 'Chess.com',
    icon: 'Chess.com', // Note: Original uses FaChessKing component
    shortIcon: '♔',
    color: 'text-orange-400'
  }
] as const

// Utility functions
export const getSourceLabel = (source: PuzzleSource): string => {
  const mapping = puzzleSourceMappings.find(m => m.source === source)
  return mapping?.label || source
}

export const getSourceIcon = (source: PuzzleSource, short: boolean = false): string => {
  const mapping = puzzleSourceMappings.find(m => m.source === source)
  return mapping ? (short ? mapping.shortIcon : mapping.icon) : source
}

export const getSourceColor = (source: PuzzleSource): string => {
  const mapping = puzzleSourceMappings.find(m => m.source === source)
  return mapping?.color || 'text-gray-400'
}

// Get formatted label for display in filters
export const getSourceFilterLabel = (source: PuzzleSource): string => {
  const mapping = puzzleSourceMappings.find(m => m.source === source)
  return mapping?.icon || source
}

// Backwards compatibility with existing components
export const getSourceIconLegacy = (source: PuzzleSource): string => {
  return getSourceIcon(source, true)
}