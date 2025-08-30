import React from 'react'
import { animated, useSpring } from '@react-spring/web'
import { BarChart3, TrendingUp, TrendingDown, Clock, Target, Calendar, Trophy, Zap, CheckCircle } from 'lucide-react'
import { FaBrain } from 'react-icons/fa'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import type { LearningAnalyticsProps } from '@/types/learningPath'

/**
 * Learning Analytics Component - Comprehensive learning insights and trends
 * Shows performance analytics, predictions, and study patterns
 */
export const LearningAnalytics: React.FC<LearningAnalyticsProps> = ({
  analytics,
  selectedPeriod,
  onPeriodChange,
  theme
}) => {
  const { trends, patterns, achievements, predictions } = analytics

  const periodOptions = [
    { value: 'day', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ]

  /**
   * Get trend direction icon and color
   */
  const getTrendStyle = (trajectory: string) => {
    switch (trajectory) {
      case 'improving':
        return { icon: <TrendingUp size={16} />, color: 'text-green-400', bg: 'bg-green-500/20' }
      case 'declining':
        return { icon: <TrendingDown size={16} />, color: 'text-red-400', bg: 'bg-red-500/20' }
      default:
        return { icon: <TrendingUp size={16} />, color: 'text-blue-400', bg: 'bg-blue-500/20' }
    }
  }

  /**
   * Format time preferences for display
   */
  const formatPreferredTimes = (times: number[]) => {
    return times.map(hour => {
      const ampm = hour >= 12 ? 'PM' : 'AM'
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
      return `${displayHour}${ampm}`
    }).join(', ')
  }

  /**
   * Get confidence level styling
   */
  const getConfidenceStyle = (confidence: number) => {
    if (confidence >= 0.8) return { color: 'text-green-400', bg: 'bg-green-500/20' }
    if (confidence >= 0.6) return { color: 'text-yellow-400', bg: 'bg-yellow-500/20' }
    return { color: 'text-red-400', bg: 'bg-red-500/20' }
  }

  return (
    <div className="space-y-6">
      {/* Header with Period Selection */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-3 bg-gradient-to-r ${theme.primary} rounded-lg`}>
            <BarChart3 size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Learning Analytics</h2>
            <p className="text-gray-400">Insights into your learning patterns and progress</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {periodOptions.map((option) => (
            <Button
              key={option.value}
              size="sm"
              variant={selectedPeriod === option.value ? 'default' : 'outline'}
              onClick={() => onPeriodChange(option.value)}
              className={`
                ${selectedPeriod === option.value 
                  ? `bg-gradient-to-r ${theme.primary} text-white` 
                  : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'
                }
              `}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Performance Trends */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center gap-2">
            <TrendingUp size={20} />
            Performance Trends
          </CardTitle>
          <CardDescription className="text-gray-400">
            How your skills are developing over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trends.map((trend, index) => {
              const trendStyle = getTrendStyle(trend.trajectory)
              const improvementPercentage = Math.round(trend.improvement * 100)
              const confidenceStyle = getConfidenceStyle(trend.confidence)
              
              const springProps = useSpring({
                opacity: 1,
                transform: 'translateY(0px)',
                from: { opacity: 0, transform: 'translateY(20px)' },
                delay: index * 100
              })
              
              return (
                <animated.div
                  key={trend.skillCategory}
                  style={springProps}
                  className={`p-4 rounded-lg border border-gray-700 ${trendStyle.bg}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-white">{trend.skillCategory}</h4>
                    <span className={trendStyle.color}>
                      {trendStyle.icon}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Improvement</span>
                      <span className={`text-sm font-medium ${trendStyle.color}`}>
                        +{improvementPercentage}%
                      </span>
                    </div>
                    
                    <Progress 
                      value={Math.abs(improvementPercentage)} 
                      className="h-2 bg-gray-800"
                    />
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Confidence</span>
                      <span className={`font-medium ${confidenceStyle.color}`}>
                        {Math.round(trend.confidence * 100)}%
                      </span>
                    </div>
                  </div>
                </animated.div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Study Patterns */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center gap-2">
            <FaBrain size={20} />
            Study Patterns
          </CardTitle>
          <CardDescription className="text-gray-400">
            Your learning habits and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Time Preferences */}
            <div className="space-y-4">
              <h4 className="font-medium text-white flex items-center gap-2">
                <Clock size={16} />
                Study Schedule
              </h4>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Preferred Times</span>
                  <span className="text-sm text-white">
                    {formatPreferredTimes(patterns.preferredTimes)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Average Session</span>
                  <span className="text-sm text-white">
                    {Math.round(patterns.sessionLengths.reduce((a, b) => a + b, 0) / patterns.sessionLengths.length)}min
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Intensity Preference</span>
                  <span className="text-sm text-white capitalize">
                    {patterns.intensityPreference}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Focus Areas */}
            <div className="space-y-4">
              <h4 className="font-medium text-white flex items-center gap-2">
                <Target size={16} />
                Focus Areas
              </h4>
              
              <div className="space-y-2">
                {patterns.categoryFocus.map((category, index) => (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{category}</span>
                    <div className="w-20">
                      <Progress 
                        value={85 - (index * 15)} 
                        className="h-1.5 bg-gray-800"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements Summary */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center gap-2">
            <Trophy size={20} />
            Achievement Summary
          </CardTitle>
          <CardDescription className="text-gray-400">
            Your learning accomplishments in this period
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30">
              <div className="text-2xl font-bold text-emerald-400">{achievements.skillsMastered}</div>
              <div className="text-sm text-gray-400">Skills Mastered</div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30">
              <div className="text-2xl font-bold text-blue-400">{achievements.milestonesReached}</div>
              <div className="text-sm text-gray-400">Milestones</div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30">
              <div className="text-2xl font-bold text-yellow-400">{achievements.streaksAchieved}</div>
              <div className="text-sm text-gray-400">Study Streaks</div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30">
              <div className="text-2xl font-bold text-purple-400">
                +{Math.round(achievements.improvementRate * 100)}%
              </div>
              <div className="text-sm text-gray-400">Improvement</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Predictions */}
      <Card className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border-indigo-700/50">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center gap-2">
            <Zap size={20} />
            AI Predictions
          </CardTitle>
          <CardDescription className="text-indigo-300">
            Machine learning predictions based on your progress patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Next Milestone */}
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-indigo-600 rounded-lg">
                <CheckCircle size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-white mb-1">Next Milestone</h4>
                <p className="text-sm text-indigo-200 mb-2">{predictions.nextMilestone.milestone}</p>
                <div className="flex items-center space-x-4 text-xs text-indigo-300">
                  <span>Estimated: {new Date(predictions.nextMilestone.estimatedDate).toLocaleDateString()}</span>
                  <span>Confidence: {Math.round(predictions.nextMilestone.confidence * 100)}%</span>
                </div>
              </div>
            </div>
            
            {/* Rating Projection */}
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-indigo-600 rounded-lg">
                <TrendingUp size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-white mb-1">Rating Projection</h4>
                <p className="text-sm text-indigo-200 mb-2">
                  Projected rating: <strong>{predictions.ratingProjection.projected}</strong> in {predictions.ratingProjection.timeframe} days
                </p>
                <div className="text-xs text-indigo-300">
                  Confidence: {Math.round(predictions.ratingProjection.confidence * 100)}%
                </div>
              </div>
            </div>
            
            {/* Optimal Schedule */}
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-indigo-600 rounded-lg">
                <Calendar size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-white mb-1">Optimal Schedule</h4>
                <p className="text-sm text-indigo-200">
                  {predictions.optimalSchedule.frequency} sessions per week, {predictions.optimalSchedule.duration} minutes each
                </p>
                <p className="text-xs text-indigo-300 mt-1">
                  Intensity: {predictions.optimalSchedule.intensity}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LearningAnalytics