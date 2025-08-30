#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import * as fs from 'fs';
import * as path from 'path';

const program = new Command();

interface PuzzleMigrationResult {
  fileName: string;
  puzzleCount: number;
  success: boolean;
  error?: string;
}

class ComprehensivePuzzleMigrator {
  private db: any;
  private frontendDataPath: string;
  
  constructor(frontendDataPath: string) {
    this.frontendDataPath = frontendDataPath;
  }

  public async connect(databasePath: string): Promise<void> {
    this.db = await open({
      filename: databasePath,
      driver: sqlite3.Database
    });
  }

  public async close(): Promise<void> {
    if (this.db) {
      await this.db.close();
    }
  }

  public async getPuzzleCount(): Promise<number> {
    const result = await this.db.get('SELECT COUNT(*) as count FROM puzzles');
    return result.count;
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  }

  public async findPuzzleFiles(): Promise<string[]> {
    const dataFiles = fs.readdirSync(this.frontendDataPath)
      .filter(file => file.endsWith('.ts'))
      .map(file => path.join(this.frontendDataPath, file));

    const puzzleFiles: string[] = [];

    for (const filePath of dataFiles) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        // Check if file contains puzzle-like data (fen positions and solutions)
        if (content.includes('fen:') && (content.includes('solution:') || content.includes('moves:'))) {
          puzzleFiles.push(filePath);
        }
      } catch (error) {
        // Skip files that can't be read
        continue;
      }
    }

    return puzzleFiles;
  }

  public async migratePuzzlesFromFile(filePath: string): Promise<PuzzleMigrationResult> {
    try {
      const fileName = path.basename(filePath);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      let migratedCount = 0;

      // Extract puzzle objects directly using regex
      const puzzleMatches = fileContent.match(/\{[\s\S]*?fen:[\s\S]*?\}/g);
      
      if (puzzleMatches) {
        for (const puzzleMatch of puzzleMatches) {
          try {
            // Extract key puzzle data using targeted regex
            const fenMatch = puzzleMatch.match(/fen:\s*['"]([^'"]+)['"]/);
            const solutionMatch = puzzleMatch.match(/solution:\s*\[([^\]]+)\]/);
            const ratingMatch = puzzleMatch.match(/rating:\s*(\d+)/);
            const descriptionMatch = puzzleMatch.match(/description:\s*['"]([^'"]+)['"]/);
            const titleMatch = puzzleMatch.match(/title:\s*['"]([^'"]+)['"]/);
            const themeMatch = puzzleMatch.match(/theme:\s*['"]([^'"]+)['"]/);
            const endgameTypeMatch = puzzleMatch.match(/endgameType:\s*['"]([^'"]+)['"]/);
            const openingMatch = puzzleMatch.match(/opening:\s*['"]([^'"]+)['"]/);

            // Only process if we have essential puzzle data
            if (fenMatch && solutionMatch) {
              const dbPuzzle = {
                id: this.generateId(),
                fen: fenMatch[1],
                solution_moves: JSON.stringify(solutionMatch[1].split(',').map(move => move.trim().replace(/['"]/g, ''))),
                themes: JSON.stringify([
                  themeMatch?.[1] || 
                  endgameTypeMatch?.[1] || 
                  openingMatch?.[1] || 
                  'tactics'
                ]),
                rating: ratingMatch ? parseInt(ratingMatch[1]) : 1200,
                description: descriptionMatch?.[1] || titleMatch?.[1] || ''
              };

              // Check if puzzle already exists
              const existing = await this.db.get(
                'SELECT id FROM puzzles WHERE fen = ? AND solution_moves = ?',
                [dbPuzzle.fen, dbPuzzle.solution_moves]
              );

              if (!existing) {
                await this.db.run(
                  `INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description) 
                   VALUES (?, ?, ?, ?, ?, ?)`,
                  [dbPuzzle.id, dbPuzzle.fen, dbPuzzle.solution_moves, dbPuzzle.themes, dbPuzzle.rating, dbPuzzle.description]
                );
                migratedCount++;
              }
            }
          } catch (error) {
            // Skip this puzzle object if parsing fails
            continue;
          }
        }
      }

      return {
        fileName,
        puzzleCount: migratedCount,
        success: true
      };
    } catch (error) {
      return {
        fileName: path.basename(filePath),
        puzzleCount: 0,
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  public async migrateAllPuzzles(): Promise<PuzzleMigrationResult[]> {
    const puzzleFiles = await this.findPuzzleFiles();
    const results: PuzzleMigrationResult[] = [];

    console.log(chalk.blue(`🔍 Found ${puzzleFiles.length} files with puzzle data:`));
    puzzleFiles.forEach(file => {
      console.log(chalk.gray(`  • ${path.basename(file)}`));
    });

    for (const filePath of puzzleFiles) {
      const result = await this.migratePuzzlesFromFile(filePath);
      results.push(result);

      if (result.success) {
        console.log(chalk.green(`✅ ${result.fileName}: ${result.puzzleCount} puzzles migrated`));
      } else {
        console.log(chalk.red(`❌ ${result.fileName}: Migration failed - ${result.error}`));
      }
    }

    return results;
  }
}

program
  .name('comprehensive-puzzle-migrator')
  .description('Migrate ALL puzzle data from frontend to database')
  .version('1.0.0');

program
  .option('-d, --database <path>', 'Path to SQLite database', '../backend/database/chess_training.db')
  .option('-f, --frontend-data <path>', 'Path to frontend data directory', '../frontend/src/data')
  .option('-v, --verbose', 'Verbose logging');

program.action(async (options) => {
  try {
    console.log(chalk.blue.bold('🚀 Comprehensive Puzzle Migrator'));
    console.log(chalk.gray('Finding and migrating ALL puzzle data from frontend...\\n'));

    const startTime = Date.now();

    const databasePath = path.resolve(options.database);
    const frontendDataPath = path.resolve(options.frontendData);

    if (!fs.existsSync(databasePath)) {
      throw new Error(`Database not found: ${databasePath}`);
    }

    if (!fs.existsSync(frontendDataPath)) {
      throw new Error(`Frontend data directory not found: ${frontendDataPath}`);
    }

    if (options.verbose) {
      console.log(chalk.yellow(`🗄️  Database: ${databasePath}`));
      console.log(chalk.yellow(`📂 Data directory: ${frontendDataPath}`));
    }

    // Initialize migrator
    const migrator = new ComprehensivePuzzleMigrator(frontendDataPath);
    await migrator.connect(databasePath);

    // Get initial puzzle count
    const initialCount = await migrator.getPuzzleCount();
    console.log(chalk.gray(`📊 Initial puzzle count: ${initialCount}`));

    // Migrate all puzzles
    const results = await migrator.migrateAllPuzzles();

    // Get final puzzle count
    const finalCount = await migrator.getPuzzleCount();
    const totalMigrated = results.reduce((sum, result) => sum + result.puzzleCount, 0);

    await migrator.close();

    const duration = Date.now() - startTime;
    console.log(chalk.green.bold(`\\n✅ Migration complete in ${duration}ms`));

    // Print summary
    console.log(chalk.blue('\\n🎯 Migration Results:'));
    console.log(chalk.white(`  • Files processed: ${results.length}`));
    console.log(chalk.white(`  • Puzzles migrated: ${totalMigrated}`));
    console.log(chalk.white(`  • Database puzzle count: ${initialCount} → ${finalCount}`));
    
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    console.log(chalk.white(`  • Success rate: ${successful}/${results.length} files`));

    if (failed > 0) {
      console.log(chalk.red('\\n❌ Failed files:'));
      results.filter(r => !r.success).forEach(result => {
        console.log(chalk.red(`  • ${result.fileName}: ${result.error}`));
      });
    }

    if (totalMigrated > 0) {
      console.log(chalk.green('\\n🎉 Successfully migrated puzzle data from all frontend files!'));
    } else {
      console.log(chalk.yellow('\\n⚠️  No new puzzles were migrated (may already exist in database)'));
    }

  } catch (error) {
    console.error(chalk.red.bold('❌ Comprehensive migration failed:'));
    console.error(chalk.red(error instanceof Error ? error.message : String(error)));
    process.exit(1);
  }
});

program.parse();