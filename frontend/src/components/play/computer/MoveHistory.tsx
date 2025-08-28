import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { History, Target, TrendingUp, Eye } from 'lucide-react'
import { FaChessKing, FaCrown } from 'react-icons/fa'
import type { MoveHistoryProps } from '@/types/playComputer'
import { soundFX } from '@/utils/soundEffects'

/**
 * Gaming-themed move history component showing battle chronology
 * Displays moves with evaluation and allows position review
 */
export const MoveHistory: React.FC<MoveHistoryProps> = ({
  moves,
  currentMoveIndex,
  onMoveSelect,
  showEvaluations = false,
  theme
}) => {
  /**
   * Format move time
   */
  const formatMoveTime = (timeRemaining: number): string => {
    const totalSeconds = Math.floor(timeRemaining / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  /**
   * Get evaluation color
   */
  const getEvaluationColor = (score: number): string => {
    if (score > 1) return 'text-green-400'
    if (score > 0.5) return 'text-green-300'
    if (score > -0.5) return 'text-yellow-400'
    if (score > -1) return 'text-orange-400'
    return 'text-red-400'
  }

  /**
   * Get evaluation symbol
   */
  const getEvaluationSymbol = (score: number): string => {
    if (score > 1.5) return '+++'
    if (score > 1) return '++'
    if (score > 0.5) return '+'
    if (score > -0.5) return '='
    if (score > -1) return '−'
    if (score > -1.5) return '−−'
    return '−−−'
  }

  /**
   * Get move special notation
   */
  const getMoveSpecialNotation = (move: any): string | null => {
    if (move.san.includes('+')) return 'Check!'
    if (move.san.includes('#')) return 'Checkmate!'
    if (move.captured) return `Captured ${move.captured}`
    if (move.san.includes('O-O-O')) return 'Queenside Castle'
    if (move.san.includes('O-O')) return 'Kingside Castle'
    if (move.san.includes('=')) return 'Promotion'
    return null
  }

  /**
   * Handle move selection
   */
  const handleMoveClick = (moveIndex: number) => {
    onMoveSelect(moveIndex)
    soundFX.playClick()
  }

  /**
   * Group moves by move pairs
   */
  const groupedMoves = moves.reduce((acc: any[], move, _index) => {
    if (move.color === 'white') {
      acc.push({ white: move, black: null, moveNumber: move.moveNumber })
    } else {
      const lastPair = acc[acc.length - 1]
      if (lastPair && lastPair.moveNumber === move.moveNumber) {
        lastPair.black = move
      } else {
        acc.push({ white: null, black: move, moveNumber: move.moveNumber })
      }
    }
    return acc
  }, [])

  if (moves.length === 0) {
    return (
      <Card className="bg-black/20 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className={`${theme.text} text-lg flex items-center space-x-2`}>
            <History className="w-5 h-5" />
            <span>Battle Chronicle</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <History className="w-12 h-12 mx-auto text-white/40 mb-4" />
            <p className={`${theme.text} opacity-60`}>
              No moves recorded yet. The battle awaits your first strike!
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const lastMove = moves[moves.length - 1]
  const gameProgress = Math.round((moves.length / 80) * 100) // Assuming ~40 moves per side on average

  return (
    <Card className="bg-black/20 border-white/10 backdrop-blur-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className={`${theme.text} text-lg flex items-center space-x-2`}>
            <History className="w-5 h-5" />
            <span>Battle Chronicle</span>
          </CardTitle>
          
          <div className="flex items-center space-x-3">
            <Badge className={`bg-gradient-to-r ${theme.secondary} text-white`}>
              Move {moves.length}
            </Badge>
            {gameProgress > 0 && (
              <Badge variant="outline" className="border-white/20 text-white/80">
                {gameProgress}% complete
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Battle Statistics */}
        <div className="px-4 py-3 bg-black/10 border-b border-white/5">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className={`text-lg font-bold ${theme.text}`}>
                {Math.ceil(moves.length / 2)}
              </div>
              <div className={`text-xs ${theme.text} opacity-60`}>Move Pairs</div>
            </div>
            <div>
              <div className={`text-lg font-bold ${theme.text}`}>
                {moves.filter(m => m.captured).length}
              </div>
              <div className={`text-xs ${theme.text} opacity-60`}>Captures</div>
            </div>
            <div>
              <div className={`text-lg font-bold ${theme.text}`}>
                {lastMove ? formatMoveTime(lastMove.timeRemaining) : '--:--'}
              </div>
              <div className={`text-xs ${theme.text} opacity-60`}>Last Time</div>
            </div>
          </div>
        </div>

        {/* Move History */}
        <ScrollArea className="h-80 px-4 py-2">
          <div className="space-y-1">
            {groupedMoves.map((movePair, pairIndex) => (
              <div
                key={pairIndex}
                className="grid grid-cols-12 gap-2 items-center py-2 px-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                {/* Move Number */}
                <div className={`col-span-1 text-center text-sm font-mono ${theme.text} opacity-60`}>
                  {movePair.moveNumber}.
                </div>

                {/* White Move */}
                <div className="col-span-5">
                  {movePair.white ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleMoveClick(moves.findIndex(m => m === movePair.white))}
                      className={`
                        w-full justify-start p-2 h-auto transition-all duration-200
                        ${currentMoveIndex === moves.findIndex(m => m === movePair.white)
                          ? `bg-gradient-to-r ${theme.primary} text-white font-semibold glow-effect`
                          : `hover:bg-white/10 ${theme.text}`
                        }
                      `}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg"><FaChessKing className="w-4 h-4 inline" /></span>
                          <span className="font-mono text-sm">{movePair.white.san}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          {/* Special notation */}
                          {getMoveSpecialNotation(movePair.white) && (
                            <Badge variant="outline" className="text-xs px-1 py-0 h-auto">
                              {movePair.white.captured ? '×' : 
                               movePair.white.san.includes('+') ? '✓' : 
                               movePair.white.san.includes('O-O') ? '🏰' : ''}
                            </Badge>
                          )}
                          
                          {/* Evaluation */}
                          {showEvaluations && movePair.white.evaluation && (
                            <span className={`text-xs font-mono ${getEvaluationColor(movePair.white.evaluation.score)}`}>
                              {getEvaluationSymbol(movePair.white.evaluation.score)}
                            </span>
                          )}
                          
                          {/* Time */}
                          <span className={`text-xs font-mono ${theme.text} opacity-50`}>
                            {formatMoveTime(movePair.white.timeRemaining)}
                          </span>
                        </div>
                      </div>
                    </Button>
                  ) : (
                    <div className="h-8"></div>
                  )}
                </div>

                {/* Black Move */}
                <div className="col-span-5">
                  {movePair.black ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleMoveClick(moves.findIndex(m => m === movePair.black))}
                      className={`
                        w-full justify-start p-2 h-auto transition-all duration-200
                        ${currentMoveIndex === moves.findIndex(m => m === movePair.black)
                          ? `bg-gradient-to-r ${theme.primary} text-white font-semibold glow-effect`
                          : `hover:bg-white/10 ${theme.text}`
                        }
                      `}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">♚</span>
                          <span className="font-mono text-sm">{movePair.black.san}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          {/* Special notation */}
                          {getMoveSpecialNotation(movePair.black) && (
                            <Badge variant="outline" className="text-xs px-1 py-0 h-auto">
                              {movePair.black.captured ? '×' : 
                               movePair.black.san.includes('+') ? '✓' : 
                               movePair.black.san.includes('O-O') ? '🏰' : ''}
                            </Badge>
                          )}
                          
                          {/* Evaluation */}
                          {showEvaluations && movePair.black.evaluation && (
                            <span className={`text-xs font-mono ${getEvaluationColor(-movePair.black.evaluation.score)}`}>
                              {getEvaluationSymbol(-movePair.black.evaluation.score)}
                            </span>
                          )}
                          
                          {/* Time */}
                          <span className={`text-xs font-mono ${theme.text} opacity-50`}>
                            {formatMoveTime(movePair.black.timeRemaining)}
                          </span>
                        </div>
                      </div>
                    </Button>
                  ) : (
                    <div className="h-8"></div>
                  )}
                </div>

                {/* Action Button */}
                <div className="col-span-1 flex justify-center">
                  {(movePair.white || movePair.black) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const moveIndex = movePair.black ? 
                          moves.findIndex(m => m === movePair.black) : 
                          moves.findIndex(m => m === movePair.white)
                        handleMoveClick(moveIndex)
                      }}
                      className="w-6 h-6 p-0 hover:bg-white/10"
                    >
                      <Eye className="w-3 h-3 text-white/60" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Battle Summary Footer */}
        <div className="px-4 py-3 bg-black/10 border-t border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Target className="w-4 h-4 text-white/60" />
                <span className={`text-xs ${theme.text} opacity-80`}>
                  Last: {lastMove?.san || 'No moves'}
                </span>
              </div>
              
              {showEvaluations && lastMove?.evaluation && (
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-white/60" />
                  <span className={`text-xs ${getEvaluationColor(lastMove.evaluation.score)}`}>
                    Eval: {lastMove.evaluation.score > 0 ? '+' : ''}{lastMove.evaluation.score.toFixed(2)}
                  </span>
                </div>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleMoveClick(moves.length - 1)}
              className="text-xs px-2 py-1 h-auto hover:bg-white/10 text-white/80"
            >
              <FaCrown className="w-3 h-3 mr-1" />
              Latest
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}