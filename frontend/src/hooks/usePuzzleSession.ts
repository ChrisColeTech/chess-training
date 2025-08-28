import { useState, useEffect, useCallback } from 'react'
import { Chess } from 'chess.js'
import { soundFX } from '@/utils/soundEffects'
import type { 
  OpeningPuzzle, 
  PuzzleSession, 
  TabValue,
  MoveValidationResult 
} from '@/types/openingPuzzles'

/**
 * Custom hook for managing puzzle session state and logic
 * Handles puzzle state, move validation, and session progression
 */
export const usePuzzleSession = (puzzles: OpeningPuzzle[]) => {
  // Session state
  const [session, setSession] = useState<PuzzleSession>({
    currentPuzzleIndex: 0,
    boardPosition: '',
    moveCount: 0,
    hintsUsed: 0,
    status: 'unsolved',
    showHint: false,
    timeElapsed: 0,
    isTimerActive: false,
    userMoves: [],
    activeTab: 'puzzle'
  })

  // Chess game instance
  const [game, setGame] = useState(new Chess())

  const currentPuzzle = puzzles[session.currentPuzzleIndex]

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
  const processMove = useCallback((sourceSquare: string, targetSquare: string): MoveValidationResult => {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q', // Always promote to queen for simplicity
      })

      if (move === null) {
        return {
          isValid: false,
          isCorrect: false,
          isComplete: false,
          error: 'Invalid move'
        }
      }

      const newMoves = [...session.userMoves, move.san]
      const solutionMove = currentPuzzle.solution[newMoves.length - 1]
      const isCorrect = move.san === solutionMove
      const isComplete = isCorrect && newMoves.length === currentPuzzle.solution.length

      // Update session state
      setSession(prev => ({
        ...prev,
        userMoves: newMoves,
        moveCount: prev.moveCount + 1,
        boardPosition: game.fen(),
        status: isComplete ? 'solved' : isCorrect ? 'unsolved' : 'failed',
        isTimerActive: isComplete || !isCorrect ? false : prev.isTimerActive,
        activeTab: isComplete ? 'theory' : prev.activeTab
      }))

      return {
        isValid: true,
        isCorrect,
        isComplete,
        move
      }
    } catch (error) {
      return {
        isValid: false,
        isCorrect: false,
        isComplete: false,
        error: 'Move processing failed'
      }
    }
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

    return true
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
    if (session.currentPuzzleIndex < puzzles.length - 1) {
      setSession(prev => ({
        ...prev,
        currentPuzzleIndex: prev.currentPuzzleIndex + 1
      }))
      soundFX.playClick()
    }
  }, [session.currentPuzzleIndex, puzzles.length])

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
   * Skip current puzzle and show theory
   */
  const skipPuzzle = useCallback(() => {
    setSession(prev => ({
      ...prev,
      status: 'failed',
      isTimerActive: false,
      activeTab: 'theory'
    }))
    soundFX.playError()
  }, [])

  /**
   * Change active tab
   */
  const setActiveTab = useCallback((tab: TabValue) => {
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

  return {
    // State
    session,
    currentPuzzle,
    game,

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

    // Computed values
    canGoPrevious: session.currentPuzzleIndex > 0,
    canGoNext: session.currentPuzzleIndex < puzzles.length - 1,
  }
}