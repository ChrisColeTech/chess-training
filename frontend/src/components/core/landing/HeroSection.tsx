/**
 * Hero Section Component
 * Main hero section for the landing page with CTA buttons
 */

import React from 'react'
import { ArrowRight, Play, Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"
import type { HeroSectionProps } from '@/types/landing'

export const HeroSection: React.FC<HeroSectionProps> = ({
  theme,
  onGetStarted,
  onTryDemo
}) => {
  return (
    <section className="relative z-10 px-6 py-20">
      <div className="max-w-7xl mx-auto text-center">
        <div className="space-y-8">
          <div className="flex justify-center">
            <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${theme.primary} bg-opacity-20 border border-white/20 rounded-full text-sm font-medium backdrop-blur-sm`}>
              <Sparkles size={16} className="mr-2" />
              Powered by Stockfish AI Engine
            </div>
          </div>
          
          <h1 className={`text-5xl md:text-7xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent leading-tight`}>
            Master Chess<br />Like Never Before
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Train with AI-powered puzzles, analyze your games with Stockfish, and track your progress 
            with our comprehensive chess training platform designed for serious improvement.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button 
              size="lg"
              onClick={onGetStarted}
              className={`bg-gradient-to-r ${theme.primary} text-white text-lg px-8 py-4 rounded-xl shadow-2xl hover:shadow-3xl hover-glow active:animate-button-press transition-all duration-300 gpu-accelerated group`}
            >
              Start Training Free
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={onTryDemo}
              className="bg-black/20 border-white/20 text-white text-lg px-8 py-4 rounded-xl hover:bg-black/30 hover:border-white/30 transition-all duration-300 group"
            >
              <Play size={20} className="mr-2 group-hover:scale-110 transition-transform" />
              Try Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}