/**
 * Mock Game Review Data
 * Contains realistic chess games with comprehensive analysis data
 * For VISUAL MOCKUP purposes - represents analyzed games in the Game Laboratory
 */

import type { 
  GameReview, 
  AnalyzedMove, 
  GameCollection,
  OpeningAnalysis,
  TimeAnalysis,
  PerformanceMetrics,
  GameImport
} from '@/types/gameReview'

/**
 * Sample analyzed moves for demonstration
 */
const createSampleMoves = (gameLength: number): AnalyzedMove[] => {
  const moves: AnalyzedMove[] = []
  
  const sampleSans = [
    'e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6', 'O-O', 'Be7',
    'd3', 'b5', 'Bb3', 'd6', 'c3', 'O-O', 'Re1', 'Bb7', 'Nbd2', 'Re8',
    'Nf1', 'Bf8', 'Ng3', 'g6', 'h3', 'Bg7', 'Bg5', 'h6', 'Bd2', 'Nh5',
    'Nxh5', 'gxh5', 'Qe2', 'Qd7', 'Red1', 'Red8', 'Be3', 'Ne7', 'c4', 'bxc4',
    'dxc4', 'c5', 'Rd5', 'Nc6', 'Rxd6', 'Qe7', 'Rd1', 'Rxd1+', 'Rxd1', 'Rd8',
    'Rxd8+', 'Nxd8', 'Qd2', 'Ne6', 'Qd5', 'Qf6', 'b3', 'Qg6', 'Bc2', 'Qxg2+'
  ]

  const classifications = ['Good', 'Inaccuracy', 'Mistake', 'Brilliant', 'Great', 'Blunder', 'Book']
  const tacticalThemes = ['Pin', 'Fork', 'Skewer', 'Discovery', 'Double Attack', 'Sacrifice', 'Deflection']
  
  for (let i = 0; i < Math.min(gameLength, sampleSans.length); i++) {
    const color = i % 2 === 0 ? 'white' : 'black'
    const moveNumber = Math.floor(i / 2) + 1
    const evaluation = Math.random() * 4 - 2 // Random evaluation between -2 and +2
    const evaluationLoss = Math.random() * 100 // Random centipawn loss
    
    moves.push({
      moveNumber,
      color,
      san: sampleSans[i],
      uci: `${String.fromCharCode(97 + Math.floor(Math.random() * 8))}${Math.floor(Math.random() * 8) + 1}${String.fromCharCode(97 + Math.floor(Math.random() * 8))}${Math.floor(Math.random() * 8) + 1}`,
      from: `${String.fromCharCode(97 + Math.floor(Math.random() * 8))}${Math.floor(Math.random() * 8) + 1}`,
      to: `${String.fromCharCode(97 + Math.floor(Math.random() * 8))}${Math.floor(Math.random() * 8) + 1}`,
      piece: ['p', 'r', 'n', 'b', 'q', 'k'][Math.floor(Math.random() * 6)],
      captured: Math.random() < 0.2 ? ['p', 'r', 'n', 'b', 'q'][Math.floor(Math.random() * 5)] : undefined,
      timeSpent: Math.floor(Math.random() * 180) + 10,
      timeRemaining: Math.max(0, 3600 - (i * 60)),
      evaluationBefore: evaluation,
      evaluationAfter: evaluation + (Math.random() * 0.4 - 0.2),
      bestMove: sampleSans[Math.min(i + 1, sampleSans.length - 1)],
      alternativeMoves: [
        {
          move: sampleSans[Math.min(i + 1, sampleSans.length - 1)],
          evaluation: evaluation + 0.1,
          line: [sampleSans[Math.min(i + 1, sampleSans.length - 1)], sampleSans[Math.min(i + 2, sampleSans.length - 1)]]
        },
        {
          move: sampleSans[Math.min(i + 2, sampleSans.length - 1)],
          evaluation: evaluation - 0.1,
          line: [sampleSans[Math.min(i + 2, sampleSans.length - 1)]]
        }
      ],
      classification: classifications[Math.floor(Math.random() * classifications.length)] as any,
      evaluationLoss,
      phase: i < 20 ? 'Opening' : i < 60 ? 'Middlegame' : 'Endgame',
      positionAfter: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      comment: Math.random() < 0.3 ? 'A key moment in the game where tactical awareness was crucial.' : undefined,
      principalVariation: [sampleSans[Math.min(i + 1, sampleSans.length - 1)], sampleSans[Math.min(i + 2, sampleSans.length - 1)]],
      isCriticalPosition: Math.random() < 0.15,
      tacticalThemes: Math.random() < 0.4 ? [tacticalThemes[Math.floor(Math.random() * tacticalThemes.length)]] : []
    })
  }

  return moves
}

