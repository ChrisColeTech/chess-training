import React from 'react'
import type { GameLayoutProps } from '../../types/components'

/**
 * GameLayout - SRP Layout Component
 * Single Responsibility: Handle responsive layout for chess game UI
 * No game logic, no state management, pure layout coordination
 */
export const GameLayout: React.FC<GameLayoutProps> = ({
  chessBoard,
  playerInfo,
  gameControls,
  moveHints
}) => {
  return (
    <div className="w-full h-screen flex flex-col lg:flex-row bg-background">
      
      {/* Chess Board Section with Optional Hints */}
      <div className="flex-1 flex flex-col items-center justify-center p-2 lg:p-4">
        {/* Chess Board */}
        <div className="chess-board-container">
          {chessBoard}
        </div>
        
        {/* Move Hints (if provided) */}
        {moveHints && (
          <div className="w-full max-w-4xl mt-4">
            {moveHints}
          </div>
        )}
      </div>

      {/* Side Panel */}
      <div className="w-full lg:w-80 h-64 lg:h-full flex flex-col space-y-4 p-4">
        {playerInfo}
        {gameControls}
      </div>

    </div>
  )
}

export default GameLayout