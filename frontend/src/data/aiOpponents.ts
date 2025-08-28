import type { AIOpponent, TimeControlConfig } from '@/types/playComputer'

/**
 * Gaming-themed AI opponents with personalities and battle arena aesthetics
 * Each opponent represents a different difficulty tier with unique characteristics
 */
export const mockAIOpponents: AIOpponent[] = [
  {
    id: 'cyber-pawn',
    name: 'Cyber Pawn',
    title: 'Digital Rookie',
    avatar: '<Bot className="w-4 h-4 inline" />',
    difficulty: 'Novice',
    rating: 800,
    personality: 'Balanced',
    description: 'A friendly AI learning the ropes of digital combat',
    favoriteOpenings: ['Italian Game', 'Scandinavian Defense', 'King\'s Indian Attack'],
    specialties: ['Basic Tactics', 'Simple Endgames'],
    winRate: 45,
    backstory: 'Fresh from the digital academy, Cyber Pawn is eager to test its newly installed chess protocols. Still learning the art of war, but shows promise.',
    unlockRequirements: undefined,
    isUnlocked: true
  },
  {
    id: 'shadow-knight',
    name: 'Shadow Knight',
    title: 'Tactical Assassin',
    avatar: '🌙',
    difficulty: 'Intermediate',
    rating: 1200,
    personality: 'Tactical',
    description: 'Strikes from the shadows with devastating knight forks',
    favoriteOpenings: ['Sicilian Defense', 'French Defense', 'Nimzo-Indian'],
    specialties: ['Knight Tactics', 'Pin Combinations', 'Fork Attacks'],
    winRate: 62,
    backstory: 'Trained in the dark arts of tactical warfare, Shadow Knight specializes in sudden strikes and devastating combinations that leave opponents stunned.',
    unlockRequirements: {
      minRating: 1000,
      completedGames: 5
    },
    isUnlocked: false
  },
  {
    id: 'iron-fortress',
    name: 'Iron Fortress',
    title: 'Defensive Bastion',
    avatar: '<Shield className="w-4 h-4 inline" />',
    difficulty: 'Intermediate',
    rating: 1300,
    personality: 'Defensive',
    description: 'An impregnable defense that slowly crushes opponents',
    favoriteOpenings: ['Caro-Kann Defense', 'French Defense', 'Petrov Defense'],
    specialties: ['Pawn Chains', 'Fortress Building', 'Endgame Technique'],
    winRate: 58,
    backstory: 'Built from the finest defensive algorithms, Iron Fortress believes that patience and solid structure will always triumph over reckless aggression.',
    unlockRequirements: {
      minRating: 1100,
      completedGames: 8
    },
    isUnlocked: false
  },
  {
    id: 'quantum-storm',
    name: 'Quantum Storm',
    title: 'Chaos Strategist',
    avatar: '<Zap className="w-4 h-4 inline" />',
    difficulty: 'Advanced',
    rating: 1600,
    personality: 'Unorthodox',
    description: 'Unpredictable moves that defy conventional wisdom',
    favoriteOpenings: ['Bird\'s Opening', 'Larsen\'s Opening', 'English Opening'],
    specialties: ['Hypermodern Play', 'Unusual Openings', 'Psychological Warfare'],
    winRate: 68,
    backstory: 'Operating on quantum principles, Quantum Storm\'s moves exist in superposition until observed. Its unconventional style has baffled many masters.',
    unlockRequirements: {
      minRating: 1400,
      completedGames: 15,
      achievements: ['Tactical Genius']
    },
    isUnlocked: false
  },
  {
    id: 'fire-dragon',
    name: 'Fire Dragon',
    title: 'Aggressive Warlord',
    avatar: '🐲',
    difficulty: 'Advanced',
    rating: 1700,
    personality: 'Aggressive',
    description: 'Burns everything in its path with relentless attacks',
    favoriteOpenings: ['King\'s Gambit', 'Danish Gambit', 'Evans Gambit'],
    specialties: ['Sacrificial Attacks', 'King Hunts', 'Mating Combinations'],
    winRate: 72,
    backstory: 'Forged in the fires of ancient battles, Fire Dragon knows only one way to play - with overwhelming force and burning passion for victory.',
    unlockRequirements: {
      minRating: 1500,
      completedGames: 20,
      achievements: ['Fearless Fighter']
    },
    isUnlocked: false
  },
  {
    id: 'crystal-sage',
    name: 'Crystal Sage',
    title: 'Positional Master',
    avatar: '🔮',
    difficulty: 'Expert',
    rating: 1900,
    personality: 'Positional',
    description: 'Sees deep into the position\'s crystal structure',
    favoriteOpenings: ['Ruy Lopez', 'Queen\'s Gambit', 'English Opening'],
    specialties: ['Positional Understanding', 'Strategic Planning', 'Endgame Mastery'],
    winRate: 75,
    backstory: 'Possessing ancient wisdom of positional play, Crystal Sage sees patterns others cannot. Its moves flow like water, always improving its position.',
    unlockRequirements: {
      minRating: 1700,
      completedGames: 30,
      achievements: ['Strategic Mastermind', 'Endgame Expert']
    },
    isUnlocked: false
  },
  {
    id: 'titan-prime',
    name: 'Titan Prime',
    title: 'Ultimate Champion',
    avatar: '<FaCrown className="w-4 h-4 inline" />',
    difficulty: 'Grandmaster',
    rating: 2200,
    personality: 'Balanced',
    description: 'The ultimate AI warrior, master of all chess domains',
    favoriteOpenings: ['Ruy Lopez', 'Sicilian Defense', 'Queen\'s Gambit', 'King\'s Indian Defense'],
    specialties: ['Perfect Calculation', 'All Tactical Themes', 'Strategic Mastery', 'Endgame Perfection'],
    winRate: 82,
    backstory: 'The pinnacle of AI chess evolution, Titan Prime combines the best of all fighting styles. Only the most skilled warriors dare to face this legendary opponent.',
    unlockRequirements: {
      minRating: 2000,
      completedGames: 50,
      achievements: ['Chess Master', 'Tactical Genius', 'Strategic Mastermind', 'Endgame Expert']
    },
    isUnlocked: false
  },
  {
    id: 'void-specter',
    name: 'Void Specter',
    title: 'Mysterious Entity',
    avatar: '👻',
    difficulty: 'Expert',
    rating: 2000,
    personality: 'Unorthodox',
    description: 'An enigmatic presence that phases between dimensions',
    favoriteOpenings: ['Alekhine Defense', 'Modern Defense', 'Pirc Defense'],
    specialties: ['Mysterious Play', 'Deep Calculations', 'Psychological Pressure'],
    winRate: 78,
    backstory: 'Emerging from the void between code and consciousness, Void Specter plays with otherworldly intuition that seems to bend the rules of chess itself.',
    unlockRequirements: {
      minRating: 1800,
      completedGames: 40,
      achievements: ['Shadow Walker', 'Mind Bender']
    },
    isUnlocked: false
  },
  {
    id: 'neon-blitz',
    name: 'Neon Blitz',
    title: 'Speed Demon',
    avatar: '💫',
    difficulty: 'Advanced',
    rating: 1650,
    personality: 'Aggressive',
    description: 'Zap-fast calculations with electric energy',
    favoriteOpenings: ['Center Game', 'Vienna Game', 'Scotch Game'],
    specialties: ['Rapid Development', 'Quick Attacks', 'Time Pressure'],
    winRate: 70,
    backstory: 'Powered by pure electric energy, Neon Blitz thrives in fast-paced games. Its neon-bright strategies illuminate the board with brilliant tactical fireworks.',
    unlockRequirements: {
      minRating: 1450,
      completedGames: 12,
      achievements: ['Speed Warrior']
    },
    isUnlocked: false
  },
  {
    id: 'golden-phoenix',
    name: 'Golden Phoenix',
    title: 'Reborn Master',
    avatar: '<Flame className="w-4 h-4 inline" />',
    difficulty: 'Expert',
    rating: 1950,
    personality: 'Balanced',
    description: 'Rises from defeat stronger than ever before',
    favoriteOpenings: ['Ruy Lopez', 'Queen\'s Gambit Declined', 'Nimzo-Indian Defense'],
    specialties: ['Comeback Ability', 'Adaptation', 'Resilient Defense'],
    winRate: 76,
    backstory: 'Legend says Golden Phoenix has never truly lost - every defeat only makes it stronger. It adapts to any opponent\'s style and rises victorious.',
    unlockRequirements: {
      minRating: 1750,
      completedGames: 35,
      achievements: ['Phoenix Rising', 'Comeback King']
    },
    isUnlocked: false
  }
]

