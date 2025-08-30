/**
 * Board Settings Types
 * Contains all TypeScript interfaces and types for chess board customization
 */

/**
 * Board size options
 */
export type BoardSize = 'small' | 'medium' | 'large' | 'extra-large'

/**
 * Board orientation
 */
export type BoardOrientation = 'white' | 'black'

/**
 * Board theme materials and textures
 */
export type BoardMaterial = 
  | 'wood-classic'
  | 'wood-dark'
  | 'marble-white'
  | 'marble-black' 
  | 'glass-clear'
  | 'glass-frosted'
  | 'metal-silver'
  | 'metal-gold'
  | 'neon-cyber'
  | 'stone-granite'
  | 'paper-vintage'
  | 'carbon-fiber'

/**
 * Chess piece set styles
 */
export type PieceSet = 
  | 'classic-staunton'
  | 'modern-sleek'
  | 'medieval-fantasy'
  | 'minimalist'
  | 'ornate-royal'
  | 'pixel-retro'
  | 'neon-glow'
  | 'crystal-clear'
  | 'wooden-carved'
  | 'metal-luxury'

/**
 * Move highlighting styles
 */
export type HighlightStyle = 'dots' | 'border' | 'glow' | 'solid' | 'none'

/**
 * Animation speed settings
 */
export type AnimationSpeed = 'instant' | 'fast' | 'normal' | 'slow' | 'cinematic'

/**
 * Sound effect categories for board interactions
 */
export type BoardSoundEffect = 
  | 'classic-click'
  | 'wooden-tap'
  | 'marble-knock' 
  | 'glass-clink'
  | 'metal-ping'
  | 'digital-beep'
  | 'stone-thud'
  | 'paper-rustle'
  | 'none'

/**
 * Arrow markup styles
 */
export type ArrowStyle = 'simple' | 'curved' | 'bold' | 'dashed' | 'glowing'

/**
 * Board background patterns
 */
export type BoardBackground = 
  | 'plain'
  | 'wood-grain'
  | 'marble-veins'
  | 'leather-texture'
  | 'metal-brushed'
  | 'space-stars'
  | 'circuit-pattern'
  | 'stone-natural'
  | 'paper-aged'

/**
 * Coordinate display preferences
 */
export interface CoordinateSettings {
  /** Whether to show coordinates */
  show: boolean
  
  /** Position of coordinates */
  position: 'inside' | 'outside' | 'both'
  
  /** Coordinate style */
  style: 'classic' | 'bold' | 'minimal' | 'gaming'
  
  /** Coordinate color theme */
  colorScheme: 'auto' | 'light' | 'dark' | 'accent'
}

/**
 * Move highlighting configuration
 */
export interface MoveHighlightSettings {
  /** Highlight last move */
  showLastMove: boolean
  
  /** Highlight legal moves */
  showLegalMoves: boolean
  
  /** Highlight style */
  style: HighlightStyle
  
  /** Highlight color */
  color: string
  
  /** Opacity level (0-1) */
  opacity: number
  
  /** Show check highlight */
  showCheck: boolean
  
  /** Check highlight color */
  checkColor: string
}

/**
 * Animation preferences
 */
export interface AnimationSettings {
  /** Piece movement animation */
  moveAnimation: boolean
  
  /** Animation speed */
  speed: AnimationSpeed
  
  /** Capture animation */
  captureAnimation: boolean
  
  /** Promotion animation */
  promotionAnimation: boolean
  
  /** Check animation */
  checkAnimation: boolean
  
  /** Checkmate animation */
  checkmateAnimation: boolean
}

/**
 * Sound preferences for board interactions
 */
export interface SoundSettings {
  /** Enable board sounds */
  enabled: boolean
  
  /** Master volume (0-1) */
  volume: number
  
  /** Move sound effect */
  moveSound: BoardSoundEffect
  
  /** Capture sound effect */
  captureSound: BoardSoundEffect
  
  /** Check sound effect */
  checkSound: BoardSoundEffect
  
  /** Castling sound effect */
  castlingSound: BoardSoundEffect
  
  /** Promotion sound effect */
  promotionSound: BoardSoundEffect
  
  /** Game end sound effect */
  gameEndSound: BoardSoundEffect
}

/**
 * Arrow and markup customization
 */
export interface MarkupSettings {
  /** Enable arrow drawing */
  enableArrows: boolean
  
  /** Arrow style */
  arrowStyle: ArrowStyle
  
  /** Default arrow color */
  arrowColor: string
  
  /** Arrow opacity (0-1) */
  arrowOpacity: number
  
  /** Enable square highlighting */
  enableSquareHighlight: boolean
  
  /** Square highlight color */
  squareHighlightColor: string
  
  /** Square highlight opacity (0-1) */
  squareHighlightOpacity: number
}

/**
 * Board border and frame settings
 */
export interface BorderSettings {
  /** Show border */
  show: boolean
  
  /** Border style */
  style: 'simple' | 'classic' | 'ornate' | 'modern' | 'gaming'
  
  /** Border width */
  width: 'thin' | 'medium' | 'thick'
  
  /** Border color */
  color: string
  
  /** Border material effect */
  material: BoardMaterial
}

/**
 * Represents a complete board theme
 */
export interface BoardTheme {
  /** Unique identifier */
  id: string
  
  /** Display name */
  name: string
  
  /** Theme description */
  description: string
  
  /** Theme category */
  category: 'classic' | 'modern' | 'fantasy' | 'neon' | 'luxury' | 'minimal'
  
