/**
 * Game analysis configuration and display settings
 * Extracted from GameAnalysis.tsx and MoveHistory.tsx components
 */

/**
 * Position analysis aspects configuration
 */
export const positionAspects = {
  materialBalance: {
    name: 'Material Balance',
    icon: '⚖️',
    description: 'Material advantage/disadvantage'
  },
  kingSafety: {
    name: 'King Safety',
    icon: '🛡️',
    description: 'King position security'
  },
  centerControl: {
    name: 'Center Control',
    icon: '🎯',
    description: 'Control of central squares'
  },
  pawnStructure: {
    name: 'Pawn Structure',
    icon: '🗿',
    description: 'Pawn chain quality'
  }
} as const

/**
 * Position aspect evaluation colors
 */
export const positionAspectColors = {
  'White': 'text-green-400',
  'Safe': 'text-green-400', 
  'Good': 'text-green-400',
  'Equal': 'text-yellow-400',
  'Average': 'text-yellow-400',
  'Black': 'text-orange-400',
  'Exposed': 'text-orange-400',
  'Poor': 'text-orange-400',
  'Critical': 'text-red-400'
} as const

/**
 * Tactical theme icons and descriptions
 */
export const tacticalThemes = {
  check: {
    name: 'Check',
    icon: '✓',
    description: 'King in check'
  },
  capture: {
    name: 'Capture',
    icon: '×',
    description: 'Piece capture'
  },
  fork: {
    name: 'Fork',
    icon: '⚡',
    description: 'Double attack on two pieces'
  },
  pin: {
    name: 'Pin',
    icon: '📌',
    description: 'Piece cannot move without exposing more valuable piece'
  },
  skewer: {
    name: 'Skewer',
    icon: '🗡️',
    description: 'Attack forcing valuable piece to move'
  },
  sacrifice: {
    name: 'Sacrifice',
    icon: '🔥',
    description: 'Material sacrifice for advantage'
  },
  discovery: {
    name: 'Discovery',
    icon: '👁️',
    description: 'Discovered attack'
  },
  deflection: {
    name: 'Deflection',
    icon: '↗️',
    description: 'Forcing piece away from defense'
  },
  attraction: {
    name: 'Attraction',
    icon: '🧲',
    description: 'Forcing piece to bad square'
  },
  interference: {
    name: 'Interference',
    icon: '🚧',
    description: 'Blocking piece communication'
  }
} as const

/**
 * Get tactical theme icon
 */
export const getTacticalIcon = (theme: string): string => {
  const normalizedTheme = theme.toLowerCase()
  return tacticalThemes[normalizedTheme as keyof typeof tacticalThemes]?.icon || '⚔️'
}

/**
 * Game phase determination thresholds
 */
export const gamePhaseThresholds = {
  opening: 10,  // moves < 10 = opening
  middlegame: 30, // moves < 30 = middlegame
  // moves >= 30 = endgame
} as const

/**
 * Battle intensity categories based on evaluation
 */
export const battleIntensityLevels = {
  positional: {
    threshold: 0.5,
    name: 'Positional Maneuvering',
    description: 'Strategic position building'
  },
  active: {
    threshold: 1.5,
    name: 'Active Combat',
    description: 'Tactical opportunities emerging'
  },
  decisive: {
    threshold: Infinity,
    name: 'Decisive Battle',
    description: 'Critical moment in the game'
  }
} as const

/**
 * Get battle intensity based on evaluation
 */
export const getBattleIntensity = (evaluation: number): string => {
  const absEval = Math.abs(evaluation)
  
  if (absEval > battleIntensityLevels.active.threshold) {
    return battleIntensityLevels.decisive.name
  }
  if (absEval > battleIntensityLevels.positional.threshold) {
    return battleIntensityLevels.active.name
  }
  return battleIntensityLevels.positional.name
}

/**
 * Analysis visualization configuration
 */
export const analysisVisualization = {
  evaluationBar: {
    height: 3, // h-3 in Tailwind
    centerLine: true,
    animationDuration: 'duration-200'
  },
  
  progressBar: {
    background: 'bg-gray-700',
    foreground: 'bg-gradient-to-r from-blue-500 to-purple-500'
  },
  
  badges: {
    evaluation: (score: number) => {
      const abs = Math.abs(score)
      if (abs > 2) return 'bg-red-500/20 text-white'
      if (abs > 1) return 'bg-orange-500/20 text-white'
      if (abs > 0.5) return 'bg-yellow-500/20 text-white'
      return 'bg-green-500/20 text-white'
    }
  }
} as const

/**
 * Move history display configuration
 */
export const moveHistoryConfig = {
  display: {
    showTimes: true,
    showEvaluations: false, // can be toggled
    showSpecialNotation: true,
    groupByPairs: true
  },
  
  specialNotations: {
    check: { symbol: '✓', description: 'Check!' },
    checkmate: { symbol: '#', description: 'Checkmate!' },
    castleKingside: { symbol: '🏰', description: 'Kingside Castle' },
    castleQueenside: { symbol: '🏰', description: 'Queenside Castle' },
    promotion: { symbol: '👑', description: 'Promotion' },
    capture: { symbol: '×', description: 'Capture' }
  },
  
  statistics: {
    showMovePairs: true,
    showCaptureCount: true,
    showLastMoveTime: true,
    showGameProgress: true
  }
} as const

/**
 * Get special move notation
 */
export const getMoveSpecialNotation = (move: any): string | null => {
  if (move.san.includes('#')) return moveHistoryConfig.specialNotations.checkmate.description
  if (move.san.includes('+')) return moveHistoryConfig.specialNotations.check.description
  if (move.captured) return `Captured ${move.captured}`
  if (move.san.includes('O-O-O')) return moveHistoryConfig.specialNotations.castleQueenside.description
  if (move.san.includes('O-O')) return moveHistoryConfig.specialNotations.castleKingside.description
  if (move.san.includes('=')) return moveHistoryConfig.specialNotations.promotion.description
  return null
}

/**
 * Time formatting utility configuration
 */
export const timeFormatConfig = {
  showHours: false,
  showMinutes: true,
  showSeconds: true,
  padSeconds: true,
  separator: ':'
} as const

/**
 * Format move time display
 */
export const formatMoveTime = (timeRemaining: number): string => {
  const totalSeconds = Math.floor(timeRemaining / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}${timeFormatConfig.separator}${seconds.toString().padStart(2, '0')}`
}

/**
 * Game analysis UI text and messages
 */
export const analysisUIText = {
  headers: {
    battleAnalysis: 'Battle Analysis',
    positionEvaluation: 'Position Evaluation',
    strategicAssessment: 'Strategic Assessment',
    openingAnalysis: 'Opening Analysis',
    tacticalElements: 'Tactical Elements',
    battleInsights: 'Battle Insights',
    battleChronicle: 'Battle Chronicle'
  },
  
  buttons: {
    analyzePosition: 'Analyze Position',
    analyzing: 'Analyzing...',
    latest: 'Latest'
  },
  
  labels: {
    battleStatus: 'Battle Status',
    recommendedMoves: 'Recommended Moves',
    openingSequence: 'Opening Sequence:',
    activeMotifs: 'Active tactical motifs in this position:',
    gamePhase: 'Game Phase',
    battleIntensity: 'Battle Intensity'
  },
  
  empty: {
    noBattle: 'No active battle to analyze',
    noMoves: 'No moves recorded yet. The battle awaits your first strike!',
    noAnalysis: 'Start analysis to see engine lines'
  }
} as const