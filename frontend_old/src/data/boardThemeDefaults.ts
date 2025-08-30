/**
 * Default Board Theme Colors
 * Extracted from CustomPuzzleBoard.tsx component
 */

export interface BoardThemeColors {
  lightSquare: string
  darkSquare: string
  name: string
}

export const defaultBoardTheme: BoardThemeColors = {
  lightSquare: '#f0d9b5',
  darkSquare: '#b58863',
  name: 'Classic Wooden'
} as const

// Additional board themes that might be useful
export const boardThemePresets: BoardThemeColors[] = [
  {
    lightSquare: '#f0d9b5',
    darkSquare: '#b58863',
    name: 'Classic Wooden'
  },
  {
    lightSquare: '#eeeed2',
    darkSquare: '#769656',
    name: 'Green'
  },
  {
    lightSquare: '#e8e8e8',
    darkSquare: '#4169e1',
    name: 'Blue'
  },
  {
    lightSquare: '#ffffff',
    darkSquare: '#999999',
    name: 'Gray'
  }
] as const

// Board styling configuration
export const boardStyleDefaults = {
  borderRadius: '12px',
  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
  animationDuration: 200
} as const

// Utility functions
export const getBoardThemeByName = (name: string): BoardThemeColors | undefined => {
  return boardThemePresets.find(theme => theme.name === name)
}

export const getDefaultBoardStyles = (boardTheme?: BoardThemeColors | any) => {
  const theme = boardTheme || defaultBoardTheme
  
  return {
    customBoardStyle: {
      borderRadius: boardStyleDefaults.borderRadius,
      boxShadow: boardStyleDefaults.boxShadow,
      transform: 'translateZ(0)' // GPU acceleration
    },
    customLightSquareStyle: { 
      backgroundColor: typeof theme === 'object' ? theme?.lightSquare || defaultBoardTheme.lightSquare : defaultBoardTheme.lightSquare,
      transition: 'background-color 0.2s ease'
    },
    customDarkSquareStyle: { 
      backgroundColor: typeof theme === 'object' ? theme?.darkSquare || defaultBoardTheme.darkSquare : defaultBoardTheme.darkSquare,
      transition: 'background-color 0.2s ease'
    },
    animationDuration: boardStyleDefaults.animationDuration
  }
}

export const isValidBoardTheme = (theme: any): theme is BoardThemeColors => {
  return (
    theme &&
    typeof theme === 'object' &&
    typeof theme.lightSquare === 'string' &&
    typeof theme.darkSquare === 'string'
  )
}