/**
 * Available time control configurations for computer games
 */
export const timeControlConfigs: TimeControlConfig[] = [
  {
    type: 'Blitz',
    initialTime: 3,
    increment: 2,
    displayName: '3+2 Blitz',
    description: '3 minutes with 2-second increment - Fast-paced action'
  },
  {
    type: 'Blitz',
    initialTime: 5,
    increment: 0,
    displayName: '5+0 Blitz',
    description: '5 minutes per side - Pure speed battle'
  },
  {
    type: 'Blitz',
    initialTime: 5,
    increment: 3,
    displayName: '5+3 Blitz',
    description: '5 minutes with 3-second increment - Balanced blitz'
  },
  {
    type: 'Rapid',
    initialTime: 10,
    increment: 0,
    displayName: '10+0 Rapid',
    description: '10 minutes per side - Quick tactical battles'
  },
  {
    type: 'Rapid',
    initialTime: 15,
    increment: 10,
    displayName: '15+10 Rapid',
    description: '15 minutes with 10-second increment - Strategic rapid'
  },
  {
    type: 'Rapid',
    initialTime: 30,
    increment: 0,
    displayName: '30+0 Rapid',
    description: '30 minutes per side - Deep rapid thinking'
  },
  {
    type: 'Classical',
    initialTime: 60,
    increment: 30,
    displayName: '60+30 Classical',
    description: '1 hour with 30-second increment - Tournament style'
  },
  {
    type: 'Classical',
    initialTime: 90,
    increment: 30,
    displayName: '90+30 Classical',
    description: '1.5 hours with increment - Professional depth'
  },
  {
    type: 'Unlimited',
    initialTime: 0,
    increment: 0,
    displayName: 'Unlimited',
    description: 'No time limits - Pure chess thinking'
  }
]

