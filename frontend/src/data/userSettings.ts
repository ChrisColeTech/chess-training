/**
 * User Settings Mock Data
 * Contains default user preferences and realistic mock data for the chess training application
 */

import type { 
  UserPreferences, 
  PreferencesSection,
  ThemeOption,
  LanguageOption
} from '@/types/preferences'

/**
 * Default user preferences with realistic settings
 */
export const defaultUserSettings: UserPreferences = {
  general: {
    autoSave: true,
    showTooltips: true,
    confirmDestructiveActions: true,
    rememberLastSession: true,
    timeZone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    showAdvancedFeatures: false,
    enableKeyboardShortcuts: true,
    startupBehavior: 'dashboard',
    customStartupPage: undefined
  },
  
  appearance: {
    currentTheme: 'cyber',
    favoriteThemes: ['cyber', 'neon', 'royal'],
    darkMode: true,
    highContrast: false,
    fontSize: 1.0,
    uiDensity: 'comfortable',
    animations: {
      enabled: true,
      intensity: 'normal',
      reduceMotion: false,
      particleEffects: true,
      transitions: true,
      backgroundEffects: true
    },
    colorCustomization: {
      accentColor: undefined,
      primaryColor: undefined,
      backgroundOpacity: 0.95,
      textContrast: 1.0
    },
    layout: {
      sidebarCollapsed: false,
      sidebarWidth: 280,
      headerVisible: true,
      footerVisible: true,
      compactMode: false
    }
  },
  
  language: {
    currentLanguage: 'en',
    fallbackLanguage: 'en',
    region: 'US',
    currency: 'USD',
    numberFormat: 'default',
    pieceNotation: 'figurine',
    moveNotation: 'algebraic',
    showTranslations: false,
    autoDetectLanguage: true
  },
  
  accessibility: {
    screenReader: {
      enabled: false,
      announceMovesImmediately: false,
      announceGameEvents: true,
      verboseDescriptions: false,
      readBoardPosition: false
    },
    keyboard: {
      enabled: true,
      customShortcuts: {
        'newGame': 'Ctrl+N',
        'undo': 'Ctrl+Z',
        'redo': 'Ctrl+Y',
        'analyze': 'Ctrl+A',
        'flip': 'F'
      },
      focusIndicators: true,
      skipToContent: true,
      arrowKeyNavigation: true
    },
    visual: {
      highContrast: false,
      largeText: false,
      colorBlindMode: 'none',
      reducedMotion: false,
      flashingElements: true,
      focusVisible: true
    },
    audio: {
      soundCues: true,
      voiceAnnouncements: false,
      moveSounds: true,
      alertSounds: true,
      backgroundMusic: false,
      spatialAudio: false
    },
    motor: {
      clickAndHold: false,
      dragThreshold: 5,
      doubleClickSpeed: 500,
      stickyKeys: false,
      oneHandedMode: false
    }
  },
  
  performance: {
    performanceLevel: 'balanced',
    graphics: {
      renderQuality: 'high',
      frameRate: 60,
      vsync: true,
      antiAliasing: true,
      shadows: true,
      reflections: false,
      particleCount: 50
    },
    memory: {
      cacheSize: 100, // MB
      preloadContent: true,
      compressData: false,
      clearCacheOnExit: false,
      maxHistorySize: 1000
    },
    network: {
      connectionTimeout: 10000,
      retryAttempts: 3,
      compressionEnabled: true,
      offlineMode: false,
      syncInterval: 30000
    },
    advanced: {
      debugMode: false,
      developerTools: false,
      experimentalFeatures: false,
      betaTesting: false,
      telemetryEnabled: true,
      crashReporting: true
    }
  },
  
  privacy: {
    dataCollection: {
      analytics: true,
      performance: true,
      errorReporting: true,
      usageStatistics: true,
      gameHistory: true,
      personalizedContent: true
    },
    privacy: {
      profileVisibility: 'friends',
      gameHistoryVisibility: 'friends',
      statisticsVisibility: 'private',
      friendRequestsEnabled: true,
      showOnlineStatus: true,
      allowDirectMessages: true
    },
    sharing: {
      shareWithFriends: true,
      shareWithCommunity: false,
      shareAnonymously: true,
      marketingCommunications: false,
      thirdPartySharing: false,
      researchParticipation: false
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 3600000, // 1 hour
      loginNotifications: true,
      suspiciousActivityAlerts: true,
      passwordChangeReminder: 90, // days
      deviceTrustLevel: 'moderate'
    }
  },
  
  importExport: {
    exportFormat: 'json',
    exportIncludes: {
      gameHistory: true,
      puzzleSolutions: true,
      personalStats: true,
      preferences: true,
      achievements: false,
      studyPlans: true
    },
    importValidation: {
      strictMode: false,
      validateData: true,
      overwriteExisting: false,
      createBackupBeforeImport: true
    },
    autoExport: {
      enabled: false,
      frequency: 'weekly',
      location: 'local',
      maxBackupCount: 10
    }
  },
  
  backupSync: {
    cloudSync: {
      enabled: false,
      provider: 'google',
      syncInterval: 'daily',
      conflictResolution: 'manual_resolve'
    },
    localBackup: {
      enabled: true,
      frequency: 'weekly',
      location: '/chess-backups/',
      maxBackupFiles: 5,
      compressBackups: true
    },
    syncScope: {
      preferences: true,
      gameHistory: true,
      puzzleSolutions: true,
      studyMaterials: false,
      achievements: false,
      friendsList: false
    },
    restore: {
      autoRestore: false,
      confirmBeforeRestore: true,
      createBackupBeforeRestore: true,
      selectiveRestore: true
    }
  },
  
  gaming: {
    board: {
      style: 'glass',
      pieceSet: 'modern',
      squareColors: { 
        light: '#f0d9b5', 
        dark: '#b58863' 
      },
      highlightColors: {
        lastMove: '#ffe135',
        possibleMoves: '#00ff0050',
        check: '#ff0000',
        capture: '#ff4500'
      },
      coordinates: 'border',
      showLegalMoves: true,
      animateMovement: true,
      dragPreview: true
    },
    gameUI: {
      showClock: true,
      showMoveHistory: true,
      showCapturedPieces: true,
      showEvaluation: false,
      moveSuggestions: false,
      dangerSquares: false,
      pieceValues: false
    },
    training: {
      difficultyProgression: 'adaptive',
      hintsEnabled: true,
      mistakeHighlighting: true,
      autoAdvanceOnSuccess: false,
      repetitionSpacing: 2,
      failureThreshold: 3
    },
    competitive: {
      ratingVisibility: true,
      leaderboardParticipation: true,
      tournamentNotifications: true,
      matchmakingPreferences: 'rating_loose',
      autoAcceptChallenges: false
    }
  },
  
  soundAnimation: {
    sound: {
      enabled: true,
      masterVolume: 0.7,
      soundQuality: 'high',
      spatialAudio: false,
      categories: {
        moveSound: { enabled: true, volume: 0.8 },
        captureSound: { enabled: true, volume: 0.9 },
        checkSound: { enabled: true, volume: 1.0 },
        gameEndSound: { enabled: true, volume: 0.8 },
        uiSounds: { enabled: true, volume: 0.6 },
        backgroundMusic: { enabled: false, volume: 0.3 },
        notifications: { enabled: true, volume: 0.7 },
        voiceAnnouncements: { enabled: false, volume: 0.8 }
      },
      soundPack: 'modern'
    },
    animation: {
      enabled: true,
      intensity: 'normal',
      frameRate: 60,
      types: {
        pieceMovement: true,
        boardTransitions: true,
        uiTransitions: true,
        particleEffects: true,
        backgroundEffects: true,
        loadingAnimations: true,
        celebrationsEffects: true,
        errorAnimations: true
      },
      performance: {
        gpuAcceleration: true,
        reducedMotion: false,
        powerSaveMode: false
      }
    }
  },
  
  version: '1.0.0',
  lastModified: Date.now(),
  userId: 'user-12345'
}

