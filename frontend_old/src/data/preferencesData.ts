export interface LanguageOption {
  value: string
  label: string
  nativeName: string
  flag: string
  rtl: boolean
  completeness: number // Percentage of translations completed
  region?: string
}

export interface ThemeOption {
  value: 'midnight' | 'cyber' | 'neon' | 'royal' | 'classic'
  label: string
  description: string
  primaryColors: string[]
  accentColor: string
  backgroundGradient: string
  isPremium: boolean
}

export interface UIDensityOption {
  value: 'compact' | 'comfortable' | 'spacious'
  label: string
  description: string
  spacing: number // Base spacing multiplier
  fontSize: number // Base font size multiplier
}

export interface AnimationIntensity {
  value: 'reduced' | 'normal' | 'enhanced'
  label: string
  description: string
  transitionDuration: number
  effectIntensity: number
}

export interface ChessNotationOption {
  value: string
  label: string
  description: string
  example: string
}

export interface StartupBehaviorOption {
  value: 'dashboard' | 'last_page' | 'training' | 'custom'
  label: string
  description: string
  icon: string
}

// Language options with comprehensive metadata
export const languageOptions: LanguageOption[] = [
  {
    value: 'en',
    label: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    rtl: false,
    completeness: 100,
    region: 'US'
  },
  {
    value: 'es',
    label: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    rtl: false,
    completeness: 95,
    region: 'ES'
  },
  {
    value: 'fr',
    label: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    rtl: false,
    completeness: 92,
    region: 'FR'
  },
  {
    value: 'de',
    label: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    rtl: false,
    completeness: 90,
    region: 'DE'
  },
  {
    value: 'ru',
    label: 'Russian',
    nativeName: 'Русский',
    flag: '🇷🇺',
    rtl: false,
    completeness: 88,
    region: 'RU'
  },
  {
    value: 'zh',
    label: 'Chinese',
    nativeName: '中文',
    flag: '🇨🇳',
    rtl: false,
    completeness: 85,
    region: 'CN'
  },
  {
    value: 'ja',
    label: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    rtl: false,
    completeness: 82,
    region: 'JP'
  },
  {
    value: 'pt',
    label: 'Portuguese',
    nativeName: 'Português',
    flag: '🇵🇹',
    rtl: false,
    completeness: 87,
    region: 'PT'
  },
  {
    value: 'it',
    label: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    rtl: false,
    completeness: 83,
    region: 'IT'
  },
  {
    value: 'ar',
    label: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    rtl: true,
    completeness: 75,
    region: 'SA'
  },
  {
    value: 'hi',
    label: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    rtl: false,
    completeness: 70,
    region: 'IN'
  },
  {
    value: 'ko',
    label: 'Korean',
    nativeName: '한국어',
    flag: '🇰🇷',
    rtl: false,
    completeness: 78,
    region: 'KR'
  }
]

// Visual theme options
export const themeOptions: ThemeOption[] = [
  {
    value: 'midnight',
    label: 'Midnight Blue',
    description: 'Deep blue theme perfect for focus',
    primaryColors: ['#1e293b', '#334155', '#475569'],
    accentColor: '#3b82f6',
    backgroundGradient: 'from-slate-900 to-blue-900',
    isPremium: false
  },
  {
    value: 'cyber',
    label: 'Cyber Green',
    description: 'Futuristic neon green aesthetic',
    primaryColors: ['#0f172a', '#1e293b', '#334155'],
    accentColor: '#10b981',
    backgroundGradient: 'from-slate-900 to-emerald-900',
    isPremium: true
  },
  {
    value: 'neon',
    label: 'Neon Purple',
    description: 'Vibrant purple with electric accents',
    primaryColors: ['#1a103d', '#2d1b69', '#422a7a'],
    accentColor: '#8b5cf6',
    backgroundGradient: 'from-purple-900 to-violet-900',
    isPremium: true
  },
  {
    value: 'royal',
    label: 'Royal Gold',
    description: 'Luxurious gold and dark theme',
    primaryColors: ['#1c1917', '#292524', '#44403c'],
    accentColor: '#f59e0b',
    backgroundGradient: 'from-stone-900 to-amber-900',
    isPremium: true
  },
  {
    value: 'classic',
    label: 'Classic Green',
    description: 'Traditional chess tournament colors',
    primaryColors: ['#14532d', '#166534', '#15803d'],
    accentColor: '#22c55e',
    backgroundGradient: 'from-green-900 to-green-700',
    isPremium: false
  }
]

// UI density options
export const uiDensityOptions: UIDensityOption[] = [
  {
    value: 'compact',
    label: 'Compact',
    description: 'Maximum information density',
    spacing: 0.75,
    fontSize: 0.9
  },
  {
    value: 'comfortable',
    label: 'Comfortable',
    description: 'Balanced spacing and readability',
    spacing: 1.0,
    fontSize: 1.0
  },
  {
    value: 'spacious',
    label: 'Spacious',
    description: 'Extra breathing room',
    spacing: 1.25,
    fontSize: 1.1
  }
]

// Animation intensity options
export const animationIntensityOptions: AnimationIntensity[] = [
  {
    value: 'reduced',
    label: 'Reduced',
    description: 'Minimal animations for better performance',
    transitionDuration: 150,
    effectIntensity: 0.5
  },
  {
    value: 'normal',
    label: 'Normal',
    description: 'Standard animation settings',
    transitionDuration: 300,
    effectIntensity: 1.0
  },
  {
    value: 'enhanced',
    label: 'Enhanced',
    description: 'Rich animations and effects',
    transitionDuration: 500,
    effectIntensity: 1.5
  }
]