/**
 * Sample opening analysis
 */
const createOpeningAnalysis = (): OpeningAnalysis => ({
  name: 'Ruy Lopez, Morphy Defense',
  eco: 'C78',
  moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6'],
  theoryDepth: 12,
  deviationMove: 9,
  theoreticalAlternatives: ['O-O', 'd3', 'c3'],
  evaluation: 'Equal',
  commonPlans: [
    'White: Castle kingside, build center control, launch kingside attack',
    'Black: Challenge the center, create counterplay on queenside',
    'Maintain tension in the center'
  ],
  pawnStructures: ['Central pawn tension', 'Queenside pawn majority potential for Black'],
  masterGames: [
    {
      white: 'Capablanca, J.R.',
      black: 'Marshall, F.J.',
      result: '1-0',
      year: 1909,
      event: 'New York'
    },
    {
      white: 'Kasparov, G.',
      black: 'Karpov, A.',
      result: '1/2-1/2',
      year: 1984,
      event: 'World Championship'
    }
  ],
  statistics: {
    whiteWinRate: 31.2,
    blackWinRate: 28.7,
    drawRate: 40.1,
    totalGames: 15847
  }
})

/**
 * Sample time analysis
 */
const createTimeAnalysis = (): TimeAnalysis => ({
  totalTimeUsed: 2847,
  averageTimePerMove: 45.2,
  phaseDistribution: {
    opening: 542,
    middlegame: 1789,
    endgame: 516
  },
  timeWasters: [15, 28, 34],
  timePressure: [42, 51, 58],
  timeGrade: 'B',
  timeBlunders: [34]
})

/**
 * Sample performance metrics
 */
const createPerformanceMetrics = (isPlayer: boolean = true): PerformanceMetrics => ({
  overallAccuracy: isPlayer ? 78.4 : 85.2,
  phaseAccuracy: {
    opening: isPlayer ? 89.2 : 92.1,
    middlegame: isPlayer ? 71.8 : 81.7,
    endgame: isPlayer ? 74.3 : 82.6
  },
  moveClassifications: {
    brilliant: isPlayer ? 1 : 2,
    great: isPlayer ? 4 : 7,
    good: isPlayer ? 32 : 38,
    inaccuracy: isPlayer ? 8 : 5,
    mistake: isPlayer ? 4 : 2,
    blunder: isPlayer ? 2 : 1
  },
  performanceRating: isPlayer ? 1847 : 2156,
  averageCentipawnLoss: isPlayer ? 32.7 : 21.3,
  blunderRate: isPlayer ? 3.9 : 1.8,
  timeEfficiency: isPlayer ? 76.2 : 88.4,
  criticalPositionScore: isPlayer ? 68.5 : 85.7
})

/**
 * Mock game reviews for demonstration
 */
