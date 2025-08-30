export interface PieceSetInfo {
  id: string
  name: string
  description: string
  preview: string
  category: 'traditional' | 'modern' | 'fantasy' | 'gaming' | 'luxury'
  style: 'classic' | 'minimalist' | 'ornate' | 'pixel' | 'neon' | 'crystal' | 'carved' | 'metal'
  isPremium: boolean
  author: string
  createdAt: Date
}

export interface PieceCustomization {
  sizeScaling: number // 0.8 to 1.1
  shadowEffect: 'none' | 'soft' | 'hard'
  borderEnabled: boolean
  borderWidth: number
  borderColor: string
  glowEffect: boolean
  glowColor: string
  glowIntensity: number
}

// Available piece sets with full metadata
export const availablePieceSets: PieceSetInfo[] = [
  {
    id: 'classic-staunton',
    name: 'Classic Staunton',
    description: 'The traditional tournament-standard chess piece design used worldwide',
    preview: '♚♛♜♝♞♟',
    category: 'traditional',
    style: 'classic',
    isPremium: false,
    author: 'Howard Staunton',
    createdAt: new Date('1849-01-01')
  },
  {
    id: 'modern-sleek',
    name: 'Modern Sleek',
    description: 'Clean, contemporary design with sharp geometric lines',
    preview: '♔♕♖♗♘♙',
    category: 'modern',
    style: 'minimalist',
    isPremium: false,
    author: 'ChessTraining Team',
    createdAt: new Date('2023-01-15')
  },
  {
    id: 'medieval-fantasy',
    name: 'Medieval Fantasy',
    description: 'Ornate medieval pieces with fantasy elements and detailed craftsmanship',
    preview: '♚♛♜♝♞♟',
    category: 'fantasy',
    style: 'ornate',
    isPremium: true,
    author: 'FantasyChess Studios',
    createdAt: new Date('2022-06-10')
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Ultra-clean design focusing on essential shapes and clarity',
    preview: '♔♕♖♗♘♙',
    category: 'modern',
    style: 'minimalist',
    isPremium: false,
    author: 'MinimalDesign Co',
    createdAt: new Date('2023-03-20')
  },
  {
    id: 'ornate-royal',
    name: 'Ornate Royal',
    description: 'Luxurious pieces with golden details and royal embellishments',
    preview: '♚♛♜♝♞♟',
    category: 'luxury',
    style: 'ornate',
    isPremium: true,
    author: 'Royal Chess Makers',
    createdAt: new Date('2021-12-01')
  },
  {
    id: 'pixel-retro',
    name: 'Pixel Retro',
    description: '8-bit inspired pixelated pieces for retro gaming enthusiasts',
    preview: '♔♕♖♗♘♙',
    category: 'gaming',
    style: 'pixel',
    isPremium: true,
    author: 'RetroPixel Games',
    createdAt: new Date('2022-08-15')
  },
  {
    id: 'neon-glow',
    name: 'Neon Glow',
    description: 'Futuristic glowing pieces with cyberpunk aesthetics',
    preview: '♚♛♜♝♞♟',
    category: 'gaming',
    style: 'neon',
    isPremium: true,
    author: 'CyberChess Labs',
    createdAt: new Date('2023-02-28')
  },
  {
    id: 'crystal-clear',
    name: 'Crystal Clear',
    description: 'Transparent crystal-like pieces with prismatic effects',
    preview: '♔♕♖♗♘♙',
    category: 'luxury',
    style: 'crystal',
    isPremium: true,
    author: 'Crystal Artisans',
    createdAt: new Date('2022-11-05')
  },
  {
    id: 'wooden-carved',
    name: 'Wooden Carved',
    description: 'Hand-carved wooden pieces with natural grain textures',
    preview: '♚♛♜♝♞♟',
    category: 'traditional',
    style: 'carved',
    isPremium: false,
    author: 'Traditional Crafters',
    createdAt: new Date('2020-05-14')
  },
  {
    id: 'metal-luxury',
    name: 'Metal Luxury',
    description: 'Premium metallic pieces with brushed steel and gold accents',
    preview: '♔♕♖♗♘♙',
    category: 'luxury',
    style: 'metal',
    isPremium: true,
    author: 'Luxury Chess Co',
    createdAt: new Date('2021-09-22')
  }
]

// Piece set categories with descriptions
export const pieceSetCategories = [
  {
    id: 'traditional',
    name: 'Traditional',
    description: 'Classic tournament-standard pieces',
    icon: '♚',
    count: availablePieceSets.filter(p => p.category === 'traditional').length
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary and minimalist designs',
    icon: '▲',
    count: availablePieceSets.filter(p => p.category === 'modern').length
  },
  {
    id: 'fantasy',
    name: 'Fantasy',
    description: 'Medieval and fantasy-themed pieces',
    icon: '⚔',
    count: availablePieceSets.filter(p => p.category === 'fantasy').length
  },
  {
    id: 'gaming',
    name: 'Gaming',
    description: 'Digital and gaming-inspired styles',
    icon: '🎮',
    count: availablePieceSets.filter(p => p.category === 'gaming').length
  },
  {
    id: 'luxury',
    name: 'Luxury',
    description: 'Premium materials and finishes',
    icon: '💎',
    count: availablePieceSets.filter(p => p.category === 'luxury').length
  }
]

// Default piece customization settings
export const defaultPieceCustomization: PieceCustomization = {
  sizeScaling: 1.0,
  shadowEffect: 'soft',
  borderEnabled: false,
  borderWidth: 2,
  borderColor: '#ffffff',
  glowEffect: false,
  glowColor: '#3b82f6',
  glowIntensity: 0.5
}

// Piece scaling options
export const pieceSizeOptions = [
  { value: 0.8, label: '80%' },
  { value: 0.9, label: '90%' },
  { value: 1.0, label: '100%' },
  { value: 1.1, label: '110%' }
]

// Shadow effect options
export const shadowEffectOptions = [
  { value: 'none', label: 'None' },
  { value: 'soft', label: 'Soft' },
  { value: 'hard', label: 'Hard' }
]