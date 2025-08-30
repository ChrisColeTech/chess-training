# 🔍 Migration Patterns Analysis - 72 Files

## 📊 Key Patterns Emerging:

### **🏗️ Pattern 1: Domain-Based Architecture**
Files are organized by chess training domains, each mapping to specific API clients:

#### **Authentication Domain (10 files)**
- **Pattern**: Auth flows and user management
- **API Client**: `AuthApiClient` → `useAuth` hook
- **Files**:
  - `src/pages/LoginPage.tsx`
  - `src/pages/auth/RegisterPage.tsx`
  - `src/components/auth/resetPassword/*` (4 files)
  - `src/hooks/useForgotPassword.ts`
  - `src/hooks/useRegister.ts`
  - `src/hooks/useResetPassword.ts`
  - `src/hooks/useAccount.ts`

#### **Profile & User Data Domain (7 files)**
- **Pattern**: User profiles, preferences, and account management
- **API Client**: `ProfileApiClient` → `useProfile` hooks
- **Files**:
  - `src/components/core/profile/*` (3 files)
  - `src/hooks/useProfile.ts`
  - `src/hooks/usePreferences.ts`
  - `src/pages/settings/AccountPage.tsx`
  - `src/pages/settings/PreferencesPage.tsx`

#### **Puzzle Training Domain (11 files)**
- **Pattern**: Core chess puzzle functionality
- **API Client**: `PuzzleApiClient` → `usePuzzles` hooks
- **Files**:
  - `src/pages/puzzles/*` (5 puzzle pages)
  - `src/components/puzzles/*` (6 puzzle components)

#### **Progress & Analytics Domain (6 files)**
- **Pattern**: User progress tracking and statistics
- **API Client**: `ProgressApiClient` → `useProgress` hooks
- **Files**:
  - `src/hooks/useProgressOverview.ts`
  - `src/hooks/useDetailedStats.ts`
  - `src/components/progress/achievements/*` (5 files)
  - `src/components/progress/stats/TrendAnalysis.tsx`

#### **Learning & Study Domain (4 files)**
- **Pattern**: Tutorials and structured learning paths
- **API Client**: `LearningApiClient` + `TutorialApiClient`
- **Files**:
  - `src/hooks/useLearningPath.ts`
  - `src/hooks/useStudyPlans.ts`
  - `src/hooks/useTutorials.ts`
  - `src/components/help/tutorials/TutorialPlayer.tsx`
  - `src/components/study/plans/StudyScheduler.tsx`

#### **Settings & Configuration Domain (9 files)**
- **Pattern**: App settings and user preferences
- **API Client**: `SettingsApiClient` + `NotificationApiClient`
- **Files**:
  - `src/pages/settings/*` (2 settings pages)
  - `src/components/settings/*` (7 settings components)

---

### **🏛️ Pattern 2: Component Architecture Layers**

#### **Page Components (12 files) - Top Level**
- **Pattern**: Route-level components that orchestrate data
- **Common Structure**: Page → Multiple API hooks → Data presentation
- **Replacement Strategy**: Replace with page-specific hooks
- **Examples**:
  - `LoginPage.tsx` → `useAuth`
  - `TacticalPuzzlesPage.tsx` → `usePuzzlesPage`
  - `AccountPage.tsx` → `useProfile`

#### **Feature Components (38 files) - Mid Level**
- **Pattern**: Specific feature implementations
- **Common Structure**: Component → Single domain hook → UI rendering
- **Replacement Strategy**: Replace with domain-specific hooks
- **Sub-patterns**:
  - **Form Components**: Auth forms, settings forms
  - **Display Components**: Profile displays, progress charts
  - **Interactive Components**: Puzzle interfaces, analysis tools

#### **Hook Components (22 files) - Data Layer**
- **Pattern**: Existing custom hooks using mock data
- **Common Structure**: Hook → Mock import → Data transformation
- **Replacement Strategy**: Replace mock imports with API client calls
- **Note**: These are the bridge between old mock system and new API system

---

### **🎯 Pattern 3: Data Flow Architecture**

