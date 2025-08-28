#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Fix remaining icon import and usage issues
 */

const FIXES = [
  // Icon name fixes
  { pattern: /Flask/g, replacement: 'TestTube', description: 'Flask → TestTube' },
  { pattern: /ChartLineUp/g, replacement: 'TrendingUp', description: 'ChartLineUp → TrendingUp' },
  { pattern: /TrendUp/g, replacement: 'TrendingUp', description: 'TrendUp → TrendingUp' },
  { pattern: /PaperPlaneTilt/g, replacement: 'Send', description: 'PaperPlaneTilt → Send' },
  { pattern: /GameController/g, replacement: 'Gamepad2', description: 'GameController → Gamepad2' },
  
  // Import path fixes for react-icons
  { pattern: /import\s*{\s*([^}]*GiSword[^}]*)\s*}\s*from\s*['"]react-icons\/fa['"]/g, 
    replacement: 'import { GiSwordsPower } from \'react-icons/gi\'', 
    description: 'Fix GiSword import path' },
  
  { pattern: /GiSword/g, replacement: 'GiSwordsPower', description: 'GiSword → GiSwordsPower' },
  
  // Brain icon fixes - some files import Brain from lucide when they should use FaBrain
  { pattern: /import\s*{\s*([^}]*),\s*Brain\s*([^}]*)\s*}\s*from\s*['"]lucide-react['"]/g, 
    replacement: (match, before, after) => {
      const cleanBefore = before.trim().replace(/,$/, '');
      const cleanAfter = after.trim().replace(/^,/, '');
      const parts = [cleanBefore, cleanAfter].filter(p => p.length > 0);
      return `import { ${parts.join(', ')} } from 'lucide-react'`;
    },
    description: 'Remove Brain from lucide imports when FaBrain should be used' },
];

/**
 * Process a single file
 */
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  let modified = content;
  let hasChanges = false;
  const appliedFixes = [];

  for (const fix of FIXES) {
    const before = modified;
    if (typeof fix.replacement === 'function') {
      modified = modified.replace(fix.pattern, fix.replacement);
    } else {
      modified = modified.replace(fix.pattern, fix.replacement);
    }
    
    if (before !== modified) {
      hasChanges = true;
      appliedFixes.push(fix.description);
    }
  }

  // Additional specific fixes
  
  // Ensure Brain imports use FaBrain where appropriate
  if (modified.includes('Brain,') && modified.includes('from \'lucide-react\'')) {
    const needsFaBrain = modified.includes('<Brain') || modified.includes('Brain:') || modified.includes('Brain }');
    if (needsFaBrain && !modified.includes('FaBrain')) {
      // Add FaBrain import
      if (modified.includes('from \'react-icons/fa\'')) {
        modified = modified.replace(
          /import\s*{\s*([^}]*)\s*}\s*from\s*['"]react-icons\/fa['"]/,
          (match, imports) => `import { ${imports.trim()}, FaBrain } from 'react-icons/fa'`
        );
      } else {
        const lucideImportMatch = modified.match(/import\s*{\s*[^}]*\s*}\s*from\s*['"]lucide-react['"]/);
        if (lucideImportMatch) {
          const lucideImport = lucideImportMatch[0];
          modified = modified.replace(lucideImport, lucideImport + '\nimport { FaBrain } from \'react-icons/fa\'');
        }
      }
      
      // Replace Brain usage with FaBrain
      modified = modified.replace(/Brain(?!\w)/g, 'FaBrain');
      hasChanges = true;
      appliedFixes.push('Use FaBrain instead of Brain');
    }
  }

  if (hasChanges) {
    fs.writeFileSync(filePath, modified, 'utf-8');
    console.log(`✅ Fixed ${filePath}`);
    appliedFixes.forEach(fix => console.log(`   - ${fix}`));
  }

  return hasChanges;
}

/**
 * Get all TypeScript/TSX files recursively
 */
function getAllTSFiles(dir) {
  const files = [];
  
  function traverse(currentDir) {
    const entries = fs.readdirSync(currentDir);
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && entry !== 'node_modules' && !entry.startsWith('.')) {
        traverse(fullPath);
      } else if (stat.isFile() && (entry.endsWith('.ts') || entry.endsWith('.tsx'))) {
        files.push(fullPath);
      }
    }
  }
  
  traverse(dir);
  return files;
}

/**
 * Main execution
 */
function main() {
  const srcDir = path.join(__dirname, 'src');
  
  if (!fs.existsSync(srcDir)) {
    console.error('❌ Source directory not found:', srcDir);
    process.exit(1);
  }
  
  console.log('🔧 Fixing remaining icon issues...');
  
  const files = getAllTSFiles(srcDir);
  let totalFixed = 0;
  
  for (const file of files) {
    try {
      const wasFixed = processFile(file);
      if (wasFixed) {
        totalFixed++;
      }
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
    }
  }
  
  console.log(`\n🎉 Icon fixes completed!`);
  console.log(`   - Processed ${files.length} files`);
  console.log(`   - Fixed ${totalFixed} files`);
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}