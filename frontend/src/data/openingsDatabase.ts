/**
 * Opening Database Mock Data
 * Contains comprehensive mock data for the opening explorer system
 */

import type {
  ChessOpening,
  MoveVariation,
  MasterGame,
  PositionAnalysis,
  OpeningStatistics,
  OpeningFilters,
  SearchResults,
  ECOCode,
  OpeningDifficulty
} from '@/types/openingExplorer'

/**
 * Comprehensive mock opening database
 */
export const mockOpenings: ChessOpening[] = [
  // Sicilian Defense variations
  {
    eco: 'B92',
    name: 'Sicilian Defense: Najdorf Variation',
    fen: 'rnbqkb1r/1p2pppp/p2p1n2/8/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 6',
    moves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'a6'],
    frequency: 8.7,
    whiteWins: 37.2,
    draws: 28.4,
    blackWins: 34.4,
    avgRating: 2156,
    games: 12847,
    category: 'Defense',
    difficulty: 'Master',
    popularity: 'Very High',
    theory: 'The Najdorf is one of the most complex and theoretically rich openings in chess. Black aims for maximum flexibility while maintaining central tension.',
    masterGames: 156,
    keyIdeas: ['Central control', 'King safety', 'Sharp tactics', 'Piece activity'],
    aliases: ['Najdorf Sicilian', 'B92 Sicilian'],
    relatedOpenings: ['B90', 'B94', 'B96'],
    firstAppeared: 1946,
    famousPlayers: ['Miguel Najdorf', 'Garry Kasparov', 'Bobby Fischer']
  },
  {
    eco: 'B90',
    name: 'Sicilian Defense: Najdorf Variation, English Attack',
    fen: 'rnbqkb1r/1p2pppp/p2p1n2/8/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 6',
    moves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'a6', 'Be3', 'e5'],
    frequency: 6.3,
    whiteWins: 41.8,
    draws: 24.7,
    blackWins: 33.5,
    avgRating: 2234,
    games: 8934,
    category: 'Defense',
    difficulty: 'Grandmaster',
    popularity: 'High',
    theory: 'The English Attack leads to sharp tactical battles with opposite-side castling.',
    masterGames: 203,
    keyIdeas: ['Opposite-side castling', 'Pawn storms', 'Tactical complexity'],
    relatedOpenings: ['B92', 'B94']
  },
  
  // Italian Game variations
  {
    eco: 'C50',
    name: 'Italian Game',
    fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4'],
    frequency: 12.3,
    whiteWins: 42.1,
    draws: 31.2,
    blackWins: 26.7,
    avgRating: 1789,
    games: 28934,
    category: 'Game',
    difficulty: 'Intermediate',
    popularity: 'Very High',
    theory: 'Classical opening focusing on rapid development and central control. One of the oldest chess openings.',
    masterGames: 89,
    keyIdeas: ['Rapid development', 'Central pressure', 'King safety', 'Bishop pair'],
    aliases: ['Italian Opening'],
    relatedOpenings: ['C53', 'C54'],
    firstAppeared: 1590,
    famousPlayers: ['Gioachino Greco', 'Paul Morphy']
  },
  {
    eco: 'C53',
    name: 'Italian Game: Classical Variation',
    fen: 'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R b KQkq - 0 4',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5', 'd3'],
    frequency: 7.8,
    whiteWins: 38.9,
    draws: 34.2,
    blackWins: 26.9,
    avgRating: 1923,
    games: 19456,
    category: 'Game',
    difficulty: 'Advanced',
    popularity: 'High',
    theory: 'Classical development with solid pawn structure and piece coordination.',
    masterGames: 67,
    keyIdeas: ['Solid development', 'Central control', 'Piece harmony']
  },

  // Queen's Gambit variations
  {
    eco: 'D37',
    name: 'Queen\'s Gambit Declined: Harrwitz Attack',
    fen: 'rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R b KQkq - 0 4',
    moves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Nf3'],
    frequency: 6.9,
    whiteWins: 39.8,
    draws: 32.7,
    blackWins: 27.5,
    avgRating: 2034,
    games: 19567,
    category: 'Gambit',
    difficulty: 'Advanced',
    popularity: 'High',
    theory: 'Solid positional opening with slight initiative for White. Black maintains central pawn.',
    masterGames: 134,
    keyIdeas: ['Central control', 'Piece activity', 'Pawn structure', 'Queen-side initiative'],
    relatedOpenings: ['D30', 'D31', 'D35']
  },
  {
    eco: 'D30',
    name: 'Queen\'s Gambit Declined',
    fen: 'rnbqkbnr/ppp2ppp/4p3/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3',
    moves: ['d4', 'd5', 'c4', 'e6'],
    frequency: 9.2,
    whiteWins: 37.4,
    draws: 35.8,
    blackWins: 26.8,
    avgRating: 1998,
    games: 23456,
    category: 'Gambit',
    difficulty: 'Intermediate',
    popularity: 'Very High',
    theory: 'One of the most solid defenses against 1.d4, leading to rich middlegame positions.',
    masterGames: 187,
    keyIdeas: ['Solid center', 'Piece development', 'Pawn chains']
  },

  // King's Indian Defense
  {
    eco: 'E94',
    name: 'King\'s Indian Defense: Orthodox Variation',
    fen: 'rnbq1rk1/ppp1ppbp/3p1np1/8/2PPP3/2N2N2/PP2BPPP/R1BQK2R b KQ - 0 6',
    moves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Be2'],
    frequency: 4.2,
    whiteWins: 41.3,
    draws: 29.1,
    blackWins: 29.6,
    avgRating: 2234,
    games: 9876,
    category: 'Defense',
    difficulty: 'Master',
    popularity: 'Medium',
    theory: 'Hypermodern defense leading to sharp middlegame battles with pawn breaks.',
    masterGames: 203,
    keyIdeas: ['Fianchetto', 'Counterplay', 'King safety', 'Central breaks'],
    relatedOpenings: ['E90', 'E92', 'E97']
  },

  // English Opening
  {
    eco: 'A30',
    name: 'English Opening: Symmetrical Variation',
    fen: 'rnbqkbnr/pp1ppppp/8/2p5/2P5/8/PP1PPPPP/RNBQKBNR w KQkq - 0 2',
    moves: ['c4', 'c5'],
    frequency: 5.7,
    whiteWins: 35.2,
    draws: 38.4,
    blackWins: 26.4,
    avgRating: 2156,
    games: 15678,
    category: 'Opening',
    difficulty: 'Advanced',
    popularity: 'High',
    theory: 'Flexible opening allowing transpositions to many different pawn structures.',
    masterGames: 98,
    keyIdeas: ['Flexibility', 'Central control', 'Transpositions'],
    relatedOpenings: ['A20', 'A25']
  },

  // French Defense
  {
    eco: 'C10',
    name: 'French Defense: Rubinstein Variation',
    fen: 'rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3',
    moves: ['e4', 'e6', 'd4', 'd5', 'Nd2'],
    frequency: 8.1,
    whiteWins: 40.7,
    draws: 28.9,
    blackWins: 30.4,
    avgRating: 2067,
    games: 18923,
    category: 'Defense',
    difficulty: 'Intermediate',
    popularity: 'High',
    theory: 'Solid defense with characteristic pawn chains and piece maneuvering.',
    masterGames: 145,
    keyIdeas: ['Pawn chains', 'Piece maneuvering', 'Central tension'],
    relatedOpenings: ['C11', 'C15']
  },

  // Caro-Kann Defense
  {
    eco: 'B12',
    name: 'Caro-Kann Defense: Advance Variation',
    fen: 'rnbqkbnr/pp2pppp/2p5/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3',
    moves: ['e4', 'c6', 'd4', 'd5', 'e5'],
    frequency: 3.9,
    whiteWins: 42.3,
    draws: 31.4,
    blackWins: 26.3,
    avgRating: 2134,
    games: 12456,
    category: 'Defense',
    difficulty: 'Advanced',
    popularity: 'Medium',
    theory: 'Sharp variation leading to space advantage for White and counterplay for Black.',
    masterGames: 78,
    keyIdeas: ['Space advantage', 'Counterplay', 'Pawn breaks']
  },

  // Ruy Lopez
  {
    eco: 'C96',
    name: 'Ruy Lopez: Closed Variation, Chigorin Defense',
    fen: 'r1bqk1nr/pppp1ppp/2n5/1B2p3/1b2P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6', 'O-O', 'Be7', 'Re1', 'b5', 'Bb3', 'd6', 'c3', 'O-O', 'h3', 'Na5'],
    frequency: 2.8,
    whiteWins: 38.9,
    draws: 35.7,
    blackWins: 25.4,
    avgRating: 2245,
    games: 8234,
    category: 'Game',
    difficulty: 'Master',
    popularity: 'Medium',
    theory: 'Classical Spanish opening with deep positional understanding required.',
    masterGames: 156,
    keyIdeas: ['Central control', 'Long castling preparation', 'Piece coordination'],
    relatedOpenings: ['C90', 'C92']
  }
]

