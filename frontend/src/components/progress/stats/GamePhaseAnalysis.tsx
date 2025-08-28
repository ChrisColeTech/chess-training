import React from 'react'
import { Target, AlertCircle, Activity, Brain } from 'lucide-react'
import { FaBrain, FaChessKnight } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import type { GamePhaseAnalysisProps, GamePhase } from '@/types/detailedStats'

/**
 * GamePhaseAnalysis Component
 * Displays comprehensive analysis of opening, middlegame, and endgame performance
 */
export const GamePhaseAnalysis: React.FC<GamePhaseAnalysisProps> = ({
  gamePhases,
  selectedPhase,
  onPhaseChange,
  isLoading,
  theme
}) => {
  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-slate-800/30 border border-slate-700/30 rounded-xl p-6 animate-pulse"
          >
            <div className="h-4 bg-slate-600/50 rounded w-1/3 mb-4"></div>
            <div className="h-32 bg-slate-600/50 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  const phaseOptions: Array<{
    key: GamePhase
    label: string
    icon: React.ElementType
    description: string
  }> = [
    {
      key: 'opening',
      label: 'Opening',
      icon: FaChessKnight,
      description: 'First 10-15 moves, development & theory'
    },
    {
      key: 'middlegame',
      label: 'Middlegame',
      icon: Target,
      description: 'Complex tactical & positional play'
    },
    {
      key: 'endgame',
      label: 'Endgame',
      icon: Brain,
      description: 'Technique & conversion skills'
    }
  ]

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-400'
    if (score >= 75) return 'text-blue-400'
    if (score >= 65) return 'text-yellow-400'
    if (score >= 55) return 'text-orange-400'
    return 'text-red-400'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent'
    if (score >= 80) return 'Very Good'
    if (score >= 70) return 'Good'
    if (score >= 60) return 'Average'
    if (score >= 50) return 'Below Average'
    return 'Needs Work'
  }

  const renderPhaseDetails = () => {
    switch (selectedPhase) {
      case 'opening':
        return (
          <div className="space-y-6">
            {/* Opening Statistics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className={`text-2xl font-bold ${getScoreColor(gamePhases.opening.accuracy)}`}>
                  {gamePhases.opening.accuracy.toFixed(1)}%
                </div>
                <div className="text-sm text-slate-400">Accuracy</div>
                <div className="text-xs text-slate-500">
                  {getScoreLabel(gamePhases.opening.accuracy)}
                </div>
              </div>

              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-blue-400">
                  {gamePhases.opening.bookMoves.toFixed(1)}
                </div>
                <div className="text-sm text-slate-400">Book Moves</div>
                <div className="text-xs text-slate-500">Average per game</div>
              </div>

              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-purple-400">
                  {(gamePhases.opening.noveltySuccess * 100).toFixed(0)}%
                </div>
                <div className="text-sm text-slate-400">Novelty Success</div>
                <div className="text-xs text-slate-500">When leaving theory</div>
              </div>

              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-cyan-400">
                  {gamePhases.opening.timeSpent.toFixed(1)}%
                </div>
                <div className="text-sm text-slate-400">Time Usage</div>
                <div className="text-xs text-slate-500">Of total game time</div>
              </div>

              <div className="text-center space-y-2">
                <div className={`text-2xl font-bold ${
                  gamePhases.opening.advantageGained > 0.2 ? 'text-green-400' :
                  gamePhases.opening.advantageGained > 0 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {gamePhases.opening.advantageGained > 0 ? '+' : ''}{gamePhases.opening.advantageGained.toFixed(2)}
                </div>
                <div className="text-sm text-slate-400">Avg Advantage</div>
                <div className="text-xs text-slate-500">Gained in opening</div>
              </div>

              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-orange-400">
                  {gamePhases.opening.commonMistakes.length}
                </div>
                <div className="text-sm text-slate-400">Mistake Types</div>
                <div className="text-xs text-slate-500">Identified patterns</div>
              </div>
            </div>

            {/* Common Mistakes */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-slate-300 uppercase tracking-wider">
                Common Opening Mistakes
              </h4>
              <div className="space-y-3">
                {gamePhases.opening.commonMistakes.map((mistake, index) => (
                  <div key={index} className="bg-slate-700/30 border border-slate-600/30 rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <AlertCircle size={18} className="text-orange-400" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white mb-2">
                          {mistake.mistake}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-400">
                          <span>Frequency: {mistake.frequency} games</span>
                          <span>•</span>
                          <span>Position pattern identified</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-orange-400">
                          {mistake.frequency}
                        </div>
                        <div className="text-xs text-slate-400">occurrences</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'middlegame':
        return (
          <div className="space-y-6">
            {/* Middlegame Statistics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className={`text-2xl font-bold ${getScoreColor(gamePhases.middlegame.tacticalAccuracy)}`}>
                  {gamePhases.middlegame.tacticalAccuracy.toFixed(1)}%
                </div>
                <div className="text-sm text-slate-400">Tactical Accuracy</div>
              </div>

              <div className="text-center space-y-2">
                <div className={`text-2xl font-bold ${getScoreColor(gamePhases.middlegame.positionalUnderstanding)}`}>
                  {gamePhases.middlegame.positionalUnderstanding.toFixed(1)}%
                </div>
                <div className="text-sm text-slate-400">Positional Play</div>
              </div>

              <div className="text-center space-y-2">
                <div className={`text-2xl font-bold ${getScoreColor(gamePhases.middlegame.planExecution)}`}>
                  {gamePhases.middlegame.planExecution.toFixed(1)}%
                </div>
                <div className="text-sm text-slate-400">Plan Execution</div>
              </div>

              <div className="text-center space-y-2">
                <div className={`text-2xl font-bold ${getScoreColor(gamePhases.middlegame.timeManagement)}`}>
                  {gamePhases.middlegame.timeManagement.toFixed(1)}%
                </div>
                <div className="text-sm text-slate-400">Time Management</div>
              </div>

              <div className="text-center space-y-2">
                <div className={`text-2xl font-bold ${getScoreColor(gamePhases.middlegame.complexityHandling)}`}>
                  {gamePhases.middlegame.complexityHandling.toFixed(1)}%
                </div>
                <div className="text-sm text-slate-400">Complexity Handling</div>
              </div>

              <div className="text-center space-y-2">
                <div className={`text-lg font-bold ${gamePhases.middlegame.mostDifficultPhase ? 'text-red-400' : 'text-green-400'}`}>
                  {gamePhases.middlegame.mostDifficultPhase ? 'YES' : 'NO'}
                </div>
                <div className="text-sm text-slate-400">Most Difficult Phase</div>
              </div>
            </div>

            {/* Skill Breakdown Chart */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-slate-300 uppercase tracking-wider">
                Skill Breakdown
              </h4>
              <div className="space-y-3">
                {[
                  { skill: 'Tactical Accuracy', value: gamePhases.middlegame.tacticalAccuracy },
                  { skill: 'Positional Understanding', value: gamePhases.middlegame.positionalUnderstanding },
                  { skill: 'Plan Execution', value: gamePhases.middlegame.planExecution },
                  { skill: 'Time Management', value: gamePhases.middlegame.timeManagement },
                  { skill: 'Complexity Handling', value: gamePhases.middlegame.complexityHandling }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-32 text-sm text-slate-400">{item.skill}</div>
                    <div className="flex-1 bg-slate-700/50 rounded-full h-3">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          item.value >= 85 ? `bg-gradient-to-r from-green-400 to-emerald-500` :
                          item.value >= 75 ? `bg-gradient-to-r from-blue-400 to-cyan-500` :
                          item.value >= 65 ? `bg-gradient-to-r from-yellow-400 to-orange-500` :
                          `bg-gradient-to-r from-red-400 to-red-600`
                        }`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                    <div className={`w-12 text-sm font-medium ${getScoreColor(item.value)}`}>
                      {item.value.toFixed(0)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'endgame':
        return (
          <div className="space-y-6">
            {/* Endgame Statistics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className={`text-2xl font-bold ${getScoreColor(gamePhases.endgame.technique)}`}>
                  {gamePhases.endgame.technique.toFixed(1)}%
                </div>
                <div className="text-sm text-slate-400">Technique</div>
              </div>

              <div className="text-center space-y-2">
                <div className={`text-2xl font-bold ${getScoreColor(gamePhases.endgame.calculation)}`}>
                  {gamePhases.endgame.calculation.toFixed(1)}%
                </div>
                <div className="text-sm text-slate-400">Calculation</div>
              </div>

              <div className="text-center space-y-2">
                <div className={`text-2xl font-bold ${getScoreColor(gamePhases.endgame.conversion)}`}>
                  {gamePhases.endgame.conversion.toFixed(1)}%
                </div>
                <div className="text-sm text-slate-400">Conversion</div>
              </div>

              <div className="text-center space-y-2">
                <div className={`text-2xl font-bold ${getScoreColor(gamePhases.endgame.defense)}`}>
                  {gamePhases.endgame.defense.toFixed(1)}%
                </div>
                <div className="text-sm text-slate-400">Defense</div>
              </div>

              <div className="text-center space-y-2">
                <div className={`text-2xl font-bold ${getScoreColor(gamePhases.endgame.knownPositions)}`}>
                  {gamePhases.endgame.knownPositions.toFixed(1)}%
                </div>
                <div className="text-sm text-slate-400">Known Positions</div>
              </div>

              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-green-400">
                  {gamePhases.endgame.tablebaseAccuracy.toFixed(1)}%
                </div>
                <div className="text-sm text-slate-400">Tablebase Accuracy</div>
              </div>
            </div>

            {/* Endgame Skills Radar */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-slate-300 uppercase tracking-wider">
                Endgame Skills Assessment
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  {[
                    { skill: 'Basic Technique', value: gamePhases.endgame.technique },
                    { skill: 'Calculation Depth', value: gamePhases.endgame.calculation },
                    { skill: 'Winning Conversion', value: gamePhases.endgame.conversion }
                  ].map((item, index) => (
                    <div key={index} className="bg-slate-700/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-white">{item.skill}</span>
                        <span className={`text-lg font-bold ${getScoreColor(item.value)}`}>
                          {item.value.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-700/50 rounded-full h-2">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            item.value >= 80 ? `bg-gradient-to-r ${theme.primary}` :
                            item.value >= 70 ? `bg-gradient-to-r ${theme.secondary}` :
                            `bg-gradient-to-r ${theme.accent}`
                          }`}
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  {[
                    { skill: 'Defensive Resources', value: gamePhases.endgame.defense },
                    { skill: 'Theoretical Knowledge', value: gamePhases.endgame.knownPositions },
                    { skill: 'Perfect Play (TB)', value: gamePhases.endgame.tablebaseAccuracy }
                  ].map((item, index) => (
                    <div key={index} className="bg-slate-700/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-white">{item.skill}</span>
                        <span className={`text-lg font-bold ${getScoreColor(item.value)}`}>
                          {item.value.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-700/50 rounded-full h-2">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            item.value >= 80 ? `bg-gradient-to-r ${theme.primary}` :
                            item.value >= 70 ? `bg-gradient-to-r ${theme.secondary}` :
                            `bg-gradient-to-r ${theme.accent}`
                          }`}
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Phase Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {phaseOptions.map((phase) => {
          const Icon = phase.icon
          const isSelected = selectedPhase === phase.key
          
          // Get phase-specific data
          const avgScore = phase.key === 'opening' 
            ? gamePhases.opening.accuracy
            : phase.key === 'middlegame' 
            ? (gamePhases.middlegame.tacticalAccuracy + gamePhases.middlegame.positionalUnderstanding + gamePhases.middlegame.planExecution) / 3
            : (gamePhases.endgame.technique + gamePhases.endgame.calculation + gamePhases.endgame.conversion) / 3

          return (
            <Button
              key={phase.key}
              onClick={() => onPhaseChange(phase.key)}
              variant={isSelected ? "default" : "outline"}
              className={`
                p-6 h-auto flex flex-col items-center gap-4 transition-all duration-200
                ${isSelected
                  ? `bg-gradient-to-r ${theme.primary} text-white border border-slate-500/50 shadow-lg`
                  : 'bg-slate-800/30 text-slate-400 hover:text-white hover:bg-slate-700/30 border-slate-600/30'
                }
              `}
            >
              <Icon size={32} />
              <div className="text-center space-y-2">
                <div className="font-bold text-lg">{phase.label}</div>
                <div className="text-xs opacity-80">{phase.description}</div>
                <div className={`text-2xl font-bold ${
                  isSelected ? 'text-white' : getScoreColor(avgScore)
                }`}>
                  {avgScore.toFixed(0)}%
                </div>
              </div>
            </Button>
          )
        })}
      </div>

      {/* Selected Phase Detailed Analysis */}
      <div className={`
        bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6
        command-panel
      `}>
        <div className="flex items-center gap-3 mb-6">
          {React.createElement(
            phaseOptions.find(p => p.key === selectedPhase)?.icon || Target,
            { size: 20, className: "text-blue-400" }
          )}
          <h3 className="text-lg font-bold text-white uppercase tracking-wide">
            {selectedPhase} Analysis
          </h3>
          <div className="h-px flex-1 bg-gradient-to-r from-slate-600 to-transparent"></div>
          <div className="text-xs text-slate-400 font-mono">
            DETAILED_BREAKDOWN
          </div>
        </div>

        {renderPhaseDetails()}
      </div>

      {/* Phase Transitions */}
      <div className={`
        bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6
        command-panel
      `}>
        <div className="flex items-center gap-3 mb-6">
          <Activity size={20} className="text-purple-400" />
          <h3 className="text-lg font-bold text-white uppercase tracking-wide">
            Phase Transitions
          </h3>
          <div className="h-px flex-1 bg-gradient-to-r from-slate-600 to-transparent"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Opening to Middlegame */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FaChessKnight size={18} className="text-blue-400" />
              <ArrowRight size={16} className="text-slate-500" />
              <Target size={18} className="text-purple-400" />
              <span className="text-white font-medium">Opening → Middlegame</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-slate-400">Transition Smoothness:</span>
                <span className={`font-medium ${getScoreColor(gamePhases.transitions.openingToMiddlegame.smoothness)}`}>
                  {gamePhases.transitions.openingToMiddlegame.smoothness.toFixed(1)}%
                </span>
              </div>
              
              <div className="w-full bg-slate-700/50 rounded-full h-2">
                <div 
                  className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${theme.primary}`}
                  style={{ width: `${gamePhases.transitions.openingToMiddlegame.smoothness}%` }}
                />
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-slate-400">Advantage Maintained:</span>
                <span className={`font-medium ${getScoreColor(gamePhases.transitions.openingToMiddlegame.advantageMaintained)}`}>
                  {gamePhases.transitions.openingToMiddlegame.advantageMaintained.toFixed(1)}%
                </span>
              </div>
              
              <div className="w-full bg-slate-700/50 rounded-full h-2">
                <div 
                  className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${theme.secondary}`}
                  style={{ width: `${gamePhases.transitions.openingToMiddlegame.advantageMaintained}%` }}
                />
              </div>
            </div>
          </div>

          {/* Middlegame to Endgame */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Target size={18} className="text-purple-400" />
              <ArrowRight size={16} className="text-slate-500" />
              <FaBrain size={18} className="text-green-400" />
              <span className="text-white font-medium">Middlegame → Endgame</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-slate-400">Simplification Skills:</span>
                <span className={`font-medium ${getScoreColor(gamePhases.transitions.middlegameToEndgame.simplification)}`}>
                  {gamePhases.transitions.middlegameToEndgame.simplification.toFixed(1)}%
                </span>
              </div>
              
              <div className="w-full bg-slate-700/50 rounded-full h-2">
                <div 
                  className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${theme.accent}`}
                  style={{ width: `${gamePhases.transitions.middlegameToEndgame.simplification}%` }}
                />
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-slate-400">Endgame Preparation:</span>
                <span className={`font-medium ${getScoreColor(gamePhases.transitions.middlegameToEndgame.preparation)}`}>
                  {gamePhases.transitions.middlegameToEndgame.preparation.toFixed(1)}%
                </span>
              </div>
              
              <div className="w-full bg-slate-700/50 rounded-full h-2">
                <div 
                  className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${theme.highlight}`}
                  style={{ width: `${gamePhases.transitions.middlegameToEndgame.preparation}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper component for arrow icon (since Phosphor doesn't have ArrowRight)
const ArrowRight: React.FC<{ size?: number; className?: string }> = ({ 
  size = 16, 
  className = "" 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 256 256" 
    className={className}
    fill="currentColor"
  >
    <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"/>
  </svg>
)

export default GamePhaseAnalysis