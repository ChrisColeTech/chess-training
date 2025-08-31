# Chess Training Application - Technical Specifications

**Document Version:** 1.0  
**Date:** August 2025  
**Phase:** POC Implementation  
**Based on:** Research findings and Project Requirements v1.0

## Table of Contents

1. [System Architecture Overview](#system-architecture-overview)
2. [Technology Stack Specifications](#technology-stack-specifications)
3. [Component Specifications](#component-specifications)
4. [Data Models and Schema](#data-models-and-schema)
5. [API Design Specifications](#api-design-specifications)
6. [Security Implementation](#security-implementation)
7. [Performance Optimization](#performance-optimization)
8. [Development Standards](#development-standards)
9. [Testing Strategy](#testing-strategy)
10. [Build and Deployment](#build-and-deployment)

---

## System Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Electron Main Process                   │
├─────────────────────────────────────────────────────────────┤
│  • Application Lifecycle Management                        │
│  • Window Management                                       │
│  • File System Operations                                  │
│  • System Integration (Tray, Notifications)               │
│  • Security Enforcement                                    │
└─────────────────────────────────────────────────────────────┘
                              │
                         IPC Bridge
                              │
┌─────────────────────────────────────────────────────────────┐
│                   Renderer Process (UI)                    │
├─────────────────────────────────────────────────────────────┤
│  ┌───────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │ React Frontend│  │Chess Engine  │  │ Puzzle System   │  │
│  │               │  │ Web Workers  │  │                 │  │
│  │• Authentication│  │              │  │• Spaced Rep.    │  │
│  │• Chess Board  │  │• Stockfish.js│  │• Adaptive Diff. │  │
│  │• Game Logic   │  │• Move Analysis│  │• Progress Track.│  │
│  │• User Profile │  │• Position Eval│  │• Gamification  │  │
│  └───────────────┘  └──────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                         HTTP/WebSocket
                              │
┌─────────────────────────────────────────────────────────────┐
│                    Node.js Backend API                     │
├─────────────────────────────────────────────────────────────┤
│  ┌───────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │ Authentication│  │ Chess Engine │  │ Puzzle Manager  │  │
│  │               │  │              │  │                 │  │
│  │• JWT Tokens   │  │• Game Logic  │  │• Puzzle DB      │  │
│  │• User Session │  │• AI Integration│ │• Progress API   │  │
│  │• Rate Limiting│  │• Move Valid. │  │• Analytics      │  │
│  └───────────────┘  └──────────────┘  └─────────────────┘  │
│                                                            │
│  ┌───────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │    Security   │  │  Data Layer  │  │   Utilities     │  │
│  │               │  │              │  │                 │  │
│  │• Input Valid. │  │• SQLite DB   │  │• Logging        │  │
│  │• CORS         │  │• ORM/Query   │  │• Error Handling │  │
│  │• Helmet       │  │• Migrations  │  │• Monitoring     │  │
│  └───────────────┘  └──────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                         File System
                              │
┌─────────────────────────────────────────────────────────────┐
│                      SQLite Database                       │
├─────────────────────────────────────────────────────────────┤
│  • Users and Authentication                                │
│  • Games and Move History                                  │
│  • Puzzles and Training Data                              │
│  • Rating and Progress Tracking                           │
│  • System Configuration                                   │
└─────────────────────────────────────────────────────────────┘
```

### Process Communication Flow

1. **UI Interaction** → Renderer Process (React)
2. **Secure IPC** → Main Process (validation/authorization) 
3. **HTTP Request** → Backend API (business logic)
4. **Database Query** → SQLite (data persistence)
5. **Response Chain** → Back through layers to UI

---

## Technology Stack Specifications

### Frontend Technology Stack

#### Core Framework
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "typescript": "^5.0.0",
  "@types/react": "^18.2.0",
  "@types/react-dom": "^18.2.0"
}
```

#### Chess-Specific Libraries
```json
{
  "chess.js": "^1.0.0-beta.6",
  "react-chessboard": "^4.3.0",
  "@mliebelt/pgn-parser": "^1.4.6",
  "stockfish": "^15.0.0"
}
```

#### UI Component Library
```json
{
  "@mui/material": "^5.14.0",
  "@mui/icons-material": "^5.14.0",
  "@emotion/react": "^11.11.0",
  "@emotion/styled": "^11.11.0"
}
```

#### State Management and Routing
```json
{
  "zustand": "^4.4.0",
  "react-router-dom": "^6.15.0",
  "@tanstack/react-query": "^4.32.0"
}
```

### Backend Technology Stack

#### Core Framework
```json
{
  "node": ">=18.0.0",
  "express": "^4.18.2",
  "typescript": "^5.0.0",
  "@types/node": "^20.0.0",
  "@types/express": "^4.17.17"
}
```

#### Database and ORM
```json
{
  "sqlite3": "^5.1.6",
  "knex": "^2.5.1",
  "objection": "^3.1.0"
}
```

#### Authentication and Security
```json
{
  "jsonwebtoken": "^9.0.2",
  "bcrypt": "^5.1.1",
  "passport": "^0.6.0",
  "passport-jwt": "^4.0.1",
  "helmet": "^7.0.0",
  "cors": "^2.8.5",
  "express-rate-limit": "^6.10.0",
  "express-validator": "^7.0.1"
}
```

#### Chess Engine Integration
```json
{
  "chess.js": "^1.0.0-beta.6",
  "node-uci": "^1.3.0"
}
```

### Desktop (Electron) Technology Stack

#### Electron Framework
```json
{
  "electron": "^28.0.0",
  "electron-builder": "^24.6.3",
  "electron-updater": "^6.1.4"
}
```

#### Development Tools
```json
{
  "electron-vite": "^2.0.0",
  "@vitejs/plugin-react": "^4.2.1",
  "vite": "^5.0.12"
}
```

### Development and Testing

#### Testing Framework
```json
{
  "jest": "^29.6.2",
  "@testing-library/react": "^13.4.0",
  "@testing-library/jest-dom": "^5.17.0",
  "playwright": "^1.37.0",
  "supertest": "^6.3.3"
}
```

#### Code Quality
```json
{
  "eslint": "^8.47.0",
  "@typescript-eslint/parser": "^6.4.0",
  "prettier": "^3.0.2",
  "husky": "^8.0.3",
  "lint-staged": "^14.0.1"
}
```

---

## Component Specifications

### 1. Frontend Components

#### 1.1 ChessBoard Component
```typescript
interface ChessBoardProps {
  position: string;              // FEN string
  orientation: 'white' | 'black';
  onMove: (move: Move) => boolean;
  highlightSquares?: string[];
  showCoordinates?: boolean;
  theme: BoardTheme;
  pieceSet: PieceSet;
  disabled?: boolean;
}

class ChessBoardComponent extends React.Component<ChessBoardProps> {
  // Handles drag-and-drop moves
  // Validates moves through chess.js
  // Displays legal move highlights
  // Manages board animations
}
```

#### 1.2 Authentication Components
```typescript
// Login Form Component
interface LoginFormProps {
  onLoginSuccess: (user: User) => void;
  onLoginError: (error: string) => void;
}

// Registration Form Component  
interface RegistrationFormProps {
  onRegistrationSuccess: (user: User) => void;
  onValidationError: (errors: ValidationError[]) => void;
}

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  redirectTo?: string;
}
```

#### 1.3 Puzzle Training Components
```typescript
interface PuzzleComponentProps {
  puzzle: Puzzle;
  onSolved: (solution: PuzzleSolution) => void;
  onHintRequested: () => void;
  timeLimit?: number;
  showTimer: boolean;
}

interface HintSystemProps {
  puzzle: Puzzle;
  currentPosition: string;
  hintsUsed: number;
  maxHints: number;
}
```

### 2. Backend Services

#### 2.1 Authentication Service
```typescript
class AuthenticationService {
  async register(userData: CreateUserRequest): Promise<User>;
  async login(credentials: LoginRequest): Promise<AuthResponse>;
  async refreshToken(refreshToken: string): Promise<AuthResponse>;
  async logout(userId: string): Promise<void>;
  async resetPassword(email: string): Promise<void>;
  async validateToken(token: string): Promise<User>;
}
```

#### 2.2 Chess Game Service
```typescript
class ChessGameService {
  async createGame(config: GameConfig): Promise<Game>;
  async makeMove(gameId: string, move: Move): Promise<MoveResult>;
  async getGameState(gameId: string): Promise<GameState>;
  async saveGame(game: Game): Promise<void>;
  async analyzePosition(fen: string, depth: number): Promise<Analysis>;
  async getGameHistory(userId: string): Promise<Game[]>;
}
```

#### 2.3 Puzzle Management Service
```typescript
class PuzzleService {
  async getPuzzleForUser(userId: string): Promise<Puzzle>;
  async submitPuzzleSolution(attempt: PuzzleAttempt): Promise<PuzzleResult>;
  async updateUserRating(userId: string, performance: number): Promise<void>;
  async getTrainingStats(userId: string): Promise<TrainingStats>;
  async scheduleReview(userId: string, puzzleId: string): Promise<void>;
}
```

### 3. Database Layer

#### 3.1 Repository Pattern Implementation
```typescript
abstract class BaseRepository<T> {
  protected tableName: string;
  protected db: Knex;

  async findById(id: string): Promise<T | null>;
  async create(entity: Partial<T>): Promise<T>;
  async update(id: string, updates: Partial<T>): Promise<T>;
  async delete(id: string): Promise<boolean>;
  async findMany(criteria: QueryCriteria): Promise<T[]>;
}

class UserRepository extends BaseRepository<User> {
  async findByEmail(email: string): Promise<User | null>;
  async updateLastLogin(userId: string): Promise<void>;
  async incrementGamesPlayed(userId: string): Promise<void>;
}
```

---

## Data Models and Schema

### 1. User Management Schema

```sql
-- Users table with authentication data
CREATE TABLE users (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME,
    
    -- Chess-specific fields
    current_elo INTEGER DEFAULT 1200,
    puzzle_rating INTEGER DEFAULT 1200,
    games_played INTEGER DEFAULT 0,
    wins INTEGER DEFAULT 0,
    losses INTEGER DEFAULT 0,
    draws INTEGER DEFAULT 0,
    
    -- User preferences
    board_theme TEXT DEFAULT 'classic',
    piece_set TEXT DEFAULT 'cburnett',
    sound_enabled BOOLEAN DEFAULT TRUE,
    show_coordinates BOOLEAN DEFAULT TRUE
);

-- User sessions for token management
CREATE TABLE user_sessions (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    user_id TEXT NOT NULL,
    refresh_token TEXT UNIQUE NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_used DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Rate limiting for security
CREATE TABLE rate_limits (
    id TEXT PRIMARY KEY,
    identifier TEXT NOT NULL, -- IP address or user ID
    action TEXT NOT NULL,     -- 'login', 'api_call', etc.
    count INTEGER DEFAULT 1,
    reset_time DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(identifier, action)
);
```

### 2. Chess Game Schema

```sql
-- Games table with complete game data
CREATE TABLE games (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    white_player_id TEXT,
    black_player_id TEXT,
    ai_opponent BOOLEAN DEFAULT FALSE,
    ai_level INTEGER, -- 1-5 difficulty level
    
    -- Game state
    initial_fen TEXT DEFAULT 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    final_fen TEXT,
    pgn TEXT NOT NULL,
    result TEXT CHECK (result IN ('1-0', '0-1', '1/2-1/2', '*')),
    termination TEXT, -- 'checkmate', 'resignation', 'timeout', 'draw'
    
    -- Timing
    time_control TEXT, -- '10+0', '5+3', etc.
    duration_seconds INTEGER,
    move_count INTEGER,
    
    -- Chess metadata
    opening_eco TEXT, -- A00-E99 ECO code
    opening_name TEXT,
    white_elo_before INTEGER,
    black_elo_before INTEGER,
    white_elo_after INTEGER,
    black_elo_after INTEGER,
    
    -- Timestamps
    started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME,
    
    FOREIGN KEY (white_player_id) REFERENCES users(id),
    FOREIGN KEY (black_player_id) REFERENCES users(id)
);

-- Move-by-move game analysis
CREATE TABLE game_moves (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    game_id TEXT NOT NULL,
    move_number INTEGER NOT NULL,
    player_color TEXT CHECK (player_color IN ('white', 'black')),
    move_san TEXT NOT NULL, -- Standard Algebraic Notation
    move_uci TEXT NOT NULL, -- Universal Chess Interface format
    fen_after TEXT NOT NULL,
    time_spent INTEGER, -- milliseconds
    evaluation INTEGER, -- centipawns from engine
    classification TEXT, -- 'book', 'good', 'inaccuracy', 'mistake', 'blunder'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE
);
```

### 3. Puzzle System Schema

```sql
-- Puzzle database with metadata
CREATE TABLE puzzles (
    id TEXT PRIMARY KEY, -- Lichess-style puzzle ID
    fen TEXT NOT NULL, -- Position before the key move
    moves TEXT NOT NULL, -- Solution moves in UCI format
    rating INTEGER, -- Glicko-2 difficulty rating
    rating_deviation INTEGER DEFAULT 350,
    popularity INTEGER DEFAULT 0, -- -100 to 100
    nb_plays INTEGER DEFAULT 0,
    themes TEXT, -- Comma-separated: 'fork,pin,attack'
    game_url TEXT, -- Source game URL
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- User puzzle attempts and performance
CREATE TABLE puzzle_attempts (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    user_id TEXT NOT NULL,
    puzzle_id TEXT NOT NULL,
    solved BOOLEAN NOT NULL,
    time_taken INTEGER NOT NULL, -- milliseconds
    hints_used INTEGER DEFAULT 0,
    attempts INTEGER DEFAULT 1,
    attempted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (puzzle_id) REFERENCES puzzles(id)
);

-- Spaced repetition scheduling (SM-2 algorithm)
CREATE TABLE puzzle_schedule (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    user_id TEXT NOT NULL,
    puzzle_id TEXT NOT NULL,
    next_review DATETIME NOT NULL,
    interval_days REAL DEFAULT 1.0,
    ease_factor REAL DEFAULT 2.5,
    consecutive_correct INTEGER DEFAULT 0,
    last_performance INTEGER, -- 1-5 scale
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (puzzle_id) REFERENCES puzzles(id),
    UNIQUE(user_id, puzzle_id)
);

-- User achievements and gamification
CREATE TABLE user_achievements (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    user_id TEXT NOT NULL,
    achievement_type TEXT NOT NULL,
    achievement_name TEXT NOT NULL,
    description TEXT,
    progress INTEGER DEFAULT 0,
    target INTEGER NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    completed_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 4. TypeScript Data Models

```typescript
// User models
interface User {
  id: string;
  username: string;
  email: string;
  emailVerified: boolean;
  currentElo: number;
  puzzleRating: number;
  gamesPlayed: number;
  wins: number;
  losses: number;
  draws: number;
  boardTheme: BoardTheme;
  pieceSet: PieceSet;
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
}

interface UserPreferences {
  soundEnabled: boolean;
  showCoordinates: boolean;
  autoPromoteQueen: boolean;
  confirmMoves: boolean;
  highlightLegalMoves: boolean;
}

// Game models
interface Game {
  id: string;
  whitePlayerId?: string;
  blackPlayerId?: string;
  aiOpponent: boolean;
  aiLevel?: number;
  initialFen: string;
  finalFen?: string;
  pgn: string;
  result: GameResult;
  termination: GameTermination;
  timeControl: string;
  durationSeconds?: number;
  moveCount: number;
  openingEco?: string;
  openingName?: string;
  whiteEloBefore?: number;
  blackEloBefore?: number;
  whiteEloAfter?: number;
  blackEloAfter?: number;
  startedAt: Date;
  completedAt?: Date;
}

type GameResult = '1-0' | '0-1' | '1/2-1/2' | '*';
type GameTermination = 'checkmate' | 'resignation' | 'timeout' | 'draw' | 'stalemate';

// Puzzle models
interface Puzzle {
  id: string;
  fen: string;
  moves: string[];
  rating: number;
  ratingDeviation: number;
  popularity: number;
  nbPlays: number;
  themes: string[];
  gameUrl?: string;
  createdAt: Date;
}

interface PuzzleAttempt {
  id: string;
  userId: string;
  puzzleId: string;
  solved: boolean;
  timeTaken: number;
  hintsUsed: number;
  attempts: number;
  attemptedAt: Date;
}

interface PuzzleSchedule {
  id: string;
  userId: string;
  puzzleId: string;
  nextReview: Date;
  intervalDays: number;
  easeFactor: number;
  consecutiveCorrect: number;
  lastPerformance?: number;
}
```

---

## API Design Specifications

### 1. Authentication Endpoints

```typescript
// POST /api/auth/register
interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterResponse {
  success: boolean;
  message: string;
  user?: Partial<User>;
}

// POST /api/auth/login
interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface LoginResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: User;
  expiresIn: number;
}

// POST /api/auth/refresh
interface RefreshTokenRequest {
  refreshToken: string;
}

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
```

### 2. Chess Game Endpoints

```typescript
// POST /api/games/create
interface CreateGameRequest {
  opponent: 'ai' | 'human';
  aiLevel?: number; // 1-5
  timeControl: string; // '10+0', '5+3', etc.
  color?: 'white' | 'black' | 'random';
}

interface CreateGameResponse {
  success: boolean;
  game: Game;
  gameId: string;
}

// POST /api/games/:gameId/moves
interface MakeMoveRequest {
  move: {
    from: string;
    to: string;
    promotion?: string;
  };
  timeSpent: number;
}

interface MakeMoveResponse {
  success: boolean;
  legal: boolean;
  gameState: {
    fen: string;
    pgn: string;
    isGameOver: boolean;
    result?: GameResult;
    check: boolean;
    checkmate: boolean;
    stalemate: boolean;
  };
  aiMove?: {
    move: Move;
    timeTaken: number;
    evaluation: number;
  };
}

// GET /api/games/:gameId
interface GetGameResponse {
  success: boolean;
  game: Game;
  moves: GameMove[];
  analysis?: GameAnalysis;
}
```

### 3. Puzzle Training Endpoints

```typescript
// GET /api/puzzles/next
interface GetNextPuzzleRequest {
  themes?: string[]; // Filter by tactical themes
  difficulty?: 'adaptive' | number; // Adaptive or specific rating
}

interface GetNextPuzzleResponse {
  success: boolean;
  puzzle: {
    id: string;
    fen: string;
    themes: string[];
    rating: number;
    popularity: number;
  };
  userStats: {
    currentRating: number;
    streakCount: number;
    todaysSolved: number;
  };
}

// POST /api/puzzles/:puzzleId/attempt
interface PuzzleAttemptRequest {
  moves: string[]; // UCI format moves
  timeTaken: number;
  hintsUsed: number;
  gaveUp?: boolean;
}

interface PuzzleAttemptResponse {
  success: boolean;
  correct: boolean;
  solution: string[];
  explanation: string;
  ratingChange: number;
  newRating: number;
  nextReview?: Date; // For spaced repetition
}

// GET /api/puzzles/stats
interface PuzzleStatsResponse {
  success: boolean;
  stats: {
    rating: number;
    solved: number;
    accuracy: number;
    averageTime: number;
    currentStreak: number;
    longestStreak: number;
    byTheme: Array<{
      theme: string;
      solved: number;
      accuracy: number;
      averageRating: number;
    }>;
    recentPerformance: Array<{
      date: string;
      solved: number;
      accuracy: number;
    }>;
  };
}
```

### 4. User Profile Endpoints

```typescript
// GET /api/user/profile
interface GetProfileResponse {
  success: boolean;
  user: User;
  stats: {
    gameStats: {
      rating: number;
      gamesPlayed: number;
      wins: number;
      losses: number;
      draws: number;
    };
    puzzleStats: {
      rating: number;
      solved: number;
      accuracy: number;
    };
    achievements: UserAchievement[];
  };
}

// PUT /api/user/profile
interface UpdateProfileRequest {
  username?: string;
  preferences?: Partial<UserPreferences>;
  boardTheme?: BoardTheme;
  pieceSet?: PieceSet;
}

interface UpdateProfileResponse {
  success: boolean;
  user: User;
}
```

### 5. Error Response Format

```typescript
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
    stack?: string; // Only in development
  };
  timestamp: string;
  requestId: string;
}

// Standard error codes
enum ErrorCodes {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED',
  AUTHORIZATION_FAILED = 'AUTHORIZATION_FAILED',
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  GAME_STATE_INVALID = 'GAME_STATE_INVALID',
  ILLEGAL_MOVE = 'ILLEGAL_MOVE',
  PUZZLE_ALREADY_SOLVED = 'PUZZLE_ALREADY_SOLVED'
}
```

---

## Security Implementation

### 1. Authentication Security

#### JWT Token Configuration
```typescript
const jwtConfig = {
  accessToken: {
    secret: process.env.JWT_ACCESS_SECRET,
    expiresIn: '15m',
    algorithm: 'HS256' as Algorithm,
    issuer: 'chess-training-app',
    audience: 'chess-users'
  },
  refreshToken: {
    secret: process.env.JWT_REFRESH_SECRET,
    expiresIn: '7d',
    algorithm: 'HS256' as Algorithm
  }
};
```

#### Password Security
```typescript
class PasswordService {
  private readonly WORK_FACTOR = 12;
  private readonly MIN_LENGTH = 8;
  
  async hashPassword(password: string): Promise<string> {
    this.validatePasswordStrength(password);
    return bcrypt.hash(password, this.WORK_FACTOR);
  }
  
  private validatePasswordStrength(password: string): void {
    const requirements = [
      { regex: /.{8,}/, message: 'At least 8 characters' },
      { regex: /[a-z]/, message: 'At least one lowercase letter' },
      { regex: /[A-Z]/, message: 'At least one uppercase letter' },
      { regex: /\d/, message: 'At least one number' },
      { regex: /[!@#$%^&*]/, message: 'At least one special character' }
    ];
    
    const failures = requirements.filter(req => !req.regex.test(password));
    if (failures.length > 0) {
      throw new ValidationError('Password does not meet requirements', failures);
    }
  }
}
```

### 2. Input Validation and Sanitization

```typescript
// Express validator middleware
const registerValidation = [
  body('username')
    .isLength({ min: 3, max: 30 })
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username must contain only letters, numbers, and underscores')
    .custom(async (username) => {
      const user = await userRepository.findByUsername(username);
      if (user) throw new Error('Username already exists');
    }),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .custom(async (email) => {
      const user = await userRepository.findByEmail(email);
      if (user) throw new Error('Email already registered');
    }),
  
  body('password')
    .isLength({ min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must meet complexity requirements'),
  
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match');
      }
      return true;
    })
];

// Chess move validation
const moveValidation = [
  param('gameId').isUUID().withMessage('Invalid game ID'),
  body('move.from').matches(/^[a-h][1-8]$/).withMessage('Invalid from square'),
  body('move.to').matches(/^[a-h][1-8]$/).withMessage('Invalid to square'),
  body('move.promotion').optional().matches(/^[qrbn]$/).withMessage('Invalid promotion piece'),
  body('timeSpent').isInt({ min: 0 }).withMessage('Invalid time spent')
];
```

### 3. Rate Limiting Configuration

```typescript
const rateLimitConfig = {
  authentication: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 attempts per window
    message: 'Too many login attempts, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
    store: new SQLiteStore(database, 'rate_limits')
  }),
  
  api: rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, // 100 requests per window
    message: 'Too many requests from this IP',
    standardHeaders: true
  }),
  
  puzzles: rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 20, // 20 puzzle attempts per minute
    message: 'Too many puzzle attempts, please slow down'
  })
};
```

### 4. CORS and Security Headers

```typescript
// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:5173', // Vite dev server
      'http://localhost:3000'  // Alternative dev server
    ];
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token']
};

