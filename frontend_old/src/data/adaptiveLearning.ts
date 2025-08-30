import type {
  PersonalizedLearningPath,
  SkillNode,
  LearningBranch,
  LearningRecommendation,
  LearningObjective,
  AdaptiveDifficulty,
  StudySessionPlan,
  WeakArea,
  LearningMilestone,
  LearningAnalytics
} from '@/types/learningPath'


/**
 * Mock skill nodes for the learning path skill tree
 */
export const mockSkillNodes: SkillNode[] = [
  {
    id: 'opening-principles',
    name: 'Opening Principles',
    description: 'Master fundamental opening concepts: development, center control, and king safety',
    category: 'Opening Theory',
    masteryLevel: 'Mastered',
    masteryProgress: 100,
    prerequisites: [],
    unlocks: ['specific-openings', 'opening-traps'],
    position: { x: 100, y: 100, level: 1 },
    visual: {
      icon: '<FaChessKing className="w-4 h-4 inline" />',
      color: 'from-emerald-400 to-emerald-600',
      shape: 'circle',
      glowIntensity: 0.9
    },
    associatedContent: [
      {
        pathId: 'opening-mastery-beginner',
        moduleId: 'opening-principles',
        lessonIds: ['control-center', 'piece-development', 'king-safety']
      }
    ],
    metrics: {
      timeSpent: 180,
      practiceAttempts: 25,
      successRate: 0.92,
      lastPracticed: Date.now() - (2 * 24 * 60 * 60 * 1000),
      difficulty: 'Foundation'
    },
    isUnlocked: true,
    isFeatured: false
  },
  {
    id: 'specific-openings',
    name: 'Specific Opening Systems',
    description: 'Learn popular opening repertoires: Italian Game, Ruy Lopez, French Defense',
    category: 'Opening Theory',
    masteryLevel: 'Proficient',
    masteryProgress: 75,
    prerequisites: ['opening-principles'],
    unlocks: ['advanced-theory', 'middlegame-plans'],
    position: { x: 250, y: 100, level: 2 },
    visual: {
      icon: '🏰',
      color: 'from-blue-400 to-blue-600',
      shape: 'diamond',
      glowIntensity: 0.7
    },
    associatedContent: [
      {
        pathId: 'opening-mastery-beginner',
        moduleId: 'popular-openings',
        lessonIds: ['italian-game', 'ruy-lopez', 'french-defense']
      }
    ],
    metrics: {
      timeSpent: 240,
      practiceAttempts: 18,
      successRate: 0.83,
      lastPracticed: Date.now() - (6 * 60 * 60 * 1000),
      difficulty: 'Intermediate'
    },
    isUnlocked: true,
    isFeatured: true
  },
  {
    id: 'basic-tactics',
    name: 'Basic Tactical Patterns',
    description: 'Master fundamental tactics: pins, forks, skewers, and discovered attacks',
    category: 'Tactical Patterns',
    masteryLevel: 'Advanced',
    masteryProgress: 88,
    prerequisites: [],
    unlocks: ['complex-combinations', 'tactical-themes'],
    position: { x: 100, y: 250, level: 1 },
    visual: {
      icon: '<Zap className="w-4 h-4 inline" />',
      color: 'from-yellow-400 to-orange-500',
      shape: 'star',
      glowIntensity: 0.85
    },
    associatedContent: [
      {
        pathId: 'tactical-mastery-intermediate',
        moduleId: 'basic-patterns',
        lessonIds: ['pins-forks', 'skewers', 'discoveries']
      }
    ],
    metrics: {
      timeSpent: 320,
      practiceAttempts: 45,
      successRate: 0.89,
      lastPracticed: Date.now() - (12 * 60 * 60 * 1000),
      difficulty: 'Intermediate'
    },
    isUnlocked: true,
    isFeatured: false
  },
  {
    id: 'complex-combinations',
    name: 'Complex Tactical Combinations',
    description: 'Advanced multi-move tactical sequences and sacrificial attacks',
    category: 'Tactical Patterns',
    masteryLevel: 'Developing',
    masteryProgress: 45,
    prerequisites: ['basic-tactics'],
    unlocks: ['tactical-vision', 'attack-patterns'],
    position: { x: 250, y: 250, level: 2 },
    visual: {
      icon: '<FaBrain className="w-4 h-4 inline" />',
      color: 'from-purple-400 to-purple-600',
      shape: 'hexagon',
      glowIntensity: 0.4
    },
    associatedContent: [
      {
        pathId: 'tactical-mastery-intermediate',
        moduleId: 'complex-combinations',
        lessonIds: ['multi-move-tactics', 'sacrificial-attacks']
      }
    ],
    metrics: {
      timeSpent: 85,
      practiceAttempts: 12,
      successRate: 0.67,
      lastPracticed: Date.now() - (48 * 60 * 60 * 1000),
      difficulty: 'Advanced'
    },
    isUnlocked: true,
    isFeatured: true
  },
  {
    id: 'endgame-basics',
    name: 'Basic Endgame Technique',
    description: 'Essential endgame knowledge: checkmates, king and pawn endings',
    category: 'Endgame Technique',
    masteryLevel: 'Proficient',
    masteryProgress: 70,
    prerequisites: [],
    unlocks: ['complex-endgames', 'endgame-theory'],
    position: { x: 100, y: 400, level: 1 },
    visual: {
      icon: '🏁',
      color: 'from-indigo-400 to-indigo-600',
      shape: 'circle',
      glowIntensity: 0.6
    },
    associatedContent: [
      {
        pathId: 'endgame-excellence',
        moduleId: 'basic-checkmates',
        lessonIds: ['queen-mate', 'rook-mate', 'king-pawn-endings']
      }
    ],
    metrics: {
      timeSpent: 150,
      practiceAttempts: 20,
      successRate: 0.80,
      lastPracticed: Date.now() - (72 * 60 * 60 * 1000),
      difficulty: 'Intermediate'
    },
    isUnlocked: true,
    isFeatured: false
  },
  {
    id: 'positional-concepts',
    name: 'Positional Understanding',
    description: 'Learn pawn structure, piece activity, and positional planning',
    category: 'Positional Understanding',
    masteryLevel: 'Developing',
    masteryProgress: 35,
    prerequisites: ['specific-openings'],
    unlocks: ['strategic-planning', 'positional-play'],
    position: { x: 400, y: 200, level: 2 },
    visual: {
      icon: '<Target className="w-4 h-4 inline" />',
      color: 'from-green-400 to-teal-500',
      shape: 'diamond',
      glowIntensity: 0.3
    },
    associatedContent: [
      {
        pathId: 'strategic-thinking-advanced',
        moduleId: 'positional-basics',
        lessonIds: ['pawn-structure', 'piece-activity', 'planning']
      }
    ],
    metrics: {
      timeSpent: 60,
      practiceAttempts: 8,
      successRate: 0.62,
      lastPracticed: Date.now() - (96 * 60 * 60 * 1000),
      difficulty: 'Advanced'
    },
    isUnlocked: true,
    isFeatured: false
  },
  {
    id: 'calculation-skills',
    name: 'Calculation & Visualization',
    description: 'Improve calculation depth and accuracy in complex positions',
    category: 'Calculation Skills',
    masteryLevel: 'Beginner',
    masteryProgress: 20,
    prerequisites: ['complex-combinations'],
    unlocks: ['deep-calculation', 'pattern-recognition'],
    position: { x: 400, y: 300, level: 3 },
    visual: {
      icon: '<Search className="w-4 h-4 inline" />',
      color: 'from-red-400 to-pink-500',
      shape: 'hexagon',
      glowIntensity: 0.2
    },
    associatedContent: [
      {
        pathId: 'calculation-mastery',
        moduleId: 'visualization',
        lessonIds: ['mental-board', 'calculation-tree', 'candidate-moves']
      }
    ],
    metrics: {
      timeSpent: 25,
      practiceAttempts: 5,
      successRate: 0.40,
      lastPracticed: Date.now() - (120 * 60 * 60 * 1000),
      difficulty: 'Expert'
    },
    isUnlocked: false,
    isFeatured: false
  },
  {
    id: 'time-management',
    name: 'Time Management',
    description: 'Master clock handling and time allocation in different time controls',
    category: 'Time Management',
    masteryLevel: 'Developing',
    masteryProgress: 55,
    prerequisites: ['basic-tactics'],
    unlocks: ['tournament-play', 'psychological-prep'],
    position: { x: 300, y: 450, level: 2 },
    visual: {
      icon: '<Timer className="w-4 h-4 inline" />',
      color: 'from-cyan-400 to-blue-500',
      shape: 'circle',
      glowIntensity: 0.5
    },
    associatedContent: [
      {
        pathId: 'tournament-preparation',
        moduleId: 'time-control',
        lessonIds: ['clock-basics', 'time-allocation', 'time-pressure']
      }
    ],
    metrics: {
      timeSpent: 90,
      practiceAttempts: 15,
      successRate: 0.73,
      lastPracticed: Date.now() - (24 * 60 * 60 * 1000),
      difficulty: 'Intermediate'
    },
    isUnlocked: true,
    isFeatured: false
  }
]

