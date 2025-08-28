/**
 * Tutorial System Mock Data
 * 
 * Comprehensive mock data for the interactive learning tutorial interface.
 * Includes tutorials, series, progress tracking, and learning paths.
 */

import type { 
  Tutorial, 
  TutorialSeries, 
  TutorialFilters,
  TutorialProgress,
  TutorialAchievement,
  VideoTutorial,
  QuickStartGuide,
  TutorialStatistics
} from '@/types/tutorials'

// Mock Tutorial Data
export const mockTutorials: Tutorial[] = [
  {
    id: 'chess-basics',
    title: 'Chess Basics: How Pieces Move',
    description: 'Learn the fundamental movements of each chess piece with interactive demonstrations.',
    summary: 'Master the essential piece movements that form the foundation of all chess strategy.',
    category: 'basics',
    difficulty: 'Beginner',
    estimatedDuration: 15,
    steps: [],
    thumbnailUrl: '🏁',
    tags: ['basics', 'pieces', 'movement', 'foundation'],
    prerequisites: [],
    learningObjectives: [
      'Understand how each piece moves',
      'Learn special moves like castling and en passant',
      'Recognize legal and illegal moves'
    ],
    version: '1.0',
    createdAt: Date.now() - 86400000 * 30,
    updatedAt: Date.now() - 86400000 * 7,
    averageRating: 4.8,
    ratingCount: 2547,
    completionRate: 89,
    views: 15000,
    isFeatured: true,
    isNew: false,
    isRecommended: true,
    isUnlocked: true,
    relatedTutorials: ['opening-principles', 'basic-tactics']
  },
  {
    id: 'tactical-patterns',
    title: 'Common Tactical Patterns',
    description: 'Master the most important tactical motifs: pins, forks, skewers, and discovered attacks.',
    summary: 'Build your tactical awareness with the fundamental patterns every chess player must know.',
    category: 'tactics',
    difficulty: 'Intermediate',
    estimatedDuration: 30,
    steps: [],
    thumbnailUrl: '<Zap className="w-4 h-4 inline" />',
    tags: ['tactics', 'patterns', 'combinations', 'calculation'],
    prerequisites: ['chess-basics'],
    learningObjectives: [
      'Identify common tactical patterns',
      'Execute tactical combinations effectively',
      'Defend against tactical threats'
    ],
    version: '1.2',
    createdAt: Date.now() - 86400000 * 45,
    updatedAt: Date.now() - 86400000 * 3,
    averageRating: 4.9,
    ratingCount: 1823,
    completionRate: 76,
    views: 12500,
    isFeatured: true,
    isNew: false,
    isRecommended: true,
    isUnlocked: true,
    relatedTutorials: ['calculation-skills', 'advanced-tactics']
  },
  {
    id: 'opening-principles',
    title: 'Opening Principles Explained',
    description: 'Understand the key principles that guide strong opening play in every game.',
    summary: 'Learn the timeless principles that will improve your opening play immediately.',
    category: 'openings',
    difficulty: 'Beginner',
    estimatedDuration: 20,
    steps: [],
    thumbnailUrl: '<Target className="w-4 h-4 inline" />',
    tags: ['openings', 'principles', 'development', 'strategy'],
    prerequisites: ['chess-basics'],
    learningObjectives: [
      'Master the three opening principles',
      'Understand piece development priorities',
      'Avoid common opening mistakes'
    ],
    version: '1.1',
    createdAt: Date.now() - 86400000 * 20,
    updatedAt: Date.now() - 86400000 * 5,
    averageRating: 4.7,
    ratingCount: 3142,
    completionRate: 82,
    views: 8700,
    isFeatured: false,
    isNew: false,
    isRecommended: false,
    isUnlocked: true,
    relatedTutorials: ['specific-openings', 'middlegame-transition']
  },
  {
    id: 'endgame-basics',
    title: 'Essential Endgame Techniques',
    description: 'Learn the most important endgame positions every chess player must know.',
    summary: 'Master the crucial endgame knowledge that wins games and saves draws.',
    category: 'endgames',
    difficulty: 'Intermediate',
    estimatedDuration: 35,
    steps: [],
    thumbnailUrl: '<FaChessKing className="w-4 h-4 inline" />',
    tags: ['endgames', 'technique', 'theory', 'conversion'],
    prerequisites: ['chess-basics'],
    learningObjectives: [
      'Master basic mate patterns',
      'Understand key endgame principles',
      'Convert winning positions accurately'
    ],
    version: '1.3',
    createdAt: Date.now() - 86400000 * 60,
    updatedAt: Date.now() - 86400000 * 10,
    averageRating: 4.9,
    ratingCount: 1456,
    completionRate: 68,
    views: 6500,
    isFeatured: false,
    isNew: false,
    isRecommended: true,
    isUnlocked: true,
    relatedTutorials: ['advanced-endgames', 'practical-endgames']
  },
  {
    id: 'positional-play',
    title: 'Understanding Positional Chess',
    description: 'Develop your positional understanding with concrete examples and strategic concepts.',
    summary: 'Elevate your chess understanding beyond tactics with deep positional knowledge.',
    category: 'strategy',
    difficulty: 'Advanced',
    estimatedDuration: 40,
    steps: [],
    thumbnailUrl: '🎨',
    tags: ['strategy', 'positional', 'planning', 'structure'],
    prerequisites: ['tactical-patterns', 'opening-principles'],
    learningObjectives: [
      'Evaluate positions accurately',
      'Create and execute long-term plans',
      'Understand pawn structures'
    ],
    version: '1.0',
    createdAt: Date.now() - 86400000 * 25,
    updatedAt: Date.now() - 86400000 * 2,
    averageRating: 4.6,
    ratingCount: 892,
    completionRate: 71,
    views: 4200,
    isFeatured: false,
    isNew: true,
    isRecommended: false,
    unlockRequirements: {
      completedTutorials: ['tactical-patterns', 'opening-principles'],
      minimumRating: 4.0
    },
    isUnlocked: false,
    relatedTutorials: ['advanced-strategy', 'planning-concepts']
  },
  {
    id: 'calculation-skills',
    title: 'Improving Your Calculation',
    description: 'Systematic approach to calculating variations accurately and efficiently.',
    summary: 'Master the mental skills that separate good players from great ones.',
    category: 'tactics',
    difficulty: 'Expert',
    estimatedDuration: 50,
    steps: [],
    thumbnailUrl: '🧮',
    tags: ['calculation', 'visualization', 'analysis', 'precision'],
    prerequisites: ['tactical-patterns', 'positional-play'],
    learningObjectives: [
      'Calculate variations systematically',
      'Improve visualization skills',
      'Avoid calculation errors'
    ],
    version: '1.1',
    createdAt: Date.now() - 86400000 * 15,
    updatedAt: Date.now() - 86400000 * 1,
    averageRating: 4.8,
    ratingCount: 634,
    completionRate: 58,
    views: 3100,
    isFeatured: false,
    isNew: true,
    isRecommended: false,
    unlockRequirements: {
      completedTutorials: ['tactical-patterns'],
      minimumRating: 4.5
    },
    isUnlocked: false,
    relatedTutorials: ['advanced-tactics', 'master-calculation']
  }
]

