# Comprehensive Frontend API Integration Plan

## Overview
Complete plan to replace all 82 frontend mock data files with real API calls from the backend running on http://localhost:3000. This follows the established SRP architectural patterns.

## Backend API Endpoints Available

### Authentication API (`/api/auth`)
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login  
- `POST /api/auth/refresh` - Token refresh
- `POST /api/auth/logout` - User logout

### User Management API (`/api/users`)
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### User Profiles API (`/api/profiles/:userId`)
- `GET /api/profiles/:userId` - Get user profile by ID
- `GET /api/profiles/:userId/settings` - Get user settings
- `GET /api/profiles/:userId/progress` - Get user progress
- `GET /api/profiles/:userId/study-plans` - Get user study plans
- `GET /api/profiles/:userId/analytics` - Get user analytics

### Puzzles API (`/api/puzzles`)
- `GET /api/puzzles/next` - Get next puzzle
- `POST /api/puzzles/:puzzleId/solve` - Submit puzzle solution
- `POST /api/puzzles/:puzzleId/hint` - Get puzzle hint
- `GET /api/puzzles/stats` - Get puzzle statistics

### Games API (`/api/games`)
- `POST /api/games/create` - Create new game
- `POST /api/games/:gameId/move` - Make move in game
- `GET /api/games/:gameId` - Get game details
- `GET /api/games/history` - Get game history

### Statistics API (`/api/stats`)
- `GET /api/stats/dashboard` - Get dashboard statistics

### Opening Database API (`/api/openings`)
- `GET /api/openings` - Get all openings
- `GET /api/openings/eco/:eco` - Get openings by ECO code
- `GET /api/openings/:id` - Get specific opening

### Achievements API (`/api/achievements`)
- `GET /api/achievements` - Get all achievements
- `GET /api/achievements/categories` - Get achievement categories
- `GET /api/achievements/user/me` - Get user achievements (auth required)
- `GET /api/achievements/user/me/stats` - Get user achievement stats (auth required)
- `GET /api/achievements/:id` - Get specific achievement
- `GET /api/achievements/:achievementId/eligibility` - Check achievement eligibility (auth required)
- `POST /api/achievements/:achievementId/earn` - Earn achievement (auth required)
- `PUT /api/achievements/:achievementId/progress` - Update achievement progress (auth required)

### Learning Paths API (`/api/learning`)
- `GET /api/learning/paths` - Get all learning paths
- `GET /api/learning/paths/categories` - Get learning path categories
- `GET /api/learning/paths/:id` - Get specific learning path
- `GET /api/learning/paths/:learningPathId/stats` - Get learning path stats (auth required)
- `GET /api/learning/modules` - Get all learning modules
- `GET /api/learning/modules/:id` - Get specific learning module
- `GET /api/learning/progress` - Get user learning progress (auth required)
- `POST /api/learning/paths/:learningPathId/start` - Start learning path (auth required)
- `PUT /api/learning/modules/:moduleId/progress` - Update module progress (auth required)

### Tutorials API (`/api/tutorials`)
- `GET /api/tutorials` - Get all tutorials
- `GET /api/tutorials/categories` - Get tutorial categories
- `GET /api/tutorials/category/:category` - Get tutorials by category
- `GET /api/tutorials/:id` - Get specific tutorial with steps
- `GET /api/tutorials/:tutorialId/steps` - Get tutorial steps
- `GET /api/tutorials/progress/:tutorialId` - Get user tutorial progress (auth required)
- `POST /api/tutorials/:tutorialId/start` - Start tutorial (auth required)
- `POST /api/tutorials/:tutorialId/steps/:stepId/complete` - Complete tutorial step (auth required)

### Analysis API (`/api/analysis`)
- `GET /api/analysis/positions` - Get analysis positions
- `GET /api/analysis/positions/categories` - Get analysis categories
- `GET /api/analysis/positions/:id` - Get specific analysis position
- `GET /api/analysis/endgame` - Get endgame positions
- `GET /api/analysis/endgame/categories` - Get endgame categories
- `GET /api/analysis/endgame/material/:material` - Get endgame positions by material
- `GET /api/analysis/endgame/:id` - Get specific endgame position
- `GET /api/analysis/search` - Search positions
- `GET /api/analysis/stats` - Get position statistics
- `GET /api/analysis/stored/:fen` - Get stored analysis for position
- `POST /api/analysis/analyze` - Analyze position with engine

### AI Opponents API (`/api/ai-opponents`)
- `GET /api/ai-opponents` - Get all AI opponents
- `GET /api/ai-opponents/stats` - Get AI opponent statistics
- `GET /api/ai-opponents/level/:level` - Get opponents by skill level
- `GET /api/ai-opponents/:id` - Get specific AI opponent
- `POST /api/ai-opponents/move` - Get best move from AI

### Help System API (`/api/help`)
- `GET /api/help` - Get help content
- `GET /api/help/search` - Search help content
- `GET /api/help/categories` - Get all help categories
- `GET /api/help/topics` - Get all help topics
- `GET /api/help/featured` - Get featured help content
- `GET /api/help/popular` - Get popular help content
- `GET /api/help/recent` - Get recently updated content
- `GET /api/help/stats` - Get help content statistics
- `GET /api/help/category/:category` - Get help content by category
- `GET /api/help/topic/:topic` - Get help content by topic
- `GET /api/help/:id` - Get specific help content
- `GET /api/help/:id/suggested` - Get suggested content for article

