export interface Puzzle {
  id: string;
  fen: string;
  solution_moves: string; // JSON array of moves
  themes: string; // JSON array of theme strings
  rating: number;
  description: string | null;
  created_at: string;
}

export interface PuzzleAttempt {
  id: string;
  user_id: string;
  puzzle_id: string;
  moves: string; // JSON array of moves
  correct: boolean;
  time_taken: number;
  hints_used: number;
  rating_change: number;
  attempted_at: string;
}

export interface PuzzleResponse {
  id: string;
  fen: string;
  solutionMoves: string[];
  themes: string[];
  rating: number;
  description: string | null;
}

export interface SolvePuzzleRequest {
  moves: string[];
  timeTaken: number;
}

export interface SolvePuzzleResponse {
  correct: boolean;
  solution?: string[];
  hint?: string;
  ratingChange: number;
  newRating: number;
  feedback?: string;
}

export interface HintRequest {
  // No additional data needed
}

export interface HintResponse {
  hint: string;
  hintsUsed: number;
}