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
  gameControls
}) => {
  return (
    <div className="w-full h-screen flex flex-col lg:flex-row bg-background">
      
      {/* Chess Board Section */}
      <div className="flex-1 flex items-center justify-center p-2 lg:p-4">
        {chessBoard}
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