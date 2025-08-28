/**
 * Testimonials Section Component
 * Displays user testimonials with ratings and improvements
 */

import React from 'react'
import { Star } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import type { TestimonialsSectionProps } from '@/types/landing'

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  theme
}) => {
  return (
    <section className="relative z-10 px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent mb-6`}>
            Trusted by Chess Players Worldwide
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of players who have improved their chess with our training platform.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gray-900/50 border-gray-700 hover:border-gray-600 transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-600 rounded-full flex items-center justify-center text-2xl mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">ELO: {testimonial.rating}</div>
                  </div>
                  <div className={`ml-auto px-3 py-1 bg-green-500/20 text-green-300 text-xs rounded-full border border-green-500/30`}>
                    {testimonial.improvement}
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 italic">"{testimonial.text}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}