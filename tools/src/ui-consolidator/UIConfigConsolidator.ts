import { InterfaceDefinition, SchemaAnalysisResult } from '../types';
import * as fs from 'fs';
import * as path from 'path';

export interface UIConsolidationGroup {
  category: string;
  consolidatedName: string;
  interfaces: InterfaceDefinition[];
  outputFile: string;
  description: string;
}

export interface UIConsolidationResult {
  originalUIInterfaces: number;
  consolidatedGroups: UIConsolidationGroup[];
  finalUIFiles: number;
  reductionPercentage: number;
  consolidatedCode: { filePath: string; content: string }[];
}

export class UIConfigConsolidator {
  private readonly UI_CONSOLIDATION_GROUPS = {
    'board-themes': {
      keywords: ['board', 'theme', 'color', 'style', 'piece', 'coordinate', 'highlight', 'arrow'],
      consolidatedName: 'BoardThemeConfig',
      outputFile: 'boardThemeConfig.ts',
      description: 'Chess board themes, colors, and visual styling'
    },
    'component-props': {
      keywords: ['props', 'component'],
      consolidatedName: 'ComponentProps', 
      outputFile: 'componentProps.ts',
      description: 'React component prop interfaces'
    },
    'form-configs': {
      keywords: ['form', 'input', 'field', 'validation', 'editor'],
      consolidatedName: 'FormConfig',
      outputFile: 'formConfig.ts', 
      description: 'Form and input configurations'
    },
    'navigation-ui': {
      keywords: ['nav', 'menu', 'tab', 'browser', 'sidebar'],
      consolidatedName: 'NavigationConfig',
      outputFile: 'navigationConfig.ts',
      description: 'Navigation and menu configurations'
    },
    'notification-ui': {
      keywords: ['notification', 'alert', 'message', 'toast', 'priority'],
      consolidatedName: 'NotificationConfig', 
      outputFile: 'notificationConfig.ts',
      description: 'Notification and alert configurations'
    },
    'analysis-ui': {
      keywords: ['analysis', 'evaluation', 'engine', 'position', 'setup'],
      consolidatedName: 'AnalysisUIConfig',
      outputFile: 'analysisUIConfig.ts',
      description: 'Chess analysis and engine UI configurations'
    },
    'puzzle-ui': {
      keywords: ['puzzle', 'tactical', 'endgame', 'selection', 'browser', 'filter'],
      consolidatedName: 'PuzzleUIConfig',
      outputFile: 'puzzleUIConfig.ts',
      description: 'Puzzle interface and filtering configurations'
    },
    'settings-ui': {
      keywords: ['settings', 'preferences', 'option', 'config', 'density', 'accessibility'],
      consolidatedName: 'SettingsUIConfig',
      outputFile: 'settingsUIConfig.ts',
      description: 'User settings and preferences UI'
    }
  };

  public consolidateUIInterfaces(
    uiInterfaces: InterfaceDefinition[],
    outputDir: string
  ): UIConsolidationResult {
    const consolidatedGroups: UIConsolidationGroup[] = [];
    const processedInterfaces = new Set<string>();

    // Group interfaces by category
    for (const [category, config] of Object.entries(this.UI_CONSOLIDATION_GROUPS)) {
      const groupInterfaces = uiInterfaces.filter(iface => {
        if (processedInterfaces.has(iface.name)) return false;
        
        const name = iface.name.toLowerCase();
        const filePath = iface.filePath.toLowerCase();
        
        return config.keywords.some(keyword => 
          name.includes(keyword) || filePath.includes(keyword)
        );
      });

      if (groupInterfaces.length > 0) {
        groupInterfaces.forEach(iface => processedInterfaces.add(iface.name));
        
        consolidatedGroups.push({
          category,
          consolidatedName: config.consolidatedName,
          interfaces: groupInterfaces,
          outputFile: config.outputFile,
          description: config.description
        });
      }
    }

    // Handle remaining ungrouped interfaces
    const remainingInterfaces = uiInterfaces.filter(iface => 
      !processedInterfaces.has(iface.name)
    );

    if (remainingInterfaces.length > 0) {
      consolidatedGroups.push({
        category: 'misc-ui',
        consolidatedName: 'MiscUIConfig',
        interfaces: remainingInterfaces,
        outputFile: 'miscUIConfig.ts',
        description: 'Miscellaneous UI configurations'
      });
    }

    // Generate consolidated code files
    const consolidatedCode = consolidatedGroups.map(group => ({
      filePath: path.join(outputDir, group.outputFile),
      content: this.generateConsolidatedFile(group)
    }));

    const reductionPercentage = Math.round(
      (1 - consolidatedGroups.length / uiInterfaces.length) * 100
    );

    return {
      originalUIInterfaces: uiInterfaces.length,
      consolidatedGroups,
      finalUIFiles: consolidatedGroups.length,
      reductionPercentage,
      consolidatedCode
    };
  }

