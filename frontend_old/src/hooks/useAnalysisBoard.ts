// Analysis Board Hook - Following SRP for state management logic only
import { useState, useCallback, useEffect, useRef } from 'react'
import { Chess } from 'chess.js'
import type { 
  AnalysisBoardState, 
  AnalysisBoardActions, 
  AnalysisMode,
  AnalysisPosition,
  EngineAnalysis,
  AnalysisSettings,
  EngineStatus
} from '@/types/analysisBoard'
import { apiService } from '@/services/api'
import { soundFX } from '@/utils/soundEffects'

export const useAnalysisBoard = () => {
  // Core state management - Single responsibility for analysis board state
  const [game, setGame] = useState(() => new Chess())
  const [gameHistory, setGameHistory] = useState<string[]>([])
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0)
  const [analysisMode, setAnalysisMode] = useState<AnalysisMode>('analyze')
  const [isAnalysisRunning, setIsAnalysisRunning] = useState(false)
  const [currentAnalysis, setCurrentAnalysis] = useState<EngineAnalysis[]>([])
  const [analysisSettings, setAnalysisSettings] = useState<AnalysisSettings>({
    depth: 20,
    multiPV: 3,
    timeLimit: 5,
    engine: 'Stockfish',
    threads: 4
  })
  const [engineStatus, setEngineStatus] = useState<EngineStatus>({
    name: 'Stockfish',
    version: '15',
    isAnalyzing: false,
    currentDepth: 0,
    currentNodes: 0,
    currentTime: 0,
    hashUsage: 0
  })
  const [boardOrientation, setBoardOrientation] = useState<'white' | 'black'>('white')
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null)
  const [highlightedSquares, setHighlightedSquares] = useState<string[]>([])
  const [savedPositions, setSavedPositions] = useState<AnalysisPosition[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Refs for cleanup
  const analysisIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const stopAnalysisRef = useRef<boolean>(false)

  // Load saved positions on mount
  useEffect(() => {
    const loadSavedPositions = async () => {
      setIsLoading(true)
      try {
        const positions = await apiService.analysis.getSavedPositions()
        setSavedPositions(positions || [])
      } catch (err) {
        console.error('Failed to load saved positions:', err)
        setError('Failed to load saved positions')
      } finally {
        setIsLoading(false)
      }
    }
    loadSavedPositions()
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (analysisIntervalRef.current) {
        clearInterval(analysisIntervalRef.current)
      }
    }
  }, [])

  // Board state computed values
  const currentFen = game.fen()
  const isGameOver = game.isGameOver()
  const canUndo = gameHistory.length > 0
  const canRedo = false // Mock redo functionality

  // Move handling - Single responsibility for move logic
  const makeMove = useCallback((from: string, to: string, promotion?: string): boolean => {
    try {
      const move = game.move({
        from,
        to,
        promotion: promotion || 'q'
      })

      if (!move) {
        soundFX.playError()
        return false
      }

      // Update state immutably
      setGame(new Chess(game.fen()))
      setGameHistory(prev => [...prev, move.san])
      setCurrentMoveIndex(prev => prev + 1)
      setSelectedSquare(null)
      setHighlightedSquares([from, to])
      
      soundFX.playClick()
      return true
    } catch (error) {
      soundFX.playError()
      return false
    }
  }, [game])

  const undoMove = useCallback(() => {
    if (gameHistory.length === 0) return
    
    try {
      game.undo()
      setGame(new Chess(game.fen()))
      setGameHistory(prev => prev.slice(0, -1))
      setCurrentMoveIndex(prev => Math.max(0, prev - 1))
      setSelectedSquare(null)
      setHighlightedSquares([])
      
      soundFX.playClick()
    } catch (error) {
      console.error('Undo failed:', error)
      soundFX.playError()
    }
  }, [game, gameHistory])

  const redoMove = useCallback(() => {
    // Mock redo functionality - would need move tree implementation
    soundFX.playClick()
  }, [])

  const loadPosition = useCallback((fen: string) => {
    try {
      const newGame = new Chess(fen)
      setGame(newGame)
      setGameHistory([])
      setCurrentMoveIndex(0)
      setSelectedSquare(null)
      setHighlightedSquares([])
      
      soundFX.playSuccess()
      return true
    } catch (error) {
      console.error('Invalid FEN:', error)
      soundFX.playError()
      return false
    }
  }, [])

  const resetPosition = useCallback(() => {
    const newGame = new Chess()
    setGame(newGame)
    setGameHistory([])
    setCurrentMoveIndex(0)
    setSelectedSquare(null)
    setHighlightedSquares([])
    
    soundFX.playClick()
  }, [])

  const flipBoard = useCallback(() => {
    setBoardOrientation(prev => prev === 'white' ? 'black' : 'white')
    soundFX.playClick()
  }, [])

  // Analysis controls - Single responsibility for analysis management
  const startAnalysis = useCallback(async () => {
    setIsAnalysisRunning(true)
    setEngineStatus(prev => ({ ...prev, isAnalyzing: true }))
    stopAnalysisRef.current = false
    setError(null)
    
    try {
      // Start real analysis
      const analysisStream = await apiService.analysis.startAnalysis(currentFen, analysisSettings)
      
      // Handle analysis updates
      analysisIntervalRef.current = setInterval(async () => {
        if (stopAnalysisRef.current) return
        
        try {
          const updatedAnalysis = await apiService.analysis.getAnalysisProgress()
          setCurrentAnalysis(updatedAnalysis.analysis || [])
          setEngineStatus(prev => ({
            ...prev,
            currentDepth: updatedAnalysis.depth || prev.currentDepth,
            currentNodes: updatedAnalysis.nodes || prev.currentNodes,
            currentTime: updatedAnalysis.time || prev.currentTime
          }))
        } catch (err) {
          console.error('Analysis update failed:', err)
        }
      }, 500)
      
      soundFX.playClick()
    } catch (err) {
      console.error('Failed to start analysis:', err)
      setError('Failed to start analysis')
      setIsAnalysisRunning(false)
      setEngineStatus(prev => ({ ...prev, isAnalyzing: false }))
      soundFX.playError()
    }
  }, [currentFen, analysisSettings])

  const stopAnalysis = useCallback(async () => {
    setIsAnalysisRunning(false)
    setEngineStatus(prev => ({ ...prev, isAnalyzing: false }))
    stopAnalysisRef.current = true
    
    try {
      await apiService.analysis.stopAnalysis()
    } catch (err) {
      console.error('Failed to stop analysis:', err)
    }
    
    if (analysisIntervalRef.current) {
      clearInterval(analysisIntervalRef.current)
      analysisIntervalRef.current = null
    }
    
    soundFX.playClick()
  }, [])

  const setAnalysisDepth = useCallback((depth: number) => {
    setAnalysisSettings(prev => ({ ...prev, depth }))
    
    // If analyzing, restart with new depth
    if (isAnalysisRunning) {
      stopAnalysis()
      setTimeout(startAnalysis, 100)
    }
  }, [isAnalysisRunning, stopAnalysis, startAnalysis])

  const setMultiPV = useCallback((multiPV: number) => {
    setAnalysisSettings(prev => ({ ...prev, multiPV }))
    
    // Update displayed analysis lines
    setCurrentAnalysis(prev => prev.slice(0, multiPV))
  }, [])

  const toggleAnalysisMode = useCallback((mode: AnalysisMode) => {
    setAnalysisMode(mode)
    soundFX.playClick()
  }, [])

  // Position management - Single responsibility for position database
  const saveCurrentPosition = useCallback(async (name: string, category: AnalysisPosition['category']) => {
    setError(null)
    try {
      const newPosition = await apiService.analysis.savePosition({
        name,
        fen: currentFen,
        category,
        description: `Saved position from analysis board`,
        tags: ['custom', 'saved']
      })
      
      setSavedPositions(prev => [...prev, newPosition])
      soundFX.playSuccess()
    } catch (err) {
      console.error('Failed to save position:', err)
      setError('Failed to save position')
      soundFX.playError()
    }
  }, [currentFen])

  const loadSavedPosition = useCallback((position: AnalysisPosition) => {
    loadPosition(position.fen)
  }, [loadPosition])

  const deleteSavedPosition = useCallback(async (id: string) => {
    setError(null)
    try {
      await apiService.analysis.deletePosition(id)
      setSavedPositions(prev => prev.filter((_, index) => index.toString() !== id))
      soundFX.playClick()
    } catch (err) {
      console.error('Failed to delete position:', err)
      setError('Failed to delete position')
      soundFX.playError()
    }
  }, [])

  // Navigation controls - Single responsibility for move navigation
  const goToMove = useCallback((moveIndex: number) => {
    // Mock implementation - would need full game tree
    setCurrentMoveIndex(moveIndex)
    soundFX.playClick()
  }, [])

  const goToStart = useCallback(() => {
    resetPosition()
  }, [resetPosition])

  const goToEnd = useCallback(() => {
    // Mock implementation - would go to end of current line
    soundFX.playClick()
  }, [])

  // State object following interface
  const state: AnalysisBoardState = {
    currentFen,
    gameHistory,
    currentMoveIndex,
    analysisMode,
    engineStatus,
    currentAnalysis,
    analysisSettings,
    isAnalysisRunning,
    boardOrientation,
    selectedSquare,
    highlightedSquares,
    savedPositions
  }

  // Actions object following interface
  const actions: AnalysisBoardActions = {
    makeMove,
    undoMove,
    redoMove,
    loadPosition,
    resetPosition,
    flipBoard,
    startAnalysis,
    stopAnalysis,
    setAnalysisDepth,
    setMultiPV,
    toggleAnalysisMode,
    saveCurrentPosition,
    loadSavedPosition,
    deleteSavedPosition,
    goToMove,
    goToStart,
    goToEnd
  }

  // Additional computed values for convenience
  const derived = {
    isGameOver,
    canUndo,
    canRedo,
    currentPlayer: game.turn() === 'w' ? 'white' : 'black',
    inCheck: game.inCheck(),
    legalMoves: game.moves({ verbose: true }),
    gameStatus: game.isCheckmate() ? 'checkmate' : 
                game.isStalemate() ? 'stalemate' :
                game.isDraw() ? 'draw' : 'playing'
  }

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    state: {
      ...state,
      isLoading,
      error
    },
    actions: {
      ...actions,
      clearError
    },
    derived
  }
}