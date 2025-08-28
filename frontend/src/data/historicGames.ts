/**
 * Historic Master Games Data
 * Contains mock data for famous chess games and players for the visual mockup
 */

import type { 
  MasterGame, 
  MasterPlayer, 
  Tournament, 
  ChessOpening, 
  MasterProfile,
  LibraryStats 
} from '@/types/masterGames'

/**
 * Famous chess masters data
 */
export const masterPlayers: Record<string, MasterPlayer> = {
  kasparov: {
    name: 'Garry Kasparov',
    rating: 2715,
    peakRating: 2851,
    country: 'USSR/Russia',
    birthYear: 1963,
    titles: ['GM', 'World Champion'],
    championshipYears: [1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000],
    biography: 'Considered by many to be the greatest chess player of all time. Known for his dynamic, aggressive style and deep opening preparation.',
    playingStyle: 'Dynamic, aggressive, excellent in complex positions',
    specialties: ['Opening preparation', 'Calculation', 'Attacking play', 'Endgame technique']
  },
  karpov: {
    name: 'Anatoly Karpov',
    rating: 2700,
    peakRating: 2780,
    country: 'USSR/Russia',
    birthYear: 1951,
    titles: ['GM', 'World Champion'],
    championshipYears: [1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984],
    biography: 'World Champion for 10 years, known for his positional mastery and endgame technique.',
    playingStyle: 'Positional, strategic, excellent endgame player',
    specialties: ['Positional play', 'Endgames', 'Strategic planning', 'Pawn structures']
  },
  fischer: {
    name: 'Bobby Fischer',
    rating: 2785,
    peakRating: 2785,
    country: 'USA',
    birthYear: 1943,
    titles: ['GM', 'World Champion'],
    championshipYears: [1972, 1973, 1974, 1975],
    biography: 'American chess prodigy who became World Champion in 1972, ending Soviet dominance.',
    playingStyle: 'Universal, perfect technique, fighting spirit',
    specialties: ['All phases', 'Perfect technique', 'Fighting spirit', 'Opening preparation']
  },
  spassky: {
    name: 'Boris Spassky',
    rating: 2660,
    peakRating: 2690,
    country: 'USSR/Russia',
    birthYear: 1937,
    titles: ['GM', 'World Champion'],
    championshipYears: [1969, 1970, 1971, 1972],
    biography: 'Soviet grandmaster known for his universal playing style and sportsmanship.',
    playingStyle: 'Universal, well-rounded, attacking when needed',
    specialties: ['Universal play', 'King\'s Gambit', 'Sharp positions', 'Endgame technique']
  },
  capablanca: {
    name: 'José Capablanca',
    rating: 2700,
    peakRating: 2725,
    country: 'Cuba',
    birthYear: 1888,
    titles: ['World Champion'],
    championshipYears: [1921, 1922, 1923, 1924, 1925, 1926, 1927],
    biography: 'Cuban chess master, considered one of the greatest natural talents in chess history.',
    playingStyle: 'Natural, intuitive, exceptional endgame technique',
    specialties: ['Endgames', 'Natural play', 'Simplification', 'Rook endgames']
  },
  marshall: {
    name: 'Frank Marshall',
    rating: 2650,
    peakRating: 2675,
    country: 'USA',
    birthYear: 1877,
    titles: ['US Champion'],
    biography: 'American chess master known for his tactical brilliance and the Marshall Attack.',
    playingStyle: 'Tactical, aggressive, inventive',
    specialties: ['Tactics', 'Sacrificial attacks', 'Marshall Attack', 'Combination play']
  },
  morphy: {
    name: 'Paul Morphy',
    rating: 2600,
    peakRating: 2650,
    country: 'USA',
    birthYear: 1837,
    titles: ['Unofficial World Champion'],
    biography: 'American chess prodigy, considered the first unofficial World Champion.',
    playingStyle: 'Brilliant tactical play, rapid development',
    specialties: ['Open games', 'Rapid development', 'Tactical brilliance', 'King hunts']
  },
  anderssen: {
    name: 'Adolf Anderssen',
    rating: 2580,
    peakRating: 2600,
    country: 'Germany',
    birthYear: 1818,
    titles: ['Leading player of his era'],
    biography: 'German chess master famous for his brilliant sacrificial games.',
    playingStyle: 'Romantic, sacrificial, brilliant combinations',
    specialties: ['Sacrificial play', 'Combinations', 'Open games', 'King attacks']
  },
  tal: {
    name: 'Mikhail Tal',
    rating: 2705,
    peakRating: 2720,
    country: 'USSR/Latvia',
    birthYear: 1936,
    titles: ['GM', 'World Champion'],
    championshipYears: [1960, 1961],
    biography: 'The "Magician from Riga", known for his incredible tactical vision and sacrificial style.',
    playingStyle: 'Tactical wizard, sacrificial, brilliant combinations',
    specialties: ['Tactics', 'Sacrifices', 'Complex positions', 'Intuitive play']
  },
  petrosian: {
    name: 'Tigran Petrosian',
    rating: 2680,
    peakRating: 2695,
    country: 'USSR/Armenia',
    birthYear: 1929,
    titles: ['GM', 'World Champion'],
    championshipYears: [1963, 1964, 1965, 1966, 1967, 1968, 1969],
    biography: 'Known as the "Iron Tigran" for his impeccable defensive style.',
    playingStyle: 'Defensive genius, prophylactic thinking',
    specialties: ['Defense', 'Prophylaxis', 'Exchange sacrifices', 'Positional play']
  }
}

