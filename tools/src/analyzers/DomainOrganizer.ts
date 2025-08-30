import { InterfaceDefinition, DomainAnalysis, RelationshipDefinition } from '../types';

export enum ChessDomain {
  USER = 'user',
  PUZZLE = 'puzzle', 
  GAME = 'game',
  LEARNING = 'learning',
  OPENING = 'opening',
  PROGRESS = 'progress',
  SYSTEM = 'system'
}

export class DomainOrganizer {
  private readonly DOMAIN_KEYWORDS = {
    [ChessDomain.USER]: ['user', 'account', 'profile', 'auth', 'login', 'register', 'subscription', 'security', 'privacy'],
    [ChessDomain.PUZZLE]: ['puzzle', 'tactical', 'endgame', 'custom', 'collection', 'attempt', 'solve', 'hint'],
    [ChessDomain.GAME]: ['game', 'move', 'analysis', 'review', 'master', 'pgn', 'fen', 'position', 'engine'],
    [ChessDomain.LEARNING]: ['learning', 'study', 'lesson', 'path', 'module', 'tutorial', 'plan', 'schedule', 'recommendation'],
    [ChessDomain.OPENING]: ['opening', 'repertoire', 'variation', 'eco', 'tree', 'explorer', 'theory', 'database'],
    [ChessDomain.PROGRESS]: ['progress', 'achievement', 'stats', 'performance', 'analytics', 'streak', 'skill', 'rating', 'activity'],
    [ChessDomain.SYSTEM]: ['notification', 'settings', 'config', 'theme', 'preferences', 'board', 'sound', 'ui', 'help', 'contact']
  };

  private readonly API_PATTERNS = {
    [ChessDomain.USER]: ['/api/auth', '/api/users', '/api/profile', '/api/subscription'],
    [ChessDomain.PUZZLE]: ['/api/puzzles', '/api/puzzle-attempts', '/api/custom-puzzles', '/api/collections'],
    [ChessDomain.GAME]: ['/api/games', '/api/analysis', '/api/master-games', '/api/review'],
    [ChessDomain.LEARNING]: ['/api/learning-paths', '/api/lessons', '/api/study', '/api/recommendations'],
    [ChessDomain.OPENING]: ['/api/openings', '/api/repertoire', '/api/variations', '/api/explorer'],
    [ChessDomain.PROGRESS]: ['/api/progress', '/api/achievements', '/api/stats', '/api/analytics'],
    [ChessDomain.SYSTEM]: ['/api/notifications', '/api/settings', '/api/preferences', '/api/help']
  };

  public organizeDomains(interfaces: InterfaceDefinition[]): { [domainName: string]: DomainAnalysis } {
    const domains: { [domainName: string]: DomainAnalysis } = {};

    // Initialize all domains
    for (const domain of Object.values(ChessDomain)) {
      domains[domain] = {
        name: domain,
        entities: [],
        relationships: [],
        priority: 'medium',
        estimatedTables: 0,
        suggestedEndpoints: this.API_PATTERNS[domain] || []
      };
    }

    // Classify each interface
    for (const iface of interfaces) {
      const domain = this.classifyInterface(iface);
      domains[domain].entities.push(iface.name);
    }

    // Calculate priorities and estimates for each domain
    for (const [domainName, domainData] of Object.entries(domains)) {
      domainData.priority = this.calculatePriority(domainData.entities);
      domainData.estimatedTables = this.estimateTableCount(domainData.entities);
      domainData.relationships = this.detectRelationships(domainData.entities, interfaces);
    }

    // Filter out empty domains
    const filteredDomains: { [domainName: string]: DomainAnalysis } = {};
    for (const [name, domain] of Object.entries(domains)) {
      if (domain.entities.length > 0) {
        filteredDomains[name] = domain;
      }
    }

    return filteredDomains;
  }

  private classifyInterface(iface: InterfaceDefinition): ChessDomain {
    const name = iface.name.toLowerCase();
    const filePath = iface.filePath.toLowerCase();
    
    // Check filename and interface name for domain keywords
    const combinedText = `${name} ${filePath}`;
    
    const scores: { [domain: string]: number } = {};
    
    for (const [domain, keywords] of Object.entries(this.DOMAIN_KEYWORDS)) {
      scores[domain] = 0;
      
      for (const keyword of keywords) {
        // Direct name match gets highest score
        if (name.includes(keyword)) {
          scores[domain] += 10;
        }
        // File path match gets medium score
        if (filePath.includes(keyword)) {
          scores[domain] += 5;
        }
        // Property name match gets lower score
        for (const prop of iface.properties) {
          if (prop.name.toLowerCase().includes(keyword)) {
            scores[domain] += 2;
          }
        }
      }
    }
    
    // Find domain with highest score
    let bestDomain = ChessDomain.SYSTEM; // default
    let bestScore = 0;
    
    for (const [domain, score] of Object.entries(scores)) {
      if (score > bestScore) {
        bestScore = score;
        bestDomain = domain as ChessDomain;
      }
    }
    
    return bestDomain;
  }

  private calculatePriority(entities: string[]): 'high' | 'medium' | 'low' {
    const count = entities.length;
    
    if (count >= 8) return 'high';
    if (count >= 4) return 'medium';
    return 'low';
  }

  private estimateTableCount(entities: string[]): number {
    // Heuristic: assume some consolidation will happen
    // Complex entities might need multiple tables (main table + junction tables)
    const baseCount = entities.length;
    const consolidationFactor = 0.7; // 30% reduction from consolidation
    const complexityFactor = 1.2; // 20% increase for relationships
    
    return Math.max(1, Math.round(baseCount * consolidationFactor * complexityFactor));
  }

  private detectRelationships(entities: string[], allInterfaces: InterfaceDefinition[]): RelationshipDefinition[] {
    const relationships: RelationshipDefinition[] = [];
    
    // Create a map of entity names to their interfaces
    const entityMap = new Map<string, InterfaceDefinition>();
    for (const iface of allInterfaces) {
      entityMap.set(iface.name, iface);
    }
    
    // Look for relationships within domain entities
    for (const entityName of entities) {
      const entity = entityMap.get(entityName);
      if (!entity) continue;
      
      for (const prop of entity.properties) {
        // Look for foreign key patterns
        if (prop.name.endsWith('Id') || prop.name.endsWith('_id')) {
          const referencedEntity = this.inferReferencedEntity(prop.name, entities);
          if (referencedEntity && referencedEntity !== entityName) {
            relationships.push({
              from: entityName,
              to: referencedEntity,
              type: 'one-to-many',
              foreignKey: prop.name
            });
          }
        }
        
        // Look for array properties (one-to-many relationships)
        if (prop.type.includes('[]')) {
          const arrayType = prop.type.replace('[]', '').trim();
          if (entities.includes(arrayType)) {
            relationships.push({
              from: entityName,
              to: arrayType,
              type: 'one-to-many'
            });
          }
        }
      }
    }
    
    return relationships;
  }

  private inferReferencedEntity(foreignKeyName: string, entities: string[]): string | null {
    // Remove 'Id' or '_id' suffix and try to match entity names
    const baseName = foreignKeyName.replace(/Id$|_id$/, '');
    
    // Direct match
    for (const entity of entities) {
      if (entity.toLowerCase() === baseName.toLowerCase()) {
        return entity;
      }
    }
    
    // Partial match
    for (const entity of entities) {
      if (entity.toLowerCase().includes(baseName.toLowerCase()) || 
          baseName.toLowerCase().includes(entity.toLowerCase())) {
        return entity;
      }
    }
    
    return null;
  }
}