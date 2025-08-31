import type { ReactNode } from 'react'
import type { Chess } from 'chess.js'
import type { 
  ChessMove, 
  BoardTheme, 
  ChessGameState, 
  GameSetup, 
  Square 
} from './chess'
import type { ThemeId } from '../stores/themeStore'

/**
 * Component Props Types - Following Document 12 type organization
 * Single Responsibility: Component interface definitions only
 * No logic, no implementations, just contracts
 */

// Chess Board Components
export interface ChessBoardProps {
  position: string
  boardWidth: number
  boardOrientation: 'white' | 'black'
  showCoordinates: boolean
  disabled: boolean
  arePiecesDraggable: boolean
  boardTheme?: BoardTheme
  customSquareStyles?: { [square: string]: React.CSSProperties }
  premiumEffects?: boolean
  onSquareClick?: (square: Square) => void
  onSquareRightClick?: (square: Square) => void
  onPieceDrop?: (sourceSquare: Square, targetSquare: Square, piece?: string) => boolean
  isAnimating?: boolean
}

export interface ChessBoardContainerProps {
  chessInstance: Chess | null
  boardWidth?: number
  onMove?: (move: ChessMove) => void
  playerColor?: 'white' | 'black'
  disabled?: boolean
  showCoordinates?: boolean
  lastMove?: { from: string; to: string } | null
  arePiecesDraggable?: boolean
  boardTheme?: BoardTheme
  animationSpeed?: 'slow' | 'normal' | 'fast'
  showMoveHints?: boolean
  enableSounds?: boolean
  enableRightClick?: boolean
  highlightLastMove?: boolean
  highlightCheck?: boolean
  premiumEffects?: boolean
}

export interface GameSetupFormProps {
  onStartGame: (setup: GameSetup) => Promise<void>
  isLoading?: boolean
  error?: string | null
  onClearError?: () => void
}

export interface GameControlsProps {
  gameState: ChessGameState
  onResign: () => void
  onOfferDraw: () => void
  onPause: () => void
  onNewGame: () => void
  disabled?: boolean
}

export interface PlayerInfoProps {
  playerColor: 'white' | 'black'
  aiLevel: number
  timeRemaining: { white: number; black: number }
  timeControl: string
  currentTurn: 'w' | 'b'
  gameState: ChessGameState
  isPlayerTurn: boolean
  moveNumber: number
  premiumEffects?: boolean
}

// Dashboard Components
export interface ThemeShowcaseProps {
  // Pure UI component - no props needed, uses store directly
}

// Layout Components
export interface MainLayoutProps {
  children: ReactNode
}

export interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export interface DashboardHeaderProps {
  title?: string
  subtitle?: string
}

// UI Components
export interface UserAvatarProps {
  username: string
  rating?: number
  size?: 'sm' | 'md' | 'lg'
  showRating?: boolean
  className?: string
}

export interface ChessProgressProps {
  value: number
  max: number
  label: string
  variant?: 'default' | 'success' | 'warning' | 'error'
}

export interface ChessBadgeProps {
  variant: 'default' | 'secondary' | 'destructive' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

// Navigation Components
export interface BreadcrumbNavigationProps {
  items: Array<{
    label: string
    href?: string
  }>
}

// User Components
export interface UserMenuProps {
  user: {
    username: string
    avatar?: string
    rating: number
    isOnline: boolean
  }
  onLogout: () => void
}

// Game Layout Props
export interface GameLayoutProps {
  chessBoard: React.ReactNode
  playerInfo: React.ReactNode
  gameControls: React.ReactNode
  moveHints?: React.ReactNode
}