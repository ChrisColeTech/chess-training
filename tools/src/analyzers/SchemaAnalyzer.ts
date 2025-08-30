import { TypeScriptParser } from '../parsers/TypeScriptParser';
import { DuplicateDetector } from './DuplicateDetector';
import { DomainOrganizer } from './DomainOrganizer';
import { AnalyzerOptions, SchemaAnalysisResult, ExtractedData, InterfaceDefinition } from '../types';

export class SchemaAnalyzer {
  private parser: TypeScriptParser;
  private duplicateDetector: DuplicateDetector;
  private domainOrganizer: DomainOrganizer;
  private options: AnalyzerOptions;

  constructor(options: AnalyzerOptions) {
    this.options = options;
    this.parser = new TypeScriptParser();
    this.duplicateDetector = new DuplicateDetector();
    this.domainOrganizer = new DomainOrganizer();
  }

  public async analyze(): Promise<SchemaAnalysisResult> {
    const rawData: ExtractedData[] = [];
    
    if (this.options.verbose) {
      console.log(`Parsing data directory: ${this.options.dataDir}`);
    }
    
    // Parse data directory
    const dataResults = await this.parser.parseDirectory(this.options.dataDir, this.options.verbose);
    rawData.push(...dataResults);
    
    if (this.options.verbose) {
      console.log(`Parsing types directory: ${this.options.typesDir}`);
    }
    
    // Parse types directory
    const typesResults = await this.parser.parseDirectory(this.options.typesDir, this.options.verbose);
    rawData.push(...typesResults);
    
    // Extract all interfaces
    const allInterfaces: InterfaceDefinition[] = [];
    for (const data of rawData) {
      allInterfaces.push(...data.interfaces);
    }
    
    if (this.options.verbose) {
      console.log(`\\nFound ${allInterfaces.length} interfaces across ${rawData.length} files`);
    }
    
    // Filter by domain if specified
    let interfacesToAnalyze = allInterfaces;
    if (this.options.domain) {
      interfacesToAnalyze = allInterfaces.filter(iface => 
        iface.filePath.toLowerCase().includes(this.options.domain!.toLowerCase()) ||
        iface.name.toLowerCase().includes(this.options.domain!.toLowerCase())
      );
      
      if (this.options.verbose) {
        console.log(`Filtered to ${interfacesToAnalyze.length} interfaces for domain: ${this.options.domain}`);
      }
    }
    
    // Detect duplicates
    if (this.options.verbose) {
      console.log('\\nDetecting duplicate entities...');
    }
    const duplicates = this.duplicateDetector.detectDuplicates(interfacesToAnalyze);
    
    // Organize by domains
    if (this.options.verbose) {
      console.log('Organizing entities by chess domains...');
    }
    const domains = this.domainOrganizer.organizeDomains(interfacesToAnalyze);
    
    // Calculate totals
    const totalInterfaces = interfacesToAnalyze.length;
    const fileCount = rawData.length;
    const estimatedTables = Object.values(domains).reduce((sum, domain) => sum + domain.estimatedTables, 0);
    const estimatedEndpoints = Object.values(domains).reduce((sum, domain) => sum + domain.suggestedEndpoints.length, 0);
    
    // Generate consolidation opportunities
    const consolidationOpportunities = this.generateConsolidationOpportunities(duplicates, domains);
    
    return {
      totalInterfaces,
      fileCount,
      duplicates,
      domains,
      estimatedTables,
      estimatedEndpoints,
      consolidationOpportunities,
      rawData
    };
  }

  private generateConsolidationOpportunities(duplicates: any[], domains: any): string[] {
    const opportunities: string[] = [];
    
    // Add duplicate consolidations
    for (const dup of duplicates) {
      opportunities.push(`Consolidate ${dup.duplicates.length + 1} similar entities: ${dup.primaryEntity} and ${dup.duplicates.map((d: any) => d.entity).join(', ')}`);
    }
    
    // Add domain-specific opportunities
    for (const [domainName, domain] of Object.entries(domains) as [string, any][]) {
      if (domain.entities.length > 8) {
        opportunities.push(`${domainName} domain has ${domain.entities.length} entities - consider sub-domain organization`);
      }
    }
    
    return opportunities;
  }
}