### Subscriptions API (`/api/subscriptions`)
- `GET /api/subscriptions/user/me` - Get current user's active subscription (auth required)
- `GET /api/subscriptions/user/me/history` - Get current user's subscription history (auth required)
- `POST /api/subscriptions` - Create new subscription
- `PUT /api/subscriptions/:id/cancel` - Cancel subscription
- `PUT /api/subscriptions/:id/renew` - Renew subscription

## Frontend Mock Data Files (82 total)

### Core Data Files
- `adaptiveLearning.ts` - Adaptive learning algorithms and configurations
- `aiOpponents.ts` - AI opponent configurations and personalities
- `analysisPositions.ts` - Chess analysis positions
- `analyticsData.ts` - User analytics and performance data
- `customPuzzles.ts` - User-created custom puzzles
- `endgamePositions.ts` - Endgame training positions
- `gamificationData.ts` - Achievement and gamification data
- `helpContent.ts` - Help center articles and FAQ
- `historicGames.ts` - Historical game database
- `learningPaths.ts` - Structured learning paths
- `openingPuzzles.ts` - Opening-specific puzzle collections
- `openingsDatabase.ts` - Chess opening database
- `puzzleCategories.ts` - Puzzle category definitions
- `reviewGames.ts` - Games for review and analysis
- `tacticalPuzzles.ts` - Tactical puzzle database
- `tutorials.ts` - Tutorial content and lessons
- `userProfile.ts` - User profile information
- `userProgress.ts` - User progress tracking data
- `userSettings.ts` - User preferences and settings

### Configuration & UI Files
- `boardThemes.ts` - Chess board theme configurations
- `boardThemesData.ts` - Board theme data structures
- `boardThemeDefaults.ts` - Default board theme settings
- `chessGameBoardConfig.ts` - Chess game board configuration
- `boardControlsData.ts` - Board control interface data
- `pieceSetsData.ts` - Chess piece set configurations
- `analysisSettings.ts` - Analysis tool settings
- `evaluationConfig.ts` - Position evaluation configuration
- `engineLineConfig.ts` - Chess engine analysis line configuration
- `gameAnalysisConfig.ts` - Game analysis tool configuration
- `analysisUIConfig.ts` - Analysis interface configuration
- `puzzleConfigurations.ts` - Puzzle system configurations
- `puzzleSelectionDefaults.ts` - Default puzzle selection settings
- `puzzleSessionDefaults.ts` - Default puzzle session settings
- `puzzleProgressStats.ts` - Puzzle progress statistics
- `puzzleUIConfig.ts` - Puzzle interface configuration
- `puzzleStatsUIConfig.ts` - Puzzle statistics interface
- `puzzleSelectionUIConfig.ts` - Puzzle selection interface
- `puzzleSessionUIConfig.ts` - Puzzle session interface
- `puzzleSourceUIConfig.ts` - Puzzle source interface
- `progressOverviewDefaults.ts` - Progress overview defaults
- `progressConfigurations.ts` - Progress tracking configurations
- `progressUIConfig.ts` - Progress interface configuration

### User-Specific Data Files
- `userAccount.ts` - User account management data
- `userAnalysisPreferences.ts` - User analysis preferences
- `userProgressTracking.ts` - User progress tracking
- `userPuzzlePreferences.ts` - User puzzle preferences
- `userPuzzleStats.ts` - User puzzle statistics
- `userPuzzleSessions.ts` - User puzzle session data
- `userPuzzleSelections.ts` - User puzzle selections
- `userStudyPlans.ts` - User study plan data
- `notificationSettings.ts` - User notification settings
- `notificationSettingsData.ts` - Notification settings data
- `preferencesData.ts` - User preference data
- `preferencesDefaults.ts` - Default user preferences

### Authentication & Registration
- `authenticationMocks.ts` - Authentication mock data
- `registration.ts` - User registration data
- `registerDefaults.ts` - Registration default values
- `passwordReset.ts` - Password reset functionality
- `resetPasswordDefaults.ts` - Password reset defaults

### System & Utility Data
- `subscriptionData.ts` - Subscription plan data
- `contactSupport.ts` - Contact support information
- `navigationConfig.ts` - Navigation configuration
- `iconMappings.ts` - Icon mapping configurations
- `helpCenterIcons.ts` - Help center icon mappings
- `chartConfigurations.ts` - Chart and visualization configs
- `commonConfigurations.ts` - Common system configurations
- `commonConfigurationsData.ts` - Common configuration data
- `importExportSources.ts` - Import/export data sources
- `collectionBrowserTabs.ts` - Collection browser tab configuration

