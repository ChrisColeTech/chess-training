import { useState, useEffect, useCallback, useMemo } from 'react'

export interface TitleBarState {
  isMaximized: boolean
  isElectron: boolean
  isReady: boolean
}

export interface TitleBarActions {
  minimize: () => void
  maximize: () => void
  close: () => void
  toggleMaximize: () => void
}

export const useTitleBar = (): TitleBarState & TitleBarActions => {
  const [isMaximized, setIsMaximized] = useState(false)
  const [isReady, setIsReady] = useState(false)

  // Check if running in Electron environment
  const isElectron = useMemo(() => {
    return typeof window !== 'undefined' && window.electronAPI !== undefined
  }, [])

  useEffect(() => {
    if (!isElectron) {
      setIsReady(true)
      return
    }

    const electronAPI = window.electronAPI
    if (!electronAPI) return

    // Initialize window state
    const initializeWindowState = async () => {
      try {
        if (electronAPI.isWindowMaximized) {
          const maximized = electronAPI.isWindowMaximized()
          setIsMaximized(maximized)
        }
        setIsReady(true)
      } catch (error) {
        console.warn('Failed to initialize window state:', error)
        setIsReady(true)
      }
    }

    initializeWindowState()

    // Listen for window state changes
    if (electronAPI.onWindowMaximized) {
      electronAPI.onWindowMaximized((maximized: boolean) => {
        setIsMaximized(maximized)
      })
    }

    // Cleanup listeners on unmount
    return () => {
      if (electronAPI.removeAllListeners) {
        electronAPI.removeAllListeners()
      }
    }
  }, [isElectron])

  const minimize = useCallback(() => {
    if (isElectron && window.electronAPI?.minimizeWindow) {
      try {
        window.electronAPI.minimizeWindow()
      } catch (error) {
        console.error('Failed to minimize window:', error)
      }
    }
  }, [isElectron])

  const maximize = useCallback(() => {
    if (isElectron && window.electronAPI?.maximizeWindow) {
      try {
        window.electronAPI.maximizeWindow()
      } catch (error) {
        console.error('Failed to maximize window:', error)
      }
    }
  }, [isElectron])

  const close = useCallback(() => {
    if (isElectron && window.electronAPI?.closeWindow) {
      try {
        window.electronAPI.closeWindow()
      } catch (error) {
        console.error('Failed to close window:', error)
      }
    }
  }, [isElectron])

  const toggleMaximize = useCallback(() => {
    maximize()
  }, [maximize])

  return {
    isMaximized,
    isElectron,
    isReady,
    minimize,
    maximize,
    close,
    toggleMaximize
  }
}