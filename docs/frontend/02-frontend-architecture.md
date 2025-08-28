# Frontend Architecture Document

## Executive Summary

This document defines the technical architecture for the Chess Training application frontend, **now aligned with actual research findings** (see `TECHNICAL-DECISIONS-RESEARCH.md`). The architecture enforces **Single Responsibility Principle (SRP)** and **Don't Repeat Yourself (DRY)** principles while following domain-based organization and modern React patterns.

> **Research Alignment Update**: This document has been updated to reflect actual research conducted for technical decisions. All major technology choices are now properly categorized as either ✅ **research-validated**, *(standard choice)*, or ⚠️ **assumption-based**.

## Core Architectural Principles

### 1. Single Responsibility Principle (SRP)
Each component, hook, service, and module has a single, well-defined responsibility:

- **Components**: Handle only their specific UI rendering and local state
- **Custom Hooks**: Manage specific business logic or state concerns
- **Services**: Handle external API interactions or complex calculations
- **Stores**: Manage specific domain state (auth, game, puzzle, etc.)
- **Utils**: Perform single-purpose utility functions

### 2. Don't Repeat Yourself (DRY)
Eliminate code duplication through:

- **Shared Components**: Reusable UI components with props-based customization
- **Custom Hooks**: Reusable stateful logic across components
- **Service Abstraction**: Centralized API interaction patterns
- **Configuration Objects**: Shared constants, themes, and settings
- **Type Definitions**: Shared TypeScript interfaces and types

### 3. Separation of Concerns
Clear boundaries between different aspects of the application:

### 4. **Navigation Architecture (Research-Validated)**
**Critical Finding**: Electron apps require different routing patterns than web apps to prevent white flash and ensure smooth transitions.

**✅ Research-Based Navigation Decisions**:
- **HashRouter over BrowserRouter**: "BrowserRouter may not work at all with file-based environments like Electron" due to `file://` URL constraints
- **Programmatic Navigation**: Use `useNavigate()` hooks instead of declarative `<Navigate>` components for authentication flows
- **Critical CSS**: Inline styles in HTML `<head>` to prevent FOUC (Flash of Unstyled Content) before React loads
- **Theme-First Loading**: Theme applied synchronously before any routing occurs to prevent flicker

**Navigation Flow Pattern**:
```
User Action → Loading State (500ms) → Success Animation (300ms) → navigate('/route', {replace: true})
```

### 5. **Design System & Style Guide (Golden Standard)**
**Reference Implementation**: The Login Page (`src/pages/LoginPage.tsx`) serves as the **golden standard** for all design patterns and technical implementations.

**✅ Comprehensive Style Guide**: See `15-style-guide-golden-standard.md` for:
- **Visual design patterns** (glass morphism, gaming aesthetics, theme integration)  
- **Animation standards** (GPU-accelerated, performance-optimized)
- **Sound design integration** (click feedback, success/error audio)
- **Accessibility requirements** (focus states, reduced motion support)
- **Technical implementation** (component structure, error handling)
- **Quality gates** (checklist for new components)

- **Presentation Layer**: React components focused on UI rendering
- **Business Logic Layer**: Custom hooks and services for chess logic
- **State Management Layer**: Zustand stores for global state
- **Data Access Layer**: API services and local storage utilities

## Technical Stack Decision

### Core Framework ✅ **Research-Validated Choices**
- **React 18.2+** - Component-based UI library with modern hooks
- **TypeScript 5.0+** - Type safety and enhanced development experience  
- **Vite 4.3+** - Fast build tool with HMR support *(Research-validated - see Technical Decisions Research)*
  - **Development Speed**: 16x faster startup time (390ms vs 4.5s CRA)
  - **TypeScript Performance**: ESBuild compilation significantly faster
  - **Industry Trend**: Preferred choice for new React projects in 2024

### UI Framework Selection
**Decision: Shadcn UI + Tailwind CSS** ✅ **Research-validated choice** (Updated from Chakra UI)

**Primary UI Framework: Shadcn UI**
- **Zero Migration Path**: Built on Tailwind CSS, leveraging existing investment
- **Desktop Application Optimized**: Superior performance in Electron applications
- **Gaming Aesthetics**: Excellent support for dark themes and glassmorphism effects
- **Component Quality**: High-quality, customizable components with proper TypeScript support
- **Research Validation**: Identified as top choice for desktop gaming applications

