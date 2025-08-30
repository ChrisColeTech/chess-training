/**
 * Analysis Position Configuration Data
 * Extracted from PositionDatabase component
 */

import { BookOpen, Crown, Flame, Sword, Target } from 'lucide-react'
import type { AnalysisPosition } from '@/types/analysisPositions'

// Category to icon mapping
export const categoryIconMap: Record<AnalysisPosition['category'], React.ComponentType<any>> = {
  'Opening': BookOpen,
  'Middlegame': Sword,
  'Endgame': Crown,
  'Tactical': Flame
} as const

// Default icon for unknown categories
export const defaultCategoryIcon = Target

// Helper function to get category icon
export const getCategoryIcon = (category: AnalysisPosition['category']) => {
  return categoryIconMap[category] || defaultCategoryIcon
}