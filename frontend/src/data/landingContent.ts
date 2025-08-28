/**
 * Landing Page Content Data
 * Mock data for features, testimonials, and statistics displayed on the landing page
 */

import { TrendingUp, Target, Trophy, Users, Zap, Brain } from 'lucide-react'
import type { LandingContent } from '@/types/landing'

/**
 * Platform features displayed in the features section
 */
export const landingFeatures = [
  {
    icon: Target,
    title: 'Tactical Puzzles',
    description: 'Master chess tactics with over 10,000+ puzzles across all difficulty levels',
    color: 'from-red-500 to-pink-600',
    stats: '10,000+ Puzzles'
  },
  {
    icon: Brain,
    title: 'AI Training',
    description: 'Play against Stockfish AI with adaptive difficulty that matches your skill',
    color: 'from-blue-500 to-cyan-600',
    stats: 'Stockfish Engine'
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description: 'Detailed analytics and ELO rating system to track your improvement',
    color: 'from-green-500 to-emerald-600',
    stats: 'ELO Rating System'
  },
  {
    icon: Trophy,
    title: 'Achievement System',
    description: 'Unlock badges and achievements as you master different aspects of chess',
    color: 'from-yellow-500 to-orange-600',
    stats: '50+ Achievements'
  }
]

/**
 * User testimonials for social proof section
 */
export const landingTestimonials = [
  {
    name: 'Alex Chen',
    rating: 1850,
    avatar: '👨‍💻',
    text: 'Improved my rating by 300 points in 3 months. The tactical trainer is incredible!',
    improvement: '+300 ELO'
  },
  {
    name: 'Sarah Martinez',
    rating: 1650,
    avatar: '👩‍<GraduationCap className="w-4 h-4 inline" />',
    text: 'The AI adapts perfectly to my level. Finally found a training app that works.',
    improvement: '+250 ELO'
  },
  {
    name: 'David Kim',
    rating: 2100,
    avatar: '🧑‍💼',
    text: 'The spaced repetition for puzzles helped me memorize key patterns quickly.',
    improvement: '+180 ELO'
  }
]

/**
 * Platform statistics for stats section
 */
export const landingStats = [
  { label: 'Active Players', value: '25,000+', icon: Users },
  { label: 'Puzzles Solved', value: '2.5M+', icon: Target },
  { label: 'Hours Trained', value: '500K+', icon: Zap },
  { label: 'Average Rating Gain', value: '+230', icon: TrendingUp }
]

/**
 * Complete landing page content object
 */
export const mockLandingContent: LandingContent = {
  features: landingFeatures,
  testimonials: landingTestimonials,
  stats: landingStats
}