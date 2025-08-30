# Chess Training App - Frontend API Integration Roadmap

**Date:** August 29, 2025  
**Status:** Ready for Implementation  
**Backend API:** ✅ Critical endpoints now implemented

## Executive Summary

Following the successful implementation of critical missing backend services, the frontend is now ready for API integration. This document provides a comprehensive roadmap for connecting each page to real API endpoints and replacing mock data with live functionality.

### 🎯 Integration Priority

**Phase 1 (Critical)** - Core user functionality  
**Phase 2 (Important)** - Enhanced features  
**Phase 3 (Nice-to-have)** - Advanced features

## Authentication Pages - Phase 1

### LoginPage.tsx
- **File:** `/frontend/src/pages/LoginPage.tsx`
- **Current Status:** Static form, no backend connection
- **API Integration Required:**
  - Connect login form to `POST /api/auth/login`
  - Handle JWT token storage and user session
  - Redirect to dashboard on successful login
  - Display backend validation errors

**Implementation Steps:**
```tsx
// Use existing AuthApiClient
import { apiService } from '../services/api';

const handleLogin = async (email: string, password: string) => {
  try {
    const result = await apiService.auth.login(email, password);
    // Handle successful login
  } catch (error) {
    // Handle login errors
  }
};
```

### ForgotPasswordPage.tsx  
- **File:** `/frontend/src/pages/auth/ForgotPasswordPage.tsx`
- **Current Status:** ✅ Components exist, needs API wiring
- **API Integration Required:**
  - Connect to new `POST /api/auth/forgot-password` endpoint
  - Handle email submission and success/error states
  - Display reset token (POC mode) or success message

**Implementation Steps:**
```tsx
const handleForgotPassword = async (email: string) => {
  try {
    const result = await apiService.auth.forgotPassword(email);
    setResetToken(result.resetToken); // POC only
  } catch (error) {
    setError(error.message);
  }
};
```

### ResetPasswordPage.tsx
- **File:** `/frontend/src/pages/auth/ResetPasswordPage.tsx`  
- **Current Status:** ✅ Components exist, needs API wiring
- **API Integration Required:**
  - Connect to new `POST /api/auth/reset-password` endpoint
  - Handle token validation and password reset
  - Redirect to login on success

### RegisterPage.tsx
- **File:** `/frontend/src/pages/RegisterPage.tsx`
- **Current Status:** Static form
- **API Integration Required:**
  - Connect to `POST /api/auth/register`
  - Handle registration validation
  - Auto-login after successful registration

---

## Dashboard and Profile Pages - Phase 1

### DashboardPage.tsx
- **File:** `/frontend/src/pages/DashboardPage.tsx`
- **Current Status:** Mock data display
- **API Integration Required:**
  - Connect to `GET /api/user/dashboard-stats` for overview stats
  - Connect to `GET /api/progress/overview` for progress tracking
  - Display real chess rating, puzzle rating, recent games
  - Show actual daily activity and streaks

**Implementation Steps:**
```tsx
const { data: stats } = useQuery('dashboard-stats', 
  () => apiService.profile.getDashboardStats()
);
const { data: progress } = useQuery('progress-overview', 
  () => apiService.progress.getOverview()
);
```

### ProfilePage.tsx
- **File:** `/frontend/src/pages/ProfilePage.tsx`
- **Current Status:** Static profile display
- **API Integration Required:**
  - Connect to `GET /api/user/profile` for user data
  - Connect to `GET /api/user/statistics` for game/puzzle stats
  - Connect to `GET /api/user/activity` for recent activity
  - Enable profile editing with `PUT /api/user/profile`

**Implementation Steps:**
```tsx
const { data: profile } = useQuery('user-profile', 
  () => apiService.profile.getProfile()
);
const { data: stats } = useQuery('user-statistics', 
  () => apiService.profile.getStatistics()  
);
```

---

## Settings Pages - Phase 1

### PreferencesPage.tsx
- **File:** `/frontend/src/pages/settings/PreferencesPage.tsx`
- **Current Status:** Static settings form
- **API Integration Required:**
  - Connect to `GET /api/settings` for unified settings
  - Connect to `PUT /api/settings` for settings updates
  - Handle settings validation with `POST /api/settings/validate`
  - Enable settings export/import functionality

**Implementation Steps:**
```tsx
const { data: settings, mutate } = useQuery('app-settings', 
  () => apiService.settings.getSettings()
);

const updateSettings = useMutation(
  (newSettings) => apiService.settings.updateSettings(newSettings),
  { onSuccess: () => mutate() }
);
```

