import type { 
  LearningPath, 
  StudyProgress, 
  StudyRecommendation,
  AchievementBadge
} from '@/types/studyPlans'

/**
 * Mock learning paths data for visual mockup
 */
export const mockLearningPaths: LearningPath[] = [
  {
    id: 'opening-mastery-beginner',
    title: 'Opening Mastery: Beginner Edition',
    description: 'Master the fundamental chess openings and principles that every player should know. Learn the Italian Game, Ruy Lopez, and essential opening strategies.',
    targetLevel: 'Beginner',
    category: 'Opening Mastery',
    thumbnail: '<FaChessKing className="w-4 h-4 inline" />',
    totalHours: 12,
    prerequisites: {
      minRating: 800
    },
    completion: {
      status: 'in_progress',
      progress: 65,
      modulesCompleted: 2,
      totalModules: 4,
      startedAt: Date.now() - (7 * 24 * 60 * 60 * 1000)
    },
    metrics: {
      enrolledUsers: 15420,
      averageRating: 4.7,
      completionRate: 78,
      difficultyRating: 2.5
    },
    isUnlocked: true,
    isEnrolled: true,
    modules: [
      {
        id: 'opening-principles',
        title: 'Opening Principles',
        description: 'Learn the fundamental principles that guide all good opening play',
        category: 'Opening Mastery',
        difficulty: 'Beginner',
        estimatedHours: 3,
        icon: '<BookOpen className="w-4 h-4 inline" />',
        prerequisites: [],
        learningOutcomes: [
          'Understand center control importance',
          'Master piece development priorities',
          'Learn king safety fundamentals'
        ],
        completion: {
          status: 'completed',
          progress: 100,
          lessonsCompleted: 4,
          totalLessons: 4,
          completedAt: Date.now() - (5 * 24 * 60 * 60 * 1000),
          certificateEarned: true
        },
        order: 1,
        isUnlocked: true,
        lessons: [
          {
            id: 'control-center',
            title: 'Controlling the Center',
            type: 'Theory',
            description: 'Why controlling the center is crucial in chess openings',
            estimatedTime: 20,
            difficulty: 'Beginner',
            prerequisites: [],
            objectives: [
              'Understand center squares importance',
              'Learn pawn center formations',
              'Practice central control patterns'
            ],
            content: {
              sections: [
                {
                  id: 'intro',
                  title: 'The Importance of the Center',
                  type: 'text',
                  content: 'The center squares e4, e5, d4, and d5 are the most important squares on the chessboard...',
                  order: 1
                }
              ],
              interactive: [
                {
                  id: 'center-demo',
                  type: 'position_trainer',
                  title: 'Center Control Practice',
                  config: { positions: ['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'] },
                  points: 50
                }
              ]
            },
            completion: {
              status: 'completed',
              score: 92,
              completedAt: Date.now() - (5 * 24 * 60 * 60 * 1000),
              timeSpent: 25,
              attempts: 1
            },
            gamification: {
              xpReward: 100,
              badgeReward: 'center_master'
            },
            order: 1,
            isUnlocked: true
          },
          {
            id: 'piece-development',
            title: 'Piece Development',
            type: 'Interactive',
            description: 'Learn the optimal order for developing your pieces',
            estimatedTime: 25,
            difficulty: 'Beginner',
            prerequisites: ['control-center'],
            objectives: [
              'Master knight development patterns',
              'Understand bishop placement',
              'Learn castling timing'
            ],
            content: {
              sections: [],
              interactive: []
            },
            completion: {
              status: 'completed',
              score: 88,
              completedAt: Date.now() - (4 * 24 * 60 * 60 * 1000),
              timeSpent: 30,
              attempts: 2
            },
            gamification: {
              xpReward: 120
            },
            order: 2,
            isUnlocked: true
          },
          {
            id: 'king-safety',
            title: 'King Safety Basics',
            type: 'Practice',
            description: 'Ensure your king is safe through proper castling and pawn structure',
            estimatedTime: 18,
            difficulty: 'Beginner',
            prerequisites: ['piece-development'],
            objectives: [
              'Learn when to castle',
              'Understand pawn shelter importance',
              'Recognize danger signs'
            ],
            content: {
              sections: [],
              interactive: []
            },
            completion: {
              status: 'completed',
              score: 95,
              completedAt: Date.now() - (3 * 24 * 60 * 60 * 1000),
              timeSpent: 22,
              attempts: 1
            },
            gamification: {
              xpReward: 150,
              badgeReward: 'safety_first'
            },
            order: 3,
            isUnlocked: true
          },
          {
            id: 'common-mistakes',
            title: 'Common Opening Mistakes',
            type: 'Video',
            description: 'Avoid the most frequent beginner opening errors',
            estimatedTime: 15,
            difficulty: 'Beginner',
            prerequisites: ['king-safety'],
            objectives: [
              'Identify common blunders',
              'Learn recovery techniques',
              'Build mistake prevention habits'
            ],
            content: {
              sections: [],
              interactive: []
            },
            completion: {
              status: 'completed',
              score: 90,
              completedAt: Date.now() - (2 * 24 * 60 * 60 * 1000),
              timeSpent: 18,
              attempts: 1
            },
            gamification: {
              xpReward: 100
            },
            order: 4,
            isUnlocked: true
          }
        ]
      },
      {
        id: 'popular-openings',
        title: 'Popular Openings',
        description: 'Master the most common and effective chess openings',
        category: 'Opening Mastery',
        difficulty: 'Beginner',
        estimatedHours: 4,
        icon: '<FaChessKing className="w-4 h-4 inline" />',
        prerequisites: ['opening-principles'],
        learningOutcomes: [
          'Master Italian Game fundamentals',
          'Understand Ruy Lopez basics',
          'Learn French Defense principles'
        ],
        completion: {
          status: 'completed',
          progress: 100,
          lessonsCompleted: 3,
          totalLessons: 3,
          completedAt: Date.now() - (1 * 24 * 60 * 60 * 1000),
          certificateEarned: true
        },
        order: 2,
        isUnlocked: true,
        lessons: [
          {
            id: 'italian-game',
            title: 'The Italian Game',
            type: 'Opening Study',
            description: 'Master one of the oldest and most reliable chess openings',
            estimatedTime: 35,
            difficulty: 'Beginner',
            prerequisites: [],
            objectives: [
              'Learn Italian Game main line',
              'Understand typical middlegame plans',
              'Practice key variations'
            ],
            content: {
              sections: [],
              interactive: []
            },
            completion: {
              status: 'completed',
              score: 87,
              completedAt: Date.now() - (2 * 24 * 60 * 60 * 1000),
              timeSpent: 40,
              attempts: 1
            },
            gamification: {
              xpReward: 200,
              badgeReward: 'italian_master'
            },
            order: 1,
            isUnlocked: true
          },
          {
            id: 'ruy-lopez',
            title: 'Ruy Lopez Basics',
            type: 'Opening Study',
            description: 'Learn the Spanish Opening fundamentals',
            estimatedTime: 40,
            difficulty: 'Intermediate',
            prerequisites: ['italian-game'],
            objectives: [
              'Understand Ruy Lopez principles',
              'Learn main line structures',
              'Master key defensive setups'
            ],
            content: {
              sections: [],
              interactive: []
            },
            completion: {
              status: 'completed',
              score: 82,
              completedAt: Date.now() - (1 * 24 * 60 * 60 * 1000),
              timeSpent: 45,
              attempts: 2
            },
            gamification: {
              xpReward: 250
            },
            order: 2,
            isUnlocked: true
          },
          {
            id: 'french-defense',
            title: 'French Defense',
            type: 'Opening Study',
            description: 'Master this solid defensive system',
            estimatedTime: 30,
            difficulty: 'Intermediate',
            prerequisites: ['ruy-lopez'],
            objectives: [
              'Learn French Defense structure',
              'Understand pawn chain dynamics',
              'Practice key breakthrough themes'
            ],
            content: {
              sections: [],
              interactive: []
            },
            completion: {
              status: 'completed',
              score: 89,
              completedAt: Date.now() - (12 * 60 * 60 * 1000),
              timeSpent: 35,
              attempts: 1
            },
            gamification: {
              xpReward: 220,
              badgeReward: 'french_defender'
            },
            order: 3,
            isUnlocked: true
          }
        ]
      },
      {
        id: 'tactical-combinations',
        title: 'Opening Tactical Combinations',
        description: 'Learn common tactical motifs that arise from specific openings',
        category: 'Tactical Training',
        difficulty: 'Intermediate',
        estimatedHours: 3,
        icon: '<Zap className="w-4 h-4 inline" />',
        prerequisites: ['popular-openings'],
        learningOutcomes: [
          'Recognize opening tactical patterns',
          'Master discovery attacks in openings',
          'Learn pin and fork combinations'
        ],
        completion: {
          status: 'in_progress',
          progress: 33,
          lessonsCompleted: 1,
          totalLessons: 3,
          certificateEarned: false
        },
        order: 3,
        isUnlocked: true,
        lessons: [
          {
            id: 'discovery-attacks',
            title: 'Discovery Attacks',
            type: 'Tactics',
            description: 'Master discovered attacks in the opening phase',
            estimatedTime: 25,
            difficulty: 'Intermediate',
            prerequisites: [],
            objectives: [
              'Identify discovery setups',
              'Calculate discovery sequences',
              'Avoid discovery traps'
            ],
            content: {
              sections: [],
              interactive: []
            },
            completion: {
              status: 'completed',
              score: 76,
              completedAt: Date.now() - (6 * 60 * 60 * 1000),
              timeSpent: 28,
              attempts: 2
            },
            gamification: {
              xpReward: 180
            },
            order: 1,
            isUnlocked: true
          },
          {
            id: 'pins-forks',
            title: 'Pins and Forks in Openings',
            type: 'Tactics',
            description: 'Common pin and fork patterns in chess openings',
            estimatedTime: 30,
            difficulty: 'Intermediate',
            prerequisites: ['discovery-attacks'],
            objectives: [
              'Spot pin opportunities',
              'Execute knight forks',
              'Defend against tactical threats'
            ],
            content: {
              sections: [],
              interactive: []
            },
            completion: {
              status: 'in_progress',
              timeSpent: 15,
              attempts: 1
            },
            gamification: {
              xpReward: 200
            },
            order: 2,
            isUnlocked: true
          },
          {
            id: 'sacrificial-attacks',
            title: 'Sacrificial Attacks',
            type: 'Tactics',
            description: 'Learn when and how to sacrifice material for initiative',
            estimatedTime: 35,
            difficulty: 'Advanced',
            prerequisites: ['pins-forks'],
            objectives: [
              'Evaluate sacrifice compensation',
              'Calculate sacrificial sequences',
              'Master initiative concepts'
            ],
            content: {
              sections: [],
              interactive: []
            },
            completion: {
              status: 'not_started',
              timeSpent: 0,
              attempts: 0
            },
            gamification: {
              xpReward: 300,
              badgeReward: 'sacrifice_master'
            },
            order: 3,
            isUnlocked: false
          }
        ]
      },
      {
        id: 'advanced-theory',
        title: 'Advanced Opening Theory',
        description: 'Deep dive into complex opening variations and modern theory',
        category: 'Opening Mastery',
        difficulty: 'Advanced',
        estimatedHours: 2,
        icon: '<GraduationCap className="w-4 h-4 inline" />',
        prerequisites: ['tactical-combinations'],
        learningOutcomes: [
          'Understand modern opening developments',
          'Master complex variations',
          'Learn preparation techniques'
        ],
        completion: {
          status: 'not_started',
          progress: 0,
          lessonsCompleted: 0,
          totalLessons: 2,
          certificateEarned: false
        },
        order: 4,
        isUnlocked: false,
        lessons: [
          {
            id: 'modern-developments',
            title: 'Modern Opening Developments',
            type: 'Theory',
            description: 'Latest theoretical developments in popular openings',
            estimatedTime: 45,
            difficulty: 'Advanced',
            prerequisites: [],
            objectives: [
              'Study recent grandmaster games',
              'Understand theoretical innovations',
              'Learn preparation methods'
            ],
            content: {
              sections: [],
              interactive: []
            },
            completion: {
              status: 'not_started',
              timeSpent: 0,
              attempts: 0
            },
            gamification: {
              xpReward: 400
            },
            order: 1,
            isUnlocked: false
          },
          {
            id: 'computer-analysis',
            title: 'Computer-Assisted Analysis',
            type: 'Interactive',
            description: 'Use computer analysis to improve your opening preparation',
            estimatedTime: 35,
            difficulty: 'Advanced',
            prerequisites: ['modern-developments'],
            objectives: [
              'Learn engine evaluation',
              'Understand tablebases',
              'Master analysis techniques'
            ],
            content: {
              sections: [],
              interactive: []
            },
            completion: {
              status: 'not_started',
              timeSpent: 0,
              attempts: 0
            },
            gamification: {
              xpReward: 500,
              badgeReward: 'theory_master'
            },
            order: 2,
            isUnlocked: false
          }
        ]
      }
    ]
  },
  {
    id: 'tactical-mastery-intermediate',
    title: 'Tactical Mastery: Intermediate',
    description: 'Sharpen your tactical vision with complex combinations and pattern recognition. Master advanced tactical motifs and calculation techniques.',
    targetLevel: 'Intermediate',
    category: 'Tactical Training',
    thumbnail: '<GiSwordsPower className="w-4 h-4 inline" />',
    totalHours: 15,
    prerequisites: {
      minRating: 1200,
      completedPaths: ['opening-mastery-beginner']
    },
    completion: {
      status: 'not_started',
      progress: 0,
      modulesCompleted: 0,
      totalModules: 3
    },
    metrics: {
      enrolledUsers: 8750,
      averageRating: 4.8,
      completionRate: 65,
      difficultyRating: 3.8
    },
    isUnlocked: true,
    isEnrolled: false,
    modules: [
      {
        id: 'complex-combinations',
        title: 'Complex Combinations',
        description: 'Master multi-move tactical sequences',
        category: 'Tactical Training',
        difficulty: 'Intermediate',
        estimatedHours: 6,
        icon: '<Brain className="w-4 h-4 inline" />',
        prerequisites: [],
        learningOutcomes: [
          'Calculate complex tactical sequences',
          'Recognize combination patterns',
          'Master deflection and decoy tactics'
        ],
        completion: {
          status: 'not_started',
          progress: 0,
          lessonsCompleted: 0,
          totalLessons: 4,
          certificateEarned: false
        },
        order: 1,
        isUnlocked: true,
        lessons: []
      }
    ]
  },
  {
    id: 'endgame-excellence',
    title: 'Endgame Excellence',
    description: 'Master essential endgame techniques from basic checkmates to complex theoretical positions. Build endgame intuition and calculation skills.',
    targetLevel: 'Intermediate',
    category: 'Endgame Excellence',
    thumbnail: '🏁',
    totalHours: 18,
    prerequisites: {
      minRating: 1000
    },
    completion: {
      status: 'not_started',
      progress: 0,
      modulesCompleted: 0,
      totalModules: 4
    },
    metrics: {
      enrolledUsers: 12300,
      averageRating: 4.6,
      completionRate: 72,
      difficultyRating: 3.2
    },
    isUnlocked: true,
    isEnrolled: false,
    modules: []
  },
  {
    id: 'strategic-thinking-advanced',
    title: 'Strategic Thinking: Advanced',
    description: 'Develop deep strategic understanding through positional analysis, planning techniques, and grandmaster game studies.',
    targetLevel: 'Advanced',
    category: 'Strategic Thinking',
    thumbnail: '<Target className="w-4 h-4 inline" />',
    totalHours: 25,
    prerequisites: {
      minRating: 1600,
      completedPaths: ['tactical-mastery-intermediate', 'endgame-excellence']
    },
    completion: {
      status: 'not_started',
      progress: 0,
      modulesCompleted: 0,
      totalModules: 5
    },
    metrics: {
      enrolledUsers: 4200,
      averageRating: 4.9,
      completionRate: 45,
      difficultyRating: 4.5
    },
    isUnlocked: false,
    isEnrolled: false,
    modules: []
  },
  {
    id: 'attack-defense-mastery',
    title: 'Attack & Defense Mastery',
    description: 'Learn the art of attacking the king while defending your own position. Master sacrificial attacks and defensive techniques.',
    targetLevel: 'Expert',
    category: 'Attack & Defense',
    thumbnail: '<Zap className="w-4 h-4 inline" />',
    totalHours: 20,
    prerequisites: {
      minRating: 1800,
      achievements: ['tactical_genius', 'strategic_master']
    },
    completion: {
      status: 'not_started',
      progress: 0,
      modulesCompleted: 0,
      totalModules: 4
    },
    metrics: {
      enrolledUsers: 1850,
      averageRating: 4.9,
      completionRate: 38,
      difficultyRating: 4.8
    },
    isUnlocked: false,
    isEnrolled: false,
    modules: []
  }
]

