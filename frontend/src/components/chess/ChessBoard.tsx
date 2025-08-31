import React from 'react'
import { Chessboard } from 'react-chessboard'
import { cn } from '../../lib/utils'
import type { BoardTheme } from '../../types/chess'
import type { ChessBoardProps } from '../../types/components'

/**
 * ChessBoard - Pure UI Component Following SRP
 * Single Responsibility: Render chess board display only
 * No game logic, no state management, no API calls
 * Pure presentation component that delegates all logic to parent
 */
export const ChessBoard: React.FC<ChessBoardProps> = ({
  position,
  boardWidth,
  boardOrientation,
  showCoordinates,
  disabled,
  arePiecesDraggable,
  boardTheme,
  customSquareStyles = {},
  premiumEffects = false,
  onSquareClick,
  onSquareRightClick,
  onPieceDrop,
  isAnimating = false
}) => {
  // Default premium board theme
  const defaultTheme: BoardTheme = {
    id: 'premium-dark',
    name: 'Premium Dark',
    lightSquare: '#f0d9b5',
    darkSquare: '#b58863',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: 'rgba(0, 0, 0, 0.3)'
  }

  const activeTheme = boardTheme || defaultTheme

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Chessboard
        position={position}
        boardOrientation={boardOrientation}
        boardWidth={boardWidth}
        arePiecesDraggable={!disabled && arePiecesDraggable}
        showBoardNotation={showCoordinates}
        customSquareStyles={customSquareStyles}
        customDarkSquareStyle={{ backgroundColor: activeTheme.darkSquare }}
        customLightSquareStyle={{ backgroundColor: activeTheme.lightSquare }}
        onSquareClick={onSquareClick ? (square, piece) => onSquareClick(square) : undefined}
        onSquareRightClick={onSquareRightClick ? (square) => onSquareRightClick(square) : undefined}
        onPieceDrop={onPieceDrop ? (sourceSquare, targetSquare, piece) => {
          return onPieceDrop(sourceSquare, targetSquare, piece)
        } : undefined}
        animationDuration={200}
        snapToCursor={true}
      />
    </div>
  )
}

export default ChessBoard