### Specialized Data Files
- `chessTheoryPrinciples.ts` - Chess theory and principles
- `predefinedPositions.ts` - Predefined chess positions
- `analysisPositionConfigurations.ts` - Analysis position configs
- `studyPlansDefaults.ts` - Study plan default configurations
- `studyPlansUIConfig.ts` - Study plans interface config
- `tutorialsDefaults.ts` - Tutorial default settings
- `relatedTutorials.ts` - Related tutorial mappings
- `achievementConfigurations.ts` - Achievement system configs
- `skillTreeConfigurations.ts` - Skill tree progression configs
- `gameSetupConfig.ts` - Game setup configurations
- `playComputerDefaults.ts` - Play vs computer defaults
- `openingExplorerDefaults.ts` - Opening explorer defaults
- `puzzleSourceDatabase.ts` - Puzzle source database
- `puzzleSourceMappings.ts` - Puzzle source mappings
- `profileUtilities.ts` - Profile utility functions

## Mock File to API Endpoint Mapping

### Authentication & User Management
- `authenticationMocks.ts` → `/api/auth/*` endpoints
- `registration.ts` → `POST /api/auth/register`
- `registerDefaults.ts` → `POST /api/auth/register`
- `passwordReset.ts` → `/api/auth/forgot-password`, `/api/auth/reset-password`
- `resetPasswordDefaults.ts` → Password reset endpoints
- `userProfile.ts` → `GET /api/users/profile`, `GET /api/profiles/:userId`
- `userAccount.ts` → `GET /api/users/profile`, `PUT /api/users/profile`
- `userSettings.ts` → `GET /api/profiles/:userId/settings`
- `notificationSettings.ts` → User settings endpoints
- `notificationSettingsData.ts` → User settings endpoints
- `preferencesData.ts` → User settings/preferences endpoints
- `preferencesDefaults.ts` → User settings/preferences endpoints

### Puzzles System
- `tacticalPuzzles.ts` → `GET /api/puzzles/next` (with tactical filter)
- `openingPuzzles.ts` → `GET /api/puzzles/next` (with opening filter)  
- `customPuzzles.ts` → `GET /api/puzzles/custom`
- `endgamePuzzles.ts` → `GET /api/puzzles/next` (with endgame filter)
- `puzzleCategories.ts` → `GET /api/puzzles/categories`
- `puzzleConfigurations.ts` → Puzzle-related API endpoints
- `puzzleSelectionDefaults.ts` → Puzzle API configuration
- `puzzleSessionDefaults.ts` → Puzzle session API
- `puzzleProgressStats.ts` → `GET /api/puzzles/stats`
- `userPuzzlePreferences.ts` → `GET /api/profiles/:userId/settings`
- `userPuzzleStats.ts` → `GET /api/puzzles/stats`
- `userPuzzleSessions.ts` → Puzzle session tracking API
- `userPuzzleSelections.ts` → User puzzle selection API
- `puzzleSourceDatabase.ts` → Puzzle source API
- `puzzleSourceMappings.ts` → Puzzle source API

### Games & Analysis
- `historicGames.ts` → `GET /api/games/history`
- `reviewGames.ts` → `GET /api/games/history` (filtered for review)
- `analysisPositions.ts` → `GET /api/analysis/positions`
- `endgamePositions.ts` → `GET /api/analysis/endgame`
- `predefinedPositions.ts` → `GET /api/analysis/positions`
- `analysisPositionConfigurations.ts` → Analysis API endpoints
- `gameAnalysisConfig.ts` → `POST /api/analysis/analyze`
- `gameSetupConfig.ts` → `POST /api/games/create`
- `playComputerDefaults.ts` → `POST /api/games/create`

### Learning & Tutorials
- `learningPaths.ts` → `GET /api/learning/paths`
- `tutorials.ts` → `GET /api/tutorials`
- `tutorialsDefaults.ts` → `GET /api/tutorials`
- `relatedTutorials.ts` → `GET /api/tutorials`
- `userStudyPlans.ts` → `GET /api/profiles/:userId/study-plans`
- `studyPlansDefaults.ts` → Learning path API endpoints
- `adaptiveLearning.ts` → Learning progress API
- `chessTheoryPrinciples.ts` → Tutorial/learning content API

### Progress & Analytics
- `userProgress.ts` → `GET /api/profiles/:userId/progress`
- `userProgressTracking.ts` → `GET /api/profiles/:userId/progress`
- `analyticsData.ts` → `GET /api/profiles/:userId/analytics`
- `userAnalysisPreferences.ts` → `GET /api/profiles/:userId/settings`
- `progressOverviewDefaults.ts` → `GET /api/stats/dashboard`
- `progressConfigurations.ts` → Statistics API endpoints

### Achievements & Gamification
- `gamificationData.ts` → `GET /api/achievements`
- `achievementConfigurations.ts` → `GET /api/achievements`
- `skillTreeConfigurations.ts` → Achievement/learning progress API

### Opening Database
- `openingsDatabase.ts` → `GET /api/openings`
- `openingExplorerDefaults.ts` → `GET /api/openings`

### AI Opponents
- `aiOpponents.ts` → `GET /api/ai-opponents`

### Help System
- `helpContent.ts` → `GET /api/help`
- `contactSupport.ts` → Help system API

### Subscriptions
- `subscriptionData.ts` → `GET /api/subscriptions/user/me`

### UI Configuration Files (No Direct API Mapping)
These files configure the UI and may use API data but don't directly map to endpoints:
- Board themes and visual configuration files
- UI configuration files (`*UIConfig.ts`)
- Chart and visualization configurations
- Navigation and icon mappings
- Common configurations and utilities

## Implementation Plan

