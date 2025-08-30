/**
 * Preferences Types
 * Contains all TypeScript interfaces and types for user preferences and settings
 */

/**
 * Available theme options for the application
 */
export type ThemeOption = 'midnight' | 'cyber' | 'neon' | 'royal' | 'matrix'

/**
 * Available language options
 */
export type LanguageOption = 'en' | 'es' | 'fr' | 'de' | 'ru' | 'zh' | 'ja'

/**
 * Animation intensity levels
 */
export type AnimationIntensity = 'none' | 'reduced' | 'normal' | 'enhanced'

/**
 * Sound quality options
 */
export type SoundQuality = 'low' | 'medium' | 'high' | 'ultra'

/**
 * Board coordinate display options
 */
export type CoordinateDisplay = 'none' | 'border' | 'inside' | 'both'

/**
 * Move notation formats
 */
export type NotationFormat = 'algebraic' | 'long_algebraic' | 'descriptive' | 'coordinate'

/**
 * Privacy levels for data sharing
 */
export type PrivacyLevel = 'private' | 'friends' | 'public' | 'anonymous'

/**
 * Backup frequency options
 */
export type BackupFrequency = 'never' | 'daily' | 'weekly' | 'monthly'

/**
 * Performance optimization levels
 */
export type PerformanceLevel = 'battery_saver' | 'balanced' | 'performance' | 'maximum'

/**
 * General application preferences
 */
export interface GeneralPreferences {
  /** Auto-save user progress */
  autoSave: boolean
  
  /** Show tooltips for new users */
  showTooltips: boolean
  
  /** Confirm before destructive actions */
  confirmDestructiveActions: boolean
  
  /** Remember last session state */
  rememberLastSession: boolean
  
  /** Default time zone */
  timeZone: string
  
  /** Date format preference */
  dateFormat: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD'
  
  /** Time format preference */
  timeFormat: '12h' | '24h'
  
  /** Show advanced features */
  showAdvancedFeatures: boolean
  
  /** Enable keyboard shortcuts */
  enableKeyboardShortcuts: boolean
  
  /** Startup behavior */
  startupBehavior: 'dashboard' | 'last_page' | 'training' | 'custom'
  
  /** Custom startup page */
  customStartupPage?: string
}

/**
 * Theme and appearance settings
 */
export interface AppearancePreferences {
  /** Current theme selection */
  currentTheme: ThemeOption
  
  /** Preferred themes list */
  favoriteThemes: ThemeOption[]
  
  /** Dark mode preference */
  darkMode: boolean
  
  /** High contrast mode */
  highContrast: boolean
  
  /** Font size multiplier */
  fontSize: number
  
  /** UI density */
  uiDensity: 'compact' | 'comfortable' | 'spacious'
  
  /** Animation preferences */
  animations: {
    enabled: boolean
    intensity: AnimationIntensity
    reduceMotion: boolean
    particleEffects: boolean
    transitions: boolean
    backgroundEffects: boolean
  }
  
  /** Color customizations */
  colorCustomization: {
    accentColor?: string
    primaryColor?: string
    backgroundOpacity: number
    textContrast: number
  }
  
  /** Layout preferences */
  layout: {
    sidebarCollapsed: boolean
    sidebarWidth: number
    headerVisible: boolean
    footerVisible: boolean
    compactMode: boolean
  }
}

/**
 * Language and localization preferences
 */
export interface LanguagePreferences {
  /** Current language */
  currentLanguage: LanguageOption
  
  /** Fallback language */
  fallbackLanguage: LanguageOption
  
  /** Regional settings */
  region: string
  
  /** Currency preference */
  currency: string
  
  /** Number format */
  numberFormat: 'default' | 'european' | 'indian' | 'scientific'
  
  /** Chess piece notation */
  pieceNotation: 'figurine' | 'letter' | 'symbol'
  
  /** Move notation format */
  moveNotation: NotationFormat
  
  /** Show translations */
  showTranslations: boolean
  
  /** Auto-detect language */
  autoDetectLanguage: boolean
}

/**
 * Accessibility settings
 */
export interface AccessibilityPreferences {
  /** Screen reader support */
  screenReader: {
    enabled: boolean
    announceMovesImmediately: boolean
    announceGameEvents: boolean
    verboseDescriptions: boolean
    readBoardPosition: boolean
  }
  
  /** Keyboard navigation */
  keyboard: {
    enabled: boolean
    customShortcuts: Record<string, string>
    focusIndicators: boolean
    skipToContent: boolean
    arrowKeyNavigation: boolean
  }
  
