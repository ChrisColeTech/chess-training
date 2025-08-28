import React, { useEffect, useState } from 'react'
import type { ProgressTrackerProps } from '@/types/achievements'
import { Sparkles, Trophy } from 'lucide-react'

/**
 * Progress Tracker Component
 * Animated progress bar for achievement tracking
 */
export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  progress,
  target,
  label,
  theme,
  size = 'medium',
  showPercentage = false,
  animated = true
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(animated ? 0 : progress)
  const percentage = Math.min((progress / target) * 100, 100)

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setAnimatedProgress(progress)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [progress, animated])

  const sizeConfig = {
    small: {
      height: 'h-2',
      textSize: 'text-xs',
      spacing: 'mb-1'
    },
    medium: {
      height: 'h-3',
      textSize: 'text-sm',
      spacing: 'mb-2'
    },
    large: {
      height: 'h-4',
      textSize: 'text-base',
      spacing: 'mb-3'
    }
  }

  const config = sizeConfig[size]
  const displayProgress = animated ? animatedProgress : progress

  return (
    <div className="w-full">
      {/* Progress header */}
      <div className={`flex items-center justify-between ${config.spacing}`}>
        <span className={`font-medium text-slate-300 ${config.textSize}`}>
          {label}
        </span>
        <div className={`flex items-center gap-2 ${config.textSize}`}>
          <span className="text-slate-400">
            {Math.floor(displayProgress)}/{target}
          </span>
          {showPercentage && (
            <span className="text-slate-500">
              ({Math.round(percentage)}%)
            </span>
          )}
        </div>
      </div>

      {/* Progress bar container */}
      <div className={`w-full bg-slate-700/50 rounded-full overflow-hidden ${config.height}`}>
        {/* Progress bar fill */}
        <div
          className={`
            ${config.height} rounded-full transition-all duration-1000 ease-out relative overflow-hidden
            bg-gradient-to-r ${theme.primary}
          `}
          style={{ 
            width: `${Math.min((displayProgress / target) * 100, 100)}%` 
          }}
        >
          {/* Shine effect */}
          {animated && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse"></div>
          )}
          
          {/* Glow effect for high progress */}
          {percentage >= 75 && (
            <div className={`absolute inset-0 bg-gradient-to-r ${theme.accent} opacity-30 animate-pulse`}></div>
          )}
        </div>
      </div>

      {/* Milestone indicators */}
      {target >= 100 && (
        <div className="flex justify-between mt-1">
          {[25, 50, 75, 100].map(milestone => {
            const milestoneReached = percentage >= milestone
            return (
              <div
                key={milestone}
                className={`w-1 h-1 rounded-full transition-colors duration-300 ${
                  milestoneReached 
                    ? 'bg-gradient-to-r ' + theme.primary
                    : 'bg-slate-600'
                }`}
              />
            )
          })}
        </div>
      )}

      {/* Progress threshold indicators */}
      {percentage >= 90 && percentage < 100 && (
        <div className="text-center mt-1">
          <span className={`text-xs font-medium ${theme.text} animate-pulse`}>
            Almost there! <Trophy className="w-4 h-4 inline" />
          </span>
        </div>
      )}

      {percentage === 100 && (
        <div className="text-center mt-1">
          <span className="text-xs font-medium text-green-400 animate-bounce">
            Complete! <Sparkles className="w-4 h-4 inline" />
          </span>
        </div>
      )}
    </div>
  )
}

export default ProgressTracker