import React from 'react'
import { Chessboard } from 'react-chessboard'
import type { CustomPuzzleBoardProps } from '@/types/customPuzzles'

/**
 * Custom puzzle chess board component
 * Reusable chess board specifically designed for custom puzzles
 * Follows SRP - only handles board rendering and piece interaction
 */
export const CustomPuzzleBoard: React.FC<CustomPuzzleBoardProps> = ({
  position,
  onPieceDrop,
  orientation = 'white',
  showCoordinates = true,
  boardTheme
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative bg-gradient-to-br from-amber-100 to-amber-200 p-4 rounded-xl shadow-2xl">
        <Chessboard
          position={position}
          onPieceDrop={(sourceSquare, targetSquare) => onPieceDrop(sourceSquare, targetSquare)}
          boardOrientation={orientation}
          showBoardNotation={showCoordinates}
          customBoardStyle={{
            borderRadius: '8px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
          customLightSquareStyle={{ 
            backgroundColor: typeof boardTheme === 'object' ? boardTheme?.lightSquare || '#f0d9b5' : '#f0d9b5'
          }}
          customDarkSquareStyle={{ 
            backgroundColor: typeof boardTheme === 'object' ? boardTheme?.darkSquare || '#b58863' : '#b58863'
          }}
          animationDuration={200}
        />
      </div>
    </div>
  )
}

export default CustomPuzzleBoard