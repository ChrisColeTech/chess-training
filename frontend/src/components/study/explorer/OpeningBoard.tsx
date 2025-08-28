import React from 'react'
import { Chessboard } from 'react-chessboard'
import { Copy, Save, RotateCcw, RotateCw } from 'lucide-react'
import { Button } from "@/components/ui/button"
import type { OpeningBoardProps } from '@/types/openingExplorer'

/**
 * Opening board component with position display and controls
 * Handles chess board visualization and basic interactions
 */
const OpeningBoard: React.FC<OpeningBoardProps> = ({
  position,
  onMove,
  allowMoves = true,
  lastMove,
  arrows = [],
  orientation = 'white',
  showCoordinates = true,
  theme
}) => {
  // Custom board styling with gaming theme
  const boardStyle = {
    borderRadius: '12px',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
    background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
    padding: '4px'
  }

  const lightSquareStyle = { 
    backgroundColor: '#f0d9b5',
    borderRadius: '2px'
  }
  
  const darkSquareStyle = { 
    backgroundColor: '#b58863',
    borderRadius: '2px'
  }

  // Highlight last move squares
  const customSquareStyles = lastMove ? {
    [lastMove.from]: {
      backgroundColor: 'rgba(255, 255, 0, 0.4)'
    },
    [lastMove.to]: {
      backgroundColor: 'rgba(255, 255, 0, 0.6)'
    }
  } : {}

  const handlePieceDrop = (sourceSquare: string, targetSquare: string): boolean => {
    if (!allowMoves) return false
    return onMove(sourceSquare, targetSquare)
  }

  return (
    <div className="backdrop-blur-2xl bg-black/30 border-white/20 rounded-2xl border-2 p-8">
      {/* Board container */}
      <div className="aspect-square max-w-2xl mx-auto relative">
        <Chessboard
          position={position}
          onPieceDrop={handlePieceDrop}
          boardOrientation={orientation}
          areArrowsAllowed={true}
          customBoardStyle={boardStyle}
          customLightSquareStyle={lightSquareStyle}
          customDarkSquareStyle={darkSquareStyle}
          customSquareStyles={customSquareStyles}
          showBoardNotation={showCoordinates}
          arePiecesDraggable={allowMoves}
          animationDuration={200}
          customArrows={arrows.map(arrow => [arrow.from as any, arrow.to as any, arrow.color || 'rgb(0, 128, 0)'] as const)}
        />

        {/* Gaming overlay effects */}
        <div className="absolute inset-0 rounded-xl pointer-events-none">
          {/* Corner sparkles */}
          <div className="absolute top-2 left-2 w-2 h-2 bg-white rounded-full animate-twinkle opacity-60"></div>
          <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-white rounded-full animate-twinkle opacity-40 animation-delay-500"></div>
          <div className="absolute bottom-2 left-2 w-1 h-1 bg-white rounded-full animate-twinkle opacity-50 animation-delay-1000"></div>
          <div className="absolute bottom-2 right-2 w-2 h-2 bg-white rounded-full animate-twinkle opacity-30 animation-delay-1500"></div>
        </div>
      </div>

      {/* Board controls */}
      <div className="flex justify-center gap-2 mt-6">
        <Button 
          size="sm" 
          variant="outline" 
          className="backdrop-blur-xl bg-black/20 border-white/10 hover:bg-black/30"
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          Reset
        </Button>
        
        <Button 
          size="sm" 
          variant="outline"
          className="backdrop-blur-xl bg-black/20 border-white/10 hover:bg-black/30"
        >
          <RotateCw className="w-4 h-4 mr-1" />
          Flip
        </Button>
        
        <Button 
          size="sm" 
          variant="outline"
          className="backdrop-blur-xl bg-black/20 border-white/10 hover:bg-black/30"
        >
          <Copy className="w-4 h-4 mr-1" />
          Copy FEN
        </Button>
        
        <Button 
          size="sm" 
          variant="outline"
          className="backdrop-blur-xl bg-black/20 border-white/10 hover:bg-black/30"
        >
          <Save className="w-4 h-4 mr-1" />
          Save
        </Button>
      </div>
    </div>
  )
}

export default OpeningBoard