import React, { useState } from 'react'
import { Filter, Search, X, ChevronDown, Star, CheckSquare, Square } from 'lucide-react'
import type { AchievementFiltersProps } from '@/types/achievements'

/**
 * Achievement Filters Component
 * Comprehensive filtering system for the trophy room
 */
export const AchievementFilters: React.FC<AchievementFiltersProps> = ({
  filters,
  onFiltersChange,
  availableCategories,
  availableRarities,
  theme,
  isCollapsed = false
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, searchText: value })
  }

  const handleCategoryToggle = (category: typeof availableCategories[0]) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category]
    
    onFiltersChange({ ...filters, categories: newCategories })
  }

  const handleRarityToggle = (rarity: typeof availableRarities[0]) => {
    const newRarities = filters.rarities.includes(rarity)
      ? filters.rarities.filter(r => r !== rarity)
      : [...filters.rarities, rarity]
    
    onFiltersChange({ ...filters, rarities: newRarities })
  }


  const handleSortChange = (sortBy: typeof filters.sortBy) => {
    onFiltersChange({ 
      ...filters, 
      sortBy,
      sortDirection: filters.sortBy === sortBy && filters.sortDirection === 'asc' ? 'desc' : 'asc'
    })
  }

  const clearAllFilters = () => {
    onFiltersChange({
      categories: [],
      rarities: [],
      statuses: [],
      earnedOnly: false,
      availableOnly: false,
      secretOnly: false,
      searchText: '',
      sortBy: 'title',
      sortDirection: 'asc',
      difficultyRange: [1, 5],
      seriesFilter: undefined
    })
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-gray-400 border-gray-500/50 bg-gray-500/10'
      case 'Rare': return 'text-blue-400 border-blue-500/50 bg-blue-500/10'
      case 'Epic': return 'text-purple-400 border-purple-500/50 bg-purple-500/10'
      case 'Legendary': return 'text-yellow-400 border-yellow-500/50 bg-yellow-500/10'
      case 'Mythic': return 'text-pink-400 border-pink-500/50 bg-pink-500/10'
      default: return 'text-slate-400 border-slate-500/50 bg-slate-500/10'
    }
  }

  const activeFiltersCount = 
    filters.categories.length + 
    filters.rarities.length + 
    filters.statuses.length + 
    (filters.earnedOnly ? 1 : 0) + 
    (filters.availableOnly ? 1 : 0) + 
    (filters.secretOnly ? 1 : 0) +
    (filters.searchText ? 1 : 0)

  if (isCollapsed) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
        <div className="flex items-center gap-4">
          <Filter size={20} className="text-slate-400" />
          <span className="text-slate-300 font-medium">Filters</span>
          {activeFiltersCount > 0 && (
            <span className={`px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${theme.primary} text-white`}>
              {activeFiltersCount}
            </span>
          )}
          <div className="ml-auto">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <ChevronDown size={16} className={showAdvanced ? 'rotate-180' : ''} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Filter size={24} className={`${theme.text}`} />
          <h3 className="text-lg font-bold text-white">Trophy Room Filters</h3>
          {activeFiltersCount > 0 && (
            <span className={`px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r ${theme.primary} text-white`}>
              {activeFiltersCount} active
            </span>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-red-400 hover:text-red-300 transition-colors text-sm font-medium flex items-center gap-2"
          >
            <X size={16} />
            Clear All
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search achievements..."
          value={filters.searchText}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-colors"
        />
        {filters.searchText && (
          <button
            onClick={() => handleSearchChange('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onFiltersChange({ ...filters, earnedOnly: !filters.earnedOnly })}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
            filters.earnedOnly
              ? `bg-gradient-to-r ${theme.primary} text-white shadow-lg`
              : 'bg-slate-700/30 text-slate-400 hover:text-white hover:bg-slate-600/30'
          }`}
        >
          {filters.earnedOnly ? <CheckSquare size={16} /> : <Square size={16} />}
          Earned Only
        </button>
        
        <button
          onClick={() => onFiltersChange({ ...filters, availableOnly: !filters.availableOnly })}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
            filters.availableOnly
              ? `bg-gradient-to-r ${theme.secondary} text-white shadow-lg`
              : 'bg-slate-700/30 text-slate-400 hover:text-white hover:bg-slate-600/30'
          }`}
        >
          {filters.availableOnly ? <CheckSquare size={16} /> : <Square size={16} />}
          Available Only
        </button>
        
        <button
          onClick={() => onFiltersChange({ ...filters, secretOnly: !filters.secretOnly })}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
            filters.secretOnly
              ? `bg-gradient-to-r ${theme.accent} text-white shadow-lg`
              : 'bg-slate-700/30 text-slate-400 hover:text-white hover:bg-slate-600/30'
          }`}
        >
          {filters.secretOnly ? <CheckSquare size={16} /> : <Square size={16} />}
          Secret Only
        </button>
      </div>

      {/* Categories */}
      <div>
        <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
          Categories
          {filters.categories.length > 0 && (
            <span className="bg-slate-600 text-white px-2 py-0.5 rounded-full text-xs">
              {filters.categories.length}
            </span>
          )}
        </h4>
        <div className="flex flex-wrap gap-2">
          {availableCategories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryToggle(category)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                filters.categories.includes(category)
                  ? `bg-gradient-to-r ${theme.primary} text-white border-transparent shadow-lg`
                  : 'bg-slate-700/30 text-slate-400 hover:text-white hover:bg-slate-600/30 border-slate-600/30'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Rarities */}
      <div>
        <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
          Rarity
          {filters.rarities.length > 0 && (
            <span className="bg-slate-600 text-white px-2 py-0.5 rounded-full text-xs">
              {filters.rarities.length}
            </span>
          )}
        </h4>
        <div className="flex flex-wrap gap-2">
          {availableRarities.map(rarity => (
            <button
              key={rarity}
              onClick={() => handleRarityToggle(rarity)}
              className={`px-3 py-2 rounded-lg text-sm font-bold transition-all border ${
                filters.rarities.includes(rarity)
                  ? getRarityColor(rarity)
                  : 'bg-slate-700/30 text-slate-400 hover:text-white hover:bg-slate-600/30 border-slate-600/30'
              }`}
            >
              {rarity}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Filters */}
      <div>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
        >
          <ChevronDown size={16} className={`transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
          Advanced Filters
        </button>
        
        {showAdvanced && (
          <div className="mt-4 space-y-4 pt-4 border-t border-slate-700/50">
            {/* Difficulty Range */}
            <div>
              <h4 className="text-sm font-semibold text-slate-300 mb-2">Difficulty</h4>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={filters.difficultyRange[0]}
                  onChange={(e) => onFiltersChange({
                    ...filters,
                    difficultyRange: [parseInt(e.target.value), filters.difficultyRange[1]]
                  })}
                  className="flex-1"
                />
                <div className="flex items-center gap-2">
                  <Star size={16} className="text-yellow-400" />
                  <span className="text-sm text-slate-300 min-w-[60px]">
                    {filters.difficultyRange[0]} - {filters.difficultyRange[1]}
                  </span>
                </div>
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <h4 className="text-sm font-semibold text-slate-300 mb-2">Sort By</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'title', label: 'Name' },
                  { key: 'rarity', label: 'Rarity' },
                  { key: 'category', label: 'Category' },
                  { key: 'progress', label: 'Progress' },
                  { key: 'earnedAt', label: 'Earned Date' },
                  { key: 'difficulty', label: 'Difficulty' }
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => handleSortChange(key as typeof filters.sortBy)}
                    className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                      filters.sortBy === key
                        ? `bg-gradient-to-r ${theme.accent} text-white`
                        : 'bg-slate-700/30 text-slate-400 hover:text-white hover:bg-slate-600/30'
                    }`}
                  >
                    {label} {filters.sortBy === key && (filters.sortDirection === 'asc' ? '↑' : '↓')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AchievementFilters