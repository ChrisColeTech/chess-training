import React from 'react'
import { Chessboard } from 'react-chessboard'
import { Play, Pause, SkipBack, SkipForward, FastForward, Rewind, RotateCw, Calendar, MapPin, Trophy } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import type { GameViewerProps } from '@/types/masterGames'

/**
 * GameViewer Component
 * Displays chess board with game playback controls
 */
export const GameViewer: React.FC<GameViewerProps> = ({
  game,
  currentMove,
  isPlaying,
  playbackSpeed,
  showCoordinates,
  showLastMove,
  orientation,
  onMoveChange,
  onPlayToggle,
  onSpeedChange,
  theme
}) => {
  if (!game) {
    return (
      <div className="bg-black/30 backdrop-blur-md border-white/10 rounded-2xl p-6 h-full">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <Trophy className="mx-auto text-white/30 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-white/70 mb-2">
              MASTERS HALL
            </h3>
            <p className="text-white/50">Select a game to begin your study journey</p>
          </div>
        </div>
      </div>
    )
  }

  // Calculate current FEN based on move number
  const getCurrentFEN = (): string => {
    // This would normally parse the game and return the position at currentMove
    // For the mockup, we'll return the starting position
    return 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  }

  const getResultColor = (result: string) => {
    switch (result) {
      case '1-0': return 'text-green-400'
      case '0-1': return 'text-red-400'
      case '1/2-1/2': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  const getResultDisplay = (result: string) => {
    switch (result) {
      case '1-0': return 'White wins'
      case '0-1': return 'Black wins'
      case '1/2-1/2': return 'Draw'
      default: return result
    }
  }

  const totalMoves = game.moveCount || 50 // Fallback for demo

  return (
    <div className="space-y-4 h-full flex flex-col">
      {/* Game Information Header */}
      <Card className="bg-black/30 backdrop-blur-md border-white/10">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold text-white">
              {game.white.name} vs {game.black.name}
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className={`text-lg font-bold ${getResultColor(game.result)}`}>
                {game.result}
              </span>
              <div className="text-sm text-white/60">
                {getResultDisplay(game.result)}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div className="text-sm">
              <div className="text-white/60">White</div>
              <div className="font-semibold text-white">{game.white.name}</div>
              <div className="text-white/50 text-xs">Rating: {game.white.rating}</div>
            </div>
            <div className="text-sm">
              <div className="text-white/60">Black</div>
              <div className="font-semibold text-white">{game.black.name}</div>
              <div className="text-white/50 text-xs">Rating: {game.black.rating}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-white/60">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{game.tournament.date || game.tournament.year}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              <span>{game.tournament.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Trophy size={14} />
              <span>{game.tournament.name}</span>
            </div>
          </div>
          
          <div className="mt-2 text-sm text-white/70">
            <span className="font-mono bg-black/30 px-2 py-1 rounded mr-2">
              {game.opening.eco}
            </span>
            {game.opening.name}
          </div>
        </CardContent>
      </Card>

      {/* Chess Board */}
      <Card className={`${theme.glassMorphism} border-white/10 flex-1`}>
        <CardContent className="p-6 h-full flex flex-col items-center justify-center">
          <div className="w-full max-w-lg aspect-square mb-4">
            <Chessboard
              position={getCurrentFEN()}
              arePiecesDraggable={false}
              boardOrientation={orientation}
              showBoardNotation={showCoordinates}
              customBoardStyle={{
                borderRadius: '12px',
                boxShadow: '0 0 30px rgba(147, 51, 234, 0.4)'
              }}
              customSquareStyles={showLastMove ? {
                // This would show the last move highlight in a real implementation
              } : {}}
            />
          </div>

          {/* Move Counter */}
          <div className="text-center mb-4">
            <div className="text-sm text-white/60 mb-1">
              Move {currentMove} of {totalMoves}
            </div>
            {game.analysis.quality >= 9 && (
              <div className="flex items-center justify-center gap-1 text-yellow-400">
                <Trophy size={14} />
                <span className="text-xs">Masterpiece ({game.analysis.quality}/10)</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Playback Controls */}
      <Card className="bg-black/30 backdrop-blur-md border-white/10">
        <CardContent className="p-4">
          {/* Control Buttons */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onMoveChange(0)}
              className="bg-black/20 border-white/20 text-white hover:bg-black/40"
            >
              <Rewind size={16} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onMoveChange(Math.max(0, currentMove - 1))}
              className="bg-black/20 border-white/20 text-white hover:bg-black/40"
            >
              <SkipBack size={16} />
            </Button>
            <Button
              size="sm"
              onClick={onPlayToggle}
              className={`bg-gradient-to-r ${theme.primary} hover:opacity-90 text-white font-semibold px-6`}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onMoveChange(Math.min(totalMoves, currentMove + 1))}
              className="bg-black/20 border-white/20 text-white hover:bg-black/40"
            >
              <SkipForward size={16} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onMoveChange(totalMoves)}
              className="bg-black/20 border-white/20 text-white hover:bg-black/40"
            >
              <FastForward size={16} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {}} // This would flip the board
              className="bg-black/20 border-white/20 text-white hover:bg-black/40 ml-2"
            >
              <RotateCw size={16} />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="w-full bg-black/30 rounded-full h-2 mb-2">
              <div
                className={`bg-gradient-to-r ${theme.primary} h-2 rounded-full transition-all duration-300`}
                style={{ width: `${totalMoves > 0 ? (currentMove / totalMoves) * 100 : 0}%` }}
              />
            </div>
            <input
              type="range"
              min="0"
              max={totalMoves}
              value={currentMove}
              onChange={(e) => onMoveChange(parseInt(e.target.value))}
              className="w-full h-1 bg-black/30 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Playback Speed Control */}
          <div className="flex items-center justify-center gap-4">
            <span className="text-sm text-white/70">Speed:</span>
            <div className="flex items-center gap-2 min-w-[120px]">
              <span className="text-xs text-white/50">0.5x</span>
              <Slider
                value={[playbackSpeed]}
                onValueChange={([value]) => onSpeedChange(value)}
                min={0.5}
                max={3.0}
                step={0.5}
                className="flex-1"
              />
              <span className="text-xs text-white/50">3.0x</span>
            </div>
            <span className="text-sm text-white font-semibold min-w-[40px]">
              {playbackSpeed}x
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default GameViewer