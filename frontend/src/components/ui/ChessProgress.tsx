import React from 'react'
import { Progress } from './progress'
import { cn } from '../../lib/utils'
import { useThemeStore } from '../../stores/themeStore'
import { useProgress } from '../../hooks/ui/useProgress'
import { ELO_PROGRESS_COLORS } from '../../constants/progress'
import { CheckCircle, Target, Trophy, Clock } from 'lucide-react'

interface ChessProgressProps {
  value: number
  max?: number
  className?: string
  showPercentage?: boolean
  colorScheme?: 'default' | 'positive' | 'negative' | 'neutral'
  size?: 'sm' | 'md' | 'lg'
}

interface GoalProgressProps {
  goalId: string
  className?: string
  variant?: 'compact' | 'detailed'
}

interface ELOProgressProps {
  className?: string
  variant?: 'bar' | 'circular' | 'detailed'
}

export const ChessProgress: React.FC<ChessProgressProps> = ({
  value,
  max = 100,
  className,
  showPercentage = false,
  colorScheme = 'default',
  size = 'md',
  ...props
}) => {
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()
  
  const percentage = Math.min(Math.round((value / max) * 100), 100)

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3'
  }

  const getColorClasses = () => {
    if (colorScheme === 'positive') return 'bg-green-600'
    if (colorScheme === 'negative') return 'bg-red-600'
    if (colorScheme === 'neutral') return 'bg-blue-600'
    // Default uses theme accent
    return `bg-gradient-to-r ${theme.accent}`
  }

  return (
    <div className={cn('w-full space-y-1', className)}>
      <Progress
        value={percentage}
        className={cn(
          'relative overflow-hidden rounded-full',
          sizeClasses[size],
          'bg-black/20 border border-white/10',
          // Apply color scheme directly to progress bar
          '[&>div]:transition-all [&>div]:duration-300'
        )}
        style={{
          '--progress-background': getColorClasses()
        } as React.CSSProperties}
        {...props}
      />
      {showPercentage && (
        <div className="flex justify-between text-xs text-white/70">
          <span>{value} / {max}</span>
          <span>{percentage}%</span>
        </div>
      )}
    </div>
  )
}

export const GoalProgress: React.FC<GoalProgressProps> = ({
  goalId,
  className,
  variant = 'detailed'
}) => {
  const { dailyGoals, weeklyGoals } = useProgress()
  const goal = [...dailyGoals, ...weeklyGoals].find(g => g.config.id === goalId)

  if (!goal) return null

  const getGoalIcon = () => {
    switch (goal.config.type) {
      case 'goal': return <Target size={16} />
      case 'rating': return <Trophy size={16} />
      case 'streak': return <CheckCircle size={16} />
      case 'achievement': return <Trophy size={16} />
      default: return <Clock size={16} />
    }
  }

  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <div className="text-white/80 text-sm">{getGoalIcon()}</div>
        <ChessProgress
          value={goal.current}
          max={goal.config.maxValue}
          className="flex-1"
          colorScheme={goal.isComplete ? 'positive' : 'default'}
          size="sm"
        />
        <span className="text-xs text-white/60 min-w-12 text-right">
          {goal.percentage}%
        </span>
      </div>
    )
  }

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-white/80">{getGoalIcon()}</div>
          <span className="text-white/80 text-sm font-medium">{goal.config.label}</span>
        </div>
        <span className="text-white/60 text-sm">{goal.displayText}</span>
      </div>
      
      <ChessProgress
        value={goal.current}
        max={goal.config.maxValue}
        colorScheme={goal.isComplete ? 'positive' : 'default'}
        size="md"
      />
      
      {goal.isComplete && (
        <div className="flex items-center gap-1 text-green-400 text-xs">
          <CheckCircle size={12} />
          <span>Goal Complete!</span>
        </div>
      )}
    </div>
  )
}

export const ELOProgress: React.FC<ELOProgressProps> = ({
  className,
  variant = 'detailed'
}) => {
  const { eloProgress } = useProgress()
  const { config, percentage, colorScheme, changeText, progressText } = eloProgress

  const colors = ELO_PROGRESS_COLORS[colorScheme]

  if (variant === 'bar') {
    return (
      <div className={cn('space-y-2', className)}>
        <div className="flex items-center justify-between">
          <span className="text-white/80 text-sm">ELO Progress</span>
          <span className={cn('text-sm font-bold', colors.text)}>
            {changeText}
          </span>
        </div>
        <ChessProgress
          value={percentage}
          max={100}
          colorScheme={colorScheme}
          size="md"
        />
      </div>
    )
  }

  if (variant === 'circular') {
    return (
      <div className={cn('flex items-center gap-3', className)}>
        <div className="relative w-12 h-12">
          <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-white/20"
              stroke="currentColor"
              strokeWidth="3"
              fill="transparent"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className={`${colors.text.replace('text-', 'text-')}`}
              stroke="currentColor"
              strokeWidth="3"
              fill="transparent"
              strokeDasharray={`${percentage}, 100`}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-white">{percentage}%</span>
          </div>
        </div>
        <div>
          <div className="text-white/80 text-sm font-medium">ELO Progress</div>
          <div className="text-white/60 text-xs">{progressText}</div>
          <div className={cn('text-xs font-bold', colors.text)}>
            {changeText} points
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-medium">ELO Rating Progress</h3>
          <p className="text-white/60 text-sm">{progressText}</p>
        </div>
        <div className="text-right">
          <div className={cn('text-lg font-bold', colors.text)}>
            {changeText}
          </div>
          <div className="text-white/60 text-xs">
            {colorScheme === 'positive' ? 'Gained' : colorScheme === 'negative' ? 'Lost' : 'Change'}
          </div>
        </div>
      </div>
      
      <ChessProgress
        value={Math.abs(percentage)}
        max={100}
        colorScheme={colorScheme}
        size="lg"
        showPercentage={true}
      />
      
      <div className="text-white/60 text-xs">
        Progress to next milestone: {config.targetRating} ELO
      </div>
    </div>
  )
}

// Convenience components for common use cases
export const DailyGoalsList: React.FC<{ className?: string }> = ({ className }) => {
  const { dailyGoals } = useProgress()

  return (
    <div className={cn('space-y-4', className)}>
      <h3 className="text-white font-medium text-lg flex items-center gap-2">
        <Target size={20} />
        Daily Goals
      </h3>
      {dailyGoals.map((goal) => (
        <GoalProgress
          key={goal.config.id}
          goalId={goal.config.id}
          variant="detailed"
        />
      ))}
    </div>
  )
}

export const WeeklyGoalsList: React.FC<{ className?: string }> = ({ className }) => {
  const { weeklyGoals } = useProgress()

  return (
    <div className={cn('space-y-4', className)}>
      <h3 className="text-white font-medium text-lg flex items-center gap-2">
        <Trophy size={20} />
        Weekly Goals
      </h3>
      {weeklyGoals.map((goal) => (
        <GoalProgress
          key={goal.config.id}
          goalId={goal.config.id}
          variant="compact"
        />
      ))}
    </div>
  )
}