// Evaluation Bar Component - Following SRP for evaluation display only
import React from 'react'
import { TrendingUp, TrendingDown, Equal } from 'lucide-react'
import type { EvaluationBarProps } from '@/types/analysisBoard'
// Utility functions moved locally
const getEvaluationColor = (evaluation: number): string => {
  if (evaluation > 1.0) return 'text-green-400'
  if (evaluation > 0.5) return 'text-green-300'
  if (evaluation > -0.5) return 'text-yellow-400'
  if (evaluation > -1.0) return 'text-red-300'
  return 'text-red-400'
}

const getEvaluationDescription = (evaluation: number): string => {
  if (evaluation > 3.0) return 'Winning for White'
  if (evaluation > 1.0) return 'Clear advantage for White'
  if (evaluation > 0.5) return 'Slight advantage for White'
  if (evaluation > -0.5) return 'Balanced position'
  if (evaluation > -1.0) return 'Slight advantage for Black'
  if (evaluation > -3.0) return 'Clear advantage for Black'
  return 'Winning for Black'
}

const evaluationToPercentage = (evaluation: number): number => {
  // Convert evaluation to percentage (50% = equal, 0% = -3.0, 100% = +3.0)
  const clamped = Math.max(-3.0, Math.min(3.0, evaluation))
  return ((clamped + 3.0) / 6.0) * 100
}

const evaluationBarConfig = {
  height: 6,
  animationDuration: 1000,
  gradient: {
    white: 'from-green-500 to-green-400',
    black: 'from-red-500 to-red-400'
  }
}

const evaluationTrendIndicators = [
  { range: '-3.0', label: 'Losing', color: 'text-red-400' },
  { range: '0.0', label: 'Equal', color: 'text-yellow-400' },
  { range: '+3.0', label: 'Winning', color: 'text-green-400' }
]

export const EvaluationBar: React.FC<EvaluationBarProps> = ({ 
  evaluation, 
  className = '' 
}) => {

  // Single responsibility: Calculate evaluation display values
  const getEvalIcon = () => {
    if (evaluation > 0.5) return TrendingUp
    if (evaluation < -0.5) return TrendingDown
    return Equal
  }

  const evalColor = getEvaluationColor(evaluation)
  const evalDescription = getEvaluationDescription(evaluation)
  const barPercentage = evaluationToPercentage(evaluation)

  return (
    <div className={`backdrop-blur-2xl bg-black/30 border-white/20 rounded-2xl border-2 p-6 ${className}`}>
      <h3 className="font-bold mb-4 uppercase tracking-wider flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${evalColor.replace('text-', 'bg-')}`}></div>
        Evaluation
      </h3>
      
      {/* Main evaluation display */}
      <div className="text-center mb-4">
        <div className={`text-3xl font-bold ${evalColor} flex items-center justify-center gap-2`}>
          {React.createElement(getEvalIcon(), { className: "w-6 h-6" })}
          {evaluation > 0 ? '+' : ''}{evaluation.toFixed(2)}
        </div>
        <div className="text-xs opacity-75 uppercase tracking-wider mt-1">Position Score</div>
        <div className="text-sm opacity-90 mt-2 font-medium">
          {evalDescription}
        </div>
      </div>

      {/* Visual evaluation bar */}
      <div className="relative mb-4">
        <div className={`h-${evaluationBarConfig.height} bg-black/50 rounded-full overflow-hidden border border-white/10`}>
          {/* White advantage side */}
          <div 
            className={`h-full transition-all duration-${evaluationBarConfig.animationDuration} ease-out bg-gradient-to-r ${evaluationBarConfig.gradient.white}`}
            style={{ 
              width: `${barPercentage}%`,
              transformOrigin: 'left'
            }}
          />
          {/* Black advantage overlay */}
          {evaluation < 0 && (
            <div 
              className={`absolute top-0 right-0 h-full transition-all duration-${evaluationBarConfig.animationDuration} ease-out bg-gradient-to-l ${evaluationBarConfig.gradient.black}`}
              style={{ width: `${100 - barPercentage}%` }}
            />
          )}
        </div>
        
        {/* Center line indicator */}
        <div className="absolute top-0 left-1/2 w-px h-6 bg-white/30 transform -translate-x-px" />
        
        {/* Side labels */}
        <div className="flex justify-between mt-2 text-xs opacity-75">
          <span className="text-red-400">Black</span>
          <span className="text-white/50">0.00</span>
          <span className="text-green-400">White</span>
        </div>
      </div>

      {/* Evaluation trend indicators */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        {evaluationTrendIndicators.map((indicator, index) => (
          <div key={index} className="text-center p-2 rounded-lg bg-black/20">
            <div className={`${indicator.color} font-bold`}>{indicator.range}</div>
            <div className="opacity-75">{indicator.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EvaluationBar