# Chess Training Database Schema Analysis Report

**Generated:** 2025-08-29T00:15:51.044Z  
**Tool:** Chess Schema Analyzer v1.0.0

---

## 📊 Executive Summary

- **Total Interfaces Analyzed:** 419
- **Files Processed:** 60
- **Duplicate Groups Found:** 20
- **Chess Domains Identified:** 7
- **Estimated Database Tables:** 352
- **Suggested API Endpoints:** 28
- **Consolidation Opportunities:** 27

---

## 🔍 Duplicate Entity Analysis




### AnalysisSettings (Primary)
**File:** `analysisSettings.ts`  
**Similarity Group:** 3 entities  
**Estimated Savings:** 2 redundant interfaces

**Similar Entities:**
- **AnalysisSettings** (100.0% similar) - `analysisUIConfig.ts`\n- **UserAnalysisPreferences** (80.0% similar) - `userAnalysisPreferences.ts`

**Consolidation Strategy:**
Merge into unified 'AnalysisSettings' entity with optional fields for variations



**Property Differences:**
- Extra in UserAnalysisPreferences: userId\n- Extra in UserAnalysisPreferences: createdAt\n- Extra in UserAnalysisPreferences: updatedAt
\n---\n
### EngineStatus (Primary)
**File:** `analysisSettings.ts`  
**Similarity Group:** 2 entities  
**Estimated Savings:** 1 redundant interfaces

**Similar Entities:**
- **EngineStatus** (100.0% similar) - `analysisUIConfig.ts`

**Consolidation Strategy:**
Merge into unified 'EngineStatus' entity with optional fields for variations




\n---\n
### SoundEffect (Primary)
**File:** `boardControlsData.ts`  
**Similarity Group:** 2 entities  
**Estimated Savings:** 1 redundant interfaces

**Similar Entities:**
- **ThemeCategory** (70.0% similar) - `boardThemesData.ts`

**Consolidation Strategy:**
Merge into unified 'SoundEffect' entity with optional fields for variations



**Property Differences:**
- Missing from ThemeCategory: filename\n- Extra in ThemeCategory: icon\n- Extra in ThemeCategory: count
\n---\n
### BoardTheme (Primary)
**File:** `boardThemesData.ts`  
**Similarity Group:** 2 entities  
**Estimated Savings:** 1 redundant interfaces

**Similar Entities:**
- **BoardTheme** (75.1% similar) - `boardSettings.ts`

**Consolidation Strategy:**
Merge into unified 'BoardTheme' entity with optional fields for variations

**Property Conflicts:**
- createdAt: Date vs number\n- border: {
    show: boolean
    color: string
    width: 'thin' | 'medium' | 'thick'
  } vs BorderSettings\n- background: 'plain' | 'wood-grain' | 'marble-veins' | 'space-stars' | 'gradient' vs BoardBackground\n- pieceSet: string vs PieceSet\n- material: string vs BoardMaterial

**Property Differences:**
- Missing from BoardTheme: popularity\n- Missing from BoardTheme: downloadCount\n- Extra in BoardTheme: previewImage
\n---\n
### CollectionBrowserTab (Primary)
**File:** `collectionBrowserTabs.ts`  
**Similarity Group:** 3 entities  
**Estimated Savings:** 2 redundant interfaces

**Similar Entities:**
- **PriorityLevelOption** (70.0% similar) - `notificationSettingsData.ts`\n- **StartupBehaviorOption** (76.0% similar) - `preferencesData.ts`

**Consolidation Strategy:**
Merge into unified 'CollectionBrowserTab' entity with optional fields for variations



**Property Differences:**
- Missing from PriorityLevelOption: key\n- Extra in PriorityLevelOption: value\n- Extra in PriorityLevelOption: color\n- Missing from StartupBehaviorOption: key\n- Extra in StartupBehaviorOption: value
\n---\n
### EndgamePuzzle (Primary)
**File:** `endgamePuzzles.ts`  
**Similarity Group:** 3 entities  
**Estimated Savings:** 2 redundant interfaces

**Similar Entities:**
- **TacticalPuzzle** (86.2% similar) - `tacticalPuzzles.ts`\n- **OpeningPuzzle** (75.2% similar) - `openingPuzzles.ts`