/**
 * Generate realistic study progress data
 */
export function generateStudyProgress(): StudyProgress {
  const now = Date.now()
  const oneDay = 24 * 60 * 60 * 1000
  // const oneWeek = 7 * oneDay
  
  return {
    userId: 'user-123',
    totalStudyTime: 2340, // minutes
    currentStreak: 7,
    longestStreak: 21,
    totalXP: 8750,
    level: 12,
    xpToNextLevel: 1250,
    pathProgress: {
      'opening-mastery-beginner': {
        enrolledAt: now - (14 * oneDay),
        progress: 65,
        lastStudied: now - (6 * 60 * 60 * 1000),
        timeSpent: 480
      },
      'tactical-mastery-intermediate': {
        enrolledAt: now - (7 * oneDay),
        progress: 0,
        lastStudied: 0,
        timeSpent: 0
      }
    },
    achievements: [
      {
        id: 'first_steps',
        name: 'First Steps',
        description: 'Completed your first lesson',
        type: 'bronze',
        icon: '<Target className="w-4 h-4 inline" />',
        criteria: { type: 'lessons_completed', threshold: 1 },
        rarity: 95,
        isEarned: true,
        earnedAt: now - (13 * oneDay),
        xpReward: 50
      },
      {
        id: 'opening_explorer',
        name: 'Opening Explorer',
        description: 'Completed 5 opening lessons',
        type: 'silver',
        icon: '<FaChessKing className="w-4 h-4 inline" />',
        criteria: { type: 'lessons_completed', threshold: 5, category: 'Opening Mastery' },
        rarity: 65,
        isEarned: true,
        earnedAt: now - (8 * oneDay),
        xpReward: 150
      },
      {
        id: 'consistency_champion',
        name: 'Consistency Champion',
        description: 'Maintained a 7-day study streak',
        type: 'gold',
        icon: '<Flame className="w-4 h-4 inline" />',
        criteria: { type: 'streak', threshold: 7 },
        rarity: 30,
        isEarned: true,
        earnedAt: now - oneDay,
        xpReward: 300
      }
    ],
    stats: {
      lessonsCompleted: 14,
      modulesCompleted: 2,
      pathsCompleted: 0,
      averageScore: 86.4,
      favoriteCategory: 'Opening Mastery',
      weeklyActivity: [45, 60, 30, 75, 90, 55, 40] // minutes per day for last 7 days
    },
    schedule: {
      id: 'daily-schedule',
      frequency: 'Daily',
      preferredTimes: [{ hour: 19, minute: 30 }],
      daysOfWeek: [1, 2, 3, 4, 5], // Monday to Friday
      sessionDuration: 45,
      dailyGoal: 30,
      weeklyGoal: 5,
      isActive: true,
      nextSession: {
        date: now + (18 * 60 * 60 * 1000), // Tomorrow at 7:30 PM
        plannedContent: ['pins-forks', 'sacrificial-attacks']
      }
    },
    recentSessions: [
      {
        id: 'session-1',
        startTime: now - (6 * 60 * 60 * 1000),
        endTime: now - (5.5 * 60 * 60 * 1000),
        duration: 30,
        contentStudied: [
          {
            pathId: 'opening-mastery-beginner',
            moduleId: 'tactical-combinations',
            lessonId: 'discovery-attacks',
            completionStatus: 'completed'
          }
        ],
        xpEarned: 180,
        performance: {
          accuracy: 76,
          speed: 8.2,
          engagement: 92
        },
        notes: 'Great progress on discovery patterns'
      },
      {
        id: 'session-2',
        startTime: now - (25 * 60 * 60 * 1000),
        endTime: now - (24 * 60 * 60 * 1000),
        duration: 60,
        contentStudied: [
          {
            pathId: 'opening-mastery-beginner',
            moduleId: 'popular-openings',
            lessonId: 'french-defense',
            completionStatus: 'completed'
          }
        ],
        xpEarned: 220,
        performance: {
          accuracy: 89,
          speed: 7.8,
          engagement: 95
        }
      }
    ]
  }
}

