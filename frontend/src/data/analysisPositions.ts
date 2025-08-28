// Mock Analysis Data - Following DRY principle for centralized data
import type { AnalysisPosition, EngineAnalysis, OpeningInfo } from '@/types/analysisBoard'

// Mock engine analysis lines for realistic display
export const mockEngineAnalysis: EngineAnalysis[] = [
  {
    depth: 20,
    eval: 0.47,
    pv: ['Nf3', 'd5', 'c4', 'e6', 'g3', 'Be7', 'Bg2', 'Nf6', 'O-O', 'O-O', 'b3', 'c6', 'd4'],
    nodes: 3847593,
    time: 1.8,
    nps: 2137607,
    multipv: 1
  },
  {
    depth: 19,
    eval: 0.31,
    pv: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6', 'O-O', 'Be7', 'Re1'],
    nodes: 2923847,
    time: 1.4,
    nps: 2088462,
    multipv: 2
  },
  {
    depth: 18,
    eval: 0.18,
    pv: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'cxd5', 'exd5', 'Bg5', 'Be7', 'e3'],
    nodes: 2456782,
    time: 1.1,
    nps: 2233438,
    multipv: 3
  },
  {
    depth: 17,
    eval: -0.12,
    pv: ['g3', 'd5', 'Bg2', 'Nf6', 'Nf3', 'g6', 'O-O', 'Bg7', 'd3', 'O-O'],
    nodes: 1876234,
    time: 0.9,
    nps: 2084704,
    multipv: 4
  },
  {
    depth: 16,
    eval: -0.28,
    pv: ['b3', 'e5', 'Bb2', 'Nc6', 'g3', 'Nf6', 'Bg2', 'Bc5', 'e3', 'd6'],
    nodes: 1523678,
    time: 0.7,
    nps: 2176683,
    multipv: 5
  }
]

// Mock tactical positions for analysis practice
export const mockTacticalPositions: AnalysisPosition[] = [
  {
    name: 'Greek Gift Sacrifice',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4',
    category: 'Tactical',
    rating: 1800,
    description: 'Classic bishop sacrifice on h7 tactical pattern',
    tags: ['sacrifice', 'attack', 'kingside']
  },
  {
    name: 'Back Rank Mate Threat',
    fen: '6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1',
    category: 'Tactical', 
    rating: 1400,
    description: 'Simple back rank mate in one',
    tags: ['mate', 'endgame', 'basic']
  },
  {
    name: 'Fork Pattern',
    fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',
    category: 'Tactical',
    rating: 1200,
    description: 'Knight fork opportunity in the center',
    tags: ['fork', 'knight', 'tactics']
  }
]

// Mock opening positions from famous games
export const mockOpeningPositions: AnalysisPosition[] = [
  {
    name: 'Sicilian Dragon - Yugoslav Attack',
    fen: 'r1bq1rk1/pp2ppbp/3p1np1/8/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQ - 0 9',
    category: 'Opening',
    rating: 2000,
    description: 'Sharp line in the Dragon variation leading to opposite-side castling',
    tags: ['sicilian', 'dragon', 'sharp', 'tactical']
  },
  {
    name: 'Queen\'s Gambit Declined - Orthodox',
    fen: 'r1bqkb1r/pp3ppp/2np1n2/1B2p3/2PP4/5N2/PP2PPPP/RNBQK2R b KQkq - 3 6',
    category: 'Opening',
    rating: 1600,
    description: 'Classical setup in the Queen\'s Gambit Declined',
    tags: ['queens-gambit', 'orthodox', 'classical']
  },
  {
    name: 'King\'s Indian Defense - Main Line',
    fen: 'rnbq1rk1/pp2ppbp/3p1np1/8/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQ - 0 7',
    category: 'Opening',
    rating: 1800,
    description: 'Hypermodern defense with fianchetto bishop',
    tags: ['kings-indian', 'hypermodern', 'fianchetto']
  }
]

// Mock endgame positions for study
export const mockEndgamePositions: AnalysisPosition[] = [
  {
    name: 'Lucena Position',
    fen: '1K1k4/1P6/8/8/8/8/r7/2R5 w - - 0 1',
    category: 'Endgame',
    rating: 1900,
    description: 'Fundamental rook endgame winning technique',
    tags: ['rook-endgame', 'technique', 'winning']
  },
  {
    name: 'Philidor Position',
    fen: '3k4/R7/3K4/8/8/8/r7/8 b - - 0 1',
    category: 'Endgame',
    rating: 1700,
    description: 'Classic defensive setup in rook endgames',
    tags: ['rook-endgame', 'defense', 'draw']
  },
  {
    name: 'Opposition in Pawn Endgame',
    fen: '8/8/8/3k4/8/3K4/3P4/8 w - - 0 1',
    category: 'Endgame',
    rating: 1500,
    description: 'Fundamental king and pawn vs king position',
    tags: ['pawn-endgame', 'opposition', 'technique']
  },
  {
    name: 'Queen vs Pawn - Stalemate Tricks',
    fen: '8/8/8/8/8/8/k1p5/1K1Q4 w - - 0 1',
    category: 'Endgame',
    rating: 2100,
    description: 'Tricky defensive resources with advanced pawn',
    tags: ['queen-endgame', 'stalemate', 'defense']
  }
]

