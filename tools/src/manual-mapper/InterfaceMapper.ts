import { InterfaceDefinition, SchemaAnalysisResult } from '../types';
import { CHESS_TARGET_SCHEMA, TargetTable } from './ChessTargetSchema';

export interface MappingResult {
  targetTable: string;
  confidence: number;
  reasoning: string[];
}

export interface InterfaceMapping {
  interface: InterfaceDefinition;
  mappingResult: MappingResult | null;
  category: 'DATABASE' | 'UI_CONFIG' | 'MOCK_DATA' | 'UTILITY' | 'UNMAPPED';
}

export interface TargetMappingSummary {
  totalInterfaces: number;
  mappedToDatabase: InterfaceMapping[];
  uiConfig: InterfaceMapping[];
  mockData: InterfaceMapping[];
  utility: InterfaceMapping[];
  unmapped: InterfaceMapping[];
  targetTables: {
    tableName: string;
    mappedInterfaces: string[];
    coverage: number; // Percentage of expected fields covered
  }[];
}

export class InterfaceMapper {
  private readonly TABLE_KEYWORDS = {
    users: ['user', 'account', 'profile', 'auth', 'login', 'session', 'player'],
    games: ['game', 'match', 'play', 'move', 'chess', 'board', 'pgn', 'fen'],
    puzzles: ['puzzle', 'tactical', 'endgame', 'opening', 'problem', 'exercise'],
    puzzle_attempts: ['attempt', 'solve', 'solution', 'result', 'performance'],
    achievements: ['achievement', 'badge', 'award', 'unlock', 'milestone', 'goal'],
    user_achievements: ['earned', 'progress', 'completion'],
    user_sessions: ['session', 'token', 'auth', 'login', 'security'],
    opening_positions: ['opening', 'eco', 'variation', 'theory', 'repertoire'],
    user_stats: ['stats', 'statistics', 'analytics', 'performance', 'progress', 'daily']
  };

  private readonly UI_INDICATORS = [
    'props', 'component', 'config', 'theme', 'ui', 'display', 'style', 'color',
    'button', 'form', 'input', 'modal', 'dialog', 'tab', 'nav', 'menu',
    'onclick', 'onchange', 'handler', 'callback', 'event', 'classname'
  ];

  private readonly MOCK_INDICATORS = [
    'mock', 'demo', 'test', 'example', 'sample', 'placeholder', 'dummy', 'fake'
  ];

  public mapInterfaces(analysisResult: SchemaAnalysisResult): TargetMappingSummary {
    const allInterfaces = analysisResult.rawData.flatMap(data => data.interfaces);
    
    const mappings: InterfaceMapping[] = allInterfaces.map(iface => 
      this.categorizeInterface(iface)
    );

    // Group mappings by category
    const mappedToDatabase = mappings.filter(m => m.category === 'DATABASE');
    const uiConfig = mappings.filter(m => m.category === 'UI_CONFIG');
    const mockData = mappings.filter(m => m.category === 'MOCK_DATA');
    const utility = mappings.filter(m => m.category === 'UTILITY');
    const unmapped = mappings.filter(m => m.category === 'UNMAPPED');

    // Analyze target table coverage
    const targetTables = CHESS_TARGET_SCHEMA.map(table => {
      const tableMappings = mappedToDatabase.filter(m => 
        m.mappingResult?.targetTable === table.name
      );

      return {
        tableName: table.name,
        mappedInterfaces: tableMappings.map(m => m.interface.name),
        coverage: this.calculateCoverage(table, tableMappings.map(m => m.interface))
      };
    });

    return {
      totalInterfaces: allInterfaces.length,
      mappedToDatabase,
      uiConfig,
      mockData,
      utility,
      unmapped,
      targetTables
    };
  }

