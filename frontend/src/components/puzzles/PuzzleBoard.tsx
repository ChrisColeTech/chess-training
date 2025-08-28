import React from 'react'
import { Chessboard } from 'react-chessboard'
import { Card } from "@/components/ui/card"
import type { PuzzleBoardProps } from '@/types/openingPuzzles'

/**
 * Chess board component optimized for puzzle solving
 * Follows the style guide golden standard for card design
 */
export const PuzzleBoard: React.FC<PuzzleBoardProps> = ({
  position,
  onPieceDrop,
  orientation = 'white'
}) => {
  return (
    <Card className="backdrop-blur-xl bg-black/20 border-white/10 p-6 hover:shadow-cyan-500/25 hover:border-white/20 transition-all duration-500">
      <div className="aspect-square max-w-2xl mx-auto">
        <Chessboard
          position={position}
          onPieceDrop={onPieceDrop}
          boardOrientation={orientation}
          customBoardStyle={{
            borderRadius: '8px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
          customLightSquareStyle={{ backgroundColor: '#f0d9b5' }}
          customDarkSquareStyle={{ backgroundColor: '#b58863' }}
          arePiecesDraggable={true}
          animationDuration={200}
        />
      </div>
    </Card>
  )
}