// Security headers with Helmet
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com'],
      fontSrc: ["'self'", 'fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:', 'https:'],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'", 'ws://localhost:*']
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
```

---

## Performance Optimization

### 1. Database Optimization

#### Index Strategy
```sql
-- Critical performance indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_user_sessions_token ON user_sessions(refresh_token);
CREATE INDEX idx_user_sessions_user_expires ON user_sessions(user_id, expires_at);

CREATE INDEX idx_games_players ON games(white_player_id, black_player_id);
CREATE INDEX idx_games_completed ON games(completed_at DESC);
CREATE INDEX idx_game_moves_game ON game_moves(game_id, move_number);

CREATE INDEX idx_puzzles_rating ON puzzles(rating);
CREATE INDEX idx_puzzles_themes ON puzzles(themes);
CREATE INDEX idx_puzzle_attempts_user ON puzzle_attempts(user_id, attempted_at DESC);
CREATE INDEX idx_puzzle_schedule_review ON puzzle_schedule(user_id, next_review);

-- Composite indexes for common queries
CREATE INDEX idx_puzzles_rating_themes ON puzzles(rating, themes);
CREATE INDEX idx_games_player_result ON games(white_player_id, result, completed_at);
```

#### Query Optimization
```typescript
class OptimizedPuzzleService {
  async getPuzzleForUser(userId: string): Promise<Puzzle> {
    // Use indexed query with LIMIT for performance
    const query = `
      SELECT p.* FROM puzzles p
      LEFT JOIN puzzle_attempts pa ON p.id = pa.puzzle_id AND pa.user_id = ?
      LEFT JOIN puzzle_schedule ps ON p.id = ps.puzzle_id AND ps.user_id = ?
      WHERE pa.id IS NULL OR ps.next_review <= datetime('now')
      AND p.rating BETWEEN ? AND ?
      ORDER BY 
        CASE WHEN ps.next_review IS NOT NULL THEN 0 ELSE 1 END,
        ps.next_review ASC,
        RANDOM()
      LIMIT 1
    `;
    
    const userRating = await this.getUserPuzzleRating(userId);
    const ratingRange = 200;
    
    return this.db.get(query, [
      userId, 
      userId, 
      userRating - ratingRange, 
      userRating + ratingRange
    ]);
  }
}
```

### 2. Frontend Performance

#### Chess Engine Web Worker
```typescript
// chess-engine-worker.ts
class ChessEngineWorker {
  private stockfish: Worker;
  private analysisCache = new Map<string, EngineAnalysis>();
  private readonly CACHE_SIZE = 1000;
  
