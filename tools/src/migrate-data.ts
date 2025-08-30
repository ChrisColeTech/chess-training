#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { DataMigrator } from './migrator/DataMigrator';
import { InterfaceMapper } from './manual-mapper/InterfaceMapper';
import { SchemaAnalysisResult } from './types';
import * as fs from 'fs';
import * as path from 'path';

const program = new Command();

program
  .name('chess-data-migrator')
  .description('Migrate frontend data to database')
  .version('1.0.0');

program
  .option('-i, --input <path>', 'Path to data-only analysis JSON file', './data-only-output/schema-analysis-data.json')
  .option('-d, --database <path>', 'Path to SQLite database', '../backend/database/chess_training.db')
  .option('-f, --frontend-data <path>', 'Path to frontend data directory', '../frontend/src/data')
  .option('-o, --output-dir <path>', 'Output directory for migration reports', './migration-output')
  .option('--dry-run', 'Analyze migration plan without executing')
  .option('-v, --verbose', 'Verbose logging');

program.action(async (options) => {
  try {
    console.log(chalk.blue.bold('🚚 Chess Data Migrator'));
    console.log(chalk.gray('Migrating frontend data to database...\\n'));

    const startTime = Date.now();

    // Load data-only analysis
    const inputPath = path.resolve(options.input);
    if (!fs.existsSync(inputPath)) {
      throw new Error(`Analysis file not found: ${inputPath}. Run data-only analysis first.`);
    }

    const databasePath = path.resolve(options.database);
    if (!fs.existsSync(databasePath)) {
      throw new Error(`Database not found: ${databasePath}. Ensure backend is set up.`);
    }

    if (options.verbose) {
      console.log(chalk.yellow(`📂 Loading analysis from: ${inputPath}`));
      console.log(chalk.yellow(`🗄️  Database: ${databasePath}`));
    }

    const analysisData: SchemaAnalysisResult = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
    
    // Get database entities to migrate
    const mapper = new InterfaceMapper();
    const mappingSummary = mapper.mapInterfaces(analysisData);
    const databaseEntities = mappingSummary.mappedToDatabase.map(m => m.interface);

    if (options.verbose) {
      console.log(chalk.gray(`Found ${databaseEntities.length} database entities to migrate`));
      console.log(chalk.yellow('🔍 Phase 1: Creating migration plan...'));
    }

    // Initialize migrator
    const migrator = new DataMigrator(path.resolve(options.frontendData), databasePath);
    await migrator.connect(databasePath);

    // Create migration plan
    const migrationPlans = await migrator.analyzeMigrationPlan(databaseEntities);

    if (options.verbose) {
      console.log(chalk.gray(`Created ${migrationPlans.length} migration plans`));
      
      // Show migration plan summary
      console.log(chalk.yellow('\\n📋 Migration Plan:'));
      migrationPlans.forEach((plan, index) => {
        console.log(chalk.white(`  ${index + 1}. ${plan.sourceInterface} (${plan.sourceFile}) → ${plan.targetTable}`));
      });
    }

    let migrationResult;

    if (options.dryRun) {
      console.log(chalk.yellow('\\n🧪 Dry run - No data will be migrated'));
      migrationResult = {
        totalMigrations: migrationPlans.length,
        successfulMigrations: 0,
        failedMigrations: 0,
        migrationPlans,
        errors: []
      };
    } else {
      if (options.verbose) {
        console.log(chalk.yellow('\\n🚚 Phase 2: Executing migration...'));
      }

      // Execute migration
      migrationResult = await migrator.executeMigration(migrationPlans);

      if (options.verbose) {
        console.log(chalk.gray(`Migration completed: ${migrationResult.successfulMigrations}/${migrationResult.totalMigrations} successful`));
      }
    }

    if (options.verbose) {
      console.log(chalk.yellow('📊 Phase 3: Generating migration report...'));
    }

    // Generate migration report
    const outputDir = path.resolve(options.outputDir);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const migrationReport = migrator.generateMigrationReport(migrationResult);
    fs.writeFileSync(
      path.join(outputDir, 'database-migration-report.md'),
      migrationReport,
      'utf8'
    );

    // Generate migration summary JSON
    const migrationSummary = {
      timestamp: new Date().toISOString(),
      dryRun: options.dryRun || false,
      summary: {
        totalEntities: databaseEntities.length,
        totalMigrations: migrationResult.totalMigrations,
        successful: migrationResult.successfulMigrations,
        failed: migrationResult.failedMigrations,
        successRate: Math.round((migrationResult.successfulMigrations / migrationResult.totalMigrations) * 100)
      },
      plans: migrationResult.migrationPlans,
      errors: migrationResult.errors
    };

    fs.writeFileSync(
      path.join(outputDir, 'migration-summary.json'),
      JSON.stringify(migrationSummary, null, 2),
      'utf8'
    );

    await migrator.close();

    const duration = Date.now() - startTime;
    console.log(chalk.green.bold(`\\n✅ Migration ${options.dryRun ? 'analysis' : 'execution'} complete in ${duration}ms`));

    // Print summary
    console.log(chalk.blue('\\n🚚 Migration Results:'));
    console.log(chalk.white(`  • Database entities analyzed: ${databaseEntities.length}`));
    console.log(chalk.white(`  • Migration plans created: ${migrationResult.totalMigrations}`));
    if (!options.dryRun) {
      console.log(chalk.white(`  • Successful migrations: ${migrationResult.successfulMigrations}`));
      console.log(chalk.white(`  • Failed migrations: ${migrationResult.failedMigrations}`));
    }

    console.log(chalk.blue('\\n📁 Generated Reports:'));
    console.log(chalk.white(`  • database-migration-report.md`));
    console.log(chalk.white(`  • migration-summary.json`));

    if (migrationResult.errors.length > 0) {
      console.log(chalk.red('\\n❌ Errors:'));
      migrationResult.errors.forEach(error => {
        console.log(chalk.red(`  • ${error}`));
      });
    }

    if (!options.dryRun && migrationResult.successfulMigrations > 0) {
      console.log(chalk.green('\\n🎉 Data successfully migrated to database!'));
      console.log(chalk.yellow('Next steps:'));
      console.log(chalk.white('  • Test backend APIs with migrated data'));
      console.log(chalk.white('  • Update frontend to use database APIs'));
      console.log(chalk.white('  • Remove mock data files after verification'));
    }

  } catch (error) {
    console.error(chalk.red.bold('❌ Data migration failed:'));
    console.error(chalk.red(error instanceof Error ? error.message : String(error)));
    process.exit(1);
  }
});

program.parse();