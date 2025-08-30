#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { InterfaceMapper } from './manual-mapper/InterfaceMapper';
import { TargetSchemaGenerator } from './manual-mapper/TargetSchemaGenerator';
import { CHESS_TARGET_SCHEMA } from './manual-mapper/ChessTargetSchema';
import { SchemaAnalysisResult } from './types';
import * as fs from 'fs';
import * as path from 'path';

const program = new Command();

program
  .name('chess-target-mapper')
  .description('Map frontend interfaces to target chess training database schema')
  .version('1.0.0');

program
  .option('-i, --input <path>', 'Path to schema analysis JSON file', './output/schema-analysis-data.json')
  .option('-o, --output-dir <path>', 'Output directory for target schema', './target-output')
  .option('-v, --verbose', 'Verbose logging');

program.action(async (options) => {
  try {
    console.log(chalk.blue.bold('🎯 Chess Target Schema Mapper'));
    console.log(chalk.gray('Mapping frontend interfaces to optimized database schema...\\n'));

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
      console.log(chalk.gray(`Loaded ${analysisData.totalInterfaces} interfaces from ${analysisData.fileCount} files`));
      console.log(chalk.yellow(`🎯 Target schema: ${CHESS_TARGET_SCHEMA.length} tables defined\\n`));
    }

    // Initialize mapper
    const mapper = new InterfaceMapper();

    if (options.verbose) {
      console.log(chalk.yellow('🔍 Phase 1: Categorizing interfaces...'));
    }

    // Map interfaces to target schema
    const mappingSummary = mapper.mapInterfaces(analysisData);

    if (options.verbose) {
      console.log(chalk.gray(`  Database entities: ${mappingSummary.mappedToDatabase.length}`));
      console.log(chalk.gray(`  UI config: ${mappingSummary.uiConfig.length}`));
      console.log(chalk.gray(`  Mock data: ${mappingSummary.mockData.length}`));
      console.log(chalk.gray(`  Utility types: ${mappingSummary.utility.length}`));
      console.log(chalk.gray(`  Unmapped: ${mappingSummary.unmapped.length}`));
    }

    if (options.verbose) {
      console.log(chalk.yellow('🏗️ Phase 2: Generating target schema...'));
    }

    // Generate target schema and reports
    const generator = new TargetSchemaGenerator();
    generator.generateTargetSchema(mappingSummary, path.resolve(options.outputDir));

    if (options.verbose) {
      console.log(chalk.yellow('📝 Phase 3: Generating reports...'));
    }

    // Generate mapping report
    const mappingReport = mapper.generateMappingReport(mappingSummary);
    fs.writeFileSync(
      path.join(path.resolve(options.outputDir), 'interface-mapping-report.md'),
      mappingReport,
      'utf8'
    );

    const duration = Date.now() - startTime;
    console.log(chalk.green.bold(`\\n✅ Target mapping complete in ${duration}ms`));

    // Print summary
    console.log(chalk.blue('\\n🎯 Target Schema Results:'));
    console.log(chalk.white(`  • Original interfaces: ${mappingSummary.totalInterfaces}`));
    console.log(chalk.white(`  • Target database tables: ${CHESS_TARGET_SCHEMA.length}`));
    console.log(chalk.white(`  • Database entities mapped: ${mappingSummary.mappedToDatabase.length}`));
    console.log(chalk.white(`  • UI config filtered: ${mappingSummary.uiConfig.length}`));
    console.log(chalk.white(`  • Mock data filtered: ${mappingSummary.mockData.length}`));
    console.log(chalk.green(`  • Schema reduction: ${Math.round((1 - CHESS_TARGET_SCHEMA.length / mappingSummary.totalInterfaces) * 100)}%`));

    console.log(chalk.blue('\\n📁 Generated Files:'));
    console.log(chalk.white(`  • chess-target-schema.sql`));
    console.log(chalk.white(`  • target-migration-plan.json`));
    console.log(chalk.white(`  • chess-api-specification.md`));
    console.log(chalk.white(`  • interface-mapping-report.md`));

    console.log(chalk.blue('\\n📊 Target Table Coverage:'));
    mappingSummary.targetTables.forEach(table => {
      const coverageColor = table.coverage >= 70 ? 'green' : table.coverage >= 40 ? 'yellow' : 'red';
      console.log(chalk.white(`  • ${table.tableName}: `) + chalk[coverageColor](`${table.coverage}% coverage (${table.mappedInterfaces.length} interfaces)`));
    });

    console.log(chalk.yellow(`\\n🚀 Result: ${mappingSummary.totalInterfaces} interfaces → ${CHESS_TARGET_SCHEMA.length} focused database tables`));

  } catch (error) {
    console.error(chalk.red.bold('❌ Target mapping failed:'));
    console.error(chalk.red(error instanceof Error ? error.message : String(error)));
    process.exit(1);
  }
});

program.parse();