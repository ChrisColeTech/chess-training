/**
 * Board Themes Mock Data
 * Provides realistic chess board theme options for the visual mockup
 */

import type { 
  BoardTheme, 
  BoardSettings,
  PieceSet,
  BoardSoundEffect,
  CoordinateSettings,
  MoveHighlightSettings,
  AnimationSettings,
  SoundSettings,
  MarkupSettings
} from '@/types/boardSettings'

/**
 * Default coordinate settings
 */
export const defaultCoordinateSettings: CoordinateSettings = {
  show: true,
  position: 'outside',
  style: 'classic',
  colorScheme: 'auto'
}

/**
 * Default move highlighting settings
 */
export const defaultMoveHighlightSettings: MoveHighlightSettings = {
  showLastMove: true,
  showLegalMoves: true,
  style: 'dots',
  color: '#3b82f6',
  opacity: 0.7,
  showCheck: true,
  checkColor: '#ef4444'
}

/**
 * Default animation settings
 */
export const defaultAnimationSettings: AnimationSettings = {
  moveAnimation: true,
  speed: 'normal',
  captureAnimation: true,
  promotionAnimation: true,
  checkAnimation: true,
  checkmateAnimation: true
}

/**
 * Default sound settings
 */
export const defaultSoundSettings: SoundSettings = {
  enabled: true,
  volume: 0.7,
  moveSound: 'classic-click',
  captureSound: 'wooden-tap',
  checkSound: 'digital-beep',
  castlingSound: 'marble-knock',
  promotionSound: 'glass-clink',
  gameEndSound: 'metal-ping'
}

/**
 * Default markup settings
 */
export const defaultMarkupSettings: MarkupSettings = {
  enableArrows: true,
  arrowStyle: 'simple',
  arrowColor: '#22d3ee',
  arrowOpacity: 0.8,
  enableSquareHighlight: true,
  squareHighlightColor: '#fbbf24',
  squareHighlightOpacity: 0.6
}

/**
 * Available piece sets with preview information
 */
export const availablePieceSets: { id: PieceSet; name: string; preview: string; description: string }[] = [
  {
    id: 'classic-staunton',
    name: 'Classic Staunton',
    preview: '♚♛♜♝♞♟',
    description: 'Traditional tournament-style pieces'
  },
  {
    id: 'modern-sleek',
    name: 'Modern Sleek',
    preview: '♚♛♜♝♞♟',
    description: 'Clean contemporary design'
  },
  {
    id: 'medieval-fantasy',
    name: 'Medieval Fantasy',
    preview: '♚♛♜♝♞♟',
    description: 'Epic fantasy kingdom pieces'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    preview: '♚♛♜♝♞♟',
    description: 'Simple geometric shapes'
  },
  {
    id: 'ornate-royal',
    name: 'Ornate Royal',
    preview: '♚♛♜♝♞♟',
    description: 'Luxurious royal court style'
  },
  {
    id: 'pixel-retro',
    name: 'Pixel Retro',
    preview: '♚♛♜♝♞♟',
    description: '8-bit gaming nostalgia'
  },
  {
    id: 'neon-glow',
    name: 'Neon Glow',
    preview: '♚♛♜♝♞♟',
    description: 'Cyberpunk glowing pieces'
  },
  {
    id: 'crystal-clear',
    name: 'Crystal Clear',
    preview: '♚♛♜♝♞♟',
    description: 'Transparent crystal pieces'
  },
  {
    id: 'wooden-carved',
    name: 'Wooden Carved',
    preview: '♚♛♜♝♞♟',
    description: 'Handcrafted wooden pieces'
  },
  {
    id: 'metal-luxury',
    name: 'Metal Luxury',
    preview: '♚♛♜♝♞♟',
    description: 'Premium metallic finish'
  }
]

/**
 * Available board sound effects
 */
export const availableSoundEffects: { id: BoardSoundEffect; name: string; description: string }[] = [
  { id: 'classic-click', name: 'Classic Click', description: 'Traditional chess piece sound' },
  { id: 'wooden-tap', name: 'Wooden Tap', description: 'Natural wood board sound' },
  { id: 'marble-knock', name: 'Marble Knock', description: 'Elegant marble surface' },
  { id: 'glass-clink', name: 'Glass Clink', description: 'Crystal clear glass sound' },
  { id: 'metal-ping', name: 'Metal Ping', description: 'Metallic resonance' },
  { id: 'digital-beep', name: 'Digital Beep', description: 'Futuristic electronic sound' },
  { id: 'stone-thud', name: 'Stone Thud', description: 'Heavy stone impact' },
  { id: 'paper-rustle', name: 'Paper Rustle', description: 'Soft paper movement' },
  { id: 'none', name: 'Silent', description: 'No sound effects' }
]

