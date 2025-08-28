import type { CustomPuzzle, CustomPuzzleCollection, CustomPuzzleDifficulty, PuzzleSource } from '@/types/customPuzzles'

/**
 * Mock custom puzzle data with user-created and imported puzzles
 * This data would typically come from an API or database in production
 */
export const mockCustomPuzzles: CustomPuzzle[] = [
  {
    id: 'custom_001',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    solution: ['Ng5', 'd6', 'Nxf7'],
    title: 'My Favorite Fork',
    description: 'A beautiful knight fork that wins material',
    theme: 'Knight Fork',
    difficulty: 'Intermediate',
    rating: 1450,
    moves: 3,
    tags: ['fork', 'tactics', 'knight'],
    source: 'user-created',
    author: {
      id: 'user_123',
      name: 'ChessMaster2023',
      rating: 1800
    },
    createdAt: new Date('2024-01-15T10:30:00Z'),
    updatedAt: new Date('2024-01-16T14:20:00Z'),
    attemptCount: 45,
    successRate: 78,
    averageTime: 35,
    collectionId: 'collection_001',
    hint1: 'Look for a tactical knight move',
    hint2: 'The knight can fork the king and queen',
    hint3: 'Ng5 threatens the fork on f7',
    notes: 'Found this pattern in my recent game against a 1600 player',
    isFeatured: true,
    isBookmarked: false
  },
  {
    id: 'custom_002',
    fen: '2rq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/3P1N2/PPP1QPPP/RNB2RK1 w - - 0 8',
    solution: ['Bxf7+'],
    title: 'Greek Gift Sacrifice',
    description: 'Classic bishop sacrifice on h7... wait, f7 in this position',
    theme: 'Sacrifice',
    difficulty: 'Advanced',
    rating: 1750,
    moves: 1,
    tags: ['sacrifice', 'attack', 'bishop'],
    source: 'imported',
    author: {
      id: 'user_456',
      name: 'TacticalWizard',
      rating: 2100
    },
    createdAt: new Date('2024-01-20T08:15:00Z'),
    updatedAt: new Date('2024-01-20T08:15:00Z'),
    attemptCount: 23,
    successRate: 65,
    averageTime: 42,
    collectionId: 'collection_002',
    hint1: 'Consider a sacrificial move',
    hint2: 'The bishop can sacrifice itself for a strong attack',
    hint3: 'Bxf7+ opens up the king for attack',
    notes: 'Imported from Lichess puzzle database',
    isFeatured: false,
    isBookmarked: true
  },
  {
    id: 'custom_003',
    fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2',
    solution: ['d4'],
    title: 'Center Control Opening',
    description: 'Simple but effective center control',
    theme: 'Opening Principles',
    difficulty: 'Beginner',
    rating: 800,
    moves: 1,
    tags: ['opening', 'center', 'development'],
    source: 'user-created',
    author: {
      id: 'user_789',
      name: 'BeginnerBuddy',
      rating: 1200
    },
    createdAt: new Date('2024-01-25T16:45:00Z'),
    updatedAt: new Date('2024-01-25T16:45:00Z'),
    attemptCount: 156,
    successRate: 92,
    averageTime: 12,
    hint1: 'Control the center with a pawn',
    hint2: 'Play d4 to challenge Black\'s central pawn',
    hint3: 'd4 is the most principled move',
    notes: 'Great for beginners learning opening principles',
    isFeatured: false,
    isBookmarked: false
  },
  {
    id: 'custom_004',
    fen: '2r3k1/pp3ppp/3p4/3Pp3/1PP5/P4P2/6PP/2R3K1 w - - 0 25',
    solution: ['c5', 'dxc5', 'bxc5', 'Rxc5', 'Rxc5'],
    title: 'Endgame Breakthrough',
    description: 'Pawn breakthrough in the endgame to create a passed pawn',
    theme: 'Endgame',
    difficulty: 'Expert',
    rating: 1950,
    moves: 5,
    tags: ['endgame', 'pawn-breakthrough', 'technique'],
    source: 'community',
    author: {
      id: 'user_321',
      name: 'EndgameExpert',
      rating: 2300
    },
    createdAt: new Date('2024-02-01T11:20:00Z'),
    updatedAt: new Date('2024-02-02T09:30:00Z'),
    attemptCount: 12,
    successRate: 33,
    averageTime: 85,
    collectionId: 'collection_003',
    hint1: 'Look for a pawn advance that creates problems',
    hint2: 'Consider sacrificing a pawn to create a passed pawn',
    hint3: 'c5 starts a forcing sequence',
    notes: 'From Dvoretsky\'s endgame manual',
    isFeatured: true,
    isBookmarked: true
  },
  {
    id: 'custom_005',
    fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP1QPPP/R1B1K2R b KQ - 0 7',
    solution: ['Nxe4'],
    title: 'Central Capture',
    description: 'Take advantage of opponent\'s overextension',
    theme: 'Tactics',
    difficulty: 'Intermediate',
    rating: 1500,
    moves: 1,
    tags: ['tactics', 'center', 'capture'],
    source: 'lichess',
    author: {
      id: 'user_654',
      name: 'ImportedPuzzles',
      rating: 1600
    },
    createdAt: new Date('2024-02-05T14:10:00Z'),
    updatedAt: new Date('2024-02-05T14:10:00Z'),
    attemptCount: 67,
    successRate: 81,
    averageTime: 28,
    hint1: 'Black can capture something in the center',
    hint2: 'The knight on f6 has a good capture',
    hint3: 'Nxe4 wins the central pawn',
    notes: 'Auto-imported from Lichess daily puzzles',
    isFeatured: false,
    isBookmarked: false
  },
  {
    id: 'custom_006',
    fen: 'r2qk2r/ppp2ppp/2np1n2/2b1p1B1/2B1P1b1/2NP1N2/PPP1QPPP/R3K2R w KQkq - 0 8',
    solution: ['Bxf7+', 'Kxf7', 'Qc4+'],
    title: 'Double Check Discovery',
    description: 'A beautiful double check that wins material',
    theme: 'Discovery',
    difficulty: 'Advanced',
    rating: 1850,
    moves: 3,
    tags: ['double-check', 'discovery', 'attack'],
    source: 'chess-com',
    author: {
      id: 'user_987',
      name: 'DiscoveryMaster',
      rating: 2000
    },
    createdAt: new Date('2024-02-08T12:30:00Z'),
    updatedAt: new Date('2024-02-08T12:30:00Z'),
    attemptCount: 31,
    successRate: 58,
    averageTime: 55,
    collectionId: 'collection_002',
    hint1: 'Look for a forcing sacrifice',
    hint2: 'The bishop on g5 is perfectly placed',
    hint3: 'Bxf7+ creates a double check after Qc4+',
    notes: 'From Chess.com\'s Puzzle Rush collection',
    isFeatured: false,
    isBookmarked: true
  }
]

