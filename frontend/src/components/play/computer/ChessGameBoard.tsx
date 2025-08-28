import React, { useState, useCallback, useMemo } from 'react'
import { Chess } from 'chess.js'
import ChessBoard from '@/components/ChessBoard'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Flag, Handshake, Pause, RotateCcw, Timer, User, Zap } from 'lucide-react'
import { FaCrown } from 'react-icons/fa'
import type { ChessGameBoardProps } from '@/types/playComputer'
import { soundFX } from '@/utils/soundEffects'

/**
 * Board-centric gaming chess component for computer battles
 * Features prominent, responsive board design with battle arena aesthetics
 * Optimized for 60-70% screen space and smooth performance
 */
export const ChessGameBoard: React.FC<ChessGameBoardProps> = ({
  gameState,
  onPlayerMove,
  playerColor,
  showCoordinates = true,
  showLastMove = true,
  theme
}) => {
  /**
   * Create Chess instance from game position for move validation
   */
  const chessInstance = useMemo(() => {
    if (!gameState?.position) return null
    try {
      return new Chess(gameState.position)
    } catch (error) {
      console.error('Invalid chess position:', error)
      return null
    }
  }, [gameState?.position])

  /**
   * Handle moves from the standardized ChessBoard component
   */
  const handleMove = useCallback((move: { from: string, to: string, promotion?: string }) => {
    if (!gameState || gameState.status !== 'active' || gameState.aiThinking) {
      return
    }
    
    // Call the parent's move handler
    onPlayerMove(move.from, move.to)
  }, [gameState, onPlayerMove])

  /**
   * Format time display
   */
  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  /**
   * Get time display color based on remaining time
   */
  const getTimeColor = (timeMs: number): string => {
    if (timeMs <= 30000) return 'text-red-400' // 30 seconds
    if (timeMs <= 60000) return 'text-yellow-400' // 1 minute
    return theme.text
  }

  /**
   * Get game status display
   */
  const getGameStatusDisplay = () => {
    switch (gameState.status) {
      case 'active':
        if (gameState.aiThinking) {
          return (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className={`text-sm ${theme.text} opacity-80`}>
                {gameState.setup.opponent.name} is thinking...
              </span>
            </div>
          )
        }
        return (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className={`text-sm ${theme.text} opacity-80`}>
              {gameState.currentTurn === playerColor ? 'Your turn' : `${gameState.setup.opponent.name}'s turn`}
            </span>
          </div>
        )
      case 'paused':
        return (
          <div className="flex items-center space-x-2">
            <Pause className="w-4 h-4 text-blue-400" />
            <span className={`text-sm ${theme.text} opacity-80`}>
              Battle Paused
            </span>
          </div>
        )
      case 'completed':
        const resultText = gameState.result === 'draw' ? 'Battle Draw!' :
                          gameState.result === 'white_wins' ? 
                          (playerColor === 'white' ? 'Victory!' : 'Defeat!') :
                          (playerColor === 'black' ? 'Victory!' : 'Defeat!')
        const resultColor = gameState.result === 'draw' ? 'text-yellow-400' :
                           (gameState.result === 'white_wins' && playerColor === 'white') ||
                           (gameState.result === 'black_wins' && playerColor === 'black') ?
                           'text-green-400' : 'text-red-400'
        return (
          <div className="flex items-center space-x-2">
            <FaCrown className={`w-4 h-4 ${resultColor}`} />
            <span className={`text-sm font-bold ${resultColor}`}>
              {resultText}
            </span>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      
      {/* Game Header */}
      <Card className="bg-black/20 border-white/10 backdrop-blur-xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className={`${theme.text} text-lg flex items-center space-x-2`}>
              <Zap className="w-5 h-5" />
              <span>Battle Arena</span>
            </CardTitle>
            {getGameStatusDisplay()}
          </div>
        </CardHeader>
        <CardContent>
          {/* Player vs AI Info */}
          <div className="grid grid-cols-3 gap-4 items-center">
            
            {/* Player Info */}
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-2xl"><User className="w-4 h-4 inline" /></span>
                <div>
                  <div className={`text-sm font-semibold ${theme.text}`}>You</div>
                  <div className={`text-xs ${theme.text} opacity-60`}>
                    {playerColor} pieces
                  </div>
                </div>
              </div>
              {gameState.setup.timeControl.type !== 'Unlimited' && (
                <div className={`text-lg font-mono ${getTimeColor(gameState.timeRemaining[playerColor])}`}>
                  <Clock className="w-4 h-4 inline mr-1" />
                  {formatTime(gameState.timeRemaining[playerColor])}
                </div>
              )}
            </div>

            {/* VS Divider */}
            <div className="text-center">
              <div className={`text-2xl font-bold ${theme.text} opacity-60`}>VS</div>
              <Badge className={`${theme.primary.includes('cyan') ? 'bg-cyan-500/20 text-cyan-400' : 'bg-yellow-500/20 text-yellow-400'} mt-1`}>
                Move #{Math.ceil((gameState.moves.length + 1) / 2)}
              </Badge>
            </div>

            {/* AI Opponent Info */}
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-2xl">{gameState.setup.opponent.avatar}</span>
                <div>
                  <div className={`text-sm font-semibold ${theme.text}`}>
                    {gameState.setup.opponent.name}
                  </div>
                  <div className={`text-xs ${theme.text} opacity-60`}>
                    {gameState.setup.opponent.difficulty} • {gameState.setup.opponent.rating}
                  </div>
                </div>
              </div>
              {gameState.setup.timeControl.type !== 'Unlimited' && (
                <div className={`text-lg font-mono ${getTimeColor(gameState.timeRemaining[playerColor === 'white' ? 'black' : 'white'])}`}>
                  <Timer className="w-4 h-4 inline mr-1" />
                  {formatTime(gameState.timeRemaining[playerColor === 'white' ? 'black' : 'white'])}
                </div>
              )}
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Chess Board - Prominent & Board-Centric */}
      <Card className="bg-black/20 border-white/10 backdrop-blur-xl overflow-hidden">
        <CardContent className="p-2">
          <div className="relative gpu-accelerated" style={{ willChange: 'transform' }}>
            <div className="flex justify-center">
              <ChessBoard
                chessInstance={chessInstance}
                boardWidth={Math.min(600, Math.min(window.innerWidth * 0.7, window.innerHeight * 0.6))}
                onMove={handleMove}
                playerColor={playerColor}
                disabled={gameState.status !== 'active' || gameState.aiThinking}
                showCoordinates={showCoordinates}
                lastMove={showLastMove ? gameState.lastMove : null}
                customSquareStyles={{
                  // Theme-based styling preserved from original
                  ...(theme.primary.includes('cyan') ? {
                    // Cyan theme styling can be added here if needed
                  } : {
                    // Default theme styling can be added here if needed
                  })
                }}
              />
            </div>
            
            {/* Game Overlay Effects */}
            {gameState.inCheck && (
              <div className="absolute inset-0 pointer-events-none rounded-lg border-2 border-red-500 animate-pulse" />
            )}
            
            {/* Removed disruptive full-board overlay - AI thinking status shown in header only */}
          </div>
        </CardContent>
      </Card>

      {/* Game Controls */}
      {gameState.status === 'active' && (
        <Card className="bg-black/20 border-white/10 backdrop-blur-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => soundFX.playClick()}
                className="bg-black/20 border-white/20 text-white hover:bg-black/30"
              >
                <Handshake className="w-4 h-4 mr-2" />
                Offer Draw
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => soundFX.playClick()}
                className="bg-black/20 border-white/20 text-white hover:bg-black/30"
              >
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => soundFX.playError()}
                className="bg-red-900/20 border-red-500/30 text-red-400 hover:bg-red-900/30"
              >
                <Flag className="w-4 h-4 mr-2" />
                Resign
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Game Completed Actions */}
      {gameState.status === 'completed' && (
        <Card className="bg-black/20 border-white/10 backdrop-blur-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-center space-x-3">
              <Button
                size="sm"
                className={`bg-gradient-to-r ${theme.primary} text-white hover:opacity-90`}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                New Battle
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="bg-black/20 border-white/20 text-white hover:bg-black/30"
              >
                Analyze Battle
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

    </div>
  )
}