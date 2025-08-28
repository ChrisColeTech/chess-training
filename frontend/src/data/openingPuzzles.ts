import type { OpeningPuzzle } from '@/types/openingPuzzles'

/**
 * Mock opening puzzle data with realistic opening traps and theory
 * This data would typically come from an API or database in production
 */
export const mockOpeningPuzzles: OpeningPuzzle[] = [
  {
    id: 1,
    fen: 'rnbqkb1r/pppp1ppp/5n2/4p3/2B1P3/8/PPPP1PPP/RNBQK1NR w KQkq - 2 3',
    solution: ['Qh5'],
    opening: 'Italian Game',
    eco: 'C50',
    theme: 'Scholar\'s Mate Trap',
    difficulty: 'Beginner',
    rating: 1000,
    moves: 1,
    description: 'White to move - exploit Black\'s weak f7 square',
    theory: 'The f7 square is naturally weak in the opening as it\'s only defended by the king. This is why early Qh5 attacks can be so dangerous if Black hasn\'t developed properly.',
    trap: 'If Black plays carelessly with moves like ...Nf6 without proper development, White can threaten Scholar\'s Mate.',
    hint1: 'Look at Black\'s weak f7 square',
    hint2: 'Your queen can reach an attacking square in one move',
    hint3: 'Qh5 threatens both f7 and the mate on f7',
    prevention: 'Black should develop with ...Be7, ...d6, or ...Nf6 + ...g6 to defend f7'
  },
  {
    id: 2,
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    solution: ['Ng5'],
    opening: 'Italian Game',
    eco: 'C50',
    theme: 'Fried Liver Attack Setup',
    difficulty: 'Intermediate',
    rating: 1400,
    moves: 1,
    description: 'White to move - set up the famous Fried Liver Attack',
    theory: 'The Fried Liver Attack is one of the most famous tactical motifs in chess, targeting the weak f7 square with a knight sacrifice.',
    trap: 'After Ng5, if Black takes with ...Nxe4?, White has Nxf7! with a devastating attack.',
    hint1: 'Look for a knight move that attacks f7',
    hint2: 'Your knight on f3 can jump to a more aggressive square',
    hint3: 'Ng5 attacks both f7 and threatens the Fried Liver',
    prevention: 'Black should play ...Be7 or ...Qe7 to defend f7, avoiding ...Nxe4'
  },
  {
    id: 3,
    fen: 'r1bq1rk1/ppp2ppp/2n1bn2/3pp3/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQ - 0 7',
    solution: ['cxd5', 'exd5', 'Nxd5'],
    opening: 'Queen\'s Gambit Declined',
    eco: 'D37',
    theme: 'Central Tension Release',
    difficulty: 'Advanced',
    rating: 1700,
    moves: 3,
    description: 'White to move - exploit the central tension',
    theory: 'In the Queen\'s Gambit, timing the release of central tension is crucial. This sequence leads to active piece play.',
    trap: 'Black must be careful about recapturing on d5, as it can lead to tactical complications.',
    hint1: 'Consider releasing the tension in the center',
    hint2: 'Exchange pawns first to open up the position',
    hint3: 'After cxd5 exd5, your knight has a powerful centralized square',
    prevention: 'Black could maintain tension with moves like ...h6 or ...Re8'
  },
  {
    id: 4,
    fen: 'rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 4',
    solution: ['cxd5'],
    opening: 'Caro-Kann Defense',
    eco: 'B10',
    theme: 'Exchange Variation',
    difficulty: 'Intermediate',
    rating: 1500,
    moves: 1,
    description: 'White to move - enter the Exchange Variation',
    theory: 'The Exchange Variation of the Caro-Kann leads to symmetrical pawn structures but White retains slight initiative.',
    trap: 'Not really a trap, but Black must understand the resulting pawn structure to play accurately.',
    hint1: 'Exchange in the center to simplify the position',
    hint2: 'Taking on d5 leads to a classical pawn structure',
    hint3: 'cxd5 enters the Exchange Variation of the Caro-Kann',
    prevention: 'Black will recapture with ...exd5 maintaining central control'
  },
  {
    id: 5,
    fen: 'rnbqkb1r/ppp2ppp/5n2/3pp3/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 4',
    solution: ['exd5'],
    opening: 'Scotch Game',
    eco: 'C44',
    theme: 'Central Opening',
    difficulty: 'Beginner',
    rating: 1200,
    moves: 1,
    description: 'White to move - open the center with a pawn exchange',
    theory: 'The Scotch Game is characterized by the early d4 push and exchange in the center, leading to open positions.',
    trap: 'Black must be careful not to recapture immediately with the queen, as it becomes a target.',
    hint1: 'Exchange pawns in the center',
    hint2: 'Your e4 pawn can capture on d5',
    hint3: 'exd5 opens lines and challenges Black to recapture',
    prevention: 'Black should recapture with the knight (...Nxd5) to avoid queen exposure'
  },
  {
    id: 6,
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 4 5',
    solution: ['Bxf7+'],
    opening: 'Italian Game',
    eco: 'C50',
    theme: 'Legal\'s Mate Pattern',
    difficulty: 'Advanced',
    rating: 1800,
    moves: 1,
    description: 'White to move - execute the famous Legal\'s sacrifice',
    theory: 'Legal\'s Mate is one of the oldest known checkmate patterns, involving a bishop sacrifice on f7 followed by knight discoveries.',
    trap: 'If Black accepts the bishop sacrifice, White has a forced mate with Nd5+ and subsequent discoveries.',
    hint1: 'Look for a forcing sacrifice',
    hint2: 'The f7 square is calling for a bishop sacrifice',
    hint3: 'Bxf7+ starts a forced sequence leading to mate',
    prevention: 'Black should not castle kingside and should defend f7 with ...Be7 or ...Qe7'
  }
]

/**
 * Get puzzles by difficulty level
 */
export const getPuzzlesByDifficulty = (difficulty: 'Beginner' | 'Intermediate' | 'Advanced'): OpeningPuzzle[] => {
  return mockOpeningPuzzles.filter(puzzle => puzzle.difficulty === difficulty)
}

/**
 * Get puzzles by opening name
 */
export const getPuzzlesByOpening = (opening: string): OpeningPuzzle[] => {
  return mockOpeningPuzzles.filter(puzzle => 
    puzzle.opening.toLowerCase().includes(opening.toLowerCase())
  )
}

/**
 * Get puzzles by theme
 */
export const getPuzzlesByTheme = (theme: string): OpeningPuzzle[] => {
  return mockOpeningPuzzles.filter(puzzle => 
    puzzle.theme.toLowerCase().includes(theme.toLowerCase())
  )
}

/**
 * Get puzzles by rating range
 */
export const getPuzzlesByRatingRange = (minRating: number, maxRating: number): OpeningPuzzle[] => {
  return mockOpeningPuzzles.filter(puzzle => 
    puzzle.rating >= minRating && puzzle.rating <= maxRating
  )
}

/**
 * Get random puzzle from the collection
 */
export const getRandomPuzzle = (): OpeningPuzzle => {
  const randomIndex = Math.floor(Math.random() * mockOpeningPuzzles.length)
  return mockOpeningPuzzles[randomIndex]
}

/**
 * Get puzzle by ID
 */
export const getPuzzleById = (id: number): OpeningPuzzle | undefined => {
  return mockOpeningPuzzles.find(puzzle => puzzle.id === id)
}