#### **Read-Only Data (45 files)**
- **Pattern**: Components that only display data
- **Migration**: Simple hook replacement + loading states
- **Examples**: Profile displays, puzzle lists, statistics

#### **Interactive Data (20 files)**
- **Pattern**: Components that modify data (forms, settings)
- **Migration**: Hook replacement + mutation handling + optimistic updates
- **Examples**: Login forms, settings pages, puzzle solving

#### **Real-Time Data (7 files)**
- **Pattern**: Components needing live updates
- **Migration**: Hook replacement + query invalidation strategies
- **Examples**: Progress tracking, achievement notifications

---

### **🔄 Pattern 4: Migration Complexity Levels**

#### **Level 1 - Simple Display (35 files)**
```typescript
// BEFORE
import { mockData } from '@/data/file'
const data = mockData

// AFTER  
const { data, isLoading } = useHook()
if (isLoading) return <Loading />
```

#### **Level 2 - Form Interactions (25 files)**
```typescript
// BEFORE
import { mockData } from '@/data/file'
const handleSubmit = (data) => console.log(data)

// AFTER
const { mutate, isLoading } = useHook()
const handleSubmit = (data) => mutate(data)
```

#### **Level 3 - Complex State (12 files)**
```typescript
// BEFORE
import { mockData } from '@/data/file'
const [state, setState] = useState(mockData)

// AFTER
const { data, mutate, invalidateQueries } = useHook()
// Complex state management with React Query
```

---

### **📁 Pattern 5: File Organization Clusters**

#### **Cluster 1: Authentication Flow (Complete User Journey)**
- LoginPage → RegisterPage → ResetPassword components → Account management
- **Migration Order**: Sequential (login enables everything else)

#### **Cluster 2: Core Training Loop**
- Puzzle pages → Progress tracking → Achievement system
- **Migration Order**: Parallel (independent features)

#### **Cluster 3: Settings & Customization**
- All settings pages and components
- **Migration Order**: Parallel (independent settings)

#### **Cluster 4: Advanced Features**
- Analysis tools → Custom puzzles → Help system
- **Migration Order**: Later (nice-to-have features)

---

### **🎲 Pattern 6: API Client Mapping**

| API Client | File Count | Complexity | Dependencies |
|------------|------------|------------|--------------|
| **AuthApiClient** | 10 files | High | Foundation for others |
| **ProfileApiClient** | 7 files | Medium | Depends on Auth |
| **PuzzleApiClient** | 11 files | Medium | Core functionality |
| **ProgressApiClient** | 6 files | Medium | Depends on Puzzle/Profile |
| **SettingsApiClient** | 9 files | Low | Independent |
| **LearningApiClient** | 4 files | Medium | Depends on Profile |
| **Others** | 25 files | Low-Medium | Various dependencies |

---

## 🚀 **Strategic Migration Approach Based on Patterns:**

### **Phase 1: Foundation Layer (Authentication)**
- Migrate all 10 authentication files first
- Establishes user identity for other systems
- **Blocker**: Nothing else works without auth

### **Phase 2: Core Experience (Puzzles + Profile)**
- Migrate 11 puzzle files + 7 profile files in parallel
- Provides main app functionality
- **Enables**: Core chess training experience

### **Phase 3: Enhanced Experience (Progress + Settings)**  
- Migrate 6 progress files + 9 settings files
- Adds user engagement and customization
- **Enables**: Personalized experience

### **Phase 4: Advanced Features (Everything else)**
- Migrate remaining 29 files
- Adds nice-to-have features
- **Enables**: Complete feature set

---

## 📊 **Migration Batching Strategy:**

### **Batch 1: Authentication Complete (10 files)**
All auth-related files in one batch - they're interdependent

### **Batch 2: Core User Experience (18 files)**
Puzzle + Profile files - can be done in parallel

### **Batch 3: User Engagement (15 files)**
Progress + Settings files - independent features  

### **Batch 4: Advanced Features (29 files)**
Everything else - lowest priority

---

**Key Insight**: The patterns show a clear **dependency hierarchy** - Authentication enables Profile, which enables Puzzles, which enables Progress tracking. This suggests a **sequential migration of domains** rather than random file-by-file replacement.