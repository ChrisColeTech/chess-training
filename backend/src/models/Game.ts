export interface Game {
  id: string;
  user_id: string;
  ai_level: number;
  user_color: string;
  current_fen: string;
  pgn: string;
  status: 'active' | 'completed';
  result: string | null;
  time_control: string | null;
  started_at: string;
  completed_at: string | null;
}

export interface CreateGameRequest {
  aiLevel: number;
  color: 'white' | 'black' | 'random';
  timeControl?: string;
}

export interface GameMove {
  from: string;
  to: string;
  promotion?: string;
}

export interface MakeMoveRequest {
  move: GameMove;
}

export interface GameState {
  fen: string;
  turn: string;
  check: boolean;
  gameOver: boolean;
  result: string | null;
}

export interface GameResponse {
  id: string;
  aiLevel: number;
  currentFen: string;
  pgn: string;
  result: string | null;
  gameOver: boolean;
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