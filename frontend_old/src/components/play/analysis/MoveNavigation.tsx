// Move Navigation Component - Following SRP for move history navigation only
import React from 'react'
import { SkipBack, SkipForward, RotateCcw, RefreshCw, FastForward, Rewind, List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { MoveNavigationProps } from '@/types/analysisBoard'
import { soundFX } from '@/utils/soundEffects'

export const MoveNavigation: React.FC<MoveNavigationProps> = ({
  gameHistory,
  currentMoveIndex,
  onGoToMove,
  onUndo,
  onRedo,
  className = ''
}) => {

  // Single responsibility: Handle navigation controls
  const handleGoToStart = () => {
    onGoToMove(0)
    soundFX.playClick()
  }

  const handleGoToEnd = () => {
    onGoToMove(gameHistory.length)
    soundFX.playClick()
  }

  const handleStepBackward = () => {
    if (currentMoveIndex > 0) {
      onGoToMove(currentMoveIndex - 1)
      soundFX.playClick()
    }
  }

  const handleStepForward = () => {
    if (currentMoveIndex < gameHistory.length) {
      onGoToMove(currentMoveIndex + 1)
      soundFX.playClick()
    }
  }

  const handleMoveClick = (moveIndex: number) => {
    onGoToMove(moveIndex + 1) // +1 because move index is 0-based but position is 1-based
    soundFX.playClick()
  }


  const canGoBack = currentMoveIndex > 0
  const canGoForward = currentMoveIndex < gameHistory.length

  return (
    <div className={`backdrop-blur-2xl bg-black/30 border-white/20 rounded-2xl border-2 p-6 ${className}`}>
      <h3 className="font-bold mb-4 uppercase tracking-wider flex items-center gap-2">
        <List className="w-5 h-5" />
        Move Navigation
        {gameHistory.length > 0 && (
          <span className="ml-auto text-xs opacity-60">
            {currentMoveIndex}/{gameHistory.length}
          </span>
        )}
      </h3>

      {/* Navigation Controls */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        <Button 
          size="sm" 
          variant="outline" 
          onClick={handleGoToStart} 
          disabled={!canGoBack}
          title="Go to start"
          className="aspect-square p-0"
        >
          <Rewind className="w-4 h-4" />
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={handleStepBackward}
          disabled={!canGoBack}
          title="Previous move"
          className="aspect-square p-0"
        >
          <SkipBack className="w-4 h-4" />
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={handleStepForward}
          disabled={!canGoForward}
          title="Next move"
          className="aspect-square p-0"
        >
          <SkipForward className="w-4 h-4" />
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={handleGoToEnd}
          disabled={!canGoForward}
          title="Go to end"
          className="aspect-square p-0"
        >
          <FastForward className="w-4 h-4" />
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        <Button 
          size="sm" 
          variant="outline" 
          onClick={onUndo} 
          disabled={gameHistory.length === 0}
          className="text-xs"
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          Undo
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={onRedo}
          className="text-xs opacity-50"
          disabled
        >
          <RefreshCw className="w-4 h-4 mr-1" />
          Redo
        </Button>
      </div>

      {/* Move History List */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Game History</label>
          {gameHistory.length > 0 && (
            <span className="text-xs opacity-60">
              {Math.ceil(gameHistory.length / 2)} moves
            </span>
          )}
        </div>

        {gameHistory.length === 0 ? (
          <div className="text-center py-8 opacity-50">
            <List className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p className="text-xs">No moves yet</p>
            <p className="text-xs opacity-70 mt-1">Make moves to see history</p>
          </div>
        ) : (
          <ScrollArea className="h-40 w-full rounded-lg bg-black/20 border border-white/5">
            <div className="p-3 space-y-1">
              {/* Render moves in pairs (white, black) */}
              {Array.from({ length: Math.ceil(gameHistory.length / 2) }, (_, pairIndex) => {
                const whiteMove = gameHistory[pairIndex * 2]
                const blackMove = gameHistory[pairIndex * 2 + 1]
                const moveNumber = pairIndex + 1

                return (
                  <div key={pairIndex} className="flex items-center gap-2 text-sm">
                    {/* Move number */}
                    <div className="w-8 text-right text-xs opacity-60 font-mono">
                      {moveNumber}.
                    </div>

                    {/* White move */}
                    <div
                      className={`px-2 py-1 rounded cursor-pointer hover:bg-white/10 transition-colors font-mono flex-1 text-center ${
                        currentMoveIndex === pairIndex * 2 + 1 ? 'bg-white/20 text-white' : 'opacity-80'
                      }`}
                      onClick={() => handleMoveClick(pairIndex * 2)}
                    >
                      {whiteMove}
                    </div>

                    {/* Black move */}
                    <div
                      className={`px-2 py-1 rounded cursor-pointer hover:bg-white/10 transition-colors font-mono flex-1 text-center ${
                        blackMove
                          ? currentMoveIndex === pairIndex * 2 + 2 
                            ? 'bg-white/20 text-white' 
                            : 'opacity-80'
                          : 'opacity-30'
                      }`}
                      onClick={() => blackMove && handleMoveClick(pairIndex * 2 + 1)}
                    >
                      {blackMove || '...'}
                    </div>
                  </div>
                )
              })}
            </div>
          </ScrollArea>
        )}
      </div>

      {/* Position Info */}
      {gameHistory.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="grid grid-cols-3 gap-4 text-xs">
            <div className="text-center">
              <div className="font-bold opacity-90">{Math.ceil(gameHistory.length / 2)}</div>
              <div className="opacity-60">Moves</div>
            </div>
            <div className="text-center">
              <div className="font-bold opacity-90">{currentMoveIndex}</div>
              <div className="opacity-60">Current</div>
            </div>
            <div className="text-center">
              <div className="font-bold opacity-90">
                {gameHistory.length % 2 === 0 ? 'White' : 'Black'}
              </div>
              <div className="opacity-60">To Move</div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Tips */}
      <div className="mt-4 p-3 bg-black/20 rounded-lg border border-white/5">
        <h4 className="text-xs font-medium mb-2 opacity-90">Navigation Tips</h4>
        <div className="text-xs opacity-70 space-y-1">
          <div>• Click moves to jump to position</div>
          <div>• Use arrow keys for quick navigation</div>
          <div>• Undo/Redo for move experimentation</div>
        </div>
      </div>
    </div>
  )
}

export default MoveNavigation