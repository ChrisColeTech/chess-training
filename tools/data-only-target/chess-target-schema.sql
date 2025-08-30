-- Chess Training Application - Target Database Schema
-- Generated: 2025-08-29T00:53:51.768Z
-- Tables: 9
-- Approach: Manual domain-driven design

-- Enable UUID extension (PostgreSQL)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable JSONB (PostgreSQL) / JSON (SQLite compatibility)
-- Note: JSONB is PostgreSQL-specific, use JSON for SQLite

-- Core user accounts and authentication
CREATE TABLE users (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  username VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  chess_elo INTEGER NOT NULL,
  puzzle_rating INTEGER NOT NULL,
  preferences JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP,
  PRIMARY KEY (id)
);
-- Core user accounts and authentication
-- Relationships: 1:M with games, 1:M with puzzle_attempts, 1:M with user_achievements

-- Chess games played by users
CREATE TABLE games (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  opponent_type VARCHAR(20) NOT NULL,
  opponent_name VARCHAR(100),
  time_control VARCHAR(20),
  result VARCHAR(10) NOT NULL,
  user_color VARCHAR(5) NOT NULL,
  pgn TEXT NOT NULL,
  final_fen VARCHAR(100) NOT NULL,
  move_count INTEGER NOT NULL,
  duration_seconds INTEGER,
  analysis JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
-- Chess games played by users
-- Relationships: M:1 with users

-- Tactical and training puzzles
CREATE TABLE puzzles (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  type VARCHAR(20) NOT NULL,
  fen VARCHAR(100) NOT NULL,
  solution_moves TEXT NOT NULL,
  themes TEXT NOT NULL,
  difficulty INTEGER NOT NULL,
  rating INTEGER NOT NULL,
  title VARCHAR(200),
  source VARCHAR(100),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
-- Tactical and training puzzles
-- Relationships: 1:M with puzzle_attempts

-- User attempts at solving puzzles
CREATE TABLE puzzle_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  puzzle_id UUID NOT NULL,
  solved BOOLEAN NOT NULL,
  moves_played TEXT NOT NULL,
  time_taken_seconds INTEGER NOT NULL,
  hints_used INTEGER NOT NULL,
  rating_change INTEGER,
  attempted_at TIMESTAMP NOT NULL,
  PRIMARY KEY (id)
);
-- User attempts at solving puzzles
-- Relationships: M:1 with users, M:1 with puzzles

-- Available achievements in the system
CREATE TABLE achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  badge_icon VARCHAR(50),
  points INTEGER NOT NULL,
  unlock_condition JSONB NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
-- Available achievements in the system
-- Relationships: 1:M with user_achievements

-- Achievements earned by users
CREATE TABLE user_achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  achievement_id UUID NOT NULL,
  earned_at TIMESTAMP NOT NULL,
  progress_data JSONB,
  PRIMARY KEY (id)
);
-- Achievements earned by users
-- Relationships: M:1 with users, M:1 with achievements

-- Authentication sessions and refresh tokens
CREATE TABLE user_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  refresh_token_hash VARCHAR(255) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_used_at TIMESTAMP,
  user_agent TEXT,
  ip_address VARCHAR(45),
  PRIMARY KEY (id)
);
-- Authentication sessions and refresh tokens
-- Relationships: M:1 with users