/**
 * Classic board themes collection
 */
export const classicThemes: BoardTheme[] = [
  {
    id: 'classic-wood',
    name: 'Classic Wood',
    description: 'Traditional wooden chess board',
    category: 'classic',
    material: 'wood-classic',
    lightSquare: '#f0d9b5',
    darkSquare: '#b58863',
    border: {
      show: true,
      style: 'classic',
      width: 'medium',
      color: '#8b4513',
      material: 'wood-classic'
    },
    background: 'wood-grain',
    pieceSet: 'classic-staunton',
    previewImage: '/images/themes/classic-wood.jpg',
    isPremium: false,
    isUnlocked: true,
    author: 'Chess Masters',
    createdAt: Date.now() - 86400000 * 30
  },
  {
    id: 'marble-luxury',
    name: 'Marble Luxury',
    description: 'Elegant marble chess set',
    category: 'luxury',
    material: 'marble-white',
    lightSquare: '#f8f8ff',
    darkSquare: '#708090',
    border: {
      show: true,
      style: 'ornate',
      width: 'thick',
      color: '#2f4f4f',
      material: 'marble-black'
    },
    background: 'marble-veins',
    pieceSet: 'ornate-royal',
    previewImage: '/images/themes/marble-luxury.jpg',
    isPremium: true,
    isUnlocked: true,
    author: 'Luxury Games',
    createdAt: Date.now() - 86400000 * 20
  },
  {
    id: 'tournament-standard',
    name: 'Tournament Standard',
    description: 'Official tournament specification',
    category: 'classic',
    material: 'wood-dark',
    lightSquare: '#fffacd',
    darkSquare: '#8b4513',
    border: {
      show: true,
      style: 'simple',
      width: 'thin',
      color: '#654321',
      material: 'wood-dark'
    },
    background: 'plain',
    pieceSet: 'classic-staunton',
    previewImage: '/images/themes/tournament-standard.jpg',
    isPremium: false,
    isUnlocked: true,
    author: 'FIDE Official',
    createdAt: Date.now() - 86400000 * 45
  }
]

/**
 * Modern board themes collection
 */
export const modernThemes: BoardTheme[] = [
  {
    id: 'minimalist-zen',
    name: 'Minimalist Zen',
    description: 'Clean and simple design',
    category: 'minimal',
    material: 'glass-clear',
    lightSquare: '#ffffff',
    darkSquare: '#e0e0e0',
    border: {
      show: false,
      style: 'simple',
      width: 'thin',
      color: '#cccccc',
      material: 'glass-clear'
    },
    background: 'plain',
    pieceSet: 'minimalist',
    previewImage: '/images/themes/minimalist-zen.jpg',
    isPremium: false,
    isUnlocked: true,
    author: 'Zen Design',
    createdAt: Date.now() - 86400000 * 15
  },
  {
    id: 'glass-modern',
    name: 'Glass Modern',
    description: 'Transparent glass aesthetics',
    category: 'modern',
    material: 'glass-frosted',
    lightSquare: '#f0f8ff',
    darkSquare: '#4682b4',
    border: {
      show: true,
      style: 'modern',
      width: 'medium',
      color: '#1e90ff',
      material: 'glass-frosted'
    },
    background: 'plain',
    pieceSet: 'crystal-clear',
    previewImage: '/images/themes/glass-modern.jpg',
    isPremium: true,
    isUnlocked: false,
    author: 'Glass Artisans',
    createdAt: Date.now() - 86400000 * 10
  },
  {
    id: 'carbon-tech',
    name: 'Carbon Tech',
    description: 'High-tech carbon fiber look',
    category: 'modern',
    material: 'carbon-fiber',
    lightSquare: '#36454f',
    darkSquare: '#2c3e50',
    border: {
      show: true,
      style: 'modern',
      width: 'thin',
      color: '#34495e',
      material: 'carbon-fiber'
    },
    background: 'circuit-pattern',
    pieceSet: 'modern-sleek',
    previewImage: '/images/themes/carbon-tech.jpg',
    isPremium: true,
    isUnlocked: true,
    author: 'Tech Forge',
    createdAt: Date.now() - 86400000 * 7
  }
]

/**
 * Fantasy board themes collection
 */
