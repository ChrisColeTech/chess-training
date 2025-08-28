#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Final cleanup for any remaining problematic icons
 */

const ICON_FIXES = [
  { pattern: /FloppyDisk/g, replacement: 'Save', description: 'FloppyDisk → Save' },
  { pattern: /TrendDown/g, replacement: 'TrendingDown', description: 'TrendDown → TrendingDown' },
  { pattern: /Equals/g, replacement: 'Equal', description: 'Equals → Equal' },
  { pattern: /Lightning/g, replacement: 'Zap', description: 'Lightning → Zap (when not using react-icons)' },
];

/**
 * Process a single file
 */
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  let modified = content;
  let hasChanges = false;
  const appliedFixes = [];

  for (const fix of ICON_FIXES) {
    const before = modified;
    modified = modified.replace(fix.pattern, fix.replacement);
    
    if (before !== modified) {
      hasChanges = true;
      appliedFixes.push(fix.description);
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
  
  console.log('🔧 Final icon cleanup...');
  
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
  
  console.log(`\n🎉 Final icon cleanup completed!`);
  console.log(`   - Processed ${files.length} files`);
  console.log(`   - Fixed ${totalFixed} files`);
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}