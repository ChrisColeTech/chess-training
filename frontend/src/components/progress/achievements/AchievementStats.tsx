import React from 'react'
import { Trophy, Target, Star, Flame, TrendingUp, Calendar, Medal, Crown } from 'lucide-react'
import { BadgeDetails } from './BadgeDetails'
import type { AchievementStatsProps } from '@/types/achievements'

/**
 * Achievement Stats Component
 * Comprehensive statistics dashboard for the trophy room
 */
export const AchievementStats: React.FC<AchievementStatsProps> = ({
  stats,
  theme,
  showDetails = true
}) => {
  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'Common': return Target
      case 'Rare': return Trophy
      case 'Epic': return Medal
      case 'Legendary': return Crown
      case 'Mythic': return Star
      default: return Trophy
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-gray-400'
      case 'Rare': return 'text-blue-400'
      case 'Epic': return 'text-purple-400'
      case 'Legendary': return 'text-yellow-400'
      case 'Mythic': return 'text-pink-400'
      default: return 'text-slate-400'
    }
  }

  return (
    <div className="space-y-6">
      {/* Main Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Achievements */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${theme.primary} bg-opacity-20`}>
              <Trophy size={24} className={theme.text} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-400">Total Earned</h3>
              <p className="text-2xl font-bold text-white">
                {formatNumber(stats.completedAchievements)}
                <span className="text-sm text-slate-400 ml-1">
                  / {formatNumber(stats.totalAchievements)}
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-slate-700/50 rounded-full h-2 overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${theme.primary} transition-all duration-1000`}
                style={{ width: `${stats.completionRate}%` }}
              />
            </div>
            <span className="text-sm font-medium text-slate-300">
              {stats.completionRate}%
            </span>
          </div>
        </div>

        {/* Total XP */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${theme.secondary} bg-opacity-20`}>
              <Star size={24} className={theme.text} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-400">Experience Points</h3>
              <p className="text-2xl font-bold text-white">
                {formatNumber(stats.totalXpEarned)}
                <span className="text-sm text-yellow-400 ml-1">XP</span>
              </p>
            </div>
          </div>
          <div className="text-xs text-slate-500">
            Avg. {Math.round(stats.totalXpEarned / Math.max(stats.completedAchievements, 1))} XP per achievement
          </div>
        </div>

        {/* Current Streak */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${theme.accent} bg-opacity-20`}>
              <Flame size={24} className="text-orange-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-400">Current Streak</h3>
              <p className="text-2xl font-bold text-white">
                {stats.currentStreak}
                <span className="text-sm text-slate-400 ml-1">days</span>
              </p>
            </div>
          </div>
          <div className="text-xs text-slate-500">
            Best: {stats.longestStreak} days
          </div>
        </div>

        {/* Average Difficulty */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${theme.highlight} bg-opacity-20`}>
              <TrendingUp size={24} className={theme.text} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-400">Avg. Difficulty</h3>
              <p className="text-2xl font-bold text-white">
                {stats.averageDifficulty.toFixed(1)}
                <span className="text-sm text-slate-400 ml-1">/ 5.0</span>
              </p>
            </div>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                size={12}
                fill={i < Math.round(stats.averageDifficulty) ? 'currentColor' : 'none'}
                className={i < Math.round(stats.averageDifficulty) ? 'text-yellow-400' : 'text-slate-600'}
              />
            ))}
          </div>
        </div>
      </div>

      {showDetails && (
        <>
          {/* Rarity Breakdown */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Medal size={20} className={theme.text} />
              Trophy Collection by Rarity
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {Object.entries(stats.byRarity).map(([rarity, data]) => {
                const IconComponent = getRarityIcon(rarity)
                const rarityColor = getRarityColor(rarity)
                
                return (
                  <div key={rarity} className="text-center">
                    <div className="mb-3">
                      <IconComponent size={32} className={`${rarityColor} mx-auto mb-2`} />
                      <h4 className={`text-sm font-bold ${rarityColor}`}>{rarity}</h4>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xl font-bold text-white">
                        {data.completed}
                        <span className="text-sm text-slate-400">/{data.total}</span>
                      </p>
                      <div className="w-full bg-slate-700/50 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${rarityColor === 'text-gray-400' ? 'from-gray-400 to-gray-600' :
                            rarityColor === 'text-blue-400' ? 'from-blue-400 to-blue-600' :
                            rarityColor === 'text-purple-400' ? 'from-purple-400 to-purple-600' :
                            rarityColor === 'text-yellow-400' ? 'from-yellow-400 to-orange-500' :
                            'from-pink-400 to-purple-500'}`}
                          style={{ width: `${data.rate}%` }}
                        />
                      </div>
                      <p className="text-sm text-slate-400">{data.rate}%</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Progress by Category</h3>
              <div className="space-y-4">
                {Object.entries(stats.byCategory).map(([category, data]) => (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"></div>
                      <span className="text-sm font-medium text-slate-300">{category}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 min-w-[100px] bg-slate-700/50 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-1000"
                          style={{ width: `${data.rate}%` }}
                        />
                      </div>
                      <span className="text-sm text-slate-400 min-w-[80px]">
                        {data.completed}/{data.total} ({data.rate}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {/* Recent Achievements */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Calendar size={20} className={theme.text} />
                  Recent Trophies
                </h3>
                {stats.recentlyEarned.length > 0 ? (
                  <div className="space-y-3">
                    {stats.recentlyEarned.slice(0, 5).map((achievement) => (
                      <div key={achievement.id} className="flex items-center gap-3">
                        <BadgeDetails
                          achievement={achievement}
                          size="small"
                          theme={theme}
                          showEffects={false}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">{achievement.title}</p>
                          <p className="text-xs text-slate-400">
                            {achievement.earnedAt?.toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-xs text-yellow-400 font-medium">
                          +{achievement.reward.xp} XP
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 text-sm">No recent achievements</p>
                )}
              </div>

              {/* Close to Completion */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Target size={20} className={theme.text} />
                  Almost There!
                </h3>
                {stats.nearCompletion.length > 0 ? (
                  <div className="space-y-3">
                    {stats.nearCompletion.slice(0, 3).map((achievement) => (
                      <div key={achievement.id} className="flex items-center gap-3">
                        <BadgeDetails
                          achievement={achievement}
                          size="small"
                          theme={theme}
                          showEffects={false}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">{achievement.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex-1 bg-slate-700/50 rounded-full h-1.5">
                              <div 
                                className={`h-1.5 rounded-full bg-gradient-to-r ${theme.accent} transition-all duration-1000`}
                                style={{ width: `${achievement.progress}%` }}
                              />
                            </div>
                            <span className="text-xs text-slate-400">{achievement.progress}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 text-sm">All achievements completed or far from completion</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default AchievementStats