**Supporting Libraries:**
- **Tailwind CSS 3.4+**: Utility-first CSS framework for rapid styling
- **@radix-ui/react-\***: Unstyled, accessible components (Shadcn UI foundation)
- **class-variance-authority**: Component variant styling utility
- **tailwind-merge + clsx**: Utility for merging Tailwind classes safely
- **@heroicons/react**: Consistent, well-maintained React icons
- **@headlessui/react**: Additional headless UI components for complex interactions

**Migration Benefits:**
- **Bundle Size**: Significantly smaller than previous Chakra UI implementation
- **Performance**: No runtime CSS-in-JS overhead, optimized for desktop applications
- **Gaming UI**: Native support for dark themes, gradients, and modern gaming aesthetics
- **Developer Experience**: Better TypeScript integration and component customization
- **Maintenance**: Stable foundation with active development and community support

### Chess Libraries ✅ **Research-Validated Stack**
- **chess.js** - Chess game logic and validation *(Validated in research)*
- **react-chessboard** - Modern, actively maintained board component *(Validated in research)*

### State Management ✅ **Implementation Decision Override**
**Decision: React Context API + useState/useReducer** *(Override from research-recommended Zustand)*

**Research Finding**: TECHNICAL-DECISIONS-RESEARCH.md recommended Zustand for chess applications
**Implementation Decision**: Chose React Context API instead

**Override Rationale:**
- **Architecture Simplification**: Removed external state library dependency for simpler codebase
- **Bundle Size**: Zero additional bytes - uses native React APIs vs Zustand's 3.53KB
- **Desktop Focus**: Context API sufficient for desktop app without complex state requirements
- **Theme-Specific**: Primary use case is theme management with Electron persistence
- **Performance**: Acceptable for our use cases with React.memo and useCallback optimization

**Current Implementation:**
- **Theme Management**: React Context for global theme state with Electron persistence
- **Domain State**: useState/useReducer for local component state (chess games, forms, etc.)
- **Electron Integration**: Direct integration with Electron IPC for native desktop features

### HTTP Client ✅ **Research-Validated**
**Decision: axios** *(Now research-validated - see Technical Decisions Research)*
- **Authentication**: Superior JWT interceptor patterns for chess app session management
- **Error Handling**: Built-in error handling reduces boilerplate for API failures
- **Developer Experience**: Interceptors provide automatic token management

### Server State Management ✅ **Research-Validated**
**Decision: TanStack Query** *(Now research-validated - see Technical Decisions Research)*
- **Chess-Specific Features**: Superior mutation handling for chess move optimistic updates
- **Real-Time Integration**: Excellent WebSocket integration patterns for live game synchronization
- **DevTools**: Built-in debugging tools essential for complex chess state management

### Form Handling ✅ **Research-Validated**
**Decision: React Hook Form** *(Now research-validated - see Technical Decisions Research)*
- **Performance**: 6x smaller than Formik (12.12KB vs 44.34KB)
- **Active Maintenance**: Formik unmaintained, React Hook Form actively developed
- **TypeScript Integration**: Stricter types with Zod integration
- **Re-render Optimization**: Minimal re-renders crucial for chess app performance

### Animation System ✅ **Research-Validated**
**Decision: React Spring** *(Now research-validated - see Technical Decisions Research)*
- **Bundle Size**: 19KB vs Framer Motion's 44KB (57% smaller)
- **Chess-Specific Performance**: Physics-based animations ideal for realistic piece movement
- **Render Optimization**: Bypasses React re-renders during animations
- **Natural Movement**: Spring dynamics create more realistic chess piece animations

### Audio System ✅ **Research-Validated**
**Decision: Howler.js** *(Now research-validated - see Technical Decisions Research)*
- **Cross-Browser Compatibility**: Web Audio API with HTML5 Audio fallback
- **Mobile Optimization**: Built-in iOS Safari restrictions handling and auto-unlock
- **Audio Sprites**: Perfect for chess piece sounds and feedback optimization
- **Performance**: Automatic caching and optimized loading for repeated chess sounds

### Chess Engine Integration ✅ **Research-Validated**
**Decision: Stockfish.js** *(Critical requirement from research)*
- **AI Opponents**: Required for intelligent chess gameplay - all major platforms use it
- **Game Analysis**: Essential for move evaluation and position assessment
- **Multiple Variants**: Lite (7MB) for quick moves, Full (75MB) for deep analysis
- **Web Worker Integration**: Prevents UI blocking during analysis

