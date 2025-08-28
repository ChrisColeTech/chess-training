import React from 'react'
import { Medal, Star, Target, Zap } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import type { ProfileAchievementsProps } from '@/types/profile'
import { FaCrown } from 'react-icons/fa'
import { GiSwordsPower } from 'react-icons/gi'

// Icon mapping for achievement icons
const achievementIconMap = {
  'Target': () => <span><Target className="w-4 h-4 inline" /></span>,
  'Crown': () => <span><FaCrown className="w-4 h-4 inline" /></span>,
  'Zap': () => <span><Zap className="w-4 h-4 inline" /></span>,
  'Sword': () => <span><GiSwordsPower className="w-4 h-4 inline" /></span>
}

export const ProfileAchievements: React.FC<ProfileAchievementsProps> = ({
  achievements,
  getRarityColor,
  calculateProgress,
  theme
}) => {
  const getAchievementIcon = (iconName: string) => {
    const IconComponent = achievementIconMap[iconName as keyof typeof achievementIconMap]
    return IconComponent ? IconComponent() : <span><Star className="w-4 h-4 inline" /></span>
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