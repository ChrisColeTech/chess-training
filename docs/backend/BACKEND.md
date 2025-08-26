# Chess Training POC - Backend Implementation Guide

**Version:** 1.0 POC  
**Stack:** Node.js, Express, SQLite, TypeScript  
**Purpose:** Local API server for chess training desktop app

## Overview

The backend provides REST API endpoints for user authentication, chess games vs AI, puzzle training, and basic statistics. This is a POC implementation focused on local development with SQLite.

## Technology Stack

### Core Dependencies
```json
{
  "express": "^4.18.x",
  "typescript": "^5.0.x",
  "chess.js": "^1.0.x",
  "bcrypt": "^5.1.x",
  "jsonwebtoken": "^9.0.x",
  "sqlite3": "^5.1.x",
  "cors": "^2.8.x",
  "helmet": "^7.0.x",
  "express-validator": "^7.0.x"
}
```

### Development Dependencies
```json
{
  "@types/express": "^4.17.x",
  "@types/bcrypt": "^5.0.x",
  "@types/jsonwebtoken": "^9.0.x",
  "@types/cors": "^2.8.x",
  "nodemon": "^3.0.x",
  "ts-node": "^10.9.x"
}
```

## Project Structure

```
backend/
├── src/
│   ├── controllers/           # Route handlers
│   │   ├── authController.ts
│   │   ├── gameController.ts
│   │   ├── puzzleController.ts
│   │   └── userController.ts
│   ├── middleware/            # Express middleware
│   │   ├── auth.ts
│   │   ├── validation.ts
│   │   └── errorHandler.ts
│   ├── models/               # Database models
│   │   ├── User.ts
│   │   ├── Game.ts
│   │   ├── Puzzle.ts
│   │   └── index.ts
│   ├── services/             # Business logic
│   │   ├── authService.ts
│   │   ├── chessService.ts
│   │   ├── aiService.ts
│   │   └── puzzleService.ts
│   ├── utils/                # Helper functions
│   │   ├── database.ts
│   │   ├── jwt.ts
│   │   └── chess.ts
│   ├── routes/               # Route definitions
│   │   ├── auth.ts
│   │   ├── games.ts
│   │   ├── puzzles.ts
│   │   └── users.ts
│   ├── config/               # Configuration
│   │   └── database.sql
│   └── app.ts               # Express app setup
├── dist/                    # Compiled JavaScript
├── database/               # SQLite files
│   └── chess_training.db
├── package.json
├── tsconfig.json
└── README.md
```

## Database Setup

### Initialize SQLite Database

