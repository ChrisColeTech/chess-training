// Profile hooks following SRP
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../../services/api';
import { queryKeys } from '../../lib/query-client';
import type { UserProfile, UserPreferences, UserStatistics } from '../../types/api';

// Single responsibility: User profile and preferences management
export function useProfile() {
  const queryClient = useQueryClient();

  // Get user profile
  const useUserProfile = () => {
    return useQuery({
      queryKey: queryKeys.profile.user,
      queryFn: () => apiService.profile.getUserProfile(),
    });
  };

  // Get user preferences
  const useUserPreferences = () => {
    return useQuery({
      queryKey: queryKeys.profile.preferences,
      queryFn: () => apiService.profile.getUserPreferences(),
    });
  };

  // Get user statistics
  const useUserStatistics = () => {
    return useQuery({
      queryKey: queryKeys.profile.statistics,
      queryFn: () => apiService.profile.getUserStatistics(),
    });
  };

  // Get play history
  const usePlayHistory = (page: number = 1, limit: number = 20) => {
    return useQuery({
      queryKey: queryKeys.profile.playHistory(page, limit),
      queryFn: () => apiService.profile.getPlayHistory(page, limit),
    });
  };

  // Get rating history
  const useRatingHistory = (days: number = 30) => {
    return useQuery({
      queryKey: queryKeys.profile.ratingHistory(days),
      queryFn: () => apiService.profile.getRatingHistory(days),
    });
  };

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: (updates: Partial<Pick<UserProfile, 'username' | 'email'>>) =>
      apiService.profile.updateUserProfile(updates),
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(queryKeys.profile.user, updatedProfile);
      queryClient.setQueryData(queryKeys.auth.profile, updatedProfile);
    },
  });

  // Update preferences mutation
  const updatePreferencesMutation = useMutation({
    mutationFn: (preferences: Partial<UserPreferences>) =>
      apiService.profile.updateUserPreferences(preferences),
    onSuccess: (updatedPreferences) => {
      queryClient.setQueryData(queryKeys.profile.preferences, updatedPreferences);
    },
  });

  // Update rating mutation
  const updateRatingMutation = useMutation({
    mutationFn: (newRating: number) => apiService.profile.updateRating(newRating),
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(queryKeys.profile.user, updatedProfile);
      queryClient.invalidateQueries({ queryKey: queryKeys.profile.ratingHistory() });
    },
  });

  // Delete account mutation
  const deleteAccountMutation = useMutation({
    mutationFn: () => apiService.profile.deleteAccount(),
    onSuccess: () => {
      queryClient.clear();
      if (typeof window !== 'undefined') {
        // Don't use window.location.href - causes page reload
        console.log('Profile error - auth system will handle navigation');
      }
    },
  });

  return {
    // Hooks
    useUserProfile,
    useUserPreferences,
    useUserStatistics,
    usePlayHistory,
    useRatingHistory,

    // Actions
    updateProfile: updateProfileMutation.mutateAsync,
    updatePreferences: updatePreferencesMutation.mutateAsync,
    updateRating: updateRatingMutation.mutateAsync,
    deleteAccount: deleteAccountMutation.mutateAsync,

    // Loading states
    isUpdatingProfile: updateProfileMutation.isPending,
    isUpdatingPreferences: updatePreferencesMutation.isPending,
    isUpdatingRating: updateRatingMutation.isPending,
    isDeletingAccount: deleteAccountMutation.isPending,

    // Error states
    updateProfileError: updateProfileMutation.error,
    updatePreferencesError: updatePreferencesMutation.error,
    updateRatingError: updateRatingMutation.error,
    deleteAccountError: deleteAccountMutation.error,
  };
}