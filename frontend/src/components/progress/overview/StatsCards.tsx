import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import type { StatsCardsProps, TrendDirection } from '@/types/progressOverview'

/**
 * StatsCards Component
 * Displays key performance indicators in a card grid layout
 * Follows COMMAND CENTER gaming aesthetic with HUD-style elements
 */
export const StatsCards: React.FC<StatsCardsProps> = ({
  stats,
  isLoading = false,
  theme
}) => {
  /**
   * Get trend icon component based on direction
   */
  const getTrendIcon = (trend: TrendDirection) => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={16} className="text-green-400" />
      case 'down':
        return <TrendingDown size={16} className="text-red-400" />
      default:
        return null
    }
  }

  /**
   * Get trend color classes
   */
  const getTrendColor = (trend: TrendDirection): string => {
    switch (trend) {
      case 'up':
        return 'text-green-400'
      case 'down':
        return 'text-red-400'
      default:
        return 'text-slate-400'
    }
  }

  /**
   * Render loading skeleton
   */
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 animate-pulse">
            <div className="flex items-center justify-between mb-3">
              <div className="w-5 h-5 bg-slate-700 rounded"></div>
              <div className="w-4 h-4 bg-slate-700 rounded"></div>
            </div>
            <div className="w-16 h-6 bg-slate-700 rounded mb-2"></div>
            <div className="w-20 h-3 bg-slate-700 rounded mb-1"></div>
            <div className="w-24 h-3 bg-slate-700 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat, index) => (
        <div
          key={stat.id}
          className={`
            relative overflow-hidden rounded-xl transition-all duration-300 group
            bg-gradient-to-br from-slate-800/60 to-slate-900/60 
            backdrop-blur-sm border border-slate-700/50
            hover:border-slate-600/70 hover:shadow-lg hover:shadow-slate-900/20
            hover:scale-[1.02] active:scale-[0.98]
            command-panel
          `}
          style={{
            animationDelay: `${index * 100}ms`
          }}
        >
          {/* Command Center Border Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${theme.accent} opacity-10`}></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-400/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-400/30 to-transparent"></div>
          </div>

          <div className="relative z-10 p-4">
            {/* Header with Icon and Trend */}
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${stat.color.replace('text-', 'bg-').replace('-400', '-500/20')}`}>
                <stat.icon size={20} className={stat.color} />
              </div>
              <div className="flex items-center gap-1">
                {getTrendIcon(stat.trend)}
                {stat.tooltip && (
                  <div className="w-1 h-1 rounded-full bg-slate-500 opacity-50"></div>
                )}
              </div>
            </div>

            {/* Main Value */}
            <div className="mb-2">
              <div className="text-2xl font-bold text-white leading-tight">
                {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
              </div>
              {stat.subtitle && (
                <div className="text-xs text-slate-400 mt-1">{stat.subtitle}</div>
              )}
            </div>

            {/* Title */}
            <div className="text-xs font-medium text-slate-300 mb-2 uppercase tracking-wide">
              {stat.title}
            </div>

            {/* Change Indicator */}
            <div className={`text-xs font-medium ${getTrendColor(stat.trend)}`}>
              {stat.change}
            </div>

            {/* HUD-style decoration */}
            <div className="absolute top-2 right-2 w-2 h-2">
              <div className="w-full h-full relative">
                <div className="absolute inset-0 rounded-full bg-slate-600/30"></div>
                <div className={`absolute inset-0.5 rounded-full ${
                  stat.trend === 'up' ? 'bg-green-400/60' :
                  stat.trend === 'down' ? 'bg-red-400/60' :
                  'bg-slate-400/60'
                } animate-pulse`}></div>
              </div>
            </div>

            {/* Command Center Corner Accent */}
            <div className="absolute bottom-0 left-0 w-6 h-6 opacity-20">
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-slate-400 to-transparent"></div>
              <div className="absolute bottom-0 left-0 h-full w-px bg-gradient-to-t from-slate-400 to-transparent"></div>
            </div>
          </div>

          {/* Hover Glow Effect */}
          <div className={`
            absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
            bg-gradient-to-br ${theme.primary} opacity-5
          `}></div>
        </div>
      ))}
    </div>
  )
}

export default StatsCards