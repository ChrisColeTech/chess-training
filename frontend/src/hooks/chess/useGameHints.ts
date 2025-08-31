import { useState, useEffect, useCallback } from 'react'
import { gameApiClient, GameHints } from '../../services/api/GameApiClient'

interface UseGameHintsOptions {
  gameId: string | null
  position: string // FEN
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  disabled?: boolean
  autoRefreshOnPositionChange?: boolean
}

interface UseGameHintsReturn {
  hints: GameHints | null
  isLoading: boolean
  error: string | null
  refresh: () => void
  clearError: () => void
}

/**
 * useGameHints - SRP Hook for Game Hints Logic
 * Single Responsibility: Manage hints fetching and state
 * No UI concerns, pure business logic
 */
export const useGameHints = ({
  gameId,
  position,
  difficulty = 'intermediate',
  disabled = false,
  autoRefreshOnPositionChange = true
}: UseGameHintsOptions): UseGameHintsReturn => {
  const [hints, setHints] = useState<GameHints | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastPosition, setLastPosition] = useState<string>('')

  const fetchHints = useCallback(async () => {
    if (!gameId || disabled) return

    setIsLoading(true)
    setError(null)

    try {
      const hintsData = await gameApiClient.getGameHints(gameId, difficulty)
      setHints(hintsData)
    } catch (err: any) {
      console.error('Error fetching game hints:', err)
      setError(err?.message || 'Failed to get move hints')
    } finally {
      setIsLoading(false)
    }
  }, [gameId, difficulty, disabled])

  // Auto-refresh when position changes
  useEffect(() => {
    if (autoRefreshOnPositionChange && position !== lastPosition && position) {
      fetchHints()
      setLastPosition(position)
    }
  }, [position, lastPosition, autoRefreshOnPositionChange, fetchHints])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const refresh = useCallback(() => {
    fetchHints()
  }, [fetchHints])

  return {
    hints,
    isLoading,
    error,
    refresh,
    clearError
  }
}