/**
 * Chess analysis and engine UI configurations
 * 
 * Generated: 2025-08-29T00:52:22.208Z
 * Consolidated from: 9 UI interface(s)
 * Source files: detailedStats.ts, endgameLibrary.ts, gameReview.ts, masterGames.ts, openingExplorer.ts, playComputer.ts
 */

// From: /mnt/c/Projects/chess-training/frontend/src/types/detailedStats.ts
export interface TrendAnalysis {
  ratingTrends: Array<{
    date: string
    rating: number
    gameType: 'classical' | 'rapid' | 'blitz' | 'puzzle'
    confidence: number
  }>; // Rating trends over time
  performanceTrends: Array<{
    date: string
    category: string
    value: number
    benchmark: number
  }>; // Performance trends by category
  activityPatterns: {
    dailyActivity: Array<{
      day: string
      games: number
      puzzles: number
      studyTime: number
    }>
    weeklyPattern: Record<string, number>
    monthlyPattern: Record<string, number>
  }; // Activity patterns
  learningCurve: {
    improvementRate: number
    plateauPeriods: Array<{
      start: string
      end: string
      duration: number
    }>
    breakthroughPoints: Array<{
      date: string
      improvement: number
      catalyst: string
    }>
  }; // Learning curve analysis
  predictions: {
    ratingProjection: Array<{
      date: string
      predicted: number
      lower: number
      upper: number
    }>
    skillDevelopment: Record<string, {
      current: number
      projected3m: number
      projected6m: number
      projected1y: number
    }>
  }; // Prediction models
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/endgameLibrary.ts
export interface EndgamePosition {
  id: string; // Unique identifier
  title: string; // Position title
  subtitle?: string; // Gaming-themed subtitle
  category: EndgameCategory; // Category classification
  difficulty: EndgameDifficulty; // Difficulty level
  fen: string; // Chess position in FEN notation
  description: string; // Position description
  keyPoints: string[]; // Key learning points
  studyTime: string; // Estimated study time
  masterGames: number; // Number of master games with this position
  winRate: number; // Statistical win rate for the stronger side
  evaluation: string; // Engine evaluation
  theoreticalResult: PositionEvaluation; // Theoretical assessment
  ecoCode?: string; // ECO/opening code if applicable
  famousGames?: {
    players: string
    year: number
    tournament: string
    result: string
  }[]; // Famous games featuring this position
  tags: string[]; // Position tags for filtering
  unlockRequirements?: {
    minRating?: number
    completedPositions?: string[]
    masterLevel?: EndgameDifficulty
  }; // Unlocking requirements
  isUnlocked: boolean; // Whether position is unlocked
  relatedPositions: string[]; // Related positions
  author?: string; // Author/analyst who contributed this position
  source?: string; // Publication source
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/endgameLibrary.ts
export interface EndgameAnalysis_endgameLibrary {
  position: string; // Position FEN
  evaluation: number; // Engine evaluation
  bestMoves: string[]; // Best moves
  principalVariation: string[]; // Principal variation
  tacticalThemes: string[]; // Tactical themes present
  strategicConcepts: string[]; // Strategic concepts
  keySquares: string[]; // Key squares in the position
  criticalLines: {
    move: string
    evaluation: number
    line: string[]
    comment: string
  }[]; // Critical moves and variations
  classification: {
    type: string
    subtype?: string
    phase: 'early' | 'middle' | 'late'
  }; // Position classification
  historicalNotes?: string; // Historical analysis
  depth: number; // Computer analysis depth
  timestamp: number; // Analysis timestamp
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/endgameLibrary.ts
export interface EndgameComposition {
  id: string; // Composition ID
  title: string; // Title
  composer: string; // Composer name
  year: number; // Composition year
  fen: string; // Initial position
  stipulation: string; // Stipulation (e.g., "White to play and win")
  solution: {
    mainLine: string[]
    alternatives: {
      move: string
      line: string[]
      comment: string
    }[]
  }; // Solution moves
  artisticValue: number; // Artistic value rating
  solvingDifficulty: EndgameDifficulty; // Difficulty for solving
  themes: string[]; // Theme/motif
  source?: string; // Publication source
  award?: string; // Award won
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/gameReview.ts
export interface EndgameAnalysis_gameReview {
  type: string; // Endgame type
  materialBalance: {
    white: { [piece: string]: number }
    black: { [piece: string]: number }
  }; // Material balance
  theoreticalResult: 'Win' | 'Draw' | 'Loss' | 'Unclear'; // Theoretical result
  keySquares: string[]; // Key squares and concepts
  technique: string; // Winning technique or drawing method
  criticalMoments: number[]; // Critical moments
  tablebaseResult?: 'Win' | 'Draw' | 'Loss'; // Tablebase evaluation (if available)
  distanceToGoal?: number; // Distance to mate/draw
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/masterGames.ts
export interface GameAnalysis_masterGames {
  quality: number; // Overall game quality rating (1-10)
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
  }; // Game phases analysis
  strategicThemes: string[]; // Main strategic themes
  tacticalThemes: string[]; // Tactical themes present
  educationalValue: number; // Educational value (1-10)
  learningObjectives: string[]; // What players can learn
  studyRecommendations: string[]; // Recommended follow-up study
  historicalSignificance?: string; // Historical significance
  quotes?: Array<{
    text: string
    author: string
  }>; // Famous quotes about the game
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/openingExplorer.ts
export interface PositionAnalysis {
  position: string; // Current position FEN
  evaluation: number; // Engine evaluation
  evaluationText: string; // Evaluation in descriptive terms
  bestMoves: string[]; // Best moves according to engine
  tacticalThemes: string[]; // Tactical themes present
  pawnStructure: {
    type: string
    assessment: 'excellent' | 'good' | 'average' | 'poor' | 'terrible'
    weaknesses: string[]
    strengths: string[]
  }; // Pawn structure assessment
  kingSafety: {
    white: 'safe' | 'exposed' | 'critical'
    black: 'safe' | 'exposed' | 'critical'
  }; // King safety evaluation
  pieceActivity: {
    white: number // 0-100 scale
    black: number // 0-100 scale
  }; // Piece activity assessment
  spaceAdvantage: {
    white: number
    black: number
  }; // Space advantage
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/playComputer.ts
export interface GameSetup {
  opponent: AIOpponent; // Selected AI opponent
  playerColor: PlayerColor; // Player's color choice
  timeControl: TimeControlConfig; // Time control settings
  useOpeningBook: boolean; // Whether to use opening book
  showHints: boolean; // Whether to show move hints
  enableSounds: boolean; // Whether to enable sound effects
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/playComputer.ts
export interface GameAnalysis_playComputer {
  evaluation: number; // Overall game evaluation
  bestMoves: string[]; // Best moves in the position
  positionAnalysis: {
    materialBalance: number
    kingSafety: 'Safe' | 'Exposed' | 'Critical'
    centerControl: 'White' | 'Black' | 'Equal'
    pawnStructure: 'Good' | 'Average' | 'Poor'
  }; // Position analysis
  tacticalThemes: string[]; // Tactical themes present
  opening: {
    name: string
    eco: string
    moves: string[]
  }; // Opening classification
  endgame?: {
    type: string
    result: 'winning' | 'drawing' | 'losing'
    technique: string
  }; // Endgame classification (if applicable)
}

// Consolidated AnalysisUIConfig
export const AnalysisUIConfig = {
  trendAnalysis: {} as TrendAnalysis,
  endgamePosition: {} as EndgamePosition,
  endgameAnalysis: {} as EndgameAnalysis_endgameLibrary,
  endgameComposition: {} as EndgameComposition,
  endgameAnalysis: {} as EndgameAnalysis_gameReview,
  gameAnalysis: {} as GameAnalysis_masterGames,
  positionAnalysis: {} as PositionAnalysis,
  gameSetup: {} as GameSetup,
  gameAnalysis: {} as GameAnalysis_playComputer,
} as const;

// Type exports
export type TrendAnalysisType = TrendAnalysis;
export type EndgamePositionType = EndgamePosition;
export type EndgameAnalysis_endgameLibraryType = EndgameAnalysis_endgameLibrary;
export type EndgameCompositionType = EndgameComposition;
export type EndgameAnalysis_gameReviewType = EndgameAnalysis_gameReview;
export type GameAnalysis_masterGamesType = GameAnalysis_masterGames;
export type PositionAnalysisType = PositionAnalysis;
export type GameSetupType = GameSetup;
export type GameAnalysis_playComputerType = GameAnalysis_playComputer;
