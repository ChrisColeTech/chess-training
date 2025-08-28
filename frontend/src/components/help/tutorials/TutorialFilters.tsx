/**
 * TutorialFilters Component
 * 
 * Search and filter controls for tutorials.
 * Page-specific component for TutorialsPage following proper SRP architecture.
 */

import React from 'react'
import { Search } from 'lucide-react'

interface TutorialFiltersProps {
  searchTerm: string
  selectedCategory: string
  selectedLevel: string
  categories: string[]
  levels: string[]
  activeView: 'grid' | 'series'
  onSearchChange: (term: string) => void
  onCategoryChange: (category: string) => void
  onLevelChange: (level: string) => void
  onViewChange: (view: 'grid' | 'series') => void
}

export const TutorialFilters: React.FC<TutorialFiltersProps> = ({
  searchTerm,
  selectedCategory,
  selectedLevel,
  categories,
  levels,
  activeView,
  onSearchChange,
  onCategoryChange,
  onLevelChange,
  onViewChange,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-6">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 text-slate-400" size={20} />
        <input
          type="text"
          placeholder="Search tutorials..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500/50 transition-colors"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-4 py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-purple-500/50 transition-colors"
        >
          {categories.map(category => (
            <option key={category} value={category} className="bg-slate-800">
              {category}
            </option>
          ))}
        </select>

        {/* Level Filter */}
        <select
          value={selectedLevel}
          onChange={(e) => onLevelChange(e.target.value)}
          className="px-4 py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-purple-500/50 transition-colors"
        >
          {levels.map(level => (
            <option key={level} value={level} className="bg-slate-800">
              {level}
            </option>
          ))}
        </select>

        {/* View Toggle */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-2">
          <div className="flex gap-2">
            <button
              onClick={() => onViewChange('grid')}
              className={`px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                activeView === 'grid' ? 'bg-purple-600/30 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Tutorials
            </button>
            <button
              onClick={() => onViewChange('series')}
              className={`px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                activeView === 'series' ? 'bg-purple-600/30 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Series
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TutorialFilters