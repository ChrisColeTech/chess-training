import React from 'react'
import { Button } from '../ui/button'
import { RotateCcw, Flag, Pause, Play, Handshake } from 'lucide-react'
import type { GameControlsProps } from '../../types/components'

/**
 * GameControls - Following Document 12 component patterns
 * Single Responsibility: Game action controls (resign, draw, pause, new game)
 * Pure UI component with no business logic
 */
export const GameControls: React.FC<GameControlsProps> = ({
  gameState,
  onResign,
  onOfferDraw,
  onPause,
  onNewGame,
  disabled = false
}) => {
  const isGameActive = gameState.status === 'active'
  const isGameCompleted = gameState.status === 'completed'

  return (
    <div className="flex justify-center items-center space-x-3">
      
      {/* New Game - Always available */}
      <Button
        variant="outline"
        onClick={onNewGame}
        disabled={disabled}
        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        New Game
      </Button>
      
      {/* Active Game Controls */}
      {isGameActive && !gameState.chess?.isGameOver() && (
        <>
          <Button
            variant="outline"
            onClick={onPause}
            disabled={disabled}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Pause className="w-4 h-4 mr-2" />
            Pause
          </Button>
          
          <Button
            variant="outline"
            onClick={onOfferDraw}
            disabled={disabled}
            className="bg-yellow-900/20 border-yellow-500/30 text-yellow-400 hover:bg-yellow-900/30"
          >
            <Handshake className="w-4 h-4 mr-2" />
            Offer Draw
          </Button>
          
          <Button
            variant="outline"
            onClick={onResign}
            disabled={disabled}
            className="bg-red-900/20 border-red-500/30 text-red-400 hover:bg-red-900/30"
          >
            <Flag className="w-4 h-4 mr-2" />
            Resign
          </Button>
        </>
      )}

      {/* Paused Game Control */}
      {gameState.status === 'paused' && (
        <Button
          variant="outline"
          onClick={onPause} // Resume functionality
          disabled={disabled}
          className="bg-green-900/20 border-green-500/30 text-green-400 hover:bg-green-900/30"
        >
          <Play className="w-4 h-4 mr-2" />
          Resume
        </Button>
      )}

      {/* Game Result Display */}
      {isGameCompleted && gameState.result && (
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-400">Result:</span>
          <span className="text-white font-medium">
            {gameState.result.result === 'white_wins' ? 'White Wins' :
             gameState.result.result === 'black_wins' ? 'Black Wins' : 'Draw'}
          </span>
          <span className="text-gray-400">({gameState.result.reason})</span>
          {gameState.result.eloChange !== undefined && (
            <span className={`font-semibold ${
              gameState.result.eloChange > 0 ? 'text-green-400' : 
              gameState.result.eloChange < 0 ? 'text-red-400' : 'text-gray-400'
            }`}>
              {gameState.result.eloChange > 0 ? '+' : ''}{gameState.result.eloChange}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default GameControls