// Mock Tutorial Series Data
export const mockTutorialSeries: TutorialSeries[] = [
  {
    id: 'complete-beginner',
    title: 'Complete Beginner Course',
    description: 'Everything you need to start your chess journey, from piece movements to basic strategy.',
    tutorials: ['chess-basics', 'opening-principles', 'basic-tactics', 'simple-endgames'],
    totalDuration: '2h 45m',
    level: 'Beginner',
    completed: 2,
    total: 8,
    thumbnail: '<GraduationCap className="w-4 h-4 inline" />',
    instructor: 'GM Sarah Chen',
    category: 'basics',
    isPopular: true
  },
  {
    id: 'tactical-mastery',
    title: 'Tactical Mastery Program',
    description: 'Comprehensive tactical training to sharpen your combinational vision.',
    tutorials: ['tactical-patterns', 'advanced-tactics', 'calculation-skills'],
    totalDuration: '4h 20m',
    level: 'Intermediate',
    completed: 1,
    total: 6,
    thumbnail: '<Zap className="w-4 h-4 inline" />',
    instructor: 'IM David Rodriguez',
    category: 'tactics',
    isPopular: true
  },
  {
    id: 'strategic-foundations',
    title: 'Strategic Chess Foundations',
    description: 'Build deep positional understanding and strategic thinking skills.',
    tutorials: ['positional-play', 'pawn-structures', 'piece-coordination'],
    totalDuration: '3h 15m',
    level: 'Advanced',
    completed: 0,
    total: 5,
    thumbnail: '🏛️',
    instructor: 'WGM Anna Petrov',
    category: 'strategy',
    isPopular: false
  }
]

