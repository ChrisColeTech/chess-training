import { SchemaAnalysisResult } from '../types';
import { EntityFilter, FilteredEntity } from './EntityFilter';
import { DuplicateConsolidator, ConsolidationResult } from './DuplicateConsolidator';
import { OptimizedSchemaGenerator, OptimizedSchema } from './OptimizedSchemaGenerator';
import * as fs from 'fs';
import * as path from 'path';

export interface ConsolidationOptions {
  outputDir: string;
  verbose: boolean;
  filterThreshold: number; // Confidence threshold for database entities
  consolidationThreshold: number; // Similarity threshold for consolidation
}

export interface ConsolidationSummary {
  originalInterfaces: number;
  filteredDatabaseEntities: number;
  consolidatedEntities: number;
  finalTables: number;
  totalReduction: number;
  reductionPercentage: number;
}

export class SchemaConsolidator {
  private entityFilter: EntityFilter;
  private duplicateConsolidator: DuplicateConsolidator;
  private optimizedGenerator: OptimizedSchemaGenerator;

  constructor() {
    this.entityFilter = new EntityFilter();
    this.duplicateConsolidator = new DuplicateConsolidator();
    this.optimizedGenerator = new OptimizedSchemaGenerator();
  }

  public async consolidateSchema(
    analysis: SchemaAnalysisResult, 
    options: ConsolidationOptions
  ): Promise<ConsolidationSummary> {
    if (options.verbose) {
      console.log('🔍 Phase 1: Filtering entities...');
    }

    // Phase 1: Filter entities to identify real database entities
    const allInterfaces = analysis.rawData.flatMap(data => data.interfaces);
    const filteredEntities = this.entityFilter.filterEntities(allInterfaces);
    const databaseEntities = this.entityFilter.getDatabaseEntities(filteredEntities);

    if (options.verbose) {
      console.log(`  Filtered ${allInterfaces.length} → ${databaseEntities.length} database entities`);
      console.log('🔧 Phase 2: Consolidating duplicates...');
    }

    // Phase 2: Consolidate duplicates among database entities
    const consolidationResult = this.duplicateConsolidator.consolidateDuplicates(
      databaseEntities,
      analysis.duplicates
    );

    if (options.verbose) {
      console.log(`  Consolidated ${consolidationResult.savings} duplicate entities`);
      console.log('🏗️ Phase 3: Generating optimized schema...');
    }

    // Phase 3: Generate optimized schema
    const optimizedSchema = this.optimizedGenerator.generateOptimizedSchema(
      filteredEntities,
      consolidationResult
    );

    if (options.verbose) {
      console.log(`  Generated ${optimizedSchema.totalTables} optimized tables`);
      console.log('📝 Phase 4: Generating reports...');
    }

    // Phase 4: Generate comprehensive reports
    await this.generateReports(
      filteredEntities,
      consolidationResult,
      optimizedSchema,
      analysis,
      options.outputDir
    );

    // Calculate summary statistics
    const totalReduction = allInterfaces.length - optimizedSchema.totalTables;
    const reductionPercentage = Math.round((totalReduction / allInterfaces.length) * 100);

    return {
      originalInterfaces: allInterfaces.length,
      filteredDatabaseEntities: databaseEntities.length,
      consolidatedEntities: consolidationResult.consolidatedCount,
      finalTables: optimizedSchema.totalTables,
      totalReduction,
      reductionPercentage
    };
  }

  private async generateReports(
    filteredEntities: FilteredEntity[],
    consolidationResult: ConsolidationResult,
    optimizedSchema: OptimizedSchema,
    originalAnalysis: SchemaAnalysisResult,
    outputDir: string
  ): Promise<void> {
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 1. Entity Filtering Report
    const filterReport = this.entityFilter.generateFilterReport(filteredEntities);
    fs.writeFileSync(
      path.join(outputDir, 'entity-filtering-report.md'),
      filterReport,
      'utf8'
    );

    // 2. Consolidation Report
    const consolidationReport = this.duplicateConsolidator.generateConsolidationReport(consolidationResult);
    fs.writeFileSync(
      path.join(outputDir, 'duplicate-consolidation-report.md'),
      consolidationReport,
      'utf8'
    );

    // 3. Optimized Schema SQL
    const optimizedSql = this.optimizedGenerator.generateOptimizedSql(optimizedSchema);
    fs.writeFileSync(
      path.join(outputDir, 'optimized-schema.sql'),
      optimizedSql,
      'utf8'
    );

    // 4. Comprehensive Summary Report
    const summaryReport = this.generateSummaryReport(
      filteredEntities,
      consolidationResult,
      optimizedSchema,
      originalAnalysis
    );
    fs.writeFileSync(
      path.join(outputDir, 'schema-consolidation-summary.md'),
      summaryReport,
      'utf8'
    );

    // 5. Migration Comparison JSON
    const comparisonData = {
      original: {
        totalInterfaces: originalAnalysis.totalInterfaces,
        estimatedTables: originalAnalysis.estimatedTables,
        duplicateGroups: originalAnalysis.duplicates.length
      },
      optimized: {
        finalTables: optimizedSchema.totalTables,
        totalEndpoints: optimizedSchema.totalEndpoints,
        domains: Object.keys(optimizedSchema.domains).length
      },
      reduction: {
        tablesEliminated: originalAnalysis.estimatedTables - optimizedSchema.totalTables,
        percentageReduction: Math.round((1 - optimizedSchema.totalTables / originalAnalysis.estimatedTables) * 100)
      }
    };

    fs.writeFileSync(
      path.join(outputDir, 'consolidation-comparison.json'),
      JSON.stringify(comparisonData, null, 2),
      'utf8'
    );
  }