/**
 * Famous tournaments and matches
 */
export const tournaments: Record<string, Tournament> = {
  worldChampionship1984: {
    name: 'World Championship Match',
    location: 'Moscow, USSR',
    year: 1984,
    date: '1984.09.10',
    type: 'World Championship',
    timeControl: 'Classical',
    playerCount: 2,
    significance: 'Karpov vs Kasparov - the beginning of their legendary rivalry'
  },
  worldChampionship1972: {
    name: 'World Championship Match (Game 6)',
    location: 'Reykjavik, Iceland',
    year: 1972,
    date: '1972.07.23',
    type: 'World Championship',
    timeControl: 'Classical',
    playerCount: 2,
    significance: 'Fischer vs Spassky - the match that captured the world\'s attention'
  },
  newYork1909: {
    name: 'New York Tournament',
    location: 'New York, USA',
    year: 1909,
    date: '1909.01.15',
    type: 'Invitational',
    timeControl: 'Classical',
    significance: 'One of the strongest tournaments of the early 20th century'
  },
  london1851: {
    name: 'London Tournament',
    location: 'London, England',
    year: 1851,
    type: 'Invitational',
    timeControl: 'Classical',
    significance: 'The first international chess tournament'
  },
  candidates1959: {
    name: 'Candidates Tournament',
    location: 'Yugoslavia',
    year: 1959,
    type: 'Candidates',
    timeControl: 'Classical',
    significance: 'Tal\'s brilliant performance en route to the World Championship'
  },
  worldChampionship1966: {
    name: 'World Championship Match',
    location: 'Moscow, USSR',
    year: 1966,
    type: 'World Championship',
    timeControl: 'Classical',
    significance: 'Petrosian\'s defensive masterclass'
  }
}

/**
 * Chess openings featured in master games
 */
export const openings: Record<string, ChessOpening> = {
  sicilianNajdorf: {
    name: 'Sicilian Defense: Najdorf Variation',
    eco: 'B90',
    moves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'a6'],
    category: 'Sicilian Defense',
    variation: 'Najdorf Variation',
    characteristics: ['Sharp', 'Complex', 'Tactical', 'Imbalanced'],
    themes: ['King safety', 'Pawn storms', 'Piece activity', 'Central control'],
    popularity: 9
  },
  ruyLopezMarshall: {
    name: 'Ruy Lopez: Marshall Attack',
    eco: 'C89',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6', 'O-O', 'Be7', 'Re1', 'b5', 'Bb3', 'O-O', 'c3', 'd5'],
    category: 'Ruy Lopez',
    variation: 'Marshall Attack',
    characteristics: ['Sacrificial', 'Sharp', 'Theoretical', 'Dynamic'],
    themes: ['Piece activity', 'King attack', 'Compensation', 'Initiative'],
    popularity: 8
  },
  queensGambit: {
    name: 'Queen\'s Gambit Declined: Tartakower Defense',
    eco: 'D59',
    moves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Be7', 'e3', 'O-O'],
    category: 'Queen\'s Gambit',
    variation: 'Tartakower Defense',
    characteristics: ['Solid', 'Strategic', 'Classical', 'Balanced'],
    themes: ['Central tension', 'Piece development', 'Pawn structure', 'Long-term planning'],
    popularity: 7
  },
  immortalGame: {
    name: 'King\'s Gambit Accepted',
    eco: 'C33',
    moves: ['e4', 'e5', 'f4', 'exf4', 'Bc4', 'Qh4+', 'Kf1', 'b5'],
    category: 'King\'s Gambit',
    variation: 'Accepted',
    characteristics: ['Romantic', 'Tactical', 'Sacrificial', 'Sharp'],
    themes: ['King safety', 'Development', 'Initiative', 'Tactics'],
    popularity: 5
  },
  frenchTarrasch: {
    name: 'French Defense: Tarrasch Variation',
    eco: 'C06',
    moves: ['e4', 'e6', 'd4', 'd5', 'Nd2', 'Nf6', 'e5', 'Nfd7', 'Bd3', 'c5', 'c3', 'Nc6'],
    category: 'French Defense',
    variation: 'Tarrasch Variation',
    characteristics: ['Strategic', 'Pawn chains', 'Space advantage', 'Long-term'],
    themes: ['Pawn structures', 'Bishop pair', 'King safety', 'Piece coordination'],
    popularity: 6
  }
}

