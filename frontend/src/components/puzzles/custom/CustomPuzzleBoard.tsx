import React from 'react'
import { Chessboard } from 'react-chessboard'
import type { CustomPuzzleBoardProps } from '@/types/customPuzzles'

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
          customBoardStyle={{
            borderRadius: '12px',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
            transform: 'translateZ(0)' // GPU acceleration
          }}
          customLightSquareStyle={{ 
            backgroundColor: typeof boardTheme === 'object' ? boardTheme?.lightSquare || '#f0d9b5' : '#f0d9b5',
            transition: 'background-color 0.2s ease'
          }}
          customDarkSquareStyle={{ 
            backgroundColor: typeof boardTheme === 'object' ? boardTheme?.darkSquare || '#b58863' : '#b58863',
            transition: 'background-color 0.2s ease'
          }}
          animationDuration={200}
        />
      </div>
    </div>
  )
}

export default CustomPuzzleBoard