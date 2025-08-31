import { ApiClient } from '../apiClient'

export interface CreateGameRequest {
  aiLevel: number // 1-5
  color: 'white' | 'black' | 'random'
  timeControl?: string // e.g., "10+0", "5+3"
}

export interface GameState {
  id: string
  currentFen: string
  playerColor: 'white' | 'black'
  aiLevel: number
  status: 'active' | 'completed' | 'abandoned'
  moves: string[]
  timeControl: string
  whiteTime?: number
  blackTime?: number
  result?: 'win' | 'loss' | 'draw'
  created_at: string
  updated_at: string
}

export interface MoveRequest {
  move: {
    from: string
    to: string
    promotion?: 'q' | 'r' | 'b' | 'n'
  }
  timeSpent?: number
}

export interface MoveResponse {
  success: boolean
  legal: boolean
  gameState: {
    fen: string
    turn: 'white' | 'black'
    check: boolean
    gameOver: boolean
    result?: string
  }
  aiMove?: {
    from: string
    to: string
    san: string
    promotion?: string
  }
  gameResult?: {
    result: 'win' | 'loss' | 'draw'
    reason: string
    ratingChange: number
  }
}

export interface GameHistory {
  games: Array<{
    id: string
    opponent: string
    result: 'win' | 'loss' | 'draw'
    rating_change: number
    moves_count: number
    time_control: string
    date: string
    opening?: string
  }>
  total: number
  page: number
  limit: number
}

/**
 * GameApiClient - Following Document 2 service layer architecture
 * Single Responsibility: Handle game-related API calls
 * Extends base ApiClient for DRY error handling and JWT interceptors
 */
export class GameApiClient extends ApiClient {
  constructor() {
    super()
  }

  /**
   * Create a new game vs AI
   * Endpoint: POST /api/games/create
   */
  async createGame(gameData: CreateGameRequest): Promise<GameState> {
    return this.post<GameState>('/games/create', gameData)
  }

  /**
   * Get current game state
   * Endpoint: GET /api/games/:gameId
   */
  async getGame(gameId: string): Promise<GameState> {
    return this.get<GameState>(`/games/${gameId}`)
  }

  /**
   * Make a move in the game
   * Endpoint: POST /api/games/:gameId/move
   */
  async makeMove(gameId: string, move: MoveRequest): Promise<MoveResponse> {
    return this.post<MoveResponse>(`/games/${gameId}/move`, move)
  }

  /**
   * Get all user games
   * Endpoint: GET /api/games
   */
  async getAllGames(page: number = 1, limit: number = 10): Promise<GameHistory> {
    return this.get<GameHistory>(`/games?page=${page}&limit=${limit}`)
  }

  /**
   * Delete a game
   * Endpoint: DELETE /api/games/:gameId
   */
  async deleteGame(gameId: string): Promise<{ success: boolean }> {
    return this.delete<{ success: boolean }>(`/games/${gameId}`)
  }

  /**
   * Resign current game
   * Endpoint: POST /api/games/:gameId/resign
   */
  async resignGame(gameId: string): Promise<{ success: boolean }> {
    return this.post<{ success: boolean }>(`/games/${gameId}/resign`)
  }

  /**
   * Offer draw to opponent
   * Endpoint: POST /api/games/:gameId/offer-draw
   */
  async offerDraw(gameId: string): Promise<{ success: boolean }> {
    return this.post<{ success: boolean }>(`/games/${gameId}/offer-draw`)
  }

  /**
   * Pause current game
   * Endpoint: POST /api/games/:gameId/pause
   */
  async pauseGame(gameId: string): Promise<{ success: boolean }> {
    return this.post<{ success: boolean }>(`/games/${gameId}/pause`)
  }

  /**
   * Request game analysis
   * Endpoint: POST /api/games/:gameId/analysis
   */
  async analyzeGame(gameId: string, options?: { 
    engine?: string 
    depth?: number 
  }): Promise<{
    analysis: {
      moves: Array<{
        move: string
        evaluation: number
        best_move: string
        blunder?: boolean
        mistake?: boolean
        inaccuracy?: boolean
      }>
    }
    accuracy: {
      white: number
      black: number
    }
    opening: {
      name: string
      eco: string
    }
  }> {
    return this.post(`/games/${gameId}/analysis`, options)
  }
}

// Singleton instance following DRY principle
export const gameApiClient = new GameApiClient()