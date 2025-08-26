# Frontend Architecture Document

## Executive Summary

This document defines the technical architecture for the Chess Training application frontend, based on comprehensive research of industry best practices. The architecture enforces **Single Responsibility Principle (SRP)** and **Don't Repeat Yourself (DRY)** principles while following domain-based organization and modern React patterns.

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

- **Presentation Layer**: React components focused on UI rendering
- **Business Logic Layer**: Custom hooks and services for chess logic
- **State Management Layer**: Zustand stores for global state
- **Data Access Layer**: API services and local storage utilities

## Technical Stack Decision

### Core Framework
- **React 18.2+** - Component-based UI library with modern hooks
- **TypeScript 5.0+** - Type safety and enhanced development experience
- **Vite 4.3+** - Fast build tool with HMR support

### UI Framework Selection
**Decision: Chakra UI** (Research-validated choice)

**Rationale:**
- Built-in accessibility (ARIA attributes by default)
- Excellent performance with emotion runtime optimizations
- Gentle learning curve with intuitive API
- Strong TypeScript support
- Active community and maintenance

### Chess Libraries (Research-Validated Stack)
- **chess.js** - Chess game logic and validation
- **react-chessboard** - Modern, actively maintained board component
- **stockfish** - Chess engine for AI opponents and analysis

### State Management
- **Zustand** - Lightweight state management for domain-specific stores
- **Local State (useState/useReducer)** - For component-specific state

### Core Dependencies
- **React Router DOM** - Client-side routing
- **better-sqlite3** - Local database for Electron
- **jsonwebtoken + bcryptjs** - Authentication security
- **electron + electron-builder** - Desktop application framework

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
interface ButtonProps extends ChakraButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  ...props 
}) => {
  // Single responsibility: Render styled button
  return (
    <ChakraButton 
      variant={variant} 
      {...props}
    >
      {children}
    </ChakraButton>
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

### State Management Architecture

#### Domain-Specific Stores
```typescript
// src/stores/authStore.ts
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
}

// Single responsibility: Manage authentication state
export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
  // State
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  
  // Actions
  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const user = await AuthService.login(credentials);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  logout: () => {
    AuthService.logout();
    set({ user: null, isAuthenticated: false });
  },
  
  loadUser: async () => {
    // Implementation for persistent sessions
  }
}));
```

#### Store Separation by Domain
- **authStore.ts** - Authentication and user management
- **gameStore.ts** - Current game state and chess logic
- **puzzleStore.ts** - Puzzle training state and progress
- **openingStore.ts** - Opening training and repertoire
- **analysisStore.ts** - Game analysis and engine data
- **progressStore.ts** - Training progress and statistics
- **settingsStore.ts** - User preferences and configuration

### Service Layer Architecture

#### Database Service Pattern (Electron)
```typescript
// src/services/DatabaseService.ts
export class DatabaseService {
  private db: Database.Database;
  
  constructor() {
    // Single responsibility: Configure SQLite database
    const dbPath = path.join(app.getPath('userData'), 'chess-training.db');
    this.db = new Database(dbPath);
    this.initializeSchema();
  }
  
  // DRY: Centralized database setup
  private initializeSchema(): void {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    // Additional table creation...
  }
}
```

#### Domain Services
```typescript
// src/services/AuthService.ts
export class AuthService {
  private db: DatabaseService;
  
  constructor(db: DatabaseService) {
    this.db = db;
  }
  
  // Single responsibility: Handle authentication
  async login(email: string, password: string): Promise<{ user: User; tokens: AuthTokens }> {
    const userRow = this.db.getDatabase()
      .prepare('SELECT * FROM users WHERE email = ?')
      .get(email);
    
    if (!userRow || !await bcrypt.compare(password, userRow.password_hash)) {
      throw new Error('Invalid credentials');
    }
    
    const user = this.mapRowToUser(userRow);
    const tokens = this.generateTokens(user);
    
    return { user, tokens };
  }
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

## Design System Implementation

### Chess Theme Configuration
```typescript
// src/styles/chessTheme.ts
export const chessTheme = extendTheme({
  colors: {
    chess: {
      // Board colors
      lightSquare: '#f0d9b5',
      darkSquare: '#b58863',
      
      // Accent colors
      primary: '#2b6cb0',
      secondary: '#38a169',
      
      // Move highlighting
      selectedSquare: '#ffd93d',
      lastMove: '#ffe066',
      legalMove: 'rgba(0, 137, 123, 0.3)',
      check: '#ff6b6b',
      
      // UI colors
      success: '#38a169',
      error: '#e53e3e',
      warning: '#d69e2e',
      info: '#3182ce'
    },
    
    // Dark mode variants
    dark: {
      bg: '#1a202c',
      cardBg: '#2d3748',
      border: '#4a5568',
      text: '#e2e8f0'
    }
  },
  
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
    mono: 'Fira Code, Monaco, Consolas, monospace'
  },
  
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'chess'
      }
    }
  }
});
```

### Component Variants
```typescript
// src/components/ui/Button.tsx - Extended Chakra Button
export const buttonVariants = {
  variants: {
    chess: {
      bg: 'chess.darkSquare',
      color: 'white',
      _hover: {
        bg: 'chess.primary'
      }
    }
  }
};
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