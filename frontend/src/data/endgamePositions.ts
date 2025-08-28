/**
 * Mock Endgame Data
 * Contains comprehensive mock data for the endgame library system
 */

import type {
  EndgamePosition,
  EndgameCategoryInfo,
  EndgameComposition,
  EndgameCategory
} from '@/types/endgameLibrary'

/**
 * Mock endgame category information with gaming themes
 */
export const mockEndgameCategories: EndgameCategoryInfo[] = [
  {
    name: 'Basic Endgames',
    title: 'Foundation Fortress',
    description: 'Essential endgame patterns every player must master',
    count: 24,
    icon: 'castle',
    color: 'from-blue-500 to-cyan-500',
    difficultyRange: { min: 'Beginner', max: 'Intermediate' },
    totalStudyTime: 360, // 6 hours
    isUnlocked: true,
    progress: 67
  },
  {
    name: 'Rook Endgames',
    title: 'Tower Mastery',
    description: 'Complex rook endgames with winning and defensive techniques',
    count: 18,
    icon: 'castle-turret',
    color: 'from-green-500 to-emerald-500',
    difficultyRange: { min: 'Intermediate', max: 'Master' },
    totalStudyTime: 450, // 7.5 hours
    isUnlocked: true,
    progress: 42
  },
  {
    name: 'Queen Endgames',
    title: 'Royal Dominion',
    description: 'Queen vs various pieces - power and precision',
    count: 12,
    icon: 'crown',
    color: 'from-purple-500 to-pink-500',
    difficultyRange: { min: 'Advanced', max: 'Grandmaster' },
    totalStudyTime: 300, // 5 hours
    isUnlocked: true,
    progress: 25
  },
  {
    name: 'Minor Piece Endgames',
    title: 'Knight & Bishop Arena',
    description: 'When minor pieces decide the fate of the game',
    count: 15,
    icon: 'chess-knight',
    color: 'from-amber-500 to-orange-500',
    difficultyRange: { min: 'Intermediate', max: 'Advanced' },
    totalStudyTime: 375, // 6.25 hours
    isUnlocked: true,
    progress: 58
  },
  {
    name: 'Bishop Endgames',
    title: 'Diagonal Masters',
    description: 'Same and opposite colored bishop endings',
    count: 14,
    icon: 'chess-bishop',
    color: 'from-indigo-500 to-blue-500',
    difficultyRange: { min: 'Intermediate', max: 'Master' },
    totalStudyTime: 420, // 7 hours
    isUnlocked: false,
    progress: 0
  },
  {
    name: 'Knight Endgames',
    title: 'Cavalry Command',
    description: 'Knight endgames with their unique characteristics',
    count: 11,
    icon: 'horse',
    color: 'from-teal-500 to-cyan-500',
    difficultyRange: { min: 'Intermediate', max: 'Advanced' },
    totalStudyTime: 330, // 5.5 hours
    isUnlocked: false,
    progress: 0
  },
  {
    name: 'Pawn Endgames',
    title: 'Footsoldier Wars',
    description: 'Pure pawn endings - the soul of chess',
    count: 20,
    icon: 'chess-pawn',
    color: 'from-slate-500 to-gray-500',
    difficultyRange: { min: 'Beginner', max: 'Master' },
    totalStudyTime: 480, // 8 hours
    isUnlocked: true,
    progress: 33
  },
  {
    name: 'Classical Positions',
    title: 'Legendary Battlegrounds',
    description: 'Famous theoretical positions studied for centuries',
    count: 8,
    icon: 'scroll',
    color: 'from-red-500 to-rose-500',
    difficultyRange: { min: 'Advanced', max: 'Grandmaster' },
    totalStudyTime: 240, // 4 hours
    isUnlocked: true,
    progress: 75
  },
  {
    name: 'Fortress Positions',
    title: 'Impregnable Defenses',
    description: 'Defensive setups that hold against material disadvantage',
    count: 6,
    icon: 'shield',
    color: 'from-yellow-500 to-amber-500',
    difficultyRange: { min: 'Master', max: 'Grandmaster' },
    totalStudyTime: 180, // 3 hours
    isUnlocked: false,
    progress: 0
  },
  {
    name: 'Theoretical Studies',
    title: 'Academic Arsenal',
    description: 'Deep theoretical investigations and compositions',
    count: 10,
    icon: 'microscope',
    color: 'from-violet-500 to-purple-500',
    difficultyRange: { min: 'Master', max: 'Grandmaster' },
    totalStudyTime: 300, // 5 hours
    isUnlocked: false,
    progress: 0
  }
]

