import React from 'react'
import { cn } from '../../lib/utils'
import { useThemeStore } from '../../stores/themeStore'
import { useStatusBar } from '../../hooks/layout/useStatusBar'
import { RatingChangeBadge } from '../ui/ChessBadge'
import { RefreshCw, Monitor, User, MapPin } from 'lucide-react'

interface StatusBarProps {
  className?: string
  variant?: 'full' | 'compact' | 'minimal'
}

export const StatusBar: React.FC<StatusBarProps> = ({
  className,
  variant = 'full'
}) => {
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()
  
  const {
    connectionStatus,
    systemHealth,
    currentTime,
    currentPath,
    currentTheme,
    userRating,
    ratingChange,
    appUptime,
    formatTime,
    getStatusColor,
    refreshStatus
  } = useStatusBar()

  if (variant === 'minimal') {
    return (
      <div className={cn(
        'h-6 bg-black/30 backdrop-blur-sm border-t border-white/10',
        'flex items-center justify-between px-4 text-xs text-white/70',
        className
      )}>
        <div className="flex items-center gap-4">
          <div className={cn('flex items-center gap-1', getStatusColor(connectionStatus.status))}>
            <connectionStatus.icon size={12} />
            <span>{connectionStatus.label}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span>{formatTime(currentTime)}</span>
        </div>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={cn(
        'h-7 bg-black/30 backdrop-blur-sm border-t border-white/10',
        'flex items-center justify-between px-4 text-xs text-white/70',
        className
      )}>
        <div className="flex items-center gap-4">
          <div className={cn('flex items-center gap-1', getStatusColor(connectionStatus.status))}>
            <connectionStatus.icon size={12} />
            <span>{connectionStatus.label}</span>
          </div>
          
          <div className={cn('flex items-center gap-1', getStatusColor(systemHealth))}>
            <Monitor size={12} />
            <span className="capitalize">{systemHealth}</span>
          </div>

          <div className="flex items-center gap-1 text-purple-400">
            <User size={12} />
            <span>{userRating}</span>
            <RatingChangeBadge change={ratingChange} className="ml-1" />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <MapPin size={12} />
            <span>/{currentPath}</span>
          </div>
          
          <span>{formatTime(currentTime)}</span>
        </div>
      </div>
    )
  }

  // Full variant
  return (
    <div className={cn(
      'w-full h-8 bg-gradient-to-r from-black/40 via-black/30 to-black/40',
      'backdrop-blur-sm border-t border-white/10',
      'flex items-center justify-between px-6 text-xs text-white/80',
      'relative overflow-hidden shrink-0',
      className
    )}>
      {/* Background accent */}
      <div className={cn(
        'absolute inset-0 opacity-5',
        `bg-gradient-to-r ${theme.accent}`
      )} />
      
      <div className="relative flex items-center gap-6">
        {/* Connection Status */}
        <div className={cn(
          'flex items-center gap-2 px-2 py-1 rounded-sm',
          'bg-black/20 border border-white/10'
        )}>
          <div className={cn('flex items-center gap-1', getStatusColor(connectionStatus.status))}>
            <connectionStatus.icon size={12} />
            <span className="font-medium">{connectionStatus.label}</span>
          </div>
        </div>

        {/* System Health */}
        <div className="flex items-center gap-2">
          <Monitor size={12} className={getStatusColor(systemHealth)} />
          <span className="text-white/60">System:</span>
          <span className={cn('font-medium capitalize', getStatusColor(systemHealth))}>
            {systemHealth}
          </span>
        </div>

        {/* Current Theme */}
        <div className="flex items-center gap-2">
          <div className={cn('w-3 h-3 rounded-full bg-gradient-to-r', theme.accent)} />
          <span className="text-white/60">Theme:</span>
          <span>{currentTheme}</span>
        </div>

        {/* App Uptime */}
        <div className="flex items-center gap-2 text-white/60">
          <span>Uptime:</span>
          <span>{appUptime}</span>
        </div>
      </div>

      <div className="relative flex items-center gap-6">
        {/* User Rating */}
        <div className="flex items-center gap-2">
          <User size={12} className="text-purple-400" />
          <span className="text-white/60">ELO:</span>
          <span className="font-bold text-purple-400">{userRating}</span>
          <RatingChangeBadge change={ratingChange} />
        </div>

        {/* Current Path */}
        <div className="flex items-center gap-2">
          <MapPin size={12} className="text-blue-400" />
          <span className="text-white/60">Page:</span>
          <span className="font-medium">/{currentPath}</span>
        </div>

        {/* Clock */}
        <div className="flex items-center gap-2 font-mono">
          <span className="text-white/60">Time:</span>
          <span className="font-medium">{formatTime(currentTime)}</span>
        </div>

        {/* Refresh Button */}
        <button
          onClick={refreshStatus}
          className={cn(
            'p-1 rounded hover:bg-white/10 transition-colors',
            'text-white/60 hover:text-white/80'
          )}
          title="Refresh Status"
        >
          <RefreshCw size={12} />
        </button>
      </div>
    </div>
  )
}

// Convenience components for different layouts
export const DesktopStatusBar: React.FC<{ className?: string }> = ({ className }) => (
  <StatusBar variant="full" className={className} />
)

export const CompactStatusBar: React.FC<{ className?: string }> = ({ className }) => (
  <StatusBar variant="compact" className={className} />
)

export const MinimalStatusBar: React.FC<{ className?: string }> = ({ className }) => (
  <StatusBar variant="minimal" className={className} />
)