// Combined position database
export const mockAnalysisPositions: AnalysisPosition[] = [
  ...mockTacticalPositions,
  ...mockOpeningPositions,
  ...mockEndgamePositions
]

// Mock opening database information
export const mockOpeningDatabase: Record<string, OpeningInfo> = {
  'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1': {
    name: "King's Pawn Opening",
    eco: 'B00',
    moves: ['e4'],
    popularity: 95,
    winRate: { white: 37.2, black: 31.4, draw: 31.4 },
    games: 856432
  },
  'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 1': {
    name: "Queen's Pawn Opening",
    eco: 'A40',
    moves: ['d4'],
    popularity: 88,
    winRate: { white: 36.8, black: 32.1, draw: 31.1 },
    games: 723981
  },
  'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2': {
    name: "King's Pawn Game",
    eco: 'C20',
    moves: ['e4', 'e5'],
    popularity: 82,
    winRate: { white: 36.9, black: 32.5, draw: 30.6 },
    games: 634527
  }
}

// Mock engine status for realistic display
export const mockEngineStatus = {
  isRunning: true,
  engineName: 'Stockfish',
  version: '16.0 Pro',
  isAnalyzing: false,
  currentDepth: 0,
  currentNodes: 0,
  currentTime: 0
}

// Default analysis settings
export const defaultAnalysisSettings = {
  depth: 20,
  multiPV: 3,
  threads: 4,
  hashSize: 512,
  timeLimit: undefined,
  contempt: 0
}

// Famous analysis positions from master games
export const masterGamePositions: AnalysisPosition[] = [
  {
    name: 'Kasparov vs Deep Blue - Game 6 Critical Position',
    fen: '4r3/6P1/2k5/6K1/8/8/8/8 w - - 0 1',
    category: 'Endgame',
    rating: 2400,
    description: 'Historic human vs computer endgame position',
    tags: ['kasparov', 'computer', 'historic']
  },
  {
    name: 'Fischer\'s Immortal Game Position',
    fen: 'r2qkb1r/pp2nppp/3p4/2pNN1B1/2BnP3/3P4/PPP2PPP/R2bK2R w KQkq - 1 11',
    category: 'Tactical',
    rating: 2200,
    description: 'Brilliant sacrificial attack by Bobby Fischer',
    tags: ['fischer', 'sacrifice', 'immortal']
  },
  {
    name: 'Morphy Opera Box Game',
    fen: '4kb1r/p2n1ppp/4q3/4p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 1 17',
    category: 'Tactical',
    rating: 1900,
    description: 'Classic mating attack by Paul Morphy',
    tags: ['morphy', 'attack', 'classic']
  }
]

// Function to get random analysis data for simulating engine updates
export const getRandomAnalysis = (): EngineAnalysis => {
  const baseAnalysis = mockEngineAnalysis[Math.floor(Math.random() * mockEngineAnalysis.length)]
  return {
    ...baseAnalysis,
    eval: baseAnalysis.eval + (Math.random() - 0.5) * 0.3,
    depth: Math.min(25, baseAnalysis.depth + Math.floor(Math.random() * 3)),
    nodes: baseAnalysis.nodes + Math.floor(Math.random() * 200000),
    time: baseAnalysis.time + Math.random() * 0.8,
    nps: Math.floor(baseAnalysis.nodes / baseAnalysis.time)
  }
}

// Function to simulate engine analysis updates
export const simulateEngineProgress = (onUpdate: (analysis: EngineAnalysis[]) => void, stopSignal: () => boolean) => {
  const interval = setInterval(() => {
    if (stopSignal()) {
      clearInterval(interval)
      return
    }
    
    const updatedAnalysis = mockEngineAnalysis.map((line, index) => ({
      ...line,
      eval: line.eval + (Math.random() - 0.5) * 0.1,
      depth: Math.min(25, line.depth + (index === 0 ? 1 : Math.floor(Math.random() * 2))),
      nodes: line.nodes + Math.floor(Math.random() * 50000 * (index + 1)),
      time: line.time + Math.random() * 0.3,
      nps: Math.floor((line.nodes + Math.random() * 50000) / (line.time + Math.random() * 0.3))
    }))
    
    onUpdate(updatedAnalysis)
  }, 800) // Update every 800ms for realistic feel
  
  return interval
}