// Tutorial Categories and Filters
export const tutorialCategories = ['All', 'Basics', 'Tactics', 'Openings', 'Endgames', 'Strategy', 'Skills']
export const tutorialLevels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert']
export const tutorialTypes = ['All', 'Video', 'Interactive', 'Article']

export const defaultTutorialFilters: TutorialFilters = {
  category: undefined,
  difficulty: undefined,
  status: undefined,
  maxDuration: undefined,
  tags: [],
  featuredOnly: false,
  newOnly: false,
  recommendedOnly: false,
  minRating: undefined,
  searchQuery: ''
}

// Mock Tutorial Progress Data
export const mockTutorialProgress: Record<string, TutorialProgress> = {
  'chess-basics': {
    tutorialId: 'chess-basics',
    status: 'completed',
    currentStepIndex: 8,
    completedSteps: [0, 1, 2, 3, 4, 5, 6, 7],
    skippedSteps: [],
    progressPercentage: 100,
    timeSpent: 18,
    startedAt: Date.now() - 86400000 * 10,
    lastAccessedAt: Date.now() - 86400000 * 8,
    completedAt: Date.now() - 86400000 * 8,
    userRating: 5,
    userFeedback: 'Excellent introduction to chess! Clear explanations and helpful examples.',
    restartCount: 0,
    quizScores: { 'step-3': 100, 'step-6': 90 },
    notes: 'Remember: control the center, develop pieces, castle early!'
  },
  'tactical-patterns': {
    tutorialId: 'tactical-patterns',
    status: 'in_progress',
    currentStepIndex: 5,
    completedSteps: [0, 1, 2, 3, 4],
    skippedSteps: [],
    progressPercentage: 65,
    timeSpent: 22,
    startedAt: Date.now() - 86400000 * 5,
    lastAccessedAt: Date.now() - 86400000 * 1,
    restartCount: 0,
    quizScores: { 'step-2': 85, 'step-4': 95 },
    notes: 'Pin patterns are tricky - need more practice with back rank weakness.'
  },
  'opening-principles': {
    tutorialId: 'opening-principles',
    status: 'completed',
    currentStepIndex: 6,
    completedSteps: [0, 1, 2, 3, 4, 5],
    skippedSteps: [],
    progressPercentage: 100,
    timeSpent: 23,
    startedAt: Date.now() - 86400000 * 12,
    lastAccessedAt: Date.now() - 86400000 * 9,
    completedAt: Date.now() - 86400000 * 9,
    userRating: 4,
    userFeedback: 'Good coverage of opening principles. Would like more specific examples.',
    restartCount: 0,
    quizScores: { 'step-1': 100, 'step-4': 90 }
  }
}

// Mock Tutorial Achievements
export const mockTutorialAchievements: TutorialAchievement[] = [
  {
    id: 'first_steps',
    name: 'First Steps',
    description: 'Complete your first tutorial',
    icon: '<Trophy className="w-4 h-4 inline" />',
    tier: 'bronze',
    points: 100,
    requirements: {
      totalTutorials: 1
    },
    isUnlocked: true,
    unlockedAt: Date.now() - 86400000 * 10,
    rarity: 95
  },
  {
    id: 'tactical_novice',
    name: 'Tactical Novice',
    description: 'Complete 3 tactical tutorials',
    icon: '<GiSwordsPower className="w-4 h-4 inline" />',
    tier: 'bronze',
    points: 250,
    requirements: {
      categoriesCompleted: ['tactics'],
      totalTutorials: 3
    },
    isUnlocked: false,
    rarity: 78
  },
  {
    id: 'perfect_score',
    name: 'Perfectionist',
    description: 'Get perfect scores on 5 tutorial quizzes',
    icon: '<Star className="w-4 h-4 inline" />',
    tier: 'silver',
    points: 500,
    requirements: {
      perfectScores: 5
    },
    isUnlocked: false,
    rarity: 45
  },
  {
    id: 'speed_learner',
    name: 'Speed Learner',
    description: 'Complete a tutorial in under 10 minutes',
    icon: '<Zap className="w-4 h-4 inline" />',
    tier: 'gold',
    points: 750,
    requirements: {
      timeConstraints: {
        maxTimePerTutorial: 10,
        tutorialCount: 1
      }
    },
    isUnlocked: false,
    rarity: 23
  }
]

