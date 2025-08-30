import { useState, useEffect, useCallback, useRef } from 'react'
import { Chess } from 'chess.js'
import { soundFX } from '@/utils/soundEffects'
import { useSearch } from '@/hooks/api/useSearch'
import { useAnalysis } from '@/hooks/api/useAnalysis'
import type {
  ChessOpening,
  MoveVariation,
  MasterGame,
  PositionAnalysis,
  OpeningStatistics,
  OpeningFilters,
  SearchResults,
  ExplorerTab,
  ECOCode,
  OpeningExplorerHookReturn
} from '@/types/openingExplorer'

/**
 * Custom hook for managing opening explorer state and logic
 * Handles opening database interaction, position analysis, and UI state
 */
export const useOpeningExplorer = (): OpeningExplorerHookReturn => {
  // Chess game instance
  const gameRef = useRef(new Chess())
  
  // Use API hooks
  const { searchResults: apiSearchResults, performSearch: apiSearch, isLoading: searchLoading } = useSearch()
  const { analyzePosition: apiAnalyze, isLoading: analysisLoading } = useAnalysis()
  
  // Current state
  const [currentOpening, setCurrentOpening] = useState<ChessOpening | null>(null)
  const [currentPosition, setCurrentPosition] = useState<string>(gameRef.current.fen())
  const [moveSequence, setMoveSequence] = useState<string[]>([])
  const [boardOrientation, setBoardOrientation] = useState<'white' | 'black'>('white')
  
  // Search state
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null)
  const [filters, setFilters] = useState<OpeningFilters>({
    searchQuery: '',
    category: 'All',
    difficulty: 'All',
    playerLevel: 'All',
    popularity: 'All',
    ecoRange: { start: 'A00', end: 'E99' },
    timeControl: 'All',
    resultFilter: 'All'
  })
  const [isSearching, setIsSearching] = useState(false)
  
  // Variations state
  const [currentVariations, setCurrentVariations] = useState<MoveVariation[]>([])
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())
  
  // Analysis state
  const [positionAnalysis, setPositionAnalysis] = useState<PositionAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  
  // Games state
  const [masterGames, setMasterGames] = useState<MasterGame[]>([])
  const [isLoadingGames, setIsLoadingGames] = useState(false)
  
  // UI state
  const [activeTab, setActiveTab] = useState<ExplorerTab>('overview')
  
  // Favorites state (in real app, this would be persistent)
  const [favorites, setFavorites] = useState<Set<ECOCode>>(new Set())
  
  // Error state
  const [error, setError] = useState<string | null>(null)
  
  // Statistics (mock data)
  const [openingStats] = useState<OpeningStatistics | null>(null)
  
  /**
   * Initialize with starting position and load initial data
   */
  useEffect(() => {
    const initializeExplorer = async () => {
      try {
        // Load variations for starting position (mock)
        setCurrentVariations([])
        
        // Load master games for current opening (mock)
        if (currentOpening) {
          setIsLoadingGames(true)
          // In a real app, this would use an API hook
          setMasterGames([])
          setIsLoadingGames(false)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize explorer')
      }
    }
    
    initializeExplorer()
  }, [currentPosition, currentOpening])
  
  /**
   * Select an opening and load its position
   */
  const selectOpening = useCallback(async (opening: ChessOpening) => {
    try {
      setCurrentOpening(opening)
      
      // Load the opening position
      const chess = new Chess(opening.fen)
      gameRef.current = chess
      setCurrentPosition(opening.fen)
      setMoveSequence(opening.moves)
      
      // Load variations for this position (would use API)
      setCurrentVariations([])
      
      // Load master games (would use API)
      setIsLoadingGames(true)
      setMasterGames([])
      setIsLoadingGames(false)
      
      soundFX.playClick()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load opening')
      soundFX.playError()
    }
  }, [])
  
  /**
   * Make a move on the board
   */
  const makeMove = useCallback((from: string, to: string): boolean => {
    try {
      const chess = gameRef.current
      const move = chess.move({
        from,
        to,
        promotion: 'q' // Auto-promote to queen
      })
      
      if (!move) {
        soundFX.playError()
        return false
      }
      
      // Update position and move sequence
      const newPosition = chess.fen()
      setCurrentPosition(newPosition)
      setMoveSequence(prev => [...prev, move.san])
      
      // Load variations for new position (would use API)
      setCurrentVariations([])
      
      // Clear current opening if we've moved away from known openings
      // In a real app, this would query the API for the position
      setCurrentOpening(null)
      
      soundFX.playClick()
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid move')
      soundFX.playError()
      return false
    }
  }, [currentOpening])
  
  /**
   * Reset to starting position
   */
  const resetPosition = useCallback(async () => {
    try {
      const chess = new Chess()
      gameRef.current = chess
      setCurrentPosition(chess.fen())
      setMoveSequence([])
      setCurrentOpening(null)
      
      // Load starting position variations (would use API)
      setCurrentVariations([])
      
      soundFX.playClick()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset position')
    }
  }, [])
  
  /**
   * Load a specific position
   */
  const loadPosition = useCallback(async (fen: string, moves: string[]) => {
    try {
      const chess = new Chess(fen)
      gameRef.current = chess
      setCurrentPosition(fen)
      setMoveSequence(moves)
      
      // Find matching opening (would use API)
      setCurrentOpening(null)
      
      // Load variations (would use API)
      setCurrentVariations([])
      
      soundFX.playClick()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid position')
      soundFX.playError()
    }
  }, [])
  
  /**
   * Update search filters
   */
  const updateFilters = useCallback((newFilters: Partial<OpeningFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }, [])
  
  /**
   * Search openings with current filters
   */
  const searchOpeningsHandler = useCallback(async (query: string = '') => {
    try {
      setIsSearching(true)
      setError(null)
      
      const searchFilters = { ...filters, searchQuery: query }
      const results = await apiSearch(query, searchFilters)
      setSearchResults(results || { openings: [], totalCount: 0 })
      
      if (results.openings.length === 0) {
        soundFX.playError()
      } else {
        soundFX.playClick()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed')
      soundFX.playError()
    } finally {
      setIsSearching(false)
    }
  }, [filters])
  
  /**
   * Analyze current position
   */
  const analyzePosition = useCallback(async () => {
    try {
      setIsAnalyzing(true)
      setError(null)
      
      const analysis = await apiAnalyze(currentPosition)
      setPositionAnalysis(analysis)
      
      soundFX.playClick()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed')
      soundFX.playError()
    } finally {
      setIsAnalyzing(false)
    }
  }, [currentPosition])
  
  /**
   * Select a variation to explore
   */
  const selectVariation = useCallback(async (variation: MoveVariation) => {
    try {
      // Make the variation move
      const chess = gameRef.current
      const move = chess.move(variation.move)
      
      if (!move) {
        soundFX.playError()
        return
      }
      
      const newPosition = chess.fen()
      setCurrentPosition(newPosition)
      setMoveSequence(prev => [...prev, variation.san])
      
      // Load variations for new position (would use API)
      setCurrentVariations([])
      
      soundFX.playClick()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to play variation')
      soundFX.playError()
    }
  }, [])
  
  /**
   * Toggle expansion state of tree node
   */
  const toggleNode = useCallback((nodeId: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev)
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId)
      } else {
        newSet.add(nodeId)
      }
      return newSet
    })
    soundFX.playClick()
  }, [])
  
  /**
   * Set active tab
   */
  const setActiveTabHandler = useCallback((tab: ExplorerTab) => {
    setActiveTab(tab)
    soundFX.playClick()
  }, [])
  
  /**
   * Flip board orientation
   */
  const flipBoard = useCallback(() => {
    setBoardOrientation(prev => prev === 'white' ? 'black' : 'white')
    soundFX.playClick()
  }, [])
  
  /**
   * Add opening to favorites
   */
  const addToFavorites = useCallback((eco: ECOCode) => {
    setFavorites(prev => new Set([...prev, eco]))
    soundFX.playClick()
  }, [])
  
  /**
   * Remove opening from favorites
   */
  const removeFromFavorites = useCallback((eco: ECOCode) => {
    setFavorites(prev => {
      const newSet = new Set(prev)
      newSet.delete(eco)
      return newSet
    })
    soundFX.playClick()
  }, [])
  
  /**
   * Check if opening is favorited
   */
  const isFavorite = useCallback((eco: ECOCode): boolean => {
    return favorites.has(eco)
  }, [favorites])
  
  /**
   * Export current position as FEN
   */
  const exportPosition = useCallback((): string => {
    return currentPosition
  }, [currentPosition])
  
  /**
   * Copy FEN to clipboard
   */
  const copyFEN = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(currentPosition)
      soundFX.playClick()
    } catch (err) {
      setError('Failed to copy FEN to clipboard')
    }
  }, [currentPosition])
  
  /**
   * Copy PGN to clipboard
   */
  const copyPGN = useCallback(async () => {
    try {
      const pgn = moveSequence.map((move, i) => {
        const moveNumber = Math.floor(i / 2) + 1
        const isWhiteMove = i % 2 === 0
        return isWhiteMove ? `${moveNumber}.${move}` : move
      }).join(' ')
      
      await navigator.clipboard.writeText(pgn || '1. (starting position)')
      soundFX.playClick()
    } catch (err) {
      setError('Failed to copy PGN to clipboard')
    }
  }, [moveSequence])
  
  /**
   * Clear error message
   */
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  /**
   * Handle opening selection
   */
  const handleOpeningSelect = useCallback((opening: ChessOpening) => {
    selectOpening(opening)
  }, [selectOpening])

  /**
   * Handle variation selection
   */
  const handleVariationSelect = useCallback((variation: MoveVariation) => {
    selectVariation(variation)
  }, [selectVariation])

  /**
   * Handle game selection
   */
  const handleGameSelect = useCallback((game: MasterGame) => {
    // Load the game if PGN is available
    if (game.pgn) {
      // For now, we can't load directly as we need FEN and moves array
      // This would need to be parsed from PGN
      console.log('Loading game:', game)
    }
  }, [loadPosition])
  
  /**
   * Auto-search when filters change
   */
  useEffect(() => {
    if (filters.searchQuery || filters.category !== 'All' || filters.difficulty !== 'All') {
      const timeoutId = setTimeout(() => {
        searchOpeningsHandler()
      }, 300) // Debounce search
      
      return () => clearTimeout(timeoutId)
    }
  }, [filters, searchOpeningsHandler])
  
  return {
    // Current state
    currentOpening,
    currentPosition,
    moveSequence,
    boardOrientation,
    
    // Search state
    searchResults,
    filters,
    isSearching,
    
    // Variations state
    currentVariations,
    expandedNodes,
    
    // Analysis state
    positionAnalysis,
    isAnalyzing,
    
    // Games state
    masterGames,
    isLoadingGames,
    
    // UI state
    activeTab,
    
    // Actions
    selectOpening,
    makeMove,
    resetPosition,
    loadPosition,
    updateFilters,
    searchOpenings: searchOpeningsHandler,
    analyzePosition,
    selectVariation,
    toggleNode,
    setActiveTab: setActiveTabHandler,
    flipBoard,
    
    // Favorites
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    
    // Export/Import
    exportPosition,
    copyFEN,
    copyPGN,
    
    // Error handling
    error,
    clearError,

    // UI handlers
    handleOpeningSelect,
    handleVariationSelect,
    handleGameSelect,
    
    // Statistics
    openingStats
  }
}