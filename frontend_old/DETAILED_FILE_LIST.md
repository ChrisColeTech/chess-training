# 📝 Detailed File List - 72 Files Needing Migration

## 🔴 HIGH PRIORITY (Core User Experience) - 20 files

### Authentication & User Management (6 files)
- `src/pages/LoginPage.tsx` - **authenticationMocks.ts** → useAuth
- `src/pages/auth/RegisterPage.tsx` - **registration.ts** → useAuth  
- `src/components/auth/resetPassword/InvalidTokenState.tsx` - **passwordReset.ts** → useAuth
- `src/components/auth/resetPassword/LoadingState.tsx` - **passwordReset.ts** → useAuth
- `src/components/auth/resetPassword/ResetPasswordForm.tsx` - **passwordReset.ts** → useAuth
- `src/components/auth/resetPassword/SuccessState.tsx` - **passwordReset.ts** → useAuth

### Profile & Account (6 files) 
- `src/components/core/profile/ProfileAchievements.tsx` - **iconMappings.ts** → useProfile
- `src/components/core/profile/ProfileActivity.tsx` - **iconMappings.ts** → useProfile
- `src/components/core/profile/ProfileOverview.tsx` - **iconMappings.ts** → useProfile
- `src/hooks/useAccount.ts` - **userAccount.ts** → useProfile  
- `src/hooks/useProfile.ts` - **userProfile.ts** → useProfilePage
- `src/pages/settings/AccountPage.tsx` - **userAccount.ts** → useProfile

### Puzzle System (4 files)
- `src/components/puzzles/PuzzleProgress.tsx` - **puzzleProgressStats.ts** → usePuzzles
- `src/pages/puzzles/TacticalPuzzlesPage.tsx` - **tacticalPuzzles.ts** → usePuzzles
- `src/pages/puzzles/EndgamePuzzlesPage.tsx` - **endgamePuzzles.ts** → usePuzzles
- `src/pages/puzzles/OpeningPuzzlesPage.tsx` - **openingPuzzles.ts** → usePuzzles

### Progress & Analytics (4 files)
- `src/hooks/useProgressOverview.ts` - **userProgress.ts** → useProgress
- `src/hooks/useDetailedStats.ts` - **analyticsData.ts** → useProgress
- `src/components/progress/stats/TrendAnalysis.tsx` - **chartConfigurations.ts** → useProgress
- `src/hooks/useStudyPlans.ts` - **learningPaths.ts** → useLearningPaths

---

## 🟡 MEDIUM PRIORITY (Enhanced Features) - 22 files

### Settings & Preferences (8 files)
- `src/pages/settings/BoardSettingsPage.tsx` - **boardThemes.ts** → useSettings
- `src/pages/settings/PreferencesPage.tsx` - **userSettings.ts** → useProfile  
- `src/pages/settings/NotificationsPage.tsx` - **notificationSettings.ts** → useNotifications
- `src/components/settings/board/BoardPreview.tsx` - **boardThemes.ts** → useSettings
- `src/components/settings/preferences/LanguageSettings.tsx` - **preferencesData.ts** → useProfile
- `src/components/settings/preferences/ThemeSelector.tsx` - **preferencesData.ts** → useProfile
- `src/components/settings/notifications/EventSettings.tsx` - **notificationSettings.ts** → useNotifications
- `src/components/settings/notifications/AlertSettings.tsx` - **notificationSettingsData.ts** → useNotifications

### Achievement System (6 files)
- `src/hooks/useAchievements.ts` - **achievementConfigurations.ts** → useAchievements
- `src/components/progress/achievements/AchievementCard.tsx` - **iconMappings.ts** → useAchievements
- `src/components/progress/achievements/AchievementStats.tsx` - **achievementConfigurations.ts** → useAchievements  
- `src/components/progress/achievements/BadgeDetails.tsx` - **achievementConfigurations.ts** → useAchievements
- `src/components/progress/achievements/ProgressTracker.tsx` - **progressConfigurations.ts** → useAchievements
- `src/components/progress/achievements/AchievementFilters.tsx` - **Unknown** → useAchievements

### Tutorial & Learning System (8 files)
- `src/hooks/useTutorials.ts` - **relatedTutorials.ts** → useTutorials
- `src/components/help/tutorials/TutorialPlayer.tsx` - **relatedTutorials.ts** → useTutorials
- `src/hooks/useLearningPath.ts` - **adaptiveLearning.ts** → useLearningPaths
- `src/components/study/plans/StudyScheduler.tsx` - **commonConfigurations.ts** → useLearningPaths
- `src/hooks/useRegister.ts` - **registerDefaults.ts** → useAuth
- `src/hooks/useForgotPassword.ts` - **passwordReset.ts** → useAuth
- `src/hooks/useResetPassword.ts` - **resetPasswordDefaults.ts** → useAuth
- *1 more tutorial-related file*

---

## 🔵 LOW PRIORITY (UI Configs & Advanced) - 30 files