### Testing Architecture ✅ **Research-Validated**
**Decision: Vitest + Playwright** *(Now research-validated - see Technical Decisions Research)*
- **Vitest Performance**: Significantly faster than Jest with parallel Worker threads
- **Modern Features**: ES modules, TypeScript, JSX support out-of-the-box
- **Playwright Cross-Browser**: Comprehensive browser coverage for chess app testing
- **Chess App Suitability**: Fast test execution crucial for rapid chess interaction testing

### Additional Dependencies
- **React Router DOM** - Client-side routing *(Standard choice)*
- **js-cookie** - Token storage and management ⚠️ *(Assumption-based - not researched)*

> **Research Status**: All major technical decisions now have research backing. See `docs/frontend/TECHNICAL-DECISIONS-RESEARCH.md` for detailed analysis and evidence supporting these choices.

## Application Architecture

### Folder Structure (Domain-Based Organization)
```
src/
├── components/           # Domain-organized UI components
│   ├── auth/            # Authentication components
│   ├── chess/           # Chess board and game components
│   ├── puzzles/         # Puzzle training components
│   ├── openings/        # Opening training components
│   ├── analysis/        # Game analysis components
│   ├── statistics/      # Statistics and progress components
│   ├── ui/              # Shared UI components
│   └── layout/          # Layout components
├── pages/              # Route-level components organized by domain
├── hooks/              # Custom React hooks
├── services/           # API and business logic services
├── stores/             # Zustand state stores
├── utils/              # Pure utility functions
├── types/              # TypeScript type definitions
├── constants/          # Application constants
├── styles/             # Global styles and themes
└── assets/             # Static assets (images, sounds)
```

### Component Architecture (Domain-Based)

#### Shared UI Components
```typescript
// src/components/ui/Button.tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md',
  className = '',
  children, 
  isLoading,
  ...props 
}) => {
  // Single responsibility: Render styled button with Tailwind CSS
  const baseClasses = 'font-medium rounded-lg focus:outline-none focus:ring-2 transition-colors'
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500'
  }
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  }
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};
```

#### Chess Domain Components
```typescript
// src/components/chess/ChessBoard.tsx
interface ChessBoardProps {
  position: string;
  onMove: (move: { from: string; to: string }) => void;
  orientation?: 'white' | 'black';
  showCoordinates?: boolean;
}

const ChessBoard: React.FC<ChessBoardProps> = ({ 
  position, 
  onMove, 
  orientation = 'white',
  showCoordinates = true 
}) => {
  // Single responsibility: Render interactive chess board
  return (
    <Chessboard
      position={position}
      onPieceDrop={onMove}
      boardOrientation={orientation}
      showBoardNotation={showCoordinates}
    />
  );
};
```

#### Puzzle Domain Components
```typescript
// src/components/puzzles/PuzzleInterface.tsx
const PuzzleInterface: React.FC = () => {
  const { currentPuzzle, submitMove } = usePuzzle();
  const { playSound } = useSound();
  
  // Single responsibility: Manage complete puzzle solving interface
  return (
    <VStack spacing={4}>
      <PuzzleHeader puzzle={currentPuzzle} />
      <ChessBoard 
        position={currentPuzzle.position}
        onMove={handleMove}
      />
      <PuzzleControls />
    </VStack>
  );
};
```

### State Management Architecture (Updated)

#### React Context API Implementation
```typescript
// src/stores/authStore.ts - Updated to React Context API
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  tokens: AuthTokens | null;
}

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthStore = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthStore must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    tokens: null,
  });

  // Single responsibility: Manage authentication state
  const login = useCallback(async (credentials: LoginCredentials) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await AuthApiClient.login(credentials);
      setState({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        tokens: response.tokens
      });
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error.message, 
        isLoading: false 
      }));
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await AuthApiClient.logout();
    } finally {
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        tokens: null
      });
    }
  }, []);

  const value = {
    ...state,
    login,
    logout,
    loadUser,
    clearError: () => setState(prev => ({ ...prev, error: null }))
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

#### Context Providers by Domain
- **AuthProvider** - Authentication and user management
- **ThemeProvider** - Theme state with Electron persistence *(Implemented)*
- **GameProvider** - Current game state and chess logic
- **PuzzleProvider** - Puzzle training state and progress
- **SettingsProvider** - User preferences and configuration

#### Theme Management Implementation *(Current)*
```typescript
// src/stores/themeStore.ts - Gaming theme system with Electron persistence
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<string>('cyber-neon');
  
  const setTheme = useCallback((themeId: string) => {
    if (themes[themeId]) {
      setCurrentTheme(themeId);
      
      // Update CSS variables
      const theme = themes[themeId];
      const root = document.documentElement;
      
      root.style.setProperty('--chess-light', theme.chessLight);
      root.style.setProperty('--chess-dark', theme.chessDark);
      root.style.setProperty('--chess-border', theme.chessBorder);
      
      // Save to Electron config for persistence
      if (typeof window !== 'undefined' && (window as any).electronAPI?.config) {
        (window as any).electronAPI.config.set('theme', themeId);
      }
    }
  }, []);

  // Gaming themes: Cyber Neon, Dragon Gold, Shadow Knight, Emerald Matrix, Crimson War
  const value = { currentTheme, setTheme, getCurrentTheme };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
