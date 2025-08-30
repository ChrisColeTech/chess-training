/**
 * Master Games Types
 * Contains all TypeScript interfaces and types for studying annotated master games
 */

/**
 * Game result types
 */
export type GameResult = '1-0' | '0-1' | '1/2-1/2'

/**
 * Player color
 */
export type PlayerColor = 'white' | 'black'

/**
 * Chess opening ECO classification
 */
export type ECOCode = string // Format: A00-E99

/**
 * Game time control categories
 */
export type TimeControlCategory = 'Classical' | 'Rapid' | 'Blitz' | 'Correspondence' | 'Unknown'

/**
 * Master chess player information
 */
export interface MasterPlayer {
  /** Player name */
  name: string
  
  /** Player rating at time of game */
  rating: number
  
  /** Peak rating achieved */
  peakRating?: number
  
  /** Country/nationality */
  country?: string
  
  /** Birth year */
  birthYear?: number
  
  /** Notable titles (GM, IM, WGM, etc.) */
  titles: string[]
  
  /** World champion years if applicable */
  championshipYears?: number[]
  
  /** Brief biography */
  biography?: string
  
  /** Playing style description */
  playingStyle?: string
  
  /** Famous for (sacrifices, endgames, etc.) */
  specialties?: string[]
}

/**
 * Chess tournament information
 */
export interface Tournament {
  /** Tournament name */
  name: string
  
  /** Location (city, country) */
  location: string
  
  /** Tournament year */
  year: number
  
  /** Full date if available */
  date?: string
  
  /** Tournament type */
  type: 'World Championship' | 'Candidates' | 'Olympiad' | 'Grand Prix' | 'Invitational' | 'Open' | 'Match' | 'Other'
  
  /** Time control category */
  timeControl: TimeControlCategory
  
  /** Number of players */
  playerCount?: number
  
  /** Prize fund if available */
  prizeFund?: string
  
  /** Tournament significance */
  significance?: string
}

/**
 * Chess opening information
 */
export interface ChessOpening {
  /** Opening name */
  name: string
  
  /** ECO code */
  eco: ECOCode
  
  /** Main line moves in algebraic notation */
  moves: string[]
  
  /** Opening category (e.g., "Sicilian Defense", "King's Gambit") */
  category: string
  
  /** Sub-variation name */
  variation?: string
  
  /** Opening characteristics */
  characteristics?: string[]
  
  /** Common themes in this opening */
  themes?: string[]
  
  /** Popularity rating (1-10) */
  popularity?: number
}

/**
 * Move annotation with analysis
 */
export interface MoveAnnotation {
  /** Move number (half-moves) */
  moveNumber: number
  
  /** Move in Standard Algebraic Notation */
  san: string
  
  /** Text annotation */
  comment: string
  
  /** Numeric assessment (!, !!, ?, ??, !?, ?!) */
  assessment?: '!' | '!!' | '?' | '??' | '!?' | '?!'
  
  /** Engine evaluation if available */
  evaluation?: number
  
  /** Whether this is a key/critical moment */
  isKeyMoment: boolean
  
  /** Tactical themes present */
  themes?: string[]
  
  /** Alternative moves suggested */
  alternatives?: string[]
}

/**
 * Game analysis and insights
 */
export interface GameAnalysis {
  /** Overall game quality rating (1-10) */
  quality: number
  
  /** Game phases analysis */
  phases: {
    opening: {
      assessment: 'Excellent' | 'Good' | 'Average' | 'Poor'
      keyMoves: number[]
      novelties?: number[]
    }
    middlegame: {
      assessment: 'Excellent' | 'Good' | 'Average' | 'Poor'
      keyMoves: number[]
      tacticalMotifs?: string[]
    }
    endgame?: {
      assessment: 'Excellent' | 'Good' | 'Average' | 'Poor'
      keyMoves: number[]
      technique?: string
    }
  }
  
  /** Main strategic themes */
  strategicThemes: string[]
  
  /** Tactical themes present */
  tacticalThemes: string[]
  
  /** Educational value (1-10) */
  educationalValue: number
  
  /** What players can learn */
  learningObjectives: string[]
  
  /** Recommended follow-up study */
  studyRecommendations: string[]
  
  /** Historical significance */
  historicalSignificance?: string
  
  /** Famous quotes about the game */
  quotes?: Array<{
    text: string
    author: string
  }>
}

/**
 * Complete master game record
 */
export interface MasterGame {
  /** Unique game identifier */
  id: string
  
  /** White player information */
  white: MasterPlayer
  
  /** Black player information */
  black: MasterPlayer
  
  /** Tournament information */
  tournament: Tournament
  
  /** Game result */
  result: GameResult
  
