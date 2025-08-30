/**
 * Custom Puzzles Types
 * Contains all TypeScript interfaces and types for custom puzzle functionality
 * Following the exact pattern from OpeningPuzzles types
 */

/**
 * Represents the current status of a custom puzzle attempt
 */
export type CustomPuzzleStatus = 'unsolved' | 'solved' | 'failed'

/**
 * Represents the active tab in the custom puzzle interface
 */
export type CustomPuzzleTabValue = 'puzzle' | 'collection' | 'import' | 'share'

/**
 * Represents the difficulty level of a custom puzzle
 */
export type CustomPuzzleDifficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'

/**
 * Represents the visibility/sharing level of a custom puzzle collection
 */
export type CollectionVisibility = 'private' | 'shared' | 'public'

/**
 * Represents the source of a custom puzzle (user-created, imported, etc.)
 */
export type PuzzleSource = 'user-created' | 'imported' | 'community' | 'lichess' | 'chess-com'

/**
 * Represents a complete custom puzzle with all metadata
 */
export interface CustomPuzzle {
  /** Unique identifier for the puzzle */
  id: string
  
  /** FEN (Forsyth-Edwards Notation) string representing the puzzle position */
  fen: string
  
  /** Array of moves in algebraic notation that solve the puzzle */
  solution: string[]
  
  /** User-defined title for the puzzle */
  title: string
  
  /** User-defined description of the puzzle */
  description: string
  
  /** The tactical or strategic theme of the puzzle */
  theme: string
  
  /** Difficulty classification */
  difficulty: CustomPuzzleDifficulty
  
  /** Puzzle rating (Elo-style rating) */
  rating: number
  
  /** Number of moves required to solve the puzzle */
  moves: number
  
  /** Tags for categorization and filtering */
  tags: string[]
  
  /** Source where this puzzle came from */
  source: PuzzleSource
  
  /** Author/creator information */
  author: {
    id: string
    name: string
    rating?: number
  }
  
  /** Creation timestamp */
  createdAt: Date
  
  /** Last modified timestamp */
  updatedAt: Date
  
  /** Number of times this puzzle has been attempted */
  attemptCount: number
  
  /** Success rate percentage */
  successRate: number
  
  /** Average solving time in seconds */
  averageTime: number
  
  /** Collection ID this puzzle belongs to (optional) */
  collectionId?: string
  
  /** First hint for the puzzle */
  hint1: string
  
  /** Second hint for the puzzle (more specific) */
  hint2: string
  
  /** Third hint for the puzzle (most specific) */
  hint3: string
  
  /** Comments or notes from the creator */
  notes?: string
  
  /** Whether this puzzle is featured/highlighted */
  isFeatured: boolean
  
  /** Whether this puzzle is bookmarked by the current user */
  isBookmarked: boolean
}

/**
 * Represents a collection of custom puzzles
 */
export interface CustomPuzzleCollection {
  /** Unique identifier for the collection */
  id: string
  
  /** Collection name */
  name: string
  
  /** Collection description */
  description: string
  
  /** Collection visibility level */
  visibility: CollectionVisibility
  
  /** Array of puzzle IDs in this collection */
  puzzleIds: string[]
  
  /** Collection author */
  author: {
    id: string
    name: string
    rating?: number
  }
  
  /** Collection tags */
  tags: string[]
  
  /** Creation timestamp */
  createdAt: Date
  
  /** Last modified timestamp */
  updatedAt: Date
  
  /** Number of times this collection has been accessed */
  accessCount: number
  
  /** Average rating of puzzles in this collection */
  averageRating: number
  
  /** Collection thumbnail (FEN for preview) */
  thumbnail?: string
  
  /** Whether this collection is featured */
  isFeatured: boolean
  
  /** Whether this collection is bookmarked by current user */
  isBookmarked: boolean
}

/**
 * Represents the current state of a custom puzzle solving session
 */
export interface CustomPuzzleSession {
  /** Index of the currently active puzzle */
  currentPuzzleIndex: number
  
  /** Current board position as FEN string */
  boardPosition: string
  
  /** Number of moves made by the user */
  moveCount: number
  
  /** Number of hints the user has requested */
  hintsUsed: number
  
  /** Current puzzle status */
  status: CustomPuzzleStatus
  
  /** Whether a hint is currently being displayed */
  showHint: boolean
  
  /** Time elapsed in seconds since puzzle started */
  timeElapsed: number
  
  /** Whether the puzzle timer is currently running */
  isTimerActive: boolean
  
  /** Array of moves made by the user in algebraic notation */
  userMoves: string[]
  
  /** Currently active tab in the puzzle interface */
  activeTab: CustomPuzzleTabValue
  
  /** Current collection being played (optional) */
  currentCollection?: CustomPuzzleCollection
  
  /** Filtering criteria for puzzle selection */
  filters: {
    difficulty?: CustomPuzzleDifficulty[]
    themes?: string[]
    rating?: { min: number; max: number }
    source?: PuzzleSource[]
    tags?: string[]
  }
  
  /** Search query for puzzle filtering */
  searchQuery: string
  
  /** Sorting criteria */
  sortBy: 'rating' | 'difficulty' | 'created' | 'popularity' | 'random'
  
  /** Sort order */
  sortOrder: 'asc' | 'desc'
}

/**
 * Props for the custom puzzle board component
 */
