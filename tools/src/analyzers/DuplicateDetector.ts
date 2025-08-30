import { InterfaceDefinition, DuplicateAnalysis, DuplicateCandidate, PropertyDefinition } from '../types';

export class DuplicateDetector {
  private readonly SIMILARITY_THRESHOLD = 70; // 70% similarity to be considered duplicate

  public detectDuplicates(interfaces: InterfaceDefinition[]): DuplicateAnalysis[] {
    const duplicates: DuplicateAnalysis[] = [];
    const processed = new Set<string>();

    for (let i = 0; i < interfaces.length; i++) {
      const primary = interfaces[i];
      
      if (processed.has(primary.name)) continue;
      
      const candidates: DuplicateCandidate[] = [];
      
      for (let j = i + 1; j < interfaces.length; j++) {
        const candidate = interfaces[j];
        
        if (processed.has(candidate.name)) continue;
        
        const similarity = this.calculateSimilarity(primary, candidate);
        
        if (similarity >= this.SIMILARITY_THRESHOLD) {
          const conflictingProps = this.findConflictingProperties(primary, candidate);
          const missingProps = this.findMissingProperties(primary, candidate);
          
          candidates.push({
            entity: candidate.name,
            similarityScore: similarity,
            conflictingProperties: conflictingProps,
            missingProperties: missingProps,
            filePath: candidate.filePath
          });
          
          processed.add(candidate.name);
        }
      }
      
      if (candidates.length > 0) {
        duplicates.push({
          primaryEntity: primary.name,
          primaryFilePath: primary.filePath,
          duplicates: candidates,
          consolidationSuggestion: this.generateConsolidationSuggestion(primary, candidates),
          estimatedSavings: candidates.length
        });
        
        processed.add(primary.name);
      }
    }

    return duplicates;
  }

  private calculateSimilarity(interface1: InterfaceDefinition, interface2: InterfaceDefinition): number {
    const props1 = new Map(interface1.properties.map(p => [p.name, p]));
    const props2 = new Map(interface2.properties.map(p => [p.name, p]));
    
    const allProps = new Set([...props1.keys(), ...props2.keys()]);
    let matchingProps = 0;
    let typeMatches = 0;
    
    for (const propName of allProps) {
      const prop1 = props1.get(propName);
      const prop2 = props2.get(propName);
      
      if (prop1 && prop2) {
        matchingProps++;
        
        // Check type similarity
        if (this.normalizeType(prop1.type) === this.normalizeType(prop2.type)) {
          typeMatches++;
        }
      }
    }
    
    // Calculate similarity score
    const nameScore = matchingProps / allProps.size * 100;
    const typeScore = typeMatches / Math.max(matchingProps, 1) * 100;
    
    // Weighted average: property names 60%, type matches 40%
    return (nameScore * 0.6) + (typeScore * 0.4);
  }

  private findConflictingProperties(primary: InterfaceDefinition, candidate: InterfaceDefinition): string[] {
    const conflicts: string[] = [];
    const primaryProps = new Map(primary.properties.map(p => [p.name, p]));
    const candidateProps = new Map(candidate.properties.map(p => [p.name, p]));
    
    for (const [propName, primaryProp] of primaryProps) {
      const candidateProp = candidateProps.get(propName);
      
      if (candidateProp && this.normalizeType(primaryProp.type) !== this.normalizeType(candidateProp.type)) {
        conflicts.push(`${propName}: ${primaryProp.type} vs ${candidateProp.type}`);
      }
    }
    
    return conflicts;
  }

  private findMissingProperties(primary: InterfaceDefinition, candidate: InterfaceDefinition): string[] {
    const missing: string[] = [];
    const primaryProps = new Set(primary.properties.map(p => p.name));
    const candidateProps = new Set(candidate.properties.map(p => p.name));
    
    // Properties in primary but not in candidate
    for (const prop of primaryProps) {
      if (!candidateProps.has(prop)) {
        missing.push(`Missing from ${candidate.name}: ${prop}`);
      }
    }
    
    // Properties in candidate but not in primary
    for (const prop of candidateProps) {
      if (!primaryProps.has(prop)) {
        missing.push(`Extra in ${candidate.name}: ${prop}`);
      }
    }
    
    return missing;
  }

  private generateConsolidationSuggestion(primary: InterfaceDefinition, candidates: DuplicateCandidate[]): string {
    const entityNames = [primary.name, ...candidates.map(c => c.entity)];
    const commonPrefix = this.findCommonPrefix(entityNames);
    const commonSuffix = this.findCommonSuffix(entityNames);
    
    let suggestedName = primary.name;
    
    if (commonPrefix.length > 2) {
      suggestedName = commonPrefix;
    } else if (commonSuffix.length > 2) {
      suggestedName = commonSuffix;
    }
    
    // Clean up the suggested name
    suggestedName = suggestedName.replace(/^(User|Chess|Puzzle|Game)/, '').replace(/(Data|Info|Config)$/, '');
    
    if (!suggestedName) {
      suggestedName = this.extractCoreEntityName(primary.name);
    }
    
    return `Merge into unified '${suggestedName}' entity with optional fields for variations`;
  }

  private normalizeType(type: string): string {
    return type
      .replace(/\s+/g, '')
      .replace(/'/g, '"')
      .toLowerCase();
  }

  private findCommonPrefix(strings: string[]): string {
    if (strings.length === 0) return '';
    
    let prefix = strings[0];
    for (let i = 1; i < strings.length; i++) {
      while (!strings[i].startsWith(prefix) && prefix.length > 0) {
        prefix = prefix.slice(0, -1);
      }
    }
    
    return prefix;
  }

  private findCommonSuffix(strings: string[]): string {
    if (strings.length === 0) return '';
    
    let suffix = strings[0];
    for (let i = 1; i < strings.length; i++) {
      while (!strings[i].endsWith(suffix) && suffix.length > 0) {
        suffix = suffix.slice(1);
      }
    }
    
    return suffix;
  }

  private extractCoreEntityName(name: string): string {
    // Remove common prefixes and suffixes to get core entity name
    return name
      .replace(/^(User|Chess|Puzzle|Game|Study|Analysis)/, '')
      .replace(/(Data|Info|Config|Settings|Preferences|Stats|Progress|Session)$/, '')
      .replace(/^[a-z]/, char => char.toUpperCase()) || name;
  }
}