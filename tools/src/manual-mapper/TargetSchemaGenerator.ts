import { CHESS_TARGET_SCHEMA, TargetTable } from './ChessTargetSchema';
import { TargetMappingSummary } from './InterfaceMapper';
import * as fs from 'fs';
import * as path from 'path';

export class TargetSchemaGenerator {
  public generateTargetSchema(mappingSummary: TargetMappingSummary, outputDir: string): void {
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Generate SQL schema
    const sqlSchema = this.generateSQL();
    fs.writeFileSync(
      path.join(outputDir, 'chess-target-schema.sql'),
      sqlSchema,
      'utf8'
    );

    // Generate migration plan
    const migrationPlan = this.generateMigrationPlan(mappingSummary);
    fs.writeFileSync(
      path.join(outputDir, 'target-migration-plan.json'),
      JSON.stringify(migrationPlan, null, 2),
      'utf8'
    );

    // Generate API endpoints specification
    const apiSpec = this.generateAPISpecification();
    fs.writeFileSync(
      path.join(outputDir, 'chess-api-specification.md'),
      apiSpec,
      'utf8'
    );
  }

  private generateSQL(): string {
    const timestamp = new Date().toISOString();
    
    let sql = `-- Chess Training Application - Target Database Schema
-- Generated: ${timestamp}
-- Tables: ${CHESS_TARGET_SCHEMA.length}
-- Approach: Manual domain-driven design

-- Enable UUID extension (PostgreSQL)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable JSONB (PostgreSQL) / JSON (SQLite compatibility)
-- Note: JSONB is PostgreSQL-specific, use JSON for SQLite

`;

    for (const table of CHESS_TARGET_SCHEMA) {
      sql += this.generateTableSQL(table) + '\n\n';
    }

    // Add indexes
    sql += this.generateIndexes() + '\n\n';

    // Add constraints
    sql += this.generateConstraints() + '\n\n';

    return sql;
  }

  private generateTableSQL(table: TargetTable): string {
    let sql = `-- ${table.description}\nCREATE TABLE ${table.name} (\n`;
    
    // Generate columns
    const columnSQL = table.columns.map(col => {
      let line = `  ${col.name} ${col.type}`;
      
      if (!col.nullable) {
        line += ' NOT NULL';
      }
      
      // Add defaults for common columns
      if (col.name === 'id') {
        line += ' DEFAULT gen_random_uuid()'; // PostgreSQL
        // For SQLite: DEFAULT (lower(hex(randomblob(16))))
      } else if (col.name.includes('created_at')) {
        line += ' DEFAULT CURRENT_TIMESTAMP';
      } else if (col.name.includes('updated_at')) {
        line += ' DEFAULT CURRENT_TIMESTAMP';
      }
      
      return line;
    });
    
    sql += columnSQL.join(',\n');
    sql += ',\n  PRIMARY KEY (id)';
    sql += '\n);';
    
    // Add table comment
    sql += `\n-- ${table.description}`;
    sql += `\n-- Relationships: ${table.relationships.join(', ')}`;
    
    return sql;
  }

  private generateIndexes(): string {
    let sql = '-- Indexes for query optimization\n';
    
    const indexes = [
      'CREATE INDEX idx_users_email ON users (email);',
      'CREATE INDEX idx_users_username ON users (username);',
      'CREATE INDEX idx_users_last_login ON users (last_login);',
      'CREATE INDEX idx_games_user_id ON games (user_id);',
      'CREATE INDEX idx_games_created_at ON games (created_at);',
      'CREATE INDEX idx_games_result ON games (result);',
      'CREATE INDEX idx_puzzles_type ON puzzles (type);',
      'CREATE INDEX idx_puzzles_difficulty ON puzzles (difficulty);',
      'CREATE INDEX idx_puzzles_rating ON puzzles (rating);',
      'CREATE INDEX idx_puzzle_attempts_user_id ON puzzle_attempts (user_id);',
      'CREATE INDEX idx_puzzle_attempts_puzzle_id ON puzzle_attempts (puzzle_id);',
      'CREATE INDEX idx_puzzle_attempts_solved ON puzzle_attempts (solved);',
      'CREATE INDEX idx_puzzle_attempts_attempted_at ON puzzle_attempts (attempted_at);',
      'CREATE INDEX idx_user_achievements_user_id ON user_achievements (user_id);',
      'CREATE INDEX idx_user_achievements_achievement_id ON user_achievements (achievement_id);',
      'CREATE INDEX idx_user_sessions_user_id ON user_sessions (user_id);',
      'CREATE INDEX idx_user_sessions_expires_at ON user_sessions (expires_at);',
      'CREATE INDEX idx_opening_positions_eco_code ON opening_positions (eco_code);',
      'CREATE INDEX idx_user_stats_user_id ON user_stats (user_id);',
      'CREATE INDEX idx_user_stats_stat_date ON user_stats (stat_date);'
    ];
    
    return sql + indexes.join('\n') + '\n';
  }

