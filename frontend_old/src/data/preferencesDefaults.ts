/**
 * User Preferences Default Configuration
 * Constants extracted from usePreferences hook for better maintainability
 */

/**
 * Auto-save configuration
 * Extracted from usePreferences hook line 102-105
 */
export const PREFERENCES_AUTO_SAVE_CONFIG = {
  DELAY_MS: 2000, // Auto-save delay after changes (2 seconds)
  ENABLED_BY_DEFAULT: true, // Whether auto-save is enabled by default
} as const

/**
 * Preferences storage configuration
 */
export const PREFERENCES_STORAGE_CONFIG = {
  LOCAL_STORAGE_KEY: 'chess_user_preferences',
  EXPORT_FILE_PREFIX: 'chess_preferences',
} as const

/**
 * Validation thresholds
 * Extracted from usePreferences hook validation logic
 */
export const VALIDATION_THRESHOLDS = {
  FONT_SIZE_MIN: 0.5,
  FONT_SIZE_MAX: 3.0,
  FRAME_RATES: [30, 60, 120, 'unlimited'] as const,
} as const

/**
 * Section information mappings
 * Extracted from usePreferences hook line 588-600
 */
export const SECTION_INFO_MAPPING = {
  general: { title: 'General', description: 'Basic application settings' },
  appearance: { title: 'Appearance', description: 'Visual customization options' },
  language: { title: 'Language', description: 'Language and locale settings' },
  accessibility: { title: 'Accessibility', description: 'Accessibility features' },
  performance: { title: 'Performance', description: 'Performance optimization settings' },
  privacy: { title: 'Privacy', description: 'Privacy and data settings' },
  importExport: { title: 'Import/Export', description: 'Data import and export options' },
  backupSync: { title: 'Backup & Sync', description: 'Backup and synchronization settings' },
  gaming: { title: 'Gaming', description: 'Game-related preferences' },
  soundAnimation: { title: 'Sound & Animation', description: 'Audio and visual effects settings' }
} as const

/**
 * Preferences quick presets configuration
 */
export const QUICK_PRESETS = {
  BEGINNER: {
    gaming: {
      training: {
        hintsEnabled: true
      },
      board: {
        coordinates: 'both' as const
      }
    }
  },
  ADVANCED: {
    gaming: {
      training: {
        hintsEnabled: false
      },
      board: {
        coordinates: 'none' as const
      }
    }
  }
} as const