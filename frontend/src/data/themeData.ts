import { Waves, Flame, Moon, Zap, Sword } from 'lucide-react'
import type { ThemeId } from '../stores/themeStore'

/**
 * Theme Data Constants - Following Document 12 data organization
 * Single Responsibility: Theme display data only
 * No logic, no state, no UI rendering
 * Pure data definitions
 */

export interface ThemeDisplayData {
  id: ThemeId
  name: string
  shortName: string
  description: string
  icon: any
  gradient: string
  accentColor: string
  particles: boolean
}

export const THEME_DISPLAY_DATA: ThemeDisplayData[] = [
  { 
    id: 'cyber-neon' as ThemeId, 
    name: 'Cyber Neon',
    shortName: 'CYBER\nNEON',
    description: 'Electric blue gaming',
    icon: Waves,
    gradient: 'from-cyan-400 via-blue-500 to-purple-600',
    accentColor: 'cyan-400',
    particles: true
  },
  { 
    id: 'dragon-gold' as ThemeId, 
    name: 'Dragon Gold',
    shortName: 'DRAGON\nGOLD', 
    description: 'Legendary treasure',
    icon: Flame,
    gradient: 'from-yellow-400 via-orange-500 to-red-600',
    accentColor: 'yellow-400',
    particles: true
  },
  { 
    id: 'shadow-knight' as ThemeId, 
    name: 'Shadow Knight',
    shortName: 'SHADOW\nKNIGHT',
    description: 'Dark & mysterious', 
    icon: Moon,
    gradient: 'from-gray-400 via-slate-500 to-indigo-600',
    accentColor: 'gray-400',
    particles: true
  },
  { 
    id: 'emerald-matrix' as ThemeId, 
    name: 'Emerald Matrix',
    shortName: 'EMERALD\nMATRIX',
    description: 'Digital forest',
    icon: Zap, 
    gradient: 'from-green-400 via-emerald-500 to-teal-600',
    accentColor: 'green-400',
    particles: true
  },
  { 
    id: 'crimson-war' as ThemeId, 
    name: 'Crimson War',
    shortName: 'CRIMSON\nWAR',
    description: 'Battle-tested fury',
    icon: Sword,
    gradient: 'from-red-400 via-rose-500 to-pink-600', 
    accentColor: 'red-400',
    particles: true
  }
]

export const DIFFICULTY_LABELS = {
  1: 'Beginner',
  2: 'Easy', 
  3: 'Medium',
  4: 'Hard',
  5: 'Expert'
} as const

export const TIME_CONTROL_LABELS = {
  '1+0': '1 min',
  '3+0': '3 min', 
  '5+0': '5 min',
  '10+0': '10 min',
  '15+10': '15+10',
  'unlimited': '∞ No Limit'
} as const