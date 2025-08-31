import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { createCrossPlatformStorage } from '../services/storage/crossPlatformStorage'

// Types
export interface User {
  id: string
  username: string
  email: string
  chess_elo: number
  puzzle_rating: number
  preferences: Record<string, any>
}

interface AuthState {
  // CLIENT STATE ONLY (Research-compliant: Zustand for client state)
  isAuthenticated: boolean
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  _hasHydrated: boolean

  // STATE MANAGEMENT ACTIONS (No API calls - that's for TanStack Query)
  setAuthenticated: (authenticated: boolean) => void
  setUser: (user: User | null) => void
  setTokens: (accessToken: string | null, refreshToken: string | null) => void
  logout: () => void
  clearAuth: () => void
  _setHasHydrated: (hasHydrated: boolean) => void
  initializeAuth: () => void
}

// Research-compliant Zustand store: CLIENT STATE ONLY
const authStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      isAuthenticated: false,
      user: null,
      accessToken: null,
      refreshToken: null,
      _hasHydrated: false,

      // State setters only - NO API CALLS (follows research recommendations)
      setAuthenticated: (authenticated: boolean) =>
        set({ isAuthenticated: authenticated }),

      setUser: (user: User | null) =>
        set({ user }),

      setTokens: (accessToken: string | null, refreshToken: string | null) => {
        console.log('💾 setTokens called with:', {
          hasAccessToken: !!accessToken,
          hasRefreshToken: !!refreshToken,
          willBeAuthenticated: !!(accessToken && refreshToken)
        })
        set({ 
          accessToken, 
          refreshToken,
          isAuthenticated: !!(accessToken && refreshToken)
        })
      },

      logout: () =>
        set({
          isAuthenticated: false,
          user: null,
          accessToken: null,
          refreshToken: null,
        }),

      clearAuth: () =>
        set({
          isAuthenticated: false,
          user: null,
          accessToken: null,
          refreshToken: null,
        }),

      _setHasHydrated: (hasHydrated: boolean) =>
        set({ _hasHydrated: hasHydrated }),

      initializeAuth: () => {
        // Force hydration check and mark as initialized
        const state = get()
        console.log('🔧 initializeAuth called, current state:', {
          _hasHydrated: state._hasHydrated,
          isAuthenticated: state.isAuthenticated,
          hasTokens: !!(state.accessToken && state.refreshToken)
        })
        if (!state._hasHydrated) {
          console.log('⚡ Forcing _hasHydrated to true')
          set({ _hasHydrated: true })
        }
      },
    }),
    {
      name: 'chess-auth-storage',
      storage: createJSONStorage(() => createCrossPlatformStorage()), // Use cross-platform storage
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
      onRehydrateStorage: () => (state, error) => {
        console.log('🔄 Auth store rehydration callback triggered')
        if (error) {
          console.error('❌ Error rehydrating auth store:', error)
        }
        if (state) {
          console.log('✅ Setting _hasHydrated to true, current state:', {
            isAuthenticated: state.isAuthenticated,
            hasTokens: !!(state.accessToken && state.refreshToken),
            user: state.user?.email
          })
          state._setHasHydrated(true)
        } else {
          console.log('⚠️ No state available in rehydration callback')
        }
      },
    }
  )
)

export const useAuthStore = authStore

// Hydration promise for components that need to wait
let hydrationPromise: Promise<void> | null = null

export const waitForHydration = () => {
  if (!hydrationPromise) {
    hydrationPromise = new Promise<void>((resolve) => {
      // Check if already hydrated
      if (authStore.persist.hasHydrated()) {
        console.log('🌊 Store already hydrated!')
        resolve()
        return
      }
      
      // Wait for hydration
      const unsubscribe = authStore.subscribe((state) => {
        if (state._hasHydrated) {
          console.log('🌊 Store hydration detected via subscription!')
          unsubscribe()
          resolve()
        }
      })
    })
  }
  return hydrationPromise
}

