# Design System Specification

## Overview

This document defines the complete design system for the Chess Training application, implementing atomic design methodology with Chakra UI as the primary framework and react-chessboard for chess board rendering. The system ensures visual consistency, accessibility compliance, and efficient development workflows while leveraging proven chess libraries as identified in our research.

## Research-Based Library Decisions

### Chess Board Implementation
**Based on Research Findings (Document #1):**

- **react-chessboard** (RECOMMENDED) - Version 5.5.0, actively maintained
- **chess.js** for chess logic and move validation  
- **Chakra UI** for general UI components and design system

**Why This Approach:**
```typescript
interface ResearchBasedDecisions {
  chessBoard: 'Use react-chessboard - modern, responsive, actively maintained',
  chessLogic: 'Use chess.js - industry standard for move validation',
  customComponents: 'Focus on learning features, not reinventing chess rendering',
  performance: 'Proven libraries avoid common chess UI pitfalls'
}
```

## Design Tokens

### Color Palette

#### Brand Colors
```scss
// Primary brand colors
$brand-primary: #1976d2;      // Chess blue
$brand-secondary: #dc004e;    // Chess red
$brand-accent: #ffd93d;       // Chess gold

// Semantic colors
$success: #2e7d32;           // Success green
$warning: #ed6c02;           // Warning orange  
$error: #d32f2f;             // Error red
$info: #0288d1;              // Info blue
```

#### Chess-Specific Colors (For react-chessboard customization)
```scss
// Board colors (traditional) - For react-chessboard themes
$chess-light-square: #f0d9b5;    // Light brown squares
$chess-dark-square: #b58863;     // Dark brown squares

// Board colors (modern alternative)
$chess-light-modern: #ffffff;    // White squares
$chess-dark-modern: #769656;     // Green squares

// Interactive states (react-chessboard custom styling)
$chess-highlight: #646f40;       // Move highlight
$chess-selected: #ffd93d;        // Selected piece
$chess-check: #ff6b6b;           // King in check
$chess-last-move: #ffe066;       // Last move highlight
$chess-possible-move: #00897b;    // Possible move indicator
```

#### Neutral Colors
```scss
// Gray scale
$neutral-50: #fafafa;
$neutral-100: #f5f5f5;
$neutral-200: #eeeeee;
$neutral-300: #e0e0e0;
$neutral-400: #bdbdbd;
$neutral-500: #9e9e9e;
$neutral-600: #757575;
$neutral-700: #616161;
$neutral-800: #424242;
$neutral-900: #212121;
```

### Typography

#### Font Families
```scss
$font-heading: 'Roboto', 'Helvetica', 'Arial', sans-serif;
$font-body: 'Roboto', 'Helvetica', 'Arial', sans-serif;
$font-mono: 'Roboto Mono', 'Monaco', 'Consolas', monospace;
// Note: Chess pieces handled by react-chessboard library
```

#### Font Scales
```scss
// Heading scales
$font-size-h1: 2.5rem;    // 40px
$font-size-h2: 2rem;      // 32px
$font-size-h3: 1.75rem;   // 28px
$font-size-h4: 1.5rem;    // 24px
$font-size-h5: 1.25rem;   // 20px
$font-size-h6: 1.125rem;  // 18px

// Body scales
$font-size-xl: 1.125rem;  // 18px
$font-size-lg: 1rem;      // 16px
$font-size-md: 0.875rem;  // 14px
$font-size-sm: 0.75rem;   // 12px
$font-size-xs: 0.625rem;  // 10px

// Line heights
$line-height-tight: 1.25;
$line-height-normal: 1.5;
$line-height-relaxed: 1.75;
```

### Spacing System

#### Spacing Scale (based on 4px grid)
```scss
$space-0: 0;
$space-1: 0.25rem;   // 4px
$space-2: 0.5rem;    // 8px
$space-3: 0.75rem;   // 12px
$space-4: 1rem;      // 16px
$space-5: 1.25rem;   // 20px
$space-6: 1.5rem;    // 24px
$space-8: 2rem;      // 32px
$space-10: 2.5rem;   // 40px
$space-12: 3rem;     // 48px
$space-16: 4rem;     // 64px
$space-20: 5rem;     // 80px
$space-24: 6rem;     // 96px
```

### Border Radius
```scss
$radius-none: 0;
$radius-sm: 0.125rem;   // 2px
$radius-md: 0.375rem;   // 6px
$radius-lg: 0.5rem;     // 8px
$radius-xl: 0.75rem;    // 12px
$radius-2xl: 1rem;      // 16px
$radius-full: 9999px;   // Perfect circle
```

### Shadows
```scss
$shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
$shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
$shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
$shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
```

## Atomic Components

### Atoms (Learning-Focused Components)

#### Button Component
```typescript
// src/components/atoms/Button/Button.tsx
interface ButtonProps extends ChakraButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'chess';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md',
  fullWidth = false,
  children, 
  ...props 
}) => {
  return (
    <ChakraButton 
      variant={variant} 
      size={size}
      width={fullWidth ? 'full' : 'auto'}
      {...props}
    >
      {children}
    </ChakraButton>
  );
};

// Button variants
const buttonVariants = {
  primary: {
    bg: 'brand.primary',
    color: 'white',
    _hover: { bg: 'blue.600' }
  },
  secondary: {
    bg: 'neutral.200',
    color: 'neutral.800',
    _hover: { bg: 'neutral.300' }
  },
  danger: {
    bg: 'error',
    color: 'white',
    _hover: { bg: 'red.600' }
  },
  chess: {
    bg: 'chess.darkSquare',
    color: 'white',
    _hover: { bg: 'chess.highlight' }
  }
};
```

#### Input Component
```typescript
// src/components/atoms/Input/Input.tsx
interface InputProps extends ChakraInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  isRequired?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  isRequired,
  ...props
}) => {
  const inputId = useId();
  
  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      {label && (
        <FormLabel htmlFor={inputId}>
          {label}
        </FormLabel>
      )}
      <ChakraInput
        id={inputId}
        {...props}
      />
      {error && (
        <FormErrorMessage>{error}</FormErrorMessage>
      )}
      {helperText && !error && (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
```

#### Icon Component
```typescript
// src/components/atoms/Icon/Icon.tsx
interface IconProps {
  name: keyof typeof iconMap;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 'md', color }) => {
  const IconComponent = iconMap[name];
  const sizeMap = {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32
  };
  
  return (
    <IconComponent 
      width={sizeMap[size]} 
      height={sizeMap[size]}
      color={color}
    />
  );
};
```

### Molecules (Learning-Specific Components)

#### Statistics Card Component
```typescript
// src/components/molecules/StatCard/StatCard.tsx
interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  change, 
  icon 
}) => {
  return (
    <Box
      p={6}
      bg="white"
      borderRadius="lg"
      shadow="md"
      border="1px"
      borderColor="neutral.200"
    >
      <Flex justify="space-between" align="flex-start">
        <Box>
          <Text fontSize="sm" color="neutral.600" fontWeight="medium">
            {title}
          </Text>
          <Text fontSize="3xl" fontWeight="bold" mt={2}>
            {value}
          </Text>
          {change && (
            <Flex align="center" mt={2}>
              <Icon 
                name={change.type === 'increase' ? 'trend-up' : 'trend-down'}
                size="sm"
                color={change.type === 'increase' ? 'success' : 'error'}
              />
              <Text
                fontSize="sm"
                color={change.type === 'increase' ? 'success' : 'error'}
                ml={1}
              >
                {change.value}%
              </Text>
            </Flex>
          )}
        </Box>
        {icon && (
          <Box color="brand.primary">
            {icon}
          </Box>
        )}
      </Flex>
    </Box>
  );
};
```

#### Progress Bar Component
```typescript
// src/components/molecules/ProgressBar/ProgressBar.tsx
interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  color?: 'primary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  color = 'primary',
  size = 'md',
  showPercentage = false
}) => {
  const percentage = (value / max) * 100;
  
  const colorMap = {
    primary: 'brand.primary',
    success: 'success',
    warning: 'warning',
    error: 'error'
  };
  
  const sizeMap = {
    sm: '6px',
    md: '8px',
    lg: '12px'
  };
  
  return (
    <Box>
      {(label || showPercentage) && (
        <Flex justify="space-between" align="center" mb={2}>
          {label && (
            <Text fontSize="sm" color="neutral.700">
              {label}
            </Text>
          )}
          {showPercentage && (
            <Text fontSize="sm" color="neutral.600">
              {Math.round(percentage)}%
            </Text>
          )}
        </Flex>
      )}
      <Box
        w="full"
        h={sizeMap[size]}
        bg="neutral.200"
        borderRadius="full"
        overflow="hidden"
      >
        <Box
          h="full"
          w={`${percentage}%`}
          bg={colorMap[color]}
          borderRadius="full"
          transition="width 0.3s ease"
        />
      </Box>
    </Box>
  );
};
```

#### Puzzle Hint Component
```typescript
// src/components/molecules/PuzzleHint/PuzzleHint.tsx
interface PuzzleHintProps {
  hints: string[];
  currentHintIndex: number;
  onRequestNextHint: () => void;
  onCloseHint: () => void;
}

const PuzzleHint: React.FC<PuzzleHintProps> = ({
  hints,
  currentHintIndex,
  onRequestNextHint,
  onCloseHint
}) => {
  return (
    <Box
      p={4}
      bg="info.50"
      border="1px"
      borderColor="info.200"
      borderRadius="md"
    >
      <Flex justify="space-between" align="flex-start" mb={2}>
        <Text fontSize="sm" fontWeight="medium" color="info.800">
          Hint {currentHintIndex + 1} of {hints.length}
        </Text>
        <IconButton
          size="xs"
          variant="ghost"
          icon={<Icon name="close" />}
          onClick={onCloseHint}
          aria-label="Close hint"
        />
      </Flex>
      
      <Text fontSize="sm" color="info.700" mb={3}>
        {hints[currentHintIndex]}
      </Text>
      
      {currentHintIndex < hints.length - 1 && (
        <Button size="sm" variant="ghost" onClick={onRequestNextHint}>
          Next Hint
        </Button>
      )}
    </Box>
  );
};
```

### Organisms (Integration with react-chessboard)

#### Chess Board Integration Component
```typescript
// src/components/organisms/ChessBoard/ChessBoardWrapper.tsx
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

interface ChessBoardWrapperProps {
  position: string;
  onMove: (sourceSquare: string, targetSquare: string) => boolean;
  orientation?: 'white' | 'black';
  showCoordinates?: boolean;
  disabled?: boolean;
  customBoardStyle?: object;
  customPieces?: object;
  customSquareStyles?: object;
}

const ChessBoardWrapper: React.FC<ChessBoardWrapperProps> = ({
  position,
  onMove,
  orientation = 'white',
  showCoordinates = true,
  disabled = false,
  customBoardStyle = {},
  customPieces = {},
  customSquareStyles = {}
}) => {
  const defaultBoardStyle = {
    borderRadius: '4px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  };

  const defaultSquareStyles = {
    // Highlight colors from our design tokens
    lastMoveSquare: { backgroundColor: '#ffe066' },
    selectedSquare: { backgroundColor: '#ffd93d' },
    checkSquare: { backgroundColor: '#ff6b6b' },
    ...customSquareStyles
  };

  return (
    <Box maxW="600px" mx="auto">
      <Chessboard
        position={position}
        onPieceDrop={(sourceSquare, targetSquare) => onMove(sourceSquare, targetSquare)}
        boardOrientation={orientation}
        showBoardNotation={showCoordinates}
        arePiecesDisabled={disabled}
        customBoardStyle={{ ...defaultBoardStyle, ...customBoardStyle }}
        customSquareStyles={defaultSquareStyles}
        customPieces={customPieces}
      />
    </Box>
  );
};
```

#### Navigation Bar Component
```typescript
// src/components/organisms/NavigationBar/NavigationBar.tsx
interface NavigationBarProps {
  user?: User;
  onLogout?: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'home' },
    { label: 'Puzzles', path: '/puzzles', icon: 'puzzle' },
    { label: 'Games', path: '/games', icon: 'chess' },
    { label: 'Analysis', path: '/analysis', icon: 'chart' },
    { label: 'Settings', path: '/settings', icon: 'settings' }
  ];
  
  return (
    <Box
      as="nav"
      bg="white"
      borderBottom="1px"
      borderColor="neutral.200"
      px={6}
      py={4}
    >
      <Flex justify="space-between" align="center">
        {/* Logo */}
        <Flex align="center" gap={3}>
          <Icon name="chess-knight" size="lg" />
          <Text fontSize="xl" fontWeight="bold" color="brand.primary">
            Chess Training
          </Text>
        </Flex>
        
        {/* Navigation Items */}
        <Flex gap={6}>
          {navigationItems.map(item => (
            <Button
              key={item.path}
              variant={location.pathname === item.path ? 'primary' : 'ghost'}
              leftIcon={<Icon name={item.icon} />}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </Button>
          ))}
        </Flex>
        
        {/* User Menu */}
        {user && (
          <Menu>
            <MenuButton as={Button} variant="ghost">
              <Flex align="center" gap={2}>
                <Avatar size="sm" name={user.name} />
                <Text>{user.name}</Text>
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => navigate('/profile')}>
                Profile
              </MenuItem>
              <MenuItem onClick={() => navigate('/settings')}>
                Settings
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={onLogout}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
    </Box>
  );
};
```

#### Puzzle Interface Organism
```typescript
// src/components/organisms/PuzzleInterface/PuzzleInterface.tsx
interface PuzzleInterfaceProps {
  puzzle: Puzzle;
  onMove: (sourceSquare: string, targetSquare: string) => boolean;
  onHint: () => void;
  onSkip: () => void;
  onReset: () => void;
  feedback?: string;
  hints: string[];
  currentHintIndex: number;
}

const PuzzleInterface: React.FC<PuzzleInterfaceProps> = ({
  puzzle,
  onMove,
  onHint,
  onSkip,
  onReset,
  feedback,
  hints,
  currentHintIndex
}) => {
  return (
    <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
      {/* Chess Board */}
      <Box>
        <VStack spacing={4}>
          <Box>
            <Text fontSize="lg" fontWeight="semibold" textAlign="center">
              {puzzle.title}
            </Text>
            <Text fontSize="sm" color="neutral.600" textAlign="center">
              Rating: {puzzle.rating} | Theme: {puzzle.theme}
            </Text>
          </Box>
          
          <ChessBoardWrapper
            position={puzzle.position}
            onMove={onMove}
            orientation={puzzle.orientation}
          />
        </VStack>
      </Box>
      
      {/* Sidebar Controls */}
      <Box>
        <VStack spacing={4} align="stretch">
          <Box>
            <Text fontSize="md" fontWeight="medium" mb={2}>
              Controls
            </Text>
            <VStack spacing={2}>
              <Button variant="secondary" onClick={onHint} fullWidth>
                Hint
              </Button>
              <Button variant="ghost" onClick={onReset} fullWidth>
                Reset
              </Button>
              <Button variant="ghost" onClick={onSkip} fullWidth>
                Skip
              </Button>
            </VStack>
          </Box>
          
          {/* Feedback */}
          {feedback && (
            <Box
              p={3}
              bg="success.50"
              borderRadius="md"
              border="1px"
              borderColor="success.200"
            >
              <Text fontSize="sm" color="success.700">
                {feedback}
              </Text>
            </Box>
          )}
          
          {/* Hints */}
          {hints.length > 0 && currentHintIndex >= 0 && (
            <PuzzleHint
              hints={hints}
              currentHintIndex={currentHintIndex}
              onRequestNextHint={onHint}
              onCloseHint={() => {/* implement close logic */}}
            />
          )}
        </VStack>
      </Box>
    </Grid>
  );
};
```

## Layout Templates

### Page Layout Template
```typescript
// src/components/templates/PageLayout/PageLayout.tsx
interface PageLayoutProps {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  main: React.ReactNode;
  footer?: React.ReactNode;
  sidebarWidth?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  header,
  sidebar,
  main,
  footer,
  sidebarWidth = '280px'
}) => {
  return (
    <Box minH="100vh" bg="neutral.50">
      {header && (
        <Box position="sticky" top={0} zIndex="sticky">
          {header}
        </Box>
      )}
      
      <Flex flex={1}>
        {sidebar && (
          <Box
            w={sidebarWidth}
            bg="white"
            borderRight="1px"
            borderColor="neutral.200"
            minH="calc(100vh - 80px)"
          >
            {sidebar}
          </Box>
        )}
        
        <Box flex={1} p={6}>
          {main}
        </Box>
      </Flex>
      
      {footer && (
        <Box
          bg="white"
          borderTop="1px"
          borderColor="neutral.200"
          p={6}
        >
          {footer}
        </Box>
      )}
    </Box>
  );
};
```

## Responsive Design Patterns

### Breakpoint System
```typescript
// src/styles/breakpoints.ts
export const breakpoints = {
  base: '0em',    // 0px
  sm: '30em',     // 480px
  md: '48em',     // 768px
  lg: '62em',     // 992px
  xl: '80em',     // 1280px
  '2xl': '96em'   // 1536px
};
```

### Responsive Chess Board
```typescript
// Responsive sizing for different screen sizes
const responsiveChessBoard = {
  width: { 
    base: '320px',  // Mobile
    sm: '400px',    // Small tablet
    md: '480px',    // Large tablet
    lg: '560px',    // Desktop
    xl: '600px'     // Large desktop
  }
};
```

## react-chessboard Customization

### Custom Board Themes
```typescript
// src/styles/chessboardThemes.ts
export const chessboardThemes = {
  traditional: {
    lightSquareStyle: { backgroundColor: '#f0d9b5' },
    darkSquareStyle: { backgroundColor: '#b58863' }
  },
  modern: {
    lightSquareStyle: { backgroundColor: '#ffffff' },
    darkSquareStyle: { backgroundColor: '#769656' }
  },
  darkMode: {
    lightSquareStyle: { backgroundColor: '#312e2b' },
    darkSquareStyle: { backgroundColor: '#272522' }
  }
};

export const interactionStyles = {
  lastMoveSquare: { backgroundColor: '#ffe066' },
  selectedSquare: { backgroundColor: '#ffd93d' },
  checkSquare: { backgroundColor: '#ff6b6b' },
  possibleMoveSquare: { 
    backgroundColor: 'rgba(0, 137, 123, 0.3)',
    borderRadius: '50%'
  }
};
```

## Dark Mode Support

### Theme Toggle Implementation
```typescript
// src/hooks/useTheme.ts
export const useTheme = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  
  return {
    isDark: colorMode === 'dark',
    toggle: toggleColorMode,
    colorMode
  };
};
```

## Accessibility Features

### Screen Reader Support for Chess
```typescript
// Integration with react-chessboard accessibility features
const accessibleChessBoard = {
  'aria-label': 'Interactive chess board',
  'aria-describedby': 'chess-instructions',
  // react-chessboard handles piece announcements
};
```

## Implementation Guidelines

### Component Creation Checklist
- [ ] Follow atomic design principles
- [ ] Use react-chessboard for chess rendering (DO NOT create custom chess pieces)
- [ ] Focus custom components on learning features
- [ ] Implement proper TypeScript interfaces
- [ ] Add accessibility attributes
- [ ] Include responsive design
- [ ] Write comprehensive tests
- [ ] Create Storybook stories
- [ ] Add proper documentation

### Library Integration Standards
- **Chess Board**: Always use react-chessboard
- **Chess Logic**: Always use chess.js
- **UI Components**: Chakra UI for learning interface
- **Custom Components**: Only for learning-specific features

### Code Quality Standards
- Use semantic HTML elements
- Follow WCAG 2.1 AA guidelines
- Implement proper ARIA attributes
- Maintain consistent naming conventions
- Write comprehensive PropTypes/TypeScript interfaces
- Include error boundaries where appropriate

This design system leverages proven chess libraries while focusing our custom development efforts on the unique learning features that differentiate our application.