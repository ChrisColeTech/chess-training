// Core analysis types

export interface AnalyzerOptions {
  dataDir: string;
  typesDir: string;
  outputDir: string;
  domain?: string;
  verbose: boolean;
}

export interface PropertyDefinition {
  name: string;
  type: string;
  optional: boolean;
  description?: string;
}

export interface InterfaceDefinition {
  name: string;
  properties: PropertyDefinition[];
  extends?: string[];
  filePath: string;
  lineNumber: number;
  exported: boolean;
}

export interface TypeDefinition {
  name: string;
  type: string;
  filePath: string;
  lineNumber: number;
  exported: boolean;
}

export interface ExtractedData {
  fileName: string;
  filePath: string;
  interfaces: InterfaceDefinition[];
  types: TypeDefinition[];
  imports: string[];
  exports: string[];
}

export interface DuplicateCandidate {
  entity: string;
  similarityScore: number;
  conflictingProperties: string[];
  missingProperties: string[];
  filePath: string;
}

export interface DuplicateAnalysis {
  primaryEntity: string;
  primaryFilePath: string;
  duplicates: DuplicateCandidate[];
  consolidationSuggestion: string;
  estimatedSavings: number;
}

export interface DomainAnalysis {
  name: string;
  entities: string[];
  relationships: RelationshipDefinition[];
  priority: 'high' | 'medium' | 'low';
  estimatedTables: number;
  suggestedEndpoints: string[];
}

export interface RelationshipDefinition {
  from: string;
  to: string;
  type: 'one-to-one' | 'one-to-many' | 'many-to-many';
  foreignKey?: string;
}

export interface SchemaAnalysisResult {
  totalInterfaces: number;
  fileCount: number;
  duplicates: DuplicateAnalysis[];
  domains: { [domainName: string]: DomainAnalysis };
  estimatedTables: number;
  estimatedEndpoints: number;
  consolidationOpportunities: string[];
  rawData: ExtractedData[];
}

export interface TableDefinition {
  name: string;
  columns: ColumnDefinition[];
  primaryKey: string[];
  foreignKeys: ForeignKeyDefinition[];
  indexes: string[];
  domain: string;
}

export interface ColumnDefinition {
  name: string;
  type: string;
  nullable: boolean;
  defaultValue?: string;
  comment?: string;
}

export interface ForeignKeyDefinition {
  column: string;
  referencedTable: string;
  referencedColumn: string;
}

export interface SqlSchema {
  domains: {
    [domain: string]: {
      tables: TableDefinition[];
      relationships: RelationshipDefinition[];
      indexes: string[];
    }
  };
  migrationOrder: string[];
  constraints: string[];
}