# Document 04 Architecture Conflicts Audit

## CRITICAL FINDINGS: Complete Architecture Mismatch

**Document**: `/docs/frontend/04-poc-implementation-plan.md`  
**Issue**: Assumes Electron-native architecture instead of REST API architecture  
**Impact**: Implementation plan produces non-functional code that ignores existing backend

## POC Architecture (CORRECT)

```
Frontend (React) → HTTP API Calls → Backend (Express) → SQLite Database
```

**API Endpoints Available:**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User authentication  
- `POST /api/auth/refresh` - Token refresh
- `POST /api/games/create` - Create new game
- `POST /api/games/:id/move` - Make chess move
- `GET /api/puzzles/next` - Get next puzzle
- `POST /api/puzzles/:id/solve` - Submit puzzle solution
- `GET /api/user/profile` - Get user profile
- `GET /api/stats/dashboard` - Get statistics

## CONFLICTS BY OBJECTIVE

### **Objective 1: Authentication & Foundation**

#### **CONFLICT 1: Database Service (Lines 141-143)**
**Wrong**: 
```
- Implement `DatabaseService.ts` with SQLite schema
- Create tables: users, games, puzzles, user_puzzle_progress  
- Add proper indexes for performance
```
**Should Be**:
```
- Implement `ApiClient.ts` with HTTP client configuration
- Create authentication API integration using existing endpoints
- Handle API error responses and status codes
```

#### **CONFLICT 2: Authentication Service (Lines 147-149)**
**Wrong**:
```
**AuthService.ts**: JWT generation, bcrypt hashing, token refresh, secure storage with Electron safeStorage
```
**Should Be**:
```
**AuthService.ts**: API calls to /api/auth endpoints, token storage in localStorage, automatic refresh handling
```

#### **CONFLICT 3: Electron Integration (Lines 170-172)**
**Wrong**:
```
- Configure main process with database initialization
- Set up IPC handlers for authentication  
- Implement secure token storage with safeStorage
```
**Should Be**:
```
- Configure HTTP client for API communication
- Set up token refresh interceptors
- Implement localStorage token persistence
```

### **Objective 2: Chess Engine Integration**

#### **CONFLICT 4: Chess Logic Services (Lines 197-200)**
**Wrong**:
```
**ChessService.ts**: chess.js wrapper with move validation, game state tracking, PGN generation, FEN parsing
**AIService.ts**: Stockfish.js in Web Worker, difficulty levels (depth/time), position evaluation, best move calculation
**StorageService.ts**: Game persistence to SQLite, save/load game states, game history management
```
**Should Be**:
```
**ChessService.ts**: API calls to /api/games endpoints for move validation, game creation, and state management
**GameApiClient.ts**: HTTP client for game-related API endpoints  
**ChessboardWrapper.ts**: UI integration with react-chessboard library
```

#### **CONFLICT 5: Game State Management (Lines 203-207)**
**Wrong**:
```
**useGamePersistence.ts**: Save/load games, auto-save functionality, game history retrieval
```
**Should Be**:
```
**useGameApi.ts**: API calls for game creation, moves, and history retrieval
```

### **Objective 3: Puzzle Training System**

#### **CONFLICT 6: Learning Algorithm Services (Lines 253-255)**
**Wrong**:
```
**SpacedRepetitionService.ts**: SM-2 algorithm implementation, scheduling calculations, difficulty adjustment, retention analytics
**PuzzleService.ts**: Puzzle database queries, theme filtering, difficulty rating, solution validation, progress tracking
```
**Should Be**:
```
**PuzzleApiClient.ts**: API calls to /api/puzzles endpoints for getting puzzles and submitting solutions
**SpacedRepetitionClient.ts**: Frontend logic that works with puzzle API data
```

