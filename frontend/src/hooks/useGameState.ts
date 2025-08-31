import { useState, useCallback, useEffect } from 'react'
import { gameApiClient } from '../services/api/GameApiClient'
import type { UseGameStateOptions, UseGameStateReturn } from '../types/hooks'
import type { GameState, CreateGameRequest } from '../services/api/GameApiClient'
import type { ChessMove } from '../types/chess'

export const useGameState = (options: UseGameStateOptions = {}): UseGameStateReturn => {
  const { gameId, autoRefresh = false, refreshInterval = 5000 } = options
  
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createGame = useCallback(async (gameOptions: CreateGameRequest) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const newGame = await gameApiClient.createGame(gameOptions)
      setGameState(newGame)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create game')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const makeMove = useCallback(async (move: ChessMove) => {
    if (!gameState) {
      setError('No active game')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await gameApiClient.makeMove(gameState.id, { move })
      
      if (response.success) {
        setGameState(prev => prev ? {
          ...prev,
          currentFen: response.gameState.fen,
          moves: [...prev.moves, `${move.from}${move.to}`]
        } : null)
      } else {
        setError('Move failed')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to make move')
    } finally {
      setIsLoading(false)
    }
  }, [gameState])

  const refreshGame = useCallback(async () => {
    if (!gameId) return

    setIsLoading(true)
    setError(null)

    try {
      const game = await gameApiClient.getGame(gameId)
      setGameState(game)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh game')
    } finally {
      setIsLoading(false)
    }
  }, [gameId])

  // Auto-refresh functionality
  useEffect(() => {
    if (!autoRefresh || !gameId) return

    const interval = setInterval(refreshGame, refreshInterval)
    return () => clearInterval(interval)
  }, [autoRefresh, gameId, refreshInterval, refreshGame])

  // Initial load if gameId provided
  useEffect(() => {
    if (gameId) {
      refreshGame()
    }
  }, [gameId, refreshGame])

  return {
    gameState,
    isLoading,
    error,
    createGame,
    makeMove,
    refreshGame
  }
}