/**
 * Progress UI Configuration - FRONTEND PART
 * UI display settings and styling for progress tracking interface
 */

import { TrendingUp, TrendingDown } from 'lucide-react'

// Trend direction types
export type TrendDirection = 'up' | 'down' | 'neutral'

// Trend configuration
export const trendConfig = {
  up: {
    icon: TrendingUp,
    color: 'text-green-400',
    label: 'Trending Up'
  },
  down: {
    icon: TrendingDown,
    color: 'text-red-400',
    label: 'Trending Down'
  },
  neutral: {
    icon: null,
    color: 'text-slate-400',
    label: 'Stable'
  }
} as const

// Helper function to get trend icon
export const getTrendIcon = (trend: TrendDirection) => {
  return trendConfig[trend].icon
}

// Helper function to get trend color
export const getTrendColor = (trend: TrendDirection): string => {
  return trendConfig[trend].color
}

// Stats card configuration
export const statsCardConfig = {
  // Grid layouts
  gridLayouts: {
    compact: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    standard: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
    expanded: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8'
  },
  
  // Card styling
  baseCard: {
    background: 'bg-gradient-to-br from-slate-800/60 to-slate-900/60',
    backdrop: 'backdrop-blur-sm',
    border: 'border border-slate-700/50',
    borderRadius: 'rounded-xl',
    transition: 'transition-all duration-300',
    shadow: 'hover:shadow-lg hover:shadow-slate-900/20'
  },
  
  // HUD effects
  hudEffects: {
    borderGlow: 'hover:border-slate-600/70',
    cornerAccent: {
      width: 'w-6 h-6',
      opacity: 'opacity-20',
      gradientFrom: 'from-slate-400',
      gradientTo: 'to-transparent'
    },
    statusIndicator: {
      size: 'w-2 h-2',
      position: 'top-2 right-2',
      glow: 'animate-pulse'
    }
  },
  
  // Animation timings
  animations: {
    scaleHover: 'hover:scale-[1.02]',
    scaleActive: 'active:scale-[0.98]',
    fadeIn: 'opacity-0 group-hover:opacity-100',
    fadeOut: 'opacity-100 group-hover:opacity-0',
    duration: 'duration-300'
  }
} as const

// Progress bar configuration
export const progressBarConfig = {
  // Size variants
  sizes: {
    small: {
      height: 'h-1',
      textSize: 'text-xs',
      spacing: 'mb-1',
      iconSize: 12
    },
    medium: {
      height: 'h-2',
      textSize: 'text-sm',
      spacing: 'mb-2',
      iconSize: 16
    },
    large: {
      height: 'h-3',
      textSize: 'text-base',
      spacing: 'mb-3',
      iconSize: 20
    },
    xlarge: {
      height: 'h-4',
      textSize: 'text-lg',
      spacing: 'mb-4',
      iconSize: 24
    }
  },
  
  // Visual effects
  effects: {
    shine: 'bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse',
    glow: 'opacity-30 animate-pulse',
    milestone: 'w-1 h-1 rounded-full transition-colors duration-300'
  },
  
  // Thresholds for special effects
  thresholds: {
    nearCompletion: 90, // Show "almost there" at 90%+
    highProgress: 75,   // Enable glow effects at 75%+
    completion: 100     // Full completion
  },
  
  // Milestone markers
  milestoneMarkers: [25, 50, 75, 100]
} as const

// Command center HUD styling
export const commandCenterConfig = {
  // Panel effects
  panelEffects: {
    borderEffect: 'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300',
    topBorder: 'absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-400/50 to-transparent',
    bottomBorder: 'absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-400/30 to-transparent',
    cornerDecoration: 'absolute bottom-0 left-0 w-6 h-6 opacity-20'
  },
  
  // Status indicators
  statusIndicators: {
    active: 'bg-green-400/60',
    warning: 'bg-yellow-400/60',
    error: 'bg-red-400/60',
    neutral: 'bg-slate-400/60',
    pulse: 'animate-pulse'
  },
  
  // Typography
  typography: {
    title: 'text-xs font-medium text-slate-300 uppercase tracking-wide',
    value: 'text-2xl font-bold text-white leading-tight',
    subtitle: 'text-xs text-slate-400',
    change: 'text-xs font-medium'
  }
} as const

// Loading skeleton configuration
export const loadingSkeletonConfig = {
  // Animation
  animation: 'animate-pulse',
  
  // Base styling
  base: 'bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl',
  
  // Element variants
  elements: {
    icon: 'w-5 h-5 bg-slate-700 rounded',
    value: 'w-16 h-6 bg-slate-700 rounded',
    title: 'w-20 h-3 bg-slate-700 rounded',
    subtitle: 'w-24 h-3 bg-slate-700 rounded',
    indicator: 'w-4 h-4 bg-slate-700 rounded'
  },
  
  // Grid configurations
  gridSizes: [4, 6, 8, 12], // Number of skeleton cards to show
  
  // Stagger animation
  animationDelay: 100 // ms between skeleton appearances
} as const

// Performance metrics configuration
export const performanceMetricsConfig = {
  // Color coding for performance levels
  performanceLevels: {
    excellent: {
      threshold: 90,
      color: 'text-green-400',
      background: 'bg-green-400/10',
      border: 'border-green-400/30'
    },
    good: {
      threshold: 75,
      color: 'text-blue-400',
      background: 'bg-blue-400/10',
      border: 'border-blue-400/30'
    },
    average: {
      threshold: 50,
      color: 'text-yellow-400',
      background: 'bg-yellow-400/10',
      border: 'border-yellow-400/30'
    },
    needsWork: {
      threshold: 0,
      color: 'text-red-400',
      background: 'bg-red-400/10',
      border: 'border-red-400/30'
    }
  },
  
  // Chart colors
  chartColors: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    neutral: '#64748b'
  }
} as const

// Helper function to get performance level
export const getPerformanceLevel = (value: number) => {
  if (value >= 90) return performanceMetricsConfig.performanceLevels.excellent
  if (value >= 75) return performanceMetricsConfig.performanceLevels.good
  if (value >= 50) return performanceMetricsConfig.performanceLevels.average
  return performanceMetricsConfig.performanceLevels.needsWork
}

// Helper function to format numbers
export const formatNumber = (num: number) => {
  return num.toLocaleString()
}

// Helper function to format percentage
export const formatPercentage = (num: number, decimals: number = 1) => {
  return `${num.toFixed(decimals)}%`
}