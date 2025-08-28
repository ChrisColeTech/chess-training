/**
 * Help Center Mock Data
 * Contains comprehensive mock data for help articles, FAQs, tutorials, and configuration
 */

import type { 
  HelpArticle, 
  FAQItem, 
  Tutorial, 
  CategoryInfo, 
  HelpCenterConfig,
  UserProgress,
  HelpCategory,
  ContentType,
  ArticleDifficulty
} from '@/types/helpCenter'


/**
 * Category definitions with metadata
 */
export const helpCategories: CategoryInfo[] = [
  {
    id: 'getting-started',
    name: 'Getting Started',
    description: 'Essential guides for new players to begin their chess journey',
    icon: 'RocketLaunch',
    color: 'from-blue-500 to-cyan-500',
    articleCount: 12,
    featuredArticles: ['welcome-guide', 'first-game', 'interface-tour'],
    isPopular: true,
    subcategories: [
      { id: 'account-setup', name: 'Account Setup', count: 4 },
      { id: 'basic-controls', name: 'Basic Controls', count: 5 },
      { id: 'first-steps', name: 'First Steps', count: 3 }
    ]
  },
  {
    id: 'gameplay',
    name: 'Gameplay',
    description: 'Master the fundamentals and advanced strategies of chess',
    icon: 'Chess',
    color: 'from-green-500 to-emerald-500',
    articleCount: 24,
    featuredArticles: ['basic-rules', 'piece-movement', 'checkmate-patterns'],
    isPopular: true,
    subcategories: [
      { id: 'rules', name: 'Rules & Basics', count: 8 },
      { id: 'strategy', name: 'Strategy', count: 10 },
      { id: 'tactics', name: 'Tactics', count: 6 }
    ]
  },
  {
    id: 'puzzles',
    name: 'Puzzle Training',
    description: 'Improve your tactical skills with our comprehensive puzzle system',
    icon: 'Puzzle',
    color: 'from-purple-500 to-violet-500',
    articleCount: 18,
    featuredArticles: ['puzzle-basics', 'tactical-themes', 'custom-puzzles'],
    isPopular: true,
    subcategories: [
      { id: 'tactical', name: 'Tactical Puzzles', count: 7 },
      { id: 'endgame', name: 'Endgame Puzzles', count: 6 },
      { id: 'opening', name: 'Opening Puzzles', count: 5 }
    ]
  },
  {
    id: 'training',
    name: 'Training & Study',
    description: 'Structured learning paths and advanced training tools',
    icon: 'GraduationCap',
    color: 'from-amber-500 to-orange-500',
    articleCount: 15,
    featuredArticles: ['study-plans', 'opening-explorer', 'analysis-board'],
    isPopular: true,
    subcategories: [
      { id: 'study-plans', name: 'Study Plans', count: 5 },
      { id: 'analysis', name: 'Analysis Tools', count: 6 },
      { id: 'library', name: 'Game Library', count: 4 }
    ]
  },
  {
    id: 'account',
    name: 'Account & Settings',
    description: 'Manage your profile, preferences, and account settings',
    icon: 'Gear',
    color: 'from-gray-500 to-slate-500',
    articleCount: 10,
    featuredArticles: ['profile-setup', 'privacy-settings', 'notifications'],
    isPopular: false,
    subcategories: [
      { id: 'profile', name: 'Profile Settings', count: 4 },
      { id: 'preferences', name: 'Preferences', count: 3 },
      { id: 'security', name: 'Security', count: 3 }
    ]
  },
  {
    id: 'technical',
    name: 'Technical Support',
    description: 'Technical help and system requirements',
    icon: 'Wrench',
    color: 'from-red-500 to-pink-500',
    articleCount: 8,
    featuredArticles: ['system-requirements', 'browser-support', 'performance'],
    isPopular: false,
    subcategories: [
      { id: 'requirements', name: 'Requirements', count: 3 },
      { id: 'compatibility', name: 'Compatibility', count: 3 },
      { id: 'optimization', name: 'Optimization', count: 2 }
    ]
  },
  {
    id: 'troubleshooting',
    name: 'Troubleshooting',
    description: 'Solutions to common problems and error messages',
    icon: 'Warning',
    color: 'from-yellow-500 to-amber-500',
    articleCount: 14,
    featuredArticles: ['common-issues', 'connection-problems', 'game-errors'],
    isPopular: true,
    subcategories: [
      { id: 'connection', name: 'Connection Issues', count: 5 },
      { id: 'game-issues', name: 'Game Issues', count: 6 },
      { id: 'ui-problems', name: 'Interface Problems', count: 3 }
    ]
  },
  {
    id: 'advanced',
    name: 'Advanced Features',
    description: 'Expert-level features and advanced customization options',
    icon: 'Zap',
    color: 'from-indigo-500 to-purple-500',
    articleCount: 9,
    featuredArticles: ['engine-analysis', 'custom-positions', 'api-access'],
    isPopular: false,
    subcategories: [
      { id: 'engines', name: 'Chess Engines', count: 3 },
      { id: 'customization', name: 'Customization', count: 4 },
      { id: 'integrations', name: 'Integrations', count: 2 }
    ]
  }
]

