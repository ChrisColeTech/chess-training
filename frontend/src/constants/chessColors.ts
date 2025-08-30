/**
 * Chess rating color system constants
 * Following SRP: Single responsibility for chess-related color definitions
 * Following DRY: Reusable color constants across the application
 */

export interface EloColorScheme {
  gradient: string
  ringClass: string
  minRating: number
  label: string
}

export const ELO_COLOR_SCHEMES: EloColorScheme[] = [
  {
    minRating: 2400,
    gradient: 'from-purple-400 to-purple-600',
    ringClass: 'ring-purple-500',
    label: 'Super GM'
  },
  {
    minRating: 2200,
    gradient: 'from-yellow-400 to-yellow-600',
    ringClass: 'ring-yellow-500', 
    label: 'GM'
  },
  {
    minRating: 2000,
    gradient: 'from-orange-400 to-orange-600',
    ringClass: 'ring-orange-500',
    label: 'Expert'
  },
  {
    minRating: 1800,
    gradient: 'from-blue-400 to-blue-600',
    ringClass: 'ring-blue-500',
    label: 'Class A'
  },
  {
    minRating: 1600,
    gradient: 'from-green-400 to-green-600',
    ringClass: 'ring-green-500',
    label: 'Class B'
  },
  {
    minRating: 1400,
    gradient: 'from-cyan-400 to-cyan-600',
    ringClass: 'ring-cyan-500',
    label: 'Class C'
  },
  {
    minRating: 1200,
    gradient: 'from-teal-400 to-teal-600',
    ringClass: 'ring-teal-500',
    label: 'Class D'
  },
  {
    minRating: 0,
    gradient: 'from-gray-400 to-gray-500',
    ringClass: 'ring-gray-500',
    label: 'Beginner'
  }
]

/**
 * Get ELO color scheme based on rating
 */
export const getEloColorScheme = (elo?: number): EloColorScheme => {
  if (!elo) return ELO_COLOR_SCHEMES[ELO_COLOR_SCHEMES.length - 1] // Default to beginner
  
  return ELO_COLOR_SCHEMES.find(scheme => elo >= scheme.minRating) || 
         ELO_COLOR_SCHEMES[ELO_COLOR_SCHEMES.length - 1]
}