/**
 * Comprehensive mock endgame positions with fortress theme
 */
export const mockEndgamePositions: EndgamePosition[] = [
  // Basic Endgames - Foundation Fortress
  {
    id: 'kpk_basic',
    title: 'King + Pawn vs King',
    subtitle: 'The Guardian\'s March',
    category: 'Basic Endgames',
    difficulty: 'Beginner',
    fen: '8/8/8/8/4K3/4P3/8/4k3 w - - 0 1',
    description: 'The most fundamental pawn endgame. The king must escort his loyal pawn to victory while the opposing monarch seeks to stop the advance.',
    keyPoints: [
      'Opposition is the key to victory',
      'King must lead the pawn advance',
      'Calculate the critical squares',
      'Know when the position is won or drawn',
      'Master the technique of shouldering'
    ],
    studyTime: '15 min',
    masterGames: 2847,
    winRate: 78.3,
    evaluation: '+3.2',
    theoreticalResult: 'winning',
    tags: ['fundamental', 'opposition', 'critical squares', 'technique'],
    isUnlocked: true,
    relatedPositions: ['kpk_advanced', 'king_opposition', 'pawn_breakthrough'],
    author: 'Classical Theory',
    source: 'Fundamental Chess Endings'
  },
  {
    id: 'king_opposition',
    title: 'Opposition Mastery',
    subtitle: 'The Staredown Duel',
    category: 'Basic Endgames',
    difficulty: 'Beginner',
    fen: '8/8/8/3k4/8/3K4/8/8 w - - 0 1',
    description: 'Learn the crucial concept of opposition - when kings face each other with one square between them.',
    keyPoints: [
      'Direct opposition fundamentals',
      'Distant opposition technique', 
      'How to gain and maintain opposition',
      'Opposition in rectangular positions',
      'Triangulation to lose a tempo'
    ],
    studyTime: '20 min',
    masterGames: 3521,
    winRate: 50.0,
    evaluation: '0.0',
    theoreticalResult: 'drawn',
    tags: ['opposition', 'king activity', 'tempo', 'triangulation'],
    isUnlocked: true,
    relatedPositions: ['kpk_basic', 'triangulation', 'distant_opposition'],
    author: 'de la Bourdonnais',
    source: 'Classical Chess Studies'
  },
  {
    id: 'square_of_pawn',
    title: 'The Pawn\'s Domain',
    subtitle: 'Territory Control',
    category: 'Basic Endgames',
    difficulty: 'Beginner',
    fen: '8/8/8/8/4p3/8/8/6K1 b - - 0 1',
    description: 'Master the square of the pawn - the invisible boundary that determines if a king can catch a passed pawn.',
    keyPoints: [
      'Visualize the pawn\'s square',
      'Calculate if king can enter the square',
      'Consider pawn on 2nd rank special case',
      'Multiple pawns and complex races',
      'Practical application in time pressure'
    ],
    studyTime: '12 min',
    masterGames: 1967,
    winRate: 85.4,
    evaluation: '-4.1',
    theoreticalResult: 'losing',
    tags: ['calculation', 'pawn races', 'king activity', 'visualization'],
    isUnlocked: true,
    relatedPositions: ['pawn_breakthrough', 'king_races', 'passed_pawn'],
    author: 'Nimzowitsch',
    source: 'My System'
  },

  // Rook Endgames - Tower Mastery
  {
    id: 'lucena_position',
    title: 'Lucena Position',
    subtitle: 'The Bridge Builder',
    category: 'Classical Positions',
    difficulty: 'Master',
    fen: '1K6/1P6/8/8/8/8/2k5/7r w - - 0 1',
    description: 'The most important theoretical rook endgame position. Master the bridge-building technique to convert your advantage.',
    keyPoints: [
      'Building the bridge technique',
      'Rook on 4th rank method',
      'Cutting off the enemy king',
      'Precise move order execution',
      'Understanding the zugzwang motif'
    ],
    studyTime: '45 min',
    masterGames: 3421,
    winRate: 94.2,
    evaluation: '+6.8',
    theoreticalResult: 'winning',
    ecoCode: 'A00',
    famousGames: [
      {
        players: 'Capablanca vs Marshall',
        year: 1909,
        tournament: 'New York',
        result: '1-0'
      }
    ],
    tags: ['classical', 'bridge', 'technique', 'rook activity', 'cutting off'],
    isUnlocked: true,
    relatedPositions: ['philidor_position', 'rook_vs_pawn', 'rook_cut_off'],
    author: 'Lucena',
    source: 'Repetición de Amores (1497)'
  },
  {
    id: 'philidor_position',
    title: 'Philidor Position',
    subtitle: 'The Defensive Wall',
    category: 'Classical Positions',
    difficulty: 'Advanced',
    fen: '8/8/2k5/2p5/2K5/8/8/1r6 b - - 0 1',
    description: 'The cornerstone of rook endgame defense. Learn how to hold seemingly lost positions with precise rook placement.',
    keyPoints: [
      'Rook behind the pawn principle',
      'Passive vs active defense',
      'When to give up the pawn',
      'Third rank defense setup',
      'Avoiding the Lucena position'
    ],
    studyTime: '40 min',
    masterGames: 2876,
    winRate: 15.7,
    evaluation: '-0.2',
    theoreticalResult: 'drawn',
    tags: ['defensive', 'rook behind pawn', 'third rank', 'passive defense'],
    isUnlocked: true,
    relatedPositions: ['lucena_position', 'rook_third_rank', 'defensive_setup'],
    author: 'Philidor',
    source: 'Analyse du jeu des Échecs (1749)'
  },
  {
    id: 'rook_vs_rook_pawn',
    title: 'Rook vs Rook + Pawn',
    subtitle: 'The Grinding Battle',
    category: 'Rook Endgames',
    difficulty: 'Intermediate',
    fen: '8/8/8/8/8/2k5/2p5/2K1R1r1 w - - 0 1',
    description: 'Classical rook endgame where precise technique is required to convert or hold the extra pawn.',
    keyPoints: [
      'Active vs passive rook placement',
      'King activity coordination',
      'When to exchange rooks',
      'Creating mating nets',
      'Defending from the side'
    ],
    studyTime: '35 min',
    masterGames: 1923,
    winRate: 42.1,
    evaluation: '-0.8',
    theoreticalResult: 'drawn',
    tags: ['rook activity', 'king coordination', 'technique', 'defensive'],
    isUnlocked: true,
    relatedPositions: ['rook_endgame_principles', 'active_rook', 'rook_exchange'],
    author: 'Tarrasch',
    source: 'The Game of Chess'
  },

  // Queen Endgames - Royal Dominion  
  {
    id: 'queen_vs_pawn_7th',
    title: 'Queen vs Pawn on 7th',
    subtitle: 'The Royal Hunt',
    category: 'Queen Endgames',
    difficulty: 'Advanced',
    fen: '8/1p6/8/8/8/8/1k6/6Q1 w - - 0 1',
    description: 'When a pawn reaches the 7th rank, special techniques are needed to stop promotion threats.',
    keyPoints: [
      'Stalemate defense tricks',
      'Queen positioning for maximum control',
      'Avoiding perpetual check',
      'Understanding drawing zones',
      'Calculation accuracy under pressure'
    ],
    studyTime: '30 min',
    masterGames: 687,
    winRate: 86.7,
    evaluation: '+4.5',
    theoreticalResult: 'winning',
    tags: ['stalemate tricks', 'calculation', 'drawing zones', 'precision'],
    isUnlocked: true,
    relatedPositions: ['queen_vs_pawn_6th', 'stalemate_defenses', 'queen_technique'],
    author: 'Fine',
    source: 'Basic Chess Endings'
  },
  {
    id: 'queen_vs_queen_pawn',
    title: 'Queen vs Queen + Pawn',
    subtitle: 'Royal Warfare',
    category: 'Queen Endgames',
    difficulty: 'Master',
    fen: '8/8/8/8/4p3/4k3/8/4QK1q b - - 0 1',
    description: 'The most complex of all endgames. Queen battles where precise calculation determines the outcome.',
    keyPoints: [
      'Perpetual check patterns',
      'Queen vs queen technique',
      'Pawn promotion coordination',
      'King safety considerations',
      'Time management in calculation'
    ],
    studyTime: '50 min',
    masterGames: 456,
    winRate: 67.3,
    evaluation: '-1.2',
    theoreticalResult: 'unclear',
    tags: ['complex calculation', 'perpetual check', 'technique', 'time pressure'],
    isUnlocked: true,
    relatedPositions: ['queen_checks', 'perpetual_patterns', 'queen_coordination'],
    author: 'Dvoretsky',
    source: 'Dvoretsky\'s Endgame Manual'
  },

  // Minor Piece Endgames - Knight & Bishop Arena
  {
    id: 'bishop_vs_knight',
    title: 'Bishop vs Knight',
    subtitle: 'The Eternal Duel',
    category: 'Minor Piece Endgames',
    difficulty: 'Intermediate',
    fen: '8/8/8/4k3/4p3/4K3/8/2B3n1 w - - 0 1',
    description: 'The classic minor piece battle. Understanding when each piece excels based on pawn structure.',
    keyPoints: [
      'Open vs closed position evaluation',
      'Bishop pair advantage',
      'Knight outpost creation',
      'Color complex weaknesses',
      'Pawn structure influence'
    ],
    studyTime: '25 min',
    masterGames: 1456,
    winRate: 52.3,
    evaluation: '0.0',
    theoreticalResult: 'drawn',
    tags: ['pawn structure', 'piece activity', 'outposts', 'color complex'],
    isUnlocked: true,
    relatedPositions: ['bishop_pair', 'knight_outpost', 'pawn_structure'],
    author: 'Nimzowitsch',
    source: 'My System'
  },
  {
    id: 'knight_vs_pawns',
    title: 'Knight vs Pawns',
    subtitle: 'The Lone Warrior',
    category: 'Minor Piece Endgames',
    difficulty: 'Advanced',
    fen: '8/8/8/2pp4/3K4/8/8/6N1 w - - 0 1',
    description: 'Can a single knight hold back multiple pawns? Learn the defensive techniques and breakthrough methods.',
    keyPoints: [
      'Knight blockade technique',
      'Optimal knight placement',
      'When pawns breakthrough',
      'King and knight coordination',
      'Zugzwang considerations'
    ],
    studyTime: '30 min',
    masterGames: 892,
    winRate: 73.2,
    evaluation: '+1.8',
    theoreticalResult: 'winning',
    tags: ['blockade', 'coordination', 'breakthrough', 'zugzwang'],
    isUnlocked: true,
    relatedPositions: ['knight_blockade', 'pawn_breakthrough', 'piece_coordination'],
    author: 'Averbakh',
    source: 'Chess Endings: Essential Knowledge'
  },

  // Bishop Endgames - Diagonal Masters
  {
    id: 'opposite_bishops',
    title: 'Opposite Colored Bishops',
    subtitle: 'Parallel Universes',
    category: 'Bishop Endgames',
    difficulty: 'Advanced',
    fen: '8/1p6/1P6/8/8/2B5/8/6b1 w - - 0 1',
    description: 'The most drawish of endgames. Learn when extra pawns win and when fortress positions hold.',
    keyPoints: [
      'Blockade on light/dark squares',
      'Creating passed pawns',
      'King penetration routes',
      'Fortress construction principles',
      'When material advantage wins'
    ],
    studyTime: '40 min',
    masterGames: 892,
    winRate: 38.9,
    evaluation: '+0.3',
    theoreticalResult: 'drawn',
    tags: ['blockade', 'fortress', 'passed pawns', 'king penetration'],
    isUnlocked: false,
    relatedPositions: ['fortress_positions', 'passed_pawn_creation', 'blockade_technique'],
    unlockRequirements: {
      minRating: 1400,
      completedPositions: ['bishop_vs_knight', 'knight_vs_pawns']
    },
    author: 'Müller & Lamprecht',
    source: 'Fundamental Chess Endings'
  },
  {
    id: 'wrong_bishop',
    title: 'Wrong Bishop',
    subtitle: 'The Cursed Diagonal',
    category: 'Bishop Endgames',
    difficulty: 'Intermediate',
    fen: '8/8/8/8/8/8/1p6/1BK3k1 b - - 0 1',
    description: 'When your bishop controls the wrong color squares, even extra pawns may not win.',
    keyPoints: [
      'Identifying wrong bishop positions',
      'Why the bishop fails to help',
      'Correct bishop vs wrong bishop',
      'Stalemate defense resources',
      'Practical winning attempts'
    ],
    studyTime: '20 min',
    masterGames: 634,
    winRate: 12.4,
    evaluation: '0.0',
    theoreticalResult: 'drawn',
    tags: ['wrong bishop', 'stalemate', 'color squares', 'drawing technique'],
    isUnlocked: false,
    relatedPositions: ['stalemate_defenses', 'bishop_color_complex', 'drawing_technique'],
    unlockRequirements: {
      minRating: 1200,
      completedPositions: ['bishop_vs_knight']
    },
    author: 'de la Villa',
    source: '100 Endgames You Must Know'
  },

  // Pawn Endgames - Footsoldier Wars
  {
    id: 'pawn_breakthrough',
    title: 'Pawn Breakthrough',
    subtitle: 'The Infantry Charge',
    category: 'Pawn Endgames',
    difficulty: 'Intermediate',
    fen: '8/8/8/1p1p1p2/1P1P1P2/8/8/6K1 w - - 0 1',
    description: 'When pawns storm forward together, breakthrough tactics can create unstoppable passed pawns.',
    keyPoints: [
      'Breakthrough combination patterns',
      'Calculating pawn races',
      'Creating passed pawns',
      'King support coordination',
      'Opposition in pawn endings'
    ],
    studyTime: '25 min',
    masterGames: 1234,
    winRate: 64.7,
    evaluation: '+1.5',
    theoreticalResult: 'winning',
    tags: ['breakthrough', 'pawn races', 'passed pawns', 'calculation'],
    isUnlocked: true,
    relatedPositions: ['passed_pawn_creation', 'pawn_races', 'king_support'],
    author: 'Capablanca',
    source: 'Chess Fundamentals'
  },
  {
    id: 'triangulation',
    title: 'Triangulation',
    subtitle: 'The Tempo Dance',
    category: 'Pawn Endgames',
    difficulty: 'Advanced',
    fen: '8/8/8/2p5/2k5/2P5/2K5/8 w - - 0 1',
    description: 'Master the art of losing a tempo to gain the opposition and win pawn endings.',
    keyPoints: [
      'Triangulation technique',
      'Losing a tempo effectively',
      'Gaining opposition through maneuvers',
      'When triangulation works',
      'Complex triangulation patterns'
    ],
    studyTime: '35 min',
    masterGames: 756,
    winRate: 78.9,
    evaluation: '+2.1',
    theoreticalResult: 'winning',
    tags: ['triangulation', 'tempo', 'opposition', 'technique', 'maneuvering'],
    isUnlocked: true,
    relatedPositions: ['king_opposition', 'tempo_moves', 'advanced_opposition'],
    author: 'Zukertort',
    source: 'Classical Endgame Theory'
  },

  // Fortress Positions - Impregnable Defenses
  {
    id: 'fortress_rook_bishop',
    title: 'Rook + Bishop Fortress',
    subtitle: 'The Impregnable Tower',
    category: 'Fortress Positions',
    difficulty: 'Master',
    fen: '6k1/6p1/6P1/6BK/8/8/8/3r4 b - - 0 1',
    description: 'Sometimes material is meaningless - learn fortress positions that hold against overwhelming odds.',
    keyPoints: [
      'Fortress construction principles',
      'Defensive piece coordination',
      'Creating impenetrable barriers',
      'When fortresses break down',
      'Psychological aspects of defense'
    ],
    studyTime: '60 min',
    masterGames: 234,
    winRate: 8.7,
    evaluation: '0.0',
    theoreticalResult: 'drawn',
    tags: ['fortress', 'defense', 'coordination', 'impregnable', 'psychology'],
    isUnlocked: false,
    relatedPositions: ['defensive_setups', 'piece_coordination', 'fortress_theory'],
    unlockRequirements: {
      minRating: 1800,
      masterLevel: 'Advanced'
    },
    author: 'Dvoretsky',
    source: 'Dvoretsky\'s Endgame Manual'
  },

  // Theoretical Studies - Academic Arsenal
  {
    id: 'reti_study',
    title: 'Réti Study',
    subtitle: 'The Geometric Miracle',
    category: 'Theoretical Studies',
    difficulty: 'Master',
    fen: '7K/8/k1P5/7p/8/8/8/8 w - - 0 1',
    description: 'One of the most famous endgame studies demonstrating the power of the king\'s diagonal movement.',
    keyPoints: [
      'King\'s dual-purpose movement',
      'Geometric principles in endgames',
      'Multi-target strategy',
      'Study composition artistry',
      'Practical application of study ideas'
    ],
    studyTime: '45 min',
    masterGames: 0,
    winRate: 50.0,
    evaluation: '0.0',
    theoreticalResult: 'drawn',
    tags: ['study', 'geometry', 'king activity', 'composition', 'artistry'],
    isUnlocked: false,
    relatedPositions: ['king_geometry', 'study_themes', 'composition_art'],
    unlockRequirements: {
      minRating: 1700,
      masterLevel: 'Advanced'
    },
    author: 'Richard Réti',
    source: 'Modern Ideas in Chess (1922)'
  }
]

