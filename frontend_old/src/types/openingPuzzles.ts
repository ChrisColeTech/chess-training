/**
 * Opening Puzzles Types
 * Contains all TypeScript interfaces and types for opening puzzle functionality
 */

/**
 * Represents the current status of a puzzle attempt
 */
export type PuzzleStatus = 'unsolved' | 'solved' | 'failed'

/**
 * Represents the active tab in the puzzle interface
 */
export type TabValue = 'puzzle' | 'theory' | 'analysis'

/**
 * Represents the difficulty level of an opening puzzle
 */
export type PuzzleDifficulty = 'Beginner' | 'Intermediate' | 'Advanced'

/**
 * Represents a complete opening puzzle with all metadata
 */
export interface OpeningPuzzle {
  /** Unique identifier for the puzzle */
  id: number
  
  /** FEN (Forsyth-Edwards Notation) string representing the puzzle position */
  fen: string
  
  /** Array of moves in algebraic notation that solve the puzzle */
  solution: string[]
  
  /** The chess opening name (e.g., "Italian Game") */
  opening: string
  
  /** ECO (Encyclopedia of Chess Openings) code */
  eco: string
  
  /** The tactical or strategic theme of the puzzle */
  theme: string
  
  /** Difficulty classification */
  difficulty: PuzzleDifficulty
  
  /** Puzzle rating (Elo-style rating) */
  rating: number
  
  /** Number of moves required to solve the puzzle */
  moves: number
  
  /** Brief description of what the player should accomplish */
  description: string
  
  /** Detailed explanation of the opening theory behind the puzzle */
  theory: string
  
  /** Description of the trap or tactical motif */
  trap: string
  
  /** First hint for the puzzle */
  hint1: string
  
  /** Second hint for the puzzle (more specific) */
  hint2: string
  
  /** Third hint for the puzzle (most specific) */
  hint3: string
  
  /** How to defend against this trap/tactic */
  prevention: string
}

/**
 * Represents the current state of a puzzle solving session
 */
export interface PuzzleSession {
  /** Index of the currently active puzzle */
  currentPuzzleIndex: number
  
  /** Current board position as FEN string */
  boardPosition: string
  
  /** Number of moves made by the user */
  moveCount: number
  
  /** Number of hints the user has requested */
  hintsUsed: number
  
  /** Current puzzle status */
  status: PuzzleStatus
  
  /** Whether a hint is currently being displayed */
  showHint: boolean
  
  /** Time elapsed in seconds since puzzle started */
  timeElapsed: number
  
  /** Whether the puzzle timer is currently running */
  isTimerActive: boolean
  
  /** Array of moves made by the user in algebraic notation */
  userMoves: string[]
  
  /** Currently active tab in the puzzle interface */
  activeTab: TabValue
}

/**
 * Props for the chess board component in puzzles
 */
export interface PuzzleBoardProps {
  /** Current board position as FEN string */
  position: string
  
  /** Callback fired when a piece is dropped */
  onPieceDrop: (sourceSquare: string, targetSquare: string) => boolean
  
  /** Board orientation */
  orientation?: 'white' | 'black'
}

/**
 * Props for puzzle navigation controls
 */
export interface PuzzleControlsProps {
  /** Current puzzle index */
  currentPuzzleIndex: number
  
  /** Total number of puzzles */
  totalPuzzles: number
  
  /** Whether previous button should be disabled */
  canGoPrevious: boolean
  
  /** Whether next button should be disabled */
  canGoNext: boolean
  
  /** Callback for going to previous puzzle */
  onPrevious: () => void
  
  /** Callback for going to next puzzle */
  onNext: () => void
  
  /** Callback for resetting current puzzle */
  onReset: () => void
  
  /** Callback for skipping current puzzle */
  onSkip: () => void
}

/**
 * Props for the puzzle information panel
 */
export interface PuzzleInfoProps {
  /** The current puzzle */
  puzzle: OpeningPuzzle
  
  /** Current puzzle session state */
  session: PuzzleSession
  
  /** Callback for requesting a hint */
  onRequestHint: () => void
  
  /** Function to get the current hint text */
  getCurrentHint: () => string
  
  /** Function to format time display */
  formatTime: (seconds: number) => string
}

/**
 * Props for the puzzle tabs component
 */
export interface PuzzleTabsProps {
  /** The current puzzle */
  puzzle: OpeningPuzzle
  
  /** Current theme from theme store */
  theme: any
}

/**
 * Props for the puzzle progress card
 */
export interface PuzzleProgressProps {
  /** Current puzzle index */
  currentPuzzleIndex: number
  
  /** Total number of puzzles */
  totalPuzzles: number
  
  /** Current theme */
  theme: any
}

/**
 * Configuration for puzzle timer
 */
export interface TimerConfig {
  /** Whether timer should auto-start */
  autoStart: boolean
  
  /** Timer update interval in milliseconds */
  interval: number
}

/**
 * Return type for puzzle move validation
 */
export interface MoveValidationResult {
  /** Whether the move was valid */
  isValid: boolean
  
  /** Whether the move was correct according to the solution */
  isCorrect: boolean
  
  /** Whether the puzzle is now complete */
  isComplete: boolean
  
  /** The move that was made (if valid) */
  move?: any
  
  /** Error message if move was invalid */
  error?: string
}