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

#### Research-Validated Form Components with React Hook Form

**Based on Form Library Performance Research: React Hook Form is 6x smaller than Formik (12.12KB vs 44.34KB) with superior performance and modern React patterns**

#### LoginForm Component

**Location**: `src/components/auth/LoginForm.tsx`

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';

// Research-validated: Zod provides better TypeScript inference than Yup
const loginSchema = z.object({
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

type LoginFormData = z.infer<typeof loginSchema>;

export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  // React Hook Form integration with TanStack Query mutation
  const loginMutation = useMutation({
    mutationFn: onSubmit,
    onSuccess: () => {
      // Handle successful login
    },
    onError: (error) => {
      setError('root', { message: error.message })
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur', // Validate on blur for better UX
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onFormSubmit = async (data: LoginFormData) => {
    await loginMutation.mutateAsync(data);
    reset(); // Clear form on success
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onFormSubmit)} space={4}>
      <FormControl isInvalid={!!errors.email}>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
          {...register('email')}
        />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.password}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          {...register('password')}
        />
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>

      {errors.root && (
        <Alert status="error">
          <AlertIcon />
          {errors.root.message}
        </Alert>
      )}

      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={isSubmitting || loginMutation.isPending}
        mt={4}
      >
        Sign In
      </Button>
    </Box>
  );
};
```

#### PuzzleConfigForm Component (Advanced React Hook Form Pattern)

**Location**: `src/components/puzzles/PuzzleConfigForm.tsx`

```typescript
import { useForm, useWatch, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useGameStore } from '@/stores/gameStore'; // Zustand integration

const puzzleConfigSchema = z.object({
  difficulty: z.number().min(800, 'Minimum rating 800').max(2400, 'Maximum rating 2400'),
  themes: z.array(z.string()).min(1, 'Select at least one theme'),
  timeControl: z.enum(['unlimited', 'timed']),
  maxTime: z.number().optional(),
  showHints: z.boolean(),
  playSound: z.boolean()
});

type PuzzleConfigData = z.infer<typeof puzzleConfigSchema>;

export const PuzzleConfigForm: React.FC = () => {
  const { setPuzzleConfig } = useGameStore(); // Zustand state management
  
  const form = useForm<PuzzleConfigData>({
    resolver: zodResolver(puzzleConfigSchema),
    defaultValues: {
      difficulty: 1200,
      themes: ['tactics'],
      timeControl: 'unlimited',
      showHints: true,
      playSound: true
    }
  });

  // Watch form values for dynamic UI updates (React Hook Form optimization)
  const timeControl = useWatch({ control: form.control, name: 'timeControl' });
  const playSound = useWatch({ control: form.control, name: 'playSound' });

  const onSubmit = (data: PuzzleConfigData) => {
    setPuzzleConfig(data); // Update Zustand store
    // Form automatically triggers audio preview if sound enabled
    if (data.playSound) {
      audioService.playSound('config-saved'); // Howler.js integration
    }
  };

  return (
    <Box as="form" onSubmit={form.handleSubmit(onSubmit)}>
      <VStack spacing={4} align="stretch">
        <FormControl isInvalid={!!form.formState.errors.difficulty}>
          <FormLabel>Difficulty Rating</FormLabel>
          <Controller
            name="difficulty"
            control={form.control}
            render={({ field }) => (
              <Slider
                min={800}
                max={2400}
                step={50}
                value={field.value}
                onChange={field.onChange}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            )}
          />
          <FormErrorMessage>{form.formState.errors.difficulty?.message}</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel>Puzzle Themes</FormLabel>
          <CheckboxGroup 
            value={form.watch('themes')} 
            onChange={(values) => form.setValue('themes', values as string[])}
          >
            <Stack direction="row" wrap="wrap">
              <Checkbox value="tactics">Tactics</Checkbox>
              <Checkbox value="endgame">Endgames</Checkbox>
              <Checkbox value="opening">Openings</Checkbox>
              <Checkbox value="middlegame">Middlegame</Checkbox>
            </Stack>
          </CheckboxGroup>
        </FormControl>

        <FormControl>
          <FormLabel>Time Control</FormLabel>
          <RadioGroup 
            value={timeControl} 
            onChange={(value) => form.setValue('timeControl', value as 'unlimited' | 'timed')}
          >
            <Stack direction="row">
              <Radio value="unlimited">Unlimited</Radio>
              <Radio value="timed">Timed</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        {timeControl === 'timed' && (
          <FormControl>
            <FormLabel>Max Time (seconds)</FormLabel>
            <Controller
              name="maxTime"
              control={form.control}
              render={({ field }) => (
                <NumberInput min={30} max={300} value={field.value} onChange={(_, num) => field.onChange(num)}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              )}
            />
          </FormControl>
        )}

        <Stack direction="row" spacing={6}>
          <FormControl display="flex" alignItems="center">
            <FormLabel mb="0">Show Hints</FormLabel>
            <Switch {...form.register('showHints')} />
          </FormControl>

          <FormControl display="flex" alignItems="center">
            <FormLabel mb="0">Sound Effects</FormLabel>
            <Switch 
              {...form.register('playSound')}
              onChange={(e) => {
                form.setValue('playSound', e.target.checked);
                // Immediate audio feedback using Howler.js
                if (e.target.checked) {
                  audioService.playSound('toggle-on');
                } else {
                  audioService.playSound('toggle-off');
                }
              }}
            />
          </FormControl>
        </Stack>

        <Button type="submit" colorScheme="blue" size="lg">
          Start Puzzle Session
        </Button>
      </VStack>
    </Box>
  );
};
```

### 5. Research-Validated Animation Components with React Spring

**Based on Animation Library Research: React Spring (19KB) provides better chess piece physics than Framer Motion (44KB) with superior performance**

#### AnimatedChessPiece Component

**Location**: `src/components/chess/AnimatedChessPiece.tsx`

```typescript
import { useSpring, animated, SpringValue } from '@react-spring/web';
import { useGameStore } from '@/stores/gameStore';

export interface AnimatedChessPieceProps {
  piece: string;
  from: string;
  to: string;
  onComplete?: () => void;
  duration?: number;
}

export const AnimatedChessPiece: React.FC<AnimatedChessPieceProps> = ({
  piece,
  from,
  to,
  onComplete,
  duration = 300
}) => {
  // Convert chess notation to pixel coordinates
  const getPosition = (square: string) => {
    const file = square.charCodeAt(0) - 97; // a-h to 0-7
    const rank = parseInt(square[1]) - 1; // 1-8 to 0-7
    return { x: file * 50, y: (7 - rank) * 50 };
  };

  const startPos = getPosition(from);
  const endPos = getPosition(to);

  // React Spring animation with chess-optimized easing
  const springs = useSpring({
    from: { x: startPos.x, y: startPos.y, scale: 1 },
    to: { x: endPos.x, y: endPos.y, scale: 1.1 },
    config: { 
      tension: 280, 
      friction: 60, // Optimized for chess piece feel
      mass: 0.5 // Lighter feel for responsive gameplay
    },
    onRest: onComplete
  });

  return (
    <animated.div
      style={{
        position: 'absolute',
        transform: springs.x.to(x => `translateX(${x}px)`)
          .to(springs.y, (x, y) => `${x} translateY(${y}px)`)
          .to(springs.scale, (x, y, scale) => `${x} ${y} scale(${scale})`),
        zIndex: 1000,
        pointerEvents: 'none'
      }}
    >
      <div className={`chess-piece ${piece}`} />
    </animated.div>
  );
};
```

#### PuzzleSuccessAnimation Component

**Location**: `src/components/puzzles/PuzzleSuccessAnimation.tsx`

```typescript
import { useSpring, animated, useChain, useSpringRef } from '@react-spring/web';
import { useEffect } from 'react';

export interface PuzzleSuccessAnimationProps {
  isVisible: boolean;
  onComplete?: () => void;
}

export const PuzzleSuccessAnimation: React.FC<PuzzleSuccessAnimationProps> = ({
  isVisible,
  onComplete
}) => {
  // Orchestrated animation sequence using React Spring chains
  const scaleRef = useSpringRef();
  const fadeRef = useSpringRef();

  const scaleSpring = useSpring({
    ref: scaleRef,
    from: { scale: 0, rotate: -180 },
    to: { scale: isVisible ? 1 : 0, rotate: isVisible ? 0 : -180 },
    config: { tension: 300, friction: 30 }
  });

  const fadeSpring = useSpring({
    ref: fadeRef,
    from: { opacity: 0, y: 20 },
    to: { opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 },
    config: { tension: 280, friction: 60 }
  });

  // Chain animations: scale first, then fade
  useChain(isVisible ? [scaleRef, fadeRef] : [fadeRef, scaleRef], [0, 0.3]);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onComplete, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  return (
    <animated.div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: scaleSpring.scale
          .to(s => `translate(-50%, -50%) scale(${s})`)
          .to(scaleSpring.rotate, (s, r) => `${s} rotate(${r}deg)`),
        opacity: fadeSpring.opacity,
        zIndex: 1000
      }}
    >
      <animated.div
        style={{
          transform: fadeSpring.y.to(y => `translateY(${y}px)`),
          background: 'linear-gradient(135deg, #51cf66, #40c057)',
          borderRadius: '50%',
          width: 120,
          height: 120,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 30px rgba(64, 192, 87, 0.3)',
          color: 'white',
          fontSize: '48px',
          fontWeight: 'bold'
        }}
      >
        ✓
      </animated.div>
    </animated.div>
  );
};
```

### 6. Research-Validated Audio Components with Howler.js

**Based on Audio Library Research: Howler.js provides optimal mobile support and Web Audio API performance for chess training audio feedback**

#### AudioService Integration Component

**Location**: `src/components/audio/AudioProvider.tsx`

```typescript
import { createContext, useContext, useCallback, useEffect } from 'react';
import { Howl } from 'howler';
import { useGameStore } from '@/stores/gameStore';

