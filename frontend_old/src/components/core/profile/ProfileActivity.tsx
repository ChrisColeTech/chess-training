import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import type { ProfileActivityProps } from '@/types/profile'
import { getActivityIcon } from '@/utils/iconHelpers'

export const ProfileActivity: React.FC<ProfileActivityProps> = ({
  recentActivity,
  getActivityIcon: getActivityIconName,
  theme,
  isLoading = false,
  error = null
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex items-center gap-3 text-white">
          <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          <span>Loading recent activity...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="text-red-400 mb-2">Failed to load recent activity</div>
        <div className="text-sm text-gray-400">{error.message || 'Please try again later'}</div>
      </div>
    )
  }

  if (!recentActivity || recentActivity.length === 0) {
    return (
      <div className="p-6 text-center">
        <div className="text-gray-400 mb-2">No recent activity</div>
        <div className="text-sm text-gray-500">Start training to see your activity here!</div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {recentActivity.map((activity, index) => {
        const iconName = getActivityIconName(activity.type)
        
        return (
          <Card 
            key={index} 
            className={`${theme.surface} border-gray-700 shadow-xl hover:border-gray-600 transition-colors`}
          >
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className={`w-10 h-10 bg-gradient-to-r ${theme.primary} bg-opacity-20 rounded-lg flex items-center justify-center mr-4`}>
                  <span className="text-xl">{getActivityIcon(iconName)}</span>
                </div>
                <div className="flex-1">
                  <p className={`${theme.text} font-medium`}>{activity.description}</p>
                  <p className="text-sm text-gray-400">{activity.time}</p>
                </div>
                <div className={`px-3 py-1 bg-green-500/20 text-green-300 text-xs rounded-full border border-green-500/30`}>
                  {activity.points}
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}