/**
 * Mock learning branches for skill tree organization
 */
export const mockLearningBranches: LearningBranch[] = [
  {
    id: 'opening-branch',
    name: 'Opening Mastery Path',
    theme: 'from-blue-500 to-indigo-600',
    skillIds: ['opening-principles', 'specific-openings'],
    completion: {
      skillsMastered: 1,
      totalSkills: 2,
      percentage: 50
    },
    difficulty: 'Intermediate',
    estimatedHours: 15
  },
  {
    id: 'tactical-branch',
    name: 'Tactical Excellence Path',
    theme: 'from-yellow-500 to-orange-600',
    skillIds: ['basic-tactics', 'complex-combinations', 'calculation-skills'],
    completion: {
      skillsMastered: 1,
      totalSkills: 3,
      percentage: 33
    },
    difficulty: 'Advanced',
    estimatedHours: 25
  },
  {
    id: 'endgame-branch',
    name: 'Endgame Excellence Path',
    theme: 'from-indigo-500 to-purple-600',
    skillIds: ['endgame-basics'],
    completion: {
      skillsMastered: 0,
      totalSkills: 1,
      percentage: 0
    },
    difficulty: 'Intermediate',
    estimatedHours: 12
  },
  {
    id: 'strategic-branch',
    name: 'Strategic Understanding Path',
    theme: 'from-green-500 to-teal-600',
    skillIds: ['positional-concepts'],
    completion: {
      skillsMastered: 0,
      totalSkills: 1,
      percentage: 0
    },
    difficulty: 'Advanced',
    estimatedHours: 20
  }
]

