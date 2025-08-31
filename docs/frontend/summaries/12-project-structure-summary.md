# Frontend Project Structure Summary

## Overview and Philosophy

The Chess Training application follows a simple, practical folder structure designed for clarity and maintainability. The architecture emphasizes clean test separation, logical organization, and avoids unnecessary index files. The structure prioritizes developer productivity while supporting comprehensive chess training functionality including tactical puzzles, game analysis, opening study, and progress tracking.

## Core Architectural Principles

### Domain-Based Organization
The entire project structure is organized by functional domains rather than technical patterns. This strategic decision provides several key benefits:
- **Feature Cohesion**: Related functionality is grouped together, making it easier to understand and maintain
- **Developer Onboarding**: New team members can quickly locate relevant code by business domain
- **Scalability**: Features can be developed, tested, and maintained independently
- **Code Navigation**: Intuitive file organization that mirrors the application's functional areas

### Component Architecture Strategy
Every component follows a consistent organizational pattern that ensures predictability and maintainability:
- **Main Implementation**: Core component logic in `ComponentName.tsx`
- **Unit Testing**: Comprehensive testing in `ComponentName.test.tsx`
- **Clean Exports**: Organized exports through `index.ts` files
- **Documentation**: Storybook stories for UI components in `ComponentName.stories.tsx`

## Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx           # Research-validated: React Hook Form with Zod validation
│   │   ├── RegisterForm.tsx        # React Hook Form + TanStack Query mutation
│   │   ├── ProfileSettings.tsx     # React Hook Form profile management
│   │   └── PasswordReset.tsx       # React Hook Form password reset flow
│   │
│   ├── chess/
│   │   ├── ChessBoardWrapper.tsx   # Research-validated: react-chessboard integration
│   │   ├── AnimatedChessPiece.tsx  # Research-validated: React Spring chess piece animations
│   │   ├── GameControls.tsx        # Start, pause, resign with React Hook Form
│   │   ├── MoveList.tsx           # Game notation display with TanStack Query
│   │   ├── GameClock.tsx          # Timer with React Spring animations
│   │   ├── GameResult.tsx         # Win/loss/draw with React Spring success animations
│   │   └── StockfishPanel.tsx     # Research-validated: Stockfish analysis integration
│   │
│   ├── puzzles/
│   │   ├── PuzzleInterface.tsx      # Main solver with react-chessboard + Stockfish
│   │   ├── HintSystem.tsx           # Progressive hints with React Spring animations
│   │   ├── SolutionFeedback.tsx     # React Spring success/error animations + Howler.js audio
│   │   ├── PuzzleConfigForm.tsx     # Research-validated: React Hook Form configuration
│   │   ├── PuzzleSelector.tsx       # Difficulty/theme picker with TanStack Query
│   │   ├── DifficultyAdjuster.tsx   # Adaptive difficulty with React Spring indicators
│   │   └── PuzzleSuccessAnimation.tsx # Research-validated: React Spring celebration animations
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

├── services/
│   ├── api/                      # Research-validated API clients with axios + TanStack Query
│   │   ├── ApiClient.ts          # Axios HTTP client configuration with JWT interceptors
│   │   ├── AuthApiClient.ts      # Authentication REST API calls
│   │   ├── GameApiClient.ts      # Chess game REST API calls
│   │   ├── PuzzleApiClient.ts    # Puzzle training REST API calls
│   │   ├── StatsApiClient.ts     # Statistics REST API calls
│   │   └── UserApiClient.ts      # User profile REST API calls
│   ├── chess/
│   │   ├── ChessLogicService.ts  # chess.js integration
│   │   ├── StockfishService.ts   # Research-validated: Stockfish.js Web Worker integration
│   │   ├── StockfishWorker.ts    # Stockfish Web Worker wrapper for non-blocking analysis
│   │   └── PositionAnalyzer.ts   # Chess position analysis with Stockfish
│   ├── audio/
│   │   ├── AudioService.ts       # Research-validated: Howler.js audio system
│   │   ├── SoundManager.ts       # Chess-specific sound effects with mobile optimization
│   │   └── AudioPreloader.ts     # Howler.js audio file preloading for performance
│   ├── learning/
│   │   ├── SpacedRepetitionService.ts # Learning algorithm implementation
│   │   ├── ProgressCalculator.ts     # Learning progress computation
│   │   └── DifficultyAdjuster.ts     # Adaptive difficulty algorithm
│   ├── data/
│   │   ├── OpeningDataService.ts # Opening database processing
│   │   ├── PuzzleProcessor.ts    # Puzzle data transformation
│   │   └── StatsCalculator.ts    # Statistics computation
│   └── cache/
│       ├── QueryClientConfig.ts  # Research-validated: TanStack Query configuration
│       └── CacheService.ts       # API response caching with TanStack Query