export const fantasyThemes: BoardTheme[] = [
  {
    id: 'medieval-castle',
    name: 'Medieval Castle',
    description: 'Epic medieval battleground',
    category: 'fantasy',
    material: 'stone-granite',
    lightSquare: '#deb887',
    darkSquare: '#8b7355',
    border: {
      show: true,
      style: 'ornate',
      width: 'thick',
      color: '#696969',
      material: 'stone-granite'
    },
    background: 'stone-natural',
    pieceSet: 'medieval-fantasy',
    previewImage: '/images/themes/medieval-castle.jpg',
    isPremium: true,
    isUnlocked: true,
    author: 'Fantasy Realms',
    createdAt: Date.now() - 86400000 * 25
  },
  {
    id: 'dragon-lair',
    name: 'Dragon Lair',
    description: 'Mystical dragon treasure chamber',
    category: 'fantasy',
    material: 'metal-gold',
    lightSquare: '#ffd700',
    darkSquare: '#b8860b',
    border: {
      show: true,
      style: 'ornate',
      width: 'thick',
      color: '#ff8c00',
      material: 'metal-gold'
    },
    background: 'stone-natural',
    pieceSet: 'ornate-royal',
    previewImage: '/images/themes/dragon-lair.jpg',
    isPremium: true,
    isUnlocked: false,
    author: 'Mythical Games',
    createdAt: Date.now() - 86400000 * 12
  },
  {
    id: 'enchanted-forest',
    name: 'Enchanted Forest',
    description: 'Magical woodland realm',
    category: 'fantasy',
    material: 'wood-dark',
    lightSquare: '#98fb98',
    darkSquare: '#228b22',
    border: {
      show: true,
      style: 'classic',
      width: 'medium',
      color: '#006400',
      material: 'wood-dark'
    },
    background: 'wood-grain',
    pieceSet: 'wooden-carved',
    previewImage: '/images/themes/enchanted-forest.jpg',
    isPremium: true,
    isUnlocked: true,
    author: 'Nature Spirits',
    createdAt: Date.now() - 86400000 * 18
  }
]

/**
 * Neon/Cyber board themes collection
 */
export const neonThemes: BoardTheme[] = [
  {
    id: 'cyber-matrix',
    name: 'Cyber Matrix',
    description: 'Digital reality battlefield',
    category: 'neon',
    material: 'neon-cyber',
    lightSquare: '#001a1a',
    darkSquare: '#00ff41',
    border: {
      show: true,
      style: 'gaming',
      width: 'medium',
      color: '#39ff14',
      material: 'neon-cyber'
    },
    background: 'circuit-pattern',
    pieceSet: 'neon-glow',
    previewImage: '/images/themes/cyber-matrix.jpg',
    isPremium: true,
    isUnlocked: true,
    author: 'Cyber Core',
    createdAt: Date.now() - 86400000 * 8
  },
  {
    id: 'neon-synthwave',
    name: 'Neon Synthwave',
    description: 'Retro-futuristic aesthetics',
    category: 'neon',
    material: 'neon-cyber',
    lightSquare: '#ff1493',
    darkSquare: '#9932cc',
    border: {
      show: true,
      style: 'gaming',
      width: 'medium',
      color: '#00ffff',
      material: 'neon-cyber'
    },
    background: 'space-stars',
    pieceSet: 'pixel-retro',
    previewImage: '/images/themes/neon-synthwave.jpg',
    isPremium: true,
    isUnlocked: false,
    author: 'Synthwave Studio',
    createdAt: Date.now() - 86400000 * 5
  },
  {
    id: 'hologram-blue',
    name: 'Hologram Blue',
    description: 'Futuristic holographic projection',
    category: 'neon',
    material: 'glass-clear',
    lightSquare: '#e0ffff',
    darkSquare: '#00bfff',
    border: {
      show: true,
      style: 'gaming',
      width: 'thin',
      color: '#1e90ff',
      material: 'glass-clear'
    },
    background: 'space-stars',
    pieceSet: 'crystal-clear',
    previewImage: '/images/themes/hologram-blue.jpg',
    isPremium: true,
    isUnlocked: true,
    author: 'Holo Tech',
    createdAt: Date.now() - 86400000 * 3
  }
]

/**
 * Vintage/Retro board themes collection
 */
export const vintageThemes: BoardTheme[] = [
  {
    id: 'vintage-paper',
    name: 'Vintage Paper',
    description: 'Old manuscript style',
    category: 'classic',
    material: 'paper-vintage',
    lightSquare: '#fdf5e6',
    darkSquare: '#deb887',
    border: {
      show: true,
      style: 'classic',
      width: 'medium',
      color: '#8b4513',
      material: 'paper-vintage'
    },
    background: 'paper-aged',
    pieceSet: 'classic-staunton',
    previewImage: '/images/themes/vintage-paper.jpg',
    isPremium: false,
    isUnlocked: true,
    author: 'Vintage Collection',
    createdAt: Date.now() - 86400000 * 60
  },
  {
    id: 'retro-arcade',
    name: 'Retro Arcade',
    description: '80s gaming nostalgia',
    category: 'neon',
    material: 'neon-cyber',
    lightSquare: '#ff6b35',
    darkSquare: '#f7931e',
    border: {
      show: true,
      style: 'gaming',
      width: 'thick',
      color: '#ffff00',
      material: 'neon-cyber'
    },
    background: 'circuit-pattern',
    pieceSet: 'pixel-retro',
    previewImage: '/images/themes/retro-arcade.jpg',
    isPremium: false,
    isUnlocked: true,
    author: 'Arcade Legends',
    createdAt: Date.now() - 86400000 * 40
  }
]