  /** Board material */
  material: BoardMaterial
  
  /** Light square color */
  lightSquare: string
  
  /** Dark square color */
  darkSquare: string
  
  /** Board border settings */
  border: BorderSettings
  
  /** Background pattern */
  background: BoardBackground
  
  /** Piece set style */
  pieceSet: PieceSet
  
  /** Preview image URL */
  previewImage: string
  
  /** Whether this is a premium theme */
  isPremium: boolean
  
  /** Whether this theme is unlocked */
  isUnlocked: boolean
  
  /** Theme creator/author */
  author: string
  
  /** Creation date */
  createdAt: number
}

/**
 * Complete board settings configuration
 */
export interface BoardSettings {
  /** Current theme */
  theme: BoardTheme
  
  /** Board size */
  size: BoardSize
  
  /** Board orientation */
  orientation: BoardOrientation
  
  /** Coordinate display settings */
  coordinates: CoordinateSettings
  
  /** Move highlighting settings */
  highlighting: MoveHighlightSettings
  
  /** Animation preferences */
  animations: AnimationSettings
  
  /** Sound preferences */
  sounds: SoundSettings
  
  /** Arrow and markup settings */
  markup: MarkupSettings
  
  /** Show rank and file labels */
  showLabels: boolean
  
  /** Enable right-click context menu */
  enableContextMenu: boolean
  
  /** Enable drag and drop */
  enableDragDrop: boolean
  
  /** Auto-queen promotion */
  autoQueen: boolean
  
  /** Show captured pieces */
  showCapturedPieces: boolean
  
  /** Show move clock */
  showMoveClock: boolean
}

/**
 * Board settings export/import format
 */
export interface BoardSettingsExport {
  /** Format version */
  version: string
  
  /** Export timestamp */
  exportedAt: number
  
  /** Settings data */
  settings: BoardSettings
  
  /** Custom themes included */
  customThemes: BoardTheme[]
  
  /** Export metadata */
  metadata: {
    appVersion: string
    userName: string
    description?: string
  }
}

/**
 * Props for BoardPreview component
 */
export interface BoardPreviewProps {
  /** Current board settings */
  settings: BoardSettings
  
  /** Preview position (FEN) */
  position?: string
  
  /** Preview size */
  size?: 'small' | 'medium' | 'large'
  
  /** Whether preview is interactive */
  interactive?: boolean
  
  /** Theme from store */
  theme: any
}

/**
 * Props for ThemeSelector component
 */
export interface ThemeSelectorProps {
  /** Available themes */
  themes: BoardTheme[]
  
  /** Currently selected theme */
  selectedTheme: BoardTheme
  
  /** Callback when theme is selected */
  onThemeSelect: (theme: BoardTheme) => void
  
  /** Whether to show premium themes */
  showPremium: boolean
  
  /** Theme category filter */
  categoryFilter?: string
  
  /** Theme from store */
  theme: any
}

/**
 * Props for PieceSelector component
 */
export interface PieceSelectorProps {
  /** Available piece sets */
  pieceSets: { id: PieceSet; name: string; preview: string; description?: string }[]
  
  /** Currently selected piece set */
  selectedPieceSet: PieceSet
  
  /** Callback when piece set is selected */
  onPieceSetSelect: (pieceSet: PieceSet) => void
  
  /** Theme from store */
  theme: any
}

/**
 * Props for BoardControls component
 */
export interface BoardControlsProps {
  /** Current board settings */
  settings: BoardSettings
  
  /** Callback when settings change */
  onSettingsChange: (settings: Partial<BoardSettings>) => void
  
  /** Theme from store */
  theme: any
}

/**
 * Hook return type for useBoardSettings
 */
export interface BoardSettingsHookReturn {
  // Settings state
  settings: BoardSettings
  availableThemes: BoardTheme[]
  customThemes: BoardTheme[]
  
  // Loading states
  isLoading: boolean
  isSaving: boolean
  isExporting: boolean
  isImporting: boolean
  
  // Actions
  updateSettings: (settings: Partial<BoardSettings>) => void
  selectTheme: (theme: BoardTheme) => void
  resetToDefaults: () => void
  saveSettings: () => Promise<void>
  exportSettings: () => Promise<string>
  importSettings: (data: string) => Promise<boolean>
  createCustomTheme: (theme: Omit<BoardTheme, 'id' | 'createdAt'>) => void
  deleteCustomTheme: (themeId: string) => void
  
  // Utilities
  previewSettings: (tempSettings: Partial<BoardSettings>) => void
  applyPreview: () => void
  cancelPreview: () => void
  isPreviewMode: boolean
  
  // Error handling
  error: string | null
  clearError: () => void
}

/**
 * Board theme creation wizard steps
 */
export interface ThemeWizardStep {
  /** Step identifier */
  id: string
  
  /** Step title */
  title: string
  
  /** Step description */
  description: string
  
  /** Whether step is completed */
  completed: boolean
  
  /** Whether step is current */
  current: boolean
}

/**
 * Theme creation data
 */
export interface ThemeCreationData {
  /** Basic theme info */
  basic: {
    name: string
    description: string
    category: BoardTheme['category']
    author: string
  }
  
  /** Color scheme */
  colors: {
    lightSquare: string
    darkSquare: string
    borderColor: string
  }
  
  /** Material and texture */
  materials: {
    boardMaterial: BoardMaterial
    background: BoardBackground
    pieceSet: PieceSet
  }
  
  /** Advanced settings */
  advanced: {
    border: BorderSettings
    isPremium: boolean
  }
}