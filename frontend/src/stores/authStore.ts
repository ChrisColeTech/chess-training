import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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

  // STATE MANAGEMENT ACTIONS (No API calls - that's for TanStack Query)
  setAuthenticated: (authenticated: boolean) => void
  setUser: (user: User | null) => void
  setTokens: (accessToken: string | null, refreshToken: string | null) => void
  logout: () => void
  clearAuth: () => void
}

// Research-compliant Zustand store: CLIENT STATE ONLY
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Initial state
      isAuthenticated: false,
      user: null,
      accessToken: null,
      refreshToken: null,

      // State setters only - NO API CALLS (follows research recommendations)
      setAuthenticated: (authenticated: boolean) =>
        set({ isAuthenticated: authenticated }),

      setUser: (user: User | null) =>
        set({ user }),

      setTokens: (accessToken: string | null, refreshToken: string | null) =>
        set({ 
          accessToken, 
          refreshToken,
          isAuthenticated: !!(accessToken && refreshToken)
        }),

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
    }),
    {
      name: 'chess-auth-storage', // localStorage key
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    }
  )
)