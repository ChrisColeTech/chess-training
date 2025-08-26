# Component Library Structure

## Overview

This document defines the component library structure for the Chess Training application using domain-based organization and proven chess libraries. It focuses on learning-specific components while leveraging react-chessboard for chess rendering, following research findings and architectural principles.

## Research-Based Component Strategy

### Core Principle: Build on Proven Foundations
- **Chess Rendering**: Use react-chessboard (research-validated choice)
- **Chess Logic**: Use chess.js (industry standard)
- **Custom Development**: Focus on learning features, not solved chess problems
- **Component Organization**: Domain-based structure matching business logic

## Domain-Based Component Organization

```
src/components/
├── auth/
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   ├── ProfileSettings.tsx
│   └── PasswordReset.tsx
├── chess/
│   ├── ChessBoardWrapper.tsx    # react-chessboard integration
│   ├── GameControls.tsx         # Start, pause, resign controls
│   ├── MoveList.tsx             # Game notation display
│   ├── GameClock.tsx            # Timer component
│   └── GameResult.tsx           # Win/loss/draw display
├── puzzles/
│   ├── PuzzleInterface.tsx      # Main puzzle solver
│   ├── HintSystem.tsx           # Progressive hints
│   ├── SolutionFeedback.tsx     # Correct/incorrect feedback
│   ├── PuzzleSelector.tsx       # Puzzle difficulty/theme picker
│   └── DifficultyAdjuster.tsx   # Adaptive difficulty
├── openings/
│   ├── OpeningExplorer.tsx      # ECO database browser
│   ├── RepertoireBuilder.tsx    # Personal repertoire
│   ├── OpeningQuiz.tsx          # Opening knowledge tests
│   ├── TrapTrainer.tsx          # Common trap practice
│   └── OpeningDetails.tsx       # Variation explanations
├── analysis/
│   ├── GameAnalyzer.tsx         # Engine analysis interface
│   ├── MoveAnalysis.tsx         # Individual move evaluation
│   ├── PositionEvaluator.tsx    # Position assessment
│   ├── BlunderDetector.tsx      # Mistake highlighting
│   └── AnalysisViewer.tsx       # Analysis navigation
├── statistics/
│   ├── StatsDashboard.tsx       # Main statistics page
│   ├── RatingChart.tsx          # ELO progression graph
│   ├── PerformanceMetrics.tsx   # Win/loss ratios
│   ├── AchievementBadges.tsx    # Gamification badges
│   ├── ProgressTracking.tsx     # Learning progress
│   └── StatCard.tsx             # Reusable stat display
├── ui/
│   ├── Button.tsx
│   ├── Modal.tsx
│   ├── Card.tsx
│   ├── Tooltip.tsx
│   ├── LoadingSpinner.tsx
│   ├── ProgressBar.tsx
│   └── Badge.tsx
└── layout/
    ├── AppLayout.tsx            # Main app wrapper
    ├── Header.tsx               # Top navigation
    ├── Sidebar.tsx              # Side navigation
    ├── Navigation.tsx           # Menu component
    └── Footer.tsx
```

## Domain Components (Focus Areas)

### 1. Chess Integration Components

**Purpose**: Wrapper components around react-chessboard for chess training features

#### ChessBoardWrapper Component

**Location**: `src/components/chess/ChessBoardWrapper.tsx`

