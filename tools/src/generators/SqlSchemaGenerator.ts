import * as fs from 'fs';
import * as path from 'path';
import { SchemaAnalysisResult, TableDefinition, ColumnDefinition, SqlSchema, InterfaceDefinition } from '../types';

export class SqlSchemaGenerator {
  private readonly TYPE_MAPPINGS: { [key: string]: string } = {
    'string': 'VARCHAR(255)',
    'number': 'INTEGER',
    'boolean': 'BOOLEAN',
    'Date': 'TIMESTAMP',
    'string[]': 'TEXT', // JSON array
    'number[]': 'TEXT', // JSON array
    'any': 'TEXT',
    'unknown': 'TEXT'
  };

  public async generate(analysis: SchemaAnalysisResult, outputDir: string): Promise<void> {
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const schema = this.generateSqlSchema(analysis);
    
    // Generate SQL DDL
    const sqlPath = path.join(outputDir, 'chess-training-schema.sql');
    const sqlContent = this.generateSqlDDL(schema);
    fs.writeFileSync(sqlPath, sqlContent, 'utf8');
    
    // Generate migration plan
    const migrationPath = path.join(outputDir, 'migration-plan.json');
    const migrationPlan = this.generateMigrationPlan(schema, analysis);
    fs.writeFileSync(migrationPath, JSON.stringify(migrationPlan, null, 2), 'utf8');
  }

  private generateSqlSchema(analysis: SchemaAnalysisResult): SqlSchema {
    const schema: SqlSchema = {
      domains: {},
      migrationOrder: [],
      constraints: []
    };

    // Process each domain
    for (const [domainName, domainData] of Object.entries(analysis.domains)) {
      const domainEntities = this.getDomainInterfaces(domainName, domainData.entities, analysis);
      const tables = this.generateTablesForDomain(domainEntities, domainName);
      
      schema.domains[domainName] = {
        tables,
        relationships: domainData.relationships,
        indexes: this.generateIndexes(tables)
      };
    }

    // Generate migration order based on dependencies
    schema.migrationOrder = this.calculateMigrationOrder(schema);
    schema.constraints = this.generateConstraints(schema);

    return schema;
  }

  private getDomainInterfaces(domainName: string, entityNames: string[], analysis: SchemaAnalysisResult): InterfaceDefinition[] {
    const interfaces: InterfaceDefinition[] = [];
    
    for (const data of analysis.rawData) {
      for (const iface of data.interfaces) {
        if (entityNames.includes(iface.name)) {
          interfaces.push(iface);
        }
      }
    }
    
    return interfaces;
  }

  private generateTablesForDomain(interfaces: InterfaceDefinition[], domainName: string): TableDefinition[] {
    const tables: TableDefinition[] = [];
    
    for (const iface of interfaces) {
      const table = this.interfaceToTable(iface, domainName);
      if (table) {
        tables.push(table);
      }
    }
    
    return tables;
  }

  private interfaceToTable(iface: InterfaceDefinition, domainName: string): TableDefinition | null {
    const tableName = this.toSnakeCase(iface.name);
    const columns: ColumnDefinition[] = [];
    const foreignKeys: any[] = [];
    
    // Always add primary key
    columns.push({
      name: 'id',
      type: 'UUID',
      nullable: false,
      defaultValue: 'gen_random_uuid()',
      comment: 'Primary key'
    });
    
    // Process interface properties
    for (const prop of iface.properties) {
      const column = this.propertyToColumn(prop);
      if (column) {
        columns.push(column);
        
        // Check for foreign key relationships
        if (prop.name.endsWith('Id') || prop.name.endsWith('_id')) {
          const fk = this.inferForeignKey(prop.name, tableName);
          if (fk) {
            foreignKeys.push(fk);
          }
        }
      }
    }
    
    // Add audit fields for most entities (except UI config)
    if (!this.isUIConfigEntity(iface.name)) {
      columns.push(
        {
          name: 'created_at',
          type: 'TIMESTAMP',
          nullable: false,
          defaultValue: 'CURRENT_TIMESTAMP',
          comment: 'Record creation timestamp'
        },
        {
          name: 'updated_at',
          type: 'TIMESTAMP',
          nullable: false,
          defaultValue: 'CURRENT_TIMESTAMP',
          comment: 'Record last update timestamp'
        }
      );
    }
    
    return {
      name: tableName,
      columns,
      primaryKey: ['id'],
      foreignKeys,
      indexes: this.generateTableIndexes(tableName, columns),
      domain: domainName
    };
  }

