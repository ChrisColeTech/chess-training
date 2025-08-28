import React from 'react'
import { useThemeStore } from '@/stores/themeStore'
import { useLanding } from '@/hooks/useLanding'
import {
  HeroSection,
  StatsSection,
  FeaturesSection,
  TestimonialsSection,
  CTASection,
  LandingHeader,
  LandingFooter
} from '@/components/core/landing'
import { FaChessKing } from 'react-icons/fa'

export const LandingPage: React.FC = () => {
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()
  
  // Landing page business logic hook
  const {
    content,
    hoveredFeature,
    handleFeatureHover,
    handleGetStarted,
    handleSignIn,
    handleTryDemo,
    handleStartTraining,
    handleViewPricing
  } = useLanding()

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} text-white`}>
      {/* Enhanced Gaming Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Particles */}
        <div className={`absolute top-20 left-20 w-64 h-64 bg-gradient-to-br ${theme.accent} rounded-full opacity-10 blur-3xl animate-pulse-glow`}></div>
        <div className={`absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br ${theme.highlight} rounded-full opacity-15 blur-3xl animate-pulse-glow animation-delay-2000`}></div>
        <div className={`absolute top-1/2 right-10 w-48 h-48 bg-gradient-to-br ${theme.secondary} rounded-full opacity-8 blur-2xl animate-pulse-glow animation-delay-4000`}></div>
        
        {/* Moving Orbs */}
        <div className={`absolute top-10 left-1/4 w-32 h-32 bg-gradient-to-br ${theme.primary} rounded-full opacity-20 blur-xl animate-float`}></div>
        <div className={`absolute bottom-1/4 right-1/3 w-40 h-40 bg-gradient-to-br ${theme.accent} rounded-full opacity-15 blur-xl animate-float animation-delay-3000`}></div>
        
        {/* Chess Piece Silhouettes */}
        <div className="absolute top-32 right-32 text-9xl opacity-3 animate-bounce-subtle delay-1000"><FaChessKing className="w-4 h-4 inline" /></div>
        <div className="absolute bottom-32 left-32 text-8xl opacity-3 animate-bounce-subtle delay-2000">♛</div>
        <div className="absolute top-1/3 left-1/5 text-6xl opacity-3 animate-bounce-subtle delay-3000">♞</div>
        
        {/* Sparkle Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-white rounded-full animate-twinkle"></div>
          <div className="absolute top-3/4 right-1/3 w-2 h-2 bg-white rounded-full animate-twinkle animation-delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-2.5 h-2.5 bg-white rounded-full animate-twinkle animation-delay-2000"></div>
          <div className="absolute bottom-1/3 right-1/5 w-2 h-2 bg-white rounded-full animate-twinkle animation-delay-3000"></div>
        </div>
      </div>

      {/* Navigation Header */}
      <LandingHeader
        theme={theme}
        onSignIn={handleSignIn}
        onGetStarted={handleGetStarted}
      />

      {/* Hero Section */}
      <HeroSection
        theme={theme}
        onGetStarted={handleGetStarted}
        onTryDemo={handleTryDemo}
      />

      {/* Stats Section */}
      <StatsSection
        stats={content.stats}
        theme={theme}
      />

      {/* Features Section */}
      <FeaturesSection
        features={content.features}
        hoveredFeature={hoveredFeature}
        onFeatureHover={handleFeatureHover}
        theme={theme}
      />

      {/* Testimonials Section */}
      <TestimonialsSection
        testimonials={content.testimonials}
        theme={theme}
      />

      {/* CTA Section */}
      <CTASection
        theme={theme}
        onStartTraining={handleStartTraining}
        onViewPricing={handleViewPricing}
      />

      {/* Footer */}
      <LandingFooter
        theme={theme}
      />

      {/* Gaming Visual Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Chess Pieces Background */}
        <div className="absolute top-10 right-10 text-6xl opacity-5 animate-bounce-subtle delay-500">♜</div>
        <div className="absolute bottom-10 left-10 text-5xl opacity-5 animate-bounce-subtle delay-1000">♞</div>
        <div className="absolute top-1/3 right-1/4 text-4xl opacity-5 animate-bounce-subtle delay-1500">♝</div>
        <div className="absolute bottom-1/3 left-1/4 text-7xl opacity-5 animate-bounce-subtle delay-2000">♛</div>
      </div>
    </div>
  )
}