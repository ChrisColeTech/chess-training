import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../../stores/authStore';
import { apiClient } from '../../services/apiClient';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      username: string;
      email: string;
      chess_elo: number;
      puzzle_rating: number;
      preferences: Record<string, any>;
    };
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

/**
 * Research-compliant authentication hook
 * - Zustand: Manages client state (isAuthenticated, user, tokens)  
 * - TanStack Query: Handles server operations (login, register, API calls)
 * - Integration: Mutations update Zustand state after successful API calls
 */
export function useAuth() {
  const queryClient = useQueryClient();
  const authStore = useAuthStore();

  // SERVER OPERATION: Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials): Promise<LoginResponse> => {
      console.log('🚀 Login mutation starting with credentials:', { email: credentials.email });
      const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
      console.log('📡 Login API response:', response);
      return response;
    },
    onSuccess: (response) => {
      console.log('✅ Login mutation SUCCESS, response:', response);
      const { user, tokens } = response.data;
      
      // Update Zustand client state after successful API call
      authStore.setUser(user);
      authStore.setTokens(tokens.accessToken, tokens.refreshToken);
      console.log('✅ Zustand state updated:', { isAuthenticated: true, user: user.email });
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error) => {
      console.error('❌ Login mutation FAILED:', error);
      // Clear client state on login failure
      authStore.clearAuth();
    },
  });

  // Convenience functions
  const login = async (email: string, password: string) => {
    console.log('🔐 Login function called with:', { email });
    try {
      const result = await loginMutation.mutateAsync({ email, password });
      console.log('✅ Login function SUCCESS:', result);
      return result;
    } catch (error) {
      console.error('❌ Login function FAILED:', error);
      throw error;
    }
  };

  return {
    // State from Zustand
    isAuthenticated: authStore.isAuthenticated,
    user: authStore.user,
    
    // Mutation states from TanStack Query
    isLoading: loginMutation.isPending,
    loginError: loginMutation.error,
    
    // Actions
    login,
    logout: authStore.logout,
  };
}