/**
 * Sample help articles with comprehensive content
 */
export const helpArticles: HelpArticle[] = [
  {
    id: 'welcome-guide',
    title: 'Welcome to Chess Training - Your Complete Getting Started Guide',
    description: 'Everything you need to know to begin your chess training journey, from creating your account to playing your first game.',
    content: `# Welcome to Chess Training!

Welcome to the premier chess training platform designed to elevate your game from beginner to master level. This comprehensive guide will walk you through everything you need to get started.

## What You'll Learn

- How to set up your training profile
- Understanding the interface and navigation
- Choosing your first training programs
- Setting achievable goals for improvement

## Quick Start Checklist

1. **Complete Your Profile**: Add your current skill level and chess goals
2. **Take the Skill Assessment**: Help us recommend the best training for you
3. **Explore Training Modes**: Try tactical puzzles, opening training, and endgame practice
4. **Set Your Schedule**: Create a consistent training routine

## Your Chess Journey Starts Here

Whether you're a complete beginner or looking to reach the next level, our adaptive training system will guide you every step of the way. Let's begin your transformation into a stronger chess player!

## Next Steps

After reading this guide, we recommend:
- Taking the quick skill assessment
- Trying a few tactical puzzles
- Exploring the opening trainer
- Joining a study plan that matches your level

Ready to become a chess master? Let's start training! 🚀`,
    category: 'getting-started',
    contentType: 'article',
    difficulty: 'beginner',
    tags: ['welcome', 'getting-started', 'guide', 'setup'],
    readingTime: 5,
    author: {
      name: 'Chess Training Team',
      role: 'Platform Developers',
      avatar: '/avatars/team.jpg'
    },
    metadata: {
      createdAt: Date.now() - 86400000 * 30,
      updatedAt: Date.now() - 86400000 * 7,
      version: '2.1',
      views: 15420,
      helpfulVotes: 1876,
      totalVotes: 1920
    },
    relatedArticles: ['first-game', 'interface-tour', 'skill-assessment'],
    isFeatured: true,
    isTrending: true,
    videoUrl: 'https://example.com/welcome-video.mp4',
    videoThumbnail: '/thumbnails/welcome.jpg',
    videoDuration: 180
  },
  {
    id: 'puzzle-basics',
    title: 'Mastering Tactical Puzzles: Your Key to Chess Improvement',
    description: 'Learn how to effectively use our puzzle system to rapidly improve your tactical vision and calculation skills.',
    content: `# Mastering Tactical Puzzles

Tactical puzzles are the cornerstone of chess improvement. Our advanced puzzle system adapts to your skill level and tracks your progress across multiple tactical themes.

## Why Puzzles Matter

Tactical awareness is crucial because:
- 80% of games are decided by tactical mistakes
- Puzzles improve pattern recognition
- They develop calculation skills
- Build confidence in your tactical abilities

## Types of Puzzles Available

### Tactical Themes
- **Forks**: Attack two or more pieces simultaneously
- **Pins**: Restrict piece movement to protect valuable pieces
- **Skewers**: Force a valuable piece to move, exposing a less valuable one
- **Discovered Attacks**: Move one piece to reveal an attack from another
- **Double Attacks**: Create two threats at once

### Difficulty Levels
- **Beginner (800-1200)**: Basic one-move tactics
- **Intermediate (1200-1600)**: Two to three-move combinations
- **Advanced (1600-2000)**: Complex tactical sequences
- **Expert (2000+)**: Deep calculations and rare patterns

## Puzzle Solving Strategy

1. **Look for Checks First**: Forcing moves limit opponent options
2. **Identify Captures**: Material-winning opportunities
3. **Find Threats**: What is your opponent threatening?
4. **Calculate Variations**: Work out the key lines
5. **Verify Your Solution**: Double-check before committing

## Training Recommendations

- Solve 10-15 puzzles daily for consistent improvement
- Focus on accuracy over speed initially
- Review failed puzzles to understand the patterns
- Practice the same tactical theme in groups

Start with our beginner puzzle set and work your way up. Remember, consistent practice leads to dramatic improvement! <Zap className="w-4 h-4 inline" />`,
    category: 'puzzles',
    contentType: 'article',
    difficulty: 'beginner',
    tags: ['puzzles', 'tactics', 'training', 'improvement'],
    readingTime: 8,
    author: {
      name: 'GM Alexandra Petrov',
      role: 'Chess Coach & Trainer',
      avatar: '/avatars/gm-petrov.jpg'
    },
    metadata: {
      createdAt: Date.now() - 86400000 * 15,
      updatedAt: Date.now() - 86400000 * 3,
      version: '1.8',
      views: 8734,
      helpfulVotes: 967,
      totalVotes: 1001
    },
    relatedArticles: ['tactical-themes', 'puzzle-difficulty', 'training-schedule'],
    isFeatured: true,
    isTrending: true
  },
  {
    id: 'engine-analysis',
    title: 'Advanced Engine Analysis: Unlock the Secrets of Master-Level Play',
    description: 'Master the art of computer-assisted analysis to find the best moves and understand complex positions deeply.',
    content: `# Advanced Engine Analysis

Modern chess engines are incredibly powerful analysis tools that can help you understand positions at a depth impossible for human calculation. Learn to harness this power effectively.

## Understanding Engine Evaluation

### Evaluation Scores
- **+1.00**: White is ahead by approximately one pawn
- **0.00**: Equal position
- **-2.50**: Black is ahead by about 2.5 pawns
- **#5**: Forced checkmate in 5 moves

### Key Metrics
- **Depth**: How many moves ahead the engine calculated
- **Nodes**: Total positions examined
- **Time**: Analysis duration
- **Principal Variation (PV)**: The engine's recommended line

## Analysis Techniques

### Position Setup
1. Load your game or position into the analysis board
2. Enable the engine with appropriate time/depth settings
3. Review key moments: opening, middlegame transitions, endgame

### Finding Critical Moments
- **Blunders**: Moves that significantly worsen the position
- **Missed Opportunities**: Better alternatives to played moves
- **Turning Points**: Where the evaluation changed dramatically

### Deep Analysis Process
1. **Initial Assessment**: Let the engine analyze for 30+ seconds
2. **Alternative Lines**: Explore the top 3-4 engine suggestions
3. **Human Understanding**: Ask "Why is this move better?"
4. **Pattern Recognition**: Identify recurring themes and ideas

## Common Analysis Mistakes

<XCircle className="w-4 h-4 inline" /> **Over-reliance**: Don't just memorize engine moves without understanding
<XCircle className="w-4 h-4 inline" /> **Shallow Analysis**: 10-second analysis isn't deep enough for complex positions
<XCircle className="w-4 h-4 inline" /> **Ignoring Human Factors**: Engines don't consider practical psychology
<XCircle className="w-4 h-4 inline" /> **Time Pressure Analysis**: Analyze moves you might actually find in a game

## Practical Applications

### Game Review
- Analyze your games immediately after playing
- Focus on positions where you were uncertain
- Compare your candidate moves with engine suggestions

### Opening Preparation
- Analyze your opening repertoire for improvements
- Find the critical theoretical positions
- Understand typical pawn structures and piece placements

### Endgame Study
- Verify endgame technique accuracy
- Learn theoretical positions with perfect play
- Practice converting advantageous endgames

## Pro Tips for Effective Analysis

<Target className="w-4 h-4 inline" /> **Set Clear Goals**: What do you want to learn from this position?
<Target className="w-4 h-4 inline" /> **Balance Man vs Machine**: Use engine analysis to supplement, not replace, your thinking
<Target className="w-4 h-4 inline" /> **Create Training Positions**: Save interesting positions for future study
<Target className="w-4 h-4 inline" /> **Regular Review**: Revisit analyzed games after 1-2 weeks to reinforce learning

Remember: The goal isn't to play like a computer, but to understand positions deeply enough to make the best human decisions! <FaBrain className="w-4 h-4 inline" />♟️`,
    category: 'advanced',
    contentType: 'article',
    difficulty: 'advanced',
    tags: ['engine', 'analysis', 'advanced', 'improvement', 'technique'],
    readingTime: 12,
    author: {
      name: 'IM Boris Kozlov',
      role: 'Chess Engine Specialist',
      avatar: '/avatars/im-kozlov.jpg'
    },
    metadata: {
      createdAt: Date.now() - 86400000 * 45,
      updatedAt: Date.now() - 86400000 * 10,
      version: '3.2',
      views: 4521,
      helpfulVotes: 612,
      totalVotes: 651
    },
    relatedArticles: ['analysis-board', 'position-evaluation', 'game-review'],
    isFeatured: false,
    isTrending: false,
    videoUrl: 'https://example.com/engine-analysis.mp4',
    videoThumbnail: '/thumbnails/engine-analysis.jpg',
    videoDuration: 720
  }
]

