import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Activity, AlertTriangle, ArrowLeft, Calendar, Terminal, RefreshCw, Settings, Target, TrendingUp, Trophy, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useThemeStore } from '@/stores/themeStore'
import { useProgressOverview } from '@/hooks/useProgressOverview'
import { soundFX } from '@/utils/soundEffects'
import {
  StatsCards,
  ProgressCharts,
  ActivityFeed,
  AchievementSection,
  QuickActions
} from '@/components/progress/overview'
import type { TimePeriod } from '@/types/progressOverview'

/**
 * ProgressOverviewPage Component
 * Main progress dashboard with COMMAND CENTER gaming theme
 * Features HUD-style interface with comprehensive progress tracking
 */
export const ProgressOverviewPage: React.FC = () => {
  const navigate = useNavigate()
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()

  // Use the custom hook for all business logic
  const {
    // Data
    performanceAnalytics,
    studyStreak,
    achievements,
    recentSessions,
    activityData,
    
    // UI State
    selectedTimePeriod,
    isLoading,
    
    // Actions
    setTimePeriod,
    refreshData,
    
    // Computed values
    statsCards,
    quickActions,
    
    // Error handling
    error,
    clearError
  } = useProgressOverview()

  // Local handler functions
  const handleNavigation = (path: string) => {
    navigate(path)
  }

  const handleTimePeriodChange = (periodId: string) => {
    setTimePeriod(periodId as TimePeriod)
    soundFX.playClick()
  }

  const handleRefresh = () => {
    refreshData()
    soundFX.playClick()
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} relative overflow-hidden`}>
      {/* Enhanced Command Center Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary Energy Fields */}
        <div className={`absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br ${theme.primary} rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-glow`}></div>
        <div className={`absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br ${theme.secondary} rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-glow animation-delay-2000`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-gradient-to-br ${theme.accent} rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse-glow animation-delay-4000`}></div>

        {/* Command Center Grid Lines */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent"></div>
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent"></div>
          <div className="absolute top-1/4 left-0 h-px w-full bg-gradient-to-r from-transparent via-white to-transparent"></div>
          <div className="absolute top-1/2 left-0 h-px w-full bg-gradient-to-r from-transparent via-white to-transparent"></div>
          <div className="absolute bottom-1/4 left-0 h-px w-full bg-gradient-to-r from-transparent via-white to-transparent"></div>
        </div>

        {/* Floating HUD Elements */}
        <div className="absolute top-20 left-20 w-4 h-4 border-2 border-white/20 rotate-45 animate-bounce animation-delay-1000"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-white/30 rounded-full animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-32 left-40 w-2 h-2 bg-white/25 rounded-full animate-ping animation-delay-3000"></div>
        <div className="absolute bottom-20 right-20 w-5 h-5 border border-white/15 rounded-full animate-pulse animation-delay-4000"></div>

        {/* Scanning Line Effect */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-scan"></div>
      </div>

      <div className="relative z-10 p-6">
        {/* Command Center Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => handleNavigation('/dashboard')}
              variant="outline"
              size="lg"
              className={`
                p-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl 
                hover:bg-slate-700/50 transition-all duration-200 text-slate-300 hover:text-white
                hover:shadow-lg command-button
              `}
            >
              <ArrowLeft size={24} />
            </Button>
            
            <div>
              <h1 className={`text-4xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent flex items-center gap-3`}>
                <Terminal size={36} className="text-white" />
                COMMAND CENTER
              </h1>
              <p className="text-slate-400 mt-1 font-mono text-sm">
                TACTICAL_DASHBOARD_V2.1 // OPERATIONAL STATUS: ACTIVE
              </p>
            </div>
          </div>

          {/* Control Panel */}
          <div className="flex items-center gap-3">
            {/* Time Period Selector */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-2">
              <div className="flex gap-2">
                {[
                  { id: 'week' as TimePeriod, label: 'WEEK', icon: Calendar },
                  { id: 'month' as TimePeriod, label: 'MONTH', icon: TrendingUp },
                  { id: 'year' as TimePeriod, label: 'YEAR', icon: Activity }
                ].map((period) => (
                  <Button
                    key={period.id}
                    onClick={() => handleTimePeriodChange(period.id)}
                    variant={selectedTimePeriod === period.id ? "default" : "ghost"}
                    size="sm"
                    className={`
                      px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2
                      ${selectedTimePeriod === period.id
                        ? `bg-gradient-to-r ${theme.primary} text-white border border-slate-500/50 shadow-lg`
                        : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
                      }
                    `}
                  >
                    <period.icon size={14} />
                    <span className="text-xs font-mono">{period.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Refresh Button */}
            <Button
              onClick={handleRefresh}
              disabled={isLoading}
              variant="outline"
              size="lg"
              className={`
                p-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl 
                hover:bg-slate-700/50 transition-all duration-200 text-slate-300 hover:text-white
                disabled:opacity-50 command-button
              `}
            >
              <RefreshCw size={20} className={isLoading ? 'animate-spin' : ''} />
            </Button>

            {/* Settings Button */}
            <Button
              onClick={() => handleNavigation('/settings')}
              variant="outline"
              size="lg"
              className={`
                p-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl 
                hover:bg-slate-700/50 transition-all duration-200 text-slate-300 hover:text-white
                command-button
              `}
            >
              <Settings size={20} />
            </Button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl animate-slide-down">
            <div className="flex items-center justify-between">
              <p className="text-sm text-red-400"><AlertTriangle className="w-4 h-4 inline" /> SYSTEM ALERT: {error}</p>
              <Button
                onClick={clearError}
                variant="ghost"
                size="sm"
                className="text-red-400 hover:text-red-300"
              >
                Dismiss
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-8">
          {/* Key Performance Indicators */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Target size={24} className="text-blue-400" />
              <h2 className="text-xl font-bold text-white uppercase tracking-wide">
                Performance Metrics
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-slate-600 to-transparent"></div>
              <div className="text-xs text-slate-400 font-mono">
                REAL_TIME_DATA
              </div>
            </div>
            <StatsCards
              stats={statsCards}
              isLoading={isLoading}
              timePeriod={selectedTimePeriod}
              theme={theme}
            />
          </section>

          {/* Progress Visualization */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <TrendingUp size={24} className="text-purple-400" />
              <h2 className="text-xl font-bold text-white uppercase tracking-wide">
                Progress Analysis
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-slate-600 to-transparent"></div>
              <div className="text-xs text-slate-400 font-mono">
                VISUAL_ANALYTICS
              </div>
            </div>
            <ProgressCharts
              ratingHistory={performanceAnalytics.ratingHistory}
              activityData={activityData}
              isLoading={isLoading}
              timePeriod={selectedTimePeriod}
              theme={theme}
            />
          </section>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Achievement Tracking */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <Trophy size={20} className="text-yellow-400" />
                <h3 className="text-lg font-bold text-white uppercase tracking-wide">
                  Achievements
                </h3>
                <div className="h-px flex-1 bg-gradient-to-r from-slate-600 to-transparent"></div>
              </div>
              <div className={`
                bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6
                command-panel hover:border-slate-600/70 transition-colors
              `}>
                <AchievementSection
                  achievements={achievements}
                  isLoading={isLoading}
                  maxAchievements={6}
                  showProgress={true}
                  theme={theme}
                />
              </div>
            </section>

            {/* Activity Feed */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <Zap size={20} className="text-green-400" />
                <h3 className="text-lg font-bold text-white uppercase tracking-wide">
                  Recent Activity
                </h3>
                <div className="h-px flex-1 bg-gradient-to-r from-slate-600 to-transparent"></div>
              </div>
              <div className={`
                bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6
                command-panel hover:border-slate-600/70 transition-colors
              `}>
                <ActivityFeed
                  sessions={recentSessions}
                  isLoading={isLoading}
                  maxSessions={8}
                  theme={theme}
                />
              </div>
            </section>

            {/* Quick Actions */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <Terminal size={20} className="text-blue-400" />
                <h3 className="text-lg font-bold text-white uppercase tracking-wide">
                  Quick Deploy
                </h3>
                <div className="h-px flex-1 bg-gradient-to-r from-slate-600 to-transparent"></div>
              </div>
              <div className={`
                bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6
                command-panel hover:border-slate-600/70 transition-colors
              `}>
                <QuickActions
                  actions={quickActions}
                  isLoading={isLoading}
                  maxActions={6}
                  theme={theme}
                />
              </div>
            </section>
          </div>

          {/* System Status Footer */}
          <footer className="mt-12 pt-6 border-t border-slate-700/50">
            <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
              <div className="flex items-center gap-4">
                <span>CHESS_TRAINING_OS_V2.1</span>
                <span>•</span>
                <span>UPTIME: {studyStreak.current} DAYS</span>
                <span>•</span>
                <span>LAST_SYNC: {new Date().toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span>ALL_SYSTEMS_OPERATIONAL</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default ProgressOverviewPage