# POC Implementation Plan

## ✅ Research-Aligned Technology Stack

**This implementation plan now uses research-validated technology choices** based on actual data from `TECHNICAL-DECISIONS-RESEARCH.md`:

- **Zustand** (3.53KB) - 91% smaller than Redux Toolkit, proven performance for chess apps
- **axios** - Superior JWT authentication patterns and error handling for real-time games  
- **TanStack Query** - Best-in-class server state management with WebSocket integration
- **React Hook Form** (12.12KB) - 6x smaller than Formik, actively maintained
- **React Spring** (19KB) - Physics-based animations ideal for chess piece movement
- **Howler.js** - Cross-browser audio with mobile optimization for chess sounds
- **Vite** - 16x faster startup than CRA, modern ES modules approach
- **Vitest + Playwright** - Modern testing stack with superior performance

> All major technology decisions are now backed by real research data, performance benchmarks, and evidence-based analysis rather than assumptions.

## 📝 TERMINOLOGY GUIDE

**To avoid confusion, this document uses consistent terminology:**

- **🎯 Objectives**: High-level goals listed in this document (Objective 1, 2, 3, etc.)
  - These are strategic areas requiring analysis and planning before implementation
  - Most objectives require breaking down into multiple implementation steps
- **🔧 Steps**: Standard implementation work breakdown for each objective
  - **Step 1: Analysis & Discovery** - Examine code to understand specific issues and patterns
  - **Step 2: Design & Planning** - Determine technical approach and create implementation plan
  - **Step 3: Implementation** - Execute the planned code changes with build verification
  - **Step 4: Testing & Validation** - Verify functionality works correctly after changes
  - **Step 5: Documentation & Tracking** - Create lessons learned doc and update implementation plan
  - **Step 6: Git & Deployment Workflow** - Commit, push, and deploy via CI/CD pipeline
  - **Step 7: Quality Assurance Final Check** - Verify all completion requirements are met
- **✅ Subtasks**: Specific actionable items within each step
  - Each step contains multiple subtasks that must be completed
  - Subtasks are the actual work items that can be checked off
  - Example: Step 1 might have subtasks like "Audit error handling patterns", "Catalog parsing violations", etc.
- **📚 Objective Documentation**: Completion documentation files
  - `OBJ_01_AUTHENTICATION_FOUNDATION.md` (Example frontend Objective)

**Summary**: Work on each **Objective** involves multiple **steps** and results in **Objective documentation** when complete.

## 🛠️ IMPLEMENTATION TOOLS & REQUIREMENTS

### **📋 MANDATORY PRE-WORK FOR ALL OBJECTIVES**

**Before beginning ANY objective work, you MUST:**

1. **📖 Read Project Knowledge Base**

   - **Location**: `/mnt/c/Projects/chess-training/docs/frontend/`
   - **Requirement**: Read ALL relevant project knowledge documents (ALWAYS READ THE ENTIRE DOCUMENT NOT SNIPPETS)
   - **Purpose**: Understand existing architecture, patterns, and decisions
   - **Files to Review**: All `.md` files in summaries directory for context

2. **📚 Read Complete implementation Plan**
   - **This Document**: `/mnt/c/Projects/chess-training/docs/frontend/04-poc-implementation-plan.md`
   - **Understanding**: Methodology, terminology, success criteria
   - **Context**: How current objective fits into overall implementation strategy

3. **🔌 Understand POC API Architecture**
   - **API Documentation**: `/mnt/c/Projects/chess-training/docs/API_DOCUMENTATION.md`
   - **Base URL**: `http://localhost:3000/api`
   - **Authentication**: JWT tokens via API endpoints
   - **Architecture**: Frontend → HTTP API → Backend → SQLite

### **🎯 IMPLEMENTATION APPROACH**

**Required Process for Each Objective:**

1. **Knowledge Gathering**: Read project summaries + implementation plan + API docs
2. **Systematic Implementation**: Follow 7-step methodology
3. **Documentation**: Create Objective documentation with lessons learned
4. **Quality Assurance**: Verify all completion criteria

**⚠️ CRITICAL**: Using proper tools and reading project context is mandatory for successful objective completion. This ensures accuracy, maintains consistency, and leverages established architectural knowledge.

### **🚀 AUTONOMOUS EXECUTION REQUIREMENTS**

**CRITICAL: Agents must complete objectives autonomously without stopping to ask questions.**

**🛭 FIX ALL ISSUES ENCOUNTERED:**

- **Never stop to ask "should I fix this?"** - If you discover issues during your objective work, **FIX THEM**
- **Scope Boundary**: Fix any issues **within your objective scope** - don't hesitate
- **Code Issues**: TypeScript errors, interface mismatches, missing methods, type conflicts - **FIX THEM ALL**
- **Build Issues**: If `npm run build` fails due to your changes, **FIX THE ERRORS** until build passes
- **Integration Issues**: If services don't integrate properly, **FIX THE INTEGRATION**

**❗ DO NOT STOP FOR:**

- TypeScript compilation errors - Fix them
- Missing interface methods - Add them
- Type mismatches - Resolve them
- Build failures - Fix them
- Integration problems - Solve them

**🎯 COMPLETE ALL 7 STEPS:**

- **Step 5**: Documentation & Tracking - **MANDATORY** update of implementation plan tracking table
- **Step 6**: Git & Deployment - **MANDATORY** commit ALL changes and push via CI/CD
- **Step 7**: Quality Assurance - **MANDATORY** verify ALL completion criteria

**🎯 GOAL**: Complete objective with working code, passing build, complete documentation, and updated tracking.

### **🚨 MANDATORY COMPLETION VERIFICATION FOR HAIKU AGENTS**

**CRITICAL**: Due to Haiku agent limitations, these verification steps are MANDATORY before claiming completion:

**📋 COMPLETION CHECKLIST - ALL MUST BE VERIFIED:**

1. **✅ Code Changes Verification**:

   - Run `git status` and verify files were actually modified
   - Run `git diff` and verify the changes match the objective scope
   - Verify ALL changed files are staged with `git add .`

2. **✅ Build Verification**:

   - Run `npm run build` in frontend directory and verify ZERO TypeScript errors
   - If build fails, DO NOT claim completion until fixed
   - Screenshot or copy the build success output

3. **✅ Documentation Creation**:

   - Create `/mnt/c/Projects/chess-training/docs/frontend/objectives/OBJ_0X_OBJECTIVE_NAME.md`
   - Include quantified results, technical details, and architectural insights
   - Verify the file exists with `ls -la /mnt/c/Projects/chess-training/docs/frontend/objectives/OBJ_0*`

4. **✅ Tracking Table Update**:

   - Open `/mnt/c/Projects/chess-training/docs/frontend/04-poc-implementation-plan.md`
   - Find the objective in the tracking table
   - Change status from "❌ **NOT STARTED**" to "✅ **COMPLETED**"
   - Verify the change with `grep "Objective XX.*COMPLETED" /mnt/c/Projects/chess-training/docs/frontend/04-poc-implementation-plan.md`

5. **✅ Git Workflow Completion**:

   - Run `git add .` to stage all changes
   - Run `git commit -m "Objective 0X: Objective Name - [summary]"`
   - Run `git push origin development`
   - Verify commit with `git log --oneline | head -1`

6. **✅ CI/CD Verification**:
   - Run `gh run list --limit 1` to get latest run ID
   - Monitor with `gh run watch [run-id]` until completion
   - Verify successful deployment

**🚫 DO NOT CLAIM COMPLETION UNLESS ALL 6 STEPS VERIFIED SUCCESSFUL**

**If ANY step fails, the objective is NOT complete - continue working until ALL steps pass.**

## Objective 1: Authentication Foundation & Project Setup

### Objective

Build a working authentication system from scratch that integrates with the existing backend API. At the end of this objective, you'll have a functional app where users can register, login, and access protected routes.

### Step 1: Initialize Project from Scratch

**Goal:** Create a new React project with the exact folder structure needed

**Actions:**
1. **Create the project:**
   ```bash
   cd /mnt/c/Projects/chess-training/
   npm create vite@latest frontend -- --template react-ts
   cd frontend
   npm install
   ```

2. **Install all required dependencies (research-backed choices):**
   ```bash
   # UI Framework (research-validated: Chakra UI)
   npm install @chakra-ui/react @emotion/react @emotion/styled
   
   # State Management & API (research-validated)
   npm install zustand axios js-cookie react-router-dom @tanstack/react-query
   
   # Chess Libraries (research-validated)
   npm install chess.js react-chessboard
   
   # Chess Engine (research-validated: CRITICAL for AI opponents and analysis)
   npm install stockfish
   
   # Additional research-validated dependencies  
   npm install @types/chess.js @hookform/resolvers zod
   
   # Forms (research-validated: React Hook Form - 6x smaller than Formik)
   npm install react-hook-form @hookform/resolvers zod
   
   # Animations (research-validated: React Spring - better for chess physics)
   npm install @react-spring/web
   
   # Audio (research-validated: Howler.js - superior mobile handling)
   npm install howler
   
   # Testing (research-validated: Vitest + Playwright)
   npm install -D vitest @testing-library/react @testing-library/jest-dom @playwright/test
   
   # Development & Types
   npm install -D @types/js-cookie @types/node @types/howler
   ```

   > **Research Alignment**: All dependencies now reflect research-validated choices from `TECHNICAL-DECISIONS-RESEARCH.md` with evidence-based rationale for each selection.

3. **Create the complete folder structure (research-aligned):**
   ```bash
   # Research-validated project structure from docs/frontend/12-project-structure.md
   mkdir -p src/components/{auth,chess,puzzles,analysis,ui,layout,audio}
   mkdir -p src/pages/{auth,chess,puzzles,analysis,profile,help}
   mkdir -p src/services/{api,chess,audio,learning,data,cache}
   mkdir -p src/hooks src/stores src/types src/utils src/constants
   mkdir -p src/assets/{audio,stockfish,images,data}
   mkdir -p tests/{unit,integration,e2e}
   ```

4. **Test that everything works:**
   ```bash
   npm run dev
   ```
   → Should see Vite + React welcome page at http://localhost:5173

**Milestone:** You have a running React app with all dependencies installed

### Step 2: Configure Environment and Theme

**Goal:** Set up the foundation so the app can connect to the backend

**Actions:**
1. **Create environment configuration:**
   ```bash
   # Create .env file
   echo "VITE_API_BASE_URL=http://localhost:3000/api" > .env
   ```

2. **Set up research-validated providers and theme:**
   - Configure TanStack Query provider with optimized caching settings
   - Set up Chakra UI provider with chess-themed color scheme
   - Initialize Howler.js AudioProvider for chess sound effects
   - Configure app providers in correct dependency order

3. **Configure testing and build tools (research-validated):**
   - Set up Vitest configuration (5x faster than Jest)
   - Configure Playwright for E2E testing with chess-specific scenarios
   - Add test setup files for React Testing Library + Vitest
   - Configure build optimizations for chess libraries

**Milestone:** App runs with Chakra UI theme and can access environment variables

### Step 3: Build API Client System

**Goal:** Create the foundation for talking to the backend API

**Actions:**
1. **Create research-validated API client system (`src/services/api/ApiClient.ts`):**
   - Configure axios with base URL, JWT interceptors, and auto-refresh
   - Add request/response interceptors for token injection
   - Implement automatic token refresh on 401 responses
   - Add comprehensive error handling and timeouts

2. **Create SRP-compliant API clients (following architecture document):**
   
   **`src/services/api/AuthApiClient.ts`** - Authentication domain only:
   - POST /auth/register - User registration
   - POST /auth/login - User authentication  
   - POST /auth/refresh - Token refresh
   - POST /auth/logout - User logout
   
   **`src/services/api/UserApiClient.ts`** - User profile domain only:
   - GET /user/profile - Get user info for dashboard
   - PUT /user/profile - Update user preferences
   
   **`src/services/api/StatsApiClient.ts`** - Statistics domain only:
   - GET /stats/dashboard - Dashboard statistics and overview

3. **Create SRP-compliant TypeScript interfaces (separate domain files):**
   
   **`src/types/auth.ts`** - Authentication domain only:
   - LoginCredentials, RegisterData, AuthResponse, AuthTokens interfaces
   
   **`src/types/user.ts`** - User profile domain only:  
   - User, UserProfile, UserPreferences interfaces
   
   **`src/types/stats.ts`** - Statistics domain only:
   - DashboardStats, GameSummary, ProgressData interfaces

