import React from 'react'
import { Trophy, Target, Flame, Star, Zap, Shield, BookOpen, Lock, Crown, Sword } from 'lucide-react'
import { FiStar as FaSparkles } from 'react-icons/fi'
import type { BadgeDetailsProps } from '@/types/achievements'

// Icon mapping
const iconMap = {
  Trophy,
  Target,
  Crown,
  Fire: Flame,
  Flame,
  Star,
  Zap,
  Shield,
  Sword,
  BookOpen,
  Lock
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
  const IconComponent = iconMap[achievement.icon as keyof typeof iconMap] || Trophy

  const getRarityStyle = () => {
    switch (achievement.rarity) {
      case 'Common':
        return {
          border: 'border-gray-500',
          bg: 'bg-gray-500/20',
          text: 'text-gray-400',
          glow: 'shadow-gray-500/30',
          gradient: 'from-gray-400 to-gray-600'
        }
      case 'Rare':
        return {
          border: 'border-blue-500',
          bg: 'bg-blue-500/20',
          text: 'text-blue-400',
          glow: 'shadow-blue-500/30',
          gradient: 'from-blue-400 to-blue-600'
        }
      case 'Epic':
        return {
          border: 'border-purple-500',
          bg: 'bg-purple-500/20',
          text: 'text-purple-400',
          glow: 'shadow-purple-500/30',
          gradient: 'from-purple-400 to-purple-600'
        }
      case 'Legendary':
        return {
          border: 'border-yellow-500',
          bg: 'bg-yellow-500/20',
          text: 'text-yellow-400',
          glow: 'shadow-yellow-500/30',
          gradient: 'from-yellow-400 to-orange-500'
        }
      case 'Mythic':
        return {
          border: 'border-pink-500',
          bg: 'bg-pink-500/20',
          text: 'text-pink-400',
          glow: 'shadow-pink-500/30',
          gradient: 'from-pink-400 via-purple-500 to-cyan-400'
        }
      default:
        return {
          border: 'border-slate-500',
          bg: 'bg-slate-500/20',
          text: 'text-slate-400',
          glow: 'shadow-slate-500/30',
          gradient: 'from-slate-400 to-slate-600'
        }
    }
  }

  const getSizeConfig = () => {
    switch (size) {
      case 'small':
        return {
          container: 'w-12 h-12',
          icon: 16,
          border: 'border-2'
        }
      case 'medium':
        return {
          container: 'w-20 h-20',
          icon: 24,
          border: 'border-3'
        }
      case 'large':
        return {
          container: 'w-32 h-32',
          icon: 48,
          border: 'border-4'
        }
      case 'hero':
        return {
          container: 'w-48 h-48',
          icon: 72,
          border: 'border-6'
        }
      default:
        return {
          container: 'w-20 h-20',
          icon: 24,
          border: 'border-3'
        }
    }
  }

  const rarityStyle = getRarityStyle()
  const sizeConfig = getSizeConfig()
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