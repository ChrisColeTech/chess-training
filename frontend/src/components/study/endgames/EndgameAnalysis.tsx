import React, { useState, useCallback } from 'react'
import { ArrowRight, BarChart3, BookOpen, Calculator, CheckCircle, Equal, Eye, Lightbulb, Star, Target, TrendingDown, TrendingUp, Brain } from 'lucide-react'
import { FaBrain } from 'react-icons/fa'
import type { EndgameAnalysisProps } from '@/types/endgameLibrary'

/**
 * EndgameAnalysis Component
 * Comprehensive position analysis with fortress-themed gaming aesthetic
 * Features engine analysis, tactical themes, and strategic concepts
 */
export const EndgameAnalysis: React.FC<EndgameAnalysisProps> = ({
  position,
  analysis,
  isAnalyzing,
  onAnalyze,
  onAnalyzeVariation,
  engineDepth,
  onDepthChange,
  theme
}) => {
  const [selectedVariation, setSelectedVariation] = useState<number | null>(null)
  // const [showAllMoves, setShowAllMoves] = useState(false)

  /**
   * Get evaluation color and display
   */
  const getEvaluationDisplay = (evaluation: number) => {
    const absEval = Math.abs(evaluation)
    
    if (absEval >= 5) {
      return {
        color: evaluation > 0 ? 'text-green-400' : 'text-red-400',
        bgColor: evaluation > 0 ? 'bg-green-900/30 border-green-500/30' : 'bg-red-900/30 border-red-500/30',
        icon: evaluation > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />,
        label: evaluation > 0 ? 'WINNING' : 'LOSING',
        text: `${evaluation > 0 ? '+' : ''}${evaluation.toFixed(1)}`
      }
    } else if (absEval >= 1) {
      return {
        color: evaluation > 0 ? 'text-green-300' : 'text-red-300',
        bgColor: evaluation > 0 ? 'bg-green-900/20 border-green-500/20' : 'bg-red-900/20 border-red-500/20',
        icon: evaluation > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />,
        label: evaluation > 0 ? 'ADVANTAGE' : 'DISADVANTAGE',
        text: `${evaluation > 0 ? '+' : ''}${evaluation.toFixed(1)}`
      }
    } else {
      return {
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-900/20 border-yellow-500/20',
        icon: <Equal size={16} />,
        label: 'BALANCED',
        text: `${evaluation > 0 ? '+' : ''}${evaluation.toFixed(1)}`
      }
    }
  }

  /**
   * Format chess moves for display
   */
  const formatMoves = (moves: string[]) => {
    return moves.map((move, index) => {
      const moveNumber = Math.floor(index / 2) + 1
      const isWhite = index % 2 === 0
      return isWhite ? `${moveNumber}.${move}` : move
    }).join(' ')
  }

  /**
   * Handle depth change
   */
  const handleDepthChange = useCallback((newDepth: number) => {
    onDepthChange(newDepth)
  }, [onDepthChange])

  /**
   * Analyze a specific variation
   */
  const handleVariationAnalysis = useCallback((moves: string[]) => {
    onAnalyzeVariation(moves)
  }, [onAnalyzeVariation])

  return (
    <div className="space-y-4">
      {/* Analysis Header */}
      <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FaBrain size={24} className={theme.text} />
            <h3 className={`text-xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
              <Brain className="w-4 h-4 inline" /> FORTRESS ANALYSIS
            </h3>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Depth Control */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">Depth:</span>
              <select
                value={engineDepth}
                onChange={(e) => handleDepthChange(Number(e.target.value))}
                className="bg-slate-700/50 border border-slate-600/50 rounded px-2 py-1 text-sm text-white"
                disabled={isAnalyzing}
              >
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={25}>25</option>
                <option value={30}>30</option>
              </select>
            </div>

            <button
              onClick={onAnalyze}
              disabled={isAnalyzing}
              className={`
                flex items-center gap-2 px-4 py-2 
                bg-gradient-to-r ${theme.primary}
                hover:opacity-90 disabled:opacity-50
                text-white font-semibold rounded-lg 
                transition-all duration-200
                hover:scale-105 active:scale-95
                disabled:cursor-not-allowed disabled:hover:scale-100
              `}
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Calculator size={18} />
                  <span>Analyze</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-700/30 rounded-lg p-3 text-center">
            <div className={`text-lg font-bold ${theme.text}`}>{position.difficulty}</div>
            <div className="text-xs text-slate-400">Difficulty</div>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-3 text-center">
            <div className={`text-lg font-bold ${theme.text}`}>{position.category}</div>
            <div className="text-xs text-slate-400">Category</div>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-3 text-center">
            <div className={`text-lg font-bold ${theme.text}`}>{position.evaluation}</div>
            <div className="text-xs text-slate-400">Static Eval</div>
          </div>
        </div>
      </div>

      {/* Analysis Results */}
      {analysis ? (
        <div className="space-y-4">
          {/* Main Evaluation */}
          <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4`}>
            <h4 className={`font-semibold ${theme.text} mb-4 flex items-center gap-2`}>
              <BarChart3 size={18} />
              Engine Evaluation
            </h4>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className={`${getEvaluationDisplay(analysis.evaluation).bgColor} border rounded-lg p-4`}>
                <div className="flex items-center gap-2 mb-2">
                  {getEvaluationDisplay(analysis.evaluation).icon}
                  <span className={`font-bold ${getEvaluationDisplay(analysis.evaluation).color}`}>
                    {getEvaluationDisplay(analysis.evaluation).label}
                  </span>
                </div>
                <div className={`text-2xl font-bold ${getEvaluationDisplay(analysis.evaluation).color}`}>
                  {getEvaluationDisplay(analysis.evaluation).text}
                </div>
              </div>

              <div className="bg-slate-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target size={16} className={theme.text} />
                  <span className={`font-bold ${theme.text}`}>ANALYSIS DEPTH</span>
                </div>
                <div className={`text-2xl font-bold ${theme.text}`}>
                  {analysis.depth}
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Calculated at depth {analysis.depth}
                </p>
              </div>
            </div>

            {/* Best Moves */}
            <div className="space-y-2">
              <h5 className={`font-medium ${theme.text} text-sm`}><Target className="w-4 h-4 inline" /> Best Moves:</h5>
              <div className="flex flex-wrap gap-2">
                {analysis.bestMoves.slice(0, 5).map((move, index) => (
                  <span
                    key={index}
                    className={`
                      px-3 py-1 rounded-lg font-mono font-bold
                      ${index === 0 
                        ? `bg-gradient-to-r ${theme.primary} text-white` 
                        : 'bg-slate-700/50 text-slate-300'
                      }
                    `}
                  >
                    {move}
                  </span>
                ))}
              </div>
            </div>

            {/* Principal Variation */}
            {analysis.principalVariation.length > 0 && (
              <div className="mt-4 p-3 bg-slate-700/30 rounded-lg">
                <h5 className={`font-medium ${theme.text} text-sm mb-2`}><BarChart3 className="w-4 h-4 inline" /> Principal Variation:</h5>
                <div className="font-mono text-sm text-slate-300 leading-relaxed">
                  {formatMoves(analysis.principalVariation.slice(0, 10))}
                  {analysis.principalVariation.length > 10 && (
                    <span className="text-slate-500"> ...</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Critical Lines */}
          {analysis.criticalLines.length > 0 && (
            <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4`}>
              <h4 className={`font-semibold ${theme.text} mb-4 flex items-center gap-2`}>
                <ArrowRight size={18} />
                Critical Variations
              </h4>

              <div className="space-y-3">
                {analysis.criticalLines.map((line, index) => (
                  <div
                    key={index}
                    className={`
                      p-3 rounded-lg border transition-all duration-200 cursor-pointer
                      ${selectedVariation === index
                        ? `bg-gradient-to-r ${theme.primary.replace('from-', 'from-').replace('to-', 'to-')}/20 border-purple-500/50`
                        : 'bg-slate-700/30 border-slate-600/30 hover:bg-slate-600/30 hover:border-slate-500/50'
                      }
                    `}
                    onClick={() => setSelectedVariation(selectedVariation === index ? null : index)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-white">{line.move}</span>
                        <div className={`${getEvaluationDisplay(line.evaluation).bgColor} border px-2 py-1 rounded text-xs`}>
                          <span className={getEvaluationDisplay(line.evaluation).color}>
                            {line.evaluation > 0 ? '+' : ''}{line.evaluation.toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleVariationAnalysis(line.line)
                        }}
                        className={`
                          px-2 py-1 text-xs rounded
                          bg-slate-600/50 hover:bg-slate-500/50
                          ${theme.text} transition-colors
                        `}
                      >
                        Analyze
                      </button>
                    </div>
                    
                    <p className="text-sm text-slate-300 mb-2">{line.comment}</p>
                    
                    <div className="font-mono text-xs text-slate-400">
                      {formatMoves(line.line.slice(0, 6))}
                      {line.line.length > 6 && <span> ...</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Themes and Concepts */}
          <div className="grid grid-cols-2 gap-4">
            {/* Tactical Themes */}
            <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4`}>
              <h4 className={`font-semibold ${theme.text} mb-3 flex items-center gap-2`}>
                <Lightbulb size={18} />
                Tactical Themes
              </h4>
              <div className="space-y-2">
                {analysis.tacticalThemes.map((theme, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-slate-700/30 rounded-lg"
                  >
                    <Target size={14} className="text-orange-400" />
                    <span className="text-sm text-slate-300">{theme}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Concepts */}
            <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4`}>
              <h4 className={`font-semibold ${theme.text} mb-3 flex items-center gap-2`}>
                <FaBrain size={18} />
                Strategic Concepts
              </h4>
              <div className="space-y-2">
                {analysis.strategicConcepts.map((concept, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-slate-700/30 rounded-lg"
                  >
                    <Star size={14} className="text-blue-400" />
                    <span className="text-sm text-slate-300">{concept}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key Squares */}
          {analysis.keySquares.length > 0 && (
            <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4`}>
              <h4 className={`font-semibold ${theme.text} mb-3 flex items-center gap-2`}>
                <Eye size={18} />
                Key Squares Analysis
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysis.keySquares.map((square, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-purple-900/30 border border-purple-500/50 rounded-lg font-mono font-bold text-purple-300"
                  >
                    {square}
                  </span>
                ))}
              </div>
              <p className="text-sm text-slate-400 mt-2">
                These squares are critical for piece placement and control in this position.
              </p>
            </div>
          )}

          {/* Historical Notes */}
          {analysis.historicalNotes && (
            <div className="bg-gradient-to-r from-amber-900/20 to-orange-900/20 border border-amber-500/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-500/20 rounded-lg flex-shrink-0">
                  <CheckCircle size={20} className="text-amber-400" />
                </div>
                <div>
                  <h6 className="font-semibold text-amber-300 mb-1"><BookOpen className="w-4 h-4 inline" /> Historical Context</h6>
                  <p className="text-sm text-amber-200 leading-relaxed">
                    {analysis.historicalNotes}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : !isAnalyzing ? (
        /* No Analysis Placeholder */
        <div className="text-center py-12">
          <FaBrain size={48} className={`${theme.text} opacity-30 mx-auto mb-4`} />
          <h4 className={`${theme.text} opacity-70 text-lg font-medium mb-2`}>
            Ready for Deep Analysis
          </h4>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Click "Analyze" to unleash the fortress engines and discover the hidden secrets of this position
          </p>
        </div>
      ) : (
        /* Loading Analysis */
        <div className="text-center py-12">
          <div className="relative mx-auto mb-4 w-16 h-16">
            <FaBrain size={48} className={`${theme.text} opacity-30`} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
            </div>
          </div>
          <h4 className={`${theme.text} text-lg font-medium mb-2`}>
            🏰 Fortress Engines at Work
          </h4>
          <p className="text-slate-400 text-sm">
            Analyzing position at depth {engineDepth}...
          </p>
        </div>
      )}
    </div>
  )
}