4. **Add TanStack Query integration patterns:**
   
   **`src/hooks/api/useAuthQueries.ts`** - Authentication TanStack Query hooks:
   ```typescript
   import { useMutation, useQueryClient } from '@tanstack/react-query';
   import { AuthApiClient } from '@/services/api/AuthApiClient';
   
   // Login mutation with automatic cache invalidation
   export const useLogin = () => {
     const queryClient = useQueryClient();
     return useMutation({
       mutationFn: AuthApiClient.login,
       onSuccess: (data) => {
         // Cache user data and invalidate related queries
         queryClient.setQueryData(['user', 'profile'], data.user);
         queryClient.invalidateQueries({ queryKey: ['stats'] });
       },
       onError: (error) => {
         console.error('Login failed:', error);
       }
     });
   };
   
   // Registration mutation with success handling
   export const useRegister = () => {
     return useMutation({
       mutationFn: AuthApiClient.register,
       onSuccess: () => {
         // Handle successful registration
       }
     });
   };
   ```
   
   **`src/hooks/api/useUserQueries.ts`** - User profile TanStack Query hooks:
   ```typescript
   import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
   import { UserApiClient } from '@/services/api/UserApiClient';
   
   // User profile query with 5-minute cache
   export const useUserProfile = () => {
     return useQuery({
       queryKey: ['user', 'profile'],
       queryFn: UserApiClient.getProfile,
       staleTime: 5 * 60 * 1000, // 5 minutes
       gcTime: 10 * 60 * 1000, // 10 minutes
     });
   };
   
   // Profile update mutation with optimistic updates
   export const useUpdateProfile = () => {
     const queryClient = useQueryClient();
     return useMutation({
       mutationFn: UserApiClient.updateProfile,
       onMutate: async (newProfile) => {
         // Optimistic update
         await queryClient.cancelQueries({ queryKey: ['user', 'profile'] });
         const previousProfile = queryClient.getQueryData(['user', 'profile']);
         queryClient.setQueryData(['user', 'profile'], newProfile);
         return { previousProfile };
       },
       onError: (err, newProfile, context) => {
         // Rollback on error
         queryClient.setQueryData(['user', 'profile'], context?.previousProfile);
       },
       onSettled: () => {
         // Refetch to ensure consistency
         queryClient.invalidateQueries({ queryKey: ['user', 'profile'] });
       }
     });
   };
   ```

5. **Test API connection:**
   - Create simple test to verify backend connection  
   - Ensure API calls work with existing backend
   - Test TanStack Query integration and caching behavior

**Milestone:** API client can successfully communicate with backend auth endpoints with optimized caching

### Step 4: Build Authentication State Management

**Goal:** Create a state system that manages user authentication

**Actions:**
1. **Create SRP-compliant domain stores (following architecture document):**
   
   **`src/stores/authStore.ts`** - Authentication state only:
   - Authentication tokens, login status, loading states
   - Login/logout actions connected to AuthApiClient only
   - Token refresh and session management
   
   **`src/stores/userStore.ts`** - User profile state only:
   - User profile data, preferences, profile loading states  
   - Profile update actions connected to UserApiClient only
   
   **`src/stores/progressStore.ts`** - Progress and statistics state only (matching project structure doc):
   - Progress statistics data, loading states for stats
   - Stats refresh actions connected to StatsApiClient only

2. **Create SRP-compliant domain hooks:**
   
   **`src/hooks/useAuth.ts`** - Authentication business logic only:
   - Wrap authStore, handle login/logout flows only
   - Token refresh and session persistence logic
   
   **`src/hooks/useUser.ts`** - User profile business logic only:
   - Wrap userStore, handle profile data and preferences only
   
   **`src/hooks/useProgress.ts`** - Progress and statistics business logic only (matching project structure doc):
   - Wrap progressStore, handle stats loading and display only

3. **Test state management:**
   - Verify store updates when calling actions
   - Verify persistence across browser refresh
   - Test error handling scenarios

**Milestone:** Authentication state works and persists across sessions

### Step 5: Build UI Components from Simple to Complex

**Goal:** Create reusable UI components that will be used throughout the app

**Actions:**
1. **Create basic UI components:**
   - `src/components/ui/Button.tsx` - Styled button with variants
   - `src/components/ui/Input.tsx` - Form input with validation states
   - `src/components/ui/Card.tsx` - Container component
   - Test each component renders correctly

2. **Create research-validated authentication forms:**
   - `src/components/auth/LoginForm.tsx` - React Hook Form with Zod validation (6x smaller than Formik)
   - `src/components/auth/RegisterForm.tsx` - Integrated with TanStack Query mutations
   - Connect forms to Zustand auth store and TanStack Query
   - Add React Spring animations for form feedback

3. **Create layout components:**
   - `src/components/layout/AppLayout.tsx` - Main app wrapper
   - `src/components/layout/Header.tsx` - Navigation header
   - Create responsive layout structure

**Milestone:** UI components render correctly and handle user interactions

### Step 6: Build Authentication Pages

**Goal:** Create complete pages where users can login and register

**Actions:**
1. **Create login page (`src/pages/auth/LoginPage.tsx`):**
   - Use LoginForm component
   - Handle successful login (redirect to dashboard)
   - Handle login errors (display to user)
   - Add link to register page

2. **Create register page (`src/pages/auth/RegisterPage.tsx`):**
   - Use RegisterForm component  
   - Handle successful registration
   - Handle validation errors
   - Add link to login page

3. **Create landing page (`src/pages/LandingPage.tsx`):**
   - Welcome message for unauthenticated users
   - Navigation to login/register
   - Simple, clean design

**Milestone:** Users can visit login/register pages and see proper forms

### Step 7: Implement Routing and Protection

**Goal:** Set up navigation so users can move between pages and protect authenticated routes

**Actions:**
1. **Configure React Router (`src/router/index.tsx`):**
   - Set up routes for landing, login, register
   - Set up protected route wrapper
   - Configure route redirects

2. **Create protected route component (`src/components/auth/ProtectedRoute.tsx`):**
   - Check authentication status
   - Redirect unauthenticated users to login
   - Show loading spinner while checking auth

3. **Create dashboard placeholder (`src/pages/DashboardPage.tsx`):**
   - Simple page that shows "Welcome [user]"
   - Only accessible when authenticated
   - Has logout button

4. **Test routing:**
   - Verify unauthenticated users see landing page
   - Verify protected routes redirect to login
   - Verify authenticated users can access dashboard

**Milestone:** Complete authentication flow works end-to-end

### Step 8: Integration Testing and Polish

**Goal:** Verify everything works together and fix any issues

**Actions:**
1. **Test complete user flows:**
   - New user registration → login → access dashboard
   - Existing user login → access dashboard → logout
   - Invalid credentials → error display
   - Session persistence across browser refresh

2. **Fix any integration issues:**
   - Ensure API calls work with actual backend
   - Fix any TypeScript errors
   - Handle edge cases and error states

3. **Add finishing touches:**
   - Loading states during API calls
   - Success/error toast notifications
   - Proper error handling and user feedback

**Milestone:** Complete authentication system works flawlessly

### Files to Create/Modify in Objective 1

**New Files Created:**
```
src/
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── ProtectedRoute.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   └── layout/
│       ├── AppLayout.tsx
│       └── Header.tsx
├── pages/
│   ├── LandingPage.tsx
│   ├── DashboardPage.tsx
│   └── auth/
│       ├── LoginPage.tsx
│       └── RegisterPage.tsx
├── services/
│   └── api/
│       ├── ApiClient.ts
│       ├── AuthApiClient.ts
│       ├── UserApiClient.ts
│       └── StatsApiClient.ts
├── stores/
│   ├── authStore.ts
│   ├── userStore.ts
│   └── progressStore.ts
├── hooks/
│   ├── useAuth.ts
│   ├── useUser.ts
│   └── useProgress.ts
├── types/
│   ├── auth.ts
│   ├── user.ts
│   └── stats.ts
├── router/
│   └── index.tsx
├── theme/
│   └── index.ts
└── utils/
    └── constants.ts

Root Files:
├── .env
├── vitest.config.ts
├── playwright.config.ts
└── tsconfig.json (updated)

Modified Files:
├── src/main.tsx (providers setup)
├── src/App.tsx (router integration)
├── package.json (dependencies)
└── vite.config.ts (build optimization)
```

### Final Deliverables

When this objective is complete, you will have:

- ✅ **Working React app** that starts with `npm run dev`
- ✅ **User registration** - new users can create accounts via backend API
- ✅ **User login** - users can authenticate via backend API  
- ✅ **Protected routes** - dashboard only accessible when authenticated
- ✅ **Session persistence** - authentication survives browser refresh
- ✅ **Error handling** - API errors displayed to users properly
- ✅ **Responsive UI** - works on desktop and mobile
- ✅ **Clean architecture** - follows SRP and domain organization

### How to Validate Success

After completing this objective, you should be able to:

1. **Start the app:** `npm run dev` → app loads at http://localhost:5173
2. **Register:** Create new account → redirected to dashboard
3. **Login:** Use credentials → access dashboard with user name
4. **Logout:** Click logout → redirected to landing page  
5. **Protection:** Visit /dashboard without auth → redirected to login
6. **Persistence:** Refresh browser → stay logged in

## Objective 2: Chess Game Integration

### Objective

Add chess gameplay to your existing authenticated app. At the end of this objective, users will be able to play full chess games against the AI through your frontend, with all game logic handled by the backend API.

### Step 1: Set Up Chess API Integration

**Goal:** Connect your frontend to the backend's chess game endpoints

**Actions:**
1. **Create SRP-compliant game API client (`src/services/api/GameApiClient.ts`):**
   
   **Single Domain Responsibility: Chess Game Management Only**
   - **POST** `/games/create` - Start new game vs AI with difficulty level (1-5)
   - **POST** `/games/:gameId/move` - Submit player move, receive AI response 
   - **GET** `/games/:gameId` - Get current game state (FEN, PGN, status)
   - **GET** `/games/history` - Get user's completed games list
   
   **API Response Integration:**
   - Handle game creation response with gameId and initialFen
   - Process move responses with gameState, aiMove, and legality checking
   - Manage error responses for illegal moves and invalid game states

2. **Create chess types matching exact backend API responses (`src/types/chess.ts`):**
   
   **Game Creation Response:**
   ```typescript
   interface GameCreateResponse {
     success: boolean;
     gameId: string;
     initialFen: string;
   }
   ```
   
   **Move Response:**
   ```typescript
   interface MoveResponse {
     success: boolean;
     legal: boolean;
     gameState: {
       fen: string;
       turn: 'white' | 'black';
       check: boolean;
       gameOver: boolean;
       result: string | null;
     };
     aiMove?: {
       from: string;
       to: string;
       san: string;
     };
     error?: string; // For illegal moves
   }
   ```
   
   **Game State Response:**
   ```typescript
   interface GameState {
     id: string;
     aiLevel: number;
     currentFen: string;
     pgn: string;
     result: string | null;
     gameOver: boolean;
   }
   ```

3. **Add TanStack Query integration patterns for chess games:**
   
   **`src/hooks/api/useGameQueries.ts`** - Chess game TanStack Query hooks:
   ```typescript
   import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
   import { GameApiClient } from '@/services/api/GameApiClient';
   
   // Create new game mutation
   export const useCreateGame = () => {
     const queryClient = useQueryClient();
     return useMutation({
       mutationFn: GameApiClient.createGame,
       onSuccess: (data) => {
         // Cache new game data
         queryClient.setQueryData(['game', data.gameId], data);
         // Invalidate game history to include new game
         queryClient.invalidateQueries({ queryKey: ['games', 'history'] });
       }
     });
   };
   
   // Make move mutation with optimistic updates
   export const useMakeMove = (gameId: string) => {
     const queryClient = useQueryClient();
     return useMutation({
       mutationFn: (move: MoveRequest) => GameApiClient.makeMove(gameId, move),
       onMutate: async (move) => {
         // Cancel outgoing queries and optimistically update
         await queryClient.cancelQueries({ queryKey: ['game', gameId] });
         const previousGame = queryClient.getQueryData(['game', gameId]);
         
         // Optimistically update game state (simplified)
         queryClient.setQueryData(['game', gameId], (old: any) => ({
           ...old,
           // Add optimistic move update logic here
         }));
         
         return { previousGame };
       },
       onError: (err, move, context) => {
         // Rollback optimistic update on error
         queryClient.setQueryData(['game', gameId], context?.previousGame);
       },
       onSettled: () => {
         // Always refetch to ensure server state consistency
         queryClient.invalidateQueries({ queryKey: ['game', gameId] });
       }
     });
   };
   
   // Game state query with short cache for real-time gameplay
   export const useGameState = (gameId: string) => {
     return useQuery({
       queryKey: ['game', gameId],
       queryFn: () => GameApiClient.getGameState(gameId),
       staleTime: 30 * 1000, // 30 seconds for active games
       gcTime: 5 * 60 * 1000, // 5 minutes
       enabled: !!gameId,
       refetchOnWindowFocus: true, // Sync when user returns to tab
     });
   };
   
   // Game history query with longer cache
   export const useGameHistory = () => {
     return useQuery({
       queryKey: ['games', 'history'],
       queryFn: GameApiClient.getGameHistory,
       staleTime: 5 * 60 * 1000, // 5 minutes
       gcTime: 15 * 60 * 1000, // 15 minutes
     });
   };
   ```

4. **Test API integration:**
   - Create a simple test to create a game via API
   - Submit a test move and verify response  
   - Ensure backend connection works properly
   - Test TanStack Query caching and optimistic updates

**Milestone:** You can successfully create games and make moves via backend API with optimized caching

### Step 2: Set Up Chess State Management

**Goal:** Create state system to manage chess games in the frontend

**Actions:**
1. **Create game store (`src/stores/gameStore.ts`):**
   - Define GameState with current game, position, move history
   - Add actions: createGame, makeMove, resetGame
   - Connect actions to GameApiClient methods
   - Handle loading states and errors

2. **Create chess game hook (`src/hooks/useChessGame.ts`):**
   - Wrap game store functionality
   - Add business logic for move validation feedback
   - Handle game state synchronization with backend
   - Manage game status updates (playing, checkmate, draw)