```

### Service Layer Architecture

#### API Client Configuration
```typescript
// src/services/ApiClient.ts
export class ApiClient {
  private axiosInstance: AxiosInstance;
  
  constructor() {
    // Single responsibility: Configure HTTP client for API communication
    this.axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    this.setupInterceptors();
  }
  
  // DRY: Centralized request/response handling
  private setupInterceptors(): void {
    // Request interceptor for auth token
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = Cookies.get('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    
    // Response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle token refresh or redirect to login
          AuthApiClient.handleUnauthorized();
        }
        return Promise.reject(error);
      }
    );
  }
  
  // HTTP method helpers
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }
  
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }
  
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }
  
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response.data;
  }
}
```

#### Domain API Services
```typescript
// src/services/AuthApiClient.ts
export class AuthApiClient {
  private apiClient: ApiClient;
  
  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }
  
  // Single responsibility: Handle authentication API calls
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await this.apiClient.post<AuthResponse>('/auth/login', {
        email: credentials.email,
        password: credentials.password
      });
      
      // Store tokens securely
      if (response.tokens) {
        Cookies.set('authToken', response.tokens.accessToken, {
          expires: new Date(response.tokens.expiresAt),
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });
        
        if (response.tokens.refreshToken) {
          Cookies.set('refreshToken', response.tokens.refreshToken, {
            expires: 30, // 30 days
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
          });
        }
      }
      
      return response;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }
  
  async register(userData: RegisterData): Promise<AuthResponse> {
    return this.apiClient.post<AuthResponse>('/auth/register', userData);
  }
  
  async refreshToken(): Promise<AuthResponse> {
    const refreshToken = Cookies.get('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    return this.apiClient.post<AuthResponse>('/auth/refresh', {
      refreshToken
    });
  }
  
  async logout(): Promise<void> {
    try {
      await this.apiClient.post('/auth/logout');
    } finally {
      // Always clear tokens locally
      Cookies.remove('authToken');
      Cookies.remove('refreshToken');
    }
  }
  
  getCurrentUser(): Promise<User> {
    return this.apiClient.get<User>('/user/profile');
  }
  
  private handleAuthError(error: any): Error {
    if (error.response?.data?.message) {
      return new Error(error.response.data.message);
    }
    return new Error('Authentication failed');
  }
  
  static handleUnauthorized(): void {
    // Handle unauthorized access (redirect to login, etc.)
    Cookies.remove('authToken');
    Cookies.remove('refreshToken');
    window.location.href = '/auth/login';
  }
}

// Additional API Services
// src/services/GameApiClient.ts
export class GameApiClient {
  constructor(private apiClient: ApiClient) {}
  
  createGame(gameData: CreateGameData): Promise<Game> {
    return this.apiClient.post<Game>('/games/create', gameData);
  }
  
  makeMove(gameId: string, move: ChessMove): Promise<MoveResponse> {
    return this.apiClient.post<MoveResponse>(`/games/${gameId}/move`, move);
  }
  
  getGameHistory(gameId: string): Promise<GameHistory> {
    return this.apiClient.get<GameHistory>(`/games/${gameId}/history`);
  }
}

// src/services/PuzzleApiClient.ts
export class PuzzleApiClient {
  constructor(private apiClient: ApiClient) {}
  
  getNextPuzzle(): Promise<Puzzle> {
    return this.apiClient.get<Puzzle>('/puzzles/next');
  }
  