/**
 * Frequently Asked Questions
 */
export const faqItems: FAQItem[] = [
  {
    id: 'how-to-start',
    question: 'How do I start training on this platform?',
    answer: `Getting started is easy! Follow these simple steps:

1. **Complete your profile setup** - Add your current chess rating and experience level
2. **Take the skill assessment** - This helps us recommend the best training for you  
3. **Choose a training path** - Select from our structured study plans or create your own
4. **Start with tactical puzzles** - These provide immediate improvement for players of all levels
5. **Set a consistent schedule** - Even 15-20 minutes daily will show significant results

We recommend starting with the "Getting Started Guide" and then exploring the puzzle trainer. The platform will adapt to your skill level and track your progress automatically.`,
    category: 'getting-started',
    tags: ['beginner', 'setup', 'training', 'guide'],
    popularity: 95,
    isFeatured: true,
    relatedArticles: ['welcome-guide', 'skill-assessment', 'first-game'],
    metadata: {
      createdAt: Date.now() - 86400000 * 60,
      updatedAt: Date.now() - 86400000 * 5,
      views: 12543,
      helpfulVotes: 1876,
      totalVotes: 1923
    }
  },
  {
    id: 'puzzle-rating',
    question: 'How does the puzzle rating system work?',
    answer: `Our puzzle rating system is designed to match you with appropriately challenging puzzles:

**Rating Ranges:**
- 800-1200: Basic tactical patterns and one-move tactics
- 1200-1600: Two to three-move tactical combinations  
- 1600-2000: Complex multi-move sequences
- 2000+: Advanced patterns and deep calculations

**How Ratings Change:**
- Solve a puzzle correctly: Rating increases based on puzzle difficulty
- Solve incorrectly: Small rating decrease to find your accurate level
- Adaptive difficulty: System automatically adjusts puzzle difficulty to your current rating

**Tips for Improvement:**
- Focus on accuracy over speed initially
- Review incorrect solutions to learn patterns
- Practice consistently - 10-15 puzzles per day is ideal
- Don't worry about rating fluctuations; they're normal as you improve`,
    category: 'puzzles',
    tags: ['puzzles', 'rating', 'difficulty', 'improvement'],
    popularity: 88,
    isFeatured: true,
    relatedArticles: ['puzzle-basics', 'tactical-themes', 'training-schedule'],
    metadata: {
      createdAt: Date.now() - 86400000 * 30,
      updatedAt: Date.now() - 86400000 * 2,
      views: 8932,
      helpfulVotes: 1247,
      totalVotes: 1291
    }
  },
  {
    id: 'subscription-benefits',
    question: 'What are the benefits of a premium subscription?',
    answer: `Premium subscription unlocks advanced features designed for serious improvement:

**Unlimited Access:**
- Unlimited puzzles (free users limited to 5 per day)
- Access to all puzzle themes and difficulty levels
- Complete opening database and explorer

**Advanced Analytics:**  
- Detailed performance statistics and progress tracking
- Weakness analysis and personalized improvement recommendations
- Historical rating graphs and trend analysis

**Exclusive Content:**
- Master game analysis and annotations
- Video lessons from titled players
- Advanced endgame training positions

**Priority Features:**
- Ad-free experience  
- Priority customer support
- Beta access to new features
- Advanced customization options

**Study Tools:**
- Unlimited position analysis with engine
- Custom puzzle creation and sharing
- Advanced study plan creation
- Game database access

Try our 7-day free trial to experience all premium features risk-free!`,
    category: 'account',
    tags: ['premium', 'subscription', 'benefits', 'features'],
    popularity: 76,
    isFeatured: true,
    relatedArticles: ['account-setup', 'premium-features', 'billing-info'],
    metadata: {
      createdAt: Date.now() - 86400000 * 20,
      updatedAt: Date.now() - 86400000 * 1,
      views: 6751,
      helpfulVotes: 892,
      totalVotes: 954
    }
  }
]