  /** Visual aids */
  visual: {
    highContrast: boolean
    largeText: boolean
    colorBlindMode: 'none' | 'deuteranopia' | 'protanopia' | 'tritanopia'
    reducedMotion: boolean
    flashingElements: boolean
    focusVisible: boolean
  }
  
  /** Audio cues */
  audio: {
    soundCues: boolean
    voiceAnnouncements: boolean
    moveSounds: boolean
    alertSounds: boolean
    backgroundMusic: boolean
    spatialAudio: boolean
  }
  
  /** Motor accessibility */
  motor: {
    clickAndHold: boolean
    dragThreshold: number
    doubleClickSpeed: number
    stickyKeys: boolean
    oneHandedMode: boolean
  }
}

/**
 * Performance and advanced options
 */
export interface PerformancePreferences {
  /** Performance level */
  performanceLevel: PerformanceLevel
  
  /** Graphics settings */
  graphics: {
    renderQuality: 'low' | 'medium' | 'high' | 'ultra'
    frameRate: 30 | 60 | 120 | 'unlimited'
    vsync: boolean
    antiAliasing: boolean
    shadows: boolean
    reflections: boolean
    particleCount: number
  }
  
  /** Memory management */
  memory: {
    cacheSize: number
    preloadContent: boolean
    compressData: boolean
    clearCacheOnExit: boolean
    maxHistorySize: number
  }
  
  /** Network settings */
  network: {
    connectionTimeout: number
    retryAttempts: number
    compressionEnabled: boolean
    offlineMode: boolean
    syncInterval: number
  }
  
  /** Advanced features */
  advanced: {
    debugMode: boolean
    developerTools: boolean
    experimentalFeatures: boolean
    betaTesting: boolean
    telemetryEnabled: boolean
    crashReporting: boolean
  }
}

/**
 * Data and privacy controls
 */
export interface PrivacyPreferences {
  /** Data collection consent */
  dataCollection: {
    analytics: boolean
    performance: boolean
    errorReporting: boolean
    usageStatistics: boolean
    gameHistory: boolean
    personalizedContent: boolean
  }
  
  /** Privacy settings */
  privacy: {
    profileVisibility: PrivacyLevel
    gameHistoryVisibility: PrivacyLevel
    statisticsVisibility: PrivacyLevel
    friendRequestsEnabled: boolean
    showOnlineStatus: boolean
    allowDirectMessages: boolean
  }
  
  /** Data sharing */
  sharing: {
    shareWithFriends: boolean
    shareWithCommunity: boolean
    shareAnonymously: boolean
    marketingCommunications: boolean
    thirdPartySharing: boolean
    researchParticipation: boolean
  }
  
  /** Security settings */
  security: {
    twoFactorAuth: boolean
    sessionTimeout: number
    loginNotifications: boolean
    suspiciousActivityAlerts: boolean
    passwordChangeReminder: number
    deviceTrustLevel: 'strict' | 'moderate' | 'relaxed'
  }
}

/**
 * Import/Export settings functionality
 */
export interface ImportExportPreferences {
  /** Export format options */
  exportFormat: 'json' | 'csv' | 'xml' | 'yaml'
  
  /** What data to include in exports */
  exportIncludes: {
    gameHistory: boolean
    puzzleSolutions: boolean
    personalStats: boolean
    preferences: boolean
    achievements: boolean
    studyPlans: boolean
  }
  
  /** Import validation settings */
  importValidation: {
    strictMode: boolean
    validateData: boolean
    overwriteExisting: boolean
    createBackupBeforeImport: boolean
  }
  
  /** Automatic export settings */
  autoExport: {
    enabled: boolean
    frequency: BackupFrequency
    location: 'local' | 'cloud' | 'both'
    maxBackupCount: number
  }
}

/**
 * Backup and sync preferences
 */
export interface BackupSyncPreferences {
  /** Cloud sync settings */
  cloudSync: {
    enabled: boolean
    provider: 'google' | 'dropbox' | 'onedrive' | 'custom'
    syncInterval: 'realtime' | 'hourly' | 'daily' | 'manual'
    conflictResolution: 'server_wins' | 'client_wins' | 'manual_resolve'
  }
  
  /** Local backup settings */
  localBackup: {
    enabled: boolean
    frequency: BackupFrequency
    location: string
    maxBackupFiles: number
    compressBackups: boolean
  }
  
