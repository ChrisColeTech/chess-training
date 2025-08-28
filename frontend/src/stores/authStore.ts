import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'

// Types
interface User {
  id: string
  username: string
  email: string
  chess_elo: number
  puzzle_rating: number
  preferences: Record<string, any>
}

interface AuthState {
  // State
  isAuthenticated: boolean
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isLoading: boolean
  error: string | null

  // Actions
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: any) => Promise<boolean>
  logout: () => Promise<void>
  refreshAccessToken: () => Promise<boolean>
  updateUserPreferences: (preferences: Record<string, any>) => Promise<boolean>
  clearError: () => void
  
  // Internal
  setTokens: (accessToken: string, refreshToken: string) => void
  setUser: (user: User) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

// API Base URL
const API_BASE_URL = 'http://localhost:3000/api'

// Create axios instance with interceptors
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      isAuthenticated: false,
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoading: false,
      error: null,

      // Actions
      login: async (email: string, password: string): Promise<boolean> => {
        set({ isLoading: true, error: null })
        
        try {
          const response = await apiClient.post('/auth/login', {
            email,
            password
          })

          if (response.data.success) {
            const { accessToken, refreshToken, user } = response.data
            
            set({
              isAuthenticated: true,
              user,
              accessToken,
              refreshToken,
              isLoading: false,
              error: null
            })

            // Setup axios interceptor with new token
            setupAxiosInterceptors(get)
            
            return true
          } else {
            set({ 
              isLoading: false, 
              error: response.data.error || 'Login failed' 
            })
            return false
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.error || 'Network error during login'
          set({ 
            isLoading: false, 
            error: errorMessage 
          })
          return false
        }
      },

      register: async (userData: any): Promise<boolean> => {
        set({ isLoading: true, error: null })
        
        try {
          const response = await apiClient.post('/auth/register', userData)

          if (response.data.success) {
            const { accessToken, refreshToken, user } = response.data
            
            set({
              isAuthenticated: true,
              user,
              accessToken,
              refreshToken,
              isLoading: false,
              error: null
            })

            // Setup axios interceptor with new token
            setupAxiosInterceptors(get)
            
            return true
          } else {
            set({ 
              isLoading: false, 
              error: response.data.error || 'Registration failed' 
            })
            return false
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.error || 'Network error during registration'
          set({ 
            isLoading: false, 
            error: errorMessage 
          })
          return false
        }
      },

      logout: async (): Promise<void> => {
        const { refreshToken } = get()
        
        try {
          // Call logout endpoint if we have a refresh token
          if (refreshToken) {
            await apiClient.post('/auth/logout', { refreshToken })
          }
        } catch (error) {
          console.warn('Logout API call failed:', error)
        }

        // Clear state regardless of API call result
        set({
          isAuthenticated: false,
          user: null,
          accessToken: null,
          refreshToken: null,
          error: null
        })
      },

      refreshAccessToken: async (): Promise<boolean> => {
        const { refreshToken, accessToken } = get()
        
        // Skip token refresh for demo mode
        if (accessToken === 'demo-access-token') {
          console.log('Skipping token refresh for demo mode')
          return false
        }
        
        if (!refreshToken) {
          return false
        }

        try {
          const response = await apiClient.post('/auth/refresh', {
            refreshToken
          })

          if (response.data.success) {
            const { accessToken: newAccessToken } = response.data
            
            set({ accessToken: newAccessToken })
            return true
          } else {
            // Refresh failed, logout user
            get().logout()
            return false
          }
        } catch (error) {
          console.error('Token refresh failed:', error)
          get().logout()
          return false
        }
      },

      updateUserPreferences: async (preferences: Record<string, any>): Promise<boolean> => {
        set({ isLoading: true, error: null })
        
        try {
          const response = await apiClient.put('/user/profile', {
            preferences
          })

          if (response.data.success) {
            // Update user object with new preferences
            const currentUser = get().user
            if (currentUser) {
              set({
                user: {
                  ...currentUser,
                  preferences: { ...currentUser.preferences, ...preferences }
                },
                isLoading: false
              })
            }
            return true
          } else {
            set({ 
              isLoading: false, 
              error: response.data.error || 'Failed to update preferences' 
            })
            return false
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.error || 'Network error updating preferences'
          set({ 
            isLoading: false, 
            error: errorMessage 
          })
          return false
        }
      },

      clearError: () => set({ error: null }),
      
      // Internal setters
      setTokens: (accessToken: string, refreshToken: string) => 
        set({ accessToken, refreshToken }),
      
      setUser: (user: User) => set({ user }),
      
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      
      setError: (error: string | null) => set({ error }),
    }),
    {
      name: 'chess-auth-storage',
      // Only persist auth data, not loading states
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    }
  )
)

// Setup axios interceptors for automatic token injection and refresh
const setupAxiosInterceptors = (getState: () => AuthState) => {
  // Request interceptor - inject access token
  apiClient.interceptors.request.use(
    (config) => {
      const { accessToken } = getState()
      if (accessToken && accessToken !== 'demo-access-token') {
        // Only add auth header for real tokens, not demo tokens
        config.headers.Authorization = `Bearer ${accessToken}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  // Response interceptor - handle token refresh (disabled for demo mode)
  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config
      const { accessToken } = getState()

      // Skip token refresh completely for demo mode
      if (accessToken === 'demo-access-token') {
        return Promise.reject(error)
      }

      // Only attempt token refresh for 401 errors on non-demo accounts
      if (error.response?.status === 401 && !originalRequest._retry && accessToken !== 'demo-access-token') {
        originalRequest._retry = true

        const success = await getState().refreshAccessToken()
        
        if (success) {
          // Retry original request with new token
          const { accessToken: newToken } = getState()
          originalRequest.headers.Authorization = `Bearer ${newToken}`
          return apiClient(originalRequest)
        }
      }

      return Promise.reject(error)
    }
  )
}

// Initialize interceptors when store is created (only in browser)
if (typeof window !== 'undefined') {
  setupAxiosInterceptors(() => useAuthStore.getState())
}

// Export the API client for other services to use
export { apiClient }