/**
 * Interactive tutorials
 */
export const tutorials: Tutorial[] = [
  {
    id: 'interface-walkthrough',
    title: 'Platform Interface Walkthrough',
    description: 'Take an interactive tour of all the platform features and learn how to navigate efficiently.',
    category: 'getting-started',
    difficulty: 'beginner',
    estimatedTime: 10,
    isInteractive: true,
    thumbnail: '/thumbnails/interface-tour.jpg',
    steps: [
      {
        stepNumber: 1,
        title: 'Welcome to the Dashboard',
        description: 'Your dashboard is the central hub for all your chess training activities.',
        instructions: 'Click on the "Dashboard" button in the navigation menu to see your training overview.',
        visualAid: {
          type: 'image',
          url: '/tutorials/dashboard-overview.jpg',
          alt: 'Dashboard overview showing training statistics'
        },
        interaction: {
          type: 'click',
          target: 'dashboard-nav',
          validation: 'dashboard-active'
        },
        tips: [
          'The dashboard shows your current training streak',
          'Recent activities appear in the activity feed',
          'Progress charts show your improvement over time'
        ]
      },
      {
        stepNumber: 2,
        title: 'Accessing Puzzle Training',
        description: 'Learn how to start solving tactical puzzles to improve your game.',
        instructions: 'Navigate to the Puzzle section and start your first tactical puzzle.',
        visualAid: {
          type: 'video',
          url: '/tutorials/puzzle-navigation.mp4',
          alt: 'Video showing puzzle navigation'
        },
        interaction: {
          type: 'navigation',
          target: '/puzzles/tactical',
          validation: 'puzzle-page-loaded'
        },
        tips: [
          'Puzzles are categorized by tactical theme',
          'Your puzzle rating adjusts based on performance',
          'Hints are available if you get stuck'
        ]
      }
    ],
    metadata: {
      createdAt: Date.now() - 86400000 * 40,
      updatedAt: Date.now() - 86400000 * 5,
      completions: 3240,
      averageRating: 4.7,
      totalRatings: 892
    },
    rewards: {
      points: 100,
      badges: ['platform-explorer'],
      achievements: ['first-tutorial-complete']
    }
  }
]