  private generateConsolidatedFile(group: UIConsolidationGroup): string {
    const timestamp = new Date().toISOString();
    const duplicateNames = this.findDuplicateNames(group.interfaces);
    
    let content = `/**
 * ${group.description}
 * 
 * Generated: ${timestamp}
 * Consolidated from: ${group.interfaces.length} UI interface(s)
 * Source files: ${[...new Set(group.interfaces.map(i => path.basename(i.filePath)))].join(', ')}
 */

`;

    // Add imports if needed
    const needsReactImports = group.interfaces.some(iface => 
      iface.properties.some(prop => 
        prop.type.includes('React') || prop.type.includes('JSX')
      )
    );

    if (needsReactImports) {
      content += `import React from 'react';\n\n`;
    }

    // Generate consolidated interfaces with duplicate handling
    for (let i = 0; i < group.interfaces.length; i++) {
      const iface = group.interfaces[i];
      let interfaceName = iface.name;
      
      // Handle duplicate names
      if (duplicateNames.has(iface.name)) {
        const sourceFile = path.basename(iface.filePath, '.ts');
        interfaceName = `${iface.name}_${this.toCamelCase(sourceFile)}`;
      }
      
      content += `// From: ${iface.filePath}\n`;
      content += `export interface ${interfaceName} {\n`;
      
      for (const prop of iface.properties) {
        const optional = prop.optional ? '?' : '';
        const description = prop.description ? ` // ${prop.description}` : '';
        content += `  ${prop.name}${optional}: ${prop.type};${description}\n`;
      }
      
      content += `}\n\n`;
    }

    // Add consolidated export object
    content += `// Consolidated ${group.consolidatedName}\n`;
    content += `export const ${group.consolidatedName} = {\n`;
    
    for (const iface of group.interfaces) {
      let interfaceName = iface.name;
      if (duplicateNames.has(iface.name)) {
        const sourceFile = path.basename(iface.filePath, '.ts');
        interfaceName = `${iface.name}_${this.toCamelCase(sourceFile)}`;
      }
      content += `  ${this.toCamelCase(iface.name)}: {} as ${interfaceName},\n`;
    }
    
    content += `} as const;\n\n`;

    // Add type exports for convenience
    content += `// Type exports\n`;
    for (const iface of group.interfaces) {
      let interfaceName = iface.name;
      if (duplicateNames.has(iface.name)) {
        const sourceFile = path.basename(iface.filePath, '.ts');
        interfaceName = `${iface.name}_${this.toCamelCase(sourceFile)}`;
      }
      content += `export type ${interfaceName}Type = ${interfaceName};\n`;
    }

    return content;
  }

  private findDuplicateNames(interfaces: InterfaceDefinition[]): Set<string> {
    const nameCount = new Map<string, number>();
    const duplicates = new Set<string>();
    
    for (const iface of interfaces) {
      const count = nameCount.get(iface.name) || 0;
      nameCount.set(iface.name, count + 1);
      
      if (count > 0) {
        duplicates.add(iface.name);
      }
    }
    
    return duplicates;
  }

  private toCamelCase(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  public generateConsolidationReport(result: UIConsolidationResult): string {
    const timestamp = new Date().toISOString();
    
    return `# UI Configuration Consolidation Report

**Generated:** ${timestamp}  
**Tool:** UI Config Consolidator v1.0.0

---

## 🎯 Consolidation Summary

### UI Interface Reduction
- **Original UI Interfaces:** ${result.originalUIInterfaces}
- **Consolidated Groups:** ${result.consolidatedGroups.length}
- **Final UI Files:** ${result.finalUIFiles}
- **Reduction:** ${result.reductionPercentage}%

---

## 📁 Consolidated UI Groups

${result.consolidatedGroups.map((group, index) => `
### ${index + 1}. ${group.consolidatedName}
**File:** \`${group.outputFile}\`  
**Category:** ${group.category}  
**Interfaces Consolidated:** ${group.interfaces.length}  
**Description:** ${group.description}

**Source Interfaces:**
${group.interfaces.map(iface => `- **${iface.name}** (${iface.properties.length} properties) - \`${path.basename(iface.filePath)}\``).join('\n')}
`).join('\n')}

---

## 📊 Consolidation Benefits

### Development Benefits
- **Reduced File Count:** ${result.originalUIInterfaces} → ${result.finalUIFiles} UI files
- **Organized Structure:** UI configurations grouped by functionality
- **Eliminated Duplicates:** Similar interfaces merged with proper naming
- **Clear Dependencies:** Centralized UI configuration imports

### Maintenance Benefits
- **Single Source of Truth:** Each UI concern has one consolidated file
- **Easy Updates:** Modify UI configurations in predictable locations
- **Type Safety:** Preserved TypeScript interfaces with better organization
- **Documentation:** Auto-generated comments showing source files

---

## 🔧 Usage Examples

### Importing Consolidated Configs
\`\`\`typescript
// Before consolidation
import { BoardTheme } from './data/boardThemes';
import { ThemeColors } from './data/themeColors';
import { PieceSet } from './data/pieceSets';

// After consolidation  
import { BoardThemeConfig } from './config/boardThemeConfig';
const { boardTheme, themeColors, pieceSet } = BoardThemeConfig;
\`\`\`

### Component Props Usage
\`\`\`typescript
// Before consolidation
import { ButtonProps } from './types/button';
import { FormProps } from './types/form';

// After consolidation
import { ComponentProps } from './config/componentProps';
type MyButtonProps = ComponentProps.ButtonPropsType;
\`\`\`

---

## ✅ Next Steps

1. **Review Consolidated Files** - Verify ${result.finalUIFiles} generated files meet requirements
2. **Update Imports** - Replace scattered imports with consolidated ones
3. **Test Components** - Ensure UI components work with new consolidated interfaces
4. **Clean Up Old Files** - Remove original UI interface files after migration
5. **Update Documentation** - Document new UI configuration structure

---

*This consolidation transforms scattered UI interfaces into ${result.finalUIFiles} organized, maintainable configuration files.*`;
  }

  public async writeConsolidatedFiles(result: UIConsolidationResult): Promise<void> {
    for (const file of result.consolidatedCode) {
      const dir = path.dirname(file.filePath);
      
      // Ensure directory exists
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      // Write consolidated file
      fs.writeFileSync(file.filePath, file.content, 'utf8');
    }
  }
}