export interface CustomPuzzleBoardProps {
  /** Current board position as FEN string */
  position: string
  
  /** Callback fired when a piece is dropped */
  onPieceDrop: (sourceSquare: string, targetSquare: string) => boolean
  
  /** Board orientation */
  orientation?: 'white' | 'black'
  
  /** Show board coordinates */
  showCoordinates?: boolean
  
  /** Custom board theme */
  boardTheme?: { lightSquare?: string; darkSquare?: string } | string
}

/**
 * Props for custom puzzle navigation controls
 */
export interface CustomPuzzleControlsProps {
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
  
  /** Callback for bookmarking current puzzle */
  onBookmark: () => void
  
  /** Callback for sharing current puzzle */
  onShare: () => void
  
  /** Whether current puzzle is bookmarked */
  isBookmarked: boolean
}

/**
 * Props for the custom puzzle information panel
 */
export interface CustomPuzzleInfoProps {
  /** The current puzzle */
  puzzle: CustomPuzzle
  
  /** Current puzzle session state */
  session: CustomPuzzleSession
  
  /** Callback for requesting a hint */
  onRequestHint: () => void
  
  /** Function to get the current hint text */
  getCurrentHint: () => string
  
  /** Function to format time display */
  formatTime: (seconds: number) => string
  
  /** Callback for editing puzzle (if user is author) */
  onEdit?: () => void
  
  /** Callback for deleting puzzle (if user is author) */
  onDelete?: () => void
}

/**
 * Props for the custom puzzle collection browser
 */
export interface CustomPuzzleCollectionBrowserProps {
  /** Available collections */
  collections: CustomPuzzleCollection[]
  
  /** Current user's collections */
  userCollections: CustomPuzzleCollection[]
  
  /** Callback for selecting a collection */
  onSelectCollection: (collection: CustomPuzzleCollection) => void
  
  /** Callback for creating new collection */
  onCreateCollection: () => void
  
  /** Callback for importing collection */
  onImportCollection: () => void
  
  /** Current theme */
  theme: any
  
  /** Loading state */
  isLoading: boolean
}

/**
 * Props for puzzle import/export functionality
 */
export interface PuzzleImportExportProps {
  /** Callback for importing PGN file */
  onImportPGN: (file: File) => void
  
  /** Callback for importing from URL */
  onImportFromURL: (url: string) => void
  
  /** Callback for exporting collection */
  onExportCollection: (collectionId: string, format: 'pgn' | 'json') => void
  
  /** Current theme */
  theme: any
  
  /** Import progress */
  importProgress?: {
    current: number
    total: number
    status: 'processing' | 'complete' | 'error'
  }
}

/**
 * Props for puzzle sharing functionality
 */
export interface PuzzleSharingProps {
  /** Current puzzle to share */
  puzzle: CustomPuzzle
  
  /** Callback for generating share link */
  onGenerateShareLink: () => string
  
  /** Callback for copying to clipboard */
  onCopyToClipboard: (text: string) => void
  
  /** Callback for sharing to social media */
  onShareToSocial: (platform: 'twitter' | 'discord' | 'reddit') => void
  
  /** Current theme */
  theme: any
}

/**
 * Return type for custom puzzle move validation
 */
export interface CustomMoveValidationResult {
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
  
  /** Feedback message for the user */
  feedback?: string
}

/**
 * Configuration for custom puzzle filtering and searching
 */
export interface CustomPuzzleFilters {
  /** Difficulty levels to include */
  difficulty?: CustomPuzzleDifficulty[]
  
  /** Themes to include */
  themes?: string[]
  
  /** Rating range */
  rating?: { min: number; max: number }
  
  /** Puzzle sources to include */
  source?: PuzzleSource[]
  
  /** Tags to include */
  tags?: string[]
  
  /** Collections to include */
  collections?: string[]
  
  /** Author filter */
  author?: string
  
  /** Date range */
  dateRange?: { start: Date; end: Date }
  
  /** Minimum success rate */
  minSuccessRate?: number
  
  /** Only show bookmarked puzzles */
  bookmarkedOnly?: boolean
  
  /** Only show featured puzzles */
  featuredOnly?: boolean
}

/**
 * Search result for custom puzzles
 */
export interface CustomPuzzleSearchResult {
  /** Matching puzzles */
  puzzles: CustomPuzzle[]
  
  /** Total count of matching puzzles */
  totalCount: number
  
  /** Current page */
  currentPage: number
  
  /** Total pages */
  totalPages: number
  
  /** Applied filters */
  appliedFilters: CustomPuzzleFilters
  
  /** Search query used */
  searchQuery: string
  
  /** Search execution time */
  executionTime: number
}

/**
 * Custom puzzle creation form data
 */
export interface CustomPuzzleFormData {
  /** Puzzle title */
  title: string
  
  /** Puzzle description */
  description: string
  
  /** Starting position FEN */
  fen: string
  
  /** Solution moves */
  solution: string[]
  
  /** Puzzle theme */
  theme: string
  
  /** Difficulty level */
  difficulty: CustomPuzzleDifficulty
  
  /** Tags */
  tags: string[]
  
  /** Hints */
  hint1: string
  hint2: string
  hint3: string
  
  /** Additional notes */
  notes?: string
  
  /** Collection to add to */
  collectionId?: string
}