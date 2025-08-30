#!/usr/bin/env node

import { Database } from '../utils/database';

/**
 * Removes duplicate records from database tables
 * Keeps the first occurrence of each duplicate
 */
async function cleanupDuplicates() {
  try {
    console.log('🧹 Cleaning up duplicate records...');
    
    const db = Database.getInstance();
    await db.connect();

    // Clean puzzles (by FEN + solution_moves)
    console.log('🧩 Cleaning puzzle duplicates...');
    const puzzleDuplicates = await db.db.all(`
      SELECT fen, solution_moves, COUNT(*) as count 
      FROM puzzles 
      GROUP BY fen, solution_moves 
      HAVING COUNT(*) > 1
    `);
    
    for (const dup of puzzleDuplicates) {
      console.log(`  Removing ${dup.count - 1} duplicate puzzles for: ${dup.fen.substring(0, 20)}...`);
      await db.db.run(`
        DELETE FROM puzzles 
        WHERE id NOT IN (
          SELECT MIN(id) FROM puzzles 
          WHERE fen = ? AND solution_moves = ?
        ) AND fen = ? AND solution_moves = ?
      `, [dup.fen, dup.solution_moves, dup.fen, dup.solution_moves]);
    }

    // Clean AI opponents (by name)
    console.log('🤖 Cleaning AI opponent duplicates...');
    await db.db.run(`
      DELETE FROM ai_opponents 
      WHERE id NOT IN (
        SELECT MIN(id) FROM ai_opponents 
        GROUP BY name
      )
    `);

    // Clean tutorials (by title)  
    console.log('📚 Cleaning tutorial duplicates...');
    await db.db.run(`
      DELETE FROM tutorials 
      WHERE id NOT IN (
        SELECT MIN(id) FROM tutorials 
        GROUP BY title
      )
    `);

    // Clean achievements (by name)
    console.log('🏆 Cleaning achievement duplicates...');
    await db.db.run(`
      DELETE FROM achievements 
      WHERE id NOT IN (
        SELECT MIN(id) FROM achievements 
        GROUP BY name
      )
    `);

    // Clean openings (by name + eco_code)
    console.log('♟️  Cleaning opening duplicates...');
    await db.db.run(`
      DELETE FROM openings 
      WHERE id NOT IN (
        SELECT MIN(id) FROM openings 
        GROUP BY name, COALESCE(eco_code, '')
      )
    `);

    // Clean learning paths (by name)
    console.log('📖 Cleaning learning path duplicates...');
    await db.db.run(`
      DELETE FROM learning_paths 
      WHERE id NOT IN (
        SELECT MIN(id) FROM learning_paths 
        GROUP BY name
      )
    `);

    // Clean help content (by title)
    console.log('❓ Cleaning help content duplicates...');
    await db.db.run(`
      DELETE FROM help_content 
      WHERE id NOT IN (
        SELECT MIN(id) FROM help_content 
        GROUP BY title
      )
    `);

    // Clean puzzle sources (by source_id)
    console.log('🎯 Cleaning puzzle source duplicates...');
    await db.db.run(`
      DELETE FROM puzzle_sources 
      WHERE id NOT IN (
        SELECT MIN(id) FROM puzzle_sources 
        GROUP BY source_id
      )
    `);

    // Show final counts
    console.log('\n📊 Final record counts:');
    const tables = ['puzzles', 'ai_opponents', 'tutorials', 'achievements', 'openings', 'learning_paths', 'help_content', 'puzzle_sources'];
    
    for (const table of tables) {
      const count = await db.db.get(`SELECT COUNT(*) as count FROM ${table}`);
      console.log(`  ${table}: ${count.count} records`);
    }

    await db.close();

    console.log('\n✅ Duplicate cleanup complete!');
    console.log('💡 Run "npm run backup-database" to create a clean backup');

  } catch (error) {
    console.error('❌ Cleanup failed:', error);
    process.exit(1);
  }
}

// Run cleanup if called directly
if (require.main === module) {
  cleanupDuplicates();
}

export { cleanupDuplicates };