import { useState, useEffect, useCallback, useRef } from 'react'
import { soundFX } from '@/utils/soundEffects'
import { defaultUserSettings } from '@/data/userSettings'
import type {
  UserPreferences,
  GeneralPreferences,
  AppearancePreferences,
  LanguagePreferences,
  AccessibilityPreferences,
  PerformancePreferences,
  PrivacyPreferences,
  ImportExportPreferences,
  BackupSyncPreferences,
  GamingPreferences,
  SoundAnimationPreferences,
  PreferencesValidation,
  PreferencesImportResult,
  PreferencesHookReturn
} from '@/types/preferences'

/**
 * Custom hook for managing user preferences and settings
 * Handles CRUD operations, validation, import/export, and change tracking
 */
export const usePreferences = (): PreferencesHookReturn => {
  // Core state
  const [preferences, setPreferences] = useState<UserPreferences>(defaultUserSettings)
  const [originalPreferences, setOriginalPreferences] = useState<UserPreferences>(defaultUserSettings)
  
  // Loading states
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Auto-save timer ref
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null)
  const pendingChangesRef = useRef(false)

  /**
   * Initialize preferences from localStorage or defaults
   */
  useEffect(() => {
    const initializePreferences = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would fetch from API
        const stored = localStorage.getItem('chess_user_preferences')
        if (stored) {
          const parsed = JSON.parse(stored)
          // Merge with defaults to ensure all properties exist
          const merged = mergeWithDefaults(parsed, defaultUserSettings)
          setPreferences(merged)
          setOriginalPreferences(merged)
        } else {
          setPreferences(defaultUserSettings)
          setOriginalPreferences(defaultUserSettings)
        }
      } catch (error) {
        console.error('Failed to load preferences:', error)
        setError('Failed to load preferences')
        setPreferences(defaultUserSettings)
        setOriginalPreferences(defaultUserSettings)
      } finally {
        setIsLoading(false)
      }
    }

    initializePreferences()
  }, [])

  /**
   * Merge stored preferences with defaults to handle new fields
   */
  const mergeWithDefaults = (stored: any, defaults: UserPreferences): UserPreferences => {
    const merged = { ...defaults }
    
    // Recursively merge each section
    Object.keys(defaults).forEach(key => {
      if (key in stored && typeof stored[key] === 'object') {
        ;(merged as any)[key] = {
          ...(defaults[key as keyof UserPreferences] as any),
          ...(stored[key] as any)
        }
      } else if (key in stored) {
        ;(merged as any)[key] = stored[key]
      }
    })

    return merged
  }

  /**
   * Auto-save preferences after a delay
   */
  const scheduleAutoSave = useCallback(() => {
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current)
    }

    if (preferences.general.autoSave && pendingChangesRef.current) {
      autoSaveTimerRef.current = setTimeout(() => {
        saveChanges()
      }, 2000) // Save after 2 seconds of inactivity
    }
  }, [preferences.general.autoSave])

  /**
   * Generic update function for any preferences section
   */
  const updateSection = useCallback(async <T extends keyof UserPreferences>(
    section: T,
    updates: Partial<UserPreferences[T]>
  ): Promise<void> => {
    try {
      setPreferences(prev => ({
        ...prev,
        [section]: {
          ...(prev[section] as object || {}),
          ...updates
        },
        lastModified: Date.now()
      }))
      
      pendingChangesRef.current = true
      scheduleAutoSave()
      soundFX.playClick()
      setError(null)
    } catch (error) {
      setError(`Failed to update ${section} preferences`)
      soundFX.playError()
    }
  }, [scheduleAutoSave])

  /**
   * Update general preferences
   */
  const updateGeneral = useCallback(async (general: Partial<GeneralPreferences>): Promise<void> => {
    await updateSection('general', general)
  }, [updateSection])

  /**
   * Update appearance preferences
   */
  const updateAppearance = useCallback(async (appearance: Partial<AppearancePreferences>): Promise<void> => {
    await updateSection('appearance', appearance)
  }, [updateSection])

  /**
   * Update language preferences
   */
  const updateLanguage = useCallback(async (language: Partial<LanguagePreferences>): Promise<void> => {
    await updateSection('language', language)
  }, [updateSection])

  /**
   * Update accessibility preferences
   */
  const updateAccessibility = useCallback(async (accessibility: Partial<AccessibilityPreferences>): Promise<void> => {
    await updateSection('accessibility', accessibility)
  }, [updateSection])

  /**
   * Update performance preferences
   */
  const updatePerformance = useCallback(async (performance: Partial<PerformancePreferences>): Promise<void> => {
    await updateSection('performance', performance)
  }, [updateSection])

  /**
   * Update privacy preferences
   */
  const updatePrivacy = useCallback(async (privacy: Partial<PrivacyPreferences>): Promise<void> => {
    await updateSection('privacy', privacy)
  }, [updateSection])

  /**
   * Update import/export preferences
   */
  const updateImportExport = useCallback(async (importExport: Partial<ImportExportPreferences>): Promise<void> => {
    await updateSection('importExport', importExport)
  }, [updateSection])

  /**
   * Update backup/sync preferences
   */
  const updateBackupSync = useCallback(async (backupSync: Partial<BackupSyncPreferences>): Promise<void> => {
    await updateSection('backupSync', backupSync)
  }, [updateSection])

  /**
   * Update gaming preferences
   */
  const updateGaming = useCallback(async (gaming: Partial<GamingPreferences>): Promise<void> => {
    await updateSection('gaming', gaming)
  }, [updateSection])

  /**
   * Update sound/animation preferences
   */
  const updateSoundAnimation = useCallback(async (soundAnimation: Partial<SoundAnimationPreferences>): Promise<void> => {
    await updateSection('soundAnimation', soundAnimation)
  }, [updateSection])

  /**
   * Update multiple sections at once
   */
  const updateMultiple = useCallback(async (updates: Partial<UserPreferences>): Promise<void> => {
    try {
      setPreferences(prev => ({
        ...prev,
        ...updates,
        lastModified: Date.now()
      }))
      
      pendingChangesRef.current = true
      scheduleAutoSave()
      soundFX.playClick()
      setError(null)
    } catch (error) {
      setError('Failed to update preferences')
      soundFX.playError()
    }
  }, [scheduleAutoSave])

  /**
   * Reset preferences to defaults
   */
  const resetToDefaults = useCallback(async (sections?: Array<keyof UserPreferences>): Promise<void> => {
    try {
      if (sections) {
        // Reset only specified sections
        const updates: Partial<UserPreferences> = {}
        sections.forEach(section => {
          ;(updates as any)[section] = defaultUserSettings[section]
        })
        await updateMultiple(updates)
      } else {
        // Reset everything
        setPreferences({ ...defaultUserSettings, userId: preferences.userId })
        setOriginalPreferences({ ...defaultUserSettings, userId: preferences.userId })
        pendingChangesRef.current = true
        scheduleAutoSave()
      }
      
      soundFX.playSuccess()
    } catch (error) {
      setError('Failed to reset preferences')
      soundFX.playError()
    }
  }, [preferences.userId, updateMultiple, scheduleAutoSave])

  /**
   * Save current preferences to storage
   */
  const saveChanges = useCallback(async (): Promise<void> => {
    if (!pendingChangesRef.current) return

    setIsSaving(true)
    try {
      // In a real app, this would make an API call
      localStorage.setItem('chess_user_preferences', JSON.stringify(preferences))
      setOriginalPreferences({ ...preferences })
      pendingChangesRef.current = false
      
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current)
        autoSaveTimerRef.current = null
      }
      
      soundFX.playSuccess()
      setError(null)
    } catch (error) {
      setError('Failed to save preferences')
      soundFX.playError()
    } finally {
      setIsSaving(false)
    }
  }, [preferences])

  /**
   * Discard unsaved changes
   */
  const discardChanges = useCallback(() => {
    setPreferences({ ...originalPreferences })
    pendingChangesRef.current = false
    
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current)
      autoSaveTimerRef.current = null
    }
    
    soundFX.playClick()
  }, [originalPreferences])

  /**
   * Export preferences to JSON or CSV format
   */
  const exportPreferences = useCallback(async (format: 'json' | 'csv' = 'json'): Promise<string> => {
    setIsExporting(true)
    try {
      let exportData: string
      
      if (format === 'json') {
        exportData = JSON.stringify(preferences, null, 2)
      } else {
        // Convert to CSV format (simplified)
        const rows: string[] = ['Section,Setting,Value']
        
        Object.entries(preferences).forEach(([section, sectionData]) => {
          if (typeof sectionData === 'object') {
            Object.entries(sectionData).forEach(([key, value]) => {
              rows.push(`${section},${key},"${JSON.stringify(value)}"`)
            })
          } else {
            rows.push(`root,${section},"${sectionData}"`)
          }
        })
        
        exportData = rows.join('\n')
      }
      
      // Create download
      const blob = new Blob([exportData], { type: format === 'json' ? 'application/json' : 'text/csv' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `chess_preferences_${Date.now()}.${format}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      soundFX.playSuccess()
      return exportData
    } catch (error) {
      setError('Failed to export preferences')
      soundFX.playError()
      throw error
    } finally {
      setIsExporting(false)
    }
  }, [preferences])

  /**
   * Import preferences from file or JSON string
   */
  const importPreferences = useCallback(async (data: string | File): Promise<PreferencesImportResult> => {
    setIsImporting(true)
    const result: PreferencesImportResult = {
      success: false,
      imported: 0,
      skipped: 0,
      errors: [],
      warnings: []
    }

    try {
      let jsonData: string
      
      if (data instanceof File) {
        jsonData = await data.text()
      } else {
        jsonData = data
      }

      const importedPrefs = JSON.parse(jsonData) as Partial<UserPreferences>
      
      // Validate imported data
      const validation = validatePreferences(importedPrefs)
      if (!validation.isValid) {
        result.errors = validation.errors.map(e => ({ item: e.field, error: e.message }))
        return result
      }

      // Merge imported preferences with current ones
      const merged = mergeWithDefaults(importedPrefs, preferences)
      
      // Count imported items
      result.imported = Object.keys(importedPrefs).length
      
      // Apply imported preferences
      setPreferences(merged)
      pendingChangesRef.current = true
      scheduleAutoSave()
      
      result.success = true
      soundFX.playSuccess()
    } catch (error) {
      result.errors.push({
        item: 'file',
        error: error instanceof Error ? error.message : 'Invalid file format'
      })
      soundFX.playError()
    } finally {
      setIsImporting(false)
    }

    return result
  }, [preferences, scheduleAutoSave])

  /**
   * Validate preferences structure and values
   */
  const validatePreferences = useCallback((prefs: Partial<UserPreferences> = preferences): PreferencesValidation => {
    const validation: PreferencesValidation = {
      isValid: true,
      errors: [],
      warnings: []
    }

    try {
      // Validate general preferences
      if (prefs.general) {
        const general = prefs.general
        if (general.timeZone && !Intl.supportedValuesOf('timeZone').includes(general.timeZone)) {
          validation.warnings.push({
            field: 'general.timeZone',
            message: 'Time zone may not be supported',
            suggestion: 'Use a standard IANA time zone identifier'
          })
        }
      }

      // Validate appearance preferences
      if (prefs.appearance) {
        const appearance = prefs.appearance
        if (appearance.fontSize && (appearance.fontSize < 0.5 || appearance.fontSize > 3)) {
          validation.errors.push({
            field: 'appearance.fontSize',
            message: 'Font size must be between 0.5 and 3.0',
            severity: 'error'
          })
          validation.isValid = false
        }
      }

      // Validate performance preferences
      if (prefs.performance) {
        const performance = prefs.performance
        if (performance.graphics?.frameRate && 
            ![30, 60, 120, 'unlimited'].includes(performance.graphics.frameRate)) {
          validation.errors.push({
            field: 'performance.graphics.frameRate',
            message: 'Frame rate must be 30, 60, 120, or unlimited',
            severity: 'error'
          })
          validation.isValid = false
        }
      }

      // Add more validations as needed...
      
    } catch (error) {
      validation.errors.push({
        field: 'root',
        message: 'Invalid preferences structure',
        severity: 'error'
      })
      validation.isValid = false
    }

    return validation
  }, [preferences])

  /**
   * Clear error message
   */
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  /**
   * Check if there are unsaved changes
   */
  const hasUnsavedChanges = pendingChangesRef.current

  // Cleanup auto-save timer on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current)
      }
    }
  }, [])

  // Save changes before page unload if there are unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges && !preferences.general.autoSave) {
        e.preventDefault()
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?'
        return e.returnValue
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [hasUnsavedChanges, preferences.general.autoSave])

  /**
   * UI handler for back navigation
   */
  const handleBack = useCallback(() => {
    if (hasUnsavedChanges && !preferences.general.autoSave) {
      const confirmed = window.confirm('You have unsaved changes. Are you sure you want to go back?')
      if (!confirmed) return
    }
    // Navigate back - could be implemented with router
    window.history.back()
  }, [hasUnsavedChanges, preferences.general.autoSave])

  /**
   * UI handler for saving changes
   */
  const handleSave = useCallback(async () => {
    await saveChanges()
  }, [saveChanges])

  /**
   * UI handler for discarding changes
   */
  const handleDiscard = useCallback(() => {
    discardChanges()
  }, [discardChanges])

  /**
   * UI handler for reset to defaults
   */
  const handleReset = useCallback(async () => {
    const confirmed = window.confirm('Are you sure you want to reset all preferences to defaults?')
    if (confirmed) {
      await resetToDefaults()
    }
  }, [resetToDefaults])

  /**
   * UI handler for export
   */
  const handleExport = useCallback(async () => {
    await exportPreferences('json')
  }, [exportPreferences])

  /**
   * UI handler for quick preset
   */
  const handleQuickPreset = useCallback(async (preset: string) => {
    // Apply quick preset based on preset name
    switch (preset) {
      case 'beginner':
        // For beginner preset, just update a few key settings
        await updateSection('gaming', {
          ...preferences.gaming,
          training: {
            ...preferences.gaming.training,
            hintsEnabled: true
          },
          board: {
            ...preferences.gaming.board,
            coordinates: 'both'
          }
        })
        break
      case 'advanced':
        // For advanced preset, just update a few key settings  
        await updateSection('gaming', {
          ...preferences.gaming,
          training: {
            ...preferences.gaming.training,
            hintsEnabled: false
          },
          board: {
            ...preferences.gaming.board,
            coordinates: 'none'
          }
        })
        break
      default:
        console.log('Unknown preset:', preset)
    }
  }, [updateSection, preferences])

  /**
   * Get section info
   */
  const getSectionInfo = useCallback((section: keyof UserPreferences) => {
    const sectionInfoMap: Partial<Record<keyof UserPreferences, { title: string; description: string }>> = {
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
    }
    return sectionInfoMap[section] || { title: section, description: 'Settings section' }
  }, [])

  return {
    // Current state
    preferences,
    
    // Loading states
    isLoading,
    isSaving,
    isImporting,
    isExporting,
    
    // Update methods
    updateGeneral,
    updateAppearance,
    updateLanguage,
    updateAccessibility,
    updatePerformance,
    updatePrivacy,
    updateImportExport,
    updateBackupSync,
    updateGaming,
    updateSoundAnimation,
    
    // Bulk operations
    updateMultiple,
    resetToDefaults,
    
    // Import/Export
    exportPreferences,
    importPreferences,
    
    // Validation
    validatePreferences,
    
    // Change management
    hasUnsavedChanges,
    saveChanges,
    discardChanges,
    
    // Error handling
    error,
    clearError,

    // UI handlers
    handleBack,
    handleSave,
    handleDiscard,
    handleReset,
    handleExport,
    handleQuickPreset,
    getSectionInfo
  }
}