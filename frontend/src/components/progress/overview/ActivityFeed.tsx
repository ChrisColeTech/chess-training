import React from 'react'
import { Clock, Target, Trophy, BookOpen, Zap, ChevronRight, Crown } from 'lucide-react'
import type { ActivityFeedProps, SessionType } from '@/types/progressOverview'

/**
 * ActivityFeed Component
 * Displays recent training sessions with COMMAND CENTER theme
 * Features HUD-style session cards with performance indicators
 */
export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  sessions,
  isLoading = false,
  maxSessions = 8,
  theme
}) => {
  /**
   * Get session type icon
   */
  const getSessionIcon = (type: SessionType) => {
    switch (type) {
      case 'puzzle':
        return Target
      case 'game':
        return Trophy
      case 'study':
        return BookOpen
      case 'analysis':
        return Zap
      case 'opening':
        return Zap
      case 'endgame':
        return Crown
      default:
        return Clock
    }
  }

  /**
   * Get session type color
   */
  const getSessionColor = (type: SessionType): string => {
    switch (type) {
      case 'puzzle':
        return 'text-blue-400 bg-blue-500/20'
      case 'game':
        return 'text-green-400 bg-green-500/20'
      case 'study':
        return 'text-purple-400 bg-purple-500/20'
      case 'analysis':
        return 'text-yellow-400 bg-yellow-500/20'
      case 'opening':
        return 'text-orange-400 bg-orange-500/20'
      case 'endgame':
        return 'text-indigo-400 bg-indigo-500/20'
      default:
        return 'text-slate-400 bg-slate-500/20'
    }
  }

  /**
   * Format time ago
   */
  const formatTimeAgo = (timestamp: number): string => {
    const now = Date.now()
    const diff = now - timestamp
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 60) {
      return `${minutes}m ago`
    } else if (hours < 24) {
      return `${hours}h ago`
    } else {
      return `${days}d ago`
    }
  }

  /**
   * Format duration
   */
  const formatDuration = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes}m`
    } else {
      const hours = Math.floor(minutes / 60)
      const mins = minutes % 60
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
    }
  }

  /**
   * Get performance color based on score
   */
  const getPerformanceColor = (score: number): string => {
    if (score >= 90) return 'text-green-400'
    if (score >= 75) return 'text-blue-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  /**
   * Render loading skeleton
   */
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: maxSessions }).map((_, index) => (
          <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-700 rounded-lg"></div>
              <div className="flex-1">
                <div className="w-32 h-4 bg-slate-700 rounded mb-2"></div>
                <div className="w-48 h-3 bg-slate-700 rounded"></div>
              </div>
              <div className="text-right space-y-1">
                <div className="w-12 h-3 bg-slate-700 rounded"></div>
                <div className="w-16 h-3 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const displaySessions = sessions.slice(0, maxSessions)

  return (
    <div className="space-y-3">
      {displaySessions.map((session, index) => {
        const IconComponent = getSessionIcon(session.type)
        const colorClasses = getSessionColor(session.type)
        const [textColor, bgColor] = colorClasses.split(' ')

        return (
          <div
            key={session.id}
            className={`
              relative overflow-hidden rounded-lg transition-all duration-300 group cursor-pointer
              bg-gradient-to-r from-slate-800/60 to-slate-900/60 
              backdrop-blur-sm border border-slate-700/50
              hover:border-slate-600/70 hover:shadow-lg hover:shadow-slate-900/20
              hover:scale-[1.01] active:scale-[0.99]
            `}
            style={{
              animationDelay: `${index * 50}ms`
            }}
          >
            {/* Command Center Border Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${theme.accent} opacity-5`}></div>
            </div>

            <div className="relative z-10 p-4">
              <div className="flex items-center gap-4">
                {/* Session Icon */}
                <div className={`p-2.5 rounded-lg ${bgColor} transition-colors group-hover:brightness-110`}>
                  <IconComponent size={20} className={textColor} />
                </div>

                {/* Session Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-white text-sm truncate">
                      {session.title}
                    </h4>
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <Clock size={12} />
                      <span>{formatDuration(session.duration)}</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-slate-400 mb-2 line-clamp-1">
                    {session.description}
                  </p>

                  {/* Session Metadata */}
                  <div className="flex items-center gap-4 text-xs">
                    {session.metadata?.puzzlesSolved && (
                      <div className="flex items-center gap-1 text-blue-400">
                        <Target size={12} />
                        <span>{session.metadata.puzzlesSolved} puzzles</span>
                      </div>
                    )}
                    {session.metadata?.gamesPlayed && (
                      <div className="flex items-center gap-1 text-green-400">
                        <Trophy size={12} />
                        <span>{session.metadata.gamesPlayed} game{session.metadata.gamesPlayed !== 1 ? 's' : ''}</span>
                      </div>
                    )}
                    {session.accuracy && (
                      <div className={`flex items-center gap-1 ${getPerformanceColor(session.accuracy)}`}>
                        <span>{session.accuracy}% accuracy</span>
                      </div>
                    )}
                    {session.ratingChange && (
                      <div className={`flex items-center gap-1 ${session.ratingChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        <span>{session.ratingChange > 0 ? '+' : ''}{session.ratingChange}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Performance & Time */}
                <div className="text-right space-y-1 flex-shrink-0">
                  <div className={`text-sm font-bold ${getPerformanceColor(session.score)}`}>
                    {session.score}%
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    {formatTimeAgo(session.timestamp)}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-purple-400">
                    <Zap size={12} />
                    <span>+{session.xpGained} XP</span>
                  </div>
                </div>

                {/* Arrow Indicator */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight size={16} className="text-slate-400" />
                </div>
              </div>

              {/* HUD Status Indicator */}
              <div className="absolute top-2 right-2">
                <div className={`w-2 h-2 rounded-full ${textColor.replace('text-', 'bg-')} animate-pulse`}></div>
              </div>

              {/* Performance Bar */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-700/30">
                <div 
                  className={`h-full bg-gradient-to-r ${theme.accent} transition-all duration-1000`}
                  style={{ 
                    width: `${session.score}%`,
                    animationDelay: `${index * 100}ms`
                  }}
                ></div>
              </div>
            </div>
          </div>
        )
      })}

      {sessions.length > maxSessions && (
        <div className="text-center mt-4">
          <button className={`
            px-4 py-2 rounded-lg border border-slate-600/50 text-slate-300 hover:text-white 
            hover:border-slate-500/70 transition-colors bg-slate-800/30 hover:bg-slate-700/30
          `}>
            View All Sessions ({sessions.length - maxSessions} more)
          </button>
        </div>
      )}

      {sessions.length === 0 && !isLoading && (
        <div className="text-center py-8 text-slate-400">
          <Clock size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">No recent activity</p>
          <p className="text-sm">Start training to see your session history here</p>
        </div>
      )}
    </div>
  )
}

export default ActivityFeed