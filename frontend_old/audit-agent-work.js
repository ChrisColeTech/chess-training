// Comprehensive Agent Work Audit Script
// Verifies ALL 72 files were properly migrated according to plan

import fs from 'fs';
import { execSync } from 'child_process';

console.log('🔍 COMPREHENSIVE AGENT WORK AUDIT');
console.log('==================================');

// Original 72 files that needed migration
const originalFiles = [
  // Authentication Domain (10 files)
  'src/pages/LoginPage.tsx',
  'src/pages/auth/RegisterPage.tsx',
  'src/components/auth/resetPassword/InvalidTokenState.tsx',
  'src/components/auth/resetPassword/LoadingState.tsx', 
  'src/components/auth/resetPassword/ResetPasswordForm.tsx',
  'src/components/auth/resetPassword/SuccessState.tsx',
  'src/hooks/useForgotPassword.ts',
  'src/hooks/useRegister.ts',
  'src/hooks/useResetPassword.ts',
  'src/hooks/useAccount.ts',

  // Profile Domain (7 files)
  'src/components/core/profile/ProfileAchievements.tsx',
  'src/components/core/profile/ProfileActivity.tsx',
  'src/components/core/profile/ProfileOverview.tsx',
  'src/hooks/useProfile.ts',
  'src/hooks/usePreferences.ts',
  'src/pages/settings/AccountPage.tsx',
  'src/pages/settings/PreferencesPage.tsx',

  // Puzzle Domain (11 files)
  'src/pages/puzzles/TacticalPuzzlesPage.tsx',
  'src/pages/puzzles/EndgamePuzzlesPage.tsx',
  'src/pages/puzzles/OpeningPuzzlesPage.tsx',
  'src/pages/puzzles/CustomPuzzlesPage.tsx',
  'src/pages/puzzles/PuzzleSelectionPage.tsx',
  'src/components/puzzles/PuzzleProgress.tsx',
  'src/components/puzzles/PuzzleTabs.tsx',
  'src/components/puzzles/custom/CustomPuzzleBoard.tsx',
  'src/components/puzzles/custom/CustomPuzzleCollectionBrowser.tsx',
  'src/components/puzzles/custom/CustomPuzzleFilters.tsx',
  'src/components/puzzles/custom/CustomPuzzleInfo.tsx',

  // Settings Domain (9 files)
  'src/pages/settings/BoardSettingsPage.tsx',
  'src/pages/settings/NotificationsPage.tsx',
  'src/components/settings/board/BoardPreview.tsx',
  'src/components/settings/board/BoardControls.tsx',
  'src/components/settings/preferences/LanguageSettings.tsx',
  'src/components/settings/preferences/ThemeSelector.tsx',
  'src/components/settings/notifications/EventSettings.tsx',
  'src/components/settings/notifications/AlertSettings.tsx',
  'src/components/settings/notifications/QuietHours.tsx',

  // Progress Domain (11 files)
  'src/hooks/useProgressOverview.ts',
  'src/hooks/useDetailedStats.ts',
  'src/hooks/useAchievements.ts',
  'src/components/progress/achievements/AchievementCard.tsx',
  'src/components/progress/achievements/AchievementStats.tsx',
  'src/components/progress/achievements/BadgeDetails.tsx',
  'src/components/progress/achievements/ProgressTracker.tsx',
  'src/components/progress/achievements/AchievementFilters.tsx',
  'src/components/progress/stats/TrendAnalysis.tsx',

  // Learning Domain (5 files)
  'src/hooks/useLearningPath.ts',
  'src/hooks/useStudyPlans.ts',
  'src/hooks/useTutorials.ts',
  'src/components/help/tutorials/TutorialPlayer.tsx',
  'src/components/study/plans/StudyScheduler.tsx',

  // Advanced Features Domain (19 files)
  'src/components/help/center/CategoryBrowser.tsx',
  'src/components/help/contact/ContactForm.tsx',
  'src/components/help/contact/SuccessState.tsx',
  'src/components/layout/Sidebar.tsx',
  'src/components/play/analysis/AnalysisControls.tsx',
  'src/components/play/analysis/EngineLines.tsx',
  'src/components/play/analysis/EvaluationBar.tsx',
  'src/components/play/analysis/PositionDatabase.tsx',
  'src/components/play/analysis/PositionSetup.tsx',
  'src/components/play/computer/GameSetup.tsx',
  'src/hooks/useAnalysisBoard.ts',
  'src/hooks/useBoardSettings.ts',
  'src/hooks/useContact.ts',
  'src/hooks/useEndgameLibrary.ts',
  'src/hooks/useGameReview.ts',
  'src/hooks/useHelpCenter.ts',
  'src/hooks/useMasterGames.ts',
  'src/hooks/useNotifications.ts',
  'src/hooks/useOpeningExplorer.ts',
  'src/hooks/usePlayComputer.ts',
  'src/pages/help/ContactPage.tsx'
];

console.log(`📋 Original Target: ${originalFiles.length} files`);
console.log(`📋 Expected: 72 files total`);

// Audit Results
const auditResults = {
  totalFiles: originalFiles.length,
  existingFiles: 0,
  migratedFiles: 0,
  stillHasMockData: 0,
  missingFiles: 0,
  errors: []
};

console.log('\n🔍 INDIVIDUAL FILE AUDIT:');
console.log('=========================');

