/**
 * Related Tutorials Mock Data
 * Extracted from TutorialPlayer.tsx component
 */

export interface RelatedTutorial {
  id: string
  title: string
  duration: string
  thumbnail: string
  category?: string
}

export const relatedTutorials: RelatedTutorial[] = [
  { 
    id: '1', 
    title: 'Advanced Tactics', 
    duration: '25:30', 
    thumbnail: '<Zap className="w-4 h-4 inline" />',
    category: 'tactics'
  },
  { 
    id: '2', 
    title: 'Endgame Mastery', 
    duration: '32:15', 
    thumbnail: '<FaChessKing className="w-4 h-4 inline" />',
    category: 'endgame'
  },
  { 
    id: '3', 
    title: 'Strategic Play', 
    duration: '28:45', 
    thumbnail: '🎨',
    category: 'strategy'
  }
] as const