**Consolidation Strategy:**
Merge into unified 'EndgamePuzzle' entity with optional fields for variations

**Property Conflicts:**
- difficulty: 'Beginner' | 'Intermediate' | 'Advanced' vs PuzzleDifficulty

**Property Differences:**
- Missing from TacticalPuzzle: endgameType\n- Missing from TacticalPuzzle: theory\n- Extra in TacticalPuzzle: theme\n- Missing from OpeningPuzzle: endgameType\n- Extra in OpeningPuzzle: opening\n- Extra in OpeningPuzzle: eco
\n---\n
### NotificationSoundOption (Primary)
**File:** `notificationSettingsData.ts`  
**Similarity Group:** 2 entities  
**Estimated Savings:** 1 redundant interfaces

**Similar Entities:**
- **ChessNotationOption** (70.0% similar) - `preferencesData.ts`

**Consolidation Strategy:**
Merge into unified 'Option' entity with optional fields for variations



**Property Differences:**
- Missing from ChessNotationOption: filename\n- Missing from ChessNotationOption: duration\n- Extra in ChessNotationOption: example
\n---\n
### BillingHistory (Primary)
**File:** `subscriptionData.ts`  
**Similarity Group:** 2 entities  
**Estimated Savings:** 1 redundant interfaces

**Similar Entities:**
- **PaymentRecord** (92.5% similar) - `account.ts`

**Consolidation Strategy:**
Merge into unified 'BillingHistory' entity with optional fields for variations



**Property Differences:**
- Extra in PaymentRecord: receiptUrl
\n---\n
### CustomPuzzle (Primary)
**File:** `customPuzzles.ts`  
**Similarity Group:** 2 entities  
**Estimated Savings:** 1 redundant interfaces

**Similar Entities:**
- **CustomPuzzleFormData** (70.0% similar) - `customPuzzles.ts`

**Consolidation Strategy:**
Merge into unified 'CustomPuzzle' entity with optional fields for variations



**Property Differences:**
- Missing from CustomPuzzleFormData: id\n- Missing from CustomPuzzleFormData: rating\n- Missing from CustomPuzzleFormData: moves
\n---\n
### CustomPuzzleSession (Primary)
**File:** `customPuzzles.ts`  
**Similarity Group:** 2 entities  
**Estimated Savings:** 1 redundant interfaces

**Similar Entities:**
- **PuzzleSession** (72.0% similar) - `openingPuzzles.ts`

**Consolidation Strategy:**
Merge into unified 'Session' entity with optional fields for variations

**Property Conflicts:**
- status: CustomPuzzleStatus vs PuzzleStatus\n- activeTab: CustomPuzzleTabValue vs TabValue

**Property Differences:**
- Missing from PuzzleSession: currentCollection\n- Missing from PuzzleSession: filters\n- Missing from PuzzleSession: searchQuery
\n---\n
### CustomPuzzleBoardProps (Primary)
**File:** `customPuzzles.ts`  
**Similarity Group:** 2 entities  
**Estimated Savings:** 1 redundant interfaces

**Similar Entities:**
- **PuzzleBoardProps** (76.0% similar) - `openingPuzzles.ts`

**Consolidation Strategy:**
Merge into unified 'BoardProps' entity with optional fields for variations



**Property Differences:**
- Missing from PuzzleBoardProps: showCoordinates\n- Missing from PuzzleBoardProps: boardTheme
\n---\n
### CustomPuzzleControlsProps (Primary)
**File:** `customPuzzles.ts`  
**Similarity Group:** 2 entities  
**Estimated Savings:** 1 redundant interfaces

**Similar Entities:**
- **PuzzleControlsProps** (83.6% similar) - `openingPuzzles.ts`

**Consolidation Strategy:**
Merge into unified 'ControlsProps' entity with optional fields for variations



**Property Differences:**
- Missing from PuzzleControlsProps: onBookmark\n- Missing from PuzzleControlsProps: onShare\n- Missing from PuzzleControlsProps: isBookmarked
\n---\n
### CustomMoveValidationResult (Primary)
**File:** `customPuzzles.ts`  
**Similarity Group:** 2 entities  
**Estimated Savings:** 1 redundant interfaces

