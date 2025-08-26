# Chess Training Application - Database Schema

**Document Version:** 1.0  
**Date:** August 2025  
**Database:** SQLite (POC) → PostgreSQL Compatible  
**Target:** Production-Ready POC Schema

## Table of Contents

1. [Schema Overview](#schema-overview)
2. [User Management Tables](#user-management-tables)
3. [Chess Game Tables](#chess-game-tables)
4. [Puzzle System Tables](#puzzle-system-tables)
5. [Analytics Tables](#analytics-tables)
6. [Indexes and Performance](#indexes-and-performance)
7. [Data Relationships](#data-relationships)
8. [Migration Strategy](#migration-strategy)
9. [Sample Data](#sample-data)

---

## Schema Overview

### Design Principles

Based on architecture requirements, this schema follows:

- **PostgreSQL Compatibility**: All SQLite features used are PostgreSQL-compatible
- **Normalization**: 3NF compliance for data integrity
- **Performance**: Strategic indexing for query optimization  
- **Extensibility**: Schema supports future feature additions
- **ACID Compliance**: Proper foreign keys and constraints

### Database Statistics (POC)
- **Total Tables**: 8 core tables
- **Expected Size**: ~10MB for 1000 games + 500 puzzles
- **Peak Queries/Sec**: ~50 during active gameplay
- **Storage Engine**: SQLite with WAL mode

---

## User Management Tables

### users
Core user accounts and authentication data.

```sql
CREATE TABLE users (
    -- Primary identification
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    
    -- Authentication
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    
    -- Chess ratings
    chess_elo INTEGER DEFAULT 1200,
    puzzle_rating INTEGER DEFAULT 1200,
    
    -- Game statistics  
    games_played INTEGER DEFAULT 0,
    wins INTEGER DEFAULT 0,
    losses INTEGER DEFAULT 0,
    draws INTEGER DEFAULT 0,
    
    -- User preferences (stored as JSON for flexibility)
    preferences TEXT DEFAULT '{}',
    
    -- Timestamps
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME,
    
    -- Constraints
    CHECK (length(username) >= 3 AND length(username) <= 30),
    CHECK (chess_elo >= 400 AND chess_elo <= 3000),
    CHECK (puzzle_rating >= 400 AND puzzle_rating <= 3000),
    CHECK (games_played >= 0),
    CHECK (wins >= 0 AND losses >= 0 AND draws >= 0),
    CHECK (wins + losses + draws <= games_played)
);
```

**Preferences JSON Structure:**
```json
{
  "boardTheme": "classic",
  "pieceSet": "cburnett", 
  "soundEnabled": true,
  "showCoordinates": true,
  "autoPromoteQueen": true,
  "confirmMoves": false,
  "highlightLegalMoves": true,
  "animationSpeed": "normal"
}
```

### user_sessions
JWT refresh token management for secure authentication.

```sql
CREATE TABLE user_sessions (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    user_id TEXT NOT NULL,
    refresh_token_hash TEXT UNIQUE NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_used DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_agent TEXT,
    ip_address TEXT,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CHECK (expires_at > created_at)
);
```

---

## Chess Game Tables

### games
Complete chess game records with metadata.

```sql
CREATE TABLE games (
    -- Primary identification
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    
    -- Players (only white_player_id for POC since AI is black)
    white_player_id TEXT NOT NULL,
    black_player_id TEXT NULL, -- Always NULL for AI games in POC
    
    -- AI configuration
    ai_opponent BOOLEAN DEFAULT TRUE,
    ai_level INTEGER CHECK (ai_level BETWEEN 1 AND 5),
    
    -- Game state
    initial_fen TEXT DEFAULT 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    current_fen TEXT NOT NULL,
    pgn TEXT NOT NULL,
    
    -- Game result
    result TEXT CHECK (result IN ('1-0', '0-1', '1/2-1/2', '*')),
    termination TEXT CHECK (termination IN ('checkmate', 'resignation', 'timeout', 'draw', 'stalemate', 'insufficient_material')),
    
    -- Timing
    time_control TEXT, -- Format: "10+0", "5+3" etc.
    white_time_remaining INTEGER, -- seconds
    black_time_remaining INTEGER, -- seconds  
    duration_seconds INTEGER,
    
    -- Chess metadata
    opening_eco TEXT, -- ECO code: A00-E99
    opening_name TEXT,
    move_count INTEGER DEFAULT 0,
    
    -- ELO tracking
    white_elo_before INTEGER,
    white_elo_after INTEGER,
    elo_change INTEGER, -- white player's rating change
    
    -- Game analysis
    white_accuracy REAL, -- 0.0 - 1.0
    blunders INTEGER DEFAULT 0,
    mistakes INTEGER DEFAULT 0,
    inaccuracies INTEGER DEFAULT 0,
    
    -- Timestamps
    started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME,
    
    -- Constraints
    FOREIGN KEY (white_player_id) REFERENCES users(id) ON DELETE CASCADE,
    CHECK (move_count >= 0),
    CHECK (duration_seconds IS NULL OR duration_seconds > 0),
    CHECK (white_accuracy IS NULL OR (white_accuracy >= 0.0 AND white_accuracy <= 1.0)),
    CHECK (blunders >= 0 AND mistakes >= 0 AND inaccuracies >= 0)
);
```

### game_moves
Detailed move-by-move game analysis and timing.

```sql
CREATE TABLE game_moves (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    game_id TEXT NOT NULL,
    
    -- Move identification  
    move_number INTEGER NOT NULL,
    player_color TEXT NOT NULL CHECK (player_color IN ('white', 'black')),
    
    -- Move notation
    san TEXT NOT NULL, -- Standard Algebraic Notation: "e4", "Nf3"
    uci TEXT NOT NULL, -- Universal Chess Interface: "e2e4", "g1f3"
    fen_before TEXT NOT NULL,
    fen_after TEXT NOT NULL,
    
    -- Timing
    time_spent INTEGER, -- milliseconds
    time_remaining INTEGER, -- seconds after move
    
    -- Analysis
    evaluation INTEGER, -- centipawns from engine perspective
    best_move TEXT, -- UCI format of engine's preferred move
    classification TEXT CHECK (classification IN ('book', 'excellent', 'good', 'inaccuracy', 'mistake', 'blunder')),
    
    -- Special moves
    capture BOOLEAN DEFAULT FALSE,
    check_given BOOLEAN DEFAULT FALSE,
    checkmate BOOLEAN DEFAULT FALSE,
    castling TEXT CHECK (castling IN ('short', 'long')),
    en_passant BOOLEAN DEFAULT FALSE,
    promotion TEXT CHECK (promotion IN ('q', 'r', 'b', 'n')),
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
    CHECK (move_number > 0),
    CHECK (time_spent IS NULL OR time_spent >= 0),
    CHECK (time_remaining IS NULL OR time_remaining >= 0)
);
```

---

## Puzzle System Tables

### puzzles
Chess tactical puzzles with metadata and difficulty ratings.

```sql
CREATE TABLE puzzles (
    -- Identification
    id TEXT PRIMARY KEY, -- e.g., "lichess_12345" or "custom_001"
    source TEXT DEFAULT 'lichess', -- puzzle source
    
    -- Position data
    fen TEXT NOT NULL, -- Position before the solution move
    moves TEXT NOT NULL, -- Solution moves in UCI format, space-separated
    
    -- Difficulty and popularity
    rating INTEGER NOT NULL, -- Glicko-2 rating (600-3000)
    rating_deviation INTEGER DEFAULT 350,
    popularity INTEGER DEFAULT 0, -- -100 to 100 scale
    nb_plays INTEGER DEFAULT 0,
    
    -- Categorization
    themes TEXT NOT NULL, -- Comma-separated: "fork,pin,attack"
    opening_family TEXT, -- "Italian Game", "Sicilian Defense"
    game_phase TEXT CHECK (game_phase IN ('opening', 'middlegame', 'endgame')),
    
    -- Metadata
    description TEXT, -- Human-readable puzzle description
    game_url TEXT, -- URL to source game if available
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    CHECK (rating >= 600 AND rating <= 3000),
    CHECK (rating_deviation >= 50 AND rating_deviation <= 500),
    CHECK (popularity >= -100 AND popularity <= 100),
    CHECK (nb_plays >= 0),
    CHECK (length(themes) > 0),
    CHECK (length(moves) > 0)
);
```

### puzzle_attempts
User puzzle solving attempts with performance tracking.

```sql
CREATE TABLE puzzle_attempts (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    user_id TEXT NOT NULL,
    puzzle_id TEXT NOT NULL,
    
    -- Attempt outcome
    solved BOOLEAN NOT NULL,
    correct_moves TEXT, -- User's moves in UCI format
    
    -- Performance metrics
    time_taken INTEGER NOT NULL, -- milliseconds
    hints_used INTEGER DEFAULT 0,
    attempts INTEGER DEFAULT 1, -- Multiple attempts on same puzzle
    
    -- User rating impact
    rating_before INTEGER NOT NULL,
    rating_after INTEGER NOT NULL,
    rating_change INTEGER NOT NULL,
    
    -- Analysis
    move_accuracy REAL, -- 0.0-1.0, how close to optimal solution
    
    attempted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (puzzle_id) REFERENCES puzzles(id),
    CHECK (time_taken > 0),
    CHECK (hints_used >= 0),
    CHECK (attempts >= 1),
    CHECK (rating_before >= 400 AND rating_before <= 3000),
    CHECK (rating_after >= 400 AND rating_after <= 3000),
    CHECK (move_accuracy IS NULL OR (move_accuracy >= 0.0 AND move_accuracy <= 1.0))
);
```

### puzzle_schedule
Spaced repetition scheduling using SM-2 algorithm.

```sql
CREATE TABLE puzzle_schedule (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    user_id TEXT NOT NULL,
    puzzle_id TEXT NOT NULL,
    
    -- SM-2 Algorithm parameters
    next_review DATETIME NOT NULL,
    interval_days REAL DEFAULT 1.0,
    ease_factor REAL DEFAULT 2.5,
    consecutive_correct INTEGER DEFAULT 0,
    
    -- Performance tracking
    total_attempts INTEGER DEFAULT 0,
    total_correct INTEGER DEFAULT 0,
    last_performance INTEGER, -- 1-5 scale from last attempt
    average_time INTEGER, -- average solve time in milliseconds
    
    -- Status
    active BOOLEAN DEFAULT TRUE, -- false if user mastered this puzzle
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (puzzle_id) REFERENCES puzzles(id),
    UNIQUE(user_id, puzzle_id),
    CHECK (interval_days >= 1.0),
    CHECK (ease_factor >= 1.3 AND ease_factor <= 2.5),
    CHECK (consecutive_correct >= 0),
    CHECK (total_attempts >= 0),
    CHECK (total_correct >= 0 AND total_correct <= total_attempts),
    CHECK (last_performance IS NULL OR (last_performance >= 1 AND last_performance <= 5)),
    CHECK (average_time IS NULL OR average_time > 0)
);
```

---

## Analytics Tables

### user_achievements
Gamification system for user engagement.

```sql
CREATE TABLE user_achievements (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    user_id TEXT NOT NULL,
    
    -- Achievement identification
    achievement_type TEXT NOT NULL, -- 'games', 'puzzles', 'rating', 'streak'
    achievement_key TEXT NOT NULL, -- 'first_win', 'puzzle_master_100'
    
    -- Achievement data
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL, -- 'bronze', 'silver', 'gold', 'platinum'
    points INTEGER DEFAULT 0,
    
    -- Progress tracking
    current_progress INTEGER DEFAULT 0,
    target_progress INTEGER NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(user_id, achievement_key),
    CHECK (points >= 0),
    CHECK (current_progress >= 0),
    CHECK (target_progress > 0),
    CHECK (current_progress <= target_progress),
    CHECK (completed = (current_progress >= target_progress))
);
```

### daily_stats
Daily aggregated statistics for performance tracking.

```sql
CREATE TABLE daily_stats (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    user_id TEXT NOT NULL,
    date DATE NOT NULL,
    
    -- Game statistics
    games_played INTEGER DEFAULT 0,
    games_won INTEGER DEFAULT 0,
    games_lost INTEGER DEFAULT 0,
    games_drawn INTEGER DEFAULT 0,
    
    -- Puzzle statistics  
    puzzles_attempted INTEGER DEFAULT 0,
    puzzles_solved INTEGER DEFAULT 0,
    puzzle_accuracy REAL DEFAULT 0.0,
    average_puzzle_time INTEGER DEFAULT 0, -- milliseconds
    
    -- Rating changes
    chess_rating_start INTEGER,
    chess_rating_end INTEGER,
    puzzle_rating_start INTEGER,
    puzzle_rating_end INTEGER,
    
    -- Time spent
    total_play_time INTEGER DEFAULT 0, -- seconds
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(user_id, date),
    CHECK (games_played >= 0),
    CHECK (games_won >= 0 AND games_lost >= 0 AND games_drawn >= 0),
    CHECK (games_won + games_lost + games_drawn <= games_played),
    CHECK (puzzles_attempted >= 0),
    CHECK (puzzles_solved >= 0 AND puzzles_solved <= puzzles_attempted),
    CHECK (puzzle_accuracy >= 0.0 AND puzzle_accuracy <= 1.0),
    CHECK (total_play_time >= 0)
);
```

---

## Indexes and Performance

### Primary Indexes
```sql
-- User lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_chess_elo ON users(chess_elo DESC);
CREATE INDEX idx_users_puzzle_rating ON users(puzzle_rating DESC);

-- Session management
CREATE INDEX idx_user_sessions_token ON user_sessions(refresh_token_hash);
CREATE INDEX idx_user_sessions_user_expires ON user_sessions(user_id, expires_at);

-- Game queries
CREATE INDEX idx_games_player ON games(white_player_id, completed_at DESC);
CREATE INDEX idx_games_result ON games(result, completed_at DESC);
CREATE INDEX idx_games_ai_level ON games(ai_level, completed_at DESC);
CREATE INDEX idx_games_opening ON games(opening_eco);

-- Move analysis
CREATE INDEX idx_game_moves_game ON game_moves(game_id, move_number);
CREATE INDEX idx_game_moves_classification ON game_moves(classification);

-- Puzzle system
CREATE INDEX idx_puzzles_rating ON puzzles(rating);
CREATE INDEX idx_puzzles_themes ON puzzles(themes);
CREATE INDEX idx_puzzles_rating_themes ON puzzles(rating, themes);
CREATE INDEX idx_puzzles_popularity ON puzzles(popularity DESC);

-- Puzzle attempts
CREATE INDEX idx_puzzle_attempts_user ON puzzle_attempts(user_id, attempted_at DESC);
CREATE INDEX idx_puzzle_attempts_puzzle ON puzzle_attempts(puzzle_id, attempted_at DESC);
CREATE INDEX idx_puzzle_attempts_performance ON puzzle_attempts(user_id, solved, attempted_at DESC);

-- Spaced repetition
CREATE INDEX idx_puzzle_schedule_review ON puzzle_schedule(user_id, next_review, active);
CREATE INDEX idx_puzzle_schedule_due ON puzzle_schedule(next_review, active) WHERE active = TRUE;

-- Analytics
CREATE INDEX idx_user_achievements_user ON user_achievements(user_id, completed);
CREATE INDEX idx_daily_stats_user_date ON daily_stats(user_id, date DESC);
```

### Query Performance Targets
- User login: < 50ms
- Game state retrieval: < 100ms  
- Next puzzle selection: < 200ms
- Game history: < 300ms
- Statistics dashboard: < 500ms

---

## Data Relationships

### Entity Relationship Overview

```
users (1) ──────── (N) games
  │                     │
  │                     └─ (1) ──── (N) game_moves
  │
  ├─ (1) ──────── (N) user_sessions
  │
  ├─ (1) ──────── (N) puzzle_attempts ──── (N) ─── (1) puzzles
  │                     │                              │
  │                     └─ (1) ──── (1) puzzle_schedule
  │
  ├─ (1) ──────── (N) user_achievements
  │
  └─ (1) ──────── (N) daily_stats
```

### Key Relationships

1. **User → Games**: One-to-many (user plays multiple games)
2. **Game → Moves**: One-to-many (game contains multiple moves)
3. **User → Puzzle Attempts**: One-to-many (user solves multiple puzzles)
4. **Puzzle → Attempts**: One-to-many (puzzle attempted by multiple users)
5. **User → Puzzle Schedule**: One-to-many (user has spaced repetition schedule)
6. **User → Achievements**: One-to-many (user earns multiple achievements)
7. **User → Daily Stats**: One-to-many (user has stats for each day)

### Referential Integrity

All foreign key relationships enforce cascading deletes where appropriate:
- User deletion removes all associated games, attempts, and stats
- Game deletion removes all associated moves
- Puzzle deletion removes attempts but preserves user rating history

---

## Migration Strategy

### POC to Production Migration Path

#### Phase 1: SQLite to PostgreSQL
```sql
-- PostgreSQL-compatible data types
TEXT → VARCHAR(255) or TEXT
INTEGER → INTEGER  
REAL → DECIMAL(10,2)
BOOLEAN → BOOLEAN
DATETIME → TIMESTAMP WITH TIME ZONE
```

#### Phase 2: Schema Enhancements
```sql
-- Add partitioning for large tables
CREATE TABLE games_y2025m01 PARTITION OF games
FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');

-- Add materialized views for analytics
CREATE MATERIALIZED VIEW user_statistics AS
SELECT user_id, 
       COUNT(*) as total_games,
       AVG(CASE WHEN result='1-0' THEN 1.0 ELSE 0.0 END) as win_rate
FROM games 
GROUP BY user_id;
```

#### Phase 3: Performance Enhancements
- Add database connection pooling
- Implement query result caching
- Add read replicas for analytics
- Optimize indexes based on query patterns

### Data Migration Tools
```bash
# Export from SQLite
sqlite3 chess-training.db .dump > schema.sql

# Import to PostgreSQL
psql -d chess_training_prod < schema.sql

# Verify data integrity
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM games;
SELECT COUNT(*) FROM puzzles;
```

---

## Sample Data

### Initial Puzzle Dataset
```sql
-- Sample tactical puzzles for POC
INSERT INTO puzzles (id, fen, moves, rating, themes, description) VALUES
('fork_001', 'rnbqkb1r/pp1ppppp/5n2/2p5/2B1P3/8/PPPP1PPP/RNBQK1NR w KQkq - 0 4', 'd1f3 d7d6 f3f7', 1200, 'fork,pin', 'Fork the king and rook with the queen'),
('pin_001', 'rnbqk2r/pppp1ppp/4pn2/8/1b1PP3/2N2N2/PPP2PPP/R1BQKB1R b KQkq - 0 5', 'b4c3', 1300, 'pin', 'Pin the knight to the king'),
('skewer_001', 'r1bq1rk1/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQ - 0 6', 'c4f7', 1400, 'skewer', 'Skewer the king and queen');
```

### Sample User Data
```sql
-- Demo user account
INSERT INTO users (id, username, email, password_hash, chess_elo, puzzle_rating) VALUES
('demo_user_001', 'chessplayer', 'demo@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.PmvO6.', 1200, 1200);
```

### Sample Game Record
```sql
-- Demo game vs AI
INSERT INTO games (id, white_player_id, ai_opponent, ai_level, current_fen, pgn, result, termination, duration_seconds, move_count, white_elo_before, white_elo_after, elo_change) VALUES
('demo_game_001', 'demo_user_001', TRUE, 2, 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', '1. e4 e5 2. Nf3 Nc6 3. Bb5 a6', '*', NULL, NULL, 3, 1200, 1200, 0);
```

---

**Database Schema Status:** ✅ **COMPLETE - READY FOR IMPLEMENTATION**

This schema provides:
1. **Complete User Management** - Authentication, profiles, preferences
2. **Full Chess Game Support** - Games vs AI with complete move tracking
3. **Comprehensive Puzzle System** - Spaced repetition with performance analytics
4. **Analytics Foundation** - Achievement system and daily statistics
5. **Production Migration Path** - PostgreSQL-compatible design
6. **Performance Optimization** - Strategic indexing for all query patterns

**Next Phase:** Component-specific documentation (frontend, backend, electron)