// Mock Video Tutorials
export const mockVideoTutorials: Record<string, VideoTutorial> = {
  'chess-basics': {
    tutorialId: 'chess-basics',
    url: '/videos/chess-basics.mp4',
    title: 'Chess Basics: How Pieces Move',
    description: 'Complete guide to piece movements',
    thumbnailUrl: '/thumbnails/chess-basics.jpg',
    duration: 900, // 15 minutes
    qualities: [
      { resolution: '1080p', url: '/videos/chess-basics-1080p.mp4', bitrate: 5000 },
      { resolution: '720p', url: '/videos/chess-basics-720p.mp4', bitrate: 2500 },
      { resolution: '480p', url: '/videos/chess-basics-480p.mp4', bitrate: 1000 }
    ],
    subtitles: [
      { language: 'en', label: 'English', url: '/subtitles/chess-basics-en.vtt' },
      { language: 'es', label: 'Español', url: '/subtitles/chess-basics-es.vtt' }
    ],
    chapters: [
      { title: 'Introduction', startTime: 0, endTime: 60, description: 'Welcome and overview' },
      { title: 'Pawn Movement', startTime: 60, endTime: 180, description: 'How pawns move and capture' },
      { title: 'Piece Movement', startTime: 180, endTime: 480, description: 'Knight, bishop, rook movements' },
      { title: 'Royal Pieces', startTime: 480, endTime: 720, description: 'King and queen movements' },
      { title: 'Special Moves', startTime: 720, endTime: 900, description: 'Castling and en passant' }
    ],
    interactions: [
      {
        timestamp: 120,
        type: 'question',
        content: 'Can a pawn move backwards?',
        duration: 5
      },
      {
        timestamp: 300,
        type: 'highlight',
        content: 'Notice the L-shaped knight move',
        duration: 3
      }
    ]
  }
}

// Mock Quick Start Guides
export const mockQuickStartGuides: QuickStartGuide[] = [
  {
    id: 'absolute_beginner',
    title: 'Absolute Beginner Path',
    description: 'Never played chess? Start here!',
    targetUser: 'beginner',
    essentialTutorials: ['chess-basics', 'opening-principles', 'basic-tactics'],
    estimatedTime: 90,
    steps: [
      {
        title: 'Learn How Pieces Move',
        description: 'Master the fundamentals of piece movement',
        tutorialId: 'chess-basics',
        action: 'tutorial'
      },
      {
        title: 'Practice Against Computer',
        description: 'Apply what you learned in a real game',
        action: 'practice'
      },
      {
        title: 'Study Opening Principles',
        description: 'Learn how to start your games effectively',
        tutorialId: 'opening-principles',
        action: 'tutorial'
      }
    ],
    reward: {
      points: 500,
      achievement: 'first_steps',
      unlocks: ['intermediate_path']
    }
  }
]