/**
 * Generate study recommendations based on user progress
 */
export function generateRecommendations(): StudyRecommendation[] {
  const now = Date.now()
  const oneHour = 60 * 60 * 1000
  const oneDay = 24 * oneHour
  
  return [
    {
      id: 'rec-1',
      type: 'next_lesson',
      content: {
        pathId: 'opening-mastery-beginner',
        moduleId: 'tactical-combinations',
        lessonId: 'pins-forks'
      },
      reason: 'Continue your tactical combinations module to maintain momentum',
      priority: 'high',
      expectedBenefit: 'Improve tactical pattern recognition by 15%',
      expiresAt: now + (7 * oneDay)
    },
    {
      id: 'rec-2',
      type: 'review',
      content: {
        pathId: 'opening-mastery-beginner',
        moduleId: 'opening-principles',
        lessonId: 'control-center'
      },
      reason: 'Reinforce center control concepts before advancing',
      priority: 'medium',
      expectedBenefit: 'Strengthen opening foundation knowledge',
      expiresAt: now + (3 * oneDay)
    },
    {
      id: 'rec-3',
      type: 'new_path',
      content: {
        pathId: 'endgame-excellence',
        moduleId: '',
        lessonId: ''
      },
      reason: 'Your opening skills are solid - time to balance with endgame knowledge',
      priority: 'medium',
      expectedBenefit: 'Develop well-rounded chess skills',
      expiresAt: now + (14 * oneDay)
    },
    {
      id: 'rec-4',
      type: 'challenge',
      content: {
        pathId: 'opening-mastery-beginner',
        moduleId: 'tactical-combinations',
        lessonId: 'sacrificial-attacks'
      },
      reason: 'Push your limits with advanced sacrificial attack patterns',
      priority: 'low',
      expectedBenefit: 'Prepare for intermediate-level tactical challenges',
      expiresAt: now + (10 * oneDay)
    },
    {
      id: 'rec-5',
      type: 'weak_area',
      content: {
        pathId: 'opening-mastery-beginner',
        moduleId: 'popular-openings',
        lessonId: 'ruy-lopez'
      },
      reason: 'Your Ruy Lopez score could use improvement - consider reviewing',
      priority: 'low',
      expectedBenefit: 'Boost confidence in this important opening',
      expiresAt: now + (5 * oneDay)
    }
  ]
}

