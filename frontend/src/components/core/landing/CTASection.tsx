/**
 * CTA Section Component
 * Call-to-action section with primary and secondary actions
 */

import React from 'react'
import { Zap } from 'lucide-react'
import { FaCrown } from 'react-icons/fa'
import { Button } from "@/components/ui/button"
import type { CTASectionProps } from '@/types/landing'

export const CTASection: React.FC<CTASectionProps> = ({
  theme,
  onStartTraining,
  onViewPricing
}) => {
  return (
    <section className="relative z-10 px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className={`p-12 bg-gradient-to-r ${theme.primary} bg-opacity-10 rounded-3xl border border-white/10 backdrop-blur-sm`}>
          <FaCrown size={64} className={`mx-auto mb-6 bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`} />
          <h2 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent mb-6`}>
            Ready to Become a Chess Master?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our chess training platform today and start your journey to chess mastery with AI-powered training, 
            personalized lessons, and comprehensive progress tracking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={onStartTraining}
              className={`bg-gradient-to-r ${theme.primary} text-white text-xl px-12 py-4 rounded-xl shadow-2xl hover:shadow-3xl hover-glow active:animate-button-press transition-all duration-300 gpu-accelerated group`}
            >
              Start Free Training
              <Zap size={20} className="ml-2 group-hover:scale-110 transition-transform" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={onViewPricing}
              className="bg-black/20 border-white/20 text-white text-xl px-12 py-4 rounded-xl hover:bg-black/30 hover:border-white/30 transition-all duration-300"
            >
              View Pricing
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}