### Phase 1: API Infrastructure & Authentication
**Goal**: Set up foundation and ensure authentication works properly

**Tasks**:
1. Verify authentication API integration is working correctly
2. Create API client with proper error handling
3. Set up React Query configuration
4. Test authentication flow end-to-end

**Mock Files to Remove**: 
- `authenticationMocks.ts`
- `registration.ts` 
- `passwordReset.ts`

### Phase 2: User Profile & Settings
**Goal**: Replace user-related mock data with real API calls

**Tasks**:
1. Create `hooks/profile/useProfilePage.ts` - connects to `/api/users/profile` and `/api/profiles/:userId`
2. Create `hooks/profile/useAccountSettingsPage.ts` - connects to profile settings APIs
3. Update profile pages to use new hooks
4. Test user profile functionality

**Mock Files to Remove**:
- `userProfile.ts`
- `userAccount.ts`
- `userSettings.ts`
- `preferencesData.ts`
- `notificationSettings.ts`

### Phase 3: Core Puzzle System
**Goal**: Replace puzzle mock data with puzzle API integration

**Tasks**:
1. Create puzzle API service functions
2. Create page-specific puzzle hooks:
   - `hooks/puzzles/useOpeningPuzzlesPage.ts`
   - `hooks/puzzles/useTacticalPuzzlesPage.ts`
   - `hooks/puzzles/useCustomPuzzlesPage.ts`
   - `hooks/puzzles/usePuzzleSelectionPage.ts`
3. Update puzzle pages to be presentation-only
4. Implement puzzle solving with real API

**Mock Files to Remove**:
- `tacticalPuzzles.ts`
- `openingPuzzles.ts`
- `customPuzzles.ts`
- `endgamePuzzles.ts`
- `puzzleCategories.ts`
- `userPuzzleStats.ts`

### Phase 4: Games & Analysis
**Goal**: Replace game and analysis mock data

**Tasks**:
1. Create games API integration
2. Create analysis API integration
3. Create game-specific hooks:
   - `hooks/play/usePlayComputerPage.ts`
   - `hooks/analysis/useAnalysisBoardPage.ts`
   - `hooks/games/useGameHistoryPage.ts`
4. Update game and analysis pages

**Mock Files to Remove**:
- `historicGames.ts`
- `reviewGames.ts`
- `analysisPositions.ts`
- `endgamePositions.ts`
- `predefinedPositions.ts`

### Phase 5: Learning System
**Goal**: Replace learning and tutorial mock data

**Tasks**:
1. Create learning API integration
2. Create tutorial API integration  
3. Create learning-specific hooks:
   - `hooks/learn/useLearningPathsPage.ts`
   - `hooks/learn/useTutorialsPage.ts`
4. Update learning and tutorial pages

**Mock Files to Remove**:
- `learningPaths.ts`
- `tutorials.ts`
- `userStudyPlans.ts`
- `studyPlansDefaults.ts`
- `adaptiveLearning.ts`

### Phase 6: Progress & Statistics
**Goal**: Replace progress tracking and analytics

**Tasks**:
1. Create statistics API integration
2. Create progress tracking hooks:
   - `hooks/progress/useProgressOverviewPage.ts`
   - `hooks/progress/useStatisticsPage.ts`
3. Update progress and statistics pages

**Mock Files to Remove**:
- `userProgress.ts`
- `userProgressTracking.ts`
- `analyticsData.ts`
- `progressOverviewDefaults.ts`

### Phase 7: Achievements & Advanced Features
**Goal**: Complete remaining feature integration

**Tasks**:
1. Create achievements API integration
2. Create opening database API integration
3. Create help system API integration
4. Create subscription API integration
5. Update remaining pages with their specific hooks

**Mock Files to Remove**:
- `gamificationData.ts`
- `achievementConfigurations.ts`
- `openingsDatabase.ts`
- `aiOpponents.ts`
- `helpContent.ts`
- `subscriptionData.ts`

### Phase 8: UI Configuration & Cleanup
**Goal**: Clean up remaining configuration files and test

**Tasks**:
1. Evaluate remaining UI configuration files
2. Determine which can be removed vs. kept as client-side config
3. Clean up unused imports and dependencies
4. Comprehensive testing of all API integrations
5. Performance optimization

**Remaining Files to Evaluate**:
- All `*Config.ts` and `*UIConfig.ts` files
- Theme and visual configuration files
- Chart and navigation configurations

## Frontend Architecture Guidelines for New Files

### **MANDATORY ARCHITECTURE COMPLIANCE**

All new files created during API integration MUST follow the established architecture patterns from `/docs/frontend/02-frontend-architecture.md`:

#### **Domain-Based Organization Requirements**
Following the established domain-based folder structure:

```
src/
├── components/           # Domain-organized UI components
│   ├── auth/            # Authentication components
│   ├── chess/           # Chess board and game components  
│   ├── puzzles/         # Puzzle training components
│   ├── openings/        # Opening training components
│   ├── analysis/        # Game analysis components
│   ├── statistics/      # Statistics and progress components
│   ├── ui/              # Shared UI components (Shadcn UI based)
│   └── layout/          # Layout components
├── pages/              # Route-level components organized by domain
├── hooks/              # Custom React hooks (domain-specific)
├── services/           # API and business logic services
├── stores/             # React Context API stores (not Zustand)
├── utils/              # Pure utility functions
├── types/              # TypeScript type definitions
└── constants/          # Application constants
```

