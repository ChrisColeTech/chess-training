import React from 'react'
import { animated, useSpring, useTransition } from '@react-spring/web'
import { Target, TrendingUp, AlertTriangle, CheckCircle, X, Clock, Star, ArrowRight, Lightbulb } from 'lucide-react'
import { FaBrain } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { RecommendationEngineProps } from '@/types/learningPath'

/**
 * Recommendation Engine Component - AI-powered learning recommendations
 * Shows personalized study suggestions based on progress analysis
 */
export const RecommendationEngine: React.FC<RecommendationEngineProps> = ({
  recommendations,
  weakAreas,
  onRecommendationAccept,
  onRecommendationDismiss,
  theme
}) => {
  /**
   * Get priority color and icon
   */
  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return { color: 'from-red-500 to-red-600', icon: <AlertTriangle size={16} />, bg: 'bg-red-500/20', border: 'border-red-500/30' }
      case 'High':
        return { color: 'from-orange-500 to-orange-600', icon: <TrendingUp size={16} />, bg: 'bg-orange-500/20', border: 'border-orange-500/30' }
      case 'Medium':
        return { color: 'from-blue-500 to-blue-600', icon: <Target size={16} />, bg: 'bg-blue-500/20', border: 'border-blue-500/30' }
      case 'Low':
        return { color: 'from-gray-500 to-gray-600', icon: <Lightbulb size={16} />, bg: 'bg-gray-500/20', border: 'border-gray-500/30' }
      default:
        return { color: 'from-gray-500 to-gray-600', icon: <Target size={16} />, bg: 'bg-gray-500/20', border: 'border-gray-500/30' }
    }
  }

  /**
   * Get recommendation type icon and label
   */
  const getRecommendationType = (type: string) => {
    switch (type) {
      case 'weakness_improvement':
        return { icon: <Target size={16} />, label: 'Weakness Focus', color: 'text-red-400' }
      case 'skill_focus':
        return { icon: <FaBrain size={16} />, label: 'Skill Focus', color: 'text-blue-400' }
      case 'strength_building':
        return { icon: <Star size={16} />, label: 'Strength Building', color: 'text-yellow-400' }
      case 'balanced_practice':
        return { icon: <TrendingUp size={16} />, label: 'Balanced Practice', color: 'text-green-400' }
      case 'exam_prep':
        return { icon: <CheckCircle size={16} />, label: 'Exam Preparation', color: 'text-purple-400' }
      default:
        return { icon: <Lightbulb size={16} />, label: 'General', color: 'text-gray-400' }
    }
  }

  /**
   * Get severity style for weak areas
   */
  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return { color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/50' }
      case 'Significant':
        return { color: 'text-orange-400', bg: 'bg-orange-500/20', border: 'border-orange-500/50' }
      case 'Moderate':
        return { color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/50' }
      case 'Minor':
        return { color: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500/50' }
      default:
        return { color: 'text-gray-400', bg: 'bg-gray-500/20', border: 'border-gray-500/50' }
    }
  }

  const sortedRecommendations = recommendations.sort((a, b) => {
    const priorityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 }
    return priorityOrder[b.priority] - priorityOrder[a.priority]
  })

  const sortedWeakAreas = weakAreas.sort((a, b) => {
    const severityOrder = { 'Critical': 4, 'Significant': 3, 'Moderate': 2, 'Minor': 1 }
    return severityOrder[b.severity] - severityOrder[a.severity]
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className={`p-3 bg-gradient-to-r ${theme.primary} rounded-lg`}>
          <FaBrain size={24} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">AI Learning Recommendations</h2>
          <p className="text-gray-400">Personalized suggestions based on your progress analysis</p>
        </div>
      </div>

      {/* Recommendations */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center gap-2">
            <Lightbulb size={20} />
            Recommended Actions
          </CardTitle>
          <CardDescription className="text-gray-400">
            AI-generated study suggestions tailored to your learning patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {useTransition(sortedRecommendations, {
              from: { opacity: 0, transform: 'translateY(20px)' },
              enter: (_item, index) => ({ opacity: 1, transform: 'translateY(0px)', delay: index * 100 }),
              leave: { opacity: 0, transform: 'translateX(-100px)' }
            })((style, recommendation, _) => {
              const priorityStyle = getPriorityStyle(recommendation.priority)
              const typeInfo = getRecommendationType(recommendation.type)
              
              return (
                <animated.div
                  key={recommendation.id}
                  style={style}
                  className={`
                    p-4 rounded-lg border ${priorityStyle.border} ${priorityStyle.bg}
                    hover:shadow-lg transition-all duration-200
                  `}
                >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 bg-gradient-to-r ${priorityStyle.color} bg-opacity-20 rounded-lg`}>
                          {priorityStyle.icon}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-white">
                              {recommendation.targetSkill.name}
                            </span>
                            <Badge variant="outline" className={`${typeInfo.color} border-current text-xs`}>
                              {typeInfo.label}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {recommendation.priority} Priority
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {Math.round(recommendation.confidence * 100)}% confidence
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onRecommendationDismiss(recommendation.id)}
                          className="h-8 w-8 p-0 border-gray-600 hover:bg-gray-700"
                        >
                          <X size={12} />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-3">
                      <p className="text-gray-300 text-sm">
                        {recommendation.reasoning}
                      </p>
                      
                      {/* Expected Improvement */}
                      <div className="flex items-center space-x-6 text-xs text-gray-400">
                        <div className="flex items-center space-x-1">
                          <TrendingUp size={12} />
                          <span>+{recommendation.expectedImprovement.skillIncrease}% skill</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Target size={12} />
                          <span>+{recommendation.expectedImprovement.masteryGain}% mastery</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock size={12} />
                          <span>{recommendation.expectedImprovement.timeToComplete}h to complete</span>
                        </div>
                      </div>
                      
                      {/* Personalization factors */}
                      <div className="text-xs">
                        <span className="text-gray-500">Based on: </span>
                        <span className="text-gray-400">
                          {[
                            ...recommendation.personalization.basedOnWeaknesses,
                            ...recommendation.personalization.basedOnGoals
                          ].join(', ')}
                        </span>
                      </div>
                      
                      {/* Action Button */}
                      <div className="flex justify-end pt-2">
                        <Button
                          size="sm"
                          onClick={() => onRecommendationAccept(recommendation.id)}
                          className={`bg-gradient-to-r ${priorityStyle.color} text-white hover:opacity-90`}
                        >
                          <span className="mr-2">Accept & Schedule</span>
                          <ArrowRight size={12} />
                        </Button>
                      </div>
                    </div>
                  </animated.div>
                )
              })}
            
            {recommendations.length === 0 && (
              <div className="text-center py-8">
                <div className="p-4 bg-gray-800 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle size={32} className="text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">All caught up!</h3>
                <p className="text-gray-400">
                  No new recommendations at the moment. Keep up the great work!
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Weak Areas Analysis */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center gap-2">
            <AlertTriangle size={20} />
            Areas for Improvement
          </CardTitle>
          <CardDescription className="text-gray-400">
            Identified weak spots that could benefit from focused practice
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedWeakAreas.map((weakArea, index) => {
              const severityStyle = getSeverityStyle(weakArea.severity)
              
              const weakAreaSpring = useSpring({
                opacity: 1,
                transform: 'translateX(0px)',
                from: { opacity: 0, transform: 'translateX(-20px)' },
                delay: index * 100
              })
              
              return (
                <animated.div
                  key={weakArea.id}
                  style={weakAreaSpring}
                  className={`
                    p-4 rounded-lg border ${severityStyle.border} ${severityStyle.bg}
                    hover:shadow-lg transition-all duration-200
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-white">{weakArea.category}</h4>
                        <Badge variant="outline" className={`${severityStyle.color} border-current text-xs`}>
                          {weakArea.severity}
                        </Badge>
                      </div>
                      
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="text-gray-500">Impact: </span>
                          <span className="text-gray-300">
                            Potential +{weakArea.impact.potentialImprovement} rating points
                          </span>
                        </div>
                        
                        <div>
                          <span className="text-gray-500">Patterns identified: </span>
                          <div className="mt-1">
                            {weakArea.analysis.patterns.map((pattern, idx) => (
                              <div key={idx} className="text-xs text-gray-400 ml-2">
                                • {pattern}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-gray-500">Improvement plan: </span>
                          <div className="text-gray-300 mt-1">
                            {weakArea.improvementPlan.expectedOutcome}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Estimated time: {weakArea.improvementPlan.estimatedTime} hours
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xl font-bold text-white">
                        {weakArea.impact.priorityScore.toFixed(1)}
                      </div>
                      <div className="text-xs text-gray-500">Priority Score</div>
                    </div>
                  </div>
                </animated.div>
              )
            })}
            
            {weakAreas.length === 0 && (
              <div className="text-center py-8">
                <div className="p-4 bg-gray-800 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle size={32} className="text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No major weaknesses identified!</h3>
                <p className="text-gray-400">
                  Your skills are well-balanced. Continue with your current learning plan.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default RecommendationEngine