interface AudioContextType {
  playMoveSound: (moveType: 'normal' | 'capture' | 'check' | 'checkmate') => void;
  playUISound: (soundType: 'success' | 'error' | 'hint' | 'button') => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { audioSettings } = useGameStore();
  
  // Pre-load all audio files using Howler.js
  const sounds = useMemo(() => ({
    moves: {
      normal: new Howl({ src: ['/audio/move.webm', '/audio/move.mp3'], volume: 0.7 }),
      capture: new Howl({ src: ['/audio/capture.webm', '/audio/capture.mp3'], volume: 0.8 }),
      check: new Howl({ src: ['/audio/check.webm', '/audio/check.mp3'], volume: 0.9 }),
      checkmate: new Howl({ src: ['/audio/checkmate.webm', '/audio/checkmate.mp3'], volume: 1.0 })
    },
    ui: {
      success: new Howl({ src: ['/audio/success.webm', '/audio/success.mp3'], volume: 0.6 }),
      error: new Howl({ src: ['/audio/error.webm', '/audio/error.mp3'], volume: 0.7 }),
      hint: new Howl({ src: ['/audio/hint.webm', '/audio/hint.mp3'], volume: 0.5 }),
      button: new Howl({ src: ['/audio/button.webm', '/audio/button.mp3'], volume: 0.4 })
    }
  }), []);

