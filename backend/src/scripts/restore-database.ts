#!/usr/bin/env node

import { Database } from '../utils/database';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Restores the database from a backup SQL file
 * Much faster than re-running the full migration tools
 */
async function restoreDatabase() {
  try {
    console.log('🔄 Restoring database from backup...');
    
    const backupPath = path.join(__dirname, '../../database/chess_training_backup.sql');
    
    if (!fs.existsSync(backupPath)) {
      console.error('❌ Backup file not found:', backupPath);
      console.log('💡 Create a backup first by running: npm run backup-database');
      process.exit(1);
    }

    const backupSql = fs.readFileSync(backupPath, 'utf8');
    const stats = fs.statSync(backupPath);
    
    console.log(`📁 Backup file: ${backupPath}`);
    console.log(`📏 Backup size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`📅 Backup date: ${stats.mtime.toISOString()}`);

    const db = Database.getInstance();
    await db.connect();

    // Execute the backup SQL
    console.log('⚡ Executing SQL restore...');
    await db.db.exec(backupSql);

    // Verify restoration
    const tables = await db.db.all(`
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name NOT LIKE 'sqlite_%'
      ORDER BY name
    `);

    console.log(`✅ Database restored successfully!`);
    console.log(`📊 Tables restored: ${tables.length}`);

    // Show table counts
    console.log('\n📊 Table record counts:');
    for (const table of tables) {
      const count = await db.db.get(`SELECT COUNT(*) as count FROM ${table.name}`);
      console.log(`  ${table.name}: ${count.count} records`);
    }

    await db.close();

    console.log('\n🎉 Database restoration complete!');
    console.log('💡 Your chess training app now has all the comprehensive data restored.');

  } catch (error) {
    console.error('❌ Restore failed:', error);
    process.exit(1);
  }
}

// Run restore if called directly
if (require.main === module) {
  restoreDatabase();
}

export { restoreDatabase };