/**
 * Analysis engine settings and configurations extracted from play components
 * Contains hardcoded values for chess engine analysis parameters
 */

export interface AnalysisSettings {
  depth: number
  multiPV: number
  timeLimit?: number
  threads?: number
  hashSize?: number
  contempt?: number
}

/**
 * Default analysis settings configuration
 */
export const defaultAnalysisSettings: AnalysisSettings = {
  depth: 15,
  multiPV: 3,
  timeLimit: undefined,
  threads: 2,
  hashSize: 512,
  contempt: 0
}

/**
 * Time limit options for analysis (in seconds)
 */
export const timeLimitOptions = [
  { label: 'None', value: undefined },
  { label: '10s', value: 10 },
  { label: '30s', value: 30 },
  { label: '60s', value: 60 }
] as const

/**
 * CPU threads configuration options
 */
export const threadOptions = [1, 2, 4, 8] as const

/**
 * Hash table size options (in MB)
 */
export const hashSizeOptions = [128, 512, 1024] as const

/**
 * Search depth range configuration
 */
export const depthRange = {
  min: 5,
  max: 25,
  default: 15,
  step: 1,
  labels: {
    min: 'Fast (5)',
    max: 'Deep (25)'
  }
} as const

/**
 * Multi-PV (Principal Variation) configuration
 */
export const multiPVConfig = {
  min: 1,
  max: 5,
  default: 3
} as const

/**
 * Contempt factor range for engine personality
 */
export const contemptRange = {
  min: -100,
  max: 100,
  step: 10,
  default: 0
} as const

/**
 * Engine status information
 */
export interface EngineStatus {
  engineName: string
  version: string
  isAnalyzing: boolean
}

/**
 * Default engine status
 */
export const defaultEngineStatus: EngineStatus = {
  engineName: 'Stockfish',
  version: '15.1',
  isAnalyzing: false
}