/**
 * Mock move variations for different positions
 */
export const mockVariations: Record<string, MoveVariation[]> = {
  // Starting position variations
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1': [
    {
      move: 'e4',
      san: 'e4',
      frequency: 23.4,
      whiteWins: 38.2,
      draws: 28.9,
      blackWins: 32.9,
      games: 45782,
      eco: ['B00-B99'],
      evaluation: 0.25,
      category: 'excellent',
      resultingFen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1'
    },
    {
      move: 'd4',
      san: 'd4',
      frequency: 21.8,
      whiteWins: 37.8,
      draws: 31.4,
      blackWins: 30.8,
      games: 42156,
      eco: ['A40-E99'],
      evaluation: 0.20,
      category: 'excellent'
    },
    {
      move: 'Nf3',
      san: 'Nf3',
      frequency: 18.9,
      whiteWins: 36.9,
      draws: 30.1,
      blackWins: 33.0,
      games: 36478,
      eco: ['A04-A09'],
      evaluation: 0.15,
      category: 'good'
    },
    {
      move: 'c4',
      san: 'c4',
      frequency: 7.3,
      whiteWins: 38.7,
      draws: 29.2,
      blackWins: 32.1,
      games: 14156,
      eco: ['A10-A39'],
      evaluation: 0.18,
      category: 'good'
    },
    {
      move: 'g3',
      san: 'g3',
      frequency: 2.4,
      whiteWins: 35.1,
      draws: 32.3,
      blackWins: 32.6,
      games: 6789,
      eco: ['A00'],
      evaluation: 0.12,
      category: 'good'
    }
  ]
}