  private propertyToColumn(prop: any): ColumnDefinition | null {
    let sqlType = this.mapTypeScriptToSql(prop.type);
    
    // Handle special cases
    if (prop.name.toLowerCase().includes('email')) {
      sqlType = 'VARCHAR(255)';
    } else if (prop.name.toLowerCase().includes('password')) {
      sqlType = 'VARCHAR(255)';
    } else if (prop.name.toLowerCase().includes('rating')) {
      sqlType = 'INTEGER';
    } else if (prop.type.includes('[]')) {
      sqlType = 'TEXT'; // Store as JSON
    }
    
    return {
      name: this.toSnakeCase(prop.name),
      type: sqlType,
      nullable: prop.optional || false,
      comment: prop.description
    };
  }

  private mapTypeScriptToSql(tsType: string): string {
    const cleanType = tsType.replace(/\s+/g, '').toLowerCase();
    
    // Handle union types - take the first type
    if (cleanType.includes('|')) {
      const firstType = cleanType.split('|')[0].trim();
      return this.TYPE_MAPPINGS[firstType] || 'TEXT';
    }
    
    // Handle array types
    if (cleanType.includes('[]')) {
      return 'TEXT'; // Store as JSON
    }
    
    // Direct mapping
    return this.TYPE_MAPPINGS[cleanType] || 'TEXT';
  }

  private inferForeignKey(propName: string, tableName: string): any | null {
    const baseName = propName.replace(/Id$|_id$/i, '');
    const referencedTable = this.toSnakeCase(baseName);
    
    // Don't create self-references or invalid references
    if (referencedTable === tableName || referencedTable.length < 2) {
      return null;
    }
    
    return {
      column: this.toSnakeCase(propName),
      referencedTable: referencedTable,
      referencedColumn: 'id'
    };
  }

  private generateTableIndexes(tableName: string, columns: ColumnDefinition[]): string[] {
    const indexes: string[] = [];
    
    // Add indexes for common query patterns
    for (const column of columns) {
      if (column.name.includes('_id') || 
          column.name.includes('email') || 
          column.name.includes('username') ||
          column.name === 'created_at') {
        indexes.push(`idx_${tableName}_${column.name}`);
      }
    }
    
    return indexes;
  }

  private generateIndexes(tables: TableDefinition[]): string[] {
    const indexes: string[] = [];
    
    for (const table of tables) {
      indexes.push(...table.indexes);
    }
    
    return indexes;
  }

  private calculateMigrationOrder(schema: SqlSchema): string[] {
    const order: string[] = [];
    const domains = Object.keys(schema.domains);
    
    // Prioritize domains with fewer dependencies
    const priorityOrder = ['user', 'system', 'puzzle', 'game', 'learning', 'opening', 'progress'];
    
    for (const domain of priorityOrder) {
      if (domains.includes(domain)) {
        order.push(domain);
      }
    }
    
    // Add any remaining domains
    for (const domain of domains) {
      if (!order.includes(domain)) {
        order.push(domain);
      }
    }
    
    return order;
  }

  private generateConstraints(schema: SqlSchema): string[] {
    const constraints: string[] = [];
    
    // Add common constraints
    constraints.push(
      'ALTER TABLE users ADD CONSTRAINT unique_email UNIQUE (email);',
      'ALTER TABLE users ADD CONSTRAINT unique_username UNIQUE (username);'
    );
    
    return constraints;
  }

