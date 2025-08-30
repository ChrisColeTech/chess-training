/**
 * Chess Theory Principles
 * Extracted from PuzzleTabs.tsx component
 */

export interface ChessPrinciple {
  text: string
  category: 'opening' | 'middlegame' | 'endgame' | 'general'
}

export const keyOpeningPrinciples: ChessPrinciple[] = [
  {
    text: 'Develop knights before bishops',
    category: 'opening'
  },
  {
    text: "Don't neglect king safety",
    category: 'opening'
  },
  {
    text: 'Control the center early',
    category: 'opening'
  },
  {
    text: 'Watch for weak squares like f7/f2',
    category: 'opening'
  }
] as const

// Additional principles that might be useful for other components
export const generalPrinciples: ChessPrinciple[] = [
  {
    text: 'Castle early for king safety',
    category: 'opening'
  },
  {
    text: 'Connect your rooks',
    category: 'opening'
  },
  {
    text: 'Trade when ahead in material',
    category: 'middlegame'
  },
  {
    text: 'Centralize your king in the endgame',
    category: 'endgame'
  }
] as const

// Utility functions
export const getPrinciplesByCategory = (category: ChessPrinciple['category']): ChessPrinciple[] => {
  return [...keyOpeningPrinciples, ...generalPrinciples].filter(principle => principle.category === category)
}

export const getFormattedPrinciplesList = (principles: ChessPrinciple[] = keyOpeningPrinciples): string[] => {
  return principles.map(principle => `• ${principle.text}`)
}