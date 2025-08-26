# Frontend Project Structure

## Overview

Simple, practical folder structure for the Chess Training application. No unnecessary index files, clean test separation, and logical organization.

## Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── ProfileSettings.tsx
│   │   └── PasswordReset.tsx
│   │
│   ├── chess/
│   │   ├── ChessBoard.tsx         # react-chessboard wrapper
│   │   ├── GameControls.tsx       # Start, pause, resign, etc
│   │   ├── MoveList.tsx           # Game notation display
│   │   ├── GameClock.tsx          # Timer component
│   │   └── GameResult.tsx         # Win/loss/draw display
│   │
│   ├── puzzles/
│   │   ├── PuzzleInterface.tsx    # Main puzzle solver
│   │   ├── HintSystem.tsx         # Progressive hints
│   │   ├── SolutionFeedback.tsx   # Correct/incorrect feedback
│   │   ├── PuzzleSelector.tsx     # Puzzle difficulty/theme picker
│   │   └── DifficultyAdjuster.tsx # Adaptive difficulty
│   │
│   ├── openings/
│   │   ├── OpeningExplorer.tsx    # ECO database browser
│   │   ├── RepertoireBuilder.tsx  # Personal repertoire
│   │   ├── OpeningQuiz.tsx        # Opening knowledge tests
│   │   ├── TrapTrainer.tsx        # Common trap practice
│   │   └── OpeningDetails.tsx     # Variation explanations
│   │
│   ├── analysis/
│   │   ├── GameAnalyzer.tsx       # Engine analysis interface
│   │   ├── MoveAnalysis.tsx       # Individual move evaluation
│   │   ├── PositionEvaluator.tsx  # Position assessment
│   │   ├── BlunderDetector.tsx    # Mistake highlighting
│   │   └── AnalysisViewer.tsx     # Analysis navigation
│   │
│   ├── statistics/
│   │   ├── StatsDashboard.tsx     # Main statistics page
│   │   ├── RatingChart.tsx        # ELO progression graph
│   │   ├── PerformanceMetrics.tsx # Win/loss ratios
│   │   ├── AchievementBadges.tsx  # Gamification badges
│   │   ├── ProgressTracking.tsx   # Learning progress
│   │   └── StatCard.tsx           # Reusable stat display
│   │
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   │   ├── Card.tsx
│   │   ├── Tooltip.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── ProgressBar.tsx
│   │   └── Badge.tsx
│   │
│   └── layout/
│       ├── AppLayout.tsx         # Main app wrapper
│       ├── Header.tsx            # Top navigation
│       ├── Sidebar.tsx           # Side navigation
│       ├── Navigation.tsx        # Menu component
│       └── Footer.tsx
│
├── pages/
│   ├── LandingPage.tsx           # Home/welcome page (/)
│   ├── auth/                     # Authentication pages
│   │   ├── LoginPage.tsx         # Login form (/auth/login)
│   │   ├── RegisterPage.tsx      # Registration (/auth/register)
│   │   ├── ForgotPasswordPage.tsx # Password reset (/auth/forgot)
│   │   └── ResetPasswordPage.tsx  # Reset with token (/auth/reset/:token)
│   ├── Dashboard.tsx             # User dashboard (/dashboard)
│   ├── puzzles/                  # Puzzle training pages (SRP: one puzzle type per page)
│   │   ├── TacticalPuzzlesPage.tsx    # Tactical puzzles (/puzzles/tactics)
│   │   ├── EndgamePuzzlesPage.tsx     # Endgame puzzles (/puzzles/endgames)
│   │   ├── OpeningPuzzlesPage.tsx     # Opening puzzles (/puzzles/openings)
│   │   ├── CustomPuzzlesPage.tsx      # Custom sets (/puzzles/custom)
│   │   └── PuzzleSelectionPage.tsx    # Main puzzle hub (/puzzles)
│   ├── play/                     # Game playing pages (SRP: one game type per page)
│   │   ├── PlayComputerPage.tsx       # VS AI games (/play/computer)
│   │   ├── AnalysisBoardPage.tsx      # Position analysis (/play/analysis)
│   │   └── GameReviewPage.tsx         # Game review (/play/review)
│   ├── study/                    # Study pages (SRP: one study domain per page)
│   │   ├── OpeningExplorerPage.tsx    # Opening database (/study/openings)
│   │   ├── EndgameLibraryPage.tsx     # Endgame theory (/study/endgames)
│   │   ├── MasterGamesPage.tsx        # Master game study (/study/games)
│   │   └── StudyPlansPage.tsx         # Learning paths (/study)
│   ├── progress/                 # Progress pages (SRP: one progress type per page)
│   │   ├── ProgressOverviewPage.tsx   # Main progress (/progress)
│   │   ├── DetailedStatsPage.tsx      # Statistics (/progress/stats)
│   │   ├── AchievementsPage.tsx       # Achievement gallery (/progress/achievements)
│   │   └── LearningPathPage.tsx       # Learning progress (/progress/path)
│   ├── settings/                 # Settings pages (SRP: one settings domain per page)
│   │   ├── PreferencesPage.tsx        # General prefs (/settings/preferences)
│   │   ├── BoardSettingsPage.tsx      # Board & pieces (/settings/board)
│   │   ├── NotificationsPage.tsx      # Notifications (/settings/notifications)
│   │   └── AccountPage.tsx            # Account settings (/settings/account)
│   ├── ProfilePage.tsx           # User profile (/profile)
│   └── help/                     # Help pages (SRP: one help type per page)
│       ├── HelpCenterPage.tsx         # Main help (/help)
│       ├── TutorialsPage.tsx          # Interactive tutorials (/tutorials)
│       └── ContactPage.tsx            # Support contact (/contact)
│
├── hooks/
│   ├── useAuth.ts                # Authentication
│   ├── useChessGame.ts           # Chess game state
│   ├── useAIOpponent.ts          # AI integration
│   ├── useSpacedRepetition.ts    # Learning algorithm
│   ├── usePuzzleSession.ts       # Puzzle management
│   ├── useGameAnalysis.ts        # Analysis features
│   ├── useGamification.ts        # Achievement system
│   ├── useAchievements.ts        # Badge tracking
│   ├── useLocalStorage.ts        # Storage utility
│   └── useDebounce.ts            # Performance helper
│
├── services/
│   ├── ApiClient.ts              # HTTP client configuration
│   ├── AuthApiClient.ts          # Authentication API calls
│   ├── GameApiClient.ts          # Chess game API calls
│   ├── PuzzleApiClient.ts        # Puzzle training API calls
│   ├── StatsApiClient.ts         # Statistics API calls
│   ├── UserApiClient.ts          # User profile API calls
│   ├── ChessLogicService.ts      # Client-side chess logic
│   ├── AIService.ts              # Stockfish integration (client-side)
│   ├── SpacedRepetitionService.ts # Learning algorithm (client-side)
│   ├── OpeningDataService.ts     # Opening data processing (client-side)
│   ├── AnalysisProcessor.ts      # Analysis data processing (client-side)
│   ├── GamificationEngine.ts     # Achievement logic (client-side)
│   └── CacheService.ts           # API response caching
│
├── stores/                       # Zustand stores
│   ├── authStore.ts              # User session
│   ├── gameStore.ts              # Chess game state
│   ├── puzzleStore.ts            # Puzzle progress
│   ├── openingStore.ts           # Opening repertoire
│   ├── analysisStore.ts          # Analysis data
│   ├── progressStore.ts          # User statistics
│   └── settingsStore.ts          # App preferences
│
├── types/
│   ├── auth.ts                   # User and auth types
│   ├── chess.ts                  # Game and position types
│   ├── puzzle.ts                 # Puzzle and training types
│   ├── opening.ts                # Opening and ECO types
│   ├── analysis.ts               # Analysis result types
│   ├── statistics.ts             # Stats and metrics types
│   ├── gamification.ts           # Achievement types
│   └── api.ts                    # API response types
│
├── utils/
│   ├── chessHelpers.ts           # Chess calculations
│   ├── fenUtils.ts               # FEN string utilities
│   ├── dateFormatters.ts         # Date/time formatting
│   ├── numberFormatters.ts       # Number/rating display
│   ├── validators.ts             # Input validation
│   ├── errorHandling.ts          # Error utilities
│   └── performance.ts            # Performance helpers
│
├── constants/
│   ├── routes.ts                 # App routes
│   ├── api.ts                    # API endpoints
│   ├── chess.ts                  # Chess constants
│   ├── puzzleTypes.ts            # Puzzle categories
│   ├── achievements.ts           # Achievement definitions
│   └── gameSettings.ts           # Default settings
│
├── styles/
│   ├── chessTheme.ts            # Chakra UI theme
│   ├── global.css               # Global styles
│   └── components.css           # Component styles
│
└── assets/
    ├── images/
    │   ├── icons/
    │   └── backgrounds/
    ├── sounds/
    │   ├── move.mp3
    │   ├── capture.mp3
    │   └── check.mp3
    └── data/
        ├── openings.json
        └── puzzles.json

