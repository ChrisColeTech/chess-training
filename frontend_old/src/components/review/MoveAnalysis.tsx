import React from 'react'
import { ChevronLeft, ChevronRight, Clock, Target, TrendingUp, TrendingDown, Star, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { MoveAnalysisProps } from '@/types/gameReview'

/**
 * Move Analysis Component
 * Displays detailed analysis for individual moves with engine evaluation
 */
export const MoveAnalysis: React.FC<MoveAnalysisProps> = ({
  currentMove,
  allMoves,
  currentIndex,
  onMoveSelect,
  showEngineLines,
  theme
}) => {
  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'Brilliant':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'Great':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Good':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'Inaccuracy':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Mistake':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'Blunder':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'Book':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      case 'Forced':
        return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getClassificationIcon = (classification: string) => {
    switch (classification) {
      case 'Brilliant':
      case 'Great':
        return <Star size={16} />
      case 'Good':
        return <TrendingUp size={16} />
      case 'Inaccuracy':
      case 'Mistake':
        return <AlertTriangle size={16} />
      case 'Blunder':
        return <TrendingDown size={16} />
      default:
        return <Target size={16} />
    }
  }

  const formatEvaluation = (evaluation: number) => {
    if (Math.abs(evaluation) > 5) {
      return evaluation > 0 ? '+M' : '-M'
    }
    return evaluation > 0 ? `+${evaluation.toFixed(2)}` : evaluation.toFixed(2)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatTimeRemaining = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-6">
      {/* Move Navigation */}
      <Card className={`bg-gradient-to-r ${theme.glassMorphism} border-gray-700`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onMoveSelect(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
              className="bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700/50"
            >
              <ChevronLeft size={16} />
            </Button>

            <div className="text-center">
              <div className={`text-lg font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                {currentMove ? `Move ${Math.ceil((currentIndex + 1) / 2)}` : 'Start Position'}
              </div>
              <div className={`text-sm ${theme.text} opacity-70`}>
                {currentIndex + 1} of {allMoves.length + 1}
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onMoveSelect(Math.min(allMoves.length, currentIndex + 1))}
              disabled={currentIndex >= allMoves.length}
              className="bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700/50"
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Current Move Analysis */}
      {currentMove && (
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className={`text-xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                {currentMove.color === 'white' ? '<FaChessKing className="w-4 h-4 inline" />' : '♚'} {currentMove.san}
              </CardTitle>
              <Badge className={getClassificationColor(currentMove.classification)}>
                {getClassificationIcon(currentMove.classification)}
                <span className="ml-1">{currentMove.classification}</span>
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Evaluation Change */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                <div className={`text-lg font-bold ${theme.text}`}>
                  {formatEvaluation(currentMove.evaluationBefore)}
                </div>
                <div className={`text-xs ${theme.text} opacity-70`}>Before</div>
              </div>
              <div className="flex items-center justify-center">
                <div className={`text-2xl ${currentMove.evaluationLoss > 50 ? 'text-red-400' : currentMove.evaluationLoss > 20 ? 'text-yellow-400' : 'text-green-400'}`}>
                  →
                </div>
              </div>
              <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                <div className={`text-lg font-bold ${theme.text}`}>
                  {formatEvaluation(currentMove.evaluationAfter)}
                </div>
                <div className={`text-xs ${theme.text} opacity-70`}>After</div>
              </div>
            </div>

            {/* Evaluation Loss */}
            {currentMove.evaluationLoss > 0 && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-center">
                  <TrendingDown size={20} className="text-red-400 mr-2" />
                  <div>
                    <div className="text-red-400 font-semibold">
                      Evaluation Loss: {currentMove.evaluationLoss.toFixed(1)} centipawns
                    </div>
                    <div className={`text-sm ${theme.text} opacity-70 mt-1`}>
                      This move decreased the position evaluation
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Time Information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-800/30 rounded-lg">
                <div className="flex items-center">
                  <Clock size={16} className={`${theme.text} opacity-70 mr-2`} />
                  <div>
                    <div className={`font-semibold ${theme.text}`}>
                      {formatTime(currentMove.timeSpent)}
                    </div>
                    <div className={`text-xs ${theme.text} opacity-70`}>Time spent</div>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-gray-800/30 rounded-lg">
                <div className="flex items-center">
                  <Clock size={16} className={`${theme.text} opacity-70 mr-2`} />
                  <div>
                    <div className={`font-semibold ${theme.text}`}>
                      {formatTimeRemaining(currentMove.timeRemaining)}
                    </div>
                    <div className={`text-xs ${theme.text} opacity-70`}>Remaining</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Best Move and Alternatives */}
            {showEngineLines && (
              <div className="space-y-4">
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Star size={18} className="text-blue-400 mr-2" />
                    <span className="font-semibold text-blue-400">Best Move</span>
                  </div>
                  <div className={`font-mono text-lg ${theme.text}`}>
                    {currentMove.bestMove}
                  </div>
                  <div className={`text-sm ${theme.text} opacity-70 mt-1`}>
                    Engine's top recommendation
                  </div>
                </div>

                {/* Alternative Moves */}
                {currentMove.alternativeMoves.length > 0 && (
                  <div>
                    <h4 className={`font-semibold ${theme.text} mb-3`}>Alternative Moves</h4>
                    <div className="space-y-2">
                      {currentMove.alternativeMoves.map((alt, index) => (
                        <div key={index} className="p-3 bg-gray-800/30 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className={`font-mono ${theme.text}`}>{alt.move}</div>
                            <div className={`text-sm ${theme.text} opacity-70`}>
                              {formatEvaluation(alt.evaluation)}
                            </div>
                          </div>
                          <div className={`text-xs ${theme.text} opacity-60 mt-1`}>
                            {alt.line.join(' ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tactical Themes */}
            {currentMove.tacticalThemes.length > 0 && (
              <div>
                <h4 className={`font-semibold ${theme.text} mb-3`}>Tactical Themes</h4>
                <div className="flex flex-wrap gap-2">
                  {currentMove.tacticalThemes.map((theme, index) => (
                    <Badge key={index} className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                      {theme}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Computer Comment */}
            {currentMove.comment && (
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-start">
                  <AlertTriangle size={18} className="text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                  <div className={`${theme.text} opacity-90`}>
                    {currentMove.comment}
                  </div>
                </div>
              </div>
            )}

            {/* Game Phase */}
            <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
              <span className={`${theme.text} opacity-70`}>Game Phase:</span>
              <Badge className={`${
                currentMove.phase === 'Opening' ? 'bg-green-500/20 text-green-400' :
                currentMove.phase === 'Middlegame' ? 'bg-blue-500/20 text-blue-400' :
                'bg-purple-500/20 text-purple-400'
              }`}>
                {currentMove.phase}
              </Badge>
            </div>

            {/* Critical Position Indicator */}
            {currentMove.isCriticalPosition && (
              <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <div className="flex items-center">
                  <Target size={20} className="text-orange-400 mr-2" />
                  <div>
                    <div className="text-orange-400 font-semibold">Critical Position</div>
                    <div className={`text-sm ${theme.text} opacity-70 mt-1`}>
                      This position required careful consideration
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Move List */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className={`text-lg font-semibold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
            Move History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-1">
              {allMoves.map((move, index) => (
                <div
                  key={index}
                  onClick={() => onMoveSelect(index + 1)}
                  className={`cursor-pointer p-3 rounded-lg transition-colors ${
                    currentIndex === index + 1
                      ? `bg-gradient-to-r ${theme.primary} text-white`
                      : 'hover:bg-gray-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`font-mono text-sm ${
                        currentIndex === index + 1 ? 'text-white' : theme.text
                      }`}>
                        {Math.ceil((index + 1) / 2)}{move.color === 'white' ? '.' : '...'} {move.san}
                      </div>
                      <Badge className={`${getClassificationColor(move.classification)} text-xs`}>
                        {move.classification}
                      </Badge>
                    </div>
                    <div className={`text-xs ${
                      currentIndex === index + 1 ? 'text-white/70' : `${theme.text} opacity-70`
                    }`}>
                      {formatEvaluation(move.evaluationAfter)}
                    </div>
                  </div>
                  {move.evaluationLoss > 20 && (
                    <div className={`text-xs mt-1 ${
                      currentIndex === index + 1 ? 'text-white/70' : 'text-red-400'
                    }`}>
                      -{move.evaluationLoss.toFixed(1)}cp
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}