### Game Analysis & Advanced Features (10 files)
- `src/components/play/analysis/AnalysisControls.tsx` - **analysisSettings** → useAnalysis
- `src/components/play/analysis/EngineLines.tsx` - **engineLineConfig** → useAnalysis
- `src/components/play/analysis/EvaluationBar.tsx` - **evaluationConfig** → useAnalysis
- `src/components/play/analysis/PositionDatabase.tsx` - **analysisPositionConfigurations** → useAnalysis
- `src/components/play/analysis/PositionSetup.tsx` - **predefinedPositions** → useAnalysis
- `src/components/play/computer/GameSetup.tsx` - **aiOpponents** → useGames
- `src/hooks/useAnalysisBoard.ts` - Various analysis configs → useAnalysis
- `src/hooks/useGameReview.ts` - **reviewGames** → useGames
- `src/hooks/useMasterGames.ts` - **historicGames** → useGames
- `src/hooks/useEndgameLibrary.ts` - **endgamePositions** → useAnalysis

### Custom Puzzles & Advanced UI (8 files)
- `src/pages/puzzles/CustomPuzzlesPage.tsx` - **customPuzzles** → usePuzzles
- `src/pages/puzzles/PuzzleSelectionPage.tsx` - Various puzzle configs → usePuzzles
- `src/components/puzzles/custom/CustomPuzzleBoard.tsx` - **boardThemeDefaults** → usePuzzles
- `src/components/puzzles/custom/CustomPuzzleCollectionBrowser.tsx` - **collectionBrowserTabs** → usePuzzles
- `src/components/puzzles/custom/CustomPuzzleFilters.tsx` - **puzzleConfigurations** → usePuzzles
- `src/components/puzzles/custom/CustomPuzzleInfo.tsx` - **puzzleSourceMappings** → usePuzzles
- `src/components/puzzles/PuzzleTabs.tsx` - **chessTheoryPrinciples** → usePuzzles
- `src/hooks/usePlayComputer.ts` - **aiOpponents** → useGames

### Help & Support System (6 files)
- `src/pages/help/ContactPage.tsx` - **contactSupport** → useSearch
- `src/components/help/contact/ContactForm.tsx` - **contactSupport** → useSearch
- `src/components/help/contact/SuccessState.tsx` - **contactSupport** → useSearch
- `src/components/help/center/CategoryBrowser.tsx` - **helpCenterIcons** → useSearch
- `src/hooks/useContact.ts` - **contactSupport** → useSearch
- `src/hooks/useHelpCenter.ts` - Various help configs → useSearch

### UI Configuration & Utilities (6 files)
- `src/components/layout/Sidebar.tsx` - **navigationConfig** → UI_CONFIG
- `src/components/settings/board/BoardControls.tsx` - **boardControlsData** → useSettings
- `src/components/settings/notifications/QuietHours.tsx` - **commonConfigurationsData** → useSettings
- `src/hooks/useBoardSettings.ts` - Various board configs → useSettings
- `src/hooks/useNotifications.ts` - **notificationSettings** → useNotifications
- `src/hooks/useOpeningExplorer.ts` - **openingExplorerDefaults** → useAnalysis

---

## 📊 Summary by File Type

### Pages (12 files)
- **Authentication**: LoginPage, RegisterPage
- **Puzzles**: 4 puzzle type pages + CustomPuzzles + PuzzleSelection
- **Settings**: 3 settings pages (Account, Board, Notifications, Preferences)
- **Help**: ContactPage

### Components (38 files)
- **Authentication**: 4 password reset components
- **Profile**: 3 profile overview components  
- **Puzzles**: 7 puzzle-related components
- **Settings**: 7 settings components
- **Progress/Achievements**: 5 achievement components
- **Analysis**: 5 analysis components
- **Help**: 4 help components
- **Layout/UI**: 3 layout/UI components

### Hooks (22 files)
- **Domain Hooks**: useAccount, useProfile, useAchievements, etc.
- **Page Hooks**: useProgressOverview, useDetailedStats, etc.
- **Feature Hooks**: useAuth-related, analysis hooks, etc.

---

## 🎯 Recommended Migration Order

### Phase 1 (Week 1): Core Authentication & Profile
**Target**: Complete user auth flow
- All 6 authentication files (Login, Register, Password Reset)
- All 6 profile/account files
- **Expected Impact**: Users can log in, register, reset passwords, view profiles

### Phase 2 (Week 2): Puzzle System 
**Target**: Core learning experience
- All 4 main puzzle pages and components
- Progress tracking components
- **Expected Impact**: Users can train with puzzles and see progress

### Phase 3 (Week 3): Settings & Achievements
**Target**: User customization and motivation
- All 8 settings components
- All 6 achievement system components  
- **Expected Impact**: Users can customize experience and track achievements

### Phase 4 (Week 4): Advanced Features & Cleanup
**Target**: Polish and advanced features
- Analysis tools, custom puzzles, help system
- Remove unused mock files
- **Expected Impact**: Full feature set available

---

**Current Status**: 72 files identified and categorized by priority and complexity.