/**
 * Famous master games with complete analysis
 */
export const masterGames: MasterGame[] = [
  {
    id: 'kasparov_karpov_1984_game32',
    white: masterPlayers.kasparov,
    black: masterPlayers.karpov,
    tournament: tournaments.worldChampionship1984,
    result: '1-0',
    opening: openings.sicilianNajdorf,
    pgn: '1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 a6 6.Be3 e6 7.f3 b5 8.Qd2 Bb7 9.O-O-O Nbd7 10.h4 b4 11.Nd5 exd5 12.exd5 Ne5 13.Kb1 Rc8 14.f4 Nc4 15.Bxc4 Rxc4 16.f5 Qc7 17.Rhe1+ Be7 18.Qf2 O-O 19.g4 Rfc8 20.g5 Nh5 21.Qh4 Ng3 22.Re2 Qc5 23.f6 gxf6 24.gxf6 Bf8 25.Rg2 Ne4 26.Nf5 Rc1+ 27.Rxc1 Qxc1+ 28.Ka2 Qc4+ 29.Kb1 Qc1+ 30.Ka2 Qc4+ 31.b3 Qc3 32.Nh6+ Bxh6 33.Qxh6 Ng5 34.h5 1-0',
    annotations: [
      {
        moveNumber: 11,
        san: 'Nd5',
        comment: 'The critical moment. Kasparov sacrifices material for a powerful attack. This exchange sacrifice demonstrates deep calculation and positional understanding.',
        assessment: '!!',
        evaluation: 0.5,
        isKeyMoment: true,
        themes: ['Sacrifice', 'Initiative', 'Piece activity'],
        alternatives: ['Ne2', 'Nce2']
      },
      {
        moveNumber: 15,
        san: 'Bxc4',
        comment: 'Brilliant! White\'s pieces coordinate perfectly in the attack. The bishop sacrifice opens crucial lines.',
        assessment: '!',
        isKeyMoment: true,
        themes: ['Piece coordination', 'King attack', 'Open lines']
      },
      {
        moveNumber: 26,
        san: 'Nf5',
        comment: 'The decisive blow. Black cannot defend against the mating attack. This knight move threatens multiple tactical motifs.',
        assessment: '!!',
        isKeyMoment: true,
        themes: ['Mating attack', 'Knight fork', 'Multiple threats']
      },
      {
        moveNumber: 32,
        san: 'Nh6+',
        comment: 'Spectacular finish! The queen sacrifice forces mate. This is one of the most beautiful conclusions in World Championship history.',
        assessment: '!!',
        evaluation: 5.0,
        isKeyMoment: true,
        themes: ['Queen sacrifice', 'Forced mate', 'Calculation']
      }
    ],
    keyMoments: [11, 15, 26, 32],
    analysis: {
      quality: 9.5,
      phases: {
        opening: {
          assessment: 'Good',
          keyMoves: [6, 7, 8],
          novelties: [11]
        },
        middlegame: {
          assessment: 'Excellent',
          keyMoves: [11, 15, 26, 32],
          tacticalMotifs: ['Exchange sacrifice', 'Piece coordination', 'Mating attack']
        }
      },
      strategicThemes: ['Initiative', 'Piece activity', 'King attack', 'Sacrificial play'],
      tacticalThemes: ['Exchange sacrifice', 'Mating attack', 'Pin', 'Fork', 'Deflection'],
      educationalValue: 10,
      learningObjectives: [
        'Understanding exchange sacrifices for initiative',
        'Coordinating pieces in attack',
        'Calculating complex tactical sequences',
        'Converting advantage in sharp positions'
      ],
      studyRecommendations: [
        'Practice tactical puzzles with similar themes',
        'Study other Kasparov attacking games',
        'Learn the Najdorf Variation principles',
        'Analyze similar exchange sacrifices'
      ],
      historicalSignificance: 'This game from the legendary Kasparov-Karpov rivalry showcases the fighting spirit that defined their matches.',
      quotes: [
        {
          text: 'This game perfectly demonstrates the art of the exchange sacrifice.',
          author: 'Garry Kasparov'
        }
      ]
    },
    moveCount: 34,
    duration: '4h 30min',
    isBookmarked: false,
    studyProgress: {
      viewed: false,
      analyzed: false,
      practiced: false
    }
  },
  {
    id: 'fischer_spassky_1972_game6',
    white: masterPlayers.fischer,
    black: masterPlayers.spassky,
    tournament: tournaments.worldChampionship1972,
    result: '1-0',
    opening: openings.queensGambit,
    pgn: '1.c4 e6 2.Nf3 d5 3.d4 Nf6 4.Nc3 Be7 5.Bg5 O-O 6.e3 h6 7.Bh4 b6 8.cxd5 Nxd5 9.Bxe7 Qxe7 10.Nxd5 exd5 11.Rc1 Be6 12.Qa4 c5 13.Qa3 Rc8 14.Bb5 a6 15.dxc5 bxc5 16.O-O Ra7 17.Be2 Nd7 18.Nd4 Qf6 19.Nxe6 Qxe6 20.e4 d4 21.f4 Qe7 22.e5 Rb8 23.Bc4 Kh8 24.Qh3 Nf8 25.b3 a5 26.f5 Re8 27.Qg3 Ra6 28.h4 Qd7 29.e6 Rxe6 30.fxe6 Qxe6 31.Rce1 Qd6 32.Qg5 Re8 33.Rxe8 Nxe8 34.Re1 Nf6 35.Re8+ Kh7 36.Qf5+ Kg8 37.Re7 Qd1+ 38.Kh2 Qd2 39.Qg5 Qf2 40.Qxf6 Qf1 41.Qg5 Qf2 42.Re2 1-0',
    annotations: [
      {
        moveNumber: 20,
        san: 'e4',
        comment: 'Fischer\'s breakthrough! The pawn advance creates tremendous pressure and opens the position for White\'s pieces.',
        assessment: '!',
        isKeyMoment: true,
        themes: ['Pawn break', 'Central control', 'Space advantage']
      },
      {
        moveNumber: 25,
        san: 'b3',
        comment: 'Brilliant positional play. Fischer gradually improves his position while maintaining the initiative.',
        assessment: '!',
        isKeyMoment: true,
        themes: ['Positional play', 'Pawn structure', 'Long-term planning']
      },
      {
        moveNumber: 29,
        san: 'e6',
        comment: 'The decisive pawn break! This move opens up the position completely and creates unstoppable threats.',
        assessment: '!!',
        isKeyMoment: true,
        themes: ['Pawn break', 'Opening lines', 'Decisive advantage']
      },
      {
        moveNumber: 37,
        san: 'Re7',
        comment: 'Rook to the 7th rank - the beginning of the final assault. Fischer\'s technique in the endgame is flawless.',
        assessment: '!',
        isKeyMoment: true,
        themes: ['Rook on 7th', 'Endgame technique', 'Active pieces']
      }
    ],
    keyMoments: [20, 25, 29, 37],
    analysis: {
      quality: 9.7,
      phases: {
        opening: {
          assessment: 'Good',
          keyMoves: [8, 10, 12]
        },
        middlegame: {
          assessment: 'Excellent',
          keyMoves: [20, 25, 29],
          tacticalMotifs: ['Pawn break', 'Piece activity', 'Space advantage']
        },
        endgame: {
          assessment: 'Excellent',
          keyMoves: [37, 39, 42],
          technique: 'Perfect endgame conversion'
        }
      },
      strategicThemes: ['Positional play', 'Pawn breaks', 'Endgame technique', 'Space advantage'],
      tacticalThemes: ['Pawn breaks', 'Pin', 'Active pieces', 'Rook on 7th'],
      educationalValue: 10,
      learningObjectives: [
        'Understanding pawn breaks in the center',
        'Converting slight advantages',
        'Endgame technique with active pieces',
        'Long-term positional planning'
      ],
      studyRecommendations: [
        'Study Fischer\'s endgame technique',
        'Practice pawn break timing',
        'Learn Queen\'s Gambit structures',
        'Analyze similar positional masterpieces'
      ],
      historicalSignificance: 'Game 6 of the 1972 World Championship, showing Fischer\'s positional mastery.',
      quotes: [
        {
          text: 'This game shows Fischer at his positional best.',
          author: 'Boris Spassky'
        }
      ]
    },
    moveCount: 42,
    duration: '5h 15min',
    isBookmarked: true,
    studyProgress: {
      viewed: true,
      analyzed: false,
      practiced: false
    }
  },
  {
    id: 'capablanca_marshall_1909',
    white: masterPlayers.capablanca,
    black: masterPlayers.marshall,
    tournament: tournaments.newYork1909,
    result: '1-0',
    opening: openings.ruyLopezMarshall,
    pgn: '1.e4 e5 2.Nf3 Nc6 3.Bb5 a6 4.Ba4 Nf6 5.O-O Be7 6.Re1 b5 7.Bb3 O-O 8.c3 d5 9.exd5 Nxd5 10.Nxe5 Nxe5 11.Rxe5 c6 12.d3 Bd6 13.Re1 Qh4 14.g3 Qh3 15.Be3 Bg4 16.Qd2 Rae8 17.Nd2 Re6 18.a4 Qh5 19.axb5 axb5 20.Qc2 Ref6 21.Nf1 Rxf2 22.Qxf2 Rxf2 23.Kxf2 Qh2+ 24.Kf3 Qh1+ 25.Kg4 Qh4+ 26.Kf5 Qf6+ 27.Kg4 h5+ 28.Kf5 Qg6+ 29.Ke4 Qg2+ 30.Kd4 Qf2+ 31.Kc4 Qf5 32.Kb4 Qd3 33.Kxb5 Qc2 34.Ka4 Qb1 35.Ka3 Qc1+ 36.Ka2 Qc2 37.Ka1 Nc3 38.bxc3 Qxc3+ 39.Ka2 Qc2+ 40.Ka3 Bd1+ 41.Ka4 Qc4+ 42.Ka5 Qc5+ 43.Ka4 Bb3+ 44.Ka3 Qc1+ 45.Ka4 Qc4+ 46.Ka5 Bd1+ 47.Kb6 Qd4+ 48.Kc7 Qe5+ 49.Kd8 1-0',
    annotations: [
      {
        moveNumber: 8,
        san: 'd5',
        comment: 'The famous Marshall Attack! Black sacrifices a pawn for tremendous piece activity and attacking chances.',
        assessment: '!',
        isKeyMoment: true,
        themes: ['Gambit', 'Initiative', 'Piece activity', 'Compensation']
      },
      {
        moveNumber: 13,
        san: 'Qh4',
        comment: 'Marshall\'s brilliant concept - rapid piece development with attacking chances against the white king.',
        assessment: '!',
        isKeyMoment: true,
        themes: ['King attack', 'Quick development', 'Tactical threats']
      },
      {
        moveNumber: 21,
        san: 'Rxf2',
        comment: 'Double rook sacrifice! One of the most famous combinations in chess history, showing Marshall\'s tactical genius.',
        assessment: '!!',
        evaluation: -2.0,
        isKeyMoment: true,
        themes: ['Double sacrifice', 'Tactics', 'Desperation', 'Calculation']
      },
      {
        moveNumber: 48,
        san: 'Kc7',
        comment: 'Capablanca\'s king march decides the game. Incredible technique under pressure shows his endgame mastery.',
        assessment: '!',
        isKeyMoment: true,
        themes: ['King activity', 'Endgame technique', 'Precise calculation']
      }
    ],
    keyMoments: [8, 13, 21, 48],
    analysis: {
      quality: 9.8,
      phases: {
        opening: {
          assessment: 'Excellent',
          keyMoves: [8, 10, 13],
          novelties: [8]
        },
        middlegame: {
          assessment: 'Excellent',
          keyMoves: [21, 22, 23],
          tacticalMotifs: ['Double sacrifice', 'King hunt', 'Perpetual check']
        },
        endgame: {
          assessment: 'Excellent',
          keyMoves: [48, 49],
          technique: 'King and minor piece endgame mastery'
        }
      },
      strategicThemes: ['Sacrifice for initiative', 'King safety vs activity', 'Endgame technique'],
      tacticalThemes: ['Double sacrifice', 'King hunt', 'Perpetual check', 'Stalemate tricks'],
      educationalValue: 10,
      learningObjectives: [
        'Understanding the Marshall Attack principles',
        'Evaluating sacrifices for initiative',
        'King and minor piece endgames',
        'Defending against tactical onslaughts'
      ],
      studyRecommendations: [
        'Study the Marshall Attack theory',
        'Practice similar tactical sacrifices',
        'Learn Capablanca\'s endgame technique',
        'Understand compensation evaluation'
      ],
      historicalSignificance: 'One of the most famous games in chess history, introducing the Marshall Attack.',
      quotes: [
        {
          text: 'I prefer to lose a really good game than to win a bad one.',
          author: 'Frank Marshall'
        }
      ]
    },
    moveCount: 49,
    duration: '6h 45min',
    isBookmarked: true,
    studyProgress: {
      viewed: true,
      analyzed: true,
      practiced: false
    }
  },
  {
    id: 'anderssen_kieseritzky_1851',
    white: masterPlayers.anderssen,
    black: { ...masterPlayers.marshall, name: 'Lionel Kieseritzky', rating: 2500 },
    tournament: tournaments.london1851,
    result: '1-0',
    opening: openings.immortalGame,
    pgn: '1.e4 e5 2.f4 exf4 3.Bc4 Qh4+ 4.Kf1 b5 5.Bxb5 Nf6 6.Nf3 Qh6 7.d3 Nh5 8.Nh4 Qg5 9.Nf5 c6 10.g4 Nf6 11.Rg1 cxb5 12.h4 Qg6 13.h5 Qg5 14.Qf3 Ng8 15.Bxf4 Qf6 16.Nc3 Bc5 17.Nd5 Qxb2 18.Bd6 Bxg1 19.e5 Qxa1+ 20.Ke2 Na6 21.Nxg7+ Kd8 22.Qf6+ Nxf6 23.Be7# 1-0',
    annotations: [
      {
        moveNumber: 18,
        san: 'Bd6',
        comment: 'The beginning of one of the most beautiful combinations in chess history. White sacrifices his rook to continue the attack.',
        assessment: '!!',
        isKeyMoment: true,
        themes: ['Rook sacrifice', 'Mating attack', 'Beautiful combination']
      },
      {
        moveNumber: 21,
        san: 'Nxg7+',
        comment: 'Spectacular knight sacrifice! The "Immortal Game" reaches its climactic moment.',
        assessment: '!!',
        isKeyMoment: true,
        themes: ['Knight sacrifice', 'King exposure', 'Forced mate']
      },
      {
        moveNumber: 22,
        san: 'Qf6+',
        comment: 'The queen sacrifice that forces mate! One of the most famous moves in chess history.',
        assessment: '!!',
        isKeyMoment: true,
        themes: ['Queen sacrifice', 'Forced mate', 'Deflection']
      },
      {
        moveNumber: 23,
        san: 'Be7#',
        comment: 'Checkmate! The immortal game concludes with this beautiful quiet bishop move delivering mate.',
        assessment: '!!',
        isKeyMoment: true,
        themes: ['Quiet mate', 'Bishop mate', 'Beautiful finish']
      }
    ],
    keyMoments: [18, 21, 22, 23],
    analysis: {
      quality: 10,
      phases: {
        opening: {
          assessment: 'Good',
          keyMoves: [2, 3, 4]
        },
        middlegame: {
          assessment: 'Excellent',
          keyMoves: [18, 21, 22, 23],
          tacticalMotifs: ['Multiple sacrifices', 'Mating attack', 'King hunt']
        }
      },
      strategicThemes: ['Sacrificial attack', 'King safety', 'Development vs material', 'Romantic chess'],
      tacticalThemes: ['Multiple sacrifices', 'Mating attack', 'Deflection', 'Quiet moves'],
      educationalValue: 10,
      learningObjectives: [
        'Understanding sacrificial attacks',
        'Value of piece activity over material',
        'Calculating mating attacks',
        'Appreciating chess as art'
      ],
      studyRecommendations: [
        'Study other romantic era games',
        'Practice tactical combinations',
        'Learn about piece activity principles',
        'Understand the King\'s Gambit'
      ],
      historicalSignificance: 'The "Immortal Game" - one of the most famous games in chess history, epitomizing the romantic era of chess.',
      quotes: [
        {
          text: 'The most beautiful game ever played.',
          author: 'Chess historians'
        }
      ]
    },
    moveCount: 23,
    duration: '3h 30min',
    isBookmarked: true,
    studyProgress: {
      viewed: true,
      analyzed: true,
      practiced: true,
      lastViewedAt: Date.now() - 86400000
    }
  },
  {
    id: 'tal_najdorf_1961',
    white: masterPlayers.tal,
    black: { ...masterPlayers.marshall, name: 'Miguel Najdorf', rating: 2650 },
    tournament: { ...tournaments.candidates1959, year: 1961, name: 'Bled Tournament' },
    result: '1-0',
    opening: openings.sicilianNajdorf,
    pgn: '1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 a6 6.Bg5 e6 7.f4 Qb6 8.Qd2 Qxb2 9.Rb1 Qa3 10.e5 h6 11.Bh4 dxe5 12.fxe5 Nfd7 13.Ne4 Qxa2 14.Rd1 Qd5 15.Qe3 Qxe5 16.Be2 Bc5 17.Bg3 Bxd4 18.Qxd4 Qxe2+ 19.Kf1 Qf3+ 20.Kg1 e5 21.Qd5 Qg4 22.h3 Qg6 23.Nd6+ Ke7 24.Nxc8+ Rxc8 25.Qxb7 Qg5 26.Rd7+ Ke8 27.Rxd7 1-0',
    annotations: [
      {
        moveNumber: 8,
        san: 'Qxb2',
        comment: 'Black accepts the poisoned pawn! This leads to sharp tactical complications typical of Tal\'s games.',
        assessment: '!?',
        isKeyMoment: true,
        themes: ['Poisoned pawn', 'Sharp play', 'Material vs development']
      },
      {
        moveNumber: 24,
        san: 'Nxc8+',
        comment: 'Tal\'s tactical genius shines through! This knight sacrifice leads to a winning attack.',
        assessment: '!!',
        isKeyMoment: true,
        themes: ['Knight sacrifice', 'King attack', 'Tactical vision']
      },
      {
        moveNumber: 26,
        san: 'Rd7+',
        comment: 'The decisive rook lift! Black\'s king has nowhere to hide from the attack.',
        assessment: '!',
        isKeyMoment: true,
        themes: ['Rook lift', 'King hunt', 'Decisive attack']
      }
    ],
    keyMoments: [8, 24, 26],
    analysis: {
      quality: 9.3,
      phases: {
        opening: {
          assessment: 'Excellent',
          keyMoves: [7, 8, 10],
          novelties: [8]
        },
        middlegame: {
          assessment: 'Excellent',
          keyMoves: [24, 26, 27],
          tacticalMotifs: ['Knight sacrifice', 'King attack', 'Rook activity']
        }
      },
      strategicThemes: ['Initiative vs material', 'King attack', 'Piece activity', 'Sharp play'],
      tacticalThemes: ['Knight sacrifice', 'Pin', 'Fork', 'King hunt'],
      educationalValue: 9,
      learningObjectives: [
        'Understanding sharp tactical play',
        'Evaluating material vs initiative',
        'Tal\'s attacking style',
        'Sicilian Defense complications'
      ],
      studyRecommendations: [
        'Study Tal\'s tactical games',
        'Practice sharp Sicilian positions',
        'Learn about initiative evaluation',
        'Understand piece sacrifice principles'
      ],
      historicalSignificance: 'Showcases Tal\'s incredible tactical vision and attacking prowess.',
      quotes: [
        {
          text: 'You must take your opponent into a deep dark forest where 2+2=5.',
          author: 'Mikhail Tal'
        }
      ]
    },
    moveCount: 27,
    duration: '4h 15min',
    isBookmarked: false,
    studyProgress: {
      viewed: false,
      analyzed: false,
      practiced: false
    }
  },
  {
    id: 'petrosian_spassky_1966',
    white: masterPlayers.petrosian,
    black: masterPlayers.spassky,
    tournament: tournaments.worldChampionship1966,
    result: '1/2-1/2',
    opening: openings.frenchTarrasch,
    pgn: '1.e4 e6 2.d4 d5 3.Nd2 Nf6 4.e5 Nfd7 5.Bd3 c5 6.c3 Nc6 7.Ne2 cxd4 8.cxd4 f6 9.exf6 Nxf6 10.Nf3 Bd6 11.O-O Qc7 12.Nc3 a6 13.Re1 b5 14.a3 Bb7 15.Qe2 O-O 16.Bg5 Rae8 17.Rac1 Qd8 18.h4 h6 19.Bh4 Rc8 20.Bg3 Bxg3 21.fxg3 Qb6 22.Kh1 Ne4 23.Nxe4 dxe4 24.Bxe4 Nxd4 25.Nxd4 Bxe4 26.Red1 Rfd8 27.Qe3 Qxd4 28.Qxd4 Rxd4 29.Rxd4 Rc1+ 30.Kh2 Rc2 31.b4 Ra2 32.Rc4 Bd3 33.Rc7 Rxa3 34.Rc3 Ra2 35.Rc2 Ra3 36.Rc3 Ra2 37.Rc2 1/2-1/2',
    annotations: [
      {
        moveNumber: 18,
        san: 'h4',
        comment: 'Petrosian\'s prophylactic thinking! This subtle move prevents Black\'s kingside expansion.',
        assessment: '!',
        isKeyMoment: true,
        themes: ['Prophylaxis', 'Prevention', 'Subtle play']
      },
      {
        moveNumber: 24,
        san: 'Nxd4',
        comment: 'Spassky finds the equalizing sequence, leading to a simplified position.',
        assessment: '!',
        isKeyMoment: true,
        themes: ['Simplification', 'Equality', 'Central control']
      },
      {
        moveNumber: 32,
        san: 'Rc4',
        comment: 'Precise defense by Petrosian. The rook finds the optimal square to hold the position.',
        assessment: '!',
        isKeyMoment: false,
        themes: ['Precise defense', 'Rook activity', 'Endgame technique']
      }
    ],
    keyMoments: [18, 24, 32],
    analysis: {
      quality: 8.5,
      phases: {
        opening: {
          assessment: 'Good',
          keyMoves: [4, 6, 8]
        },
        middlegame: {
          assessment: 'Good',
          keyMoves: [18, 24, 26],
          tacticalMotifs: ['Simplification', 'Prophylaxis', 'Piece exchanges']
        },
        endgame: {
          assessment: 'Excellent',
          keyMoves: [32, 35, 37],
          technique: 'Perfect defensive technique'
        }
      },
      strategicThemes: ['Prophylactic thinking', 'Defensive technique', 'Pawn structures', 'Simplification'],
      tacticalThemes: ['Pin', 'Skewer', 'Simplification', 'Endgame precision'],
      educationalValue: 8,
      learningObjectives: [
        'Understanding prophylactic thinking',
        'Learning defensive techniques',
        'French Defense structures',
        'Rook endgame principles'
      ],
      studyRecommendations: [
        'Study Petrosian\'s defensive masterpieces',
        'Learn French Defense theory',
        'Practice prophylactic thinking',
        'Understand rook endgames'
      ],
      historicalSignificance: 'Shows Petrosian\'s defensive mastery and prophylactic style.',
      quotes: [
        {
          text: 'I am not afraid of any opponent, but I deeply respect every opponent.',
          author: 'Tigran Petrosian'
        }
      ]
    },
    moveCount: 37,
    duration: '5h 20min',
    isBookmarked: false,
    studyProgress: {
      viewed: false,
      analyzed: false,
      practiced: false
    }
  }
]