  /** Opening information */
  opening: ChessOpening
  
  /** Complete game moves in PGN format */
  pgn: string
  
  /** Move-by-move annotations */
  annotations: MoveAnnotation[]
  
  /** Key moments (move numbers) */
  keyMoments: number[]
  
  /** Game analysis */
  analysis: GameAnalysis
  
  /** Total number of moves */
  moveCount: number
  
  /** Game duration if known */
  duration?: string
  
  /** Final position FEN */
  finalPosition?: string
  
  /** Whether game is bookmarked by user */
  isBookmarked: boolean
  
  /** User's personal notes */
  personalNotes?: string
  
  /** Study progress */
  studyProgress: {
    viewed: boolean
    analyzed: boolean
    practiced: boolean
    lastViewedAt?: number
  }
}

/**
 * Search and filter criteria
 */
export interface GameFilters {
  /** Search term (player names, tournament, opening) */
  searchTerm: string
  
  /** Filter by specific players */
  players: string[]
  
  /** Filter by tournament types */
  tournamentTypes: Tournament['type'][]
  
  /** Filter by opening categories */
  openingCategories: string[]
  
  /** Filter by ECO codes */
  ecoCodes: ECOCode[]
  
  /** Filter by game results */
  results: GameResult[]
  
  /** Filter by year range */
  yearRange: {
    min: number
    max: number
  }
  
  /** Filter by rating range */
  ratingRange: {
    min: number
    max: number
  }
  
  /** Filter by game quality */
  qualityRange: {
    min: number
    max: number
  }
  
  /** Filter by strategic themes */
  themes: string[]
  
  /** Only show bookmarked games */
  bookmarkedOnly: boolean
  
  /** Sort criteria */
  sortBy: 'date' | 'rating' | 'quality' | 'relevance' | 'name'
  
  /** Sort order */
  sortOrder: 'asc' | 'desc'
}

/**
 * Game library statistics
 */
export interface LibraryStats {
  /** Total games in library */
  totalGames: number
  
  /** Games by century */
  gamesByCentury: Record<string, number>
  
  /** Games by opening */
  gamesByOpening: Record<string, number>
  
  /** Games by result */
  gamesByResult: Record<GameResult, number>
  
  /** Average rating */
  averageRating: number
  
  /** Most frequent players */
  topPlayers: Array<{
    name: string
    gameCount: number
    winRate: number
  }>
  
  /** Most studied games */
  mostStudied: Array<{
    gameId: string
    studyCount: number
  }>
  
  /** Educational themes distribution */
  themeDistribution: Record<string, number>
  
  /** User study statistics */
  userStats: {
    gamesStudied: number
    totalStudyTime: number
    favoriteThemes: string[]
    averageStudyRating: number
  }
}

/**
 * Study session data
 */
export interface StudySession {
  /** Session ID */
  id: string
  
  /** Game being studied */
  gameId: string
  
  /** Session start time */
  startTime: number
  
  /** Session end time */
  endTime?: number
  
  /** Moves studied */
  movesStudied: number[]
  
  /** Time spent on each move */
  timePerMove: Record<number, number>
  
  /** User's analysis attempts */
  analysisAttempts: Array<{
    moveNumber: number
    userMove: string
    wasCorrect: boolean
    timeSpent: number
  }>
  
  /** Session notes */
  notes: string
  
  /** Session rating (how useful was it) */
  rating?: number
  
  /** Concepts learned */
  conceptsLearned: string[]
}

/**
 * Master profile for detailed player information
 */
export interface MasterProfile extends MasterPlayer {
  /** Player photo/avatar URL */
  photoUrl?: string
  
  /** Detailed biography */
  fullBiography: string
  
  /** Career highlights */
  careerHighlights: string[]
  
  /** Famous games (game IDs) */
  famousGames: string[]
  
  /** Opening repertoire */
  openingRepertoire: {
    asWhite: ChessOpening[]
    asBlack: ChessOpening[]
  }
  
  /** Career statistics */
  careerStats: {
    totalGames: number
    winRate: number
    drawRate: number
    lossRate: number
    averageOpponentRating: number
    peakWorldRanking?: number
  }
  
  /** Notable quotes */
  quotes: Array<{
    text: string
    context?: string
    year?: number
  }>
  
  /** Playing style analysis */
  styleAnalysis: {
    aggression: number // 1-10
    tacticalAbility: number
    positionalUnderstanding: number
    endgameSkill: number
    openingPreparation: number
    creativity: number
  }
}

/**
 * Component Props Interfaces
 */

/**
 * Props for GameLibrary component
 */
export interface GameLibraryProps {
  /** Available games */
  games: MasterGame[]
  
