# Chess Training Interface Mapping Report

**Generated:** 2025-08-29T00:38:29.751Z  
**Tool:** Manual Target Schema Mapper v1.0.0

---

## 🎯 Mapping Summary

### Interface Classification
- **Total Interfaces Analyzed:** 419
- **Database Entities:** 67
- **UI Configuration:** 268  
- **Mock Data:** 1
- **Utility Types:** 14
- **Unmapped:** 69

### Target Schema Coverage
**9 Core Database Tables Defined**


#### users (10% coverage)
**Mapped Interfaces (10):**
- UserAnalysisPreferences
- UserPuzzleStats
- UserStudyPlan
- StudyModule
- StudyTopic
- LoginSession
- UserAccount
- AccountHookReturn
- TrainingSession
- StudySchedule

#### games (31% coverage)
**Mapped Interfaces (34):**
- SoundEffect
- RelatedTutorial
- GameFilter
- BillingHistory
- PaymentMethod
- MoveTreeNode
- AnalysisBoardState
- AnalysisBoardActions
- SupportChannel
- ContactCategory
- GamePhaseAnalysis
- PracticeSession
- EndgameLibraryFilters
- EndgameLibraryStats
- GameImport
- GameCollection
- GameReviewService
- FAQItem
- LearningObjective
- WeakArea
- MasterGame
- StudySession
- MasterGamesHookReturn
- GameSearchResult
- NotificationRule
- ChessOpening
- MoveVariation
- GameState
- AIMoveResult
- PreferencesSection
- LessonSection
- AssessmentQuestion
- CustomStudyPlan
- TutorialSeries

#### puzzles (50% coverage)
**Mapped Interfaces (5):**
- EndgamePuzzle
- EndgameCategory
- PuzzleSourceMetadata
- CustomPuzzleCollection
- RecentPuzzle

#### puzzle_attempts (11% coverage)
**Mapped Interfaces (1):**
- SearchResult

#### achievements (50% coverage)
**Mapped Interfaces (11):**
- AchievementReward
- Achievement
- AchievementSeries
- AchievementStats
- AchievementLeaderboardEntry
- AchievementNotification
- AchievementsHookReturn
- LearningMilestone
- Achievement
- Achievement
- AchievementBadge

#### user_achievements (20% coverage)
**Mapped Interfaces (1):**
- LearningPath

#### user_sessions (0% coverage)
**Mapped Interfaces (0):**
- *No interfaces mapped to this table*

#### opening_positions (25% coverage)
**Mapped Interfaces (4):**
- PaymentRecord
- LearningRecommendation
- OpeningTreeNode
- StudyRecommendation

#### user_stats (0% coverage)
**Mapped Interfaces (1):**
- ProgressStatistic


---

## 📊 Database Entity Mappings (67)


### SoundEffect → games
**Confidence:** 50%  
**Reasoning:** File path contains 'chess', File path contains 'board', Has ID field  
**Properties:** 4

### EndgamePuzzle → puzzles
**Confidence:** 95%  
**Reasoning:** Name contains 'puzzle', Name contains 'endgame', File path contains 'puzzle'  
**Properties:** 12

### EndgameCategory → puzzles
**Confidence:** 46%  
**Reasoning:** Name contains 'endgame', File path contains 'puzzle', File path contains 'endgame'  
**Properties:** 5

### ProgressStatistic → user_stats
**Confidence:** 40%  
**Reasoning:** Name contains 'progress', File path contains 'stats', File path contains 'progress'  
**Properties:** 3

### PuzzleSourceMetadata → puzzles
**Confidence:** 56%  
**Reasoning:** Name contains 'puzzle', File path contains 'puzzle', Property 'totalPuzzles' contains 'puzzle'  
**Properties:** 13

### RelatedTutorial → games
**Confidence:** 40%  
**Reasoning:** File path contains 'chess', Has ID field  
**Properties:** 5