```typescript
import { Chessboard } from 'react-chessboard';

// ChessBoardWrapper.tsx
export interface ChessBoardWrapperProps {
  position: string; // FEN string
  onMove?: (from: string, to: string) => boolean;
  orientation?: 'white' | 'black';
  showNotation?: boolean;
  highlightSquares?: Record<string, { backgroundColor: string }>;
  disabled?: boolean;
  boardSize?: number;
  // Learning-specific props
  hintSquares?: string[];
  errorSquares?: string[];
  successSquares?: string[];
}

export const ChessBoardWrapper: React.FC<ChessBoardWrapperProps> = ({
  position,
  onMove,
  orientation = 'white',
  showNotation = true,
  highlightSquares = {},
  disabled = false,
  boardSize = 400,
  hintSquares = [],
  errorSquares = [],
  successSquares = []
}) => {
  // Combine learning-specific highlights with custom highlights
  const customSquareStyles = {
    ...highlightSquares,
    ...hintSquares.reduce((acc, square) => ({ 
      ...acc, 
      [square]: { backgroundColor: '#ffd93d', opacity: 0.6 } 
    }), {}),
    ...errorSquares.reduce((acc, square) => ({ 
      ...acc, 
      [square]: { backgroundColor: '#ff6b6b', opacity: 0.6 } 
    }), {}),
    ...successSquares.reduce((acc, square) => ({ 
      ...acc, 
      [square]: { backgroundColor: '#51cf66', opacity: 0.6 } 
    }), {})
  };

  return (
    <Box position="relative">
      <Chessboard
        position={position}
        onPieceDrop={onMove}
        boardOrientation={orientation}
        showBoardNotation={showNotation}
        customSquareStyles={customSquareStyles}
        arePremovesAllowed={false}
        isDraggablePiece={() => !disabled}
        boardWidth={boardSize}
      />
      
      {/* Learning overlay for additional chess training features */}
      <LearningOverlay 
        boardSize={boardSize}
        hintSquares={hintSquares}
        errorSquares={errorSquares}
        successSquares={successSquares}
      />
    </Box>
  );
};
```

### 2. Learning-Specific Components

**Purpose**: Components focused on chess training and spaced repetition features

#### HintSystem Component

**Location**: `src/components/puzzles/HintSystem.tsx`

```typescript
// HintSystem.tsx
export interface HintLevel {
  level: 1 | 2 | 3;
  description: string;
  revealed: boolean;
}

export interface HintSystemProps {
  hints: HintLevel[];
  onHintRequest: (level: number) => void;
  disabled?: boolean;
  maxHints?: number;
}

export const HintSystem: React.FC<HintSystemProps> = ({
  hints,
  onHintRequest,
  disabled = false,
  maxHints = 3
}) => {
  const revealedCount = hints.filter(h => h.revealed).length;
  
  return (
    <VStack spacing={3} align="stretch">
      <Text fontSize="sm" fontWeight="medium" color="gray.600">
        Hints Available ({maxHints - revealedCount} remaining)
      </Text>
      
      {hints.map((hint) => (
        <Box key={hint.level}>
          {hint.revealed ? (
            <Alert status="info" variant="left-accent">
              <AlertIcon />
              <AlertDescription fontSize="sm">
                <Text fontWeight="medium" mb={1}>Hint {hint.level}:</Text>
                {hint.description}
              </AlertDescription>
            </Alert>
          ) : (
            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={() => onHintRequest(hint.level)}
              disabled={disabled || revealedCount >= maxHints}
              leftIcon={<Icon name="lightbulb" />}
            >
              Get Hint {hint.level}
            </Button>
          )}
        </Box>
      ))}
    </VStack>
  );
};
```

#### ProgressTracking Component

**Location**: `src/components/statistics/ProgressTracking.tsx`

```typescript
// ProgressTracking.tsx
export interface ProgressData {
  current: number;
  total: number;
  label: string;
  color?: 'blue' | 'green' | 'orange' | 'red';
}

export interface ProgressTrackingProps {
  sections: ProgressData[];
  showPercentages?: boolean;
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
}

export const ProgressTracking: React.FC<ProgressTrackingProps> = ({
  sections,
  showPercentages = true,
  orientation = 'vertical',
  size = 'md'
}) => {
  const stackDirection = orientation === 'horizontal' ? 'row' : 'column';
  
  return (
    <Stack direction={stackDirection} spacing={4}>
      {sections.map((section, index) => {
        const percentage = Math.round((section.current / section.total) * 100);
        
        return (
          <Box key={index} minW={orientation === 'horizontal' ? '200px' : 'auto'}>
            <Flex justify="space-between" align="center" mb={2}>
              <Text fontSize={size === 'lg' ? 'md' : 'sm'} fontWeight="medium">
                {section.label}
              </Text>
              {showPercentages && (
                <Text fontSize={size === 'lg' ? 'sm' : 'xs'} color="gray.500">
                  {section.current}/{section.total} ({percentage}%)
                </Text>
              )}
            </Flex>
            
            <Progress
              value={percentage}
              size={size}
              colorScheme={section.color || 'blue'}
              borderRadius="md"
            />
          </Box>
        );
      })}
    </Stack>
  );
};
```