3. **Test state management:**
   - Verify store updates when making moves
   - Test game creation and state initialization
   - Verify error handling for invalid moves

**Milestone:** Chess game state management works and stays in sync with backend

### Step 3: Integrate Chess Board Component

**Goal:** Add a visual chess board that players can interact with

**Actions:**
1. **Install and configure react-chessboard:**
   - Ensure chess.js and react-chessboard are installed
   - Create wrapper component for chess board
   - Configure board themes and piece sets

2. **Create research-validated ChessBoard wrapper (`src/components/chess/ChessBoardWrapper.tsx`):**
   - Integrate react-chessboard with Zustand game store
   - Add React Spring animations for piece movements
   - Connect to Howler.js for move sound effects (capture, check, etc.)
   - Implement square highlighting and move validation feedback

3. **Test board functionality:**
   - Verify board displays current game position
   - Test that clicking/dragging pieces triggers moves
   - Ensure moves are sent to backend and board updates
   - Test board responds to game state changes

**Milestone:** Interactive chess board that connects to your game state

### Step 4: Integrate AI Opponents (Research-Validated CRITICAL)

**Goal:** Add Stockfish AI opponents for intelligent chess gameplay

**Actions:**
1. **Create Stockfish service (`src/services/StockfishService.ts`):**
   - Import and initialize Stockfish engine in Web Worker
   - Implement position analysis and best move calculation
   - Add difficulty mapping (Easy: depth 5, Medium: depth 10, Hard: depth 15)
   - Handle engine communication via message queues

2. **Create AI integration hook (`src/hooks/useStockfishAI.ts`):**
   - Hook for getting AI moves based on current position
   - Handle AI thinking time and loading states
   - Integrate with game state for AI move processing
   - Add error handling for engine failures

3. **Integrate AI into chess game:**
   - Modify game flow to trigger AI moves after player moves
   - Add AI opponent logic to useChessGame hook
   - Handle AI move response and board updates
   - Implement AI difficulty selection in game creation

4. **Test AI integration:**
   - Verify AI responds with valid moves
   - Test different difficulty levels produce appropriate play
   - Ensure AI moves are processed through game state
   - Test game completion with AI opponents

**Milestone:** Working AI opponents using Stockfish engine integration

### Step 5: Build Game Controls and UI

**Goal:** Add all the controls needed for a complete chess game experience

**Actions:**
1. **Create game controls (`src/components/chess/GameControls.tsx`):**
   - New Game button (calls createGame with AI level selection)
   - Resign button (ends current game)
   - Offer Draw button (if backend supports draws)
   - Game status display (whose turn, check, checkmate)

2. **Create move history (`src/components/chess/MoveHistory.tsx`):**
   - Display list of moves from game state
   - Show algebraic notation (e4, Nf3, etc.)
   - Allow clicking moves to navigate game history
   - Add export PGN functionality

3. **Create game info panel (`src/components/chess/GameInfo.tsx`):**
   - Show current player turn
   - Display captured pieces
   - Show game status (playing, check, checkmate, draw)
   - Display AI difficulty level

**Milestone:** Complete chess game UI with all necessary controls

### Step 5: Create Chess Game Page

**Goal:** Build a complete page where users can play chess games

**Actions:**
1. **Create play page (`src/pages/chess/PlayPage.tsx`):**
   - Combine ChessBoard, GameControls, MoveHistory components
   - Add responsive layout for different screen sizes
   - Handle game initialization when page loads
   - Add navigation back to dashboard

2. **Add game creation dialog:**
   - AI difficulty selection (Easy, Medium, Hard)
   - Color selection (White, Black, Random)
   - Time control options (if backend supports)
   - Start game button

3. **Handle game completion:**
   - Display game result (checkmate, draw, resignation)
   - Show final position and move count
   - Options to start new game or return to dashboard
   - Save completed game to history

**Milestone:** Complete chess playing experience on a single page

### Step 6: Integrate Chess into App Navigation

**Goal:** Connect chess functionality to the rest of your app

**Actions:**
1. **Update app routing (`src/router/index.tsx`):**
   - Add route for `/play` chess page
   - Ensure route is protected (requires authentication)
   - Add route for game history/review

2. **Update navigation (`src/components/layout/Header.tsx`):**
   - Add "Play Chess" link to main navigation
   - Add quick access to active games
   - Update dashboard to show chess game stats

3. **Update dashboard (`src/pages/DashboardPage.tsx`):**
   - Add "Play Chess" button prominently
   - Show recent games played
   - Display win/loss statistics from API
   - Add quick links to resume active games

**Milestone:** Chess is fully integrated into your app's navigation and dashboard

### Step 7: Add Game History and Review

**Goal:** Let users review their completed games

**Actions:**
1. **Create game history page (`src/pages/chess/GameHistoryPage.tsx`):**
   - Load game history from backend API
   - Display list of completed games with results
   - Show game date, opponent (AI), result, move count
   - Add search and filtering options

2. **Create game review component (`src/components/chess/GameReview.tsx`):**
   - Display completed game with move navigation
   - Allow stepping through moves one by one
   - Show board position at each move
   - Add analysis annotations (if available from backend)

3. **Add game sharing/export:**
   - Export games as PGN files
   - Copy game notation to clipboard
   - Share game URLs (if backend supports)

**Milestone:** Users can review and analyze their completed games

### Step 8: Polish and Testing

**Goal:** Ensure everything works perfectly and handle edge cases

**Actions:**
1. **Test complete game flows:**
   - Start new game → play moves → finish game → review
   - Test all game endings (checkmate, draw, resignation)
   - Verify AI responses are received and displayed
   - Test error handling (network issues, invalid moves)

2. **Add polishing touches:**
   - Loading states while waiting for AI moves
   - Sound effects for moves, captures, check
   - Move animations and highlighting
   - Responsive design for mobile chess playing

3. **Performance optimization:**
   - Ensure smooth move animations
   - Optimize board rendering performance
   - Handle rapid move sequences properly

**Milestone:** Production-quality chess playing experience

### Files to Create/Modify in Objective 2

**New Files Created:**
```
src/
├── components/
│   ├── chess/
│   │   ├── ChessBoardWrapper.tsx
│   │   ├── AnimatedChessPiece.tsx
│   │   ├── GameControls.tsx
│   │   ├── MoveHistory.tsx
│   │   ├── GameInfo.tsx
│   │   ├── GameResult.tsx
│   │   ├── GameReview.tsx
│   │   └── StockfishPanel.tsx
│   └── audio/
│       ├── AudioProvider.tsx
│       └── SoundManager.tsx
├── pages/
│   └── chess/
│       ├── PlayPage.tsx
│       └── GameHistoryPage.tsx
├── services/
│   ├── api/
│   │   └── GameApiClient.ts
│   ├── chess/
│   │   ├── StockfishService.ts
│   │   ├── StockfishWorker.ts
│   │   └── ChessLogicService.ts
│   └── audio/
│       └── AudioService.ts
├── stores/
│   └── gameStore.ts
├── hooks/
│   ├── useChessGame.ts
│   ├── useStockfishAI.ts
│   └── useAudio.ts
├── types/
│   └── chess.ts
├── utils/
│   └── chessHelpers.ts
└── assets/
    ├── audio/
    │   ├── move.webm
    │   ├── move.mp3
    │   ├── capture.webm
    │   ├── capture.mp3
    │   ├── check.webm
    │   └── check.mp3
    └── stockfish/
        ├── stockfish.js
        ├── stockfish.wasm
        └── stockfish.worker.js

Modified Files:
├── src/router/index.tsx (chess routes)
├── src/components/layout/Header.tsx (chess navigation)
└── src/pages/DashboardPage.tsx (chess integration)
```

### Final Deliverables

When this objective is complete, you will have:

- ✅ **Full chess games** playable against AI through your app
- ✅ **Interactive chess board** with drag-and-drop move input
- ✅ **Stockfish AI opponents** with multiple difficulty levels
- ✅ **Game controls** for new games, resign, draw offers
- ✅ **Move history** with algebraic notation and navigation
- ✅ **Game history** to review all completed games
- ✅ **Audio feedback** for moves, captures, and game events
- ✅ **Smooth animations** for piece movements and game transitions
- ✅ **Dashboard integration** showing chess statistics
- ✅ **Mobile support** for chess playing on phones/tablets
- ✅ **Error handling** for all chess-related API calls

### How to Validate Success

After completing this objective, you should be able to:

1. **Start chess game:** Click "Play Chess" → select AI level → game begins
2. **Make moves:** Click/drag pieces → moves sent to backend → AI responds
3. **Complete game:** Play until checkmate/draw → see game result
4. **Review games:** View game history → click game → step through moves
5. **Mobile play:** Use app on phone → chess board works with touch
6. **Handle errors:** Disconnect internet → see error messages → reconnect → continue

- Games can be created via `/games/create` API endpoint
- Moves are validated and processed via `/games/:id/move`
- Game state stays synchronized between frontend and API
- Game history displays correctly from API data
- AI opponents respond through API integration

## Objective 3: Puzzle Training Integration

### Objective

Add tactical puzzle training to your chess app. At the end of this objective, users will be able to solve chess puzzles fetched from the backend API, get hints, track their progress, and improve their tactical skills through spaced repetition.

### Step 1: Set Up Puzzle API Integration

**Goal:** Connect your frontend to the backend's puzzle endpoints

**Actions:**
1. **Create SRP-compliant puzzle API client (`src/services/api/PuzzleApiClient.ts`):**
   
   **Single Domain Responsibility: Puzzle Training Only**
   - **GET** `/puzzles/next` - Get next puzzle based on user rating and spaced repetition schedule
   - **POST** `/puzzles/:puzzleId/solve` - Submit solution moves and receive feedback with rating changes
   - **POST** `/puzzles/:puzzleId/hint` - Request progressive hints for current puzzle
   
   **API Response Integration:**
   - Handle puzzle data with FEN position, themes, rating, and description
   - Process solve responses with correct/incorrect feedback and rating changes
   - Manage hint responses with progressive clue system and usage tracking

2. **Create puzzle types matching exact backend API responses (`src/types/puzzle.ts`):**
   
   **Puzzle Response:**
   ```typescript
   interface PuzzleResponse {
     success: boolean;
     puzzle: {
       id: string;
       fen: string;
       themes: string[];
       rating: number;
       description: string;
     };
   }
   ```
   
   **Solution Response:**
   ```typescript
   interface SolveResponse {
     success: boolean;
     correct: boolean;
     solution?: string[];
     ratingChange: number;
     newRating: number;
     feedback?: string;
     hint?: string; // For wrong answers
   }
   ```
   
   **Hint Response:**
   ```typescript
   interface HintResponse {
     success: boolean;
     hint: string;
     hintsUsed: number;
   }
   ```

3. **Add TanStack Query integration patterns for puzzle training:**
   
   **`src/hooks/api/usePuzzleQueries.ts`** - Puzzle training TanStack Query hooks:
   ```typescript
   import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
   import { PuzzleApiClient } from '@/services/api/PuzzleApiClient';
   
   // Get next puzzle query with intelligent caching
   export const useNextPuzzle = (userId: string) => {
     return useQuery({
       queryKey: ['puzzle', 'next', userId],
       queryFn: PuzzleApiClient.getNextPuzzle,
       staleTime: 0, // Always fresh for training progression
       gcTime: 2 * 60 * 1000, // 2 minutes cache
       retry: 2, // Retry failed puzzle loads
     });
   };
   
   // Submit puzzle solution mutation with progress tracking
   export const useSolvePuzzle = (puzzleId: string) => {
     const queryClient = useQueryClient();
     return useMutation({
       mutationFn: (solution: PuzzleSolution) => PuzzleApiClient.solvePuzzle(puzzleId, solution),
       onSuccess: (result) => {
         // Update puzzle progress and user statistics
         queryClient.setQueryData(['puzzle', puzzleId, 'result'], result);
         queryClient.invalidateQueries({ queryKey: ['puzzle', 'next'] });
         queryClient.invalidateQueries({ queryKey: ['stats', 'puzzle'] });
         
         // Pre-load next puzzle for seamless experience
         queryClient.prefetchQuery({
           queryKey: ['puzzle', 'next', result.userId],
           queryFn: PuzzleApiClient.getNextPuzzle,
         });
       },
       onError: (error) => {
         console.error('Puzzle solution failed:', error);
       }
     });
   };
   
   // Puzzle hint mutation with progressive disclosure
   export const usePuzzleHint = (puzzleId: string) => {
     const queryClient = useQueryClient();
     return useMutation({
       mutationFn: () => PuzzleApiClient.getHint(puzzleId),
       onSuccess: (hint) => {
         // Cache hint data
         queryClient.setQueryData(['puzzle', puzzleId, 'hint'], hint);
         // Track hint usage in statistics
         queryClient.invalidateQueries({ queryKey: ['stats', 'puzzle'] });
       }
     });
   };
   
   // User puzzle statistics query with moderate caching
   export const usePuzzleStats = (userId: string) => {
     return useQuery({
       queryKey: ['stats', 'puzzle', userId],
       queryFn: () => PuzzleApiClient.getUserPuzzleStats(userId),
       staleTime: 2 * 60 * 1000, // 2 minutes
       gcTime: 10 * 60 * 1000, // 10 minutes
     });
   };
   ```

