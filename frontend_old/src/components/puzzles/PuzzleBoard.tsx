import React, { useMemo, useCallback } from 'react'
import { Chess } from 'chess.js'
import ChessBoard from '@/components/ChessBoard'
import { Card } from "@/components/ui/card"

interface PuzzleBoardProps {
  position: string;
  onMove: (move: { from: string, to: string, promotion?: string }) => void;
  orientation?: 'white' | 'black';
  disabled?: boolean;
  lastMove?: { from: string, to: string } | null;
}

/**
 * Board-centric chess component optimized for puzzle solving
 * Features prominent board design taking 60-70% of screen space
 * Now uses standardized ChessBoard with proper move validation
 */
export const PuzzleBoard: React.FC<PuzzleBoardProps> = ({
  position,
  onMove,
  orientation = 'white',
  disabled = false,
  lastMove = null
}) => {
  /**
   * Create Chess instance from position for move validation
   */
  const chessInstance = useMemo(() => {
    try {
      return new Chess(position)
    } catch (error) {
      console.error('Invalid puzzle position:', error)
      return null
    }
  }, [position])

  /**
   * Handle moves with proper validation
   */
  const handleMove = useCallback((move: { from: string, to: string, promotion?: string }) => {
    onMove(move)
  }, [onMove])

  return (
    <Card className="backdrop-blur-xl bg-black/20 border-white/10 p-4 hover:shadow-cyan-500/25 hover:border-white/20 transition-all duration-500">
      <div className="flex justify-center">
        <ChessBoard
          chessInstance={chessInstance}
          boardWidth={Math.min(650, Math.min(window.innerWidth * 0.75, window.innerHeight * 0.7))}
          onMove={handleMove}
          playerColor={orientation}
          disabled={disabled}
          showCoordinates={true}
          lastMove={lastMove}
        />
      </div>
    </Card>
  )
}