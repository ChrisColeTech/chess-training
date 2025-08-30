import React from 'react'
import { Chessboard } from 'react-chessboard'
import type { CustomPuzzleBoardProps } from '@/types/customPuzzles'
// Default board theme styles'

/**
 * Board-centric custom puzzle chess board component
 * Prominent board design taking 60-70% of screen space
 * GPU-optimized for smooth performance and piece interaction
 */
export const CustomPuzzleBoard: React.FC<CustomPuzzleBoardProps> = ({
  position,
  onPieceDrop,
  orientation = 'white',
  showCoordinates = true,
  boardTheme
}) => {
  // Default board styles
  const boardStyles = {
    customBoardStyle: {
      borderRadius: "8px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)"
    },
    customLightSquareStyle: {
      backgroundColor: "#f0d9b5"
    },
    customDarkSquareStyle: {
      backgroundColor: "#b58863"
    },
    animationDuration: 200
  }
  
  return (
    <div className="w-full gpu-accelerated" style={{ 
      willChange: 'transform',
      height: 'min(75vh, 75vw)',
      maxHeight: '900px',
      minHeight: '450px'
    }}>
      <div className="relative bg-gradient-to-br from-amber-100 to-amber-200 p-2 rounded-xl shadow-2xl h-full">
        <Chessboard
          position={position}
          onPieceDrop={(sourceSquare, targetSquare) => onPieceDrop(sourceSquare, targetSquare)}
          boardOrientation={orientation}
          showBoardNotation={showCoordinates}
          customBoardStyle={boardStyles.customBoardStyle}
          customLightSquareStyle={boardStyles.customLightSquareStyle}
          customDarkSquareStyle={boardStyles.customDarkSquareStyle}
          animationDuration={boardStyles.animationDuration}
        />
      </div>
    </div>
  )
}

export default CustomPuzzleBoard