/**
 * Mock endgame compositions for study
 */
export const mockCompositions: EndgameComposition[] = [
  {
    id: 'troitzky_study',
    title: 'Knight and Pawn vs Knight',
    composer: 'Alexei Troitsky',
    year: 1896,
    fen: '8/8/8/8/4n3/4P3/4N3/4K2k w - - 0 1',
    stipulation: 'White to play and win',
    solution: {
      mainLine: ['Nf4+', 'Kg1', 'Nd5', 'Nf2', 'e4', 'Ne4', 'Nf6'],
      alternatives: [
        {
          move: 'Nd4',
          line: ['Nd4', 'Nf2+', 'Ke2', 'Ng4', 'Nf5'],
          comment: 'Alternative winning method'
        }
      ]
    },
    artisticValue: 9.2,
    solvingDifficulty: 'Master',
    themes: ['Knight Endgame', 'Domination', 'Precise Calculation'],
    source: 'Deutsche Schachzeitung',
    award: 'First Prize'
  },
  {
    id: 'reti_famous',
    title: 'The Reti Miracle',
    composer: 'Richard Réti',
    year: 1921,
    fen: '7K/8/k1P5/7p/8/8/8/8 w - - 0 1',
    stipulation: 'White to play and draw',
    solution: {
      mainLine: ['Kg7', 'Kb6', 'Kf6', 'Kxc6', 'Ke5'],
      alternatives: [
        {
          move: 'Kh7',
          line: ['Kh7', 'Kb6', 'Kg6', 'Kxc6', 'Kf5'],
          comment: 'Slower but still draws'
        }
      ]
    },
    artisticValue: 9.8,
    solvingDifficulty: 'Advanced',
    themes: ['King Activity', 'Geometry', 'Dual Purpose'],
    source: 'Kagans Neueste Schachnachrichten',
    award: 'Immortal Study'
  }
]

/**
 * Generate mock progress data for demonstration
 */
export const generateMockProgress = () => {
  // This would typically come from user data/localStorage
  return {
    totalPositions: mockEndgamePositions.length,
    studiedPositions: 12,
    averageMastery: 45.7,
    totalStudyTime: 280, // minutes
    studyStreak: 5,
    favoriteCategory: 'Basic Endgames' as EndgameCategory,
    recentPositions: ['kpk_basic', 'lucena_position', 'philidor_position'],
    bookmarkedPositions: ['lucena_position', 'reti_study']
  }
}