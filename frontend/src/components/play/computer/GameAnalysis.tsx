import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, BookOpen, Clock, Shield, Target, TrendingUp, Zap } from 'lucide-react'
import { FaBrain, FaCrown } from 'react-icons/fa'
import type { GameAnalysisProps } from '@/types/playComputer'
import { soundFX } from '@/utils/soundEffects'

/**
 * Gaming-themed game analysis component showing position evaluation
 * Provides detailed battle analysis and strategic insights
 */
export const GameAnalysis: React.FC<GameAnalysisProps> = ({
  gameState,
  analysis,
  isAnalyzing,
  onAnalyze,
  theme
}) => {
  /**
   * Get evaluation bar progress (0-100)
   */
  const getEvaluationProgress = (evaluation: number): number => {
    // Convert evaluation (-3 to +3) to percentage (0-100)
    // 0 evaluation = 50%, +3 = 100%, -3 = 0%
    return Math.max(0, Math.min(100, 50 + (evaluation * 16.67)))
  }

  /**
   * Get evaluation color
   */
  const getEvaluationColor = (evaluation: number): string => {
    if (evaluation > 1) return 'text-green-400'
    if (evaluation > 0.5) return 'text-green-300'
    if (evaluation > -0.5) return 'text-yellow-400'
    if (evaluation > -1) return 'text-orange-400'
    return 'text-red-400'
  }

  /**
   * Get evaluation description
   */
  const getEvaluationDescription = (evaluation: number): string => {
    if (evaluation > 2) return 'Decisive advantage'
    if (evaluation > 1) return 'Winning position'
    if (evaluation > 0.5) return 'Clear advantage'
    if (evaluation > -0.5) return 'Balanced position'
    if (evaluation > -1) return 'Slight disadvantage'
    if (evaluation > -2) return 'Difficult position'
    return 'Critical situation'
  }

  /**
   * Get position aspect color
   */
  const getAspectColor = (aspect: string): string => {
    switch (aspect) {
      case 'White':
      case 'Safe':
      case 'Good':
        return 'text-green-400'
      case 'Equal':
      case 'Average':
        return 'text-yellow-400'
      case 'Black':
      case 'Exposed':
      case 'Poor':
        return 'text-orange-400'
      case 'Critical':
        return 'text-red-400'
      default:
        return theme.text
    }
  }

  /**
   * Get tactical theme icon
   */
  const getTacticalIcon = (theme: string) => {
    switch (theme.toLowerCase()) {
      case 'check': return '✓'
      case 'capture': return '×'
      case 'fork': return '<Zap className="w-4 h-4 inline" />'
      case 'pin': return '📌'
      case 'skewer': return '🗡️'
      case 'sacrifice': return '<Flame className="w-4 h-4 inline" />'
      default: return '<GiSwordsPower className="w-4 h-4 inline" />'
    }
  }

  if (!gameState) {
    return (
      <Card className="bg-black/20 border-white/10 backdrop-blur-xl">
        <CardContent className="p-8 text-center">
          <FaBrain className="w-16 h-16 mx-auto text-white/40 mb-4" />
          <p className={`${theme.text} opacity-60`}>
            No active battle to analyze
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      
      {/* Analysis Header */}
      <Card className="bg-black/20 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className={`${theme.text} text-lg flex items-center space-x-2`}>
              <BarChart3 className="w-5 h-5" />
              <span>Battle Analysis</span>
            </CardTitle>
            
            <Button
              onClick={() => {
                onAnalyze()
                soundFX.playClick()
              }}
              disabled={isAnalyzing}
              size="sm"
              className={`bg-gradient-to-r ${theme.primary} text-white hover:opacity-90 transition-all duration-200`}
            >
              {isAnalyzing ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Analyzing...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <FaBrain className="w-4 h-4" />
                  <span>Analyze Position</span>
                </div>
              )}
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Position Evaluation */}
      {analysis && (
        <>
          <Card className="bg-black/20 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className={`${theme.text} text-base flex items-center space-x-2`}>
                <Target className="w-4 h-4" />
                <span>Position Evaluation</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Evaluation Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${theme.text}`}>
                    Battle Status
                  </span>
                  <Badge className={`${getEvaluationColor(analysis.evaluation).replace('text-', 'bg-').replace('-400', '-500/20 text-white')}`}>
                    {analysis.evaluation > 0 ? '+' : ''}{analysis.evaluation.toFixed(2)}
                  </Badge>
                </div>
                
                <div className="relative">
                  <Progress 
                    value={getEvaluationProgress(analysis.evaluation)} 
                    className="h-3 bg-gray-700"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-0.5 h-4 bg-white/60"></div>
                  </div>
                </div>
                
                <div className="flex justify-between text-xs">
                  <span className="text-white/60">Black Advantage</span>
                  <span className="text-white/60">Equal</span>
                  <span className="text-white/60">White Advantage</span>
                </div>
                
                <p className={`text-center text-sm ${getEvaluationColor(analysis.evaluation)} font-medium`}>
                  {getEvaluationDescription(analysis.evaluation)}
                </p>
              </div>

              {/* Best Moves */}
              <div>
                <h4 className={`text-sm font-semibold ${theme.text} mb-2`}>Recommended Moves</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.bestMoves.slice(0, 3).map((move, index) => (
                    <Badge 
                      key={index}
                      variant="outline"
                      className={`bg-gradient-to-r ${theme.secondary} text-white border-0`}
                    >
                      {index + 1}. {move}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Position Analysis */}
          <Card className="bg-black/20 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className={`${theme.text} text-base flex items-center space-x-2`}>
                <Shield className="w-4 h-4" />
                <span>Strategic Assessment</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                
                {/* Material Balance */}
                <div className="text-center p-3 bg-black/20 rounded-lg border border-white/5">
                  <div className="text-2xl mb-1">⚖️</div>
                  <div className={`text-sm font-medium ${theme.text} mb-1`}>
                    Material Balance
                  </div>
                  <div className={`text-xs ${getEvaluationColor(analysis.positionAnalysis.materialBalance)}`}>
                    {analysis.positionAnalysis.materialBalance > 0 ? '+' : ''}
                    {analysis.positionAnalysis.materialBalance.toFixed(1)}
                  </div>
                </div>

                {/* King Safety */}
                <div className="text-center p-3 bg-black/20 rounded-lg border border-white/5">
                  <div className="text-2xl mb-1"><Shield className="w-4 h-4 inline" /></div>
                  <div className={`text-sm font-medium ${theme.text} mb-1`}>
                    King Safety
                  </div>
                  <div className={`text-xs ${getAspectColor(analysis.positionAnalysis.kingSafety)}`}>
                    {analysis.positionAnalysis.kingSafety}
                  </div>
                </div>

                {/* Center Control */}
                <div className="text-center p-3 bg-black/20 rounded-lg border border-white/5">
                  <div className="text-2xl mb-1"><Target className="w-4 h-4 inline" /></div>
                  <div className={`text-sm font-medium ${theme.text} mb-1`}>
                    Center Control
                  </div>
                  <div className={`text-xs ${getAspectColor(analysis.positionAnalysis.centerControl)}`}>
                    {analysis.positionAnalysis.centerControl}
                  </div>
                </div>

                {/* Pawn Structure */}
                <div className="text-center p-3 bg-black/20 rounded-lg border border-white/5">
                  <div className="text-2xl mb-1">🗿</div>
                  <div className={`text-sm font-medium ${theme.text} mb-1`}>
                    Pawn Structure
                  </div>
                  <div className={`text-xs ${getAspectColor(analysis.positionAnalysis.pawnStructure)}`}>
                    {analysis.positionAnalysis.pawnStructure}
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>

          {/* Opening Information */}
          <Card className="bg-black/20 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className={`${theme.text} text-base flex items-center space-x-2`}>
                <BookOpen className="w-4 h-4" />
                <span>Opening Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`text-sm font-semibold ${theme.text}`}>
                    {analysis.opening.name}
                  </h4>
                  <p className={`text-xs ${theme.text} opacity-60`}>
                    ECO Code: {analysis.opening.eco}
                  </p>
                </div>
                <Badge className={`bg-gradient-to-r ${theme.primary} text-white`}>
                  {analysis.opening.moves.length} moves
                </Badge>
              </div>
              
              {analysis.opening.moves.length > 0 && (
                <div>
                  <div className={`text-xs ${theme.text} opacity-80 mb-1`}>
                    Opening Sequence:
                  </div>
                  <div className="p-2 bg-black/20 rounded border border-white/5">
                    <span className={`text-xs font-mono ${theme.text} opacity-90`}>
                      {analysis.opening.moves.slice(0, 6).join(' ')}
                      {analysis.opening.moves.length > 6 && '...'}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tactical Themes */}
          {analysis.tacticalThemes.length > 0 && (
            <Card className="bg-black/20 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className={`${theme.text} text-base flex items-center space-x-2`}>
                  <Zap className="w-4 h-4" />
                  <span>Tactical Elements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className={`text-sm ${theme.text} opacity-80`}>
                    Active tactical motifs in this position:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {analysis.tacticalThemes.map((tacticalTheme, index) => (
                      <Badge 
                        key={index}
                        className="bg-orange-500/20 text-orange-400 border-orange-500/30"
                      >
                        <span className="mr-1">{getTacticalIcon(tacticalTheme)}</span>
                        {tacticalTheme}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Performance Insights */}
          <Card className="bg-black/20 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className={`${theme.text} text-base flex items-center space-x-2`}>
                <TrendingUp className="w-4 h-4" />
                <span>Battle Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="p-3 bg-black/10 rounded-lg border border-white/5">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className={`text-sm font-medium ${theme.text}`}>
                      Game Phase
                    </span>
                  </div>
                  <p className={`text-xs ${theme.text} opacity-70`}>
                    {gameState.moves.length < 10 ? 'Opening Phase' :
                     gameState.moves.length < 30 ? 'Middle Game' : 'Endgame'}
                  </p>
                </div>

                <div className="p-3 bg-black/10 rounded-lg border border-white/5">
                  <div className="flex items-center space-x-2 mb-2">
                    <FaCrown className="w-4 h-4 text-yellow-400" />
                    <span className={`text-sm font-medium ${theme.text}`}>
                      Battle Intensity
                    </span>
                  </div>
                  <p className={`text-xs ${theme.text} opacity-70`}>
                    {Math.abs(analysis.evaluation) > 1.5 ? 'Decisive Battle' :
                     Math.abs(analysis.evaluation) > 0.5 ? 'Active Combat' : 'Positional Maneuvering'}
                  </p>
                </div>

              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}