export const mockGameReviews: GameReview[] = [
  {
    id: 'game-1',
    gameInfo: {
      white: 'ChessTrainer2025',
      black: 'Magnus_Carlsen_Bot',
      whiteElo: 1650,
      blackElo: 2850,
      result: '0-1',
      date: '2025.08.27',
      event: 'Chess Training Session',
      site: 'Chess Laboratory',
      round: '1',
      timeControl: '15+10',
      termination: 'Normal'
    },
    pgn: '[White "ChessTrainer2025"]\n[Black "Magnus_Carlsen_Bot"]\n[Result "0-1"]\n[Date "2025.08.27"]\n\n1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. d3 b5 7. Bb3 d6 8. c3 O-O 9. Re1 Bb7 10. Nbd2 Re8 0-1',
    source: 'Recent_Games',
    analysisConfig: {
      depth: 'Standard',
      engineTime: 5,
      multiPV: 3,
      includeOpeningBook: true,
      includeTablebase: true
    },
    analysisStatus: 'Completed',
    analysisProgress: 100,
    moves: createSampleMoves(63),
    opening: createOpeningAnalysis(),
    timeAnalysis: createTimeAnalysis(),
    performance: {
      white: createPerformanceMetrics(true),
      black: createPerformanceMetrics(false)
    },
    keyPositions: [
      {
        moveNumber: 12,
        position: 'r1bqk2r/2ppbppp/p1n2n2/1p2p3/4P3/1BP2N2/PP1P1PPP/RNBQR1K1 b kq - 0 8',
        evaluation: -0.3,
        description: 'Critical moment - Black has equalized and White must find a plan',
        type: 'Critical'
      },
      {
        moveNumber: 28,
        position: 'r3k2r/1bq1bppp/p1np1n2/1p2p3/2P1P3/1P3N2/P2NBPPP/R1BQR1K1 w kq - 0 15',
        evaluation: -0.8,
        description: 'Turning point where White missed the best continuation',
        type: 'Turning_Point'
      },
      {
        moveNumber: 45,
        position: '2r3k1/1b3ppp/p2p4/1p2n3/4P3/1P1B1N2/P4PPP/2R3K1 b - - 0 23',
        evaluation: -1.5,
        description: 'Missed tactical opportunity for Black',
        type: 'Missed_Opportunity'
      }
    ],
    summary: {
      gameResult: 'Black wins',
      gameLength: 63,
      gamePhases: {
        openingLength: 16,
        middlegameLength: 34,
        endgameLength: 13
      },
      decisionPoints: 8,
      majorBlunders: 2,
      winner: 'black',
      winningMoment: 28
    },
    improvements: [
      {
        category: 'Opening',
        description: 'Study the Ruy Lopez main lines to avoid early difficulties',
        specificMoves: [9, 12],
        priority: 'High',
        studyMaterial: ['Ruy Lopez Masterclass', 'Spanish Opening Theory']
      },
      {
        category: 'Tactics',
        description: 'Practice pin and discovery patterns that appeared in the middlegame',
        specificMoves: [28, 34],
        priority: 'High',
        studyMaterial: ['Tactical Puzzles: Pins', 'Discovery Attacks Training']
      },
      {
        category: 'Time_Management',
        description: 'Avoid spending too much time on routine opening moves',
        specificMoves: [15, 28, 34],
        priority: 'Medium',
        studyMaterial: ['Time Management in Chess', 'Clock Usage Strategies']
      }
    ],
    createdAt: Date.now() - 86400000, // 1 day ago
    analysisCompletedAt: Date.now() - 86400000 + 300000, // 5 minutes after creation
    lastViewedAt: Date.now() - 3600000, // 1 hour ago
    userNotes: [
      {
        moveNumber: 28,
        note: 'I completely missed the knight fork here. Need to slow down and look for all tactical possibilities.',
        timestamp: Date.now() - 3600000
      }
    ],
    bookmarks: [
      {
        moveNumber: 28,
        label: 'Missed Tactic',
        category: 'Tactical Training'
      },
      {
        moveNumber: 45,
        label: 'Endgame Study',
        category: 'Endgame Practice'
      }
    ],
    exportSettings: {
      includeVariations: true,
      includeComments: true,
      includeEvaluations: true,
      format: 'PGN'
    }
  },
  {
    id: 'game-2',
    gameInfo: {
      white: 'ChessTrainer2025',
      black: 'Stockfish_Level_5',
      whiteElo: 1650,
      blackElo: 1800,
      result: '1-0',
      date: '2025.08.26',
      event: 'Training Match',
      site: 'Chess Laboratory',
      timeControl: '10+0',
      termination: 'Normal'
    },
    pgn: '[White "ChessTrainer2025"]\n[Black "Stockfish_Level_5"]\n[Result "1-0"]\n[Date "2025.08.26"]\n\n1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 h6 7. Bh4 b6 8. cxd5 Nxd5 1-0',
    source: 'Recent_Games',
    analysisConfig: {
      depth: 'Quick',
      engineTime: 3,
      multiPV: 2,
      includeOpeningBook: true,
      includeTablebase: false
    },
    analysisStatus: 'Completed',
    analysisProgress: 100,
    moves: createSampleMoves(45),
    opening: {
      name: 'Queen\'s Gambit Declined',
      eco: 'D53',
      moves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6'],
      theoryDepth: 10,
      deviationMove: 8,
      theoreticalAlternatives: ['Bxe7', 'Be2'],
      evaluation: 'Slightly_Better',
      commonPlans: [
        'White: Control the center, develop pieces harmoniously',
        'Black: Solid pawn structure, counterplay on the queenside',
        'Central pawn tension management'
      ],
      pawnStructures: ['Orthodox QGD structure', 'Central pawn tension'],
      masterGames: [
        {
          white: 'Kramnik, V.',
          black: 'Kasparov, G.',
          result: '1-0',
          year: 2000,
          event: 'World Championship'
        }
      ],
      statistics: {
        whiteWinRate: 35.8,
        blackWinRate: 25.4,
        drawRate: 38.8,
        totalGames: 24513
      }
    },
    timeAnalysis: {
      totalTimeUsed: 567,
      averageTimePerMove: 25.8,
      phaseDistribution: {
        opening: 145,
        middlegame: 298,
        endgame: 124
      },
      timeWasters: [12],
      timePressure: [38, 42],
      timeGrade: 'A',
      timeBlunders: []
    },
    performance: {
      white: createPerformanceMetrics(true),
      black: {
        overallAccuracy: 71.2,
        phaseAccuracy: {
          opening: 85.7,
          middlegame: 68.4,
          endgame: 65.8
        },
        moveClassifications: {
          brilliant: 0,
          great: 2,
          good: 28,
          inaccuracy: 6,
          mistake: 7,
          blunder: 3
        },
        performanceRating: 1723,
        averageCentipawnLoss: 45.2,
        blunderRate: 6.5,
        timeEfficiency: 82.1,
        criticalPositionScore: 61.3
      }
    },
    keyPositions: [
      {
        moveNumber: 18,
        position: 'r1bq1rk1/ppp1bppp/4pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQ - 0 9',
        evaluation: 0.4,
        description: 'White has achieved a slight advantage from the opening',
        type: 'Best_Play'
      },
      {
        moveNumber: 32,
        position: 'r2q1rk1/ppp2ppp/4pn2/3p1b2/2PP4/2N1P3/PP3PPP/R1BQ1RK1 b - - 0 16',
        evaluation: 1.2,
        description: 'Critical position where the game was decided',
        type: 'Turning_Point'
      }
    ],
    summary: {
      gameResult: 'White wins',
      gameLength: 45,
      gamePhases: {
        openingLength: 14,
        middlegameLength: 24,
        endgameLength: 7
      },
      decisionPoints: 5,
      majorBlunders: 1,
      winner: 'white',
      winningMoment: 32
    },
    improvements: [
      {
        category: 'Opening',
        description: 'Excellent opening play! Continue studying Queen\'s Gambit structures',
        specificMoves: [],
        priority: 'Low',
        studyMaterial: ['QGD Masterpieces']
      },
      {
        category: 'Endgame',
        description: 'Practice basic endgame techniques to convert advantages more efficiently',
        specificMoves: [38, 42],
        priority: 'Medium',
        studyMaterial: ['Basic Endgames', 'Technique in Chess Endings']
      }
    ],
    createdAt: Date.now() - 172800000, // 2 days ago
    analysisCompletedAt: Date.now() - 172800000 + 180000, // 3 minutes after creation
    lastViewedAt: Date.now() - 7200000, // 2 hours ago
    userNotes: [],
    bookmarks: [
      {
        moveNumber: 32,
        label: 'Winning Combination',
        category: 'Good Games'
      }
    ],
    exportSettings: {
      includeVariations: false,
      includeComments: true,
      includeEvaluations: true,
      format: 'PGN'
    }
  },
  {
    id: 'game-3',
    gameInfo: {
      white: 'Hikaru_Nakamura_Bot',
      black: 'ChessTrainer2025',
      whiteElo: 2750,
      blackElo: 1650,
      result: '1-0',
      date: '2025.08.25',
      event: 'Blitz Training',
      site: 'Chess Laboratory',
      timeControl: '3+2',
      termination: 'Time forfeit'
    },
    pgn: '[White "Hikaru_Nakamura_Bot"]\n[Black "ChessTrainer2025"]\n[Result "1-0"]\n[Date "2025.08.25"]\n\n1. Nf3 d5 2. g3 Nf6 3. Bg2 e6 4. O-O Be7 5. d3 O-O 6. Nbd2 c5 7. e4 Nc6 8. Re1 b5 1-0',
    source: 'Recent_Games',
    analysisConfig: {
      depth: 'Deep',
      engineTime: 10,
      multiPV: 5,
      includeOpeningBook: true,
      includeTablebase: true
    },
    analysisStatus: 'Completed',
    analysisProgress: 100,
    moves: createSampleMoves(38),
    opening: {
      name: 'King\'s Indian Attack',
      eco: 'A07',
      moves: ['Nf3', 'd5', 'g3', 'Nf6', 'Bg2', 'e6'],
      theoryDepth: 8,
      deviationMove: 6,
      theoreticalAlternatives: ['c4', 'b3', 'Nc3'],
      evaluation: 'Equal',
      commonPlans: [
        'White: King\'s Indian Attack setup, kingside attack',
        'Black: Central control, queenside expansion',
        'Flexible pawn structure'
      ],
      pawnStructures: ['King\'s Indian Attack formation'],
      masterGames: [
        {
          white: 'Fischer, R.J.',
          black: 'Petrosian, T.',
          result: '1-0',
          year: 1971,
          event: 'Candidates'
        }
      ],
      statistics: {
        whiteWinRate: 29.5,
        blackWinRate: 31.2,
        drawRate: 39.3,
        totalGames: 8924
      }
    },
    timeAnalysis: {
      totalTimeUsed: 142,
      averageTimePerMove: 7.4,
      phaseDistribution: {
        opening: 45,
        middlegame: 71,
        endgame: 26
      },
      timeWasters: [8, 15],
      timePressure: [20, 25, 30, 35],
      timeGrade: 'D',
      timeBlunders: [25, 30]
    },
    performance: {
      white: {
        overallAccuracy: 92.7,
        phaseAccuracy: {
          opening: 95.2,
          middlegame: 91.8,
          endgame: 90.4
        },
        moveClassifications: {
          brilliant: 2,
          great: 8,
          good: 24,
          inaccuracy: 2,
          mistake: 0,
          blunder: 0
        },
        performanceRating: 2834,
        averageCentipawnLoss: 12.3,
        blunderRate: 0.0,
        timeEfficiency: 94.7,
        criticalPositionScore: 96.8
      },
      black: {
        overallAccuracy: 63.2,
        phaseAccuracy: {
          opening: 78.4,
          middlegame: 58.7,
          endgame: 51.2
        },
        moveClassifications: {
          brilliant: 0,
          great: 1,
          good: 18,
          inaccuracy: 7,
          mistake: 6,
          blunder: 4
        },
        performanceRating: 1423,
        averageCentipawnLoss: 67.8,
        blunderRate: 10.5,
        timeEfficiency: 45.2,
        criticalPositionScore: 38.9
      }
    },
    keyPositions: [
      {
        moveNumber: 16,
        position: 'r1bqk2r/p2nbppp/4pn2/1pp5/3PP3/2P2NP1/PP1N1PBP/R1BQR1K1 b kq - 0 8',
        evaluation: -0.1,
        description: 'Sharp middlegame position with chances for both sides',
        type: 'Critical'
      },
      {
        moveNumber: 25,
        position: 'r2q1rk1/p3bppp/2n1pn2/1pp5/2BPP3/2P2NP1/PP3PBP/R1BQR1K1 w - - 0 13',
        evaluation: -1.2,
        description: 'Major blunder - missed a simple tactical shot',
        type: 'Missed_Opportunity'
      },
      {
        moveNumber: 30,
        position: 'r4rk1/p3bppp/2q1pn2/1pp5/2BPP3/2P2NP1/PP1Q1PBP/R1B1R1K1 b - - 0 15',
        evaluation: -2.4,
        description: 'Another critical error under time pressure',
        type: 'Turning_Point'
      }
    ],
    summary: {
      gameResult: 'White wins on time',
      gameLength: 38,
      gamePhases: {
        openingLength: 12,
        middlegameLength: 20,
        endgameLength: 6
      },
      decisionPoints: 7,
      majorBlunders: 4,
      winner: 'white',
      winningMoment: 25
    },
    improvements: [
      {
        category: 'Time_Management',
        description: 'Critical improvement needed in blitz time management',
        specificMoves: [8, 15, 20, 25, 30, 35],
        priority: 'High',
        studyMaterial: ['Blitz Chess Mastery', 'Time Management Under Pressure']
      },
      {
        category: 'Tactics',
        description: 'Practice basic tactical patterns to avoid blunders under time pressure',
        specificMoves: [25, 30],
        priority: 'High',
        studyMaterial: ['Tactical Training Under Time Pressure', '1000 Basic Combinations']
      },
      {
        category: 'Opening',
        description: 'Learn faster opening development to save time',
        specificMoves: [8],
        priority: 'Medium',
        studyMaterial: ['Quick Development Principles', 'Blitz Opening Repertoire']
      }
    ],
    createdAt: Date.now() - 259200000, // 3 days ago
    analysisCompletedAt: Date.now() - 259200000 + 480000, // 8 minutes after creation
    lastViewedAt: Date.now() - 14400000, // 4 hours ago
    userNotes: [
      {
        moveNumber: 25,
        note: 'Terrible blunder in time trouble. I need to work on my pattern recognition.',
        timestamp: Date.now() - 14400000
      },
      {
        moveNumber: 30,
        note: 'Another mistake right after the first one. Time pressure is my biggest weakness.',
        timestamp: Date.now() - 14400000
      }
    ],
    bookmarks: [
      {
        moveNumber: 25,
        label: 'Time Pressure Blunder',
        category: 'Learning Points'
      },
      {
        moveNumber: 16,
        label: 'Good Position',
        category: 'Middlegame Study'
      }
    ],
    exportSettings: {
      includeVariations: true,
      includeComments: true,
      includeEvaluations: true,
      format: 'PDF'
    }
  }
]

