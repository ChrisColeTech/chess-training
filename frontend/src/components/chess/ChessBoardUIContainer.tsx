import React, { useCallback } from 'react'
import { ChessBoardUI } from './ChessBoardUI'
import type { ChessMove } from '../../types/chess'

interface ChessBoardUIContainerProps {
  chessInstance: any              // chess.js instance
  boardWidth?: number
  onMove?: (move: ChessMove) => void
  playerColor?: 'white' | 'black'
  disabled?: boolean
  showCoordinates?: boolean
  customConfig?: any
  className?: string
}

/**
 * ChessBoardUIContainer - SRP Container for ChessBoardUI
 * Single Responsibility: Handle chess.js integration and move validation
 */
export const ChessBoardUIContainer: React.FC<ChessBoardUIContainerProps> = ({
  chessInstance,
  boardWidth = 400,
  onMove,
  playerColor = 'white',
  disabled = false,
  showCoordinates = true,
  customConfig,
  className
}) => {
  const handleMove = useCallback((moveData: any) => {
    if (!chessInstance || disabled) return

    // Validate move with chess.js
    const moves = chessInstance.moves({ verbose: true })
    const validMove = moves.find((m: any) => 
      m.from === moveData.from && m.to === moveData.to
    )

    if (validMove && onMove) {
      onMove({
        from: moveData.from,
        to: moveData.to,
        promotion: moveData.promotion
      })
    }
  }, [chessInstance, onMove, disabled])

  const handleGameEnd = useCallback((result: any) => {
    console.log('Game ended:', result)
    // Handle game end logic
  }, [])

  if (!chessInstance) {
    return <div>Loading chess board...</div>
  }

  return (
    <ChessBoardUI
      position={chessInstance.fen()}
      playerColor={playerColor}
      boardWidth={boardWidth}
      disabled={disabled}
      showCoordinates={showCoordinates}
      onMove={handleMove}
      onGameEnd={handleGameEnd}
      customConfig={customConfig}
      className={className}
    />
  )
}

export default ChessBoardUIContainer