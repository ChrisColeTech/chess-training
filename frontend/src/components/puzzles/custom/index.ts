/**
 * Custom Puzzle Components Export Index
 * Central export point for all custom puzzle components
 * Following the same pattern as the main puzzles components
 */

export { default as CustomPuzzleBoard } from './CustomPuzzleBoard'
export { default as CustomPuzzleControls } from './CustomPuzzleControls'
export { default as CustomPuzzleInfo } from './CustomPuzzleInfo'
export { default as CustomPuzzleCollectionBrowser } from './CustomPuzzleCollectionBrowser'
export { CustomPuzzleFilters } from './CustomPuzzleFilters'
export { default as CustomPuzzleImportExport } from './CustomPuzzleImportExport'

// Re-export types for convenience
export type {
  CustomPuzzle,
  CustomPuzzleCollection,
  CustomPuzzleSession,
  CustomPuzzleFilters as CustomPuzzleFiltersType,
  CustomPuzzleBoardProps,
  CustomPuzzleControlsProps,
  CustomPuzzleInfoProps,
  CustomPuzzleCollectionBrowserProps,
  PuzzleImportExportProps
} from '@/types/customPuzzles'