import React from 'react'
import { Trophy, CheckCircle, Lock, Star, Zap } from 'lucide-react'
import { FaCrown } from 'react-icons/fa'
import type { AchievementSectionProps, AchievementStatus } from '@/types/progressOverview'

/**
 * AchievementSection Component
 * Displays achievement progress with COMMAND CENTER theme
 * Features HUD-style achievement cards with progress indicators
 */
export const AchievementSection: React.FC<AchievementSectionProps> = ({
  achievements,
  isLoading = false,
  maxAchievements = 6,
  showProgress = true,
  theme
}) => {
  /**
   * Get achievement status styling
   */
  const getStatusStyling = (status: AchievementStatus) => {
    switch (status) {
      case 'completed':
        return {
          containerClass: 'bg-green-900/20 border-green-700/50 hover:border-green-600/70',
          iconBg: 'bg-green-600/30 group-hover:bg-green-600/40',
          textColor: 'text-green-400',
          glowClass: 'group-hover:shadow-green-500/20'
        }
      case 'in_progress':
        return {
          containerClass: 'bg-slate-800/50 border-slate-600/50 hover:border-slate-500/70',
          iconBg: 'bg-slate-600/30 group-hover:bg-slate-600/40',
          textColor: 'text-slate-300',
          glowClass: 'group-hover:shadow-slate-500/20'
        }
      case 'locked':
        return {
          containerClass: 'bg-slate-900/30 border-slate-700/30 opacity-60',
          iconBg: 'bg-slate-700/20',
          textColor: 'text-slate-500',
          glowClass: ''
        }
      case 'mastered':
        return {
          containerClass: 'bg-yellow-900/20 border-yellow-700/50 hover:border-yellow-600/70',
          iconBg: 'bg-yellow-600/30 group-hover:bg-yellow-600/40',
          textColor: 'text-yellow-400',
          glowClass: 'group-hover:shadow-yellow-500/20'
        }
      default:
        return {
          containerClass: 'bg-slate-800/50 border-slate-600/50',
          iconBg: 'bg-slate-600/30',
          textColor: 'text-slate-400',
          glowClass: ''
        }
    }
  }

  /**
   * Get rarity styling
   */
  const getRarityColor = (rarity: string): string => {
    switch (rarity) {
      case 'common':
        return 'text-gray-400'
      case 'rare':
        return 'text-blue-400'
      case 'epic':
        return 'text-purple-400'
      case 'legendary':
        return 'text-yellow-400'
      default:
        return 'text-gray-400'
    }
  }

  /**
   * Get rarity glow effect
   */
  const getRarityGlow = (rarity: string): string => {
    switch (rarity) {
      case 'epic':
        return 'animate-pulse-glow'
      case 'legendary':
        return 'animate-pulse-gold'
      default:
        return ''
    }
  }

  /**
   * Render loading skeleton
   */
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: maxAchievements }).map((_, index) => (
          <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-slate-700 rounded-lg"></div>
              <div className="flex-1">
                <div className="w-32 h-4 bg-slate-700 rounded mb-2"></div>
                <div className="w-48 h-3 bg-slate-700 rounded mb-2"></div>
                <div className="w-full h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const displayAchievements = achievements.slice(0, maxAchievements)

  return (
    <div className="space-y-3">
      {displayAchievements.map((achievement, index) => {
        const statusStyle = getStatusStyling(achievement.status)
        const progressPercent = Math.min((achievement.progress / achievement.target) * 100, 100)
        const rarityColor = getRarityColor(achievement.rarity)
        const rarityGlow = getRarityGlow(achievement.rarity)

        return (
          <div
            key={achievement.id}
            className={`
              relative overflow-hidden rounded-lg transition-all duration-300 group cursor-pointer
              ${statusStyle.containerClass} ${statusStyle.glowClass} ${rarityGlow}
              backdrop-blur-sm border 
              hover:scale-[1.01] active:scale-[0.99]
            `}
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            {/* Command Center Border Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${theme.accent} opacity-5`}></div>
            </div>

            <div className="relative z-10 p-4">
              <div className="flex items-center gap-4">
                {/* Achievement Icon */}
                <div className={`relative p-3 rounded-lg ${statusStyle.iconBg} transition-colors`}>
                  <achievement.icon size={24} className={statusStyle.textColor} />
                  
                  {/* Status Indicator */}
                  <div className="absolute -top-1 -right-1">
                    {achievement.status === 'completed' && (
                      <CheckCircle size={16} className="text-green-400 bg-slate-900 rounded-full" />
                    )}
                    {achievement.status === 'locked' && (
                      <Lock size={12} className="text-slate-500 bg-slate-900 rounded-full p-1" />
                    )}
                    {achievement.status === 'mastered' && (
                      <FaCrown size={16} className="text-yellow-400 bg-slate-900 rounded-full" />
                    )}
                  </div>

                  {/* Rarity Indicator */}
                  {achievement.rarity === 'legendary' && (
                    <div className="absolute -bottom-1 -right-1">
                      <Star size={12} className="text-yellow-400 animate-pulse" />
                    </div>
                  )}
                </div>

                {/* Achievement Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-semibold text-sm ${statusStyle.textColor}`}>
                      {achievement.title}
                    </h4>
                    
                    {/* Rarity Badge */}
                    <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${rarityColor} bg-slate-800/50 border border-slate-600/30`}>
                      {achievement.rarity.toUpperCase()}
                    </div>

                    {/* XP Reward */}
                    {achievement.status !== 'locked' && (
                      <div className="flex items-center gap-1 text-xs text-purple-400">
                        <Zap size={12} />
                        <span>+{achievement.xpReward} XP</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-xs text-slate-400 mb-3 line-clamp-2">
                    {achievement.description}
                  </p>

                  {/* Progress Section */}
                  {showProgress && achievement.status !== 'completed' && achievement.status !== 'locked' && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">
                          {achievement.progress.toLocaleString()} / {achievement.target.toLocaleString()}
                        </span>
                        <span className={statusStyle.textColor}>
                          {Math.round(progressPercent)}%
                        </span>
                      </div>
                      
                      <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`
                            h-full bg-gradient-to-r transition-all duration-1000 ease-out
                            ${achievement.rarity === 'legendary' ? 'from-yellow-500 to-yellow-400' :
                              achievement.rarity === 'epic' ? 'from-purple-500 to-purple-400' :
                              achievement.rarity === 'rare' ? 'from-blue-500 to-blue-400' :
                              'from-slate-500 to-slate-400'}
                          `}
                          style={{ 
                            width: `${progressPercent}%`,
                            animationDelay: `${index * 200}ms`
                          }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Requirements (for locked achievements) */}
                  {achievement.status === 'locked' && achievement.requirements && (
                    <div className="mt-2 space-y-1">
                      <p className="text-xs text-slate-500 font-medium">Requirements:</p>
                      {achievement.requirements.map((req, reqIndex) => (
                        <div key={reqIndex} className="flex items-center gap-2 text-xs text-slate-500">
                          <Lock size={10} />
                          <span>{req}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Completion Date */}
                  {achievement.completedAt && (
                    <div className="mt-2 text-xs text-green-400/70">
                      Completed {new Date(achievement.completedAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>

              {/* HUD Status Indicator */}
              <div className="absolute top-2 right-2">
                <div className={`w-2 h-2 rounded-full ${
                  achievement.status === 'completed' ? 'bg-green-400 animate-pulse' :
                  achievement.status === 'in_progress' ? 'bg-blue-400 animate-pulse' :
                  achievement.status === 'locked' ? 'bg-slate-600' :
                  'bg-yellow-400 animate-pulse'
                }`}></div>
              </div>

              {/* Command Center Grid Lines (for legendary achievements) */}
              {achievement.rarity === 'legendary' && (
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-yellow-400 to-transparent"></div>
                  <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-yellow-400 to-transparent"></div>
                  <div className="absolute top-1/4 left-0 h-px w-full bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
                  <div className="absolute bottom-1/4 left-0 h-px w-full bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
                </div>
              )}
            </div>
          </div>
        )
      })}

      {/* View All Button */}
      {achievements.length > maxAchievements && (
        <div className="text-center mt-4">
          <button className={`
            px-4 py-2 rounded-lg border border-slate-600/50 text-slate-300 hover:text-white 
            hover:border-slate-500/70 transition-all duration-300 bg-slate-800/30 hover:bg-slate-700/30
            hover:shadow-lg group
          `}>
            <div className="flex items-center gap-2">
              <Trophy size={16} />
              <span>View All Achievements ({achievements.length - maxAchievements} more)</span>
            </div>
          </button>
        </div>
      )}

      {/* Empty State */}
      {achievements.length === 0 && !isLoading && (
        <div className="text-center py-8 text-slate-400">
          <Trophy size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">No achievements yet</p>
          <p className="text-sm">Start training to unlock your first achievement!</p>
        </div>
      )}
    </div>
  )
}

export default AchievementSection