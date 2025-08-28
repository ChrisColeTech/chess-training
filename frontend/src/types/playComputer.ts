/**
 * Play vs Computer Types
 * Contains all TypeScript interfaces and types for playing against AI opponents
 */

/**
 * Difficulty levels for AI opponents
 */
export type AIDifficulty = 'Novice' | 'Intermediate' | 'Advanced' | 'Expert' | 'Grandmaster'

/**
 * Game time control types
 */
export type TimeControl = 'Blitz' | 'Rapid' | 'Classical' | 'Unlimited'

/**
 * Player color choice
 */
export type PlayerColor = 'white' | 'black' | 'random'

/**
 * Game status states
 */
export type GameStatus = 'setup' | 'active' | 'paused' | 'completed' | 'abandoned'

/**
 * Game result types
 */
export type GameResult = 'white_wins' | 'black_wins' | 'draw' | 'ongoing' | 'abandoned'

/**
 * AI playing styles with gaming personalities
 */
export type AIPersonality = 
  | 'Aggressive' 
  | 'Positional' 
  | 'Tactical' 
  | 'Defensive' 
  | 'Balanced' 
  | 'Unorthodox'

/**
 * Represents an AI opponent with gaming-themed personality
 */
export interface AIOpponent {
  /** Unique identifier */
  id: string
  
  /** Display name with gaming theme */
  name: string
  
  /** Gaming-themed title/rank */
  title: string
  
  /** Avatar/icon identifier */
  avatar: string
  
  /** AI difficulty level */
  difficulty: AIDifficulty
  
  /** Estimated Elo rating */
  rating: number
  
  /** Playing style personality */
  personality: AIPersonality
  
  /** Gaming-themed description */
  description: string
  
  /** Favorite openings */
  favoriteOpenings: string[]
  
  /** Special abilities or characteristics */
  specialties: string[]
  
  /** Win rate percentage */
  winRate: number
  
  /** Gaming-themed backstory */
  backstory: string
  
  /** Unlock requirements */
  unlockRequirements?: {
    minRating?: number
    completedGames?: number
    achievements?: string[]
  }
  
  /** Whether this opponent is unlocked */
  isUnlocked: boolean
}

/**
 * Time control configuration
 */
export interface TimeControlConfig {
  /** Time control type */
  type: TimeControl
  
  /** Initial time in minutes */
  initialTime: number
  
  /** Increment per move in seconds */
  increment: number
  
  /** Display name */
  displayName: string
  
  /** Description */
  description: string
}

/**
 * Game setup configuration
 */
export interface GameSetup {
  /** Selected AI opponent */
  opponent: AIOpponent
  
  /** Player's color choice */
  playerColor: PlayerColor
  
  /** Time control settings */
  timeControl: TimeControlConfig
  
  /** Whether to use opening book */
  useOpeningBook: boolean
  
  /** Whether to show move hints */
  showHints: boolean
  
  /** Whether to enable sound effects */
  enableSounds: boolean
}

/**
 * Chess move representation
 */
export interface ChessMove {
  /** Source square (e.g., 'e2') */
  from: string
  
  /** Target square (e.g., 'e4') */
  to: string
  
  /** Piece type */
  piece: string
  
  /** Captured piece (if any) */
  captured?: string
  
  /** Move in Standard Algebraic Notation */
  san: string
  
  /** Move number */
  moveNumber: number
  
  /** Whether this is a white or black move */
  color: 'white' | 'black'
  
  /** Timestamp when move was made */
  timestamp: number
  
  /** Time remaining after move (in milliseconds) */
  timeRemaining: number
  
  /** Move evaluation (if analysis is enabled) */
  evaluation?: {
    score: number
    bestMove: string
    depth: number
  }
}

/**
 * Current game state
 */
export interface GameState {
  /** Unique game identifier */
  gameId: string
  
  /** Game setup configuration */
  setup: GameSetup
  
  /** Current board position (FEN) */
  position: string
  
  /** Move history */
  moves: ChessMove[]
  
  /** Current game status */
  status: GameStatus
  
  /** Game result */
  result: GameResult
  
  /** Current turn */
  currentTurn: 'white' | 'black'
  
  /** Time remaining for each player */
  timeRemaining: {
    white: number
    black: number
  }
  
  /** Whether player is in check */
  inCheck: boolean
  
  /** Available legal moves for current position */
  legalMoves: string[]
  
  /** Game start timestamp */
  startTime: number
  
  /** Game end timestamp (if completed) */
  endTime?: number
  
  /** Last move made */
  lastMove?: ChessMove
  
  /** Whether AI is currently thinking */
  aiThinking: boolean
}

/**
 * Game analysis data
 */
export interface GameAnalysis {
  /** Overall game evaluation */
  evaluation: number
  
  /** Best moves in the position */
  bestMoves: string[]
  
  /** Position analysis */
  positionAnalysis: {
    materialBalance: number
    kingSafety: 'Safe' | 'Exposed' | 'Critical'
    centerControl: 'White' | 'Black' | 'Equal'
    pawnStructure: 'Good' | 'Average' | 'Poor'
  }
  
