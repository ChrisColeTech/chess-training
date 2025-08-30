/**
 * TutorialSeries Component
 * 
 * Displays tutorial series with progress tracking and enrollment options.
 * Page-specific component for TutorialsPage following proper SRP architecture.
 */

import React from 'react'
import type { TutorialSeries } from '@/types/tutorials'
import { BookOpen } from 'lucide-react'

interface TutorialSeriesProps {
  series: TutorialSeries[]
  onSeriesSelect: (series: TutorialSeries) => void
  getLevelColor: (level: string) => string
}

export const TutorialSeriesComponent: React.FC<TutorialSeriesProps> = ({
  series,
  onSeriesSelect,
  getLevelColor,
}) => {
  if (series.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4"><BookOpen className="w-4 h-4 inline" /></div>
        <h3 className="text-xl font-bold text-slate-400 mb-2">No series available</h3>
        <p className="text-slate-500">Check back later for new learning series.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Learning Series</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {series.map((seriesItem) => (
          <SeriesCard
            key={seriesItem.id}
            series={seriesItem}
            onSelect={onSeriesSelect}
            getLevelColor={getLevelColor}
          />
        ))}
      </div>
    </div>
  )
}

interface SeriesCardProps {
  series: TutorialSeries
  onSelect: (series: TutorialSeries) => void
  getLevelColor: (level: string) => string
}

const SeriesCard: React.FC<SeriesCardProps> = ({
  series,
  onSelect,
  getLevelColor,
}) => {
  const progressPercentage = Math.round((series.completed / series.total) * 100)

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-3xl">{series.thumbnail}</div>
            <div>
              <h3 className="text-xl font-bold text-white">{series.title}</h3>
              <p className="text-sm text-slate-400">by {series.instructor}</p>
            </div>
          </div>
          <p className="text-slate-300 mb-3">{series.description}</p>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <span>{series.totalDuration}</span>
            <span>•</span>
            <span>{series.level}</span>
            <span>•</span>
            <span>{series.total} tutorials</span>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(series.level)}`}>
          {series.level}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-300">Progress</span>
          <span className="text-sm text-white font-medium">
            {series.completed}/{series.total} completed ({progressPercentage}%)
          </span>
        </div>
        <div className="w-full bg-slate-600 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-purple-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <button 
        onClick={() => onSelect(series)}
        className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-all duration-200 hover:shadow-lg"
      >
        {progressPercentage > 0 ? 'Continue Series' : 'Start Series'}
      </button>
    </div>
  )
}

export default TutorialSeriesComponent