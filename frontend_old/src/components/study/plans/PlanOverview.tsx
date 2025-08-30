import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, CheckCircle, Clock, Lightbulb, Lock, PlayCircle, Star, Target, Trophy, Users } from 'lucide-react'
import type { PlanOverviewProps, LearningPath } from '@/types/studyPlans'

/**
 * PlanOverview Component
 * Displays learning paths with enrollment options and progress tracking
 */
export const PlanOverview: React.FC<PlanOverviewProps> = ({
  learningPaths,
  progress,
  selectedPath,
  onPathSelect,
  onEnroll,
  theme
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-400'
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400'
      case 'Advanced': return 'bg-orange-500/20 text-orange-400'
      case 'Expert': return 'bg-red-500/20 text-red-400'
      case 'Master': return 'bg-purple-500/20 text-purple-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Opening Mastery': return <BookOpen size={20} />
      case 'Tactical Training': return <Target size={20} />
      case 'Endgame Excellence': return <Trophy size={20} />
      case 'Strategic Thinking': return <Star size={20} />
      case 'Attack & Defense': return <PlayCircle size={20} />
      default: return <BookOpen size={20} />
    }
  }

  const renderPathCard = (path: LearningPath) => {
    const userPathProgress = progress.pathProgress[path.id]
    const isSelected = selectedPath?.id === path.id

    return (
      <Card 
        key={path.id}
        className={`relative transition-all duration-300 cursor-pointer group ${
          isSelected 
            ? `ring-2 ring-${theme.accent.split(' ')[1]}/50 bg-${theme.accent.split(' ')[1]}/5` 
            : 'hover:scale-105 hover:shadow-xl'
        } ${
          path.isUnlocked 
            ? 'bg-gray-900/50 border-gray-700' 
            : 'bg-gray-900/20 border-gray-800 opacity-60'
        }`}
        onClick={() => path.isUnlocked && onPathSelect(path)}
      >
        {/* Lock Overlay for Locked Paths */}
        {!path.isUnlocked && (
          <div className="absolute inset-0 bg-gray-900/80 rounded-lg flex items-center justify-center z-10">
            <div className="text-center">
              <Lock size={32} className="mx-auto mb-2 text-gray-500" />
              <p className="text-sm text-gray-400">Locked</p>
              {path.prerequisites.minRating && (
                <p className="text-xs text-gray-500 mt-1">
                  Requires {path.prerequisites.minRating}+ rating
                </p>
              )}
            </div>
          </div>
        )}

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className={`text-3xl ${theme.text}`}>
                {path.thumbnail}
              </div>
              <div>
                <CardTitle className={`text-lg font-bold ${theme.text}`}>
                  {path.title}
                </CardTitle>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className={getDifficultyColor(path.targetLevel)}>
                    {path.targetLevel}
                  </Badge>
                  <div className="flex items-center space-x-1 text-gray-400">
                    {getCategoryIcon(path.category)}
                    <span className="text-xs">{path.category}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {path.isEnrolled && (
              <CheckCircle size={20} className="text-green-400" />
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <CardDescription className={`${theme.text} opacity-80 mb-4 line-clamp-2`}>
            {path.description}
          </CardDescription>

          {/* Progress Bar for Enrolled Paths */}
          {path.isEnrolled && userPathProgress && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className={`text-sm ${theme.text} opacity-80`}>Progress</span>
                <span className={`text-sm font-medium ${theme.text}`}>
                  {userPathProgress.progress}%
                </span>
              </div>
              <Progress 
                value={userPathProgress.progress} 
                className="h-2"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{path.completion.modulesCompleted}/{path.completion.totalModules} modules</span>
                <span>{Math.round(userPathProgress.timeSpent / 60)}h studied</span>
              </div>
            </div>
          )}

          {/* Path Metrics */}
          <div className="grid grid-cols-3 gap-4 mb-4 text-center">
            <div>
              <div className="flex items-center justify-center space-x-1 text-gray-400">
                <Clock size={14} />
                <span className="text-xs">{path.totalHours}h</span>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center space-x-1 text-gray-400">
                <Users size={14} />
                <span className="text-xs">{(path.metrics.enrolledUsers / 1000).toFixed(1)}k</span>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center space-x-1 text-gray-400">
                <Star size={14} />
                <span className="text-xs">{path.metrics.averageRating}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            {path.isEnrolled ? (
              <Button
                size="sm"
                className={`flex-1 bg-gradient-to-r ${theme.primary} text-white hover:opacity-90 transition-opacity`}
                onClick={(e) => {
                  e.stopPropagation()
                  onPathSelect(path)
                }}
              >
                <PlayCircle size={16} className="mr-2" />
                Continue
              </Button>
            ) : path.isUnlocked ? (
              <Button
                size="sm"
                variant="outline"
                className={`flex-1 border-gray-600 ${theme.text} hover:bg-gray-800`}
                onClick={(e) => {
                  e.stopPropagation()
                  onEnroll(path.id)
                }}
              >
                <BookOpen size={16} className="mr-2" />
                Enroll
              </Button>
            ) : (
              <Button
                size="sm"
                disabled
                className="flex-1 bg-gray-700 text-gray-500"
              >
                <Lock size={16} className="mr-2" />
                Locked
              </Button>
            )}
          </div>

          {/* Completion Rate Indicator */}
          <div className="mt-3 pt-3 border-t border-gray-700">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Completion Rate</span>
              <span className={`font-medium ${
                path.metrics.completionRate >= 70 ? 'text-green-400' :
                path.metrics.completionRate >= 50 ? 'text-yellow-400' :
                'text-red-400'
              }`}>
                {path.metrics.completionRate}%
              </span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-1 mt-1">
              <div 
                className={`h-1 rounded-full ${
                  path.metrics.completionRate >= 70 ? 'bg-green-400' :
                  path.metrics.completionRate >= 50 ? 'bg-yellow-400' :
                  'bg-red-400'
                }`}
                style={{ width: `${path.metrics.completionRate}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className={`text-3xl font-bold mb-2 bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
          🏛️ Training Academy
        </h2>
        <p className={`${theme.text} opacity-80 max-w-2xl mx-auto`}>
          Choose your learning path and master chess through structured, progressive training programs. 
          Each path is designed to build skills systematically from fundamentals to advanced concepts.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="p-4 text-center">
            <div className={`text-2xl font-bold ${theme.text}`}>
              {progress.stats.pathsCompleted}
            </div>
            <div className="text-sm text-gray-400">Paths Completed</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="p-4 text-center">
            <div className={`text-2xl font-bold ${theme.text}`}>
              {progress.stats.modulesCompleted}
            </div>
            <div className="text-sm text-gray-400">Modules Done</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="p-4 text-center">
            <div className={`text-2xl font-bold ${theme.text}`}>
              {Math.round(progress.totalStudyTime / 60)}h
            </div>
            <div className="text-sm text-gray-400">Study Time</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="p-4 text-center">
            <div className={`text-2xl font-bold ${theme.text}`}>
              {progress.currentStreak}
            </div>
            <div className="text-sm text-gray-400">Day Streak</div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Paths Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {learningPaths.map(renderPathCard)}
      </div>

      {/* Help Text */}
      <div className={`text-center text-sm ${theme.text} opacity-60 mt-8`}>
        <p>
          <Lightbulb className="w-4 h-4 inline" /> Complete prerequisites to unlock advanced paths. Each path builds upon previous knowledge.
        </p>
      </div>
    </div>
  )
}