import React, { useState, useCallback } from 'react'
import { Chessboard } from 'react-chessboard'
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
  const [rightClickSquares, setRightClickSquares] = useState<Record<string, any>>({})
  const [moveSquares, setMoveSquares] = useState<Record<string, any>>({})

  /**
   * Handle piece drop on the board
   */
  const onPieceDrop = useCallback((sourceSquare: string, targetSquare: string): boolean => {
    if (!gameState || gameState.status !== 'active' || gameState.aiThinking) {
      return false
    }

    // Visual feedback for move attempt
    setMoveSquares({
      [sourceSquare]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' },
      [targetSquare]: { backgroundColor: 'rgba(255, 255, 0, 0.6)' }
    })

    // Clear visual feedback after a short delay
    setTimeout(() => setMoveSquares({}), 600)

    onPlayerMove(sourceSquare, targetSquare)
    return true
  }, [gameState, onPlayerMove])

  /**
   * Handle right-click on square for highlighting
   */
  const onSquareRightClick = useCallback((square: string) => {
    const color = 'rgba(0, 255, 255, 0.4)'
    setRightClickSquares(prev => ({
      ...prev,
      [square]: prev[square] ? undefined : { backgroundColor: color }
    }))
  }, [])

  /**
   * Get custom square styles for highlights
   */
  const customSquareStyles = {
    ...rightClickSquares,
    ...moveSquares,
    // Highlight last move
    ...(showLastMove && gameState.lastMove ? {
      [gameState.lastMove.from]: { backgroundColor: 'rgba(155, 199, 0, 0.4)' },
      [gameState.lastMove.to]: { backgroundColor: 'rgba(155, 199, 0, 0.6)' }
    } : {})
  }

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
            <div className="w-full" style={{ 
              height: 'min(70vh, 70vw)',
              maxHeight: '800px',
              minHeight: '400px'
            }}>
              <Chessboard
                position={gameState.position}
                onPieceDrop={onPieceDrop}
                onSquareRightClick={onSquareRightClick}
                boardOrientation={playerColor}
                arePiecesDraggable={gameState.status === 'active' && !gameState.aiThinking}
                animationDuration={200}
                customSquareStyles={customSquareStyles}
                customBoardStyle={{
                  borderRadius: '12px',
                  boxShadow: '0 0 40px rgba(0, 255, 255, 0.3)',
                  transform: 'translateZ(0)' // GPU acceleration
                }}
                customDarkSquareStyle={{ 
                  backgroundColor: theme.primary.includes('cyan') ? '#1e40af' : '#92400e',
                  transition: 'background-color 0.2s ease'
                }}
                customLightSquareStyle={{ 
                  backgroundColor: theme.primary.includes('cyan') ? '#3b82f6' : '#d97706',
                  transition: 'background-color 0.2s ease'
                }}
                showBoardNotation={showCoordinates}
              />
            </div>
            
            {/* Game Overlay Effects */}
            {gameState.inCheck && (
              <div className="absolute inset-0 pointer-events-none rounded-lg border-2 border-red-500 animate-pulse" />
            )}
            
            {gameState.aiThinking && (
              <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] rounded-lg flex items-center justify-center">
                <div className="bg-black/60 px-6 py-3 rounded-lg border border-white/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                    <span className={`text-sm font-medium ${theme.text}`}>
                      {gameState.setup.opponent.name} calculating...
                    </span>
                  </div>
                </div>
              </div>
            )}
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