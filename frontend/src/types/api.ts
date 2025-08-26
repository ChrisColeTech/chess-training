// API Response Types
export interface ApiResponse<T = any> extends T {
  success: boolean;
  error?: string;
}

// User Types
export interface User {
  id: string;
  username: string;
  email: string;
  chess_elo: number;
  puzzle_rating: number;
  preferences: UserPreferences;
  created_at: string;
  updated_at: string;
  gamesPlayed?: number;
  wins?: number;
  losses?: number;
  draws?: number;
  puzzlesSolved?: number;
  puzzleAccuracy?: number;
}

export interface UserPreferences {
  boardTheme?: string;
  soundEnabled?: boolean;
  showCoordinates?: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// Game Types
export interface GameMove {
  from: string;
  to: string;
  promotion?: string;
}

export interface GameState {
  fen: string;
  turn: string;
  check: boolean;
  gameOver: boolean;
  result: string | null;
}

export interface Game {
  id: string;
  aiLevel: number;
  currentFen: string;
  pgn: string;
  result: string | null;
  gameOver: boolean;
}

export interface CreateGameRequest {
  aiLevel: number;
  color: 'white' | 'black' | 'random';
  timeControl?: string;
}

export interface MakeMoveRequest {
  move: GameMove;
}

export interface MakeMoveResponse {
  success: boolean;
  legal: boolean;
  gameState: GameState;
  aiMove?: {
    from: string;
    to: string;
    san: string;
  };
  error?: string;
}

export interface GameHistoryItem {
  id: string;
  result: string;
  aiLevel: number;
  completedAt: string;
  eloChange: number;
}

// Puzzle Types
export interface Puzzle {
  id: string;
  fen: string;
  solutionMoves: string[];
  themes: string[];
  rating: number;
  description: string | null;
}

export interface PuzzleAttempt {
  moves: string[];
  timeTaken: number;
}

export interface PuzzleResult {
  correct: boolean;
  solution?: string[];
  hint?: string;
  ratingChange: number;
  newRating: number;
  feedback?: string;
}

export interface PuzzleStats {
  totalAttempts: number;
  correctAttempts: number;
  accuracy: number;
  avgTimeSeconds: number;
  currentRating: number;
  lastAttempt?: string;
}

// Dashboard Types
export interface DashboardStats {
  chessRating: number;
  puzzleRating: number;
  todayGames: number;
  todayPuzzles: number;
  currentStreak: number;
  recentGames: GameHistoryItem[];
}