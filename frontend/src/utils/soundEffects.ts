// Sound Effects System for Chess Training App
// Provides audio feedback for enhanced user experience

interface SoundConfig {
  volume: number;
  enabled: boolean;
}

class SoundFXManager {
  private config: SoundConfig = {
    volume: 0.3, // 30% volume by default
    enabled: true
  }

  // Audio context for better performance
  private audioContext: AudioContext | null = null
  private soundBuffers: Map<string, AudioBuffer> = new Map()

  constructor() {
    this.initializeAudio()
  }

  private async initializeAudio() {
    try {
      // Initialize AudioContext on user interaction
      if (typeof window !== 'undefined' && 'AudioContext' in window) {
        this.audioContext = new AudioContext()
      }
    } catch (error) {
      console.warn('Audio context initialization failed:', error)
    }
  }

  // Generate synthetic sounds using Web Audio API
  private createTone(frequency: number, duration: number, type: OscillatorType = 'sine'): void {
    if (!this.config.enabled || !this.audioContext) return

    try {
      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)

      oscillator.frequency.value = frequency
      oscillator.type = type

      // Envelope for smooth sound
      const now = this.audioContext.currentTime
      gainNode.gain.setValueAtTime(0, now)
      gainNode.gain.linearRampToValueAtTime(this.config.volume, now + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration)

      oscillator.start(now)
      oscillator.stop(now + duration)
    } catch (error) {
      console.warn('Sound generation failed:', error)
    }
  }

  // Click sound - subtle and pleasant
  public playClick(): void {
    this.createTone(800, 0.1, 'triangle')
  }

  // Success sound - uplifting chord
  public playSuccess(): void {
    if (!this.config.enabled) return
    
    setTimeout(() => this.createTone(523.25, 0.15, 'sine'), 0)   // C5
    setTimeout(() => this.createTone(659.25, 0.15, 'sine'), 50)  // E5
    setTimeout(() => this.createTone(783.99, 0.2, 'sine'), 100)  // G5
  }

  // Error sound - distinctive but not harsh
  public playError(): void {
    this.createTone(220, 0.3, 'sawtooth')
  }

  // Theme switch sound - magical transition
  public playThemeSwitch(): void {
    if (!this.config.enabled) return
    
    setTimeout(() => this.createTone(440, 0.1, 'sine'), 0)
    setTimeout(() => this.createTone(554.37, 0.1, 'sine'), 100)
    setTimeout(() => this.createTone(659.25, 0.15, 'sine'), 200)
  }

  // Chess move sound - satisfying click
  public playMove(): void {
    this.createTone(1000, 0.08, 'square')
  }

  // Chess capture sound - dramatic impact
  public playCapture(): void {
    if (!this.config.enabled) return
    
    this.createTone(150, 0.2, 'sawtooth')
    setTimeout(() => this.createTone(300, 0.1, 'triangle'), 100)
  }

  // Check/checkmate sound - alert but musical
  public playCheck(): void {
    if (!this.config.enabled) return
    
    setTimeout(() => this.createTone(880, 0.1, 'sine'), 0)
    setTimeout(() => this.createTone(1108.73, 0.15, 'sine'), 150)
  }

  // Configuration methods
  public setVolume(volume: number): void {
    this.config.volume = Math.max(0, Math.min(1, volume))
  }

  public setEnabled(enabled: boolean): void {
    this.config.enabled = enabled
  }

  public getVolume(): number {
    return this.config.volume
  }

  public isEnabled(): boolean {
    return this.config.enabled
  }

  // Resume audio context (required for some browsers)
  public async resumeAudio(): Promise<void> {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      try {
        await this.audioContext.resume()
      } catch (error) {
        console.warn('Failed to resume audio context:', error)
      }
    }
  }
}

// Create singleton instance
export const soundFX = new SoundFXManager()

// Auto-resume audio on first user interaction
if (typeof document !== 'undefined') {
  const resumeAudio = () => {
    soundFX.resumeAudio()
    document.removeEventListener('click', resumeAudio)
    document.removeEventListener('keydown', resumeAudio)
    document.removeEventListener('touchstart', resumeAudio)
  }

  document.addEventListener('click', resumeAudio, { once: true })
  document.addEventListener('keydown', resumeAudio, { once: true })
  document.addEventListener('touchstart', resumeAudio, { once: true })
}