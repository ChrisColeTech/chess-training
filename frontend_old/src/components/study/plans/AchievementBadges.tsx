import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Filter, Flame, Lock, Sparkles, Star, Target, TrendingUp, Trophy } from 'lucide-react'
import type { AchievementBadgesProps, AchievementBadge, BadgeType } from '@/types/studyPlans'

/**
 * AchievementBadges Component
 * Interactive achievement system with badges, progress tracking, and gamification
 */
export const AchievementBadges: React.FC<AchievementBadgesProps> = ({
  badges,
  recentBadges,
  badgeProgress,
  theme
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | BadgeType | 'earned' | 'locked'>('all')
  const [selectedBadge, setSelectedBadge] = useState<AchievementBadge | null>(null)

  const getBadgeColor = (type: BadgeType) => {
    switch (type) {
      case 'bronze': return 'from-orange-600 to-orange-400'
      case 'silver': return 'from-gray-400 to-gray-200'
      case 'gold': return 'from-yellow-500 to-yellow-300'
      case 'platinum': return 'from-gray-300 to-white'
      case 'diamond': return 'from-purple-500 to-purple-300'
      default: return 'from-gray-600 to-gray-400'
    }
  }


  const getRarityColor = (rarity: number) => {
    if (rarity <= 5) return 'text-purple-400' // Ultra rare
    if (rarity <= 15) return 'text-blue-400'  // Rare
    if (rarity <= 35) return 'text-green-400' // Uncommon
    if (rarity <= 60) return 'text-yellow-400' // Common
    return 'text-gray-400' // Very common
  }

  const getRarityLabel = (rarity: number) => {
    if (rarity <= 5) return 'Ultra Rare'
    if (rarity <= 15) return 'Rare'
    if (rarity <= 35) return 'Uncommon'
    if (rarity <= 60) return 'Common'
    return 'Very Common'
  }

  const filteredBadges = badges.filter(badge => {
    if (selectedFilter === 'all') return true
    if (selectedFilter === 'earned') return badge.isEarned
    if (selectedFilter === 'locked') return !badge.isEarned
    return badge.type === selectedFilter
  })

  const earnedCount = badges.filter(b => b.isEarned).length
  const totalXpFromBadges = badges.filter(b => b.isEarned).reduce((sum, b) => sum + b.xpReward, 0)

  const filterOptions = [
    { value: 'all', label: 'All Badges', count: badges.length },
    { value: 'earned', label: 'Earned', count: earnedCount },
    { value: 'locked', label: 'Locked', count: badges.length - earnedCount },
    { value: 'bronze', label: 'Bronze', count: badges.filter(b => b.type === 'bronze').length },
    { value: 'silver', label: 'Silver', count: badges.filter(b => b.type === 'silver').length },
    { value: 'gold', label: 'Gold', count: badges.filter(b => b.type === 'gold').length },
    { value: 'platinum', label: 'Platinum', count: badges.filter(b => b.type === 'platinum').length },
    { value: 'diamond', label: 'Diamond', count: badges.filter(b => b.type === 'diamond').length }
  ]

  const formatTimeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp
    const days = Math.floor(diff / (24 * 60 * 60 * 1000))
    if (days === 0) return 'Today'
    if (days === 1) return 'Yesterday'
    return `${days} days ago`
  }

  const renderBadgeCard = (badge: AchievementBadge) => {
    const progress = badgeProgress[badge.id] || 0
    const isNearCompletion = !badge.isEarned && progress >= 75

    return (
      <Card 
        key={badge.id}
        className={`relative transition-all duration-300 cursor-pointer group hover:scale-105 ${
          badge.isEarned 
            ? 'bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-gray-600 ring-2 ring-opacity-50 ring-yellow-400/30' 
            : 'bg-gray-900/40 border-gray-700 hover:border-gray-600'
        } ${
          isNearCompletion ? 'animate-pulse-glow' : ''
        }`}
        onClick={() => setSelectedBadge(badge)}
      >
        {/* Badge Icon and Glow Effect */}
        <div className="absolute -top-3 -right-3">
          {badge.isEarned ? (
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getBadgeColor(badge.type)} flex items-center justify-center shadow-lg`}>
              <CheckCircle size={16} className="text-white" />
            </div>
          ) : progress > 0 ? (
            <div className="w-8 h-8 rounded-full bg-gray-700 border-2 border-gray-600 flex items-center justify-center">
              <Target size={12} className="text-gray-400" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-700 flex items-center justify-center">
              <Lock size={12} className="text-gray-500" />
            </div>
          )}
        </div>

        <CardHeader className="pb-3">
          <div className="flex items-start space-x-3">
            <div className={`text-4xl ${badge.isEarned ? '' : 'grayscale opacity-50'}`}>
              {badge.icon}
            </div>
            <div className="flex-1">
              <CardTitle className={`text-lg font-bold ${
                badge.isEarned ? theme.text : theme.text + ' opacity-60'
              }`}>
                {badge.name}
              </CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Badge className={`bg-gradient-to-r ${getBadgeColor(badge.type)} text-white text-xs`}>
                  {badge.type}
                </Badge>
                <span className={`text-xs ${getRarityColor(badge.rarity)}`}>
                  {getRarityLabel(badge.rarity)}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <CardDescription className={`text-sm ${badge.isEarned ? theme.text : theme.text + ' opacity-50'} mb-4`}>
            {badge.description}
          </CardDescription>

          {/* Progress Bar for Incomplete Badges */}
          {!badge.isEarned && progress > 0 && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-gray-400">Progress</span>
                <span className="text-xs font-medium text-gray-300">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {/* XP Reward */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1 text-gray-400">
              <Sparkles size={14} />
              <span>{badge.xpReward} XP</span>
            </div>
            {badge.isEarned && badge.earnedAt && (
              <span className="text-xs text-gray-500">
                {formatTimeAgo(badge.earnedAt)}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
          <Trophy className="w-4 h-4 inline" /> Achievement Gallery
        </h2>
        <p className={`${theme.text} opacity-60`}>
          Track your progress and unlock prestigious chess training badges
        </p>
      </div>

      {/* Achievement Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="p-4 text-center">
            <Trophy size={24} className="mx-auto mb-2 text-yellow-400" />
            <div className={`text-2xl font-bold ${theme.text}`}>
              {earnedCount}/{badges.length}
            </div>
            <div className="text-sm text-gray-400">Badges Earned</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="p-4 text-center">
            <Sparkles size={24} className="mx-auto mb-2 text-purple-400" />
            <div className={`text-2xl font-bold ${theme.text}`}>
              {totalXpFromBadges.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">XP from Badges</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="p-4 text-center">
            <Star size={24} className="mx-auto mb-2 text-blue-400" />
            <div className={`text-2xl font-bold ${theme.text}`}>
              {badges.filter(b => b.isEarned && b.rarity <= 15).length}
            </div>
            <div className="text-sm text-gray-400">Rare Badges</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="p-4 text-center">
            <TrendingUp size={24} className="mx-auto mb-2 text-green-400" />
            <div className={`text-2xl font-bold ${theme.text}`}>
              {Math.round((earnedCount / badges.length) * 100)}%
            </div>
            <div className="text-sm text-gray-400">Completion</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Achievements */}
      {recentBadges.length > 0 && (
        <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
          <CardHeader>
            <CardTitle className={`text-lg ${theme.text} flex items-center`}>
              <Flame size={20} className="mr-2 text-yellow-400" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {recentBadges.map((badge) => (
                <div key={badge.id} className="flex-shrink-0 text-center p-3 bg-gray-800/50 rounded-lg">
                  <div className="text-2xl mb-2">{badge.icon}</div>
                  <div className={`text-sm font-medium ${theme.text}`}>{badge.name}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    +{badge.xpReward} XP
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filter Bar */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2 overflow-x-auto">
            <Filter size={16} className="text-gray-400 flex-shrink-0" />
            <div className="flex space-x-2">
              {filterOptions.map((option) => (
                <Button
                  key={option.value}
                  size="sm"
                  variant={selectedFilter === option.value ? "default" : "outline"}
                  onClick={() => setSelectedFilter(option.value as any)}
                  className={`flex-shrink-0 ${
                    selectedFilter === option.value 
                      ? `bg-gradient-to-r ${theme.primary}` 
                      : "border-gray-600 text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  {option.label} ({option.count})
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredBadges.map(renderBadgeCard)}
      </div>

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <Card className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-lg z-50 bg-gray-900 border-gray-700 shadow-2xl">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-5xl">{selectedBadge.icon}</div>
                <div>
                  <CardTitle className={`text-xl ${theme.text}`}>
                    {selectedBadge.name}
                  </CardTitle>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className={`bg-gradient-to-r ${getBadgeColor(selectedBadge.type)} text-white`}>
                      {selectedBadge.type}
                    </Badge>
                    <span className={`text-sm ${getRarityColor(selectedBadge.rarity)}`}>
                      {getRarityLabel(selectedBadge.rarity)}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedBadge(null)}
                className="border-gray-600 text-gray-300"
              >
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className={`${theme.text} opacity-80`}>
                {selectedBadge.description}
              </p>
              
              {/* Criteria */}
              <div>
                <h4 className={`font-medium ${theme.text} mb-2`}>Requirements</h4>
                <div className="text-sm text-gray-400 bg-gray-800/50 rounded-lg p-3">
                  {selectedBadge.criteria.type === 'lessons_completed' && 
                    `Complete ${selectedBadge.criteria.threshold} lessons`}
                  {selectedBadge.criteria.type === 'streak' && 
                    `Maintain a ${selectedBadge.criteria.threshold}-day study streak`}
                  {selectedBadge.criteria.type === 'score' && 
                    `Achieve a score of ${selectedBadge.criteria.threshold}% or higher`}
                  {selectedBadge.criteria.type === 'paths_finished' && 
                    `Complete ${selectedBadge.criteria.threshold} learning paths`}
                  {selectedBadge.criteria.type === 'time_spent' && 
                    `Study for ${Math.round(selectedBadge.criteria.threshold / 60)} total hours`}
                  {selectedBadge.criteria.category && 
                    ` in ${selectedBadge.criteria.category}`}
                </div>
              </div>

              {/* Progress or Completion */}
              {selectedBadge.isEarned ? (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                  <div className="flex items-center space-x-2 text-green-400">
                    <CheckCircle size={16} />
                    <span className="font-medium">Earned {formatTimeAgo(selectedBadge.earnedAt!)}</span>
                  </div>
                  <div className="text-sm text-green-300 mt-1">
                    Rewarded {selectedBadge.xpReward} XP
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Progress</span>
                    <span className="text-sm font-medium text-gray-300">
                      {badgeProgress[selectedBadge.id] || 0}%
                    </span>
                  </div>
                  <Progress value={badgeProgress[selectedBadge.id] || 0} className="h-3" />
                  <div className="text-xs text-gray-500 mt-2">
                    Reward: {selectedBadge.xpReward} XP when completed
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Background overlay for modal */}
      {selectedBadge && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSelectedBadge(null)}
        />
      )}
    </div>
  )
}