/**
 * Puzzle Progress Statistics Configuration
 * Extracted from PuzzleProgress.tsx component
 */

export interface ProgressStatistic {
  value: string | number
  label: string
  type: 'percentage' | 'rating' | 'count'
}

export const defaultProgressStats: ProgressStatistic[] = [
  {
    value: '92%',
    label: 'Opening Accuracy',
    type: 'percentage'
  },
  {
    value: 1340,
    label: 'Theory Rating',
    type: 'rating'
  },
  {
    value: 28,
    label: 'Traps Learned',
    type: 'count'
  }
] as const

// Individual stat getters for specific components
export const getOpeningAccuracy = () => '92%'
export const getTheoryRating = () => 1340
export const getTrapsLearned = () => 28

// Utility function to format stat values
export const formatStatValue = (stat: ProgressStatistic): string => {
  if (typeof stat.value === 'number') {
    return stat.value.toLocaleString()
  }
  return stat.value
}