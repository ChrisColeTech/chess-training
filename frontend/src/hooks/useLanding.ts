/**
 * Landing Page Hook
 * Handles all business logic, state management, and event handlers for the landing page
 */

import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { soundFX } from '@/utils/soundEffects'
import { mockLandingContent } from '@/data/landingContent'
import type { LandingHookReturn, LandingContent } from '@/types/landing'

/**
 * Landing Service - Mock implementation for visual mockup
 * In production, this would make real API calls to fetch landing page content
 */
class LandingService {
  /**
   * Simulate API delay for realistic UX
   */
  private static async simulateDelay(min = 100, max = 300): Promise<void> {
    const delay = Math.random() * (max - min) + min
    await new Promise(resolve => setTimeout(resolve, delay))
  }

  /**
   * Fetch landing page content
   */
  static async fetchLandingContent(): Promise<LandingContent> {
    await this.simulateDelay()
    return mockLandingContent
  }

  /**
   * Track user interaction for analytics (mock)
   */
  static async trackInteraction(action: string, target?: string): Promise<void> {
    await this.simulateDelay(50, 100)
    console.log(`Analytics: ${action}${target ? ` - ${target}` : ''}`)
  }
}

/**
 * Custom hook for landing page state and business logic
 * Handles all interactions, navigation, sound effects, and data management
 */
export const useLanding = (): LandingHookReturn => {
  const navigate = useNavigate()
  
  // State management
  const [content, setContent] = useState<LandingContent>(mockLandingContent)
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  /**
   * Load landing page content on mount
   */
  useEffect(() => {
    const loadContent = async () => {
      try {
        const landingContent = await LandingService.fetchLandingContent()
        setContent(landingContent)
      } catch (error) {
        console.error('Failed to load landing content:', error)
        // Fallback to mock data (already set in state)
      }
    }

    loadContent()
  }, [])

  /**
   * Handle feature card hover with sound effects and analytics
   */
  const handleFeatureHover = useCallback((index: number | null) => {
    setHoveredFeature(index)
    
    if (index !== null) {
      soundFX.playClick()
      LandingService.trackInteraction('feature_hover', content.features[index]?.title)
    }
  }, [content.features])

  /**
   * Handle navigation to register page
   */
  const handleGetStarted = useCallback(() => {
    soundFX.playClick()
    LandingService.trackInteraction('cta_click', 'get_started')
    navigate('/auth/register')
  }, [navigate])

  /**
   * Handle navigation to login page
   */
  const handleSignIn = useCallback(() => {
    soundFX.playClick()
    LandingService.trackInteraction('nav_click', 'sign_in')
    navigate('/auth/login')
  }, [navigate])

  /**
   * Handle demo navigation
   */
  const handleTryDemo = useCallback(() => {
    soundFX.playClick()
    LandingService.trackInteraction('cta_click', 'try_demo')
    navigate('/demo')
  }, [navigate])

  /**
   * Handle start training navigation with success sound
   */
  const handleStartTraining = useCallback(() => {
    soundFX.playSuccess()
    LandingService.trackInteraction('cta_click', 'start_training')
    navigate('/auth/register')
  }, [navigate])

  /**
   * Handle pricing navigation
   */
  const handleViewPricing = useCallback(() => {
    soundFX.playClick()
    LandingService.trackInteraction('cta_click', 'view_pricing')
    navigate('/pricing')
  }, [navigate])

  /**
   * Handle success action with sound effect (for prominent CTAs)
   */
  const handleSuccessAction = useCallback(() => {
    soundFX.playSuccess()
    LandingService.trackInteraction('success_action')
  }, [])

  return {
    // Data state
    content,
    hoveredFeature,
    
    // Event handlers (all business logic extracted to this hook)
    handleFeatureHover,
    handleGetStarted,
    handleSignIn,
    handleTryDemo,
    handleStartTraining,
    handleViewPricing,
    handleSuccessAction
  }
}