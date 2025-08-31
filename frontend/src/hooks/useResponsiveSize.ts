import { useState, useEffect } from 'react'
import type { UseResponsiveSizeOptions } from '../types/hooks'

export const useResponsiveSize = (options: UseResponsiveSizeOptions): number => {
  const { baseSize, minSize, maxSize, breakpoints } = options
  
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Calculate responsive board size based on viewport
  const calculateSize = (): number => {
    const { width } = windowSize
    
    let calculatedSize = baseSize

    // Apply breakpoint-based scaling
    if (width <= breakpoints.mobile) {
      // Mobile: Use smaller size, prioritize minimum viable
      calculatedSize = Math.min(baseSize * 0.7, width * 0.9)
    } else if (width <= breakpoints.tablet) {
      // Tablet: Medium size with comfortable touch targets
      calculatedSize = Math.min(baseSize * 0.85, width * 0.6)
    } else if (width <= breakpoints.desktop) {
      // Desktop: Near full size
      calculatedSize = Math.min(baseSize, width * 0.5)
    } else {
      // Large desktop: Full size
      calculatedSize = baseSize
    }

    // Enforce constraints
    return Math.max(minSize, Math.min(maxSize, calculatedSize))
  }

  return Math.round(calculateSize())
}