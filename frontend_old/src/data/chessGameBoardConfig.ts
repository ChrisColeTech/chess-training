/**
 * Chess game board display configuration and UI settings
 * Extracted from ChessGameBoard.tsx component
 */

/**
 * Board sizing and responsive configuration
 */
export const boardConfig = {
  sizing: {
    // Calculate board width based on screen size
    maxWidth: 600,
    screenWidthRatio: 0.7,  // 70% of screen width
    screenHeightRatio: 0.6, // 60% of screen height
    
    // Responsive breakpoints
    mobile: { maxWidth: 350 },
    tablet: { maxWidth: 450 },
    desktop: { maxWidth: 600 }
  },
  
  display: {
    showCoordinates: true,
    showLastMove: true,
    enableAnimations: true,
    gpuAccelerated: true
  },
  
  styling: {
    cardClass: 'bg-black/20 border-white/10 backdrop-blur-xl',
    contentPadding: 'p-2',
    willChange: 'transform' // for GPU acceleration
  }
} as const

/**
 * Game status display configuration
 */
export const gameStatusConfig = {
  indicators: {
    aiThinking: {
      color: 'bg-yellow-400',
      animation: 'animate-pulse',
      message: 'is thinking...'
    },
    playerTurn: {
      color: 'bg-green-400',
      animation: 'animate-pulse',
      message: 'Your turn'
    },
    opponentTurn: {
      color: 'bg-green-400', 
      animation: 'animate-pulse',
      message: "'s turn"
    },
    paused: {
      color: 'text-blue-400',
      message: 'Battle Paused'
    }
  },
  
  gameResults: {
    draw: {
      text: 'Battle Draw!',
      color: 'text-yellow-400'
    },
    victory: {
      text: 'Victory!',
      color: 'text-green-400'
    },
    defeat: {
      text: 'Defeat!',
      color: 'text-red-400'
    }
  }
} as const

/**
 * Time control display configuration
 */
export const timeDisplayConfig = {
  colors: {
    critical: 'text-red-400',    // <= 30 seconds
    warning: 'text-yellow-400',  // <= 60 seconds
    normal: 'text-white'         // > 60 seconds
  },
  
  thresholds: {
    critical: 30000,  // 30 seconds in ms
    warning: 60000,   // 1 minute in ms
  },
  
  formatting: {
    showHours: false,
    padMinutes: false,
    padSeconds: true,
    separator: ':'
  }
} as const

/**
 * Player information display configuration
 */
export const playerInfoConfig = {
  icons: {
    player: '👤',
    opponent: '🤖'
  },
  
  display: {
    showAvatar: true,
    showRating: true,
    showDifficulty: true,
    showTimeRemaining: true
  },
  
  styling: {
    avatarSize: 'text-2xl',
    nameSize: 'text-sm',
    detailSize: 'text-xs'
  }
} as const

/**
 * Game control buttons configuration
 */
export const gameControlsConfig = {
  active: [
    {
      key: 'offerDraw',
      label: 'Offer Draw',
      icon: '🤝',
      variant: 'outline',
      style: 'bg-black/20 border-white/20 text-white hover:bg-black/30'
    },
    {
      key: 'pause',
      label: 'Pause',
      icon: '⏸️',
      variant: 'outline', 
      style: 'bg-black/20 border-white/20 text-white hover:bg-black/30'
    },
    {
      key: 'resign',
      label: 'Resign',
      icon: '🏳️',
      variant: 'outline',
      style: 'bg-red-900/20 border-red-500/30 text-red-400 hover:bg-red-900/30'
    }
  ],
  
  completed: [
    {
      key: 'newBattle',
      label: 'New Battle',
      icon: '🔄',
      variant: 'primary',
      style: 'primary-gradient'
    },
    {
      key: 'analyzeBattle',
      label: 'Analyze Battle',
      icon: '📊',
      variant: 'outline',
      style: 'bg-black/20 border-white/20 text-white hover:bg-black/30'
    }
  ]
} as const

/**
 * VS divider display configuration
 */
export const vsDividerConfig = {
  text: 'VS',
  styling: {
    fontSize: 'text-2xl',
    fontWeight: 'font-bold',
    opacity: 'opacity-60'
  },
  
  badge: {
    showMoveNumber: true,
    calculation: (moveCount: number) => Math.ceil((moveCount + 1) / 2)
  }
} as const

/**
 * Special board effects configuration
 */
export const boardEffectsConfig = {
  check: {
    enabled: true,
    style: 'absolute inset-0 pointer-events-none rounded-lg border-2 border-red-500 animate-pulse'
  },
  
  aiThinking: {
    showOverlay: false, // Disabled as per requirements
    showInHeader: true
  },
  
  animations: {
    hover: 'hover:scale-105',
    transition: 'transition-all duration-300',
    glow: 'glow-effect shadow-2xl'
  }
} as const

/**
 * Helper function to get time color based on remaining time
 */
export const getTimeColor = (timeMs: number, themeText: string): string => {
  if (timeMs <= timeDisplayConfig.thresholds.critical) {
    return timeDisplayConfig.colors.critical
  }
  if (timeMs <= timeDisplayConfig.thresholds.warning) {
    return timeDisplayConfig.colors.warning
  }
  return themeText
}

/**
 * Helper function to format time display
 */
export const formatGameTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  
  const { separator, padSeconds } = timeDisplayConfig.formatting
  const secondsStr = padSeconds ? seconds.toString().padStart(2, '0') : seconds.toString()
  
  return `${minutes}${separator}${secondsStr}`
}

/**
 * Helper function to calculate responsive board width
 */
export const calculateBoardWidth = (): number => {
  const { maxWidth, screenWidthRatio, screenHeightRatio } = boardConfig.sizing
  
  if (typeof window === 'undefined') return maxWidth
  
  return Math.min(
    maxWidth, 
    Math.min(
      window.innerWidth * screenWidthRatio, 
      window.innerHeight * screenHeightRatio
    )
  )
}

/**
 * Game header UI text and messages
 */
export const gameHeaderText = {
  title: 'Battle Arena',
  icons: {
    battle: '⚡',
    clock: '🕒',
    timer: '⏱️'
  }
} as const