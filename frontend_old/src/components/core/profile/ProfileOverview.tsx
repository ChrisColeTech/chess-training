import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Gamepad, Trophy, Flame, Clock } from 'lucide-react'
import type { ProfileOverviewProps } from '@/types/profile'
import { getProfileIconComponent } from '@/utils/iconHelpers'

export const ProfileOverview: React.FC<ProfileOverviewProps> = ({
  userStats,
  quickActions,
  onQuickAction,
  theme,
  isLoading = false,
  error = null
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex items-center gap-3 text-white">
          <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          <span>Loading profile overview...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="text-red-400 mb-2">Failed to load profile overview</div>
        <div className="text-sm text-gray-400">{error.message || 'Please try again later'}</div>
      </div>
    )
  }

  if (!userStats || !quickActions) {
    return (
      <div className="p-6 text-center">
        <div className="text-gray-400 mb-2">No profile data available</div>
        <div className="text-sm text-gray-500">Please check your connection and try again.</div>
      </div>
    )
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
              const IconComponent = getProfileIconComponent(action.icon)
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