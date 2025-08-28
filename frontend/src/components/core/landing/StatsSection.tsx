/**
 * Stats Section Component
 * Displays platform statistics with icons and animations
 */

import React from 'react'
import type { StatsSectionProps } from '@/types/landing'

export const StatsSection: React.FC<StatsSectionProps> = ({
  stats,
  theme
}) => {
  return (
    <section className="relative z-10 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="text-center">
                <div className={`mx-auto w-16 h-16 bg-gradient-to-br ${theme.primary} bg-opacity-20 rounded-xl flex items-center justify-center mb-4`}>
                  <IconComponent size={24} className={`bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`} />
                </div>
                <div className={`text-3xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}