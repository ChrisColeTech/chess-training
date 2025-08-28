import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Target, TrendingUp, Shield, Gamepad, Star, Trophy, Flame, Clock } from 'lucide-react'
import { FaBrain } from 'react-icons/fa'
import type { ProfileOverviewProps } from '@/types/profile'

// Icon mapping for dynamic icon usage
const iconMap = {
  'Target': () => <span><Target className="w-4 h-4 inline" /></span>,
  'FaBrain': () => <span><FaBrain className="w-4 h-4 inline" /></span>, 
  'TrendingUp': TrendingUp,
  'Shield': () => <span><Shield className="w-4 h-4 inline" /></span>,
  'Gamepad2': Gamepad,
  'Star': Star,
  'Trophy': Trophy,
  'Flame': Flame,
  'Clock': Clock
}

export const ProfileOverview: React.FC<ProfileOverviewProps> = ({
  userStats,
  quickActions,
  onQuickAction,
  theme
}) => {
  const getIconComponent = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap]
    return IconComponent || (() => <span><Star className="w-4 h-4 inline" /></span>)
  }

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card className={`${theme.surface} border-gray-700 shadow-xl`}>
        <CardHeader>
          <CardTitle className={`flex items-center ${theme.text}`}>
            <Gamepad size={20} className="mr-2" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => {
              const IconComponent = getIconComponent(action.icon)
              return (
                <div key={index} onClick={() => onQuickAction(action.link)}>
                  <Card className="bg-gray-800/50 border-gray-600 hover:border-gray-500 transition-all duration-300 cursor-pointer group hover:-translate-y-1 hover:shadow-lg">
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform`}>
                          {typeof IconComponent === 'function' ? (
                            <IconComponent size={24} className="text-white" />
                          ) : (
                            <span className="text-2xl">{IconComponent}</span>
                          )}
                        </div>
                        <div>
                          <div className={`font-semibold ${theme.text} group-hover:bg-gradient-to-r group-hover:${theme.gradient} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}>
                            {action.title}
                          </div>
                          <div className="text-sm text-gray-400">{action.description}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Performance Stats */}
      <Card className={`${theme.surface} border-gray-700 shadow-xl`}>
        <CardHeader>
          <CardTitle className={`flex items-center ${theme.text}`}>
            <TrendingUp size={20} className="mr-2" />
            Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-3`}>
                <Trophy size={24} className="text-white" />
              </div>
              <div className={`text-2xl font-bold ${theme.text}`}>{userStats.peakRating}</div>
              <div className="text-sm text-gray-400">Peak Rating</div>
            </div>
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-3`}>
                <Flame size={24} className="text-white" />
              </div>
              <div className={`text-2xl font-bold ${theme.text}`}>{userStats.longestStreak}</div>
              <div className="text-sm text-gray-400">Longest Streak</div>
            </div>
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl flex items-center justify-center mb-3`}>
                <Clock size={24} className="text-white" />
              </div>
              <div className={`text-2xl font-bold ${theme.text}`}>{userStats.studyHours}h</div>
              <div className="text-sm text-gray-400">Study Time</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}