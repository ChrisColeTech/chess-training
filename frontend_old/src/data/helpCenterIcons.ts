/**
 * Help Center Icon Mappings
 * Extracted from CategoryBrowser.tsx component
 * 
 * Maps help center categories to their corresponding Lucide React icons
 */

import { 
  Rocket, 
  Gamepad2, 
  Puzzle, 
  GraduationCap, 
  Settings, 
  Wrench, 
  AlertTriangle, 
  Zap 
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/**
 * Category icon mappings for help center categories
 */
export const categoryIcons: Record<string, LucideIcon> = {
  'getting-started': Rocket,
  'gameplay': Gamepad2,
  'puzzles': Puzzle,
  'training': GraduationCap,
  'account': Settings,
  'technical': Wrench,
  'troubleshooting': AlertTriangle,
  'advanced': Zap
}

/**
 * Get icon component for a category
 */
export const getCategoryIcon = (categoryId: string): LucideIcon => {
  return categoryIcons[categoryId] || Puzzle // Default fallback icon
}

/**
 * Get all available category icons
 */
export const getAllCategoryIcons = (): Record<string, LucideIcon> => {
  return { ...categoryIcons }
}