/**
 * Master profiles with detailed information
 */
export const masterProfiles: Record<string, MasterProfile> = {
  kasparov: {
    ...masterPlayers.kasparov,
    photoUrl: '/images/masters/kasparov.jpg',
    fullBiography: 'Garry Kimovich Kasparov is a Russian chess grandmaster, former World Chess Champion, political activist, and writer. His tournament record is second to none, including six Chess Oscars, fifteen chess Informants, and eleven Grandmaster of the Year awards. He was ranked world No. 1 from 1984 until his retirement in 2005, and held the official FIDE World Championship from 1985 until 1993.',
    careerHighlights: [
      'Youngest World Champion at 22 (1985)',
      'Highest rated player in history (2851)',
      'Defeated Deep Blue in 1996',
      'Founded the Professional Chess Association',
      'Author of numerous chess books'
    ],
    famousGames: ['kasparov_karpov_1984_game32', 'kasparov_topalov_1999'],
    openingRepertoire: {
      asWhite: [openings.sicilianNajdorf, openings.queensGambit],
      asBlack: [openings.sicilianNajdorf, openings.frenchTarrasch]
    },
    careerStats: {
      totalGames: 2500,
      winRate: 65.2,
      drawRate: 28.5,
      lossRate: 6.3,
      averageOpponentRating: 2550,
      peakWorldRanking: 1
    },
    quotes: [
      {
        text: 'I have always felt that a player\'s style is one of the things that makes chess beautiful.',
        context: 'Interview about chess artistry',
        year: 1990
      }
    ],
    styleAnalysis: {
      aggression: 9,
      tacticalAbility: 10,
      positionalUnderstanding: 9,
      endgameSkill: 8,
      openingPreparation: 10,
      creativity: 10
    }
  }
}

