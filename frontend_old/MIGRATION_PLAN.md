# API Integration Migration Plan

## 🎯 Overview
Systematic replacement of 82+ mock data files with API client hooks following SRP architecture.

## 📋 Migration Strategy

### Phase 1: Audit & Mapping ✅
1. **Identify all mock files** - Scan `/src/data/` directory
2. **Find usage locations** - Grep for imports across codebase  
3. **Map to API clients** - Match each mock file to appropriate client
4. **Create migration checklist** - Track progress systematically

### Phase 2: Core Infrastructure ✅
1. **API Client Classes** - 13 classes implemented
2. **Hook Layer** - Domain and page-specific hooks
3. **React Query Setup** - Caching and error handling
4. **Testing** - All clients tested with backend

### Phase 3: Systematic Replacement (CURRENT)
1. **High Priority Files First** - Auth, Profile, Core functionality
2. **Page-by-Page Migration** - One component at a time
3. **Backward Compatibility** - Keep fallbacks during transition
4. **Testing Each Migration** - Verify functionality

### Phase 4: Cleanup & Optimization
1. **Remove unused mocks** - After successful migration
2. **Optimize queries** - Fine-tune caching strategies
3. **Performance audit** - Ensure smooth data flow
4. **Documentation** - Update component usage docs

## 📊 Migration Tracking Matrix

| Mock File | Usage Count | API Client | Hook | Priority | Status |
|-----------|-------------|------------|------|----------|--------|
| authenticationMocks.ts | 1 | AuthApiClient | useAuth | HIGH | 🟡 PARTIAL |
| userProfile.ts | ? | ProfileApiClient | useProfilePage | HIGH | 🟡 PARTIAL |
| tutorials.ts | ? | TutorialApiClient | useTutorialsPage | HIGH | ✅ HOOKED |
| learningPaths.ts | ? | LearningApiClient | useLearningPathsPage | HIGH | ✅ HOOKED |
| puzzleCategories.ts | ? | PuzzleApiClient | usePuzzles | HIGH | ✅ HOOKED |
| userProgress.ts | ? | ProgressApiClient | useProgress | HIGH | ✅ HOOKED |
| ... | ... | ... | ... | ... | ... |

## 🔄 Replacement Process

### Step 1: Identify Mock Usage
```bash
# Find all imports of a specific mock file
grep -r "import.*mockUserProfile" src/
grep -r "from.*userProfile" src/
```

### Step 2: Analyze Component Requirements
- What data does the component need?
- Which hook provides that data?
- Any transformation needed?
- Loading/error states required?

### Step 3: Replace Import & Usage
```typescript
// BEFORE
import { mockUserProfile } from '@/data/userProfile'

// AFTER  
import { useProfilePage } from '@/hooks'
```

### Step 4: Update Component Logic
```typescript
// BEFORE
const ProfilePage = () => {
  const data = mockUserProfile
  return <div>{data.userStats.displayName}</div>
}

// AFTER
const ProfilePage = () => {
  const { data, isLoading, error } = useProfilePage()
  
  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} />
  if (!data) return <EmptyState />
  
  return <div>{data.userStats.displayName}</div>
}
```

### Step 5: Test & Verify
- Component renders correctly
- Loading states work
- Error handling functions
- Data updates properly

## 📁 Mock File Categories

### Authentication & User (AuthApiClient)
- `authenticationMocks.ts` ✅ 
- `userAccount.ts`
- `registration.ts` 
- `passwordReset.ts`
- `resetPasswordDefaults.ts`

### Profile & Stats (ProfileApiClient)
- `userProfile.ts` 🟡
- `userSettings.ts`
- `preferencesDefaults.ts`
- `preferencesData.ts`

### Puzzles (PuzzleApiClient)  
- `puzzleCategories.ts` ✅
- `customPuzzles.ts`
- `tacticalPuzzles.ts`
- `endgamePuzzles.ts`
- `openingPuzzles.ts`
- `puzzleProgressStats.ts`

### Tutorials (TutorialApiClient)
- `tutorials.ts` ✅
- `tutorialsDefaults.ts`
- `relatedTutorials.ts`

### Learning Paths (LearningApiClient)
- `learningPaths.ts` ✅
- `studyPlansDefaults.ts`
- `userStudyPlans.ts`

### Progress & Analytics (ProgressApiClient)
- `userProgress.ts` ✅
- `userProgressTracking.ts`
- `progressOverviewDefaults.ts`
- `analyticsData.ts`

### Games & Analysis (GameApiClient + AnalysisApiClient)
- `reviewGames.ts`
- `historicGames.ts`
- `analysisPositions.ts`
- `gameAnalysisConfig.ts`

### Achievements (AchievementApiClient)
- `gamificationData.ts`
- `achievementConfigurations.ts`

### Settings (SettingsApiClient)
- `boardThemes.ts`
- `boardThemesData.ts`
- `pieceSetsData.ts`
- `notificationSettingsData.ts`

### Search & Navigation (SearchApiClient + UI Configs)
- `helpContent.ts`
- `navigationConfig.ts`
- `iconMappings.ts`

## 🎯 Priority Levels

### HIGH Priority (Core User Experience)
1. **Authentication** - Login, Register, Profile
2. **Main Navigation** - Dashboard, Profile page  
3. **Puzzle Training** - Core learning experience
4. **Progress Tracking** - User motivation

### MEDIUM Priority (Enhanced Features)
1. **Tutorials System** - Guided learning
2. **Learning Paths** - Structured curriculum
3. **Settings & Preferences** - Customization

### LOW Priority (Nice-to-Have)
1. **Advanced Analysis** - Game review tools
2. **Achievement System** - Gamification
3. **Search & Help** - Support features

## 🚀 Implementation Plan

### Week 1: Core User Flow
- [ ] Authentication pages (Login, Register)
- [ ] Profile page and dashboard
- [ ] Basic puzzle functionality
- [ ] Navigation and routing

### Week 2: Learning Features  
- [ ] Tutorial system integration
- [ ] Learning path progress
- [ ] Settings and preferences
- [ ] Progress overview

### Week 3: Advanced Features
- [ ] Achievement system
- [ ] Search functionality  
- [ ] Game analysis tools
- [ ] Help and support

### Week 4: Polish & Optimization
- [ ] Remove unused mock files
- [ ] Performance optimization
- [ ] Error handling improvements
- [ ] Documentation updates

## 🔍 Tracking Commands

```bash
# Find all data imports across the codebase
grep -r "from.*@/data" src/ --include="*.ts" --include="*.tsx"

# Count remaining mock file usage
find src/ -name "*.ts" -o -name "*.tsx" | xargs grep -l "@/data" | wc -l

# Check specific file usage
grep -r "mockUserProfile" src/ --include="*.ts" --include="*.tsx"
```

## ✅ Success Criteria

### Per File Migration
- [ ] All imports replaced with hooks
- [ ] Loading states implemented  
- [ ] Error boundaries working
- [ ] Data transformation correct
- [ ] UI rendering properly

### Overall Migration
- [ ] 0 mock file imports remaining
- [ ] All pages use API data
- [ ] Performance maintained
- [ ] Error handling robust
- [ ] User experience smooth

## 📝 Notes

- **Backward Compatibility**: Keep mock files as fallbacks initially
- **Incremental Migration**: Replace one component at a time
- **Testing**: Verify each migration before proceeding
- **Performance**: Monitor query efficiency and caching
- **User Experience**: Maintain smooth loading states

---

**Next Action**: Run comprehensive audit to populate the migration matrix with exact usage counts and locations.