import React from 'react'
import { CheckCircle, Lock, Trophy, Target, Flame, Star, Zap, Shield, BookOpen, Crown, Sword } from 'lucide-react'
import { ProgressTracker } from './ProgressTracker'
import type { AchievementCardProps } from '@/types/achievements'

// Icon mapping
const iconMap = {
  Trophy,
  Target,
  Crown,
  Fire: Flame,
  Star,
  Zap,
  Shield,
  Sword,
  BookOpen,
  Lock
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
  const IconComponent = iconMap[achievement.icon as keyof typeof iconMap] || Trophy

  const getRarityColors = () => {
    switch (achievement.rarity) {
      case 'Common':
        return {
          border: 'border-gray-500/50',
          bg: 'bg-gray-500/10',
          text: 'text-gray-400',
          glow: 'shadow-gray-500/20'
        }
      case 'Rare':
        return {
          border: 'border-blue-500/50',
          bg: 'bg-blue-500/10',
          text: 'text-blue-400',
          glow: 'shadow-blue-500/20'
        }
      case 'Epic':
        return {
          border: 'border-purple-500/50',
          bg: 'bg-purple-500/10',
          text: 'text-purple-400',
          glow: 'shadow-purple-500/20'
        }
      case 'Legendary':
        return {
          border: 'border-yellow-500/50',
          bg: 'bg-yellow-500/10',
          text: 'text-yellow-400',
          glow: 'shadow-yellow-500/20'
        }
      case 'Mythic':
        return {
          border: 'border-pink-500/50',
          bg: 'bg-pink-500/10',
          text: 'text-pink-400',
          glow: 'shadow-pink-500/20'
        }
      default:
        return {
          border: 'border-slate-500/50',
          bg: 'bg-slate-500/10',
          text: 'text-slate-400',
          glow: 'shadow-slate-500/20'
        }
    }
  }

  const rarityColors = getRarityColors()
  const isEarned = achievement.status === 'completed'
  const isLocked = achievement.status === 'locked'

  const sizeClasses = {
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8'
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const getDifficultyStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={12}
        fill={index < achievement.difficulty ? 'currentColor' : 'none'}
        className={index < achievement.difficulty ? 'text-yellow-400' : 'text-slate-600'}
      />
    ))
  }

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
        {getDifficultyStars()}
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
      {showProgress && achievement.status === 'in_progress' && achievement.conditions.length > 0 && (
        <div className="mb-4">
          <ProgressTracker
            progress={achievement.conditions[0].current || 0}
            target={achievement.conditions[0].target}
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
              <span className="font-medium">{formatDate(achievement.earnedAt)}</span>
            </div>
          )}
        </div>
      )}

      {/* Series indicator */}
      {achievement.series && (
        <div className="absolute bottom-2 left-2">
          <div className="bg-slate-900/70 backdrop-blur-sm px-2 py-1 rounded text-xs text-slate-400">
            {achievement.seriesOrder}/{achievement.series}
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