import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// Theme definitions (moved from old React Context implementation)
export const themes = {
  'cyber-neon': {
    name: 'Cyber Neon',
    description: 'Electric blue gaming',
    isDark: true,
    primary: 'from-cyan-400 to-blue-500',
    secondary: 'from-purple-400 to-pink-400',
    accent: 'from-green-400 to-emerald-500',
    background: 'from-gray-900 via-blue-900 to-purple-900',
    text: 'text-cyan-100',
    highlight: 'from-cyan-400 to-green-400',
    gradient: 'from-cyan-400 via-blue-500 to-purple-600',
    chessLight: '#4a9eff',
    chessDark: '#1e40af',
    chessBorder: '#0ea5e9',
    surface: 'bg-slate-800/50',
    glassMorphism: 'backdrop-blur-sm bg-white/10 border border-white/20',
    success: 'text-green-400',
    destructive: 'text-red-400',
  },
  'dragon-gold': {
    name: 'Dragon Gold',
    description: 'Legendary treasure',
    isDark: true,
    primary: 'from-yellow-400 to-orange-500',
    secondary: 'from-red-400 to-yellow-400',
    accent: 'from-amber-400 to-yellow-500',
    background: 'from-gray-900 via-red-900 to-yellow-900',
    text: 'text-yellow-100',
    highlight: 'from-orange-400 to-red-400',
    gradient: 'from-yellow-400 via-orange-500 to-red-600',
    chessLight: '#fbbf24',
    chessDark: '#d97706',
    chessBorder: '#f59e0b',
    surface: 'bg-slate-800/50',
    glassMorphism: 'backdrop-blur-sm bg-white/10 border border-white/20',
    success: 'text-green-400',
    destructive: 'text-red-400',
  },
  'shadow-knight': {
    name: 'Shadow Knight',
    description: 'Dark & mysterious',
    isDark: true,
    primary: 'from-gray-400 to-slate-600',
    secondary: 'from-indigo-400 to-gray-500',
    accent: 'from-slate-400 to-gray-600',
    background: 'from-black via-gray-900 to-slate-900',
    text: 'text-gray-100',
    highlight: 'from-indigo-400 to-purple-400',
    gradient: 'from-gray-400 via-slate-500 to-indigo-600',
    chessLight: '#9ca3af',
    chessDark: '#4b5563',
    chessBorder: '#6b7280',
    surface: 'bg-slate-800/50',
    glassMorphism: 'backdrop-blur-sm bg-white/10 border border-white/20',
    success: 'text-green-400',
    destructive: 'text-red-400',
  },
  'emerald-matrix': {
    name: 'Emerald Matrix',
    description: 'Digital forest',
    isDark: true,
    primary: 'from-green-400 to-emerald-600',
    secondary: 'from-teal-400 to-green-500',
    accent: 'from-lime-400 to-green-500',
    background: 'from-gray-900 via-green-900 to-emerald-900',
    text: 'text-green-100',
    highlight: 'from-lime-400 to-emerald-400',
    gradient: 'from-green-400 via-emerald-500 to-teal-600',
    chessLight: '#10b981',
    chessDark: '#047857',
    chessBorder: '#059669',
    surface: 'bg-slate-800/50',
    glassMorphism: 'backdrop-blur-sm bg-white/10 border border-white/20',
    success: 'text-green-400',
    destructive: 'text-red-400',
  },
  'crimson-war': {
    name: 'Crimson War',
    description: 'Battle-tested fury',
    isDark: true,
    primary: 'from-red-400 to-rose-600',
    secondary: 'from-pink-400 to-red-500',
    accent: 'from-orange-400 to-red-500',
    background: 'from-gray-900 via-red-900 to-rose-900',
    text: 'text-red-100',
    highlight: 'from-pink-400 to-orange-400',
    gradient: 'from-red-400 via-rose-500 to-pink-600',
    chessLight: '#ef4444',
    chessDark: '#b91c1c',
    chessBorder: '#dc2626',
    surface: 'bg-slate-800/50',
    glassMorphism: 'backdrop-blur-sm bg-white/10 border border-white/20',
    success: 'text-green-400',
    destructive: 'text-red-400',
  }
} as const

