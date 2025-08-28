/**
 * Landing Page Type Definitions
 * Defines all interfaces for the landing page mockup components and data structures
 */

import type { LucideIcon } from 'lucide-react'

/**
 * Feature card interface for the landing page features section
 */
export interface Feature {
  /** Phosphor icon component to display */
  icon: LucideIcon
  /** Feature title */
  title: string
  /** Feature description text */
  description: string
  /** Tailwind gradient classes for styling */
  color: string
  /** Statistics text to display */
  stats: string
}

/**
 * User testimonial interface for social proof section
 */
export interface Testimonial {
  /** User's display name */
  name: string
  /** User's current chess rating */
  rating: number
  /** User's avatar emoji or image */
  avatar: string
  /** Testimonial text content */
  text: string
  /** Rating improvement displayed as badge */
  improvement: string
}

/**
 * Statistics interface for the stats section
 */
export interface Statistic {
  /** Statistic label */
  label: string
  /** Statistic value (formatted string) */
  value: string
  /** Phosphor icon component to display */
  icon: LucideIcon
}

/**
 * Landing page content data structure
 */
export interface LandingContent {
  /** Array of feature cards to display */
  features: Feature[]
  /** Array of user testimonials */
  testimonials: Testimonial[]
  /** Array of platform statistics */
  stats: Statistic[]
}

/**
 * Landing page hook return interface
 * Defines all state and handlers returned by useLanding hook
 */
export interface LandingHookReturn {
  // Data state
  /** Landing page content (features, testimonials, stats) */
  content: LandingContent
  /** Currently hovered feature index (for animations) */
  hoveredFeature: number | null
  
  // Event handlers (business logic in hook)
  /** Handle feature card hover */
  handleFeatureHover: (index: number | null) => void
  /** Handle navigation to register page */
  handleGetStarted: () => void
  /** Handle navigation to login page */
  handleSignIn: () => void
  /** Handle demo navigation */
  handleTryDemo: () => void
  /** Handle start training navigation */
  handleStartTraining: () => void
  /** Handle pricing navigation */
  handleViewPricing: () => void
  /** Handle success sound for CTA buttons */
  handleSuccessAction: () => void
}

/**
 * Hero section props interface
 */
export interface HeroSectionProps {
  /** Current theme object */
  theme: any
  /** Get started handler */
  onGetStarted: () => void
  /** Try demo handler */
  onTryDemo: () => void
}

/**
 * Stats section props interface
 */
export interface StatsSectionProps {
  /** Statistics data array */
  stats: Statistic[]
  /** Current theme object */
  theme: any
}

/**
 * Features section props interface
 */
export interface FeaturesSectionProps {
  /** Features data array */
  features: Feature[]
  /** Currently hovered feature index */
  hoveredFeature: number | null
  /** Feature hover handler */
  onFeatureHover: (index: number | null) => void
  /** Current theme object */
  theme: any
}

/**
 * Testimonials section props interface
 */
export interface TestimonialsSectionProps {
  /** Testimonials data array */
  testimonials: Testimonial[]
  /** Current theme object */
  theme: any
}

/**
 * CTA section props interface
 */
export interface CTASectionProps {
  /** Current theme object */
  theme: any
  /** Start training handler */
  onStartTraining: () => void
  /** View pricing handler */
  onViewPricing: () => void
}

/**
 * Landing navigation header props interface
 */
export interface LandingHeaderProps {
  /** Current theme object */
  theme: any
  /** Sign in navigation handler */
  onSignIn: () => void
  /** Get started navigation handler */
  onGetStarted: () => void
}

/**
 * Landing footer props interface
 */
export interface LandingFooterProps {
  /** Current theme object */
  theme: any
}