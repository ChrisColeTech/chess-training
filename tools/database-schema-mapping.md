# Database Schema Mapping for 34 Data Files

**Generated:** 2025-08-29  
**Analysis:** Complete mapping of frontend data files to database tables  
**Total Files:** 34 database data files  
**New Tables Required:** 31 additional tables

---

## Executive Summary

The analysis reveals that the current 5-table database schema needs to be expanded to 36 tables to accommodate all the rich data structures from the frontend. The data is well-structured and follows clear patterns that map naturally to relational database design.

### Current Database Tables:
- `users` - Basic user information
- `games` - Game records  
- `puzzles` - Chess puzzles (39 records currently)
- `puzzle_attempts` - User puzzle solving history
- `user_sessions` - User login sessions

### Required Expansion: +31 New Tables
- **User-related:** 9 tables for comprehensive user management
- **Chess content:** 8 tables for positions, openings, and analysis
- **Learning system:** 7 tables for structured education
- **Gamification:** 3 tables for achievements and motivation
- **Billing:** 3 tables for subscription management  
- **Configuration:** 1 table for system settings

---

## File-to-Table Mappings

### 🧑 User & Authentication (12 files → 9 new tables)

#### `authenticationMocks.ts`
**Target:** `users` (existing) + new `user_auth_methods` table  
**Data:** Login methods, OAuth configurations, 2FA settings  
**Schema:** Authentication provider mappings and security settings

#### `userAccount.ts`  
**Target:** `users` (existing) + new `user_accounts` table  
**Data:** Account status, verification, subscription info  
**Schema:** Extended user account management

#### `userAnalysisPreferences.ts`
**Target:** New `user_analysis_preferences` table  
**Data:** Analysis engine settings, evaluation preferences  
**Schema:** User-specific analysis configurations

#### `userProfile.ts`
**Target:** New `user_profiles` table  
**Data:** Display names, avatars, bio, social links  
**Schema:** Public user profile information

#### `userProgress.ts`
**Target:** New `user_progress` table  
**Data:** Overall progress metrics, skill levels, milestones  
**Schema:** Learning progress tracking

#### `userProgressTracking.ts`
**Target:** New `user_progress_tracking` table  
**Data:** Detailed progress analytics, time tracking  
**Schema:** Granular progress measurements

#### `userPuzzlePreferences.ts`
**Target:** New `user_puzzle_preferences` table  
**Data:** Puzzle difficulty settings, theme preferences  
**Schema:** User puzzle solving preferences

#### `userPuzzleSelections.ts`  
**Target:** `puzzle_attempts` (existing) + new `user_puzzle_selections` table  
**Data:** Selected puzzle sets, bookmarks, favorites  
**Schema:** User puzzle curation

#### `userPuzzleSessions.ts`
**Target:** `user_sessions` (existing) + new `user_puzzle_sessions` table  
**Data:** Puzzle solving session data, timing, results  
**Schema:** Detailed puzzle session tracking

#### `userPuzzleStats.ts`
**Target:** New `user_puzzle_stats` table  
**Data:** Puzzle performance statistics, accuracy rates  
**Schema:** User puzzle analytics

#### `userSettings.ts`
**Target:** New `user_settings` table  
**Data:** Application preferences, UI settings, notifications  
**Schema:** User configuration management

#### `userStudyPlans.ts`
**Target:** New `user_study_plans` table  
**Data:** Personalized study plans, goals, schedules  
**Schema:** User learning plan management

---

### ♟️ Chess Content & Puzzles (10 files → 8 new tables)

#### `adaptiveLearning.ts`
**Target:** New `adaptive_learning` table  
**Data:** Learning algorithms, difficulty adjustments, AI recommendations  
**Schema:** Adaptive learning system configuration

#### `analysisPositions.ts`
**Target:** New `analysis_positions` table  
**Data:** Chess positions for analysis, evaluations, best moves  
**Schema:** Position analysis database

#### `customPuzzles.ts` ✅ MIGRATED
**Target:** `puzzles` (existing)  
**Status:** Already migrated (6 puzzles added)

#### `endgamePositions.ts`
**Target:** New `endgame_positions` table  
**Data:** Endgame positions, theoretical evaluations  
**Schema:** Endgame position database

#### `endgamePuzzles.ts` ✅ MIGRATED  
**Target:** `puzzles` (existing)  
**Status:** Already migrated (4 puzzles added)

#### `openingPuzzles.ts` ✅ MIGRATED
**Target:** `puzzles` (existing)  
**Status:** Already migrated (6 puzzles added)

#### `openingsDatabase.ts`
**Target:** New `openings` table + new `opening_moves` table  
**Data:** Opening lines, move sequences, theory  
**Schema:** Complete opening database system

#### `predefinedPositions.ts`
**Target:** New `predefined_positions` table  
**Data:** Teaching positions, examples, demonstrations  
**Schema:** Educational position collection

#### `puzzleSourceDatabase.ts`
**Target:** New `puzzle_sources` table  
**Data:** Puzzle source metadata, attribution, licensing  
**Schema:** Puzzle source management

#### `tacticalPuzzles.ts` ✅ MIGRATED
**Target:** `puzzles` (existing)  
**Status:** Already migrated (3 puzzles added)

#### `tutorials.ts`
**Target:** New `tutorials` table + new `tutorial_steps` table  
**Data:** Tutorial content, step-by-step lessons  
**Schema:** Tutorial management system

---

### 🎮 Games & Analysis (4 files → 4 new tables)

#### `aiOpponents.ts`
**Target:** New `ai_opponents` table  
**Data:** AI personalities, strength levels, playing styles  
**Schema:** AI opponent configuration