/**
 * Mock personalized learning recommendations
 */
export const mockRecommendations: LearningRecommendation[] = [
  {
    id: 'rec-complex-tactics',
    type: 'weakness_improvement',
    targetSkill: mockSkillNodes.find(s => s.id === 'complex-combinations')!,
    recommendedContent: [
      {
        pathId: 'tactical-mastery-intermediate',
        moduleId: 'complex-combinations',
        lessonId: 'multi-move-tactics',
        estimatedTime: 30
      },
      {
        pathId: 'tactical-mastery-intermediate',
        moduleId: 'complex-combinations',
        lessonId: 'sacrificial-attacks',
        estimatedTime: 35
      }
    ],
    reasoning: 'Your success rate in complex combinations (67%) indicates room for improvement. Focused practice on multi-move sequences will enhance your tactical vision.',
    expectedImprovement: {
      skillIncrease: 15,
      masteryGain: 25,
      timeToComplete: 5
    },
    priority: 'High',
    confidence: 0.85,
    personalization: {
      basedOnWeaknesses: ['Complex tactical calculation', 'Multi-move visualization'],
      basedOnGoals: ['Improve tactical rating', 'Tournament preparation'],
      basedOnHistory: ['Strong in basic tactics', 'Struggles with deep calculation']
    },
    expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'rec-positional-basics',
    type: 'balanced_practice',
    targetSkill: mockSkillNodes.find(s => s.id === 'positional-concepts')!,
    recommendedContent: [
      {
        pathId: 'strategic-thinking-advanced',
        moduleId: 'positional-basics',
        lessonId: 'pawn-structure',
        estimatedTime: 25
      }
    ],
    reasoning: 'Your strong tactical foundation would benefit from positional understanding. This creates a more balanced playing style.',
    expectedImprovement: {
      skillIncrease: 20,
      masteryGain: 30,
      timeToComplete: 8
    },
    priority: 'Medium',
    confidence: 0.78,
    personalization: {
      basedOnWeaknesses: ['Positional evaluation', 'Long-term planning'],
      basedOnGoals: ['Well-rounded chess skills', 'Rating improvement'],
      basedOnHistory: ['Tactical strength', 'Opening knowledge']
    },
    expiresAt: Date.now() + (14 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'rec-endgame-focus',
    type: 'skill_focus',
    targetSkill: mockSkillNodes.find(s => s.id === 'endgame-basics')!,
    recommendedContent: [
      {
        pathId: 'endgame-excellence',
        moduleId: 'basic-checkmates',
        lessonId: 'king-pawn-endings',
        estimatedTime: 40
      }
    ],
    reasoning: 'You haven\'t practiced endgames in 3 days. Regular endgame practice is crucial for converting winning positions.',
    expectedImprovement: {
      skillIncrease: 10,
      masteryGain: 15,
      timeToComplete: 3
    },
    priority: 'Medium',
    confidence: 0.72,
    personalization: {
      basedOnWeaknesses: ['Endgame technique'],
      basedOnGoals: ['Complete endgame mastery'],
      basedOnHistory: ['Inconsistent endgame practice']
    },
    expiresAt: Date.now() + (5 * 24 * 60 * 60 * 1000)
  }
]

/**
 * Mock learning objectives
 */
export const mockObjectives: LearningObjective[] = [
  {
    id: 'obj-tactical-rating',
    title: 'Reach 1400 Tactical Rating',
    description: 'Improve tactical puzzle rating to 1400 through consistent practice',
    type: 'Application',
    targetSkill: 'complex-combinations',
    criteria: [
      {
        description: 'Tactical puzzle rating',
        target: 1400,
        current: 1285,
        unit: 'rating points',
        deadline: Date.now() + (30 * 24 * 60 * 60 * 1000)
      },
      {
        description: 'Daily tactical problems solved',
        target: 20,
        current: 14,
        unit: 'problems',
        deadline: Date.now() + (24 * 60 * 60 * 1000)
      }
    ],
    progress: {
      status: 'in_progress',
      completion: 72,
      milestones: [
        {
          id: 'tactical-1300',
          title: 'Reach 1300 Rating',
          completed: true,
          completedAt: Date.now() - (10 * 24 * 60 * 60 * 1000)
        },
        {
          id: 'tactical-1350',
          title: 'Reach 1350 Rating',
          completed: false
        },
        {
          id: 'tactical-1400',
          title: 'Reach 1400 Rating',
          completed: false
        }
      ]
    },
    studyPlan: {
      totalSessions: 20,
      completedSessions: 14,
      nextSession: Date.now() + (18 * 60 * 60 * 1000)
    }
  },
  {
    id: 'obj-opening-repertoire',
    title: 'Master Opening Repertoire',
    description: 'Complete understanding of chosen opening systems for both colors',
    type: 'Knowledge',
    targetSkill: 'specific-openings',
    criteria: [
      {
        description: 'Opening lines memorized',
        target: 15,
        current: 11,
        unit: 'variations',
        deadline: Date.now() + (21 * 24 * 60 * 60 * 1000)
      }
    ],
    progress: {
      status: 'in_progress',
      completion: 73,
      milestones: [
        {
          id: 'italian-mastery',
          title: 'Master Italian Game',
          completed: true,
          completedAt: Date.now() - (7 * 24 * 60 * 60 * 1000)
        },
        {
          id: 'ruy-lopez-mastery',
          title: 'Master Ruy Lopez Basics',
          completed: false
        }
      ]
    },
    studyPlan: {
      totalSessions: 12,
      completedSessions: 9
    }
  }
]

/**
 * Mock adaptive difficulty settings
 */
export const mockAdaptiveDifficulty: AdaptiveDifficulty = {
  currentLevel: 'Intermediate',
  performance: {
    accuracy: 0.78,
    speed: 7.2,
    consistency: 0.82,
    improvement: 0.15
  },
  adjustmentFactors: {
    recentPerformance: 0.85,
    streakBonus: 0.12,
    timeSpentFactor: 0.9,
    mistakeRecovery: 0.75
  },
  recommendedLevel: 'Advanced',
  confidence: 0.73
}

/**
 * Mock study session plans
 */
export const mockStudyPlans: StudySessionPlan[] = [
  {
    id: 'session-tonight',
    title: 'Tactical Combinations Focus',
    plannedStartTime: Date.now() + (6 * 60 * 60 * 1000), // 6 hours from now
    estimatedDuration: 45,
    intensity: 'Moderate',
    plannedContent: [
      {
        skillId: 'complex-combinations',
        contentType: 'practice',
        estimatedTime: 30,
        priority: 'High'
      },
      {
        skillId: 'basic-tactics',
        contentType: 'review',
        estimatedTime: 15,
        priority: 'Medium'
      }
    ],
    goals: {
      primary: ['Improve complex combination accuracy', 'Practice multi-move calculations'],
      secondary: ['Maintain basic tactical sharpness'],
      stretch: ['Attempt advanced sacrificial patterns']
    },
    prerequisites: [
      {
        skillId: 'basic-tactics',
        required: true,
        current: 88,
        minimum: 70
      }
    ],
    successMetrics: {
      targetAccuracy: 75,
      targetCompletion: 90,
      skillImprovement: 5
    }
  },
  {
    id: 'session-tomorrow',
    title: 'Positional Understanding Development',
    plannedStartTime: Date.now() + (30 * 60 * 60 * 1000), // Tomorrow
    estimatedDuration: 60,
    intensity: 'Intensive',
    plannedContent: [
      {
        skillId: 'positional-concepts',
        contentType: 'theory',
        estimatedTime: 25,
        priority: 'High'
      },
      {
        skillId: 'positional-concepts',
        contentType: 'practice',
        estimatedTime: 35,
        priority: 'High'
      }
    ],
    goals: {
      primary: ['Understand pawn structure basics', 'Learn piece activity principles'],
      secondary: ['Connect positional concepts to openings'],
      stretch: ['Apply concepts in practice games']
    },
    prerequisites: [
      {
        skillId: 'specific-openings',
        required: true,
        current: 75,
        minimum: 60
      }
    ],
    successMetrics: {
      targetAccuracy: 70,
      targetCompletion: 85,
      skillImprovement: 10
    }
  }
]

/**
 * Mock weak areas identification
 */
export const mockWeakAreas: WeakArea[] = [
  {
    id: 'weak-calculation',
    category: 'Calculation Skills',
    affectedSkills: ['complex-combinations', 'calculation-skills'],
    severity: 'Significant',
    analysis: {
      identifiedAt: Date.now() - (3 * 24 * 60 * 60 * 1000),
      confidence: 0.87,
      evidenceCount: 15,
      patterns: [
        'Missing tactical shots in complex positions',
        'Calculation errors in 3+ move sequences',
        'Time pressure affecting calculation quality'
      ]
    },
    impact: {
      currentRating: 1285,
      potentialImprovement: 150,
      priorityScore: 8.5
    },
    improvementPlan: {
      targetSkills: ['complex-combinations', 'calculation-skills'],
      recommendedContent: [
        'Multi-move tactical puzzles',
        'Visualization exercises',
        'Calculation training drills'
      ],
      estimatedTime: 15,
      expectedOutcome: 'Improve calculation accuracy by 20% and depth by 1-2 moves'
    }
  },
  {
    id: 'weak-endgames',
    category: 'Endgame Technique',
    affectedSkills: ['endgame-basics'],
    severity: 'Moderate',
    analysis: {
      identifiedAt: Date.now() - (7 * 24 * 60 * 60 * 1000),
      confidence: 0.72,
      evidenceCount: 8,
      patterns: [
        'Infrequent endgame study',
        'Missed winning endgame conversions',
        'Uncertainty in basic endgame positions'
      ]
    },
    impact: {
      currentRating: 1200,
      potentialImprovement: 100,
      priorityScore: 6.8
    },
    improvementPlan: {
      targetSkills: ['endgame-basics'],
      recommendedContent: [
        'Basic checkmate patterns',
        'King and pawn endings',
        'Essential endgame positions'
      ],
      estimatedTime: 8,
      expectedOutcome: 'Secure conversion of winning endgames and avoid basic endgame blunders'
    }
  }
]

/**
 * Mock learning milestones
 */
export const mockMilestones: LearningMilestone[] = [
  {
    id: 'milestone-weekly-streak',
    title: '7-Day Study Streak',
    description: 'Maintain consistent daily chess study for a full week',
    criteria: {
      type: 'consistency',
      threshold: 7,
      current: 6
    },
    type: 'weekly',
    celebration: {
      icon: '<Flame className="w-4 h-4 inline" />',
      animation: 'pulse',
      message: 'Amazing dedication! You\'re building strong study habits!',
      rewards: {
        xp: 200,
        badges: ['consistency_champion'],
        unlocks: ['advanced_study_tools']
      }
    },
    status: 'pending',
    achievedAt: undefined
  },
  {
    id: 'milestone-tactical-breakthrough',
    title: 'Tactical Breakthrough',
    description: 'Achieve 80% accuracy in complex tactical combinations',
    criteria: {
      type: 'skill_mastery',
      threshold: 80,
      current: 67
    },
    type: 'skill_based',
    celebration: {
      icon: '<Zap className="w-4 h-4 inline" />',
      animation: 'sparkle',
      message: 'Tactical vision unlocked! Your pattern recognition is exceptional!',
      rewards: {
        xp: 350,
        badges: ['tactical_master'],
        unlocks: ['expert_puzzles', 'calculation_training']
      }
    },
    status: 'pending',
    achievedAt: undefined
  },
  {
    id: 'milestone-first-skill-mastery',
    title: 'First Skill Mastery',
    description: 'Reach mastery level in opening principles',
    criteria: {
      type: 'skill_mastery',
      threshold: 100,
      current: 100
    },
    type: 'achievement',
    celebration: {
      icon: '<Trophy className="w-4 h-4 inline" />',
      animation: 'bounce',
      message: 'Congratulations! You\'ve mastered your first chess skill!',
      rewards: {
        xp: 500,
        badges: ['first_master'],
        unlocks: ['skill_tree_expanded']
      }
    },
    status: 'achieved',
    achievedAt: Date.now() - (2 * 24 * 60 * 60 * 1000)
  }
]

/**
 * Mock learning analytics
 */
export const mockAnalytics: LearningAnalytics = {
  period: {
    start: Date.now() - (30 * 24 * 60 * 60 * 1000),
    end: Date.now(),
    type: 'month'
  },
  trends: [
    {
      skillCategory: 'Tactical Patterns',
      improvement: 0.18,
      trajectory: 'improving',
      confidence: 0.85
    },
    {
      skillCategory: 'Opening Theory',
      improvement: 0.12,
      trajectory: 'stable',
      confidence: 0.78
    },
    {
      skillCategory: 'Endgame Technique',
      improvement: 0.05,
      trajectory: 'declining',
      confidence: 0.65
    }
  ],
  patterns: {
    preferredTimes: [19, 20, 21], // 7-9 PM
    sessionLengths: [30, 45, 60],
    intensityPreference: 'Moderate',
    categoryFocus: ['Tactical Patterns', 'Opening Theory']
  },
  achievements: {
    skillsMastered: 1,
    milestonesReached: 3,
    streaksAchieved: 2,
    improvementRate: 0.15
  },
  predictions: {
    nextMilestone: {
      milestone: 'Tactical Breakthrough',
      estimatedDate: Date.now() + (14 * 24 * 60 * 60 * 1000),
      confidence: 0.72
    },
    ratingProjection: {
      timeframe: 90,
      projected: 1450,
      confidence: 0.68
    },
    optimalSchedule: {
      frequency: 5,
      duration: 45,
      intensity: 'Moderate'
    }
  }
}

/**
 * Generate a complete personalized learning path
 */
export function generatePersonalizedLearningPath(): PersonalizedLearningPath {
  return {
    userId: 'user-123',
    createdAt: Date.now() - (30 * 24 * 60 * 60 * 1000),
    lastUpdated: Date.now() - (6 * 60 * 60 * 1000),
    skillTree: {
      nodes: mockSkillNodes,
      branches: mockLearningBranches,
      connections: [
        { from: 'opening-principles', to: 'specific-openings', type: 'prerequisite', strength: 1.0 },
        { from: 'specific-openings', to: 'positional-concepts', type: 'enhancement', strength: 0.8 },
        { from: 'basic-tactics', to: 'complex-combinations', type: 'prerequisite', strength: 1.0 },
        { from: 'complex-combinations', to: 'calculation-skills', type: 'prerequisite', strength: 0.9 },
        { from: 'basic-tactics', to: 'time-management', type: 'enhancement', strength: 0.6 },
        { from: 'endgame-basics', to: 'time-management', type: 'enhancement', strength: 0.5 }
      ]
    },
    objectives: mockObjectives,
    recommendations: mockRecommendations,
    adaptiveDifficulty: mockAdaptiveDifficulty,
    plannedSessions: mockStudyPlans,
    weakAreas: mockWeakAreas,
    milestones: mockMilestones,
    analytics: mockAnalytics,
    preferences: {
      focusAreas: ['Tactical Patterns', 'Opening Theory'],
      learningStyle: 'practical',
      pacePreference: 'steady',
      goalOrientation: 'rating'
    },
    progress: {
      overallCompletion: 45,
      skillsStarted: 6,
      skillsMastered: 1,
      totalSkills: 8,
      currentLevel: 'Intermediate',
      nextMajorMilestone: 'Tactical Breakthrough'
    }
  }
}