**Similar Entities:**
- **MoveValidationResult** (90.0% similar) - `openingPuzzles.ts`

**Consolidation Strategy:**
Merge into unified 'MoveValidationResult' entity with optional fields for variations



**Property Differences:**
- Missing from MoveValidationResult: feedback
\n---\n
### PasswordResetResponse (Primary)
**File:** `forgotPassword.ts`  
**Similarity Group:** 2 entities  
**Estimated Savings:** 1 redundant interfaces

**Similar Entities:**
- **ResetPasswordResponse** (85.0% similar) - `resetPassword.ts`

**Consolidation Strategy:**
Merge into unified 'Response' entity with optional fields for variations



**Property Differences:**
- Missing from ResetPasswordResponse: requestId
\n---\n
### OpeningAnalysisProps (Primary)
**File:** `openingExplorer.ts`  
**Similarity Group:** 2 entities  
**Estimated Savings:** 1 redundant interfaces

**Similar Entities:**
- **GameAnalysisProps** (70.0% similar) - `playComputer.ts`

**Consolidation Strategy:**
Merge into unified 'AnalysisProps' entity with optional fields for variations

**Property Conflicts:**
- analysis: PositionAnalysis | null vs GameAnalysis | null

**Property Differences:**
- Missing from GameAnalysisProps: position\n- Extra in GameAnalysisProps: gameState
\n---\n
### GeneralSettingsProps (Primary)
**File:** `preferences.ts`  
**Similarity Group:** 9 entities  
**Estimated Savings:** 8 redundant interfaces

**Similar Entities:**
- **ThemeSelectorProps** (80.0% similar) - `preferences.ts`\n- **LanguageSettingsProps** (80.0% similar) - `preferences.ts`\n- **AccessibilitySettingsProps** (80.0% similar) - `preferences.ts`\n- **PerformanceSettingsProps** (80.0% similar) - `preferences.ts`\n- **PrivacySettingsProps** (80.0% similar) - `preferences.ts`\n- **BackupSyncSettingsProps** (80.0% similar) - `preferences.ts`\n- **GamingSettingsProps** (80.0% similar) - `preferences.ts`\n- **SoundAnimationSettingsProps** (80.0% similar) - `preferences.ts`

**Consolidation Strategy:**
Merge into unified 'Props' entity with optional fields for variations

**Property Conflicts:**
- preferences: GeneralPreferences vs AppearancePreferences\n- onUpdate: (preferences: Partial<GeneralPreferences>) => void vs (preferences: Partial<AppearancePreferences>) => void\n- preferences: GeneralPreferences vs LanguagePreferences\n- onUpdate: (preferences: Partial<GeneralPreferences>) => void vs (preferences: Partial<LanguagePreferences>) => void\n- preferences: GeneralPreferences vs AccessibilityPreferences\n- onUpdate: (preferences: Partial<GeneralPreferences>) => void vs (preferences: Partial<AccessibilityPreferences>) => void\n- preferences: GeneralPreferences vs PerformancePreferences\n- onUpdate: (preferences: Partial<GeneralPreferences>) => void vs (preferences: Partial<PerformancePreferences>) => void\n- preferences: GeneralPreferences vs PrivacyPreferences\n- onUpdate: (preferences: Partial<GeneralPreferences>) => void vs (preferences: Partial<PrivacyPreferences>) => void\n- preferences: GeneralPreferences vs BackupSyncPreferences\n- onUpdate: (preferences: Partial<GeneralPreferences>) => void vs (preferences: Partial<BackupSyncPreferences>) => void\n- preferences: GeneralPreferences vs GamingPreferences\n- onUpdate: (preferences: Partial<GeneralPreferences>) => void vs (preferences: Partial<GamingPreferences>) => void\n- preferences: GeneralPreferences vs SoundAnimationPreferences\n- onUpdate: (preferences: Partial<GeneralPreferences>) => void vs (preferences: Partial<SoundAnimationPreferences>) => void


\n---\n
### Achievement (Primary)
**File:** `profile.ts`  
**Similarity Group:** 2 entities  
**Estimated Savings:** 1 redundant interfaces

**Similar Entities:**
- **Achievement** (72.7% similar) - `puzzleSelection.ts`