  /** Sync scope */
  syncScope: {
    preferences: boolean
    gameHistory: boolean
    puzzleSolutions: boolean
    studyMaterials: boolean
    achievements: boolean
    friendsList: boolean
  }
  
  /** Restore options */
  restore: {
    autoRestore: boolean
    confirmBeforeRestore: boolean
    createBackupBeforeRestore: boolean
    selectiveRestore: boolean
  }
}

/**
 * Gaming experience customization
 */
export interface GamingPreferences {
  /** Board settings */
  board: {
    style: 'classic' | 'modern' | 'glass' | 'wood' | 'metal' | 'neon'
    pieceSet: 'classic' | 'modern' | 'medieval' | 'fantasy' | 'minimalist'
    squareColors: { light: string; dark: string }
    highlightColors: { 
      lastMove: string
      possibleMoves: string
      check: string
      capture: string
    }
    coordinates: CoordinateDisplay
    showLegalMoves: boolean
    animateMovement: boolean
    dragPreview: boolean
  }
  
  /** Game UI preferences */
  gameUI: {
    showClock: boolean
    showMoveHistory: boolean
    showCapturedPieces: boolean
    showEvaluation: boolean
    moveSuggestions: boolean
    dangerSquares: boolean
    pieceValues: boolean
  }
  
  /** Training settings */
  training: {
    difficultyProgression: 'linear' | 'adaptive' | 'manual'
    hintsEnabled: boolean
    mistakeHighlighting: boolean
    autoAdvanceOnSuccess: boolean
    repetitionSpacing: number
    failureThreshold: number
  }
  
  /** Competitive features */
  competitive: {
    ratingVisibility: boolean
    leaderboardParticipation: boolean
    tournamentNotifications: boolean
    matchmakingPreferences: 'rating_strict' | 'rating_loose' | 'any'
    autoAcceptChallenges: boolean
  }
}

/**
 * Sound and animation controls
 */
export interface SoundAnimationPreferences {
  /** Sound settings */
  sound: {
    enabled: boolean
    masterVolume: number
    soundQuality: SoundQuality
    spatialAudio: boolean
    
    /** Individual sound categories */
    categories: {
      moveSound: { enabled: boolean; volume: number }
      captureSound: { enabled: boolean; volume: number }
      checkSound: { enabled: boolean; volume: number }
      gameEndSound: { enabled: boolean; volume: number }
      uiSounds: { enabled: boolean; volume: number }
      backgroundMusic: { enabled: boolean; volume: number }
      notifications: { enabled: boolean; volume: number }
      voiceAnnouncements: { enabled: boolean; volume: number }
    }
    
    /** Sound pack selection */
    soundPack: 'classic' | 'modern' | 'retro' | 'nature' | 'electronic'
  }
  
  /** Animation settings */
  animation: {
    enabled: boolean
    intensity: AnimationIntensity
    frameRate: number
    
    /** Animation categories */
    types: {
      pieceMovement: boolean
      boardTransitions: boolean
      uiTransitions: boolean
      particleEffects: boolean
      backgroundEffects: boolean
      loadingAnimations: boolean
      celebrationsEffects: boolean
      errorAnimations: boolean
    }
    
    /** Performance settings */
    performance: {
      gpuAcceleration: boolean
      reducedMotion: boolean
      powerSaveMode: boolean
    }
  }
}

/**
 * Complete user preferences collection
 */
export interface UserPreferences {
  general: GeneralPreferences
  appearance: AppearancePreferences
  language: LanguagePreferences
  accessibility: AccessibilityPreferences
  performance: PerformancePreferences
  privacy: PrivacyPreferences
  importExport: ImportExportPreferences
  backupSync: BackupSyncPreferences
  gaming: GamingPreferences
  soundAnimation: SoundAnimationPreferences
  
  /** Metadata */
  version: string
  lastModified: number
  userId: string
}

/**
 * Preferences section information
 */
export interface PreferencesSection {
  id: string
  title: string
  description: string
  icon: string
  category: 'basic' | 'advanced' | 'gaming' | 'accessibility'
  badge?: string
  isNew?: boolean
  isPro?: boolean
}

/**
 * Preferences validation result
 */
export interface PreferencesValidation {
  isValid: boolean
  errors: Array<{
    field: string
    message: string
    severity: 'error' | 'warning' | 'info'
  }>
  warnings: Array<{
    field: string
    message: string
    suggestion?: string
  }>
}

/**
 * Preferences import result
 */
