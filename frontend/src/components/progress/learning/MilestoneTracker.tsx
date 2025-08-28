import React, { useState } from 'react'
import { animated, useSpring, useTransition } from '@react-spring/web'
import { Calendar, CheckCircle, Flame, PartyPopper, Sparkles, Star, Target, TrendingUp, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import type { MilestoneTrackerProps, LearningMilestone } from '@/types/learningPath'

/**
 * Milestone Tracker Component - Visual celebration of learning achievements
 * Shows milestones, progress tracking, and achievement celebrations
 */
export const MilestoneTracker: React.FC<MilestoneTrackerProps> = ({
  milestones,
  recentAchievements,
  theme
}) => {
  const [celebratingMilestone, setCelebratingMilestone] = useState<string | null>(null)
  
  /**
   * Get milestone type styling
   */
  const getMilestoneTypeStyle = (type: string) => {
    switch (type) {
      case 'achievement':
        return { color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/30', icon: <Trophy size={16} /> }
      case 'skill_based':
        return { color: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500/30', icon: <Target size={16} /> }
      case 'weekly':
        return { color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/30', icon: <Calendar size={16} /> }
      case 'monthly':
        return { color: 'text-purple-400', bg: 'bg-purple-500/20', border: 'border-purple-500/30', icon: <Star size={16} /> }
      case 'daily':
        return { color: 'text-orange-400', bg: 'bg-orange-500/20', border: 'border-orange-500/30', icon: <Flame size={16} /> }
      default:
        return { color: 'text-gray-400', bg: 'bg-gray-500/20', border: 'border-gray-500/30', icon: <CheckCircle size={16} /> }
    }
  }

  /**
   * Get status styling - Currently unused
   */
  // const getStatusStyle = (status: string) => {
  //   switch (status) {
  //     case 'achieved':
  //       return { color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/50' }
  //     case 'pending':
  //       return { color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/50' }
  //     case 'missed':
  //       return { color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/50' }
  //     default:
  //       return { color: 'text-gray-400', bg: 'bg-gray-500/20', border: 'border-gray-500/50' }
  //   }
  // }

  /**
   * Calculate progress percentage for pending milestones
   */
  const getProgressPercentage = (milestone: LearningMilestone): number => {
    return Math.min(100, Math.max(0, (milestone.criteria.current / milestone.criteria.threshold) * 100))
  }

  /**
   * Handle celebration click - Currently unused
   */
  // const handleCelebrate = (milestoneId: string) => {
  //   setCelebratingMilestone(milestoneId)
  //   onMilestoneCelebrate(milestoneId)
  //   
  //   // Auto-hide celebration after 3 seconds
  //   setTimeout(() => {
  //     setCelebratingMilestone(null)
  //   }, 3000)
  // }

  /**
   * Format achievement date
   */
  const formatAchievementDate = (timestamp: number | undefined) => {
    if (!timestamp) return 'Not achieved yet'
    
    const date = new Date(timestamp)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    
    return date.toLocaleDateString()
  }

  const achievedMilestones = milestones.filter(m => m.status === 'achieved')
  const pendingMilestones = milestones.filter(m => m.status === 'pending')
  // const missedMilestones = milestones.filter(m => m.status === 'missed') // Unused for now

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className={`p-3 bg-gradient-to-r ${theme.primary} rounded-lg`}>
          <Trophy size={24} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Milestone Tracker</h2>
          <p className="text-gray-400">Celebrate your learning achievements and track progress</p>
        </div>
      </div>

      {/* Achievement Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-emerald-900/50 to-emerald-800/50 border-emerald-700/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">{achievedMilestones.length}</div>
            <div className="text-sm text-emerald-300">Achieved</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-yellow-900/50 to-yellow-800/50 border-yellow-700/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{pendingMilestones.length}</div>
            <div className="text-sm text-yellow-300">In Progress</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-900/50 to-blue-800/50 border-blue-700/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{recentAchievements.length}</div>
            <div className="text-sm text-blue-300">Recent</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-900/50 to-purple-800/50 border-purple-700/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">
              {achievedMilestones.reduce((sum, m) => sum + (m.celebration.rewards.xp || 0), 0)}
            </div>
            <div className="text-sm text-purple-300">Total XP</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Achievements */}
      {recentAchievements.length > 0 && (
        <Card className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-yellow-700/30">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Sparkles size={20} />
              Recent Achievements
            </CardTitle>
            <CardDescription className="text-yellow-200">
              Your latest milestones - well done!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentAchievements.slice(0, 4).map((milestone, index) => {
                const typeStyle = getMilestoneTypeStyle(milestone.type)
                
                const cardSpring = useSpring({
                  opacity: 1,
                  transform: 'scale(1)',
                  from: { opacity: 0, transform: 'scale(0.9)' },
                  delay: index * 100,
                  config: { tension: 200, friction: 20 }
                })

                const overlaySpring = useSpring({
                  loop: { reverse: true },
                  from: { opacity: 0, transform: 'scale(0)' },
                  to: async (next) => {
                    await next({ opacity: 0.5, transform: 'scale(1.2)' })
                    await next({ opacity: 0, transform: 'scale(1)' })
                  },
                  config: { duration: 1000 }
                })
                
                return (
                  <animated.div
                    key={milestone.id}
                    style={cardSpring}
                    className={`p-4 rounded-lg border ${typeStyle.border} ${typeStyle.bg} relative overflow-hidden`}
                  >
                    {/* Celebration animation overlay */}
                    <animated.div
                      className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20"
                      style={overlaySpring}
                    />
                    
                    <div className="relative">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`p-2 rounded-lg ${typeStyle.bg}`}>
                          <span className="text-2xl">{milestone.celebration.icon}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{milestone.title}</h4>
                          <p className="text-xs text-gray-400">{formatAchievementDate(milestone.achievedAt)}</p>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-300 mb-3">{milestone.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-400">
                          +{milestone.celebration.rewards.xp} XP earned
                        </div>
                        <Badge variant="outline" className={`${typeStyle.color} border-current text-xs`}>
                          {milestone.type.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                  </animated.div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pending Milestones */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center gap-2">
            <TrendingUp size={20} />
            Current Goals
          </CardTitle>
          <CardDescription className="text-gray-400">
            Milestones you're working towards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingMilestones.map((milestone, index) => {
              const typeStyle = getMilestoneTypeStyle(milestone.type)
              const progressPercentage = getProgressPercentage(milestone)
              const isCloseToCompletion = progressPercentage >= 90
              
              const pendingSpring = useSpring({
                opacity: 1,
                transform: 'translateY(0px)',
                from: { opacity: 0, transform: 'translateY(20px)' },
                delay: index * 100
              })
              
              return (
                <animated.div
                  key={milestone.id}
                  style={pendingSpring}
                  className={`
                    p-4 rounded-lg border transition-all duration-300
                    ${isCloseToCompletion 
                      ? 'border-yellow-500/50 bg-yellow-500/10 shadow-lg shadow-yellow-500/20' 
                      : `${typeStyle.border} ${typeStyle.bg}`
                    }
                  `}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${typeStyle.bg}`}>
                        <span className="text-xl">{milestone.celebration.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{milestone.title}</h4>
                        <p className="text-sm text-gray-400 mt-1">{milestone.description}</p>
                      </div>
                    </div>
                    
                    <Badge variant="outline" className={`${typeStyle.color} border-current text-xs`}>
                      {milestone.type.replace('_', ' ')}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white">
                        {milestone.criteria.current} / {milestone.criteria.threshold}
                      </span>
                    </div>
                    
                    <div className="space-y-1">
                      <Progress 
                        value={progressPercentage} 
                        className="h-2 bg-gray-800"
                      />
                      <div className="flex justify-between text-xs">
                        <span className={typeStyle.color}>{Math.round(progressPercentage)}% complete</span>
                        {isCloseToCompletion && (
                          <span className="text-yellow-400 font-medium animate-pulse">
                            Almost there! <PartyPopper className="w-4 h-4 inline" />
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      <strong>Reward:</strong> {milestone.celebration.rewards.xp} XP
                      {milestone.celebration.rewards.badges.length > 0 && (
                        <span> + {milestone.celebration.rewards.badges.length} badge{milestone.celebration.rewards.badges.length > 1 ? 's' : ''}</span>
                      )}
                    </div>
                  </div>
                </animated.div>
              )
            })}
            
            {pendingMilestones.length === 0 && (
              <div className="text-center py-8">
                <div className="p-4 bg-gray-800 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle size={32} className="text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">All caught up!</h3>
                <p className="text-gray-400">
                  No pending milestones at the moment. New goals will appear as you progress.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Milestone History */}
      {achievedMilestones.length > 0 && (
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <CheckCircle size={20} />
              Achievement History
            </CardTitle>
            <CardDescription className="text-gray-400">
              Your completed milestones and rewards
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {achievedMilestones.slice(0, 5).map((milestone, index) => {
                const typeStyle = getMilestoneTypeStyle(milestone.type)
                
                const historySpring = useSpring({
                  opacity: 1,
                  transform: 'translateX(0px)',
                  from: { opacity: 0, transform: 'translateX(-20px)' },
                  delay: index * 50
                })
                
                return (
                  <animated.div
                    key={milestone.id}
                    style={historySpring}
                    className="flex items-center space-x-4 p-3 rounded-lg bg-gray-800 border border-gray-700"
                  >
                    <div className={`p-2 rounded-lg ${typeStyle.bg}`}>
                      <span className="text-lg">{milestone.celebration.icon}</span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-white">{milestone.title}</h4>
                        <div className="text-xs text-gray-500">
                          {formatAchievementDate(milestone.achievedAt)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className="text-xs text-gray-400">+{milestone.celebration.rewards.xp} XP</span>
                        {milestone.celebration.rewards.badges.length > 0 && (
                          <span className="text-xs text-yellow-400">
                            {milestone.celebration.rewards.badges.length} badge{milestone.celebration.rewards.badges.length > 1 ? 's' : ''}
                          </span>
                        )}
                        <Badge variant="outline" className={`${typeStyle.color} border-current text-xs`}>
                          {milestone.type.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                    
                    <CheckCircle size={20} className="text-green-400" />
                  </animated.div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Celebration Modal */}
      {useTransition(celebratingMilestone, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
      })((style, item) => item && (
        <animated.div
          style={style}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          {(() => {
            const modalSpring = useSpring({
              transform: 'scale(1)',
              opacity: 1,
              from: { transform: 'scale(0.5)', opacity: 0 },
              config: { tension: 300, friction: 20 }
            })

            const iconSpring = useSpring({
              loop: true,
              from: { transform: 'rotate(0deg) scale(1)' },
              to: async (next) => {
                await next({ transform: 'rotate(10deg) scale(1.1)' })
                await next({ transform: 'rotate(-10deg) scale(1.1)' })
                await next({ transform: 'rotate(0deg) scale(1)' })
              },
              config: { duration: 600 }
            })

            return (
              <animated.div
                style={modalSpring}
                className="bg-gray-900 border border-gray-700 rounded-lg p-8 max-w-md w-full mx-4 text-center"
              >
                <animated.div
                  style={iconSpring}
                  className="text-6xl mb-4"
                >
                  <PartyPopper className="w-4 h-4 inline" />
                </animated.div>
                
                <h3 className="text-2xl font-bold text-white mb-2">Congratulations!</h3>
                <p className="text-gray-400 mb-6">
                  You've achieved a new milestone in your chess learning journey!
                </p>
                
                <Button
                  onClick={() => setCelebratingMilestone(null)}
                  className={`bg-gradient-to-r ${theme.primary} text-white`}
                >
                  Continue Learning
                </Button>
              </animated.div>
            )
          })()}
        </animated.div>
      ))}
    </div>
  )
}

export default MilestoneTracker