/**
 * Library statistics for the mockup
 */
export const libraryStats: LibraryStats = {
  totalGames: 1247,
  gamesByCentury: {
    '19th': 156,
    '20th': 891,
    '21st': 200
  },
  gamesByOpening: {
    'Sicilian Defense': 324,
    'Ruy Lopez': 287,
    'Queen\'s Gambit': 198,
    'King\'s Indian': 156,
    'French Defense': 132,
    'Other': 150
  },
  gamesByResult: {
    '1-0': 587,
    '0-1': 542,
    '1/2-1/2': 118
  },
  averageRating: 2687,
  topPlayers: [
    { name: 'Garry Kasparov', gameCount: 89, winRate: 68.5 },
    { name: 'Anatoly Karpov', gameCount: 76, winRate: 64.2 },
    { name: 'Bobby Fischer', gameCount: 45, winRate: 72.1 },
    { name: 'Mikhail Tal', gameCount: 67, winRate: 69.3 },
    { name: 'José Capablanca', gameCount: 34, winRate: 78.4 }
  ],
  mostStudied: [
    { gameId: 'anderssen_kieseritzky_1851', studyCount: 2341 },
    { gameId: 'capablanca_marshall_1909', studyCount: 1876 },
    { gameId: 'fischer_spassky_1972_game6', studyCount: 1654 }
  ],
  themeDistribution: {
    'Tactics': 456,
    'Endgame': 298,
    'Sacrifice': 234,
    'Attack': 387,
    'Defense': 189,
    'Positional': 298,
    'Opening': 167
  },
  userStats: {
    gamesStudied: 23,
    totalStudyTime: 14580000, // 4h 3min in ms
    favoriteThemes: ['Tactics', 'Attack', 'Sacrifice'],
    averageStudyRating: 8.2
  }
}