-- Chess opening positions and variations
CREATE TABLE opening_positions (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  eco_code VARCHAR(10),
  name VARCHAR(200) NOT NULL,
  fen VARCHAR(100) NOT NULL,
  moves TEXT NOT NULL,
  popularity INTEGER NOT NULL,
  theory TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
-- Chess opening positions and variations
-- Relationships: 

-- Daily/periodic user statistics and progress
CREATE TABLE user_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  stat_date DATE NOT NULL,
  puzzles_solved INTEGER NOT NULL,
  puzzles_attempted INTEGER NOT NULL,
  games_played INTEGER NOT NULL,
  time_played_minutes INTEGER NOT NULL,
  rating_change INTEGER NOT NULL,
  streak_days INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
-- Daily/periodic user statistics and progress
-- Relationships: M:1 with users

-- Indexes for query optimization
CREATE INDEX idx_users_email ON users (email);
CREATE INDEX idx_users_username ON users (username);
CREATE INDEX idx_users_last_login ON users (last_login);
CREATE INDEX idx_games_user_id ON games (user_id);
CREATE INDEX idx_games_created_at ON games (created_at);
CREATE INDEX idx_games_result ON games (result);
CREATE INDEX idx_puzzles_type ON puzzles (type);
CREATE INDEX idx_puzzles_difficulty ON puzzles (difficulty);
CREATE INDEX idx_puzzles_rating ON puzzles (rating);
CREATE INDEX idx_puzzle_attempts_user_id ON puzzle_attempts (user_id);
CREATE INDEX idx_puzzle_attempts_puzzle_id ON puzzle_attempts (puzzle_id);
CREATE INDEX idx_puzzle_attempts_solved ON puzzle_attempts (solved);
CREATE INDEX idx_puzzle_attempts_attempted_at ON puzzle_attempts (attempted_at);
CREATE INDEX idx_user_achievements_user_id ON user_achievements (user_id);
CREATE INDEX idx_user_achievements_achievement_id ON user_achievements (achievement_id);
CREATE INDEX idx_user_sessions_user_id ON user_sessions (user_id);
CREATE INDEX idx_user_sessions_expires_at ON user_sessions (expires_at);
CREATE INDEX idx_opening_positions_eco_code ON opening_positions (eco_code);
CREATE INDEX idx_user_stats_user_id ON user_stats (user_id);
CREATE INDEX idx_user_stats_stat_date ON user_stats (stat_date);


-- Foreign key constraints
ALTER TABLE games ADD FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
ALTER TABLE puzzle_attempts ADD FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
ALTER TABLE puzzle_attempts ADD FOREIGN KEY (puzzle_id) REFERENCES puzzles(id) ON DELETE CASCADE;
ALTER TABLE user_achievements ADD FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
ALTER TABLE user_achievements ADD FOREIGN KEY (achievement_id) REFERENCES achievements(id) ON DELETE CASCADE;
ALTER TABLE user_sessions ADD FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
ALTER TABLE user_stats ADD FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Unique constraints
ALTER TABLE users ADD CONSTRAINT unique_email UNIQUE (email);
ALTER TABLE users ADD CONSTRAINT unique_username UNIQUE (username);
ALTER TABLE user_sessions ADD CONSTRAINT unique_refresh_token UNIQUE (refresh_token_hash);
ALTER TABLE user_achievements ADD CONSTRAINT unique_user_achievement UNIQUE (user_id, achievement_id);
ALTER TABLE user_stats ADD CONSTRAINT unique_user_date_stats UNIQUE (user_id, stat_date);

-- Check constraints
ALTER TABLE users ADD CONSTRAINT valid_chess_elo CHECK (chess_elo >= 400 AND chess_elo <= 3000);
ALTER TABLE users ADD CONSTRAINT valid_puzzle_rating CHECK (puzzle_rating >= 400 AND puzzle_rating <= 3000);
ALTER TABLE games ADD CONSTRAINT valid_result CHECK (result IN ('win', 'loss', 'draw'));
ALTER TABLE games ADD CONSTRAINT valid_color CHECK (user_color IN ('white', 'black'));
ALTER TABLE puzzles ADD CONSTRAINT valid_difficulty CHECK (difficulty >= 1 AND difficulty <= 5);
ALTER TABLE puzzles ADD CONSTRAINT valid_rating CHECK (rating >= 400 AND rating <= 3000);
ALTER TABLE puzzles ADD CONSTRAINT valid_type CHECK (type IN ('tactical', 'endgame', 'opening'));
ALTER TABLE puzzle_attempts ADD CONSTRAINT valid_time_taken CHECK (time_taken_seconds >= 0);
ALTER TABLE puzzle_attempts ADD CONSTRAINT valid_hints CHECK (hints_used >= 0);
ALTER TABLE user_sessions ADD CONSTRAINT valid_expiry CHECK (expires_at > created_at);


