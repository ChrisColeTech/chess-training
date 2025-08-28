import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Trophy, BarChart, Calendar, Star, Target, Brain } from 'lucide-react'

// Import our custom components
import { PlanOverview } from '@/components/study/plans/PlanOverview'
import { LessonViewer } from '@/components/study/plans/LessonViewer'
import { ProgressTracker } from '@/components/study/plans/ProgressTracker'
import { StudyScheduler } from '@/components/study/plans/StudyScheduler'
import { AchievementBadges } from '@/components/study/plans/AchievementBadges'

// Import our custom hook and types
import { useStudyPlans } from '@/hooks/useStudyPlans'
import { useThemeStore } from '@/stores/themeStore'

type StudyPlanTab = 'overview' | 'lesson' | 'progress' | 'schedule' | 'achievements'

/**
 * StudyPlansPage Component
 * Main page for structured learning paths and study plan management
 * Follows TRAINING ACADEMY theme with comprehensive study tools
 */
const StudyPlansPage: React.FC = () => {
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()
  
  const [activeTab, _setActiveTab] = useState<StudyPlanTab>('overview')
  const [sidebarExpanded, setSidebarExpanded] = useState(true)

  const {
    // Data state
    learningPaths,
    studyProgress,
    availableBadges,
    studySchedule,
    recommendations,
    selectedPath,
    currentModule,
    currentLesson,
    isLoading,
    isLessonLoading,
    
    // Actions
    selectPath,
    enrollInPath,
    // selectModule, // Unused for now
    selectLesson,
    // completeLesson, // Unused for now
    updateSchedule,
    navigateToNextLesson,
    navigateToPrevLesson,
    
    // Presentation handlers (business logic extracted to hook)
    handleTabChange,
    handleLessonComplete,
    getTabIcon,
    
    // Error handling
    error,
    clearError
  } = useStudyPlans()

  const tabs = [
    { id: 'overview' as const, label: 'Learning Paths', icon: BookOpen, color: 'blue' },
    { id: 'lesson' as const, label: 'Current Lesson', icon: Brain, color: 'purple' },
    { id: 'progress' as const, label: 'Progress', icon: BarChart, color: 'green' },
    { id: 'schedule' as const, label: 'Schedule', icon: Calendar, color: 'orange' },
    { id: 'achievements' as const, label: 'Achievements', icon: Trophy, color: 'yellow' }
  ]


  if (isLoading) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.background} p-6`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin w-12 h-12 border-3 border-gray-600 border-t-blue-500 rounded-full mx-auto mb-6"></div>
              <h2 className={`text-2xl font-bold ${theme.text} mb-2`}>
                Loading Training Academy...
              </h2>
              <p className={`${theme.text} opacity-60`}>
                Preparing your personalized learning experience
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background}`}>
      {/* Enhanced Gaming Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Particles */}
        <div className={`absolute top-20 left-20 w-32 h-32 bg-gradient-to-br ${theme.accent} rounded-full opacity-10 blur-xl animate-pulse-glow`}></div>
        <div className={`absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br ${theme.highlight} rounded-full opacity-15 blur-2xl animate-pulse-glow animation-delay-1000`}></div>
        <div className={`absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-br ${theme.secondary} rounded-full opacity-10 blur-lg animate-pulse-glow animation-delay-2000`}></div>
        
        {/* Moving Chess Pieces */}
        <div className="absolute top-10 right-10 text-6xl opacity-5 animate-bounce-subtle delay-500">♜</div>
        <div className="absolute bottom-10 left-10 text-5xl opacity-5 animate-bounce-subtle delay-1000">♛</div>
        <div className="absolute top-1/3 right-1/4 text-4xl opacity-5 animate-bounce-subtle delay-1500">♝</div>
      </div>

      <div className="relative z-10 flex h-screen">
        {/* Sidebar Navigation */}
        <div className={`transition-all duration-300 ${
          sidebarExpanded ? 'w-72' : 'w-20'
        } bg-gray-900/80 backdrop-blur border-r border-gray-700`}>
          <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              {sidebarExpanded && (
                <div>
                  <h1 className={`text-xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                    🏛️ Training Academy
                  </h1>
                  <p className="text-sm text-gray-400 mt-1">
                    Master Chess Systematically
                  </p>
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarExpanded(!sidebarExpanded)}
                className="text-gray-400 hover:text-white p-2"
              >
                {sidebarExpanded ? '←' : '→'}
              </Button>
            </div>

            {/* Tab Navigation */}
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? `bg-gradient-to-r ${theme.primary} text-white shadow-lg`
                      : `text-gray-400 hover:text-white hover:bg-gray-800/50`
                  }`}
                >
                  {getTabIcon(tab.id)}
                  {sidebarExpanded && (
                    <span className="font-medium">{tab.label}</span>
                  )}
                  
                  {/* Active indicator dot */}
                  {!sidebarExpanded && activeTab === tab.id && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </button>
              ))}
            </nav>

            {/* Quick Stats - Only when expanded */}
            {sidebarExpanded && (
              <div className="mt-6 pt-6 border-t border-gray-700">
                <h3 className={`text-sm font-semibold ${theme.text} mb-3`}>Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Star size={14} className="text-yellow-400" />
                      <span className="text-gray-400">Level</span>
                    </div>
                    <span className={theme.text}>
                      {Math.floor(studyProgress.totalXP / 1000) + 1}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Target size={14} className="text-blue-400" />
                      <span className="text-gray-400">Streak</span>
                    </div>
                    <span className={theme.text}>{studyProgress.currentStreak}d</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Trophy size={14} className="text-green-400" />
                      <span className="text-gray-400">Badges</span>
                    </div>
                    <span className={theme.text}>{studyProgress.achievements.length}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Current Path Info - Only when expanded */}
            {sidebarExpanded && selectedPath && (
              <div className="mt-6 pt-6 border-t border-gray-700">
                <h3 className={`text-sm font-semibold ${theme.text} mb-3`}>Current Path</h3>
                <Card className="bg-gray-800/50 border-gray-600">
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-lg">{selectedPath.thumbnail}</span>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${theme.text} truncate`}>
                          {selectedPath.title}
                        </p>
                        <p className="text-xs text-gray-400">
                          {selectedPath.completion.modulesCompleted}/{selectedPath.completion.totalModules} modules
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${theme.primary}`}
                        style={{ width: `${selectedPath.completion.progress}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto">
            <div className="p-6">
              {/* Error Display */}
              {error && (
                <Card className="mb-6 bg-red-500/10 border-red-500/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span className="text-red-400 font-medium">{error}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearError}
                        className="text-red-400 hover:bg-red-500/10"
                      >
                        ✕
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Tab Content */}
              <div className="space-y-6">
                {activeTab === 'overview' && (
                  <PlanOverview
                    learningPaths={learningPaths}
                    progress={studyProgress}
                    selectedPath={selectedPath}
                    onPathSelect={selectPath}
                    onEnroll={enrollInPath}
                    theme={theme}
                  />
                )}

                {activeTab === 'lesson' && (
                  <LessonViewer
                    lesson={currentLesson}
                    onLessonComplete={handleLessonComplete}
                    onNextLesson={navigateToNextLesson}
                    onPrevLesson={navigateToPrevLesson}
                    isLoading={isLessonLoading}
                    theme={theme}
                  />
                )}

                {activeTab === 'progress' && (
                  <ProgressTracker
                    progress={studyProgress}
                    currentPath={selectedPath}
                    goals={{
                      dailyTime: studySchedule?.dailyGoal || 30,
                      weeklyTime: studySchedule?.weeklyGoal || 3,
                      monthlyGoals: [
                        'Complete 2 learning modules',
                        'Maintain 14-day study streak',
                        'Achieve 85%+ average lesson score',
                        'Unlock 3 new achievement badges'
                      ]
                    }}
                    theme={theme}
                  />
                )}

                {activeTab === 'schedule' && (
                  <StudyScheduler
                    schedule={studySchedule}
                    onScheduleUpdate={updateSchedule}
                    recommendations={recommendations}
                    theme={theme}
                  />
                )}

                {activeTab === 'achievements' && (
                  <AchievementBadges
                    badges={availableBadges}
                    recentBadges={studyProgress.achievements.slice(-3)}
                    badgeProgress={{
                      'tactical_genius': 75,
                      'endgame_master': 40,
                      'scholar': 60,
                      'grand_master_student': 15,
                      'speed_learner': 85,
                      'perfectionist': 90,
                      'dedication': 23
                    }}
                    theme={theme}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Module Navigation (when lesson is selected) */}
        {activeTab === 'lesson' && selectedPath && currentModule && (
          <div className="w-80 bg-gray-900/80 backdrop-blur border-l border-gray-700 p-4 overflow-y-auto">
            <div className="mb-4">
              <h3 className={`font-semibold ${theme.text} mb-2`}>
                {currentModule.title}
              </h3>
              <p className="text-sm text-gray-400 mb-3">
                {currentModule.description}
              </p>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full bg-gradient-to-r ${theme.secondary}`}
                  style={{ width: `${currentModule.completion.progress}%` }}
                />
              </div>
            </div>

            {/* Lessons List */}
            <div className="space-y-2">
              <h4 className={`text-sm font-medium ${theme.text} mb-3`}>
                Lessons ({currentModule.lessons.length})
              </h4>
              {currentModule.lessons.map((lesson, index) => (
                <button
                  key={lesson.id}
                  onClick={() => lesson.isUnlocked && selectLesson(lesson)}
                  disabled={!lesson.isUnlocked}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                    currentLesson?.id === lesson.id
                      ? `bg-gradient-to-r ${theme.primary} text-white`
                      : lesson.isUnlocked
                        ? 'bg-gray-800/50 hover:bg-gray-800 text-gray-300'
                        : 'bg-gray-800/20 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium">
                          {index + 1}. {lesson.title}
                        </span>
                        {lesson.completion.status === 'completed' && (
                          <Trophy size={12} className="text-yellow-400" />
                        )}
                      </div>
                      <div className="flex items-center space-x-3 text-xs">
                        <span className="text-gray-400">{lesson.estimatedTime}m</span>
                        <Badge className="text-xs bg-gray-700 text-gray-300">
                          {lesson.type}
                        </Badge>
                        {!lesson.isUnlocked && (
                          <span className="text-gray-500">🔒</span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Default export for routing
export default StudyPlansPage