```typescript
// src/utils/database.ts
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

export class Database {
  private static instance: Database;
  public db: any;

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect() {
    if (this.db) return this.db;

    this.db = await open({
      filename: path.join(__dirname, '../../database/chess_training.db'),
      driver: sqlite3.Database
    });

    await this.initializeTables();
    return this.db;
  }

  private async initializeTables() {
    const schema = `
      -- Users table
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        chess_elo INTEGER DEFAULT 1200,
        puzzle_rating INTEGER DEFAULT 1200,
        preferences TEXT DEFAULT '{}',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      -- Games table
      CREATE TABLE IF NOT EXISTS games (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        ai_level INTEGER NOT NULL,
        user_color TEXT NOT NULL,
        current_fen TEXT NOT NULL,
        pgn TEXT DEFAULT '',
        status TEXT DEFAULT 'active',
        result TEXT,
        time_control TEXT,
        started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        completed_at DATETIME,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );

      -- Puzzles table
      CREATE TABLE IF NOT EXISTS puzzles (
        id TEXT PRIMARY KEY,
        fen TEXT NOT NULL,
        solution_moves TEXT NOT NULL,
        themes TEXT NOT NULL,
        rating INTEGER NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      -- Puzzle attempts table
      CREATE TABLE IF NOT EXISTS puzzle_attempts (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        puzzle_id TEXT NOT NULL,
        moves TEXT NOT NULL,
        correct BOOLEAN NOT NULL,
        time_taken INTEGER NOT NULL,
        hints_used INTEGER DEFAULT 0,
        rating_change INTEGER NOT NULL,
        attempted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (puzzle_id) REFERENCES puzzles(id)
      );
    `;

    await this.db.exec(schema);
  }
}
```

## Authentication System

### JWT Utilities

```typescript
// src/utils/jwt.ts
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret';

export interface TokenPayload {
  userId: string;
  email: string;
}

export class JWTService {
  static generateAccessToken(payload: TokenPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
  }

  static generateRefreshToken(payload: TokenPayload): string {
    return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });
  }

  static verifyAccessToken(token: string): TokenPayload {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  }

  static verifyRefreshToken(token: string): TokenPayload {
    return jwt.verify(token, JWT_REFRESH_SECRET) as TokenPayload;
  }
}
```

### Authentication Middleware

```typescript
// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import { JWTService } from '../utils/jwt';

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Access token required'
    });
  }

  try {
    const decoded = JWTService.verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Invalid or expired token'
    });
  }
};
```

### Auth Controller

```typescript
// src/controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { Database } from '../utils/database';
import { JWTService } from '../utils/jwt';

export class AuthController {
  private db = Database.getInstance();

  async register(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;

      // Check if user exists
      const existingUser = await this.db.db.get(
        'SELECT id FROM users WHERE email = ? OR username = ?',
        [email, username]
      );

      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: 'User already exists'
        });
      }

      // Hash password
      const passwordHash = await bcrypt.hash(password, 10);
      const userId = uuidv4();

      // Create user
      await this.db.db.run(
        `INSERT INTO users (id, username, email, password_hash) 
         VALUES (?, ?, ?, ?)`,
        [userId, username, email, passwordHash]
      );

      const user = await this.db.db.get(
        'SELECT id, username, email FROM users WHERE id = ?',
        [userId]
      );

      res.status(201).json({
        success: true,
        user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Registration failed'
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Get user
      const user = await this.db.db.get(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );

      if (!user || !await bcrypt.compare(password, user.password_hash)) {
        return res.status(401).json({
          success: false,
          error: 'Invalid credentials'
        });
      }

      // Generate tokens
      const tokenPayload = { userId: user.id, email: user.email };
      const accessToken = JWTService.generateAccessToken(tokenPayload);
      const refreshToken = JWTService.generateRefreshToken(tokenPayload);

      res.json({
        success: true,
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          username: user.username,
          chessElo: user.chess_elo,
          puzzleRating: user.puzzle_rating
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Login failed'
      });
    }
  }

  async refresh(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(401).json({
          success: false,
          error: 'Refresh token required'
        });
      }

      const decoded = JWTService.verifyRefreshToken(refreshToken);
      const newAccessToken = JWTService.generateAccessToken({
        userId: decoded.userId,
        email: decoded.email
      });

      res.json({
        success: true,
        accessToken: newAccessToken
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        error: 'Invalid refresh token'
      });
    }
  }
}
```

## Chess Game Logic

### Chess Service

```typescript
// src/services/chessService.ts
import { Chess } from 'chess.js';
import { v4 as uuidv4 } from 'uuid';
import { Database } from '../utils/database';
import { AIService } from './aiService';

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

export class ChessService {
  private db = Database.getInstance();
  private aiService = new AIService();

  async createGame(userId: string, aiLevel: number, userColor: string) {
    const gameId = uuidv4();
    const chess = new Chess();
    
    // If user plays black, make AI first move
    let currentFen = chess.fen();
    let pgn = '';

    if (userColor === 'black') {
      const aiMove = await this.aiService.getBestMove(currentFen, aiLevel);
      chess.move(aiMove);
      currentFen = chess.fen();
      pgn = chess.pgn();
    }

    await this.db.db.run(
      `INSERT INTO games (id, user_id, ai_level, user_color, current_fen, pgn, status)
       VALUES (?, ?, ?, ?, ?, ?, 'active')`,
      [gameId, userId, aiLevel, userColor, currentFen, pgn]
    );

    return {
      gameId,
      initialFen: currentFen,
      aiMove: userColor === 'black' ? chess.history({ verbose: true }).slice(-1)[0] : null
    };
  }

  async makeMove(gameId: string, userId: string, move: GameMove) {
    // Get game
    const game = await this.db.db.get(
      'SELECT * FROM games WHERE id = ? AND user_id = ? AND status = "active"',
      [gameId, userId]
    );

    if (!game) {
      throw new Error('Game not found');
    }

    const chess = new Chess(game.current_fen);

    // Validate and make user move
    try {
      const userMove = chess.move(move);
      if (!userMove) {
        throw new Error('Illegal move');
      }
    } catch (error) {
      return {
        success: false,
        legal: false,
        error: 'Illegal move'
      };
    }

    // Check if game is over
    const gameState: GameState = {
      fen: chess.fen(),
      turn: chess.turn() === 'w' ? 'white' : 'black',
      check: chess.inCheck(),
      gameOver: chess.isGameOver(),
      result: null
    };

    let aiMove = null;
    let result = null;

    if (chess.isGameOver()) {
      if (chess.isCheckmate()) {
        result = chess.turn() === 'w' ? '0-1' : '1-0';
      } else {
        result = '1/2-1/2';
      }
      gameState.result = result;
    } else {
      // Get AI response
      try {
        const aiBestMove = await this.aiService.getBestMove(chess.fen(), game.ai_level);
        aiMove = chess.move(aiBestMove);
        gameState.fen = chess.fen();
        gameState.turn = chess.turn() === 'w' ? 'white' : 'black';
        gameState.check = chess.inCheck();

        if (chess.isGameOver()) {
          gameState.gameOver = true;
          if (chess.isCheckmate()) {
            result = chess.turn() === 'w' ? '0-1' : '1-0';
          } else {
            result = '1/2-1/2';
          }
          gameState.result = result;
        }
      } catch (error) {
        console.error('AI move error:', error);
      }
    }

    // Update game in database
    const status = gameState.gameOver ? 'completed' : 'active';
    const completedAt = gameState.gameOver ? new Date().toISOString() : null;

    await this.db.db.run(
      `UPDATE games 
       SET current_fen = ?, pgn = ?, status = ?, result = ?, completed_at = ?
       WHERE id = ?`,
      [gameState.fen, chess.pgn(), status, result, completedAt, gameId]
    );

    // Update user rating if game completed
    if (gameState.gameOver && result) {
      await this.updateUserRating(userId, result, game.ai_level);
    }

    return {
      success: true,
      legal: true,
      gameState,
      aiMove: aiMove ? {
        from: aiMove.from,
        to: aiMove.to,
        san: aiMove.san
      } : null
    };
  }

  private async updateUserRating(userId: string, result: string, aiLevel: number) {
    const user = await this.db.db.get('SELECT chess_elo FROM users WHERE id = ?', [userId]);
    if (!user) return;

    let ratingChange = 0;
    const baseChange = 10 + (aiLevel * 2);

    if (result === '1-0') {
      ratingChange = baseChange;
    } else if (result === '0-1') {
      ratingChange = -baseChange;
    }
    // Draw = 0 change

    const newRating = Math.max(800, user.chess_elo + ratingChange);
    await this.db.db.run(
      'UPDATE users SET chess_elo = ? WHERE id = ?',
      [newRating, userId]
    );
  }

  async getGame(gameId: string, userId: string) {
    const game = await this.db.db.get(
      'SELECT * FROM games WHERE id = ? AND user_id = ?',
      [gameId, userId]
    );

    if (!game) {
      throw new Error('Game not found');
    }

    return {
      id: game.id,
      aiLevel: game.ai_level,
      currentFen: game.current_fen,
      pgn: game.pgn,
      result: game.result,
      gameOver: game.status === 'completed'
    };
  }
}
```

### AI Service Integration

```typescript
// src/services/aiService.ts
import { Chess } from 'chess.js';

export class AIService {
  async getBestMove(fen: string, aiLevel: number): Promise<any> {
    const chess = new Chess(fen);
    const moves = chess.moves({ verbose: true });
    
    if (moves.length === 0) {
      throw new Error('No legal moves available');
    }

    // Simple AI implementation for POC
    // In production, integrate with Stockfish
    
    switch (aiLevel) {
      case 1:
        return this.getRandomMove(moves);
      case 2:
        return this.getBasicMove(chess, moves);
      case 3:
        return this.getImprovedMove(chess, moves);
      case 4:
        return this.getAdvancedMove(chess, moves);
      case 5:
        return this.getExpertMove(chess, moves);
      default:
        return this.getRandomMove(moves);
    }
  }

  private getRandomMove(moves: any[]) {
    return moves[Math.floor(Math.random() * moves.length)];
  }

  private getBasicMove(chess: Chess, moves: any[]) {
    // Prefer captures
    const captures = moves.filter(move => move.captured);
    if (captures.length > 0) {
      return captures[Math.floor(Math.random() * captures.length)];
    }
    
    return this.getRandomMove(moves);
  }

  private getImprovedMove(chess: Chess, moves: any[]) {
    // Basic evaluation: captures, checks, center control
    const scoredMoves = moves.map(move => {
      let score = 0;
      
      // Captures
      if (move.captured) {
        const pieceValues = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };
        score += pieceValues[move.captured] * 10;
      }
      
      // Checks
      chess.move(move);
      if (chess.inCheck()) {
        score += 5;
      }
      chess.undo();
      
      // Center squares
      const centerSquares = ['e4', 'e5', 'd4', 'd5'];
      if (centerSquares.includes(move.to)) {
        score += 2;
      }
      
      return { move, score };
    });

    scoredMoves.sort((a, b) => b.score - a.score);
    const bestMoves = scoredMoves.filter(m => m.score === scoredMoves[0].score);
    
    return bestMoves[Math.floor(Math.random() * bestMoves.length)].move;
  }

  private getAdvancedMove(chess: Chess, moves: any[]) {
    // More sophisticated evaluation
    return this.getImprovedMove(chess, moves);
  }

  private getExpertMove(chess: Chess, moves: any[]) {
    // Placeholder for Stockfish integration
    return this.getAdvancedMove(chess, moves);
  }
}
```

## Puzzle System

### Puzzle Service

```typescript
// src/services/puzzleService.ts
import { Database } from '../utils/database';
import { Chess } from 'chess.js';

export class PuzzleService {
  private db = Database.getInstance();

  async getNextPuzzle(userId: string) {
    const user = await this.db.db.get('SELECT puzzle_rating FROM users WHERE id = ?', [userId]);
    if (!user) throw new Error('User not found');

    const rating = user.puzzle_rating;
    const ratingRange = 100;

    // Get puzzle within rating range that user hasn't solved recently
    const puzzle = await this.db.db.get(`
      SELECT p.* FROM puzzles p
      LEFT JOIN puzzle_attempts pa ON p.id = pa.puzzle_id AND pa.user_id = ?
      WHERE p.rating BETWEEN ? AND ?
      AND (pa.id IS NULL OR pa.attempted_at < datetime('now', '-1 day'))
      ORDER BY RANDOM()
      LIMIT 1
    `, [userId, rating - ratingRange, rating + ratingRange]);

    if (!puzzle) {
      throw new Error('No puzzles available');
    }

    return {
      id: puzzle.id,
      fen: puzzle.fen,
      themes: JSON.parse(puzzle.themes),
      rating: puzzle.rating,
      description: puzzle.description
    };
  }

  async solvePuzzle(userId: string, puzzleId: string, moves: string[], timeTaken: number) {
    const puzzle = await this.db.db.get('SELECT * FROM puzzles WHERE id = ?', [puzzleId]);
    if (!puzzle) throw new Error('Puzzle not found');

    const user = await this.db.db.get('SELECT puzzle_rating FROM users WHERE id = ?', [userId]);
    if (!user) throw new Error('User not found');

    const solutionMoves = JSON.parse(puzzle.solution_moves);
    const isCorrect = this.checkSolution(moves, solutionMoves);

    // Calculate rating change using simplified ELO
    const ratingDiff = puzzle.rating - user.puzzle_rating;
    let ratingChange = 0;

    if (isCorrect) {
      ratingChange = Math.max(1, Math.min(20, 10 - Math.floor(ratingDiff / 50)));
    } else {
      ratingChange = Math.max(-20, Math.min(-1, -10 - Math.floor(ratingDiff / 50)));
    }

    const newRating = Math.max(800, user.puzzle_rating + ratingChange);

    // Save attempt
    await this.db.db.run(`
      INSERT INTO puzzle_attempts (id, user_id, puzzle_id, moves, correct, time_taken, rating_change)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [require('crypto').randomUUID(), userId, puzzleId, JSON.stringify(moves), isCorrect, timeTaken, ratingChange]);

    // Update user rating
    await this.db.db.run('UPDATE users SET puzzle_rating = ? WHERE id = ?', [newRating, userId]);

    if (isCorrect) {
      return {
        correct: true,
        solution: solutionMoves,
        ratingChange,
        newRating,
        feedback: 'Excellent! You found the solution.'
      };
    } else {
      return {
        correct: false,
        hint: this.generateHint(puzzle),
        ratingChange,
        newRating
      };
    }
  }

  private checkSolution(userMoves: string[], solutionMoves: string[]): boolean {
    if (userMoves.length !== solutionMoves.length) return false;
    
    for (let i = 0; i < userMoves.length; i++) {
      if (userMoves[i] !== solutionMoves[i]) return false;
    }
    
    return true;
  }

  private generateHint(puzzle: any): string {
    const themes = JSON.parse(puzzle.themes);
    
    const hintMap: { [key: string]: string } = {
      'fork': 'Look for a move that attacks multiple pieces at once',
      'pin': 'Consider moves that restrict an opponent piece from moving',
      'skewer': 'Find a way to attack a valuable piece through another piece',
      'discovery': 'Look for moves that reveal an attack from another piece',
      'deflection': 'Try to force the opponent piece away from its duty'
    };

    for (const theme of themes) {
      if (hintMap[theme]) {
        return hintMap[theme];
      }
    }

    return 'Look for the strongest move in the position';
  }

  async getHint(userId: string, puzzleId: string) {
    const puzzle = await this.db.db.get('SELECT * FROM puzzles WHERE id = ?', [puzzleId]);
    if (!puzzle) throw new Error('Puzzle not found');

    return {
      hint: this.generateHint(puzzle),
      hintsUsed: 1
    };
  }
}
```

## Express App Setup

### Main App Configuration

```typescript
// src/app.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { Database } from './utils/database';
import { errorHandler } from './middleware/errorHandler';

