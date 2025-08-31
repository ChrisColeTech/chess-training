import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import { Clock, User, Bot } from 'lucide-react'
import { cn } from '../../lib/utils'
import type { PlayerCardProps } from '../../types/components'

export const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  timer,
  gameStatus,
  position = 'bottom',
  compact = false,
  className
}) => {
  const isActive = gameStatus.isPlayerTurn
  const isLowTime = timer.remaining < 60 // Less than 1 minute

  return (
    <Card className={cn(
      'transition-all duration-200',
      isActive && 'ring-2 ring-blue-500',
      className
    )}>
      <CardContent className={cn('p-4', compact && 'p-2')}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {player.isAI ? (
              <Bot className="w-5 h-5 text-blue-400" />
            ) : (
              <User className="w-5 h-5 text-green-400" />
            )}
            <div>
              <div className="font-semibold text-white">
                {player.name}
              </div>
              {player.rating && (
                <div className="text-sm text-white/70">
                  Rating: {player.rating}
                </div>
              )}
              {player.isAI && player.aiLevel && (
                <Badge variant="secondary" className="text-xs">
                  Level {player.aiLevel}
                </Badge>
              )}
            </div>
          </div>

          <div className="text-right">
            <div className={cn(
              'flex items-center gap-1 text-lg font-mono',
              isActive && 'text-blue-400',
              isLowTime && 'text-red-400',
              !isActive && 'text-white/70'
            )}>
              <Clock className="w-4 h-4" />
              {timer.format}
            </div>
            
            {gameStatus.lastMove && (
              <div className="text-xs text-white/50 mt-1">
                Last: {gameStatus.lastMove}
              </div>
            )}
          </div>
        </div>

        {isActive && (
          <div className="mt-2 w-full h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className={cn(
                'h-full transition-all duration-1000',
                isLowTime ? 'bg-red-400' : 'bg-blue-400'
              )}
              style={{ 
                width: `${Math.max(0, Math.min(100, (timer.remaining / 600) * 100))}%` 
              }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}