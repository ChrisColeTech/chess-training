import React, { useState, useCallback } from 'react'
import { Chessboard } from 'react-chessboard'
import type { ChessBoardContainerProps } from '../../types/components'
import type { ChessMove, Square } from '../../types/chess'

/**
 * ChessBoardContainer - Simple wrapper around react-chessboard
 */
export const ChessBoardContainer: React.FC<ChessBoardContainerProps> = ({
  chessInstance,
  boardWidth = 400,
  onMove,
  playerColor = 'white',
  disabled = false,
  showCoordinates = true,
  arePiecesDraggable = true,
  showMoveHints = false,
}) => {
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null)
  
  // Simple onPieceDrop handler that validates with chess.js and calls onMove
  const handlePieceDrop = useCallback((sourceSquare: string, targetSquare: string, piece: string): boolean => {
    if (!chessInstance || disabled) return false
    
    // Check if the move is valid without actually making it
    const moves = chessInstance.moves({ verbose: true })
    const validMove = moves.find((m: any) => m.from === sourceSquare && m.to === targetSquare)
    
    if (validMove && onMove) {
      // Call parent's onMove handler - let parent make the actual move
      onMove({
        from: sourceSquare,
        to: targetSquare,
        promotion: validMove.promotion as 'q' | 'r' | 'b' | 'n' | undefined
      })
      return true
    }
    
    return false
  }, [chessInstance, onMove, disabled])

  // Handle square clicks for click-to-move
  const handleSquareClick = useCallback((square: Square) => {
    if (!chessInstance || disabled) return

    // If no square is selected, select this square (if it has a piece)
    if (!selectedSquare) {
      const piece = chessInstance.get(square as any)
      if (piece && piece.color === chessInstance.turn()) {
        setSelectedSquare(square)
      }
      return
    }

    // If clicking the same square, deselect it
    if (selectedSquare === square) {
      setSelectedSquare(null)
      return
    }

    // If clicking another piece of the same color, select it instead
    const piece = chessInstance.get(square as any)
    if (piece && piece.color === chessInstance.turn()) {
      setSelectedSquare(square)
      return
    }

    // Try to make a move from selectedSquare to clicked square
    const moves = chessInstance.moves({ verbose: true })
    const validMove = moves.find((m: any) => m.from === selectedSquare && m.to === square)
    
    if (validMove && onMove) {
      onMove({
        from: selectedSquare,
        to: square,
        promotion: validMove.promotion as 'q' | 'r' | 'b' | 'n' | undefined
      })
      setSelectedSquare(null) // Clear selection after move
    } else {
      setSelectedSquare(null) // Clear selection if invalid move
    }
  }, [chessInstance, selectedSquare, onMove, disabled])

  if (!chessInstance) {
    return (
      <div style={{ width: boardWidth, height: boardWidth }} className="bg-gray-800 rounded flex items-center justify-center">
        <div className="text-gray-400">No chess game</div>
      </div>
    )
  }

  // Get valid moves for selected piece
  const getValidMoves = useCallback((square: Square) => {
    if (!chessInstance) return []
    return chessInstance.moves({ square: square as any, verbose: true })
  }, [chessInstance])

  // Custom square styles for selected square and valid moves
  const customSquareStyles = React.useMemo(() => {
    const styles: { [square: string]: React.CSSProperties } = {}
    
    // Highlight selected square
    if (selectedSquare) {
      styles[selectedSquare] = {
        background: 'rgba(255, 255, 0, 0.4)',
        borderRadius: '3px',
      }
      
      // Show valid moves if enabled
      if (showMoveHints) {
        const validMoves = getValidMoves(selectedSquare)
        validMoves.forEach((move: any) => {
          styles[move.to] = {
            background: 'rgba(0, 255, 0, 0.3)',
            borderRadius: '50%',
            border: '3px solid rgba(0, 255, 0, 0.6)',
          }
        })
      }
    }
    
    return styles
  }, [selectedSquare, showMoveHints, getValidMoves])

  return (
    <Chessboard
      position={chessInstance.fen()}
      onPieceDrop={handlePieceDrop}
      onSquareClick={handleSquareClick}
      customSquareStyles={customSquareStyles}
      boardWidth={boardWidth}
      boardOrientation={playerColor === 'black' ? 'black' : 'white'}
      arePiecesDraggable={!disabled && arePiecesDraggable}
      showBoardNotation={showCoordinates}
    />
  )
}

export default ChessBoardContainer