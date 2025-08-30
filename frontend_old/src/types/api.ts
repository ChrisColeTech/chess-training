// API types following backend schema patterns

// Base response interfaces
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  details?: any;
}

// Authentication types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

// Puzzle types
export interface Puzzle {
  id: string;
  fen: string;
  solution: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  hints?: string[];
  rating?: number;
}

export interface PuzzleAttempt {
  puzzleId: string;
  moves: string[];
  timeTaken: number;
}

export interface PuzzleStats {
  totalPuzzles: number;
  solvedPuzzles: number;
  averageTime: number;
  bestStreak: number;
  currentStreak: number;
}

// Tutorial types
export interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  steps: TutorialStep[];
  createdAt: string;
  updatedAt: string;
  thumbnailUrl?: string;
  estimatedDuration?: number;
}

export interface TutorialStep {
  id: string;
  tutorialId: string;
  stepNumber: number;
  title: string;
  content: string;
  fen?: string;
  moves?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TutorialProgress {
  tutorialId: string;
  userId: string;
  currentStep: number;
  completed: boolean;
  startedAt: string;
  completedAt?: string;
}

// Learning types
export interface LearningPath {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: number;
  modules: LearningModule[];
  createdAt: string;
  updatedAt: string;
}

export interface LearningModule {
  id: string;
  learningPathId: string;
  title: string;
  description: string;
  content: string;
  orderIndex: number;
  resources: LearningResource[];
  createdAt: string;
  updatedAt: string;
}

export interface LearningResource {
  id: string;
  moduleId: string;
  title: string;
  type: 'video' | 'article' | 'interactive' | 'quiz';
  url?: string;
  content?: string;
  orderIndex: number;
}

export interface LearningProgress {
  learningPathId: string;
  userId: string;
  currentModule: number;
  moduleProgress: { [moduleId: string]: number };
  completed: boolean;
  startedAt: string;
  completedAt?: string;
}

// Analysis types
export interface AnalysisRequest {
  fen: string;
  moves?: string[];
  depth?: number;
}

export interface AnalysisResult {
  bestMove: string;
  evaluation: number;
  variations: string[][];
  depth: number;
}

// Game types
export interface Game {
  id: string;
  white: string;
  black: string;
  result: '1-0' | '0-1' | '1/2-1/2' | '*';
  pgn: string;
  date: string;
  event?: string;
  round?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GameAnalysis {
  gameId: string;
  accuracy: {
    white: number;
    black: number;
  };
  blunders: number;
  mistakes: number;
  inaccuracies: number;
  keyMoments: {
    move: number;
    evaluation: number;
    comment: string;
  }[];
}

// Profile types
export interface UserProfile {
  id: string;
  username: string;
  email: string;
  rating: number;
  gamesPlayed: number;
  puzzlesSolved: number;
  tutorialsCompleted: number;
  preferences: UserPreferences;
  statistics: UserStatistics;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  boardStyle: string;
  pieceSet: string;
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  autoPromoteQueen: boolean;
  showCoordinates: boolean;
}

export interface UserStatistics {
  totalPlayTime: number;
  averageGameTime: number;
  favoriteOpenings: string[];
  strengths: string[];
  areasForImprovement: string[];
}

// Achievement types
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  points: number;
  requirements: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface UserAchievement {
  userId: string;
  achievementId: string;
  unlockedAt: string;
  progress?: number;
}

// Settings types
export interface AppSettings {
  boardTheme: string;
  pieceTheme: string;
  soundEnabled: boolean;
  animationSpeed: number;
  showMoveHighlights: boolean;
  showLegalMoves: boolean;
  autoPromoteQueen: boolean;
  confirmMoves: boolean;
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

// Progress tracking types
export interface ProgressData {
  puzzles: {
    total: number;
    solved: number;
    byDifficulty: Record<string, { total: number; solved: number }>;
  };
  tutorials: {
    total: number;
    completed: number;
    inProgress: number;
  };
  learningPaths: {
    total: number;
    completed: number;
    inProgress: number;
  };
  games: {
    total: number;
    wins: number;
    losses: number;
    draws: number;
  };
}

// Progress tracking interfaces (moved from client)
export interface ProgressOverview {
  ratings: {
    chess: number;
    puzzle: number;
  };
  activity: {
    todayGames: number;
    todayPuzzles: number;
    currentStreak: number;
  };
  statistics: {
    games: {
      total: number;
      wins: number;
      losses: number;
      draws: number;
      winRate: number;
    };
    puzzles: {
      total: number;
      correct: number;
      accuracy: number;
      avgTime: number;
    };
  };
}

export interface DetailedProgress {
  ratingHistory: Array<{
    date: string;
    avg_rating_change: number;
    attempts: number;
  }>;
  themePerformance: Array<{
    themes: string;
    attempts: number;
    accuracy: number;
    avg_time: number;
  }>;
  hourlyPerformance: Array<{
    hour: string;
    attempts: number;
    accuracy: number;
  }>;
  recentSessions: Array<{
    session_date: string;
    puzzles_solved: number;
    accuracy: number;
    rating_change: number;
  }>;
}

export interface LearningPathWithProgress {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  estimatedTime: string;
  unlocked: boolean;
}