/**
 * Mock custom puzzle collections
 */
export const mockCustomPuzzleCollections: CustomPuzzleCollection[] = [
  {
    id: 'collection_001',
    name: 'My Personal Tactics',
    description: 'Collection of tactical puzzles I\'ve created and curated',
    visibility: 'private',
    puzzleIds: ['custom_001', 'custom_003'],
    author: {
      id: 'user_123',
      name: 'ChessMaster2023',
      rating: 1800
    },
    tags: ['tactics', 'personal', 'improvement'],
    createdAt: new Date('2024-01-10T09:00:00Z'),
    updatedAt: new Date('2024-02-01T15:30:00Z'),
    accessCount: 234,
    averageRating: 1125,
    thumbnail: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    isFeatured: false,
    isBookmarked: false
  },
  {
    id: 'collection_002',
    name: 'Sacrificial Attacks',
    description: 'Beautiful sacrifices that lead to decisive attacks',
    visibility: 'shared',
    puzzleIds: ['custom_002', 'custom_006'],
    author: {
      id: 'user_456',
      name: 'TacticalWizard',
      rating: 2100
    },
    tags: ['sacrifice', 'attack', 'beautiful'],
    createdAt: new Date('2024-01-18T11:15:00Z'),
    updatedAt: new Date('2024-02-08T13:45:00Z'),
    accessCount: 892,
    averageRating: 1800,
    thumbnail: '2rq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/3P1N2/PPP1QPPP/RNB2RK1 w - - 0 8',
    isFeatured: true,
    isBookmarked: true
  },
  {
    id: 'collection_003',
    name: 'Endgame Mastery',
    description: 'Essential endgame positions every player should know',
    visibility: 'public',
    puzzleIds: ['custom_004'],
    author: {
      id: 'user_321',
      name: 'EndgameExpert',
      rating: 2300
    },
    tags: ['endgame', 'technique', 'mastery'],
    createdAt: new Date('2024-01-30T16:20:00Z'),
    updatedAt: new Date('2024-02-02T10:15:00Z'),
    accessCount: 1567,
    averageRating: 1950,
    thumbnail: '2r3k1/pp3ppp/3p4/3Pp3/1PP5/P4P2/6PP/2R3K1 w - - 0 25',
    isFeatured: true,
    isBookmarked: false
  }
]

