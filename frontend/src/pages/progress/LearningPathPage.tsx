import React, { useState } from 'react'
import { AlertTriangle, ArrowLeft, BarChart3, Calendar, Download, RefreshCw, Settings, Sparkles, Target } from 'lucide-react'
import { FaBrain, FaChessKing, FaProjectDiagram } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  SkillTree,
  PathViewer,
  RecommendationEngine,
  LearningAnalytics,
  StudyPlanner,
  MilestoneTracker
} from '@/components/progress/learning'
import { useThemeStore } from '@/stores/themeStore'
import { useLearningPath } from '@/hooks/useLearningPath'
import { soundFX } from '@/utils/soundEffects'

/**
 * Learning Path Page - Simplified stable version
 * Fixed React hooks violations and reduced complexity for stability
 */
export const LearningPathPage: React.FC = () => {
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()
  
  // Local state for UI (reduced to minimum)
  const [activeTab, setActiveTab] = useState('overview')
  
  // Learning path hook
  const {
    learningPath,
    selectedSkill,
    currentView,
    isLoading,
    isGeneratingRecommendations,
    isUpdatingPath,
    selectSkill,
    focusOnSkill,
    changeView,
    acceptRecommendation,
    dismissRecommendation,
    scheduleStudySession,
    celebrateMilestone,
    refreshRecommendations,
    exportProgress,
    error,
    clearError
  } = useLearningPath()

  // Local handler functions
  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue)
    soundFX.playClick()
  }

  // Loading state - simplified without hooks violations
  if (isLoading) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.background} flex items-center justify-center`}>
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-20 left-20 w-32 h-32 bg-gradient-to-br ${theme.accent} rounded-full opacity-20 blur-xl`} />
          <div className={`absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br ${theme.highlight} rounded-full opacity-25 blur-2xl`} />
        </div>
        
        <Card className="bg-gray-900 border-gray-700 shadow-2xl">
          <CardContent className="p-8">
            <div className="flex flex-col items-center space-y-4">
              <div className={`p-4 bg-gradient-to-r ${theme.primary} rounded-full animate-pulse`}>
                <FaBrain size={32} className="text-white" />
              </div>
              
              <div className="text-center">
                <h2 className="text-xl font-semibold text-white mb-2">
                  Analyzing Your Learning Path
                </h2>
                <p className="text-gray-400">
                  AI is creating your personalized chess mastery roadmap...
                </p>
              </div>
              
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-white rounded-full opacity-30 animate-pulse" />
                <div className="w-2 h-2 bg-white rounded-full opacity-30 animate-pulse animation-delay-200" />
                <div className="w-2 h-2 bg-white rounded-full opacity-30 animate-pulse animation-delay-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!learningPath) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.background} flex items-center justify-center`}>
        <Card className="bg-gray-900 border-gray-700 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="text-red-400 text-6xl mb-4">
              <AlertTriangle size={64} />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Failed to Load Learning Path
            </h2>
            <p className="text-gray-400 mb-4">
              We couldn't load your personalized learning path. Please try again.
            </p>
            <Button
              onClick={() => window.location.reload()}
              className={`bg-gradient-to-r ${theme.primary} text-white`}
            >
              <RefreshCw size={16} className="mr-2" />
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background}`}>
      {/* Simplified Background - no hooks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-10 right-1/4 w-64 h-64 bg-gradient-to-br ${theme.accent} rounded-full opacity-10 blur-3xl`} />
        <div className={`absolute bottom-1/4 left-10 w-48 h-48 bg-gradient-to-br ${theme.highlight} rounded-full opacity-15 blur-2xl`} />
        <div className="absolute top-1/4 left-1/3 text-8xl opacity-5 select-none">
          <FaChessKing />
        </div>
        <div className="absolute bottom-1/3 right-1/4 text-6xl opacity-5 select-none">
          ♞
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
                onClick={() => window.history.back()}
              >
                <ArrowLeft size={16} className="mr-2" />
                Back
              </Button>
              
              <div className="h-6 w-px bg-gray-600" />
              
              <div className="flex items-center space-x-3">
                <div className={`p-2 bg-gradient-to-r ${theme.primary} rounded-lg`}>
                  <FaProjectDiagram size={20} className="text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-white">Learning Path</h1>
                  <div className="text-xs text-gray-400">
                    Level {learningPath.progress.currentLevel} • {learningPath.progress.overallCompletion}% Complete
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={refreshRecommendations}
                disabled={isGeneratingRecommendations}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <RefreshCw size={14} className={`mr-2 ${isGeneratingRecommendations ? 'animate-spin' : ''}`} />
                Refresh AI
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const data = exportProgress()
                  console.log('Exported progress:', data)
                  soundFX.playClick()
                }}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <Download size={14} className="mr-2" />
                Export
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <Settings size={14} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Error Display - simplified without animations */}
      {error && (
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="bg-red-900/50 border border-red-700 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-red-400 text-xl">
                <AlertTriangle size={20} />
              </div>
              <div>
                <div className="font-medium text-red-300">Error</div>
                <div className="text-sm text-red-200">{error}</div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearError}
              className="text-red-300 hover:text-white"
            >
              Dismiss
            </Button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          {/* Tab Navigation */}
          <TabsList className="grid w-full grid-cols-6 bg-gray-900 border border-gray-700">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600"
            >
              <Sparkles size={16} className="mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="tree"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-teal-600"
            >
              <FaProjectDiagram size={16} className="mr-2" />
              Skill Tree
            </TabsTrigger>
            <TabsTrigger
              value="recommendations"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-violet-600"
            >
              <FaBrain size={16} className="mr-2" />
              AI Insights
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600"
            >
              <BarChart3 size={16} className="mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="planning"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-600"
            >
              <Calendar size={16} className="mr-2" />
              Planning
            </TabsTrigger>
            <TabsTrigger
              value="milestones"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-600 data-[state=active]:to-orange-600"
            >
              <Target size={16} className="mr-2" />
              Milestones
            </TabsTrigger>
          </TabsList>

          {/* Tab Contents - simplified without transitions */}
          <div>
            <TabsContent value="overview" className="mt-0">
              <PathViewer
                learningPath={learningPath}
                currentView={currentView}
                onViewChange={changeView}
                theme={theme}
              />
            </TabsContent>

            <TabsContent value="tree" className="mt-0">
              <Card className="bg-gray-900/50 border-gray-700 min-h-[800px]">
                <CardContent className="p-6">
                  <SkillTree
                    skillTree={learningPath.skillTree}
                    selectedSkill={selectedSkill}
                    onSkillSelect={selectSkill}
                    onSkillFocus={focusOnSkill}
                    viewMode={currentView === 'analytics' ? 'progress' : 'overview'}
                    theme={theme}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="mt-0">
              <RecommendationEngine
                recommendations={learningPath.recommendations}
                weakAreas={learningPath.weakAreas}
                onRecommendationAccept={acceptRecommendation}
                onRecommendationDismiss={dismissRecommendation}
                theme={theme}
              />
            </TabsContent>

            <TabsContent value="analytics" className="mt-0">
              <LearningAnalytics
                analytics={learningPath.analytics}
                selectedPeriod="month"
                onPeriodChange={() => {}}
                theme={theme}
              />
            </TabsContent>

            <TabsContent value="planning" className="mt-0">
              <StudyPlanner
                plannedSessions={learningPath.plannedSessions}
                objectives={learningPath.objectives}
                onSessionSchedule={scheduleStudySession}
                onSessionModify={(sessionId, changes) => {
                  console.log('Modifying session:', sessionId, changes)
                  soundFX.playClick()
                }}
                theme={theme}
              />
            </TabsContent>

            <TabsContent value="milestones" className="mt-0">
              <MilestoneTracker
                milestones={learningPath.milestones}
                recentAchievements={learningPath.milestones.filter(m => 
                  m.status === 'achieved' && 
                  m.achievedAt && 
                  (Date.now() - m.achievedAt) < (7 * 24 * 60 * 60 * 1000)
                )}
                onMilestoneCelebrate={celebrateMilestone}
                theme={theme}
              />
            </TabsContent>
          </div>
        </Tabs>
      </main>

      {/* Loading Overlay - simplified */}
      {isUpdatingPath && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className={`p-2 bg-gradient-to-r ${theme.primary} rounded-full`}>
                <RefreshCw size={20} className="text-white animate-spin" />
              </div>
              <div>
                <div className="font-medium text-white">Updating Learning Path</div>
                <div className="text-sm text-gray-400">AI is personalizing your experience...</div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default LearningPathPage