  constructor() {
    this.stockfish = new Worker('/stockfish.js');
    this.stockfish.onmessage = this.handleEngineMessage.bind(this);
  }
  
  async analyzePosition(fen: string, depth: number = 15): Promise<EngineAnalysis> {
    const cacheKey = `${fen}:${depth}`;
    
    // Check cache first
    if (this.analysisCache.has(cacheKey)) {
      return this.analysisCache.get(cacheKey)!;
    }
    
    // Perform analysis
    const analysis = await this.performAnalysis(fen, depth);
    
    // Cache with LRU eviction
    if (this.analysisCache.size >= this.CACHE_SIZE) {
      const firstKey = this.analysisCache.keys().next().value;
      this.analysisCache.delete(firstKey);
    }
    
    this.analysisCache.set(cacheKey, analysis);
    return analysis;
  }
}
```

#### React Performance Optimization
```typescript
// Memoized chess board component
const ChessBoardComponent = memo(({ position, onMove, ...props }: ChessBoardProps) => {
  const [highlightSquares, setHighlightSquares] = useState<string[]>([]);
  const [legalMoves, setLegalMoves] = useState<string[]>([]);
  
  // Memoize expensive calculations
  const boardCalculations = useMemo(() => ({
    legalMoves: calculateLegalMoves(position),
    inCheck: isInCheck(position),
    gameOver: isGameOver(position)
  }), [position]);
  
  // Debounced move validation
  const debouncedMoveValidation = useMemo(
    () => debounce((move: Move) => {
      const isLegal = validateMove(position, move);
      if (isLegal) onMove(move);
    }, 50),
    [position, onMove]
  );
  
  return (
    <Chessboard
      position={position}
      onPieceDrop={debouncedMoveValidation}
      customSquareStyles={getSquareStyles(highlightSquares)}
      {...props}
    />
  );
});

