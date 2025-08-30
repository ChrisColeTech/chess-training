# 🔄 API Integration Migration Tracker

## 📊 Executive Summary
- **Total Mock Files**: 85
- **Files with Usage**: 41 (need migration)  
- **Unused Files**: 44 (can be removed later)
- **Total Import Locations**: 62

## 🎯 Migration Priority Queue

### 🔴 HIGH Priority (9 files - Core User Experience)
| File | Imports | Location | API Client | Hook | Action |
|------|---------|----------|------------|------|--------|
| **passwordReset.ts** | 5 | Auth components | AuthApiClient | useAuth | ⏳ START HERE |
| **userAccount.ts** | 2 | Account settings | ProfileApiClient | useProfile | 🟡 NEXT |
| **authenticationMocks.ts** | 1 | LoginPage.tsx | AuthApiClient | useAuth | 🟡 NEXT |
| **learningPaths.ts** | 1 | StudyPlans hook | LearningApiClient | useLearningPathsPage | 🟡 NEXT |
| **puzzleCategories.ts** | 1 | PuzzleService | PuzzleApiClient | usePuzzlesPage | 🟡 NEXT |
| **puzzleProgressStats.ts** | 1 | PuzzleProgress | PuzzleApiClient | usePuzzles | 🟡 NEXT |
| **registration.ts** | 1 | RegisterPage.tsx | AuthApiClient | useAuth | 🟡 NEXT |
| **tacticalPuzzles.ts** | 1 | TacticalPuzzlesPage | PuzzleApiClient | usePuzzles | 🟡 NEXT |
| **userProfile.ts** | 1 | Profile hook | ProfileApiClient | useProfilePage | ✅ DONE |
| **userProgress.ts** | 1 | ProgressOverview | ProgressApiClient | useProgress | 🟡 NEXT |

### 🟡 MEDIUM Priority (7 files - Enhanced Features)  
| File | Imports | Location | API Client | Hook | Action |
|------|---------|----------|------------|------|--------|
| **boardThemes.ts** | 2 | Settings pages | SettingsApiClient | useSettings | 🔲 PENDING |
| **preferencesData.ts** | 2 | Settings components | ProfileApiClient | useProfile | 🔲 PENDING |
| **userSettings.ts** | 2 | Settings pages | ProfileApiClient | useProfile | 🔲 PENDING |
| **analyticsData.ts** | 1 | DetailedStats hook | ProgressApiClient | useProgress | 🔲 PENDING |
| **endgamePuzzles.ts** | 1 | EndgamePuzzlesPage | PuzzleApiClient | usePuzzles | 🔲 PENDING |
| **openingPuzzles.ts** | 1 | OpeningPuzzlesPage | PuzzleApiClient | usePuzzles | 🔲 PENDING |

### 🔵 LOW Priority (25 files - UI Configs & Nice-to-Have)
*See detailed audit above for complete list*

## 📋 Step-by-Step Migration Plan

### Phase 1: Authentication Flow (Week 1)
**Target: Complete user auth experience**

#### 1.1 Password Reset System (5 imports) - START HERE
- [ ] **File**: `passwordReset.ts` → `useAuth` hook
- [ ] **Components to update**:
  - `src/components/auth/resetPassword/InvalidTokenState.tsx`
  - `src/components/auth/resetPassword/LoadingState.tsx`
  - `src/components/auth/resetPassword/ResetPasswordForm.tsx`
  - `src/components/auth/resetPassword/SuccessState.tsx`
  - `src/hooks/useForgotPassword.ts`

#### 1.2 Login Page (1 import)
- [ ] **File**: `authenticationMocks.ts` → `useAuth` hook  
- [ ] **Component**: `src/pages/LoginPage.tsx`

#### 1.3 Registration Page (1 import)
- [ ] **File**: `registration.ts` → `useAuth` hook
- [ ] **Component**: `src/pages/auth/RegisterPage.tsx`

#### 1.4 Account Management (2 imports)
- [ ] **File**: `userAccount.ts` → `useProfile` hook
- [ ] **Components**:
  - `src/hooks/useAccount.ts`
  - `src/pages/settings/AccountPage.tsx`