/**
 * Get puzzles by difficulty level
 */
export const getCustomPuzzlesByDifficulty = (difficulty: CustomPuzzleDifficulty): CustomPuzzle[] => {
  return mockCustomPuzzles.filter(puzzle => puzzle.difficulty === difficulty)
}

/**
 * Get puzzles by theme
 */
export const getCustomPuzzlesByTheme = (theme: string): CustomPuzzle[] => {
  return mockCustomPuzzles.filter(puzzle => 
    puzzle.theme.toLowerCase().includes(theme.toLowerCase())
  )
}

/**
 * Get puzzles by source
 */
export const getCustomPuzzlesBySource = (source: PuzzleSource): CustomPuzzle[] => {
  return mockCustomPuzzles.filter(puzzle => puzzle.source === source)
}

/**
 * Get puzzles by tags
 */
export const getCustomPuzzlesByTags = (tags: string[]): CustomPuzzle[] => {
  return mockCustomPuzzles.filter(puzzle => 
    tags.some(tag => puzzle.tags.some(puzzleTag => 
      puzzleTag.toLowerCase().includes(tag.toLowerCase())
    ))
  )
}

/**
 * Get puzzles by rating range
 */
export const getCustomPuzzlesByRatingRange = (minRating: number, maxRating: number): CustomPuzzle[] => {
  return mockCustomPuzzles.filter(puzzle => 
    puzzle.rating >= minRating && puzzle.rating <= maxRating
  )
}

/**
 * Get puzzles by collection ID
 */
export const getCustomPuzzlesByCollection = (collectionId: string): CustomPuzzle[] => {
  return mockCustomPuzzles.filter(puzzle => puzzle.collectionId === collectionId)
}

/**
 * Get puzzles by author
 */
export const getCustomPuzzlesByAuthor = (authorId: string): CustomPuzzle[] => {
  return mockCustomPuzzles.filter(puzzle => puzzle.author.id === authorId)
}

/**
 * Get bookmarked puzzles
 */
export const getBookmarkedCustomPuzzles = (): CustomPuzzle[] => {
  return mockCustomPuzzles.filter(puzzle => puzzle.isBookmarked)
}

/**
 * Get featured puzzles
 */
export const getFeaturedCustomPuzzles = (): CustomPuzzle[] => {
  return mockCustomPuzzles.filter(puzzle => puzzle.isFeatured)
}

/**
 * Get random puzzle from the collection
 */