4. **Test API connection:**
   - Verify puzzle endpoint returns valid data
   - Test solution submission works  
   - Test hint system responds properly
   - Test TanStack Query caching and prefetching behavior

**Milestone:** You can fetch puzzles and submit solutions via API calls with intelligent caching

### Step 2: Create Puzzle Store and State Management

**Goal:** Set up state management for puzzle solving sessions

**Actions:**
1. **Create puzzle store (`src/stores/puzzleStore.ts`):**
   - Store current puzzle loaded from API
   - Track solving session progress
   - Manage hint usage and attempts
   - Handle puzzle completion states

2. **Create puzzle hooks (`src/hooks/usePuzzleSession.ts`):**
   - Hook for loading puzzles from API
   - Hook for submitting solutions
   - Hook for requesting hints
   - Time tracking and attempt counting

3. **Test state management:**
   - Load puzzle updates store correctly
   - Solution submission updates progress
   - Hint requests work properly

**Milestone:** Puzzle state is properly managed and connected to API

### Step 3: Build Core Puzzle Solving Interface

**Goal:** Create the main puzzle solving component

**Actions:**
1. **Create puzzle board component (`src/components/puzzles/PuzzleBoard.tsx`):**
   - Display puzzle position using react-chessboard
   - Allow move input for solution attempts
   - Highlight last move and puzzle focus area
   - Show puzzle difficulty and theme

2. **Create puzzle controls (`src/components/puzzles/PuzzleControls.tsx`):**
   - Submit solution button
   - Request hint button  
   - Skip puzzle button
   - Reset position button

3. **Create solution feedback (`src/components/puzzles/SolutionFeedback.tsx`):**
   - Display correct/incorrect feedback from API
   - Show puzzle solution after completion
   - Display rating change if applicable
   - Celebration animation for correct solutions

**Milestone:** You have a working puzzle interface that displays puzzles and accepts solutions

### Step 4: Add Hint System and Progress Tracking

**Goal:** Implement progressive hints and track solving progress

**Actions:**
1. **Create hint system (`src/components/puzzles/HintSystem.tsx`):**
   - Request hints from `/api/puzzles/:id/hint` endpoint
   - Display hints progressively (first general, then specific)
   - Track hint usage in puzzle statistics
   - Disable rating points if hints used

2. **Create progress tracker (`src/components/puzzles/PuzzleProgress.tsx`):**
   - Display current session statistics
   - Show solving streak and accuracy
   - Track time spent per puzzle
   - Display puzzle rating progression

3. **Add session management:**
   - Track puzzles solved in session
   - Calculate session accuracy percentage
   - Store session data locally for continuity

**Milestone:** Hints work properly and progress is tracked accurately

### Step 5: Build Puzzle Training Pages

**Goal:** Create different types of puzzle training experiences

**Actions:**
1. **Create main puzzle page (`src/pages/puzzles/PuzzleTrainingPage.tsx`):**
   - Combine puzzle board, controls, and progress
   - Handle puzzle loading and solution flow
   - Add navigation between puzzles
   - Show loading states while fetching from API

2. **Create puzzle selection page (`src/pages/puzzles/PuzzleSelectionPage.tsx`):**
   - Allow difficulty selection (if API supports)
   - Show puzzle themes/categories (if available)
   - Display training statistics and goals
   - Quick start button for immediate training

3. **Create training dashboard (`src/components/puzzles/TrainingDashboard.tsx`):**
   - Show overall puzzle statistics from API
   - Display recent solving history
   - Show rating progression chart
   - Quick access to different training modes

**Milestone:** You have complete puzzle training pages with API integration

### Step 6: Integrate Puzzles into Main App

**Goal:** Connect puzzle training to your app's navigation and user flow

**Actions:**
1. **Update app routing (`src/router/index.tsx`):**
   - Add routes for `/puzzles` and `/puzzles/train`
   - Ensure routes are protected (require authentication)
   - Add route for puzzle statistics

2. **Update main navigation (`src/components/layout/Header.tsx`):**
   - Add "Puzzle Training" link to navigation
   - Add quick access to start training session
   - Show puzzle training streak if active

3. **Update dashboard (`src/pages/DashboardPage.tsx`):**
   - Add "Train Tactics" button prominently
   - Show recent puzzle statistics
   - Display current puzzle rating from API
   - Quick stats: problems solved today/this week

**Milestone:** Puzzle training is integrated into your app's main navigation

### Step 7: Add Advanced Puzzle Features

**Goal:** Implement spaced repetition and advanced training features

**Actions:**
1. **Create spaced repetition system (`src/utils/spacedRepetition.ts`):**
   - Track puzzle difficulty based on API feedback
   - Schedule puzzle reviews based on performance
   - Implement SM-2 algorithm or similar for review intervals
   - Store repetition data in localStorage

2. **Add puzzle filtering and selection:**
   - Filter by theme (tactics, endgame, opening)
   - Filter by difficulty range
   - Filter by unsolved/review needed puzzles
   - Custom training sessions with specific focus

3. **Create advanced statistics:**
   - Puzzle rating progression over time
   - Performance by puzzle theme
   - Time-to-solve improvements
   - Accuracy trends and weak areas

**Milestone:** Advanced training features work with spaced repetition scheduling

### Step 8: Polish and Testing

**Goal:** Ensure everything works perfectly and add finishing touches

**Actions:**
1. **Test complete puzzle flows:**
   - Load puzzle → attempt solution → get feedback → next puzzle
   - Use hints → still get feedback → rating adjustment
   - Complete training session → see statistics update
   - Verify API data persistence across sessions

2. **Add polishing touches:**
   - Success animations for correct solutions
   - Sound effects for correct/incorrect attempts
   - Smooth transitions between puzzles
   - Responsive design for mobile puzzle solving

3. **Performance optimization:**
   - Preload next puzzle while solving current
   - Cache puzzle data for offline access
   - Optimize board rendering for rapid puzzle switching

**Milestone:** Production-quality puzzle training experience

### Files to Create/Modify in Objective 3

**New Files Created:**
```
src/
├── components/
│   └── puzzles/
│       ├── PuzzleBoard.tsx
│       ├── PuzzleControls.tsx
│       ├── SolutionFeedback.tsx
│       ├── HintSystem.tsx
│       ├── PuzzleProgress.tsx
│       ├── TrainingDashboard.tsx
│       ├── PuzzleConfigForm.tsx
│       └── PuzzleSuccessAnimation.tsx
├── pages/
│   └── puzzles/
│       ├── PuzzleTrainingPage.tsx
│       ├── PuzzleSelectionPage.tsx
│       └── PuzzleStatsPage.tsx
├── services/
│   ├── api/
│   │   └── PuzzleApiClient.ts
│   └── learning/
│       ├── SpacedRepetitionService.ts
│       ├── ProgressCalculator.ts
│       └── DifficultyAdjuster.ts
├── stores/
│   └── puzzleStore.ts
├── hooks/
│   ├── usePuzzleSession.ts
│   └── useSpacedRepetition.ts
├── types/
│   └── puzzle.ts
├── utils/
│   └── spacedRepetition.ts
└── components/
    └── ui/
        ├── ProgressBar.tsx
        └── StatCard.tsx

Modified Files:
├── src/router/index.tsx (puzzle routes)
├── src/components/layout/Header.tsx (puzzle navigation)
├── src/pages/DashboardPage.tsx (puzzle integration)
└── src/stores/gameStore.ts (puzzle stats integration)
```

### Final Deliverables

When this objective is complete, you will have:

- ✅ **Puzzle loading** from backend API with proper error handling
- ✅ **Solution submission** with real-time feedback from API
- ✅ **Progressive hint system** integrated with backend hints
- ✅ **Progress tracking** showing solving statistics and rating
- ✅ **Spaced repetition** to optimize learning and retention
- ✅ **Training dashboard** with comprehensive puzzle statistics
- ✅ **React Hook Form configuration** for puzzle preferences
- ✅ **React Spring animations** for success/error feedback
- ✅ **Mobile support** for puzzle solving on phones/tablets
- ✅ **Multiple training modes** (quick solve, themed training, review)

### How to Validate Success

After completing this objective, you should be able to:

1. **Start training:** Click "Puzzle Training" → see puzzle interface load
2. **Solve puzzles:** Make moves → submit solution → get immediate feedback
3. **Use hints:** Click hint button → see progressive clues from API
4. **Track progress:** Complete puzzles → see rating/statistics update
5. **Continue sessions:** Close app → reopen → progress persists
6. **Mobile solve:** Use on phone → puzzle interface works with touch

The puzzle training system should:
- Load puzzles correctly from `/api/puzzles/next` endpoint
- Submit solutions to `/api/puzzles/:id/solve` with proper validation
- Request hints via `/api/puzzles/:id/hint` with progressive disclosure  
- Update user statistics and ratings based on API responses
- Work seamlessly across desktop and mobile devices

## Objective 4: User Profile & Statistics

### Objective

Add user profile management and comprehensive statistics to your chess training app. At the end of this objective, users will be able to view and edit their profiles, see detailed training statistics, track their progress over time, and customize their app preferences.

### Step 1: Set Up User Profile API Integration

**Goal:** Connect your frontend to the backend's user and statistics endpoints (matching /docs/API_DOCUMENTATION.md)

**Actions:**
1. **Create user API client (`src/services/api/UserApiClient.ts`) - User profile domain only:**
   - GET /user/profile - Get user info and preferences  
   - PUT /user/profile - Update user preferences
   - Handle user profile updates with proper validation
   - Add error handling for profile operations
   
2. **Create statistics API client (`src/services/api/StatsApiClient.ts`) - Statistics domain only:**
   - GET /stats/dashboard - Get comprehensive dashboard statistics
   - Methods for chess game history and performance metrics
   - Methods for puzzle training statistics and rating progression
   - Historical data retrieval with proper caching

3. **Create SRP-compliant TypeScript interfaces (separate domain files):**
   
   **`src/types/user.ts`** - User profile domain only:
   ```typescript
   interface User {
     id: string;
     username: string;
     email: string;
     chessElo: number;
     puzzleRating: number;
     gamesPlayed: number;
     wins: number;
     losses: number;
     draws: number;
     puzzlesSolved: number;
     preferences: UserPreferences;
   }
   
   interface UserPreferences {
     boardTheme: string;
     soundEnabled: boolean;
     showCoordinates?: boolean;
   }
   
   interface ProfileUpdateRequest {
     preferences: Partial<UserPreferences>;
   }
   ```
   
   **`src/types/stats.ts`** - Statistics domain only:
   ```typescript
   interface DashboardStats {
     chessRating: number;
     puzzleRating: number;
     todayGames: number;
     todayPuzzles: number;
     currentStreak: number;
     recentGames: GameSummary[];
   }
   
   interface GameSummary {
     result: string;
     aiLevel: number;
     eloChange: number;
     date: string;
   }
   ```

4. **Add TanStack Query integration patterns for user profile and statistics:**
   
   **`src/hooks/api/useProfileQueries.ts`** - User profile TanStack Query hooks:
   ```typescript
   import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
   import { UserApiClient, StatsApiClient } from '@/services/api';
   
   // User profile query with medium-term caching
   export const useUserProfile = (userId: string) => {
     return useQuery({
       queryKey: ['user', 'profile', userId],
       queryFn: () => UserApiClient.getProfile(userId),
       staleTime: 5 * 60 * 1000, // 5 minutes
       gcTime: 15 * 60 * 1000, // 15 minutes
       enabled: !!userId,
     });
   };
   
   // Profile update mutation with optimistic updates
   export const useUpdateUserProfile = () => {
     const queryClient = useQueryClient();
     return useMutation({
       mutationFn: UserApiClient.updateProfile,
       onMutate: async (newData) => {
         await queryClient.cancelQueries({ queryKey: ['user', 'profile'] });
         const previousProfile = queryClient.getQueryData(['user', 'profile']);
         
         // Optimistic update
         queryClient.setQueryData(['user', 'profile'], (old: any) => ({
           ...old,
           ...newData,
         }));
         
         return { previousProfile };
       },
       onError: (err, newData, context) => {
         queryClient.setQueryData(['user', 'profile'], context?.previousProfile);
       },
       onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['user', 'profile'] });
       }
     });
   };
   
   // Dashboard statistics query with shorter cache for real-time updates
   export const useDashboardStats = (userId: string) => {
     return useQuery({
       queryKey: ['stats', 'dashboard', userId],
       queryFn: () => StatsApiClient.getDashboardStats(userId),
       staleTime: 2 * 60 * 1000, // 2 minutes
       gcTime: 10 * 60 * 1000, // 10 minutes
       enabled: !!userId,
       refetchOnWindowFocus: true, // Refresh when user returns
     });
   };
   ```

**Milestone:** You can fetch and update user profile data via API calls with optimized caching

### Step 2: Set Up Profile State Management

**Goal:** Manage user profile and statistics state following SRP architecture

**Actions:**
1. **Create SRP-compliant domain stores (following architecture document):**
   
   **`src/stores/userStore.ts`** - User profile domain only:
   - Store user profile data from GET /user/profile API
   - Handle profile updates via PUT /user/profile API 
   - Manage user preferences and personal information
   - Cache profile data for offline access
   
   **`src/stores/progressStore.ts`** - Progress and statistics domain only (matching project structure doc):
   - Store dashboard statistics from GET /stats/dashboard API
   - Track rating progressions and performance metrics
   - Manage game history and puzzle training statistics
   - Handle real-time statistics updates

