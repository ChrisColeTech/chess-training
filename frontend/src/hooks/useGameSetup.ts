import { useState, useCallback } from 'react'
import type { GameSetup } from '../types/chess'

/**
 * useGameSetup - SRP Hook for Game Setup Form Logic Only
 * Single Responsibility: Handle game setup form state and validation
 * No UI rendering, no API calls, no business logic
 * Pure form state management
 */
export const useGameSetup = () => {
  // Local form state (UI responsibility only)
  const [setup, setSetup] = useState<GameSetup>({
    difficulty: 3,
    playerColor: 'white',
    timeControl: '10+0'
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Update individual setup fields
  const updateDifficulty = useCallback((difficulty: GameSetup['difficulty']) => {
    setSetup(prev => ({ ...prev, difficulty }))
  }, [])

  const updatePlayerColor = useCallback((playerColor: GameSetup['playerColor']) => {
    setSetup(prev => ({ ...prev, playerColor }))
  }, [])

  const updateTimeControl = useCallback((timeControl: GameSetup['timeControl']) => {
    setSetup(prev => ({ ...prev, timeControl }))
  }, [])

  // Handle form submission
  const handleSubmit = useCallback(async (
    onStartGame: (setup: GameSetup) => Promise<void>,
    onClearError?: () => void
  ) => {
    if (onClearError) {
      onClearError()
    }
    
    setIsSubmitting(true)
    
    try {
      await onStartGame(setup)
    } catch (error) {
      console.error('Game setup failed:', error)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }, [setup])

  return {
    // Current state
    setup,
    isSubmitting,
    
    // Field updaters
    updateDifficulty,
    updatePlayerColor,
    updateTimeControl,
    
    // Form handling
    handleSubmit
  }
}