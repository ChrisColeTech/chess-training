import React from 'react'
import { Trophy } from 'lucide-react'
import { AchievementCard } from './AchievementCard'
import type { AchievementGridProps } from '@/types/achievements'

/**
 * Achievement Grid Component
 * Displays achievements in a responsive grid layout with loading and empty states
 */
export const AchievementGrid: React.FC<AchievementGridProps> = ({
  achievements,
  isLoading,
  filters,
  onFiltersChange,
  onAchievementClick,
  theme,
  columns = 4,
  showEmptyState = true
}) => {
  // Loading skeleton
  if (isLoading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-${columns} gap-6`}>
        {Array.from({ length: 12 }, (_, index) => (
          <div
            key={`skeleton-${index}`}
            className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-xl p-6 animate-pulse"
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-slate-700/50 rounded-full"></div>
            </div>
            <div className="space-y-3">
              <div className="h-6 bg-slate-700/50 rounded-lg w-3/4 mx-auto"></div>
              <div className="h-4 bg-slate-700/50 rounded w-full"></div>
              <div className="h-4 bg-slate-700/50 rounded w-2/3 mx-auto"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Empty state
  if (!achievements.length && showEmptyState) {
    return (
      <div className="text-center py-16">
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-xl p-8 max-w-md mx-auto">
          <div className="mb-6">
            <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${theme.glassMorphism} flex items-center justify-center`}>
              <Trophy size={32} className="text-slate-500" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-slate-300 mb-3">No Trophies Found</h3>
          <p className="text-slate-500 mb-6">
            {filters.searchText 
              ? `No achievements match "${filters.searchText}"`
              : 'Try adjusting your filters to discover more achievements'
            }
          </p>
          <button
            onClick={() => onFiltersChange({ ...filters, searchText: '', categories: [], rarities: [] })}
            className={`px-6 py-2 bg-gradient-to-r ${theme.primary} rounded-lg text-white font-medium hover:opacity-90 transition-opacity`}
          >
            Clear Filters
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-${columns} gap-6`}>
      {achievements.map((achievement) => (
        <AchievementCard
          key={achievement.id}
          achievement={achievement}
          theme={theme}
          onClick={onAchievementClick}
          showProgress={achievement.status === 'in_progress'}
          showDetails={true}
          size="medium"
          variant="card"
        />
      ))}
    </div>
  )
}

export default AchievementGrid