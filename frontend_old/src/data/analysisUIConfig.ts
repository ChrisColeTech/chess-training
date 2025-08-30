/**
 * Analysis UI Configuration - FRONTEND PART  
 * UI display settings and configuration options for analysis interface
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
 * Time limit options for analysis UI (in seconds)
 */
export const timeLimitOptions = [
  { label: 'None', value: undefined },
  { label: '10s', value: 10 },
  { label: '30s', value: 30 },
  { label: '60s', value: 60 }
] as const

/**
 * CPU threads configuration options for UI
 */
export const threadOptions = [1, 2, 4, 8] as const

/**
 * Hash table size options (in MB) for UI selection
 */
export const hashSizeOptions = [128, 512, 1024] as const

/**
 * Search depth range configuration for UI controls
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
 * Multi-PV (Principal Variation) configuration for UI
 */
export const multiPVConfig = {
  min: 1,
  max: 5,
  default: 3
} as const

/**
 * Contempt factor range for engine personality UI
 */
export const contemptRange = {
  min: -100,
  max: 100,
  step: 10,
  default: 0
} as const

/**
 * Engine status information for UI display
 */
export interface EngineStatus {
  engineName: string
  version: string
  isAnalyzing: boolean
}

/**
 * Default engine status for UI
 */
export const defaultEngineStatus: EngineStatus = {
  engineName: 'Stockfish',
  version: '15.1',
  isAnalyzing: false
}