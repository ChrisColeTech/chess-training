/**
 * Study Plans UI Configuration - FRONTEND PART
 * UI settings and styling for study plans interface
 */

// Study plan card styling
export const studyPlanCardUI = {
  container: {
    base: 'bg-slate-800/60 border border-slate-700/50 rounded-xl p-6 transition-all duration-300',
    hover: 'hover:shadow-lg hover:shadow-slate-900/20 hover:border-slate-600/70',
    active: 'ring-2 ring-blue-400 ring-opacity-50'
  },
  
  header: {
    title: 'text-xl font-bold text-white mb-2',
    description: 'text-slate-400 mb-4 line-clamp-2'
  },
  
  progress: {
    container: 'mb-4',
    bar: {
      background: 'bg-slate-700 rounded-full h-2',
      fill: 'bg-gradient-to-r from-blue-500 to-purple-500 rounded-full h-2 transition-all duration-300'
    },
    text: 'text-sm text-slate-400 mt-1 flex justify-between'
  },
  
  stats: {
    container: 'grid grid-cols-3 gap-4 mb-4',
    item: {
      label: 'text-xs text-slate-500 uppercase tracking-wide',
      value: 'text-lg font-semibold text-white'
    }
  },
  
  actions: {
    container: 'flex gap-2',
    primary: 'bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium',
    secondary: 'bg-slate-700 hover:bg-slate-600 text-slate-200 px-4 py-2 rounded-lg text-sm font-medium'
  }
} as const

// Study plan creation UI
export const studyPlanCreationUI = {
  form: {
    container: 'space-y-6',
    section: 'space-y-4',
    sectionTitle: 'text-lg font-semibold text-white border-b border-slate-700 pb-2'
  },
  
  inputs: {
    text: 'w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-400',
    textarea: 'w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-400 h-24 resize-none',
    select: 'w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-slate-200'
  },
  
  goals: {
    container: 'space-y-2',
    item: {
      container: 'flex items-center gap-2 bg-slate-700/50 rounded-lg p-3',
      text: 'flex-1 bg-transparent border-none text-slate-200 placeholder-slate-400',
      removeBtn: 'text-red-400 hover:text-red-300 p-1'
    },
    addBtn: 'w-full border-2 border-dashed border-slate-600 rounded-lg p-3 text-slate-400 hover:border-slate-500 hover:text-slate-300 transition-colors'
  }
} as const

// Module display configuration
export const moduleDisplayUI = {
  list: {
    container: 'space-y-3',
    item: {
      base: 'bg-slate-700/30 border border-slate-600/50 rounded-lg p-4 transition-colors',
      completed: 'border-green-500/50 bg-green-500/10',
      current: 'border-blue-500/50 bg-blue-500/10'
    }
  },
  
  header: {
    container: 'flex items-start justify-between mb-2',
    title: 'font-semibold text-white',
    status: {
      completed: 'text-green-400',
      current: 'text-blue-400',
      pending: 'text-slate-400'
    }
  },
  
  content: {
    description: 'text-slate-400 text-sm mb-3',
    meta: 'flex items-center gap-4 text-xs text-slate-500',
    topics: {
      container: 'mt-2 space-y-1',
      item: {
        base: 'flex items-center gap-2 text-sm',
        completed: 'text-green-400',
        pending: 'text-slate-400'
      }
    }
  }
} as const

// Progress tracking UI
export const progressTrackingUI = {
  overview: {
    stats: {
      container: 'grid grid-cols-1 md:grid-cols-4 gap-4 mb-6',
      card: {
        container: 'bg-slate-800/60 border border-slate-700/50 rounded-lg p-4',
        value: 'text-2xl font-bold text-white',
        label: 'text-sm text-slate-400 mt-1'
      }
    }
  },
  
  timeline: {
    container: 'space-y-4',
    item: {
      container: 'flex gap-4',
      marker: {
        base: 'w-3 h-3 rounded-full mt-2',
        completed: 'bg-green-400',
        current: 'bg-blue-400',
        pending: 'bg-slate-600'
      },
      content: {
        container: 'flex-1 pb-4 border-b border-slate-700/50',
        title: 'font-medium text-white',
        description: 'text-slate-400 text-sm mt-1',
        date: 'text-slate-500 text-xs mt-2'
      }
    }
  }
} as const