import { useState, useCallback } from 'react'
import { Chess } from 'chess.js'
import type { ChessMove, ChessSoundEvent, Square } from '../types/chess'

interface UseChessInteractionProps {
  chessInstance: Chess | null
  onMove?: (move: ChessMove) => void
  onSound?: (sound: ChessSoundEvent) => void
  disabled?: boolean
  showMoveHints?: boolean
  enableRightClick?: boolean
}

interface UseChessInteractionReturn {
  // State
  moveFrom: Square | null
  optionSquares: { [key: string]: React.CSSProperties }
  rightClickedSquares: { [key: string]: React.CSSProperties }
  
  // Move logic
  onSquareClick: (square: Square) => void
  onSquareRightClick: (square: Square) => void
  onPieceDrop: (sourceSquare: Square, targetSquare: Square, piece?: string) => boolean
  
  // State management
  clearSelection: () => void
}

/**
 * useChessInteraction - SRP Hook for Move Logic Only
 * Single Responsibility: Handle chess piece interactions and move validation
 * No UI rendering, no animations, no API calls
 * Pure interaction logic that coordinates with parent components
 */
export const useChessInteraction = ({
  chessInstance,
  onMove,
  onSound,
  disabled = false,
  showMoveHints = true,
  enableRightClick = true
}: UseChessInteractionProps): UseChessInteractionReturn => {
  
  // Interaction state (move logic only)
  const [moveFrom, setMoveFrom] = useState<Square | null>(null)
  const [rightClickedSquares, setRightClickedSquares] = useState<{ [key: string]: React.CSSProperties }>({})
  const [optionSquares, setOptionSquares] = useState<{ [key: string]: React.CSSProperties }>({})

  // Helper: Play sound through callback
  const playSound = useCallback((sound: ChessSoundEvent) => {
    if (onSound) {
      onSound(sound)
    }
  }, [onSound])

  // SRP: Move option calculation logic only
  const getMoveOptions = useCallback((square: Square) => {
    if (!chessInstance || !showMoveHints) return {}
    
    const moves = chessInstance.moves({
      square: square as any,
      verbose: true,
    }) as any[]
    
    if (moves.length === 0) {
      setOptionSquares({})
      return {}
    }

    const newSquares: { [key: string]: React.CSSProperties } = {}
    
    moves.forEach((move) => {
      const isCapture = chessInstance.get(move.to) && 
                       chessInstance.get(move.to)?.color !== chessInstance.get(square as any)?.color
      
      // Modern gradient-based move indicators
      newSquares[move.to] = {
        background: isCapture 
          ? 'radial-gradient(circle, rgba(220, 38, 38, 0.8) 20%, rgba(220, 38, 38, 0.3) 80%, transparent 85%)'
          : 'radial-gradient(circle, rgba(34, 197, 94, 0.8) 15%, rgba(34, 197, 94, 0.3) 25%, transparent 30%)',
        borderRadius: '50%',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.2s ease-in-out'
      }
    })
    
    // Premium selection indicator
    newSquares[square] = {
      background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.4), rgba(147, 51, 234, 0.4))',
      boxShadow: '0 0 20px rgba(59, 130, 246, 0.5), inset 0 1px 3px rgba(255, 255, 255, 0.2)',
      border: '2px solid rgba(59, 130, 246, 0.8)',
      transition: 'all 0.3s ease-in-out'
    }
    
    setOptionSquares(newSquares)
    return newSquares
  }, [chessInstance, showMoveHints])

  // SRP: Square click interaction logic
  const onSquareClick = useCallback((square: Square) => {
    if (!chessInstance || disabled) return

    setRightClickedSquares({})

    function resetFirstMove(square: Square) {
      const hasOptions = getMoveOptions(square)
      setMoveFrom(square)
      playSound('move')
      return Object.keys(hasOptions).length > 0
    }

    if (!moveFrom) {
      resetFirstMove(square)
      return
    }

    if (moveFrom === square) {
      setMoveFrom(null)
      setOptionSquares({})
      return
    }

    // Validate move
    const moves = chessInstance.moves({
      square: moveFrom as any,
      verbose: true,
    }) as any[]
    
    const foundMove = moves.find((m) => m.from === moveFrom && m.to === square)
    
    if (!foundMove) {
      resetFirstMove(square)
      playSound('error')
      return
    }

    // Detect move type for sound feedback
    const willBeCheck = (() => {
      const tempChess = new Chess(chessInstance.fen())
      tempChess.move(foundMove)
      return tempChess.inCheck()
    })()

    const moveData: ChessMove = {
      from: moveFrom,
      to: square,
      promotion: foundMove.promotion || undefined
    }

    // Sound feedback based on move type
    if (foundMove.flags && foundMove.flags.includes('c')) {
      playSound('capture')
    } else if (willBeCheck) {
      playSound('check')
    } else {
      playSound('move')
    }

    // Delegate move to parent
    if (onMove) {
      onMove(moveData)
    }
    
    setMoveFrom(null)
    setOptionSquares({})
  }, [chessInstance, moveFrom, disabled, getMoveOptions, onMove, playSound])

  // SRP: Right-click interaction logic
  const onSquareRightClick = useCallback((square: Square) => {
    if (!enableRightClick || !chessInstance) return
    
    const color = 'rgba(168, 85, 247, 0.4)'
    
    setRightClickedSquares(prev => ({
      ...prev,
      [square]: prev[square]?.backgroundColor === color
        ? {}
        : { 
            backgroundColor: color,
            border: '2px solid rgba(168, 85, 247, 0.8)',
            boxShadow: '0 0 15px rgba(168, 85, 247, 0.5)'
          }
    }))
  }, [enableRightClick, chessInstance])

  // SRP: Drag and drop interaction logic
  const onPieceDrop = useCallback((sourceSquare: Square, targetSquare: Square, piece?: string): boolean => {
    console.log('🎯 onPieceDrop called:', { sourceSquare, targetSquare, piece, disabled, hasChess: !!chessInstance })
    
    if (!chessInstance || disabled) {
      console.log('❌ Returning false: no chess instance or disabled')
      return false
    }

    const moves = chessInstance.moves({
      square: sourceSquare as any,
      verbose: true,
    }) as any[]
    
    const foundMove = moves.find((m) => m.from === sourceSquare && m.to === targetSquare)
    
    if (!foundMove) {
      console.log('❌ No valid move found:', { moves: moves.length, availableMoves: moves.map(m => `${m.from}-${m.to}`) })
      playSound('error')
      return false
    }

    const moveData: ChessMove = {
      from: sourceSquare,
      to: targetSquare,
      promotion: foundMove.promotion || undefined
    }

    // Sound feedback
    if (foundMove.flags && foundMove.flags.includes('c')) {
      playSound('capture')
    } else {
      playSound('move')
    }

    // Delegate move to parent
    if (onMove) {
      onMove(moveData)
    }
    
    console.log('✅ Returning true - move should work')
    return true
  }, [chessInstance, disabled, onMove, playSound])

  // Clear selection state
  const clearSelection = useCallback(() => {
    setMoveFrom(null)
    setOptionSquares({})
    setRightClickedSquares({})
  }, [])

  return {
    // State
    moveFrom,
    optionSquares,
    rightClickedSquares,
    
    // Move logic
    onSquareClick,
    onSquareRightClick,
    onPieceDrop,
    
    // State management
    clearSelection
  }
}