export interface BoardTheme {
  id: string
  name: string
  description: string
  category: 'classic' | 'modern' | 'fantasy' | 'neon' | 'luxury' | 'minimal'
  author: string
  createdAt: Date
  isPremium: boolean
  isUnlocked: boolean
  lightSquare: string
  darkSquare: string
  border: {
    show: boolean
    color: string
    width: 'thin' | 'medium' | 'thick'
  }
  background: 'plain' | 'wood-grain' | 'marble-veins' | 'space-stars' | 'gradient'
  pieceSet: string
  material: string
  popularity: number
  downloadCount: number
}

export interface ThemeCategory {
  id: string
  name: string
  description: string
  icon: string
  count: number
}

// Available board themes
export const availableBoardThemes: BoardTheme[] = [
  {
    id: 'classic-wood',
    name: 'Classic Wood',
    description: 'Traditional wooden chess board with warm brown tones',
    category: 'classic',
    author: 'ChessTraining Team',
    createdAt: new Date('2023-01-01'),
    isPremium: false,
    isUnlocked: true,
    lightSquare: '#f0d9b5',
    darkSquare: '#b58863',
    border: { show: true, color: '#8b4513', width: 'medium' },
    background: 'wood-grain',
    pieceSet: 'classic-staunton',
    material: 'wood',
    popularity: 95,
    downloadCount: 50000
  },
  {
    id: 'modern-blue',
    name: 'Modern Blue',
    description: 'Clean modern design with cool blue accents',
    category: 'modern',
    author: 'ModernChess Design',
    createdAt: new Date('2023-02-15'),
    isPremium: false,
    isUnlocked: true,
    lightSquare: '#e8f4fd',
    darkSquare: '#4a90e2',
    border: { show: true, color: '#2563eb', width: 'thin' },
    background: 'plain',
    pieceSet: 'modern-sleek',
    material: 'plastic',
    popularity: 88,
    downloadCount: 35000
  },
  {
    id: 'midnight-purple',
    name: 'Midnight Purple',
    description: 'Dark theme with purple highlights for night play',
    category: 'modern',
    author: 'DarkMode Studios',
    createdAt: new Date('2023-03-20'),
    isPremium: true,
    isUnlocked: false,
    lightSquare: '#2d1b69',
    darkSquare: '#1a0f3a',
    border: { show: true, color: '#8b5cf6', width: 'thick' },
    background: 'gradient',
    pieceSet: 'crystal-clear',
    material: 'crystal',
    popularity: 92,
    downloadCount: 28000
  },
  {
    id: 'green-tournament',
    name: 'Green Tournament',
    description: 'Professional tournament style with green cloth appearance',
    category: 'classic',
    author: 'Tournament Officials',
    createdAt: new Date('2022-11-10'),
    isPremium: false,
    isUnlocked: true,
    lightSquare: '#eeeed2',
    darkSquare: '#769656',
    border: { show: false, color: '', width: 'medium' },
    background: 'plain',
    pieceSet: 'classic-staunton',
    material: 'cloth',
    popularity: 78,
    downloadCount: 42000
  },
  {
    id: 'neon-cyber',
    name: 'Neon Cyber',
    description: 'Futuristic cyberpunk theme with glowing neon colors',
    category: 'neon',
    author: 'CyberChess Labs',
    createdAt: new Date('2023-04-05'),
    isPremium: true,
    isUnlocked: false,
    lightSquare: '#0d1b2a',
    darkSquare: '#001d3d',
    border: { show: true, color: '#00f5ff', width: 'thick' },
    background: 'space-stars',
    pieceSet: 'neon-glow',
    material: 'holographic',
    popularity: 85,
    downloadCount: 15000
  },
  {
    id: 'marble-luxury',
    name: 'Marble Luxury',
    description: 'Elegant marble finish with gold trim for luxury feel',
    category: 'luxury',
    author: 'Luxury Chess Co',
    createdAt: new Date('2023-01-25'),
    isPremium: true,
    isUnlocked: false,
    lightSquare: '#f8f8ff',
    darkSquare: '#696969',
    border: { show: true, color: '#ffd700', width: 'thick' },
    background: 'marble-veins',
    pieceSet: 'metal-luxury',
    material: 'marble',
    popularity: 90,
    downloadCount: 12000
  },
  {
    id: 'forest-fantasy',
    name: 'Forest Fantasy',
    description: 'Mystical forest theme with earthy greens and browns',
    category: 'fantasy',
    author: 'FantasyChess Studios',
    createdAt: new Date('2022-12-15'),
    isPremium: true,
    isUnlocked: false,
    lightSquare: '#8fbc8f',
    darkSquare: '#228b22',
    border: { show: true, color: '#654321', width: 'medium' },
    background: 'wood-grain',
    pieceSet: 'medieval-fantasy',
    material: 'wood',
    popularity: 82,
    downloadCount: 22000
  },
  {
    id: 'minimal-gray',
    name: 'Minimal Gray',
    description: 'Ultra-minimal design with subtle gray tones',
    category: 'minimal',
    author: 'MinimalDesign Co',
    createdAt: new Date('2023-03-01'),
    isPremium: false,
    isUnlocked: true,
    lightSquare: '#f5f5f5',
    darkSquare: '#d3d3d3',
    border: { show: false, color: '', width: 'thin' },
    background: 'plain',
    pieceSet: 'minimalist',
    material: 'plastic',
    popularity: 76,
    downloadCount: 31000
  },
  {
    id: 'retro-pixel',
    name: 'Retro Pixel',
    description: '8-bit inspired pixelated chess board for retro gamers',
    category: 'neon',
    author: 'RetroPixel Games',
    createdAt: new Date('2023-02-28'),
    isPremium: true,
    isUnlocked: false,
    lightSquare: '#ffff00',
    darkSquare: '#ff6600',
    border: { show: true, color: '#000000', width: 'thick' },
    background: 'plain',
    pieceSet: 'pixel-retro',
    material: 'digital',
    popularity: 79,
    downloadCount: 18000
  },
  {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    description: 'Calming ocean-inspired theme with various shades of blue',
    category: 'modern',
    author: 'AquaDesign Studio',
    createdAt: new Date('2023-04-12'),
    isPremium: false,
    isUnlocked: true,
    lightSquare: '#87ceeb',
    darkSquare: '#4682b4',
    border: { show: true, color: '#191970', width: 'medium' },
    background: 'gradient',
    pieceSet: 'modern-sleek',
    material: 'glass',
    popularity: 84,
    downloadCount: 29000
  }
]

