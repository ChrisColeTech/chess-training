import { useState, useEffect, useCallback } from 'react'
import { Chess } from 'chess.js'
import { soundFX } from '@/utils/soundEffects'
import type { 
  CustomPuzzle, 
  CustomPuzzleSession, 
  CustomPuzzleTabValue,
  CustomMoveValidationResult,
  CustomPuzzleFilters
} from '@/types/customPuzzles'
import { CustomPuzzleService } from '@/services/customPuzzleService'

/**
 * Custom hook for managing custom puzzle session state and logic
 * Handles puzzle state, move validation, session progression, and filtering
 * Following the exact pattern from usePuzzleSession but adapted for custom puzzles
 */
export const useCustomPuzzles = (puzzles: CustomPuzzle[]) => {
  // Session state
  const [session, setSession] = useState<CustomPuzzleSession>({
    currentPuzzleIndex: 0,
    boardPosition: '',
    moveCount: 0,
    hintsUsed: 0,
    status: 'unsolved',
    showHint: false,
    timeElapsed: 0,
    isTimerActive: false,
    userMoves: [],
    activeTab: 'puzzle',
    filters: {
      difficulty: undefined,
      themes: undefined,
      rating: undefined,
      source: undefined,
      tags: undefined
    },
    searchQuery: '',
    sortBy: 'rating',
    sortOrder: 'desc'
  })

  // Chess game instance
  const [game, setGame] = useState(new Chess())
  
  // Filtered and sorted puzzles
  const [filteredPuzzles, setFilteredPuzzles] = useState<CustomPuzzle[]>(puzzles)

  const currentPuzzle = filteredPuzzles[session.currentPuzzleIndex]

  /**
   * Apply filters and search to puzzle list
   */
  const applyFiltersAndSearch = useCallback(() => {
    let processed = puzzles

    // Apply search query
    if (session.searchQuery.trim()) {
      const query = session.searchQuery.toLowerCase()
      processed = processed.filter(puzzle =>
        puzzle.title.toLowerCase().includes(query) ||
        puzzle.description.toLowerCase().includes(query) ||
        puzzle.theme.toLowerCase().includes(query) ||
        puzzle.author.name.toLowerCase().includes(query) ||
        puzzle.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Apply filters
    processed = CustomPuzzleService.filterPuzzles(processed, session.filters)

    // Sort results
    processed = CustomPuzzleService.sortPuzzles(processed, session.sortBy, session.sortOrder)

    setFilteredPuzzles(processed)

    // Reset to first puzzle if current index is out of bounds
    if (session.currentPuzzleIndex >= processed.length) {
      setSession(prev => ({ ...prev, currentPuzzleIndex: 0 }))
    }
  }, [puzzles, session.searchQuery, session.filters, session.sortBy, session.sortOrder, session.currentPuzzleIndex])

  // Apply filters when they change
  useEffect(() => {
    applyFiltersAndSearch()
  }, [applyFiltersAndSearch])

  /**
   * Initialize puzzle when puzzle index changes
   */
  const initializePuzzle = useCallback(() => {
    if (!currentPuzzle) return

    const chess = new Chess(currentPuzzle.fen)
    setGame(chess)
    setSession(prev => ({
      ...prev,
      boardPosition: currentPuzzle.fen,
      moveCount: 0,
      hintsUsed: 0,
      status: 'unsolved',
      showHint: false,
      timeElapsed: 0,
      isTimerActive: true,
      userMoves: [],
      activeTab: 'puzzle'
    }))
  }, [currentPuzzle])

  // Initialize puzzle when index changes
  useEffect(() => {
    initializePuzzle()
  }, [initializePuzzle])

  /**
   * Validate and process a move attempt
   */
  const processMove = useCallback((sourceSquare: string, targetSquare: string): CustomMoveValidationResult => {
    if (!currentPuzzle) {
      return {
        isValid: false,
        isCorrect: false,
        isComplete: false,
        error: 'No puzzle loaded'
      }
    }

    const expectedMove = currentPuzzle.solution[session.userMoves.length]
    const result = CustomPuzzleService.validateMove(game, sourceSquare, targetSquare, expectedMove)

    if (result.isValid && result.isCorrect) {
      const newMoves = [...session.userMoves, result.move!.san]
      const isComplete = newMoves.length === currentPuzzle.solution.length

      // Update session state
      setSession(prev => ({
        ...prev,
        userMoves: newMoves,
        moveCount: prev.moveCount + 1,
        boardPosition: game.fen(),
        status: isComplete ? 'solved' : 'unsolved',
        isTimerActive: isComplete ? false : prev.isTimerActive,
        activeTab: isComplete ? 'collection' : prev.activeTab
      }))

      return {
        ...result,
        isComplete
      }
    }

    // If move was valid but incorrect, update move count
    if (result.isValid && !result.isCorrect) {
      setSession(prev => ({
        ...prev,
        moveCount: prev.moveCount + 1,
        status: 'failed',
        isTimerActive: false
      }))
    }

    return result
  }, [game, session.userMoves, currentPuzzle])

  /**
   * Handle piece drop on the board
   */
  const onPieceDrop = useCallback((sourceSquare: string, targetSquare: string): boolean => {
    const result = processMove(sourceSquare, targetSquare)
    
    if (!result.isValid) {
      soundFX.playError()
      return false
    }

    if (result.isComplete) {
      soundFX.playSuccess()
    } else if (result.isCorrect) {
      soundFX.playClick()
    } else {
      soundFX.playError()
    }

    return result.isCorrect || false
  }, [processMove])

  /**
   * Reset current puzzle to initial state
   */
  const resetPuzzle = useCallback(() => {
    initializePuzzle()
    soundFX.playClick()
  }, [initializePuzzle])

  /**
   * Navigate to next puzzle
   */
  const nextPuzzle = useCallback(() => {
    if (session.currentPuzzleIndex < filteredPuzzles.length - 1) {
      setSession(prev => ({
        ...prev,
        currentPuzzleIndex: prev.currentPuzzleIndex + 1
      }))
      soundFX.playClick()
    }
  }, [session.currentPuzzleIndex, filteredPuzzles.length])

  /**
   * Navigate to previous puzzle
   */
  const previousPuzzle = useCallback(() => {
    if (session.currentPuzzleIndex > 0) {
      setSession(prev => ({
        ...prev,
        currentPuzzleIndex: prev.currentPuzzleIndex - 1
      }))
      soundFX.playClick()
    }
  }, [session.currentPuzzleIndex])

  /**
   * Show next available hint
   */
  const showNextHint = useCallback(() => {
    if (session.hintsUsed < 3 && session.status === 'unsolved') {
      setSession(prev => ({
        ...prev,
        hintsUsed: prev.hintsUsed + 1,
        showHint: true
      }))
      soundFX.playClick()
    }
  }, [session.hintsUsed, session.status])

  /**
   * Get the current hint text based on hints used
   */
  const getCurrentHint = useCallback(() => {
    if (!currentPuzzle || session.hintsUsed === 0) return ''
    
    switch (session.hintsUsed) {
      case 1: return currentPuzzle.hint1
      case 2: return currentPuzzle.hint2
      case 3: return currentPuzzle.hint3
      default: return ''
    }
  }, [currentPuzzle, session.hintsUsed])

  /**
   * Skip current puzzle and show collection info
   */
  const skipPuzzle = useCallback(() => {
    setSession(prev => ({
      ...prev,
      status: 'failed',
      isTimerActive: false,
      activeTab: 'collection'
    }))
    soundFX.playError()
  }, [])

  /**
   * Change active tab
   */
  const setActiveTab = useCallback((tab: CustomPuzzleTabValue) => {
    setSession(prev => ({
      ...prev,
      activeTab: tab
    }))
  }, [])

  /**
   * Update timer elapsed time
   */
  const updateTimer = useCallback((elapsed: number) => {
    setSession(prev => ({
      ...prev,
      timeElapsed: elapsed
    }))
  }, [])

  /**
   * Update search query
   */
  const updateSearchQuery = useCallback((query: string) => {
    setSession(prev => ({
      ...prev,
      searchQuery: query,
      currentPuzzleIndex: 0 // Reset to first puzzle when searching
    }))
  }, [])

  /**
   * Update filters
   */
  const updateFilters = useCallback((filters: Partial<CustomPuzzleFilters>) => {
    setSession(prev => ({
      ...prev,
      filters: { ...prev.filters, ...filters },
      currentPuzzleIndex: 0 // Reset to first puzzle when filtering
    }))
  }, [])

  /**
   * Update sorting
   */
  const updateSorting = useCallback((sortBy: typeof session.sortBy, sortOrder: typeof session.sortOrder) => {
    setSession(prev => ({
      ...prev,
      sortBy,
      sortOrder,
      currentPuzzleIndex: 0 // Reset to first puzzle when sorting changes
    }))
  }, [])

  /**
   * Clear all filters and search
   */
  const clearFiltersAndSearch = useCallback(() => {
    setSession(prev => ({
      ...prev,
      searchQuery: '',
      filters: {
        difficulty: undefined,
        themes: undefined,
        rating: undefined,
        source: undefined,
        tags: undefined
      },
      currentPuzzleIndex: 0
    }))
  }, [])

  /**
   * Bookmark current puzzle (mock implementation)
   */
  const bookmarkPuzzle = useCallback(() => {
    // In a real app, this would make an API call
    soundFX.playClick()
    console.log('Bookmarking puzzle:', currentPuzzle?.id)
  }, [currentPuzzle])

  /**
   * Share current puzzle (mock implementation)
   */
  const sharePuzzle = useCallback(() => {
    if (currentPuzzle) {
      const shareUrl = CustomPuzzleService.generateShareableURL(currentPuzzle)
      navigator.clipboard.writeText(shareUrl).then(() => {
        soundFX.playSuccess()
        console.log('Share URL copied to clipboard:', shareUrl)
      }).catch(() => {
        soundFX.playError()
        console.log('Failed to copy share URL')
      })
    }
  }, [currentPuzzle])

  /**
   * Go to specific puzzle by index
   */
  const goToPuzzle = useCallback((index: number) => {
    if (index >= 0 && index < filteredPuzzles.length) {
      setSession(prev => ({
        ...prev,
        currentPuzzleIndex: index
      }))
      soundFX.playClick()
    }
  }, [filteredPuzzles.length])

  return {
    // State
    session,
    currentPuzzle,
    game,
    filteredPuzzles,
    totalPuzzles: filteredPuzzles.length,

    // Actions
    onPieceDrop,
    resetPuzzle,
    nextPuzzle,
    previousPuzzle,
    showNextHint,
    getCurrentHint,
    skipPuzzle,
    setActiveTab,
    updateTimer,
    updateSearchQuery,
    updateFilters,
    updateSorting,
    clearFiltersAndSearch,
    bookmarkPuzzle,
    sharePuzzle,
    goToPuzzle,

    // Computed values
    canGoPrevious: session.currentPuzzleIndex > 0,
    canGoNext: session.currentPuzzleIndex < filteredPuzzles.length - 1,
    hasFiltersActive: session.searchQuery.trim() !== '' || 
      Object.values(session.filters).some(filter => 
        filter !== undefined && 
        (Array.isArray(filter) ? filter.length > 0 : true)
      ),
  }
}