// Check each file individually
originalFiles.forEach((filePath, index) => {
  const fileNum = (index + 1).toString().padStart(2, '0');
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    console.log(`❌ ${fileNum}. ${filePath} - FILE MISSING`);
    auditResults.missingFiles++;
    auditResults.errors.push(`Missing file: ${filePath}`);
    return;
  }
  
  auditResults.existingFiles++;
  
  try {
    // Read file content
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check for @/data imports
    const hasDataImports = content.includes('from \'@/data/') || 
                          content.includes('from "@/data/') ||
                          content.includes('from \'../data/') ||
                          content.includes('from "../data/');
    
    if (hasDataImports) {
      // Extract the specific imports
      const dataImportMatches = content.match(/from ['"](\.\.\/)*@?\/data\/[^'"]*['"]/g) || [];
      console.log(`🔴 ${fileNum}. ${filePath} - STILL HAS MOCK DATA`);
      dataImportMatches.forEach(match => {
        console.log(`     └─ ${match}`);
      });
      auditResults.stillHasMockData++;
      auditResults.errors.push(`Still has mock data: ${filePath} - ${dataImportMatches.join(', ')}`);
    } else {
      console.log(`✅ ${fileNum}. ${filePath} - MIGRATED`);
      auditResults.migratedFiles++;
    }
    
  } catch (error) {
    console.log(`💥 ${fileNum}. ${filePath} - READ ERROR: ${error.message}`);
    auditResults.errors.push(`Read error: ${filePath} - ${error.message}`);
  }
});

// Summary Statistics
console.log('\n📊 AUDIT SUMMARY:');
console.log('==================');
console.log(`📁 Total Target Files: ${auditResults.totalFiles}`);
console.log(`✅ Files Found: ${auditResults.existingFiles}`);
console.log(`🔄 Successfully Migrated: ${auditResults.migratedFiles}`);
console.log(`🔴 Still Have Mock Data: ${auditResults.stillHasMockData}`);
console.log(`❌ Missing Files: ${auditResults.missingFiles}`);
console.log(`💥 Errors: ${auditResults.errors.length}`);

// Calculate percentages
const migrationRate = ((auditResults.migratedFiles / auditResults.totalFiles) * 100).toFixed(1);
const completionRate = ((auditResults.migratedFiles / auditResults.existingFiles) * 100).toFixed(1);

console.log(`\n📈 COMPLETION RATES:`);
console.log(`Overall Migration Rate: ${migrationRate}% (${auditResults.migratedFiles}/${auditResults.totalFiles})`);
console.log(`Existing Files Rate: ${completionRate}% (${auditResults.migratedFiles}/${auditResults.existingFiles})`);

// Domain Breakdown Analysis
console.log('\n🏗️ DOMAIN BREAKDOWN:');
console.log('====================');

const domains = [
  { name: 'Authentication', files: originalFiles.slice(0, 10) },
  { name: 'Profile', files: originalFiles.slice(10, 17) }, 
  { name: 'Puzzle', files: originalFiles.slice(17, 28) },
  { name: 'Settings', files: originalFiles.slice(28, 37) },
  { name: 'Progress', files: originalFiles.slice(37, 46) },
  { name: 'Learning', files: originalFiles.slice(46, 51) },
  { name: 'Advanced', files: originalFiles.slice(51) }
];

domains.forEach(domain => {
  let domainMigrated = 0;
  let domainExists = 0;
  
  domain.files.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      domainExists++;
      const content = fs.readFileSync(filePath, 'utf8');
      const hasDataImports = content.includes('from \'@/data/') || 
                            content.includes('from "@/data/') ||
                            content.includes('from \'../data/') ||
                            content.includes('from "../data/');
      if (!hasDataImports) {
        domainMigrated++;
      }
    }
  });
  
  const domainRate = domainExists > 0 ? ((domainMigrated / domainExists) * 100).toFixed(1) : '0.0';
  console.log(`${domain.name.padEnd(12)} ${domainMigrated}/${domainExists} (${domainRate}%)`);
});

// Final Assessment
console.log('\n🎯 FINAL ASSESSMENT:');
console.log('====================');

if (auditResults.migratedFiles === auditResults.totalFiles) {
  console.log('🎉 PERFECT! All 72 files successfully migrated!');
  console.log('✅ Agent work is 100% complete and compliant with plan.');
} else if (auditResults.stillHasMockData === 0 && auditResults.missingFiles === 0) {
  console.log('✅ All existing files are migrated correctly!');
  console.log('ℹ️  Some files might have been removed or renamed during migration.');
} else {
  console.log('⚠️  Migration is incomplete. Issues found:');
  if (auditResults.stillHasMockData > 0) {
    console.log(`   • ${auditResults.stillHasMockData} files still have @/data imports`);
  }
  if (auditResults.missingFiles > 0) {
    console.log(`   • ${auditResults.missingFiles} files are missing`);
  }
  if (auditResults.errors.length > 0) {
    console.log(`   • ${auditResults.errors.length} files have errors`);
  }
}

// Recommendations
console.log('\n💡 NEXT ACTIONS:');
console.log('================');

if (auditResults.stillHasMockData > 0) {
  console.log('1. Review files with remaining @/data imports');
  console.log('2. Complete migration for non-compliant files');
  console.log('3. Verify API hook replacements are working');
}

if (auditResults.missingFiles > 0) {
  console.log('1. Locate missing files (may have been moved/renamed)');
  console.log('2. Update file paths in audit if files were restructured');
}

if (auditResults.migratedFiles === auditResults.existingFiles) {
  console.log('1. Test the application end-to-end');
  console.log('2. Verify all features work with API data');
  console.log('3. Consider cleanup of unused mock files');
}

console.log('\n📋 Use these commands for detailed investigation:');
console.log('grep -r "from.*@/data" src/ --include="*.ts" --include="*.tsx"');
console.log('find src/ -name "*.ts" -o -name "*.tsx" | xargs grep -l "@/data"');