/**
 * Mock achievement badges data
 */
export const mockAchievementBadges: AchievementBadge[] = [
  {
    id: 'first_steps',
    name: 'First Steps',
    description: 'Complete your first lesson',
    type: 'bronze',
    icon: '<Target className="w-4 h-4 inline" />',
    criteria: { type: 'lessons_completed', threshold: 1 },
    rarity: 95,
    isEarned: true,
    earnedAt: Date.now() - (13 * 24 * 60 * 60 * 1000),
    xpReward: 50
  },
  {
    id: 'opening_explorer',
    name: 'Opening Explorer',
    description: 'Complete 5 opening lessons',
    type: 'silver',
    icon: '<FaChessKing className="w-4 h-4 inline" />',
    criteria: { type: 'lessons_completed', threshold: 5, category: 'Opening Mastery' },
    rarity: 65,
    isEarned: true,
    earnedAt: Date.now() - (8 * 24 * 60 * 60 * 1000),
    xpReward: 150
  },
  {
    id: 'tactical_genius',
    name: 'Tactical Genius',
    description: 'Complete 10 tactical lessons with >90% accuracy',
    type: 'gold',
    icon: '<Zap className="w-4 h-4 inline" />',
    criteria: { type: 'score', threshold: 90, category: 'Tactical Training' },
    rarity: 25,
    isEarned: false,
    xpReward: 500
  },
  {
    id: 'consistency_champion',
    name: 'Consistency Champion',
    description: 'Maintain a 7-day study streak',
    type: 'gold',
    icon: '<Flame className="w-4 h-4 inline" />',
    criteria: { type: 'streak', threshold: 7 },
    rarity: 30,
    isEarned: true,
    earnedAt: Date.now() - (24 * 60 * 60 * 1000),
    xpReward: 300
  },
  {
    id: 'endgame_master',
    name: 'Endgame Master',
    description: 'Complete an entire endgame learning path',
    type: 'platinum',
    icon: '<Trophy className="w-4 h-4 inline" />',
    criteria: { type: 'paths_finished', threshold: 1, category: 'Endgame Excellence' },
    rarity: 10,
    isEarned: false,
    xpReward: 1000
  },
  {
    id: 'scholar',
    name: 'Chess Scholar',
    description: 'Study for 100 total hours',
    type: 'platinum',
    icon: '<BookOpen className="w-4 h-4 inline" />',
    criteria: { type: 'time_spent', threshold: 6000 }, // 100 hours in minutes
    rarity: 15,
    isEarned: false,
    xpReward: 750
  },
  {
    id: 'grand_master_student',
    name: 'Grandmaster Student',
    description: 'Complete all available learning paths',
    type: 'diamond',
    icon: '💎',
    criteria: { type: 'paths_finished', threshold: 5 },
    rarity: 2,
    isEarned: false,
    xpReward: 2000
  },
  {
    id: 'speed_learner',
    name: 'Speed Learner',
    description: 'Complete 5 lessons in a single day',
    type: 'silver',
    icon: '🚀',
    criteria: { type: 'lessons_completed', threshold: 5 },
    rarity: 40,
    isEarned: false,
    xpReward: 200
  },
  {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Achieve 100% score on any lesson',
    type: 'gold',
    icon: '<Star className="w-4 h-4 inline" />',
    criteria: { type: 'score', threshold: 100 },
    rarity: 20,
    isEarned: false,
    xpReward: 400
  },
  {
    id: 'dedication',
    name: 'Dedication',
    description: 'Maintain a 30-day study streak',
    type: 'diamond',
    icon: '<Target className="w-4 h-4 inline" />',
    criteria: { type: 'streak', threshold: 30 },
    rarity: 5,
    isEarned: false,
    xpReward: 1500
  }
]