  /** Tactical themes present */
  tacticalThemes: string[]
  
  /** Opening classification */
  opening: {
    name: string
    eco: string
    moves: string[]
  }
  
  /** Endgame classification (if applicable) */
  endgame?: {
    type: string
    result: 'winning' | 'drawing' | 'losing'
    technique: string
  }
}

/**
 * Performance statistics
 */
export interface PerformanceStats {
  /** Total games played */
  gamesPlayed: number
  
  /** Games won */
  gamesWon: number
  
  /** Games drawn */
  gamesDrawn: number
  
  /** Games lost */
  gamesLost: number
  
  /** Win percentage */
  winRate: number
  
  /** Average game length (moves) */
  avgGameLength: number
  
  /** Average game duration (minutes) */
  avgGameDuration: number
  
  /** Current rating */
  currentRating: number
  
  /** Highest rating achieved */
  peakRating: number
  
  /** Games by difficulty */
  gamesByDifficulty: Record<AIDifficulty, number>
  
  /** Favorite time controls */
  timeControlStats: Record<TimeControl, {
    played: number
    won: number
    winRate: number
  }>
  
  /** Recent performance trend */
  recentGames: {
    result: GameResult
    rating: number
    opponent: string
    date: number
  }[]
}

/**
 * Props for AI opponent selector component
 */
export interface OpponentSelectorProps {
  /** Available AI opponents */
  opponents: AIOpponent[]
  
  /** Currently selected opponent */
  selectedOpponent: AIOpponent | null
  
  /** Callback when opponent is selected */
  onOpponentSelect: (opponent: AIOpponent) => void
  
  /** Player's current rating */
  playerRating: number
  
  /** Theme from store */
  theme: any
}

/**
 * Props for game setup component
 */
export interface GameSetupProps {
  /** Current game setup */
  setup: Partial<GameSetup>
  
  /** Callback when setup changes */
  onSetupChange: (setup: Partial<GameSetup>) => void
  
  /** Callback to start game */
  onStartGame: () => void
  
  /** Whether setup is valid */
  isValidSetup: boolean
  
  /** Theme from store */
  theme: any
}

/**
 * Props for chess game board component
 */
export interface ChessGameBoardProps {
  /** Current game state */
  gameState: GameState
  
  /** Callback when player makes a move */
  onPlayerMove: (from: string, to: string) => void
  
  /** Player's color */
  playerColor: 'white' | 'black'
  
  /** Whether to show coordinates */
  showCoordinates: boolean
  
  /** Whether to show last move highlight */
  showLastMove: boolean
  
  /** Theme from store */
  theme: any
}

/**
 * Props for move history component
 */
export interface MoveHistoryProps {
  /** Game moves */
  moves: ChessMove[]
  
  /** Current move index being viewed */
  currentMoveIndex: number
  
  /** Callback when move is selected for review */
  onMoveSelect: (moveIndex: number) => void
  
  /** Whether to show move evaluations */
  showEvaluations: boolean
  
  /** Theme from store */
  theme: any
}

/**
 * Props for game analysis component
 */
export interface GameAnalysisProps {
  /** Current game state */
  gameState: GameState
  
  /** Game analysis data */
  analysis: GameAnalysis | null
  
  /** Whether analysis is loading */
  isAnalyzing: boolean
  
  /** Callback to request analysis */
  onAnalyze: () => void
  
  /** Theme from store */
  theme: any
}

/**
 * Hook return type for usePlayComputer
 */
export interface PlayComputerHookReturn {
  // Game state
  gameState: GameState | null
  gameAnalysis: GameAnalysis | null
  availableOpponents: AIOpponent[]
  performanceStats: PerformanceStats
  
  // Setup state
  gameSetup: Partial<GameSetup>
  isValidSetup: boolean
  
  // Loading states
  isLoading: boolean
  isAnalyzing: boolean
  
  // Actions
  selectOpponent: (opponent: AIOpponent) => void
  updateSetup: (setup: Partial<GameSetup>) => void
  startGame: () => Promise<void>
  makeMove: (from: string, to: string) => Promise<boolean>
  resignGame: () => void
  offerDraw: () => void
  pauseGame: () => void
  resumeGame: () => void
  analyzePosition: () => Promise<void>
  
  // Utilities
  canMakeMove: boolean
  isPlayerTurn: boolean
  gameStatus: GameStatus
  
  // Error handling
  error: string | null
  clearError: () => void
}

/**
 * AI move calculation result
 */
export interface AIMoveResult {
  /** The move to make */
  move: ChessMove
  
  /** Confidence level (0-1) */
  confidence: number
  
  /** Time taken to calculate (ms) */
  calculationTime: number
  
  /** Engine evaluation of the position */
  evaluation: number
  
  /** Depth of calculation */
  depth: number
}

/**
 * Rating change after game
 */
export interface RatingChange {
  /** Previous rating */
  oldRating: number
  
  /** New rating */
  newRating: number
  
  /** Rating change amount */
  change: number
  
  /** Reason for change */
  reason: 'win' | 'loss' | 'draw'
}