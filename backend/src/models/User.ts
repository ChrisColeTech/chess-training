export interface User {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  chess_elo: number;
  puzzle_rating: number;
  preferences: string; // JSON string
  created_at: string;
  updated_at: string;
}

export interface UserPublic {
  id: string;
  username: string;
  email: string;
  chess_elo: number;
  puzzle_rating: number;
  preferences: any; // Parsed JSON
  created_at: string;
  updated_at: string;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserStats {
  gamesPlayed: number;
  wins: number;
  losses: number;
  draws: number;
  puzzlesSolved: number;
  currentStreak: number;
}