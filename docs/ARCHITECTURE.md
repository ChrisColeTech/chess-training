# Chess Training Application - System Architecture

**Document Version:** 1.0  
**Date:** August 2025  
**Project Phase:** POC (Production-Ready Implementation)  
**Status:** Architectural Foundation Document

## Table of Contents

1. [Architecture Principles](#architecture-principles)
2. [System Overview](#system-overview)
3. [Component Architecture](#component-architecture)
4. [Data Flow Architecture](#data-flow-architecture)
5. [Security Architecture](#security-architecture)
6. [Performance Architecture](#performance-architecture)
7. [Scalability Considerations](#scalability-considerations)
8. [Technology Integration Patterns](#technology-integration-patterns)
9. [Development Architecture](#development-architecture)
10. [Deployment Architecture](#deployment-architecture)

---

## Architecture Principles

### Core Architectural Principles

Based on research findings, this POC must demonstrate **production-ready architecture** that can scale to cloud deployment:

#### 1. **Single Responsibility Principle (SRP)**
- Each component has one clear, well-defined purpose
- Services are focused on specific business domains
- Clear separation between UI, business logic, and data layers

#### 2. **Don't Repeat Yourself (DRY)**  
- Shared logic abstracted into reusable modules
- Common utilities centralized and imported
- Database queries abstracted through repository pattern

#### 3. **No Mock Implementations**
- All functionality fully implemented with real logic
- Chess engine actually runs Stockfish.js analysis
- Database operations use real SQLite transactions
- Authentication uses actual JWT tokens and encryption

#### 4. **Production-Ready Code Quality**
- Full error handling and validation
- Comprehensive logging and monitoring
- Security best practices enforced
- Performance optimization built-in

#### 5. **Cloud-Migration Ready**
- Database schema compatible with PostgreSQL
- Stateless backend services
- Environment-based configuration
- Scalable data models and API design

---

## System Overview

### High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      USER INTERFACE LAYER                  │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐                                       │
│  │ Electron Shell  │ ← Cross-platform desktop wrapper     │
│  │                 │   • Window management                 │
│  │                 │   • System integration               │
│  │                 │   • Auto-updates                     │
│  │                 │   • File system access              │
│  └─────────────────┘                                       │
│           │                                                 │
│           │ IPC (Secure Context Bridge)                     │
│           ▼                                                 │
│  ┌─────────────────────────────────────────────────────────┤
│  │              REACT FRONTEND LAYER                      │
│  ├─────────────────────────────────────────────────────────┤
│  │ ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐│
│  │ │  Chess UI   │ │  Puzzle UI  │ │  User Management    ││
│  │ │             │ │             │ │                     ││
│  │ │• Board      │ │• Training   │ │• Authentication     ││
│  │ │• Game Logic │ │• Progress   │ │• Profile Settings   ││
│  │ │• Move Input │ │• Statistics │ │• Game History       ││
│  │ └─────────────┘ └─────────────┘ └─────────────────────┘│
│  │                                                         │
│  │ ┌─────────────────────────────────────────────────────┐│
│  │ │           STATE MANAGEMENT LAYER                   ││
│  │ │  • Zustand stores (chess, puzzles, auth, UI)      ││
│  │ │  • React Query for server state                   ││
│  │ │  • Local storage for persistence                  ││
│  │ └─────────────────────────────────────────────────────┘│
│  │                                                         │
│  │ ┌─────────────────────────────────────────────────────┐│
│  │ │              WEB WORKERS LAYER                     ││
│  │ │  • Stockfish.js chess engine                      ││
│  │ │  • Position analysis (non-blocking)               ││
│  │ │  • Move calculation background processing         ││
│  │ └─────────────────────────────────────────────────────┘│
│  └─────────────────────────────────────────────────────────┘
└─────────────────────────────────────────────────────────────┘
           │
           │ HTTPS REST API + WebSocket (future)
           ▼
┌─────────────────────────────────────────────────────────────┐
│                     BACKEND API LAYER                      │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐│
│  │                 EXPRESS.JS ROUTER                      ││
│  │  • Route handling and middleware                       ││
│  │  • Request validation and sanitization                ││
│  │  • Authentication middleware                          ││
│  │  • Error handling and logging                         ││
│  └─────────────────────────────────────────────────────────┘│
│           │                                                 │
│           ▼                                                 │
│  ┌─────────────────────────────────────────────────────────┐│
│  │              BUSINESS LOGIC LAYER                      ││
│  ├─────────────────────────────────────────────────────────┤│
│  │ ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐││
│  │ │Chess Service│ │Puzzle Service│ │  Auth Service      │││
│  │ │             │ │             │ │                     │││
│  │ │• Game Logic │ │• Difficulty │ │• JWT Management     │││
│  │ │• Move Valid.│ │• Spaced Rep.│ │• Password Security  │││
│  │ │• AI Control │ │• Progress   │ │• Session Handling   │││
│  │ └─────────────┘ └─────────────┘ └─────────────────────┘││
│  │                                                         ││
│  │ ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐││
│  │ │ ELO Service │ │Stats Service│ │  Utility Services   │││
│  │ │             │ │             │ │                     │││
│  │ │• Rating     │ │• Analytics  │ │• Logging            │││
│  │ │  Calculation│ │• Reports    │ │• Email              │││
│  │ │• History    │ │• Metrics    │ │• File Operations    │││
│  │ └─────────────┘ └─────────────┘ └─────────────────────┘││
│  └─────────────────────────────────────────────────────────┘│
│           │                                                 │
│           ▼                                                 │
│  ┌─────────────────────────────────────────────────────────┐│
│  │               DATA ACCESS LAYER                        ││
│  ├─────────────────────────────────────────────────────────┤│
│  │ ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐││
│  │ │User Repo    │ │Game Repo    │ │  Puzzle Repo       │││
│  │ │             │ │             │ │                     │││
│  │ │• CRUD       │ │• Game CRUD  │ │• Puzzle CRUD        │││
│  │ │• Auth Data  │ │• Move Hist. │ │• Attempt Tracking   │││
│  │ │• Profile    │ │• Statistics │ │• Schedule Mgmt      │││
│  │ └─────────────┘ └─────────────┘ └─────────────────────┘││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
           │
           │ SQL Queries + Transactions
           ▼
┌─────────────────────────────────────────────────────────────┐
│                     DATA STORAGE LAYER                     │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐│
│  │               SQLite DATABASE (POC)                    ││
│  │             PostgreSQL-Compatible Schema               ││
│  ├─────────────────────────────────────────────────────────┤│
│  │ ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐││
│  │ │Users Tables │ │Chess Tables │ │  Puzzle Tables     │││
│  │ │             │ │             │ │                     │││
│  │ │• users      │ │• games      │ │• puzzles            │││
│  │ │• sessions   │ │• moves      │ │• attempts           │││
│  │ │• profiles   │ │• analysis   │ │• schedules          │││
│  │ └─────────────┘ └─────────────┘ └─────────────────────┘││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

### Architecture Flow Principles

1. **Unidirectional Data Flow**: Data flows down, events flow up
2. **Layer Isolation**: Each layer only communicates with adjacent layers
3. **Service Boundaries**: Clear interfaces between business domains
4. **Error Propagation**: Structured error handling through all layers
5. **Security Perimeter**: Authentication/authorization at API gateway

---

## Component Architecture

### Frontend Component Hierarchy

```
├── App (Root Component)
│   ├── Router (React Router)
│   ├── AuthProvider (Authentication Context)
│   ├── ThemeProvider (UI Theming)
│   └── QueryClient (Server State)
│
├── Pages (Route Components)
│   ├── LoginPage
│   ├── RegisterPage  
│   ├── DashboardPage
│   ├── GamePage
│   ├── PuzzlePage
│   ├── ProfilePage
│   └── AnalyticsPage
│
├── Components (Reusable UI)
│   ├── chess/
│   │   ├── ChessBoard (react-chessboard wrapper)
│   │   ├── MoveHistory
│   │   ├── GameControls
│   │   └── AnalysisPanel
│   │
│   ├── puzzles/
│   │   ├── PuzzleBoard
│   │   ├── HintSystem
│   │   ├── SolutionFeedback
│   │   └── ProgressIndicator
│   │
│   ├── auth/
│   │   ├── LoginForm
│   │   ├── RegisterForm
│   │   └── ProtectedRoute
│   │
│   └── common/
│       ├── Header
│       ├── Sidebar
│       ├── Modal
│       └── LoadingSpinner
│
├── Hooks (Custom React Hooks)
│   ├── useAuth
│   ├── useChessGame
│   ├── usePuzzles
│   ├── useStockfish
│   └── useLocalStorage
│
├── Services (API Layer)
│   ├── authService
│   ├── gameService
│   ├── puzzleService
│   └── statsService
│
├── Stores (State Management)
│   ├── authStore (Zustand)
│   ├── gameStore (Zustand) 
│   ├── puzzleStore (Zustand)
│   └── uiStore (Zustand)
│
└── Workers
    ├── stockfish.worker.js
    └── analysis.worker.js
```

### Backend Service Architecture

```
├── Controllers (HTTP Request Handlers)
│   ├── AuthController
│   ├── GameController
│   ├── PuzzleController
│   ├── UserController
│   └── StatsController
│
├── Services (Business Logic)
│   ├── AuthenticationService
│   ├── ChessGameService
│   ├── PuzzleManagementService
│   ├── ELORatingService
│   ├── SpacedRepetitionService
│   └── AnalyticsService
│
├── Repositories (Data Access)
│   ├── UserRepository
│   ├── GameRepository
│   ├── PuzzleRepository
│   ├── MoveRepository
│   └── SessionRepository
│
├── Models (Data Structures)
│   ├── User
│   ├── Game
│   ├── Move
│   ├── Puzzle
│   └── PuzzleAttempt
│
├── Middleware
│   ├── authMiddleware
│   ├── validationMiddleware
│   ├── rateLimitMiddleware
│   └── errorHandlerMiddleware
│
└── Utils
    ├── jwtUtils
    ├── passwordUtils
    ├── chessUtils
    └── emailUtils
```

---

## Data Flow Architecture

### Authentication Flow

```
┌─────────────────┐    1. Login Request    ┌─────────────────┐
│   Frontend      │ ───────────────────────→│   Auth API      │
│                 │                         │                 │
│                 │    2. Validate Creds    │                 │
│                 │                         │                 │
│                 │    3. Generate JWT      │                 │
│                 │ ←───────────────────────│                 │
│                 │    4. Store Tokens      │                 │
└─────────────────┘                         └─────────────────┘
          │                                           │
          │ 5. Set Auth State                         │
          ▼                                           │
┌─────────────────┐                                   │
│   Auth Store    │                                   │
│   (Zustand)     │                                   │
└─────────────────┘                                   │
          │                                           │
          │ 6. Subsequent API Calls                   │
          │    (Include Bearer Token)                 │
          └─────────────────────────────────────────────┘
```

### Chess Game Flow

```
┌─────────────────┐  1. User Move Input   ┌─────────────────┐
│   ChessBoard    │ ─────────────────────→│   Game Store    │
│   Component     │                       │   (Zustand)     │
└─────────────────┘                       └─────────────────┘
                                                    │
                         2. Validate Move Locally   │
                         (chess.js validation)      │
                                                    ▼
┌─────────────────┐  3. Send Move to API  ┌─────────────────┐
│   Game API      │ ←─────────────────────│   gameService   │
│                 │                       │                 │
│                 │  4. Validate & Store  │                 │
│                 │                       │                 │
│                 │  5. Calculate AI Move │                 │
│                 │     (Stockfish)       │                 │
│                 │                       │                 │
│                 │  6. Return Game State │                 │
│                 │ ─────────────────────→│                 │
└─────────────────┘                       └─────────────────┘
                                                    │
                         7. Update UI State         │
                                                    ▼
┌─────────────────┐    8. Re-render Board  ┌─────────────────┐
│   ChessBoard    │ ←─────────────────────│   Game Store    │
│   Component     │                       │   (Updated)     │
└─────────────────┘                       └─────────────────┘
```

### Puzzle Training Flow

```
┌─────────────────┐  1. Request Puzzle    ┌─────────────────┐
│   PuzzlePage    │ ─────────────────────→│   Puzzle API    │
└─────────────────┘                       └─────────────────┘
                                                    │
                         2. Adaptive Selection      │
                         (User rating + history)    │
                                                    ▼
┌─────────────────┐  3. Return Puzzle     ┌─────────────────┐
│   Puzzle Store  │ ←─────────────────────│ PuzzleService   │
│   (Zustand)     │                       │ + SpacedRep     │
└─────────────────┘                       └─────────────────┘
          │                                           
          │ 4. Render Puzzle Position                 
          ▼                                           
┌─────────────────┐                                   
│   PuzzleBoard   │                                   
│   Component     │                                   
└─────────────────┘                                   
          │                                           
          │ 5. User Solution Attempt                  
          ▼                                           
┌─────────────────┐  6. Submit Solution   ┌─────────────────┐
│   Puzzle API    │ ←─────────────────────│   PuzzleStore   │
│                 │                       │                 │
│                 │  7. Validate Solution │                 │
│                 │                       │                 │
│                 │  8. Update Rating     │                 │
│                 │     (ELO System)      │                 │
│                 │                       │                 │
│                 │  9. Schedule Next     │                 │
│                 │     Review (SM-2)     │                 │
│                 │                       │                 │
│                 │ 10. Return Feedback   │                 │
│                 │ ─────────────────────→│                 │
└─────────────────┘                       └─────────────────┘
```

---

## Security Architecture

### Security Layers and Controls

```
┌─────────────────────────────────────────────────────────┐
│                 ELECTRON SECURITY LAYER                │
├─────────────────────────────────────────────────────────┤
│ • Context Isolation: true                              │
│ • Node Integration: false                              │
│ • Remote Module: disabled                              │
│ • Preload Scripts: sandboxed API exposure             │
│ • Content Security Policy: strict                     │
└─────────────────────────────────────────────────────────┘
                            │
                            │ Secure IPC Bridge
                            ▼
┌─────────────────────────────────────────────────────────┐
│                 FRONTEND SECURITY LAYER                │
├─────────────────────────────────────────────────────────┤
│ • JWT Token Storage: Electron safeStorage API         │
│ • Input Sanitization: DOMPurify for user content      │
│ • Route Protection: Authentication guards              │
│ • XSS Prevention: Content Security Policy             │
│ • API Call Security: HTTPS only, token validation     │
└─────────────────────────────────────────────────────────┘
                            │
                            │ HTTPS REST API
                            ▼
┌─────────────────────────────────────────────────────────┐
│                 API SECURITY LAYER                     │
├─────────────────────────────────────────────────────────┤
│ • Authentication: JWT Bearer Token validation         │
│ • Authorization: Role-based access control            │
│ • Input Validation: express-validator sanitization    │
│ • Rate Limiting: Per-endpoint request throttling      │
│ • CORS: Restricted origin policy                      │
│ • Security Headers: Helmet.js protection              │
└─────────────────────────────────────────────────────────┘
                            │
                            │ Validated Requests
                            ▼
┌─────────────────────────────────────────────────────────┐
│               BUSINESS LOGIC SECURITY LAYER            │
├─────────────────────────────────────────────────────────┤
│ • Password Security: bcrypt with work factor 12       │
│ • Session Management: Secure token rotation           │
│ • Game Validation: Server-side chess rule enforcement │
│ • Anti-Cheat: Move timing and pattern analysis        │
│ • Data Validation: Business rule enforcement          │
└─────────────────────────────────────────────────────────┘
                            │
                            │ Parameterized Queries
                            ▼
┌─────────────────────────────────────────────────────────┐
│                 DATA SECURITY LAYER                    │
├─────────────────────────────────────────────────────────┤
│ • SQL Injection Prevention: Knex.js parameterized     │
│ • Data Encryption: Sensitive data encrypted at rest   │
│ • Transaction Security: ACID compliance               │
│ • Backup Security: Encrypted backup files             │
│ • Access Logging: All data access audited             │
└─────────────────────────────────────────────────────────┘
```

### Authentication & Authorization Flow

```
1. User Registration
   ├─ Password Validation (complexity requirements)
   ├─ Email Verification (optional for POC)
   ├─ Password Hashing (bcrypt work factor 12)
   └─ User Account Creation

2. User Login  
   ├─ Credential Validation
   ├─ Rate Limiting (5 attempts per 15 minutes)
   ├─ JWT Token Generation (access + refresh)
   └─ Secure Token Storage (Electron safeStorage)

3. API Request Authorization
   ├─ Bearer Token Extraction
   ├─ JWT Signature Verification
   ├─ Token Expiration Check
   ├─ User Permission Validation
   └─ Request Processing or Rejection

4. Token Refresh
   ├─ Refresh Token Validation
   ├─ New Access Token Generation
   ├─ Token Rotation (optional)
   └─ Updated Token Storage
```

---

## Performance Architecture

### Frontend Performance Strategy

```
┌─────────────────────────────────────────────────────────┐
│                RENDER PERFORMANCE LAYER                │
├─────────────────────────────────────────────────────────┤
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────┐│
│ │React Optimization│ │Component Caching│ │State Mgmt   ││
│ │                 │ │                 │ │             ││
│ │• useMemo        │ │• React.memo     │ │• Zustand    ││
│ │• useCallback    │ │• LazyLoading    │ │• Minimal    ││
│ │• Code Splitting │ │• Virtual Lists  │ │  Re-renders ││
│ └─────────────────┘ └─────────────────┘ └─────────────┘│
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│              COMPUTATION PERFORMANCE LAYER             │
├─────────────────────────────────────────────────────────┤
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────┐│
│ │Web Workers      │ │Chess.js Cache   │ │Local Storage││
│ │                 │ │                 │ │             ││
│ │• Stockfish Eng  │ │• Position Cache │ │• Game State ││
│ │• Move Analysis  │ │• Legal Moves    │ │• User Prefs ││  
│ │• Non-blocking   │ │• LRU Eviction   │ │• Offline Cap││
│ └─────────────────┘ └─────────────────┘ └─────────────┘│
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│               NETWORK PERFORMANCE LAYER                │
├─────────────────────────────────────────────────────────┤
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────┐│
│ │React Query      │ │Request Batching │ │Offline Queue││
│ │                 │ │                 │ │             ││
│ │• Server Cache   │ │• Multiple Calls │ │• Failed Req ││
│ │• Background     │ │• Single Request │ │• Auto Retry ││
│ │  Refresh        │ │• Deduplication  │ │• Sync Later ││
│ └─────────────────┘ └─────────────────┘ └─────────────┘│
└─────────────────────────────────────────────────────────┘
```

### Backend Performance Strategy

```
┌─────────────────────────────────────────────────────────┐
│               DATABASE PERFORMANCE LAYER               │
├─────────────────────────────────────────────────────────┤
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────┐│
│ │Query Optimization│ │Connection Pool  │ │Indexing     ││
│ │                 │ │                 │ │             ││
│ │• Prepared Stmts │ │• Connection     │ │• Primary    ││
│ │• Index Usage    │ │  Reuse         │ │• Foreign    ││
│ │• Query Planning │ │• Pool Sizing    │ │• Composite  ││
│ └─────────────────┘ └─────────────────┘ └─────────────┘│
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│              COMPUTATIONAL PERFORMANCE LAYER           │
├─────────────────────────────────────────────────────────┤
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────┐│
│ │Chess Engine     │ │Algorithm Cache  │ │Memory Mgmt  ││
│ │                 │ │                 │ │             ││
│ │• Stockfish Node │ │• Position Eval  │ │• Object     ││
│ │• Thread Mgmt    │ │• Opening Book   │ │  Pooling    ││
│ │• Depth Control  │ │• Endgame TB     │ │• Garbage    ││
│ │                 │ │                 │ │  Collection ││
│ └─────────────────┘ └─────────────────┘ └─────────────┘│
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                API PERFORMANCE LAYER                   │
├─────────────────────────────────────────────────────────┤
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────┐│
│ │Response Caching │ │Request Pipeline │ │Load Balancing││
│ │                 │ │                 │ │             ││
│ │• Memory Cache   │ │• Async Handlers │ │• Multi-Core ││
│ │• Redis (Future) │ │• Event Loop     │ │• Clustering ││
│ │• ETags          │ │• Non-blocking   │ │• PM2 (Prod) ││
│ └─────────────────┘ └─────────────────┘ └─────────────┘│
└─────────────────────────────────────────────────────────┘
```

---

## POC Extensibility Design

The POC architecture provides clean extension points for future features:

### Future-Ready Design Patterns

#### Database Schema Compatibility
- SQLite schema designed to be PostgreSQL-compatible
- Normalized structure supports efficient querying at scale
- Proper indexing strategy for performance optimization

#### Stateless Service Architecture  
- Backend services don't maintain session state
- All state stored in database or client
- Clean separation between authentication and business logic

#### Modular Component Design
- Chess game logic separated from UI presentation
- Puzzle system can accommodate different puzzle sources
- AI integration abstracted for multiple engine support

### Extension Points for Future Features

```
┌─────────────────────────────────────────────────────────┐
│                 EXTENSION ARCHITECTURE                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Multiplayer Extensions                                  │
│ ├─ Game Service → supports multiple players            │
│ ├─ WebSocket layer for real-time communication         │
│ └─ Matchmaking service integration                     │
│                                                         │
│ Cloud Migration Points                                  │
│ ├─ SQLite → PostgreSQL (schema compatible)             │
│ ├─ Local files → Object storage (S3/CloudFlare)        │
│ └─ Single instance → Load balanced cluster             │
│                                                         │
│ Mobile App Integration                                  │
│ ├─ REST API already mobile-friendly                    │
│ ├─ JWT authentication works across platforms           │
│ └─ Business logic independent of Electron              │
└─────────────────────────────────────────────────────────┘
```

---

## Technology Integration Patterns

### Chess.js Integration Architecture

```typescript
// Chess Logic Service Pattern
interface IChessEngine {
  validateMove(fen: string, move: Move): MoveResult;
  generateLegalMoves(fen: string): Move[];
  isGameOver(fen: string): GameEndState;
  analyzeTactics(fen: string): TacticalAnalysis;
}

class ChessEngineService implements IChessEngine {
  private chess: Chess;
  private cache: Map<string, any>;
  
  constructor() {
    this.chess = new Chess();
    this.cache = new Map();
  }
  
  validateMove(fen: string, move: Move): MoveResult {
    // Implementation with caching and error handling
  }
}
```

### Stockfish.js Integration Architecture  

```typescript
// Web Worker Pattern for Stockfish
class StockfishManager {
  private workers: StockfishWorker[];
  private taskQueue: AnalysisTask[];
  
  async analyzePosition(fen: string, depth: number): Promise<Analysis> {
    return this.queueAnalysis({
      fen,
      depth,
      priority: 'normal',
      callback: this.handleAnalysisComplete.bind(this)
    });
  }
  
  private distributeWork(): void {
    // Round-robin work distribution
    // Priority queue management
    // Resource monitoring
  }
}
```

### React + Electron Integration Pattern

```typescript
// Secure IPC Bridge Pattern
// preload.ts
import { contextBridge, ipcRenderer } from 'electron';

const API = {
  // Chess operations
  chess: {
    createGame: (config: GameConfig) => 
      ipcRenderer.invoke('chess:create-game', config),
    makeMove: (gameId: string, move: Move) => 
      ipcRenderer.invoke('chess:make-move', gameId, move),
    analyzePosition: (fen: string) => 
      ipcRenderer.invoke('chess:analyze-position', fen)
  },
  
  // File operations
  files: {
    savePGN: (data: string, filename: string) =>
      ipcRenderer.invoke('files:save-pgn', data, filename),
    loadPGN: (filepath: string) =>
      ipcRenderer.invoke('files:load-pgn', filepath)
  },
  
  // System integration
  system: {
    showNotification: (options: NotificationOptions) =>
      ipcRenderer.send('system:notify', options),
    minimizeToTray: () =>
      ipcRenderer.send('system:minimize-to-tray')
  }
};

contextBridge.exposeInMainWorld('electronAPI', API);
```

---

## Development Architecture

### Development Workflow Architecture

```
┌─────────────────────────────────────────────────────────┐
│                DEVELOPMENT ENVIRONMENT                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Code Organization                                       │
│ ├─ Monorepo Structure                                  │
│ ├─ Shared TypeScript Types                             │
│ ├─ Common Utilities                                    │
│ └─ Unified Build System                                │
│                                                         │
│ Development Tools                                       │
│ ├─ electron-vite (Build System)                       │
│ ├─ TypeScript (Type Safety)                           │
│ ├─ ESLint + Prettier (Code Quality)                   │
│ └─ Husky + lint-staged (Pre-commit)                   │
│                                                         │
│ Testing Architecture                                    │
│ ├─ Jest (Unit Testing)                                │
│ ├─ React Testing Library (Component Testing)          │
│ ├─ Playwright (E2E Testing)                           │
│ └─ Supertest (API Testing)                            │
│                                                         │
│ Hot Reload System                                       │
│ ├─ Vite HMR (Frontend)                                │
│ ├─ Nodemon (Backend)                                  │
│ └─ Electron Auto-restart                              │
└─────────────────────────────────────────────────────────┘
```

### Build Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    BUILD PIPELINE                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Source Code Processing                                  │
│ ├─ TypeScript Compilation                              │
│ ├─ Asset Processing (images, fonts)                   │
│ ├─ Code Minification                                   │
│ └─ Tree Shaking                                        │
│                                                         │
│ Bundle Generation                                       │
│ ├─ Main Process Bundle                                 │
│ ├─ Renderer Process Bundle                             │
│ ├─ Preload Script Bundle                               │
│ └─ Web Worker Bundles                                  │
│                                                         │
│ Platform Packaging                                      │
│ ├─ Windows (NSIS Installer)                           │
│ ├─ macOS (DMG + App Store)                            │
│ └─ Linux (AppImage + DEB)                             │
│                                                         │
│ Distribution                                            │
│ ├─ GitHub Releases                                     │
│ ├─ Auto-update System                                 │
│ └─ Code Signing                                        │
└─────────────────────────────────────────────────────────┘
```

---

## Deployment Architecture

### POC Deployment Strategy

```
┌─────────────────────────────────────────────────────────┐
│                 LOCAL DEVELOPMENT                      │
├─────────────────────────────────────────────────────────┤
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────┐│
│ │Frontend Dev     │ │Backend Dev      │ │Database     ││
│ │                 │ │                 │ │             ││
│ │• Vite Dev Server│ │• Express Server │ │• SQLite     ││
│ │• localhost:5173 │ │• localhost:3000 │ │• Local File ││
│ │• Hot Module     │ │• Nodemon        │ │• ./chess.db ││
│ │  Replacement    │ │  Auto-restart   │ │             ││
│ └─────────────────┘ └─────────────────┘ └─────────────┘│
└─────────────────────────────────────────────────────────┘
                            │
                            │ electron-vite build
                            ▼
┌─────────────────────────────────────────────────────────┐
│                 PRODUCTION BUILD                       │
├─────────────────────────────────────────────────────────┤
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────┐│
│ │Electron App     │ │Bundled Assets   │ │Embedded DB  ││
│ │                 │ │                 │ │             ││
│ │• Main Process   │ │• Minified JS    │ │• SQLite     ││
│ │• Renderer       │ │• Compressed CSS │ │• Migrations ││
│ │• Preload        │ │• Optimized      │ │• Initial    ││
│ │• Workers        │ │  Images         │ │  Data       ││
│ └─────────────────┘ └─────────────────┘ └─────────────┘│
└─────────────────────────────────────────────────────────┘
                            │
                            │ electron-builder
                            ▼
┌─────────────────────────────────────────────────────────┐
│              PLATFORM DISTRIBUTIONS                    │
├─────────────────────────────────────────────────────────┤
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────┐│
│ │Windows Package  │ │macOS Package    │ │Linux Package││
│ │                 │ │                 │ │             ││
│ │• chess-train.exe│ │• ChessTrain.dmg │ │• chess.AppImage │
│ │• NSIS Installer │ │• Code Signed    │ │• chess.deb  ││
│ │• Auto Updater   │ │• Notarized      │ │• Auto Update││
│ └─────────────────┘ └─────────────────┘ └─────────────┘│
└─────────────────────────────────────────────────────────┘
```

---

## POC Architecture Validation

### Architecture Review Checklist

#### ✅ **Core Functionality Validation**
- [ ] Chess game logic fully implemented with chess.js
- [ ] AI opponents working with Stockfish integration
- [ ] Puzzle training system with spaced repetition
- [ ] User authentication and profile management
- [ ] Local SQLite database operations

#### ✅ **Security Validation** 
- [ ] Electron security best practices implemented
- [ ] JWT authentication properly configured
- [ ] Input validation and sanitization working
- [ ] Password hashing with bcrypt implemented
- [ ] Secure token storage using safeStorage API

#### ✅ **Performance Validation**
- [ ] Chess moves validate under 100ms
- [ ] Stockfish analysis runs in Web Workers (non-blocking)
- [ ] Puzzle loading under 500ms
- [ ] Application startup under 3 seconds
- [ ] Memory usage under 512MB during normal operation

#### ✅ **Desktop Application Validation**
- [ ] Cross-platform compatibility (Windows, macOS, Linux)
- [ ] Offline functionality working properly
- [ ] File system integration (PGN import/export)
- [ ] System notifications working
- [ ] Auto-updater mechanism implemented

#### ✅ **Code Quality Validation**
- [ ] TypeScript types properly defined
- [ ] SRP and DRY principles followed
- [ ] No mock implementations or hard-coded responses
- [ ] Error handling comprehensive
- [ ] Test coverage adequate for POC

---

**Architecture Status:** ✅ **COMPLETE - IMPLEMENTATION READY**

This architecture document provides the foundation for:
1. **Backend Implementation** - Service layer patterns and data flow
2. **Frontend Implementation** - Component hierarchy and state management  
3. **Integration Patterns** - How all pieces connect securely
4. **Quality Assurance** - Performance, security, and scalability guidelines
5. **Future Scaling** - Migration path to cloud deployment

**Next Phase:** Revise API Documentation to follow this architecture, then complete Database Schema and component documentation.