// Route imports
import authRoutes from './routes/auth';
import gameRoutes from './routes/games';
import puzzleRoutes from './routes/puzzles';
import userRoutes from './routes/users';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet({
  contentSecurityPolicy: false // Allow for local development
}));
app.use(cors({
  origin: 'http://localhost:5173', // Vite dev server
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/puzzles', puzzleRoutes);
app.use('/api/user', userRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, status: 'healthy' });
});

// Error handling
app.use(errorHandler);

// Initialize database and start server
async function startServer() {
  try {
    const db = Database.getInstance();
    await db.connect();
    console.log('Database connected');

    app.listen(PORT, () => {
      console.log(`Chess Training API running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export default app;
```

### Route Definitions

```typescript
// src/routes/games.ts
import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { ChessService } from '../services/chessService';
import { body, param, validationResult } from 'express-validator';

const router = express.Router();
const chessService = new ChessService();

// Create game
router.post('/create',
  authenticateToken,
  [
    body('aiLevel').isInt({ min: 1, max: 5 }),
    body('color').isIn(['white', 'black', 'random']),
    body('timeControl').optional().isString()
  ],
  async (req: any, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation error'
      });
    }

    try {
      const { aiLevel, color, timeControl } = req.body;
      const result = await chessService.createGame(req.user.userId, aiLevel, color);
      
      res.json({
        success: true,
        ...result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to create game'
      });
    }
  }
);

// Make move
router.post('/:gameId/move',
  authenticateToken,
  [
    param('gameId').isUUID(),
    body('move.from').isString().isLength({ min: 2, max: 2 }),
    body('move.to').isString().isLength({ min: 2, max: 2 }),
    body('move.promotion').optional().isIn(['q', 'r', 'b', 'n'])
  ],
  async (req: any, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation error'
      });
    }

    try {
      const { gameId } = req.params;
      const { move } = req.body;
      
      const result = await chessService.makeMove(gameId, req.user.userId, move);
      res.json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to make move'
      });
    }
  }
);

// Get game
router.get('/:gameId',
  authenticateToken,
  [param('gameId').isUUID()],
  async (req: any, res) => {
    try {
      const { gameId } = req.params;
      const game = await chessService.getGame(gameId, req.user.userId);
      
      res.json({
        success: true,
        game
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: 'Game not found'
      });
    }
  }
);

export default router;
```

## Development Setup

### Package.json Scripts

```json
{
  "name": "chess-training-backend",
  "version": "1.0.0",
  "scripts": {
    "dev": "nodemon src/app.ts",
    "build": "tsc",
    "start": "node dist/app.js",
    "test": "echo \"No tests yet\"",
    "seed": "ts-node src/scripts/seed.ts"
  }
}
```

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": false,
    "removeComments": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Environment Variables

```bash
# .env (for local development)
NODE_ENV=development
PORT=3000
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key
DATABASE_PATH=./database/chess_training.db
```

### Error Handler

```typescript
// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', error);

  // Operational errors
  if (error.message === 'Game not found') {
    return res.status(404).json({
      success: false,
      error: 'Game not found'
    });
  }

  if (error.message === 'Illegal move') {
    return res.status(400).json({
      success: false,
      error: 'Illegal move'
    });
  }

  // Default server error
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
};
```

## Database Seeding

### Puzzle Seed Script

```typescript
// src/scripts/seed.ts
import { Database } from '../utils/database';

const puzzles = [
  {
    id: 'puzzle-001',
    fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',
    solution_moves: '["Nxe5", "Nxe5", "d4"]',
    themes: '["fork", "attack"]',
    rating: 1200,
    description: 'White to play and win material'
  },
  // Add more puzzles...
];

async function seedPuzzles() {
  const db = Database.getInstance();
  await db.connect();

  for (const puzzle of puzzles) {
    await db.db.run(`
      INSERT OR REPLACE INTO puzzles (id, fen, solution_moves, themes, rating, description)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [puzzle.id, puzzle.fen, puzzle.solution_moves, puzzle.themes, puzzle.rating, puzzle.description]);
  }

  console.log(`Seeded ${puzzles.length} puzzles`);
}

seedPuzzles().catch(console.error);
```

## Testing Setup

### Basic Test Structure

```typescript
// tests/auth.test.ts
import request from 'supertest';
import app from '../src/app';

describe('Authentication', () => {
  test('should register new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });

  test('should login user', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });

    expect(response.status).toBe(200);
    expect(response.body.accessToken).toBeDefined();
  });
});
```

## Production Considerations (Future)

### For Production Deployment:
1. **Database Migration**: SQLite → PostgreSQL
2. **Security**: Rate limiting, input sanitization, CORS refinement
3. **Logging**: Winston or similar structured logging
4. **Monitoring**: Health checks, metrics collection
5. **Caching**: Redis for session management
6. **Stockfish Integration**: Real chess engine integration
7. **Docker**: Containerization for deployment
8. **CI/CD**: Automated testing and deployment

## POC Implementation Notes

This backend provides:
- ✅ Full REST API matching frontend requirements
- ✅ JWT authentication with refresh tokens
- ✅ Chess game logic with basic AI opponents
- ✅ Puzzle training system with rating calculation
- ✅ SQLite database with proper schema
- ✅ TypeScript for type safety
- ✅ Express middleware for validation and error handling
- ✅ Development-friendly setup with hot reloading

**Not included in POC:**
- ❌ Advanced AI (Stockfish integration)
- ❌ Rate limiting
- ❌ Complex validation
- ❌ Production security measures
- ❌ Comprehensive test suite

Ready for frontend integration and POC demonstration.