// Sound Effects Utility - Web Audio API
class SoundEffects {
  private audioContext: AudioContext | null = null
  private enabled = true

  constructor() {
    // Initialize Web Audio API when user interacts
    if (typeof window !== 'undefined') {
      this.initializeAudio()
    }
  }

  private initializeAudio() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    } catch (error) {
      console.warn('Web Audio API not supported:', error)
      this.enabled = false
    }
  }

  private createBeep(frequency: number, duration: number, volume = 0.1) {
    if (!this.audioContext || !this.enabled) return

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime)
    oscillator.type = 'sine'

    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration)

    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + duration)
  }

  // Button click sound
  playClick() {
    this.createBeep(800, 0.1, 0.05)
  }

  // Success sound
  playSuccess() {
    this.createBeep(600, 0.15, 0.08)
    setTimeout(() => this.createBeep(800, 0.15, 0.08), 100)
  }

  // Error sound
  playError() {
    this.createBeep(300, 0.2, 0.06)
  }

  // Hover sound
  playHover() {
    this.createBeep(1000, 0.05, 0.02)
  }

  // Level up sound
  playLevelUp() {
    this.createBeep(523, 0.15, 0.08)  // C5
    setTimeout(() => this.createBeep(659, 0.15, 0.08), 150)  // E5
    setTimeout(() => this.createBeep(784, 0.15, 0.08), 300)  // G5
    setTimeout(() => this.createBeep(1047, 0.3, 0.1), 450)   // C6
  }

  // Theme switch sound
  playThemeSwitch() {
    this.createBeep(440, 0.1, 0.04)
    setTimeout(() => this.createBeep(550, 0.1, 0.04), 80)
  }

  // Enable/disable sounds
  toggle() {
    this.enabled = !this.enabled
  }

  isEnabled() {
    return this.enabled
  }
}

export const soundFX = new SoundEffects()