2. **Create SRP-compliant hooks (separate domain hooks):**
   
   **`src/hooks/useUser.ts`** - User profile domain only:
   - Hook for loading and updating user profile
   - Hook for preference management and settings
   - Profile synchronization with backend API
   - Error handling for profile operations
   
   **`src/hooks/useProgress.ts`** - Progress and statistics domain only (matching project structure doc):
   - Hook for fetching dashboard statistics  
   - Hook for loading comprehensive performance data
   - Statistics synchronization and real-time updates
   - Statistics filtering and aggregation

**Milestone:** Profile and statistics data is properly managed and synced with API

### Step 3: Build User Profile Interface

**Goal:** Create the main user profile viewing and editing interface

**Actions:**
1. **Create profile display (`src/components/profile/ProfileHeader.tsx`):**
   - Display user avatar, name, and basic info
   - Show current chess rating and puzzle rating
   - Display join date and total training time
   - Include quick stats (games played, puzzles solved)

2. **Create profile editor (`src/components/profile/ProfileEditor.tsx`):**
   - Editable form for user information
   - Avatar upload and selection
   - Display name and bio editing
   - Skill level and goal setting

3. **Create profile page (`src/pages/profile/ProfilePage.tsx`):**
   - Combine profile display and editing
   - Tabbed interface for different sections
   - Recent activity and achievements
   - Profile sharing and public view options

**Milestone:** Users can view and edit their profile information

### Step 4: Build Statistics Dashboard

**Goal:** Create comprehensive statistics and progress tracking

**Actions:**
1. **Create main stats dashboard (`src/components/stats/StatsDashboard.tsx`):**
   - Overview cards with key metrics from API
   - Chess game statistics (wins, losses, draws)
   - Puzzle training statistics (solved, accuracy)
   - Rating progressions and trends

2. **Create rating charts (`src/components/stats/RatingChart.tsx`):**
   - Line chart showing rating progression over time
   - Separate charts for chess rating and puzzle rating
   - Interactive chart with date range selection
   - Peak rating and current rating highlights

3. **Create performance metrics (`src/components/stats/PerformanceMetrics.tsx`):**
   - Win/loss ratio breakdowns by time period
   - Average game length and common openings
   - Puzzle solving speed and accuracy trends
   - Comparative performance analysis

**Milestone:** Comprehensive statistics dashboard displays API data correctly

### Step 5: Add Settings and Preferences

**Goal:** Let users customize their training experience

**Actions:**
1. **Create preferences page (`src/pages/profile/PreferencesPage.tsx`):**
   - Board theme and piece set selection
   - Sound effects and volume controls
   - Notification preferences and frequency
   - Training goals and difficulty settings

2. **Create board settings (`src/components/settings/BoardSettings.tsx`):**
   - Chess board color schemes
   - Piece set selection and preview
   - Coordinate display options
   - Move highlighting preferences

3. **Create notification settings (`src/components/settings/NotificationSettings.tsx`):**
   - Email notification preferences
   - Training reminder settings
   - Achievement notification options
   - Daily/weekly training goals

**Milestone:** Users can customize their app experience through preferences

### Step 6: Build Progress Tracking Features

**Goal:** Show detailed progress analysis and achievements

**Actions:**
1. **Create progress overview (`src/pages/profile/ProgressOverviewPage.tsx`):**
   - Monthly and yearly progress summaries
   - Training streak tracking
   - Goal achievement status
   - Comparative progress analysis

2. **Create detailed statistics (`src/pages/profile/DetailedStatsPage.tsx`):**
   - Comprehensive data tables from API
   - Filterable statistics by date range
   - Export options for personal data
   - Advanced performance analytics

3. **Create achievements system (`src/components/profile/AchievementsDisplay.tsx`):**
   - Badge system for training milestones
   - Progress toward next achievements
   - Shareable achievement notifications
   - Achievement history and timeline

**Milestone:** Users can track detailed progress and see their achievements

### Step 7: Integrate Profile into Main App

**Goal:** Connect profile features throughout your app navigation

**Actions:**
1. **Update app navigation (`src/components/layout/Header.tsx`):**
   - Add profile dropdown menu with user avatar
   - Quick access to profile, statistics, and settings
   - Display current ratings in navigation
   - Profile menu with logout option

2. **Update app routing (`src/router/index.tsx`):**
   - Add routes for `/profile`, `/profile/stats`, `/profile/settings`
   - Ensure all profile routes are protected
   - Add redirects for profile completion

3. **Update dashboard integration:**
   - Profile summary widget on main dashboard
   - Quick statistics cards showing recent progress
   - Links to detailed profile and statistics pages
   - Profile completion prompts for new users

**Milestone:** Profile features are seamlessly integrated throughout the app

### Step 8: Add Advanced Profile Features

**Goal:** Implement social features and data management

**Actions:**
1. **Add data export functionality:**
   - Export training data as CSV/JSON
   - Generate progress reports
   - Backup user preferences and settings
   - GDPR-compliant data download

2. **Create profile sharing features:**
   - Public profile pages with shareable URLs
   - Training statistics sharing on social media
   - Achievement sharing and bragging rights
   - Privacy controls for public profiles

3. **Add profile analytics:**
   - Training pattern analysis
   - Optimal training time suggestions
   - Weakness identification from game/puzzle data
   - Personalized improvement recommendations

**Milestone:** Advanced profile features enhance the training experience

### Step 9: Testing and Polish

**Goal:** Ensure all profile features work flawlessly

**Actions:**
1. **Test complete profile flows:**
   - Profile creation → editing → statistics viewing
   - Preference changes → immediate effect throughout app
   - Achievement unlocks → proper display and notifications
   - Data export → verify completeness and format

2. **Add polishing touches:**
   - Loading states for statistics and profile data
   - Smooth transitions between profile sections
   - Responsive design for mobile profile viewing
   - Error handling for profile update failures

3. **Performance optimization:**
   - Cache frequently accessed statistics
   - Lazy load heavy charts and graphics
   - Optimize API calls for profile data
   - Implement real-time updates where appropriate

**Milestone:** Professional-quality profile and statistics experience

### Files to Create/Modify in Objective 4

**New Files Created:**
```
src/
├── components/
│   ├── profile/
│   │   ├── ProfileHeader.tsx
│   │   ├── ProfileEditor.tsx
│   │   ├── AchievementsDisplay.tsx
│   │   └── ProfileAvatar.tsx
│   ├── stats/
│   │   ├── StatsDashboard.tsx
│   │   ├── RatingChart.tsx
│   │   ├── PerformanceMetrics.tsx
│   │   └── ProgressOverview.tsx
│   └── settings/
│       ├── BoardSettings.tsx
│       ├── NotificationSettings.tsx
│       ├── AudioSettings.tsx
│       └── PreferenceForm.tsx
├── pages/
│   └── profile/
│       ├── ProfilePage.tsx
│       ├── PreferencesPage.tsx
│       ├── ProgressOverviewPage.tsx
│       ├── DetailedStatsPage.tsx
│       └── AchievementsPage.tsx
├── services/
│   ├── api/
│   │   ├── UserApiClient.ts
│   │   └── StatsApiClient.ts
│   └── data/
│       ├── StatsCalculator.ts
│       └── AchievementTracker.ts
├── stores/
│   ├── userStore.ts
│   └── progressStore.ts
├── hooks/
│   ├── useUser.ts
│   ├── useProgress.ts
│   └── useAchievements.ts
├── types/
│   ├── user.ts
│   ├── statistics.ts
│   └── achievements.ts
└── utils/
    ├── chartHelpers.ts
    ├── dataExport.ts
    └── dateFormatters.ts

Modified Files:
├── src/router/index.tsx (profile routes)
├── src/components/layout/Header.tsx (profile menu)
├── src/pages/DashboardPage.tsx (profile integration)
├── src/stores/authStore.ts (profile data)
└── src/stores/gameStore.ts (stats integration)
```

### Final Deliverables

When this objective is complete, you will have:

- ✅ **Complete user profiles** with photos, bios, and personal information
- ✅ **Comprehensive statistics** showing all chess and puzzle training data
- ✅ **Progress tracking** with charts, trends, and achievement system
- ✅ **Customizable preferences** for board, sounds, and notifications
- ✅ **Rating progression** charts showing improvement over time
- ✅ **Data export** capabilities for personal training records
- ✅ **Profile sharing** features for social interaction
- ✅ **React Hook Form preferences** with validation
- ✅ **TanStack Query data management** for efficient statistics loading
- ✅ **Mobile optimization** for profile management on all devices

### How to Validate Success

After completing this objective, you should be able to:

1. **View profile:** Click profile menu → see complete user information and stats
2. **Edit profile:** Update information → changes save and reflect immediately  
3. **Check statistics:** View stats page → see accurate data from API
4. **Track progress:** See rating progression → verify data matches training history
5. **Change preferences:** Update settings → see immediate effect in app
6. **Export data:** Download training data → verify completeness and format

The profile system should:
- Load user data correctly from `/api/user/profile` endpoint
- Display statistics accurately from `/api/stats/dashboard` endpoint  
- Update preferences and save them via API calls
- Show real-time progress and achievements based on API data
- Work seamlessly across desktop and mobile interfaces

## Objective 5: Game Analysis System

### Objective

Add game analysis capabilities to your chess training app. At the end of this objective, users will be able to analyze their completed games, see move evaluations, identify mistakes and missed opportunities, and learn from their games through detailed post-game analysis.

### Step 1: Set Up Game Analysis Foundation

**Goal:** Create the infrastructure for analyzing chess games

**Actions:**
1. **Create analysis service (`src/services/AnalysisService.ts`):**
   - **CRITICAL: Use Stockfish engine for position evaluation** (research-validated requirement)
   - Integration with StockfishService for deep analysis
   - Move quality assessment using engine evaluation (good, inaccuracy, mistake, blunder)
   - Position assessment with Stockfish analysis depth
   - Calculate evaluation scores and principal variations

2. **Create analysis types (`src/types/analysis.ts`):**
   - Define MoveAnalysis, PositionEvaluation, GameAnalysis interfaces
   - Analysis result structures and evaluation scores
   - Move classification types and annotations

3. **Test Stockfish analysis integration:**
   - Verify Stockfish position evaluation works for various positions
   - Test engine move quality assessment accuracy
   - Validate Stockfish analysis output and evaluation format
   - Test analysis depth configuration and performance

**Milestone:** Stockfish analysis engine integration is working and can evaluate positions with professional-grade accuracy

### Step 2: Load and Prepare Game Data for Analysis

**Goal:** Set up game data loading and preparation for analysis

**Actions:**
1. **Create game analysis API client (`src/services/api/GameAnalysisClient.ts`):**
   - GET /games/history - Load completed games from backend API
   - GET /games/:gameId - Load specific game for detailed analysis
   - Parse game moves and positions from backend response format
   - Prepare game data for Stockfish analysis processing
   - Handle PGN export and different game formats
   
   **Backend API Integration:**
   ```typescript
   interface GameHistoryResponse {
     success: boolean;
     games: GameHistoryItem[];
   }
   
   interface GameHistoryItem {
     id: string;
     result: string;
     aiLevel: number;
     completedAt: string;
     eloChange: number;
   }
   
   interface GameDetailResponse {
     success: boolean;
     game: {
       id: string;
       aiLevel: number;
       currentFen: string;
       pgn: string;
       result: string | null;
       gameOver: boolean;
     };
   }
   ```

2. **Create analysis store (`src/stores/analysisStore.ts`):**
   - Store current game being analyzed
   - Track analysis progress and results
   - Cache analysis results for performance
   - Manage analysis settings and preferences

3. **Create analysis hooks (`src/hooks/useGameAnalysis.ts`):**
   - Hook for loading games and running analysis
   - Hook for navigating through analyzed moves
   - Hook for managing analysis state
   - Progress tracking for long analysis runs

4. **Add TanStack Query integration patterns for game analysis:**
   
   **`src/hooks/api/useAnalysisQueries.ts`** - Game analysis TanStack Query hooks:
   ```typescript
   import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
   import { GameAnalysisClient } from '@/services/api/GameAnalysisClient';
   
   // Game history query for analysis selection
   export const useGamesForAnalysis = (userId: string) => {
     return useQuery({
       queryKey: ['games', 'analysis', 'list', userId],
       queryFn: () => GameAnalysisClient.getGameHistory(),
       staleTime: 5 * 60 * 1000, // 5 minutes
       gcTime: 15 * 60 * 1000, // 15 minutes
       enabled: !!userId,
     });
   };
   
   // Individual game data for analysis
   export const useGameForAnalysis = (gameId: string) => {
     return useQuery({
       queryKey: ['games', 'analysis', 'detail', gameId],
       queryFn: () => GameAnalysisClient.getGameDetail(gameId),
       staleTime: 10 * 60 * 1000, // 10 minutes (game data doesn't change)
       gcTime: 30 * 60 * 1000, // 30 minutes
       enabled: !!gameId,
     });
   };
   
   // Analysis results with heavy caching (expensive computation)
   export const useGameAnalysisResults = (gameId: string) => {
     return useQuery({
       queryKey: ['games', 'analysis', 'results', gameId],
       queryFn: () => GameAnalysisClient.getAnalysisResults(gameId),
       staleTime: 60 * 60 * 1000, // 1 hour (analysis results are static)
       gcTime: 24 * 60 * 60 * 1000, // 24 hours
       enabled: !!gameId,
       retry: 1, // Analysis is expensive, don't retry too much
     });
   };
   
   // Prefetch strategy for seamless analysis experience
   export const usePrefetchGameAnalysis = () => {
     const queryClient = useQueryClient();
     
     return {
       prefetchGameDetail: (gameId: string) => {
         queryClient.prefetchQuery({
           queryKey: ['games', 'analysis', 'detail', gameId],
           queryFn: () => GameAnalysisClient.getGameDetail(gameId),
           staleTime: 10 * 60 * 1000,
         });
       },
       
       prefetchAnalysisResults: (gameId: string) => {
         queryClient.prefetchQuery({
           queryKey: ['games', 'analysis', 'results', gameId],
           queryFn: () => GameAnalysisClient.getAnalysisResults(gameId),
           staleTime: 60 * 60 * 1000,
         });
       }
     };
   };
   ```