  private generateSqlDDL(schema: SqlSchema): string {
    const timestamp = new Date().toISOString();
    
    let sql = `-- Chess Training Database Schema
-- Generated: ${timestamp}
-- Tool: Chess Schema Analyzer v1.0.0

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

`;

    // Generate tables by domain
    for (const domainName of schema.migrationOrder) {
      const domain = schema.domains[domainName];
      
      sql += `-- ========================================
-- ${domainName.toUpperCase()} DOMAIN
-- ========================================

`;
      
      for (const table of domain.tables) {
        sql += this.generateTableDDL(table) + '\\n\\n';
      }
    }
    
    // Add indexes
    sql += `-- ========================================
-- INDEXES
-- ========================================

`;
    
    for (const [domainName, domain] of Object.entries(schema.domains)) {
      for (const table of domain.tables) {
        for (const indexName of table.indexes) {
          const columnName = indexName.replace(`idx_${table.name}_`, '');
          sql += `CREATE INDEX ${indexName} ON ${table.name} (${columnName});\\n`;
        }
      }
    }
    
    // Add constraints
    if (schema.constraints.length > 0) {
      sql += `\\n-- ========================================
-- CONSTRAINTS
-- ========================================

`;
      
      for (const constraint of schema.constraints) {
        sql += constraint + '\\n';
      }
    }
    
    return sql;
  }

  private generateTableDDL(table: TableDefinition): string {
    let sql = `-- ${table.name} table\\n`;
    sql += `CREATE TABLE ${table.name} (\\n`;
    
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
    
    sql += columnDDL.join(',\\n');
    
    // Primary key
    if (table.primaryKey.length > 0) {
      sql += `,\\n  PRIMARY KEY (${table.primaryKey.join(', ')})`;
    }
    
    sql += '\\n);';
    
    // Add foreign keys as separate ALTER statements
    for (const fk of table.foreignKeys) {
      sql += `\\nALTER TABLE ${table.name} ADD FOREIGN KEY (${fk.column}) REFERENCES ${fk.referencedTable} (${fk.referencedColumn});`;
    }
    
    return sql;
  }

  private generateMigrationPlan(schema: SqlSchema, analysis: SchemaAnalysisResult): any {
    return {
      overview: {
        totalTables: analysis.estimatedTables,
        totalDomains: Object.keys(schema.domains).length,
        estimatedDuration: '2-3 weeks',
        complexity: analysis.estimatedTables > 30 ? 'high' : 'medium'
      },
      phases: schema.migrationOrder.map((domainName, index) => ({
        phase: index + 1,
        name: `${domainName.charAt(0).toUpperCase() + domainName.slice(1)} Domain`,
        tables: schema.domains[domainName].tables.map(t => t.name),
        priority: analysis.domains[domainName]?.priority || 'medium',
        estimatedTime: this.estimateMigrationTime(schema.domains[domainName].tables.length),
        dependencies: index === 0 ? [] : [schema.migrationOrder[index - 1]]
      })),
      consolidations: analysis.duplicates.map(dup => ({
        action: 'merge',
        entities: [dup.primaryEntity, ...dup.duplicates.map(d => d.entity)],
        target: this.toSnakeCase(dup.primaryEntity),
        estimatedSavings: dup.estimatedSavings,
        consolidationStrategy: dup.consolidationSuggestion
      }))
    };
  }

  private estimateMigrationTime(tableCount: number): string {
    const hours = Math.max(2, tableCount * 0.5);
    
    if (hours < 8) {
      return `${hours} hours`;
    } else {
      return `${Math.ceil(hours / 8)} days`;
    }
  }

  private toSnakeCase(str: string): string {
    return str
      .replace(/([A-Z])/g, '_$1')
      .toLowerCase()
      .replace(/^_/, '')
      .replace(/[^a-z0-9_]/g, '_')
      .replace(/_+/g, '_');
  }

  private isUIConfigEntity(name: string): boolean {
    const uiKeywords = ['config', 'ui', 'theme', 'settings', 'defaults', 'preferences'];
    const lowerName = name.toLowerCase();
    
    return uiKeywords.some(keyword => lowerName.includes(keyword));
  }
}