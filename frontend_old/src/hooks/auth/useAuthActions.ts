// Research-compliant auth hooks: TanStack Query for SERVER operations
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../../services/api';
import { queryKeys } from '../../lib/query-client';
import { useAuthStore } from '../../stores/authStore';
import type { LoginCredentials, RegisterData } from '../../types/api';

/**
 * Research-compliant authentication hooks
 * - Zustand: Manages client state (isAuthenticated, user, tokens)  
 * - TanStack Query: Handles server operations (login, register, API calls)
 * - Integration: Mutations update Zustand state after successful API calls
 */

export function useAuthActions() {
  const queryClient = useQueryClient();
  const authStore = useAuthStore();

  // SERVER OPERATION: Login mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => {
      console.log('🚀 Login mutation starting with credentials:', { email: credentials.email });
      return apiService.auth.login(credentials);
    },
    onSuccess: (response) => {
      console.log('✅ Login mutation SUCCESS, response:', response);
      const { user, tokens } = response;
      
      // Update Zustand client state after successful API call
      authStore.setUser(user);
      authStore.setTokens(tokens.accessToken, tokens.refreshToken);
      console.log('✅ Zustand state updated:', { isAuthenticated: true, user: user.email });
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['progress'] });
    },
    onError: (error) => {
      console.error('❌ Login mutation FAILED:', error);
      console.error('❌ Error details:', {
        message: error?.message,
        status: error?.status,
        data: error?.data
      });
      // Clear client state on login failure
      authStore.clearAuth();
    },
  });

  // SERVER OPERATION: Register mutation  
  const registerMutation = useMutation({
    mutationFn: (userData: RegisterData) => apiService.auth.register(userData),
    onSuccess: ({ user, tokens }) => {
      // Update Zustand client state after successful API call
      authStore.setUser(user);
      authStore.setTokens(tokens.accessToken, tokens.refreshToken);
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: () => {
      // Clear client state on registration failure
      authStore.clearAuth();
    },
  });

  // SERVER OPERATION: Logout mutation
  const logoutMutation = useMutation({
    mutationFn: () => apiService.auth.logout(),
    onSettled: () => {
      // Always clear client state regardless of API call result
      authStore.logout();
      
      // Clear all cached data
      queryClient.clear();
    },
  });

  // SERVER OPERATION: Profile query (only if authenticated)
  const profileQuery = useQuery({
    queryKey: queryKeys.auth.profile,
    queryFn: () => apiService.auth.getProfile(),
    enabled: authStore.isAuthenticated && !!authStore.accessToken,
    onSuccess: (user) => {
      // Sync server data with client state
      authStore.setUser(user);
    },
    onError: () => {
      // Clear client state if profile fetch fails (likely token expired)
      authStore.clearAuth();
    },
    retry: false, // Don't retry auth failures
  });

  // Convenience functions that integrate both systems
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

  const register = async (userData: RegisterData) => {
    const result = await registerMutation.mutateAsync(userData);
    return result;
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  return {
    // Mutation objects (for loading states, errors)
    loginMutation,
    registerMutation, 
    logoutMutation,
    profileQuery,
    
    // Convenience functions
    login,
    register,
    logout,
    
    // Loading states
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    
    // Error states
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    logoutError: logoutMutation.error,
  };
}

// Separate hook for just reading auth state (no operations)
export function useAuthState() {
  const authState = useAuthStore();
  
  return {
    isAuthenticated: authState.isAuthenticated,
    user: authState.user,
    accessToken: authState.accessToken,
    refreshToken: authState.refreshToken,
  };
}