  private categorizeInterface(iface: InterfaceDefinition): InterfaceMapping {
    const name = iface.name.toLowerCase();
    const filePath = iface.filePath.toLowerCase();
    
    // Check if it's UI configuration
    if (this.isUIConfig(name, filePath, iface)) {
      return {
        interface: iface,
        mappingResult: null,
        category: 'UI_CONFIG'
      };
    }

    // Check if it's mock data
    if (this.isMockData(name, filePath)) {
      return {
        interface: iface,
        mappingResult: null,
        category: 'MOCK_DATA'
      };
    }

    // Check if it's a utility type
    if (this.isUtilityType(name, iface)) {
      return {
        interface: iface,
        mappingResult: null,
        category: 'UTILITY'
      };
    }

    // Try to map to database table
    const mapping = this.mapToTargetTable(iface);
    if (mapping) {
      return {
        interface: iface,
        mappingResult: mapping,
        category: 'DATABASE'
      };
    }

    // Couldn't categorize
    return {
      interface: iface,
      mappingResult: null,
      category: 'UNMAPPED'
    };
  }

  private isUIConfig(name: string, filePath: string, iface: InterfaceDefinition): boolean {
    // Name-based detection
    if (this.UI_INDICATORS.some(indicator => name.includes(indicator))) {
      return true;
    }

    // File path detection
    if (filePath.includes('components/') || filePath.includes('ui/')) {
      return true;
    }

    // Property-based detection
    const hasUIProperties = iface.properties.some(prop => 
      this.UI_INDICATORS.some(indicator => prop.name.toLowerCase().includes(indicator))
    );

    return hasUIProperties;
  }

  private isMockData(name: string, filePath: string): boolean {
    return this.MOCK_INDICATORS.some(indicator => 
      name.includes(indicator) || filePath.includes(indicator)
    );
  }

  private isUtilityType(name: string, iface: InterfaceDefinition): boolean {
    // Small interfaces with few properties are often utility types
    if (iface.properties.length <= 2) {
      return true;
    }

    // Type/enum-like names
    if (name.includes('type') || name.includes('option') || name.includes('enum')) {
      return true;
    }

    return false;
  }

  private mapToTargetTable(iface: InterfaceDefinition): MappingResult | null {
    const name = iface.name.toLowerCase();
    const filePath = iface.filePath.toLowerCase();
    
    let bestMatch: string | null = null;
    let highestScore = 0;
    const reasoning: string[] = [];

    // Score against each target table
    for (const [tableName, keywords] of Object.entries(this.TABLE_KEYWORDS)) {
      let score = 0;
      const tableReasons: string[] = [];

      // Name matching
      for (const keyword of keywords) {
        if (name.includes(keyword)) {
          score += 10;
          tableReasons.push(`Name contains '${keyword}'`);
        }
      }

      // File path matching
      for (const keyword of keywords) {
        if (filePath.includes(keyword)) {
          score += 5;
          tableReasons.push(`File path contains '${keyword}'`);
        }
      }

      // Property matching
      for (const prop of iface.properties) {
        const propName = prop.name.toLowerCase();
        for (const keyword of keywords) {
          if (propName.includes(keyword)) {
            score += 3;
            tableReasons.push(`Property '${prop.name}' contains '${keyword}'`);
          }
        }
      }

      // Special scoring for database-like properties
      const hasId = iface.properties.some(p => p.name.toLowerCase() === 'id');
      const hasTimestamps = iface.properties.some(p => 
        ['created_at', 'updated_at', 'createdat', 'updatedat'].includes(p.name.toLowerCase())
      );

      if (hasId) {
        score += 15;
        tableReasons.push('Has ID field');
      }
      if (hasTimestamps) {
        score += 10;
        tableReasons.push('Has timestamp fields');
      }

      if (score > highestScore && score >= 20) { // Minimum threshold
        highestScore = score;
        bestMatch = tableName;
        reasoning.length = 0;
        reasoning.push(...tableReasons);
      }
    }

    if (bestMatch) {
      return {
        targetTable: bestMatch,
        confidence: Math.min(Math.round((highestScore / 50) * 100), 95),
        reasoning
      };
    }

    return null;
  }

