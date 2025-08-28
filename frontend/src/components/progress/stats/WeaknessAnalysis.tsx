import React from 'react'
import { AlertTriangle, Target, TrendingUp, Clock, BookOpen, CheckCircle, Info, ArrowRight } from 'lucide-react'
import { FaBrain } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import type { WeaknessAnalysisProps } from '@/types/detailedStats'

/**
 * WeaknessAnalysis Component
 * Displays comprehensive weakness identification and improvement recommendations
 */
export const WeaknessAnalysis: React.FC<WeaknessAnalysisProps> = ({
  weaknesses,
  isLoading,
  onRecommendationClick,
  theme
}) => {
  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Loading Skeleton */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-slate-800/30 border border-slate-700/30 rounded-xl p-6 animate-pulse"
          >
            <div className="h-4 bg-slate-600/50 rounded w-1/3 mb-4"></div>
            <div className="h-20 bg-slate-600/50 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-400/20 border-red-400/30'
      case 'high': return 'text-orange-400 bg-orange-400/20 border-orange-400/30'
      case 'medium': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30'
      case 'low': return 'text-blue-400 bg-blue-400/20 border-blue-400/30'
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return AlertTriangle
      case 'high': return AlertTriangle
      case 'medium': return Info
      case 'low': return Target
      default: return Info
    }
  }

  const getPatternMissColor = (missRate: number) => {
    if (missRate > 30) return 'text-red-400'
    if (missRate > 20) return 'text-orange-400'
    if (missRate > 10) return 'text-yellow-400'
    return 'text-green-400'
  }

  const formatImpact = (impact: number) => {
    return impact > 0 ? `+${impact}` : `${impact}`
  }

  return (
    <div className="space-y-6">
      {/* Identified Weaknesses Overview */}
      <div className={`
        bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6
        command-panel
      `}>
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle size={20} className="text-red-400" />
          <h3 className="text-lg font-bold text-white uppercase tracking-wide">
            Identified Weaknesses
          </h3>
          <div className="h-px flex-1 bg-gradient-to-r from-slate-600 to-transparent"></div>
          <div className="text-xs text-slate-400 font-mono">
            {weaknesses.identifiedWeaknesses.length} AREAS_DETECTED
          </div>
        </div>

        <div className="space-y-4">
          {weaknesses.identifiedWeaknesses.map((weakness, index) => {
            const SeverityIcon = getSeverityIcon(weakness.severity)
            const severityColors = getSeverityColor(weakness.severity)
            
            return (
              <div
                key={index}
                className={`
                  border rounded-xl p-5 transition-all duration-200
                  hover:bg-slate-700/20 ${severityColors}
                `}
              >
                <div className="flex items-start gap-4">
                  {/* Severity Indicator */}
                  <div className="flex-shrink-0 mt-1">
                    <SeverityIcon size={20} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-white text-lg">{weakness.category}</h4>
                        <p className="text-slate-300 text-sm mt-1">{weakness.description}</p>
                      </div>
                      
                      {/* Impact Badge */}
                      <div className="text-right space-y-1">
                        <div className="text-xs text-slate-400 uppercase">Impact</div>
                        <div className={`text-lg font-bold ${
                          weakness.impactOnRating < -30 ? 'text-red-400' :
                          weakness.impactOnRating < -15 ? 'text-orange-400' : 'text-yellow-400'
                        }`}>
                          {formatImpact(weakness.impactOnRating)}
                        </div>
                        <div className="text-xs text-slate-400">rating points</div>
                      </div>
                    </div>

                    {/* Statistics */}
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Target size={14} className="text-slate-400" />
                        <span className="text-slate-400">Frequency:</span>
                        <span className="text-white font-medium">{weakness.frequency}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <AlertTriangle size={14} className={
                          weakness.severity === 'critical' ? 'text-red-400' :
                          weakness.severity === 'high' ? 'text-orange-400' :
                          weakness.severity === 'medium' ? 'text-yellow-400' : 'text-blue-400'
                        } />
                        <span className="text-slate-400">Severity:</span>
                        <span className="text-white font-medium capitalize">{weakness.severity}</span>
                      </div>
                    </div>

                    {/* Examples Preview */}
                    {weakness.examples.length > 0 && (
                      <div className="mt-3 p-3 bg-slate-900/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <BookOpen size={14} className="text-blue-400" />
                          <span className="text-xs text-slate-400 uppercase">Example</span>
                        </div>
                        <p className="text-sm text-slate-300">
                          {weakness.examples[0]?.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Improvement Recommendations */}
      <div className={`
        bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6
        command-panel
      `}>
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp size={20} className="text-green-400" />
          <h3 className="text-lg font-bold text-white uppercase tracking-wide">
            Improvement Plan
          </h3>
          <div className="h-px flex-1 bg-gradient-to-r from-slate-600 to-transparent"></div>
          <div className="text-xs text-slate-400 font-mono">
            {weaknesses.recommendations.length} RECOMMENDATIONS
          </div>
        </div>

        <div className="space-y-6">
          {weaknesses.recommendations.map((recommendation, index) => (
            <div
              key={index}
              className={`
                bg-slate-700/30 border border-slate-600/30 rounded-xl p-5
                hover:border-slate-500/50 transition-all duration-200
              `}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-6 h-6 rounded-full bg-gradient-to-r ${theme.primary} 
                      flex items-center justify-center text-white text-xs font-bold
                    `}>
                      {recommendation.priority}
                    </div>
                    <h4 className="font-semibold text-white text-lg">
                      {recommendation.weakness}
                    </h4>
                  </div>
                  
                  <div className="text-sm text-slate-400">
                    Priority {recommendation.priority} • Expected gain: 
                    <span className="text-green-400 font-medium ml-1">
                      +{recommendation.expectedImprovement.ratingGain} rating
                    </span>
                    <span className="ml-2">
                      in {recommendation.expectedImprovement.timeframe}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => onRecommendationClick(recommendation)}
                  size="sm"
                  className={`
                    bg-gradient-to-r ${theme.primary} hover:opacity-90 text-white
                    px-4 py-2 rounded-lg font-medium transition-all duration-200
                    flex items-center gap-2
                  `}
                >
                  <span>Start Plan</span>
                  <ArrowRight size={14} />
                </Button>
              </div>

              {/* Study Plan */}
              <div className="space-y-3">
                <h5 className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <FaBrain size={14} />
                  Study Plan
                </h5>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendation.studyPlan.map((step, stepIndex) => (
                    <div
                      key={stepIndex}
                      className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg"
                    >
                      <div className={`
                        w-5 h-5 rounded-full bg-gradient-to-r ${theme.accent} 
                        flex items-center justify-center text-white text-xs font-bold
                        mt-0.5
                      `}>
                        {stepIndex + 1}
                      </div>
                      
                      <div className="flex-1 space-y-1">
                        <div className="text-sm font-medium text-white">
                          {step.activity}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-400">
                          <div className="flex items-center gap-1">
                            <Clock size={12} />
                            {step.duration}
                          </div>
                        </div>
                        
                        {step.resources.length > 0 && (
                          <div className="mt-2">
                            <div className="text-xs text-slate-500 mb-1">Resources:</div>
                            <div className="flex flex-wrap gap-1">
                              {step.resources.map((resource, resIndex) => (
                                <span
                                  key={resIndex}
                                  className="text-xs bg-slate-700/50 px-2 py-1 rounded text-slate-300"
                                >
                                  {resource}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Confidence Meter */}
              <div className="mt-4 flex items-center gap-3">
                <span className="text-sm text-slate-400">Confidence:</span>
                <div className="flex-1 bg-slate-700/50 rounded-full h-2">
                  <div 
                    className={`h-full bg-gradient-to-r ${theme.secondary} rounded-full transition-all duration-500`}
                    style={{ width: `${recommendation.expectedImprovement.confidence * 100}%` }}
                  />
                </div>
                <span className="text-sm text-white">
                  {(recommendation.expectedImprovement.confidence * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pattern Recognition Weaknesses */}
      <div className={`
        bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6
        command-panel
      `}>
        <div className="flex items-center gap-3 mb-6">
          <Target size={20} className="text-purple-400" />
          <h3 className="text-lg font-bold text-white uppercase tracking-wide">
            Tactical Pattern Analysis
          </h3>
          <div className="h-px flex-1 bg-gradient-to-r from-slate-600 to-transparent"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {weaknesses.patternWeaknesses.map((pattern, index) => (
            <div
              key={index}
              className={`
                bg-slate-700/30 border border-slate-600/30 rounded-lg p-4
                hover:border-slate-500/50 transition-all duration-200
              `}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-white capitalize">
                    {pattern.pattern.replace('_', ' ')}
                  </h4>
                  <div className="text-xs text-slate-400 mt-1">
                    {pattern.trainingNeeded} puzzles needed
                  </div>
                </div>
                <div className={`text-lg font-bold ${getPatternMissColor(pattern.missRate)}`}>
                  {pattern.missRate.toFixed(1)}%
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Recognition Time:</span>
                  <span className="text-white">{pattern.avgTimeToRecognize.toFixed(1)}s</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-700/50 rounded-full h-2">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      pattern.missRate > 30 ? 'bg-red-500' :
                      pattern.missRate > 20 ? 'bg-orange-500' :
                      pattern.missRate > 10 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.max(10, 100 - pattern.missRate)}%` }}
                  />
                </div>

                {/* Common Mistakes */}
                {pattern.commonMistakes.length > 0 && (
                  <div className="mt-3">
                    <div className="text-xs text-slate-500 mb-1">Common mistakes:</div>
                    <div className="space-y-1">
                      {pattern.commonMistakes.slice(0, 2).map((mistake, mIndex) => (
                        <div key={mIndex} className="text-xs text-slate-400 flex items-center gap-2">
                          <div className="w-1 h-1 bg-slate-500 rounded-full" />
                          {mistake}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Tracking */}
      <div className={`
        bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6
        command-panel
      `}>
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle size={20} className="text-green-400" />
          <h3 className="text-lg font-bold text-white uppercase tracking-wide">
            Improvement Tracking
          </h3>
          <div className="h-px flex-1 bg-gradient-to-r from-slate-600 to-transparent"></div>
        </div>

        <div className="space-y-4">
          {Object.entries(weaknesses.improvementTracking).map(([weakness, tracking]) => (
            <div
              key={weakness}
              className="bg-slate-700/30 border border-slate-600/30 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white">{weakness}</h4>
                <div className="text-right text-sm">
                  <div className="text-slate-400">Progress</div>
                  <div className="text-green-400 font-bold">
                    {((tracking.initialSeverity - tracking.currentSeverity) / tracking.initialSeverity * 100).toFixed(0)}%
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex-1">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Initial: {tracking.initialSeverity.toFixed(1)}</span>
                    <span>Current: {tracking.currentSeverity.toFixed(1)}</span>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-2">
                    <div 
                      className={`h-full bg-gradient-to-r ${theme.primary} rounded-full transition-all duration-500`}
                      style={{ width: `${100 - (tracking.currentSeverity / tracking.initialSeverity) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {tracking.improvements.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs text-slate-500">Recent improvements:</div>
                  {tracking.improvements.slice(0, 2).map((improvement, impIndex) => (
                    <div key={impIndex} className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">
                        {new Date(improvement.date).toLocaleDateString()}
                      </span>
                      <span className="text-green-400 font-medium">
                        +{improvement.progress.toFixed(1)}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="text-xs text-slate-500 mt-2">
                Last reviewed: {new Date(tracking.lastReview).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WeaknessAnalysis