**Milestone:** Games can be loaded from API and prepared for analysis with intelligent caching

### Step 3: Build Move-by-Move Analysis Interface

**Goal:** Create interface for analyzing individual moves and positions

**Actions:**
1. **Create analysis board (`src/components/analysis/AnalysisBoard.tsx`):**
   - Display game position with analysis overlays
   - Show move evaluations and best move suggestions
   - Highlight tactical themes and patterns
   - Interactive position exploration

2. **Create move analysis panel (`src/components/analysis/MoveAnalysisPanel.tsx`):**
   - Display evaluation for current move
   - Show alternative move suggestions
   - Explain move quality (good, inaccuracy, mistake, blunder)
   - Provide textual analysis and learning points

3. **Create position evaluation display (`src/components/analysis/PositionEvaluation.tsx`):**
   - Show numerical position evaluation
   - Display material balance
   - Highlight positional factors (king safety, piece activity)
   - Simple evaluation bar visualization

**Milestone:** You can analyze individual moves and see detailed evaluations

### Step 4: Build Game Analysis Navigation

**Goal:** Create interface for navigating through analyzed games

**Actions:**
1. **Create analysis navigator (`src/components/analysis/AnalysisNavigator.tsx`):**
   - Move list with analysis annotations
   - Click to jump to any move in the game
   - Navigate with keyboard arrows
   - Show game phases (opening, middlegame, endgame)

2. **Create analysis timeline (`src/components/analysis/AnalysisTimeline.tsx`):**
   - Visual timeline of move evaluations
   - Color-coded moves (green=good, yellow=inaccuracy, red=mistake)
   - Click timeline to jump to critical moments
   - Highlight blunders and missed opportunities

3. **Create critical moments viewer (`src/components/analysis/CriticalMoments.tsx`):**
   - Identify and display key moments in the game
   - Show turning points where evaluation changed significantly
   - Highlight missed tactical opportunities
   - Quick navigation to important positions

**Milestone:** You can navigate through analyzed games and find critical moments

### Step 5: Add Analysis Features and Insights

**Goal:** Implement advanced analysis features for deeper learning

**Actions:**
1. **Create mistake identification (`src/utils/mistakeAnalysis.ts`):**
   - Identify blunders and significant mistakes
   - Calculate evaluation drops for each move
   - Categorize mistakes (tactical, positional, time management)
   - Provide improvement suggestions

2. **Create opening analysis (`src/components/analysis/OpeningAnalysis.tsx`):**
   - Identify opening played and variations
   - Show opening statistics and popularity
   - Compare moves to opening theory
   - Suggest opening improvements

3. **Create endgame analysis (`src/components/analysis/EndgameAnalysis.tsx`):**
   - Identify endgame types and techniques
   - Show theoretical evaluations for endgame positions
   - Provide endgame learning resources
   - Practice similar endgame positions

**Milestone:** Advanced analysis features provide detailed insights and learning opportunities

### Step 6: Build Complete Analysis Pages

**Goal:** Create full-featured pages for game analysis

**Actions:**
1. **Create main analysis page (`src/pages/analysis/GameAnalysisPage.tsx`):**
   - Combine all analysis components into cohesive interface
   - Tabbed layout for different analysis views
   - Game selection and loading interface
   - Analysis settings and preferences

2. **Create analysis report page (`src/pages/analysis/AnalysisReportPage.tsx`):**
   - Summary report of game analysis
   - Statistics on move quality and accuracy
   - Key learning points and improvement areas
   - Shareable analysis reports

3. **Create analysis comparison page (`src/pages/analysis/CompareGamesPage.tsx`):**
   - Compare analysis from multiple games
   - Track improvement over time
   - Identify recurring mistakes and patterns
   - Progress tracking for analytical skills

**Milestone:** Complete analysis pages provide comprehensive game review experience

### Step 7: Integrate Analysis into Main App

**Goal:** Connect analysis features to your app's game system

**Actions:**
1. **Update game history with analysis (`src/components/chess/GameHistoryList.tsx`):**
   - Add "Analyze" button to completed games
   - Show quick analysis previews (blunders, accuracy)
   - Link to full analysis from game history
   - Cache analysis results for quick access

2. **Update game completion flow:**
   - Offer analysis immediately after game ends
   - Show quick game summary with key moments
   - Prompt users to analyze their games for learning
   - Save analysis results to game records

3. **Update app navigation:**
   - Add "Analysis" section to main navigation
   - Quick access to recent game analyses
   - Link from dashboard showing games needing analysis
   - Analysis progress tracking

**Milestone:** Analysis is integrated throughout the app's game flow

### Step 8: Add Analysis Training Features

**Goal:** Create training exercises based on game analysis

**Actions:**
1. **Create mistake training (`src/components/analysis/MistakeTraining.tsx`):**
   - Extract positions where user made mistakes
   - Create training puzzles from these positions
   - Practice finding the correct moves
   - Track improvement on similar mistake types

2. **Create position trainer (`src/components/analysis/PositionTrainer.tsx`):**
   - Practice critical positions from analyzed games
   - "What would you play here?" training mode
   - Compare user moves to analysis recommendations
   - Spaced repetition for difficult positions

3. **Create pattern recognition (`src/components/analysis/PatternRecognition.tsx`):**
   - Identify tactical and positional patterns from games
   - Train pattern recognition based on user's games
   - Focus on missed patterns from analysis
   - Progressive difficulty based on user strength

**Milestone:** Analysis drives personalized training based on actual game mistakes

### Step 9: Polish and Performance Optimization

**Goal:** Optimize analysis performance and add finishing touches

**Actions:**
1. **Optimize analysis performance:**
   - Background analysis processing for large games
   - Progress indicators for long-running analysis
   - Caching of analysis results
   - Lazy loading of analysis data

2. **Add advanced features:**
   - Export analysis as PGN with annotations
   - Share analysis reports with friends/coaches
   - Print-friendly analysis reports
   - Integration with chess databases

3. **Test and polish:**
   - Test analysis accuracy on various game types
   - Ensure responsive design for mobile analysis
   - Add loading states and error handling
   - Performance testing with large game databases

**Milestone:** Analysis system is fast, reliable, and production-ready

### Files to Create/Modify in Objective 5

**New Files Created:**
```
src/
├── components/
│   └── analysis/
│       ├── AnalysisBoard.tsx
│       ├── MoveAnalysisPanel.tsx
│       ├── PositionEvaluation.tsx
│       ├── AnalysisNavigator.tsx
│       ├── AnalysisTimeline.tsx
│       ├── CriticalMoments.tsx
│       ├── OpeningAnalysis.tsx
│       ├── EndgameAnalysis.tsx
│       ├── MistakeTraining.tsx
│       ├── PositionTrainer.tsx
│       ├── PatternRecognition.tsx
│       └── StockfishAnalysisPanel.tsx
├── pages/
│   └── analysis/
│       ├── GameAnalysisPage.tsx
│       ├── AnalysisReportPage.tsx
│       └── CompareGamesPage.tsx
├── services/
│   ├── chess/
│   │   ├── AnalysisService.ts
│   │   └── PositionAnalyzer.ts
│   └── data/
│       └── GameAnalysisClient.ts
├── stores/
│   └── analysisStore.ts
├── hooks/
│   └── useGameAnalysis.ts
├── types/
│   └── analysis.ts
├── utils/
│   ├── mistakeAnalysis.ts
│   ├── analysisReporting.ts
│   └── patternRecognition.ts
└── components/
    └── chess/
        └── AnalysisViewer.tsx

Modified Files:
├── src/router/index.tsx (analysis routes)
├── src/components/layout/Header.tsx (analysis navigation)
├── src/components/chess/GameHistoryList.tsx (analysis integration)
├── src/pages/chess/PlayPage.tsx (post-game analysis)
├── src/services/chess/StockfishService.ts (analysis methods)
└── src/stores/gameStore.ts (analysis data integration)
```

### Final Deliverables

When this objective is complete, you will have:

- ✅ **Stockfish analysis engine integration** that evaluates moves and positions with professional accuracy
- ✅ **Move-by-move analysis** with detailed explanations and alternatives
- ✅ **Critical moment identification** highlighting key game moments
- ✅ **Mistake analysis** with improvement suggestions
- ✅ **Opening and endgame analysis** with educational content
- ✅ **Analysis reports** providing game summaries and insights
- ✅ **Training from analysis** creating practice exercises from mistakes
- ✅ **React Spring animations** for analysis visualization and navigation
- ✅ **TanStack Query integration** for analysis data caching and performance
- ✅ **Mobile-optimized** analysis interface for studying on any device

### How to Validate Success

After completing this objective, you should be able to:

1. **Analyze games:** Select completed game → run analysis → see move evaluations
2. **Navigate analysis:** Click through moves → see position evaluations and alternatives
3. **Find mistakes:** Analysis identifies blunders → shows better moves → explains why
4. **Learn from games:** Analysis provides insights → suggests improvements → creates practice exercises
5. **Track progress:** Compare analyses over time → see analytical improvement
6. **Share analysis:** Export or share analysis reports → others can view your game study

The analysis system should:
- Load game data correctly from your game API endpoints
- Provide accurate move evaluations using chess.js analysis
- Generate meaningful insights and learning opportunities
- Work smoothly on both desktop and mobile devices
- Help users improve their chess through systematic game review

## Objective 6: Polish & Production Features

### Objective

Complete your chess training app with final features, performance optimizations, and production readiness. At the end of this objective, you will have a fully polished app ready for deployment with comprehensive help system, optimized performance, error handling, and professional user experience.

### Step 1: Build Help and Support System

**Goal:** Create comprehensive help and support features for users

**Actions:**
1. **Create help center page (`src/pages/help/HelpCenterPage.tsx`):**
   - Searchable knowledge base with common questions
   - Categories for different app features (chess, puzzles, analysis)
   - Step-by-step guides with screenshots
   - Integration with your app's actual features

2. **Create interactive tutorials (`src/pages/help/TutorialsPage.tsx`):**
   - Guided tour for new users
   - Interactive walkthroughs for each major feature
   - Progress tracking through tutorial completion
   - Skip options for experienced users

3. **Create contact and support (`src/pages/help/ContactPage.tsx`):**
   - Contact form for user support requests
   - FAQ section with expandable answers
   - Bug report form with system information
   - Feature request submission

**Milestone:** Complete help system helps users understand and use your app

### Step 2: Implement Global Error Handling

**Goal:** Add robust error handling throughout the application

**Actions:**
1. **Create error boundary system (`src/components/common/ErrorBoundary.tsx`):**
   - Catch and handle React component errors
   - Provide fallback UI for broken components
   - Error reporting and logging integration
   - Graceful degradation for failed features

2. **Create API error handling (`src/utils/errorHandling.ts`):**
   - Centralized error handling for all API calls
   - User-friendly error messages for common failures
   - Retry logic for temporary network issues
   - Error reporting for debugging

3. **Create global error monitoring:**
   - Log errors for debugging and improvement
   - User notification system for critical errors
   - Offline handling and recovery
   - Error boundary placement throughout app

**Milestone:** App handles errors gracefully and provides good user experience even when things go wrong

### Step 3: Optimize Application Performance

**Goal:** Ensure fast loading and smooth operation across all devices

**Actions:**
1. **Implement code splitting and lazy loading (`src/utils/lazyLoading.ts`):**
   - Split bundles by feature (chess, puzzles, analysis, profile)
   - Lazy load heavy components and pages
   - Preload critical components for better UX
   - Dynamic imports for optional features

2. **Create API caching system (`src/services/ApiCache.ts`):**
   - Cache frequently accessed data (user profile, statistics)
   - Smart cache invalidation based on data updates
   - Offline capability with cached data
   - Background data refresh for freshness

3. **Optimize chess board rendering:**
   - Minimize re-renders during rapid moves
   - Optimize piece animations and transitions
   - Lazy load chess position analysis
   - Memory management for long game sessions

**Milestone:** App loads quickly and performs smoothly on all devices

### Step 4: Add Loading States and Transitions

**Goal:** Provide excellent user experience during loading and navigation

**Actions:**
1. **Create loading fallbacks (`src/components/common/LoadingFallbacks.tsx`):**
   - Skeleton screens for major components
   - Loading spinners for API calls
   - Progress bars for long-running operations
   - Smooth transitions between loading and loaded states