/**
 * Mock master games database
 */
export const mockMasterGames: MasterGame[] = [
  {
    white: 'Kasparov, G.',
    black: 'Karpov, A.',
    whiteRating: 2715,
    blackRating: 2700,
    result: '1-0',
    year: 1984,
    event: 'World Championship',
    avgRating: 2708,
    moves: 42,
    date: '1984.09.10',
    round: '16',
    significance: 'Famous breakthrough game in their rivalry'
  },
  {
    white: 'Fischer, R.',
    black: 'Spassky, B.',
    whiteRating: 2785,
    blackRating: 2660,
    result: '1-0',
    year: 1972,
    event: 'World Championship',
    avgRating: 2723,
    moves: 41,
    date: '1972.07.11',
    round: '6',
    significance: 'The Game of the Century'
  },
  {
    white: 'Carlsen, M.',
    black: 'Anand, V.',
    whiteRating: 2870,
    blackRating: 2775,
    result: '1/2-1/2',
    year: 2013,
    event: 'World Championship',
    avgRating: 2823,
    moves: 65,
    date: '2013.11.09',
    round: '1'
  },
  {
    white: 'Tal, M.',
    black: 'Botvinnik, M.',
    whiteRating: 2705,
    blackRating: 2695,
    result: '1-0',
    year: 1960,
    event: 'World Championship',
    avgRating: 2700,
    moves: 29,
    date: '1960.05.07',
    round: '6',
    significance: 'Brilliant tactical masterpiece by Tal'
  },
  {
    white: 'Alekhine, A.',
    black: 'Capablanca, J.',
    whiteRating: 2600,
    blackRating: 2620,
    result: '1-0',
    year: 1927,
    event: 'World Championship',
    avgRating: 2610,
    moves: 34,
    date: '1927.10.15',
    round: '12',
    significance: 'Alekhine defeats the unbeatable Capablanca'
  }
]

/**
 * Mock position analysis
 */
export const mockPositionAnalysis: PositionAnalysis = {
  position: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  evaluation: 0.0,
  evaluationText: 'Equal position',
  bestMoves: ['e4', 'd4', 'Nf3', 'c4'],
  tacticalThemes: [],
  pawnStructure: {
    type: 'Starting formation',
    assessment: 'excellent',
    weaknesses: [],
    strengths: ['Symmetric structure', 'Full mobility']
  },
  kingSafety: {
    white: 'safe',
    black: 'safe'
  },
  pieceActivity: {
    white: 50,
    black: 50
  },
  spaceAdvantage: {
    white: 50,
    black: 50
  }
}

/**
 * Mock opening statistics
 */