// Theme categories with metadata
export const themeCategories: ThemeCategory[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional chess board styles',
    icon: '♔',
    count: availableBoardThemes.filter(t => t.category === 'classic').length
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary and clean designs',
    icon: '▲',
    count: availableBoardThemes.filter(t => t.category === 'modern').length
  },
  {
    id: 'fantasy',
    name: 'Fantasy',
    description: 'Magical and mystical themes',
    icon: '🏰',
    count: availableBoardThemes.filter(t => t.category === 'fantasy').length
  },
  {
    id: 'neon',
    name: 'Neon/Cyber',
    description: 'Futuristic and cyberpunk styles',
    icon: '⚡',
    count: availableBoardThemes.filter(t => t.category === 'neon').length
  },
  {
    id: 'luxury',
    name: 'Luxury',
    description: 'Premium materials and finishes',
    icon: '💎',
    count: availableBoardThemes.filter(t => t.category === 'luxury').length
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simplified designs',
    icon: '⬜',
    count: availableBoardThemes.filter(t => t.category === 'minimal').length
  }
]

// Popular themes (top-rated)
export const popularThemes = availableBoardThemes
  .sort((a, b) => b.popularity - a.popularity)
  .slice(0, 6)

// Free themes
export const freeThemes = availableBoardThemes.filter(theme => !theme.isPremium)

// Premium themes
export const premiumThemes = availableBoardThemes.filter(theme => theme.isPremium)

// Recently added themes
export const recentThemes = availableBoardThemes
  .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  .slice(0, 4)