├── stores/                       # Zustand stores
│   ├── authStore.ts              # User session
│   ├── gameStore.ts              # Chess game state
│   ├── puzzleStore.ts            # Puzzle progress
│   ├── openingStore.ts           # Opening repertoire
│   ├── analysisStore.ts          # Analysis data
│   ├── progressStore.ts          # User statistics
│   └── settingsStore.ts          # App preferences

├── types/
│   ├── auth.ts                   # User and auth types
│   ├── chess.ts                  # Game and position types
│   ├── puzzle.ts                 # Puzzle and training types
│   ├── opening.ts                # Opening and ECO types
│   ├── analysis.ts               # Analysis result types
│   ├── statistics.ts             # Stats and metrics types
│   ├── gamification.ts           # Achievement types
│   └── api.ts                    # API response types

├── utils/
│   ├── chessHelpers.ts           # Chess calculations
│   ├── fenUtils.ts               # FEN string utilities
│   ├── dateFormatters.ts         # Date/time formatting
│   ├── numberFormatters.ts       # Number/rating display
│   ├── validators.ts             # Input validation
│   ├── errorHandling.ts          # Error utilities
│   └── performance.ts            # Performance helpers

├── constants/
│   ├── routes.ts                 # App routes
│   ├── api.ts                    # API endpoints
│   ├── chess.ts                  # Chess constants
│   ├── puzzleTypes.ts            # Puzzle categories
│   ├── achievements.ts           # Achievement definitions
│   └── gameSettings.ts           # Default settings

├── styles/
│   ├── chessTheme.ts            # Chakra UI theme
│   ├── global.css               # Global styles
│   └── components.css           # Component styles

└── assets/
    ├── images/
    │   ├── icons/
    │   └── backgrounds/
    ├── audio/                      # Research-validated: Howler.js optimized audio files
    │   ├── move.webm               # Primary format for modern browsers
    │   ├── move.mp3                # Fallback format for compatibility
    │   ├── capture.webm            # Chess piece capture sounds
    │   ├── capture.mp3
    │   ├── check.webm              # Check/checkmate notifications
    │   ├── check.mp3
    │   ├── success.webm            # Puzzle success feedback
    │   ├── success.mp3
    │   ├── error.webm              # Error/incorrect move feedback
    │   ├── error.mp3
    │   ├── hint.webm               # Hint system audio feedback
    │   ├── hint.mp3
    │   ├── button.webm             # UI interaction sounds
    │   └── button.mp3
    ├── stockfish/                  # Research-validated: Stockfish.js engine files
    │   ├── stockfish.js            # Stockfish WebAssembly build
    │   ├── stockfish.wasm          # WebAssembly binary
    │   └── stockfish.worker.js     # Web Worker wrapper
    └── data/
        ├── openings.json           # ECO opening database
        └── puzzles.json            # Training puzzle sets