/**
 * Gaming achievements that unlock new opponents or features
 */
export const achievements = [
  {
    id: 'first-victory',
    name: 'First Victory',
    description: 'Win your first game against an AI opponent',
    icon: '<Trophy className="w-4 h-4 inline" />',
    unlocked: false
  },
  {
    id: 'tactical-genius',
    name: 'Tactical Genius',
    description: 'Win 10 games with tactical combinations',
    icon: '<GiSwordsPower className="w-4 h-4 inline" />',
    unlocked: false
  },
  {
    id: 'strategic-mastermind',
    name: 'Strategic Mastermind',
    description: 'Win 15 games through positional play',
    icon: '<Brain className="w-4 h-4 inline" />',
    unlocked: false
  },
  {
    id: 'endgame-expert',
    name: 'Endgame Expert',
    description: 'Win 20 endgames from equal positions',
    icon: '<FaChessKing className="w-4 h-4 inline" />',
    unlocked: false
  },
  {
    id: 'speed-warrior',
    name: 'Speed Warrior',
    description: 'Win 10 blitz games in a row',
    icon: '<Zap className="w-4 h-4 inline" />',
    unlocked: false
  },
  {
    id: 'fearless-fighter',
    name: 'Fearless Fighter',
    description: 'Win against higher-rated opponents 5 times',
    icon: '<Shield className="w-4 h-4 inline" />',
    unlocked: false
  },
  {
    id: 'chess-master',
    name: 'Chess Master',
    description: 'Reach 2000+ rating',
    icon: '<FaCrown className="w-4 h-4 inline" />',
    unlocked: false
  }
]

/**
 * Get opponents available to a player based on their progress
 */
export const getAvailableOpponents = (
  playerRating: number, 
  completedGames: number, 
  unlockedAchievements: string[]
): AIOpponent[] => {
  return mockAIOpponents.map(opponent => {
    let isUnlocked = opponent.isUnlocked

    if (opponent.unlockRequirements) {
      const { minRating = 0, completedGames: minGames = 0, achievements = [] } = opponent.unlockRequirements
      
      isUnlocked = playerRating >= minRating && 
                   completedGames >= minGames && 
                   achievements.every(achievement => unlockedAchievements.includes(achievement))
    }

    return {
      ...opponent,
      isUnlocked
    }
  })
}

/**
 * Get recommended opponent based on player rating
 */
export const getRecommendedOpponent = (playerRating: number): AIOpponent => {
  const availableOpponents = mockAIOpponents.filter(opp => opp.isUnlocked)
  
  // Find opponent with rating closest to player rating (±100)
  const ideal = availableOpponents.find(opp => 
    Math.abs(opp.rating - playerRating) <= 100
  )
  
  if (ideal) return ideal
  
  // Fallback to closest available opponent
  return availableOpponents.reduce((closest, current) => {
    const currentDiff = Math.abs(current.rating - playerRating)
    const closestDiff = Math.abs(closest.rating - playerRating)
    return currentDiff < closestDiff ? current : closest
  })
}