  private generateConstraints(): string {
    let sql = '-- Foreign key constraints\n';
    
    const constraints = [
      'ALTER TABLE games ADD FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;',
      'ALTER TABLE puzzle_attempts ADD FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;',
      'ALTER TABLE puzzle_attempts ADD FOREIGN KEY (puzzle_id) REFERENCES puzzles(id) ON DELETE CASCADE;',
      'ALTER TABLE user_achievements ADD FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;',
      'ALTER TABLE user_achievements ADD FOREIGN KEY (achievement_id) REFERENCES achievements(id) ON DELETE CASCADE;',
      'ALTER TABLE user_sessions ADD FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;',
      'ALTER TABLE user_stats ADD FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;',
      '',
      '-- Unique constraints',
      'ALTER TABLE users ADD CONSTRAINT unique_email UNIQUE (email);',
      'ALTER TABLE users ADD CONSTRAINT unique_username UNIQUE (username);',
      'ALTER TABLE user_sessions ADD CONSTRAINT unique_refresh_token UNIQUE (refresh_token_hash);',
      'ALTER TABLE user_achievements ADD CONSTRAINT unique_user_achievement UNIQUE (user_id, achievement_id);',
      'ALTER TABLE user_stats ADD CONSTRAINT unique_user_date_stats UNIQUE (user_id, stat_date);',
      '',
      '-- Check constraints',
      'ALTER TABLE users ADD CONSTRAINT valid_chess_elo CHECK (chess_elo >= 400 AND chess_elo <= 3000);',
      'ALTER TABLE users ADD CONSTRAINT valid_puzzle_rating CHECK (puzzle_rating >= 400 AND puzzle_rating <= 3000);',
      'ALTER TABLE games ADD CONSTRAINT valid_result CHECK (result IN (\'win\', \'loss\', \'draw\'));',
      'ALTER TABLE games ADD CONSTRAINT valid_color CHECK (user_color IN (\'white\', \'black\'));',
      'ALTER TABLE puzzles ADD CONSTRAINT valid_difficulty CHECK (difficulty >= 1 AND difficulty <= 5);',
      'ALTER TABLE puzzles ADD CONSTRAINT valid_rating CHECK (rating >= 400 AND rating <= 3000);',
      'ALTER TABLE puzzles ADD CONSTRAINT valid_type CHECK (type IN (\'tactical\', \'endgame\', \'opening\'));',
      'ALTER TABLE puzzle_attempts ADD CONSTRAINT valid_time_taken CHECK (time_taken_seconds >= 0);',
      'ALTER TABLE puzzle_attempts ADD CONSTRAINT valid_hints CHECK (hints_used >= 0);',
      'ALTER TABLE user_sessions ADD CONSTRAINT valid_expiry CHECK (expires_at > created_at);'
    ];
    
    return sql + constraints.join('\n') + '\n';
  }