2. **Add page transitions (`src/components/common/PageTransitions.tsx`):**
   - Smooth navigation between pages
   - Fade and slide transitions
   - Loading states during navigation
   - Mobile-optimized page transitions

3. **Create chess-specific loading states:**
   - Board loading animation
   - Piece loading for custom sets  
   - Analysis progress indicators
   - Game loading with opponent information

**Milestone:** All loading states provide clear feedback and smooth experience

### Step 5: Implement Accessibility Features

**Goal:** Ensure your app is accessible to all users including those with disabilities

**Actions:**
1. **Add keyboard navigation (`src/utils/keyboardNavigation.ts`):**
   - Full keyboard navigation for chess board
   - Tab order optimization throughout app
   - Keyboard shortcuts for common actions
   - Focus management during modal interactions

2. **Create screen reader support (`src/components/common/ScreenReaderSupport.tsx`):**
   - Chess position announcement for screen readers
   - Move history reading support
   - Game state announcements (check, checkmate)
   - Accessible form labels and descriptions

3. **Add accessibility compliance:**
   - WCAG 2.1 AA compliance checking
   - Color contrast verification
   - Alt text for all images and icons
   - Semantic HTML throughout application

**Milestone:** App is fully accessible and usable by people with disabilities

### Step 6: Create Production Build Configuration

**Goal:** Set up optimized build process for deployment

**Actions:**
1. **Optimize Vite configuration (`vite.config.ts`):** *(Research-validated choice)*
   - Production build optimizations (16x faster than CRA)
   - Bundle analysis and code splitting for chess libraries
   - Asset compression and caching headers
   - Environment-specific configurations
   
   ```typescript
   // Research-backed configuration from Technical Decisions Research
   export default defineConfig({
     plugins: [react()],
     build: {
       rollupOptions: {
         output: {
           manualChunks: {
             'chess-engine': ['chess.js'],
             'chess-ui': ['react-chessboard'],
             'audio': ['howler'],
             'animations': ['@react-spring/web'],
             vendor: ['react', 'react-dom', 'zustand', 'axios']
           }
         }
       }
     }
   })
   ```

2. **Set up environment management (`src/config/environment.ts`):**
   - Development, staging, production configurations
   - API endpoint management across environments
   - Feature flags for progressive rollouts
   - Debug settings and logging levels

3. **Configure deployment preparation:**
   - Build script optimization
   - Asset versioning and caching
   - Production error reporting setup
   - Performance monitoring integration

**Milestone:** App builds efficiently and is ready for production deployment

### Step 7: Add Final Polish and Professional Features

**Goal:** Add finishing touches that make your app feel professional

**Actions:**
1. **Create about and legal pages (`src/pages/legal/`):**
   - About page with app information and team
   - Privacy policy and terms of service
   - Cookie policy and data handling
   - App version and changelog information

2. **Add professional UI polish:**
   - Consistent styling across all components
   - Micro-interactions for better engagement
   - Professional color scheme and typography
   - Icon consistency and visual hierarchy

3. **Create app metadata and SEO:**
   - Meta tags for social sharing
   - Open Graph tags for rich previews
   - Progressive Web App configuration
   - Favicon and app icons for all platforms

**Milestone:** App looks and feels professional with complete legal and informational content

### Step 8: Comprehensive Testing and Quality Assurance

**Goal:** Ensure everything works perfectly across all browsers and devices

**Actions:**
1. **Cross-browser testing:**
   - Test all features in Chrome, Firefox, Safari, Edge
   - Mobile browser testing on iOS and Android
   - Feature compatibility checking
   - Performance testing across browsers

2. **Device and responsive testing:**
   - Test on various screen sizes and devices
   - Touch interaction testing for mobile chess
   - Performance testing on older devices
   - Offline functionality testing

3. **User acceptance testing:**
   - Complete user flow testing from registration to advanced features
   - Edge case testing (poor network, errors, unusual data)
   - Accessibility testing with actual assistive technologies
   - Performance benchmarking and optimization

**Milestone:** App works flawlessly across all targeted browsers and devices

### Step 9: Deployment Preparation and Launch

**Goal:** Prepare for production deployment and user launch

**Actions:**
1. **Final production checklist:**
   - All environment variables and secrets configured
   - Production API endpoints verified
   - SSL certificates and security headers configured
   - Monitoring and analytics setup

2. **Launch preparation:**
   - User onboarding flow optimization
   - Initial data seeding (puzzles, help content)
   - Error monitoring and alerting setup
   - Backup and recovery procedures

3. **Post-launch monitoring setup:**
   - Performance monitoring dashboard
   - Error tracking and alerting
   - User analytics and behavior tracking
   - A/B testing framework for future improvements

**Milestone:** App is deployed and running smoothly in production

### Final Deliverables

When this objective is complete, you will have:

- ✅ **Complete help system** with tutorials, FAQ, and support
- ✅ **Robust error handling** with graceful fallbacks and recovery
- ✅ **Optimized performance** with fast loading and smooth operation
- ✅ **Professional polish** with consistent UI and micro-interactions
- ✅ **Full accessibility** supporting users with disabilities
- ✅ **Production deployment** with monitoring and error tracking
- ✅ **Cross-platform compatibility** working on all devices and browsers
- ✅ **Legal compliance** with privacy policy and terms of service

### How to Validate Success

After completing this objective, you should be able to:

1. **Help users:** New users can find help → complete tutorials → solve problems independently
2. **Handle errors:** Disconnect internet → see graceful error handling → reconnect and continue
3. **Performance:** App loads quickly → smooth animations → responsive on mobile
4. **Accessibility:** Navigate entire app with keyboard → screen reader announces chess moves
5. **Production:** Deploy to hosting → monitor performance → handle real user traffic
6. **Cross-platform:** Test on different browsers and devices → consistent experience everywhere

### Files to Create/Modify in Objective 6

**New Files Created:**
```
src/
├── components/
│   ├── common/
│   │   ├── ErrorBoundary.tsx
│   │   ├── LoadingFallbacks.tsx
│   │   ├── PageTransitions.tsx
│   │   └── ScreenReaderSupport.tsx
│   └── help/
│       ├── HelpSearch.tsx
│       ├── TutorialGuide.tsx
│       ├── ContactForm.tsx
│       └── InteractiveWalkthrough.tsx
├── pages/
│   ├── help/
│   │   ├── HelpCenterPage.tsx
│   │   ├── TutorialsPage.tsx
│   │   └── ContactPage.tsx
│   └── legal/
│       ├── AboutPage.tsx
│       ├── PrivacyPage.tsx
│       └── TermsPage.tsx
├── services/
│   ├── cache/
│   │   └── ApiCache.ts
│   └── monitoring/
│       ├── ErrorReporting.ts
│       └── PerformanceMonitoring.ts
├── utils/
│   ├── errorHandling.ts
│   ├── lazyLoading.ts
│   ├── keyboardNavigation.ts
│   └── accessibility.ts
├── config/
│   └── environment.ts
├── assets/
│   └── icons/
│       ├── favicon.ico
│       ├── icon-192.png
│       ├── icon-512.png
│       └── apple-touch-icon.png
└── public/
    ├── manifest.json
    ├── robots.txt
    └── sw.js

Configuration Files:
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── deploy.yml
│       └── lighthouse.yml
├── lighthouse.config.js
├── bundle-analyzer.config.js
└── sentry.config.js

Documentation Files:
├── docs/
│   ├── DEPLOYMENT.md
│   ├── PERFORMANCE.md
│   ├── ACCESSIBILITY.md
│   └── TROUBLESHOOTING.md

Modified Files:
├── vite.config.ts (production optimizations)
├── package.json (build scripts, dependencies)
├── tsconfig.json (strict settings)
├── src/main.tsx (error monitoring setup)
├── src/router/index.tsx (help and legal routes)
├── src/components/layout/Header.tsx (help navigation)
├── src/components/layout/Footer.tsx (legal links)
├── index.html (meta tags, PWA setup)
└── README.md (updated documentation)
```

### Final Deliverables

When this objective is complete, you will have:

- ✅ **Complete help system** with tutorials, FAQ, and support
- ✅ **Robust error handling** with graceful fallbacks and recovery
- ✅ **Optimized performance** with fast loading and smooth operation
- ✅ **Professional polish** with consistent UI and micro-interactions
- ✅ **Full accessibility** supporting users with disabilities
- ✅ **Production deployment** with monitoring and error tracking
- ✅ **Cross-platform compatibility** working on all devices and browsers
- ✅ **Legal compliance** with privacy policy and terms of service
- ✅ **PWA capabilities** for offline chess training
- ✅ **Research-validated build optimization** using Vite (16x faster than CRA)

### How to Validate Success

After completing this objective, you should be able to:

1. **Help users:** New users can find help → complete tutorials → solve problems independently
2. **Handle errors:** Disconnect internet → see graceful error handling → reconnect and continue
3. **Performance:** App loads quickly → smooth animations → responsive on mobile
4. **Accessibility:** Navigate entire app with keyboard → screen reader announces chess moves
5. **Production:** Deploy to hosting → monitor performance → handle real user traffic
6. **Cross-platform:** Test on different browsers and devices → consistent experience everywhere

The final production app should:
- Load in under 3 seconds on 3G connection
- Work perfectly on Chrome, Firefox, Safari, and Edge
- Be fully keyboard navigable and screen reader compatible  
- Handle network failures and API errors gracefully
- Provide professional user experience comparable to commercial chess apps

## Objective 7: Comprehensive Testing Suite

### Objective

Create a complete testing suite using research-validated testing tools (Vitest + Playwright) to ensure all application features work correctly across all platforms and scenarios. At the end of this objective, you will have comprehensive test coverage including unit tests, integration tests, and end-to-end tests.

### Step 1: Unit Testing with Vitest

**Goal:** Create comprehensive unit tests for all components and services

**Actions:**
1. **Set up Vitest test environment:**
   - Configure Vitest with jsdom environment (5x faster than Jest)
   - Set up React Testing Library integration
   - Configure test coverage reporting
   - Add test utilities and custom matchers

2. **Create component unit tests:**
   - Test all auth components (LoginForm, RegisterForm, ProtectedRoute)
   - Test all chess components (ChessBoardWrapper, GameControls, MoveHistory)
   - Test all puzzle components (PuzzleBoard, HintSystem, SolutionFeedback)
   - Test UI components (Button, Input, Card, Modal)

3. **Create service unit tests:**
   - Test API clients (AuthApiClient, GameApiClient, PuzzleApiClient)
   - Test Stockfish service and Web Worker integration
   - Test audio service and Howler.js integration
   - Test state management (Zustand stores)

**Milestone:** All components and services have comprehensive unit test coverage

### Step 2: Integration Testing

**Goal:** Test component interactions and API integrations

**Actions:**
1. **Create authentication flow tests:**
   - Test complete login/logout workflows
   - Test protected route access and redirection
   - Test token refresh and session persistence
   - Test error handling for auth failures

2. **Create chess game integration tests:**
   - Test complete game creation and gameplay flow
   - Test Stockfish AI integration and responses
   - Test chess board interaction with game state
   - Test audio feedback integration with game events

3. **Create puzzle training integration tests:**
   - Test puzzle loading and solution submission
   - Test hint system integration with backend
   - Test progress tracking and statistics updates
   - Test spaced repetition algorithm

**Milestone:** All major user workflows are tested with integration tests

### Step 3: End-to-End Testing with Playwright

**Goal:** Test complete user journeys across different browsers

**Actions:**
1. **Set up Playwright test environment:**
   - Configure Playwright for multiple browsers (Chrome, Firefox, Safari)
   - Set up mobile device emulation for responsive testing
   - Configure test data and database seeding
   - Add screenshot and video recording for test failures

2. **Create authentication E2E tests:**
   - Test user registration flow from start to finish
   - Test login flow with various credential scenarios
   - Test password reset workflow
   - Test session management across browser sessions

3. **Create chess gameplay E2E tests:**
   - Test complete chess game from creation to completion
   - Test AI opponent interaction and response times
   - Test game controls, resignation, and draw offers
   - Test game history and review functionality

4. **Create puzzle training E2E tests:**
   - Test complete puzzle solving sessions
   - Test hint usage and progression
   - Test difficulty adjustment and spaced repetition
   - Test progress tracking and statistics updates

**Milestone:** All user journeys work correctly across different browsers and devices

### Step 4: Performance Testing

**Goal:** Ensure application meets performance requirements

**Actions:**
1. **Create performance benchmarks:**
   - Test chess board interaction response times (<50ms requirement)
   - Test Stockfish analysis performance across different depths
   - Test audio system performance and mobile compatibility
   - Test React Spring animation performance

2. **Create load testing scenarios:**
   - Test API response times under various conditions
   - Test concurrent user scenarios (if applicable)
   - Test memory usage during long training sessions
   - Test chess engine performance optimization

3. **Create mobile performance tests:**
   - Test touch interaction response times on mobile
   - Test audio playback on mobile devices with restrictions
   - Test chess board rendering performance on older devices
   - Test battery usage during extended use

**Milestone:** Application meets all performance requirements across devices

### Step 5: Accessibility Testing

**Goal:** Ensure application is fully accessible

