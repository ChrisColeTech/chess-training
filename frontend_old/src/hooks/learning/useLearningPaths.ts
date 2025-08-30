// Learning path hooks following SRP
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../../services/api';
import { queryKeys } from '../../lib/query-client';
import type { LearningPath, LearningModule, LearningProgress } from '../../types/api';

// Single responsibility: Learning path data and progress management
export function useLearningPaths() {
  const queryClient = useQueryClient();

  // Get all learning paths
  const useLearningPathList = (category?: string) => {
    return useQuery({
      queryKey: category 
        ? queryKeys.learning.paths.concat(['category', category]) 
        : queryKeys.learning.paths,
      queryFn: () => apiService.learning.getLearningPaths(category),
    });
  };

  // Get learning path by ID
  const useLearningPath = (id: string) => {
    return useQuery({
      queryKey: queryKeys.learning.pathById(id),
      queryFn: () => apiService.learning.getLearningPathById(id),
      enabled: !!id,
    });
  };

  // Get learning path stats
  const useLearningPathStats = (learningPathId: string) => {
    return useQuery({
      queryKey: queryKeys.learning.pathStats(learningPathId),
      queryFn: () => apiService.learning.getLearningPathStats(learningPathId),
      enabled: !!learningPathId,
    });
  };

  // Get all learning modules
  const useLearningModules = () => {
    return useQuery({
      queryKey: queryKeys.learning.modules,
      queryFn: () => apiService.learning.getLearningModules(),
    });
  };

  // Get learning module by ID
  const useLearningModule = (id: string) => {
    return useQuery({
      queryKey: queryKeys.learning.moduleById(id),
      queryFn: () => apiService.learning.getLearningModuleById(id),
      enabled: !!id,
    });
  };

  // Get learning categories
  const useLearningCategories = () => {
    return useQuery({
      queryKey: queryKeys.learning.categories,
      queryFn: () => apiService.learning.getLearningCategories(),
      staleTime: 10 * 60 * 1000, // 10 minutes
    });
  };

  // Get user learning progress
  const useLearningProgress = (learningPathId?: string) => {
    return useQuery({
      queryKey: queryKeys.learning.progress(learningPathId),
      queryFn: () => apiService.learning.getUserLearningProgress(learningPathId),
      enabled: true,
    });
  };

  // Start learning path mutation
  const startLearningPathMutation = useMutation({
    mutationFn: (learningPathId: string) => apiService.learning.startLearningPath(learningPathId),
    onSuccess: (progress, learningPathId) => {
      // Update progress cache
      queryClient.setQueryData(queryKeys.learning.progress(learningPathId), progress);
      queryClient.invalidateQueries({ queryKey: queryKeys.learning.progress() });
      queryClient.invalidateQueries({ queryKey: queryKeys.progress.learning });
    },
  });

  // Update module progress mutation
  const updateModuleProgressMutation = useMutation({
    mutationFn: ({ moduleId, progress }: { moduleId: string; progress: number }) =>
      apiService.learning.updateModuleProgress(moduleId, progress),
    onSuccess: (updatedProgress, { moduleId }) => {
      // Update progress cache
      queryClient.invalidateQueries({ queryKey: queryKeys.learning.progress() });
      queryClient.invalidateQueries({ queryKey: queryKeys.progress.learning });
      
      // Update specific module progress if we can determine the learning path
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.learning.moduleById(moduleId) 
      });
    },
  });

  return {
    // Hooks
    useLearningPathList,
    useLearningPath,
    useLearningPathStats,
    useLearningModules,
    useLearningModule,
    useLearningCategories,
    useLearningProgress,

    // Actions
    startLearningPath: startLearningPathMutation.mutateAsync,
    updateModuleProgress: updateModuleProgressMutation.mutateAsync,

    // Loading states
    isStartingLearningPath: startLearningPathMutation.isPending,
    isUpdatingModuleProgress: updateModuleProgressMutation.isPending,

    // Error states
    startLearningPathError: startLearningPathMutation.error,
    updateModuleProgressError: updateModuleProgressMutation.error,
  };
}