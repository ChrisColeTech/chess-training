import React, { useMemo } from 'react'
import { CheckCircle, Lock, Star, Trophy, Target, Crown, Flame, Zap } from 'lucide-react'
import { ProgressTracker } from './ProgressTracker'
import type { AchievementCardProps } from '@/types/achievements'

// Icon mapping for achievements
const iconMap = {
  Trophy,
  Target,
  Crown,
  Flame,
  Zap,
  Star,
  CheckCircle,
  Lock
} as const

// Utility functions moved from configurations
const getRarityColors = (rarity: string) => {
  const colorMap = {
    Common: {
      border: 'border-slate-400',
      bg: 'bg-slate-400/10',
      text: 'text-slate-400',
      glow: 'shadow-slate-400/20'
    },
    Rare: {
      border: 'border-blue-400',
      bg: 'bg-blue-400/10',
      text: 'text-blue-400',
      glow: 'shadow-blue-400/20'
    },
    Epic: {
      border: 'border-purple-400',
      bg: 'bg-purple-400/10',
      text: 'text-purple-400',
      glow: 'shadow-purple-400/20'
    },
    Legendary: {
      border: 'border-orange-400',
      bg: 'bg-orange-400/10',
      text: 'text-orange-400',
      glow: 'shadow-orange-400/20'
    },
    Mythic: {
      border: 'border-pink-400',
      bg: 'bg-pink-400/10',
      text: 'text-pink-400',
      glow: 'shadow-pink-400/20'
    }
  }
  return colorMap[rarity as keyof typeof colorMap] || colorMap.Common
}

const achievementCardSizeConfig = {
  small: 'p-3 min-w-[180px] max-w-[220px]',
  medium: 'p-4 min-w-[220px] max-w-[280px]',
  large: 'p-6 min-w-[280px] max-w-[340px]'
}

const formatAchievementDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date)
}

const getDifficultyStars = (difficulty: number) => {
  return Array.from({ length: 5 }, (_, i) => ({
    key: i,
    filled: i < difficulty
  }))
}

/**
 * Achievement Card Component
 * Displays individual achievement with trophy room aesthetic
 */
export const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  showProgress = false,
  showDetails = true,
  onClick,
  theme,
  size = 'medium'
}) => {
  const IconComponent = useMemo(() => {
    // Extract icon from achievement data or use default
    const iconName = achievement.category?.toLowerCase()
    switch (iconName) {
      case 'tactical':
      case 'tactics':
        return Target
      case 'strategic':
      case 'strategy':
        return Crown
      case 'speed':
      case 'blitz':
        return Flame
      case 'endgame':
        return Zap
      case 'opening':
        return Star
      default:
        return Trophy
    }
  }, [achievement.category])
  const rarityColors = getRarityColors(achievement.rarity)
  const isEarned = achievement.status === 'completed'
  const isLocked = achievement.status === 'locked'

  const sizeClasses = achievementCardSizeConfig
  const difficultyStars = getDifficultyStars(achievement.difficulty)

  return (
    <div
      className={`
        relative group cursor-pointer transition-all duration-300 hover:scale-105 
        bg-slate-800/50 backdrop-blur-sm rounded-xl border-2 
        ${isEarned ? `${rarityColors.border} ${rarityColors.bg} ${rarityColors.glow} shadow-lg` : 'border-slate-700/30 bg-slate-700/20'}
        ${!isEarned ? 'opacity-75' : ''}
        ${sizeClasses[size]}
      `}
      onClick={() => onClick && onClick(achievement)}
    >
      {/* Rarity indicator */}
      <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold ${
        rarityColors.text
      } bg-slate-900/70 backdrop-blur-sm border border-slate-600/30`}>
        {achievement.rarity}
      </div>

      {/* Difficulty stars */}
      <div className="absolute top-2 left-2 flex gap-0.5">
        {difficultyStars.map((star) => (
          <Star
            key={star.key}
            size={12}
            fill={star.filled ? 'currentColor' : 'none'}
            className={star.filled ? 'text-yellow-400' : 'text-slate-600'}
          />
        ))}
      </div>

      {/* Achievement icon */}
      <div className="flex justify-center mb-4">
        <div className={`
          p-4 rounded-full transition-all duration-300 group-hover:scale-110 border-2
          ${isEarned 
            ? `${rarityColors.border} ${rarityColors.bg} ${rarityColors.glow}` 
            : 'bg-slate-700/30 border-slate-600/50'
          }
        `}>
          {isLocked ? (
            <Lock size={32} className="text-slate-500" />
          ) : (
            <IconComponent 
              size={32} 
              className={isEarned ? rarityColors.text : 'text-slate-400'} 
            />
          )}
        </div>
      </div>

      {/* Achievement info */}
      <div className="text-center mb-4">
        <h3 className={`text-lg font-bold mb-2 ${
          isEarned ? 'text-white' : 'text-slate-400'
        }`}>
          {isLocked ? '???' : achievement.title}
        </h3>
        <p className={`text-sm leading-relaxed ${
          isEarned ? 'text-slate-300' : 'text-slate-500'
        }`}>
          {isLocked ? 'A mysterious achievement awaits...' : achievement.description}
        </p>
        
        {/* Lore text for special achievements */}
        {achievement.lore && isEarned && (
          <p className={`text-xs italic mt-2 ${rarityColors.text} opacity-80`}>
            "{achievement.lore}"
          </p>
        )}
      </div>

      {/* Progress bar for in-progress achievements */}
      {showProgress && achievement.status === 'in_progress' && achievement.progress > 0 && (
        <div className="mb-4">
          <ProgressTracker
            progress={achievement.progress}
            target={100}
            label="Progress"
            theme={theme}
            size="small"
            showPercentage={true}
            animated={true}
          />
        </div>
      )}

      {/* Achievement details */}
      {showDetails && (
        <div className="space-y-2 text-xs">
          <div className={`flex justify-between ${
            isEarned ? 'text-slate-300' : 'text-slate-500'
          }`}>
            <span>Category:</span>
            <span className="font-medium">{achievement.category}</span>
          </div>
          
          <div className={`flex justify-between ${
            isEarned ? 'text-slate-300' : 'text-slate-500'
          }`}>
            <span>Reward:</span>
            <span className="font-medium">+{achievement.reward.xp} XP</span>
          </div>
          
          {achievement.reward.title && isEarned && (
            <div className="flex justify-between text-yellow-400">
              <span>Title:</span>
              <span className="font-medium">{achievement.reward.title}</span>
            </div>
          )}

          {achievement.earnedAt && (
            <div className="flex justify-between text-green-400">
              <span>Earned:</span>
              <span className="font-medium">{formatAchievementDate(achievement.earnedAt)}</span>
            </div>
          )}
        </div>
      )}

      {/* Series indicator */}
      {achievement.series && (
        <div className="absolute bottom-2 left-2">
          <div className="bg-slate-900/70 backdrop-blur-sm px-2 py-1 rounded text-xs text-slate-400">
            {achievement.series}
          </div>
        </div>
      )}

      {/* Earned indicator */}
      {isEarned && (
        <div className="absolute -top-2 -right-2">
          <div className={`rounded-full p-1 ${rarityColors.bg} border-2 ${rarityColors.border}`}>
            <CheckCircle size={20} className="text-green-400" />
          </div>
        </div>
      )}

      {/* Glow effect for mythic achievements */}
      {achievement.rarity === 'Mythic' && isEarned && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 blur-xl -z-10 animate-pulse"></div>
      )}
    </div>
  )
}

export default AchievementCard