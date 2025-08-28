import React from 'react'
import { Users, TrendingUp, TrendingDown, Target, Trophy, User, ArrowUp, ArrowDown, Equal } from 'lucide-react'
import type { ComparativeAnalysisProps } from '@/types/detailedStats'

/**
 * ComparativeAnalysis Component
 * Displays comparative performance analysis against peer groups and similar players
 */
export const ComparativeAnalysis: React.FC<ComparativeAnalysisProps> = ({
  comparative,
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
            <div className="h-20 bg-slate-600/50 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  const getPercentileColor = (percentile: number) => {
    if (percentile >= 90) return 'text-green-400'
    if (percentile >= 75) return 'text-blue-400'
    if (percentile >= 50) return 'text-yellow-400'
    if (percentile >= 25) return 'text-orange-400'
    return 'text-red-400'
  }

  const getPercentileLabel = (percentile: number) => {
    if (percentile >= 95) return 'Elite'
    if (percentile >= 90) return 'Excellent'
    if (percentile >= 75) return 'Very Good'
    if (percentile >= 50) return 'Above Average'
    if (percentile >= 25) return 'Below Average'
    return 'Needs Improvement'
  }

  const getTrendIcon = (value: number, peerAverage: number) => {
    if (value > peerAverage) return ArrowUp
    if (value < peerAverage) return ArrowDown
    return Equal
  }

  const getTrendColor = (value: number, peerAverage: number) => {
    if (value > peerAverage) return 'text-green-400'
    if (value < peerAverage) return 'text-red-400'
    return 'text-gray-400'
  }

  const formatRatingDiff = (diff: number) => {
    const prefix = diff > 0 ? '+' : ''
    return `${prefix}${diff}`
  }

  return (
    <div className="space-y-6">
      {/* Peer Group Overview */}
      <div className={`
        bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6
        command-panel
      `}>
        <div className="flex items-center gap-3 mb-6">
          <Users size={20} className="text-blue-400" />
          <h3 className="text-lg font-bold text-white uppercase tracking-wide">
            Peer Group Analysis
          </h3>
          <div className="h-px flex-1 bg-gradient-to-r from-slate-600 to-transparent"></div>
          <div className="text-xs text-slate-400 font-mono">
            {comparative.peerGroup.sampleSize.toLocaleString()} PLAYERS
          </div>
        </div>

        {/* Peer Group Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center space-y-2">
            <div className="text-lg font-bold text-white">
              {comparative.peerGroup.ratingRange[0]} - {comparative.peerGroup.ratingRange[1]}
            </div>
            <div className="text-sm text-slate-400">Rating Range</div>
          </div>
          
          <div className="text-center space-y-2">
            <div className="text-lg font-bold text-blue-400">
              {comparative.peerGroup.sampleSize.toLocaleString()}
            </div>
            <div className="text-sm text-slate-400">Sample Size</div>
          </div>
          
          <div className="text-center space-y-2">
            <div className="text-sm font-medium text-white">
              {comparative.peerGroup.timeControl.join(', ')}
            </div>
            <div className="text-sm text-slate-400">Time Controls</div>
          </div>
        </div>

        {/* Performance Comparison */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center space-y-3">
            <div className="space-y-1">
              <div className={`text-2xl font-bold ${getPercentileColor(comparative.comparison.ratingPercentile)}`}>
                {comparative.comparison.ratingPercentile}%
              </div>
              <div className="text-xs text-slate-400">Rating Percentile</div>
            </div>
            <div className={`text-xs px-2 py-1 rounded ${
              comparative.comparison.ratingPercentile >= 75 ? 'bg-green-400/20 text-green-400' :
              comparative.comparison.ratingPercentile >= 50 ? 'bg-yellow-400/20 text-yellow-400' :
              'bg-red-400/20 text-red-400'
            }`}>
              {getPercentileLabel(comparative.comparison.ratingPercentile)}
            </div>
          </div>

          <div className="text-center space-y-3">
            <div className="space-y-1">
              <div className={`text-2xl font-bold ${getPercentileColor(comparative.comparison.accuracyPercentile)}`}>
                {comparative.comparison.accuracyPercentile}%
              </div>
              <div className="text-xs text-slate-400">Accuracy Percentile</div>
            </div>
            <div className={`text-xs px-2 py-1 rounded ${
              comparative.comparison.accuracyPercentile >= 75 ? 'bg-green-400/20 text-green-400' :
              comparative.comparison.accuracyPercentile >= 50 ? 'bg-yellow-400/20 text-yellow-400' :
              'bg-red-400/20 text-red-400'
            }`}>
              {getPercentileLabel(comparative.comparison.accuracyPercentile)}
            </div>
          </div>

          <div className="text-center space-y-3">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-purple-400">
                {comparative.comparison.improvementRate.toFixed(1)}%
              </div>
              <div className="text-xs text-slate-400">Improvement Rate</div>
            </div>
            <div className={`text-xs px-2 py-1 rounded ${
              comparative.comparison.improvementRate >= 2 ? 'bg-green-400/20 text-green-400' :
              comparative.comparison.improvementRate >= 1 ? 'bg-yellow-400/20 text-yellow-400' :
              'bg-red-400/20 text-red-400'
            }`}>
              {comparative.comparison.improvementRate >= 2 ? 'Fast' :
               comparative.comparison.improvementRate >= 1 ? 'Steady' : 'Slow'}
            </div>
          </div>

          <div className="text-center space-y-3">
            <div className="space-y-1">
              <div className={`text-2xl font-bold ${getPercentileColor(comparative.comparison.activenessPercentile)}`}>
                {comparative.comparison.activenessPercentile}%
              </div>
              <div className="text-xs text-slate-400">Activity Percentile</div>
            </div>
            <div className={`text-xs px-2 py-1 rounded ${
              comparative.comparison.activenessPercentile >= 75 ? 'bg-green-400/20 text-green-400' :
              comparative.comparison.activenessPercentile >= 50 ? 'bg-yellow-400/20 text-yellow-400' :
              'bg-red-400/20 text-red-400'
            }`}>
              {getPercentileLabel(comparative.comparison.activenessPercentile)}
            </div>
          </div>
        </div>
      </div>

      {/* Strengths vs Peers */}
      <div className={`
        bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6
        command-panel
      `}>
        <div className="flex items-center gap-3 mb-6">
          <Trophy size={20} className="text-green-400" />
          <h3 className="text-lg font-bold text-white uppercase tracking-wide">
            Relative Strengths
          </h3>
          <div className="h-px flex-1 bg-gradient-to-r from-slate-600 to-transparent"></div>
        </div>

        <div className="space-y-4">
          {comparative.relativeStrengths.map((strength, index) => {
            const TrendIcon = getTrendIcon(strength.yourLevel, strength.peerAverage)
            const trendColor = getTrendColor(strength.yourLevel, strength.peerAverage)
            const percentileBadge = getPercentileLabel(strength.percentile)
            
            return (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <TrendIcon size={20} className={trendColor} />
                  <div>
                    <div className="font-medium text-white">{strength.skill}</div>
                    <div className="text-sm text-slate-400">
                      You: {strength.yourLevel}% • Peers: {strength.peerAverage}%
                    </div>
                  </div>
                </div>
                
                <div className="text-right space-y-1">
                  <div className={`text-lg font-bold ${getPercentileColor(strength.percentile)}`}>
                    {strength.percentile}%
                  </div>
                  <div className={`text-xs px-2 py-1 rounded ${
                    strength.percentile >= 75 ? 'bg-green-400/20 text-green-400' :
                    strength.percentile >= 50 ? 'bg-yellow-400/20 text-yellow-400' :
                    'bg-red-400/20 text-red-400'
                  }`}>
                    {percentileBadge}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Improvement Areas */}
      <div className={`
        bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6
        command-panel
      `}>
        <div className="flex items-center gap-3 mb-6">
          <Target size={20} className="text-orange-400" />
          <h3 className="text-lg font-bold text-white uppercase tracking-wide">
            Areas for Improvement
          </h3>
          <div className="h-px flex-1 bg-gradient-to-r from-slate-600 to-transparent"></div>
        </div>

        <div className="space-y-4">
          {comparative.improvementAreas.map((area, index) => {
            const urgencyColor = area.priority === 1 ? 'text-red-400' : 
                               area.priority === 2 ? 'text-orange-400' : 'text-yellow-400'
            const urgencyBg = area.priority === 1 ? 'bg-red-400/20 border-red-400/30' : 
                             area.priority === 2 ? 'bg-orange-400/20 border-orange-400/30' : 
                             'bg-yellow-400/20 border-yellow-400/30'
            
            return (
              <div
                key={index}
                className={`border rounded-lg p-4 ${urgencyBg} hover:bg-opacity-30 transition-all duration-200`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`
                      w-8 h-8 rounded-full bg-gradient-to-r ${theme.primary} 
                      flex items-center justify-center text-white text-sm font-bold
                    `}>
                      {area.priority}
                    </div>
                    <div>
                      <div className="font-medium text-white">{area.skill}</div>
                      <div className="text-sm text-slate-400">
                        Gap: {area.gap} points • Est. catch-up: {area.catchUpTime}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-lg font-bold ${urgencyColor}`}>
                      {Math.abs(area.gap)}
                    </div>
                    <div className="text-xs text-slate-400">points behind</div>
                  </div>
                </div>
                
                {/* Progress to close gap visualization */}
                <div className="mt-3">
                  <div className="w-full bg-slate-700/50 rounded-full h-2">
                    <div 
                      className={`h-full bg-gradient-to-r ${theme.accent} rounded-full transition-all duration-500`}
                      style={{ 
                        width: `${Math.max(10, 100 - Math.abs(area.gap) * 10)}%` 
                      }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Similar Players */}
      <div className={`
        bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6
        command-panel
      `}>
        <div className="flex items-center gap-3 mb-6">
          <User size={20} className="text-cyan-400" />
          <h3 className="text-lg font-bold text-white uppercase tracking-wide">
            Similar Players
          </h3>
          <div className="h-px flex-1 bg-gradient-to-r from-slate-600 to-transparent"></div>
          <div className="text-xs text-slate-400 font-mono">
            TOP_MATCHES
          </div>
        </div>

        <div className="space-y-4">
          {comparative.similarPlayers.map((player, index) => (
            <div
              key={index}
              className="bg-slate-700/30 border border-slate-600/30 rounded-lg p-5 hover:border-slate-500/50 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`
                    w-12 h-12 rounded-full bg-gradient-to-r ${theme.gradient} 
                    flex items-center justify-center text-white font-bold
                  `}>
                    {player.username.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium text-white text-lg">{player.username}</div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-slate-400">Similarity:</span>
                      <span className="text-cyan-400 font-medium">
                        {(player.similarity * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`text-lg font-bold ${
                    player.ratingDifference > 0 ? 'text-green-400' : 
                    player.ratingDifference < 0 ? 'text-red-400' : 'text-gray-400'
                  }`}>
                    {formatRatingDiff(player.ratingDifference)}
                  </div>
                  <div className="text-xs text-slate-400">rating diff</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Common Strengths */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={14} className="text-green-400" />
                    <span className="text-sm font-medium text-slate-300">Common Strengths</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {player.commonStrengths.map((strength, sIndex) => (
                      <span
                        key={sIndex}
                        className="text-xs bg-green-400/20 text-green-400 px-2 py-1 rounded border border-green-400/30"
                      >
                        {strength}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Common Weaknesses */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <TrendingDown size={14} className="text-red-400" />
                    <span className="text-sm font-medium text-slate-300">Common Weaknesses</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {player.commonWeaknesses.map((weakness, wIndex) => (
                      <span
                        key={wIndex}
                        className="text-xs bg-red-400/20 text-red-400 px-2 py-1 rounded border border-red-400/30"
                      >
                        {weakness}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Similarity Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Match Accuracy</span>
                  <span>{(player.similarity * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-2">
                  <div 
                    className={`h-full bg-gradient-to-r ${theme.primary} rounded-full transition-all duration-500`}
                    style={{ width: `${player.similarity * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Summary */}
      <div className={`
        bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6
        command-panel
      `}>
        <div className="flex items-center gap-3 mb-6">
          <Target size={20} className="text-purple-400" />
          <h3 className="text-lg font-bold text-white uppercase tracking-wide">
            Summary & Recommendations
          </h3>
          <div className="h-px flex-1 bg-gradient-to-r from-slate-600 to-transparent"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Key Insights */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-slate-300 uppercase tracking-wider">
              Key Insights
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span>You rank in the {comparative.comparison.ratingPercentile}th percentile for rating</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span>Your activity level exceeds {comparative.comparison.activenessPercentile}% of peers</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                <span>Improvement rate is {comparative.comparison.improvementRate.toFixed(1)}% monthly</span>
              </div>
            </div>
          </div>

          {/* Actionable Recommendations */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-slate-300 uppercase tracking-wider">
              Focus Areas
            </h4>
            <div className="space-y-3 text-sm">
              {comparative.improvementAreas.slice(0, 3).map((area, index) => (
                <div key={index} className="flex items-center gap-3 text-slate-300">
                  <div className={`
                    w-2 h-2 rounded-full ${
                      area.priority === 1 ? 'bg-red-400' :
                      area.priority === 2 ? 'bg-orange-400' : 'bg-yellow-400'
                    }
                  `}></div>
                  <span>
                    Focus on {area.skill} (Priority {area.priority})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComparativeAnalysis