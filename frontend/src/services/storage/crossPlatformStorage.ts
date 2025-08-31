import type { StateStorage } from 'zustand/middleware'

/**
 * Cross-platform storage abstraction that works in both Electron and browser
 * 
 * In Electron: Uses secure encrypted storage via IPC 
 * In Browser: Falls back to localStorage
 * 
 * Integrates seamlessly with Zustand persist middleware
 */

interface ElectronAPIStorage {
  auth: {
    setTokens: (accessToken: string, refreshToken: string) => Promise<boolean>
    getTokens: () => Promise<{ accessToken?: string; refreshToken?: string }>
    clearTokens: () => Promise<boolean>
    hasTokens: () => Promise<boolean>
  }
  config: {
    get: (key: string) => Promise<any>
    set: (key: string, value: any) => Promise<boolean>
    delete: (key: string) => Promise<boolean>
    clear: () => Promise<boolean>
  }
  isElectron: boolean
  // Window controls
  minimizeWindow: () => void
  maximizeWindow: () => void
  closeWindow: () => void
  isWindowMaximized: () => boolean
  onWindowMaximized: (callback: (maximized: boolean) => void) => void
  removeAllListeners: () => void
}

declare global {
  interface Window {
    electronAPI?: ElectronAPIStorage
  }
}

/**
 * Check if running in Electron environment
 */
const isElectron = (): boolean => {
  return typeof window !== 'undefined' && !!window.electronAPI?.isElectron
}

/**
 * Electron-specific storage for auth tokens
 * Uses IPC to securely store tokens in main process
 */
class ElectronAuthStorage {
  async getItem(name: string): Promise<string | null> {
    if (name !== 'chess-auth-storage') return null
    
    try {
      const tokens = await window.electronAPI!.auth.getTokens()
      if (!tokens.accessToken || !tokens.refreshToken) return null
      
      // Return in same format as localStorage version for compatibility
      const authState = {
        state: {
          isAuthenticated: true,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          user: null // Will be populated by API calls
        },
        version: 0
      }
      
      return JSON.stringify(authState)
    } catch (error) {
      console.warn('Failed to get tokens from Electron storage:', error)
      return null
    }
  }

  async setItem(name: string, value: string): Promise<void> {
    if (name !== 'chess-auth-storage') return
    
    try {
      const parsed = JSON.parse(value)
      const { accessToken, refreshToken } = parsed.state
      
      if (accessToken && refreshToken) {
        await window.electronAPI!.auth.setTokens(accessToken, refreshToken)
        console.log('✅ Tokens saved to Electron secure storage')
      }
    } catch (error) {
      console.warn('Failed to save tokens to Electron storage:', error)
    }
  }

  async removeItem(name: string): Promise<void> {
    if (name !== 'chess-auth-storage') return
    
    try {
      await window.electronAPI!.auth.clearTokens()
      console.log('✅ Tokens cleared from Electron secure storage')
    } catch (error) {
      console.warn('Failed to clear tokens from Electron storage:', error)
    }
  }
}

/**
 * Browser fallback storage using localStorage
 */
class BrowserStorage {
  getItem(name: string): string | null {
    try {
      return localStorage.getItem(name)
    } catch (error) {
      console.warn('Failed to get item from localStorage:', error)
      return null
    }
  }

  setItem(name: string, value: string): void {
    try {
      localStorage.setItem(name, value)
    } catch (error) {
      console.warn('Failed to set item in localStorage:', error)
    }
  }

  removeItem(name: string): void {
    try {
      localStorage.removeItem(name)
    } catch (error) {
      console.warn('Failed to remove item from localStorage:', error)
    }
  }
}

/**
 * Unified storage interface that automatically detects environment
 * and uses appropriate storage mechanism
 */
class CrossPlatformStorage implements StateStorage {
  private electronStorage = new ElectronAuthStorage()
  private browserStorage = new BrowserStorage()

  async getItem(name: string): Promise<string | null> {
    if (isElectron()) {
      return await this.electronStorage.getItem(name)
    } else {
      return this.browserStorage.getItem(name)
    }
  }

  async setItem(name: string, value: string): Promise<void> {
    if (isElectron()) {
      await this.electronStorage.setItem(name, value)
    } else {
      this.browserStorage.setItem(name, value)
    }
  }

  async removeItem(name: string): Promise<void> {
    if (isElectron()) {
      await this.electronStorage.removeItem(name)
    } else {
      this.browserStorage.removeItem(name)
    }
  }
}

/**
 * Create cross-platform storage instance
 * 
 * This function returns a StateStorage-compatible object that
 * automatically uses Electron secure storage or browser localStorage
 * depending on the environment
 */
export const createCrossPlatformStorage = (): StateStorage => {
  const storage = new CrossPlatformStorage()
  
  console.log(`🔧 Initialized ${isElectron() ? 'Electron secure' : 'browser localStorage'} storage`)
  
  return storage
}

/**
 * Utility functions for direct storage access
 * (useful for debugging and testing)
 */
export const storageUtils = {
  isElectron,
  
  async getAuthTokens() {
    if (isElectron() && window.electronAPI) {
      return await window.electronAPI.auth.getTokens()
    }
    
    // Browser fallback
    const stored = localStorage.getItem('chess-auth-storage')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        return {
          accessToken: parsed.state?.accessToken,
          refreshToken: parsed.state?.refreshToken
        }
      } catch {
        return { accessToken: null, refreshToken: null }
      }
    }
    
    return { accessToken: null, refreshToken: null }
  },
  
  async clearAllAuth() {
    if (isElectron() && window.electronAPI) {
      await window.electronAPI.auth.clearTokens()
    }
    localStorage.removeItem('chess-auth-storage')
    console.log('🧹 Cleared all auth storage')
  }
}