/**
 * Puzzle interface and filtering configurations
 * 
 * Generated: 2025-08-29T00:52:22.208Z
 * Consolidated from: 18 UI interface(s)
 * Source files: puzzleSourceMappings.ts, tacticalPuzzles.ts, userPuzzlePreferences.ts, userPuzzleSelections.ts, userPuzzleSessions.ts, userPuzzleStats.ts, customPuzzles.ts, endgameLibrary.ts, masterGames.ts, openingPuzzles.ts, puzzleSelection.ts
 */

// From: /mnt/c/Projects/chess-training/frontend/src/data/puzzleSourceMappings.ts
export interface PuzzleSourceMapping {
  source: PuzzleSource;
  label: string;
  icon: string;
  shortIcon: string;
  color?: string;
}

// From: /mnt/c/Projects/chess-training/frontend/src/data/tacticalPuzzles.ts
export interface TacticalPuzzle {
  id: number;
  fen: string;
  solution: string[];
  theme: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  moves: number;
  description: string;
  hint1: string;
  hint2: string;
  hint3: string;
}

// From: /mnt/c/Projects/chess-training/frontend/src/data/userPuzzlePreferences.ts
export interface UserPuzzlePreferences {
  userId: string;
  preferredDifficulties: CustomPuzzleDifficulty[];
  preferredSources: PuzzleSource[];
  ratingRange: {
    min: number
    max: number
  };
  themes: string[];
  autoAdvance: boolean;
  showHints: boolean;
  timeLimit?: number;
  createdAt: string;
  updatedAt: string;
}

// From: /mnt/c/Projects/chess-training/frontend/src/data/userPuzzleSelections.ts
export interface UserPuzzleSelection {
  userId: string;
  selectionHistory: PuzzleSelectionEntry[];
  favoriteThemes: string[];
  blacklistedThemes: string[];
  preferredTimeControl: 'blitz' | 'rapid' | 'untimed';
  difficultyProgression: {
    currentLevel: string
    autoProgression: boolean
    manualOverrides: string[]
  };
  customFilters: {
    ratingRange: { min: number; max: number }
    sources: string[]
    excludeSolved: boolean
    prioritizeWeakAreas: boolean
  };
  selectionAlgorithm: 'random' | 'adaptive' | 'progressive' | 'weakness-focused';
  createdAt: string;
  updatedAt: string;
}

// From: /mnt/c/Projects/chess-training/frontend/src/data/userPuzzleSelections.ts
export interface PuzzleSelectionEntry {
  timestamp: string;
  puzzleId: string;
  selectionReason: string;
  userRating: number;
  puzzleRating: number;
  theme: string;
  difficulty: string;
  wasSkipped: boolean;
  performance: number;
}

// From: /mnt/c/Projects/chess-training/frontend/src/data/userPuzzleSessions.ts
export interface UserPuzzleSession {
  sessionId: string;
  userId: string;
  startTime: string;
  endTime?: string;
  puzzlesSolved: number;
  correctAnswers: number;
  totalTime: number;
  averageTime: number;
  selectedDifficulties: string[];
  selectedThemes: string[];
  sessionType: 'timed' | 'untimed' | 'survival' | 'themed';
  results: PuzzleResult[];
  sessionStats: {
    accuracy: number
    streak: number
    improvement: number
    rating: number
  };
  createdAt: string;
  updatedAt: string;
}

// From: /mnt/c/Projects/chess-training/frontend/src/data/userPuzzleSessions.ts
export interface PuzzleResult {
  puzzleId: string;
  isCorrect: boolean;
  timeSpent: number;
  hintsUsed: number;
  attempts: number;
  rating: number;
  theme: string;
  difficulty: string;
}