### 3. Shared UI Components

**Purpose**: Reusable UI components across all domains

#### Button Component

**Location**: `src/components/ui/Button.tsx`

```typescript
import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from '@chakra-ui/react';

export interface ButtonProps extends ChakraButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'chess';
  fullWidth?: boolean;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  fullWidth = false,
  loading = false,
  children,
  ...props
}) => {
  return (
    <ChakraButton
      variant={variant}
      width={fullWidth ? 'full' : 'auto'}
      isLoading={loading}
      {...props}
    >
      {children}
    </ChakraButton>
  );
};
```

#### StatCard Component

**Location**: `src/components/statistics/StatCard.tsx`

```typescript
export interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
    period?: string;
  };
  icon?: React.ReactElement;
  loading?: boolean;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon,
  loading,
  onClick
}) => {
  if (loading) {
    return <Skeleton height="120px" borderRadius="lg" />;
  }
  
  return (
    <Box
      p={6}
      bg="white"
      borderRadius="lg"
      shadow="sm"
      border="1px"
      borderColor="gray.200"
      cursor={onClick ? 'pointer' : 'default'}
      onClick={onClick}
      _hover={onClick ? { shadow: 'md', transform: 'translateY(-1px)' } : {}}
      transition="all 0.2s"
      _dark={{ bg: 'gray.800', borderColor: 'gray.600' }}
    >
      <Flex justify="space-between" align="flex-start">
        <VStack align="start" spacing={2}>
          <Text fontSize="sm" color="gray.600" fontWeight="medium">
            {title}
          </Text>
          <Text fontSize="2xl" fontWeight="bold">
            {value}
          </Text>
          {change && (
            <Flex align="center">
              <Text
                fontSize="sm"
                color={change.type === 'increase' ? 'green.500' : 'red.500'}
                fontWeight="medium"
              >
                {change.type === 'increase' ? '↗' : '↘'} {Math.abs(change.value)}%
                {change.period && ` vs ${change.period}`}
              </Text>
            </Flex>
          )}
        </VStack>
        {icon && (
          <Box color="blue.500" flexShrink={0}>
            {icon}
          </Box>
        )}
      </Flex>
    </Box>
  );
};
```

### 4. Authentication Components

**Purpose**: User authentication and profile management

#### LoginForm Component

**Location**: `src/components/auth/LoginForm.tsx`

```typescript
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required')
});

export interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => Promise<void>;
  loading?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  loading = false
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(loginSchema)
  });

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} space={4}>
      <FormControl isInvalid={!!errors.email}>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter your email"
          {...register('email')}
        />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.password}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          placeholder="Enter your password"
          {...register('password')}
        />
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={loading}
        mt={4}
      >
        Sign In
      </Button>
    </Box>
  );
};
```

### 5. Analysis Components

**Purpose**: Game analysis and position evaluation features

#### MoveAnalysis Component

**Location**: `src/components/analysis/MoveAnalysis.tsx`