/**
 * Utility functions for data manipulation
 */

export const getGamesByPlayer = (playerName: string): MasterGame[] => {
  return masterGames.filter(game => 
    game.white.name === playerName || game.black.name === playerName
  )
}

export const getGamesByOpening = (ecoCode: string): MasterGame[] => {
  return masterGames.filter(game => game.opening.eco === ecoCode)
}

export const getGamesByTheme = (theme: string): MasterGame[] => {
  return masterGames.filter(game => 
    game.analysis.strategicThemes.includes(theme) ||
    game.analysis.tacticalThemes.includes(theme)
  )
}

export const getTopRatedGames = (limit: number = 10): MasterGame[] => {
  return [...masterGames]
    .sort((a, b) => b.analysis.quality - a.analysis.quality)
    .slice(0, limit)
}

export const getGamesByDecade = (decade: number): MasterGame[] => {
  const startYear = decade * 10
  const endYear = startYear + 9
  return masterGames.filter(game => 
    game.tournament.year >= startYear && game.tournament.year <= endYear
  )
}

export const searchGames = (query: string): MasterGame[] => {
  const lowercaseQuery = query.toLowerCase()
  return masterGames.filter(game =>
    game.white.name.toLowerCase().includes(lowercaseQuery) ||
    game.black.name.toLowerCase().includes(lowercaseQuery) ||
    game.tournament.name.toLowerCase().includes(lowercaseQuery) ||
    game.opening.name.toLowerCase().includes(lowercaseQuery) ||
    game.opening.eco.toLowerCase().includes(lowercaseQuery) ||
    game.analysis.strategicThemes.some(theme => theme.toLowerCase().includes(lowercaseQuery)) ||
    game.analysis.tacticalThemes.some(theme => theme.toLowerCase().includes(lowercaseQuery))
  )
}