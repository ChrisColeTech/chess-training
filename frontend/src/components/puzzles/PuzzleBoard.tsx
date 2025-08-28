import React from 'react'
import { Chessboard } from 'react-chessboard'
import { Card } from "@/components/ui/card"
import type { PuzzleBoardProps } from '@/types/openingPuzzles'

/**
 * Board-centric chess component optimized for puzzle solving
 * Features prominent board design taking 60-70% of screen space
 * GPU-accelerated for smooth performance
 */
export const PuzzleBoard: React.FC<PuzzleBoardProps> = ({
  position,
  onPieceDrop,
  orientation = 'white'
}) => {
  return (
    <Card className="backdrop-blur-xl bg-black/20 border-white/10 p-2 hover:shadow-cyan-500/25 hover:border-white/20 transition-all duration-500">
      <div className="gpu-accelerated" style={{ 
        willChange: 'transform',
        height: 'min(75vh, 75vw)',
        maxHeight: '900px',
        minHeight: '450px'
      }}>
        <Chessboard
          position={position}
          onPieceDrop={onPieceDrop}
          boardOrientation={orientation}
          customBoardStyle={{
            borderRadius: '12px',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
            transform: 'translateZ(0)' // GPU acceleration
          }}
          customLightSquareStyle={{ 
            backgroundColor: '#f0d9b5',
            transition: 'background-color 0.2s ease'
          }}
          customDarkSquareStyle={{ 
            backgroundColor: '#b58863',
            transition: 'background-color 0.2s ease'
          }}
          arePiecesDraggable={true}
          animationDuration={200}
        />
      </div>
    </Card>
  )
}