// Analysis Board Types - Following SRP for type definitions only

export type AnalysisMode = 'analyze' | 'setup' | 'database'

export interface EngineAnalysis {
  depth: number
  eval: number
  pv: string[] // Principal variation
  nodes: number
  time: number
  nps: number // Nodes per second
  mate?: number // Mate in X moves (optional)
  multipv?: number // Multi-PV line number
}

export interface AnalysisPosition {
  name: string
  fen: string
  category: 'Opening' | 'Middlegame' | 'Endgame' | 'Tactical'
  rating: number
  description?: string
  tags?: string[]
}

export interface MoveTreeNode {
  move: string
  san: string // Standard Algebraic Notation
  fen: string
  eval?: number
  comment?: string
  variations?: MoveTreeNode[]
  children?: MoveTreeNode[]
  parent?: MoveTreeNode
}

export interface AnalysisSettings {
  depth: number
  multiPV: number // Number of lines to analyze
  threads: number
  hashSize: number // In MB
  timeLimit?: number // In seconds
  contempt?: number
}

export interface EngineStatus {
  isRunning: boolean
  engineName: string
  version: string
  isAnalyzing: boolean
  currentDepth: number
  currentNodes: number
  currentTime: number
}

export interface OpeningInfo {
  name: string
  eco: string // Encyclopedia of Chess Openings code
  moves: string[]
  popularity: number
  winRate: {
    white: number
    black: number
    draw: number
  }
  games: number
}

export interface AnalysisBoardState {
  // Board state
  currentFen: string
  gameHistory: string[]
  currentMoveIndex: number
  
  // Analysis state
  analysisMode: AnalysisMode
  engineStatus: EngineStatus
  currentAnalysis: EngineAnalysis[]
  analysisSettings: AnalysisSettings
  
  // UI state
  isAnalysisRunning: boolean
  boardOrientation: 'white' | 'black'
  selectedSquare: string | null
  highlightedSquares: string[]
  
  // Position database
  savedPositions: AnalysisPosition[]
  currentOpeningInfo?: OpeningInfo
}

export interface AnalysisBoardActions {
  // Board actions
  makeMove: (from: string, to: string, promotion?: string) => boolean
  undoMove: () => void
  redoMove: () => void
  loadPosition: (fen: string) => void
  resetPosition: () => void
  flipBoard: () => void
  
  // Analysis actions
  startAnalysis: () => void
  stopAnalysis: () => void
  setAnalysisDepth: (depth: number) => void
  setMultiPV: (lines: number) => void
  toggleAnalysisMode: (mode: AnalysisMode) => void
  
  // Position management
  saveCurrentPosition: (name: string, category: AnalysisPosition['category']) => void
  loadSavedPosition: (position: AnalysisPosition) => void
  deleteSavedPosition: (id: string) => void
  
  // Navigation
  goToMove: (moveIndex: number) => void
  goToStart: () => void
  goToEnd: () => void
}

export interface EvaluationBarProps {
  evaluation: number
  className?: string
}

export interface EngineLineProps {
  analysis: EngineAnalysis
  index: number
  onPlayLine?: (moves: string[]) => void
  className?: string
}

export interface PositionSetupProps {
  currentFen: string
  onLoadFen: (fen: string) => void
  onResetPosition: () => void
  className?: string
}

export interface MoveNavigationProps {
  gameHistory: string[]
  currentMoveIndex: number
  onGoToMove: (index: number) => void
  onUndo: () => void
  onRedo: () => void
  className?: string
}

export interface AnalysisControlsProps {
  analysisMode: AnalysisMode
  isAnalyzing: boolean
  engineStatus: EngineStatus
  analysisSettings: AnalysisSettings
  onStartAnalysis: () => void
  onStopAnalysis: () => void
  onModeChange: (mode: AnalysisMode) => void
  onSettingsChange: (settings: Partial<AnalysisSettings>) => void
  className?: string
}

export interface PositionDatabaseProps {
  positions: AnalysisPosition[]
  onLoadPosition: (position: AnalysisPosition) => void
  onSavePosition?: (name: string, category: AnalysisPosition['category']) => void
  onDeletePosition?: (id: string) => void
  className?: string
}