#### `gamificationData.ts`
**Target:** New `achievements` table + new `user_achievements` table + new `analytics_events` table  
**Data:** Badges, achievements, points system  
**Schema:** Gamification system

#### `historicGames.ts`
**Target:** `games` (existing) + new `game_reviews` table  
**Data:** Famous games, annotations, analysis  
**Schema:** Historic game database with analysis

#### `reviewGames.ts`
**Target:** New `game_reviews` table + new `game_review_moves` table  
**Data:** Game review data, move comments, analysis  
**Schema:** Game review and analysis system

---

### 📊 System Data (4 files → 4 new tables)

#### `analyticsData.ts`
**Target:** New `user_analytics` table  
**Data:** Usage statistics, performance metrics  
**Schema:** User analytics tracking

#### `helpContent.ts`
**Target:** New `help_content` table  
**Data:** Help articles, documentation, FAQs  
**Schema:** Help system content management

#### `learningPaths.ts`
**Target:** New `learning_paths` table + new `learning_modules` table + new `learning_lessons` table  
**Data:** Structured learning curricula, progress tracking  
**Schema:** Complete learning management system

#### `subscriptionData.ts`
**Target:** New `subscriptions` table + new `billing_history` table + new `payment_methods` table  
**Data:** Subscription tiers, billing, payments  
**Schema:** Subscription management system

---

### ⚙️ Configuration Data (3 files → 1 new table)

#### `importExportSources.ts`
**Target:** New `import_export_configs` table  
**Data:** Supported file formats, import/export configurations  
**Schema:** Import/export system configuration

#### `puzzleCategories.ts`
**Target:** `puzzles` (existing - extend themes column)  
**Data:** Puzzle categorization system  
**Schema:** Enhanced puzzle categorization

#### `puzzleSourceMappings.ts`
**Target:** `puzzle_sources` (from puzzleSourceDatabase.ts)  
**Data:** Source mapping configurations  
**Schema:** Puzzle source relationship mappings

---

## Complete Database Schema (36 Tables Total)

### Core Tables (Existing - 5 tables)
1. `users` - Basic user information
2. `games` - Game records
3. `puzzles` - Chess puzzles  
4. `puzzle_attempts` - User puzzle attempts
5. `user_sessions` - User sessions

### User Management (9 new tables)
6. `user_auth_methods` - Authentication methods
7. `user_accounts` - Extended account info
8. `user_profiles` - Public profiles  
9. `user_settings` - User preferences
10. `user_analysis_preferences` - Analysis settings
11. `user_puzzle_preferences` - Puzzle preferences
12. `user_puzzle_selections` - Puzzle selections
13. `user_puzzle_sessions` - Puzzle sessions
14. `user_puzzle_stats` - Puzzle statistics

### Chess Content (8 new tables)  
15. `openings` - Opening database
16. `opening_moves` - Opening move sequences
17. `analysis_positions` - Analysis positions
18. `endgame_positions` - Endgame positions
19. `predefined_positions` - Teaching positions
20. `puzzle_sources` - Puzzle source metadata
21. `tutorials` - Tutorial content
22. `tutorial_steps` - Tutorial steps

### Learning System (7 new tables)
23. `learning_paths` - Learning curricula
24. `learning_modules` - Learning modules  
25. `learning_lessons` - Individual lessons
26. `user_progress` - Overall progress
27. `user_progress_tracking` - Detailed progress
28. `user_study_plans` - Study plans
29. `adaptive_learning` - AI learning data

### Games & Analysis (4 new tables)
30. `ai_opponents` - AI configurations
31. `game_reviews` - Game reviews
32. `game_review_moves` - Review move comments
33. `user_analytics` - User analytics

### Gamification (3 new tables)  
34. `achievements` - Achievement definitions
35. `user_achievements` - User achievements
36. `analytics_events` - Analytics events

### Billing (3 new tables - extend from subscriptionData.ts)
37. `subscriptions` - Subscription tiers
38. `billing_history` - Billing records  
39. `payment_methods` - Payment methods

### System (2 new tables)
40. `help_content` - Help system content
41. `import_export_configs` - Import/export configs

---

## Migration Priority Matrix

### High Priority (Immediate Migration)
- **User Progress System:** `userProgress.ts`, `userProgressTracking.ts`, `userStudyPlans.ts`
- **Learning Content:** `tutorials.ts`, `learningPaths.ts`  
- **Game Analysis:** `historicGames.ts`, `reviewGames.ts`
- **Core User Data:** `userAccount.ts`, `userProfile.ts`, `userSettings.ts`

### Medium Priority (Phase 2)
- **Chess Content:** `openingsDatabase.ts`, `analysisPositions.ts`, `endgamePositions.ts`
- **User Preferences:** All user preference files
- **AI & Analytics:** `aiOpponents.ts`, `analyticsData.ts`
- **Gamification:** `gamificationData.ts`

### Low Priority (Phase 3)  
- **System Content:** `helpContent.ts`
- **Billing:** `subscriptionData.ts`
- **Configuration:** All configuration files

---

## Implementation Strategy

### Phase 1: Core Schema Extension (High Priority - 15 files)
1. Create essential user management tables
2. Build learning system foundation  
3. Implement game analysis system
4. Migrate core user data

### Phase 2: Content & Features (Medium Priority - 12 files)
1. Add chess content databases
2. Implement user preference systems
3. Build AI and analytics infrastructure
4. Add gamification features

### Phase 3: System Completion (Low Priority - 7 files)
1. Add help system content
2. Implement billing system
3. Complete configuration management
4. Final optimizations and indexing

This comprehensive schema will transform the chess training application from a frontend-centric system to a robust, scalable backend-driven platform capable of supporting advanced features like adaptive learning, comprehensive progress tracking, and personalized chess education.