  private calculateCoverage(targetTable: TargetTable, mappedInterfaces: InterfaceDefinition[]): number {
    if (mappedInterfaces.length === 0) return 0;

    const targetColumns = new Set(targetTable.columns.map(col => col.name.toLowerCase()));
    const foundColumns = new Set<string>();

    // Check which target columns are covered by mapped interfaces
    for (const iface of mappedInterfaces) {
      for (const prop of iface.properties) {
        const propName = prop.name.toLowerCase().replace(/([A-Z])/g, '_$1').toLowerCase();
        if (targetColumns.has(propName)) {
          foundColumns.add(propName);
        }
      }
    }

    return Math.round((foundColumns.size / targetColumns.size) * 100);
  }

  public generateMappingReport(summary: TargetMappingSummary): string {
    const timestamp = new Date().toISOString();
    
    return `# Chess Training Interface Mapping Report

**Generated:** ${timestamp}  
**Tool:** Manual Target Schema Mapper v1.0.0

---

## 🎯 Mapping Summary

### Interface Classification
- **Total Interfaces Analyzed:** ${summary.totalInterfaces}
- **Database Entities:** ${summary.mappedToDatabase.length}
- **UI Configuration:** ${summary.uiConfig.length}  
- **Mock Data:** ${summary.mockData.length}
- **Utility Types:** ${summary.utility.length}
- **Unmapped:** ${summary.unmapped.length}

### Target Schema Coverage
**${CHESS_TARGET_SCHEMA.length} Core Database Tables Defined**

${summary.targetTables.map(table => `
#### ${table.tableName} (${table.coverage}% coverage)
**Mapped Interfaces (${table.mappedInterfaces.length}):**
${table.mappedInterfaces.length > 0 
  ? table.mappedInterfaces.map(name => `- ${name}`).join('\n')
  : '- *No interfaces mapped to this table*'
}
`).join('')}

---

## 📊 Database Entity Mappings (${summary.mappedToDatabase.length})

${summary.mappedToDatabase.slice(0, 20).map(mapping => `
### ${mapping.interface.name} → ${mapping.mappingResult?.targetTable}
**Confidence:** ${mapping.mappingResult?.confidence}%  
**Reasoning:** ${mapping.mappingResult?.reasoning.slice(0, 3).join(', ')}  
**Properties:** ${mapping.interface.properties.length}
`).join('')}

${summary.mappedToDatabase.length > 20 ? `\n*...and ${summary.mappedToDatabase.length - 20} more database entity mappings*` : ''}

---

## 🚫 Filtered Out (${summary.uiConfig.length + summary.mockData.length + summary.utility.length})

### UI Configuration (${summary.uiConfig.length})
${summary.uiConfig.slice(0, 10).map(m => `- **${m.interface.name}** (${m.interface.properties.length} props)`).join('\n')}
${summary.uiConfig.length > 10 ? `\n- *...and ${summary.uiConfig.length - 10} more UI config interfaces*` : ''}

### Mock Data (${summary.mockData.length})
${summary.mockData.map(m => `- **${m.interface.name}**`).join('\n')}

### Utility Types (${summary.utility.length})
${summary.utility.slice(0, 10).map(m => `- **${m.interface.name}** (${m.interface.properties.length} props)`).join('\n')}
${summary.utility.length > 10 ? `\n- *...and ${summary.utility.length - 10} more utility types*` : ''}

---

## ✅ Final Results

### Database Schema Optimization
- **Original Interfaces:** ${summary.totalInterfaces}
- **Target Database Tables:** ${CHESS_TARGET_SCHEMA.length}
- **Reduction:** ${Math.round((1 - CHESS_TARGET_SCHEMA.length / summary.totalInterfaces) * 100)}%

### Next Steps
1. **Review unmapped interfaces (${summary.unmapped.length})** - Determine if important entities were missed
2. **Validate table coverage** - Ensure all required fields are covered by mapped interfaces  
3. **Generate final SQL schema** - Create production-ready schema for ${CHESS_TARGET_SCHEMA.length} tables
4. **Plan data migration** - Map frontend data to target schema

*This manual mapping approach provides a focused, domain-driven database schema for the chess training application.*`;
  }
}