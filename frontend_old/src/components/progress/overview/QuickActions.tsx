import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, Clock, Flame } from 'lucide-react'
import { soundFX } from '@/utils/soundEffects'
import type { QuickActionsProps } from '@/types/progressOverview'

/**
 * QuickActions Component
 * Displays quick action shortcuts with COMMAND CENTER theme
 * Features HUD-style action buttons with gaming aesthetics
 */
export const QuickActions: React.FC<QuickActionsProps> = ({
  actions,
  isLoading = false,
  maxActions = 6,
  theme
}) => {
  const navigate = useNavigate()

  /**
   * Handle action click with navigation and sound effects
   */
  const handleActionClick = (action: typeof actions[0]) => {
    soundFX.playClick()
    navigate(action.path)
  }

  /**
   * Render loading skeleton
   */
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: maxActions }).map((_, index) => (
          <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-700 rounded-lg"></div>
              <div className="flex-1">
                <div className="w-32 h-4 bg-slate-700 rounded mb-2"></div>
                <div className="w-48 h-3 bg-slate-700 rounded"></div>
              </div>
              <div className="w-4 h-4 bg-slate-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const displayActions = actions.slice(0, maxActions)

  return (
    <div className="space-y-3">
      {displayActions.map((action, index) => (
        <button
          key={action.id}
          onClick={() => handleActionClick(action)}
          className={`
            w-full flex items-center gap-4 p-4 rounded-lg transition-all duration-300 group
            bg-gradient-to-r from-slate-800/60 to-slate-900/60 
            backdrop-blur-sm border border-slate-700/50
            hover:border-slate-600/70 hover:shadow-lg hover:shadow-slate-900/20
            hover:scale-[1.02] active:scale-[0.98]
            text-left relative overflow-hidden
          `}
          style={{
            animationDelay: `${index * 100}ms`
          }}
        >
          {/* Command Center Border Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${theme.accent} opacity-5`}></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-400/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-400/20 to-transparent"></div>
          </div>

          {/* Action Icon */}
          <div className={`
            relative p-3 rounded-lg transition-all duration-300 z-10
            ${action.backgroundColor} group-hover:brightness-110
          `}>
            <action.icon size={20} className={action.color} />
            
            {/* Recommended Badge */}
            {action.isRecommended && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse">
                <div className="absolute inset-0.5 bg-yellow-300 rounded-full animate-ping"></div>
              </div>
            )}

            {/* HUD Corner Lines */}
            <div className="absolute top-0 left-0 w-2 h-2 opacity-30 group-hover:opacity-60 transition-opacity">
              <div className="absolute top-0 left-0 w-full h-px bg-current"></div>
              <div className="absolute top-0 left-0 h-full w-px bg-current"></div>
            </div>
            <div className="absolute bottom-0 right-0 w-2 h-2 opacity-30 group-hover:opacity-60 transition-opacity">
              <div className="absolute bottom-0 right-0 w-full h-px bg-current"></div>
              <div className="absolute bottom-0 right-0 h-full w-px bg-current"></div>
            </div>
          </div>

          {/* Action Details */}
          <div className="flex-1 min-w-0 z-10">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-white text-sm group-hover:text-slate-100 transition-colors">
                {action.title}
              </h4>
              
              {/* Recommended Tag */}
              {action.isRecommended && (
                <div className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                  RECOMMENDED
                </div>
              )}
            </div>
            
            <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors mb-2">
              {action.description}
            </p>

            {/* Action Metadata */}
            <div className="flex items-center gap-3 text-xs text-slate-500">
              {action.estimatedTime && (
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  <span>{action.estimatedTime} min</span>
                </div>
              )}
              
              {action.streak && (
                <div className="flex items-center gap-1 text-orange-400">
                  <Flame size={12} />
                  <span>{action.streak} day streak</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Arrow */}
          <div className="z-10 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
            <ChevronRight size={16} className={action.color} />
          </div>

          {/* HUD Status Indicators */}
          <div className="absolute top-2 right-2 flex items-center gap-1 z-10">
            <div className={`w-1.5 h-1.5 rounded-full ${action.color.replace('text-', 'bg-')} animate-pulse`}></div>
            {action.isRecommended && (
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse animation-delay-300"></div>
            )}
          </div>

          {/* Scan Line Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent animate-scan"></div>
          </div>

          {/* Priority Indicator Bar */}
          <div className="absolute bottom-0 left-0 h-1 bg-slate-700/30 w-full">
            <div 
              className={`h-full bg-gradient-to-r ${theme.accent} transition-all duration-1000`}
              style={{ 
                width: `${(6 - action.priority) * 20}%`,
                animationDelay: `${index * 150}ms`
              }}
            ></div>
          </div>

          {/* Command Center Grid (for high priority actions) */}
          {action.priority <= 2 && (
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-current to-transparent"></div>
              <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-current to-transparent"></div>
              <div className="absolute top-1/3 left-0 h-px w-full bg-gradient-to-r from-transparent via-current to-transparent"></div>
              <div className="absolute bottom-1/3 left-0 h-px w-full bg-gradient-to-r from-transparent via-current to-transparent"></div>
            </div>
          )}
        </button>
      ))}

      {/* Quick Stats Summary */}
      {actions.length > 0 && (
        <div className="mt-6 pt-4 border-t border-slate-700/50">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-lg font-bold text-blue-400">
                {actions.filter(a => a.isRecommended).length}
              </div>
              <div className="text-xs text-slate-400 uppercase tracking-wide">
                Recommended
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-lg font-bold text-purple-400">
                {Math.round(actions.reduce((sum, a) => sum + (a.estimatedTime || 0), 0) / actions.length) || 0}
              </div>
              <div className="text-xs text-slate-400 uppercase tracking-wide">
                Avg Time (min)
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-lg font-bold text-green-400">
                {actions.filter(a => a.streak && a.streak > 0).length}
              </div>
              <div className="text-xs text-slate-400 uppercase tracking-wide">
                Active Streaks
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {actions.length === 0 && !isLoading && (
        <div className="text-center py-8 text-slate-400">
          <div className="mx-auto mb-4 w-12 h-12 rounded-lg bg-slate-700/30 flex items-center justify-center">
            <ChevronRight size={24} className="opacity-50" />
          </div>
          <p className="text-lg font-medium">No quick actions available</p>
          <p className="text-sm">Actions will appear here based on your progress</p>
        </div>
      )}
    </div>
  )
}

export default QuickActions