/**
 * Available preferences sections with gaming-themed descriptions
 */
export const preferencesSections: PreferencesSection[] = [
  {
    id: 'general',
    title: 'Command Center',
    description: 'Core application behavior and startup preferences',
    icon: 'gear-six',
    category: 'basic',
    badge: 'Essential'
  },
  {
    id: 'appearance',
    title: 'Visual Interface',
    description: 'Themes, colors, and visual customization',
    icon: 'palette',
    category: 'basic',
    badge: 'Popular'
  },
  {
    id: 'language',
    title: 'Localization',
    description: 'Language, region, and notation preferences',
    icon: 'globe-hemisphere-west',
    category: 'basic'
  },
  {
    id: 'accessibility',
    title: 'Accessibility Suite',
    description: 'Screen reader, keyboard, and motor accessibility features',
    icon: 'accessibility',
    category: 'accessibility',
    badge: 'Inclusive'
  },
  {
    id: 'performance',
    title: 'System Performance',
    description: 'Graphics, memory, and optimization settings',
    icon: 'speedometer',
    category: 'advanced',
    badge: 'Advanced'
  },
  {
    id: 'privacy',
    title: 'Security Center',
    description: 'Data privacy, security, and sharing preferences',
    icon: 'shield-check',
    category: 'advanced',
    badge: 'Security'
  },
  {
    id: 'gaming',
    title: 'Chess Experience',
    description: 'Board design, gameplay, and training customization',
    icon: 'chess-knight',
    category: 'gaming',
    badge: 'Gaming',
    isNew: true
  },
  {
    id: 'soundAnimation',
    title: 'Audio & Effects',
    description: 'Sound design and animation preferences',
    icon: 'speaker-high',
    category: 'gaming',
    badge: 'Immersive'
  },
  {
    id: 'importExport',
    title: 'Data Management',
    description: 'Import, export, and data format preferences',
    icon: 'database',
    category: 'advanced'
  },
  {
    id: 'backupSync',
    title: 'Cloud Sync',
    description: 'Backup, synchronization, and restore settings',
    icon: 'cloud-arrow-up',
    category: 'advanced',
    isPro: true
  }
]