  /** Current filter settings */
  filters: GameFilters
  
  /** Loading state */
  isLoading: boolean
  
  /** Selected game ID */
  selectedGameId?: string
  
  /** Callback when game is selected */
  onGameSelect: (game: MasterGame) => void
  
  /** Callback when filters change */
  onFiltersChange: (filters: Partial<GameFilters>) => void
  
  /** Callback when game is bookmarked */
  onBookmarkToggle: (gameId: string) => void
  
  /** Theme from store */
  theme: any
}

/**
 * Props for GameViewer component
 */
export interface GameViewerProps {
  /** Game to display */
  game: MasterGame | null
  
  /** Current move position */
  currentMove: number
  
  /** Whether game is auto-playing */
  isPlaying: boolean
  
  /** Playback speed (moves per second) */
  playbackSpeed: number
  
  /** Whether to show coordinates */
  showCoordinates: boolean
  
  /** Whether to show last move highlight */
  showLastMove: boolean
  
  /** Board orientation */
  orientation: PlayerColor
  
  /** Callback when move position changes */
  onMoveChange: (moveNumber: number) => void
  
  /** Callback when play/pause toggled */
  onPlayToggle: () => void
  
  /** Callback when playback speed changes */
  onSpeedChange: (speed: number) => void
  
  /** Theme from store */
  theme: any
}

/**
 * Props for MasterAnalysis component
 */
export interface MasterAnalysisProps {
  /** Game being analyzed */
  game: MasterGame | null
  
  /** Current move position */
  currentMove: number
  
  /** Analysis mode */
  mode: 'annotations' | 'analysis' | 'database' | 'themes'
  
  /** Callback when mode changes */
  onModeChange: (mode: MasterAnalysisProps['mode']) => void
  
  /** Theme from store */
  theme: any
}

/**
 * Props for PlayerProfile component
 */
export interface PlayerProfileProps {
  /** Player to display */
  player: MasterProfile
  
  /** Loading state */
  isLoading: boolean
  
  /** Callback when player's games are requested */
  onViewGames: (playerId: string) => void
  
  /** Theme from store */
  theme: any
}

/**
 * Hook return type for useMasterGames
 */
export interface MasterGamesHookReturn {
  // Data state
  games: MasterGame[]
  filteredGames: MasterGame[]
  selectedGame: MasterGame | null
  currentMove: number
  libraryStats: LibraryStats
  
  // UI state
  filters: GameFilters
  isPlaying: boolean
  playbackSpeed: number
  boardOrientation: PlayerColor
  analysisMode: MasterAnalysisProps['mode']
  
  // Loading states
  isLoading: boolean
  isLoadingGame: boolean
  
  // Actions
  selectGame: (game: MasterGame) => void
  setCurrentMove: (moveNumber: number) => void
  togglePlayback: () => void
  setPlaybackSpeed: (speed: number) => void
  updateFilters: (filters: Partial<GameFilters>) => void
  toggleBookmark: (gameId: string) => void
  flipBoard: () => void
  setAnalysisMode: (mode: MasterAnalysisProps['mode']) => void
  
  // Game navigation
  goToStart: () => void
  goToEnd: () => void
  goToMove: (moveNumber: number) => void
  nextMove: () => void
  previousMove: () => void
  
  // Study session
  startStudySession: (gameId: string) => void
  endStudySession: (notes?: string, rating?: number) => void
  currentSession: StudySession | null
  
  // Search and discovery
  searchGames: (query: string) => void
  getRecommendedGames: (gameId: string) => MasterGame[]
  getSimilarGames: (gameId: string) => MasterGame[]
  
  // Error handling
  error: string | null
  clearError: () => void
  
  // UI handlers
  handleBackClick: () => void
}

/**
 * Service interfaces for data management
 */

/**
 * Game search result
 */
export interface GameSearchResult {
  /** Matching games */
  games: MasterGame[]
  
  /** Total count before pagination */
  totalCount: number
  
  /** Search suggestions */
  suggestions?: string[]
  
  /** Filter suggestions */
  filterSuggestions?: {
    players: string[]
    openings: string[]
    tournaments: string[]
    themes: string[]
  }
}

/**
 * Game recommendation criteria
 */
export interface RecommendationCriteria {
  /** User's skill level */
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  
  /** Preferred learning style */
  learningStyle: 'Tactical' | 'Positional' | 'Endgame' | 'Opening' | 'Mixed'
  
  /** Time available for study */
  studyTime: number
  
  /** Previously studied games */
  studiedGames: string[]
  
  /** Favorite openings */
  favoriteOpenings: string[]
  
  /** Learning objectives */
  objectives: string[]
}