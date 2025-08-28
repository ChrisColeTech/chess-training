/**
 * TutorialGrid Component
 * 
 * Displays a grid of tutorial cards with filtering and search capabilities.
 * Page-specific component for TutorialsPage following proper SRP architecture.
 */

import React from 'react'
import { BookOpen, CheckCircle, Clock, Play, Star } from 'lucide-react'
import type { Tutorial } from '@/types/tutorials'

interface TutorialGridProps {
  tutorials: Tutorial[]
  onTutorialSelect: (tutorial: Tutorial) => void
  getLevelColor: (level: string) => string
  getTypeIcon: (type: string) => string
}

export const TutorialGrid: React.FC<TutorialGridProps> = ({
  tutorials,
  onTutorialSelect,
  getLevelColor,
  getTypeIcon,
}) => {
  if (tutorials.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4"><BookOpen className="w-4 h-4 inline" /></div>
        <h3 className="text-xl font-bold text-slate-400 mb-2">No tutorials found</h3>
        <p className="text-slate-500">Try adjusting your search terms or filters.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tutorials.map((tutorial) => (
        <TutorialCard
          key={tutorial.id}
          tutorial={tutorial}
          onSelect={onTutorialSelect}
          getLevelColor={getLevelColor}
          getTypeIcon={getTypeIcon}
        />
      ))}
    </div>
  )
}

interface TutorialCardProps {
  tutorial: Tutorial
  onSelect: (tutorial: Tutorial) => void
  getLevelColor: (level: string) => string
  getTypeIcon: (type: string) => string
}

const TutorialCard: React.FC<TutorialCardProps> = ({
  tutorial,
  onSelect,
  getLevelColor,
  getTypeIcon,
}) => {
  // Determine progress for visual indicators
  const isCompleted = tutorial.completionRate > 90 // Mock check
  const progress = tutorial.completionRate || 0

  return (
    <div 
      className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-200 cursor-pointer group"
      onClick={() => onSelect(tutorial)}
    >
      {/* Thumbnail */}
      <div className="relative h-48 bg-slate-700/50 flex items-center justify-center">
        <div className="text-6xl">{tutorial.thumbnailUrl}</div>
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="p-4 bg-purple-600 rounded-full">
            <Play size={24} className="text-white" />
          </div>
        </div>
        {progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-600">
            <div 
              className="h-full bg-purple-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
        {isCompleted && (
          <div className="absolute top-3 right-3 bg-green-600 rounded-full p-1">
            <CheckCircle size={16} className="text-white" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(tutorial.difficulty)}`}>
            <span>{getTypeIcon(tutorial.type || '')}</span>
            <span>{tutorial.difficulty}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Clock size={12} />
            <span>{tutorial.estimatedDuration}m</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
          {tutorial.title}
        </h3>
        <p className="text-sm text-slate-300 mb-3 line-clamp-2">{tutorial.description}</p>

        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-slate-400">by {typeof tutorial.instructor === 'string' ? tutorial.instructor : tutorial.instructor?.name || 'Chess Master'}</span>
          <div className="flex items-center gap-1">
            <Star className="text-yellow-400" size={14} />
            <span className="text-sm text-slate-400">{tutorial.averageRating?.toFixed(1) || '4.8'}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          {tutorial.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-xs bg-slate-600/50 text-slate-300 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>

        <div className="text-xs text-slate-500">
          {tutorial.views?.toLocaleString() || '1,234'} views
        </div>
      </div>
    </div>
  )
}

export default TutorialGrid