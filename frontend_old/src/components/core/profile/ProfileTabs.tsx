import React from 'react'
import { TrendingUp, Trophy, Clock } from 'lucide-react'
import type { ProfileTabsProps } from '@/types/profile'

export const ProfileTabs: React.FC<ProfileTabsProps> = ({
  selectedTab,
  onTabChange,
  theme
}) => {
  const tabs = [
    { key: 'overview', label: 'Overview', icon: TrendingUp },
    { key: 'achievements', label: 'Achievements', icon: Trophy },
    { key: 'activity', label: 'Activity', icon: Clock }
  ] as const

  return (
    <div className="flex space-x-1 bg-gray-800/50 p-1 rounded-lg">
      {tabs.map(tab => {
        const IconComponent = tab.icon
        return (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              selectedTab === tab.key
                ? `bg-gradient-to-r ${theme.primary} text-white`
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <IconComponent size={16} className="mr-2" />
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}