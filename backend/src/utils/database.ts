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
        chess_elo INTEGER DEFAULT 1000,
        puzzle_rating INTEGER DEFAULT 1000,
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

      -- User sessions table (for refresh tokens)
      CREATE TABLE IF NOT EXISTS user_sessions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        refresh_token TEXT NOT NULL,
        expires_at DATETIME NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );


      -- Create indexes for better performance
      CREATE INDEX IF NOT EXISTS idx_games_user_id ON games(user_id);
      CREATE INDEX IF NOT EXISTS idx_games_status ON games(status);
      CREATE INDEX IF NOT EXISTS idx_puzzle_attempts_user_id ON puzzle_attempts(user_id);
      CREATE INDEX IF NOT EXISTS idx_puzzle_attempts_puzzle_id ON puzzle_attempts(puzzle_id);
      CREATE INDEX IF NOT EXISTS idx_puzzles_rating ON puzzles(rating);
      CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
      CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(refresh_token);
    `;

    await this.db.exec(schema);
    console.log('Database tables initialized');
  }

  public async get(query: string, params: any[] = []) {
    if (!this.db) await this.connect();
    return this.db.get(query, params);
  }

  public async getAll(query: string, params: any[] = []) {
    if (!this.db) await this.connect();
    return this.db.all(query, params);
  }

  public async run(query: string, params: any[] = []) {
    if (!this.db) await this.connect();
    return this.db.run(query, params);
  }

  public async close() {
    if (this.db) {
      await this.db.close();
      this.db = null;
    }
  }
}