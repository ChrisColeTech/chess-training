import React from 'react'
import { ChessBoard } from 'react-chessboard-ui'
import { cn } from '../../lib/utils'

interface ChessBoardUIProps {
  position: string // FEN
  playerColor?: 'white' | 'black'
  boardWidth?: number
  disabled?: boolean
  showCoordinates?: boolean
  boardTheme?: string
  reversed?: boolean
  onMove?: (moveData: any) => void
  onGameEnd?: (result: any) => void
  customConfig?: any
  className?: string
}

/**
 * ChessBoardUI - SRP Wrapper for react-chessboard-ui
 * Single Responsibility: Wrap react-chessboard-ui with consistent API
 */
export const ChessBoardUI: React.FC<ChessBoardUIProps> = ({
  position,
  playerColor = 'white',
  boardWidth = 400,
  disabled = false,
  showCoordinates = true,
  boardTheme,
  reversed = false,
  onMove,
  onGameEnd,
  customConfig = {},
  className
}) => {
  const handleChange = (moveData: any) => {
    if (!disabled && onMove) {
      onMove(moveData)
    }
  }

  const handleEndGame = (result: any) => {
    if (onGameEnd) {
      onGameEnd(result)
    }
  }

  const config = {
    moveSpeed: 'fast',
    showHints: false,
    restrictMoves: true,
    ...customConfig
  }

  return (
    <div 
      className={cn("chess-board-ui-wrapper", className)}
      style={{ 
        maxWidth: '100%',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <ChessBoard
        FEN={position}
        playerColor={playerColor}
        reversed={reversed}
        onChange={handleChange}
        onEndGame={handleEndGame}
        config={config}
      />
      {showCoordinates && (
        <div className="board-coordinates">
          {/* Custom coordinate display if needed */}
        </div>
      )}
    </div>
  )
}