// From: /mnt/c/Projects/chess-training/frontend/src/data/userPuzzleStats.ts
export interface PuzzleSession_userPuzzleStats {
  sessionId: string;
  date: string;
  puzzlesSolved: number;
  correctAnswers: number;
  totalTime: number;
  averageRating: number;
  themes: string[];
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/customPuzzles.ts
export interface CustomPuzzle {
  id: string; // Unique identifier for the puzzle
  fen: string; // FEN (Forsyth-Edwards Notation) string representing the puzzle position
  solution: string[]; // Array of moves in algebraic notation that solve the puzzle
  title: string; // User-defined title for the puzzle
  description: string; // User-defined description of the puzzle
  theme: string; // The tactical or strategic theme of the puzzle
  difficulty: CustomPuzzleDifficulty; // Difficulty classification
  rating: number; // Puzzle rating (Elo-style rating)
  moves: number; // Number of moves required to solve the puzzle
  tags: string[]; // Tags for categorization and filtering
  source: PuzzleSource; // Source where this puzzle came from
  author: {
    id: string
    name: string
    rating?: number
  }; // Author/creator information
  createdAt: Date; // Creation timestamp
  updatedAt: Date; // Last modified timestamp
  attemptCount: number; // Number of times this puzzle has been attempted
  successRate: number; // Success rate percentage
  averageTime: number; // Average solving time in seconds
  collectionId?: string; // Collection ID this puzzle belongs to (optional)
  hint1: string; // First hint for the puzzle
  hint2: string; // Second hint for the puzzle (more specific)
  hint3: string; // Third hint for the puzzle (most specific)
  notes?: string; // Comments or notes from the creator
  isFeatured: boolean; // Whether this puzzle is featured/highlighted
  isBookmarked: boolean; // Whether this puzzle is bookmarked by the current user
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/customPuzzles.ts
export interface CustomPuzzleSession {
  currentPuzzleIndex: number; // Index of the currently active puzzle
  boardPosition: string; // Current board position as FEN string
  moveCount: number; // Number of moves made by the user
  hintsUsed: number; // Number of hints the user has requested
  status: CustomPuzzleStatus; // Current puzzle status
  showHint: boolean; // Whether a hint is currently being displayed
  timeElapsed: number; // Time elapsed in seconds since puzzle started
  isTimerActive: boolean; // Whether the puzzle timer is currently running
  userMoves: string[]; // Array of moves made by the user in algebraic notation
  activeTab: CustomPuzzleTabValue; // Currently active tab in the puzzle interface
  currentCollection?: CustomPuzzleCollection; // Current collection being played (optional)
  filters: {
    difficulty?: CustomPuzzleDifficulty[]
    themes?: string[]
    rating?: { min: number; max: number }
    source?: PuzzleSource[]
    tags?: string[]
  }; // Filtering criteria for puzzle selection
  searchQuery: string; // Search query for puzzle filtering
  sortBy: 'rating' | 'difficulty' | 'created' | 'popularity' | 'random'; // Sorting criteria
  sortOrder: 'asc' | 'desc'; // Sort order
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/customPuzzles.ts
export interface CustomPuzzleFilters {
  difficulty?: CustomPuzzleDifficulty[]; // Difficulty levels to include
  themes?: string[]; // Themes to include
  rating?: { min: number; max: number }; // Rating range
  source?: PuzzleSource[]; // Puzzle sources to include
  tags?: string[]; // Tags to include
  collections?: string[]; // Collections to include
  author?: string; // Author filter
  dateRange?: { start: Date; end: Date }; // Date range
  minSuccessRate?: number; // Minimum success rate
  bookmarkedOnly?: boolean; // Only show bookmarked puzzles
  featuredOnly?: boolean; // Only show featured puzzles
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/endgameLibrary.ts
export interface EndgameCategoryInfo {
  name: EndgameCategory; // Category name
  title: string; // Gaming-themed title
  description: string; // Category description
  count: number; // Number of positions in category
  icon: string; // Icon identifier for UI
  color: string; // Gaming theme color
  difficultyRange: {
    min: EndgameDifficulty
    max: EndgameDifficulty
  }; // Difficulty range
  totalStudyTime: number; // Estimated total study time
  isUnlocked: boolean; // Whether category is unlocked
  progress: number; // Category progress percentage
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/endgameLibrary.ts
export interface EndgameLibraryHookReturn {
  categories: EndgameCategoryInfo[];
  positions: EndgamePosition[];
  filteredPositions: EndgamePosition[];
  selectedCategory: EndgameCategory | null;
  selectedPosition: EndgamePosition | null;
  compositions: EndgameComposition[];
  activeTab: StudyMode;
  searchFilter: string;
  sortBy: 'difficulty' | 'rating' | 'study_time' | 'master_games';
  sortOrder: 'asc' | 'desc';
  currentAnalysis: EndgameAnalysis | null;
  isAnalyzing: boolean;
  tablebaseResult: TablebaseQueryResult | null;
  isQuerying: boolean;
  practiceSession: PracticeSession | null;
  studyProgress: Record<string, StudyProgress>;
  isLoading: boolean;
  isLoadingPositions: boolean;
  selectCategory: (category: EndgameCategory) => void;
  selectPosition: (position: EndgamePosition) => void;
  setActiveTab: (tab: StudyMode) => void;
  setSearchFilter: (filter: string) => void;
  setSorting: (by: string, order: 'asc' | 'desc') => void;
  analyzePosition: (position: EndgamePosition) => Promise<void>;
  queryTablebase: (fen: string) => Promise<TablebaseQueryResult>;
  startPracticeSession: (position: EndgamePosition, type: PracticeType) => void;
  endPracticeSession: () => void;
  updateProgress: (positionId: string, progress: Partial<StudyProgress>) => void;
  getPositionsByCategory: (category: EndgameCategory) => EndgamePosition[];
  getUnlockedPositions: () => EndgamePosition[];
  calculateMastery: (positionId: string) => number;
  error: string | null;
  clearError: () => void;
  handleBack: () => void;
  handleTabChange: (tab: StudyMode) => void;
  handleStartPractice: (position: EndgamePosition, type: PracticeType) => void;
  getCategoryProgress: (category: EndgameCategory) => number;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/masterGames.ts
export interface GameFilters {
  searchTerm: string; // Search term (player names, tournament, opening)
  players: string[]; // Filter by specific players
  tournamentTypes: Tournament['type'][]; // Filter by tournament types
  openingCategories: string[]; // Filter by opening categories
  ecoCodes: ECOCode[]; // Filter by ECO codes
  results: GameResult[]; // Filter by game results
  yearRange: {
    min: number
    max: number
  }; // Filter by year range
  ratingRange: {
    min: number
    max: number
  }; // Filter by rating range
  qualityRange: {
    min: number
    max: number
  }; // Filter by game quality
  themes: string[]; // Filter by strategic themes
  bookmarkedOnly: boolean; // Only show bookmarked games
  sortBy: 'date' | 'rating' | 'quality' | 'relevance' | 'name'; // Sort criteria
  sortOrder: 'asc' | 'desc'; // Sort order
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/openingPuzzles.ts
export interface OpeningPuzzle {
  id: number; // Unique identifier for the puzzle
  fen: string; // FEN (Forsyth-Edwards Notation) string representing the puzzle position
  solution: string[]; // Array of moves in algebraic notation that solve the puzzle
  opening: string; // The chess opening name (e.g., "Italian Game")
  eco: string; // ECO (Encyclopedia of Chess Openings) code
  theme: string; // The tactical or strategic theme of the puzzle
  difficulty: PuzzleDifficulty; // Difficulty classification
  rating: number; // Puzzle rating (Elo-style rating)
  moves: number; // Number of moves required to solve the puzzle
  description: string; // Brief description of what the player should accomplish
  theory: string; // Detailed explanation of the opening theory behind the puzzle
  trap: string; // Description of the trap or tactical motif
  hint1: string; // First hint for the puzzle
  hint2: string; // Second hint for the puzzle (more specific)
  hint3: string; // Third hint for the puzzle (most specific)
  prevention: string; // How to defend against this trap/tactic
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/openingPuzzles.ts
export interface PuzzleSession_openingPuzzles {
  currentPuzzleIndex: number; // Index of the currently active puzzle
  boardPosition: string; // Current board position as FEN string
  moveCount: number; // Number of moves made by the user
  hintsUsed: number; // Number of hints the user has requested
  status: PuzzleStatus; // Current puzzle status
  showHint: boolean; // Whether a hint is currently being displayed
  timeElapsed: number; // Time elapsed in seconds since puzzle started
  isTimerActive: boolean; // Whether the puzzle timer is currently running
  userMoves: string[]; // Array of moves made by the user in algebraic notation
  activeTab: TabValue; // Currently active tab in the puzzle interface
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/openingPuzzles.ts
export interface TimerConfig {
  autoStart: boolean; // Whether timer should auto-start
  interval: number; // Timer update interval in milliseconds
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/puzzleSelection.ts
export interface PuzzleCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  route: string;
  difficulty: PuzzleDifficulty[];
  totalPuzzles: number;
  completedPuzzles: number;
  averageRating: number;
  personalBest: number;
  lastPlayed?: Date;
  achievements: string[];
  color: string;
  gradient: string;
}

// Consolidated PuzzleUIConfig
export const PuzzleUIConfig = {
  puzzleSourceMapping: {} as PuzzleSourceMapping,
  tacticalPuzzle: {} as TacticalPuzzle,
  userPuzzlePreferences: {} as UserPuzzlePreferences,
  userPuzzleSelection: {} as UserPuzzleSelection,
  puzzleSelectionEntry: {} as PuzzleSelectionEntry,
  userPuzzleSession: {} as UserPuzzleSession,
  puzzleResult: {} as PuzzleResult,
  puzzleSession: {} as PuzzleSession_userPuzzleStats,
  customPuzzle: {} as CustomPuzzle,
  customPuzzleSession: {} as CustomPuzzleSession,
  customPuzzleFilters: {} as CustomPuzzleFilters,
  endgameCategoryInfo: {} as EndgameCategoryInfo,
  endgameLibraryHookReturn: {} as EndgameLibraryHookReturn,
  gameFilters: {} as GameFilters,
  openingPuzzle: {} as OpeningPuzzle,
  puzzleSession: {} as PuzzleSession_openingPuzzles,
  timerConfig: {} as TimerConfig,
  puzzleCategory: {} as PuzzleCategory,
} as const;

// Type exports
export type PuzzleSourceMappingType = PuzzleSourceMapping;
export type TacticalPuzzleType = TacticalPuzzle;
export type UserPuzzlePreferencesType = UserPuzzlePreferences;
export type UserPuzzleSelectionType = UserPuzzleSelection;
export type PuzzleSelectionEntryType = PuzzleSelectionEntry;
export type UserPuzzleSessionType = UserPuzzleSession;
export type PuzzleResultType = PuzzleResult;
export type PuzzleSession_userPuzzleStatsType = PuzzleSession_userPuzzleStats;
export type CustomPuzzleType = CustomPuzzle;
export type CustomPuzzleSessionType = CustomPuzzleSession;
export type CustomPuzzleFiltersType = CustomPuzzleFilters;
export type EndgameCategoryInfoType = EndgameCategoryInfo;
export type EndgameLibraryHookReturnType = EndgameLibraryHookReturn;
export type GameFiltersType = GameFilters;
export type OpeningPuzzleType = OpeningPuzzle;
export type PuzzleSession_openingPuzzlesType = PuzzleSession_openingPuzzles;
export type TimerConfigType = TimerConfig;
export type PuzzleCategoryType = PuzzleCategory;