  const playMoveSound = useCallback((moveType: 'normal' | 'capture' | 'check' | 'checkmate') => {
    if (!audioSettings.soundEnabled) return;
    
    // Stop any currently playing move sounds to prevent overlap
    Object.values(sounds.moves).forEach(sound => sound.stop());
    sounds.moves[moveType].play();
  }, [sounds, audioSettings.soundEnabled]);

  const playUISound = useCallback((soundType: 'success' | 'error' | 'hint' | 'button') => {
    if (!audioSettings.soundEnabled) return;
    sounds.ui[soundType].play();
  }, [sounds, audioSettings.soundEnabled]);

  const setVolume = useCallback((volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    Object.values(sounds.moves).forEach(sound => sound.volume(clampedVolume));
    Object.values(sounds.ui).forEach(sound => sound.volume(clampedVolume * 0.8)); // UI sounds slightly quieter
  }, [sounds]);

  const toggleMute = useCallback(() => {
    const newMuted = !audioSettings.muted;
    Howler.mute(newMuted); // Global mute using Howler.js
    useGameStore.setState(state => ({
      audioSettings: { ...state.audioSettings, muted: newMuted }
    }));
  }, [audioSettings.muted]);

  // Sync volume with global settings
  useEffect(() => {
    setVolume(audioSettings.volume);
  }, [audioSettings.volume, setVolume]);