### GameFilter → games
**Confidence:** 40%  
**Reasoning:** Name contains 'game', File path contains 'game', File path contains 'chess'  
**Properties:** 7

### BillingHistory → games
**Confidence:** 40%  
**Reasoning:** File path contains 'chess', Has ID field  
**Properties:** 7

### PaymentMethod → games
**Confidence:** 40%  
**Reasoning:** File path contains 'chess', Has ID field  
**Properties:** 7

### UserAnalysisPreferences → users
**Confidence:** 56%  
**Reasoning:** Name contains 'user', File path contains 'user', Property 'userId' contains 'user'  
**Properties:** 9

### UserPuzzleStats → users
**Confidence:** 62%  
**Reasoning:** Name contains 'user', File path contains 'user', Property 'userId' contains 'user'  
**Properties:** 12

### UserStudyPlan → users
**Confidence:** 86%  
**Reasoning:** Name contains 'user', File path contains 'user', Property 'userId' contains 'user'  
**Properties:** 12

### StudyModule → users
**Confidence:** 40%  
**Reasoning:** File path contains 'user', Has ID field  
**Properties:** 7

### StudyTopic → users
**Confidence:** 40%  
**Reasoning:** File path contains 'user', Has ID field  
**Properties:** 6

### PaymentRecord → opening_positions
**Confidence:** 50%  
**Reasoning:** Name contains 'eco', Has ID field  
**Properties:** 8

### LoginSession → users
**Confidence:** 56%  
**Reasoning:** Name contains 'login', Name contains 'session', File path contains 'account'  
**Properties:** 8

### UserAccount → users
**Confidence:** 94%  
**Reasoning:** Name contains 'user', Name contains 'account', File path contains 'account'  
**Properties:** 14

### AccountHookReturn → users
**Confidence:** 66%  
**Reasoning:** Name contains 'account', File path contains 'account', Property 'account' contains 'account'  
**Properties:** 23

### AchievementReward → achievements
**Confidence:** 42%  
**Reasoning:** Name contains 'achievement', File path contains 'achievement', Property 'badge' contains 'badge'  
**Properties:** 6

### Achievement → achievements
**Confidence:** 60%  
**Reasoning:** Name contains 'achievement', File path contains 'achievement', Has ID field  
**Properties:** 18



*...and 47 more database entity mappings*

---

## 🚫 Filtered Out (283)

### UI Configuration (268)
- **BoardSizeConfig** (4 props)
- **CoordinateStyle** (5 props)
- **HighlightStyle** (5 props)
- **ArrowStyle** (5 props)
- **BoardThemeColors** (3 props)
- **BoardTheme** (16 props)
- **ThemeCategory** (5 props)
- **CollectionBrowserTab** (4 props)
- **SupportedSource** (4 props)
- **NavItem** (5 props)

- *...and 258 more UI config interfaces*

### Mock Data (1)
- **MockUser**

### Utility Types (14)
- **ChessPrinciple** (2 props)
- **NotificationSoundOption** (5 props)
- **FrequencyOption** (5 props)
- **LanguageOption** (7 props)
- **ChessNotationOption** (4 props)
- **StartupBehaviorOption** (4 props)
- **AchievementProgressData** (0 props)
- **UseContactOptions** (3 props)
- **PasswordResetRequest** (1 props)
- **PasswordResetService** (0 props)

- *...and 4 more utility types*

---

## ✅ Final Results

### Database Schema Optimization
- **Original Interfaces:** 419
- **Target Database Tables:** 9
- **Reduction:** 98%

### Next Steps
1. **Review unmapped interfaces (69)** - Determine if important entities were missed
2. **Validate table coverage** - Ensure all required fields are covered by mapped interfaces  
3. **Generate final SQL schema** - Create production-ready schema for 9 tables
4. **Plan data migration** - Map frontend data to target schema

*This manual mapping approach provides a focused, domain-driven database schema for the chess training application.*