#### **CONFLICT 7: Database Integration (Lines 280-285)**
**Wrong**:
```
**puzzleSeeder.ts**: Script to import 500+ puzzles from Lichess/Chess.com format, theme classification
**progressTracker.ts**: User puzzle attempts, success rates, time tracking, spaced repetition intervals  
**themeAnalyzer.ts**: Weakness identification, performance analytics by theme, recommendation engine
```
**Should Be**:
```
**PuzzleProgressTracker.ts**: Frontend tracking that syncs with puzzle API
**PuzzleAnalytics.ts**: Client-side analytics using API data
**PuzzleDataMapper.ts**: Transform API responses to frontend state
```

### **Objective 4: Opening Training System**

#### **CONFLICT 8: Opening Services (Lines 311-314)**
**Wrong**:
```
**OpeningService.ts**: ECO code lookup, variation tree navigation, position transposition detection
**RepertoireService.ts**: Personal repertoire management, recommendation engine, style analysis
**ecoDatabase.ts**: Complete ECO classification (A00-E99), variation names, typical continuations
```
**Should Be**:
```
**OpeningApiClient.ts**: API calls for opening data (if backend supports it)
**OpeningDataLoader.ts**: Load opening data from static files or API
**RepertoireManager.ts**: Frontend-only repertoire management with API sync
```

### **Objective 5: Game Analysis System**

#### **CONFLICT 9: Analysis Services (Lines 360-363)**
**Wrong**:
```
**AnalysisService.ts**: Stockfish engine analysis, move evaluation, variation calculation, position assessment
**BlunderDetector.ts**: Move classification (blunder/mistake/inaccuracy), centipawn loss calculation, critical position identification
```
**Should Be**:
```
**GameAnalysisClient.ts**: API calls to backend analysis endpoints (if available)
**AnalysisDataProcessor.ts**: Frontend processing of analysis data from API
```

### **Objective 6: Statistics & Gamification**

#### **CONFLICT 10: Statistics Services (Lines 408-411)**
**Wrong**:
```
**StatisticsService.ts**: ELO calculations, rating history, performance metrics, trend analysis
**AchievementService.ts**: Badge definitions, unlock conditions, progress tracking, notification system
```
**Should Be**:
```
**StatsApiClient.ts**: API calls to /api/stats endpoints
**AchievementManager.ts**: Frontend achievement tracking using API data
```

## MISSING API INTEGRATION PATTERNS

The document completely lacks:

1. **HTTP Client Setup**
   - Axios or fetch configuration
   - Base URL configuration  
   - Request/response interceptors
   - Error handling patterns

2. **API Service Layer**
   - AuthApiClient, GameApiClient, PuzzleApiClient, StatsApiClient
   - Consistent error handling
   - Response data transformation
   - Token injection

3. **API State Management**
   - Loading states for API calls
   - Error state handling
   - Cache management for API responses
   - Optimistic updates

4. **Authentication Flow**
   - Login/register API calls
   - Token storage and retrieval  
   - Automatic token refresh
   - API authorization headers

## REQUIRED COMPLETE REWRITE

This document requires **100% rewrite** of all objectives to:

1. **Remove all direct database access** - Use API calls instead
2. **Remove all Electron-native patterns** - Use web standard approaches  
3. **Add comprehensive API integration** - Cover all endpoints from API documentation
4. **Update all service descriptions** - Show HTTP client patterns
5. **Fix all validation criteria** - Test API integration, not database access

## IMPACT ASSESSMENT

**If implemented as written, this plan would produce:**
- ❌ DatabaseService.ts that conflicts with existing backend
- ❌ AuthService that bypasses existing auth API
- ❌ Chess services that ignore existing game API  
- ❌ Puzzle services that bypass existing puzzle API
- ❌ Complete failure to integrate with existing POC backend
- ❌ Non-functional authentication system
- ❌ Broken game and puzzle functionality

**Required Timeline for Fix:**
- Complete rewrite: 8-12 hours
- All 7 objectives need fundamental changes
- Every service description needs API integration approach
- All validation criteria need updating

This is the **highest priority fix** as it blocks all development work.