export interface PuzzleCategory {
  id: string;
  name: string;
  description: string;
  difficulty: string;
  total: number;
  solved: number;
}

export const puzzleCategories: PuzzleCategory[] = [
  {
    id: 'tactics',
    name: 'Tactics',
    description: 'Basic tactical patterns and combinations',
    difficulty: 'beginner',
    total: 100,
    solved: 45
  },
  {
    id: 'endgame',
    name: 'Endgame',
    description: 'Essential endgame positions and techniques',
    difficulty: 'intermediate',
    total: 75,
    solved: 20
  },
  {
    id: 'opening',
    name: 'Opening Traps',
    description: 'Common opening traps and blunders',
    difficulty: 'intermediate',
    total: 60,
    solved: 30
  },
  {
    id: 'checkmate',
    name: 'Checkmate Patterns',
    description: 'Classic checkmate patterns and motifs',
    difficulty: 'beginner',
    total: 80,
    solved: 65
  },
  {
    id: 'advanced',
    name: 'Advanced Tactics',
    description: 'Complex tactical combinations',
    difficulty: 'advanced',
    total: 50,
    solved: 5
  }
];

// Helper functions for puzzle category functionality
export const getCategoryProgress = (categoryId: string): { solved: number; total: number } => {
  const category = puzzleCategories.find(c => c.id === categoryId);
  return category ? { solved: category.solved, total: category.total } : { solved: 0, total: 0 };
};

export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  if (hours > 0) {
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  } else {
    return `${remainingSeconds}s`;
  }
};

export default puzzleCategories;