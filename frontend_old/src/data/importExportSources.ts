/**
 * Import/Export Supported Sources Configuration
 * Extracted from CustomPuzzleImportExport.tsx component
 */

export type ExportFormat = 'pgn' | 'json'

export interface SupportedSource {
  name: string
  color: string
  description: string
  category: 'import' | 'export' | 'both'
}

export const supportedSources: SupportedSource[] = [
  {
    name: 'Lichess studies and puzzles',
    color: 'bg-blue-400',
    description: 'Import puzzles from Lichess studies, puzzle collections, and individual positions',
    category: 'import'
  },
  {
    name: 'Chess.com puzzle collections',
    color: 'bg-green-400', 
    description: 'Import puzzle sets and tactical trainer collections from Chess.com',
    category: 'import'
  },
  {
    name: 'Standard PGN files with FEN positions',
    color: 'bg-purple-400',
    description: 'Import puzzles from PGN files containing FEN positions and solutions',
    category: 'both'
  },
  {
    name: 'Chess Training App JSON format',
    color: 'bg-yellow-400',
    description: 'Native JSON format for full puzzle metadata and collections',
    category: 'both'
  }
] as const

export const exportFormats: Array<{
  format: ExportFormat
  label: string
  icon: string
  description: string
}> = [
  {
    format: 'pgn',
    label: 'PGN',
    icon: 'FileText',
    description: 'Portable Game Notation - universally compatible format'
  },
  {
    format: 'json', 
    label: 'JSON',
    icon: 'FileText',
    description: 'JavaScript Object Notation - includes full metadata'
  }
] as const

// Import/Export URLs and examples
export const importExamples = {
  lichess: 'https://lichess.org/study/abc123',
  chessCom: 'https://chess.com/puzzles/problem/123456',
  pgnFile: 'puzzle-collection.pgn',
  jsonFile: 'my-puzzles.json'
} as const

// File acceptance patterns
export const fileAcceptancePatterns = {
  pgn: '.pgn,.txt',
  json: '.json',
  all: '.pgn,.txt,.json'
} as const

// Progress status types
export type ImportProgressStatus = 'processing' | 'complete' | 'error'

export interface ImportProgress {
  status: ImportProgressStatus
  current: number
  total: number
  message?: string
}

// Utility functions
export const getExportFormatLabel = (format: ExportFormat): string => {
  const formatConfig = exportFormats.find(f => f.format === format)
  return formatConfig?.label || format.toUpperCase()
}

export const getExportFormatDescription = (format: ExportFormat): string => {
  const formatConfig = exportFormats.find(f => f.format === format)
  return formatConfig?.description || `Export as ${format.toUpperCase()}`
}

export const getSupportedSourcesByCategory = (category: SupportedSource['category'] | 'all' = 'all'): SupportedSource[] => {
  if (category === 'all') {
    return [...supportedSources]
  }
  return supportedSources.filter(source => source.category === category || source.category === 'both')
}

export const isValidImportUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url)
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
  } catch {
    return false
  }
}

export const getImportSourceFromUrl = (url: string): string | null => {
  if (url.includes('lichess.org')) return 'lichess'
  if (url.includes('chess.com')) return 'chess-com'
  return null
}