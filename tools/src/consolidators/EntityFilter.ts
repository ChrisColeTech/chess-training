import { InterfaceDefinition, PropertyDefinition } from '../types';

export interface FilteredEntity {
  interface: InterfaceDefinition;
  category: EntityCategory;
  confidence: number;
  reasoning: string[];
}

export enum EntityCategory {
  DATABASE_ENTITY = 'database_entity',
  UI_COMPONENT = 'ui_component', 
  CONFIGURATION = 'configuration',
  MOCK_DATA = 'mock_data',
  UTILITY_TYPE = 'utility_type'
}

export class EntityFilter {
  private readonly UI_INDICATORS = [
    'props', 'component', 'element', 'ref', 'handler', 'callback', 'event',
    'onclick', 'onchange', 'onsubmit', 'classname', 'style', 'children',
    'jsx', 'react', 'render', 'display', 'show', 'hide', 'visible'
  ];

  private readonly CONFIG_INDICATORS = [
    'config', 'settings', 'options', 'defaults', 'theme', 'preference',
    'ui', 'layout', 'appearance', 'display', 'format', 'style'
  ];

  private readonly MOCK_INDICATORS = [
    'mock', 'test', 'demo', 'example', 'sample', 'placeholder', 
    'dummy', 'fake', 'stub'
  ];

  private readonly DATABASE_INDICATORS = [
    'id', 'uuid', 'created_at', 'updated_at', 'deleted_at',
    'user_id', 'foreign', 'primary', 'key', 'table', 'record',
    'entity', 'model', 'data', 'info', 'details'
  ];

  private readonly UTILITY_INDICATORS = [
    'type', 'union', 'literal', 'enum', 'constant', 'helper',
    'util', 'common', 'shared', 'base'
  ];

  public filterEntities(interfaces: InterfaceDefinition[]): FilteredEntity[] {
    return interfaces.map(iface => this.categorizeEntity(iface));
  }

  public getDatabaseEntities(filteredEntities: FilteredEntity[]): InterfaceDefinition[] {
    return filteredEntities
      .filter(entity => entity.category === EntityCategory.DATABASE_ENTITY)
      .filter(entity => entity.confidence >= 70) // High confidence threshold
      .map(entity => entity.interface);
  }

  private categorizeEntity(iface: InterfaceDefinition): FilteredEntity {
    const name = iface.name.toLowerCase();
    const filePath = iface.filePath.toLowerCase();
    const properties = iface.properties;
    
    const scores: { [key: string]: number } = {
      [EntityCategory.DATABASE_ENTITY]: 0,
      [EntityCategory.UI_COMPONENT]: 0,
      [EntityCategory.CONFIGURATION]: 0,
      [EntityCategory.MOCK_DATA]: 0,
      [EntityCategory.UTILITY_TYPE]: 0
    };

    const reasoning: string[] = [];

    // Analyze interface name
    this.scoreByName(name, scores, reasoning);
    
    // Analyze file path
    this.scoreByFilePath(filePath, scores, reasoning);
    
    // Analyze properties
    this.scoreByProperties(properties, scores, reasoning);
    
    // Analyze interface structure
    this.scoreByStructure(iface, scores, reasoning);

    // Determine final category and confidence
    const category = this.getHighestScoringCategory(scores);
    const confidence = this.calculateConfidence(scores, category);

    return {
      interface: iface,
      category,
      confidence,
      reasoning
    };
  }

