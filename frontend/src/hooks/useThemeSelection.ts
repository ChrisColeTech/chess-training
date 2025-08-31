import { useState, useCallback } from 'react'
import { useThemeStore, type ThemeId } from '../stores/themeStore'

/**
 * useThemeSelection - SRP Hook for Theme Selection Logic Only
 * Single Responsibility: Handle theme selection state and interactions
 * No UI rendering, no theme definitions, no visual effects
 * Pure theme selection coordination logic
 */
export const useThemeSelection = () => {
  const { getCurrentTheme, setTheme, currentTheme: currentThemeId } = useThemeStore()
  const [hoveredTheme, setHoveredTheme] = useState<ThemeId | null>(null)
  const currentTheme = getCurrentTheme()

  // Handle theme switching
  const handleThemeSwitch = useCallback((themeId: ThemeId) => {
    setTheme(themeId)
  }, [setTheme])

  // Handle hover state
  const handleThemeHover = useCallback((themeId: ThemeId | null) => {
    setHoveredTheme(themeId)
  }, [])

  return {
    // Current state
    currentTheme,
    currentThemeId,
    hoveredTheme,
    
    // Actions
    handleThemeSwitch,
    handleThemeHover,
    
    // Utilities
    isThemeActive: (themeId: ThemeId) => currentThemeId === themeId,
    isThemeHovered: (themeId: ThemeId) => hoveredTheme === themeId
  }
}