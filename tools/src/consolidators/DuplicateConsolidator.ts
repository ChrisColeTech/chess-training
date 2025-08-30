import { InterfaceDefinition, PropertyDefinition, DuplicateAnalysis } from '../types';

export interface ConsolidationPlan {
  targetName: string;
  sourceEntities: string[];
  consolidatedInterface: InterfaceDefinition;
  migrationStrategy: string;
  estimatedTableReduction: number;
}

export interface ConsolidationResult {
  originalCount: number;
  consolidatedCount: number;
  plans: ConsolidationPlan[];
  savings: number;
}

export class DuplicateConsolidator {
  private readonly CONSOLIDATION_THRESHOLD = 75; // 75% similarity for consolidation

  public consolidateDuplicates(
    entities: InterfaceDefinition[], 
    duplicates: DuplicateAnalysis[]
  ): ConsolidationResult {
    const consolidationPlans: ConsolidationPlan[] = [];
    const processed = new Set<string>();
    let consolidatedEntities = [...entities];

    // Process each duplicate group
    for (const dupGroup of duplicates) {
      if (dupGroup.duplicates.some(d => d.similarityScore >= this.CONSOLIDATION_THRESHOLD)) {
        const plan = this.createConsolidationPlan(dupGroup, entities);
        if (plan) {
          consolidationPlans.push(plan);
          
          // Mark entities as processed
          processed.add(dupGroup.primaryEntity);
          dupGroup.duplicates.forEach(d => processed.add(d.entity));
          
          // Remove consolidated entities and add the new one
          consolidatedEntities = consolidatedEntities.filter(e => 
            !processed.has(e.name)
          );
          consolidatedEntities.push(plan.consolidatedInterface);
        }
      }
    }

    return {
      originalCount: entities.length,
      consolidatedCount: consolidatedEntities.length,
      plans: consolidationPlans,
      savings: entities.length - consolidatedEntities.length
    };
  }

  private createConsolidationPlan(
    dupGroup: DuplicateAnalysis, 
    entities: InterfaceDefinition[]
  ): ConsolidationPlan | null {
    const primaryEntity = entities.find(e => e.name === dupGroup.primaryEntity);
    if (!primaryEntity) return null;

    const duplicateEntities = dupGroup.duplicates
      .filter(d => d.similarityScore >= this.CONSOLIDATION_THRESHOLD)
      .map(d => entities.find(e => e.name === d.entity))
      .filter(Boolean) as InterfaceDefinition[];

    if (duplicateEntities.length === 0) return null;

    // Create consolidated interface
    const consolidatedInterface = this.mergeInterfaces(
      primaryEntity, 
      duplicateEntities
    );

    // Determine consolidation strategy
    const strategy = this.determineConsolidationStrategy(
      primaryEntity, 
      duplicateEntities
    );

    return {
      targetName: consolidatedInterface.name,
      sourceEntities: [dupGroup.primaryEntity, ...dupGroup.duplicates.map(d => d.entity)],
      consolidatedInterface,
      migrationStrategy: strategy,
      estimatedTableReduction: duplicateEntities.length
    };
  }

  private mergeInterfaces(
    primary: InterfaceDefinition, 
    duplicates: InterfaceDefinition[]
  ): InterfaceDefinition {
    const allInterfaces = [primary, ...duplicates];
    const mergedProperties = new Map<string, PropertyDefinition>();
    
    // Collect all unique properties
    for (const iface of allInterfaces) {
      for (const prop of iface.properties) {
        const existing = mergedProperties.get(prop.name);
        
        if (!existing) {
          // New property - make it optional if not present in primary
          mergedProperties.set(prop.name, {
            ...prop,
            optional: iface !== primary ? true : prop.optional
          });
        } else {
          // Property exists - resolve conflicts
          const resolvedProp = this.resolvePropertyConflict(existing, prop, iface === primary);
          mergedProperties.set(prop.name, resolvedProp);
        }
      }
    }

    // Generate consolidated table name
    const tableName = this.generateConsolidatedName(primary.name, duplicates.map(d => d.name));

    return {
      name: tableName,
      properties: Array.from(mergedProperties.values()),
      extends: primary.extends, // Inherit primary's extensions
      filePath: `consolidated/${tableName.toLowerCase()}.ts`,
      lineNumber: 1,
      exported: true
    };
  }

  private resolvePropertyConflict(
    existing: PropertyDefinition, 
    incoming: PropertyDefinition, 
    incomingFromPrimary: boolean
  ): PropertyDefinition {
    // If types are different, try to resolve
    if (existing.type !== incoming.type) {
      const resolvedType = this.resolveTypeConflict(existing.type, incoming.type);
      return {
        name: existing.name,
        type: resolvedType,
        optional: existing.optional || incoming.optional, // Make optional if either is optional
        description: existing.description || incoming.description
      };
    }

    // If types are same, prefer primary's definition
    return incomingFromPrimary ? incoming : existing;
  }

