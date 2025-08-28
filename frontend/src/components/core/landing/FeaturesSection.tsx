/**
 * Features Section Component
 * Displays platform features with hover effects and animations
 */

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { FeaturesSectionProps } from '@/types/landing'

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  features,
  hoveredFeature,
  onFeatureHover,
  theme
}) => {
  return (
    <section className="relative z-10 px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent mb-6`}>
            Everything You Need to Improve
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our comprehensive training system adapts to your skill level and focuses on areas where you need the most improvement.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            const isHovered = hoveredFeature === index
            
            return (
              <Card
                key={index}
                className={`bg-gray-900/50 border-gray-700 hover:border-gray-600 transition-all duration-300 cursor-pointer group hover:-translate-y-2 hover:shadow-2xl ${
                  isHovered ? 'ring-2 ring-white/20' : ''
                }`}
                onMouseEnter={() => onFeatureHover(index)}
                onMouseLeave={() => onFeatureHover(null)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <IconComponent size={24} className="text-white" />
                    </div>
                    <div className={`px-3 py-1 bg-gradient-to-r ${feature.color} bg-opacity-20 rounded-full text-xs font-medium border border-white/10`}>
                      {feature.stats}
                    </div>
                  </div>
                  <CardTitle className={`text-xl group-hover:bg-gradient-to-r group-hover:${theme.gradient} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}