### BoardSettingsPage.tsx
- **File:** `/frontend/src/pages/settings/BoardSettingsPage.tsx`
- **Current Status:** Theme selection UI without backend
- **API Integration Required:**
  - Connect to `GET /api/settings/board-themes` for available themes
  - Connect to `GET /api/settings/piece-themes` for piece sets
  - Connect to `GET /api/settings/sound-packs` for sound options
  - Save preferences to unified settings endpoint

### AccountPage.tsx
- **File:** `/frontend/src/pages/settings/AccountPage.tsx`
- **Current Status:** Static account management
- **API Integration Required:**
  - Connect to `PUT /api/auth/change-password` for password changes
  - Connect to `GET /api/user/preferences` for account preferences
  - Connect to `PUT /api/user/preferences` for preference updates

---

## Progress Tracking Pages - Phase 1

### ProgressOverviewPage.tsx
- **File:** `/frontend/src/pages/progress/ProgressOverviewPage.tsx`
- **Current Status:** Mock progress data
- **API Integration Required:**
  - Connect to `GET /api/progress/overview` for progress summary
  - Display real rating history and activity streaks
  - Show actual game statistics and puzzle performance

### DetailedStatsPage.tsx
- **File:** `/frontend/src/pages/progress/DetailedStatsPage.tsx`
- **Current Status:** Chart placeholders with mock data
- **API Integration Required:**
  - Connect to `GET /api/progress/detailed` for comprehensive stats
  - Display real rating history charts
  - Show theme performance and time-based analytics
  - Connect charts to live data sources

### AchievementsPage.tsx
- **File:** `/frontend/src/pages/progress/AchievementsPage.tsx`
- **Current Status:** Static achievement display
- **API Integration Required:**
  - Connect to `GET /api/progress/achievements` for real achievements
  - Display actual progress toward achievement goals
  - Show unlocked vs locked achievements based on user stats

### LearningPathPage.tsx
- **File:** `/frontend/src/pages/progress/LearningPathPage.tsx`
- **Current Status:** Mock learning path data
- **API Integration Required:**
  - Connect to `GET /api/progress/learning-paths` for available paths
  - Display actual completion progress
  - Enable path selection and tracking

---

## Game Pages - Phase 2

### PlayComputerPage.tsx
- **File:** `/frontend/src/pages/play/PlayComputerPage.tsx`
- **Current Status:** Basic chess board without AI
- **API Integration Required:**
  - Connect to `POST /api/games/create` for new games
  - Connect to `POST /api/games/:id/move` for move submission
  - Connect to `GET /api/games/:id` for game state
  - Handle AI responses and game completion

### GameReviewPage.tsx
- **File:** `/frontend/src/pages/play/GameReviewPage.tsx`
- **Current Status:** Static game review interface
- **API Integration Required:**
  - Connect to `GET /api/games/history` for completed games
  - Connect to game analysis endpoints (when implemented)
  - Display actual game moves and evaluation

### AnalysisBoardPage.tsx
- **File:** `/frontend/src/pages/play/AnalysisBoardPage.tsx`
- **Current Status:** Position setup without engine
- **API Integration Required:**
  - Connect to position analysis endpoints (when implemented)
  - Enable position evaluation and best move suggestions
  - Connect to opening database queries

---

## Puzzle Pages - Phase 2

### PuzzleSelectionPage.tsx
- **File:** `/frontend/src/pages/puzzles/PuzzleSelectionPage.tsx`
- **Current Status:** Puzzle category selection
- **API Integration Required:**
  - Connect to `GET /api/puzzles/next` for puzzle retrieval
  - Handle puzzle filtering and difficulty selection
  - Track puzzle attempt history

### TacticalPuzzlesPage.tsx
- **File:** `/frontend/src/pages/puzzles/TacticalPuzzlesPage.tsx`
- **Current Status:** Chess puzzle interface
- **API Integration Required:**
  - Connect to `POST /api/puzzles/:id/solve` for solution submission
  - Connect to `POST /api/puzzles/:id/hint` for hints
  - Handle rating changes and feedback display

### CustomPuzzlesPage.tsx
- **File:** `/frontend/src/pages/puzzles/CustomPuzzlesPage.tsx`
- **Current Status:** Custom puzzle creation interface
- **API Integration Required:**
  - Connect to custom puzzle management endpoints (when implemented)
  - Enable puzzle creation, editing, and sharing
  - Handle puzzle collection management

---

## Study Pages - Phase 3

### StudyPlansPage.tsx
- **File:** `/frontend/src/pages/study/StudyPlansPage.tsx`
- **Current Status:** Study plan overview
- **API Integration Required:**
  - Connect to study plan management endpoints (when implemented)
  - Enable lesson progression tracking
  - Handle study schedule management