  private resolveTypeConflict(type1: string, type2: string): string {
    // Common type conflict resolutions
    
    // Number vs string for IDs
    if ((type1 === 'number' && type2 === 'string') || 
        (type1 === 'string' && type2 === 'number')) {
      return 'string | number'; // Union type
    }
    
    // Optional vs required of same type
    if (type1.includes('undefined') || type2.includes('undefined')) {
      const baseType1 = type1.replace(' | undefined', '');
      const baseType2 = type2.replace(' | undefined', '');
      if (baseType1 === baseType2) {
        return `${baseType1} | undefined`;
      }
    }
    
    // Different enum-like types
    if (type1.includes('|') && type2.includes('|')) {
      const values1 = type1.split('|').map(s => s.trim());
      const values2 = type2.split('|').map(s => s.trim());
      const allValues = [...new Set([...values1, ...values2])];
      return allValues.join(' | ');
    }
    
    // Default to union type
    return `${type1} | ${type2}`;
  }

  private generateConsolidatedName(primaryName: string, duplicateNames: string[]): string {
    const allNames = [primaryName, ...duplicateNames];
    
    // Find common prefix
    const commonPrefix = this.findLongestCommonPrefix(allNames);
    if (commonPrefix.length > 3) {
      return this.cleanEntityName(commonPrefix);
    }
    
    // Find common suffix  
    const commonSuffix = this.findLongestCommonSuffix(allNames);
    if (commonSuffix.length > 3) {
      return this.cleanEntityName(commonSuffix);
    }
    
    // Extract core entity name from primary
    return this.extractCoreEntityName(primaryName);
  }

  private findLongestCommonPrefix(strings: string[]): string {
    if (strings.length === 0) return '';
    
    let prefix = strings[0];
    for (let i = 1; i < strings.length; i++) {
      while (!strings[i].startsWith(prefix) && prefix.length > 0) {
        prefix = prefix.slice(0, -1);
      }
    }
    
    return prefix;
  }

  private findLongestCommonSuffix(strings: string[]): string {
    if (strings.length === 0) return '';
    
    let suffix = strings[0];
    for (let i = 1; i < strings.length; i++) {
      while (!strings[i].endsWith(suffix) && suffix.length > 0) {
        suffix = suffix.slice(1);
      }
    }
    
    return suffix;
  }

  private cleanEntityName(name: string): string {
    return name
      .replace(/^(User|Chess|Puzzle|Game|Study)/, '') // Remove common prefixes
      .replace(/(Data|Info|Config|Settings|Props)$/, '') // Remove common suffixes
      .replace(/^[a-z]/, char => char.toUpperCase()) // Capitalize
      || name; // Fallback to original if cleaning results in empty string
  }

  private extractCoreEntityName(name: string): string {
    // Remove common patterns to get core business entity name
    return name
      .replace(/^(User|Chess|Puzzle|Game|Analysis|Study|Opening)/, '')
      .replace(/(Data|Info|Config|Settings|Preferences|Stats|Progress|Session|Props|Component)$/, '')
      .replace(/([A-Z])/g, '$1') // Keep camelCase
      .replace(/^[a-z]/, char => char.toUpperCase())
      || name;
  }

  private determineConsolidationStrategy(
    primary: InterfaceDefinition, 
    duplicates: InterfaceDefinition[]
  ): string {
    const allEntities = [primary, ...duplicates];
    const hasUserSpecific = allEntities.some(e => 
      e.name.toLowerCase().includes('user') || 
      e.properties.some(p => p.name.toLowerCase().includes('userid'))
    );

    const hasDifferentTypes = allEntities.some(e =>
      e.name.toLowerCase().includes('tactical') ||
      e.name.toLowerCase().includes('endgame') ||
      e.name.toLowerCase().includes('opening')
    );

    if (hasDifferentTypes) {
      return 'Single table with discriminator column (type field) to handle different variants';
    }

    if (hasUserSpecific) {
      return 'Unified user-specific table with optional fields for different use cases';
    }

    return 'Direct merge into single table with optional fields for variant-specific properties';
  }

  public generateConsolidationReport(result: ConsolidationResult): string {
    const reductionPercentage = Math.round((result.savings / result.originalCount) * 100);

    return `# Duplicate Consolidation Report

## Summary
- **Original Entities:** ${result.originalCount}
- **Consolidated Entities:** ${result.consolidatedCount}
- **Tables Eliminated:** ${result.savings}
- **Reduction:** ${reductionPercentage}%

## Consolidation Plans (${result.plans.length})

${result.plans.map((plan, index) => `
### ${index + 1}. ${plan.targetName}
**Source Entities:** ${plan.sourceEntities.join(', ')}  
**Table Reduction:** ${plan.estimatedTableReduction} tables eliminated  
**Strategy:** ${plan.migrationStrategy}

**Consolidated Properties:** ${plan.consolidatedInterface.properties.length}
**Optional Fields:** ${plan.consolidatedInterface.properties.filter(p => p.optional).length}
`).join('\n')}

## Estimated Database Impact
- **Table Count Reduction:** ${result.originalCount} → ${result.consolidatedCount}
- **Schema Complexity:** Significantly reduced
- **Maintenance Burden:** Lower due to unified entities
`;
  }
}