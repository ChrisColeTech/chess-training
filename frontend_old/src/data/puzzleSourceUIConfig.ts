/**
 * Puzzle Source UI Configuration - FRONTEND PART
 * UI mapping configurations for puzzle sources and display settings
 */

// Source display mappings
export const sourceDisplayMappings = {
  'lichess-database': {
    name: 'Lichess',
    shortName: 'LI',
    color: 'text-orange-400',
    background: 'bg-orange-400/10',
    border: 'border-orange-400/30',
    icon: 'ExternalLink',
    description: 'Community puzzles from Lichess'
  },
  'chess-com-puzzles': {
    name: 'Chess.com',
    shortName: 'CC',
    color: 'text-green-400',
    background: 'bg-green-400/10',
    border: 'border-green-400/30',
    icon: 'ExternalLink',
    description: 'Curated puzzles from Chess.com'
  },
  'user-created': {
    name: 'User Created',
    shortName: 'UC',
    color: 'text-purple-400',
    background: 'bg-purple-400/10',
    border: 'border-purple-400/30',
    icon: 'User',
    description: 'Puzzles created by users'
  },
  'imported': {
    name: 'Imported',
    shortName: 'IM',
    color: 'text-blue-400',
    background: 'bg-blue-400/10',
    border: 'border-blue-400/30',
    icon: 'Download',
    description: 'Imported puzzle collections'
  },
  'community': {
    name: 'Community',
    shortName: 'CO',
    color: 'text-cyan-400',
    background: 'bg-cyan-400/10',
    border: 'border-cyan-400/30',
    icon: 'Users',
    description: 'Community contributed puzzles'
  }
} as const

// Source selection UI
export const sourceSelectionUI = {
  grid: {
    layout: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
    cardPadding: 'p-4',
    cardRounded: 'rounded-xl',
    cardTransition: 'transition-all duration-200'
  },
  
  card: {
    base: 'border-2 cursor-pointer hover:shadow-lg',
    selected: 'ring-2 ring-blue-400 ring-opacity-50',
    hover: 'hover:scale-[1.02]'
  },
  
  stats: {
    container: 'mt-2 text-sm text-slate-400',
    separator: ' • ',
    format: {
      puzzles: (count: number) => `${count.toLocaleString()} puzzles`,
      rating: (rating: number) => `~${rating} avg rating`,
      popularity: (score: number) => `${score}% popular`
    }
  }
} as const

// Source attribution display
export const sourceAttributionUI = {
  container: 'text-xs text-slate-500 mt-2',
  link: 'hover:text-blue-400 transition-colors',
  license: 'opacity-75',
  version: 'font-mono',
  lastUpdated: 'text-slate-600'
} as const

// Source filtering UI
export const sourceFilterUI = {
  // Filter chips
  chips: {
    container: 'flex flex-wrap gap-2 mb-4',
    chip: {
      base: 'px-3 py-1 rounded-full text-sm border transition-colors cursor-pointer',
      active: 'bg-blue-600 border-blue-500 text-white',
      inactive: 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'
    }
  },
  
  // Search input
  search: {
    container: 'relative mb-4',
    input: 'w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-slate-200',
    icon: 'absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400'
  },
  
  // Sort options
  sort: {
    container: 'flex items-center gap-2 mb-4',
    select: 'bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-slate-200',
    options: [
      { value: 'name', label: 'Name' },
      { value: 'puzzles', label: 'Puzzle Count' },
      { value: 'rating', label: 'Average Rating' },
      { value: 'updated', label: 'Last Updated' },
      { value: 'popularity', label: 'Popularity' }
    ]
  }
} as const