// Chess piece notation options
export const pieceNotationOptions: ChessNotationOption[] = [
  {
    value: 'figurine',
    label: 'Figurine',
    description: 'Chess piece symbols',
    example: '♔♕♖♗♘♙'
  },
  {
    value: 'letter',
    label: 'Letter',
    description: 'Standard letter notation',
    example: 'KQRBNP'
  },
  {
    value: 'symbol',
    label: 'Symbol',
    description: 'Text-based symbols',
    example: 'K Q R B N P'
  }
]

// Move notation options
export const moveNotationOptions: ChessNotationOption[] = [
  {
    value: 'algebraic',
    label: 'Algebraic',
    description: 'Standard tournament notation',
    example: 'Nf3, Bb5+'
  },
  {
    value: 'long_algebraic',
    label: 'Long Algebraic',
    description: 'Full square notation',
    example: 'Ng1-f3'
  },
  {
    value: 'descriptive',
    label: 'Descriptive',
    description: 'Traditional English notation',
    example: 'N-KB3'
  },
  {
    value: 'coordinate',
    label: 'Coordinate',
    description: 'Simple coordinate system',
    example: 'g1f3'
  }
]

// Currency options
export const currencyOptions = [
  { value: 'USD', label: 'USD - US Dollar', symbol: '$', region: 'US' },
  { value: 'EUR', label: 'EUR - Euro', symbol: '€', region: 'EU' },
  { value: 'GBP', label: 'GBP - British Pound', symbol: '£', region: 'GB' },
  { value: 'JPY', label: 'JPY - Japanese Yen', symbol: '¥', region: 'JP' },
  { value: 'RUB', label: 'RUB - Russian Ruble', symbol: '₽', region: 'RU' },
  { value: 'CNY', label: 'CNY - Chinese Yuan', symbol: '¥', region: 'CN' },
  { value: 'CAD', label: 'CAD - Canadian Dollar', symbol: 'C$', region: 'CA' },
  { value: 'AUD', label: 'AUD - Australian Dollar', symbol: 'A$', region: 'AU' }
]

// Number format options
export const numberFormatOptions = [
  { value: 'default', label: 'Default - 1,234.56', example: '1,234.56' },
  { value: 'european', label: 'European - 1.234,56', example: '1.234,56' },
  { value: 'indian', label: 'Indian - 1,23,456.78', example: '1,23,456.78' },
  { value: 'scientific', label: 'Scientific - 1.23E+3', example: '1.23E+3' }
]

// Date format options
export const dateFormatOptions = [
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (US)', example: '12/25/2023' },
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (EU)', example: '25/12/2023' },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (ISO)', example: '2023-12-25' }
]

// Time format options
export const timeFormatOptions = [
  { value: '12h', label: '12 Hour (AM/PM)', example: '2:30 PM' },
  { value: '24h', label: '24 Hour (Military)', example: '14:30' }
]

// Startup behavior options
export const startupBehaviorOptions: StartupBehaviorOption[] = [
  {
    value: 'dashboard',
    label: 'Dashboard',
    description: 'Show main dashboard with overview',
    icon: '🏠'
  },
  {
    value: 'last_page',
    label: 'Last Visited Page',
    description: 'Return to where you left off',
    icon: '↩️'
  },
  {
    value: 'training',
    label: 'Training Center',
    description: 'Jump straight into practice',
    icon: '🎯'
  },
  {
    value: 'custom',
    label: 'Custom Page',
    description: 'Specify a custom starting page',
    icon: '⚙️'
  }
]

// Color blind mode options
export const colorBlindModeOptions = [
  { value: 'none', label: 'None', description: 'Standard colors' },
  { value: 'deuteranopia', label: 'Deuteranopia', description: 'Green-blind (most common)' },
  { value: 'protanopia', label: 'Protanopia', description: 'Red-blind' },
  { value: 'tritanopia', label: 'Tritanopia', description: 'Blue-blind (rare)' }
]

// Default preference values
export const defaultPreferences = {
  // Language
  currentLanguage: 'en',
  fallbackLanguage: 'en',
  autoDetectLanguage: true,
  showTranslations: false,
  region: 'US',
  currency: 'USD',
  numberFormat: 'default',
  pieceNotation: 'figurine',
  moveNotation: 'algebraic',

  // General
  autoSave: true,
  showTooltips: true,
  confirmDestructiveActions: true,
  rememberLastSession: true,
  enableKeyboardShortcuts: true,
  dateFormat: 'MM/DD/YYYY',
  timeFormat: '12h',
  timeZone: 'America/New_York',
  startupBehavior: 'dashboard',
  customStartupPage: '',
  showAdvancedFeatures: false,

  // Visual
  currentTheme: 'midnight',
  darkMode: true,
  highContrast: false,
  fontSize: 1.0,
  uiDensity: 'comfortable',
  animations: {
    enabled: true,
    particleEffects: true,
    backgroundEffects: true,
    transitions: true,
    intensity: 'normal'
  },
  layout: {
    compactMode: false,
    headerVisible: true
  },
  colorCustomization: {
    backgroundOpacity: 0.8,
    textContrast: 1.0
  },

  // Accessibility
  screenReader: {
    enabled: false,
    announceMovesImmediately: true,
    announceGameEvents: true,
    verboseDescriptions: false,
    readBoardPosition: true
  },
  keyboard: {
    enabled: false,
    focusIndicators: true,
    arrowKeyNavigation: true
  },
  visual: {
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    colorBlindMode: 'none'
  },
  audio: {
    soundCues: false,
    voiceAnnouncements: false,
    spatialAudio: false
  },
  motor: {
    clickAndHold: false,
    oneHandedMode: false,
    dragThreshold: 5,
    doubleClickSpeed: 500
  }
}