```typescript
export interface MoveEvaluation {
  move: string;
  evaluation: number;
  bestMove?: string;
  classification: 'excellent' | 'good' | 'inaccuracy' | 'mistake' | 'blunder';
  comment?: string;
}

export interface MoveAnalysisProps {
  evaluation: MoveEvaluation;
  onShowAlternative?: (move: string) => void;
  compact?: boolean;
}

export const MoveAnalysis: React.FC<MoveAnalysisProps> = ({
  evaluation,
  onShowAlternative,
  compact = false
}) => {
  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'excellent': return 'green';
      case 'good': return 'blue';
      case 'inaccuracy': return 'yellow';
      case 'mistake': return 'orange';
      case 'blunder': return 'red';
      default: return 'gray';
    }
  };

  const getClassificationIcon = (classification: string) => {
    switch (classification) {
      case 'excellent': return '‼';
      case 'good': return '!';
      case 'inaccuracy': return '?!';
      case 'mistake': return '?';
      case 'blunder': return '??';
      default: return '';
    }
  };

  return (
    <Box
      p={compact ? 3 : 4}
      bg="white"
      borderRadius="md"
      border="1px"
      borderColor="gray.200"
      _dark={{ bg: 'gray.800', borderColor: 'gray.600' }}
    >
      <Flex justify="space-between" align="center" mb={2}>
        <HStack>
          <Text fontWeight="bold">{evaluation.move}</Text>
          <Badge
            colorScheme={getClassificationColor(evaluation.classification)}
            variant="solid"
          >
            {getClassificationIcon(evaluation.classification)} {evaluation.classification}
          </Badge>
        </HStack>
        
        <Text fontSize="sm" color="gray.600">
          {evaluation.evaluation > 0 ? '+' : ''}{evaluation.evaluation.toFixed(2)}
        </Text>
      </Flex>

      {evaluation.comment && (
        <Text fontSize="sm" color="gray.700" mb={2}>
          {evaluation.comment}
        </Text>
      )}

      {evaluation.bestMove && evaluation.bestMove !== evaluation.move && (
        <Box mt={2} pt={2} borderTop="1px" borderColor="gray.100">
          <Text fontSize="xs" color="gray.500" mb={1}>
            Better was:
          </Text>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onShowAlternative?.(evaluation.bestMove!)}
          >
            {evaluation.bestMove}
          </Button>
        </Box>
      )}
    </Box>
  );
};
```

### 6. Layout Components

**Purpose**: Application layout and navigation structure

#### AppLayout Component

**Location**: `src/components/layout/AppLayout.tsx`

```typescript
export interface AppLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  sidebarContent?: React.ReactNode;
  headerContent?: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  showSidebar = false,
  sidebarContent,
  headerContent
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'home' },
    { label: 'Puzzles', path: '/puzzles', icon: 'puzzle' },
    { label: 'Play', path: '/play', icon: 'chess-knight' },
    { label: 'Study', path: '/study', icon: 'book' },
    { label: 'Progress', path: '/progress', icon: 'chart' }
  ];

  return (
    <Box minH="100vh" bg="gray.50" _dark={{ bg: 'gray.900' }}>
      {/* Header */}
      <Header
        user={user}
        navigationItems={navigationItems}
        onLogout={() => {/* logout logic */}}
        onProfileClick={() => navigate('/profile')}
      />
      
      <Flex>
        {/* Sidebar */}
        {showSidebar && (
          <Box
            w="280px"
            bg="white"
            borderRight="1px"
            borderColor="gray.200"
            minH="calc(100vh - 64px)"
            position="sticky"
            top="64px"
            _dark={{ bg: 'gray.800', borderColor: 'gray.600' }}
          >
            <Box p={4}>
              {sidebarContent}
            </Box>
          </Box>
        )}
        
        {/* Main Content */}
        <Box flex={1} p={6}>
          {headerContent && (
            <Box mb={6}>
              {headerContent}
            </Box>
          )}
          {children}
        </Box>
      </Flex>
    </Box>
  );
};
```

## Component Development Guidelines

### Development Principles

1. **Domain-Based Organization**: Components grouped by chess training domain, not technical patterns
2. **Single Responsibility**: Each component handles one specific concern
3. **Proven Library Integration**: Use react-chessboard for chess rendering, focus innovation on learning features
4. **Accessibility First**: All components include proper ARIA labels and keyboard navigation
5. **TypeScript Strict**: Full type safety with comprehensive interfaces

### Component Structure Standards

Each component follows this structure:
```
ComponentName.tsx          # Main component implementation
ComponentName.test.tsx     # Unit tests (if complex logic)
ComponentName.stories.tsx  # Storybook documentation (if reusable UI)
```

**Note**: No index.ts files - import directly from component files for clarity

### Quality Standards

- **TypeScript Strict Mode**: All components fully typed with comprehensive interfaces
- **Testing Coverage**: >85% coverage for components with business logic
- **Accessibility**: WCAG 2.1 AA compliance with proper ARIA labels
- **Performance**: React.memo for expensive components, useCallback for event handlers
- **Documentation**: Storybook stories for reusable UI components

### Import/Export Patterns