  solvePuzzle(puzzleId: string, solution: PuzzleSolution): Promise<SolveResponse> {
    return this.apiClient.post<SolveResponse>(`/puzzles/${puzzleId}/solve`, solution);
  }
  
  getPuzzlesByTheme(theme: string): Promise<Puzzle[]> {
    return this.apiClient.get<Puzzle[]>(`/puzzles/theme/${theme}`);
  }
}

// src/services/StatsApiClient.ts
export class StatsApiClient {
  constructor(private apiClient: ApiClient) {}
  
  getDashboardStats(): Promise<DashboardStats> {
    return this.apiClient.get<DashboardStats>('/stats/dashboard');
  }
  
  getDetailedStats(): Promise<DetailedStats> {
    return this.apiClient.get<DetailedStats>('/stats/detailed');
  }
  
  getUserProgress(): Promise<ProgressData> {
    return this.apiClient.get<ProgressData>('/user/progress');
  }
}
```

#### Chess Engine Service (Research-Validated)
```typescript
// src/services/StockfishService.ts - Critical for AI opponents and analysis
import Stockfish from 'stockfish'

interface StockfishAnalysis {
  bestMove: string
  evaluation: number
  depth: number
  pv: string[] // Principal variation
}

export class StockfishService {
  private worker: Worker | null = null
  private messageQueue: Map<string, (result: any) => void> = new Map()

  constructor() {
    this.initializeWorker()
  }

  private initializeWorker() {
    this.worker = new Worker(new URL('../workers/stockfish.worker.ts', import.meta.url))
    this.worker.onmessage = (event) => {
      const { id, result } = event.data
      const callback = this.messageQueue.get(id)
      if (callback) {
        callback(result)
        this.messageQueue.delete(id)
      }
    }
  }

  // Single responsibility: Chess position analysis
  async analyzePosition(fen: string, depth: number = 15): Promise<StockfishAnalysis> {
    return new Promise((resolve) => {
      const id = Math.random().toString(36)
      this.messageQueue.set(id, resolve)
      
      this.worker?.postMessage({
        id,
        type: 'analyze',
        fen,
        depth
      })
    })
  }

  // Single responsibility: AI opponent move generation
  async getBestMove(fen: string, difficulty: 'easy' | 'medium' | 'hard'): Promise<string> {
    const depthMap = { easy: 5, medium: 10, hard: 15 }
    const analysis = await this.analyzePosition(fen, depthMap[difficulty])
    return analysis.bestMove
  }
}

export const stockfishService = new StockfishService()
```

#### Audio Service Architecture (Research-Validated)
```typescript
// src/services/AudioService.ts - Chess sound effects with Howler.js
import { Howl } from 'howler'

export class AudioService {
  private sounds: Howl
  private enabled: boolean = true

  constructor() {
    // Single responsibility: Manage chess audio effects
    this.sounds = new Howl({
      src: ['/sounds/chess-audio-sprite.mp3'],
      sprite: {
        move: [0, 400],
        capture: [400, 600],
        check: [1000, 800],
        checkmate: [1800, 1200],
        success: [3000, 500],
        error: [3500, 300]
      },
      volume: 0.5
    })
  }

  // DRY: Centralized sound playing with enable/disable control
  private playSound(sprite: string) {
    if (this.enabled) {
      this.sounds.play(sprite)
    }
  }

  playMove() { this.playSound('move') }
  playCapture() { this.playSound('capture') }
  playCheck() { this.playSound('check') }
  playCheckmate() { this.playSound('checkmate') }
  playSuccess() { this.playSound('success') }
  playError() { this.playSound('error') }

  setEnabled(enabled: boolean) {
    this.enabled = enabled
  }

  setVolume(volume: number) {
    this.sounds.volume(volume)
  }
}

export const audioService = new AudioService()
```

#### Form Service Architecture (Research-Validated)
```typescript
// src/services/FormService.ts - React Hook Form integration patterns
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Chess training specific form schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  displayName: z.string().min(2, 'Display name must be at least 2 characters'),
  skillLevel: z.enum(['beginner', 'intermediate', 'advanced'])
})

export const gameSettingsSchema = z.object({
  timeControl: z.number().min(1).max(180),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  color: z.enum(['white', 'black', 'random'])
})

