#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { SchemaConsolidator } from './consolidators/SchemaConsolidator';
import { SchemaAnalysisResult } from './types';
import * as fs from 'fs';
import * as path from 'path';

const program = new Command();

program
  .name('chess-schema-consolidator')
  .description('Consolidate and optimize chess training database schema')
  .version('1.0.0');

program
  .option('-i, --input <path>', 'Path to schema analysis JSON file', './output/schema-analysis-data.json')
  .option('-o, --output-dir <path>', 'Output directory for consolidated schema', './consolidated-output')
  .option('--filter-threshold <number>', 'Confidence threshold for database entities (0-100)', '70')
  .option('--consolidation-threshold <number>', 'Similarity threshold for consolidation (0-100)', '75')
  .option('-v, --verbose', 'Verbose logging');

program.action(async (options) => {
  try {
    console.log(chalk.blue.bold('🔧 Chess Schema Consolidator'));
    console.log(chalk.gray('Filtering, consolidating, and optimizing database schema...\\n'));

    const startTime = Date.now();

    // Load analysis data
    const inputPath = path.resolve(options.input);
    if (!fs.existsSync(inputPath)) {
      throw new Error(`Analysis file not found: ${inputPath}. Run the schema analyzer first.`);
    }

    if (options.verbose) {
      console.log(chalk.yellow(`📂 Loading analysis from: ${inputPath}`));
    }

    const analysisData: SchemaAnalysisResult = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
    
    if (options.verbose) {
      console.log(chalk.gray(`Loaded ${analysisData.totalInterfaces} interfaces from ${analysisData.fileCount} files\\n`));
    }

    // Initialize consolidator
    const consolidator = new SchemaConsolidator();

    // Run consolidation
    const summary = await consolidator.consolidateSchema(analysisData, {
      outputDir: path.resolve(options.outputDir),
      verbose: options.verbose || false,
      filterThreshold: parseInt(options.filterThreshold),
      consolidationThreshold: parseInt(options.consolidationThreshold)
    });

    const duration = Date.now() - startTime;
    
    console.log(chalk.green.bold(`\\n✅ Schema consolidation complete in ${duration}ms`));

    // Print summary
    console.log(chalk.blue('\\n📈 Consolidation Results:'));
    console.log(chalk.white(`  • Original interfaces: ${summary.originalInterfaces}`));
    console.log(chalk.white(`  • Database entities identified: ${summary.filteredDatabaseEntities}`));
    console.log(chalk.white(`  • After consolidation: ${summary.consolidatedEntities}`));
    console.log(chalk.white(`  • Final database tables: ${summary.finalTables}`));
    console.log(chalk.green(`  • Total reduction: ${summary.totalReduction} entities (${summary.reductionPercentage}%)`));

    console.log(chalk.blue('\\n📁 Generated Files:'));
    console.log(chalk.white(`  • entity-filtering-report.md`));
    console.log(chalk.white(`  • duplicate-consolidation-report.md`));
    console.log(chalk.white(`  • optimized-schema.sql`));
    console.log(chalk.white(`  • schema-consolidation-summary.md`));
    console.log(chalk.white(`  • consolidation-comparison.json`));

    console.log(chalk.yellow(`\\n🎯 Result: ${summary.originalInterfaces} interfaces → ${summary.finalTables} database tables`));

  } catch (error) {
    console.error(chalk.red.bold('❌ Consolidation failed:'));
    console.error(chalk.red(error instanceof Error ? error.message : String(error)));
    process.exit(1);
  }
});

program.parse();