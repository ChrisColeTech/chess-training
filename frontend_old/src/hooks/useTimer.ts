import { useState, useEffect, useCallback } from 'react'

/**
 * Custom hook for managing timer functionality
 * Provides timer state and controls with automatic cleanup
 */
export const useTimer = (isActive: boolean, onTick?: (elapsed: number) => void) => {
  const [elapsed, setElapsed] = useState(0)

  /**
   * Format time in MM:SS format
   */
  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }, [])

  /**
   * Reset timer to zero
   */
  const reset = useCallback(() => {
    setElapsed(0)
  }, [])

  /**
   * Start timer
   */
  const start = useCallback(() => {
    // Timer activation is controlled by the isActive parameter
    // This function exists for API completeness but actual control
    // happens through the isActive prop
  }, [])

  /**
   * Stop timer
   */
  const stop = useCallback(() => {
    // Timer deactivation is controlled by the isActive parameter
    // This function exists for API completeness but actual control
    // happens through the isActive prop
  }, [])

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isActive) {
      interval = setInterval(() => {
        setElapsed(prev => {
          const newElapsed = prev + 1
          onTick?.(newElapsed)
          return newElapsed
        })
      }, 1000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isActive, onTick])

  // Reset elapsed time when timer becomes inactive
  useEffect(() => {
    if (!isActive) {
      // Don't auto-reset - let the parent component control when to reset
      // This allows displaying final time after puzzle completion
    }
  }, [isActive])

  return {
    elapsed,
    formattedTime: formatTime(elapsed),
    formatTime,
    reset,
    start,
    stop,
    isActive
  }
}