#### **SRP (Single Responsibility Principle) Requirements**
Each component, hook, service, and module has a single, well-defined responsibility:

- **Components**: Handle only their specific UI rendering and local state
- **Custom Hooks**: Manage specific business logic or state concerns
- **Services**: Handle external API interactions or complex calculations
- **Stores**: Manage specific domain state using React Context API
- **Utils**: Perform single-purpose utility functions

#### **API Service Layer Architecture**
```typescript
// ✅ REQUIRED: Following established ApiClient pattern
// File: services/api/PuzzlesApiClient.ts
export class PuzzlesApiClient {
  constructor(private apiClient: ApiClient) {}
  
  // Single responsibility: Handle puzzle API calls
  async getNextPuzzle(): Promise<Puzzle> {
    return this.apiClient.get<Puzzle>('/puzzles/next');
  }
  
  async solvePuzzle(puzzleId: string, solution: PuzzleSolution): Promise<SolveResponse> {
    return this.apiClient.post<SolveResponse>(`/puzzles/${puzzleId}/solve`, solution);
  }
  
  async getPuzzlesByTheme(theme: string): Promise<Puzzle[]> {
    return this.apiClient.get<Puzzle[]>(`/puzzles/theme/${theme}`);
  }
}
```

#### **Custom Hooks Architecture**
```typescript
// ✅ REQUIRED: Domain-specific hooks with single responsibility
// File: hooks/usePuzzleSession.ts
export const usePuzzleSession = () => {
  const { user } = useAuth();
  const puzzleClient = new PuzzlesApiClient(apiClient);
  
  // Single responsibility: Manage puzzle session logic
  const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const loadNextPuzzle = useCallback(async () => {
    setIsLoading(true);
    try {
      const puzzle = await puzzleClient.getNextPuzzle();
      setCurrentPuzzle(puzzle);
    } catch (error) {
      console.error('Failed to load puzzle:', error);
    } finally {
      setIsLoading(false);
    }
  }, [puzzleClient]);
  
  const solvePuzzle = useCallback(async (solution: PuzzleSolution) => {
    if (!currentPuzzle) return;
    
    try {
      const result = await puzzleClient.solvePuzzle(currentPuzzle.id, solution);
      return result;
    } catch (error) {
      console.error('Failed to solve puzzle:', error);
      throw error;
    }
  }, [currentPuzzle, puzzleClient]);
  
  return {
    currentPuzzle,
    isLoading,
    loadNextPuzzle,
    solvePuzzle
  };
};
```

#### **React Context API State Management**
```typescript
// ✅ REQUIRED: React Context API (NOT Zustand per architecture decision)
// File: stores/puzzleStore.ts
interface PuzzleState {
  currentPuzzle: Puzzle | null;
  progress: PuzzleProgress;
  isLoading: boolean;
  error: string | null;
}

interface PuzzleContextType extends PuzzleState {
  loadPuzzle: (puzzleId: string) => Promise<void>;
  submitSolution: (solution: PuzzleSolution) => Promise<void>;
  clearError: () => void;
}

const PuzzleContext = createContext<PuzzleContextType | undefined>(undefined);

export const usePuzzleStore = () => {
  const context = useContext(PuzzleContext);
  if (context === undefined) {
    throw new Error('usePuzzleStore must be used within a PuzzleProvider');
  }
  return context;
};

export const PuzzleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<PuzzleState>({
    currentPuzzle: null,
    progress: { solved: 0, total: 0, accuracy: 0 },
    isLoading: false,
    error: null,
  });

  // Single responsibility: Manage puzzle state
  const loadPuzzle = useCallback(async (puzzleId: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const puzzle = await PuzzlesApiClient.getPuzzle(puzzleId);
      setState(prev => ({ 
        ...prev, 
        currentPuzzle: puzzle, 
        isLoading: false 
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error.message, 
        isLoading: false 
      }));
    }
  }, []);

  const value = {
    ...state,
    loadPuzzle,
    submitSolution,
    clearError: () => setState(prev => ({ ...prev, error: null }))
  };

  return (
    <PuzzleContext.Provider value={value}>
      {children}
    </PuzzleContext.Provider>
  );
};
```

#### **Component Architecture with Shadcn UI + Tailwind**
```typescript
// ✅ REQUIRED: Shadcn UI components with gaming themes
// File: components/puzzles/PuzzleInterface.tsx
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { useChessAudio } from '@/hooks/useChessAudio';

const PuzzleInterface: React.FC = () => {
  const { currentPuzzle, solvePuzzle } = usePuzzleSession();
  const { playSuccessSound, playErrorSound } = useChessAudio();
  
  // Single responsibility: Manage complete puzzle solving interface
  const handleMove = useCallback(async (move: ChessMove) => {
    try {
      const result = await solvePuzzle({ move });
      if (result.correct) {
        playSuccessSound();
      } else {
        playErrorSound();
      }
    } catch (error) {
      playErrorSound();
    }
  }, [solvePuzzle, playSuccessSound, playErrorSound]);
  
  return (
    <Card className="bg-gray-800/90 backdrop-blur-sm border border-cyan-500/30">
      <CardHeader>
        <PuzzleHeader puzzle={currentPuzzle} />
      </CardHeader>
      <CardContent>
        <ChessBoard 
          position={currentPuzzle?.position}
          onMove={handleMove}
        />
        <PuzzleControls />
      </CardContent>
    </Card>
  );
};
```

