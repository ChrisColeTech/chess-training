import { Database } from '../utils/database';
import { v4 as uuidv4 } from 'uuid';

// Sample chess puzzles for POC
const puzzles = [
  // Beginner puzzles (1000-1200)
  {
    fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2',
    solution_moves: '["Nf3"]',
    themes: '["opening", "development"]',
    rating: 1000,
    description: 'Develop the knight to control the center'
  },
  {
    fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',
    solution_moves: '["Nxe5"]',
    themes: '["fork", "tactics"]',
    rating: 1100,
    description: 'White to play and win material'
  },
  {
    fen: 'rnbqkb1r/pppp1ppp/5n2/4p3/4P3/3P4/PPP2PPP/RNBQKBNR b KQkq - 0 3',
    solution_moves: '["Bb4+"]',
    themes: '["check", "pin"]',
    rating: 1150,
    description: 'Find the check that creates problems for White'
  },
  
  // Intermediate puzzles (1200-1400)
  {
    fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQ - 0 6',
    solution_moves: '["Nxe5", "Nxe5", "d4"]',
    themes: '["fork", "attack"]',
    rating: 1250,
    description: 'White to play and win material with a fork'
  },
  {
    fen: 'r2qkb1r/ppp2ppp/2np1n2/2b1p3/2B1P3/3P1N2/PPP1QPPP/RNB1K2R b KQkq - 2 6',
    solution_moves: '["Bxf2+"]',
    themes: '["sacrifice", "attack"]',
    rating: 1300,
    description: 'Black sacrifices the bishop for a strong attack'
  },
  {
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 4 4',
    solution_moves: '["Ng5"]',
    themes: '["attack", "weakSquare"]',
    rating: 1350,
    description: 'Target the weak f7 square'
  },
  
  // Advanced puzzles (1400-1600)
  {
    fen: 'r2q1rk1/ppp2ppp/2n1bn2/2bpp3/3PP3/2PB1N2/PP3PPP/RNBQ1RK1 w - - 0 8',
    solution_moves: '["Bxh7+", "Kxh7", "Ng5+"]',
    themes: '["sacrifice", "attack", "kingAttack"]',
    rating: 1450,
    description: 'Classic bishop sacrifice on h7'
  },
  {
    fen: 'r1bq1rk1/pp1n1ppp/2p1pn2/3p4/2PP4/P1N2N2/1P2PPPP/R1BQKB1R b KQ c3 0 7',
    solution_moves: '["dxc4"]',
    themes: '["capture", "space"]',
    rating: 1500,
    description: 'Capture to gain space and activity'
  },
  {
    fen: 'r1bqr1k1/pp1n1ppp/2p1pn2/3p4/2PP4/P1N2N2/1PQ1PPPP/R1B1KB1R w KQ - 1 9',
    solution_moves: '["Ne4"]',
    themes: '["centralization", "outpost"]',
    rating: 1550,
    description: 'Centralize the knight to a strong outpost'
  },
  
  // Expert puzzles (1600-1800)
  {
    fen: 'r2q1rk1/1pp2ppp/p1np1n2/2b1p3/2B1P3/2NP1N2/PPPQ1PPP/R3K2R w KQ - 0 9',
    solution_moves: '["Bxf7+", "Rxf7", "Qd8+"]',
    themes: '["sacrifice", "deflection", "backRank"]',
    rating: 1650,
    description: 'Deflect the rook to exploit the back rank'
  },
  {
    fen: '2rq1rk1/1p3ppp/p2p1n2/2pP4/4P3/2P2N2/PP1Q1PPP/R4RK1 w - c6 0 15',
    solution_moves: '["dxc6"]',
    themes: '["enPassant", "tactics"]',
    rating: 1700,
    description: 'En passant capture opens lines'
  },
  {
    fen: 'r3k2r/1pp2ppp/p1np1q2/4p3/2B1P3/2NP4/PPP2PPP/R2QK2R b KQkq - 0 10',
    solution_moves: '["Qf2+"]',
    themes: '["check", "fork"]',
    rating: 1750,
    description: 'Check and fork the king and rook'
  },
  
  // Master level puzzles (1800+)
  {
    fen: '2r2rk1/1p2qppp/p2p1n2/2pP4/4P3/2P1BN2/PP1Q1PPP/R4RK1 w - - 0 16',
    solution_moves: '["Bxh7+", "Nxh7", "Qd4"]',
    themes: '["sacrifice", "attack", "domination"]',
    rating: 1850,
    description: 'Sacrifice to dominate the dark squares'
  },
  {
    fen: 'r1bq1rk1/pp2nppp/2n1p3/2ppP3/3P4/2PB1N2/PP1N1PPP/R1BQK2R w KQ d6 0 10',
    solution_moves: '["exd6"]',
    themes: '["enPassant", "breakthrough"]',
    rating: 1900,
    description: 'En passant creates a passed pawn'
  },
  {
    fen: '1r3rk1/5ppp/p2p4/1p1Pp3/4P3/2P2P2/PP4PP/2KR3R w - b6 0 20',
    solution_moves: '["cxb6"]',
    themes: '["enPassant", "endgame"]',
    rating: 1950,
    description: 'En passant in the endgame'
  },
  
  // Checkmate puzzles
  {
    fen: 'rnb1kbnr/pppp1ppp/8/4p3/6Pq/5P2/PPPPP2P/RNBQKBNR w KQkq - 1 3',
    solution_moves: '["Qf3"]',
    themes: '["mateIn1", "defense"]',
    rating: 1200,
    description: 'Defend against mate in one'
  },
  {
    fen: '5rk1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1',
    solution_moves: '["Re8+"]',
    themes: '["mateIn1", "backRank"]',
    rating: 1300,
    description: 'Back rank mate in one'
  },
  {
    fen: '6k1/5ppp/8/8/8/8/5PPP/R6K w - - 0 1',
    solution_moves: '["Ra8+"]',
    themes: '["mateIn1", "backRank"]',
    rating: 1250,
    description: 'Simple back rank mate'
  },
  
  // Tactical themes
  {
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 4 4',
    solution_moves: '["Bxf7+"]',
    themes: '["sacrifice", "kingAttack"]',
    rating: 1400,
    description: 'Classical bishop sacrifice'
  },
  {
    fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 b - - 0 6',
    solution_moves: '["Nd4"]',
    themes: '["fork", "centralization"]',
    rating: 1500,
    description: 'Knight fork from the center'
  }
];

