// Centralized hook exports following SRP architecture
// This file provides single entry point for all hooks

// Authentication hooks
export { useAuth } from './auth/useAuth';

// Puzzle hooks
export { usePuzzles } from './puzzles/usePuzzles';

// Tutorial hooks
export { useTutorials } from './tutorials/useTutorials';

// Learning path hooks
export { useLearningPaths } from './learning/useLearningPaths';

// Profile hooks
export { useProfile } from './profile/useProfile';

// Progress hooks
export { useProgress } from './progress/useProgress';

// Page-specific hooks (replace mock data)
export { useProfilePage } from './pages/useProfilePage';
export { useTutorialsPage } from './pages/useTutorialsPage';
export { usePuzzlesPage } from './pages/usePuzzlesPage';
export { useLearningPathsPage } from './pages/useLearningPathsPage';

// Re-export API service and types for convenience
export { apiService } from '../services/api';
export type { ApiError } from '../services/ErrorService';
export * from '../types/api';