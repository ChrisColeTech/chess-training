/**
 * User settings and preferences UI
 * 
 * Generated: 2025-08-29T00:52:22.208Z
 * Consolidated from: 14 UI interface(s)
 * Source files: preferencesData.ts, account.ts, forgotPassword.ts, helpCenter.ts, playComputer.ts, preferences.ts, progressOverview.ts, resetPassword.ts
 */

// From: /mnt/c/Projects/chess-training/frontend/src/data/preferencesData.ts
export interface UIDensityOption {
  value: 'compact' | 'comfortable' | 'spacious';
  label: string;
  description: string;
  spacing: number;
  fontSize: number;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/account.ts
export interface SecuritySettings {
  twoFactorAuth: {
    enabled: boolean
    method: TwoFactorMethod
    backupCodes: string[]
    enabledAt?: number
  }; // Two-factor authentication configuration
  passwordRequirements: {
    lastChanged: number
    requiresChange: boolean
    strength: 'weak' | 'medium' | 'strong'
  }; // Password requirements
  loginNotifications: {
    newDevice: boolean
    suspiciousActivity: boolean
    failedAttempts: boolean
  }; // Login notifications
  sessionSettings: {
    maxSessions: number
    sessionTimeout: number
    requireReauth: boolean
  }; // Session management
  apiAccess: {
    enabled: boolean
    rateLimit: number
    allowedOrigins: string[]
  }; // API access settings
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/forgotPassword.ts
export interface EmailConfig {
  provider: string;
  deliveryTime: {
    min: number
    max: number
  };
  failureRate: number;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/helpCenter.ts
export interface HelpCenterConfig {
  featuredArticles: string[]; // Featured articles
  popularArticles: string[]; // Popular articles
  trendingTopics: string[]; // Trending topics
  quickActions: {
    id: string
    title: string
    description: string
    icon: string
    url: string
  }[]; // Quick actions
  contactOptions: {
    id: string
    title: string
    description: string
    icon: string
    available: boolean
    responseTime?: string
  }[]; // Contact options
  searchSuggestions: string[]; // Search suggestions
  announcement?: {
    id: string
    title: string
    message: string
    type: 'info' | 'warning' | 'success' | 'error'
    isActive: boolean
  }; // Announcement banner
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/playComputer.ts
export interface TimeControlConfig {
  type: TimeControl; // Time control type
  initialTime: number; // Initial time in minutes
  increment: number; // Increment per move in seconds
  displayName: string; // Display name
  description: string; // Description
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/preferences.ts
export interface GeneralPreferences {
  autoSave: boolean; // Auto-save user progress
  showTooltips: boolean; // Show tooltips for new users
  confirmDestructiveActions: boolean; // Confirm before destructive actions
  rememberLastSession: boolean; // Remember last session state
  timeZone: string; // Default time zone
  dateFormat: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD'; // Date format preference
  timeFormat: '12h' | '24h'; // Time format preference
  showAdvancedFeatures: boolean; // Show advanced features
  enableKeyboardShortcuts: boolean; // Enable keyboard shortcuts
  startupBehavior: 'dashboard' | 'last_page' | 'training' | 'custom'; // Startup behavior
  customStartupPage?: string; // Custom startup page
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/preferences.ts
export interface AppearancePreferences {
  currentTheme: ThemeOption; // Current theme selection
  favoriteThemes: ThemeOption[]; // Preferred themes list
  darkMode: boolean; // Dark mode preference
  highContrast: boolean; // High contrast mode
  fontSize: number; // Font size multiplier
  uiDensity: 'compact' | 'comfortable' | 'spacious'; // UI density
  animations: {
    enabled: boolean
    intensity: AnimationIntensity
    reduceMotion: boolean
    particleEffects: boolean
    transitions: boolean
    backgroundEffects: boolean
  }; // Animation preferences
  colorCustomization: {
    accentColor?: string
    primaryColor?: string
    backgroundOpacity: number
    textContrast: number
  }; // Color customizations
  layout: {
    sidebarCollapsed: boolean
    sidebarWidth: number
    headerVisible: boolean
    footerVisible: boolean
    compactMode: boolean
  }; // Layout preferences
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/preferences.ts
export interface LanguagePreferences {
  currentLanguage: LanguageOption; // Current language
  fallbackLanguage: LanguageOption; // Fallback language
  region: string; // Regional settings
  currency: string; // Currency preference
  numberFormat: 'default' | 'european' | 'indian' | 'scientific'; // Number format
  pieceNotation: 'figurine' | 'letter' | 'symbol'; // Chess piece notation
  moveNotation: NotationFormat; // Move notation format
  showTranslations: boolean; // Show translations
  autoDetectLanguage: boolean; // Auto-detect language
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/preferences.ts
export interface ImportExportPreferences {
  exportFormat: 'json' | 'csv' | 'xml' | 'yaml'; // Export format options
  exportIncludes: {
    gameHistory: boolean
    puzzleSolutions: boolean
    personalStats: boolean
    preferences: boolean
    achievements: boolean
    studyPlans: boolean
  }; // What data to include in exports
  importValidation: {
    strictMode: boolean
    validateData: boolean
    overwriteExisting: boolean
    createBackupBeforeImport: boolean
  }; // Import validation settings
  autoExport: {
    enabled: boolean
    frequency: BackupFrequency
    location: 'local' | 'cloud' | 'both'
    maxBackupCount: number
  }; // Automatic export settings
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/preferences.ts
export interface GamingPreferences {
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
  }; // Board settings
  gameUI: {
    showClock: boolean
    showMoveHistory: boolean
    showCapturedPieces: boolean
    showEvaluation: boolean
    moveSuggestions: boolean
    dangerSquares: boolean
    pieceValues: boolean
  }; // Game UI preferences
  training: {
    difficultyProgression: 'linear' | 'adaptive' | 'manual'
    hintsEnabled: boolean
    mistakeHighlighting: boolean
    autoAdvanceOnSuccess: boolean
    repetitionSpacing: number
    failureThreshold: number
  }; // Training settings
  competitive: {
    ratingVisibility: boolean
    leaderboardParticipation: boolean
    tournamentNotifications: boolean
    matchmakingPreferences: 'rating_strict' | 'rating_loose' | 'any'
    autoAcceptChallenges: boolean
  }; // Competitive features
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/preferences.ts
export interface UserPreferences {
  general: GeneralPreferences;
  appearance: AppearancePreferences;
  language: LanguagePreferences;
  accessibility: AccessibilityPreferences;
  performance: PerformancePreferences;
  privacy: PrivacyPreferences;
  importExport: ImportExportPreferences;
  backupSync: BackupSyncPreferences;
  gaming: GamingPreferences;
  soundAnimation: SoundAnimationPreferences;
  version: string; // Metadata
  lastModified: number;
  userId: string;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/preferences.ts
export interface PreferencesHookReturn {
  preferences: UserPreferences;
  isLoading: boolean;
  isSaving: boolean;
  isImporting: boolean;
  isExporting: boolean;
  updateGeneral: (general: Partial<GeneralPreferences>) => Promise<void>;
  updateAppearance: (appearance: Partial<AppearancePreferences>) => Promise<void>;
  updateLanguage: (language: Partial<LanguagePreferences>) => Promise<void>;
  updateAccessibility: (accessibility: Partial<AccessibilityPreferences>) => Promise<void>;
  updatePerformance: (performance: Partial<PerformancePreferences>) => Promise<void>;
  updatePrivacy: (privacy: Partial<PrivacyPreferences>) => Promise<void>;
  updateImportExport: (importExport: Partial<ImportExportPreferences>) => Promise<void>;
  updateBackupSync: (backupSync: Partial<BackupSyncPreferences>) => Promise<void>;
  updateGaming: (gaming: Partial<GamingPreferences>) => Promise<void>;
  updateSoundAnimation: (soundAnimation: Partial<SoundAnimationPreferences>) => Promise<void>;
  updateMultiple: (updates: Partial<UserPreferences>) => Promise<void>;
  resetToDefaults: (sections?: Array<keyof UserPreferences>) => Promise<void>;
  exportPreferences: (format?: 'json' | 'csv') => Promise<string>;
  importPreferences: (data: string | File) => Promise<PreferencesImportResult>;
  validatePreferences: (prefs?: Partial<UserPreferences>) => PreferencesValidation;
  hasUnsavedChanges: boolean;
  saveChanges: () => Promise<void>;
  discardChanges: () => void;
  error: string | null;
  clearError: () => void;
  handleBack: () => void;
  handleSave: () => Promise<void>;
  handleDiscard: () => void;
  handleReset: () => Promise<void>;
  handleExport: () => Promise<void>;
  handleQuickPreset: (preset: string) => Promise<void>;
  getSectionInfo: (section: keyof UserPreferences) => { title: string, description: string, badge?: string };
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/progressOverview.ts
export interface MockDataConfig {
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert'; // Player skill level
  ratingRange: { min: number; max: number }; // Rating range
  activityMultiplier: number; // Activity level multiplier
  achievementRate: number; // Achievement completion rate
  streakProbability: number; // Study streak probability
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/resetPassword.ts
export interface ResetPasswordConfig {
  token?: string;
  navigate: (path: string, options?: { replace?: boolean }) => void;
}

// Consolidated SettingsUIConfig
export const SettingsUIConfig = {
  uIDensityOption: {} as UIDensityOption,
  securitySettings: {} as SecuritySettings,
  emailConfig: {} as EmailConfig,
  helpCenterConfig: {} as HelpCenterConfig,
  timeControlConfig: {} as TimeControlConfig,
  generalPreferences: {} as GeneralPreferences,
  appearancePreferences: {} as AppearancePreferences,
  languagePreferences: {} as LanguagePreferences,
  importExportPreferences: {} as ImportExportPreferences,
  gamingPreferences: {} as GamingPreferences,
  userPreferences: {} as UserPreferences,
  preferencesHookReturn: {} as PreferencesHookReturn,
  mockDataConfig: {} as MockDataConfig,
  resetPasswordConfig: {} as ResetPasswordConfig,
} as const;

// Type exports
export type UIDensityOptionType = UIDensityOption;
export type SecuritySettingsType = SecuritySettings;
export type EmailConfigType = EmailConfig;
export type HelpCenterConfigType = HelpCenterConfig;
export type TimeControlConfigType = TimeControlConfig;
export type GeneralPreferencesType = GeneralPreferences;
export type AppearancePreferencesType = AppearancePreferences;
export type LanguagePreferencesType = LanguagePreferences;
export type ImportExportPreferencesType = ImportExportPreferences;
export type GamingPreferencesType = GamingPreferences;
export type UserPreferencesType = UserPreferences;
export type PreferencesHookReturnType = PreferencesHookReturn;
export type MockDataConfigType = MockDataConfig;
export type ResetPasswordConfigType = ResetPasswordConfig;