**Preferred**: Direct imports for clarity
```typescript
// ✅ GOOD: Direct import
import { ChessBoardWrapper } from '../components/chess/ChessBoardWrapper';
import { HintSystem } from '../components/puzzles/HintSystem';
import { StatCard } from '../components/statistics/StatCard';

// ❌ AVOID: Index file imports
import { ChessBoardWrapper, HintSystem, StatCard } from '../components';
```

**Domain Export Files** (Optional for convenience):
```typescript
// src/components/chess.ts
export { ChessBoardWrapper } from './chess/ChessBoardWrapper';
export { GameControls } from './chess/GameControls';
export { MoveList } from './chess/MoveList';

// Usage
import { ChessBoardWrapper, GameControls } from '../components/chess';
```

## Implementation Examples

### Learning-Focused Development

**Focus Areas for Custom Development**:
- **Spaced Repetition UI**: Components that visualize and manage learning schedules
- **Progress Tracking**: Visual progress indicators specific to chess skill development
- **Hint Systems**: Progressive revelation components for educational puzzles
- **Gamification Elements**: Achievement badges, streaks, and motivation features
- **Performance Analytics**: Chess-specific statistics and trend visualization

**Leverage Proven Libraries For**:
- **Chess Board Rendering**: react-chessboard handles all chess UI complexity
- **Chess Logic**: chess.js manages move validation and game rules
- **UI Foundation**: Chakra UI provides accessible, themeable base components

### Example Component Integration

```typescript
// Example: Puzzle Solving Page Integration
import { ChessBoardWrapper } from '../components/chess/ChessBoardWrapper';
import { HintSystem } from '../components/puzzles/HintSystem';
import { ProgressTracking } from '../components/statistics/ProgressTracking';
import { SolutionFeedback } from '../components/puzzles/SolutionFeedback';

export const PuzzleSolvingInterface: React.FC = () => {
  const { puzzle, onMove, hints, progress } = usePuzzleSession();
  
  return (
    <Grid templateColumns="2fr 1fr" gap={6}>
      <Box>
        <ChessBoardWrapper
          position={puzzle.fen}
          onMove={onMove}
          hintSquares={hints.revealedSquares}
          boardSize={400}
        />
      </Box>
      
      <VStack spacing={4}>
        <ProgressTracking sections={progress} />
        <HintSystem hints={hints.available} onHintRequest={requestHint} />
        <SolutionFeedback result={puzzle.result} />
      </VStack>
    </Grid>
  );
};
```

### Component Testing Strategy

**Unit Testing Focus**:
- **Learning Components**: Test spaced repetition logic, hint progression, progress calculation
- **Integration Components**: Test react-chessboard wrapper behavior with learning features
- **Business Logic**: Test chess training algorithms, difficulty adjustment, achievement triggers

**Example Test Structure**:
```typescript
// HintSystem.test.tsx
describe('HintSystem', () => {
  it('reveals hints progressively', () => {
    render(<HintSystem hints={mockHints} onHintRequest={mockRequest} />);
    
    // Test progressive revelation
    fireEvent.click(screen.getByText('Get Hint 1'));
    expect(mockRequest).toHaveBeenCalledWith(1);
    
    // Test hint limit enforcement
    expect(screen.getByText('Get Hint 2')).toBeEnabled();
    expect(screen.getByText('Get Hint 3')).toBeEnabled();
  });
  
  it('respects maximum hint limit', () => {
    const allRevealed = mockHints.map(h => ({ ...h, revealed: true }));
    render(<HintSystem hints={allRevealed} maxHints={2} />);
    
    expect(screen.getByText('(0 remaining)')).toBeInTheDocument();
  });
});

// ChessBoardWrapper.test.tsx
describe('ChessBoardWrapper', () => {
  it('highlights hint squares correctly', () => {
    render(
      <ChessBoardWrapper 
        position="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
        hintSquares={['e2', 'e4']}
      />
    );
    
    // Test that react-chessboard receives correct highlight styles
    expect(screen.getByTestId('chessboard')).toHaveAttribute(
      'data-hint-squares', 
      'e2,e4'
    );
  });
});
```

## Success Metrics & Implementation Priority

### Development Priority Matrix

