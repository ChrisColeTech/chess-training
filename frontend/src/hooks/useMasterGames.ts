import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Chess } from 'chess.js'
import { soundFX } from '@/utils/soundEffects'
import { 
  masterGames, 
  libraryStats, 
  searchGames
  // getGamesByPlayer, // Unused for now
  // getGamesByOpening, // Unused for now  
  // getGamesByTheme, // Unused for now
  // getTopRatedGames // Unused for now
} from '@/data/historicGames'
import type { 
  MasterGame, 
  GameFilters, 
  LibraryStats, 
  StudySession,
  MasterGamesHookReturn,
  MasterAnalysisProps,
  PlayerColor
} from '@/types/masterGames'

/**
 * Custom hook for managing master games study functionality
 * Handles game selection, playback, filtering, and study sessions
 */
export const useMasterGames = (): MasterGamesHookReturn => {
  const navigate = useNavigate()
  
  // Game data state
  const [games] = useState<MasterGame[]>(masterGames)
  const [filteredGames, setFilteredGames] = useState<MasterGame[]>(masterGames)
  const [selectedGame, setSelectedGame] = useState<MasterGame | null>(masterGames[0])
  const [currentMove, setCurrentMoveState] = useState(0)
  const [libraryStatsData] = useState<LibraryStats>(libraryStats)

  // Game playback state
  const [gamePositions, setGamePositions] = useState<string[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeedState] = useState(1.5) // moves per second
  const [boardOrientation, setBoardOrientation] = useState<PlayerColor>('white')

  // UI state
  const [filters, setFilters] = useState<GameFilters>({
    searchTerm: '',
    players: [],
    tournamentTypes: [],
    openingCategories: [],
    ecoCodes: [],
    results: [],
    yearRange: { min: 1800, max: 2025 },
    ratingRange: { min: 2000, max: 3000 },
    qualityRange: { min: 0, max: 10 },
    themes: [],
    bookmarkedOnly: false,
    sortBy: 'quality',
    sortOrder: 'desc'
  })

  const [analysisMode, setAnalysisMode] = useState<MasterAnalysisProps['mode']>('annotations')

  // Loading states
  const [isLoading] = useState(false)
  // const [, setIsLoading] = useState(false) // Setter unused for now
  const [isLoadingGame, setIsLoadingGame] = useState(false)

  // Study session state
  const [currentSession, setCurrentSession] = useState<StudySession | null>(null)

  // Error handling
  const [error, setError] = useState<string | null>(null)

  // Playback timer ref
  const playbackTimerRef = useRef<NodeJS.Timeout | null>(null)

  /**
   * Parse game moves and generate position history
   */
  const parseGameMoves = useCallback((game: MasterGame) => {
    const chess = new Chess()
    const positions: string[] = [chess.fen()] // Starting position

    try {
      // Parse PGN and extract moves
      const moveMatches = game.pgn.match(/\d+\.\s*([NBRQK]?[a-h]?[1-8]?x?[a-h][1-8](?:=[NBRQ])?[+#]?)\s*([NBRQK]?[a-h]?[1-8]?x?[a-h][1-8](?:=[NBRQ])?[+#]?)?/g)
      
      if (moveMatches) {
        moveMatches.forEach(moveMatch => {
          // Extract individual moves (white and black)
          const moves = moveMatch.replace(/\d+\.\s*/, '').split(/\s+/).filter(move => move && !move.includes('.'))
          
          moves.forEach(move => {
            try {
              const cleanMove = move.replace(/[+#!?]/g, '') // Remove annotations
              if (cleanMove && cleanMove !== '1-0' && cleanMove !== '0-1' && cleanMove !== '1/2-1/2') {
                const moveResult = chess.move(cleanMove)
                if (moveResult) {
                  positions.push(chess.fen())
                }
              }
            } catch (e) {
              console.warn('Invalid move:', move, e)
            }
          })
        })
      }
    } catch (error) {
      console.error('Error parsing game moves:', error)
    }

    return positions
  }, [])

  /**
   * Initialize game positions when selected game changes
   */
  useEffect(() => {
    if (selectedGame) {
      setIsLoadingGame(true)
      
      // Simulate loading delay for better UX
      setTimeout(() => {
        const positions = parseGameMoves(selectedGame)
        setGamePositions(positions)
        setCurrentMoveState(0)
        setIsLoadingGame(false)
      }, 300)
    }
  }, [selectedGame, parseGameMoves])

  /**
   * Handle playback timer
   */
  useEffect(() => {
    if (isPlaying && gamePositions.length > 0) {
      playbackTimerRef.current = setInterval(() => {
        setCurrentMoveState(prev => {
          if (prev >= gamePositions.length - 1) {
            setIsPlaying(false)
            return prev
          }
          return prev + 1
        })
      }, 1000 / playbackSpeed)

      return () => {
        if (playbackTimerRef.current) {
          clearInterval(playbackTimerRef.current)
        }
      }
    }
  }, [isPlaying, playbackSpeed, gamePositions.length])

  /**
   * Apply filters to games
   */
  useEffect(() => {
    let filtered = [...games]

    // Text search
    if (filters.searchTerm) {
      filtered = searchGames(filters.searchTerm)
    }

    // Player filter
    if (filters.players.length > 0) {
      filtered = filtered.filter(game =>
        filters.players.some(player =>
          game.white.name.includes(player) || game.black.name.includes(player)
        )
      )
    }

    // Tournament type filter
    if (filters.tournamentTypes.length > 0) {
      filtered = filtered.filter(game =>
        filters.tournamentTypes.includes(game.tournament.type)
      )
    }

    // Opening category filter
    if (filters.openingCategories.length > 0) {
      filtered = filtered.filter(game =>
        filters.openingCategories.some(category =>
          game.opening.category.includes(category)
        )
      )
    }

    // ECO code filter
    if (filters.ecoCodes.length > 0) {
      filtered = filtered.filter(game =>
        filters.ecoCodes.includes(game.opening.eco)
      )
    }

    // Result filter
    if (filters.results.length > 0) {
      filtered = filtered.filter(game =>
        filters.results.includes(game.result)
      )
    }

    // Year range filter
    filtered = filtered.filter(game =>
      game.tournament.year >= filters.yearRange.min &&
      game.tournament.year <= filters.yearRange.max
    )

    // Rating range filter
    filtered = filtered.filter(game => {
      const avgRating = (game.white.rating + game.black.rating) / 2
      return avgRating >= filters.ratingRange.min && avgRating <= filters.ratingRange.max
    })

    // Quality range filter
    filtered = filtered.filter(game =>
      game.analysis.quality >= filters.qualityRange.min &&
      game.analysis.quality <= filters.qualityRange.max
    )

    // Themes filter
    if (filters.themes.length > 0) {
      filtered = filtered.filter(game =>
        filters.themes.some(theme =>
          game.analysis.strategicThemes.includes(theme) ||
          game.analysis.tacticalThemes.includes(theme)
        )
      )
    }

    // Bookmarked filter
    if (filters.bookmarkedOnly) {
      filtered = filtered.filter(game => game.isBookmarked)
    }

    // Sorting
    filtered.sort((a, b) => {
      let comparison = 0
      
      switch (filters.sortBy) {
        case 'date':
          comparison = a.tournament.year - b.tournament.year
          break
        case 'rating':
          const avgRatingA = (a.white.rating + a.black.rating) / 2
          const avgRatingB = (b.white.rating + b.black.rating) / 2
          comparison = avgRatingA - avgRatingB
          break
        case 'quality':
          comparison = a.analysis.quality - b.analysis.quality
          break
        case 'name':
          comparison = a.white.name.localeCompare(b.white.name)
          break
        default:
          comparison = 0
      }

      return filters.sortOrder === 'desc' ? -comparison : comparison
    })

    setFilteredGames(filtered)
  }, [games, filters])

  /**
   * Select a game for study
   */
  const selectGame = useCallback((game: MasterGame) => {
    setSelectedGame(game)
    setIsPlaying(false)
    soundFX.playClick()

    // Mark game as viewed
    game.studyProgress.viewed = true
    game.studyProgress.lastViewedAt = Date.now()
  }, [])

  /**
   * Set current move position
   */
  const setCurrentMove = useCallback((moveNumber: number) => {
    if (moveNumber >= 0 && moveNumber < gamePositions.length) {
      setCurrentMoveState(moveNumber)
      setIsPlaying(false)
      soundFX.playClick()
    }
  }, [gamePositions.length])

  /**
   * Toggle playback state
   */
  const togglePlayback = useCallback(() => {
    if (currentMove >= gamePositions.length - 1) {
      // Reset to start if at end
      setCurrentMoveState(0)
    }
    setIsPlaying(prev => !prev)
    soundFX.playClick()
  }, [currentMove, gamePositions.length])

  /**
   * Set playback speed
   */
  const setPlaybackSpeed = useCallback((speed: number) => {
    setPlaybackSpeedState(Math.max(0.5, Math.min(5.0, speed)))
    soundFX.playClick()
  }, [])

  /**
   * Update filters
   */
  const updateFilters = useCallback((newFilters: Partial<GameFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }, [])

  /**
   * Toggle bookmark status
   */
  const toggleBookmark = useCallback((gameId: string) => {
    const game = games.find(g => g.id === gameId)
    if (game) {
      game.isBookmarked = !game.isBookmarked
      setFilteredGames([...filteredGames]) // Trigger re-render
      soundFX.playClick()
    }
  }, [games, filteredGames])

  /**
   * Flip board orientation
   */
  const flipBoard = useCallback(() => {
    setBoardOrientation(prev => prev === 'white' ? 'black' : 'white')
    soundFX.playClick()
  }, [])

  /**
   * Set analysis mode
   */
  const setAnalysisModeState = useCallback((mode: MasterAnalysisProps['mode']) => {
    setAnalysisMode(mode)
    soundFX.playClick()
  }, [])

  // Game navigation functions
  const goToStart = useCallback(() => {
    setCurrentMove(0)
  }, [setCurrentMove])

  const goToEnd = useCallback(() => {
    setCurrentMove(gamePositions.length - 1)
  }, [setCurrentMove, gamePositions.length])

  const goToMove = useCallback((moveNumber: number) => {
    setCurrentMove(moveNumber)
  }, [setCurrentMove])

  const nextMove = useCallback(() => {
    if (currentMove < gamePositions.length - 1) {
      setCurrentMove(currentMove + 1)
    }
  }, [currentMove, gamePositions.length, setCurrentMove])

  const previousMove = useCallback(() => {
    if (currentMove > 0) {
      setCurrentMove(currentMove - 1)
    }
  }, [currentMove, setCurrentMove])

  /**
   * Start a study session
   */
  const startStudySession = useCallback((gameId: string) => {
    const game = games.find(g => g.id === gameId)
    if (game) {
      const session: StudySession = {
        id: `session_${Date.now()}`,
        gameId,
        startTime: Date.now(),
        movesStudied: [],
        timePerMove: {},
        analysisAttempts: [],
        notes: '',
        conceptsLearned: []
      }
      setCurrentSession(session)
      soundFX.playSuccess()
    }
  }, [games])

  /**
   * End current study session
   */
  const endStudySession = useCallback((notes?: string, rating?: number) => {
    if (currentSession && selectedGame) {
      const updatedSession: StudySession = {
        ...currentSession,
        endTime: Date.now(),
        notes: notes || '',
        rating
      }

      // Update game study progress
      selectedGame.studyProgress.analyzed = true
      selectedGame.studyProgress.lastViewedAt = Date.now()

      setCurrentSession(null)
      soundFX.playSuccess()

      // In a real app, this would be saved to the backend
      console.log('Study session completed:', updatedSession)
    }
  }, [currentSession, selectedGame])

  /**
   * Search games with query
   */
  const searchGamesQuery = useCallback((query: string) => {
    updateFilters({ searchTerm: query })
  }, [updateFilters])

  /**
   * Get recommended games based on current selection
   */
  const getRecommendedGames = useCallback((gameId: string): MasterGame[] => {
    const game = games.find(g => g.id === gameId)
    if (!game) return []

    // Recommend games with similar themes
    const similarThemes = games.filter(g => 
      g.id !== gameId &&
      (g.analysis.strategicThemes.some(theme => game.analysis.strategicThemes.includes(theme)) ||
       g.analysis.tacticalThemes.some(theme => game.analysis.tacticalThemes.includes(theme)))
    )

    return similarThemes.slice(0, 5)
  }, [games])

  /**
   * Get similar games by opening or players
   */
  const getSimilarGames = useCallback((gameId: string): MasterGame[] => {
    const game = games.find(g => g.id === gameId)
    if (!game) return []

    // Similar by opening or players
    const similar = games.filter(g => 
      g.id !== gameId &&
      (g.opening.eco === game.opening.eco ||
       g.white.name === game.white.name ||
       g.black.name === game.black.name ||
       g.white.name === game.black.name ||
       g.black.name === game.white.name)
    )

    return similar.slice(0, 5)
  }, [games])

  /**
   * Clear error message
   */
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  /**
   * Handle back navigation
   */
  const handleBackClick = useCallback(() => {
    soundFX.playClick()
    navigate('/study')
  }, [navigate])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (playbackTimerRef.current) {
        clearInterval(playbackTimerRef.current)
      }
    }
  }, [])

  return {
    // Data state
    games,
    filteredGames,
    selectedGame,
    currentMove,
    libraryStats: libraryStatsData,

    // UI state
    filters,
    isPlaying,
    playbackSpeed,
    boardOrientation,
    analysisMode,

    // Loading states
    isLoading,
    isLoadingGame,

    // Actions
    selectGame,
    setCurrentMove,
    togglePlayback,
    setPlaybackSpeed,
    updateFilters,
    toggleBookmark,
    flipBoard,
    setAnalysisMode: setAnalysisModeState,

    // Game navigation
    goToStart,
    goToEnd,
    goToMove,
    nextMove,
    previousMove,

    // Study session
    startStudySession,
    endStudySession,
    currentSession,

    // Search and discovery
    searchGames: searchGamesQuery,
    getRecommendedGames,
    getSimilarGames,

    // Error handling
    error,
    clearError,

    // UI handlers
    handleBackClick
  }
}