/**
 * Sample game collections
 */
export const mockGameCollections: GameCollection[] = [
  {
    id: 'collection-1',
    name: 'Training Games vs Bots',
    description: 'Games played against AI opponents for training purposes',
    gameIds: ['game-1', 'game-2'],
    tags: ['Training', 'AI Opponents', 'Improvement'],
    createdAt: Date.now() - 604800000, // 1 week ago
    updatedAt: Date.now() - 86400000, // 1 day ago
    stats: {
      totalGames: 2,
      averageAccuracy: 74.8,
      averageRating: 1650,
      mostCommonOpenings: ['Ruy Lopez', 'Queen\'s Gambit Declined'],
      improvementAreas: ['Tactics', 'Time Management', 'Opening Theory']
    },
    sharing: {
      isPublic: false,
      allowComments: false,
      allowDownload: false
    }
  },
  {
    id: 'collection-2',
    name: 'Blitz Training Sessions',
    description: 'Fast-paced games for improving quick decision making',
    gameIds: ['game-3'],
    tags: ['Blitz', 'Time Management', 'Quick Play'],
    createdAt: Date.now() - 345600000, // 4 days ago
    updatedAt: Date.now() - 259200000, // 3 days ago
    stats: {
      totalGames: 1,
      averageAccuracy: 63.2,
      averageRating: 1650,
      mostCommonOpenings: ['King\'s Indian Attack'],
      improvementAreas: ['Time Management', 'Tactical Vision', 'Blunder Prevention']
    },
    sharing: {
      isPublic: true,
      shareUrl: 'https://chesstraining.com/collections/blitz-training-sessions',
      allowComments: true,
      allowDownload: true
    }
  }
]

