// Puzzles page hook - replaces puzzle mock data files
import { usePuzzles } from '../puzzles/usePuzzles';
import { useProgress } from '../progress/useProgress';

// Single responsibility: Provide all data needed for puzzles pages
export function usePuzzlesPage() {
  const { 
    useNextPuzzle, 
    usePuzzleStats, 
    usePuzzlesByCategory, 
    usePuzzlesByDifficulty 
  } = usePuzzles();
  const { usePuzzleProgress } = useProgress();

  // Get next puzzle for training
  const { data: nextPuzzle, isLoading: isLoadingNext, error: nextError, refetch: refetchNext } = useNextPuzzle();
  
  // Get puzzle statistics
  const { data: puzzleStats, isLoading: isLoadingStats } = usePuzzleStats();
  
  // Get progress data
  const { data: progressData, isLoading: isLoadingProgress } = usePuzzleProgress();

  // Puzzle categories and difficulties
  const puzzleCategories = [
    'tactics',
    'endgame', 
    'middlegame',
    'opening',
    'mate-in-one',
    'mate-in-two',
    'pin',
    'fork',
    'skewer',
    'discovered-attack'
  ];

  const puzzleDifficulties = ['beginner', 'intermediate', 'advanced', 'expert'];

  // Get puzzles by category hook factory
  const useCategoryPuzzles = (category: string, page: number = 1) => {
    return usePuzzlesByCategory(category, page);
  };

  // Get puzzles by difficulty hook factory  
  const useDifficultyPuzzles = (difficulty: string, page: number = 1) => {
    return usePuzzlesByDifficulty(difficulty, page);
  };

  // Transform progress data for UI
  const getTransformedProgress = () => {
    if (!progressData || !puzzleStats) return null;

    return {
      total: progressData.total,
      solved: progressData.solved,
      accuracy: puzzleStats.solvedPuzzles > 0 ? (puzzleStats.solvedPuzzles / puzzleStats.totalPuzzles) * 100 : 0,
      averageTime: progressData.averageTime || 0,
      currentStreak: progressData.currentStreak,
      bestStreak: progressData.bestStreak,
      byDifficulty: progressData.byDifficulty || {},
      byCategory: progressData.byCategory || {},
      recentSolves: progressData.recentSolves || []
    };
  };

  // Get puzzle configuration for different training modes
  const getTrainingModes = () => [
    {
      id: 'mixed',
      name: 'Mixed Training',
      description: 'Random puzzles from all categories',
      icon: '🎲',
      difficulty: null,
      category: null
    },
    {
      id: 'tactics',
      name: 'Tactical Training',
      description: 'Focus on tactical patterns',
      icon: '⚔️',
      difficulty: null,
      category: 'tactics'
    },
    {
      id: 'endgame',
      name: 'Endgame Training',
      description: 'Master endgame techniques',
      icon: '👑',
      difficulty: null,
      category: 'endgame'
    },
    {
      id: 'beginner',
      name: 'Beginner Level',
      description: 'Easy puzzles for learning',
      icon: '🌱',
      difficulty: 'beginner',
      category: null
    }
  ];

  return {
    // Current puzzle data
    nextPuzzle,
    isLoadingNext,
    nextError,
    refetchNext,

    // Statistics and progress
    puzzleStats,
    progressData: getTransformedProgress(),
    
    // Configuration
    categories: puzzleCategories,
    difficulties: puzzleDifficulties,
    trainingModes: getTrainingModes(),

    // Hook factories for filtered puzzles
    useCategoryPuzzles,
    useDifficultyPuzzles,

    // Loading states
    isLoading: isLoadingNext || isLoadingStats || isLoadingProgress,
    isLoadingStats,
    isLoadingProgress,

    // Error states  
    error: nextError,
  };
}