tests/
├── components/                   # Component tests
│   ├── auth/
│   ├── chess/
│   ├── puzzles/
│   ├── openings/
│   ├── analysis/
│   ├── statistics/
│   ├── ui/
│   └── layout/
├── pages/                       # Page tests
│   ├── LandingPage.test.tsx
│   ├── auth/
│   │   ├── LoginPage.test.tsx
│   │   ├── RegisterPage.test.tsx
│   │   ├── ForgotPasswordPage.test.tsx
│   │   └── ResetPasswordPage.test.tsx
│   ├── Dashboard.test.tsx
│   ├── puzzles/
│   │   ├── TacticalPuzzlesPage.test.tsx
│   │   ├── EndgamePuzzlesPage.test.tsx
│   │   ├── OpeningPuzzlesPage.test.tsx
│   │   ├── CustomPuzzlesPage.test.tsx
│   │   └── PuzzleSelectionPage.test.tsx
│   ├── play/
│   │   ├── PlayComputerPage.test.tsx
│   │   ├── AnalysisBoardPage.test.tsx
│   │   └── GameReviewPage.test.tsx
│   ├── study/
│   │   ├── OpeningExplorerPage.test.tsx
│   │   ├── EndgameLibraryPage.test.tsx
│   │   ├── MasterGamesPage.test.tsx
│   │   └── StudyPlansPage.test.tsx
│   ├── progress/
│   │   ├── ProgressOverviewPage.test.tsx
│   │   ├── DetailedStatsPage.test.tsx
│   │   ├── AchievementsPage.test.tsx
│   │   └── LearningPathPage.test.tsx
│   ├── settings/
│   │   ├── PreferencesPage.test.tsx
│   │   ├── BoardSettingsPage.test.tsx
│   │   ├── NotificationsPage.test.tsx
│   │   └── AccountPage.test.tsx
│   ├── ProfilePage.test.tsx
│   └── help/
│       ├── HelpCenterPage.test.tsx
│       ├── TutorialsPage.test.tsx
│       └── ContactPage.test.tsx
├── hooks/                       # Hook tests
├── services/                    # Service tests
├── stores/                      # Store tests
├── utils/                       # Utility tests
├── integration/                 # Integration tests
├── e2e/                        # End-to-end tests
├── setup.ts                    # Test configuration
├── testUtils.tsx               # Test helpers
├── mocks/                      # Mock implementations
│   ├── apiClients.ts             # Mock API client responses
│   ├── services.ts               # Mock client-side services
│   └── stores.ts                 # Mock store implementations
└── fixtures/                   # Test data
    ├── users.ts
    ├── games.ts
    └── puzzles.ts