### Phase 2: Core Learning Experience (Week 2)
**Target: Puzzle training and progress tracking**

#### 2.1 Puzzle System
- [ ] **puzzleCategories.ts** → `usePuzzlesPage` hook (1 import)
- [ ] **puzzleProgressStats.ts** → `usePuzzles` hook (1 import)  
- [ ] **tacticalPuzzles.ts** → `usePuzzles` hook (1 import)

#### 2.2 Progress Tracking
- [ ] **userProgress.ts** → `useProgress` hook (1 import)

#### 2.3 Learning Paths
- [ ] **learningPaths.ts** → `useLearningPathsPage` hook (1 import)

### Phase 3: Settings & Preferences (Week 3)
**Target: User customization**

#### 3.1 Profile Settings
- [ ] **userSettings.ts** → `useProfile` hook (2 imports)
- [ ] **preferencesData.ts** → `useProfile` hook (2 imports)

#### 3.2 Board & UI Settings
- [ ] **boardThemes.ts** → `useSettings` hook (2 imports)

#### 3.3 Analytics & Stats
- [ ] **analyticsData.ts** → `useProgress` hook (1 import)

### Phase 4: Extended Features (Week 4)
**Target: Additional puzzle types and configurations**

#### 4.1 Advanced Puzzles
- [ ] **endgamePuzzles.ts** → `usePuzzles` hook
- [ ] **openingPuzzles.ts** → `usePuzzles` hook

#### 4.2 UI Configuration Files
- [ ] Clean up LOW priority UI config files
- [ ] Remove unused mock files

## 🛠️ Migration Process Template

### For Each File Migration:

#### Step 1: Analyze Current Usage
```bash
# Find all imports
grep -r "from.*@/data/filename" src/ --include="*.ts" --include="*.tsx"
```

#### Step 2: Identify Required Hook
- Which API client handles this data?
- Which hook provides the needed functionality?
- What data transformation is needed?

#### Step 3: Update Component
```typescript
// BEFORE
import { mockData } from '@/data/filename'

const Component = () => {
  const data = mockData
  return <div>{data.someField}</div>
}

// AFTER  
import { useHookName } from '@/hooks'

const Component = () => {
  const { data, isLoading, error } = useHookName()
  
  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} />
  if (!data) return <EmptyState />
  
  return <div>{data.someField}</div>
}
```

#### Step 4: Test Migration
- [ ] Component renders correctly
- [ ] Loading states work  
- [ ] Error handling functions
- [ ] Data updates properly
- [ ] No TypeScript errors

#### Step 5: Mark Complete
- [ ] Update this tracker
- [ ] Commit changes
- [ ] Move to next file

## 📈 Progress Tracking

### Completed ✅
- [x] **userProfile.ts** - Profile page hook created

### In Progress ⏳
- [ ] **passwordReset.ts** - Next target (5 components)

### High Priority Queue 🔴
- [ ] userAccount.ts (2 imports)
- [ ] authenticationMocks.ts (1 import)
- [ ] learningPaths.ts (1 import)
- [ ] puzzleCategories.ts (1 import)
- [ ] puzzleProgressStats.ts (1 import)
- [ ] registration.ts (1 import)
- [ ] tacticalPuzzles.ts (1 import)
- [ ] userProgress.ts (1 import)

## 🎯 Success Metrics

### Weekly Goals
- **Week 1**: 10 HIGH priority files migrated
- **Week 2**: 7 MEDIUM priority files migrated  
- **Week 3**: Begin LOW priority cleanup
- **Week 4**: Complete migration, remove unused files

### Final Success Criteria
- [ ] 0 `@/data` imports in active code
- [ ] All pages use API hooks
- [ ] Loading states implemented
- [ ] Error handling working
- [ ] Performance maintained
- [ ] User experience smooth

---

**Current Status**: Ready to begin systematic migration starting with `passwordReset.ts` (highest import count)

**Next Action**: Update the 5 password reset components to use `useAuth` hook