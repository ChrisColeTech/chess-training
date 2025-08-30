import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';
import { ExtractedData, InterfaceDefinition, TypeDefinition, PropertyDefinition } from '../types';

export class TypeScriptParser {
  private program: ts.Program | null = null;
  private checker: ts.TypeChecker | null = null;

  public async parseDirectory(directoryPath: string, verbose: boolean = false): Promise<ExtractedData[]> {
    const results: ExtractedData[] = [];
    
    if (!fs.existsSync(directoryPath)) {
      if (verbose) console.log(`Directory not found: ${directoryPath}`);
      return results;
    }

    const files = this.getTypeScriptFiles(directoryPath);
    
    if (files.length === 0) {
      if (verbose) console.log(`No TypeScript files found in: ${directoryPath}`);
      return results;
    }

    // Create TypeScript program
    this.program = ts.createProgram(files, {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.CommonJS,
      strict: false,
      skipLibCheck: true
    });
    
    this.checker = this.program.getTypeChecker();

    for (const filePath of files) {
      const sourceFile = this.program.getSourceFile(filePath);
      if (sourceFile) {
        const extracted = this.parseFile(sourceFile, verbose);
        if (extracted) {
          results.push(extracted);
        }
      }
    }

    return results;
  }

  private parseFile(sourceFile: ts.SourceFile, verbose: boolean = false): ExtractedData | null {
    const fileName = path.basename(sourceFile.fileName);
    const filePath = sourceFile.fileName;
    
    const interfaces: InterfaceDefinition[] = [];
    const types: TypeDefinition[] = [];
    const imports: string[] = [];
    const exports: string[] = [];

    const visit = (node: ts.Node) => {
      // Parse interface declarations
      if (ts.isInterfaceDeclaration(node)) {
        const interfaceDef = this.parseInterface(node, filePath);
        if (interfaceDef) {
          interfaces.push(interfaceDef);
        }
      }
      
      // Parse type aliases
      else if (ts.isTypeAliasDeclaration(node)) {
        const typeDef = this.parseTypeAlias(node, filePath);
        if (typeDef) {
          types.push(typeDef);
        }
      }
      
      // Parse imports
      else if (ts.isImportDeclaration(node)) {
        const importInfo = this.parseImport(node);
        if (importInfo) {
          imports.push(importInfo);
        }
      }
      
      // Parse exports
      else if (ts.isExportDeclaration(node) || ts.isExportAssignment(node)) {
        const exportInfo = this.parseExport(node);
        if (exportInfo) {
          exports.push(exportInfo);
        }
      }

      ts.forEachChild(node, visit);
    };

    visit(sourceFile);

    // Only return data if we found interfaces or types
    if (interfaces.length > 0 || types.length > 0) {
      if (verbose) {
        console.log(`  ${fileName}: ${interfaces.length} interfaces, ${types.length} types`);
      }
      
      return {
        fileName,
        filePath,
        interfaces,
        types,
        imports,
        exports
      };
    }

    return null;
  }

  private parseInterface(node: ts.InterfaceDeclaration, filePath: string): InterfaceDefinition | null {
    const name = node.name.text;
    const properties: PropertyDefinition[] = [];
    const lineNumber = ts.getLineAndCharacterOfPosition(node.getSourceFile(), node.getStart()).line + 1;
    const exported = this.hasExportModifier(node);

    // Parse extends clause
    const extendsTypes: string[] = [];
    if (node.heritageClauses) {
      for (const heritage of node.heritageClauses) {
        if (heritage.token === ts.SyntaxKind.ExtendsKeyword) {
          for (const type of heritage.types) {
            extendsTypes.push(type.expression.getText());
          }
        }
      }
    }

    // Parse properties
    for (const member of node.members) {
      if (ts.isPropertySignature(member)) {
        const prop = this.parseProperty(member);
        if (prop) {
          properties.push(prop);
        }
      }
    }

    return {
      name,
      properties,
      extends: extendsTypes.length > 0 ? extendsTypes : undefined,
      filePath,
      lineNumber,
      exported
    };
  }

  private parseTypeAlias(node: ts.TypeAliasDeclaration, filePath: string): TypeDefinition | null {
    const name = node.name.text;
    const type = node.type.getText();
    const lineNumber = ts.getLineAndCharacterOfPosition(node.getSourceFile(), node.getStart()).line + 1;
    const exported = this.hasExportModifier(node);

    return {
      name,
      type,
      filePath,
      lineNumber,
      exported
    };
  }

  private parseProperty(node: ts.PropertySignature): PropertyDefinition | null {
    if (!node.name) return null;
    
    const name = node.name.getText();
    const optional = !!node.questionToken;
    const type = node.type ? node.type.getText() : 'unknown';
    
    // Try to extract JSDoc comment
    const description = this.getJSDocComment(node);

    return {
      name,
      type,
      optional,
      description
    };
  }

  private parseImport(node: ts.ImportDeclaration): string | null {
    const moduleSpecifier = node.moduleSpecifier;
    if (ts.isStringLiteral(moduleSpecifier)) {
      return moduleSpecifier.text;
    }
    return null;
  }

  private parseExport(node: ts.ExportDeclaration | ts.ExportAssignment): string | null {
    if (ts.isExportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
      return node.moduleSpecifier.text;
    }
    return 'default';
  }

  private hasExportModifier(node: ts.Node): boolean {
    if ('modifiers' in node) {
      const modifiers = (node as any).modifiers as ts.NodeArray<ts.ModifierLike> | undefined;
      if (modifiers) {
        return modifiers.some((modifier: ts.ModifierLike) => modifier.kind === ts.SyntaxKind.ExportKeyword);
      }
    }
    return false;
  }

  private getJSDocComment(node: ts.Node): string | undefined {
    const sourceFile = node.getSourceFile();
    const jsDocComments = ts.getJSDocCommentsAndTags(node);
    
    if (jsDocComments.length > 0) {
      const comment = jsDocComments[0];
      if (ts.isJSDoc(comment) && comment.comment) {
        return typeof comment.comment === 'string' ? comment.comment : comment.comment.map(c => c.text).join('');
      }
    }
    
    return undefined;
  }

  private getTypeScriptFiles(dir: string): string[] {
    const files: string[] = [];
    
    const traverse = (currentDir: string) => {
      const entries = fs.readdirSync(currentDir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(currentDir, entry.name);
        
        if (entry.isDirectory()) {
          traverse(fullPath);
        } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx'))) {
          files.push(fullPath);
        }
      }
    };
    
    traverse(dir);
    return files;
  }
}