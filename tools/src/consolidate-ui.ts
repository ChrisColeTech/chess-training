#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { UIConfigConsolidator } from './ui-consolidator/UIConfigConsolidator';
import { InterfaceMapper } from './manual-mapper/InterfaceMapper';
import { SchemaAnalysisResult } from './types';
import * as fs from 'fs';
import * as path from 'path';

const program = new Command();

program
  .name('chess-ui-consolidator')
  .description('Consolidate and organize UI configuration interfaces')
  .version('1.0.0');

program
  .option('-i, --input <path>', 'Path to schema analysis JSON file', './output/schema-analysis-data.json')
  .option('-o, --output-dir <path>', 'Output directory for consolidated UI files', './frontend/src/config')
  .option('-r, --report-dir <path>', 'Directory for consolidation reports', './ui-consolidation-output')
  .option('-v, --verbose', 'Verbose logging');

program.action(async (options) => {
  try {
    console.log(chalk.blue.bold('🎨 Chess UI Configuration Consolidator'));
    console.log(chalk.gray('Consolidating and organizing UI interface duplicates...\\n'));

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
    
    // Get UI interfaces from the mapping
    const mapper = new InterfaceMapper();
    const mappingSummary = mapper.mapInterfaces(analysisData);
    const uiInterfaces = mappingSummary.uiConfig.map(m => m.interface);

    if (options.verbose) {
      console.log(chalk.gray(`Found ${uiInterfaces.length} UI configuration interfaces`));
      console.log(chalk.yellow('🔍 Phase 1: Categorizing UI interfaces...'));
    }

    // Initialize consolidator
    const consolidator = new UIConfigConsolidator();

    // Consolidate UI interfaces
    const consolidationResult = consolidator.consolidateUIInterfaces(
      uiInterfaces,
      path.resolve(options.outputDir)
    );

    if (options.verbose) {
      console.log(chalk.gray(`  Created ${consolidationResult.finalUIFiles} consolidated UI files`));
      console.log(chalk.gray(`  Reduced from ${consolidationResult.originalUIInterfaces} → ${consolidationResult.finalUIFiles} files`));
      console.log(chalk.yellow('📝 Phase 2: Generating consolidated files...'));
    }

    // Write consolidated files
    await consolidator.writeConsolidatedFiles(consolidationResult);

    if (options.verbose) {
      console.log(chalk.yellow('📊 Phase 3: Generating consolidation report...'));
    }

    // Generate consolidation report
    const reportDir = path.resolve(options.reportDir);
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    const consolidationReport = consolidator.generateConsolidationReport(consolidationResult);
    fs.writeFileSync(
      path.join(reportDir, 'ui-consolidation-report.md'),
      consolidationReport,
      'utf8'
    );

    // Generate detailed mapping JSON
    const detailedMapping = {
      summary: {
        originalInterfaces: consolidationResult.originalUIInterfaces,
        consolidatedGroups: consolidationResult.finalUIFiles,
        reductionPercentage: consolidationResult.reductionPercentage
      },
      groups: consolidationResult.consolidatedGroups.map(group => ({
        category: group.category,
        outputFile: group.outputFile,
        interfaceCount: group.interfaces.length,
        interfaces: group.interfaces.map(iface => ({
          name: iface.name,
          sourceFile: iface.filePath,
          propertyCount: iface.properties.length
        }))
      }))
    };

    fs.writeFileSync(
      path.join(reportDir, 'ui-consolidation-mapping.json'),
      JSON.stringify(detailedMapping, null, 2),
      'utf8'
    );

    const duration = Date.now() - startTime;
    console.log(chalk.green.bold(`\\n✅ UI consolidation complete in ${duration}ms`));

    // Print summary
    console.log(chalk.blue('\\n🎨 UI Consolidation Results:'));
    console.log(chalk.white(`  • Original UI interfaces: ${consolidationResult.originalUIInterfaces}`));
    console.log(chalk.white(`  • Consolidated groups: ${consolidationResult.consolidatedGroups.length}`));
    console.log(chalk.white(`  • Final UI files: ${consolidationResult.finalUIFiles}`));
    console.log(chalk.green(`  • File reduction: ${consolidationResult.reductionPercentage}%`));

    console.log(chalk.blue('\\n📁 Generated Consolidated Files:'));
    consolidationResult.consolidatedGroups.forEach(group => {
      console.log(chalk.white(`  • ${group.outputFile} (${group.interfaces.length} interfaces)`));
    });

    console.log(chalk.blue('\\n📊 Generated Reports:'));
    console.log(chalk.white(`  • ui-consolidation-report.md`));
    console.log(chalk.white(`  • ui-consolidation-mapping.json`));

    console.log(chalk.yellow(`\\n🚀 Result: ${consolidationResult.originalUIInterfaces} UI interfaces → ${consolidationResult.finalUIFiles} organized files`));

  } catch (error) {
    console.error(chalk.red.bold('❌ UI consolidation failed:'));
    console.error(chalk.red(error instanceof Error ? error.message : String(error)));
    process.exit(1);
  }
});

program.parse();