**Consolidation Strategy:**
Merge into unified 'Achievement' entity with optional fields for variations



**Property Differences:**
- Missing from Achievement: name\n- Missing from Achievement: total\n- Extra in Achievement: title
\n---\n
### ProfileHeaderProps (Primary)
**File:** `profile.ts`  
**Similarity Group:** 2 entities  
**Estimated Savings:** 1 redundant interfaces

**Similar Entities:**
- **StatsGridProps** (80.0% similar) - `profile.ts`

**Consolidation Strategy:**
Merge into unified 'Props' entity with optional fields for variations



**Property Differences:**
- Missing from StatsGridProps: onEditProfile
\n---\n
### ProfileAchievementsProps (Primary)
**File:** `profile.ts`  
**Similarity Group:** 2 entities  
**Estimated Savings:** 1 redundant interfaces

**Similar Entities:**
- **AchievementShowcaseProps** (70.0% similar) - `puzzleSelection.ts`

**Consolidation Strategy:**
Merge into unified 'Props' entity with optional fields for variations



**Property Differences:**
- Missing from AchievementShowcaseProps: getRarityColor\n- Missing from AchievementShowcaseProps: calculateProgress
\n---\n
### StatsCardsProps (Primary)
**File:** `progressOverview.ts`  
**Similarity Group:** 2 entities  
**Estimated Savings:** 1 redundant interfaces

**Similar Entities:**
- **ProgressChartsProps** (70.0% similar) - `progressOverview.ts`

**Consolidation Strategy:**
Merge into unified 'sProps' entity with optional fields for variations



**Property Differences:**
- Missing from ProgressChartsProps: stats\n- Extra in ProgressChartsProps: ratingHistory\n- Extra in ProgressChartsProps: activityData


---

## 🏗️ Domain Architecture Analysis


### USER Domain
**Priority:** HIGH  
**Entities:** 36  
**Estimated Tables:** 30  
**API Endpoints:** 4

**Core Entities:**
- MockUser\n- PieceSetInfo\n- SubscriptionTier\n- BillingHistory\n- PaymentMethod\n- UserAnalysisPreferences\n- UserPuzzlePreferences\n- UserPuzzleSelection\n- UserProfile\n- SecuritySettings
- *...and 26 more*

**Suggested API Endpoints:**
- /api/auth\n- /api/users\n- /api/profile\n- /api/subscription

**Key Relationships:**
- UserAnalysisPreferences → MockUser (one-to-many)\n- UserPuzzlePreferences → MockUser (one-to-many)\n- UserPuzzleSelection → MockUser (one-to-many)\n- AccountDeletionRequest → DataExportRequest (one-to-many)\n- UserAccount → AccountBadges (one-to-many)
\n
### PUZZLE Domain
**Priority:** HIGH  
**Entities:** 41  
**Estimated Tables:** 34  
**API Endpoints:** 4

**Core Entities:**
- CollectionBrowserTab\n- EndgamePuzzle\n- EndgameCategory\n- PieceCustomization\n- PuzzleSourceMetadata\n- PuzzleSourceMapping\n- TacticalPuzzle\n- PuzzleSelectionEntry\n- UserPuzzleSession\n- PuzzleResult
- *...and 31 more*

**Suggested API Endpoints:**
- /api/puzzles\n- /api/puzzle-attempts\n- /api/custom-puzzles\n- /api/collections

**Key Relationships:**
- PuzzleSelectionEntry → EndgamePuzzle (one-to-many)\n- UserPuzzleSession → PuzzleResult (one-to-many)\n- PuzzleResult → EndgamePuzzle (one-to-many)\n- CustomPuzzle → CollectionBrowserTab (one-to-many)\n- CustomPuzzleCollectionBrowserProps → CustomPuzzleCollection (one-to-many)
\n
### GAME Domain
**Priority:** HIGH  
**Entities:** 83  
**Estimated Tables:** 70  
**API Endpoints:** 4

**Core Entities:**
- AnalysisSettings\n- EngineStatus\n- EngineStatus\n- PredefinedPosition\n- GameFilter\n- EngineAnalysis\n- AnalysisPosition\n- MoveTreeNode\n- AnalysisSettings\n- EngineStatus
- *...and 73 more*