/**
 * Help center configuration
 */
export const helpCenterConfig: HelpCenterConfig = {
  featuredArticles: ['welcome-guide', 'puzzle-basics', 'engine-analysis'],
  popularArticles: ['welcome-guide', 'puzzle-basics', 'basic-rules', 'opening-principles'],
  trendingTopics: ['tactical puzzles', 'engine analysis', 'study plans', 'rating improvement'],
  quickActions: [
    {
      id: 'contact-support',
      title: 'Contact Support',
      description: 'Get help from our support team',
      icon: 'ChatCircle',
      url: '/help/contact'
    },
    {
      id: 'report-bug',
      title: 'Report a Bug',
      description: 'Report technical issues',
      icon: 'Bug',
      url: '/help/contact?type=bug'
    },
    {
      id: 'feature-request',
      title: 'Request Feature',
      description: 'Suggest new features',
      icon: 'Lightbulb',
      url: '/help/contact?type=feature'
    },
    {
      id: 'video-tutorials',
      title: 'Video Tutorials',
      description: 'Watch comprehensive video guides',
      icon: 'Play',
      url: '/help/tutorials'
    }
  ],
  contactOptions: [
    {
      id: 'live-chat',
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      icon: 'ChatCircle',
      available: true,
      responseTime: 'Usually responds in 5 minutes'
    },
    {
      id: 'email-support',
      title: 'Email Support',
      description: 'Send detailed questions via email',
      icon: 'Envelope',
      available: true,
      responseTime: 'Usually responds within 2 hours'
    },
    {
      id: 'phone-support',
      title: 'Phone Support',
      description: 'Call our support hotline',
      icon: 'Phone',
      available: false,
      responseTime: 'Available for premium users'
    },
    {
      id: 'community-forum',
      title: 'Community Forum',
      description: 'Get help from the chess training community',
      icon: 'Users',
      available: true,
      responseTime: 'Community responds quickly'
    }
  ],
  searchSuggestions: [
    'How to improve at chess',
    'Puzzle solving tips',
    'Opening study guide',
    'Engine analysis tutorial',
    'Rating improvement strategies',
    'Endgame training methods',
    'Account settings help',
    'Technical troubleshooting'
  ],
  announcement: {
    id: 'new-feature-update',
    title: 'New Features Available!',
    message: 'We\'ve added advanced statistics and personalized study recommendations. Check them out in your dashboard!',
    type: 'info',
    isActive: true
  }
}

