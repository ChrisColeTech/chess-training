// Analysis Components Barrel Export - Following DRY for centralized exports
export { default as AnalysisControls } from './AnalysisControls'
export { default as EvaluationBar } from './EvaluationBar'
export { default as EngineLines } from './EngineLines'
export { default as MoveNavigation } from './MoveNavigation'
export { default as PositionDatabase } from './PositionDatabase'
export { default as PositionSetup } from './PositionSetup'

// Re-export types for convenience
export type {
  AnalysisControlsProps,
  EvaluationBarProps,
  EngineLineProps,
  MoveNavigationProps,
  PositionDatabaseProps,
  PositionSetupProps
} from '@/types/analysisBoard'