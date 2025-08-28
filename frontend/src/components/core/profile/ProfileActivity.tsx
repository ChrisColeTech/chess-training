import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Target, Gamepad, Trophy, Star } from 'lucide-react'
import { FaBrain } from 'react-icons/fa'
import type { ProfileActivityProps } from '@/types/profile'

// Icon mapping for activity types
const activityIconMap = {
  'Target': () => <span><Target className="w-4 h-4 inline" /></span>,
  'Gamepad2': () => <span><Gamepad className="w-4 h-4 inline" /></span>,
  'Trophy': () => <span><Trophy className="w-4 h-4 inline" /></span>,
  'FaBrain': () => <span><FaBrain className="w-4 h-4 inline" /></span>,
  'Star': () => <span><Star className="w-4 h-4 inline" /></span>
}

export const ProfileActivity: React.FC<ProfileActivityProps> = ({
  recentActivity,
  getActivityIcon,
  theme
}) => {
  const getActivityIconComponent = (iconName: string) => {
    const IconComponent = activityIconMap[iconName as keyof typeof activityIconMap]
    return IconComponent ? IconComponent() : <span><Star className="w-4 h-4 inline" /></span>
  }

  return (
    <div className="space-y-4">
      {recentActivity.map((activity, index) => {
        const iconName = getActivityIcon(activity.type)
        
        return (
          <Card 
            key={index} 
            className={`${theme.surface} border-gray-700 shadow-xl hover:border-gray-600 transition-colors`}
          >
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className={`w-10 h-10 bg-gradient-to-r ${theme.primary} bg-opacity-20 rounded-lg flex items-center justify-center mr-4`}>
                  <span className="text-xl">{getActivityIconComponent(iconName)}</span>
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