  private generateMigrationPlan(mappingSummary: TargetMappingSummary): any {
    return {
      overview: {
        totalInterfaces: mappingSummary.totalInterfaces,
        targetTables: CHESS_TARGET_SCHEMA.length,
        databaseEntities: mappingSummary.mappedToDatabase.length,
        reductionPercentage: Math.round((1 - CHESS_TARGET_SCHEMA.length / mappingSummary.totalInterfaces) * 100)
      },
      phases: [
        {
          phase: 1,
          name: 'User Management',
          tables: ['users', 'user_sessions'],
          priority: 'critical',
          estimatedTime: '1 day',
          mappedInterfaces: mappingSummary.targetTables
            .filter(t => ['users', 'user_sessions'].includes(t.tableName))
            .flatMap(t => t.mappedInterfaces)
        },
        {
          phase: 2,
          name: 'Core Gameplay',
          tables: ['games', 'puzzles'],
          priority: 'critical', 
          estimatedTime: '2 days',
          mappedInterfaces: mappingSummary.targetTables
            .filter(t => ['games', 'puzzles'].includes(t.tableName))
            .flatMap(t => t.mappedInterfaces)
        },
        {
          phase: 3,
          name: 'Progress Tracking',
          tables: ['puzzle_attempts', 'user_stats'],
          priority: 'high',
          estimatedTime: '1 day',
          mappedInterfaces: mappingSummary.targetTables
            .filter(t => ['puzzle_attempts', 'user_stats'].includes(t.tableName))
            .flatMap(t => t.mappedInterfaces)
        },
        {
          phase: 4,
          name: 'Achievements & Learning',
          tables: ['achievements', 'user_achievements', 'opening_positions'],
          priority: 'medium',
          estimatedTime: '2 days',
          mappedInterfaces: mappingSummary.targetTables
            .filter(t => ['achievements', 'user_achievements', 'opening_positions'].includes(t.tableName))
            .flatMap(t => t.mappedInterfaces)
        }
      ],
      dataMapping: {
        databaseEntities: mappingSummary.mappedToDatabase.map(m => ({
          interface: m.interface.name,
          targetTable: m.mappingResult?.targetTable,
          confidence: m.mappingResult?.confidence,
          filePath: m.interface.filePath
        }))
      },
      filteredOut: {
        uiConfig: mappingSummary.uiConfig.map(m => m.interface.name),
        mockData: mappingSummary.mockData.map(m => m.interface.name),
        utility: mappingSummary.utility.map(m => m.interface.name),
        unmapped: mappingSummary.unmapped.map(m => m.interface.name)
      }
    };
  }

  private generateAPISpecification(): string {
    return `# Chess Training API Specification

## Overview
RESTful API for ${CHESS_TARGET_SCHEMA.length} core database tables.

## Authentication Endpoints
\`\`\`
POST   /api/auth/register     # User registration
POST   /api/auth/login        # User login  
POST   /api/auth/refresh      # Refresh JWT token
POST   /api/auth/logout       # Logout (invalidate session)
DELETE /api/auth/account      # Delete user account
\`\`\`

## User Management
\`\`\`
GET    /api/users/profile     # Get user profile
PUT    /api/users/profile     # Update user profile  
GET    /api/users/preferences # Get user preferences
PUT    /api/users/preferences # Update user preferences
GET    /api/users/stats       # Get user statistics
\`\`\`

## Chess Games
\`\`\`
POST   /api/games             # Create new game
GET    /api/games             # List user's games
GET    /api/games/:id         # Get specific game
PUT    /api/games/:id         # Update game (save state)
DELETE /api/games/:id         # Delete game
POST   /api/games/:id/moves   # Add move to game
GET    /api/games/:id/analysis # Get game analysis
\`\`\`

## Puzzle System
\`\`\`
GET    /api/puzzles           # Get puzzles (filtered)
GET    /api/puzzles/:id       # Get specific puzzle
POST   /api/puzzles/:id/attempt # Submit puzzle attempt
GET    /api/puzzles/daily     # Get daily puzzle
GET    /api/puzzles/stats     # Get puzzle statistics
\`\`\`

## Progress & Achievements
\`\`\`
GET    /api/achievements      # List all achievements
GET    /api/achievements/earned # User's earned achievements
GET    /api/progress/overview # Progress dashboard data
GET    /api/progress/charts   # Progress chart data
GET    /api/stats/daily       # Daily statistics
\`\`\`

## Opening Database
\`\`\`
GET    /api/openings          # Browse openings
GET    /api/openings/:eco     # Get opening by ECO code
GET    /api/openings/search   # Search openings
POST   /api/repertoire        # Add to personal repertoire
GET    /api/repertoire        # Get personal repertoire
\`\`\`

## Query Parameters
- **Pagination**: \`?page=1&limit=20\`
- **Filtering**: \`?difficulty=3&theme=fork\`
- **Sorting**: \`?sort=rating&order=desc\`

## Response Format
\`\`\`json
{
  "success": true,
  "data": { ... },
  "pagination": {
    "page": 1,
    "limit": 20,  
    "total": 150
  }
}
\`\`\`

## Error Format
\`\`\`json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid puzzle difficulty",
    "details": { ... }
  }
}
\`\`\`

Total Endpoints: ~35
`;
  }
}