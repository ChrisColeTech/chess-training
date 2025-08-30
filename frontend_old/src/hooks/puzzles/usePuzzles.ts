// Puzzle hooks following SRP
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../../services/api';
import { queryKeys } from '../../lib/query-client';
import type { Puzzle, PuzzleAttempt, PuzzleStats } from '../../types/api';

// Single responsibility: Puzzle data and solving functionality
export function usePuzzles() {
  const queryClient = useQueryClient();

  // Get next puzzle
  const useNextPuzzle = (difficulty?: string, category?: string) => {
    return useQuery({
      queryKey: queryKeys.puzzles.next({ difficulty, category }),
      queryFn: () => apiService.puzzles.getNextPuzzle(difficulty, category),
      enabled: true,
      staleTime: 0, // Always fetch fresh puzzle
    });
  };

  // Get puzzle statistics
  const usePuzzleStats = () => {
    return useQuery({
      queryKey: queryKeys.puzzles.stats,
      queryFn: () => apiService.puzzles.getPuzzleStats(),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Get puzzles by category
  const usePuzzlesByCategory = (category: string, page: number = 1, limit: number = 20) => {
    return useQuery({
      queryKey: queryKeys.puzzles.byCategory(category, page),
      queryFn: () => apiService.puzzles.getPuzzlesByCategory(category, page, limit),
      enabled: !!category,
    });
  };

  // Get puzzles by difficulty
  const usePuzzlesByDifficulty = (difficulty: string, page: number = 1, limit: number = 20) => {
    return useQuery({
      queryKey: queryKeys.puzzles.byDifficulty(difficulty, page),
      queryFn: () => apiService.puzzles.getPuzzlesByDifficulty(difficulty, page, limit),
      enabled: !!difficulty,
    });
  };

  // Solve puzzle mutation
  const solvePuzzleMutation = useMutation({
    mutationFn: ({ puzzleId, attempt }: { puzzleId: string; attempt: PuzzleAttempt }) =>
      apiService.puzzles.solvePuzzle(puzzleId, attempt),
    onSuccess: (result, { puzzleId }) => {
      // Invalidate puzzle stats after solving
      queryClient.invalidateQueries({ queryKey: queryKeys.puzzles.stats });
      queryClient.invalidateQueries({ queryKey: queryKeys.progress.puzzles });
      
      // If solved correctly, get a new puzzle
      if (result.correct) {
        queryClient.invalidateQueries({ queryKey: queryKeys.puzzles.next() });
      }
    },
  });

  // Get hint mutation
  const getHintMutation = useMutation({
    mutationFn: (puzzleId: string) => apiService.puzzles.getHint(puzzleId),
  });

  return {
    // Hooks
    useNextPuzzle,
    usePuzzleStats,
    usePuzzlesByCategory,
    usePuzzlesByDifficulty,

    // Actions
    solvePuzzle: solvePuzzleMutation.mutateAsync,
    getHint: getHintMutation.mutateAsync,

    // Loading states
    isSolvingPuzzle: solvePuzzleMutation.isPending,
    isGettingHint: getHintMutation.isPending,

    // Error states
    solvePuzzleError: solvePuzzleMutation.error,
    getHintError: getHintMutation.error,
  };
}