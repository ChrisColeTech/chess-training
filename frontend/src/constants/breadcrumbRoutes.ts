export interface BreadcrumbConfig {
  path: string
  label: string
  parent?: string
}

export const BREADCRUMB_ROUTES: Record<string, BreadcrumbConfig> = {
  // Root
  '/dashboard': {
    path: '/dashboard',
    label: 'Dashboard'
  },

  // Play section
  '/play/computer': {
    path: '/play/computer',
    label: 'vs Computer',
    parent: '/play'
  },
  '/play/online': {
    path: '/play/online', 
    label: 'Online Games',
    parent: '/play'
  },
  '/play': {
    path: '/play',
    label: 'Play'
  },

  // Puzzles section
  '/puzzles/daily': {
    path: '/puzzles/daily',
    label: 'Daily Puzzles',
    parent: '/puzzles'
  },
  '/puzzles/tactical': {
    path: '/puzzles/tactical',
    label: 'Tactical',
    parent: '/puzzles'
  },
  '/puzzles/endgame': {
    path: '/puzzles/endgame',
    label: 'Endgame',
    parent: '/puzzles'
  },
  '/puzzles': {
    path: '/puzzles',
    label: 'Puzzles'
  },

  // Progress section  
  '/progress/overview': {
    path: '/progress/overview',
    label: 'Overview',
    parent: '/progress'
  },
  '/progress/achievements': {
    path: '/progress/achievements',
    label: 'Achievements',
    parent: '/progress'
  },
  '/progress': {
    path: '/progress',
    label: 'Progress'
  },

  // Settings section
  '/settings/preferences': {
    path: '/settings/preferences',
    label: 'Preferences',
    parent: '/settings'
  },
  '/settings/account': {
    path: '/settings/account',
    label: 'Account',
    parent: '/settings'
  },
  '/settings': {
    path: '/settings',
    label: 'Settings'
  },

  // Help section
  '/help/tutorials': {
    path: '/help/tutorials',
    label: 'Tutorials',
    parent: '/help'
  },
  '/help/contact': {
    path: '/help/contact',
    label: 'Contact',
    parent: '/help'
  },
  '/help': {
    path: '/help',
    label: 'Help'
  }
}

export const getBreadcrumbPath = (pathname: string): BreadcrumbConfig[] => {
  const path: BreadcrumbConfig[] = []
  
  // Find exact match first
  let currentConfig = BREADCRUMB_ROUTES[pathname]
  
  // If no exact match, try to find best match
  if (!currentConfig) {
    const segments = pathname.split('/').filter(Boolean)
    let testPath = ''
    
    for (let i = segments.length; i > 0; i--) {
      testPath = '/' + segments.slice(0, i).join('/')
      if (BREADCRUMB_ROUTES[testPath]) {
        currentConfig = BREADCRUMB_ROUTES[testPath]
        break
      }
    }
  }
  
  // Build path by traversing parents
  while (currentConfig) {
    path.unshift(currentConfig)
    
    if (currentConfig.parent) {
      currentConfig = BREADCRUMB_ROUTES[currentConfig.parent]
    } else {
      break
    }
  }

  // Always start with Dashboard if not already included
  if (pathname !== '/dashboard' && path.length > 0 && path[0].path !== '/dashboard') {
    path.unshift(BREADCRUMB_ROUTES['/dashboard'])
  }
  
  return path
}