// Mock Tutorial Statistics
export const mockTutorialStatistics: TutorialStatistics = {
  totalTutorials: 25,
  completedTutorials: 3,
  inProgressTutorials: 1,
  totalTimeSpent: 2.1, // hours
  averageCompletionRate: 76,
  favoriteCategory: 'tactics',
  achievementsUnlocked: 1,
  totalPoints: 350,
  learningStreak: 3,
  completionByCategory: {
    basics: { total: 5, completed: 2, percentage: 40 },
    interface: { total: 3, completed: 0, percentage: 0 },
    puzzles: { total: 4, completed: 0, percentage: 0 },
    analysis: { total: 2, completed: 0, percentage: 0 },
    openings: { total: 3, completed: 1, percentage: 33 },
    endgames: { total: 3, completed: 0, percentage: 0 },
    strategy: { total: 2, completed: 0, percentage: 0 },
    tactics: { total: 3, completed: 1, percentage: 33 },
    settings: { total: 1, completed: 0, percentage: 0 },
    features: { total: 1, completed: 0, percentage: 0 }
  },
  progressHistory: [
    {
      date: Date.now() - 86400000 * 7,
      tutorialsCompleted: 1,
      timeSpent: 18,
      points: 100
    },
    {
      date: Date.now() - 86400000 * 5,
      tutorialsCompleted: 1,
      timeSpent: 22,
      points: 150
    },
    {
      date: Date.now() - 86400000 * 3,
      tutorialsCompleted: 1,
      timeSpent: 23,
      points: 100
    }
  ],
  recentActivity: [
    {
      tutorialId: 'tactical-patterns',
      action: 'resumed',
      timestamp: Date.now() - 86400000 * 1
    },
    {
      tutorialId: 'opening-principles',
      action: 'completed',
      timestamp: Date.now() - 86400000 * 9
    },
    {
      tutorialId: 'chess-basics',
      action: 'completed',
      timestamp: Date.now() - 86400000 * 10
    }
  ]
}

// Tutorial Configuration
export const tutorialsConfig = {
  categories: tutorialCategories,
  levels: tutorialLevels,
  types: tutorialTypes,
  maxSearchResults: 50,
  autoplayNext: true,
  saveProgress: true,
  enableNotes: true,
  enableBookmarks: true,
  enableRatings: true,
  playbackRates: [0.5, 0.75, 1.0, 1.25, 1.5, 2.0],
  videoQualities: ['480p', '720p', '1080p']
}

// Utility functions for filtering and searching
export const filterTutorials = (tutorials: Tutorial[], filters: TutorialFilters): Tutorial[] => {
  return tutorials.filter(tutorial => {
    // Category filter
    if (filters.category && tutorial.category !== filters.category) {
      return false
    }
    
    // Difficulty filter
    if (filters.difficulty && tutorial.difficulty !== filters.difficulty) {
      return false
    }
    
    // Duration filter
    if (filters.maxDuration && tutorial.estimatedDuration > filters.maxDuration) {
      return false
    }
    
    // Rating filter
    if (filters.minRating && tutorial.averageRating < filters.minRating) {
      return false
    }
    
    // Featured only
    if (filters.featuredOnly && !tutorial.isFeatured) {
      return false
    }
    
    // New only
    if (filters.newOnly && !tutorial.isNew) {
      return false
    }
    
    // Recommended only
    if (filters.recommendedOnly && !tutorial.isRecommended) {
      return false
    }
    
    // Search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      const searchableText = [
        tutorial.title,
        tutorial.description,
        tutorial.summary,
        ...tutorial.tags
      ].join(' ').toLowerCase()
      
      if (!searchableText.includes(query)) {
        return false
      }
    }
    
    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some(tag => 
        tutorial.tags.some(tutorialTag => 
          tutorialTag.toLowerCase().includes(tag.toLowerCase())
        )
      )
      if (!hasMatchingTag) {
        return false
      }
    }
    
    return true
  })
}

export const searchTutorials = (tutorials: Tutorial[], query: string): Tutorial[] => {
  if (!query.trim()) return tutorials
  
  const searchQuery = query.toLowerCase()
  
  return tutorials
    .map(tutorial => {
      let score = 0
      const title = tutorial.title.toLowerCase()
      const description = tutorial.description.toLowerCase()
      const tags = tutorial.tags.join(' ').toLowerCase()
      
      // Title match (highest weight)
      if (title.includes(searchQuery)) score += 10
      
      // Description match
      if (description.includes(searchQuery)) score += 5
      
      // Tags match
      if (tags.includes(searchQuery)) score += 3
      
      // Exact tag match (bonus)
      if (tutorial.tags.some(tag => tag.toLowerCase() === searchQuery)) score += 5
      
      return { tutorial, score }
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.tutorial)
}