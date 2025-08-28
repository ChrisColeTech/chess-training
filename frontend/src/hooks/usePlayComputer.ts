import { useState, useEffect, useCallback, useRef } from 'react'
import { soundFX } from '@/utils/soundEffects'
import { PlayComputerService } from '@/services/playComputerService'
import { getAvailableOpponents, timeControlConfigs } from '@/data/aiOpponents'
import type { 
  GameState,
  GameSetup,
  GameAnalysis,
  PerformanceStats,
  AIOpponent,
  PlayComputerHookReturn
} from '@/types/playComputer'

/**
 * Custom hook for managing computer chess game state and logic
 * Handles game setup, move processing, AI integration, and game analysis
 */
export const usePlayComputer = (): PlayComputerHookReturn => {
  // Game state
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [gameAnalysis, setGameAnalysis] = useState<GameAnalysis | null>(null)
  const [performanceStats, setPerformanceStats] = useState<PerformanceStats>(
    PlayComputerService.generatePerformanceStats()
  )

  // Setup state
  const [gameSetup, setGameSetup] = useState<Partial<GameSetup>>({
    playerColor: 'white',
    timeControl: timeControlConfigs[0], // Default to first time control
    useOpeningBook: true,
    showHints: false,
    enableSounds: true
  })

  // Loading states
  const [isLoading, setIsLoading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Available opponents based on player progress
  const [availableOpponents, setAvailableOpponents] = useState<AIOpponent[]>([])

  // Game timer ref
  const gameTimerRef = useRef<NodeJS.Timeout | null>(null)

  /**
   * Initialize available opponents based on player progress
   */
  useEffect(() => {
    // This would typically come from user data/localStorage
    const playerRating = performanceStats.currentRating
    const completedGames = performanceStats.gamesPlayed
    const unlockedAchievements: string[] = [] // Would come from achievement system

    const opponents = getAvailableOpponents(playerRating, completedGames, unlockedAchievements)
    setAvailableOpponents(opponents)

    // Auto-select first available opponent if none selected
    if (!gameSetup.opponent && opponents.length > 0) {
      const firstUnlocked = opponents.find(opp => opp.isUnlocked)
      if (firstUnlocked) {
        setGameSetup(prev => ({ ...prev, opponent: firstUnlocked }))
      }
    }
  }, [performanceStats, gameSetup.opponent])

  /**
   * Start game timer for time controls
   */
  const startGameTimer = useCallback(() => {
    if (!gameState || gameState.setup.timeControl.type === 'Unlimited') return

    gameTimerRef.current = setInterval(() => {
      setGameState(prevState => {
        if (!prevState || prevState.status !== 'active') return prevState

        const currentPlayer = prevState.currentTurn
        const timeRemaining = { ...prevState.timeRemaining }
        timeRemaining[currentPlayer] -= 1000 // Subtract 1 second

        // Check for time forfeit
        if (timeRemaining[currentPlayer] <= 0) {
          const result = currentPlayer === 'white' ? 'black_wins' : 'white_wins'
          return {
            ...prevState,
            timeRemaining,
            status: 'completed',
            result,
            endTime: Date.now()
          }
        }

        return {
          ...prevState,
          timeRemaining
        }
      })
    }, 1000)
  }, [gameState])

  /**
   * Stop game timer
   */
  const stopGameTimer = useCallback(() => {
    if (gameTimerRef.current) {
      clearInterval(gameTimerRef.current)
      gameTimerRef.current = null
    }
  }, [])

  /**
   * Select an AI opponent
   */
  const selectOpponent = useCallback((opponent: AIOpponent) => {
    if (!opponent.isUnlocked) {
      setError('This opponent is not yet unlocked')
      return
    }

    setGameSetup(prev => ({ ...prev, opponent }))
    soundFX.playClick()
  }, [])

  /**
   * Update game setup configuration
   */
  const updateSetup = useCallback((setup: Partial<GameSetup>) => {
    setGameSetup(prev => ({ ...prev, ...setup }))
    soundFX.playClick()
  }, [])

  /**
   * Validate if current setup is valid for starting a game
   */
  const isValidSetup = PlayComputerService.validateGameSetup(gameSetup)

  /**
   * Start a new game with current setup
   */
  const startGame = useCallback(async () => {
    if (!isValidSetup || !gameSetup.opponent) {
      setError('Invalid game setup')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const newGameState = PlayComputerService.initializeGame(gameSetup as GameSetup)
      setGameState(newGameState)
      
      soundFX.playSuccess()
      
      // Start timer if using time controls
      if (newGameState.setup.timeControl.type !== 'Unlimited') {
        setTimeout(() => startGameTimer(), 100) // Small delay to ensure state is set
      }

      // If AI plays white, make the first move
      if (gameSetup.playerColor === 'black') {
        setTimeout(() => {
          makeAIMove(newGameState)
        }, 1000)
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to start game')
      soundFX.playError()
    } finally {
      setIsLoading(false)
    }
  }, [gameSetup, isValidSetup, startGameTimer])

  /**
   * Make a move for the player
   */
  const makeMove = useCallback(async (from: string, to: string): Promise<boolean> => {
    if (!gameState || gameState.status !== 'active' || gameState.aiThinking) {
      return false
    }

    const result = PlayComputerService.makePlayerMove(gameState, from, to)
    
    if (!result.success || !result.updatedState) {
      if (result.error) setError(result.error)
      soundFX.playError()
      return false
    }

    setGameState(result.updatedState)
    
    // Play appropriate sound
    const move = result.updatedState.lastMove
    if (move?.captured) {
      soundFX.playCapture ? soundFX.playCapture() : soundFX.playClick()
    } else if (result.updatedState.inCheck) {
      soundFX.playCheck ? soundFX.playCheck() : soundFX.playClick()
    } else {
      soundFX.playClick()
    }

    // Add time increment if applicable
    const increment = gameState.setup.timeControl.increment * 1000
    if (increment > 0) {
      const playerColor = move?.color
      if (playerColor) {
        setGameState(prev => prev ? {
          ...prev,
          timeRemaining: {
            ...prev.timeRemaining,
            [playerColor]: prev.timeRemaining[playerColor] + increment
          }
        } : prev)
      }
    }

    // If game is not over, make AI move
    if (result.updatedState.status === 'active') {
      setTimeout(() => {
        makeAIMove(result.updatedState!)
      }, 500) // Small delay for better UX
    } else {
      stopGameTimer()
      updatePerformanceStats(result.updatedState)
    }

    return true
  }, [gameState, stopGameTimer])

  /**
   * Generate and make an AI move
   */
  const makeAIMove = useCallback(async (currentState: GameState) => {
    if (currentState.status !== 'active') return

    setGameState(prev => prev ? { ...prev, aiThinking: true } : prev)

    try {
      const aiResult = await PlayComputerService.generateAIMove(currentState)
      
      if (!aiResult.success || !aiResult.updatedState) {
        setError(aiResult.error || 'AI failed to make a move')
        return
      }

      setGameState(aiResult.updatedState)

      // Play appropriate sound
      const move = aiResult.move
      if (move?.captured) {
        soundFX.playCapture ? soundFX.playCapture() : soundFX.playClick()
      } else if (aiResult.updatedState.inCheck) {
        soundFX.playCheck ? soundFX.playCheck() : soundFX.playClick()
      } else {
        soundFX.playClick()
      }

      // Add time increment for AI if applicable
      const increment = currentState.setup.timeControl.increment * 1000
      if (increment > 0 && move) {
        setGameState(prev => prev ? {
          ...prev,
          timeRemaining: {
            ...prev.timeRemaining,
            [move.color]: prev.timeRemaining[move.color] + increment
          }
        } : prev)
      }

      // If game is over, stop timer and update stats
      if (aiResult.updatedState.status === 'completed') {
        stopGameTimer()
        updatePerformanceStats(aiResult.updatedState)
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'AI move failed')
      setGameState(prev => prev ? { ...prev, aiThinking: false } : prev)
    }
  }, [stopGameTimer])

  /**
   * Update performance statistics after game
   */
  const updatePerformanceStats = useCallback((completedGameState: GameState) => {
    const playerColor = completedGameState.setup.playerColor === 'random' 
      ? (Math.random() < 0.5 ? 'white' : 'black') 
      : completedGameState.setup.playerColor

    let gamesWon = 0
    let gamesLost = 0
    let gamesDrawn = 0

    if (completedGameState.result === 'draw') {
      gamesDrawn = 1
    } else if (
      (completedGameState.result === 'white_wins' && playerColor === 'white') ||
      (completedGameState.result === 'black_wins' && playerColor === 'black')
    ) {
      gamesWon = 1
    } else {
      gamesLost = 1
    }

    // Calculate rating change
    const ratingChange = PlayComputerService.calculateRatingChange(
      performanceStats.currentRating,
      completedGameState.setup.opponent.rating,
      completedGameState.result,
      playerColor
    )

    // Update stats
    setPerformanceStats(prev => ({
      ...prev,
      gamesPlayed: prev.gamesPlayed + 1,
      gamesWon: prev.gamesWon + gamesWon,
      gamesLost: prev.gamesLost + gamesLost,
      gamesDrawn: prev.gamesDrawn + gamesDrawn,
      winRate: ((prev.gamesWon + gamesWon) / (prev.gamesPlayed + 1)) * 100,
      currentRating: ratingChange.newRating,
      peakRating: Math.max(prev.peakRating, ratingChange.newRating),
      gamesByDifficulty: {
        ...prev.gamesByDifficulty,
        [completedGameState.setup.opponent.difficulty]: 
          prev.gamesByDifficulty[completedGameState.setup.opponent.difficulty] + 1
      },
      recentGames: [
        {
          result: completedGameState.result,
          rating: ratingChange.newRating,
          opponent: completedGameState.setup.opponent.name,
          date: Date.now()
        },
        ...prev.recentGames.slice(0, 9) // Keep last 10 games
      ]
    }))

    // Play game end sound
    if (gamesWon > 0) {
      soundFX.playSuccess()
    } else if (gamesLost > 0) {
      soundFX.playError()
    } else {
      soundFX.playClick() // Draw
    }
  }, [performanceStats])

  /**
   * Resign the current game
   */
  const resignGame = useCallback(() => {
    if (!gameState || gameState.status !== 'active') return

    const playerColor = gameState.setup.playerColor === 'random' 
      ? (gameState.currentTurn === 'white' ? 'white' : 'black')
      : gameState.setup.playerColor

    const result = playerColor === 'white' ? 'black_wins' : 'white_wins'

    setGameState(prev => prev ? {
      ...prev,
      status: 'completed',
      result,
      endTime: Date.now(),
      aiThinking: false
    } : prev)

    stopGameTimer()
    updatePerformanceStats({
      ...gameState,
      status: 'completed',
      result,
      endTime: Date.now()
    })

    soundFX.playError()
  }, [gameState, stopGameTimer, updatePerformanceStats])

  /**
   * Offer a draw (AI will accept/decline based on position)
   */
  const offerDraw = useCallback(() => {
    if (!gameState || gameState.status !== 'active') return

    // Simple AI draw acceptance logic (would be more sophisticated in production)
    const acceptDraw = Math.random() < 0.3 // 30% chance to accept

    if (acceptDraw) {
      setGameState(prev => prev ? {
        ...prev,
        status: 'completed',
        result: 'draw',
        endTime: Date.now(),
        aiThinking: false
      } : prev)

      stopGameTimer()
      updatePerformanceStats({
        ...gameState,
        status: 'completed',
        result: 'draw',
        endTime: Date.now()
      })

      soundFX.playClick()
    } else {
      setError('Draw offer declined by opponent')
      setTimeout(() => setError(null), 3000)
    }
  }, [gameState, stopGameTimer, updatePerformanceStats])

  /**
   * Pause the current game
   */
  const pauseGame = useCallback(() => {
    if (!gameState || gameState.status !== 'active') return

    setGameState(prev => prev ? { ...prev, status: 'paused' } : prev)
    stopGameTimer()
    soundFX.playClick()
  }, [gameState, stopGameTimer])

  /**
   * Resume a paused game
   */
  const resumeGame = useCallback(() => {
    if (!gameState || gameState.status !== 'paused') return

    setGameState(prev => prev ? { ...prev, status: 'active' } : prev)
    startGameTimer()
    soundFX.playClick()
  }, [gameState, startGameTimer])

  /**
   * Analyze the current position
   */
  const analyzePosition = useCallback(async () => {
    if (!gameState) return

    setIsAnalyzing(true)
    setError(null)

    try {
      // Simulate analysis delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const analysis = PlayComputerService.analyzePosition(gameState)
      setGameAnalysis(analysis)
      soundFX.playClick()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Analysis failed')
    } finally {
      setIsAnalyzing(false)
    }
  }, [gameState])

  /**
   * Clear error message
   */
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (gameTimerRef.current) {
        clearInterval(gameTimerRef.current)
      }
    }
  }, [])

  // Computed values
  const canMakeMove = gameState?.status === 'active' && !gameState.aiThinking
  const isPlayerTurn = gameState ? 
    (gameState.setup.playerColor === 'white' && gameState.currentTurn === 'white') ||
    (gameState.setup.playerColor === 'black' && gameState.currentTurn === 'black') ||
    (gameState.setup.playerColor === 'random' && true) // Simplified for random
    : false
  const gameStatus = gameState?.status || 'setup'

  return {
    // Game state
    gameState,
    gameAnalysis,
    availableOpponents,
    performanceStats,

    // Setup state
    gameSetup,
    isValidSetup,

    // Loading states
    isLoading,
    isAnalyzing,

    // Actions
    selectOpponent,
    updateSetup,
    startGame,
    makeMove,
    resignGame,
    offerDraw,
    pauseGame,
    resumeGame,
    analyzePosition,

    // Utilities
    canMakeMove,
    isPlayerTurn,
    gameStatus,

    // Error handling
    error,
    clearError
  }
}