export const mockOpeningStatistics: OpeningStatistics = {
  totalOpenings: 500,
  byCategory: {
    'Defense': 156,
    'Game': 134,
    'Gambit': 89,
    'System': 67,
    'Opening': 54
  },
  byDifficulty: {
    'Beginner': 78,
    'Intermediate': 145,
    'Advanced': 167,
    'Master': 89,
    'Grandmaster': 21
  },
  byPopularity: {
    'Very High': 45,
    'High': 123,
    'Medium': 189,
    'Low': 98,
    'Rare': 45
  },
  mostPlayed: mockOpenings.slice(0, 5),
  highestRated: mockOpenings.sort((a, b) => b.avgRating - a.avgRating).slice(0, 5),
  recentAdditions: mockOpenings.slice(-3)
}

/**
 * Search openings based on filters
 */
export const searchOpenings = async (filters: OpeningFilters): Promise<SearchResults> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  
  let results = [...mockOpenings]
  
  // Apply search query filter
  if (filters.searchQuery.trim()) {
    const query = filters.searchQuery.toLowerCase()
    results = results.filter(opening => 
      opening.name.toLowerCase().includes(query) ||
      opening.eco.toLowerCase().includes(query) ||
      opening.keyIdeas.some(idea => idea.toLowerCase().includes(query))
    )
  }
  
  // Apply category filter
  if (filters.category !== 'All') {
    results = results.filter(opening => opening.category === filters.category)
  }
  
  // Apply difficulty filter
  if (filters.difficulty !== 'All') {
    results = results.filter(opening => opening.difficulty === filters.difficulty)
  }
  
  // Apply popularity filter
  if (filters.popularity !== 'All') {
    results = results.filter(opening => opening.popularity === filters.popularity)
  }
  
  // Apply minimum games filter
  results = results.filter(opening => opening.games >= filters.minGames)
  
  // Apply rating range filter
  results = results.filter(opening => 
    opening.avgRating >= filters.ratingRange.min &&
    opening.avgRating <= filters.ratingRange.max
  )
  
  return {
    openings: results,
    totalResults: results.length,
    appliedFilters: filters,
    searchTime: 150 + Math.random() * 200, // Simulated search time
    suggestions: results.length === 0 ? [
      'Try broadening your search criteria',
      'Check for typos in your search query',
      'Consider searching by ECO code instead'
    ] : undefined
  }
}

/**
 * Get opening by ECO code
 */
export const getOpeningByECO = async (eco: ECOCode): Promise<ChessOpening | null> => {
  await new Promise(resolve => setTimeout(resolve, 100))
  return mockOpenings.find(opening => opening.eco === eco) || null
}

/**
 * Get variations for a position
 */
export const getVariationsForPosition = async (fen: string): Promise<MoveVariation[]> => {
  await new Promise(resolve => setTimeout(resolve, 200))
  return mockVariations[fen] || []
}

/**
 * Get master games for an opening
 */
export const getMasterGamesForOpening = async (_eco: ECOCode): Promise<MasterGame[]> => {
  await new Promise(resolve => setTimeout(resolve, 250))
  // Return a subset of games (simulating filtering by opening)
  return mockMasterGames
}

/**
 * Analyze position
 */
export const analyzePosition = async (fen: string): Promise<PositionAnalysis> => {
  // Simulate analysis time
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // Return mock analysis (in real app, this would call an engine)
  return {
    ...mockPositionAnalysis,
    position: fen
  }
}

/**
 * Default filters for opening search
 */
export const defaultOpeningFilters: OpeningFilters = {
  searchQuery: '',
  category: 'All',
  difficulty: 'All',
  popularity: 'All',
  minGames: 0,
  ratingRange: {
    min: 1000,
    max: 3000
  }
}

/**
 * ECO code categories for classification
 */
export const ecoCodeCategories = {
  'A': 'English and uncommon openings',
  'B': 'Semi-Open games (1.e4 without 1...e5)',
  'C': 'Open games (1.e4 e5)',
  'D': 'Closed games (1.d4 d5)',
  'E': 'Indian defenses'
}

/**
 * Difficulty progression for learning
 */
export const difficultyProgression: OpeningDifficulty[] = [
  'Beginner',
  'Intermediate', 
  'Advanced',
  'Master',
  'Grandmaster'
]

/**
 * Popular opening themes for filtering
 */
export const openingThemes = [
  'King safety',
  'Central control',
  'Rapid development',
  'Tactical complexity',
  'Positional play',
  'Pawn structure',
  'Piece activity',
  'Initiative',
  'Counterplay',
  'Endgame preparation'
]