export type ThemeId = keyof typeof themes
export type Theme = typeof themes[ThemeId]

interface ThemeState {
  // State
  currentTheme: ThemeId
  isInitialized: boolean

  // Actions
  setTheme: (themeId: ThemeId) => void
  getCurrentTheme: () => Theme
  initializeTheme: () => Promise<void>
  
  // Internal
  applyThemeToDOM: (theme: Theme) => void
}

// Custom storage for Electron config
const electronStorage = createJSONStorage(() => ({
  getItem: async (name: string): Promise<string | null> => {
    if (typeof window !== 'undefined' && (window as any).electronAPI?.config) {
      try {
        const value = await (window as any).electronAPI.config.get(name)
        return value ? JSON.stringify(value) : null
      } catch (error) {
        console.warn('Failed to get from Electron storage:', error)
        return null
      }
    }
    // Fallback to localStorage for development
    return localStorage.getItem(name)
  },
  
  setItem: async (name: string, value: string): Promise<void> => {
    if (typeof window !== 'undefined' && (window as any).electronAPI?.config) {
      try {
        const parsedValue = JSON.parse(value)
        await (window as any).electronAPI.config.set(name, parsedValue)
        console.log('Theme saved to Electron config:', parsedValue)
      } catch (error) {
        console.warn('Failed to save to Electron storage:', error)
        // Fallback to localStorage
        localStorage.setItem(name, value)
      }
    } else {
      // Fallback to localStorage for development
      localStorage.setItem(name, value)
    }
  },
  
  removeItem: async (name: string): Promise<void> => {
    if (typeof window !== 'undefined' && (window as any).electronAPI?.config) {
      try {
        await (window as any).electronAPI.config.delete(name)
      } catch (error) {
        console.warn('Failed to remove from Electron storage:', error)
        localStorage.removeItem(name)
      }
    } else {
      localStorage.removeItem(name)
    }
  },
}))

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentTheme: 'shadow-knight',
      isInitialized: false,

      // Actions
      setTheme: (themeId: ThemeId) => {
        if (themes[themeId]) {
          console.log('Setting theme to:', themeId)
          set({ currentTheme: themeId })
          
          const theme = themes[themeId]
          get().applyThemeToDOM(theme)
          
          console.log('Theme applied successfully:', theme.name)
        } else {
          console.error('Invalid theme ID:', themeId)
        }
      },

      getCurrentTheme: (): Theme => {
        const { currentTheme } = get()
        return themes[currentTheme] || themes['shadow-knight']
      },

      initializeTheme: async (): Promise<void> => {
        // Apply default theme immediately to prevent flash
        const defaultTheme = themes['shadow-knight']
        get().applyThemeToDOM(defaultTheme)
        
        // Load theme from Electron config
        if (typeof window !== 'undefined' && (window as any).electronAPI?.config) {
          try {
            const savedThemeData = await (window as any).electronAPI.config.get('chess-theme-storage')
            if (savedThemeData?.state?.currentTheme && savedThemeData.state.currentTheme in themes) {
              const themeId = savedThemeData.state.currentTheme as keyof typeof themes
              console.log('Theme loaded from Electron config:', themeId)
              
              // Apply saved theme immediately
              const theme = themes[themeId]
              get().applyThemeToDOM(theme)
              
              set({ currentTheme: themeId, isInitialized: true })
              return
            }
          } catch (error) {
            console.error('Failed to load theme from Electron config:', error)
          }
        }
        
        // Fallback to default theme (already applied)
        console.log('Using default theme: shadow-knight')
        set({ isInitialized: true })
      },

      applyThemeToDOM: (theme: Theme) => {
        if (typeof document === 'undefined') return

        const root = document.documentElement
        
        // Apply CSS custom properties for chess colors
        root.style.setProperty('--chess-light', theme.chessLight)
        root.style.setProperty('--chess-dark', theme.chessDark)
        root.style.setProperty('--chess-border', theme.chessBorder)
        
        // Apply dark mode class
        if (theme.isDark) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      },
    }),
    {
      name: 'chess-theme-storage',
      storage: electronStorage,
      // Only persist the theme selection
      partialize: (state) => ({
        currentTheme: state.currentTheme,
      }),
    }
  )
)