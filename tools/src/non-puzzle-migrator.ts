#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import * as fs from 'fs';
import * as path from 'path';

const program = new Command();

interface DataMigrationResult {
  fileName: string;
  dataType: string;
  itemCount: number;
  success: boolean;
  error?: string;
}

class NonPuzzleMigrator {
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

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  }

  private async extractDataFromFile(filePath: string): Promise<any[]> {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const extractedData: any[] = [];

    // Extract exported arrays and objects using regex
    const exportMatches = fileContent.match(/export const \w+.*?=\s*(\[[\s\S]*?\]|\{[\s\S]*?\});?/g) || [];
    
    for (const exportMatch of exportMatches) {
      try {
        // Extract the data part after the = sign
        const dataMatch = exportMatch.match(/=\s*(\[[\s\S]*?\]|\{[\s\S]*?\});?$/);
        if (!dataMatch) continue;

        let dataStr = dataMatch[1];
        
        // Simple cleanup for basic parsing
        dataStr = dataStr
          .replace(/'/g, '"')
          .replace(/(\w+):/g, '"$1":')
          .replace(/,(\s*[}\]])/g, '$1')
          .replace(/\s+/g, ' ')
          .trim();

        try {
          const parsedData = JSON.parse(dataStr);
          if (Array.isArray(parsedData)) {
            extractedData.push(...parsedData);
          } else {
            extractedData.push(parsedData);
          }
        } catch (parseError) {
          // If parsing fails, try to extract basic structure info
          const name = exportMatch.match(/export const (\w+)/)?.[1] || 'unknown';
          extractedData.push({
            _extractedName: name,
            _rawContent: exportMatch.substring(0, 100) + '...'
          });
        }
      } catch (error) {
        continue;
      }
    }

    return extractedData;
  }

  public async migrateSubscriptionData(): Promise<DataMigrationResult> {
    try {
      const filePath = path.join(this.frontendDataPath, 'subscriptionData.ts');
      if (!fs.existsSync(filePath)) {
        return { fileName: 'subscriptionData.ts', dataType: 'subscription', itemCount: 0, success: false, error: 'File not found' };
      }

      const extractedData = await this.extractDataFromFile(filePath);
      
      // For now, just log the extracted subscription data as reference
      console.log(`📊 Extracted ${extractedData.length} subscription-related items for future user table integration`);
      
      return {
        fileName: 'subscriptionData.ts',
        dataType: 'subscription',
        itemCount: extractedData.length,
        success: true
      };
    } catch (error) {
      return {
        fileName: 'subscriptionData.ts',
        dataType: 'subscription',
        itemCount: 0,
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  public async migrateUserPreferences(): Promise<DataMigrationResult[]> {
    const userFiles = [
      'userAnalysisPreferences.ts',
      'userPuzzlePreferences.ts', 
      'userSettings.ts',
      'userProfile.ts'
    ];
    
    const results: DataMigrationResult[] = [];

    for (const fileName of userFiles) {
      try {
        const filePath = path.join(this.frontendDataPath, fileName);
        if (!fs.existsSync(filePath)) {
          results.push({ fileName, dataType: 'user-preferences', itemCount: 0, success: false, error: 'File not found' });
          continue;
        }

        const extractedData = await this.extractDataFromFile(filePath);
        
        // For now, log the extracted data as templates for user preferences
        console.log(`👤 Extracted ${extractedData.length} user preference items from ${fileName}`);
        
        results.push({
          fileName,
          dataType: 'user-preferences',
          itemCount: extractedData.length,
          success: true
        });
      } catch (error) {
        results.push({
          fileName,
          dataType: 'user-preferences',
          itemCount: 0,
          success: false,
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }

    return results;
  }

  public async migrateConfigurationData(): Promise<DataMigrationResult[]> {
    const configFiles = [
      'boardControlsData.ts',
      'relatedTutorials.ts',
      'gameAnalysisConfig.ts',
      'puzzleConfigurations.ts'
    ];
    
    const results: DataMigrationResult[] = [];

    for (const fileName of configFiles) {
      try {
        const filePath = path.join(this.frontendDataPath, fileName);
        if (!fs.existsSync(filePath)) {
          results.push({ fileName, dataType: 'configuration', itemCount: 0, success: false, error: 'File not found' });
          continue;
        }

        const extractedData = await this.extractDataFromFile(filePath);
        
        // Configuration data typically stays in frontend, but we log it for reference
        console.log(`⚙️  Catalogued ${extractedData.length} configuration items from ${fileName} (kept in frontend)`);
        
        results.push({
          fileName,
          dataType: 'configuration',
          itemCount: extractedData.length,
          success: true
        });
      } catch (error) {
        results.push({
          fileName,
          dataType: 'configuration',
          itemCount: 0,
          success: false,
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }

    return results;
  }

  public async migrateProgressData(): Promise<DataMigrationResult> {
    try {
      const filePath = path.join(this.frontendDataPath, 'puzzleProgressStats.ts');
      if (!fs.existsSync(filePath)) {
        return { fileName: 'puzzleProgressStats.ts', dataType: 'progress', itemCount: 0, success: false, error: 'File not found' };
      }

      const extractedData = await this.extractDataFromFile(filePath);
      
      // Progress data provides templates for puzzle_attempts table structure
      console.log(`📈 Extracted ${extractedData.length} progress tracking templates for puzzle_attempts table`);
      
      return {
        fileName: 'puzzleProgressStats.ts',
        dataType: 'progress',
        itemCount: extractedData.length,
        success: true
      };
    } catch (error) {
      return {
        fileName: 'puzzleProgressStats.ts',
        dataType: 'progress',
        itemCount: 0,
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }
}

program
  .name('non-puzzle-migrator')
  .description('Migrate non-puzzle data (user preferences, subscriptions, etc.) from frontend')
  .version('1.0.0');

program
  .option('-d, --database <path>', 'Path to SQLite database', '../backend/database/chess_training.db')
  .option('-f, --frontend-data <path>', 'Path to frontend data directory', '../frontend/src/data')
  .option('-v, --verbose', 'Verbose logging');

program.action(async (options) => {
  try {
    console.log(chalk.blue.bold('📋 Non-Puzzle Data Migrator'));
    console.log(chalk.gray('Migrating user preferences, subscriptions, and configuration data...\\n'));

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
    const migrator = new NonPuzzleMigrator(frontendDataPath);
    await migrator.connect(databasePath);

    // Migrate different data types
    console.log(chalk.blue('💳 Processing subscription data...'));
    const subscriptionResult = await migrator.migrateSubscriptionData();

    console.log(chalk.blue('\\n👤 Processing user preference data...'));
    const userResults = await migrator.migrateUserPreferences();

    console.log(chalk.blue('\\n⚙️  Processing configuration data...'));
    const configResults = await migrator.migrateConfigurationData();

    console.log(chalk.blue('\\n📈 Processing progress tracking data...'));
    const progressResult = await migrator.migrateProgressData();

    await migrator.close();

    // Combine all results
    const allResults = [subscriptionResult, ...userResults, ...configResults, progressResult];
    const totalItems = allResults.reduce((sum, result) => sum + result.itemCount, 0);
    const successful = allResults.filter(r => r.success).length;
    const failed = allResults.filter(r => !r.success).length;

    const duration = Date.now() - startTime;
    console.log(chalk.green.bold(`\\n✅ Non-puzzle migration complete in ${duration}ms`));

    // Print summary
    console.log(chalk.blue('\\n📊 Migration Results:'));
    console.log(chalk.white(`  • Files processed: ${allResults.length}`));
    console.log(chalk.white(`  • Data items catalogued: ${totalItems}`));
    console.log(chalk.white(`  • Success rate: ${successful}/${allResults.length} files`));

    if (failed > 0) {
      console.log(chalk.red('\\n❌ Failed files:'));
      allResults.filter(r => !r.success).forEach(result => {
        console.log(chalk.red(`  • ${result.fileName}: ${result.error}`));
      });
    }

    console.log(chalk.blue('\\n📝 Data Categories Processed:'));
    const byType = allResults.reduce((acc, result) => {
      if (!acc[result.dataType]) acc[result.dataType] = { count: 0, items: 0 };
      acc[result.dataType].count++;
      acc[result.dataType].items += result.itemCount;
      return acc;
    }, {} as { [key: string]: { count: number, items: number } });

    Object.entries(byType).forEach(([type, stats]) => {
      console.log(chalk.white(`  • ${type}: ${stats.count} files, ${stats.items} items`));
    });

    console.log(chalk.yellow('\\n🔗 Next Steps:'));
    console.log(chalk.white('  • User preference data extracted as templates for user table integration'));
    console.log(chalk.white('  • Configuration data catalogued (remains in frontend)'));
    console.log(chalk.white('  • Progress templates provide schema for puzzle_attempts table'));
    console.log(chalk.white('  • Subscription data available for future user account features'));

  } catch (error) {
    console.error(chalk.red.bold('❌ Non-puzzle migration failed:'));
    console.error(chalk.red(error instanceof Error ? error.message : String(error)));
    process.exit(1);
  }
});

program.parse();