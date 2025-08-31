import type { GameState, CreateGameRequest } from '../services/api/GameApiClient'
import type { ChessMove } from './chess'

export interface UseResponsiveSizeOptions {
  baseSize: number
  minSize: number
  maxSize: number
  breakpoints: {
    mobile: number
    tablet: number
    desktop: number
  }
}

export interface UseGameStateOptions {
  gameId?: string
  autoRefresh?: boolean
  refreshInterval?: number
}

export interface UseGameStateReturn {
  gameState: GameState | null
  isLoading: boolean
  error: string | null
  createGame: (options: CreateGameRequest) => Promise<void>
  makeMove: (move: ChessMove) => Promise<void>
  refreshGame: () => Promise<void>
}