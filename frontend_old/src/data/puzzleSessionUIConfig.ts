/**
 * Puzzle Session UI Configuration - FRONTEND PART
 * UI configurations for puzzle session interface and controls
 */

// Session UI layouts
export const sessionUILayouts = {
  compact: {
    grid: 'grid-cols-1 lg:grid-cols-3 gap-4',
    board: 'lg:col-span-2',
    sidebar: 'lg:col-span-1'
  },
  expanded: {
    grid: 'grid-cols-1 xl:grid-cols-4 gap-6',
    board: 'xl:col-span-3',
    sidebar: 'xl:col-span-1'
  },
  fullscreen: {
    grid: 'grid-cols-1',
    board: 'col-span-1',
    sidebar: 'fixed right-4 top-4 w-80'
  }
} as const

// Session controls styling
export const sessionControlsConfig = {
  toolbar: {
    background: 'bg-slate-800/80 backdrop-blur-sm',
    border: 'border-slate-700/50',
    padding: 'px-4 py-2',
    rounded: 'rounded-lg',
    shadow: 'shadow-lg'
  },
  
  buttons: {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg',
    secondary: 'bg-slate-700 hover:bg-slate-600 text-slate-200 px-4 py-2 rounded-lg',
    danger: 'bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg',
    ghost: 'hover:bg-slate-700/50 text-slate-300 px-3 py-2 rounded-lg'
  },
  
  timer: {
    container: 'flex items-center gap-2',
    display: 'font-mono text-lg font-bold',
    colors: {
      normal: 'text-slate-200',
      warning: 'text-yellow-400',
      danger: 'text-red-400'
    }
  }
} as const

// Progress indicators
export const sessionProgressConfig = {
  progressBar: {
    container: 'w-full bg-slate-700 rounded-full h-2',
    fill: 'bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300',
    text: 'text-sm text-slate-400 mt-1'
  },
  
  stats: {
    container: 'grid grid-cols-2 md:grid-cols-4 gap-4',
    item: {
      container: 'text-center',
      value: 'text-2xl font-bold text-white',
      label: 'text-xs text-slate-400 uppercase tracking-wide'
    }
  },
  
  streak: {
    container: 'flex items-center gap-1',
    icon: 'w-4 h-4',
    colors: {
      active: 'text-orange-400',
      inactive: 'text-slate-500'
    }
  }
} as const

// Session types styling
export const sessionTypeConfig = {
  timed: {
    color: 'text-red-400',
    background: 'bg-red-400/10',
    border: 'border-red-400/30',
    icon: 'Clock'
  },
  untimed: {
    color: 'text-green-400',
    background: 'bg-green-400/10',
    border: 'border-green-400/30',
    icon: 'Infinity'
  },
  survival: {
    color: 'text-orange-400',
    background: 'bg-orange-400/10',
    border: 'border-orange-400/30',
    icon: 'Zap'
  },
  themed: {
    color: 'text-purple-400',
    background: 'bg-purple-400/10',
    border: 'border-purple-400/30',
    icon: 'Bookmark'
  }
} as const