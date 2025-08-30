// Manual definition of core chess training database tables
// Based on actual chess training app requirements

export interface TargetTable {
  name: string;
  description: string;
  columns: TargetColumn[];
  relationships: string[];
  sourceInterfaces: string[]; // Which frontend interfaces map to this table
}

export interface TargetColumn {
  name: string;
  type: string;
  nullable: boolean;
  description: string;
}

export const CHESS_TARGET_SCHEMA: TargetTable[] = [
  {
    name: 'users',
    description: 'Core user accounts and authentication',
    columns: [
      { name: 'id', type: 'UUID', nullable: false, description: 'Primary key' },
      { name: 'username', type: 'VARCHAR(50)', nullable: false, description: 'Unique username' },
      { name: 'email', type: 'VARCHAR(255)', nullable: false, description: 'Email address' },
      { name: 'password_hash', type: 'VARCHAR(255)', nullable: false, description: 'Hashed password' },
      { name: 'chess_elo', type: 'INTEGER', nullable: false, description: 'Chess rating' },
      { name: 'puzzle_rating', type: 'INTEGER', nullable: false, description: 'Puzzle solving rating' },
      { name: 'preferences', type: 'JSONB', nullable: true, description: 'User settings and preferences' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, description: 'Account creation time' },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: false, description: 'Last profile update' },
      { name: 'last_login', type: 'TIMESTAMP', nullable: true, description: 'Last login time' }
    ],
    relationships: ['1:M with games', '1:M with puzzle_attempts', '1:M with user_achievements'],
    sourceInterfaces: [] // To be populated by mapping
  },

  {
    name: 'games',
    description: 'Chess games played by users',
    columns: [
      { name: 'id', type: 'UUID', nullable: false, description: 'Primary key' },
      { name: 'user_id', type: 'UUID', nullable: false, description: 'Player (FK to users)' },
      { name: 'opponent_type', type: 'VARCHAR(20)', nullable: false, description: 'human, ai, analysis' },
      { name: 'opponent_name', type: 'VARCHAR(100)', nullable: true, description: 'AI level or human name' },
      { name: 'time_control', type: 'VARCHAR(20)', nullable: true, description: 'Time control (5+0, 10+5, etc)' },
      { name: 'result', type: 'VARCHAR(10)', nullable: false, description: 'win, loss, draw' },
      { name: 'user_color', type: 'VARCHAR(5)', nullable: false, description: 'white, black' },
      { name: 'pgn', type: 'TEXT', nullable: false, description: 'Full game notation' },
      { name: 'final_fen', type: 'VARCHAR(100)', nullable: false, description: 'Final board position' },
      { name: 'move_count', type: 'INTEGER', nullable: false, description: 'Total moves played' },
      { name: 'duration_seconds', type: 'INTEGER', nullable: true, description: 'Game duration' },
      { name: 'analysis', type: 'JSONB', nullable: true, description: 'Engine analysis results' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, description: 'Game completion time' }
    ],
    relationships: ['M:1 with users'],
    sourceInterfaces: []
  },

  {
    name: 'puzzles',
    description: 'Tactical and training puzzles',
    columns: [
      { name: 'id', type: 'UUID', nullable: false, description: 'Primary key' },
      { name: 'type', type: 'VARCHAR(20)', nullable: false, description: 'tactical, endgame, opening' },
      { name: 'fen', type: 'VARCHAR(100)', nullable: false, description: 'Starting position' },
      { name: 'solution_moves', type: 'TEXT', nullable: false, description: 'Correct move sequence' },
      { name: 'themes', type: 'TEXT', nullable: false, description: 'Comma-separated themes (fork, pin, etc)' },
      { name: 'difficulty', type: 'INTEGER', nullable: false, description: 'Difficulty rating 1-5' },
      { name: 'rating', type: 'INTEGER', nullable: false, description: 'Puzzle rating 800-2400' },
      { name: 'title', type: 'VARCHAR(200)', nullable: true, description: 'Puzzle title/description' },
      { name: 'source', type: 'VARCHAR(100)', nullable: true, description: 'Source (lichess, chess.com, etc)' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, description: 'Puzzle creation time' }
    ],
    relationships: ['1:M with puzzle_attempts'],
    sourceInterfaces: []
  },

  {
    name: 'puzzle_attempts',
    description: 'User attempts at solving puzzles',
    columns: [
      { name: 'id', type: 'UUID', nullable: false, description: 'Primary key' },
      { name: 'user_id', type: 'UUID', nullable: false, description: 'User who attempted (FK to users)' },
      { name: 'puzzle_id', type: 'UUID', nullable: false, description: 'Puzzle attempted (FK to puzzles)' },
      { name: 'solved', type: 'BOOLEAN', nullable: false, description: 'Successfully solved' },
      { name: 'moves_played', type: 'TEXT', nullable: false, description: 'Actual moves made' },
      { name: 'time_taken_seconds', type: 'INTEGER', nullable: false, description: 'Time to complete/fail' },
      { name: 'hints_used', type: 'INTEGER', nullable: false, description: 'Number of hints used' },
      { name: 'rating_change', type: 'INTEGER', nullable: true, description: 'Puzzle rating change' },
      { name: 'attempted_at', type: 'TIMESTAMP', nullable: false, description: 'Attempt timestamp' }
    ],
    relationships: ['M:1 with users', 'M:1 with puzzles'],
    sourceInterfaces: []
  },

  {
    name: 'achievements',
    description: 'Available achievements in the system',
    columns: [
      { name: 'id', type: 'UUID', nullable: false, description: 'Primary key' },
      { name: 'name', type: 'VARCHAR(100)', nullable: false, description: 'Achievement name' },
      { name: 'description', type: 'TEXT', nullable: false, description: 'What the achievement is for' },
      { name: 'category', type: 'VARCHAR(50)', nullable: false, description: 'puzzle, game, streak, etc' },
      { name: 'badge_icon', type: 'VARCHAR(50)', nullable: true, description: 'Icon/badge identifier' },
      { name: 'points', type: 'INTEGER', nullable: false, description: 'Points awarded' },
      { name: 'unlock_condition', type: 'JSONB', nullable: false, description: 'Condition to unlock' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, description: 'Achievement creation time' }
    ],
    relationships: ['1:M with user_achievements'],
    sourceInterfaces: []
  },

  {
    name: 'user_achievements',
    description: 'Achievements earned by users',
    columns: [
      { name: 'id', type: 'UUID', nullable: false, description: 'Primary key' },
      { name: 'user_id', type: 'UUID', nullable: false, description: 'User who earned it (FK to users)' },
      { name: 'achievement_id', type: 'UUID', nullable: false, description: 'Achievement earned (FK to achievements)' },
      { name: 'earned_at', type: 'TIMESTAMP', nullable: false, description: 'When it was earned' },
      { name: 'progress_data', type: 'JSONB', nullable: true, description: 'Progress towards achievement' }
    ],
    relationships: ['M:1 with users', 'M:1 with achievements'],
    sourceInterfaces: []
  },

  {
    name: 'user_sessions',
    description: 'Authentication sessions and refresh tokens',
    columns: [
      { name: 'id', type: 'UUID', nullable: false, description: 'Primary key' },
      { name: 'user_id', type: 'UUID', nullable: false, description: 'Session owner (FK to users)' },
      { name: 'refresh_token_hash', type: 'VARCHAR(255)', nullable: false, description: 'Hashed refresh token' },
      { name: 'expires_at', type: 'TIMESTAMP', nullable: false, description: 'Session expiry' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, description: 'Session creation' },
      { name: 'last_used_at', type: 'TIMESTAMP', nullable: true, description: 'Last token usage' },
      { name: 'user_agent', type: 'TEXT', nullable: true, description: 'Browser/client info' },
      { name: 'ip_address', type: 'VARCHAR(45)', nullable: true, description: 'Client IP address' }
    ],
    relationships: ['M:1 with users'],
    sourceInterfaces: []
  },

  {
    name: 'opening_positions',
    description: 'Chess opening positions and variations',
    columns: [
      { name: 'id', type: 'UUID', nullable: false, description: 'Primary key' },
      { name: 'eco_code', type: 'VARCHAR(10)', nullable: true, description: 'ECO classification (A00-E99)' },
      { name: 'name', type: 'VARCHAR(200)', nullable: false, description: 'Opening name' },
      { name: 'fen', type: 'VARCHAR(100)', nullable: false, description: 'Position FEN' },
      { name: 'moves', type: 'TEXT', nullable: false, description: 'Move sequence to reach position' },
      { name: 'popularity', type: 'INTEGER', nullable: false, description: 'Usage frequency 1-100' },
      { name: 'theory', type: 'TEXT', nullable: true, description: 'Opening theory and ideas' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, description: 'Record creation time' }
    ],
    relationships: [],
    sourceInterfaces: []
  },

  {
    name: 'user_stats',
    description: 'Daily/periodic user statistics and progress',
    columns: [
      { name: 'id', type: 'UUID', nullable: false, description: 'Primary key' },
      { name: 'user_id', type: 'UUID', nullable: false, description: 'User (FK to users)' },
      { name: 'stat_date', type: 'DATE', nullable: false, description: 'Date for these stats' },
      { name: 'puzzles_solved', type: 'INTEGER', nullable: false, description: 'Puzzles solved today' },
      { name: 'puzzles_attempted', type: 'INTEGER', nullable: false, description: 'Total puzzle attempts' },
      { name: 'games_played', type: 'INTEGER', nullable: false, description: 'Games played today' },
      { name: 'time_played_minutes', type: 'INTEGER', nullable: false, description: 'Total time played' },
      { name: 'rating_change', type: 'INTEGER', nullable: false, description: 'Rating change today' },
      { name: 'streak_days', type: 'INTEGER', nullable: false, description: 'Current daily streak' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, description: 'Stats creation time' }
    ],
    relationships: ['M:1 with users'],
    sourceInterfaces: []
  }
];

export const TOTAL_TARGET_TABLES = CHESS_TARGET_SCHEMA.length; // 9 tables total