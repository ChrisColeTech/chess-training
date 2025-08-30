import React from 'react'
import { TrendingUp, TrendingDown, Target, Zap, Clock, Eye, CheckCircle, AlertCircle } from 'lucide-react'
import type { PerformanceMetricsProps } from '@/types/detailedStats'

/**
 * PerformanceMetrics Component
 * Displays comprehensive performance analytics with KPIs and ratings
 */
export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({
  metrics,
  isLoading,
  theme
}) => {
  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Loading Skeleton */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-slate-800/30 border border-slate-700/30 rounded-xl p-6 animate-pulse"
          >
            <div className="h-4 bg-slate-600/50 rounded w-1/3 mb-4"></div>
            <div className="h-8 bg-slate-600/50 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'excellent': return 'text-green-400'
      case 'good': return 'text-blue-400'
      case 'average': return 'text-yellow-400'
      case 'below_average': return 'text-orange-400'
      case 'needs_improvement': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getRatingIcon = (rating: string) => {
    switch (rating) {
      case 'excellent': return CheckCircle
      case 'good': return CheckCircle
      case 'average': return Target
      case 'below_average': return AlertCircle
      case 'needs_improvement': return AlertCircle
      default: return Target
    }
  }

  const formatChange = (change: number) => {
    const prefix = change > 0 ? '+' : ''
    return `${prefix}${change}`
  }

  const getChangeIcon = (change: number) => {
    return change >= 0 ? TrendingUp : TrendingDown
  }

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-400' : 'text-red-400'
  }

  return (
    <div className="space-y-6">
      {/* Overall Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Overall Rating */}
        <div className={`
          bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6
          hover:border-slate-600/70 transition-all duration-200 command-panel
        `}>
          <div className="flex items-center justify-between mb-4">
            <Target size={24} className="text-blue-400" />
            <span className="text-xs text-slate-400 font-mono uppercase">Overall</span>
          </div>
          <div className="space-y-2">
            <div className={`text-2xl font-bold ${getRatingColor(metrics.overallRating)} capitalize`}>
              {metrics.overallRating.replace('_', ' ')}
            </div>
            <div className="text-xl text-white">
              {metrics.accuracy.toFixed(1)}%
              <span className="text-xs text-slate-400 ml-1">accuracy</span>
            </div>
          </div>
        </div>

        {/* Current Rating */}
        <div className={`
          bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6
          hover:border-slate-600/70 transition-all duration-200 command-panel
        `}>
          <div className="flex items-center justify-between mb-4">
            <TrendingUp size={24} className="text-purple-400" />
            <span className="text-xs text-slate-400 font-mono uppercase">Rating</span>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-white">
              {metrics.ratingProgression.current}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Peak:</span>
              <span className="text-sm text-green-400">{metrics.ratingProgression.peak}</span>
            </div>
          </div>
        </div>

        {/* Rating Changes */}
        <div className={`
          bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6
          hover:border-slate-600/70 transition-all duration-200 command-panel
        `}>
          <div className="flex items-center justify-between mb-4">
            <Zap size={24} className="text-yellow-400" />
            <span className="text-xs text-slate-400 font-mono uppercase">Change</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {React.createElement(getChangeIcon(metrics.ratingProgression.change7d), {
                size: 16,
                className: getChangeColor(metrics.ratingProgression.change7d)
              })}
              <span className={`text-lg font-bold ${getChangeColor(metrics.ratingProgression.change7d)}`}>
                {formatChange(metrics.ratingProgression.change7d)}
              </span>
              <span className="text-xs text-slate-400">7d</span>
            </div>
            <div className="flex items-center gap-2">
              {React.createElement(getChangeIcon(metrics.ratingProgression.change30d), {
                size: 16,
                className: getChangeColor(metrics.ratingProgression.change30d)
              })}
              <span className={`text-sm ${getChangeColor(metrics.ratingProgression.change30d)}`}>
                {formatChange(metrics.ratingProgression.change30d)}
              </span>
              <span className="text-xs text-slate-400">30d</span>
            </div>
          </div>
        </div>

        {/* Predicted Rating */}
        <div className={`
          bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6
          hover:border-slate-600/70 transition-all duration-200 command-panel
        `}>
          <div className="flex items-center justify-between mb-4">
            <Eye size={24} className="text-cyan-400" />
            <span className="text-xs text-slate-400 font-mono uppercase">Predicted</span>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-cyan-400">
              {metrics.ratingProgression.predicted}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-full bg-slate-700/50 rounded-full h-2">
                <div 
                  className={`h-full bg-gradient-to-r ${theme.primary} rounded-full transition-all duration-500`}
                  style={{ width: `${metrics.ratingProgression.confidenceInterval * 100}%` }}
                />
              </div>
              <span className="text-xs text-slate-400">
                {(metrics.ratingProgression.confidenceInterval * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Game Phase Performance */}
      <div className={`
        bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6
        command-panel
      `}>
        <div className="flex items-center gap-3 mb-6">
          <Target size={20} className="text-blue-400" />
          <h3 className="text-lg font-bold text-white uppercase tracking-wide">
            Phase Performance
          </h3>
          <div className="h-px flex-1 bg-gradient-to-r from-slate-600 to-transparent"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(metrics.phasePerformance).map(([phase, data]) => {
            const RatingIcon = getRatingIcon(data.rating)
            return (
              <div key={phase} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-white capitalize">{phase}</h4>
                  <RatingIcon size={18} className={getRatingColor(data.rating)} />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Accuracy</span>
                    <span className="text-white font-medium">{data.accuracy.toFixed(1)}%</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Games</span>
                    <span className="text-white font-medium">{data.gamesPlayed}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Improvement</span>
                    <div className="flex items-center gap-1">
                      {React.createElement(getChangeIcon(data.improvement), {
                        size: 14,
                        className: getChangeColor(data.improvement)
                      })}
                      <span className={`text-sm font-medium ${getChangeColor(data.improvement)}`}>
                        {formatChange(data.improvement)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-700/50 rounded-full h-2">
                  <div 
                    className={`h-full bg-gradient-to-r ${theme.primary} rounded-full transition-all duration-500`}
                    style={{ width: `${data.accuracy}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tactical Performance */}
      <div className={`
        bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6
        command-panel
      `}>
        <div className="flex items-center gap-3 mb-6">
          <Zap size={20} className="text-yellow-400" />
          <h3 className="text-lg font-bold text-white uppercase tracking-wide">
            Tactical Analysis
          </h3>
          <div className="h-px flex-1 bg-gradient-to-r from-slate-600 to-transparent"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-yellow-400">
              {metrics.tacticalPerformance.puzzleRating}
            </div>
            <div className="text-xs text-slate-400 uppercase">Rating</div>
          </div>
          
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-green-400">
              {metrics.tacticalPerformance.solvingAccuracy.toFixed(1)}%
            </div>
            <div className="text-xs text-slate-400 uppercase">Accuracy</div>
          </div>
          
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-blue-400">
              {metrics.tacticalPerformance.avgSolveTime.toFixed(1)}s
            </div>
            <div className="text-xs text-slate-400 uppercase">Avg Time</div>
          </div>
          
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-purple-400">
              {metrics.tacticalPerformance.currentStreak}
            </div>
            <div className="text-xs text-slate-400 uppercase">Streak</div>
            <div className="text-xs text-slate-500">
              Best: {metrics.tacticalPerformance.bestStreak}
            </div>
          </div>
        </div>

        {/* Top Tactical Patterns */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-slate-300 uppercase tracking-wider">
            Pattern Strengths
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(metrics.tacticalPerformance.patternStrengths)
              .sort(([,a], [,b]) => b.accuracy - a.accuracy)
              .slice(0, 6)
              .map(([pattern, data]) => (
                <div key={pattern} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-white capitalize">
                      {pattern.replace('_', ' ')}
                    </div>
                    <div className="text-xs text-slate-400">
                      {data.count} problems • {data.avgTime.toFixed(1)}s avg
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-bold ${
                      data.accuracy >= 90 ? 'text-green-400' : 
                      data.accuracy >= 80 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {data.accuracy.toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Time Management */}
      <div className={`
        bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6
        command-panel
      `}>
        <div className="flex items-center gap-3 mb-6">
          <Clock size={20} className="text-cyan-400" />
          <h3 className="text-lg font-bold text-white uppercase tracking-wide">
            Time Management
          </h3>
          <div className="h-px flex-1 bg-gradient-to-r from-slate-600 to-transparent"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Time Statistics */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Average Thinking Time</span>
              <span className="text-white font-medium">{metrics.timeManagement.avgThinkingTime.toFixed(1)}s</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Time per Move</span>
              <span className="text-white font-medium">{metrics.timeManagement.timePerMove.toFixed(1)}s</span>
            </div>

            {/* Time Distribution */}
            <div className="space-y-2">
              <span className="text-sm text-slate-400">Phase Distribution</span>
              <div className="space-y-2">
                {Object.entries(metrics.timeManagement.timeDistribution).map(([phase, percentage]) => (
                  <div key={phase} className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 w-20 capitalize">{phase}</span>
                    <div className="flex-1 bg-slate-700/50 rounded-full h-2">
                      <div 
                        className={`h-full bg-gradient-to-r ${theme.accent} rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-white w-12 text-right">{percentage.toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Blunder Analysis */}
          <div className="space-y-4">
            <span className="text-sm text-slate-400">Blunder Rate by Time Spent</span>
            <div className="space-y-2">
              {metrics.timeManagement.blundersByTimeSpent.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-slate-700/30 rounded">
                  <span className="text-xs text-slate-300">{item.timeRange}</span>
                  <span className={`text-sm font-medium ${
                    item.blunderRate < 3 ? 'text-green-400' : 
                    item.blunderRate < 6 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {item.blunderRate.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Evaluation Accuracy */}
      <div className={`
        bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6
        command-panel
      `}>
        <div className="flex items-center gap-3 mb-6">
          <Eye size={20} className="text-green-400" />
          <h3 className="text-lg font-bold text-white uppercase tracking-wide">
            Evaluation Skills
          </h3>
          <div className="h-px flex-1 bg-gradient-to-r from-slate-600 to-transparent"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Object.entries(metrics.evaluationAccuracy).map(([skill, accuracy]) => (
            <div key={skill} className="text-center space-y-3">
              <div className="space-y-1">
                <div className={`text-xl font-bold ${
                  accuracy >= 85 ? 'text-green-400' : 
                  accuracy >= 75 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {accuracy.toFixed(1)}%
                </div>
                <div className="text-xs text-slate-400 capitalize">
                  {skill.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </div>
              </div>
              
              <div className="w-full bg-slate-700/50 rounded-full h-2">
                <div 
                  className={`h-full bg-gradient-to-r ${
                    accuracy >= 85 ? 'from-green-400 to-emerald-500' : 
                    accuracy >= 75 ? 'from-yellow-400 to-orange-500' : 
                    'from-red-400 to-red-600'
                  } rounded-full transition-all duration-500`}
                  style={{ width: `${accuracy}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PerformanceMetrics