import { useState, useEffect, useCallback, useRef } from 'react'
import { soundFX } from '@/utils/soundEffects'
import { useGames } from '@/hooks/api/useGames'
import type { 
  GameReview,
  ReviewSession,
  GameCollection,
  GameImport,
  GameReviewHookReturn,
  GameSource,
  AnalysisDepth
} from '@/types/gameReview'

/**
 * Custom hook for managing game review state and functionality
 * Handles game selection, analysis, navigation, and user interactions
 * Following the "GAME LABORATORY" theme for comprehensive game analysis
 */
export const useGameReview = (): GameReviewHookReturn => {
  // Use API hooks instead of static data
  const { games: availableGames, collections: gameCollections, isLoading: gamesLoading } = useGames()
  
  // Core state
  const [currentGame, setCurrentGame] = useState<GameReview | null>(null)
  
  // Review session state
  const [reviewSession, setReviewSession] = useState<ReviewSession>({
    currentGame: null,
    currentMoveIndex: 0,
    boardOrientation: 'white',
    viewMode: 'Analysis',
    displaySettings: {
      showCoordinates: true,
      showMoveNumbers: true,
      showEvaluationBar: true,
      showBestMoves: true,
      showArrows: true,
      highlightLastMove: true,
      highlightSquares: true
    },
    filters: {
      showOnlyMistakes: false,
      minEvaluationLoss: 0,
      selectedPhases: ['Opening', 'Middlegame', 'Endgame'],
      selectedClassifications: ['Brilliant', 'Great', 'Good', 'Inaccuracy', 'Mistake', 'Blunder']
    },
    trainingMode: {
      hideEngine: false,
      askForBestMove: false,
      showHintsAfterTime: 30,
      quizMode: false
    }
  })

  // Import state
  const [importState, setImportState] = useState({
    isImporting: false,
    importProgress: 0,
    lastImport: null as GameImport | null
  })

  // Analysis state
  const [analysisState, setAnalysisState] = useState({
    isAnalyzing: false,
    analysisProgress: 0,
    currentAnalysis: null as string | null
  })

  // Loading and error states
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Analysis timeout ref
  const analysisTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  /**
   * Initialize the hook - load saved preferences and recent games
   */
  useEffect(() => {
    // Load user preferences from localStorage (mockup)
    const savedPreferences = localStorage.getItem('gameReviewPreferences')
    if (savedPreferences) {
      try {
        const preferences = JSON.parse(savedPreferences)
        setReviewSession(prev => ({
          ...prev,
          displaySettings: { ...prev.displaySettings, ...preferences.displaySettings },
          filters: { ...prev.filters, ...preferences.filters }
        }))
      } catch (error) {
        console.warn('Failed to load saved preferences:', error)
      }
    }

    // Auto-select the most recent game if available
    if (availableGames.length > 0 && !currentGame) {
      const mostRecent = availableGames
        .sort((a, b) => (b.lastViewedAt || 0) - (a.lastViewedAt || 0))[0]
      selectGame(mostRecent.id)
    }
  }, [currentGame])

  /**
   * Save preferences to localStorage when they change
   */
  useEffect(() => {
    const preferences = {
      displaySettings: reviewSession.displaySettings,
      filters: reviewSession.filters
    }
    localStorage.setItem('gameReviewPreferences', JSON.stringify(preferences))
  }, [reviewSession.displaySettings, reviewSession.filters])

  /**
   * Select a game for review
   */
  const selectGame = useCallback((gameId: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const game = availableGames.find(g => g.id === gameId)
      if (!game) {
        throw new Error('Game not found')
      }

      setCurrentGame(game)
      setReviewSession(prev => ({
        ...prev,
        currentGame: game,
        currentMoveIndex: 0,
        boardOrientation: 'white' // Reset to white's perspective
      }))

      // Update last viewed timestamp (mockup)
      const updatedGame = { ...game, lastViewedAt: Date.now() }
      setAvailableGames(prev => prev.map(g => g.id === gameId ? updatedGame : g))

      soundFX.playClick()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to select game')
      soundFX.playError()
    } finally {
      setIsLoading(false)
    }
  }, [availableGames])

  /**
   * Import a game from various sources
   */
  const importGame = useCallback(async (source: GameSource, data: string): Promise<boolean> => {
    setImportState(prev => ({ ...prev, isImporting: true, importProgress: 0 }))
    setError(null)

    try {
      // Simulate import progress
      for (let i = 0; i <= 100; i += 10) {
        setImportState(prev => ({ ...prev, importProgress: i }))
        await new Promise(resolve => setTimeout(resolve, 100))
      }

      // Create mock imported game (in real app, this would parse the data)
      const importedGame: GameReview = {
        id: `imported-${Date.now()}`,
        gameInfo: {
          white: 'ImportedPlayer',
          black: 'Opponent',
          result: '1-0',
          date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
          event: 'Imported Game',
          site: 'Chess Laboratory',
          timeControl: 'Unknown',
          termination: 'Normal'
        },
        pgn: data,
        source,
        analysisConfig: {
          depth: 'Standard',
          engineTime: 5,
          multiPV: 3,
          includeOpeningBook: true,
          includeTablebase: true
        },
        analysisStatus: 'Pending',
        analysisProgress: 0,
        moves: [],
        opening: {
          name: 'Unknown Opening',
          eco: 'A00',
          moves: [],
          theoryDepth: 0,
          theoreticalAlternatives: [],
          evaluation: 'Equal',
          commonPlans: [],
          pawnStructures: [],
          masterGames: [],
          statistics: { whiteWinRate: 0, blackWinRate: 0, drawRate: 0, totalGames: 0 }
        },
        timeAnalysis: {
          totalTimeUsed: 0,
          averageTimePerMove: 0,
          phaseDistribution: { opening: 0, middlegame: 0, endgame: 0 },
          timeWasters: [],
          timePressure: [],
          timeGrade: 'C',
          timeBlunders: []
        },
        performance: {
          white: {
            overallAccuracy: 0,
            phaseAccuracy: { opening: 0, middlegame: 0, endgame: 0 },
            moveClassifications: { brilliant: 0, great: 0, good: 0, inaccuracy: 0, mistake: 0, blunder: 0 },
            performanceRating: 0,
            averageCentipawnLoss: 0,
            blunderRate: 0,
            timeEfficiency: 0,
            criticalPositionScore: 0
          },
          black: {
            overallAccuracy: 0,
            phaseAccuracy: { opening: 0, middlegame: 0, endgame: 0 },
            moveClassifications: { brilliant: 0, great: 0, good: 0, inaccuracy: 0, mistake: 0, blunder: 0 },
            performanceRating: 0,
            averageCentipawnLoss: 0,
            blunderRate: 0,
            timeEfficiency: 0,
            criticalPositionScore: 0
          }
        },
        keyPositions: [],
        summary: {
          gameResult: '1-0',
          gameLength: 0,
          gamePhases: { openingLength: 0, middlegameLength: 0, endgameLength: 0 },
          decisionPoints: 0,
          majorBlunders: 0
        },
        improvements: [],
        createdAt: Date.now(),
        lastViewedAt: Date.now(),
        userNotes: [],
        bookmarks: [],
        exportSettings: {
          includeVariations: true,
          includeComments: true,
          includeEvaluations: true,
          format: 'PGN'
        }
      }

      // Add to available games
      setAvailableGames(prev => [importedGame, ...prev])

      // Create import record
      const importRecord: GameImport = {
        source,
        gameData: data,
        importedAt: Date.now(),
        metadata: {
          filename: source === 'PGN_File' ? 'imported.pgn' : undefined,
          fileSize: data.length,
          gameCount: 1
        },
        validation: {
          isValid: true,
          errors: [],
          warnings: [],
          gamesFound: 1,
          gamesImported: 1
        }
      }

      setImportState(prev => ({ ...prev, lastImport: importRecord }))
      soundFX.playSuccess()
      return true
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to import game')
      soundFX.playError()
      return false
    } finally {
      setImportState(prev => ({ ...prev, isImporting: false, importProgress: 0 }))
    }
  }, [])

  /**
   * Analyze a game with engine
   */
  const analyzeGame = useCallback(async (gameId: string, config: AnalysisDepth): Promise<void> => {
    const game = availableGames.find(g => g.id === gameId)
    if (!game) {
      setError('Game not found for analysis')
      return
    }

    setAnalysisState({
      isAnalyzing: true,
      analysisProgress: 0,
      currentAnalysis: `Analyzing with ${config} depth...`
    })
    setError(null)

    try {
      // Simulate analysis progress
      const analysisTime = config === 'Quick' ? 3000 : config === 'Standard' ? 8000 : config === 'Deep' ? 15000 : 25000
      const steps = 20
      const stepTime = analysisTime / steps

      for (let i = 0; i <= steps; i++) {
        setAnalysisState(prev => ({
          ...prev,
          analysisProgress: (i / steps) * 100,
          currentAnalysis: i === steps ? 'Analysis complete!' : `Analyzing move ${Math.floor((i / steps) * game.moves.length)}...`
        }))
        await new Promise(resolve => setTimeout(resolve, stepTime))
      }

      // Update game with completed analysis
      const updatedGame: GameReview = {
        ...game,
        analysisStatus: 'Completed',
        analysisProgress: 100,
        analysisCompletedAt: Date.now(),
        analysisConfig: {
          ...game.analysisConfig,
          depth: config
        }
      }

      setAvailableGames(prev => prev.map(g => g.id === gameId ? updatedGame : g))

      if (currentGame?.id === gameId) {
        setCurrentGame(updatedGame)
        setReviewSession(prev => ({ ...prev, currentGame: updatedGame }))
      }

      soundFX.playSuccess()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Analysis failed')
      soundFX.playError()
    } finally {
      setAnalysisState({
        isAnalyzing: false,
        analysisProgress: 0,
        currentAnalysis: null
      })
    }
  }, [availableGames, currentGame])

  /**
   * Navigate to a specific move
   */
  const navigateToMove = useCallback((moveIndex: number) => {
    if (!currentGame) return

    const maxIndex = currentGame.moves.length
    const clampedIndex = Math.max(0, Math.min(moveIndex, maxIndex))

    setReviewSession(prev => ({
      ...prev,
      currentMoveIndex: clampedIndex
    }))

    soundFX.playClick()
  }, [currentGame])

  /**
   * Update display settings
   */
  const updateDisplaySettings = useCallback((settings: Partial<ReviewSession['displaySettings']>) => {
    setReviewSession(prev => ({
      ...prev,
      displaySettings: { ...prev.displaySettings, ...settings }
    }))
    soundFX.playClick()
  }, [])

  /**
   * Update filter settings
   */
  const updateFilters = useCallback((filters: Partial<ReviewSession['filters']>) => {
    setReviewSession(prev => ({
      ...prev,
      filters: { ...prev.filters, ...filters }
    }))
    soundFX.playClick()
  }, [])

  /**
   * Save a user note for a specific move
   */
  const saveUserNote = useCallback((moveIndex: number, note: string) => {
    if (!currentGame) return

    const userNote = {
      moveNumber: moveIndex,
      note,
      timestamp: Date.now()
    }

    const updatedGame = {
      ...currentGame,
      userNotes: [...currentGame.userNotes.filter(n => n.moveNumber !== moveIndex), userNote]
    }

    setCurrentGame(updatedGame)
    setAvailableGames(prev => prev.map(g => g.id === currentGame.id ? updatedGame : g))
    setReviewSession(prev => ({ ...prev, currentGame: updatedGame }))

    soundFX.playClick()
  }, [currentGame])

  /**
   * Bookmark a position
   */
  const bookmarkPosition = useCallback((moveIndex: number, label: string, category: string) => {
    if (!currentGame) return

    const bookmark = {
      moveNumber: moveIndex,
      label,
      category
    }

    const updatedGame = {
      ...currentGame,
      bookmarks: [...currentGame.bookmarks.filter(b => b.moveNumber !== moveIndex), bookmark]
    }

    setCurrentGame(updatedGame)
    setAvailableGames(prev => prev.map(g => g.id === currentGame.id ? updatedGame : g))
    setReviewSession(prev => ({ ...prev, currentGame: updatedGame }))

    soundFX.playClick()
  }, [currentGame])

  /**
   * Export game in various formats
   */
  const exportGame = useCallback(async (gameId: string, format: 'PGN' | 'PDF' | 'HTML'): Promise<string> => {
    const game = availableGames.find(g => g.id === gameId)
    if (!game) {
      throw new Error('Game not found for export')
    }

    setIsLoading(true)
    setError(null)

    try {
      // Simulate export processing
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Mock export data based on format
      let exportData = ''
      switch (format) {
        case 'PGN':
          exportData = `[Event "${game.gameInfo.event}"]\n[Date "${game.gameInfo.date}"]\n[White "${game.gameInfo.white}"]\n[Black "${game.gameInfo.black}"]\n[Result "${game.gameInfo.result}"]\n\n${game.pgn}`
          break
        case 'PDF':
          exportData = `PDF export of ${game.gameInfo.white} vs ${game.gameInfo.black} - ${game.gameInfo.date}`
          break
        case 'HTML':
          exportData = `<html><head><title>Chess Game Analysis</title></head><body><h1>${game.gameInfo.white} vs ${game.gameInfo.black}</h1><p>Game analysis and moves...</p></body></html>`
          break
      }

      soundFX.playSuccess()
      return exportData
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Export failed')
      soundFX.playError()
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [availableGames])

  /**
   * Create a new game collection
   */
  const createCollection = useCallback(async (name: string, gameIds: string[]): Promise<string> => {
    setIsLoading(true)
    setError(null)

    try {
      const collection: GameCollection = {
        id: `collection-${Date.now()}`,
        name,
        description: `Collection created on ${new Date().toLocaleDateString()}`,
        gameIds,
        tags: ['Custom'],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        stats: {
          totalGames: gameIds.length,
          averageAccuracy: 75, // Mock calculation
          averageRating: 1650, // Mock calculation
          mostCommonOpenings: ['Various'],
          improvementAreas: ['Analysis Needed']
        },
        sharing: {
          isPublic: false,
          allowComments: false,
          allowDownload: false
        }
      }

      setGameCollections(prev => [collection, ...prev])
      soundFX.playSuccess()
      return collection.id
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create collection')
      soundFX.playError()
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Delete a game
   */
  const deleteGame = useCallback(async (gameId: string): Promise<void> => {
    setIsLoading(true)
    setError(null)

    try {
      // Remove from available games
      setAvailableGames(prev => prev.filter(g => g.id !== gameId))

      // Remove from collections
      setGameCollections(prev => prev.map(collection => ({
        ...collection,
        gameIds: collection.gameIds.filter(id => id !== gameId)
      })))

      // Clear current game if it was deleted
      if (currentGame?.id === gameId) {
        setCurrentGame(null)
        setReviewSession(prev => ({ ...prev, currentGame: null, currentMoveIndex: 0 }))
      }

      soundFX.playClick()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete game')
      soundFX.playError()
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [currentGame])

  /**
   * Clear error message
   */
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Computed values
  const canNavigateBack = reviewSession.currentMoveIndex > 0
  const canNavigateForward = currentGame ? reviewSession.currentMoveIndex < currentGame.moves.length : false
  const currentMoveIndex = reviewSession.currentMoveIndex
  const totalMoves = currentGame?.moves.length || 0

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (analysisTimeoutRef.current) {
        clearTimeout(analysisTimeoutRef.current)
      }
    }
  }, [])

  return {
    // Current state
    currentGame,
    reviewSession,
    availableGames,
    gameCollections,

    // Import state
    importState,

    // Analysis state
    analysisState,

    // Loading states
    isLoading,

    // Actions
    selectGame,
    importGame,
    analyzeGame,
    navigateToMove,
    updateDisplaySettings,
    updateFilters,
    saveUserNote,
    bookmarkPosition,
    exportGame,
    createCollection,
    deleteGame,

    // Utilities
    canNavigateBack,
    canNavigateForward,
    currentMoveIndex,
    totalMoves,

    // Error handling
    error,
    clearError
  }
}