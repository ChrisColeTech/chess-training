// Tutorial hooks following SRP
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../../services/api';
import { queryKeys } from '../../lib/query-client';
import type { Tutorial, TutorialStep, TutorialProgress } from '../../types/api';

// Single responsibility: Tutorial data and progress management
export function useTutorials() {
  const queryClient = useQueryClient();

  // Get all tutorials
  const useTutorialList = (category?: string) => {
    return useQuery({
      queryKey: category 
        ? queryKeys.tutorials.byCategory(category) 
        : queryKeys.tutorials.all,
      queryFn: () => apiService.tutorials.getTutorials(category),
    });
  };

  // Get tutorial by ID
  const useTutorial = (id: string) => {
    return useQuery({
      queryKey: queryKeys.tutorials.byId(id),
      queryFn: () => apiService.tutorials.getTutorialById(id),
      enabled: !!id,
    });
  };

  // Get tutorial steps
  const useTutorialSteps = (tutorialId: string) => {
    return useQuery({
      queryKey: queryKeys.tutorials.steps(tutorialId),
      queryFn: () => apiService.tutorials.getTutorialSteps(tutorialId),
      enabled: !!tutorialId,
    });
  };

  // Get tutorial categories
  const useTutorialCategories = () => {
    return useQuery({
      queryKey: queryKeys.tutorials.categories,
      queryFn: () => apiService.tutorials.getTutorialCategories(),
      staleTime: 10 * 60 * 1000, // 10 minutes - categories don't change often
    });
  };

  // Get tutorials by difficulty
  const useTutorialsByDifficulty = (difficulty: string) => {
    return useQuery({
      queryKey: queryKeys.tutorials.byDifficulty(difficulty),
      queryFn: () => apiService.tutorials.getTutorialsByDifficulty(difficulty),
      enabled: !!difficulty,
    });
  };

  // Get user tutorial progress
  const useTutorialProgress = (tutorialId?: string) => {
    return useQuery({
      queryKey: queryKeys.tutorials.progress(tutorialId),
      queryFn: () => apiService.tutorials.getUserTutorialProgress(tutorialId),
      enabled: true,
    });
  };

  // Start tutorial mutation
  const startTutorialMutation = useMutation({
    mutationFn: (tutorialId: string) => apiService.tutorials.startTutorial(tutorialId),
    onSuccess: (progress, tutorialId) => {
      // Update progress cache
      queryClient.setQueryData(queryKeys.tutorials.progress(tutorialId), progress);
      queryClient.invalidateQueries({ queryKey: queryKeys.tutorials.progress() });
      queryClient.invalidateQueries({ queryKey: queryKeys.progress.tutorials });
    },
  });

  // Complete step mutation
  const completeStepMutation = useMutation({
    mutationFn: ({ tutorialId, stepId }: { tutorialId: string; stepId: string }) =>
      apiService.tutorials.completeStep(tutorialId, stepId),
    onSuccess: (progress, { tutorialId }) => {
      // Update progress cache
      queryClient.setQueryData(queryKeys.tutorials.progress(tutorialId), progress);
      queryClient.invalidateQueries({ queryKey: queryKeys.tutorials.progress() });
      queryClient.invalidateQueries({ queryKey: queryKeys.progress.tutorials });
    },
  });

  return {
    // Hooks
    useTutorialList,
    useTutorial,
    useTutorialSteps,
    useTutorialCategories,
    useTutorialsByDifficulty,
    useTutorialProgress,

    // Actions
    startTutorial: startTutorialMutation.mutateAsync,
    completeStep: completeStepMutation.mutateAsync,

    // Loading states
    isStartingTutorial: startTutorialMutation.isPending,
    isCompletingStep: completeStepMutation.isPending,

    // Error states
    startTutorialError: startTutorialMutation.error,
    completeStepError: completeStepMutation.error,
  };
}