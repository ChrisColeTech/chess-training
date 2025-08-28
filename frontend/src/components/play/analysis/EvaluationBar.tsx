// Evaluation Bar Component - Following SRP for evaluation display only
import React from 'react'
import { TrendingUp, TrendingDown, Equal } from 'lucide-react'
import type { EvaluationBarProps } from '@/types/analysisBoard'

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

  const getEvalColor = () => {
    if (evaluation > 0.5) return 'text-green-400'
    if (evaluation < -0.5) return 'text-red-400'
    return 'text-yellow-400'
  }

  const getEvalDescription = () => {
    const abs = Math.abs(evaluation)
    if (abs < 0.3) return 'Equal'
    if (abs < 0.7) return evaluation > 0 ? 'Slight advantage' : 'Slight disadvantage'
    if (abs < 1.5) return evaluation > 0 ? 'Clear advantage' : 'Clear disadvantage'
    if (abs < 3.0) return evaluation > 0 ? 'Winning' : 'Losing'
    return evaluation > 0 ? 'Completely winning' : 'Completely losing'
  }

  // Calculate bar percentage (50% = equal, 0-100% range)
  const barPercentage = Math.max(0, Math.min(100, 50 + (evaluation * 20)))

  return (
    <div className={`backdrop-blur-2xl bg-black/30 border-white/20 rounded-2xl border-2 p-6 ${className}`}>
      <h3 className="font-bold mb-4 uppercase tracking-wider flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${getEvalColor().replace('text-', 'bg-')}`}></div>
        Evaluation
      </h3>
      
      {/* Main evaluation display */}
      <div className="text-center mb-4">
        <div className={`text-3xl font-bold ${getEvalColor()} flex items-center justify-center gap-2`}>
          {React.createElement(getEvalIcon(), { className: "w-6 h-6" })}
          {evaluation > 0 ? '+' : ''}{evaluation.toFixed(2)}
        </div>
        <div className="text-xs opacity-75 uppercase tracking-wider mt-1">Position Score</div>
        <div className="text-sm opacity-90 mt-2 font-medium">
          {getEvalDescription()}
        </div>
      </div>

      {/* Visual evaluation bar */}
      <div className="relative mb-4">
        <div className="h-6 bg-black/50 rounded-full overflow-hidden border border-white/10">
          {/* White advantage side */}
          <div 
            className="h-full transition-all duration-700 ease-out bg-gradient-to-r from-green-400 to-emerald-500"
            style={{ 
              width: `${barPercentage}%`,
              transformOrigin: 'left'
            }}
          />
          {/* Black advantage overlay */}
          {evaluation < 0 && (
            <div 
              className="absolute top-0 right-0 h-full transition-all duration-700 ease-out bg-gradient-to-l from-red-400 to-orange-500"
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
        <div className="text-center p-2 rounded-lg bg-black/20">
          <div className="text-red-400 font-bold">-2.0+</div>
          <div className="opacity-75">Losing</div>
        </div>
        <div className="text-center p-2 rounded-lg bg-black/20">
          <div className="text-yellow-400 font-bold">±0.5</div>
          <div className="opacity-75">Equal</div>
        </div>
        <div className="text-center p-2 rounded-lg bg-black/20">
          <div className="text-green-400 font-bold">+2.0+</div>
          <div className="opacity-75">Winning</div>
        </div>
      </div>
    </div>
  )
}

export default EvaluationBar