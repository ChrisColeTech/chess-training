import { InterfaceDefinition, TableDefinition, ColumnDefinition, SqlSchema } from '../types';
import { FilteredEntity, EntityCategory } from './EntityFilter';
import { ConsolidationResult } from './DuplicateConsolidator';

export interface OptimizedSchema {
  domains: {
    [domain: string]: {
      tables: TableDefinition[];
      relationships: string[];
      estimatedEndpoints: string[];
    }
  };
  totalTables: number;
  totalEndpoints: number;
  optimizationSummary: string;
}

export class OptimizedSchemaGenerator {
  private readonly DOMAIN_MAPPING = {
    user: ['user', 'auth', 'account', 'profile', 'subscription', 'security'],
    puzzle: ['puzzle', 'tactical', 'endgame', 'custom', 'collection', 'solve'],
    game: ['game', 'move', 'analysis', 'review', 'master', 'pgn', 'position'],
    learning: ['learning', 'study', 'lesson', 'path', 'tutorial', 'plan'],
    opening: ['opening', 'repertoire', 'variation', 'eco', 'theory'],
    progress: ['progress', 'achievement', 'stats', 'performance', 'rating'],
    system: ['notification', 'settings', 'config', 'preference']
  };

  private readonly CORE_ENDPOINTS = {
    user: ['/api/auth/login', '/api/auth/register', '/api/users/profile', '/api/users/preferences'],
    puzzle: ['/api/puzzles', '/api/puzzles/{id}/solve', '/api/puzzle-collections', '/api/puzzle-attempts'],
    game: ['/api/games', '/api/games/{id}', '/api/games/analysis', '/api/master-games'],
    learning: ['/api/learning-paths', '/api/lessons', '/api/study-sessions', '/api/progress'],
    opening: ['/api/openings', '/api/repertoire', '/api/variations'],
    progress: ['/api/achievements', '/api/stats', '/api/leaderboard'],
    system: ['/api/notifications', '/api/settings']
  };

  public generateOptimizedSchema(
    filteredEntities: FilteredEntity[],
    consolidationResult: ConsolidationResult
  ): OptimizedSchema {
    // Get only high-confidence database entities
    const databaseEntities = filteredEntities
      .filter(e => e.category === EntityCategory.DATABASE_ENTITY && e.confidence >= 70)
      .map(e => e.interface);

    // Apply consolidation results  
    const finalEntities = this.applyConsolidation(databaseEntities, consolidationResult);

    // Group entities by domain
    const domainGroups = this.groupEntitiesByDomain(finalEntities);

    // Generate optimized tables for each domain
    const domains: any = {};
    let totalTables = 0;
    let totalEndpoints = 0;

    for (const [domainName, entities] of Object.entries(domainGroups)) {
      const tables = this.generateOptimizedTables(entities as InterfaceDefinition[], domainName);
      const endpoints = this.CORE_ENDPOINTS[domainName as keyof typeof this.CORE_ENDPOINTS] || [];
      const relationships = this.detectDomainRelationships(tables);

      domains[domainName] = {
        tables,
        relationships,
        estimatedEndpoints: endpoints
      };

      totalTables += tables.length;
      totalEndpoints += endpoints.length;
    }

    return {
      domains,
      totalTables,
      totalEndpoints,
      optimizationSummary: this.generateOptimizationSummary(
        filteredEntities.length,
        totalTables,
        consolidationResult.savings
      )
    };
  }

  private applyConsolidation(
    entities: InterfaceDefinition[],
    consolidationResult: ConsolidationResult
  ): InterfaceDefinition[] {
    const consolidated = new Set<string>();
    const finalEntities: InterfaceDefinition[] = [];

    // Add consolidated entities
    for (const plan of consolidationResult.plans) {
      finalEntities.push(plan.consolidatedInterface);
      plan.sourceEntities.forEach(entity => consolidated.add(entity));
    }

    // Add non-consolidated entities
    for (const entity of entities) {
      if (!consolidated.has(entity.name)) {
        finalEntities.push(entity);
      }
    }

    return finalEntities;
  }

  private groupEntitiesByDomain(entities: InterfaceDefinition[]): { [domain: string]: InterfaceDefinition[] } {
    const domainGroups: { [domain: string]: InterfaceDefinition[] } = {};

    // Initialize domains
    Object.keys(this.DOMAIN_MAPPING).forEach(domain => {
      domainGroups[domain] = [];
    });

    for (const entity of entities) {
      const domain = this.classifyEntityDomain(entity);
      domainGroups[domain].push(entity);
    }

    // Filter out empty domains
    return Object.fromEntries(
      Object.entries(domainGroups).filter(([_, entities]) => entities.length > 0)
    );
  }

