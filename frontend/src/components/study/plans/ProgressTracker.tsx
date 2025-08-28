import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BarChart, BarChart3, BookOpen, Calendar, CheckCircle, Clock, Flame, Star, Target, Trophy } from 'lucide-react'
import { FaBrain } from 'react-icons/fa'
import type { ProgressTrackerProps } from '@/types/studyPlans'

/**
 * ProgressTracker Component
 * Comprehensive progress tracking with analytics and goal monitoring
 */
export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  progress,
  currentPath,
  goals,
  theme
}) => {
  const getCurrentLevel = () => {
    const baseXP = 1000
    const level = Math.floor(progress.totalXP / baseXP) + 1
    const currentLevelXP = (level - 1) * baseXP
    const nextLevelXP = level * baseXP
    const progressToNext = ((progress.totalXP - currentLevelXP) / baseXP) * 100
    
    return { level, progressToNext, xpToNext: nextLevelXP - progress.totalXP }
  }

  const { level, progressToNext, xpToNext } = getCurrentLevel()

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const getStreakColor = (streak: number) => {
    if (streak >= 30) return 'text-purple-400'
    if (streak >= 14) return 'text-blue-400'
    if (streak >= 7) return 'text-green-400'
    if (streak >= 3) return 'text-yellow-400'
    return 'text-gray-400'
  }

  const getTodayProgress = () => {
    const today = new Date().getDay()
    return progress.stats.weeklyActivity[today] || 0
  }

  const getWeeklyTotal = () => {
    return progress.stats.weeklyActivity.reduce((sum, minutes) => sum + minutes, 0)
  }

  const weeklyGoalProgress = (getWeeklyTotal() / (goals.weeklyTime * 60)) * 100
  const dailyGoalProgress = (getTodayProgress() / goals.dailyTime) * 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
          <BarChart3 className="w-4 h-4 inline" /> Progress Tracker
        </h2>
        <p className={`${theme.text} opacity-60`}>
          Monitor your learning journey and stay on track with your goals
        </p>
      </div>

      {/* Level and XP */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className={`text-xl ${theme.text} flex items-center`}>
                <Star size={24} className="mr-2 text-yellow-400" />
                Level {level}
              </CardTitle>
              <CardDescription className="text-gray-400">
                {progress.totalXP.toLocaleString()} total XP • {xpToNext.toLocaleString()} to next level
              </CardDescription>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${theme.text}`}>
                {progress.totalXP.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">Experience Points</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Progress to Level {level + 1}</span>
              <span className={`font-medium ${theme.text}`}>{progressToNext.toFixed(1)}%</span>
            </div>
            <Progress value={progressToNext} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Study Streak and Goals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Flame size={24} className={getStreakColor(progress.currentStreak)} />
              <div>
                <div className={`text-xl font-bold ${theme.text}`}>
                  {progress.currentStreak}
                </div>
                <div className="text-sm text-gray-400">Day Streak</div>
                <div className="text-xs text-gray-500">
                  Best: {progress.longestStreak} days
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Target size={24} className="text-blue-400" />
              <div>
                <div className={`text-xl font-bold ${theme.text}`}>
                  {dailyGoalProgress.toFixed(0)}%
                </div>
                <div className="text-sm text-gray-400">Daily Goal</div>
                <div className="text-xs text-gray-500">
                  {getTodayProgress()}/{goals.dailyTime} min
                </div>
              </div>
            </div>
            <Progress value={dailyGoalProgress} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Calendar size={24} className="text-green-400" />
              <div>
                <div className={`text-xl font-bold ${theme.text}`}>
                  {weeklyGoalProgress.toFixed(0)}%
                </div>
                <div className="text-sm text-gray-400">Weekly Goal</div>
                <div className="text-xs text-gray-500">
                  {Math.round(getWeeklyTotal() / 60)}/{goals.weeklyTime}h
                </div>
              </div>
            </div>
            <Progress value={weeklyGoalProgress} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Current Path Progress */}
      {currentPath && (
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className={`text-lg ${theme.text} flex items-center`}>
              <BookOpen size={20} className="mr-2" />
              Current Learning Path
            </CardTitle>
            <CardDescription>
              {currentPath.title} • {currentPath.targetLevel} Level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className={`${theme.text} opacity-80`}>Overall Progress</span>
                <span className={`font-medium ${theme.text}`}>
                  {currentPath.completion.progress}%
                </span>
              </div>
              <Progress value={currentPath.completion.progress} className="h-3" />
              
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <div className={`text-lg font-semibold ${theme.text}`}>
                    {currentPath.completion.modulesCompleted}
                  </div>
                  <div className="text-gray-400">Modules Done</div>
                </div>
                <div>
                  <div className={`text-lg font-semibold ${theme.text}`}>
                    {currentPath.completion.totalModules}
                  </div>
                  <div className="text-gray-400">Total Modules</div>
                </div>
                <div>
                  <div className={`text-lg font-semibold ${theme.text}`}>
                    {currentPath.totalHours}h
                  </div>
                  <div className="text-gray-400">Estimated Time</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weekly Activity Chart */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className={`text-lg ${theme.text} flex items-center`}>
            <BarChart size={20} className="mr-2" />
            Weekly Activity
          </CardTitle>
          <CardDescription>
            Daily study time for the past 7 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 h-32">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => {
              const minutes = progress.stats.weeklyActivity[index] || 0
              const height = Math.max((minutes / Math.max(...progress.stats.weeklyActivity)) * 100, 5)
              const isToday = new Date().getDay() === index
              
              return (
                <div key={day} className="flex flex-col items-center">
                  <div className="flex-1 flex items-end mb-2">
                    <div
                      className={`w-8 rounded-t transition-all duration-300 ${
                        isToday 
                          ? `bg-gradient-to-t ${theme.primary}` 
                          : minutes > 0 
                            ? 'bg-gradient-to-t from-blue-600 to-blue-400'
                            : 'bg-gray-700'
                      }`}
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-400 text-center">
                    <div className={isToday ? 'font-semibold text-blue-400' : ''}>{day}</div>
                    <div className="text-gray-500">{minutes}m</div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Study Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle size={20} className="text-green-400" />
            </div>
            <div className={`text-lg font-bold ${theme.text}`}>
              {progress.stats.lessonsCompleted}
            </div>
            <div className="text-sm text-gray-400">Lessons Completed</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <FaBrain size={20} className="text-purple-400" />
            </div>
            <div className={`text-lg font-bold ${theme.text}`}>
              {progress.stats.averageScore.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-400">Average Score</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock size={20} className="text-blue-400" />
            </div>
            <div className={`text-lg font-bold ${theme.text}`}>
              {formatTime(progress.totalStudyTime)}
            </div>
            <div className="text-sm text-gray-400">Total Study Time</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Trophy size={20} className="text-yellow-400" />
            </div>
            <div className={`text-lg font-bold ${theme.text}`}>
              {progress.achievements.length}
            </div>
            <div className="text-sm text-gray-400">Achievements</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Achievements */}
      {progress.achievements.length > 0 && (
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className={`text-lg ${theme.text} flex items-center`}>
              <Trophy size={20} className="mr-2 text-yellow-400" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {progress.achievements.slice(-3).map((badge) => (
                <div key={badge.id} className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                  <div className="text-2xl">{badge.icon}</div>
                  <div className="flex-1">
                    <div className={`font-semibold ${theme.text}`}>{badge.name}</div>
                    <div className="text-sm text-gray-400">{badge.description}</div>
                  </div>
                  <Badge className={`${
                    badge.type === 'diamond' ? 'bg-purple-500/20 text-purple-400' :
                    badge.type === 'platinum' ? 'bg-gray-300/20 text-gray-300' :
                    badge.type === 'gold' ? 'bg-yellow-500/20 text-yellow-400' :
                    badge.type === 'silver' ? 'bg-gray-400/20 text-gray-400' :
                    'bg-orange-500/20 text-orange-400'
                  }`}>
                    {badge.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Monthly Goals */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className={`text-lg ${theme.text} flex items-center`}>
            <Target size={20} className="mr-2" />
            Monthly Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {goals.monthlyGoals.map((goal, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle size={16} className="text-gray-400" />
                <span className={`${theme.text} opacity-80`}>{goal}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}