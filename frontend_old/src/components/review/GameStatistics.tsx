import React from 'react'
import { Target, Clock, TrendingUp, AlertTriangle, Star, Trophy, Activity } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import type { GameStatisticsProps } from '@/types/gameReview'

/**
 * Game Statistics Component
 * Displays comprehensive performance metrics and analysis for a chess game
 */
export const GameStatistics: React.FC<GameStatisticsProps> = ({
  performance,
  timeAnalysis,
  keyPositions,
  theme
}) => {
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A':
        return 'text-green-400'
      case 'B':
        return 'text-blue-400'
      case 'C':
        return 'text-yellow-400'
      case 'D':
        return 'text-orange-400'
      case 'F':
        return 'text-red-400'
      default:
        return theme.text
    }
  }

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'text-green-400'
    if (accuracy >= 80) return 'text-blue-400'
    if (accuracy >= 70) return 'text-yellow-400'
    if (accuracy >= 60) return 'text-orange-400'
    return 'text-red-400'
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getPositionTypeIcon = (type: string) => {
    switch (type) {
      case 'Critical':
        return <AlertTriangle size={16} className="text-orange-400" />
      case 'Turning_Point':
        return <Activity size={16} className="text-purple-400" />
      case 'Missed_Opportunity':
        return <Target size={16} className="text-red-400" />
      case 'Best_Play':
        return <Star size={16} className="text-green-400" />
      default:
        return <Target size={16} className="text-gray-400" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Overall Performance */}
      <Card className={`bg-gradient-to-r ${theme.glassMorphism} border-gray-700`}>
        <CardHeader>
          <CardTitle className={`text-xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent flex items-center`}>
            <Trophy size={24} className="mr-2" />
            Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Accuracy Display */}
          <div className="text-center">
            <div className={`text-4xl font-bold ${getAccuracyColor(performance.overallAccuracy)} mb-2`}>
              {performance.overallAccuracy.toFixed(1)}%
            </div>
            <div className={`text-lg ${theme.text} opacity-80`}>Overall Accuracy</div>
            <Progress 
              value={performance.overallAccuracy} 
              className="mt-3 h-3"
            />
          </div>

          {/* Phase Breakdown */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <div className={`text-2xl font-bold ${getAccuracyColor(performance.phaseAccuracy.opening)}`}>
                {performance.phaseAccuracy.opening.toFixed(1)}%
              </div>
              <div className={`text-sm ${theme.text} opacity-70 mt-1`}>Opening</div>
              <div className="mt-2">
                <Progress value={performance.phaseAccuracy.opening} className="h-2" />
              </div>
            </div>
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <div className={`text-2xl font-bold ${getAccuracyColor(performance.phaseAccuracy.middlegame)}`}>
                {performance.phaseAccuracy.middlegame.toFixed(1)}%
              </div>
              <div className={`text-sm ${theme.text} opacity-70 mt-1`}>Middlegame</div>
              <div className="mt-2">
                <Progress value={performance.phaseAccuracy.middlegame} className="h-2" />
              </div>
            </div>
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <div className={`text-2xl font-bold ${getAccuracyColor(performance.phaseAccuracy.endgame)}`}>
                {performance.phaseAccuracy.endgame.toFixed(1)}%
              </div>
              <div className={`text-sm ${theme.text} opacity-70 mt-1`}>Endgame</div>
              <div className="mt-2">
                <Progress value={performance.phaseAccuracy.endgame} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Move Classifications */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className={`text-lg font-semibold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
            Move Quality Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <div className="text-xl font-bold text-purple-400 flex items-center justify-center">
                <Star size={20} className="mr-1" />
                {performance.moveClassifications.brilliant}
              </div>
              <div className={`text-sm ${theme.text} opacity-70`}>Brilliant</div>
            </div>
            <div className="text-center p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="text-xl font-bold text-green-400 flex items-center justify-center">
                <TrendingUp size={20} className="mr-1" />
                {performance.moveClassifications.great}
              </div>
              <div className={`text-sm ${theme.text} opacity-70`}>Great</div>
            </div>
            <div className="text-center p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="text-xl font-bold text-blue-400">
                {performance.moveClassifications.good}
              </div>
              <div className={`text-sm ${theme.text} opacity-70`}>Good</div>
            </div>
            <div className="text-center p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <div className="text-xl font-bold text-yellow-400">
                {performance.moveClassifications.inaccuracy}
              </div>
              <div className={`text-sm ${theme.text} opacity-70`}>Inaccuracy</div>
            </div>
            <div className="text-center p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
              <div className="text-xl font-bold text-orange-400 flex items-center justify-center">
                <AlertTriangle size={20} className="mr-1" />
                {performance.moveClassifications.mistake}
              </div>
              <div className={`text-sm ${theme.text} opacity-70`}>Mistake</div>
            </div>
            <div className="text-center p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="text-xl font-bold text-red-400">
                {performance.moveClassifications.blunder}
              </div>
              <div className={`text-sm ${theme.text} opacity-70`}>Blunder</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className={`text-lg font-semibold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
            Detailed Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-gray-800/30 rounded-lg">
              <div className={`text-lg font-bold bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}>
                {performance.performanceRating}
              </div>
              <div className={`text-xs ${theme.text} opacity-70`}>Performance Rating</div>
            </div>
            <div className="text-center p-3 bg-gray-800/30 rounded-lg">
              <div className={`text-lg font-bold bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}>
                {performance.averageCentipawnLoss.toFixed(1)}
              </div>
              <div className={`text-xs ${theme.text} opacity-70`}>Avg Centipawn Loss</div>
            </div>
            <div className="text-center p-3 bg-gray-800/30 rounded-lg">
              <div className={`text-lg font-bold bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}>
                {performance.blunderRate.toFixed(1)}%
              </div>
              <div className={`text-xs ${theme.text} opacity-70`}>Blunder Rate</div>
            </div>
            <div className="text-center p-3 bg-gray-800/30 rounded-lg">
              <div className={`text-lg font-bold bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}>
                {performance.criticalPositionScore.toFixed(1)}%
              </div>
              <div className={`text-xs ${theme.text} opacity-70`}>Critical Position Score</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Analysis */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className={`text-lg font-semibold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent flex items-center`}>
            <Clock size={20} className="mr-2" />
            Time Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Time Grade */}
          <div className="text-center">
            <div className={`text-3xl font-bold ${getGradeColor(timeAnalysis.timeGrade)} mb-2`}>
              {timeAnalysis.timeGrade}
            </div>
            <div className={`text-lg ${theme.text} opacity-80`}>Time Management Grade</div>
          </div>

          {/* Time Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-gray-800/30 rounded-lg">
              <div className={`text-lg font-bold ${theme.text}`}>
                {formatTime(timeAnalysis.totalTimeUsed)}
              </div>
              <div className={`text-xs ${theme.text} opacity-70`}>Total Used</div>
            </div>
            <div className="text-center p-3 bg-gray-800/30 rounded-lg">
              <div className={`text-lg font-bold ${theme.text}`}>
                {formatTime(timeAnalysis.averageTimePerMove)}
              </div>
              <div className={`text-xs ${theme.text} opacity-70`}>Avg per Move</div>
            </div>
            <div className="text-center p-3 bg-gray-800/30 rounded-lg">
              <div className={`text-lg font-bold ${theme.text}`}>
                {performance.timeEfficiency.toFixed(1)}%
              </div>
              <div className={`text-xs ${theme.text} opacity-70`}>Efficiency</div>
            </div>
            <div className="text-center p-3 bg-gray-800/30 rounded-lg">
              <div className={`text-lg font-bold ${timeAnalysis.timeBlunders.length > 0 ? 'text-red-400' : 'text-green-400'}`}>
                {timeAnalysis.timeBlunders.length}
              </div>
              <div className={`text-xs ${theme.text} opacity-70`}>Time Blunders</div>
            </div>
          </div>

          {/* Time Distribution */}
          <div>
            <h4 className={`font-semibold ${theme.text} mb-3`}>Time Distribution by Phase</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-sm ${theme.text} opacity-70`}>Opening</span>
                <span className={`text-sm ${theme.text}`}>{formatTime(timeAnalysis.phaseDistribution.opening)}</span>
              </div>
              <Progress 
                value={(timeAnalysis.phaseDistribution.opening / timeAnalysis.totalTimeUsed) * 100} 
                className="h-2"
              />
              
              <div className="flex items-center justify-between">
                <span className={`text-sm ${theme.text} opacity-70`}>Middlegame</span>
                <span className={`text-sm ${theme.text}`}>{formatTime(timeAnalysis.phaseDistribution.middlegame)}</span>
              </div>
              <Progress 
                value={(timeAnalysis.phaseDistribution.middlegame / timeAnalysis.totalTimeUsed) * 100} 
                className="h-2"
              />
              
              <div className="flex items-center justify-between">
                <span className={`text-sm ${theme.text} opacity-70`}>Endgame</span>
                <span className={`text-sm ${theme.text}`}>{formatTime(timeAnalysis.phaseDistribution.endgame)}</span>
              </div>
              <Progress 
                value={(timeAnalysis.phaseDistribution.endgame / timeAnalysis.totalTimeUsed) * 100} 
                className="h-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Positions */}
      {keyPositions.length > 0 && (
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className={`text-lg font-semibold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
              Key Positions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {keyPositions.map((position, index) => (
                <div key={index} className="p-4 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getPositionTypeIcon(position.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`font-semibold ${theme.text}`}>
                          Move {position.moveNumber}
                        </span>
                        <Badge className={`text-xs ${
                          position.type === 'Critical' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' :
                          position.type === 'Turning_Point' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
                          position.type === 'Missed_Opportunity' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                          'bg-green-500/20 text-green-400 border-green-500/30'
                        }`}>
                          {position.type.replace('_', ' ')}
                        </Badge>
                      </div>
                      <div className={`text-sm ${theme.text} opacity-80 mb-2`}>
                        {position.description}
                      </div>
                      <div className={`text-xs ${theme.text} opacity-60`}>
                        Evaluation: {position.evaluation > 0 ? '+' : ''}{position.evaluation.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}