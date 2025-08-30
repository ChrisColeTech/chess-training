# Chess Training Interface Mapping Report

**Generated:** 2025-08-29T00:53:51.777Z  
**Tool:** Manual Target Schema Mapper v1.0.0

---

## 🎯 Mapping Summary

### Interface Classification
- **Total Interfaces Analyzed:** 56
- **Database Entities:** 14
- **UI Configuration:** 28  
- **Mock Data:** 1
- **Utility Types:** 6
- **Unmapped:** 7

### Target Schema Coverage
**9 Core Database Tables Defined**


#### users (10% coverage)
**Mapped Interfaces (5):**
- UserAnalysisPreferences
- UserPuzzleStats
- UserStudyPlan
- StudyModule
- StudyTopic

#### games (15% coverage)
**Mapped Interfaces (5):**
- SoundEffect
- RelatedTutorial
- GameFilter
- BillingHistory
- PaymentMethod

#### puzzles (40% coverage)
**Mapped Interfaces (3):**
- EndgamePuzzle
- EndgameCategory
- PuzzleSourceMetadata

#### puzzle_attempts (0% coverage)
**Mapped Interfaces (0):**
- *No interfaces mapped to this table*

#### achievements (0% coverage)
**Mapped Interfaces (0):**
- *No interfaces mapped to this table*

#### user_achievements (0% coverage)
**Mapped Interfaces (0):**
- *No interfaces mapped to this table*

#### user_sessions (0% coverage)
**Mapped Interfaces (0):**
- *No interfaces mapped to this table*

#### opening_positions (0% coverage)
**Mapped Interfaces (0):**
- *No interfaces mapped to this table*

#### user_stats (0% coverage)
**Mapped Interfaces (1):**
- ProgressStatistic


---

## 📊 Database Entity Mappings (14)


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




---

## 🚫 Filtered Out (35)

### UI Configuration (28)
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

- *...and 18 more UI config interfaces*

### Mock Data (1)
- **MockUser**

### Utility Types (6)
- **ChessPrinciple** (2 props)
- **NotificationSoundOption** (5 props)
- **FrequencyOption** (5 props)
- **LanguageOption** (7 props)
- **ChessNotationOption** (4 props)
- **StartupBehaviorOption** (4 props)


---

## ✅ Final Results

### Database Schema Optimization
- **Original Interfaces:** 56
- **Target Database Tables:** 9
- **Reduction:** 84%

### Next Steps
1. **Review unmapped interfaces (7)** - Determine if important entities were missed
2. **Validate table coverage** - Ensure all required fields are covered by mapped interfaces  
3. **Generate final SQL schema** - Create production-ready schema for 9 tables
4. **Plan data migration** - Map frontend data to target schema

*This manual mapping approach provides a focused, domain-driven database schema for the chess training application.*