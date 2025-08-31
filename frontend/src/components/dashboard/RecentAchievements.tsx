import React from 'react'
import { Trophy, Star, Target, Crown } from 'lucide-react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { useDashboard } from '../../hooks/useDashboard'

export const RecentAchievements: React.FC = () => {
  const { achievements, isLoading } = useDashboard()

  const getAchievementIcon = (iconName: string) => {
    const iconMap = {
      'trophy': Trophy,
      'star': Star, 
      'target': Target,
      'crown': Crown
    }
    return iconMap[iconName as keyof typeof iconMap] || Trophy
  }

  // Show recent unlocked achievements or latest progress
  const recentAchievements = achievements?.slice(0, 3) || []

  return (
    <Card className="backdrop-blur-xl bg-black/20 border-white/10 hover:border-white/20 transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Recent Achievements</h2>
          <Trophy className="w-5 h-5 text-yellow-400" />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-white/70">Loading achievements...</div>
        ) : recentAchievements.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {recentAchievements.map((achievement, index) => {
              const IconComponent = getAchievementIcon(achievement.icon || 'trophy')
              return (
                <div key={index} className="flex items-center space-x-2 bg-white/5 rounded-lg px-3 py-2">
                  <IconComponent className="w-4 h-4 text-yellow-400" />
                  <span className="text-white font-medium text-sm">{achievement.name}</span>
                  {achievement.unlock_date && (
                    <span className="text-xs text-white/60">
                      {new Date(achievement.unlock_date).toLocaleDateString()}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-6">
            <Trophy className="w-8 h-8 text-white/50 mx-auto mb-2" />
            <p className="text-white/70">No achievements yet</p>
            <p className="text-sm text-white/60 mt-1">
              Complete games and puzzles to earn achievements
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}