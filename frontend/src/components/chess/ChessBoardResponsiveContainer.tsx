import React, { useState, useCallback } from 'react'
import { ChessBoardResponsive } from './ChessBoardResponsive'
import { useResponsiveSize } from '../../hooks/useResponsiveSize'
import type { ChessBoardResponsiveContainerProps } from '../../types/components'
import type { ChessMove, Square } from '../../types/chess'

export const ChessBoardResponsiveContainer: React.FC<ChessBoardResponsiveContainerProps> = ({
  chessInstance,
  boardSize = 400,
  onMove,
  playerColor = 'white',
  disabled = false,
  showCoordinates = true,
  arePiecesDraggable = true,
  showMoveHints = false,
  className,
  ...props
}) => {
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null)
  
  // Handle moves with chess.js validation
  const handleMove = useCallback((move: ChessMove) => {
    if (!chessInstance || disabled) return false

    try {
      // Validate move with chess.js
      const moves = chessInstance.moves({ verbose: true })
      const validMove = moves.find((m: any) => m.from === move.from && m.to === move.to)
      
      if (validMove && onMove) {
        onMove(move)
        return true
      }
    } catch (error) {
      console.error('Invalid move:', error)
    }
    
    return false
  }, [chessInstance, onMove, disabled])

  if (!chessInstance) {
    return (
      <div className={className} style={{ width: boardSize, height: boardSize }}>
        <div className="bg-gray-800 rounded flex items-center justify-center h-full">
          <div className="text-gray-400">No chess game</div>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <ChessBoardResponsive
        position={chessInstance.fen()}
        boardSize={boardSize}
        onMove={handleMove}
        playerColor={playerColor}
        disabled={disabled}
        {...props}
      />
    </div>
  )
}