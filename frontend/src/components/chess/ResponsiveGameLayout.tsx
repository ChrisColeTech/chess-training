import React from 'react'
import { cn } from '../../lib/utils'

interface ResponsiveGameLayoutProps {
  chessBoard: React.ReactNode
  playerCard: React.ReactNode
  opponentCard: React.ReactNode
  moveHints: React.ReactNode
  isPlayerCardsCollapsed?: boolean
  onTogglePlayerCards?: () => void
  playerTimeRemaining?: { white: number, black: number }
  playerColor?: 'white' | 'black'
  aiLevel?: number
  className?: string
}

export const ResponsiveGameLayout: React.FC<ResponsiveGameLayoutProps> = ({
  chessBoard,
  playerCard,
  opponentCard,
  moveHints,
  isPlayerCardsCollapsed = false,
  className
}) => {
  return (
    <div className={cn('min-h-screen p-6', className)}>
      {/* Grid-based layout following Document 25 ASCII patterns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
        
        {/* Opponent Card - Top */}
        <div className="lg:col-span-3 lg:order-1">
          {opponentCard}
        </div>

        {/* Chess Board - Center */}
        <div className="lg:col-span-6 lg:order-2 flex justify-center">
          <div className="w-full max-w-[600px]">
            {chessBoard}
          </div>
        </div>

        {/* Player Card - Bottom */}
        <div className="lg:col-span-3 lg:order-4">
          {playerCard}
        </div>

        {/* Move Hints - Full Width Bottom */}
        <div className="lg:col-span-12 lg:order-5">
          {moveHints}
        </div>
      </div>
    </div>
  )
}