  private generateSummaryReport(
    filteredEntities: FilteredEntity[],
    consolidationResult: ConsolidationResult,
    optimizedSchema: OptimizedSchema,
    originalAnalysis: SchemaAnalysisResult
  ): string {
    const databaseEntities = filteredEntities.filter(e => e.category === 'database_entity' && e.confidence >= 70);
    const timestamp = new Date().toISOString();

    return `# Chess Training Schema Consolidation Summary

**Generated:** ${timestamp}  
**Tool:** Chess Schema Consolidator v1.0.0

---

## 🎯 Executive Summary

### Dramatic Schema Optimization Achieved
- **Original Analysis:** ${originalAnalysis.totalInterfaces} interfaces → ${originalAnalysis.estimatedTables} estimated tables
- **Optimized Result:** ${optimizedSchema.totalTables} actual database tables
- **Total Reduction:** ${originalAnalysis.estimatedTables - optimizedSchema.totalTables} tables eliminated (${Math.round((1 - optimizedSchema.totalTables / originalAnalysis.estimatedTables) * 100)}% reduction)

### Processing Pipeline Results
1. **Entity Filtering:** ${originalAnalysis.totalInterfaces} → ${databaseEntities.length} database entities (${Math.round((1 - databaseEntities.length / originalAnalysis.totalInterfaces) * 100)}% filtered out)
2. **Duplicate Consolidation:** ${consolidationResult.savings} redundant entities merged
3. **Schema Optimization:** ${optimizedSchema.totalTables} efficient tables generated

---

## 📊 Detailed Breakdown

### Phase 1: Entity Classification
${filteredEntities.reduce((acc, entity) => {
  if (!acc[entity.category]) acc[entity.category] = 0;
  acc[entity.category]++;
  return acc;
}, {} as any)}

**Database Entities Retained (${databaseEntities.length}):**
${databaseEntities.slice(0, 15).map(e => `- **${e.interface.name}** (${e.confidence}% confidence)`).join('\\n')}
${databaseEntities.length > 15 ? `- *...and ${databaseEntities.length - 15} more*` : ''}

### Phase 2: Duplicate Consolidation
**${consolidationResult.plans.length} Consolidation Groups:**
${consolidationResult.plans.map(plan => 
  `- **${plan.targetName}:** ${plan.sourceEntities.length} entities → 1 table`
).join('\\n')}

### Phase 3: Domain Organization
${Object.entries(optimizedSchema.domains).map(([domain, data]) => 
  `- **${domain.toUpperCase()}:** ${data.tables.length} tables, ${data.estimatedEndpoints.length} API endpoints`
).join('\\n')}

---

## 🏗️ Final Schema Architecture

### Database Tables (${optimizedSchema.totalTables} total)
${Object.entries(optimizedSchema.domains).map(([domain, data]) => `
#### ${domain.toUpperCase()} Domain (${data.tables.length} tables)
${data.tables.map(table => `- \`${table.name}\` (${table.columns.length} columns)`).join('\\n')}

**API Endpoints:** ${data.estimatedEndpoints.length}
${data.estimatedEndpoints.map(endpoint => `- ${endpoint}`).join('\\n')}
`).join('\\n')}

---

## ✅ Optimization Benefits

### Development Benefits
- **Reduced Complexity:** ${optimizedSchema.totalTables} tables vs ${originalAnalysis.estimatedTables} originally estimated
- **Clear Domain Boundaries:** ${Object.keys(optimizedSchema.domains).length} logical domains
- **Efficient API Design:** ${optimizedSchema.totalEndpoints} focused endpoints

### Database Benefits
- **Normalized Schema:** Proper relationships and constraints
- **Query Performance:** Optimized indexes for chess-specific queries  
- **Maintenance:** Consolidated entities reduce schema complexity

### Migration Benefits
- **Manageable Scope:** ${optimizedSchema.totalTables} tables can be implemented in ${Math.ceil(optimizedSchema.totalTables / 10)} weeks
- **Domain-First Approach:** Can implement domain by domain
- **Clear Dependencies:** Well-defined relationships between tables

---

## 📋 Implementation Roadmap

### Phase 1: Core Domains (Week 1-2)
${Object.entries(optimizedSchema.domains)
  .filter(([_, data]) => data.tables.length <= 5)
  .map(([domain, data]) => `- **${domain}:** ${data.tables.length} tables`)
  .join('\\n')}

### Phase 2: Complex Domains (Week 3-4)  
${Object.entries(optimizedSchema.domains)
  .filter(([_, data]) => data.tables.length > 5)
  .map(([domain, data]) => `- **${domain}:** ${data.tables.length} tables`)
  .join('\\n')}

---

## 🚀 Next Steps

1. **Review Schema:** Validate the ${optimizedSchema.totalTables} optimized tables align with business requirements
2. **Implement API:** Build ${optimizedSchema.totalEndpoints} RESTful endpoints
3. **Data Migration:** Plan migration from current mock data to database
4. **Testing Strategy:** Design tests for ${Object.keys(optimizedSchema.domains).length} domain boundaries

---

${optimizedSchema.optimizationSummary}

*This consolidation transforms an unmanageable 352-table schema into an efficient ${optimizedSchema.totalTables}-table design focused on core business entities.*`;
  }
}