// DRY: Reusable form hook factory
export function useChessForm<T extends z.ZodSchema>(
  schema: T,
  defaultValues?: Partial<z.infer<T>>
) {
  return useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onBlur' // Performance optimization for chess app
  })
}
```

### Custom Hooks Architecture

#### Authentication Hook
```typescript
// src/hooks/useAuth.ts
export const useAuth = () => {
  const store = useAuthStore();

  // Auto-refresh token before expiration
  useEffect(() => {
    if (!store.tokens) return;

    const expiresAt = new Date(store.tokens.expiresAt);
    const now = new Date();
    const timeUntilExpiry = expiresAt.getTime() - now.getTime();
    
    // Refresh 5 minutes before expiry
    const refreshTime = Math.max(0, timeUntilExpiry - 5 * 60 * 1000);

    const timeoutId = setTimeout(() => {
      store.refreshToken();
    }, refreshTime);

    return () => clearTimeout(timeoutId);
  }, [store.tokens]);

  return {
    user: store.user,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    error: store.error,
    login: store.login,
    register: store.register,
    logout: store.logout,
    clearError: store.clearError
  };
};
```

#### Chess Game Hook
```typescript
// src/hooks/useChessGame.ts
export const useChessGame = () => {
  const { currentGame, makeMove, isLoading } = useGameStore();
  const { playSound } = useSound();
  
  // Single responsibility: Manage chess game logic
  const handleMove = useCallback(async (move: { from: string; to: string }) => {
    try {
      const result = await makeMove(move);
      
      if (result.success) {
        playSound('move');
        if (result.capture) playSound('capture');
        if (result.check) playSound('check');
      } else {
        playSound('error');
      }
    } catch (error) {
      console.error('Move failed:', error);
    }
  }, [makeMove, playSound]);
  
  return {
    currentGame,
    isLoading,
    handleMove
  };
};
```

#### Stockfish Integration Hook (Research-Validated)
```typescript
// src/hooks/useStockfish.ts - Chess engine integration
import { useState, useCallback } from 'react'
import { stockfishService } from '../services/StockfishService'

export const useStockfish = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<StockfishAnalysis | null>(null)

  const analyzePosition = useCallback(async (fen: string, depth = 15) => {
    setIsAnalyzing(true)
    try {
      const result = await stockfishService.analyzePosition(fen, depth)
      setAnalysis(result)
      return result
    } finally {
      setIsAnalyzing(false)
    }
  }, [])

  const getAIMove = useCallback(async (
    fen: string, 
    difficulty: 'easy' | 'medium' | 'hard'
  ) => {
    setIsAnalyzing(true)
    try {
      const move = await stockfishService.getBestMove(fen, difficulty)
      return move
    } finally {
      setIsAnalyzing(false)
    }
  }, [])

  return {
    analyzePosition,
    getAIMove,
    analysis,
    isAnalyzing
  }
}
```

#### Animation Hook (Research-Validated)
```typescript
// src/hooks/useChessAnimation.ts - React Spring chess piece animations
import { useSpring, animated } from '@react-spring/web'

export const useChessPieceAnimation = (position: { x: number; y: number }) => {
  const springProps = useSpring({
    transform: `translate(${position.x}px, ${position.y}px)`,
    config: { 
      tension: 300, 
      friction: 30 // Tuned for natural chess piece movement
    }
  })
  
  return { springProps, animated }
}

export const usePuzzleFeedback = (isCorrect: boolean | null) => {
  const feedbackSpring = useSpring({
    scale: isCorrect === true ? 1.1 : isCorrect === false ? 0.9 : 1,
    opacity: isCorrect !== null ? 1 : 0.8,
    color: isCorrect === true ? '#38a169' : isCorrect === false ? '#e53e3e' : '#4a5568',
    config: { tension: 400, friction: 25 }
  })
  
  return { feedbackSpring, animated }
}
```

#### Audio Integration Hook (Research-Validated)
```typescript
// src/hooks/useChessAudio.ts - Howler.js audio integration
import { useCallback } from 'react'
import { audioService } from '../services/AudioService'

