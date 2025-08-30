import React from 'react'
import { BarChart3, Calendar, TrendingUp, Activity } from 'lucide-react'
import type { ProgressChartsProps } from '@/types/progressOverview'

/**
 * ProgressCharts Component
 * Displays rating progress and activity charts with COMMAND CENTER theme
 * Features HUD-style data visualization and interactive elements
 */
export const ProgressCharts: React.FC<ProgressChartsProps> = ({
  ratingHistory,
  activityData,
  isLoading = false,
  timePeriod
}) => {

  /**
   * Calculate rating chart dimensions and data
   */
  const ratingChartData = React.useMemo(() => {
    if (!ratingHistory.length) return { data: [], minRating: 0, maxRating: 0 }
    
    const ratings = ratingHistory.map(h => h.rating)
    const minRating = Math.min(...ratings)
    const maxRating = Math.max(...ratings)
    const range = maxRating - minRating || 100
    
    return {
      data: ratingHistory.map(h => ({
        ...h,
        height: Math.max(20, ((h.rating - minRating) / range) * 100)
      })),
      minRating,
      maxRating,
      totalGain: maxRating - minRating
    }
  }, [ratingHistory])

  /**
   * Calculate activity chart data
   */
  const activityChartData = React.useMemo(() => {
    if (!activityData.length) return { maxPuzzles: 0, maxStudy: 0, totalActivity: 0 }
    
    const maxPuzzles = Math.max(...activityData.map(d => d.puzzles)) || 1
    const maxStudy = Math.max(...activityData.map(d => d.studyTime)) || 1
    const totalActivity = activityData.reduce((sum, d) => sum + d.totalTime, 0)
    
    return { maxPuzzles, maxStudy, totalActivity }
  }, [activityData])

  /**
   * Render loading skeleton
   */
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 animate-pulse">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 bg-slate-700 rounded"></div>
              <div className="w-32 h-5 bg-slate-700 rounded"></div>
            </div>
            <div className="h-64 bg-slate-700/30 rounded-lg"></div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-700/50">
              <div className="w-20 h-4 bg-slate-700 rounded"></div>
              <div className="w-24 h-4 bg-slate-700 rounded"></div>
              <div className="w-20 h-4 bg-slate-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Rating Progress Chart */}
      <div className={`
        relative overflow-hidden rounded-xl transition-all duration-300 group
        bg-gradient-to-br from-slate-800/60 to-slate-900/60 
        backdrop-blur-sm border border-slate-700/50
        hover:border-slate-600/70 command-panel
      `}>
        {/* Command Center Header */}
        <div className="relative z-10 p-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-purple-500/20`}>
                <BarChart3 size={24} className="text-purple-400" />
              </div>
              <span className="uppercase tracking-wide">Rating Progress</span>
            </h3>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span>TRACKING</span>
            </div>
          </div>

          {/* Chart Container */}
          <div className="relative h-64 rounded-lg bg-slate-900/50 border border-slate-700/30 overflow-hidden">
            {/* Grid Lines */}
            <div className="absolute inset-0 opacity-20">
              {Array.from({ length: 5 }).map((_, i) => (
                <div 
                  key={i} 
                  className="absolute w-full border-t border-slate-600/30"
                  style={{ top: `${(i + 1) * 20}%` }}
                ></div>
              ))}
            </div>

            {/* Rating Bars */}
            <div className="h-full flex items-end justify-between gap-1 p-4">
              {ratingChartData.data.map((dataPoint, index) => (
                <div key={dataPoint.date} className="flex-1 flex flex-col items-center group/bar">
                  {/* Bar */}
                  <div 
                    className={`
                      w-full rounded-t-lg transition-all duration-500 hover:brightness-110 relative
                      bg-gradient-to-t from-purple-600 to-purple-400 
                      group-hover/bar:from-purple-500 group-hover/bar:to-purple-300
                    `}
                    style={{ 
                      height: `${dataPoint.height}%`, 
                      minHeight: '8px',
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    {/* Hover Tooltip */}
                    <div className={`
                      absolute -top-8 left-1/2 transform -translate-x-1/2 
                      bg-slate-800 border border-slate-600 px-2 py-1 rounded text-xs text-white 
                      opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap
                      z-20
                    `}>
                      {dataPoint.rating}
                    </div>
                  </div>
                  {/* Label */}
                  <div className="text-xs text-slate-400 mt-2">
                    {dataPoint.label}
                  </div>
                </div>
              ))}
            </div>

            {/* HUD Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-2 left-2 text-xs text-purple-400 font-mono">
                RATING_TRACKER_V2.1
              </div>
              <div className="absolute bottom-2 right-2 text-xs text-slate-500">
                {ratingHistory.length} DATA_POINTS
              </div>
            </div>
          </div>

          {/* Stats Footer */}
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-700/50">
            <div className="text-sm text-slate-400">
              {new Date(ratingHistory[0]?.date).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-green-400" />
              <span className="text-green-400 font-bold">
                +{ratingChartData.totalGain} pts
              </span>
            </div>
            <div className="text-sm text-slate-400">
              {new Date(ratingHistory[ratingHistory.length - 1]?.date).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div className={`
        relative overflow-hidden rounded-xl transition-all duration-300 group
        bg-gradient-to-br from-slate-800/60 to-slate-900/60 
        backdrop-blur-sm border border-slate-700/50
        hover:border-slate-600/70 command-panel
      `}>
        {/* Command Center Header */}
        <div className="relative z-10 p-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-blue-500/20`}>
                <Calendar size={24} className="text-blue-400" />
              </div>
              <span className="uppercase tracking-wide">{timePeriod} Activity</span>
            </h3>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Activity size={12} />
              <span>MONITORING</span>
            </div>
          </div>

          {/* Activity Chart */}
          <div className="relative h-64 rounded-lg bg-slate-900/50 border border-slate-700/30 overflow-hidden">
            <div className="h-full p-4">
              <div className="space-y-3 h-full overflow-y-auto">
                {activityData.slice(-7).map((day, index) => (
                  <div key={day.date} className="flex items-center gap-4">
                    {/* Day Label */}
                    <div className="w-12 text-sm text-slate-400 font-mono">
                      {day.day}
                    </div>
                    
                    {/* Activity Bars */}
                    <div className="flex-1 flex gap-2">
                      {/* Puzzles Bar */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-slate-400">Puzzles</span>
                          <span className="text-xs text-blue-400 font-mono">{day.puzzles}</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div 
                            className={`
                              bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full transition-all duration-500
                            `}
                            style={{ 
                              width: `${(day.puzzles / activityChartData.maxPuzzles) * 100}%`,
                              animationDelay: `${index * 100}ms`
                            }}
                          ></div>
                        </div>
                      </div>
                      
                      {/* Study Time Bar */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-slate-400">Study</span>
                          <span className="text-xs text-purple-400 font-mono">{day.studyTime}m</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div 
                            className={`
                              bg-gradient-to-r from-purple-500 to-purple-400 h-2 rounded-full transition-all duration-500
                            `}
                            style={{ 
                              width: `${(day.studyTime / activityChartData.maxStudy) * 100}%`,
                              animationDelay: `${index * 100 + 50}ms`
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Quality Indicator */}
                    <div className="w-8 text-right">
                      <div className={`text-xs font-bold ${
                        day.quality >= 80 ? 'text-green-400' :
                        day.quality >= 60 ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {day.quality}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* HUD Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-2 left-2 text-xs text-blue-400 font-mono">
                ACTIVITY_MONITOR_V1.3
              </div>
            </div>
          </div>

          {/* Activity Summary */}
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-700/50">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-400">
                {activityData.slice(-7).reduce((sum, day) => sum + day.puzzles, 0)}
              </div>
              <div className="text-xs text-slate-400">Total Puzzles</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-400">
                {Math.round(activityData.slice(-7).reduce((sum, day) => sum + day.studyTime, 0) / 60 * 10) / 10}h
              </div>
              <div className="text-xs text-slate-400">Study Time</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-400">
                {Math.round(activityData.slice(-7).reduce((sum, day) => sum + day.quality, 0) / 7)}%
              </div>
              <div className="text-xs text-slate-400">Avg Quality</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressCharts