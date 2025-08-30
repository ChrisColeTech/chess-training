export interface BoardSizeConfig {
  label: string
  width: number
  height: number
  squareSize: number
}

export interface SoundEffect {
  id: string
  name: string
  description: string
  filename: string
}

export interface CoordinateStyle {
  id: string
  label: string
  fontSize: number
  fontWeight: string
  opacity: number
}

export interface HighlightStyle {
  id: string
  label: string
  type: 'dots' | 'border' | 'glow' | 'solid' | 'none'
  opacity: number
  color: string
}

export interface ArrowStyle {
  id: string
  label: string
  strokeWidth: number
  style: 'simple' | 'curved' | 'bold' | 'dashed' | 'glowing'
  opacity: number
}

// Board size configurations
export const boardSizeConfigs: Record<string, BoardSizeConfig> = {
  small: { label: 'Small (320px)', width: 320, height: 320, squareSize: 40 },
  medium: { label: 'Medium (480px)', width: 480, height: 480, squareSize: 60 },
  large: { label: 'Large (640px)', width: 640, height: 640, squareSize: 80 },
  xlarge: { label: 'Extra Large (800px)', width: 800, height: 800, squareSize: 100 }
}

// Available sound effects
export const availableSoundEffects: SoundEffect[] = [
  { id: 'none', name: 'None', description: 'No sound effects', filename: '' },
  { id: 'classic', name: 'Classic Wood', description: 'Traditional wooden piece sounds', filename: 'wood-move.mp3' },
  { id: 'modern', name: 'Modern Click', description: 'Clean digital sounds', filename: 'modern-click.mp3' },
  { id: 'stone', name: 'Stone Tap', description: 'Stone pieces on marble', filename: 'stone-tap.mp3' },
  { id: 'metal', name: 'Metal Clink', description: 'Metallic piece sounds', filename: 'metal-clink.mp3' },
  { id: 'glass', name: 'Crystal Chime', description: 'Glass-like tones', filename: 'glass-chime.mp3' },
  { id: 'synthetic', name: 'Synthetic Beep', description: 'Electronic notification sounds', filename: 'synth-beep.mp3' }
]

// Coordinate display styles
export const coordinateStyles: CoordinateStyle[] = [
  { id: 'classic', label: 'Classic', fontSize: 12, fontWeight: 'normal', opacity: 0.7 },
  { id: 'bold', label: 'Bold', fontSize: 14, fontWeight: 'bold', opacity: 0.8 },
  { id: 'minimal', label: 'Minimal', fontSize: 10, fontWeight: 'light', opacity: 0.6 },
  { id: 'gaming', label: 'Gaming', fontSize: 16, fontWeight: 'bold', opacity: 0.9 }
]

// Highlight styles for moves
export const highlightStyles: HighlightStyle[] = [
  { id: 'dots', label: 'Dots', type: 'dots', opacity: 0.8, color: '#10b981' },
  { id: 'border', label: 'Border', type: 'border', opacity: 0.9, color: '#3b82f6' },
  { id: 'glow', label: 'Glow', type: 'glow', opacity: 0.7, color: '#8b5cf6' },
  { id: 'solid', label: 'Solid', type: 'solid', opacity: 0.4, color: '#f59e0b' },
  { id: 'none', label: 'None', type: 'none', opacity: 0.0, color: 'transparent' }
]

// Arrow styles for markup
export const arrowStyles: ArrowStyle[] = [
  { id: 'simple', label: 'Simple', strokeWidth: 8, style: 'simple', opacity: 0.8 },
  { id: 'curved', label: 'Curved', strokeWidth: 10, style: 'curved', opacity: 0.7 },
  { id: 'bold', label: 'Bold', strokeWidth: 12, style: 'bold', opacity: 0.9 },
  { id: 'dashed', label: 'Dashed', strokeWidth: 8, style: 'dashed', opacity: 0.6 },
  { id: 'glowing', label: 'Glowing', strokeWidth: 10, style: 'glowing', opacity: 0.8 }
]

// Animation speed configurations
export const animationSpeeds = [
  { value: 'instant', label: 'Instant', duration: 0 },
  { value: 'fast', label: 'Fast', duration: 150 },
  { value: 'normal', label: 'Normal', duration: 300 },
  { value: 'slow', label: 'Slow', duration: 600 },
  { value: 'cinematic', label: 'Cinematic', duration: 1000 }
]

// Coordinate position options
export const coordinatePositions = [
  { value: 'inside', label: 'Inside Board' },
  { value: 'outside', label: 'Outside Board' },
  { value: 'both', label: 'Both Sides' }
]