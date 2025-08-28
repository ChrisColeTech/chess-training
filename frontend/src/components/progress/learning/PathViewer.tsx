import React from 'react'
import { animated, useSpring } from '@react-spring/web'
import { GitBranch, BarChart3, Calendar, User, Target, Trophy, TrendingUp } from 'lucide-react'
import { FaProjectDiagram } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import type { PathViewerProps } from '@/types/learningPath'

/**
 * Path Viewer Component - Main container for different learning path views
 * Provides navigation between tree, timeline, analytics, and planning views
 */
export const PathViewer: React.FC<PathViewerProps> = ({
  learningPath,
  currentView,
  onViewChange,
  theme
}) => {
  const viewOptions = [
    { id: 'tree', label: 'Skill Tree', icon: <FaProjectDiagram size={16} />, description: 'Interactive skill tree visualization' },
    { id: 'timeline', label: 'Timeline', icon: <GitBranch size={16} />, description: 'Progress timeline and milestones' },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={16} />, description: 'Learning insights and trends' },
    { id: 'planning', label: 'Planning', icon: <Calendar size={16} />, description: 'Study session planning' }
  ]

  if (!learningPath) return null

  const { progress, skillTree, objectives, milestones, analytics } = learningPath

  return (
    <div className="w-full space-y-6">
      {/* Header with user progress overview */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className={`text-xl bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                Your Learning Journey
              </CardTitle>
              <CardDescription className="text-gray-400">
                Personalized chess mastery path • Level {progress.currentLevel}
              </CardDescription>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className={`text-2xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                  {progress.overallCompletion}%
                </div>
                <div className="text-xs text-gray-500">Complete</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-white">
                  {progress.skillsMastered}/{progress.totalSkills}
                </div>
                <div className="text-xs text-gray-500">Skills Mastered</div>
              </div>
            </div>
          </div>
          
          {/* Overall Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Overall Progress</span>
              <span className="text-gray-300">{progress.overallCompletion}%</span>
            </div>
            <Progress 
              value={progress.overallCompletion} 
              className="h-2 bg-gray-800"
            />
          </div>
        </CardHeader>
      </Card>

      {/* View Navigation */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white">View Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {viewOptions.map((option) => (
              <div key={option.id}>
                <Button
                  variant={currentView === option.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onViewChange(option.id as 'tree' | 'timeline' | 'analytics' | 'planning')}
                  className={`
                    w-full h-auto p-4 flex flex-col items-center gap-2 transition-all duration-200
                    ${currentView === option.id 
                      ? `bg-gradient-to-r ${theme.primary} text-white shadow-lg` 
                      : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500'
                    }
                  `}
                >
                  <span className={currentView === option.id ? 'text-white' : 'text-gray-400'}>
                    {option.icon}
                  </span>
                  <div className="text-center">
                    <div className="font-medium text-xs">{option.label}</div>
                    <div className="text-xs opacity-80 mt-1">{option.description}</div>
                  </div>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${theme.primary} bg-opacity-20`}>
                <User size={20} className="text-white" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Current Level</div>
                <div className="font-semibold text-white">{progress.currentLevel}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 bg-opacity-20`}>
                <Target size={20} className="text-emerald-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Active Objectives</div>
                <div className="font-semibold text-white">
                  {objectives.filter(obj => obj.progress.status === 'in_progress').length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 bg-opacity-20`}>
                <Trophy size={20} className="text-yellow-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Achievements</div>
                <div className="font-semibold text-white">
                  {milestones.filter(m => m.status === 'achieved').length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 bg-opacity-20`}>
                <TrendingUp size={20} className="text-purple-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Improvement</div>
                <div className="font-semibold text-white">
                  +{Math.round(analytics.achievements.improvementRate * 100)}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Milestone Preview */}
      {progress.nextMajorMilestone && (
        <Card className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border-indigo-700/50">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-600 rounded-lg">
                <Target size={20} className="text-white" />
              </div>
              <div>
                <CardTitle className="text-lg text-white">Next Major Milestone</CardTitle>
                <CardDescription className="text-indigo-300">
                  {progress.nextMajorMilestone}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm text-gray-300">
                You're making great progress! Keep focusing on your current objectives to reach this milestone.
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Estimated completion</span>
                <span className="text-indigo-300 font-medium">
                  {analytics.predictions.nextMilestone 
                    ? new Date(analytics.predictions.nextMilestone.estimatedDate).toLocaleDateString()
                    : 'Soon'
                  }
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Branch Progress Overview */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white">Learning Branch Progress</CardTitle>
          <CardDescription className="text-gray-400">
            Your progress across different skill areas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {skillTree.branches.map((branch, index) => {
              const branchSpring = useSpring({
                opacity: 1,
                transform: 'translateX(0px)',
                from: { opacity: 0, transform: 'translateX(-20px)' },
                delay: index * 100,
                config: { duration: 300 }
              })
              
              return (
                <animated.div
                  key={branch.id}
                  style={branchSpring}
                  className="space-y-2"
                >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${branch.theme}`} />
                    <span className="text-white font-medium">{branch.name}</span>
                    <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                      {branch.difficulty}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">
                    {branch.completion.skillsMastered}/{branch.completion.totalSkills} skills
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Progress 
                    value={branch.completion.percentage} 
                    className="flex-1 h-2 bg-gray-800"
                  />
                  <span className="text-sm font-medium text-white w-12 text-right">
                    {branch.completion.percentage}%
                  </span>
                </div>
              </animated.div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Learning Preferences */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white">Your Learning Profile</CardTitle>
          <CardDescription className="text-gray-400">
            Personalized learning preferences and focus areas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-white">Focus Areas</h4>
              <div className="flex flex-wrap gap-2">
                {learningPath.preferences.focusAreas.map((area) => (
                  <span
                    key={area}
                    className={`px-3 py-1 bg-gradient-to-r ${theme.primary} bg-opacity-20 text-white text-sm rounded-full border border-white/10`}
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-white">Learning Style</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Learning Style</span>
                  <span className="text-white capitalize">{learningPath.preferences.learningStyle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Pace Preference</span>
                  <span className="text-white capitalize">{learningPath.preferences.pacePreference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Goal Orientation</span>
                  <span className="text-white capitalize">{learningPath.preferences.goalOrientation}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PathViewer