tests/                              # Research-validated: Vitest + Playwright testing structure
├── unit/                         # Vitest unit tests (5x faster than Jest)
│   ├── components/               # Component unit tests with React Testing Library
│   │   ├── auth/                 # React Hook Form validation testing
│   │   ├── chess/                # react-chessboard wrapper testing
│   │   ├── puzzles/              # React Spring animation testing
│   │   ├── analysis/             # Stockfish service testing
│   │   ├── audio/                # Howler.js audio system testing
│   │   └── ui/                   # Chakra UI component testing
│   ├── services/                 # Service layer unit tests
│   │   ├── stockfish/            # Stockfish Web Worker testing
│   │   ├── audio/                # Howler.js service testing
│   │   └── api/                  # Axios + TanStack Query testing
│   ├── stores/                   # Zustand store testing
│   └── utils/                    # Utility function testing
├── integration/                  # Integration tests with Vitest
│   ├── api/                      # TanStack Query + API integration
│   ├── chess/                    # Chess engine + UI integration
│   └── auth/                     # Authentication flow integration
├── e2e/                         # Research-validated: Playwright end-to-end tests
│   ├── auth/                     # Authentication workflows
│   │   ├── login.spec.ts         # Login with React Hook Form
│   │   ├── registration.spec.ts  # Registration flow testing
│   │   └── password-reset.spec.ts # Password reset workflow
│   ├── puzzles/                  # Puzzle training workflows
│   │   ├── tactical-puzzles.spec.ts # Complete puzzle solving flow
│   │   ├── hint-system.spec.ts      # Hint progression testing
│   │   └── difficulty-adjustment.spec.ts # Adaptive difficulty
│   ├── chess/                    # Chess gameplay workflows
│   │   ├── game-vs-ai.spec.ts    # Stockfish AI opponent testing
│   │   ├── analysis.spec.ts      # Stockfish analysis workflow
│   │   └── board-interaction.spec.ts # react-chessboard interaction
│   ├── audio/                    # Howler.js audio workflows
│   │   ├── sound-effects.spec.ts # Audio feedback testing
│   │   └── mobile-audio.spec.ts  # Mobile audio restrictions
│   └── performance/              # Performance regression testing
│       ├── load-times.spec.ts    # Page load performance
│       └── interaction-timing.spec.ts # <50ms interaction timing
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

