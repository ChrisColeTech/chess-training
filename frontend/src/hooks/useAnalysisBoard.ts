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
import { 
  mockEngineAnalysis, 
  defaultAnalysisSettings, 
  mockEngineStatus,
  simulateEngineProgress,
  mockAnalysisPositions
} from '@/data/analysisPositions'
import { soundFX } from '@/utils/soundEffects'

export const useAnalysisBoard = () => {
  // Core state management - Single responsibility for analysis board state
  const [game, setGame] = useState(() => new Chess())
  const [gameHistory, setGameHistory] = useState<string[]>([])
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0)
  const [analysisMode, setAnalysisMode] = useState<AnalysisMode>('analyze')
  const [isAnalysisRunning, setIsAnalysisRunning] = useState(false)
  const [currentAnalysis, setCurrentAnalysis] = useState<EngineAnalysis[]>(mockEngineAnalysis)
  const [analysisSettings, setAnalysisSettings] = useState<AnalysisSettings>(defaultAnalysisSettings)
  const [engineStatus, setEngineStatus] = useState<EngineStatus>(mockEngineStatus)
  const [boardOrientation, setBoardOrientation] = useState<'white' | 'black'>('white')
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null)
  const [highlightedSquares, setHighlightedSquares] = useState<string[]>([])
  const [savedPositions, setSavedPositions] = useState<AnalysisPosition[]>(mockAnalysisPositions)
  
  // Refs for cleanup
  const analysisIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const stopAnalysisRef = useRef<boolean>(false)

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
  const startAnalysis = useCallback(() => {
    setIsAnalysisRunning(true)
    setEngineStatus(prev => ({ ...prev, isAnalyzing: true }))
    stopAnalysisRef.current = false
    
    // Start mock analysis simulation
    analysisIntervalRef.current = simulateEngineProgress(
      (updatedAnalysis) => {
        setCurrentAnalysis(updatedAnalysis)
        setEngineStatus(prev => ({
          ...prev,
          currentDepth: Math.max(...updatedAnalysis.map(a => a.depth)),
          currentNodes: updatedAnalysis[0]?.nodes || 0,
          currentTime: updatedAnalysis[0]?.time || 0
        }))
      },
      () => stopAnalysisRef.current
    )
    
    soundFX.playClick()
  }, [])

  const stopAnalysis = useCallback(() => {
    setIsAnalysisRunning(false)
    setEngineStatus(prev => ({ ...prev, isAnalyzing: false }))
    stopAnalysisRef.current = true
    
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
  const saveCurrentPosition = useCallback((name: string, category: AnalysisPosition['category']) => {
    const newPosition: AnalysisPosition = {
      name,
      fen: currentFen,
      category,
      rating: 1500, // Default rating
      description: `Saved position from analysis board`,
      tags: ['custom', 'saved']
    }
    
    setSavedPositions(prev => [...prev, newPosition])
    soundFX.playSuccess()
  }, [currentFen])

  const loadSavedPosition = useCallback((position: AnalysisPosition) => {
    loadPosition(position.fen)
  }, [loadPosition])

  const deleteSavedPosition = useCallback((id: string) => {
    setSavedPositions(prev => prev.filter((_, index) => index.toString() !== id))
    soundFX.playClick()
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

  return {
    state,
    actions,
    derived
  }
}