// Progress hooks following SRP
import { useQuery } from '@tanstack/react-query';
import { apiService } from '../../services/api';
import { queryKeys } from '../../lib/query-client';

// Single responsibility: User progress tracking and analytics
export function useProgress() {

  // Get overall progress
  const useOverallProgress = () => {
    return useQuery({
      queryKey: queryKeys.progress.overall,
      queryFn: () => apiService.progress.getOverallProgress(),
    });
  };

  // Get puzzle progress
  const usePuzzleProgress = () => {
    return useQuery({
      queryKey: queryKeys.progress.puzzles,
      queryFn: () => apiService.progress.getPuzzleProgress(),
    });
  };

  // Get tutorial progress
  const useTutorialProgressStats = () => {
    return useQuery({
      queryKey: queryKeys.progress.tutorials,
      queryFn: () => apiService.progress.getTutorialProgress(),
    });
  };

  // Get learning path progress
  const useLearningPathProgressStats = () => {
    return useQuery({
      queryKey: queryKeys.progress.learning,
      queryFn: () => apiService.progress.getLearningPathProgress(),
    });
  };

  // Get progress history
  const useProgressHistory = (days: number = 30) => {
    return useQuery({
      queryKey: queryKeys.progress.history(days),
      queryFn: () => apiService.progress.getProgressHistory(days),
    });
  };

  // Get weekly report
  const useWeeklyReport = () => {
    return useQuery({
      queryKey: queryKeys.progress.weeklyReport,
      queryFn: () => apiService.progress.getWeeklyReport(),
      staleTime: 60 * 60 * 1000, // 1 hour - weekly reports don't change often
    });
  };

  return {
    // Hooks
    useOverallProgress,
    usePuzzleProgress,
    useTutorialProgressStats,
    useLearningPathProgressStats,
    useProgressHistory,
    useWeeklyReport,
  };
}