async function seedPuzzles() {
  try {
    console.log('Starting database seed...');
    
    const db = Database.getInstance();
    await db.connect();

    // Clear existing puzzles
    await db.db.run('DELETE FROM puzzle_attempts');
    await db.db.run('DELETE FROM puzzles');
    console.log('Cleared existing puzzles');

    // Insert sample puzzles
    for (const puzzle of puzzles) {
      const puzzleId = uuidv4();
      
      await db.db.run(`
        INSERT INTO puzzles (id, fen, solution_moves, themes, rating, description)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [
        puzzleId,
        puzzle.fen,
        puzzle.solution_moves,
        puzzle.themes,
        puzzle.rating,
        puzzle.description
      ]);
    }

    console.log(`✓ Successfully seeded ${puzzles.length} puzzles`);
    console.log('Puzzle ratings distribution:');
    
    const ratingCounts = await db.db.all(`
      SELECT 
        CASE 
          WHEN rating < 1200 THEN '1000-1199'
          WHEN rating < 1400 THEN '1200-1399'
          WHEN rating < 1600 THEN '1400-1599'
          WHEN rating < 1800 THEN '1600-1799'
          ELSE '1800+' 
        END as rating_range,
        COUNT(*) as count
      FROM puzzles 
      GROUP BY rating_range
      ORDER BY MIN(rating)
    `);
    
    ratingCounts.forEach((row: any) => {
      console.log(`  ${row.rating_range}: ${row.count} puzzles`);
    });

    console.log('Theme distribution:');
    const themes = puzzles.flatMap(p => JSON.parse(p.themes));
    const themeCounts = themes.reduce((acc, theme) => {
      acc[theme] = (acc[theme] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    Object.entries(themeCounts)
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .forEach(([theme, count]) => {
        console.log(`  ${theme}: ${count}`);
      });

    console.log('\n✓ Database seeded successfully!');
    console.log('You can now test the puzzle endpoints');
    
  } catch (error) {
    console.error('Failed to seed database:', error);
    process.exit(1);
  } finally {
    await Database.getInstance().close();
    process.exit(0);
  }
}

// Run the seed function
seedPuzzles();