**Actions:**
1. **Create automated accessibility tests:**
   - Integrate axe-core with Vitest for WCAG compliance testing
   - Test color contrast ratios across all UI components
   - Test keyboard navigation throughout the application
   - Test screen reader compatibility with chess components

2. **Create keyboard navigation tests:**
   - Test complete chess board navigation with arrow keys
   - Test form navigation and submission with keyboard only
   - Test modal and dialog keyboard accessibility
   - Test focus management during navigation

3. **Create screen reader tests:**
   - Test chess position announcements for screen readers
   - Test move history reading and navigation
   - Test game state announcements (check, checkmate)
   - Test puzzle feedback and hint system accessibility

**Milestone:** Application is fully accessible and WCAG 2.1 AA compliant

### Step 6: Cross-Browser and Device Testing

**Goal:** Ensure compatibility across all target platforms

**Actions:**
1. **Create cross-browser test matrix:**
   - Test all features in Chrome, Firefox, Safari, and Edge
   - Test mobile browsers on iOS and Android
   - Test progressive web app functionality
   - Test offline capability where applicable

2. **Create responsive design tests:**
   - Test chess board usability on various screen sizes
   - Test form layouts on mobile devices
   - Test navigation and menu functionality
   - Test touch interactions and gestures

3. **Create compatibility tests:**
   - Test Stockfish Web Worker compatibility across browsers
   - Test Howler.js audio compatibility and mobile restrictions
   - Test React Spring animations across different devices
   - Test TanStack Query caching across browser sessions

**Milestone:** Application works consistently across all target platforms

### Step 7: Test Data Management and Fixtures

**Goal:** Create reliable test data and mocking systems

**Actions:**
1. **Create comprehensive test fixtures:**
   - Create user data fixtures for various test scenarios
   - Create chess game data fixtures for different game states
   - Create puzzle data fixtures for training scenarios
   - Create API response mocks for consistent testing

2. **Create testing utilities:**
   - Create helper functions for common test operations
   - Create custom matchers for chess-specific assertions
   - Create mock implementations for external services
   - Create test database seeding and cleanup utilities

3. **Create CI/CD integration:**
   - Configure tests to run automatically on commits
   - Set up test coverage reporting and thresholds
   - Configure parallel test execution for faster CI
   - Set up test failure notifications and reporting

**Milestone:** Testing infrastructure is robust and maintainable

### Step 8: Test Documentation and Maintenance

**Goal:** Ensure tests are well-documented and maintainable

**Actions:**
1. **Create testing documentation:**
   - Document testing strategies and best practices
   - Create guides for writing new tests
   - Document test data management and fixtures
   - Create troubleshooting guides for test failures

2. **Create test maintenance procedures:**
   - Establish procedures for updating tests with feature changes
   - Create guidelines for test refactoring and cleanup
   - Set up regular test review and optimization
   - Establish test coverage goals and monitoring

3. **Create test reporting and analytics:**
   - Set up comprehensive test reporting dashboards
   - Create test performance monitoring
   - Set up flaky test detection and resolution
   - Create test trend analysis and insights

**Milestone:** Testing system is fully documented and maintainable

### Files to Create/Modify in Objective 7

**New Files Created:**
```
tests/
├── unit/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.test.tsx
│   │   │   ├── RegisterForm.test.tsx
│   │   │   └── ProtectedRoute.test.tsx
│   │   ├── chess/
│   │   │   ├── ChessBoardWrapper.test.tsx
│   │   │   ├── GameControls.test.tsx
│   │   │   ├── MoveHistory.test.tsx
│   │   │   └── StockfishPanel.test.tsx
│   │   ├── puzzles/
│   │   │   ├── PuzzleBoard.test.tsx
│   │   │   ├── HintSystem.test.tsx
│   │   │   ├── SolutionFeedback.test.tsx
│   │   │   └── PuzzleConfigForm.test.tsx
│   │   ├── audio/
│   │   │   └── AudioProvider.test.tsx
│   │   └── ui/
│   │       ├── Button.test.tsx
│   │       ├── Input.test.tsx
│   │       └── Card.test.tsx
│   ├── services/
│   │   ├── api/
│   │   │   ├── ApiClient.test.ts
│   │   │   ├── AuthApiClient.test.ts
│   │   │   ├── GameApiClient.test.ts
│   │   │   └── PuzzleApiClient.test.ts
│   │   ├── chess/
│   │   │   ├── StockfishService.test.ts
│   │   │   └── ChessLogicService.test.ts
│   │   └── audio/
│   │       └── AudioService.test.ts
│   ├── stores/
│   │   ├── authStore.test.ts
│   │   ├── gameStore.test.ts
│   │   └── puzzleStore.test.ts
│   ├── hooks/
│   │   ├── useAuth.test.ts
│   │   ├── useChessGame.test.ts
│   │   └── usePuzzleSession.test.ts
│   └── utils/
│       ├── chessHelpers.test.ts
│       └── spacedRepetition.test.ts
├── integration/
│   ├── auth/
│   │   ├── login-flow.test.tsx
│   │   ├── registration-flow.test.tsx
│   │   └── protected-routes.test.tsx
│   ├── chess/
│   │   ├── game-creation.test.tsx
│   │   ├── ai-interaction.test.tsx
│   │   └── game-completion.test.tsx
│   ├── puzzles/
│   │   ├── puzzle-solving.test.tsx
│   │   ├── hint-system.test.tsx
│   │   └── progress-tracking.test.tsx
│   └── api/
│       ├── auth-integration.test.ts
│       ├── game-integration.test.ts
│       └── puzzle-integration.test.ts
├── e2e/
│   ├── auth/
│   │   ├── registration.spec.ts
│   │   ├── login.spec.ts
│   │   └── password-reset.spec.ts
│   ├── chess/
│   │   ├── game-vs-ai.spec.ts
│   │   ├── game-controls.spec.ts
│   │   └── game-history.spec.ts
│   ├── puzzles/
│   │   ├── puzzle-training.spec.ts
│   │   ├── hint-usage.spec.ts
│   │   └── progress-tracking.spec.ts
│   ├── profile/
│   │   ├── profile-management.spec.ts
│   │   └── statistics-viewing.spec.ts
│   └── accessibility/
│       ├── keyboard-navigation.spec.ts
│       ├── screen-reader.spec.ts
│       └── wcag-compliance.spec.ts
├── performance/
│   ├── chess-board-performance.spec.ts
│   ├── stockfish-performance.spec.ts
│   ├── audio-performance.spec.ts
│   └── mobile-performance.spec.ts
├── fixtures/
│   ├── users.ts
│   ├── games.ts
│   ├── puzzles.ts
│   └── api-responses.ts
├── mocks/
│   ├── api-clients.ts
│   ├── stockfish-service.ts
│   ├── audio-service.ts
│   └── browser-apis.ts
├── utils/
│   ├── test-helpers.ts
│   ├── custom-matchers.ts
│   ├── test-setup.ts
│   └── database-helpers.ts
└── setup/
    ├── vitest.setup.ts
    ├── playwright.setup.ts
    ├── test-environment.ts
    └── global-teardown.ts

Configuration Files:
├── vitest.config.ts (comprehensive configuration)
├── playwright.config.ts (multi-browser setup)
├── coverage.config.ts
└── .github/workflows/tests.yml (CI/CD integration)

Documentation:
├── docs/testing/
│   ├── TESTING_STRATEGY.md
│   ├── UNIT_TESTING_GUIDE.md
│   ├── E2E_TESTING_GUIDE.md
│   ├── PERFORMANCE_TESTING.md
│   ├── ACCESSIBILITY_TESTING.md
│   └── TEST_MAINTENANCE.md
```

### Final Deliverables

When this objective is complete, you will have:

- ✅ **Comprehensive unit tests** using Vitest (5x faster than Jest)
- ✅ **Integration tests** covering all major user workflows
- ✅ **End-to-end tests** using Playwright across multiple browsers
- ✅ **Performance tests** ensuring <50ms chess interaction times
- ✅ **Accessibility tests** with WCAG 2.1 AA compliance
- ✅ **Cross-browser compatibility** tests for all target platforms
- ✅ **Mobile device testing** with touch interaction validation
- ✅ **Test fixtures and mocks** for consistent, reliable testing
- ✅ **CI/CD integration** with automated test execution
- ✅ **Test documentation** and maintenance procedures
- ✅ **Coverage reporting** with quality gates and thresholds

### How to Validate Success

After completing this objective, you should be able to:

1. **Run all tests:** `npm test` → all unit, integration, and E2E tests pass
2. **Check coverage:** Test coverage reports show >90% coverage for critical paths
3. **Cross-browser testing:** Tests pass in Chrome, Firefox, Safari, and Edge
4. **Mobile testing:** All functionality works correctly on mobile devices
5. **Performance validation:** Chess interactions consistently meet <50ms requirement
6. **Accessibility validation:** All accessibility tests pass with WCAG compliance
7. **CI/CD validation:** Tests run automatically on commits and deployments

## Implementation Sequence

The objectives are ordered by dependency and API integration complexity:

- **Objective 1**: Authentication & Foundation - Required API integration foundation
- **Objective 2**: Chess Game Integration - Core chess functionality via API
- **Objective 3**: Puzzle Training Integration - Main training features via API
- **Objective 4**: User Profile & Statistics - User data and progress via API
- **Objective 5**: Game Analysis System - Analysis features using API data
- **Objective 6**: Polish & Production Features - Final features and optimization
- **Objective 7**: Comprehensive Testing Suite - Complete test coverage with Vitest + Playwright

## Success Metrics

### API Integration

- All API endpoints from documentation successfully integrated
- Proper error handling for all API responses
- Loading states implemented for all API calls
- Data synchronization between frontend and backend

### User Experience

- Authentication flow works seamlessly with API
- Chess games play smoothly using API
- Puzzle solving integrates properly with API
- Statistics and progress reflect API data accurately

### Technical Quality

- TypeScript compilation with zero errors
- All API calls properly typed
- Error boundaries handle API failures gracefully
- Performance targets met with API integration

## Progress Tracking

### Objective Completion Status

| Objective | Description                 | Status         | Start Date | Complete Date | Notes                                   |
| --------- | --------------------------- | -------------- | ---------- | ------------- | --------------------------------------- |
| **1**     | Authentication & Foundation | ⏸️ Not Started |            |               | API integration for auth and UI foundation |
| **2**     | Chess Game Integration    | ⏸️ Not Started |            |               | Chess gameplay with Stockfish AI using game API endpoints        |
| **3**     | Puzzle Training Integration      | ⏸️ Not Started |            |               | Puzzle system with spaced repetition using puzzle API endpoints       |
| **4**     | User Profile & Statistics     | ⏸️ Not Started |            |               | Profile and stats using user API endpoints       |
| **5**     | Game Analysis System        | ⏸️ Not Started |            |               | Stockfish analysis using API game data   |
| **6**     | Polish & Production Features   | ⏸️ Not Started |            |               | Final features and optimization      |
| **7**     | Comprehensive Testing Suite   | ⏸️ Not Started |            |               | Vitest + Playwright testing with >90% coverage      |

### Status Legend

- ⏸️ **Not Started** - Objective not yet begun
- 🔄 **In Progress** - Currently working on this objective
- ✅ **Complete** - Objective finished and validated
- ⚠️ **Blocked** - Cannot proceed due to dependencies or issues
- 🔄 **Testing** - Implementation complete, validation in progress

### Key Milestones

- [ ] **Foundation Ready** (Obj 1 complete) - Authentication and UI working with API
- [ ] **Chess Core Ready** (Obj 2 complete) - Playable chess with Stockfish AI using game API
- [ ] **Training Active** (Obj 3 complete) - Puzzle training with spaced repetition using puzzle API
- [ ] **Profile Complete** (Obj 4 complete) - User management using user API
- [ ] **Analysis Ready** (Obj 5 complete) - Stockfish game analysis using API data
- [ ] **Production Ready** (Obj 6 complete) - All features complete and optimized
- [ ] **Testing Complete** (Obj 7 complete) - Comprehensive test suite with >90% coverage

### Usage Instructions

1. **Update Status**: Change status emoji as work progresses
2. **Add Dates**: Fill in start/complete dates to track timeline
3. **Add Notes**: Include API integration details, blockers, or discoveries
4. **Check Milestones**: Mark milestones as completed when validation criteria are met
5. **File Coverage**: Each objective includes comprehensive file lists to ensure complete project structure population

### Project Structure Population

Following this implementation plan will create **every file needed** for the complete chess training application:

**📊 Total File Creation Coverage:**
- **Objective 1**: ~30 files (SRP-compliant: 3 API clients, 3 stores, 3 hooks, 3 type files, authentication foundation, basic UI)
- **Objective 2**: ~35 files (chess gameplay, Stockfish AI, audio system)  
- **Objective 3**: ~30 files (puzzle training, spaced repetition, progress tracking)
- **Objective 4**: ~35 files (user profiles, statistics, preferences, achievements)
- **Objective 5**: ~25 files (game analysis, Stockfish integration, pattern recognition)
- **Objective 6**: ~40 files (production features, error handling, accessibility, help system)
- **Objective 7**: ~60 files (comprehensive testing suite with >90% coverage)

**🎯 Total: ~250+ files** covering the complete project structure from `/docs/frontend/12-project-structure.md`

This table should be updated regularly to track progress and identify any bottlenecks or dependencies that need attention.