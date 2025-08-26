import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import apiService from '../services/api';
import type { User, LoginRequest, RegisterRequest } from '../types/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
  updateUserPreferences: (preferences: any) => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (data: LoginRequest) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await apiService.login(data);
          
          if (response.success && response.user) {
            set({
              user: response.user,
              isAuthenticated: true,
              isLoading: false,
              error: null
            });
          } else {
            set({
              isLoading: false,
              error: response.error || 'Login failed'
            });
          }
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.response?.data?.error || 'Login failed'
          });
        }
      },

      register: async (data: RegisterRequest) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await apiService.register(data);
          
          if (response.success && response.user) {
            // After successful registration, automatically login
            await get().login({ email: data.email, password: data.password });
          } else {
            set({
              isLoading: false,
              error: response.error || 'Registration failed'
            });
          }
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.response?.data?.error || 'Registration failed'
          });
        }
      },

      logout: async () => {
        set({ isLoading: true });
        
        try {
          await apiService.logout();
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null
          });
        }
      },

      loadUser: async () => {
        console.log('🔐 loadUser called');
        
        set({ isLoading: true, error: null });
        
        const isAuth = await apiService.isAuthenticated();
        console.log('🔑 isAuthenticated:', isAuth);
        
        if (!isAuth) {
          console.log('❌ No tokens found, skipping loadUser');
          set({ isLoading: false });
          return;
        }
        
        console.log('✅ Attempting to load user profile');
        
        // Check if API server is ready with retries
        let retries = 10;
        while (retries > 0) {
          try {
            const healthCheck = await fetch('http://localhost:3000/api/health');
            if (healthCheck.ok) break;
          } catch (error) {
            // API not ready yet
          }
          await new Promise(resolve => setTimeout(resolve, 500));
          retries--;
        }
        
        if (retries === 0) {
          console.log('❌ API server not available');
          set({ isLoading: false });
          return;
        }
        
        try {
          const response = await apiService.getProfile();
          
          if (response.success && response.user) {
            console.log('✅ User profile loaded successfully:', response.user.username);
            set({
              user: response.user,
              isAuthenticated: true,
              isLoading: false,
              error: null
            });
          } else {
            console.log('❌ Profile request failed:', response.error);
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: null
            });
          }
        } catch (error: any) {
          console.log('❌ Error loading user profile:', error.message);
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null
          });
        }
      },

      updateUserPreferences: async (preferences: any) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await apiService.updateProfile(preferences);
          
          if (response.success) {
            // Update local user state
            const currentUser = get().user;
            if (currentUser) {
              set({
                user: {
                  ...currentUser,
                  preferences: { ...currentUser.preferences, ...preferences }
                },
                isLoading: false,
                error: null
              });
            }
          } else {
            set({
              isLoading: false,
              error: response.error || 'Failed to update preferences'
            });
          }
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.response?.data?.error || 'Failed to update preferences'
          });
        }
      },

      clearError: () => {
        set({ error: null });
      }
    }),
    {
      name: 'auth-store'
    }
  )
);