#### **Form Handling with React Hook Form + Zod**
```typescript
// ✅ REQUIRED: React Hook Form with Zod validation (research-validated)
// File: components/auth/LoginForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm: React.FC = () => {
  const { login } = useAuth();
  
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur' // Performance optimization
  });
  
  const onSubmit = useCallback(async (data: LoginFormData) => {
    try {
      await login(data);
    } catch (error) {
      form.setError('root', { message: error.message });
    }
  }, [login, form]);
  
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/* Shadcn UI form components */}
    </form>
  );
};
```

### **FILE CREATION RULES FOR API INTEGRATION**

#### **Phase 1: API Infrastructure Files**
- `services/ApiClient.ts` - ✅ Axios-based HTTP client (following established pattern)
- `types/api.ts` - ✅ API-related TypeScript interfaces
- `services/ErrorService.ts` - ✅ Centralized error handling

#### **Complete API Client Classes to Create**
Based on the backend endpoint analysis, these API client classes must be created:

**Core API Clients:**
- `services/api/AuthApiClient.ts` - Authentication endpoints
  - `/api/auth/register`, `/api/auth/login`, `/api/auth/refresh`, `/api/auth/logout`
- `services/api/UserApiClient.ts` - User management endpoints
  - `/api/users/profile`, `/api/users/profile` (PUT)
- `services/api/ProfilesApiClient.ts` - Extended user profile endpoints
  - `/api/profiles/:userId`, `/api/profiles/:userId/settings`, `/api/profiles/:userId/progress`, `/api/profiles/:userId/study-plans`, `/api/profiles/:userId/analytics`

**Core Feature API Clients:**
- `services/api/PuzzlesApiClient.ts` - Puzzle system endpoints
  - `/api/puzzles/next`, `/api/puzzles/:puzzleId/solve`, `/api/puzzles/:puzzleId/hint`, `/api/puzzles/stats`
- `services/api/GamesApiClient.ts` - Game management endpoints
  - `/api/games/create`, `/api/games/:gameId/move`, `/api/games/:gameId`, `/api/games/history`
- `services/api/StatsApiClient.ts` - Statistics endpoints
  - `/api/stats/dashboard`
- `services/api/OpeningsApiClient.ts` - Opening database endpoints
  - `/api/openings`, `/api/openings/eco/:eco`, `/api/openings/:id`

**Advanced Feature API Clients:**
- `services/api/AchievementsApiClient.ts` - Achievement system endpoints
  - `/api/achievements`, `/api/achievements/categories`, `/api/achievements/user/me`, `/api/achievements/user/me/stats`, `/api/achievements/:id`, `/api/achievements/:achievementId/eligibility`, `/api/achievements/:achievementId/earn`, `/api/achievements/:achievementId/progress`
- `services/api/LearningApiClient.ts` - Learning paths endpoints
  - `/api/learning/paths`, `/api/learning/paths/categories`, `/api/learning/paths/:id`, `/api/learning/paths/:learningPathId/stats`, `/api/learning/modules`, `/api/learning/modules/:id`, `/api/learning/progress`, `/api/learning/paths/:learningPathId/start`, `/api/learning/modules/:moduleId/progress`
- `services/api/TutorialsApiClient.ts` - Tutorial system endpoints
  - `/api/tutorials`, `/api/tutorials/categories`, `/api/tutorials/category/:category`, `/api/tutorials/:id`, `/api/tutorials/:tutorialId/steps`, `/api/tutorials/progress/:tutorialId`, `/api/tutorials/:tutorialId/start`, `/api/tutorials/:tutorialId/steps/:stepId/complete`
- `services/api/AnalysisApiClient.ts` - Position analysis endpoints
  - `/api/analysis/positions`, `/api/analysis/positions/categories`, `/api/analysis/positions/:id`, `/api/analysis/endgame`, `/api/analysis/endgame/categories`, `/api/analysis/endgame/material/:material`, `/api/analysis/endgame/:id`, `/api/analysis/search`, `/api/analysis/stats`, `/api/analysis/stored/:fen`, `/api/analysis/analyze`
- `services/api/AiOpponentsApiClient.ts` - AI opponents endpoints
  - `/api/ai-opponents`, `/api/ai-opponents/stats`, `/api/ai-opponents/level/:level`, `/api/ai-opponents/:id`, `/api/ai-opponents/move`
- `services/api/HelpApiClient.ts` - Help system endpoints
  - `/api/help`, `/api/help/search`, `/api/help/categories`, `/api/help/topics`, `/api/help/featured`, `/api/help/popular`, `/api/help/recent`, `/api/help/stats`, `/api/help/category/:category`, `/api/help/topic/:topic`, `/api/help/:id`, `/api/help/:id/suggested`