  private scoreByName(name: string, scores: { [key: string]: number }, reasoning: string[]): { [key: string]: number } {
    // UI Component indicators
    if (name.endsWith('props') || name.endsWith('component')) {
      scores[EntityCategory.UI_COMPONENT] += 50;
      reasoning.push(`Name ends with 'props' or 'component'`);
    }

    // Configuration indicators  
    if (this.CONFIG_INDICATORS.some(indicator => name.includes(indicator))) {
      scores[EntityCategory.CONFIGURATION] += 40;
      reasoning.push(`Name contains configuration keywords`);
    }

    // Mock data indicators
    if (this.MOCK_INDICATORS.some(indicator => name.includes(indicator))) {
      scores[EntityCategory.MOCK_DATA] += 60;
      reasoning.push(`Name contains mock/test keywords`);
    }

    // Database entity indicators
    if (name.includes('user') || name.includes('puzzle') || name.includes('game') || 
        name.includes('session') || name.includes('progress') || name.includes('achievement')) {
      scores[EntityCategory.DATABASE_ENTITY] += 30;
      reasoning.push(`Name suggests core business entity`);
    }

    // Utility type indicators
    if (name.includes('type') || name.includes('option') || name.includes('enum')) {
      scores[EntityCategory.UTILITY_TYPE] += 40;
      reasoning.push(`Name suggests utility type`);
    }

    return scores;
  }

  private scoreByFilePath(filePath: string, scores: { [key: string]: number }, reasoning: string[]): { [key: string]: number } {
    // File location analysis
    if (filePath.includes('components/') || filePath.includes('pages/')) {
      scores[EntityCategory.UI_COMPONENT] += 30;
      reasoning.push(`Located in UI components/pages directory`);
    }

    if (filePath.includes('types/')) {
      scores[EntityCategory.DATABASE_ENTITY] += 20;
      scores[EntityCategory.UTILITY_TYPE] += 20;
      reasoning.push(`Located in types directory`);
    }

    if (filePath.includes('data/')) {
      scores[EntityCategory.DATABASE_ENTITY] += 30;
      scores[EntityCategory.CONFIGURATION] += 20;
      reasoning.push(`Located in data directory`);
    }

    if (filePath.includes('mock') || filePath.includes('test')) {
      scores[EntityCategory.MOCK_DATA] += 50;
      reasoning.push(`Located in mock/test directory`);
    }

    return scores;
  }

  private scoreByProperties(properties: PropertyDefinition[], scores: { [key: string]: number }, reasoning: string[]): { [key: string]: number } {
    let dbProperties = 0;
    let uiProperties = 0;
    let configProperties = 0;

    for (const prop of properties) {
      const propName = prop.name.toLowerCase();
      
      // Database property patterns
      if (propName === 'id' || propName.endsWith('_id') || propName.endsWith('id')) {
        dbProperties += 2;
      }
      if (['created_at', 'updated_at', 'deleted_at'].includes(propName)) {
        dbProperties += 2;
      }
      if (['email', 'username', 'password', 'hash'].includes(propName)) {
        dbProperties += 1;
      }

      // UI property patterns
      if (this.UI_INDICATORS.some(indicator => propName.includes(indicator))) {
        uiProperties += 1;
      }
      if (prop.type.includes('React.') || prop.type.includes('JSX') || prop.type.includes('Component')) {
        uiProperties += 2;
      }

      // Configuration property patterns
      if (this.CONFIG_INDICATORS.some(indicator => propName.includes(indicator))) {
        configProperties += 1;
      }
    }

    // Apply scores based on property analysis
    if (dbProperties > uiProperties && dbProperties > configProperties) {
      scores[EntityCategory.DATABASE_ENTITY] += Math.min(dbProperties * 10, 50);
      reasoning.push(`High database property indicators (${dbProperties})`);
    }

    if (uiProperties > 2) {
      scores[EntityCategory.UI_COMPONENT] += Math.min(uiProperties * 5, 40);
      reasoning.push(`Multiple UI property indicators (${uiProperties})`);
    }

    if (configProperties > 2) {
      scores[EntityCategory.CONFIGURATION] += Math.min(configProperties * 5, 30);
      reasoning.push(`Multiple configuration property indicators (${configProperties})`);
    }

    return scores;
  }

