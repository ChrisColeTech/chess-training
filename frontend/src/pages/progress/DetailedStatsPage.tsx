import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Activity, AlertTriangle, ArrowLeft, ChartLine, Grid3x3, RefreshCw, Settings, Target, TrendingUp, Users } from 'lucide-react'
import { FaBrain } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { useThemeStore } from '@/stores/themeStore'
import { useDetailedStats } from '@/hooks/useDetailedStats'
import {
  PerformanceMetrics,
  TrendAnalysis,
  WeaknessAnalysis,
  PositionHeatMap,
  ComparativeAnalysis,
  GamePhaseAnalysis
} from '@/components/progress/stats'
import type { AnalyticsTimePeriod } from '@/types/detailedStats'

/**
 * DetailedStatsPage Component
 * Main analytics dashboard with ANALYTICS HUB gaming theme
 * Features comprehensive chess performance analysis with advanced metrics
 */
export const DetailedStatsPage: React.FC = () => {
  const navigate = useNavigate()
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()

  // Use the custom hook for all business logic
  const {
    // Data
    statistics,
    isLoading,
    error,
    
    // UI State
    selectedTimePeriod,
    selectedChartType,
    selectedGamePhase,
    selectedHeatMap,
    
    // Actions
    // setTimePeriod, // Unused for now
    setChartType,
    setGamePhase,
    setHeatMap,
    // refreshData, // Unused for now
    // exportData, // Unused for now
    
    // Error handling
    clearError,
    
    // Computed values
    hasData,
    dataQuality
  } = useDetailedStats()

  // Local handler functions
  const handleNavigation = (path: string) => {
    navigate(path)
  }

  const handleTimePeriodChange = (periodId: string) => {
    // This would update the time period in the hook
    console.log('Time period changed to:', periodId)
  }

  const getDataQualityBadge = () => {
    const qualityColor = dataQuality === 'excellent' ? 'text-green-400' : 
                        dataQuality === 'good' ? 'text-yellow-400' : 'text-red-400'
    return (
      <span className={`text-sm ${qualityColor}`}>
        Quality: {dataQuality}
      </span>
    )
  }

  const handleExport = (format: 'json' | 'csv') => {
    // Export functionality - mockup
    console.log(`Exporting data as ${format}`)
  }

  const handleRefresh = () => {
    // Refresh data - would call refreshData from hook
    console.log('Refreshing data...')
  }

  const handleRecommendationClick = (recommendation: any) => {
    // Handle recommendation click
    console.log('Recommendation clicked:', recommendation)
  }

  if (!hasData && !isLoading) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.background} flex items-center justify-center`}>
        <div className="text-center space-y-4">
          <Activity size={64} className="mx-auto text-slate-500" />
          <h2 className="text-2xl font-bold text-white">No Analytics Data Available</h2>
          <p className="text-slate-400 max-w-md">
            Play more games and solve puzzles to generate detailed statistics and analytics.
          </p>
          <Button
            onClick={() => handleNavigation('/dashboard')}
            className={`bg-gradient-to-r ${theme.primary} hover:opacity-90 text-white`}
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} relative overflow-hidden`}>
      {/* Enhanced Analytics Hub Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary Data Field Effects */}
        <div className={`absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br ${theme.primary} rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-glow`}></div>
        <div className={`absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br ${theme.secondary} rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-glow animation-delay-2000`}></div>
        <div className={`absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br ${theme.accent} rounded-full mix-blend-multiply filter blur-3xl opacity-8 animate-pulse-glow animation-delay-4000`}></div>

        {/* Analytics Grid Lines */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent"></div>
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent"></div>
          <div className="absolute top-1/3 left-0 h-px w-full bg-gradient-to-r from-transparent via-white to-transparent"></div>
          <div className="absolute bottom-1/3 left-0 h-px w-full bg-gradient-to-r from-transparent via-white to-transparent"></div>
        </div>

        {/* Floating Data Points */}
        <div className="absolute top-20 left-20 w-3 h-3 bg-cyan-400/30 rounded-full animate-ping animation-delay-1000"></div>
        <div className="absolute top-32 right-32 w-2 h-2 bg-green-400/40 rounded-full animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-32 left-32 w-4 h-4 border border-blue-400/20 rounded-full animate-bounce animation-delay-3000"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-purple-400/30 rounded-full animate-ping animation-delay-4000"></div>

        {/* Data Stream Effect */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-scan"></div>
      </div>

      <div className="relative z-10 p-6">
        {/* Analytics Hub Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => handleNavigation('/progress')}
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
                <ChartLine size={36} className="text-white" />
                ANALYTICS HUB
              </h1>
              <p className="text-slate-400 mt-1 font-mono text-sm">
                ADVANCED_PERFORMANCE_ANALYSIS_V3.0 // STATUS: {hasData ? 'ACTIVE' : 'STANDBY'}
              </p>
            </div>
          </div>

          {/* Control Panel */}
          <div className="flex items-center gap-3">
            {/* Time Period Selector */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-2">
              <div className="flex gap-2">
                {[
                  { id: '7d' as AnalyticsTimePeriod, label: '7D' },
                  { id: '30d' as AnalyticsTimePeriod, label: '30D' },
                  { id: '90d' as AnalyticsTimePeriod, label: '90D' },
                  { id: '1y' as AnalyticsTimePeriod, label: '1Y' },
                  { id: 'all' as AnalyticsTimePeriod, label: 'ALL' }
                ].map((period) => (
                  <Button
                    key={period.id}
                    onClick={() => handleTimePeriodChange(period.id)}
                    variant={selectedTimePeriod === period.id ? "default" : "ghost"}
                    size="sm"
                    className={`
                      px-3 py-2 rounded-lg font-medium transition-all duration-200
                      ${selectedTimePeriod === period.id
                        ? `bg-gradient-to-r ${theme.primary} text-white border border-slate-500/50 shadow-lg`
                        : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
                      }
                    `}
                  >
                    <span className="text-xs font-mono">{period.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Data Quality Badge */}
            {getDataQualityBadge()}

            {/* Export Button */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-2">
              <div className="flex gap-1">
                <Button
                  onClick={() => handleExport('json')}
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 hover:text-white hover:bg-slate-700/30"
                  title="Export JSON"
                >
                  <span className="text-xs font-mono">JSON</span>
                </Button>
                <Button
                  onClick={() => handleExport('csv')}
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 hover:text-white hover:bg-slate-700/30"
                  title="Export CSV"
                >
                  <span className="text-xs font-mono">CSV</span>
                </Button>
              </div>
            </div>

            {/* Control Buttons */}
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
              title="Refresh Data"
            >
              <RefreshCw size={20} className={isLoading ? 'animate-spin' : ''} />
            </Button>

            <Button
              onClick={() => handleNavigation('/settings')}
              variant="outline"
              size="lg"
              className={`
                p-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl 
                hover:bg-slate-700/50 transition-all duration-200 text-slate-300 hover:text-white
                command-button
              `}
              title="Settings"
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
          {/* Quick Stats Overview */}
          {statistics && (
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className={`
                bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4
                command-panel text-center
              `}>
                <div className="text-2xl font-bold text-blue-400">
                  {statistics.performance.ratingProgression.current}
                </div>
                <div className="text-xs text-slate-400 uppercase">Current Rating</div>
              </div>
              
              <div className={`
                bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4
                command-panel text-center
              `}>
                <div className="text-2xl font-bold text-green-400">
                  {statistics.performance.accuracy.toFixed(1)}%
                </div>
                <div className="text-xs text-slate-400 uppercase">Accuracy</div>
              </div>
              
              <div className={`
                bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4
                command-panel text-center
              `}>
                <div className="text-2xl font-bold text-purple-400">
                  {statistics.summary.totalGames}
                </div>
                <div className="text-xs text-slate-400 uppercase">Games Analyzed</div>
              </div>
              
              <div className={`
                bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4
                command-panel text-center
              `}>
                <div className="text-2xl font-bold text-cyan-400">
                  {statistics.summary.studyHours.toFixed(0)}h
                </div>
                <div className="text-xs text-slate-400 uppercase">Study Time</div>
              </div>
            </section>
          )}

          {/* Performance Metrics */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Target size={24} className="text-blue-400" />
              <h2 className="text-xl font-bold text-white uppercase tracking-wide">
                Performance Analytics
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-slate-600 to-transparent"></div>
              <div className="text-xs text-slate-400 font-mono">
                DETAILED_METRICS
              </div>
            </div>
            {statistics && (
              <PerformanceMetrics
                metrics={statistics.performance}
                isLoading={isLoading}
                timePeriod={selectedTimePeriod}
                theme={theme}
              />
            )}
          </section>

          {/* Trend Analysis */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <TrendingUp size={24} className="text-purple-400" />
              <h2 className="text-xl font-bold text-white uppercase tracking-wide">
                Trend Analysis
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-slate-600 to-transparent"></div>
              <div className="text-xs text-slate-400 font-mono">
                PROGRESSION_DATA
              </div>
            </div>
            {statistics && (
              <TrendAnalysis
                trends={statistics.trends}
                isLoading={isLoading}
                timePeriod={selectedTimePeriod}
                chartType={selectedChartType}
                onChartTypeChange={setChartType}
                theme={theme}
              />
            )}
          </section>

          {/* Analytics Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Weakness Analysis */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <AlertTriangle size={20} className="text-orange-400" />
                <h3 className="text-lg font-bold text-white uppercase tracking-wide">
                  Weakness Analysis
                </h3>
                <div className="h-px flex-1 bg-gradient-to-r from-slate-600 to-transparent"></div>
              </div>
              {statistics && (
                <WeaknessAnalysis
                  weaknesses={statistics.weaknesses}
                  isLoading={isLoading}
                  onRecommendationClick={handleRecommendationClick}
                  theme={theme}
                />
              )}
            </section>

            {/* Game Phase Analysis */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <FaBrain size={20} className="text-green-400" />
                <h3 className="text-lg font-bold text-white uppercase tracking-wide">
                  Phase Analysis
                </h3>
                <div className="h-px flex-1 bg-gradient-to-r from-slate-600 to-transparent"></div>
              </div>
              {statistics && (
                <GamePhaseAnalysis
                  gamePhases={statistics.gamePhases}
                  selectedPhase={selectedGamePhase}
                  onPhaseChange={setGamePhase}
                  isLoading={isLoading}
                  theme={theme}
                />
              )}
            </section>
          </div>

          {/* Position Heat Maps */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Grid3x3 size={24} className="text-cyan-400" />
              <h2 className="text-xl font-bold text-white uppercase tracking-wide">
                Position Analysis
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-slate-600 to-transparent"></div>
              <div className="text-xs text-slate-400 font-mono">
                HEAT_MAP_DATA
              </div>
            </div>
            {statistics && (
              <PositionHeatMap
                heatMaps={statistics.heatMaps}
                selectedMap={selectedHeatMap}
                onMapChange={setHeatMap}
                isLoading={isLoading}
                theme={theme}
              />
            )}
          </section>

          {/* Comparative Analysis */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Users size={24} className="text-yellow-400" />
              <h2 className="text-xl font-bold text-white uppercase tracking-wide">
                Peer Comparison
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-slate-600 to-transparent"></div>
              <div className="text-xs text-slate-400 font-mono">
                COMPARATIVE_METRICS
              </div>
            </div>
            {statistics && (
              <ComparativeAnalysis
                comparative={statistics.comparative}
                isLoading={isLoading}
                theme={theme}
              />
            )}
          </section>

          {/* System Status Footer */}
          <footer className="mt-12 pt-6 border-t border-slate-700/50">
            <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
              <div className="flex items-center gap-4">
                <span>CHESS_ANALYTICS_ENGINE_V3.0</span>
                <span>•</span>
                <span>DATASET: {statistics?.summary.totalGames || 0} GAMES</span>
                <span>•</span>
                <span>LAST_ANALYSIS: {statistics ? new Date(statistics.lastUpdated).toLocaleTimeString() : 'N/A'}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span>ANALYTICS_OPERATIONAL</span>
                </div>
                <span>•</span>
                <span>QUALITY: {dataQuality.toUpperCase()}</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default DetailedStatsPage