  private classifyEntityDomain(entity: InterfaceDefinition): string {
    const name = entity.name.toLowerCase();
    const filePath = entity.filePath.toLowerCase();
    const text = `${name} ${filePath}`;

    for (const [domain, keywords] of Object.entries(this.DOMAIN_MAPPING)) {
      if (keywords.some(keyword => text.includes(keyword))) {
        return domain;
      }
    }

    return 'system'; // Default domain
  }

  private generateOptimizedTables(entities: InterfaceDefinition[], domainName: string): TableDefinition[] {
    const tables: TableDefinition[] = [];

    for (const entity of entities) {
      const table = this.createOptimizedTable(entity, domainName);
      if (table) {
        tables.push(table);
      }
    }

    return tables;
  }

  private createOptimizedTable(entity: InterfaceDefinition, domain: string): TableDefinition {
    const tableName = this.toSnakeCase(entity.name);
    const columns: ColumnDefinition[] = [];

    // Always add UUID primary key
    columns.push({
      name: 'id',
      type: 'UUID',
      nullable: false,
      defaultValue: 'gen_random_uuid()',
      comment: 'Primary key'
    });

    // Process entity properties
    for (const prop of entity.properties) {
      const column = this.propertyToOptimizedColumn(prop, domain);
      if (column) {
        columns.push(column);
      }
    }

    // Add standard audit fields (except for configuration tables)
    if (!this.isConfigurationTable(entity.name)) {
      columns.push(
        {
          name: 'created_at',
          type: 'TIMESTAMP',
          nullable: false,
          defaultValue: 'CURRENT_TIMESTAMP',
          comment: 'Creation timestamp'
        },
        {
          name: 'updated_at',
          type: 'TIMESTAMP',
          nullable: false,
          defaultValue: 'CURRENT_TIMESTAMP',
          comment: 'Last update timestamp'
        }
      );
    }

    return {
      name: tableName,
      columns,
      primaryKey: ['id'],
      foreignKeys: this.detectForeignKeys(columns, tableName),
      indexes: this.generateOptimizedIndexes(tableName, columns),
      domain
    };
  }

  private propertyToOptimizedColumn(prop: any, domain: string): ColumnDefinition | null {
    const name = this.toSnakeCase(prop.name);
    
    // Skip UI-specific properties
    if (this.isUIProperty(prop.name)) {
      return null;
    }

    let sqlType = this.mapTypeToOptimizedSql(prop.type, prop.name);
    
    return {
      name,
      type: sqlType,
      nullable: prop.optional || false,
      comment: prop.description
    };
  }

  private mapTypeToOptimizedSql(tsType: string, propertyName: string): string {
    const name = propertyName.toLowerCase();
    
    // Specific field optimizations
    if (name.includes('email')) return 'VARCHAR(255)';
    if (name.includes('password') || name.includes('hash')) return 'VARCHAR(255)';
    if (name.includes('rating') || name.includes('score')) return 'INTEGER';
    if (name.includes('elo')) return 'INTEGER';
    if (name === 'id' || name.endsWith('_id') || name.endsWith('id')) return 'UUID';
    
    // Array/Object types -> JSON
    if (tsType.includes('[]') || tsType.includes('{') || tsType.includes('Array<')) {
      return 'JSONB';
    }
    
    // Union types with many options -> ENUM or JSON
    if (tsType.includes('|') && tsType.split('|').length > 5) {
      return 'TEXT';
    }
    
    // Basic type mappings
    if (tsType.includes('string')) return 'VARCHAR(255)';
    if (tsType.includes('number')) return 'INTEGER';
    if (tsType.includes('boolean')) return 'BOOLEAN';
    if (tsType.includes('Date')) return 'TIMESTAMP';
    
    return 'TEXT'; // Default fallback
  }

  private isUIProperty(propertyName: string): boolean {
    const uiProps = [
      'onclick', 'onchange', 'onsubmit', 'classname', 'style', 'children',
      'component', 'render', 'display', 'show', 'hide', 'visible'
    ];
    
    const name = propertyName.toLowerCase();
    return uiProps.some(prop => name.includes(prop));
  }

  private isConfigurationTable(entityName: string): boolean {
    const configKeywords = ['config', 'settings', 'preferences', 'defaults', 'theme'];
    const name = entityName.toLowerCase();
    return configKeywords.some(keyword => name.includes(keyword));
  }

