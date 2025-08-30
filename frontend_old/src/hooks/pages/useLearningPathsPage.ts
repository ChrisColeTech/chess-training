// Learning paths page hook - replaces learningPaths.ts mock data
import { useLearningPaths } from '../learning/useLearningPaths';
import { useProgress } from '../progress/useProgress';

// Single responsibility: Provide all data needed for learning paths page
export function useLearningPathsPage() {
  const { 
    useLearningPathList, 
    useLearningCategories, 
    useLearningProgress 
  } = useLearningPaths();
  const { useLearningPathProgressStats } = useProgress();

  // Get learning paths data
  const { data: learningPaths, isLoading: isLoadingPaths, error: pathsError } = useLearningPathList();
  const { data: categories, isLoading: isLoadingCategories } = useLearningCategories();
  const { data: userProgress, isLoading: isLoadingUserProgress } = useLearningProgress();
  const { data: progressStats, isLoading: isLoadingStats } = useLearningPathProgressStats();

  // Transform API data to match existing interface expectations
  const getTransformedPaths = () => {
    if (!learningPaths) return [];

    return learningPaths.map(path => ({
      id: path.id,
      title: path.title,
      description: path.description,
      category: path.category,
      difficulty: path.difficulty,
      estimatedHours: path.estimatedHours,
      modules: path.modules || [],
      
      // Add UI-specific properties
      thumbnail: getThumbnailForCategory(path.category),
      color: getColorForDifficulty(path.difficulty),
      tags: [path.category, path.difficulty],
      
      // Progress information
      progress: getUserProgressForPath(path.id),
      isStarted: isPathStarted(path.id),
      isCompleted: isPathCompleted(path.id),
      
      // Stats
      studentsEnrolled: Math.floor(Math.random() * 1000) + 500,
      rating: 4.5 + Math.random() * 0.5,
      
      createdAt: path.createdAt,
      updatedAt: path.updatedAt,
    }));
  };

  const getThumbnailForCategory = (category: string): string => {
    const thumbnails = {
      fundamentals: '📚',
      tactics: '⚔️',
      strategy: '🧠',
      endgames: '👑',
      openings: '🏰',
      middlegame: '⚖️',
      advanced: '🎯',
      default: '🎓'
    };
    return thumbnails[category as keyof typeof thumbnails] || thumbnails.default;
  };

  const getColorForDifficulty = (difficulty: string): string => {
    const colors = {
      beginner: 'from-green-500 to-emerald-600',
      intermediate: 'from-blue-500 to-cyan-600',
      advanced: 'from-purple-500 to-violet-600',
      default: 'from-gray-500 to-gray-600'
    };
    return colors[difficulty as keyof typeof colors] || colors.default;
  };

  const getUserProgressForPath = (pathId: string): number => {
    if (!userProgress) return 0;
    
    if (Array.isArray(userProgress)) {
      const progress = userProgress.find(p => p.learningPathId === pathId);
      return progress ? calculateProgressPercentage(progress) : 0;
    }
    
    if (userProgress.learningPathId === pathId) {
      return calculateProgressPercentage(userProgress);
    }
    
    return 0;
  };

  const calculateProgressPercentage = (progress: any): number => {
    if (progress.completed) return 100;
    
    const totalModules = Object.keys(progress.moduleProgress || {}).length;
    if (totalModules === 0) return 0;
    
    const completedModules = Object.values(progress.moduleProgress || {})
      .filter((moduleProgress: any) => moduleProgress >= 100).length;
    
    return Math.round((completedModules / totalModules) * 100);
  };

  const isPathStarted = (pathId: string): boolean => {
    if (!userProgress) return false;
    
    if (Array.isArray(userProgress)) {
      return userProgress.some(p => p.learningPathId === pathId);
    }
    
    return userProgress.learningPathId === pathId;
  };

  const isPathCompleted = (pathId: string): boolean => {
    if (!userProgress) return false;
    
    if (Array.isArray(userProgress)) {
      const progress = userProgress.find(p => p.learningPathId === pathId);
      return progress?.completed || false;
    }
    
    return userProgress.learningPathId === pathId && userProgress.completed;
  };

  // Get learning path statistics
  const getStatistics = () => {
    if (!progressStats) return null;

    return {
      totalPaths: progressStats.total,
      completedPaths: progressStats.completed,
      inProgressPaths: progressStats.inProgress,
      totalHours: progressStats.totalHours || 0,
      completedHours: progressStats.completedHours || 0,
      averageCompletion: progressStats.completed > 0 ? 
        Math.round((progressStats.completedHours / progressStats.totalHours) * 100) : 0
    };
  };

  // Filter paths by category
  const getPathsByCategory = (category: string) => {
    const transformed = getTransformedPaths();
    return transformed.filter(path => path.category === category);
  };

  // Filter paths by difficulty
  const getPathsByDifficulty = (difficulty: string) => {
    const transformed = getTransformedPaths();
    return transformed.filter(path => path.difficulty === difficulty);
  };

  // Get recommended paths (based on progress and difficulty)
  const getRecommendedPaths = () => {
    const transformed = getTransformedPaths();
    return transformed
      .filter(path => !path.isCompleted && path.difficulty === 'beginner')
      .slice(0, 3);
  };

  return {
    // Transformed data
    learningPaths: getTransformedPaths(),
    categories: categories || [],
    statistics: getStatistics(),
    
    // Filtered data
    getPathsByCategory,
    getPathsByDifficulty,
    recommendedPaths: getRecommendedPaths(),
    
    // Raw API data
    rawPaths: learningPaths,
    userProgress,
    progressStats,
    
    // Loading states
    isLoading: isLoadingPaths || isLoadingCategories || isLoadingUserProgress || isLoadingStats,
    isLoadingPaths,
    isLoadingCategories, 
    isLoadingUserProgress,
    isLoadingStats,
    
    // Error states
    error: pathsError,
  };
}