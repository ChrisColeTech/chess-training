/**
 * Game setup configuration options and display settings
 * Extracted from GameSetup.tsx component
 */

import type { PlayerColor } from '@/types/playComputer'

/**
 * Player color options with display information
 */
export const playerColorOptions: Array<{
  color: PlayerColor
  name: string
  icon: string
  description: string
}> = [
  {
    color: 'white',
    name: 'White',
    icon: '♔',
    description: 'Play with white pieces (move first)'
  },
  {
    color: 'black',
    name: 'Black',
    icon: '♚',
    description: 'Play with black pieces (respond to opponent)'
  },
  {
    color: 'random',
    name: 'Random',
    icon: '🎲',
    description: 'Randomly assign color at game start'
  }
] as const

/**
 * Time control color coding for different game types
 */
export const timeControlColors = {
  'Blitz': 'bg-red-500/20 text-red-400 border-red-500/30',
  'Rapid': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Classical': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Unlimited': 'bg-green-500/20 text-green-400 border-green-500/30'
} as const

/**
 * Advanced game settings configuration
 */
export const advancedGameSettings = [
  {
    key: 'useOpeningBook' as const,
    name: 'Opening Book',
    description: 'Use standard openings',
    icon: '📚',
    category: 'gameplay',
    colors: 'data-[state=checked]:from-cyan-500 data-[state=checked]:to-blue-500'
  },
  {
    key: 'showHints' as const,
    name: 'Move Hints',
    description: 'Show suggested moves',
    icon: '💡',
    category: 'assistance',
    colors: 'data-[state=checked]:from-yellow-500 data-[state=checked]:to-orange-500'
  },
  {
    key: 'enableSounds' as const,
    name: 'Sound Effects',
    description: 'Battle audio feedback',
    icon: '🔊',
    category: 'interface',
    colors: 'data-[state=checked]:from-green-500 data-[state=checked]:to-emerald-500',
    defaultValue: true
  }
] as const

/**
 * Game setup validation rules
 */
export const gameSetupValidation = {
  required: {
    opponent: true,
    playerColor: true,
    timeControl: true
  },
  
  defaults: {
    playerColor: 'white' as PlayerColor,
    useOpeningBook: false,
    showHints: false,
    enableSounds: true
  }
} as const

/**
 * Battle summary display configuration
 */
export const battleSummaryConfig = {
  icons: {
    player: '👤',
    battle: '⚔️',
    settings: '⚙️'
  },
  
  features: {
    openingBook: '📚',
    hints: '💡',
    sounds: '🔊'
  }
} as const

/**
 * Game setup UI messages and text
 */
export const gameSetupMessages = {
  header: {
    title: 'BATTLE CONFIGURATION',
    subtitle: 'Configure your battle settings and prepare for combat'
  },
  
  colorSelection: {
    title: 'Choose Your Side',
    description: 'Select which color pieces you want to command',
    randomNote: 'Random will assign a color automatically'
  },
  
  timeControl: {
    title: 'Time Control',
    description: 'Set the battle duration and time pressure'
  },
  
  advanced: {
    title: 'Advanced Configuration',
    description: 'Fine-tune your battle experience'
  },
  
  battleSummary: {
    title: 'Battle Summary'
  },
  
  startButton: {
    ready: 'ENTER BATTLE ARENA',
    notReady: 'Select Opponent First',
    requirementsText: 'Choose an opponent and configure your settings to begin battle'
  }
} as const

/**
 * Color icon mappings for different contexts
 */
export const colorIconMappings = {
  white: {
    piece: '♔',
    symbol: '⚪',
    emoji: '👑',
    unicode: '♔'
  },
  black: {
    piece: '♚',
    symbol: '⚫',
    emoji: '🖤',
    unicode: '♚'
  },
  random: {
    piece: '🎲',
    symbol: '🔀',
    emoji: '🎲',
    unicode: '?'
  }
} as const

/**
 * Helper function to get color display information
 */
export const getColorInfo = (color: PlayerColor) => {
  return playerColorOptions.find(option => option.color === color)
}

/**
 * Helper function to get time control color class
 */
export const getTimeControlColor = (type: string) => {
  return timeControlColors[type as keyof typeof timeControlColors] || timeControlColors.Unlimited
}

/**
 * Game setup form field configuration
 */
export const gameSetupFields = {
  playerColor: {
    type: 'selection',
    required: true,
    options: playerColorOptions,
    layout: 'grid-3'
  },
  
  timeControl: {
    type: 'dropdown',
    required: true,
    placeholder: 'Select time control'
  },
  
  advanced: {
    type: 'toggles',
    required: false,
    settings: advancedGameSettings
  }
} as const