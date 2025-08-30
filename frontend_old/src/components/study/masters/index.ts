/**
 * Master Games Components
 * Exports all components for studying annotated master games
 */

export { default as GameLibrary } from './GameLibrary'
export { default as GameViewer } from './GameViewer'
export { default as MasterAnalysis } from './MasterAnalysis'

// Export types for convenience
export type { 
  GameLibraryProps,
  GameViewerProps,
  MasterAnalysisProps 
} from '@/types/masterGames'