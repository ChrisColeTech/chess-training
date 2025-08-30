/**
 * Form and input configurations
 * 
 * Generated: 2025-08-29T00:52:22.207Z
 * Consolidated from: 8 UI interface(s)
 * Source files: contact.ts, customPuzzles.ts, detailedStats.ts, gameReview.ts, playComputer.ts, preferences.ts, progressOverview.ts
 */

// From: /mnt/c/Projects/chess-training/frontend/src/types/contact.ts
export interface ContactFormData {
  selectedCategory: string;
  subject: string;
  message: string;
  email: string;
  attachFiles: boolean;
  includeSystemInfo: boolean;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/contact.ts
export interface ContactFormErrors {
  category?: string;
  subject?: string;
  message?: string;
  email?: string;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/customPuzzles.ts
export interface CustomPuzzleFormData {
  title: string; // Puzzle title
  description: string; // Puzzle description
  fen: string; // Starting position FEN
  solution: string[]; // Solution moves
  theme: string; // Puzzle theme
  difficulty: CustomPuzzleDifficulty; // Difficulty level
  tags: string[]; // Tags
  hint1: string; // Hints
  hint2: string;
  hint3: string;
  notes?: string; // Additional notes
  collectionId?: string; // Collection to add to
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/detailedStats.ts
export interface PerformanceMetrics_detailedStats {
  overallRating: PerformanceRating; // Overall performance rating
  accuracy: number; // Overall accuracy percentage
  ratingProgression: {
    current: number
    peak: number
    change7d: number
    change30d: number
    predicted: number
    confidenceInterval: number
  }; // Rating progression data
  phasePerformance: Record<GamePhase, {
    accuracy: number
    rating: PerformanceRating
    gamesPlayed: number
    improvement: number
  }>; // Performance by game phase
  tacticalPerformance: {
    puzzleRating: number
    solvingAccuracy: number
    avgSolveTime: number
    bestStreak: number
    currentStreak: number
    patternStrengths: Record<TacticalPattern, {
      accuracy: number
      count: number
      avgTime: number
    }>
  }; // Tactical performance
  timeManagement: {
    avgThinkingTime: number
    timePerMove: number
    blundersByTimeSpent: Array<{
      timeRange: string
      blunderRate: number
    }>
    timeDistribution: {
      opening: number
      middlegame: number
      endgame: number
    }
  }; // Time management statistics
  evaluationAccuracy: {
    positionAssessment: number
    calculateVariations: number
    findTactics: number
    endgameTechnique: number
  }; // Position evaluation accuracy
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/gameReview.ts
export interface PerformanceMetrics_gameReview {
  overallAccuracy: number; // Overall accuracy percentage
  phaseAccuracy: {
    opening: number
    middlegame: number
    endgame: number
  }; // Accuracy by game phase
  moveClassifications: {
    brilliant: number
    great: number
    good: number
    inaccuracy: number
    mistake: number
    blunder: number
  }; // Move classifications count
  performanceRating: number; // Performance rating for this game
  averageCentipawnLoss: number; // ACPL (Average Centipawn Loss)
  blunderRate: number; // Blunder rate percentage
  timeEfficiency: number; // Time management efficiency
  criticalPositionScore: number; // Critical position handling
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/playComputer.ts
export interface PerformanceStats {
  gamesPlayed: number; // Total games played
  gamesWon: number; // Games won
  gamesDrawn: number; // Games drawn
  gamesLost: number; // Games lost
  winRate: number; // Win percentage
  avgGameLength: number; // Average game length (moves)
  avgGameDuration: number; // Average game duration (minutes)
  currentRating: number; // Current rating
  peakRating: number; // Highest rating achieved
  gamesByDifficulty: Record<AIDifficulty, number>; // Games by difficulty
  timeControlStats: Record<TimeControl, {
    played: number
    won: number
    winRate: number
  }>; // Favorite time controls
  recentGames: {
    result: GameResult
    rating: number
    opponent: string
    date: number
  }[]; // Recent performance trend
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/preferences.ts
export interface PerformancePreferences {
  performanceLevel: PerformanceLevel; // Performance level
  graphics: {
    renderQuality: 'low' | 'medium' | 'high' | 'ultra'
    frameRate: 30 | 60 | 120 | 'unlimited'
    vsync: boolean
    antiAliasing: boolean
    shadows: boolean
    reflections: boolean
    particleCount: number
  }; // Graphics settings
  memory: {
    cacheSize: number
    preloadContent: boolean
    compressData: boolean
    clearCacheOnExit: boolean
    maxHistorySize: number
  }; // Memory management
  network: {
    connectionTimeout: number
    retryAttempts: number
    compressionEnabled: boolean
    offlineMode: boolean
    syncInterval: number
  }; // Network settings
  advanced: {
    debugMode: boolean
    developerTools: boolean
    experimentalFeatures: boolean
    betaTesting: boolean
    telemetryEnabled: boolean
    crashReporting: boolean
  }; // Advanced features
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/progressOverview.ts
export interface PerformanceAnalytics {
  overallRating: number; // Overall rating
  ratingHistory: RatingDataPoint[]; // Rating history
  peakRating: number; // Peak rating achieved
  peakRatingDate: number; // Peak rating date
  gameStats: {
    wins: number
    losses: number
    draws: number
    totalGames: number
    winRate: number
  }; // Win/loss/draw statistics
  timeControlStats: {
    blitz: { rating: number; games: number; winRate: number }
    rapid: { rating: number; games: number; winRate: number }
    classical: { rating: number; games: number; winRate: number }
  }; // Time control performance
  recentTrend: {
    direction: TrendDirection
    change: number
    period: TimePeriod
  }; // Recent performance trend
  accuracy: {
    overall: number
    tactical: number
    positional: number
    endgame: number
  }; // Accuracy metrics
}

// Consolidated FormConfig
export const FormConfig = {
  contactFormData: {} as ContactFormData,
  contactFormErrors: {} as ContactFormErrors,
  customPuzzleFormData: {} as CustomPuzzleFormData,
  performanceMetrics: {} as PerformanceMetrics_detailedStats,
  performanceMetrics: {} as PerformanceMetrics_gameReview,
  performanceStats: {} as PerformanceStats,
  performancePreferences: {} as PerformancePreferences,
  performanceAnalytics: {} as PerformanceAnalytics,
} as const;

// Type exports
export type ContactFormDataType = ContactFormData;
export type ContactFormErrorsType = ContactFormErrors;
export type CustomPuzzleFormDataType = CustomPuzzleFormData;
export type PerformanceMetrics_detailedStatsType = PerformanceMetrics_detailedStats;
export type PerformanceMetrics_gameReviewType = PerformanceMetrics_gameReview;
export type PerformanceStatsType = PerformanceStats;
export type PerformancePreferencesType = PerformancePreferences;
export type PerformanceAnalyticsType = PerformanceAnalytics;