// Efficient puzzle preloading
class PuzzlePreloader {
  private preloadBuffer = new Map<string, Puzzle>();
  private readonly BUFFER_SIZE = 10;
  
  async preloadPuzzlesForUser(userId: string): Promise<void> {
    const nextPuzzles = await this.predictNextPuzzles(userId, this.BUFFER_SIZE);
    
    // Preload puzzle data and chess positions
    const preloadPromises = nextPuzzles.map(async (puzzle) => ({
      ...puzzle,
      chessInstance: new Chess(puzzle.fen),
      legalMoves: this.calculateLegalMoves(puzzle.fen),
      hints: await this.generateHints(puzzle)
    }));
    
    const preloadedPuzzles = await Promise.all(preloadPromises);
    preloadedPuzzles.forEach(puzzle => {
      this.preloadBuffer.set(puzzle.id, puzzle);
    });
  }
}
```

### 3. Caching Strategy

```typescript
// Multi-level caching system
class CacheManager {
  private memoryCache = new Map<string, any>();
  private diskCache: LocalStorage;
  private readonly TTL = 5 * 60 * 1000; // 5 minutes
  
  async get<T>(key: string): Promise<T | null> {
    // Level 1: Memory cache
    const memoryResult = this.memoryCache.get(key);
    if (memoryResult && !this.isExpired(memoryResult)) {
      return memoryResult.data;
    }
    
    // Level 2: Disk cache (IndexedDB)
    const diskResult = await this.diskCache.get(key);
    if (diskResult && !this.isExpired(diskResult)) {
      // Promote to memory cache
      this.memoryCache.set(key, diskResult);
      return diskResult.data;
    }
    
    return null;
  }
  
