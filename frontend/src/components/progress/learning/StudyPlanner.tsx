import React, { useState } from 'react'
import { animated } from '@react-spring/web'
import { Calendar, Clock, Target, CheckCircle, Plus, Edit, Trash, Play, Zap, BookOpen } from 'lucide-react'
import { FaBrain } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import type { StudyPlannerProps, StudySessionPlan } from '@/types/learningPath'

/**
 * Study Planner Component - Interactive study session planning and scheduling
 * Allows users to plan, schedule, and track their study sessions
 */
export const StudyPlanner: React.FC<StudyPlannerProps> = ({
  plannedSessions,
  objectives,
  onSessionModify,
  theme
}) => {
  // Local state for modals and selection
  const [_selectedSession, setSelectedSession] = useState<StudySessionPlan | null>(null)
  const [_showScheduleModal, setShowScheduleModal] = useState(false)

  /**
   * Get intensity styling
   */
  const getIntensityStyle = (intensity: string) => {
    switch (intensity) {
      case 'Tournament Prep':
        return { color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/30' }
      case 'Intensive':
        return { color: 'text-orange-400', bg: 'bg-orange-500/20', border: 'border-orange-500/30' }
      case 'Moderate':
        return { color: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500/30' }
      case 'Light':
        return { color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/30' }
      default:
        return { color: 'text-gray-400', bg: 'bg-gray-500/20', border: 'border-gray-500/30' }
    }
  }

  /**
   * Get content type icon
   */
  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'theory':
        return <BookOpen size={14} />
      case 'practice':
        return <Play size={14} />
      case 'assessment':
        return <Target size={14} />
      case 'review':
        return <CheckCircle size={14} />
      default:
        return <FaBrain size={14} />
    }
  }

  /**
   * Format date for display
   */
  const formatSessionDate = (timestamp: number) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffDays = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Tomorrow'
    if (diffDays < 7) return `In ${diffDays} days`
    
    return date.toLocaleDateString()
  }

  /**
   * Check if session is overdue
   */
  const isSessionOverdue = (timestamp: number) => {
    return timestamp < Date.now()
  }

  /**
   * Sort sessions by date
   */
  const sortedSessions = [...plannedSessions].sort((a, b) => a.plannedStartTime - b.plannedStartTime)
  const upcomingSessions = sortedSessions.filter(session => !isSessionOverdue(session.plannedStartTime))
  const overdueSessions = sortedSessions.filter(session => isSessionOverdue(session.plannedStartTime))

  /**
   * Get objectives progress
   */
  const activeObjectives = objectives.filter(obj => obj.progress.status === 'in_progress')
  const completedObjectives = objectives.filter(obj => obj.progress.status === 'completed')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-3 bg-gradient-to-r ${theme.primary} rounded-lg`}>
            <Calendar size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Study Planner</h2>
            <p className="text-gray-400">Plan and schedule your learning sessions</p>
          </div>
        </div>
        
        <Button
          onClick={() => {/* TODO: Implement schedule modal */}}
          className={`bg-gradient-to-r ${theme.primary} text-white hover:opacity-90`}
        >
          <Plus size={16} className="mr-2" />
          Schedule Session
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${theme.primary} bg-opacity-20`}>
                <Calendar size={20} className="text-white" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Planned Sessions</div>
                <div className="font-semibold text-white">{upcomingSessions.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 bg-opacity-20">
                <Clock size={20} className="text-blue-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Total Hours</div>
                <div className="font-semibold text-white">
                  {Math.round(plannedSessions.reduce((sum, session) => sum + session.estimatedDuration, 0) / 60)}h
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 bg-opacity-20">
                <Target size={20} className="text-emerald-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Active Goals</div>
                <div className="font-semibold text-white">{activeObjectives.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 bg-opacity-20">
                <CheckCircle size={20} className="text-yellow-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Completed</div>
                <div className="font-semibold text-white">{completedObjectives.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Sessions */}
        <div className="lg:col-span-2">
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Clock size={20} />
                Upcoming Sessions
              </CardTitle>
              <CardDescription className="text-gray-400">
                Your scheduled study sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Overdue Sessions */}
                {overdueSessions.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-red-400 flex items-center gap-2">
                      <Zap size={14} />
                      Overdue Sessions
                    </h4>
                    {overdueSessions.map((session, _index) => {
                      const intensityStyle = getIntensityStyle(session.intensity)
                      
                      return (
                        <animated.div
                          key={session.id}
                          className={`p-4 rounded-lg border border-red-500/30 bg-red-500/10`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-medium text-white">{session.title}</h4>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge variant="outline" className="text-red-400 border-red-500/50 text-xs">
                                  Overdue
                                </Badge>
                                <Badge variant="outline" className={`${intensityStyle.color} border-current text-xs`}>
                                  {session.intensity}
                                </Badge>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-white">{session.estimatedDuration}min</div>
                              <div className="text-xs text-gray-500">{formatSessionDate(session.plannedStartTime)}</div>
                            </div>
                          </div>
                          
                          <div className="space-y-2 mb-3">
                            {session.goals.primary.map((goal, idx) => (
                              <div key={idx} className="text-xs text-gray-400">• {goal}</div>
                            ))}
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs border-gray-600 hover:bg-gray-700"
                              onClick={() => onSessionModify(session.id, { plannedStartTime: Date.now() + 60 * 60 * 1000 })}
                            >
                              Reschedule
                            </Button>
                            <Button
                              size="sm"
                              className="text-xs bg-red-600 hover:bg-red-700"
                            >
                              Start Now
                            </Button>
                          </div>
                        </animated.div>
                      )
                    })}
                  </div>
                )}
                
                {/* Upcoming Sessions */}
                {upcomingSessions.slice(0, 5).map((session, _index) => {
                  const intensityStyle = getIntensityStyle(session.intensity)
                  
                  return (
                    <animated.div
                      key={session.id}
                      className={`p-4 rounded-lg border ${intensityStyle.border} ${intensityStyle.bg} hover:shadow-lg transition-all duration-200 cursor-pointer`}
                      onClick={() => setSelectedSession(session)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-white">{session.title}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className={`${intensityStyle.color} border-current text-xs`}>
                              {session.intensity}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {session.plannedContent.length} activities
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-white">{session.estimatedDuration}min</div>
                          <div className="text-xs text-gray-500">{formatSessionDate(session.plannedStartTime)}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-1 mb-3">
                        {session.plannedContent.slice(0, 2).map((content, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-xs text-gray-400">
                            {getContentTypeIcon(content.contentType)}
                            <span className="capitalize">{content.contentType}</span>
                            <span>•</span>
                            <span>{content.estimatedTime}min</span>
                          </div>
                        ))}
                        {session.plannedContent.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{session.plannedContent.length - 2} more activities
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="text-xs text-gray-500">Success target:</div>
                          <div className="text-xs text-white">{session.successMetrics.targetAccuracy}% accuracy</div>
                        </div>
                        
                        <div className="flex space-x-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 w-6 p-0 border-gray-600 hover:bg-gray-700"
                            onClick={(e) => {
                              e.stopPropagation()
                              // Handle edit
                            }}
                          >
                            <Edit size={10} />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 w-6 p-0 border-gray-600 hover:bg-gray-700 text-red-400"
                            onClick={(e) => {
                              e.stopPropagation()
                              // Handle delete
                            }}
                          >
                            <Trash size={10} />
                          </Button>
                        </div>
                      </div>
                    </animated.div>
                  )
                })}
                
                {plannedSessions.length === 0 && (
                  <div className="text-center py-8">
                    <div className="p-4 bg-gray-800 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Calendar size={32} className="text-gray-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">No sessions planned</h3>
                    <p className="text-gray-400 mb-4">
                      Start by scheduling your first study session
                    </p>
                    <Button
                      onClick={() => setShowScheduleModal(true)}
                      className={`bg-gradient-to-r ${theme.primary} text-white`}
                    >
                      <Plus size={16} className="mr-2" />
                      Schedule Session
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Objectives */}
        <div>
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Target size={20} />
                Learning Objectives
              </CardTitle>
              <CardDescription className="text-gray-400">
                Track your progress towards goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {objectives.slice(0, 3).map((objective, _index) => (
                  <animated.div
                    key={objective.id}
                    className="p-3 rounded-lg bg-gray-800 border border-gray-700"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-white text-sm">{objective.title}</h4>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          objective.progress.status === 'completed'
                            ? 'text-green-400 border-green-500/50'
                            : objective.progress.status === 'in_progress'
                            ? 'text-blue-400 border-blue-500/50'
                            : 'text-gray-400 border-gray-500/50'
                        }`}
                      >
                        {objective.progress.status === 'completed' ? 'Done' : 'Active'}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-white">{objective.progress.completion}%</span>
                      </div>
                      <Progress 
                        value={objective.progress.completion} 
                        className="h-1.5 bg-gray-700"
                      />
                    </div>
                    
                    <div className="mt-2 text-xs text-gray-500">
                      {objective.progress.milestones.filter(m => m.completed).length}/{objective.progress.milestones.length} milestones
                    </div>
                  </animated.div>
                ))}
                
                {objectives.length === 0 && (
                  <div className="text-center py-6">
                    <Target size={24} className="text-gray-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">No active objectives</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default StudyPlanner