App.tsx                         # Root component
main.tsx                        # Entry point
index.css                       # Base styles
vite-env.d.ts                   # Vite types
```

## Organization Principles

### Domain-Based Structure
Components are organized by functional domain (auth, chess, puzzles, etc.) rather than technical patterns. This makes it easier to:
- Locate related functionality
- Maintain feature cohesion
- Scale the application
- Onboard new developers

### Component Organization
Each component follows a consistent structure:
- `ComponentName.tsx` - Main component implementation
- `ComponentName.test.tsx` - Unit tests
- `index.ts` - Clean exports
- `ComponentName.stories.tsx` - Storybook stories (for UI components)

### Service Layer
Services are divided into two categories organized by purpose:

**API Clients** - Handle HTTP communication with backend:
- `*ApiClient.ts` files make REST API calls to backend endpoints
- Handle authentication tokens, request/response transformation
- Manage API error handling and retry logic
- Keep HTTP concerns separate from business logic

**Client-Side Services** - Handle frontend business logic:
- Process data received from API clients
- Implement client-side algorithms (chess logic, spaced repetition)
- Provide computed values and derived state
- Keep components focused on presentation

This separation ensures:
- Clear distinction between API communication and business logic
- Easy testing with mocked API clients
- Reusable logic across components
- Proper error handling for network operations

### State Management
Zustand stores organized by domain with clear responsibilities:
- `authStore` - User authentication and session
- `gameStore` - Chess game state and history
- `puzzleStore` - Puzzle training and progress
- `progressStore` - Statistics and achievements
- `settingsStore` - User preferences and configuration

### Testing Structure
Comprehensive testing setup with:
- Unit tests for all components and services
- Integration tests in `__tests__` directory
- Test utilities and mocks for consistent testing
- Fixtures for realistic test data

### Type Safety
Complete TypeScript coverage with:
- Domain-specific type definitions
- API response types
- Component prop types
- Store state types
- Utility function types

This structure supports the complete Chess Training application requirements while maintaining clean architecture principles and developer productivity.