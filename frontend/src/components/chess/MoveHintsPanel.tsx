import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Lightbulb, TrendingUp, RefreshCw, Eye, EyeOff } from 'lucide-react'
import { cn } from '../../lib/utils'
import { GameHints } from '../../services/api/GameApiClient'

interface MoveHintsPanelProps {
  hints: GameHints | null
  isLoading: boolean
  error: string | null
  onRefresh: () => void
  disabled?: boolean
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  className?: string
}

/**
 * MoveHintsPanel - SRP Component for Displaying Move Hints
 * Single Responsibility: UI rendering of hints data only
 * No business logic, no API calls, pure presentation
 */
export const MoveHintsPanel: React.FC<MoveHintsPanelProps> = ({
  hints,
  isLoading,
  error,
  onRefresh,
  disabled = false,
  difficulty,
  className
}) => {
  const [isVisible, setIsVisible] = useState(true)

  const getEvaluationColor = (evaluation: number) => {
    if (evaluation > 1) return 'text-green-400'
    if (evaluation > 0) return 'text-blue-400' 
    if (evaluation > -1) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'opening': return '🌅'
      case 'middlegame': return '⚔️'
      case 'endgame': return '👑'
      default: return '♟️'
    }
  }

  if (disabled) {
    return (
      <Card className={cn("bg-gray-500/20 backdrop-blur-xl border-gray-500/30", className)}>
        <CardContent className="p-4 text-center">
          <div className="text-gray-400">
            <Eye className="w-6 h-6 mx-auto mb-2" />
            <p className="text-sm">Hints disabled during opponent's turn</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn("bg-black/20 backdrop-blur-xl border-white/10", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-white flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            <span>MOVE HINTS</span>
            {hints && (
              <span className="text-sm text-gray-400">
                {getPhaseIcon(hints.position.phase)} {hints.position.phase}
              </span>
            )}
          </CardTitle>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(!isVisible)}
              className="text-white/60 hover:text-white"
            >
              {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onRefresh}
              disabled={isLoading}
              className="text-white/60 hover:text-white"
            >
              <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
            </Button>
          </div>
        </div>
      </CardHeader>

      {isVisible && (
        <CardContent className="pt-0">
          {isLoading && (
            <div className="text-center py-6">
              <RefreshCw className="w-6 h-6 animate-spin text-white/60 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Analyzing position...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-4">
              <p className="text-red-400 text-sm mb-3">{error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={onRefresh}
                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
              >
                Try Again
              </Button>
            </div>
          )}

          {hints && !isLoading && (
            <div className="space-y-4">
              {/* Position Evaluation */}
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-sm text-gray-300">Position</span>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-gray-400" />
                  <span className={cn("font-mono text-sm", getEvaluationColor(hints.currentEvaluation))}>
                    {hints.currentEvaluation > 0 ? '+' : ''}{hints.currentEvaluation.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Best Moves */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-white/80">Best Moves:</h4>
                {hints.bestMoves.map((moveHint, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Badge className={cn(
                        "text-xs font-mono min-w-[2rem] justify-center",
                        index === 0 ? "bg-green-500/20 text-green-400 border-green-500/30" :
                        index === 1 ? "bg-blue-500/20 text-blue-400 border-blue-500/30" :
                        "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                      )}>
                        {moveHint.rank}
                      </Badge>
                      <div>
                        <div className="text-white font-mono text-lg">{moveHint.san}</div>
                        <div className="text-xs text-gray-400">{moveHint.explanation}</div>
                      </div>
                    </div>
                    <div className={cn("font-mono text-sm", getEvaluationColor(moveHint.evaluation))}>
                      {moveHint.evaluation > 0 ? '+' : ''}{moveHint.evaluation.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Suggestion */}
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">💡</div>
                  <div>
                    <h4 className="text-sm font-semibold text-blue-400 mb-1">Suggestion</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {hints.suggestion}
                    </p>
                  </div>
                </div>
              </div>

              {/* Material Balance */}
              {hints.position.material && (
                <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-white/10">
                  <span>Material: ♔{hints.position.material.white} - ♛{hints.position.material.black}</span>
                  <Badge variant="outline" className="text-xs">
                    {difficulty}
                  </Badge>
                </div>
              )}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}

export default MoveHintsPanel