  async set<T>(key: string, data: T, ttl?: number): Promise<void> {
    const entry = {
      data,
      expires: Date.now() + (ttl || this.TTL)
    };
    
    // Store in both caches
    this.memoryCache.set(key, entry);
    await this.diskCache.set(key, entry);
  }
}
```

---

## Development Standards

### 1. Code Structure and Organization

```
src/
├── components/          # Reusable React components
│   ├── common/         # Generic UI components
│   ├── chess/          # Chess-specific components
│   └── auth/           # Authentication components
├── hooks/              # Custom React hooks
├── services/           # Business logic and API calls
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── constants/          # Application constants
├── assets/             # Static assets
└── tests/              # Test files
```

### 2. TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["DOM", "DOM.Iterable", "ES6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": "src",
    "paths": {
      "@components/*": ["components/*"],
      "@services/*": ["services/*"],
      "@utils/*": ["utils/*"],
      "@types/*": ["types/*"],
      "@hooks/*": ["hooks/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

### 3. ESLint Configuration

```json
{
  "extends": [
    "@typescript-eslint/recommended",
    "react-app",
    "react-app/jest",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "react-hooks/exhaustive-deps": "warn",
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

### 4. Testing Standards

```typescript
// Example component test
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChessBoardComponent } from '@components/chess/ChessBoard';

describe('ChessBoardComponent', () => {
  it('should handle valid moves correctly', async () => {
    const mockOnMove = jest.fn();
    const initialPosition = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    
    render(
      <ChessBoardComponent
        position={initialPosition}
        onMove={mockOnMove}
        orientation="white"
      />
    );
    
    // Simulate piece move
    const pawnSquare = screen.getByTestId('square-e2');
    const targetSquare = screen.getByTestId('square-e4');
    
    fireEvent.dragStart(pawnSquare);
    fireEvent.drop(targetSquare);
    
    await waitFor(() => {
      expect(mockOnMove).toHaveBeenCalledWith({
        from: 'e2',
        to: 'e4',
        san: 'e4'
      });
    });
  });
});

// Example service test
describe('PuzzleService', () => {
  let puzzleService: PuzzleService;
  let mockDb: jest.Mocked<Database>;
  
  beforeEach(() => {
    mockDb = createMockDatabase();
    puzzleService = new PuzzleService(mockDb);
  });
  
  it('should return appropriate puzzle for user rating', async () => {
    const userId = 'test-user-id';
    const userRating = 1200;
    
    mockDb.get.mockResolvedValueOnce({
      id: 'puzzle-123',
      fen: 'test-fen',
      rating: 1180,
      themes: ['fork', 'pin']
    });
    
    const puzzle = await puzzleService.getPuzzleForUser(userId);
    
    expect(puzzle).toBeDefined();
    expect(Math.abs(puzzle.rating - userRating)).toBeLessThan(200);
  });
});
```

---

## Build and Deployment

### 1. Development Environment

```json
// package.json scripts
{
  "scripts": {
    "dev": "electron-vite dev",
    "build": "electron-vite build",
    "preview": "electron-vite preview",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:e2e": "playwright test",
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "typecheck": "tsc --noEmit",
    "pack": "electron-builder",
    "dist": "electron-vite build && electron-builder"
  }
}
```

### 2. Electron Builder Configuration

```json
// electron-builder configuration
{
  "build": {
    "appId": "com.chess-training.app",
    "productName": "Chess Training",
    "directories": {
      "output": "dist"
    },
    "files": [
      "dist-electron/**/*",
      "dist/**/*",
      "node_modules/**/*"
    ],
    "mac": {
      "category": "public.app-category.games",
      "target": [
        {
          "target": "dmg",
          "arch": ["x64", "arm64"]
        }
      ]
    },
    "win": {
      "target": "nsis",
      "arch": ["x64"]
    },
    "linux": {
      "target": [
        "AppImage",
        "deb"
      ],
      "category": "Game"
    },
    "publish": {
      "provider": "github",
      "owner": "chess-training",
      "repo": "chess-training-app"
    }
  }
}
```

### 3. CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/build.yml
name: Build and Test

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Type check
        run: npm run typecheck
      
      - name: Lint
        run: npm run lint

  build:
    needs: test
    strategy:
      matrix:
        os: [macos-latest, ubuntu-latest, windows-latest]
    runs-on: ${{ matrix.os }}
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build application
        run: npm run dist
      
      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: chess-training-${{ matrix.os }}
          path: dist/
```

### 4. Environment Configuration

```typescript
// config/environment.ts
interface EnvironmentConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  API_BASE_URL: string;
  DATABASE_URL: string;
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
  STOCKFISH_PATH: string;
  LOG_LEVEL: 'error' | 'warn' | 'info' | 'debug';
}

export const config: EnvironmentConfig = {
  NODE_ENV: (process.env.NODE_ENV as any) || 'development',
  API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000/api',
  DATABASE_URL: process.env.DATABASE_URL || './chess-training.db',
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'development-secret-key',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'development-refresh-key',
  STOCKFISH_PATH: process.env.STOCKFISH_PATH || './assets/stockfish.js',
  LOG_LEVEL: (process.env.LOG_LEVEL as any) || 'info'
};
```

---

**Technical Specifications Status:** ✅ Complete  
**Implementation Ready:** ✅ All technical details defined  
**Next Phase:** API Documentation and Database Schema details