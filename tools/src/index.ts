#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { SchemaAnalyzer } from './analyzers/SchemaAnalyzer';
import { ReportGenerator } from './generators/ReportGenerator';
import { SqlSchemaGenerator } from './generators/SqlSchemaGenerator';
import path from 'path';

const program = new Command();

program
  .name('chess-schema-analyzer')
  .description('Analyze TypeScript interfaces and generate database schema for chess training app')
  .version('1.0.0');

program
  .option('-d, --data-dir <path>', 'Path to data directory', '../frontend/src/data')
  .option('-t, --types-dir <path>', 'Path to types directory', '../frontend/src/types')
  .option('-o, --output-dir <path>', 'Output directory for generated files', './output')
  .option('--domain <domain>', 'Analyze specific domain only')
  .option('--sql-only', 'Generate only SQL schema')
  .option('--report-only', 'Generate only analysis report')
  .option('--dry-run', 'Dry run without generating files')
  .option('-v, --verbose', 'Verbose logging');

program.action(async (options) => {
  try {
    console.log(chalk.blue.bold('🔍 Chess Training Schema Analyzer'));
    console.log(chalk.gray('Analyzing TypeScript interfaces and generating database schema...\\n'));

    const startTime = Date.now();

    // Initialize analyzer
    const analyzer = new SchemaAnalyzer({
      dataDir: path.resolve(process.cwd(), options.dataDir),
      typesDir: path.resolve(process.cwd(), options.typesDir),
      outputDir: path.resolve(process.cwd(), options.outputDir),
      domain: options.domain,
      verbose: options.verbose || false
    });

    // Run analysis
    console.log(chalk.yellow('📊 Analyzing interfaces...'));
    const analysis = await analyzer.analyze();

    if (options.verbose) {
      console.log(chalk.gray(`Found ${analysis.totalInterfaces} interfaces across ${analysis.fileCount} files`));
      console.log(chalk.gray(`Identified ${analysis.duplicates.length} potential duplicates`));
      console.log(chalk.gray(`Organized into ${Object.keys(analysis.domains).length} domains\\n`));
    }

    if (!options.dryRun) {
      // Generate outputs
      const reportGen = new ReportGenerator();
      const sqlGen = new SqlSchemaGenerator();

      if (!options.sqlOnly) {
        console.log(chalk.yellow('📝 Generating analysis report...'));
        await reportGen.generate(analysis, options.outputDir);
      }

      if (!options.reportOnly) {
        console.log(chalk.yellow('🗃️  Generating SQL schema...'));
        await sqlGen.generate(analysis, options.outputDir);
      }
    }

    const duration = Date.now() - startTime;
    console.log(chalk.green.bold(`\\n✅ Analysis complete in ${duration}ms`));

    // Summary
    console.log(chalk.blue('\\n📈 Summary:'));
    console.log(chalk.white(`  • Interfaces analyzed: ${analysis.totalInterfaces}`));
    console.log(chalk.white(`  • Files processed: ${analysis.fileCount}`));
    console.log(chalk.white(`  • Duplicates found: ${analysis.duplicates.length}`));
    console.log(chalk.white(`  • Domains identified: ${Object.keys(analysis.domains).length}`));
    console.log(chalk.white(`  • Estimated tables: ${analysis.estimatedTables}`));

  } catch (error) {
    console.error(chalk.red.bold('❌ Analysis failed:'));
    console.error(chalk.red(error instanceof Error ? error.message : String(error)));
    process.exit(1);
  }
});

program.parse();