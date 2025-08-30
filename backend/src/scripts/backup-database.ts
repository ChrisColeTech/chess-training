#!/usr/bin/env node

import { Database } from '../utils/database';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Creates a backup of the fully populated database as SQL dump
 * This can be used to quickly restore the database to a known good state
 */
async function backupDatabase() {
  try {
    console.log('🗄️  Creating database backup...');
    
    const db = Database.getInstance();
    await db.connect();

    // Get all table names
    const tables = await db.db.all(`
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name NOT LIKE 'sqlite_%'
      ORDER BY name
    `);

    console.log(`📊 Found ${tables.length} tables to backup`);

    let backupSql = '-- Chess Training Database Backup\n';
    backupSql += `-- Created: ${new Date().toISOString()}\n`;
    backupSql += '-- This file contains the complete database schema and data\n\n';

    // Add foreign key constraints
    backupSql += 'PRAGMA foreign_keys = ON;\n\n';

    for (const table of tables) {
      const tableName = table.name;
      console.log(`📋 Backing up table: ${tableName}`);

      // Get table schema
      const schema = await db.db.get(`
        SELECT sql FROM sqlite_master 
        WHERE type='table' AND name=?
      `, [tableName]);

      if (schema && schema.sql) {
        backupSql += `-- Table: ${tableName}\n`;
        backupSql += `DROP TABLE IF EXISTS ${tableName};\n`;
        backupSql += `${schema.sql};\n\n`;
      }

      // Get table data
      const rows = await db.db.all(`SELECT * FROM ${tableName}`);
      
      if (rows.length > 0) {
        backupSql += `-- Data for ${tableName} (${rows.length} records)\n`;
        
        // Get column names
        const columns = Object.keys(rows[0]);
        const columnList = columns.join(', ');
        
        for (const row of rows) {
          const values = columns.map(col => {
            const value = row[col];
            if (value === null) return 'NULL';
            if (typeof value === 'string') {
              // Escape single quotes in strings
              return `'${value.replace(/'/g, "''")}'`;
            }
            return value;
          });
          
          backupSql += `INSERT INTO ${tableName} (${columnList}) VALUES (${values.join(', ')});\n`;
        }
        backupSql += '\n';
      } else {
        backupSql += `-- No data in ${tableName}\n\n`;
      }
    }

    // Add indexes
    const indexes = await db.db.all(`
      SELECT sql FROM sqlite_master 
      WHERE type='index' AND name NOT LIKE 'sqlite_%' AND sql IS NOT NULL
    `);

    if (indexes.length > 0) {
      backupSql += '-- Indexes\n';
      for (const index of indexes) {
        backupSql += `${index.sql};\n`;
      }
      backupSql += '\n';
    }

    // Write backup file
    const backupPath = path.join(__dirname, '../../database/chess_training_backup.sql');
    fs.writeFileSync(backupPath, backupSql);

    await db.close();

    const stats = fs.statSync(backupPath);
    console.log(`✅ Database backup created successfully!`);
    console.log(`📁 File: ${backupPath}`);
    console.log(`📏 Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`📊 Tables: ${tables.length}`);

    // Count total records by summing up from the existing data
    let totalRecords = 0;
    for (const table of tables) {
      const count = await db.db.get(`SELECT COUNT(*) as count FROM ${table.name}`);
      totalRecords += count.count;
    }

    console.log(`🎯 Total records: ${totalRecords}`);
    console.log('\n💡 To restore this backup, run: npm run restore-database');

  } catch (error) {
    console.error('❌ Backup failed:', error);
    process.exit(1);
  }
}

// Run backup if called directly
if (require.main === module) {
  backupDatabase();
}

export { backupDatabase };