export const useChessAudio = () => {
  const playMoveSound = useCallback(() => {
    audioService.playMove()
  }, [])

  const playCaptureSound = useCallback(() => {
    audioService.playCapture()
  }, [])

  const playCheckSound = useCallback(() => {
    audioService.playCheck()
  }, [])

  const playCheckmateSound = useCallback(() => {
    audioService.playCheckmate()
  }, [])

  const playSuccessSound = useCallback(() => {
    audioService.playSuccess()
  }, [])

  const playErrorSound = useCallback(() => {
    audioService.playError()
  }, [])

  const setVolume = useCallback((volume: number) => {
    audioService.setVolume(volume)
  }, [])

  const setEnabled = useCallback((enabled: boolean) => {
    audioService.setEnabled(enabled)
  }, [])

  return {
    playMoveSound,
    playCaptureSound,
    playCheckSound,
    playCheckmateSound,
    playSuccessSound,
    playErrorSound,
    setVolume,
    setEnabled
  }
}
```

### Page Architecture

#### Domain-Organized Pages
```typescript
// src/pages/puzzles/TacticalPuzzlesPage.tsx
const TacticalPuzzlesPage: React.FC = () => {
  const { user } = useAuth();
  const { currentPuzzle } = usePuzzleSession();
  
  // Single responsibility: Coordinate tactical puzzle page
  return (
    <AppLayout>
      <VStack spacing={6}>
        <PuzzleHeader />
        <PuzzleInterface />
        <PuzzleControls />
      </VStack>
    </AppLayout>
  );
};
```

#### Authentication Pages
```typescript
// src/pages/auth/LoginPage.tsx
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuth();

  return (
    <Flex minH="100vh" align="center" justify="center">
      <Card maxW="md" w="full">
        <CardBody>
          <LoginForm 
            email={email}
            password={password}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onSubmit={login}
            isLoading={isLoading}
            error={error}
          />
        </CardBody>
      </Card>
    </Flex>
  );
};
```

## Design System Implementation (Updated)

### Gaming Theme System with Tailwind CSS
```typescript
// src/stores/themeStore.ts - Current implementation
export const themes: Record<string, Theme> = {
  'cyber-neon': {
    id: 'cyber-neon',
    name: 'Cyber Neon',
    description: 'Cyberpunk gaming with electric blues',
    primary: 'cyan',
    chessLight: '#1e40af',
    chessDark: '#1e3a8a', 
    chessBorder: '#00d4ff',
    background: 'from-gray-900 via-blue-900 to-gray-900',
    surface: 'bg-gray-800/90 backdrop-blur-sm border border-cyan-500/30',
    text: 'text-cyan-100',
    isDark: true,
  },
  'dragon-gold': {
    id: 'dragon-gold',
    name: 'Dragon Gold',
    description: 'Mystical dark theme with golden accents',
    primary: 'yellow',
    background: 'from-gray-900 via-orange-900 to-gray-900',
    surface: 'bg-gray-800/90 backdrop-blur-sm border border-yellow-500/30',
    text: 'text-yellow-100',
    isDark: true,
  },
  // Additional gaming themes: Shadow Knight, Emerald Matrix, Crimson War
};
```

### Tailwind CSS Configuration
```javascript
// tailwind.config.js - Gaming-optimized configuration
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        chess: {
          light: 'var(--chess-light)',
          dark: 'var(--chess-dark)',
          border: 'var(--chess-border)'
        }
      },
      backgroundImage: {
        'gaming-gradient': 'var(--gaming-gradient)'
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
```

### Dynamic Theme Application
```typescript
// Theme colors mapped to Tailwind classes to avoid purging issues
const getThemeColors = (primary: string) => {
  const colorMap = {
    cyan: {
      primary: 'text-cyan-400',
      bg: 'bg-cyan-500',
      hover: 'hover:bg-cyan-600',
      border: 'border-cyan-500/30'
    },
    yellow: {
      primary: 'text-yellow-400',
      bg: 'bg-yellow-500', 
      hover: 'hover:bg-yellow-600',
      border: 'border-yellow-500/30'
    }
    // Additional color mappings for all theme primaries
  }
  return colorMap[primary as keyof typeof colorMap] || colorMap.cyan
}
```

## Performance Optimization Strategy

### Code Splitting Implementation
```typescript
// Route-based splitting
const routes = [
  {
    path: '/dashboard',
    component: lazy(() => import('../pages/Dashboard'))
  },
  {
    path: '/puzzles',
    component: lazy(() => import('../pages/PuzzlePage'))
  }
];

// Component-based splitting for heavy components
const ChessEngine = lazy(() => import('../components/ChessEngine'));
```

### Memoization Strategy
```typescript
// Expensive chess calculations
const MoveCalculator = memo(({ position }: { position: string }) => {
  const moves = useMemo(() => {
    return calculateAllPossibleMoves(position);
  }, [position]);
  
  return <MoveList moves={moves} />;
});

// Callback memoization
const handleMove = useCallback((move: Move) => {
  // Move handling logic
}, [dependencies]);
```

### Bundle Optimization
- Tree-shaking for unused Chakra UI components
- Dynamic imports for non-essential features
- Asset optimization and lazy loading
- Service Worker for caching strategy

## Accessibility Implementation (WCAG 2.1 AA)

### Chess-Specific Accessibility
```typescript
// src/components/molecules/ChessBoard/AccessibleChessBoard.tsx
const AccessibleChessBoard: React.FC<ChessBoardProps> = ({ position, onMove }) => {
  return (
    <Box
      role="application"
      aria-label="Interactive chess board"
      aria-describedby="board-instructions"
    >
      <VisuallyHidden id="board-instructions">
        Use arrow keys to navigate, space to select pieces, 
        enter to confirm moves
      </VisuallyHidden>
      
      <Grid templateColumns="repeat(8, 1fr)" gap={0}>
        {squares.map((square, index) => (
          <Square
            key={square}
            square={square}
            piece={position[square]}
            isHighlighted={highlightedSquares.includes(square)}
            onClick={() => onSquareClick(square)}
            aria-label={`${square}, ${getPieceDescription(position[square])}`}
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, square)}
          />
        ))}
      </Grid>
    </Box>
  );
};
```

### Color Contrast Compliance
- Minimum 4.5:1 contrast ratio for text
- Minimum 3:1 contrast ratio for UI components
- High contrast theme option
- Color-blind friendly palette with non-color indicators

### Keyboard Navigation
- Full keyboard navigation for all interactive elements
- Focus management for modal dialogs
- Skip links for main content areas
- Logical tab order throughout the application

## Testing Strategy Integration

### Component Testing
```typescript
// src/components/atoms/Button/Button.test.tsx
describe('Button Component', () => {
  it('renders with correct variant styles', () => {
    render(<Button variant="primary">Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('chakra-button--primary');
  });
  
  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Integration Testing
```typescript
// src/components/organisms/PuzzleInterface/PuzzleInterface.test.tsx
describe('PuzzleInterface', () => {
  it('completes puzzle solving flow', async () => {
    render(<PuzzleInterface />);
    
    // Make correct move
    const boardSquare = screen.getByLabelText(/e4/);
    fireEvent.click(boardSquare);
    
    // Verify success feedback
    await waitFor(() => {
      expect(screen.getByText(/correct/i)).toBeInTheDocument();
    });
  });
});
```

## Error Handling Architecture

### Global Error Boundary
```typescript
// src/components/ErrorBoundary.tsx
class ErrorBoundary extends Component<Props, State> {
  // Single responsibility: Catch and handle React errors
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to monitoring service
    ErrorService.logError(error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    
    return this.props.children;
  }
}
```

### API Error Handling
```typescript
// src/services/ErrorService.ts
export class ErrorService {
  // DRY: Centralized error handling
  static handleApiError(error: ApiError): UserFriendlyError {
    switch (error.status) {
      case 401:
        return { message: 'Please log in to continue', action: 'LOGIN' };
      case 403:
        return { message: 'Access denied', action: 'NONE' };
      case 500:
        return { message: 'Server error, please try again', action: 'RETRY' };
      default:
        return { message: 'Something went wrong', action: 'REFRESH' };
    }
  }
}
```

## Migration Strategy

### Phase 1: Foundation
1. Set up new component architecture
2. Implement design system with Chakra UI
3. Create basic atomic components
4. Set up routing and navigation

### Phase 2: Core Features
1. Implement chess board components
2. Create puzzle solving interface
3. Add authentication components
4. Implement basic game functionality

### Phase 3: Enhancement
1. Add advanced features (analysis, statistics)
2. Implement gamification elements
3. Add accessibility features
4. Performance optimization

### Phase 4: Polish
1. Testing and bug fixes
2. Documentation completion
3. Performance monitoring setup
4. Production deployment preparation

## Conclusion

This architecture provides a scalable, maintainable foundation for the Chess Training application that:

- **Enforces SRP** through focused, single-purpose components and services
- **Implements DRY** through shared components, hooks, and utilities
- **Follows Modern Patterns** with atomic design and container-presentation separation
- **Prioritizes Accessibility** with WCAG 2.1 AA compliance
- **Optimizes Performance** through code splitting and memoization
- **Ensures Maintainability** through clear structure and separation of concerns

The architecture supports the application's growth from a simple POC to a comprehensive chess training platform while maintaining code quality and development velocity.