- `services/api/SubscriptionsApiClient.ts` - Subscription management endpoints
  - `/api/subscriptions/user/me`, `/api/subscriptions/user/me/history`, `/api/subscriptions`, `/api/subscriptions/:id/cancel`, `/api/subscriptions/:id/renew`

**Total API Client Classes: 13**

## API Client to Mock Data File Mapping

### **AuthApiClient.ts** → Authentication Mock Files (5 files)
- `authenticationMocks.ts` → `POST /api/auth/login`, `POST /api/auth/logout`
- `registration.ts` → `POST /api/auth/register`
- `registerDefaults.ts` → `POST /api/auth/register` (default values)
- `passwordReset.ts` → `POST /api/auth/forgot-password`, `POST /api/auth/reset-password`
- `resetPasswordDefaults.ts` → Password reset endpoint defaults

### **UserApiClient.ts** → User Management Mock Files (2 files)
- `userProfile.ts` → `GET /api/users/profile`, `PUT /api/users/profile`
- `userAccount.ts` → `GET /api/users/profile`, `PUT /api/users/profile`

### **ProfilesApiClient.ts** → Extended Profile Mock Files (6 files)
- `userSettings.ts` → `GET /api/profiles/:userId/settings`
- `userProgress.ts` → `GET /api/profiles/:userId/progress`
- `userProgressTracking.ts` → `GET /api/profiles/:userId/progress`
- `userStudyPlans.ts` → `GET /api/profiles/:userId/study-plans`
- `userAnalysisPreferences.ts` → `GET /api/profiles/:userId/settings`
- `analyticsData.ts` → `GET /api/profiles/:userId/analytics`

### **PuzzlesApiClient.ts** → Puzzle System Mock Files (11 files)
- `tacticalPuzzles.ts` → `GET /api/puzzles/next` (tactical filter)
- `openingPuzzles.ts` → `GET /api/puzzles/next` (opening filter)  
- `endgamePuzzles.ts` → `GET /api/puzzles/next` (endgame filter)
- `customPuzzles.ts` → `GET /api/puzzles/custom`, `POST /api/puzzles/custom`
- `puzzleCategories.ts` → `GET /api/puzzles/categories`
- `userPuzzleStats.ts` → `GET /api/puzzles/stats`
- `puzzleProgressStats.ts` → `GET /api/puzzles/stats`
- `userPuzzleSessions.ts` → `GET /api/user/puzzle-sessions`, `POST /api/user/puzzle-sessions`
- `userPuzzleSelections.ts` → `GET /api/user-puzzle-preferences`, `PUT /api/user-puzzle-preferences`
- `puzzleSourceDatabase.ts` → `GET /api/puzzle-sources`, `GET /api/puzzle-sources/:id`
- `puzzleSourceMappings.ts` → `GET /api/puzzle-sources/stats`

### **GamesApiClient.ts** → Game System Mock Files (4 files)
- `historicGames.ts` → `GET /api/games/history`
- `reviewGames.ts` → `GET /api/game-reviews`, `GET /api/game-reviews/:id`
- `gameAnalysisConfig.ts` → `POST /api/games/create`, `POST /api/games/:gameId/move`
- `gameSetupConfig.ts` → `POST /api/games/create`

### **StatsApiClient.ts** → Statistics Mock Files (3 files)
- `progressOverviewDefaults.ts` → `GET /api/stats/dashboard`
- `progressConfigurations.ts` → `GET /api/stats/dashboard`
- `performanceMetrics.ts` → `GET /api/stats/dashboard`

### **OpeningsApiClient.ts** → Opening Database Mock Files (2 files)
- `openingsDatabase.ts` → `GET /api/openings`, `GET /api/openings/:id`
- `openingExplorerDefaults.ts` → `GET /api/openings/eco/:eco`

### **AchievementsApiClient.ts** → Achievement System Mock Files (3 files)
- `gamificationData.ts` → `GET /api/achievements`, `GET /api/achievements/user/me`
- `achievementConfigurations.ts` → `GET /api/achievements/categories`, `GET /api/achievements/:id`
- `skillTreeConfigurations.ts` → `POST /api/achievements/:achievementId/earn`, `PUT /api/achievements/:achievementId/progress`

### **LearningApiClient.ts** → Learning System Mock Files (4 files)
- `learningPaths.ts` → `GET /api/learning/paths`, `GET /api/learning/paths/:id`
- `studyPlansDefaults.ts` → `GET /api/learning/paths/categories`, `GET /api/learning/modules`
- `adaptiveLearning.ts` → `GET /api/learning/progress`, `PUT /api/learning/modules/:moduleId/progress`
- `chessTheoryPrinciples.ts` → `GET /api/learning/modules/:id`

### **TutorialsApiClient.ts** → Tutorial System Mock Files (3 files)
- `tutorials.ts` → `GET /api/tutorials`, `GET /api/tutorials/:id`
- `tutorialsDefaults.ts` → `GET /api/tutorials/categories`, `GET /api/tutorials/category/:category`
- `relatedTutorials.ts` → `GET /api/tutorials/:tutorialId/steps`

### **AnalysisApiClient.ts** → Analysis System Mock Files (4 files)
- `analysisPositions.ts` → `GET /api/analysis/positions`, `GET /api/analysis/positions/:id`
- `endgamePositions.ts` → `GET /api/analysis/endgame`, `GET /api/analysis/endgame/:id`
- `predefinedPositions.ts` → `GET /api/analysis/positions/categories`
- `analysisPositionConfigurations.ts` → `POST /api/analysis/analyze`, `GET /api/analysis/stored/:fen`