App.tsx                         # Root component with TanStack Query + Zustand providers
main.tsx                        # Entry point with React Spring + Howler.js initialization
index.css                       # Base styles
vite-env.d.ts                   # Vite types
vitest.config.ts                # Research-validated: Vitest configuration (5x faster than Jest)
playwright.config.ts            # Research-validated: Playwright E2E test configuration
package.json                    # Dependencies with all research-validated libraries
```

## Detailed Project Structure

### Source Code Organization (`src/`)

#### Components Directory (`components/`)
The components directory is the heart of the UI architecture, organized into seven distinct functional domains:

**Authentication Components (`auth/`)**
- **LoginForm.tsx**: Research-validated React Hook Form implementation with Zod validation
- **RegisterForm.tsx**: Registration workflow using React Hook Form and TanStack Query mutations
- **ProfileSettings.tsx**: User profile management with React Hook Form
- **PasswordReset.tsx**: Complete password reset flow implementation

**Chess Game Components (`chess/`)**
- **ChessBoardWrapper.tsx**: Research-validated integration with react-chessboard library
- **AnimatedChessPiece.tsx**: React Spring-powered chess piece animations
- **GameControls.tsx**: Game control interface (start, pause, resign) with React Hook Form
- **MoveList.tsx**: Game notation display integrated with TanStack Query
- **GameClock.tsx**: Timer component with React Spring animations
- **GameResult.tsx**: Win/loss/draw display with React Spring success animations
- **StockfishPanel.tsx**: Research-validated Stockfish analysis integration

**Puzzle Training Components (`puzzles/`)**
- **PuzzleInterface.tsx**: Main puzzle solving interface combining react-chessboard and Stockfish
- **HintSystem.tsx**: Progressive hint system with React Spring animations
- **SolutionFeedback.tsx**: Success/error animations using React Spring and Howler.js audio
- **PuzzleConfigForm.tsx**: Research-validated React Hook Form configuration interface
- **PuzzleSelector.tsx**: Difficulty and theme selection with TanStack Query integration
- **DifficultyAdjuster.tsx**: Adaptive difficulty system with React Spring indicators
- **PuzzleSuccessAnimation.tsx**: Research-validated React Spring celebration animations

**Opening Study Components (`openings/`)**
- **OpeningExplorer.tsx**: ECO database browser for opening exploration
- **RepertoireBuilder.tsx**: Personal opening repertoire management
- **OpeningQuiz.tsx**: Interactive opening knowledge testing
- **TrapTrainer.tsx**: Common chess trap practice interface
- **OpeningDetails.tsx**: Detailed variation explanations and analysis

**Analysis Components (`analysis/`)**
- **GameAnalyzer.tsx**: Engine analysis interface for game review
- **MoveAnalysis.tsx**: Individual move evaluation and explanation
- **PositionEvaluator.tsx**: Comprehensive position assessment tools
- **BlunderDetector.tsx**: Automatic mistake highlighting and explanation
- **AnalysisViewer.tsx**: Navigation interface for analysis results

**Statistics Components (`statistics/`)**
- **StatsDashboard.tsx**: Main statistics and performance overview
- **RatingChart.tsx**: ELO progression visualization graphs
- **PerformanceMetrics.tsx**: Win/loss ratios and performance analytics
- **AchievementBadges.tsx**: Gamification badge system display
- **ProgressTracking.tsx**: Learning progress visualization
- **StatCard.tsx**: Reusable statistical information display component

**UI Components (`ui/`)**
Foundation components providing consistent interface elements:
- **Button.tsx**: Standardized button implementations
- **Modal.tsx**: Modal dialog system
- **Card.tsx**: Information card layouts
- **Tooltip.tsx**: Interactive tooltip system
- **LoadingSpinner.tsx**: Loading state indicators
- **ProgressBar.tsx**: Progress visualization components
- **Badge.tsx**: Status and achievement badges

**Layout Components (`layout/`)**
Structural components defining the application's visual framework:
- **AppLayout.tsx**: Main application wrapper and structure
- **Header.tsx**: Top navigation and user interface
- **Sidebar.tsx**: Side navigation and menu system
- **Navigation.tsx**: Main menu and routing components
- **Footer.tsx**: Application footer with links and information

#### Pages Directory (`pages/`)
The pages directory implements a Single Responsibility Principle (SRP) approach, with one page per specific function:

**Authentication Pages (`auth/`)**
- **LoginPage.tsx**: Login form interface (route: /auth/login)
- **RegisterPage.tsx**: User registration interface (route: /auth/register)
- **ForgotPasswordPage.tsx**: Password reset initiation (route: /auth/forgot)
- **ResetPasswordPage.tsx**: Token-based password reset (route: /auth/reset/:token)

**Puzzle Training Pages (`puzzles/`)**
Each puzzle type receives dedicated page implementation following SRP:
- **TacticalPuzzlesPage.tsx**: Tactical puzzle training (route: /puzzles/tactics)
- **EndgamePuzzlesPage.tsx**: Endgame-focused puzzles (route: /puzzles/endgames)
- **OpeningPuzzlesPage.tsx**: Opening theory puzzles (route: /puzzles/openings)
- **CustomPuzzlesPage.tsx**: User-created puzzle sets (route: /puzzles/custom)
- **PuzzleSelectionPage.tsx**: Main puzzle hub and navigation (route: /puzzles)

**Game Playing Pages (`play/`)**
Game-related functionality organized by specific play modes:
- **PlayComputerPage.tsx**: AI opponent games (route: /play/computer)
- **AnalysisBoardPage.tsx**: Position analysis tools (route: /play/analysis)
- **GameReviewPage.tsx**: Game review and study (route: /play/review)

**Study Pages (`study/`)**
Educational content organized by chess study domains:
- **OpeningExplorerPage.tsx**: Opening database exploration (route: /study/openings)
- **EndgameLibraryPage.tsx**: Endgame theory library (route: /study/endgames)
- **MasterGamesPage.tsx**: Master game analysis (route: /study/games)
- **StudyPlansPage.tsx**: Structured learning paths (route: /study)

**Progress Tracking Pages (`progress/`)**
Performance and progress monitoring with dedicated page types:
- **ProgressOverviewPage.tsx**: Main progress dashboard (route: /progress)
- **DetailedStatsPage.tsx**: Comprehensive statistics (route: /progress/stats)
- **AchievementsPage.tsx**: Achievement gallery and tracking (route: /progress/achievements)
- **LearningPathPage.tsx**: Learning progress visualization (route: /progress/path)

**Settings Pages (`settings/`)**
Configuration interface organized by settings domains:
- **PreferencesPage.tsx**: General application preferences (route: /settings/preferences)
- **BoardSettingsPage.tsx**: Chess board and piece customization (route: /settings/board)
- **NotificationsPage.tsx**: Notification preferences (route: /settings/notifications)
- **AccountPage.tsx**: Account management settings (route: /settings/account)

**Help and Support Pages (`help/`)**
User assistance organized by help type:
- **HelpCenterPage.tsx**: Main help and documentation (route: /help)
- **TutorialsPage.tsx**: Interactive tutorial system (route: /tutorials)
- **ContactPage.tsx**: Support contact interface (route: /contact)

**Additional Core Pages**
- **LandingPage.tsx**: Home and welcome interface (route: /)
- **Dashboard.tsx**: Post-authentication user dashboard (route: /dashboard)
- **ProfilePage.tsx**: User profile management (route: /profile)

#### Custom Hooks Directory (`hooks/`)
Reusable business logic organized by functional domain:
- **useAuth.ts**: Authentication state and operations
- **useChessGame.ts**: Chess game state management
- **useAIOpponent.ts**: AI integration and opponent logic
- **useSpacedRepetition.ts**: Learning algorithm implementation
- **usePuzzleSession.ts**: Puzzle session and progress management
- **useGameAnalysis.ts**: Game analysis features and data
- **useGamification.ts**: Achievement and gamification system
- **useAchievements.ts**: Badge tracking and progress
- **useLocalStorage.ts**: Local storage utility operations
- **useDebounce.ts**: Performance optimization utilities

#### Services Directory (`services/`)
The services layer implements a clear separation between API communication and client-side business logic:

**API Client Services (`api/`)**
Research-validated API clients using axios and TanStack Query:
- **ApiClient.ts**: Axios HTTP client configuration with JWT interceptors
- **AuthApiClient.ts**: Authentication REST API operations
- **GameApiClient.ts**: Chess game data REST API calls
- **PuzzleApiClient.ts**: Puzzle training REST API integration
- **StatsApiClient.ts**: Statistics data REST API operations
- **UserApiClient.ts**: User profile REST API management

**Chess Engine Services (`chess/`)**
- **ChessLogicService.ts**: chess.js library integration for game logic
- **StockfishService.ts**: Research-validated Stockfish.js Web Worker integration
- **StockfishWorker.ts**: Stockfish Web Worker wrapper for non-blocking analysis
- **PositionAnalyzer.ts**: Chess position analysis using Stockfish engine

**Audio Services (`audio/`)**
Research-validated audio system using Howler.js:
- **AudioService.ts**: Core Howler.js audio system implementation
- **SoundManager.ts**: Chess-specific sound effects with mobile optimization
- **AudioPreloader.ts**: Howler.js audio file preloading for performance optimization

**Learning Algorithm Services (`learning/`)**
- **SpacedRepetitionService.ts**: Spaced repetition algorithm implementation
- **ProgressCalculator.ts**: Learning progress computation and tracking
- **DifficultyAdjuster.ts**: Adaptive difficulty adjustment algorithms

**Data Processing Services (`data/`)**
- **OpeningDataService.ts**: Opening database processing and management
- **PuzzleProcessor.ts**: Puzzle data transformation and optimization
- **StatsCalculator.ts**: Statistics computation and analysis

**Caching Services (`cache/`)**
- **QueryClientConfig.ts**: Research-validated TanStack Query configuration
- **CacheService.ts**: API response caching using TanStack Query

#### State Management Directory (`stores/`)
Zustand stores organized by functional domain with clear responsibilities:
- **authStore.ts**: User session and authentication state
- **gameStore.ts**: Chess game state and move history
- **puzzleStore.ts**: Puzzle progress and session data
- **openingStore.ts**: Opening repertoire and study progress
- **analysisStore.ts**: Game analysis results and cached data
- **progressStore.ts**: User statistics and performance metrics
- **settingsStore.ts**: Application preferences and configuration

#### Type Definitions Directory (`types/`)
Comprehensive TypeScript coverage organized by domain:
- **auth.ts**: User authentication and session types
- **chess.ts**: Chess game, position, and move types
- **puzzle.ts**: Puzzle training and progress types
- **opening.ts**: Opening database and ECO classification types
- **analysis.ts**: Engine analysis and evaluation types
- **statistics.ts**: Performance metrics and statistics types
- **gamification.ts**: Achievement and progress tracking types
- **api.ts**: API request and response interface types

#### Utility Functions Directory (`utils/`)
Domain-specific utility functions and helpers:
- **chessHelpers.ts**: Chess calculation and validation utilities
- **fenUtils.ts**: FEN string parsing and manipulation utilities
- **dateFormatters.ts**: Date and time formatting functions
- **numberFormatters.ts**: Number and rating display utilities
- **validators.ts**: Input validation and sanitization functions
- **errorHandling.ts**: Error management and reporting utilities
- **performance.ts**: Performance optimization helper functions

#### Constants Directory (`constants/`)
Application-wide constants organized by category:
- **routes.ts**: Application route definitions and navigation
- **api.ts**: API endpoint URLs and configuration
- **chess.ts**: Chess-specific constants and configurations
- **puzzleTypes.ts**: Puzzle category definitions and metadata
- **achievements.ts**: Achievement system definitions and criteria
- **gameSettings.ts**: Default game and application settings

#### Styling Directory (`styles/`)
Centralized styling and theme management:
- **chessTheme.ts**: Chakra UI theme customization for chess interface
- **global.css**: Global application styles and CSS reset
- **components.css**: Component-specific styling overrides

#### Assets Directory (`assets/`)
Static assets organized by type and optimized for performance:

**Image Assets (`images/`)**
- **icons/**: Application icons and UI graphics
- **backgrounds/**: Background images and textures

**Audio Assets (`audio/`)**
Research-validated Howler.js optimized audio files with multiple format support:
- **move.webm/mp3**: Chess piece movement sounds
- **capture.webm/mp3**: Piece capture audio feedback
- **check.webm/mp3**: Check and checkmate notifications
- **success.webm/mp3**: Puzzle success celebration sounds
- **error.webm/mp3**: Error and incorrect move feedback
- **hint.webm/mp3**: Hint system audio feedback
- **button.webm/mp3**: UI interaction sound effects

**Stockfish Engine Assets (`stockfish/`)**
Research-validated Stockfish.js engine files:
- **stockfish.js**: Stockfish WebAssembly build
- **stockfish.wasm**: WebAssembly binary for optimal performance
- **stockfish.worker.js**: Web Worker wrapper for non-blocking analysis

**Data Assets (`data/`)**
- **openings.json**: Comprehensive ECO opening database
- **puzzles.json**: Curated training puzzle collections

### Testing Architecture (`tests/`)

#### Unit Testing Structure (`unit/`)
Comprehensive Vitest unit testing (5x faster than Jest) organized by source directory structure:

**Component Unit Tests (`components/`)**
- **auth/**: React Hook Form validation testing for authentication components
- **chess/**: react-chessboard wrapper and chess component testing
- **puzzles/**: React Spring animation and puzzle logic testing
- **analysis/**: Stockfish service integration testing
- **audio/**: Howler.js audio system functionality testing
- **ui/**: Chakra UI component behavior and interaction testing

**Service Layer Unit Tests (`services/`)**
- **stockfish/**: Stockfish Web Worker communication and analysis testing
- **audio/**: Howler.js service layer and audio management testing
- **api/**: Axios and TanStack Query integration testing

**State Management Tests (`stores/`)**
- Zustand store behavior and state mutation testing

**Utility Function Tests (`utils/`)**
- Pure function testing for all utility modules

#### Integration Testing (`integration/`)
Integration tests using Vitest for cross-system functionality:
- **api/**: TanStack Query and API client integration testing
- **chess/**: Chess engine and UI component integration
- **auth/**: Complete authentication flow integration testing

#### End-to-End Testing (`e2e/`)
Research-validated Playwright end-to-end testing for complete user workflows:

**Authentication Workflows (`auth/`)**
- **login.spec.ts**: Complete login flow with React Hook Form validation
- **registration.spec.ts**: User registration process testing
- **password-reset.spec.ts**: Password reset workflow validation

**Puzzle Training Workflows (`puzzles/`)**
- **tactical-puzzles.spec.ts**: Complete puzzle solving and feedback testing
- **hint-system.spec.ts**: Progressive hint system workflow
- **difficulty-adjustment.spec.ts**: Adaptive difficulty algorithm testing

**Chess Gameplay Workflows (`chess/`)**
- **game-vs-ai.spec.ts**: Stockfish AI opponent interaction testing
- **analysis.spec.ts**: Complete game analysis workflow
- **board-interaction.spec.ts**: react-chessboard user interaction testing

**Audio System Workflows (`audio/`)**
- **sound-effects.spec.ts**: Complete audio feedback system testing
- **mobile-audio.spec.ts**: Mobile audio restriction and optimization testing

**Performance Workflows (`performance/`)**
- **load-times.spec.ts**: Page load performance regression testing
- **interaction-timing.spec.ts**: <50ms interaction timing validation

#### Page Testing Structure (`pages/`)
Complete page-level testing coverage matching the page directory structure:
- Landing page, authentication pages, dashboard, puzzle pages, play pages, study pages, progress pages, settings pages, profile page, and help pages
- Each page test validates component integration, routing, and user interaction flows

#### Testing Support Infrastructure
- **setup.ts**: Comprehensive test environment configuration
- **testUtils.tsx**: Reusable testing utilities and helpers
- **mocks/**: Mock implementations for API clients, services, and stores
- **fixtures/**: Realistic test data for users, games, and puzzles

## Service Layer Architecture

### API Client vs Client-Side Service Separation

The service architecture implements a clear separation of concerns between HTTP communication and business logic:

**API Clients (`*ApiClient.ts`)**
- Handle all HTTP communication with backend services
- Manage authentication tokens and request/response transformation
- Implement API error handling and retry logic with TanStack Query
- Keep HTTP concerns completely separate from business logic
- Provide clean interfaces for backend data operations

**Client-Side Services**
- Process and transform data received from API clients
- Implement client-side algorithms (chess logic, spaced repetition, analysis)
- Provide computed values and derived state for components
- Keep components focused purely on presentation logic
- Enable comprehensive testing with mocked API clients

This separation ensures:
- **Clear Responsibility Boundaries**: Network operations vs business logic
- **Testability**: Easy mocking of API clients for testing business logic
- **Reusability**: Business logic can be shared across multiple components
- **Error Handling**: Proper network error handling separate from business errors
- **Performance**: Optimized caching strategies for API responses

## State Management Strategy

### Zustand Store Organization
State management follows domain-driven design with clear store responsibilities:

- **authStore**: User authentication state, session management, and login/logout operations
- **gameStore**: Active chess games, move history, game state, and player information
- **puzzleStore**: Puzzle training progress, session data, and performance tracking
- **openingStore**: Personal opening repertoire, study progress, and ECO database state
- **analysisStore**: Cached analysis results, position evaluations, and engine data
- **progressStore**: User statistics, achievement progress, and performance metrics
- **settingsStore**: Application preferences, board settings, and user configuration

Each store maintains clear boundaries and communicates through well-defined interfaces, ensuring predictable state updates and easy debugging.

## Type Safety Implementation

The application achieves complete TypeScript coverage through:

- **Domain-Specific Types**: Comprehensive type definitions for each functional area
- **API Interface Types**: Strongly-typed request and response schemas
- **Component Prop Types**: Full type safety for all component interfaces
- **Store State Types**: Typed state management with compile-time validation
- **Utility Function Types**: Type-safe utility functions with proper generics

This type system provides compile-time error detection, excellent IDE support, and self-documenting code that improves long-term maintainability.

## Configuration Files

The project includes comprehensive configuration for all major tools:

- **App.tsx**: Root component with TanStack Query and Zustand provider setup
- **main.tsx**: Application entry point with React Spring and Howler.js initialization
- **vitest.config.ts**: Research-validated Vitest configuration (5x faster than Jest)
- **playwright.config.ts**: Research-validated Playwright E2E test configuration
- **package.json**: All research-validated dependencies and scripts

## Architectural Benefits

This structure delivers several key advantages:

1. **Developer Productivity**: Intuitive organization that matches mental models
2. **Maintainability**: Clear separation of concerns and consistent patterns
3. **Scalability**: Domain-based organization supports feature team scaling
4. **Testing**: Comprehensive testing strategy with proper isolation
5. **Performance**: Optimized asset organization and lazy loading support
6. **Type Safety**: Complete TypeScript coverage preventing runtime errors
7. **Research-Validated**: All major technical decisions backed by research and proven libraries

The architecture successfully balances complexity with maintainability, providing a robust foundation for the complete Chess Training application while remaining approachable for developers at all skill levels.