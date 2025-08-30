/**
 * Puzzle Statistics UI Configuration - FRONTEND PART
 * UI display settings for puzzle statistics and progress displays
 */

// Statistics display configuration
export const puzzleStatsUIConfig = {
  // Card layouts
  layouts: {
    compact: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    expanded: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    detailed: 'grid-cols-1 md:grid-cols-1 lg:grid-cols-2'
  },
  
  // Performance indicators
  performanceColors: {
    excellent: 'text-green-400 bg-green-400/10 border-green-400/30',
    good: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
    average: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
    needsImprovement: 'text-red-400 bg-red-400/10 border-red-400/30'
  },
  
  // Chart configurations
  chartDefaults: {
    height: 200,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const
      }
    }
  },
  
  // Progress bar styling
  progressBar: {
    height: 'h-2',
    background: 'bg-slate-700',
    fill: 'bg-gradient-to-r from-blue-500 to-purple-500',
    radius: 'rounded-full'
  }
} as const

// Streak display configuration
export const streakDisplayConfig = {
  colors: {
    current: 'text-orange-400',
    best: 'text-yellow-400',
    milestone: 'text-purple-400'
  },
  milestones: [5, 10, 25, 50, 100, 250, 500],
  animations: {
    increment: 'animate-bounce',
    milestone: 'animate-pulse'
  }
} as const

// Time formatting utilities for UI
export const timeFormats = {
  short: (seconds: number) => {
    if (seconds < 60) return `${seconds}s`
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  },
  
  long: (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hours > 0) return `${hours}h ${mins}m ${secs}s`
    if (mins > 0) return `${mins}m ${secs}s`
    return `${secs}s`
  }
}