**High Priority (Phase 1-3)**:
1. **ChessBoardWrapper** - Core chess interaction with react-chessboard
2. **HintSystem** - Progressive learning support
3. **ProgressTracking** - Spaced repetition visualization
4. **SolutionFeedback** - Immediate learning feedback
5. **LoginForm/RegisterForm** - User authentication

**Medium Priority (Phase 4-6)**:
1. **StatCard/StatsDashboard** - Performance analytics
2. **MoveAnalysis** - Engine integration wrapper
3. **AchievementBadges** - Gamification elements
4. **OpeningExplorer** - Study tools
5. **AppLayout/Header** - Navigation structure

**Lower Priority (Phase 7)**:
1. **RepertoireBuilder** - Advanced study features
2. **GameAnalyzer** - Complex analysis tools
3. **BlunderDetector** - Advanced error detection
4. **TrapTrainer** - Specialized training modules

### Architecture Success Criteria

**Technical Goals**:
- ✅ **React-chessboard Integration**: All chess rendering uses proven library
- ✅ **Domain Organization**: Components grouped by chess training business logic
- ✅ **No Over-Engineering**: Practical React structure without atomic design complexity
- ✅ **SRP Compliance**: Each component has single, well-defined responsibility
- ✅ **Learning Focus**: 70%+ development time on chess training features vs chess rendering

**Quality Metrics**:
- **Performance**: <50ms board interactions via react-chessboard optimization
- **Accessibility**: 100% keyboard navigation, screen reader compatibility
- **Testing**: >85% coverage on learning logic components
- **Type Safety**: Strict TypeScript with comprehensive interfaces
- **Maintainability**: Clear component purposes, minimal interdependencies

## Key Architectural Decisions

### Chess Rendering Strategy

**✅ CORRECT: Use react-chessboard**
```typescript
// Wrapper component for learning features
import { Chessboard } from 'react-chessboard';

export const ChessBoardWrapper: React.FC<Props> = ({ 
  position, 
  onMove, 
  hintSquares 
}) => (
  <Chessboard
    position={position}
    onPieceDrop={onMove}
    customSquareStyles={getHintStyles(hintSquares)}
  />
);
```

**❌ AVOID: Custom chess rendering**
```typescript
// DON'T build custom chess pieces/board
const CustomChessBoard = () => (
  <Grid templateColumns="repeat(8, 1fr)">
    {squares.map(square => (
      <CustomSquare piece={pieces[square]} />
    ))}
  </Grid>
);
```

### Component Organization Strategy

**✅ CORRECT: Domain-based folders**
```
src/components/
├── chess/           # Chess interaction components
├── puzzles/        # Learning and puzzle components
├── statistics/     # Progress and analytics components
├── auth/           # Authentication components
└── ui/             # Generic UI components
```

**❌ AVOID: Atomic design complexity**
```
src/components/
├── atoms/          # Over-engineered abstraction
├── molecules/      # Unclear business purpose
├── organisms/      # Confusing hierarchy
└── templates/      # Unnecessary complexity
```

### Development Focus Areas

**Custom Development (70% effort)**:
- Spaced repetition learning algorithms
- Chess training progress visualization
- Hint and feedback systems
- Achievement and gamification features
- Performance analytics and statistics

**Library Integration (30% effort)**:
- react-chessboard wrapper for learning features
- chess.js integration for move validation
- Chakra UI theming and customization
- Authentication and routing setup

## Research-Based Component Library

This component library structure successfully implements the research findings and architectural principles:

**✅ Research Alignment**:
- Uses react-chessboard (Document #1 recommendation)
- Focuses on learning features (spaced repetition, gamification)
- Domain-based organization (practical React structure)
- No over-engineering (avoids atomic design complexity)

**✅ Architecture Compliance**:
- SRP: Each component has single responsibility
- DRY: Shared services and utilities prevent code duplication
- Domain organization: Components match business logic domains
- Type safety: Comprehensive TypeScript interfaces throughout

**✅ Development Efficiency**:
- 70% effort on learning innovation vs 30% on chess rendering
- Proven libraries handle solved problems (chess board, piece movement)
- Clear component purposes enable parallel development
- Scalable structure supports growth from POC to full application

**The Result**: A component library that delivers professional chess training features rapidly while maintaining high code quality, accessibility compliance, and developer productivity.

