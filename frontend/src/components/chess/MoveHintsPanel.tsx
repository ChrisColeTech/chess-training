import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { RefreshCw, Eye, EyeOff, TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '../../lib/utils'
import type { MoveHintsPanelProps } from '../../types/components'

export const MoveHintsPanel: React.FC<MoveHintsPanelProps> = ({
  hints,
  isLoading,
  error,
  onRefresh,
  onToggleVisibility,
  disabled = false,
  difficulty,
  className
}) => {
  const [isVisible, setIsVisible] = useState(true)

  const handleToggleVisibility = () => {
    const newVisibility = !isVisible
    setIsVisible(newVisibility)
    onToggleVisibility(newVisibility)
  }

  const getEvaluationColor = (evaluation: number) => {
    if (evaluation > 100) return 'text-green-400'
    if (evaluation > 0) return 'text-green-300'
    if (evaluation > -100) return 'text-red-300'
    return 'text-red-400'
  }

  const getEvaluationIcon = (evaluation: number) => {
    return evaluation > 0 ? TrendingUp : TrendingDown
  }

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-white">
            Move Hints
            <Badge variant="outline" className="text-xs">
              {difficulty}
            </Badge>
          </CardTitle>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onRefresh}
              disabled={isLoading || disabled}
              className="p-2"
            >
              <RefreshCw className={cn('w-4 h-4', isLoading && 'animate-spin')} />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleVisibility}
              className="p-2"
            >
              {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      {isVisible && (
        <CardContent className="pt-0">
          {error && (
            <div className="text-red-400 text-sm mb-4 p-3 bg-red-500/10 rounded">
              {error}
            </div>
          )}

          {isLoading && (
            <div className="text-white/70 text-sm text-center py-8">
              Analyzing position...
            </div>
          )}

          {hints && !isLoading && (
            <div className="space-y-4">
              {/* Current Position Evaluation */}
              <div className="flex items-center justify-between p-3 bg-white/5 rounded">
                <span className="text-white/70 text-sm">Position Evaluation</span>
                <div className="flex items-center gap-2">
                  {React.createElement(
                    getEvaluationIcon(hints.currentEvaluation),
                    { className: `w-4 h-4 ${getEvaluationColor(hints.currentEvaluation)}` }
                  )}
                  <span className={cn(
                    'font-mono text-sm',
                    getEvaluationColor(hints.currentEvaluation)
                  )}>
                    {hints.currentEvaluation > 0 ? '+' : ''}{hints.currentEvaluation}
                  </span>
                </div>
              </div>

              {/* Suggested Moves */}
              <div>
                <h4 className="text-white text-sm font-medium mb-2">Best Moves</h4>
                <div className="space-y-2">
                  {hints.bestMoves.map((hint: any, index: number) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-2 bg-white/5 rounded hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center text-xs">
                          {hint.rank}
                        </Badge>
                        <div>
                          <div className="text-white font-mono text-sm">{hint.move}</div>
                          <div className="text-white/60 text-xs">{hint.explanation}</div>
                        </div>
                      </div>
                      <div className={cn(
                        'font-mono text-sm',
                        getEvaluationColor(hint.evaluation)
                      )}>
                        {hint.evaluation > 0 ? '+' : ''}{hint.evaluation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Suggestion */}
              {hints.suggestion && (
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded">
                  <div className="text-blue-400 text-xs font-medium mb-1">AI Suggestion</div>
                  <div className="text-white/80 text-sm">{hints.suggestion}</div>
                </div>
              )}

              {/* Position Info */}
              <div className="flex items-center justify-between text-xs text-white/50">
                <span>Phase: {hints.position.phase}</span>
                <span>
                  Material: {hints.position.material.white} - {hints.position.material.black}
                </span>
              </div>
            </div>
          )}

          {!hints && !isLoading && !error && (
            <div className="text-white/50 text-sm text-center py-8">
              No hints available. Click refresh to analyze position.
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}