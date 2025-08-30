import { useState, useCallback } from 'react'
import type { GameReview, GameCollection } from '@/types/gameReview'

interface UseGamesReturn {
  games: GameReview[]
  collections: GameCollection[]
  isLoading: boolean
  setAvailableGames: React.Dispatch<React.SetStateAction<GameReview[]>>
  setGameCollections: React.Dispatch<React.SetStateAction<GameCollection[]>>
}

export const useGames = (): UseGamesReturn => {
  const [games, setGames] = useState<GameReview[]>([])
  const [collections, setCollections] = useState<GameCollection[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Expose setters for external use
  const setAvailableGames = useCallback((updater: React.SetStateAction<GameReview[]>) => {
    setGames(updater)
  }, [])

  const setGameCollections = useCallback((updater: React.SetStateAction<GameCollection[]>) => {
    setCollections(updater)
  }, [])

  return {
    games,
    collections,
    isLoading,
    setAvailableGames,
    setGameCollections
  }
}