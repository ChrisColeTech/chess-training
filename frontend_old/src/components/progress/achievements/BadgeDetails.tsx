import React, { useMemo } from 'react'
import { Lock, Trophy, Target, Crown, Flame, Zap, Star } from 'lucide-react'
import { FiStar as FaSparkles } from 'react-icons/fi'
import type { BadgeDetailsProps } from '@/types/achievements'

// Moved configurations locally
const getRarityColors = (rarity: string) => {
  const colorMap = {
    Common: {
      border: 'border-slate-400',
      bg: 'bg-slate-400/10',
      text: 'text-slate-400',
      glow: 'shadow-slate-400/20',
      gradient: 'from-slate-400 to-slate-600'
    },
    Rare: {
      border: 'border-blue-400',
      bg: 'bg-blue-400/10',
      text: 'text-blue-400',
      glow: 'shadow-blue-400/20',
      gradient: 'from-blue-400 to-blue-600'
    },
    Epic: {
      border: 'border-purple-400',
      bg: 'bg-purple-400/10',
      text: 'text-purple-400',
      glow: 'shadow-purple-400/20',
      gradient: 'from-purple-400 to-purple-600'
    },
    Legendary: {
      border: 'border-orange-400',
      bg: 'bg-orange-400/10',
      text: 'text-orange-400',
      glow: 'shadow-orange-400/20',
      gradient: 'from-orange-400 to-red-500'
    },
    Mythic: {
      border: 'border-pink-400',
      bg: 'bg-pink-400/10',
      text: 'text-pink-400',
      glow: 'shadow-pink-400/20',
      gradient: 'from-pink-400 to-purple-500'
    }
  }
  return colorMap[rarity as keyof typeof colorMap] || colorMap.Common
}

const badgeSizeConfig = {
  small: {
    container: 'w-8 h-8',
    icon: 16,
    border: 'border'
  },
  medium: {
    container: 'w-12 h-12',
    icon: 20,
    border: 'border-2'
  },
  large: {
    container: 'w-16 h-16',
    icon: 24,
    border: 'border-2'
  },
  hero: {
    container: 'w-24 h-24',
    icon: 32,
    border: 'border-3'
  }
}

/**
 * Badge Details Component
 * Displays achievement badges with trophy room presentation
 */
export const BadgeDetails: React.FC<BadgeDetailsProps> = ({
  achievement,
  size,
  showEffects = true,
  onClick,
  isNew = false
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
  const rarityStyle = getRarityColors(achievement.rarity)
  const sizeConfig = badgeSizeConfig[size]
  const isEarned = achievement.status === 'completed'
  const isLocked = achievement.status === 'locked'

  return (
    <div className="relative inline-block">
      {/* Badge container */}
      <div
        className={`
          relative ${sizeConfig.container} rounded-full flex items-center justify-center
          transition-all duration-300 cursor-pointer group
          ${isEarned 
            ? `${rarityStyle.border} ${rarityStyle.bg} ${sizeConfig.border}` 
            : 'border-slate-600 bg-slate-700/30 border-2'
          }
          ${onClick ? 'hover:scale-110' : ''}
          ${showEffects && isEarned ? `shadow-lg ${rarityStyle.glow}` : ''}
        `}
        onClick={onClick}
      >
        {/* Background gradient for earned badges */}
        {isEarned && (
          <div className={`
            absolute inset-0 rounded-full bg-gradient-to-br ${rarityStyle.gradient} 
            opacity-20 group-hover:opacity-30 transition-opacity
          `} />
        )}

        {/* Badge icon */}
        {isLocked ? (
          <Lock 
            size={sizeConfig.icon} 
            className="text-slate-500 relative z-10" 
          />
        ) : (
          <IconComponent 
            size={sizeConfig.icon} 
            className={`${isEarned ? rarityStyle.text : 'text-slate-400'} relative z-10`}
            fill={isEarned ? 'currentColor' : 'none'}
          />
        )}

        {/* Shine effect for earned badges */}
        {showEffects && isEarned && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-50 group-hover:opacity-70 transition-opacity" />
        )}

        {/* Mythic special effects */}
        {achievement.rarity === 'Mythic' && isEarned && showEffects && (
          <>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 animate-spin-slow blur-sm" />
            <div className="absolute inset-2 rounded-full bg-gradient-to-r from-cyan-400/30 via-purple-400/30 to-pink-400/30 animate-pulse" />
          </>
        )}
      </div>

      {/* New badge indicator */}
      {isNew && isEarned && (
        <div className="absolute -top-1 -right-1 animate-bounce">
          <div className="bg-green-500 rounded-full p-1">
            <FaSparkles size={12} className="text-white" />
          </div>
        </div>
      )}

      {/* Rarity indicator for larger badges */}
      {(size === 'large' || size === 'hero') && isEarned && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
          <div className={`
            px-2 py-1 rounded-full text-xs font-bold backdrop-blur-sm
            ${rarityStyle.bg} ${rarityStyle.border} border ${rarityStyle.text}
          `}>
            {achievement.rarity}
          </div>
        </div>
      )}

      {/* Floating particles for legendary and mythic */}
      {showEffects && isEarned && (achievement.rarity === 'Legendary' || achievement.rarity === 'Mythic') && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className={`
                absolute w-1 h-1 ${rarityStyle.text} rounded-full animate-float
                opacity-60
              `}
              style={{
                top: `${20 + (i * 10)}%`,
                left: `${20 + (i * 15)}%`,
                animationDelay: `${i * 200}ms`,
                animationDuration: `${2 + (i * 0.5)}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Pulse ring for newly earned achievements */}
      {isNew && isEarned && showEffects && (
        <div className={`
          absolute inset-0 rounded-full border-4 ${rarityStyle.border}
          animate-ping opacity-75
        `} />
      )}
    </div>
  )
}

export default BadgeDetails