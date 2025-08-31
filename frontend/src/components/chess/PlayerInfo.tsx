import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import { Clock, User, Zap } from 'lucide-react'
import { FaCrown } from 'react-icons/fa'
import { cn } from '../../lib/utils'
import type { PlayerInfoProps } from '../../types/components'

/**
 * PlayerInfo - SRP Component for Player vs AI Display
 * Single Responsibility: Display player information with timers
 * No game logic, no move handling, no API calls
 * Pure presentation of player data
 */
export const PlayerInfo: React.FC<PlayerInfoProps> = ({
  playerColor,
  aiLevel,
  timeRemaining,
  timeControl,
  currentTurn,
  gameState,
  isPlayerTurn,
  moveNumber,
  premiumEffects = true
}) => {
  
  // Format time display
  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  // Get time color based on remaining time
  const getTimeColor = (time: number): string => {
    if (time < 60000) return 'text-red-400' // < 1 minute
    if (time < 300000) return 'text-yellow-400' // < 5 minutes
    return 'text-green-400'
  }

  const showTimers = timeControl !== 'unlimited'
  const opponentColor = playerColor === 'white' ? 'black' : 'white'

  return (
    <Card className={cn(
      "bg-black/20 backdrop-blur-xl border-white/10",
      premiumEffects && "shadow-2xl"
    )}>
      <CardContent className="p-6">
        
        {/* Player vs AI Info Grid */}
        <div className="grid grid-cols-3 gap-6 items-center">
          
          {/* Player Info */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <User className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <div className="text-white font-semibold">You</div>
                <div className="text-xs text-gray-400 capitalize">{playerColor}</div>
              </div>
            </div>
            
            {showTimers && (
              <div className={cn(
                "text-lg font-mono flex items-center justify-center space-x-1",
                getTimeColor(timeRemaining[playerColor]),
                (currentTurn === 'w' ? 'white' : 'black') === playerColor && "animate-pulse"
              )}>
                <Clock className="w-4 h-4" />
                <span>{formatTime(timeRemaining[playerColor])}</span>
              </div>
            )}
            
            {(currentTurn === 'w' ? 'white' : 'black') === playerColor && !gameState.chess.isGameOver() && (
              <Badge className="mt-2 bg-blue-500/20 text-blue-400 border-blue-500/30 animate-pulse">
                Your Turn
              </Badge>
            )}
          </div>

          {/* VS Indicator */}
          <div className="text-center">
            <div className="text-2xl font-bold text-white/60 mb-1">VS</div>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
              Move #{moveNumber}
            </Badge>
          </div>

          {/* AI Opponent Info */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                <FaCrown className="w-4 h-4 text-orange-400" />
              </div>
              <div>
                <div className="text-white font-semibold flex items-center space-x-1">
                  <span>AI Level {aiLevel}</span>
                  <Zap className="w-3 h-3 text-yellow-400" />
                </div>
                <div className="text-xs text-gray-400 capitalize">{opponentColor}</div>
              </div>
            </div>
            
            {showTimers && (
              <div className={cn(
                "text-lg font-mono flex items-center justify-center space-x-1",
                getTimeColor(timeRemaining[opponentColor]),
                (currentTurn === 'w' ? 'white' : 'black') === opponentColor && "animate-pulse"
              )}>
                <Clock className="w-4 h-4" />
                <span>{formatTime(timeRemaining[opponentColor])}</span>
              </div>
            )}
            
            {(currentTurn === 'w' ? 'white' : 'black') === opponentColor && !gameState.chess.isGameOver() && (
              <Badge className="mt-2 bg-orange-500/20 text-orange-400 border-orange-500/30 animate-pulse">
                AI Thinking...
              </Badge>
            )}
          </div>

        </div>
      </CardContent>
    </Card>
  )
}

export default PlayerInfo