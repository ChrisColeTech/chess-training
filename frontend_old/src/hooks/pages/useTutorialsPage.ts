// Tutorials page hook - replaces tutorials.ts mock data
import { useTutorials } from '../tutorials/useTutorials';
import { type Tutorial, type TutorialProgress, type TutorialStatistics } from '@/types/tutorials';

// Single responsibility: Provide all data needed for tutorials page
export function useTutorialsPage() {
  const { 
    useTutorialList, 
    useTutorialCategories, 
    useTutorialsByDifficulty, 
    useTutorialProgress 
  } = useTutorials();

  // Get tutorials data
  const { data: allTutorials, isLoading: isLoadingTutorials, error: tutorialsError } = useTutorialList();
  const { data: categories, isLoading: isLoadingCategories } = useTutorialCategories();
  const { data: progressData, isLoading: isLoadingProgress } = useTutorialProgress();

  // Get tutorials by difficulty for filtering
  const { data: beginnerTutorials } = useTutorialsByDifficulty('beginner');
  const { data: intermediateTutorials } = useTutorialsByDifficulty('intermediate');
  const { data: advancedTutorials } = useTutorialsByDifficulty('advanced');

  // Transform API data to match existing interface
  const getTransformedTutorials = (): Tutorial[] => {
    if (!allTutorials) return [];

    return allTutorials.map(tutorial => ({
      id: tutorial.id,
      title: tutorial.title,
      description: tutorial.description,
      summary: tutorial.description, // Use description as summary
      category: tutorial.category,
      difficulty: tutorial.difficulty.charAt(0).toUpperCase() + tutorial.difficulty.slice(1),
      estimatedDuration: 15, // Default duration
      steps: tutorial.steps || [],
      thumbnailUrl: getThumbnailForCategory(tutorial.category),
      tags: [tutorial.category, tutorial.difficulty],
      authorName: 'Chess Training',
      rating: 4.8,
      studentsCount: 1250,
      lastUpdated: tutorial.updatedAt,
      prerequisites: [],
      learningOutcomes: [
        'Understand the concepts',
        'Practice the techniques', 
        'Apply to your games'
      ],
      isCompleted: Array.isArray(progressData) 
        ? progressData.some(p => p.tutorialId === tutorial.id && p.completed)
        : false,
      completionPercentage: getCompletionPercentage(tutorial.id, progressData)
    }));
  };

  const getThumbnailForCategory = (category: string): string => {
    const thumbnails = {
      basics: '🏁',
      tactics: '⚔️',
      strategy: '🧠',
      endgame: '👑',
      openings: '🏰',
      middlegame: '⚖️',
      default: '📚'
    };
    return thumbnails[category as keyof typeof thumbnails] || thumbnails.default;
  };

  const getCompletionPercentage = (tutorialId: string, progress: any): number => {
    if (!progress) return 0;
    
    if (Array.isArray(progress)) {
      const tutorialProgress = progress.find(p => p.tutorialId === tutorialId);
      if (tutorialProgress?.completed) return 100;
      return tutorialProgress?.currentStep ? (tutorialProgress.currentStep / 10) * 100 : 0;
    }
    
    return 0;
  };

  // Mock statistics (would come from progress API)
  const getStatistics = (): TutorialStatistics => ({
    totalTutorials: allTutorials?.length || 0,
    completedTutorials: Array.isArray(progressData) 
      ? progressData.filter(p => p.completed).length 
      : 0,
    totalStudyTime: Array.isArray(progressData) 
      ? progressData.length * 15 
      : 0,
    currentStreak: 5, // Would come from progress tracking
    averageRating: 4.7,
    certificatesEarned: 2
  });

  return {
    // Transformed data
    tutorials: getTransformedTutorials(),
    categories: categories || [],
    statistics: getStatistics(),
    
    // Raw API data for advanced usage
    rawTutorials: allTutorials,
    progressData,
    
    // Filter helpers
    beginnerTutorials: beginnerTutorials || [],
    intermediateTutorials: intermediateTutorials || [],
    advancedTutorials: advancedTutorials || [],
    
    // Loading states
    isLoading: isLoadingTutorials || isLoadingCategories || isLoadingProgress,
    isLoadingTutorials,
    isLoadingCategories,
    isLoadingProgress,
    
    // Error states
    error: tutorialsError,
  };
}