/**
 * Sample import history
 */
export const mockImportHistory: GameImport[] = [
  {
    source: 'PGN_File',
    gameData: '[Event "Training Game"]\n[Date "2025.08.27"]\n[White "Player"]\n[Black "Computer"]\n\n1. e4 e5 2. Nf3 Nc6',
    importedAt: Date.now() - 86400000,
    metadata: {
      filename: 'training_games_august.pgn',
      fileSize: 15432,
      gameCount: 3
    },
    validation: {
      isValid: true,
      errors: [],
      warnings: ['Missing some time control information'],
      gamesFound: 3,
      gamesImported: 3
    }
  },
  {
    source: 'Chess_Com',
    gameData: '{"games": [{"url": "https://chess.com/game/12345", "pgn": "..."}]}',
    importedAt: Date.now() - 172800000,
    metadata: {
      sourceUrl: 'https://api.chess.com/pub/player/chessplayer/games/2025/08',
      gameCount: 12
    },
    validation: {
      isValid: true,
      errors: [],
      warnings: [],
      gamesFound: 12,
      gamesImported: 12
    }
  },
  {
    source: 'Lichess',
    gameData: '[Event "Rated Blitz game"]\n[Site "https://lichess.org/abc123"]\n...',
    importedAt: Date.now() - 259200000,
    metadata: {
      sourceUrl: 'https://lichess.org/api/games/user/player?max=50',
      gameCount: 50
    },
    validation: {
      isValid: true,
      errors: [],
      warnings: ['Some games have incomplete time stamps'],
      gamesFound: 50,
      gamesImported: 48
    }
  }
]

