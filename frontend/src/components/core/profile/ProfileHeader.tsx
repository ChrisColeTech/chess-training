import React from 'react'
import { User, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { ProfileHeaderProps } from '@/types/profile'

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  userStats,
  onEditProfile,
  theme
}) => {
  return (
    <Card className={`${theme.surface} border-gray-700 shadow-xl`}>
      <CardContent className="p-6 text-center">
        <div className={`w-24 h-24 mx-auto bg-gradient-to-br ${theme.primary} rounded-full flex items-center justify-center mb-4 shadow-lg`}>
          <User size={40} className="text-white" />
        </div>
        <h2 className={`text-2xl font-bold ${theme.text} mb-1`}>{userStats.displayName}</h2>
        <p className="text-gray-400 text-sm mb-4">{userStats.skillLevel.charAt(0).toUpperCase() + userStats.skillLevel.slice(1)} Player</p>
        
        {/* Current Rating */}
        <div className={`p-4 bg-gradient-to-r ${theme.primary} bg-opacity-10 rounded-xl border border-white/10 mb-6`}>
          <div className="text-sm text-gray-400 mb-1">Current Rating</div>
          <div className={`text-3xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
            {userStats.currentRating}
          </div>
          <div className={`flex items-center justify-center mt-2 ${userStats.ratingChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
            <TrendingUp size={16} className="mr-1" />
            <span className="text-sm font-medium">
              {userStats.ratingChange > 0 ? '+' : ''}{userStats.ratingChange} this week
            </span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className={`text-xl font-bold ${theme.text}`}>{userStats.gamesPlayed}</div>
            <div className="text-xs text-gray-400">Games Played</div>
          </div>
          <div>
            <div className={`text-xl font-bold ${theme.text}`}>{userStats.winRate}%</div>
            <div className="text-xs text-gray-400">Win Rate</div>
          </div>
          <div>
            <div className={`text-xl font-bold ${theme.text}`}>{userStats.puzzlesSolved}</div>
            <div className="text-xs text-gray-400">Puzzles Solved</div>
          </div>
          <div>
            <div className={`text-xl font-bold ${theme.text}`}>{userStats.currentStreak}</div>
            <div className="text-xs text-gray-400">Win Streak</div>
          </div>
        </div>

        {/* Edit Profile Button */}
        <Button
          onClick={onEditProfile}
          className="mt-4 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white"
        >
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  )
}