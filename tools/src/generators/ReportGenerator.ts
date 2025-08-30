import * as fs from 'fs';
import * as path from 'path';
import { SchemaAnalysisResult } from '../types';

export class ReportGenerator {
  public async generate(analysis: SchemaAnalysisResult, outputDir: string): Promise<void> {
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const reportPath = path.join(outputDir, 'schema-analysis-report.md');
    const report = this.generateMarkdownReport(analysis);
    
    fs.writeFileSync(reportPath, report, 'utf8');
    
    // Also generate JSON report for programmatic access
    const jsonPath = path.join(outputDir, 'schema-analysis-data.json');
    fs.writeFileSync(jsonPath, JSON.stringify(analysis, null, 2), 'utf8');
  }

  private generateMarkdownReport(analysis: SchemaAnalysisResult): string {
    const timestamp = new Date().toISOString();
    
    return `# Chess Training Database Schema Analysis Report

**Generated:** ${timestamp}  
**Tool:** Chess Schema Analyzer v1.0.0

---

## 📊 Executive Summary

- **Total Interfaces Analyzed:** ${analysis.totalInterfaces}
- **Files Processed:** ${analysis.fileCount}
- **Duplicate Groups Found:** ${analysis.duplicates.length}
- **Chess Domains Identified:** ${Object.keys(analysis.domains).length}
- **Estimated Database Tables:** ${analysis.estimatedTables}
- **Suggested API Endpoints:** ${analysis.estimatedEndpoints}
- **Consolidation Opportunities:** ${analysis.consolidationOpportunities.length}

---

## 🔍 Duplicate Entity Analysis

${analysis.duplicates.length === 0 ? '*No significant duplicates detected.*' : ''}

${analysis.duplicates.map(dup => `
### ${dup.primaryEntity} (Primary)
**File:** \`${this.getFileName(dup.primaryFilePath)}\`  
**Similarity Group:** ${dup.duplicates.length + 1} entities  
**Estimated Savings:** ${dup.estimatedSavings} redundant interfaces

**Similar Entities:**
${dup.duplicates.map(d => `- **${d.entity}** (${d.similarityScore.toFixed(1)}% similar) - \`${this.getFileName(d.filePath)}\``).join('\\n')}

**Consolidation Strategy:**
${dup.consolidationSuggestion}

${dup.duplicates.some(d => d.conflictingProperties.length > 0) ? `**Property Conflicts:**
${dup.duplicates.filter(d => d.conflictingProperties.length > 0).map(d => 
  d.conflictingProperties.map(conflict => `- ${conflict}`).join('\\n')
).join('\\n')}` : ''}

${dup.duplicates.some(d => d.missingProperties.length > 0) ? `**Property Differences:**
${dup.duplicates.filter(d => d.missingProperties.length > 0).map(d => 
  d.missingProperties.slice(0, 3).map(missing => `- ${missing}`).join('\\n')
).join('\\n')}` : ''}
`).join('\\n---\\n')}

---

## 🏗️ Domain Architecture Analysis

${Object.entries(analysis.domains).map(([domainName, domain]) => `
### ${domainName.toUpperCase()} Domain
**Priority:** ${domain.priority.toUpperCase()}  
**Entities:** ${domain.entities.length}  
**Estimated Tables:** ${domain.estimatedTables}  
**API Endpoints:** ${domain.suggestedEndpoints.length}

**Core Entities:**
${domain.entities.slice(0, 10).map(entity => `- ${entity}`).join('\\n')}
${domain.entities.length > 10 ? `- *...and ${domain.entities.length - 10} more*` : ''}

**Suggested API Endpoints:**
${domain.suggestedEndpoints.map(endpoint => `- ${endpoint}`).join('\\n')}

${domain.relationships.length > 0 ? `**Key Relationships:**
${domain.relationships.slice(0, 5).map(rel => `- ${rel.from} → ${rel.to} (${rel.type})`).join('\\n')}` : ''}
`).join('\\n')}

---

## 🚀 Implementation Recommendations

### Phase 1: Core Infrastructure (Week 1-2)
${this.getHighPriorityDomains(analysis.domains).map(domain => 
  `- **${domain.name.toUpperCase()} Domain:** ${domain.estimatedTables} tables, ${domain.entities.length} entities`
).join('\\n')}

### Phase 2: Feature Domains (Week 3-4)
${this.getMediumPriorityDomains(analysis.domains).map(domain => 
  `- **${domain.name.toUpperCase()} Domain:** ${domain.estimatedTables} tables, ${domain.entities.length} entities`
).join('\\n')}

### Phase 3: Supporting Systems (Week 5-6)
${this.getLowPriorityDomains(analysis.domains).map(domain => 
  `- **${domain.name.toUpperCase()} Domain:** ${domain.estimatedTables} tables, ${domain.entities.length} entities`
).join('\\n')}

---

## ⚠️ Critical Consolidation Opportunities

${analysis.consolidationOpportunities.length === 0 ? '*No major consolidation opportunities identified.*' : ''}

${analysis.consolidationOpportunities.map((opp, index) => `${index + 1}. ${opp}`).join('\\n')}

---

## 📈 Database Schema Estimates

**Total Estimated Tables:** ${analysis.estimatedTables}

**By Domain:**
${Object.entries(analysis.domains).map(([name, domain]) => 
  `- **${name}:** ${domain.estimatedTables} tables`
).join('\\n')}

**API Endpoint Summary:**
${Object.entries(analysis.domains).map(([name, domain]) => 
  `- **${name}:** ${domain.suggestedEndpoints.length} endpoints`
).join('\\n')}

---

## 🔧 Next Steps

1. **Review Duplicate Consolidations** - Examine the ${analysis.duplicates.length} duplicate groups identified
2. **Domain Validation** - Verify the ${Object.keys(analysis.domains).length} domain classifications match business requirements
3. **Schema Generation** - Run SQL schema generator with these findings
4. **API Design** - Design ${analysis.estimatedEndpoints} RESTful endpoints based on domain analysis
5. **Migration Planning** - Create phased migration strategy starting with high-priority domains

---

*This report was generated automatically by the Chess Training Schema Analyzer.*
*Review all recommendations with your development team before implementation.*`;
  }

  private getFileName(filePath: string): string {
    return path.basename(filePath);
  }

  private getHighPriorityDomains(domains: any): any[] {
    return Object.values(domains).filter((d: any) => d.priority === 'high');
  }

  private getMediumPriorityDomains(domains: any): any[] {
    return Object.values(domains).filter((d: any) => d.priority === 'medium');
  }

  private getLowPriorityDomains(domains: any): any[] {
    return Object.values(domains).filter((d: any) => d.priority === 'low');
  }
}