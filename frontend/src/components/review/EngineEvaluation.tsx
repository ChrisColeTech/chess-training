import React from 'react'
import { TrendingUp, TrendingDown, Activity, Star } from 'lucide-react'
import { FaBrain } from 'react-icons/fa'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import type { EngineEvaluationProps } from '@/types/gameReview'

/**
 * Engine Evaluation Component
 * Displays chess engine analysis with evaluation bar and best moves
 */
export const EngineEvaluation: React.FC<EngineEvaluationProps> = ({
  evaluation,
  bestMoves,
  moveClassification,
  isAnalyzing,
  depth,
  theme
}) => {
  // Convert evaluation to percentage for progress bar (clamped between -10 and +10)
  const getEvaluationPercentage = (evaluation: number) => {
    const clampedEval = Math.max(-10, Math.min(10, evaluation))
    return ((clampedEval + 10) / 20) * 100
  }

  // Format evaluation display
  const formatEvaluation = (evaluation: number) => {
    if (Math.abs(evaluation) > 10) {
      return evaluation > 0 ? '+M' : '-M'
    }
    return evaluation > 0 ? `+${evaluation.toFixed(2)}` : evaluation.toFixed(2)
  }

  // Get evaluation color based on value
  const getEvaluationColor = (evaluation: number) => {
    if (Math.abs(evaluation) < 0.5) return 'text-gray-400'
    if (evaluation > 0) return 'text-white'
    return 'text-white'
  }

  // Get advantage text
  const getAdvantageText = (evaluation: number) => {
    if (Math.abs(evaluation) < 0.2) return 'Equal position'
    if (Math.abs(evaluation) < 0.5) return evaluation > 0 ? 'White slightly better' : 'Black slightly better'
    if (Math.abs(evaluation) < 1.0) return evaluation > 0 ? 'White better' : 'Black better'
    if (Math.abs(evaluation) < 3.0) return evaluation > 0 ? 'White winning' : 'Black winning'
    return evaluation > 0 ? 'White dominating' : 'Black dominating'
  }

  // Get bar colors based on evaluation
  const getBarColors = (evaluation: number) => {
    const absEval = Math.abs(evaluation)
    if (absEval < 0.5) return 'from-gray-600 to-gray-400'
    if (evaluation > 0) {
      if (absEval < 1.0) return 'from-blue-600 to-blue-400'
      if (absEval < 3.0) return 'from-green-600 to-green-400'
      return 'from-yellow-600 to-yellow-400'
    } else {
      if (absEval < 1.0) return 'from-blue-600 to-blue-400'
      if (absEval < 3.0) return 'from-green-600 to-green-400'
      return 'from-yellow-600 to-yellow-400'
    }
  }

  return (
    <div className="space-y-6">
      {/* Engine Status */}
      <Card className={`bg-gradient-to-r ${theme.glassMorphism} border-gray-700`}>
        <CardHeader className="pb-4">
          <CardTitle className={`text-lg font-semibold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent flex items-center`}>
            <FaBrain size={20} className="mr-2" />
            Engine Analysis
            {isAnalyzing && (
              <div className="ml-2 flex items-center">
                <Activity size={16} className="text-blue-400 animate-pulse" />
              </div>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Evaluation Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className={`text-sm ${theme.text} opacity-70`}>Position Evaluation</span>
              <span className={`text-sm ${theme.text} opacity-70`}>Depth: {depth}</span>
            </div>
            
            <div className="relative">
              {/* Background bar */}
              <div className="h-6 bg-gray-800 rounded-full overflow-hidden">
                {/* White advantage part */}
                <div 
                  className="h-full bg-gradient-to-r from-gray-700 to-gray-600 transition-all duration-500"
                  style={{ width: '50%' }}
                />
                {/* Evaluation indicator */}
                <div 
                  className={`absolute top-0 h-full bg-gradient-to-r ${getBarColors(evaluation)} transition-all duration-500`}
                  style={{ 
                    width: `${Math.abs(getEvaluationPercentage(evaluation) - 50)}%`,
                    left: evaluation > 0 ? '50%' : `${getEvaluationPercentage(evaluation)}%`
                  }}
                />
              </div>
              
              {/* Center line */}
              <div className="absolute top-0 left-1/2 w-0.5 h-6 bg-white/30 -translate-x-0.5" />
              
              {/* Evaluation labels */}
              <div className="flex justify-between mt-2 text-xs opacity-70">
                <span className={theme.text}>Black</span>
                <span className={theme.text}>Equal</span>
                <span className={theme.text}>White</span>
              </div>
            </div>

            {/* Evaluation Display */}
            <div className="text-center">
              <div className={`text-2xl font-bold ${getEvaluationColor(evaluation)}`}>
                {formatEvaluation(evaluation)}
              </div>
              <div className={`text-sm ${theme.text} opacity-70`}>
                {getAdvantageText(evaluation)}
              </div>
            </div>
          </div>

          {/* Move Classification */}
          {moveClassification && (
            <div className="flex items-center justify-center">
              <Badge className={`${
                moveClassification === 'Brilliant' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
                moveClassification === 'Great' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                moveClassification === 'Good' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                moveClassification === 'Inaccuracy' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                moveClassification === 'Mistake' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' :
                moveClassification === 'Blunder' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                'bg-gray-500/20 text-gray-400 border-gray-500/30'
              } text-lg px-4 py-2`}>
                {moveClassification === 'Brilliant' && <Star size={16} className="mr-1" />}
                {moveClassification}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Best Moves */}
      {bestMoves.length > 0 && (
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className={`text-lg font-semibold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
              Engine Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {bestMoves.map((bestMove, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg transition-colors ${
                  index === 0 
                    ? `bg-gradient-to-r ${theme.primary}/20 border border-blue-500/30` 
                    : 'bg-gray-800/50 hover:bg-gray-800/70'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    {index === 0 && <Star size={16} className="text-yellow-400 mr-2" />}
                    <span className={`font-mono text-lg ${index === 0 ? 'text-blue-400' : theme.text}`}>
                      {bestMove.move}
                    </span>
                    {index === 0 && (
                      <Badge className="ml-2 bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                        Best
                      </Badge>
                    )}
                  </div>
                  <div className={`font-semibold ${
                    bestMove.evaluation > 1 ? 'text-green-400' : 
                    bestMove.evaluation < -1 ? 'text-red-400' : 
                    'text-gray-400'
                  }`}>
                    {formatEvaluation(bestMove.evaluation)}
                  </div>
                </div>

                {/* Principal Variation */}
                <div className={`text-sm ${theme.text} opacity-70`}>
                  <span className="font-semibold">Line: </span>
                  {bestMove.line.slice(0, 6).join(' ')}
                  {bestMove.line.length > 6 && '...'}
                </div>

                {/* Evaluation Change Indicator */}
                <div className="flex items-center mt-2">
                  {bestMove.evaluation > evaluation + 0.1 ? (
                    <div className="flex items-center text-green-400 text-xs">
                      <TrendingUp size={14} className="mr-1" />
                      Improves position
                    </div>
                  ) : bestMove.evaluation < evaluation - 0.1 ? (
                    <div className="flex items-center text-red-400 text-xs">
                      <TrendingDown size={14} className="mr-1" />
                      Weakens position
                    </div>
                  ) : (
                    <div className={`text-xs ${theme.text} opacity-60`}>
                      Maintains evaluation
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Analysis Progress */}
            {isAnalyzing && (
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-center mb-2">
                  <Activity size={18} className="text-blue-400 mr-2 animate-pulse" />
                  <span className="text-blue-400 font-semibold">Analyzing Position...</span>
                </div>
                <Progress value={75} className="mb-2" />
                <div className={`text-sm ${theme.text} opacity-70`}>
                  Engine is calculating the best moves for this position
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Analysis Info */}
      <Card className="bg-gray-900 border-gray-700">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className={`text-lg font-bold bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}>
                Stockfish 16
              </div>
              <div className={`text-xs ${theme.text} opacity-70`}>Engine</div>
            </div>
            <div>
              <div className={`text-lg font-bold bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}>
                {depth}
              </div>
              <div className={`text-xs ${theme.text} opacity-70`}>Search Depth</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}