**Suggested API Endpoints:**
- /api/games\n- /api/analysis\n- /api/master-games\n- /api/review

**Key Relationships:**
- MoveTreeNode → MoveTreeNode (one-to-many)\n- MoveTreeNode → MoveTreeNode (one-to-many)\n- AnalysisBoardState → EngineAnalysis (one-to-many)\n- AnalysisBoardState → AnalysisPosition (one-to-many)\n- PositionDatabaseProps → AnalysisPosition (one-to-many)
\n
### LEARNING Domain
**Priority:** HIGH  
**Entities:** 57  
**Estimated Tables:** 48  
**API Endpoints:** 4

**Core Entities:**
- RelatedTutorial\n- UserStudyPlan\n- StudyModule\n- StudyTopic\n- TutorialStep\n- Tutorial\n- TutorialBrowserProps\n- LearningBranch\n- LearningRecommendation\n- LearningObjective
- *...and 47 more*

**Suggested API Endpoints:**
- /api/learning-paths\n- /api/lessons\n- /api/study\n- /api/recommendations

**Key Relationships:**
- UserStudyPlan → StudyModule (one-to-many)\n- StudyModule → StudyLesson (one-to-many)\n- Tutorial → TutorialStep (one-to-many)\n- TutorialBrowserProps → Tutorial (one-to-many)\n- PersonalizedLearningPath → UserStudyPlan (one-to-many)
\n
### OPENING Domain
**Priority:** HIGH  
**Entities:** 21  
**Estimated Tables:** 18  
**API Endpoints:** 4

**Core Entities:**
- ChessPrinciple\n- PaymentRecord\n- OpeningInfo\n- OpeningRepertoire\n- ChessOpening\n- OpeningFilters\n- ChessOpening\n- MoveVariation\n- OpeningTreeNode\n- SearchResults
- *...and 11 more*

**Suggested API Endpoints:**
- /api/openings\n- /api/repertoire\n- /api/variations\n- /api/explorer

**Key Relationships:**
- OpeningTreeNode → MoveVariation (one-to-many)\n- SearchResults → ChessOpening (one-to-many)\n- OpeningStatistics → ChessOpening (one-to-many)\n- OpeningStatistics → ChessOpening (one-to-many)\n- OpeningStatistics → ChessOpening (one-to-many)
\n
### PROGRESS Domain
**Priority:** HIGH  
**Entities:** 60  
**Estimated Tables:** 50  
**API Endpoints:** 4

**Core Entities:**
- ImportProgress\n- ProgressStatistic\n- UserProgressData\n- ProgressSnapshot\n- UserPuzzleStats\n- AchievementUnlockCondition\n- AchievementReward\n- Achievement\n- AchievementSeries\n- AchievementStats
- *...and 50 more*

**Suggested API Endpoints:**
- /api/progress\n- /api/achievements\n- /api/stats\n- /api/analytics

**Key Relationships:**
- UserProgressData → ProgressSnapshot (one-to-many)\n- UserPuzzleStats → UserProgressData (one-to-many)\n- AchievementStats → Achievement (one-to-many)\n- AchievementStats → Achievement (one-to-many)\n- AchievementLeaderboardEntry → UserProgressData (one-to-many)
\n
### SYSTEM Domain
**Priority:** HIGH  
**Entities:** 121  
**Estimated Tables:** 102  
**API Endpoints:** 4

**Core Entities:**
- AnalysisSettings\n- BoardSizeConfig\n- SoundEffect\n- CoordinateStyle\n- HighlightStyle\n- ArrowStyle\n- BoardThemeColors\n- BoardTheme\n- ThemeCategory\n- SupportedSource
- *...and 111 more*

**Suggested API Endpoints:**
- /api/notifications\n- /api/settings\n- /api/preferences\n- /api/help

**Key Relationships:**
- NavItem → NavItem (one-to-many)\n- BoardSettingsExport → BoardTheme (one-to-many)\n- BoardSettingsHookReturn → BoardTheme (one-to-many)\n- BoardSettingsHookReturn → BoardTheme (one-to-many)\n- ContactState → SupportChannel (one-to-many)


---

## 🚀 Implementation Recommendations

