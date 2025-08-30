// Quick Migration Progress Checker
// Run with: node check-migration-progress.js

import fs from 'fs';
import { execSync } from 'child_process';

console.log('📊 Migration Progress Checker');
console.log('============================');

// Count remaining @/data imports
try {
  const result = execSync(`find src/ -name "*.ts" -o -name "*.tsx" | xargs grep -l "@/data" 2>/dev/null | wc -l`, { encoding: 'utf8' });
  const remainingFiles = parseInt(result.trim());
  
  console.log(`📁 Files still using @/data imports: ${remainingFiles}`);
  
  if (remainingFiles > 0) {
    console.log('\n🔍 Files needing migration:');
    try {
      const fileList = execSync(`find src/ -name "*.ts" -o -name "*.tsx" | xargs grep -l "@/data" 2>/dev/null`, { encoding: 'utf8' });
      fileList.trim().split('\n').forEach(file => {
        console.log(`   - ${file}`);
      });
    } catch (e) {
      console.log('   (Could not list files)');
    }
    
    console.log('\n🎯 Next Steps:');
    console.log('1. Check MIGRATION_TRACKER.md for current priorities');
    console.log('2. Start with HIGH priority files first');
    console.log('3. Test each migration thoroughly');
    
  } else {
    console.log('\n🎉 MIGRATION COMPLETE!');
    console.log('All mock data imports have been replaced with API hooks.');
  }
  
} catch (error) {
  console.error('❌ Could not check progress:', error.message);
}

console.log('\n📋 Quick Commands:');
console.log('==================');
console.log('View migration plan:     cat MIGRATION_TRACKER.md');
console.log('Find specific imports:   grep -r "mockFileName" src/');
console.log('Check hook usage:        grep -r "useHookName" src/');
console.log('Test backend:           node simple-api-test.js');