/**
 * Get games by collection
 */
export const getGamesByCollection = (collectionId: string): GameReview[] => {
  const collection = mockGameCollections.find(c => c.id === collectionId)
  if (!collection) return []
  
  return mockGameReviews.filter(game => collection.gameIds.includes(game.id))
}

/**
 * Search games by query
 */
export const searchGames = (query: string): GameReview[] => {
  const searchTerm = query.toLowerCase()
  return mockGameReviews.filter(game => 
    game.gameInfo.white.toLowerCase().includes(searchTerm) ||
    game.gameInfo.black.toLowerCase().includes(searchTerm) ||
    game.opening.name.toLowerCase().includes(searchTerm) ||
    game.gameInfo.event.toLowerCase().includes(searchTerm) ||
    game.improvements.some(imp => imp.category.toLowerCase().includes(searchTerm))
  )
}

/**
 * Get recent games
 */
export const getRecentGames = (limit: number = 10): GameReview[] => {
  return [...mockGameReviews]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, limit)
}

/**
 * Get games with analysis completed
 */
export const getAnalyzedGames = (): GameReview[] => {
  return mockGameReviews.filter(game => game.analysisStatus === 'Completed')
}

/**
 * Get games needing analysis
 */
export const getGamesNeedingAnalysis = (): GameReview[] => {
  return mockGameReviews.filter(game => game.analysisStatus === 'Pending')
}

/**
 * Filter games by criteria
 */
export interface GameFilter {
  source?: string[]
  result?: string[]
  opponent?: string[]
  dateRange?: {
    start: number
    end: number
  }
  minAccuracy?: number
  maxAccuracy?: number
  openings?: string[]
}

export const filterGames = (filter: GameFilter): GameReview[] => {
  return mockGameReviews.filter(game => {
    // Source filter
    if (filter.source && !filter.source.includes(game.source)) return false
    
    // Result filter
    if (filter.result && !filter.result.includes(game.gameInfo.result)) return false
    
    // Date range filter
    if (filter.dateRange) {
      const gameDate = game.createdAt
      if (gameDate < filter.dateRange.start || gameDate > filter.dateRange.end) return false
    }
    
    // Accuracy filter
    const playerAccuracy = Math.max(
      game.performance.white.overallAccuracy,
      game.performance.black.overallAccuracy
    )
    if (filter.minAccuracy && playerAccuracy < filter.minAccuracy) return false
    if (filter.maxAccuracy && playerAccuracy > filter.maxAccuracy) return false
    
    // Opening filter
    if (filter.openings && !filter.openings.includes(game.opening.name)) return false
    
    return true
  })
}