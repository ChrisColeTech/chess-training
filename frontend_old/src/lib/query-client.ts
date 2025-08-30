// React Query configuration following best practices
import { QueryClient } from '@tanstack/react-query';
import { ErrorService } from '../services/ErrorService';

// Single responsibility: Configure React Query client with error handling
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time - how long data stays fresh
      staleTime: 5 * 60 * 1000, // 5 minutes
      
      // Cache time - how long data stays in cache when not in use
      gcTime: 10 * 60 * 1000, // 10 minutes (was cacheTime)
      
      // Retry configuration
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors except 408, 429
        if (error && typeof error === 'object' && 'status' in error) {
          const status = error.status as number;
          if (status >= 400 && status < 500 && status !== 408 && status !== 429) {
            return false;
          }
        }
        return failureCount < 3;
      },
      
      // Retry delay with exponential backoff
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      
      // Refetch on window focus (disabled for better UX)
      refetchOnWindowFocus: false,
      
      // Refetch on reconnect
      refetchOnReconnect: 'always',
      
      // Global error handler
      onError: (error) => {
        const apiError = ErrorService.handleApiError(error);
        console.error('Query error:', apiError);
        
        // Show user-friendly error message for critical errors
        if (apiError.status && apiError.status >= 500) {
          // Could integrate with toast/notification system here
          console.warn('Server error occurred:', ErrorService.formatErrorMessage(apiError));
        }
      },
    },
    mutations: {
      // Retry mutations only for network errors
      retry: (failureCount, error) => {
        if (error && typeof error === 'object' && 'status' in error) {
          return false; // Don't retry mutations with HTTP errors
        }
        return failureCount < 2;
      },
      
      // Global mutation error handler
      onError: (error) => {
        const apiError = ErrorService.handleApiError(error);
        console.error('Mutation error:', apiError);
        
        // Handle authentication errors globally
        if (apiError.status === 401) {
          // Could trigger logout or token refresh here
          console.warn('Authentication error in mutation');
        }
      },
    },
  },
});

// Query keys factory for consistent key management
export const queryKeys = {
  // Authentication
  auth: {
    profile: ['auth', 'profile'] as const,
  },
  
  // Puzzles
  puzzles: {
    all: ['puzzles'] as const,
    next: (filters?: Record<string, string>) => ['puzzles', 'next', filters] as const,
    stats: ['puzzles', 'stats'] as const,
    byCategory: (category: string, page: number) => ['puzzles', 'category', category, page] as const,
    byDifficulty: (difficulty: string, page: number) => ['puzzles', 'difficulty', difficulty, page] as const,
  },
  
  // Tutorials
  tutorials: {
    all: ['tutorials'] as const,
    byId: (id: string) => ['tutorials', id] as const,
    categories: ['tutorials', 'categories'] as const,
    byCategory: (category: string) => ['tutorials', 'category', category] as const,
    byDifficulty: (difficulty: string) => ['tutorials', 'difficulty', difficulty] as const,
    steps: (tutorialId: string) => ['tutorials', tutorialId, 'steps'] as const,
    progress: (tutorialId?: string) => 
      tutorialId ? ['tutorials', 'progress', tutorialId] as const : ['tutorials', 'progress'] as const,
  },
  
  // Learning paths
  learning: {
    all: ['learning'] as const,
    paths: ['learning', 'paths'] as const,
    pathById: (id: string) => ['learning', 'paths', id] as const,
    pathStats: (id: string) => ['learning', 'paths', id, 'stats'] as const,
    modules: ['learning', 'modules'] as const,
    moduleById: (id: string) => ['learning', 'modules', id] as const,
    categories: ['learning', 'categories'] as const,
    progress: (pathId?: string) => 
      pathId ? ['learning', 'progress', pathId] as const : ['learning', 'progress'] as const,
  },
  
  // Analysis
  analysis: {
    position: (fen: string, depth?: number) => ['analysis', 'position', fen, depth] as const,
    game: (pgn: string, depth?: number) => ['analysis', 'game', pgn, depth] as const,
    bestMove: (fen: string, depth?: number) => ['analysis', 'best-move', fen, depth] as const,
    opening: (moves: string[]) => ['analysis', 'opening', moves] as const,
    evaluate: (fen: string) => ['analysis', 'evaluate', fen] as const,
  },
  
  // Games
  games: {
    all: ['games'] as const,
    list: (page: number, limit: number) => ['games', 'list', page, limit] as const,
    byId: (id: string) => ['games', id] as const,
    byPlayer: (player: string, page: number) => ['games', 'player', player, page] as const,
    byResult: (result: string, page: number) => ['games', 'result', result, page] as const,
    analysis: (id: string) => ['games', id, 'analysis'] as const,
  },
  
  // Profile
  profile: {
    user: ['profile'] as const,
    preferences: ['profile', 'preferences'] as const,
    statistics: ['profile', 'statistics'] as const,
    playHistory: (page: number, limit: number) => ['profile', 'play-history', page, limit] as const,
    ratingHistory: (days: number) => ['profile', 'rating-history', days] as const,
  },
  
  // Achievements
  achievements: {
    all: ['achievements'] as const,
    byId: (id: string) => ['achievements', id] as const,
    user: ['achievements', 'user'] as const,
    byCategory: (category: string) => ['achievements', 'category', category] as const,
    categories: ['achievements', 'categories'] as const,
    progress: (id: string) => ['achievements', id, 'progress'] as const,
    recent: (limit: number) => ['achievements', 'recent', limit] as const,
    leaderboard: (achievementId?: string, limit?: number) => 
      ['achievements', 'leaderboard', achievementId, limit] as const,
  },
  
  // Settings
  settings: {
    app: ['settings'] as const,
    boardThemes: ['settings', 'board-themes'] as const,
    pieceThemes: ['settings', 'piece-themes'] as const,
    soundPacks: ['settings', 'sound-packs'] as const,
  },
  
  // Notifications
  notifications: {
    all: (page: number, limit: number) => ['notifications', page, limit] as const,
    unread: ['notifications', 'unread'] as const,
    byType: (type: string, page: number, limit: number) => ['notifications', 'type', type, page, limit] as const,
    settings: ['notifications', 'settings'] as const,
  },
  
  // Progress
  progress: {
    overall: ['progress'] as const,
    puzzles: ['progress', 'puzzles'] as const,
    tutorials: ['progress', 'tutorials'] as const,
    learning: ['progress', 'learning'] as const,
    history: (days: number) => ['progress', 'history', days] as const,
    weeklyReport: ['progress', 'weekly-report'] as const,
  },
  
  // Search
  search: {
    all: (query: string, filters?: Record<string, any>) => ['search', 'all', query, filters] as const,
    puzzles: (query: string, filters?: Record<string, any>) => ['search', 'puzzles', query, filters] as const,
    tutorials: (query: string, filters?: Record<string, any>) => ['search', 'tutorials', query, filters] as const,
    learningPaths: (query: string, filters?: Record<string, any>) => ['search', 'learning-paths', query, filters] as const,
    games: (query: string, filters?: Record<string, any>) => ['search', 'games', query, filters] as const,
    suggestions: (query: string, type?: string) => ['search', 'suggestions', query, type] as const,
    popular: (type?: string, limit?: number) => ['search', 'popular', type, limit] as const,
    saved: ['search', 'saved'] as const,
  },
} as const;