### OpeningExplorerPage.tsx
- **File:** `/frontend/src/pages/study/OpeningExplorerPage.tsx`
- **Current Status:** Opening database interface
- **API Integration Required:**
  - Connect to opening database endpoints (when implemented)
  - Enable position lookup and variation browsing
  - Display master game examples

### EndgameLibraryPage.tsx
- **File:** `/frontend/src/pages/study/EndgameLibraryPage.tsx`
- **Current Status:** Endgame study interface
- **API Integration Required:**
  - Connect to endgame database endpoints (when implemented)
  - Enable tablebase queries and position analysis
  - Display theoretical endgame knowledge

---

## Help Pages - Phase 3

### HelpCenterPage.tsx
- **File:** `/frontend/src/pages/help/HelpCenterPage.tsx`
- **Current Status:** Static help content
- **API Integration Required:**
  - Connect to help content management endpoints (when implemented)
  - Enable dynamic FAQ and article loading
  - Handle search functionality

### TutorialsPage.tsx
- **File:** `/frontend/src/pages/help/TutorialsPage.tsx`
- **Current Status:** Tutorial player interface
- **API Integration Required:**
  - Connect to tutorial content endpoints (when implemented)
  - Enable tutorial progression tracking
  - Handle interactive tutorial elements

### ContactPage.tsx
- **File:** `/frontend/src/pages/help/ContactPage.tsx`
- **Current Status:** Contact form
- **API Integration Required:**
  - Connect to support ticket endpoints (when implemented)
  - Handle form submission and response tracking
  - Enable file attachments and system info collection

---

## Implementation Strategy

### Phase 1 Implementation (1-2 weeks)
**Critical user workflows - Implement first**

1. **Authentication Flow**
   - Login/logout functionality
   - Password reset workflow
   - Registration process

2. **Dashboard Integration**  
   - Real user stats display
   - Progress overview
   - Activity tracking

3. **Profile Management**
   - Profile viewing and editing
   - Statistics display
   - Activity feed

4. **Settings Management**
   - Unified settings API integration
   - Theme and preference management
   - Account settings

### Phase 2 Implementation (2-3 weeks)  
**Core chess functionality**

1. **Game Playing**
   - AI opponent integration
   - Move handling and validation
   - Game completion and results

2. **Puzzle System**
   - Puzzle retrieval and solving
   - Rating system integration
   - Progress tracking

3. **Progress Analytics**
   - Detailed statistics charts
   - Achievement tracking
   - Performance analysis

### Phase 3 Implementation (3-4 weeks)
**Advanced features**

1. **Study Tools**
   - Opening database integration
   - Endgame library
   - Study plan management

2. **Help System**
   - Dynamic content loading
   - Tutorial system
   - Support functionality

## Technical Implementation Notes

### State Management
- Use React Query for API state management
- Implement optimistic updates where appropriate
- Handle loading and error states consistently

### Error Handling
```tsx
const { data, error, isLoading } = useQuery(
  'api-key',
  apiFunction,
  {
    retry: 3,
    onError: (error) => {
      console.error('API Error:', error);
      // Handle error display
    }
  }
);
```

### Loading States
```tsx
if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorDisplay error={error} />;
return <DataComponent data={data} />;
```

### Caching Strategy
- Cache user profile and settings data aggressively
- Use shorter cache times for dynamic data (stats, games)
- Implement cache invalidation on mutations

## Testing Strategy

### API Integration Tests
- Test each API client method
- Verify error handling and edge cases
- Mock API responses for component testing

### End-to-End Tests
- Test complete user workflows
- Verify authentication flows
- Test data persistence and retrieval

## Success Metrics

### Phase 1 Success Criteria
- [ ] Users can login/logout successfully  
- [ ] Dashboard displays real user data
- [ ] Profile management fully functional
- [ ] Settings changes persist correctly

### Phase 2 Success Criteria
- [ ] Users can play games against AI
- [ ] Puzzle system tracks progress
- [ ] Statistics display real performance data
- [ ] Achievement system unlocks based on activity

### Phase 3 Success Criteria
- [ ] Study tools provide educational value
- [ ] Help system provides effective support
- [ ] All advanced features integrate smoothly

---

**Next Steps:**

1. **Start with Phase 1 authentication pages** - These are critical for user onboarding
2. **Implement dashboard API integration** - Provides immediate value to users  
3. **Connect profile and settings pages** - Enables user customization
4. **Progress to Phase 2 game functionality** - Core chess application features
5. **Complete with Phase 3 advanced features** - Enhanced user experience

**Estimated Timeline:** 6-9 weeks for complete integration
**Priority:** Begin Phase 1 implementation immediately

---

Last Updated: August 29, 2025