  private scoreByStructure(iface: InterfaceDefinition, scores: { [key: string]: number }, reasoning: string[]): { [key: string]: number } {
    // Large interfaces with many properties might be configuration
    if (iface.properties.length > 15) {
      scores[EntityCategory.CONFIGURATION] += 20;
      reasoning.push(`Large interface (${iface.properties.length} properties) suggests configuration`);
    }

    // Small interfaces with few properties might be utility types
    if (iface.properties.length < 3) {
      scores[EntityCategory.UTILITY_TYPE] += 15;
      reasoning.push(`Small interface (${iface.properties.length} properties) suggests utility type`);
    }

    // Interfaces with inheritance might be database entities
    if (iface.extends && iface.extends.length > 0) {
      scores[EntityCategory.DATABASE_ENTITY] += 15;
      reasoning.push(`Inherits from other interfaces, suggests entity hierarchy`);
    }

    // Check for common database patterns
    const hasId = iface.properties.some(p => p.name.toLowerCase() === 'id');
    const hasTimestamps = iface.properties.some(p => 
      ['created_at', 'updated_at', 'createdat', 'updatedat'].includes(p.name.toLowerCase())
    );

    if (hasId && hasTimestamps) {
      scores[EntityCategory.DATABASE_ENTITY] += 40;
      reasoning.push(`Has ID and timestamp fields - strong database entity pattern`);
    }

    return scores;
  }

  private getHighestScoringCategory(scores: { [key: string]: number }): EntityCategory {
    let highestCategory = EntityCategory.UTILITY_TYPE;
    let highestScore = 0;
    
    for (const [category, score] of Object.entries(scores)) {
      if (score > highestScore) {
        highestScore = score;
        highestCategory = category as EntityCategory;
      }
    }
    
    return highestCategory;
  }

  private calculateConfidence(scores: { [key: string]: number }, category: EntityCategory): number {
    const categoryScore = scores[category];
    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
    
    if (totalScore === 0) return 50; // Neutral confidence
    
    const confidence = Math.round((categoryScore / totalScore) * 100);
    return Math.min(confidence, 95); // Cap at 95% confidence
  }

  public generateFilterReport(filteredEntities: FilteredEntity[]): string {
    const categoryCounts = {
      [EntityCategory.DATABASE_ENTITY]: 0,
      [EntityCategory.UI_COMPONENT]: 0,
      [EntityCategory.CONFIGURATION]: 0,
      [EntityCategory.MOCK_DATA]: 0,
      [EntityCategory.UTILITY_TYPE]: 0
    };

    for (const entity of filteredEntities) {
      categoryCounts[entity.category]++;
    }

    const databaseEntities = filteredEntities.filter(e => 
      e.category === EntityCategory.DATABASE_ENTITY && e.confidence >= 70
    );

    return `# Entity Filtering Report

## Summary
- **Total Interfaces Analyzed:** ${filteredEntities.length}
- **Database Entities:** ${categoryCounts[EntityCategory.DATABASE_ENTITY]} (${databaseEntities.length} high-confidence)
- **UI Components:** ${categoryCounts[EntityCategory.UI_COMPONENT]}
- **Configuration:** ${categoryCounts[EntityCategory.CONFIGURATION]}
- **Mock/Test Data:** ${categoryCounts[EntityCategory.MOCK_DATA]}
- **Utility Types:** ${categoryCounts[EntityCategory.UTILITY_TYPE]}

## High-Confidence Database Entities (${databaseEntities.length})
${databaseEntities.map(entity => 
  `- **${entity.interface.name}** (${entity.confidence}% confidence) - ${entity.reasoning.slice(0, 2).join('; ')}`
).join('\n')}

## Filtering Effectiveness
- **Reduction:** ${filteredEntities.length} → ${databaseEntities.length} (${Math.round((1 - databaseEntities.length / filteredEntities.length) * 100)}% reduction)
- **Focus:** Core business entities only
`;
  }
}