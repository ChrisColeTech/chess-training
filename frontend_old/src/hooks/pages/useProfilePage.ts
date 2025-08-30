// Profile page hook - replaces userProfile.ts mock data
import { useProfile } from '../profile/useProfile';
import { useProgress } from '../progress/useProgress';
import { usePuzzles } from '../puzzles/usePuzzles';
import { type ProfileData, type ProfileUser, type Achievement, type RecentActivity, type QuickAction } from '@/types/profile';

// Single responsibility: Provide all data needed for profile page
export function useProfilePage() {
  // Get data from API hooks
  const { useUserProfile, useUserStatistics } = useProfile();
  const { useOverallProgress } = useProgress();
  const { usePuzzleStats } = usePuzzles();

  const { data: userProfile, isLoading: isLoadingProfile, error: profileError } = useUserProfile();
  const { data: userStats, isLoading: isLoadingStats } = useUserStatistics();
  const { data: overallProgress, isLoading: isLoadingProgress } = useOverallProgress();
  const { data: puzzleStats, isLoading: isLoadingPuzzles } = usePuzzleStats();

  // Transform API data to match existing ProfileData interface
  const getTransformedData = (): ProfileData | null => {
    if (!userProfile || !userStats || !overallProgress || !puzzleStats) {
      return null;
    }

    // Transform user profile to ProfileUser format
    const profileUser: ProfileUser = {
      displayName: userProfile.username,
      email: userProfile.email,
      skillLevel: userProfile.rating > 1400 ? 'intermediate' : 'beginner',
      joinDate: userProfile.createdAt.split('T')[0],
      currentRating: userProfile.rating,
      peakRating: userProfile.rating + 70, // Could come from rating history
      ratingChange: +25, // Would come from recent games
      gamesPlayed: userProfile.gamesPlayed,
      puzzlesSolved: puzzleStats.solvedPuzzles,
      studyHours: userProfile.tutorialsCompleted * 2, // Estimate
      winRate: userProfile.gamesPlayed > 0 ? 67.2 : 0, // Would calculate from game results
      currentStreak: puzzleStats.currentStreak,
      longestStreak: puzzleStats.bestStreak,
      favoriteOpening: userStats.favoriteOpenings?.[0] || "Queen's Gambit"
    };

    // Mock achievements (would come from achievement API)
    const achievements: Achievement[] = [
      { 
        id: 'tactical-master', 
        name: 'Tactical Master', 
        description: 'Solve 1000 tactical puzzles', 
        icon: 'Target', 
        unlocked: puzzleStats.solvedPuzzles >= 1000, 
        progress: puzzleStats.solvedPuzzles, 
        total: 1000,
        rarity: 'epic'
      },
      { 
        id: 'puzzle-streak', 
        name: 'Puzzle Streak', 
        description: 'Solve 10 puzzles in a row', 
        icon: 'Zap', 
        unlocked: puzzleStats.currentStreak >= 10, 
        progress: puzzleStats.currentStreak, 
        total: 10,
        rarity: 'rare'
      }
    ];

    // Mock recent activity (would come from activity API)
    const recentActivity: RecentActivity[] = [
      { 
        type: 'puzzle', 
        description: 'Solved tactical puzzle', 
        time: '2 hours ago', 
        points: '+12 ELO' 
      },
      { 
        type: 'tutorial', 
        description: 'Completed tutorial', 
        time: '1 day ago', 
        points: 'Progress!' 
      }
    ];

    // Static quick actions
    const quickActions: QuickAction[] = [
      { 
        title: 'Train Tactics', 
        description: 'Solve puzzles to improve', 
        icon: 'Target', 
        color: 'from-red-500 to-pink-600', 
        link: '/puzzles/tactics' 
      },
      { 
        title: 'Play AI', 
        description: 'Challenge the computer', 
        icon: 'Brain', 
        color: 'from-blue-500 to-cyan-600', 
        link: '/play/computer' 
      },
      { 
        title: 'Analyze Games', 
        description: 'Review your performance', 
        icon: 'TrendingUp', 
        color: 'from-green-500 to-emerald-600', 
        link: '/analysis/board' 
      },
      { 
        title: 'Study Tutorials', 
        description: 'Learn chess concepts', 
        icon: 'Shield', 
        color: 'from-purple-500 to-violet-600', 
        link: '/tutorials' 
      }
    ];

    return {
      userStats: profileUser,
      achievements,
      recentActivity,
      quickActions
    };
  };

  return {
    data: getTransformedData(),
    isLoading: isLoadingProfile || isLoadingStats || isLoadingProgress || isLoadingPuzzles,
    error: profileError,
    
    // Individual data pieces for more granular access
    userProfile,
    userStats,
    overallProgress,
    puzzleStats,
  };
}