  private detectForeignKeys(columns: ColumnDefinition[], tableName: string): any[] {
    const foreignKeys: any[] = [];
    
    for (const column of columns) {
      if ((column.name.endsWith('_id') || column.name.endsWith('id')) && column.name !== 'id') {
        const referencedTable = column.name.replace(/_id$|id$/, '');
        
        // Don't create self-references or invalid references
        if (referencedTable !== tableName && referencedTable.length > 1) {
          foreignKeys.push({
            column: column.name,
            referencedTable: this.pluralize(referencedTable),
            referencedColumn: 'id'
          });
        }
      }
    }
    
    return foreignKeys;
  }

  private generateOptimizedIndexes(tableName: string, columns: ColumnDefinition[]): string[] {
    const indexes: string[] = [];
    
    for (const column of columns) {
      // Index foreign keys, unique fields, and common query fields
      if (column.name.endsWith('_id') || 
          column.name.includes('email') || 
          column.name.includes('username') ||
          column.name === 'created_at' ||
          column.name.includes('rating')) {
        indexes.push(`idx_${tableName}_${column.name}`);
      }
    }
    
    return indexes;
  }

  private detectDomainRelationships(tables: TableDefinition[]): string[] {
    const relationships: string[] = [];
    
    for (const table of tables) {
      for (const fk of table.foreignKeys) {
        relationships.push(`${table.name}.${fk.column} → ${fk.referencedTable}.${fk.referencedColumn}`);
      }
    }
    
    return relationships;
  }

  private generateOptimizationSummary(
    originalCount: number,
    finalTableCount: number,
    consolidationSavings: number
  ): string {
    const totalReduction = originalCount - finalTableCount;
    const reductionPercentage = Math.round((totalReduction / originalCount) * 100);
    
    return `Optimized from ${originalCount} interfaces to ${finalTableCount} database tables (${reductionPercentage}% reduction). Eliminated ${consolidationSavings} duplicate entities and filtered out UI/configuration interfaces.`;
  }

  private toSnakeCase(str: string): string {
    return str
      .replace(/([A-Z])/g, '_$1')
      .toLowerCase()
      .replace(/^_/, '')
      .replace(/[^a-z0-9_]/g, '_')
      .replace(/_+/g, '_');
  }

  private pluralize(word: string): string {
    if (word.endsWith('y')) return word.slice(0, -1) + 'ies';
    if (word.endsWith('s')) return word + 'es';
    return word + 's';
  }

  public generateOptimizedSql(schema: OptimizedSchema): string {
    const timestamp = new Date().toISOString();
    
    let sql = `-- Optimized Chess Training Database Schema
-- Generated: ${timestamp}
-- Tool: Chess Schema Consolidator v1.0.0
-- ${schema.optimizationSummary}

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

`;

    // Generate tables by domain
    for (const [domainName, domainData] of Object.entries(schema.domains)) {
      sql += `-- ========================================
-- ${domainName.toUpperCase()} DOMAIN (${domainData.tables.length} tables)
-- ========================================

`;
      
      for (const table of domainData.tables) {
        sql += this.generateTableDDL(table) + '\n\n';
      }
    }
    
    // Add indexes
    sql += `-- ========================================
-- INDEXES
-- ========================================

`;
    
    for (const [_, domainData] of Object.entries(schema.domains)) {
      for (const table of domainData.tables) {
        for (const indexName of table.indexes) {
          const columnName = indexName.replace(`idx_${table.name}_`, '');
          sql += `CREATE INDEX ${indexName} ON ${table.name} (${columnName});\n`;
        }
      }
    }
    
    return sql;
  }

  private generateTableDDL(table: TableDefinition): string {
    let sql = `-- ${table.name} table\nCREATE TABLE ${table.name} (\n`;
    
    // Columns
    const columnDDL = table.columns.map(col => {
      let line = `  ${col.name} ${col.type}`;
      
      if (!col.nullable) {
        line += ' NOT NULL';
      }
      
      if (col.defaultValue) {
        line += ` DEFAULT ${col.defaultValue}`;
      }
      
      return line;
    });
    
    sql += columnDDL.join(',\n');
    
    // Primary key
    if (table.primaryKey.length > 0) {
      sql += `,\n  PRIMARY KEY (${table.primaryKey.join(', ')})`;
    }
    
    sql += '\n);';
    
    // Add foreign keys as separate ALTER statements
    for (const fk of table.foreignKeys) {
      sql += `\nALTER TABLE ${table.name} ADD FOREIGN KEY (${fk.column}) REFERENCES ${fk.referencedTable} (${fk.referencedColumn});`;
    }
    
    return sql;
  }
}