export const getRandomCustomPuzzle = (): CustomPuzzle => {
  const randomIndex = Math.floor(Math.random() * mockCustomPuzzles.length)
  return mockCustomPuzzles[randomIndex]
}

/**
 * Get puzzle by ID
 */
export const getCustomPuzzleById = (id: string): CustomPuzzle | undefined => {
  return mockCustomPuzzles.find(puzzle => puzzle.id === id)
}

/**
 * Search puzzles by title or description
 */
export const searchCustomPuzzles = (query: string): CustomPuzzle[] => {
  const lowercaseQuery = query.toLowerCase()
  return mockCustomPuzzles.filter(puzzle =>
    puzzle.title.toLowerCase().includes(lowercaseQuery) ||
    puzzle.description.toLowerCase().includes(lowercaseQuery) ||
    puzzle.theme.toLowerCase().includes(lowercaseQuery) ||
    puzzle.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}

/**
 * Get collection by ID
 */
export const getCustomCollectionById = (id: string): CustomPuzzleCollection | undefined => {
  return mockCustomPuzzleCollections.find(collection => collection.id === id)
}

/**
 * Get collections by visibility
 */
export const getCustomCollectionsByVisibility = (visibility: 'private' | 'shared' | 'public'): CustomPuzzleCollection[] => {
  return mockCustomPuzzleCollections.filter(collection => collection.visibility === visibility)
}

/**
 * Get collections by author
 */
export const getCustomCollectionsByAuthor = (authorId: string): CustomPuzzleCollection[] => {
  return mockCustomPuzzleCollections.filter(collection => collection.author.id === authorId)
}

/**
 * Get featured collections
 */
export const getFeaturedCustomCollections = (): CustomPuzzleCollection[] => {
  return mockCustomPuzzleCollections.filter(collection => collection.isFeatured)
}

/**
 * Get popular collections (by access count)
 */
export const getPopularCustomCollections = (limit: number = 10): CustomPuzzleCollection[] => {
  return [...mockCustomPuzzleCollections]
    .sort((a, b) => b.accessCount - a.accessCount)
    .slice(0, limit)
}

/**
 * Search collections by name or description
 */
export const searchCustomCollections = (query: string): CustomPuzzleCollection[] => {
  const lowercaseQuery = query.toLowerCase()
  return mockCustomPuzzleCollections.filter(collection =>
    collection.name.toLowerCase().includes(lowercaseQuery) ||
    collection.description.toLowerCase().includes(lowercaseQuery) ||
    collection.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}

/**
 * Get all available themes from puzzles
 */
export const getAllCustomPuzzleThemes = (): string[] => {
  const themes = new Set(mockCustomPuzzles.map(puzzle => puzzle.theme))
  return Array.from(themes).sort()
}

/**
 * Get all available tags from puzzles
 */
export const getAllCustomPuzzleTags = (): string[] => {
  const tags = new Set(mockCustomPuzzles.flatMap(puzzle => puzzle.tags))
  return Array.from(tags).sort()
}

/**
 * Get puzzle statistics
 */
export const getCustomPuzzleStatistics = () => {
  const totalPuzzles = mockCustomPuzzles.length
  const totalAttempts = mockCustomPuzzles.reduce((sum, puzzle) => sum + puzzle.attemptCount, 0)
  const averageRating = mockCustomPuzzles.reduce((sum, puzzle) => sum + puzzle.rating, 0) / totalPuzzles
  const averageSuccessRate = mockCustomPuzzles.reduce((sum, puzzle) => sum + puzzle.successRate, 0) / totalPuzzles
  const averageTime = mockCustomPuzzles.reduce((sum, puzzle) => sum + puzzle.averageTime, 0) / totalPuzzles

  return {
    totalPuzzles,
    totalAttempts,
    averageRating: Math.round(averageRating),
    averageSuccessRate: Math.round(averageSuccessRate),
    averageTime: Math.round(averageTime)
  }
}