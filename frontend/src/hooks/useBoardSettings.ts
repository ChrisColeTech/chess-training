import { useState, useEffect, useCallback, useRef } from 'react'
import { soundFX } from '@/utils/soundEffects'
import { 
  allBoardThemes, 
  defaultBoardSettings, 
  sampleCustomThemes,
  findThemeById
} from '@/data/boardThemes'
import type { 
  BoardSettings,
  BoardTheme,
  BoardSettingsExport,
  BoardSettingsHookReturn
} from '@/types/boardSettings'

/**
 * Custom hook for managing chess board settings and customization
 * Handles theme selection, settings persistence, import/export functionality
 */
export const useBoardSettings = (): BoardSettingsHookReturn => {
  // Settings state
  const [settings, setSettings] = useState<BoardSettings>(defaultBoardSettings)
  const [customThemes, setCustomThemes] = useState<BoardTheme[]>(sampleCustomThemes)
  
  // Loading states
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  
  // Preview state
  const [previewSettings, setPreviewSettings] = useState<BoardSettings | null>(null)
  const [originalSettings, setOriginalSettings] = useState<BoardSettings | null>(null)
  
  // Error handling
  const [error, setError] = useState<string | null>(null)
  
  // Debounce timer for auto-save
  const saveTimerRef = useRef<NodeJS.Timeout | null>(null)

  /**
   * Load settings from localStorage on mount
   */
  useEffect(() => {
    loadSettingsFromStorage()
  }, [])

  /**
   * Load settings from localStorage
   */
  const loadSettingsFromStorage = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate loading delay for visual feedback
      await new Promise(resolve => setTimeout(resolve, 500))

      // Load main settings
      const savedSettings = localStorage.getItem('chess-board-settings')
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings) as BoardSettings
        
        // Validate and merge with defaults
        const validatedSettings = {
          ...defaultBoardSettings,
          ...parsedSettings,
          // Ensure theme exists
          theme: findThemeById(parsedSettings.theme?.id) || defaultBoardSettings.theme
        }
        
        setSettings(validatedSettings)
      }

      // Load custom themes
      const savedCustomThemes = localStorage.getItem('chess-custom-themes')
      if (savedCustomThemes) {
        const parsedThemes = JSON.parse(savedCustomThemes) as BoardTheme[]
        setCustomThemes([...sampleCustomThemes, ...parsedThemes])
      }

      console.log('Board settings loaded successfully')
    } catch (error) {
      console.error('Failed to load board settings:', error)
      setError('Failed to load settings. Using defaults.')
      setSettings(defaultBoardSettings)
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Save settings to localStorage
   */
  const saveSettings = useCallback(async (): Promise<void> => {
    setIsSaving(true)
    setError(null)

    try {
      // Simulate save delay for visual feedback
      await new Promise(resolve => setTimeout(resolve, 300))

      const settingsToSave = previewSettings || settings
      localStorage.setItem('chess-board-settings', JSON.stringify(settingsToSave))
      
      // Save custom themes (excluding sample themes)
      const userCustomThemes = customThemes.filter(theme => 
        !sampleCustomThemes.some(sample => sample.id === theme.id)
      )
      localStorage.setItem('chess-custom-themes', JSON.stringify(userCustomThemes))

      soundFX.playSuccess()
      console.log('Board settings saved successfully')
    } catch (error) {
      console.error('Failed to save board settings:', error)
      setError('Failed to save settings')
      soundFX.playError()
      throw error
    } finally {
      setIsSaving(false)
    }
  }, [settings, previewSettings, customThemes])

  /**
   * Update board settings
   */
  const updateSettings = useCallback((newSettings: Partial<BoardSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings }
      
      // Auto-save with debounce
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current)
      }
      
      saveTimerRef.current = setTimeout(() => {
        localStorage.setItem('chess-board-settings', JSON.stringify(updated))
      }, 1000)
      
      return updated
    })
    
    soundFX.playClick()
  }, [])

  /**
   * Select a board theme
   */
  const selectTheme = useCallback((theme: BoardTheme) => {
    if (!theme.isUnlocked) {
      setError('This theme is not unlocked yet')
      soundFX.playError()
      return
    }

    updateSettings({ theme })
    soundFX.playClick()
    console.log('Theme selected:', theme.name)
  }, [updateSettings])

  /**
   * Reset settings to defaults
   */
  const resetToDefaults = useCallback(() => {
    setSettings(defaultBoardSettings)
    setError(null)
    
    // Save defaults immediately
    localStorage.setItem('chess-board-settings', JSON.stringify(defaultBoardSettings))
    
    soundFX.playClick()
    console.log('Settings reset to defaults')
  }, [])

  /**
   * Export settings to JSON string
   */
  const exportSettings = useCallback(async (): Promise<string> => {
    setIsExporting(true)
    setError(null)

    try {
      // Simulate export processing
      await new Promise(resolve => setTimeout(resolve, 500))

      const exportData: BoardSettingsExport = {
        version: '1.0.0',
        exportedAt: Date.now(),
        settings: previewSettings || settings,
        customThemes: customThemes.filter(theme => 
          !sampleCustomThemes.some(sample => sample.id === theme.id)
        ),
        metadata: {
          appVersion: '1.0.0',
          userName: 'Chess Player',
          description: 'Board settings export'
        }
      }

      const jsonString = JSON.stringify(exportData, null, 2)
      soundFX.playSuccess()
      console.log('Settings exported successfully')
      
      return jsonString
    } catch (error) {
      console.error('Failed to export settings:', error)
      setError('Failed to export settings')
      soundFX.playError()
      throw error
    } finally {
      setIsExporting(false)
    }
  }, [settings, previewSettings, customThemes])

  /**
   * Import settings from JSON string
   */
  const importSettings = useCallback(async (data: string): Promise<boolean> => {
    setIsImporting(true)
    setError(null)

    try {
      // Simulate import processing
      await new Promise(resolve => setTimeout(resolve, 500))

      const importData = JSON.parse(data) as BoardSettingsExport

      // Validate import data structure
      if (!importData.settings || !importData.version) {
        throw new Error('Invalid import file format')
      }

      // Validate theme exists
      const importedTheme = findThemeById(importData.settings.theme.id) || 
                          customThemes.find(t => t.id === importData.settings.theme.id) ||
                          defaultBoardSettings.theme

      const validatedSettings: BoardSettings = {
        ...defaultBoardSettings,
        ...importData.settings,
        theme: importedTheme
      }

      setSettings(validatedSettings)

      // Import custom themes if any
      if (importData.customThemes && importData.customThemes.length > 0) {
        const newCustomThemes = [...customThemes]
        importData.customThemes.forEach(theme => {
          const existingIndex = newCustomThemes.findIndex(t => t.id === theme.id)
          if (existingIndex >= 0) {
            newCustomThemes[existingIndex] = theme
          } else {
            newCustomThemes.push(theme)
          }
        })
        setCustomThemes(newCustomThemes)
      }

      // Save imported settings
      await saveSettings()

      soundFX.playSuccess()
      console.log('Settings imported successfully')
      return true
    } catch (error) {
      console.error('Failed to import settings:', error)
      setError(error instanceof Error ? error.message : 'Failed to import settings')
      soundFX.playError()
      return false
    } finally {
      setIsImporting(false)
    }
  }, [customThemes, saveSettings])

  /**
   * Create a new custom theme
   */
  const createCustomTheme = useCallback((themeData: Omit<BoardTheme, 'id' | 'createdAt'>) => {
    const newTheme: BoardTheme = {
      ...themeData,
      id: `custom-${Date.now()}`,
      createdAt: Date.now(),
      isUnlocked: true
    }

    setCustomThemes(prev => [...prev, newTheme])
    
    // Auto-save custom themes
    setTimeout(() => {
      const userCustomThemes = [...customThemes, newTheme].filter(theme => 
        !sampleCustomThemes.some(sample => sample.id === theme.id)
      )
      localStorage.setItem('chess-custom-themes', JSON.stringify(userCustomThemes))
    }, 100)

    soundFX.playSuccess()
    console.log('Custom theme created:', newTheme.name)
  }, [customThemes])

  /**
   * Delete a custom theme
   */
  const deleteCustomTheme = useCallback((themeId: string) => {
    // Don't allow deletion of built-in themes or sample themes
    const isBuiltIn = allBoardThemes.some(theme => theme.id === themeId)
    const isSample = sampleCustomThemes.some(theme => theme.id === themeId)
    
    if (isBuiltIn || isSample) {
      setError('Cannot delete built-in themes')
      soundFX.playError()
      return
    }

    setCustomThemes(prev => prev.filter(theme => theme.id !== themeId))
    
    // If deleted theme was selected, switch to default
    if (settings.theme.id === themeId) {
      updateSettings({ theme: defaultBoardSettings.theme })
    }

    // Auto-save custom themes
    setTimeout(() => {
      const userCustomThemes = customThemes.filter(theme => 
        theme.id !== themeId && !sampleCustomThemes.some(sample => sample.id === theme.id)
      )
      localStorage.setItem('chess-custom-themes', JSON.stringify(userCustomThemes))
    }, 100)

    soundFX.playClick()
    console.log('Custom theme deleted:', themeId)
  }, [customThemes, settings.theme.id, updateSettings])

  /**
   * Preview settings temporarily
   */
  const previewSettingsTemp = useCallback((tempSettings: Partial<BoardSettings>) => {
    if (!originalSettings) {
      setOriginalSettings(settings)
    }
    
    const newPreviewSettings = { ...settings, ...tempSettings }
    setPreviewSettings(newPreviewSettings)
    soundFX.playClick()
  }, [settings, originalSettings])

  /**
   * Apply preview settings permanently
   */
  const applyPreview = useCallback(() => {
    if (previewSettings) {
      setSettings(previewSettings)
      setPreviewSettings(null)
      setOriginalSettings(null)
      
      // Save immediately
      localStorage.setItem('chess-board-settings', JSON.stringify(previewSettings))
      soundFX.playSuccess()
    }
  }, [previewSettings])

  /**
   * Cancel preview and restore original settings
   */
  const cancelPreview = useCallback(() => {
    if (originalSettings) {
      setSettings(originalSettings)
      setPreviewSettings(null)
      setOriginalSettings(null)
      soundFX.playClick()
    }
  }, [originalSettings])

  /**
   * Clear error message
   */
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current)
      }
    }
  }, [])

  // Combined available themes (built-in + custom)
  const availableThemes = [...allBoardThemes, ...customThemes]

  // Current effective settings (preview or actual)
  const effectiveSettings = previewSettings || settings

  return {
    // Settings state
    settings: effectiveSettings,
    availableThemes,
    customThemes,

    // Loading states
    isLoading,
    isSaving,
    isExporting,
    isImporting,

    // Actions
    updateSettings,
    selectTheme,
    resetToDefaults,
    saveSettings,
    exportSettings,
    importSettings,
    createCustomTheme,
    deleteCustomTheme,

    // Preview utilities
    previewSettings: previewSettingsTemp,
    applyPreview,
    cancelPreview,
    isPreviewMode: previewSettings !== null,

    // Error handling
    error,
    clearError
  }
}