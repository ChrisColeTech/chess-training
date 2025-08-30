import type { Chess } from 'chess.js'

/**
 * Chess Domain Types - Following Document 12 type organization
 * Single Responsibility: Chess-related type definitions
 */

// Basic chess move type
export interface ChessMove {
  from: string
  to: string
  promotion?: 'q' | 'r' | 'b' | 'n'
}

// Enhanced move with metadata
export interface EnhancedChessMove extends ChessMove {
  piece?: string
  captured?: string
  san?: string
  lan?: string
  before?: string
  after?: string
  color?: 'w' | 'b'
}

// Game state interface
export interface ChessGameState {
  status: 'setup' | 'creating' | 'active' | 'paused' | 'completed'
  gameId: string | null
  chess: Chess
  playerColor: 'white' | 'black'
  aiLevel: 1 | 2 | 3 | 4 | 5
  timeControl: string
  moves: EnhancedChessMove[]
  timeRemaining: {
    white: number
    black: number
  }
  lastMove?: { from: string; to: string }
  lastMoveTime?: number
  result?: GameResult
  isLoading: boolean
  error: string | null
  inCheck?: boolean
  isCheckmate?: boolean
  isStalemate?: boolean
  isDraw?: boolean
}

// Game setup configuration
export interface GameSetup {
  difficulty: 1 | 2 | 3 | 4 | 5
  playerColor: 'white' | 'black' | 'random'
  timeControl: '1+0' | '3+0' | '5+0' | '10+0' | '15+10' | 'unlimited'
}

// API-related types
export interface CreateGameData {
  difficulty: number
  playerColor: string
  timeControl: string
}

export interface Game {
  gameId: string
  currentFen: string
  playerColor: 'white' | 'black'
  aiLevel: number
  timeControl: string
  status: string
}

export interface MoveResponse {
  success: boolean
  newFen: string
  aiMove?: ChessMove
  gameStatus: 'active' | 'completed'
  result?: GameResult
}

export interface GameResult {
  result: 'white_wins' | 'black_wins' | 'draw'
  reason: string
  eloChange?: number
}

// Chess board customization types
export interface BoardTheme {
  id: string
  name: string
  lightSquare: string
  darkSquare: string
  borderColor: string
  shadowColor: string
}

export interface PieceSet {
  id: string
  name: string
  style: 'traditional' | 'modern' | 'minimalist' | '3d'
  pieces: {
    [key: string]: string
  }
}

// Chess board component props
export interface ChessBoardWrapperProps {
  chessInstance: Chess | null
  boardWidth?: number
  onMove?: (move: ChessMove) => void
  playerColor?: 'white' | 'black'
  disabled?: boolean
  showCoordinates?: boolean
  customSquareStyles?: { [square: string]: React.CSSProperties }
  lastMove?: { from: string; to: string } | null
  arePiecesDraggable?: boolean
  
  // Modern enhancements
  boardTheme?: BoardTheme
  pieceSet?: PieceSet
  animationSpeed?: 'slow' | 'normal' | 'fast'
  showMoveHints?: boolean
  enableSounds?: boolean
  enableRightClick?: boolean
  highlightLastMove?: boolean
  highlightCheck?: boolean
  premiumEffects?: boolean
}

// Context menu types
export interface ChessContextMenuItem {
  label: string
  action: string
  icon?: string
  data?: any
  disabled?: boolean
}

export interface ChessContextMenuConfig {
  square?: string
  piece?: string
  items: ChessContextMenuItem[]
}

// Animation types
export interface MoveAnimation {
  from: string
  to: string
  piece: string
  duration: number
  easing: string
}

// Sound types
export type ChessSoundEvent = 
  | 'move' 
  | 'capture' 
  | 'check' 
  | 'checkmate' 
  | 'draw' 
  | 'gameStart' 
  | 'gameEnd' 
  | 'error' 
  | 'illegal'

// Performance optimization types
export interface ChessBoardPerformanceConfig {
  enableGPUAcceleration: boolean
  enableVirtualization: boolean
  maxHistorySize: number
  debounceDelay: number
  cachePositions: boolean
}

// Accessibility types
export interface ChessBoardAccessibilityConfig {
  announceMovements: boolean
  enableKeyboardNavigation: boolean
  highContrastMode: boolean
  reducedMotion: boolean
  focusIndicators: boolean
}