/**
 * Puzzle Selection UI Configuration - FRONTEND PART
 * UI settings and defaults for puzzle selection interface
 */

// Selection UI themes
export const selectionUIThemes = {
  default: {
    background: 'bg-slate-800/60',
    border: 'border-slate-700/50',
    text: 'text-slate-200',
    accent: 'text-blue-400'
  },
  focused: {
    background: 'bg-blue-900/40',
    border: 'border-blue-600/50',
    text: 'text-blue-100',
    accent: 'text-blue-300'
  },
  success: {
    background: 'bg-green-900/40',
    border: 'border-green-600/50',
    text: 'text-green-100',
    accent: 'text-green-300'
  }
} as const

// Filter UI configuration
export const filterUIConfig = {
  // Difficulty selector
  difficulty: {
    layout: 'grid-cols-2 md:grid-cols-4 gap-2',
    buttonSize: 'px-3 py-2',
    textSize: 'text-sm',
    rounded: 'rounded-lg'
  },
  
  // Theme selector
  themes: {
    layout: 'flex flex-wrap gap-2',
    tagStyle: 'px-2 py-1 rounded-full text-xs',
    maxVisible: 8
  },
  
  // Rating range
  ratingRange: {
    slider: {
      track: 'bg-slate-700',
      thumb: 'bg-blue-500',
      fill: 'bg-blue-400'
    },
    display: {
      container: 'flex justify-between mt-2',
      label: 'text-xs text-slate-400'
    }
  }
} as const

// Selection algorithm display
export const algorithmUIConfig = {
  random: {
    icon: 'Shuffle',
    color: 'text-purple-400',
    description: 'Random puzzle selection'
  },
  adaptive: {
    icon: 'Brain',
    color: 'text-blue-400',
    description: 'AI-powered adaptive selection'
  },
  progressive: {
    icon: 'TrendingUp',
    color: 'text-green-400',
    description: 'Progressive difficulty increase'
  },
  'weakness-focused': {
    icon: 'Target',
    color: 'text-red-400',
    description: 'Focus on weak areas'
  }
} as const

// Time control options for UI
export const timeControlOptions = [
  { value: 'blitz', label: 'Blitz (< 5 min)', color: 'text-red-400' },
  { value: 'rapid', label: 'Rapid (5-15 min)', color: 'text-yellow-400' },
  { value: 'untimed', label: 'Untimed', color: 'text-green-400' }
] as const