export interface PreferencesImportResult {
  success: boolean
  imported: number
  skipped: number
  errors: Array<{
    item: string
    error: string
  }>
  warnings: string[]
}

/**
 * Hook return type for usePreferences
 */
export interface PreferencesHookReturn {
  // Current preferences
  preferences: UserPreferences
  
  // Loading states
  isLoading: boolean
  isSaving: boolean
  isImporting: boolean
  isExporting: boolean
  
  // Update methods
  updateGeneral: (general: Partial<GeneralPreferences>) => Promise<void>
  updateAppearance: (appearance: Partial<AppearancePreferences>) => Promise<void>
  updateLanguage: (language: Partial<LanguagePreferences>) => Promise<void>
  updateAccessibility: (accessibility: Partial<AccessibilityPreferences>) => Promise<void>
  updatePerformance: (performance: Partial<PerformancePreferences>) => Promise<void>
  updatePrivacy: (privacy: Partial<PrivacyPreferences>) => Promise<void>
  updateImportExport: (importExport: Partial<ImportExportPreferences>) => Promise<void>
  updateBackupSync: (backupSync: Partial<BackupSyncPreferences>) => Promise<void>
  updateGaming: (gaming: Partial<GamingPreferences>) => Promise<void>
  updateSoundAnimation: (soundAnimation: Partial<SoundAnimationPreferences>) => Promise<void>
  
  // Bulk operations
  updateMultiple: (updates: Partial<UserPreferences>) => Promise<void>
  resetToDefaults: (sections?: Array<keyof UserPreferences>) => Promise<void>
  
  // Import/Export
  exportPreferences: (format?: 'json' | 'csv') => Promise<string>
  importPreferences: (data: string | File) => Promise<PreferencesImportResult>
  
  // Validation
  validatePreferences: (prefs?: Partial<UserPreferences>) => PreferencesValidation
  
  // Utilities
  hasUnsavedChanges: boolean
  saveChanges: () => Promise<void>
  discardChanges: () => void
  
  // Error handling
  error: string | null
  clearError: () => void
  
  // UI handlers
  handleBack: () => void
  handleSave: () => Promise<void>
  handleDiscard: () => void
  handleReset: () => Promise<void>
  handleExport: () => Promise<void>
  handleQuickPreset: (preset: string) => Promise<void>
  getSectionInfo: (section: keyof UserPreferences) => { title: string, description: string, badge?: string }
}

/**
 * Component props types
 */
export interface GeneralSettingsProps {
  preferences: GeneralPreferences
  onUpdate: (preferences: Partial<GeneralPreferences>) => void
  isLoading?: boolean
  theme: any
}

export interface ThemeSelectorProps {
  preferences: AppearancePreferences
  onUpdate: (preferences: Partial<AppearancePreferences>) => void
  isLoading?: boolean
  theme: any
}

export interface LanguageSettingsProps {
  preferences: LanguagePreferences
  onUpdate: (preferences: Partial<LanguagePreferences>) => void
  isLoading?: boolean
  theme: any
}

export interface AccessibilitySettingsProps {
  preferences: AccessibilityPreferences
  onUpdate: (preferences: Partial<AccessibilityPreferences>) => void
  isLoading?: boolean
  theme: any
}

export interface PerformanceSettingsProps {
  preferences: PerformancePreferences
  onUpdate: (preferences: Partial<PerformancePreferences>) => void
  isLoading?: boolean
  theme: any
}

export interface PrivacySettingsProps {
  preferences: PrivacyPreferences
  onUpdate: (preferences: Partial<PrivacyPreferences>) => void
  isLoading?: boolean
  theme: any
}

export interface ImportExportSettingsProps {
  preferences: ImportExportPreferences
  onUpdate: (preferences: Partial<ImportExportPreferences>) => void
  onExport: (format: 'json' | 'csv') => Promise<void>
  onImport: (data: string | File) => Promise<void>
  isLoading?: boolean
  theme: any
}

export interface BackupSyncSettingsProps {
  preferences: BackupSyncPreferences
  onUpdate: (preferences: Partial<BackupSyncPreferences>) => void
  isLoading?: boolean
  theme: any
}

export interface GamingSettingsProps {
  preferences: GamingPreferences
  onUpdate: (preferences: Partial<GamingPreferences>) => void
  isLoading?: boolean
  theme: any
}

export interface SoundAnimationSettingsProps {
  preferences: SoundAnimationPreferences
  onUpdate: (preferences: Partial<SoundAnimationPreferences>) => void
  isLoading?: boolean
  theme: any
}