### Phase 1: Core Infrastructure (Week 1-2)
- **USER Domain:** 30 tables, 36 entities\n- **PUZZLE Domain:** 34 tables, 41 entities\n- **GAME Domain:** 70 tables, 83 entities\n- **LEARNING Domain:** 48 tables, 57 entities\n- **OPENING Domain:** 18 tables, 21 entities\n- **PROGRESS Domain:** 50 tables, 60 entities\n- **SYSTEM Domain:** 102 tables, 121 entities

### Phase 2: Feature Domains (Week 3-4)


### Phase 3: Supporting Systems (Week 5-6)


---

## ⚠️ Critical Consolidation Opportunities



1. Consolidate 3 similar entities: AnalysisSettings and AnalysisSettings, UserAnalysisPreferences\n2. Consolidate 2 similar entities: EngineStatus and EngineStatus\n3. Consolidate 2 similar entities: SoundEffect and ThemeCategory\n4. Consolidate 2 similar entities: BoardTheme and BoardTheme\n5. Consolidate 3 similar entities: CollectionBrowserTab and PriorityLevelOption, StartupBehaviorOption\n6. Consolidate 3 similar entities: EndgamePuzzle and TacticalPuzzle, OpeningPuzzle\n7. Consolidate 2 similar entities: NotificationSoundOption and ChessNotationOption\n8. Consolidate 2 similar entities: BillingHistory and PaymentRecord\n9. Consolidate 2 similar entities: CustomPuzzle and CustomPuzzleFormData\n10. Consolidate 2 similar entities: CustomPuzzleSession and PuzzleSession\n11. Consolidate 2 similar entities: CustomPuzzleBoardProps and PuzzleBoardProps\n12. Consolidate 2 similar entities: CustomPuzzleControlsProps and PuzzleControlsProps\n13. Consolidate 2 similar entities: CustomMoveValidationResult and MoveValidationResult\n14. Consolidate 2 similar entities: PasswordResetResponse and ResetPasswordResponse\n15. Consolidate 2 similar entities: OpeningAnalysisProps and GameAnalysisProps\n16. Consolidate 9 similar entities: GeneralSettingsProps and ThemeSelectorProps, LanguageSettingsProps, AccessibilitySettingsProps, PerformanceSettingsProps, PrivacySettingsProps, BackupSyncSettingsProps, GamingSettingsProps, SoundAnimationSettingsProps\n17. Consolidate 2 similar entities: Achievement and Achievement\n18. Consolidate 2 similar entities: ProfileHeaderProps and StatsGridProps\n19. Consolidate 2 similar entities: ProfileAchievementsProps and AchievementShowcaseProps\n20. Consolidate 2 similar entities: StatsCardsProps and ProgressChartsProps\n21. user domain has 36 entities - consider sub-domain organization\n22. puzzle domain has 41 entities - consider sub-domain organization\n23. game domain has 83 entities - consider sub-domain organization\n24. learning domain has 57 entities - consider sub-domain organization\n25. opening domain has 21 entities - consider sub-domain organization\n26. progress domain has 60 entities - consider sub-domain organization\n27. system domain has 121 entities - consider sub-domain organization

---

## 📈 Database Schema Estimates

**Total Estimated Tables:** 352

**By Domain:**
- **user:** 30 tables\n- **puzzle:** 34 tables\n- **game:** 70 tables\n- **learning:** 48 tables\n- **opening:** 18 tables\n- **progress:** 50 tables\n- **system:** 102 tables

**API Endpoint Summary:**
- **user:** 4 endpoints\n- **puzzle:** 4 endpoints\n- **game:** 4 endpoints\n- **learning:** 4 endpoints\n- **opening:** 4 endpoints\n- **progress:** 4 endpoints\n- **system:** 4 endpoints

---

## 🔧 Next Steps

1. **Review Duplicate Consolidations** - Examine the 20 duplicate groups identified
2. **Domain Validation** - Verify the 7 domain classifications match business requirements
3. **Schema Generation** - Run SQL schema generator with these findings
4. **API Design** - Design 28 RESTful endpoints based on domain analysis
5. **Migration Planning** - Create phased migration strategy starting with high-priority domains

---

*This report was generated automatically by the Chess Training Schema Analyzer.*
*Review all recommendations with your development team before implementation.*