### **AiOpponentsApiClient.ts** → AI System Mock Files (1 file)
- `aiOpponents.ts` → `GET /api/ai-opponents`, `GET /api/ai-opponents/:id`, `GET /api/ai-opponents/level/:level`

### **HelpApiClient.ts** → Help System Mock Files (2 files)
- `helpContent.ts` → `GET /api/help`, `GET /api/help/:id`, `GET /api/help/categories`
- `contactSupport.ts` → `GET /api/help/featured`, `POST /api/help` (contact form)

### **SubscriptionsApiClient.ts** → Subscription Mock Files (1 file)
- `subscriptionData.ts` → `GET /api/subscriptions/user/me`, `GET /api/subscriptions/user/me/history`

## Mock Files with NO Direct API Client (Configuration/UI Files)

These files contain client-side configuration and may be kept or consolidated:

**Notification & Preferences (4 files):**
- `notificationSettings.ts` - May map to user settings API
- `notificationSettingsData.ts` - May map to user settings API  
- `preferencesData.ts` - May map to user settings API
- `preferencesDefaults.ts` - May map to user settings API

**UI Configuration Files (35 files):**
- All `*UIConfig.ts` files (10 files) - Client-side UI configuration
- All board/theme files (8 files) - Client-side visual configuration
- All `*Defaults.ts` files (12 files) - Client-side default values
- All navigation/icon files (5 files) - Client-side interface configuration

**Utility & Helper Files (7 files):**
- `profileUtilities.ts` - Client-side utility functions
- `iconMappings.ts` - Client-side icon mapping
- `helpCenterIcons.ts` - Client-side icon configuration
- `importExportSources.ts` - Client-side data source configuration
- `collectionBrowserTabs.ts` - Client-side UI configuration
- `commonConfigurations.ts` - Client-side common config
- `commonConfigurationsData.ts` - Client-side common config data

**Chart & Visualization (1 file):**
- `chartConfigurations.ts` - Client-side chart configuration

**Total Files by Category:**
- **API Client Replacements**: 54 files
- **No Direct API Mapping**: 47 files  
- **Total Mock Files**: 82 files (matches inventory)

#### **Phase 2: Context API State Management**
- `stores/puzzleStore.ts` - ✅ React Context for puzzle state
- `stores/gameStore.ts` - ✅ React Context for game state  
- `stores/statsStore.ts` - ✅ React Context for statistics state
- Following existing `stores/themeStore.ts` patterns

#### **Phase 3: Domain-Specific Hooks**
- `hooks/usePuzzleSession.ts` - ✅ Puzzle session management
- `hooks/useGameSession.ts` - ✅ Game session management
- `hooks/useStatsData.ts` - ✅ Statistics data management
- `hooks/useChessAudio.ts` - ✅ Howler.js audio integration (already established)
- `hooks/useStockfish.ts` - ✅ Chess engine integration (already established)

#### **Phase 4: UI Component Updates**
- Update existing components to use new API services
- Ensure all components use Shadcn UI + Tailwind patterns
- Follow gaming theme system with backdrop blur and neon accents
- Maintain single responsibility per component

### **VALIDATION CHECKLIST**

Before creating any new file:

- [ ] **Domain Organization**: File placed in correct domain folder
- [ ] **SRP Compliance**: Single, well-defined responsibility
- [ ] **API Services**: Use class-based pattern with ApiClient injection
- [ ] **State Management**: Use React Context API (NOT Zustand)
- [ ] **UI Components**: Use Shadcn UI + Tailwind CSS
- [ ] **Forms**: Use React Hook Form + Zod validation
- [ ] **Audio**: Use Howler.js through useChessAudio hook
- [ ] **Chess Engine**: Use Stockfish.js through useStockfish hook  
- [ ] **Theme System**: Support gaming themes with CSS variables
- [ ] **TypeScript**: Properly typed with domain-specific interfaces

## Backend API Gaps Identified

The following mock data files require backend API endpoints that don't currently exist:

1. **Custom Puzzles**: `GET/POST /api/puzzles/custom` - for user-created puzzles
2. **Puzzle Categories**: `GET /api/puzzles/categories` - for puzzle categorization
3. **Password Reset**: Password reset email functionality  
4. **Puzzle Session Tracking**: APIs for tracking puzzle sessions
5. **User Puzzle Selections**: APIs for saving user puzzle preferences
6. **Puzzle Source Management**: APIs for puzzle source management
7. **Adaptive Learning**: APIs for adaptive learning algorithm data

## Success Criteria

- [ ] All 82 mock data files evaluated and either replaced or justified as client-side config
- [ ] All pages follow SRP architecture with page-specific hooks
- [ ] No inline API calls in page components
- [ ] Comprehensive error handling for all API operations
- [ ] Loading states for all data fetching
- [ ] Performance maintained or improved
- [ ] User experience unchanged
- [ ] All backend API endpoints properly utilized

This plan provides the detailed mapping and implementation strategy to replace all mock data with real API integration while maintaining architectural integrity.