/**
 * All available board themes
 */
export const allBoardThemes: BoardTheme[] = [
  ...classicThemes,
  ...modernThemes,
  ...fantasyThemes,
  ...neonThemes,
  ...vintageThemes
]

/**
 * Get themes by category
 */
export const getThemesByCategory = (category: string): BoardTheme[] => {
  return allBoardThemes.filter(theme => theme.category === category)
}

/**
 * Get unlocked themes
 */
export const getUnlockedThemes = (): BoardTheme[] => {
  return allBoardThemes.filter(theme => theme.isUnlocked)
}

/**
 * Get premium themes
 */
export const getPremiumThemes = (): BoardTheme[] => {
  return allBoardThemes.filter(theme => theme.isPremium)
}

/**
 * Find theme by ID
 */
export const findThemeById = (id: string): BoardTheme | undefined => {
  return allBoardThemes.find(theme => theme.id === id)
}

/**
 * Default board settings
 */
export const defaultBoardSettings: BoardSettings = {
  theme: classicThemes[0], // Classic Wood
  size: 'medium',
  orientation: 'white',
  coordinates: defaultCoordinateSettings,
  highlighting: defaultMoveHighlightSettings,
  animations: defaultAnimationSettings,
  sounds: defaultSoundSettings,
  markup: defaultMarkupSettings,
  showLabels: true,
  enableContextMenu: true,
  enableDragDrop: true,
  autoQueen: false,
  showCapturedPieces: true,
  showMoveClock: false
}

/**
 * Sample custom themes for demonstration
 */
export const sampleCustomThemes: BoardTheme[] = [
  {
    id: 'custom-ocean',
    name: 'Ocean Depths',
    description: 'Custom underwater theme',
    category: 'modern',
    material: 'glass-clear',
    lightSquare: '#e0f6ff',
    darkSquare: '#87ceeb',
    border: {
      show: true,
      style: 'modern',
      width: 'medium',
      color: '#4682b4',
      material: 'glass-clear'
    },
    background: 'plain',
    pieceSet: 'crystal-clear',
    previewImage: '/images/themes/custom-ocean.jpg',
    isPremium: false,
    isUnlocked: true,
    author: 'Player Custom',
    createdAt: Date.now() - 86400000 * 2
  },
  {
    id: 'custom-sunset',
    name: 'Sunset Glow',
    description: 'Warm sunset colors',
    category: 'modern',
    material: 'wood-classic',
    lightSquare: '#ffa500',
    darkSquare: '#ff6347',
    border: {
      show: true,
      style: 'classic',
      width: 'medium',
      color: '#ff4500',
      material: 'wood-classic'
    },
    background: 'wood-grain',
    pieceSet: 'wooden-carved',
    previewImage: '/images/themes/custom-sunset.jpg',
    isPremium: false,
    isUnlocked: true,
    author: 'Player Custom',
    createdAt: Date.now() - 86400000 * 1
  }
]

/**
 * Board size configurations
 */
export const boardSizeConfigs = {
  'small': { size: 320, label: 'Small (320px)' },
  'medium': { size: 480, label: 'Medium (480px)' },
  'large': { size: 640, label: 'Large (640px)' },
  'extra-large': { size: 800, label: 'Extra Large (800px)' }
}

/**
 * Popular theme collections for quick selection
 */
export const popularCollections = {
  'beginner-friendly': {
    name: 'Beginner Friendly',
    description: 'Clear and simple themes perfect for learning',
    themes: [
      classicThemes[0], // Classic Wood
      classicThemes[2], // Tournament Standard
      modernThemes[0], // Minimalist Zen
    ]
  },
  'tournament-pro': {
    name: 'Tournament Pro',
    description: 'Professional tournament-style boards',
    themes: [
      classicThemes[2], // Tournament Standard
      classicThemes[0], // Classic Wood
      vintageThemes[0], // Vintage Paper
    ]
  },
  'gaming-elite': {
    name: 'Gaming Elite',
    description: 'Epic gaming themes for competitive play',
    themes: [
      neonThemes[0], // Cyber Matrix
      fantasyThemes[0], // Medieval Castle
      modernThemes[2], // Carbon Tech
    ]
  }
}