import React from 'react'
import { Badge } from './badge'
import { cn } from '../../lib/utils'
import { useThemeStore } from '../../stores/themeStore'
import { useBadges } from '../../hooks/ui/useBadges'

interface ChessBadgeProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  className?: string
  children?: React.ReactNode
}

interface NotificationBadgeProps extends ChessBadgeProps {
  count: number
  type?: string
}

interface ELOBadgeProps extends ChessBadgeProps {
  rating: number
  showIcon?: boolean
}

interface StatusBadgeProps extends ChessBadgeProps {
  status: 'online' | 'offline' | 'in-game' | 'studying'
  showIcon?: boolean
}

export const ChessBadge: React.FC<ChessBadgeProps> = ({
  variant = 'default',
  className,
  children,
  ...props
}) => {
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()

  return (
    <Badge
      variant={variant}
      className={cn(
        'font-medium transition-all duration-200',
        // Theme integration - use chess theme colors when available
        variant === 'default' && `bg-gradient-to-r ${theme.accent} text-white shadow-lg`,
        className
      )}
      {...props}
    >
      {children}
    </Badge>
  )
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  count,
  type,
  className,
  ...props
}) => {
  const { getNotificationBadge } = useBadges()
  const badge = type ? getNotificationBadge(type) : null

  if (count === 0) return null

  return (
    <ChessBadge
      variant={badge?.variant || 'destructive'}
      className={cn(
        'min-w-[1.25rem] h-5 rounded-full flex items-center justify-center text-xs font-bold',
        badge?.colorClass,
        className
      )}
      {...props}
    >
      {count > 99 ? '99+' : count}
    </ChessBadge>
  )
}

export const ELOBadge: React.FC<ELOBadgeProps> = ({
  rating,
  showIcon = false,
  className,
  ...props
}) => {
  const { eloBadge } = useBadges()

  const IconComponent = eloBadge.icon

  return (
    <ChessBadge
      variant={eloBadge.variant}
      className={cn(
        'px-3 py-1 text-sm font-semibold flex items-center gap-1.5',
        eloBadge.colorClass,
        // Special handling for grandmaster gradient
        eloBadge.id === 'grandmaster' && 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black',
        className
      )}
      {...props}
    >
      {showIcon && <IconComponent size={14} />}
      <span>{eloBadge.label}</span>
      <span className="text-xs opacity-90">({rating})</span>
    </ChessBadge>
  )
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  showIcon = true,
  className,
  ...props
}) => {
  const { getStatusBadge } = useBadges()
  const badge = getStatusBadge(status.toUpperCase())

  if (!badge) return null

  const IconComponent = badge.icon

  return (
    <ChessBadge
      variant={badge.variant}
      className={cn(
        'px-2 py-1 text-xs font-medium flex items-center gap-1',
        badge.colorClass,
        className
      )}
      {...props}
    >
      {showIcon && <IconComponent size={12} />}
      {badge.label}
    </ChessBadge>
  )
}

// Convenience badge variants for common use cases
export const AchievementBadge: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => (
  <ChessBadge 
    variant="default" 
    className={cn('bg-gradient-to-r from-yellow-500 to-orange-600 text-black font-bold', className)}
  >
    {children}
  </ChessBadge>
)

export const RatingChangeBadge: React.FC<{ 
  change: number
  className?: string 
}> = ({ change, className }) => {
  const isPositive = change > 0
  const isNegative = change < 0
  
  return (
    <ChessBadge
      variant={isPositive ? 'default' : isNegative ? 'destructive' : 'secondary'}
      className={cn(
        'text-xs font-bold',
        isPositive && 'bg-green-600 text-white',
        isNegative && 'bg-red-600 text-white',
        className
      )}
    >
      {change > 0 ? '+' : ''}{change}
    </ChessBadge>
  )
}