#!/usr/bin/env node

/**
 * Icon Migration Script
 * Migrates from @phosphor-icons/react to lucide-react + react-icons
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Common Phosphor to Lucide icon mappings
const ICON_MAPPINGS = {
  // Common UI Icons
  'CheckCircle': 'CheckCircle',
  'Info': 'Info',
  'User': 'User',
  'SignOut': 'LogOut',
  'Star': 'Star',
  'Lightning': 'Zap',
  'Sun': 'Sun',
  'Moon': 'Moon',
  'Flask': 'Flask',
  'Fire': 'Flame',
  
  // Navigation Icons
  'ArrowLeft': 'ArrowLeft',
  'ArrowRight': 'ArrowRight',
  'ArrowUp': 'ArrowUp',
  'ArrowDown': 'ArrowDown',
  'ChevronLeft': 'ChevronLeft',
  'ChevronRight': 'ChevronRight',
  'ChevronDown': 'ChevronDown',
  'ChevronUp': 'ChevronUp',
  
  // Action Icons
  'Plus': 'Plus',
  'Minus': 'Minus',
  'X': 'X',
  'Search': 'Search',
  'Settings': 'Settings',
  'Edit': 'Edit',
  'Trash': 'Trash',
  'Download': 'Download',
  'Upload': 'Upload',
  
  // Status Icons
  'Check': 'Check',
  'Alert': 'AlertCircle',
  'Warning': 'AlertTriangle',
  'Error': 'AlertCircle',
  
  // Media Icons
  'Play': 'Play',
  'Pause': 'Pause',
  'Stop': 'Square',
  'SkipForward': 'SkipForward',
  'SkipBack': 'SkipBack',
  
  // Content Icons
  'BookOpen': 'BookOpen',
  'Calendar': 'Calendar',
  'Clock': 'Clock',
  'Target': 'Target',
  'Trophy': 'Trophy',
  'Eye': 'Eye',
  'EyeSlash': 'EyeOff',
  
  // Communication Icons
  'Share': 'Share',
  'Mail': 'Mail',
  'Phone': 'Phone',
  'Bell': 'Bell',
  
  // System Icons
  'Gear': 'Settings',
  'Home': 'Home',
  'Dashboard': 'LayoutDashboard',
  'Database': 'Database',
  'Shield': 'Shield',
  'Key': 'Key',
  'Lock': 'Lock',
  'Unlock': 'Unlock',
  
  // Previously problematic icons
  'RefreshCw': 'RefreshCw',
  'TrendingUp': 'TrendingUp',
  'Filter': 'Filter',
  'HelpCircle': 'HelpCircle',
  'BookmarkCheck': 'BookmarkCheck',
  'Share2': 'Share2',
  'Edit2': 'Edit2',
  'Trash2': 'Trash2',
  
  // Alternative mappings for icons that don't exist in Lucide
  'CaretLeft': 'ChevronLeft',
  'CaretRight': 'ChevronRight',
  'CaretDown': 'ChevronDown',
  'CaretUp': 'ChevronUp',
  'MagnifyingGlass': 'Search',
  'ArrowClockwise': 'RefreshCw',
  'ArrowCounterClockwise': 'RotateCcw',
  'Funnel': 'Filter',
  'Export': 'Download',
  'ChartBar': 'BarChart3'
};

// Icons to get from react-icons instead of lucide
const REACT_ICONS_MAPPINGS = {
  // Chess-related icons from react-icons
  'Crown': 'FaCrown',
  'Sword': 'GiSword',
  'Brain': 'FaBrain',
  'TreeStructure': 'FaProjectDiagram',
  'Sparkle': 'FaSparkles',
  'Sparkles': 'FaSparkles'
};

function getAllTsxFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      files.push(...getAllTsxFiles(fullPath));
    } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function migrateFile(filePath) {
  console.log(`Migrating: ${filePath}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Check if file has Phosphor imports
  if (!content.includes("@phosphor-icons/react")) {
    return false;
  }
  
  // Extract current import
  const importMatch = content.match(/import\s*\{\s*([^}]+)\s*\}\s*from\s*['"]@phosphor-icons\/react['"]/);
  if (!importMatch) {
    return false;
  }
  
  const importedIcons = importMatch[1]
    .split(',')
    .map(icon => icon.trim())
    .filter(icon => icon.length > 0);
  
  const lucideIcons = [];
  const reactIcons = [];
  
  // Map icons to their new libraries
  for (const icon of importedIcons) {
    if (REACT_ICONS_MAPPINGS[icon]) {
      reactIcons.push({
        original: icon,
        new: REACT_ICONS_MAPPINGS[icon],
        library: 'react-icons/fa'
      });
    } else if (ICON_MAPPINGS[icon]) {
      lucideIcons.push({
        original: icon,
        new: ICON_MAPPINGS[icon]
      });
    } else {
      console.warn(`⚠️  No mapping found for icon: ${icon} in ${filePath}`);
      // Default to same name in Lucide
      lucideIcons.push({
        original: icon,
        new: icon
      });
    }
  }
  
  // Replace the import statement
  let newImports = '';
  
  if (lucideIcons.length > 0) {
    const lucideIconNames = lucideIcons.map(icon => icon.new).join(', ');
    newImports += `import { ${lucideIconNames} } from 'lucide-react'\n`;
  }
  
  if (reactIcons.length > 0) {
    const reactIconNames = reactIcons.map(icon => icon.new).join(', ');
    newImports += `import { ${reactIconNames} } from 'react-icons/fa'\n`;
  }
  
  // Replace the old import
  content = content.replace(/import\s*\{\s*[^}]+\s*\}\s*from\s*['"]@phosphor-icons\/react['"]/, newImports.trim());
  
  // Replace icon usages in JSX
  for (const icon of [...lucideIcons, ...reactIcons]) {
    if (icon.original !== icon.new) {
      const regex = new RegExp(`<${icon.original}\\b`, 'g');
      content = content.replace(regex, `<${icon.new}`);
    }
  }
  
  modified = true;
  fs.writeFileSync(filePath, content);
  return modified;
}

function main() {
  console.log('🔄 Starting icon migration from Phosphor to Lucide + React Icons...\n');
  
  const srcDir = path.join(__dirname, 'src');
  const files = getAllTsxFiles(srcDir);
  
  let migratedCount = 0;
  
  for (const file of files) {
    if (migrateFile(file)) {
      migratedCount++;
    }
  }
  
  console.log(`\n✅ Migration complete! ${migratedCount} files updated.`);
  console.log('\n📝 Summary:');
  console.log(`- Total files checked: ${files.length}`);
  console.log(`- Files migrated: ${migratedCount}`);
  console.log(`- Icon libraries: Lucide React + React Icons`);
}

main();