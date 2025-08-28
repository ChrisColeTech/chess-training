#!/usr/bin/env node

/**
 * Emoji to Icon Replacement Script
 * Replaces emojis with proper Lucide/React Icons
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Emoji to icon mappings
const EMOJI_MAPPINGS = {
  // Gaming and Achievement
  '🏆': { icon: 'Trophy', library: 'lucide' },
  '🎯': { icon: 'Target', library: 'lucide' },
  '⭐': { icon: 'Star', library: 'lucide' },
  '🌟': { icon: 'Star', library: 'lucide' },
  '✨': { icon: 'Sparkles', library: 'lucide' },
  '🔥': { icon: 'Flame', library: 'lucide' },
  '⚡': { icon: 'Zap', library: 'lucide' },
  '💪': { icon: 'Zap', library: 'lucide' }, // Power/strength
  '💥': { icon: 'Zap', library: 'lucide' }, // Impact
  '🎮': { icon: 'Gamepad2', library: 'lucide' },
  '🎲': { icon: 'Dice6', library: 'lucide' },
  
  // Chess specific
  '👑': { icon: 'FaCrown', library: 'react-icons/fa' },
  '⚔️': { icon: 'GiSword', library: 'react-icons/gi' },
  '🛡️': { icon: 'Shield', library: 'lucide' },
  
  // User and Profile
  '👤': { icon: 'User', library: 'lucide' },
  '🤖': { icon: 'Bot', library: 'lucide' },
  
  // Celebration and Success  
  '🎉': { icon: 'PartyPopper', library: 'lucide' },
  '🎊': { icon: 'Sparkles', library: 'lucide' },
  '🎈': { icon: 'Balloon', library: 'lucide' },
  '🎁': { icon: 'Gift', library: 'lucide' },
  
  // Progression and Learning
  '📈': { icon: 'TrendingUp', library: 'lucide' },
  '📊': { icon: 'BarChart3', library: 'lucide' },
  '🧠': { icon: 'Brain', library: 'lucide' },
  '📚': { icon: 'BookOpen', library: 'lucide' },
  '📖': { icon: 'Book', library: 'lucide' },
  '🎓': { icon: 'GraduationCap', library: 'lucide' },
  
  // Time and Calendar
  '⏰': { icon: 'Clock', library: 'lucide' },
  '📅': { icon: 'Calendar', library: 'lucide' },
  '⏱️': { icon: 'Timer', library: 'lucide' },
  
  // Status and Feedback
  '✅': { icon: 'CheckCircle', library: 'lucide' },
  '❌': { icon: 'XCircle', library: 'lucide' },
  '⚠️': { icon: 'AlertTriangle', library: 'lucide' },
  '💡': { icon: 'Lightbulb', library: 'lucide' },
  '🔍': { icon: 'Search', library: 'lucide' },
  
  // Communication
  '💬': { icon: 'MessageCircle', library: 'lucide' },
  '📧': { icon: 'Mail', library: 'lucide' },
  '🔔': { icon: 'Bell', library: 'lucide' },
  
  // Settings and Tools
  '⚙️': { icon: 'Settings', library: 'lucide' },
  '🔧': { icon: 'Wrench', library: 'lucide' },
  '🛠️': { icon: 'Settings', library: 'lucide' },
  
  // Navigation
  '🏠': { icon: 'Home', library: 'lucide' },
  '🔙': { icon: 'ArrowLeft', library: 'lucide' },
  '▶️': { icon: 'Play', library: 'lucide' },
  '⏸️': { icon: 'Pause', library: 'lucide' },
  '⏹️': { icon: 'Square', library: 'lucide' },
  
  // Chess pieces (fallback - usually handled by chess libraries)
  '♔': { icon: 'FaChessKing', library: 'react-icons/fa' },
  '♕': { icon: 'FaChessQueen', library: 'react-icons/fa' },
  '♖': { icon: 'FaChessRook', library: 'react-icons/fa' },
  '♗': { icon: 'FaChessBishop', library: 'react-icons/fa' },
  '♘': { icon: 'FaChessKnight', library: 'react-icons/fa' },
  '♙': { icon: 'FaChessPawn', library: 'react-icons/fa' }
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

function replaceEmojisInFile(filePath) {
  console.log(`Processing: ${filePath}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  const addedImports = new Set();
  
  // Track what icons we need to import
  const lucideIcons = new Set();
  const reactIcons = new Set();
  
  // Replace emojis with icon components
  for (const [emoji, mapping] of Object.entries(EMOJI_MAPPINGS)) {
    const emojiRegex = new RegExp(emoji, 'g');
    const matches = content.match(emojiRegex);
    
    if (matches && matches.length > 0) {
      console.log(`  Replacing ${matches.length} instances of ${emoji} with ${mapping.icon}`);
      
      // Replace emoji with icon component
      content = content.replace(emojiRegex, `<${mapping.icon} className="w-4 h-4 inline" />`);
      
      // Track which imports we need
      if (mapping.library === 'lucide') {
        lucideIcons.add(mapping.icon);
      } else if (mapping.library.startsWith('react-icons/')) {
        reactIcons.add({ icon: mapping.icon, library: mapping.library });
      }
      
      modified = true;
    }
  }
  
  // Add necessary imports if we made replacements
  if (modified && (lucideIcons.size > 0 || reactIcons.size > 0)) {
    const imports = [];
    
    // Add lucide imports
    if (lucideIcons.size > 0) {
      const existingLucideImport = content.match(/import\s*\{([^}]*)\}\s*from\s*['"]lucide-react['"]/);
      if (existingLucideImport) {
        // Add to existing import
        const currentIcons = existingLucideImport[1].split(',').map(s => s.trim()).filter(s => s.length > 0);
        const newIcons = [...new Set([...currentIcons, ...lucideIcons])].sort();
        content = content.replace(existingLucideImport[0], `import { ${newIcons.join(', ')} } from 'lucide-react'`);
      } else {
        // Add new import
        const newIcons = [...lucideIcons].sort();
        imports.push(`import { ${newIcons.join(', ')} } from 'lucide-react'`);
      }
    }
    
    // Add react-icons imports
    for (const iconInfo of reactIcons) {
      const existingImport = content.match(new RegExp(`import\\s*\\{([^}]*)\\}\\s*from\\s*['"]${iconInfo.library.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`));
      if (existingImport) {
        // Add to existing import
        const currentIcons = existingImport[1].split(',').map(s => s.trim()).filter(s => s.length > 0);
        const newIcons = [...new Set([...currentIcons, iconInfo.icon])].sort();
        content = content.replace(existingImport[0], `import { ${newIcons.join(', ')} } from '${iconInfo.library}'`);
      } else {
        // Add new import
        imports.push(`import { ${iconInfo.icon} } from '${iconInfo.library}'`);
      }
    }
    
    // Add new imports at the top after existing imports
    if (imports.length > 0) {
      const importRegex = /(import[\s\S]*?from\s*['"][^'"]*['"])/g;
      let lastImportIndex = 0;
      let match;
      
      while ((match = importRegex.exec(content)) !== null) {
        lastImportIndex = match.index + match[0].length;
      }
      
      if (lastImportIndex > 0) {
        content = content.slice(0, lastImportIndex) + '\n' + imports.join('\n') + content.slice(lastImportIndex);
      } else {
        content = imports.join('\n') + '\n' + content;
      }
    }
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content);
    return true;
  }
  
  return false;
}

function main() {
  console.log('🔄 Starting emoji to icon replacement...\n');
  
  const srcDir = path.join(__dirname, 'src');
  const files = getAllTsxFiles(srcDir);
  
  let modifiedCount = 0;
  
  for (const file of files) {
    if (replaceEmojisInFile(file)) {
      modifiedCount++;
    }
  }
  
  console.log(`\n✅ Emoji replacement complete! ${modifiedCount} files updated.`);
  console.log('\n📝 Summary:');
  console.log(`- Total files checked: ${files.length}`);
  console.log(`- Files modified: ${modifiedCount}`);
  console.log(`- Emojis replaced with proper icons`);
}

main();