/**
 * Available theme options with descriptions
 */
export const themeOptions: Array<{ value: ThemeOption; label: string; description: string }> = [
  {
    value: 'midnight',
    label: 'Midnight Blue',
    description: 'Dark theme with deep blue accents'
  },
  {
    value: 'cyber',
    label: 'Cyber Neon',
    description: 'Futuristic theme with cyan highlights'
  },
  {
    value: 'neon',
    label: 'Electric Neon',
    description: 'Vibrant theme with neon green elements'
  },
  {
    value: 'royal',
    label: 'Royal Purple',
    description: 'Elegant theme with purple gradients'
  },
  {
    value: 'matrix',
    label: 'Matrix Green',
    description: 'Classic hacker theme with green terminals'
  }
]

/**
 * Available language options
 */
export const languageOptions: Array<{ value: LanguageOption; label: string; nativeName: string; flag: string }> = [
  { value: 'en', label: 'English', nativeName: 'English', flag: '🇺🇸' },
  { value: 'es', label: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { value: 'fr', label: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { value: 'de', label: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { value: 'ru', label: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { value: 'zh', label: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { value: 'ja', label: 'Japanese', nativeName: '日本語', flag: '🇯🇵' }
]

/**
 * Sample user data for different user types
 */
export const mockUserProfiles = {
  beginner: {
    ...defaultUserSettings,
    general: {
      ...defaultUserSettings.general,
      showTooltips: true,
      showAdvancedFeatures: false,
      startupBehavior: 'training'
    },
    gaming: {
      ...defaultUserSettings.gaming,
      training: {
        ...defaultUserSettings.gaming.training,
        hintsEnabled: true,
        mistakeHighlighting: true,
        difficultyProgression: 'linear'
      }
    }
  },
  
  intermediate: {
    ...defaultUserSettings,
    general: {
      ...defaultUserSettings.general,
      showTooltips: false,
      showAdvancedFeatures: true
    },
    gaming: {
      ...defaultUserSettings.gaming,
      gameUI: {
        ...defaultUserSettings.gaming.gameUI,
        showEvaluation: true,
        moveSuggestions: false
      }
    }
  },
  
  advanced: {
    ...defaultUserSettings,
    general: {
      ...defaultUserSettings.general,
      showTooltips: false,
      showAdvancedFeatures: true,
      enableKeyboardShortcuts: true
    },
    performance: {
      ...defaultUserSettings.performance,
      performanceLevel: 'performance',
      graphics: {
        ...defaultUserSettings.performance.graphics,
        renderQuality: 'ultra',
        frameRate: 120
      }
    },
    gaming: {
      ...defaultUserSettings.gaming,
      gameUI: {
        ...defaultUserSettings.gaming.gameUI,
        showEvaluation: true,
        moveSuggestions: false,
        dangerSquares: true,
        pieceValues: true
      }
    }
  },
  
  accessible: {
    ...defaultUserSettings,
    accessibility: {
      ...defaultUserSettings.accessibility,
      screenReader: {
        enabled: true,
        announceMovesImmediately: true,
        announceGameEvents: true,
        verboseDescriptions: true,
        readBoardPosition: true
      },
      visual: {
        ...defaultUserSettings.accessibility.visual,
        highContrast: true,
        largeText: true,
        reducedMotion: true
      },
      audio: {
        ...defaultUserSettings.accessibility.audio,
        soundCues: true,
        voiceAnnouncements: true
      }
    },
    appearance: {
      ...defaultUserSettings.appearance,
      fontSize: 1.2,
      animations: {
        ...defaultUserSettings.appearance.animations,
        enabled: false,
        intensity: 'reduced',
        reduceMotion: true
      }
    }
  }
}

/**
 * Quick preset configurations
 */
export const quickPresets = [
  {
    id: 'gaming',
    name: 'Gaming Mode',
    description: 'Optimized for immersive chess gaming',
    icon: 'game-controller',
    changes: {
      performance: { performanceLevel: 'performance' as const },
      soundAnimation: {
        animation: { intensity: 'enhanced' as const },
        sound: { masterVolume: 0.8 }
      }
    }
  },
  {
    id: 'focus',
    name: 'Focus Mode',
    description: 'Minimal distractions for serious study',
    icon: 'eye',
    changes: {
      appearance: {
        animations: { enabled: false, particleEffects: false },
        layout: { compactMode: true }
      },
      soundAnimation: {
        sound: { categories: { backgroundMusic: { enabled: false } } }
      }
    }
  },
  {
    id: 'battery',
    name: 'Battery Saver',
    description: 'Optimized for longer battery life',
    icon: 'battery-low',
    changes: {
      performance: { performanceLevel: 'battery_saver' as const },
      appearance: {
        animations: { enabled: false }
      }
    }
  },
  {
    id: 'accessibility',
    name: 'Accessibility',
    description: 'Enhanced for accessibility features',
    icon: 'accessibility',
    changes: {
      accessibility: {
        visual: { highContrast: true, largeText: true },
        audio: { soundCues: true }
      },
      appearance: { fontSize: 1.2 }
    }
  }
]