  return (
    <AudioContext.Provider value={{ playMoveSound, playUISound, setVolume, toggleMute }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
};
```

### 7. Research-Validated Chess Engine Components with Stockfish Integration

**Based on Chess Engine Research: Stockfish.js provides professional-level analysis with Web Worker optimization for non-blocking UI**

#### StockfishAnalysisPanel Component

**Location**: `src/components/analysis/StockfishAnalysisPanel.tsx`

```typescript
import { useQuery } from '@tanstack/react-query';
import { useStockfish } from '@/services/stockfish';
import { useGameStore } from '@/stores/gameStore';

export interface StockfishAnalysisPanelProps {
  position: string; // FEN
  depth?: number;
  multiPV?: number;
}

export const StockfishAnalysisPanel: React.FC<StockfishAnalysisPanelProps> = ({
  position,
  depth = 15,
  multiPV = 3
}) => {
  const { analysisSettings } = useGameStore();
  const stockfish = useStockfish();

  // TanStack Query integration for caching Stockfish analysis
  const { data: analysis, isLoading, error } = useQuery({
    queryKey: ['stockfish-analysis', position, depth, multiPV],
    queryFn: () => stockfish.analyzePosition(position, depth, multiPV),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    enabled: !!position && analysisSettings.enabled
  });

  const formatEvaluation = (centipawns: number): string => {
    if (Math.abs(centipawns) > 1000) {
      return `${centipawns > 0 ? '+' : ''}${(centipawns / 100).toFixed(1)}`;
    }
    return `${centipawns > 0 ? '+' : ''}${(centipawns / 100).toFixed(2)}`;
  };

  const getEvaluationColor = (centipawns: number): string => {
    if (centipawns > 100) return 'green.500';
    if (centipawns < -100) return 'red.500';
    return 'yellow.600';
  };

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertDescription>Analysis failed: {error.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Box p={4} bg="white" borderRadius="md" border="1px" borderColor="gray.200">
      <VStack spacing={3} align="stretch">
        <HStack justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">Engine Analysis</Text>
          {isLoading && <Spinner size="sm" />}
        </HStack>

        {analysis && (
          <>
            <HStack justify="space-between">
              <Text fontSize="sm" color="gray.600">Depth {analysis.depth}</Text>
              <Badge
                colorScheme={getEvaluationColor(analysis.evaluation).split('.')[0] as 'green' | 'red' | 'yellow'}
                fontSize="sm"
                px={2}
                py={1}
              >
                {formatEvaluation(analysis.evaluation)}
              </Badge>
            </HStack>

            <Divider />

            <VStack spacing={2} align="stretch">
              <Text fontSize="sm" fontWeight="medium" color="gray.700">Best Lines:</Text>
              {analysis.lines.slice(0, multiPV).map((line, index) => (
                <Box key={index} p={2} bg="gray.50" borderRadius="sm">
                  <HStack justify="space-between" mb={1}>
                    <Text fontSize="sm" fontWeight="medium">
                      {index + 1}. {line.moves[0]}
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      {formatEvaluation(line.evaluation)}
                    </Text>
                  </HStack>
                  <Text fontSize="xs" color="gray.600">
                    {line.moves.slice(1, 8).join(' ')}
                    {line.moves.length > 8 && '...'}
                  </Text>
                </Box>
              ))}
            </VStack>

            {analysis.mate && (
              <Alert status="info" variant="left-accent">
                <AlertIcon />
                <AlertDescription fontSize="sm">
                  Mate in {Math.abs(analysis.mate)} moves for {analysis.mate > 0 ? 'White' : 'Black'}
                </AlertDescription>
              </Alert>
            )}
          </>
        )}

        <Divider />

        <HStack justify="space-between" fontSize="xs" color="gray.500">
          <Text>Stockfish {stockfish.version}</Text>
          <Text>{analysis?.nodes.toLocaleString()} nodes</Text>
        </HStack>
      </VStack>
    </Box>
  );
};
```

### 8. Research-Validated Data Fetching Components with TanStack Query

**Based on State Management Research: TanStack Query provides optimal server state management with intelligent caching and background updates**

#### PuzzleDataProvider Component

**Location**: `src/components/data/PuzzleDataProvider.tsx`

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useGameStore } from '@/stores/gameStore';
import { puzzleApi } from '@/api/puzzles';

export const usePuzzleSession = (config: PuzzleConfig) => {
  const queryClient = useQueryClient();
  const { updateProgress } = useGameStore();

  // Fetch puzzles with intelligent caching
  const puzzlesQuery = useQuery({
    queryKey: ['puzzles', config.difficulty, config.themes],
    queryFn: () => puzzleApi.fetchPuzzles({
      difficulty: config.difficulty,
      themes: config.themes,
      limit: 20 // Prefetch batch
    }),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes garbage collection
    refetchOnWindowFocus: false
  });

  // Submit puzzle solution with optimistic updates
  const solutionMutation = useMutation({
    mutationFn: puzzleApi.submitSolution,
    onMutate: async (solution) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['user-stats'] });

      // Optimistically update local state
      updateProgress(solution.puzzleId, solution.correct);

      // Return context for rollback
      return { previousStats: queryClient.getQueryData(['user-stats']) };
    },
    onError: (err, solution, context) => {
      // Rollback optimistic update
      if (context?.previousStats) {
        queryClient.setQueryData(['user-stats'], context.previousStats);
      }
    },
    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['user-stats'] });
    }
  });

  // Prefetch next batch when running low
  const prefetchNextBatch = useCallback(() => {
    if (puzzlesQuery.data && puzzlesQuery.data.length < 5) {
      queryClient.prefetchQuery({
        queryKey: ['puzzles', config.difficulty, config.themes, 'next'],
        queryFn: () => puzzleApi.fetchPuzzles({
          difficulty: config.difficulty,
          themes: config.themes,
          offset: puzzlesQuery.data.length,
          limit: 20
        })
      });
    }
  }, [puzzlesQuery.data, config, queryClient]);

  return {
    puzzles: puzzlesQuery.data || [],
    isLoading: puzzlesQuery.isLoading,
    error: puzzlesQuery.error,
    submitSolution: solutionMutation.mutateAsync,
    isSubmitting: solutionMutation.isPending,
    prefetchNextBatch
  };
};
```

### 9. Analysis Components

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