/**
 * Mock user progress data
 */
export const mockUserProgress: UserProgress = {
  articlesRead: ['welcome-guide', 'puzzle-basics'],
  tutorialsCompleted: ['interface-walkthrough'],
  bookmarks: ['engine-analysis', 'advanced-tactics'],
  recentSearches: ['puzzle solving', 'opening study', 'engine analysis'],
  feedbackGiven: {
    'welcome-guide': 'helpful',
    'puzzle-basics': 'helpful'
  },
  stats: {
    totalArticlesRead: 12,
    totalTutorialsCompleted: 3,
    totalTimeSpent: 14400, // 4 hours in seconds
    favoriteCategories: ['puzzles', 'training', 'getting-started']
  }
}

/**
 * Utility functions for content retrieval
 */
export const getArticleById = (id: string): HelpArticle | undefined => {
  return helpArticles.find(article => article.id === id)
}

export const getFAQById = (id: string): FAQItem | undefined => {
  return faqItems.find(faq => faq.id === id)
}

export const getTutorialById = (id: string): Tutorial | undefined => {
  return tutorials.find(tutorial => tutorial.id === id)
}

export const getCategoryById = (id: HelpCategory): CategoryInfo | undefined => {
  return helpCategories.find(category => category.id === id)
}

export const getArticlesByCategory = (category: HelpCategory): HelpArticle[] => {
  return helpArticles.filter(article => article.category === category)
}

export const getFeaturedContent = (): (HelpArticle | Tutorial)[] => {
  const featured = helpCenterConfig.featuredArticles
    .map(id => getArticleById(id))
    .filter(Boolean) as HelpArticle[]
  
  const featuredTutorials = tutorials.filter(t => 
    helpCenterConfig.featuredArticles.includes(t.id)
  )
  
  return [...featured, ...featuredTutorials]
}

export const getPopularContent = (): (HelpArticle | Tutorial)[] => {
  const popular = helpCenterConfig.popularArticles
    .map(id => getArticleById(id))
    .filter(Boolean) as HelpArticle[]
    
  return popular
}

/**
 * Search functionality mock
 */
export const performMockSearch = (query: string, _filters?: any): any[] => {
  const allContent = [...helpArticles, ...faqItems, ...tutorials]
  
  if (!query.trim()) return []
  
  const queryLower = query.toLowerCase()
  
  return allContent.filter(item => {
    const getTitle = (item: any) => 
      'title' in item ? item.title : 'question' in item ? item.question : item.name || '';
    const getDescription = (item: any) => 
      'description' in item ? item.description : 'answer' in item ? item.answer : item.summary || '';
      
    const titleMatch = getTitle(item).toLowerCase().includes(queryLower)
    const descMatch = getDescription(item).toLowerCase().includes(queryLower)
    const tagMatch = 'tags' in item && item.tags.some(tag => 
      tag.toLowerCase().includes(queryLower)
    )
    
    return titleMatch || descMatch || tagMatch
  }).map(item => ({
    id: item.id,
    type: 'contentType' in item ? item.contentType : 'faq' as ContentType,
    title: 'title' in item ? item.title : 'question' in item ? item.question : (item as any).name || '',
    description: 'description' in item ? item.description : 'answer' in item ? item.answer.substring(0, 150) + '...' : (item as any).summary || '',
    category: item.category,
    relevance: Math.random() * 0.5 + 0.5, // Mock relevance score
    url: `/help/${item.category}/${item.id}`,
    metadata: {
      difficulty: ('difficulty' in item ? item.difficulty : 'beginner') as ArticleDifficulty,
      tags: 'tags' in item ? item.tags : [],
      readingTime: 'readingTime' in item ? item.readingTime : undefined,
      videoDuration: 'videoDuration' in item ? item.videoDuration : undefined
    }
  }))
}