import React from 'react'
import { BookOpen, Lightbulb, CheckCircle, XCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { PuzzleInfoProps } from '@/types/openingPuzzles'

/**
 * Puzzle information panel showing details, status, and hints
 * Follows the style guide for card design and theme integration
 */
export const PuzzleInfo: React.FC<PuzzleInfoProps> = ({
  puzzle,
  session,
  onRequestHint,
  getCurrentHint,
  formatTime
}) => {
  const { status, hintsUsed, showHint, timeElapsed, moveCount } = session

  return (
    <>
      {/* Puzzle Details */}
      <div>
        <CardHeader className="px-0 pt-0">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              {puzzle.opening}
            </CardTitle>
            <Badge variant="secondary" className="bg-black/30 border-white/20">
              {puzzle.difficulty}
            </Badge>
          </div>
          <CardDescription>{puzzle.description}</CardDescription>
        </CardHeader>
        
        <CardContent className="px-0 space-y-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex justify-between">
              <span className="opacity-75">ECO:</span>
              <Badge variant="outline" className="border-white/20">{puzzle.eco}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="opacity-75">Theme:</span>
              <Badge variant="outline" className="border-white/20">{puzzle.theme}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="opacity-75">Rating:</span>
              <span className="font-mono">{puzzle.rating}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-75">Moves:</span>
              <span>{moveCount} / {puzzle.moves}</span>
            </div>
          </div>
        </CardContent>
      </div>

      {/* Status Display */}
      {status !== 'unsolved' && (
        <div 
          className={`
            p-4 rounded-lg animate-slide-down
            ${status === 'solved' 
              ? 'bg-green-500/20 border border-green-500/30' 
              : 'bg-red-500/20 border border-red-500/30'
            }
          `}
        >
          <div className="flex items-center gap-3">
            {status === 'solved' ? (
              <>
                <CheckCircle className="w-6 h-6 text-green-400" />
                <div>
                  <p className="font-semibold text-green-400">Perfect!</p>
                  <p className="text-sm opacity-75">
                    Time: {formatTime(timeElapsed)} | Hints: {hintsUsed}
                  </p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="w-6 h-6 text-red-400" />
                <div>
                  <p className="font-semibold text-red-400">Study the theory!</p>
                  <p className="text-sm opacity-75">
                    Solution: {puzzle.solution.join(' ')}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Hints Section */}
      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Lightbulb className="w-4 h-4" />
          Hints ({hintsUsed}/3)
        </h3>
        
        {showHint && hintsUsed > 0 && (
          <div className="p-3 rounded-lg mb-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-white/10 animate-slide-down">
            <p className="text-sm">{getCurrentHint()}</p>
          </div>
        )}
        
        <Button
          variant="outline"
          size="sm"
          onClick={onRequestHint}
          disabled={hintsUsed >= 3 || status !== 'unsolved'}
          className="w-full backdrop-blur-xl bg-black/20 border-white/10 hover:bg-black/30 hover:border-white/30 active:animate-button-press transition-all duration-300 gpu-accelerated"
        >
          <Lightbulb className="w-4 h-4 mr-2" />
          Get Hint ({hintsUsed + 1}/3)
        </Button>
      </div>
    </>
  )
}