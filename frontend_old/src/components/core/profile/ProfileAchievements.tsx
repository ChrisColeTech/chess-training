import React from 'react'
import { Medal } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import type { ProfileAchievementsProps } from '@/types/profile'
import { getAchievementIcon } from '@/utils/iconHelpers'

export const ProfileAchievements: React.FC<ProfileAchievementsProps> = ({
  achievements,
  getRarityColor,
  calculateProgress,
  theme,
  isLoading = false,
  error = null
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex items-center gap-3 text-white">
          <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          <span>Loading achievements...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="text-red-400 mb-2">Failed to load achievements</div>
        <div className="text-sm text-gray-400">{error.message || 'Please try again later'}</div>
      </div>
    )
  }

  if (!achievements || achievements.length === 0) {
    return (
      <div className="p-6 text-center">
        <Medal size={48} className="mx-auto text-gray-400 mb-4" />
        <div className="text-gray-400 mb-2">No achievements yet</div>
        <div className="text-sm text-gray-500">Start training to unlock achievements!</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {achievements.map((achievement) => {
          const progress = calculateProgress(achievement)
          
          return (
            <Card 
              key={achievement.id} 
              className={`${theme.surface} border-gray-700 shadow-xl ${achievement.unlocked ? 'ring-2 ring-yellow-500/50' : ''}`}
            >
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${getRarityColor(achievement.rarity)} rounded-xl flex items-center justify-center mr-4 ${achievement.unlocked ? 'shadow-lg' : 'opacity-50'}`}>
                    <span className="text-3xl">{getAchievementIcon(achievement.icon)}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <h3 className={`font-semibold ${theme.text} mr-2`}>{achievement.name}</h3>
                      {achievement.unlocked && (
                        <Medal size={16} className="text-yellow-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mb-2">{achievement.description}</p>
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-700 rounded-full h-2 mr-3">
                        <div 
                          className={`bg-gradient-to-r ${getRarityColor(achievement.rarity)} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-400">
                        {achievement.progress}/{achievement.total}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}