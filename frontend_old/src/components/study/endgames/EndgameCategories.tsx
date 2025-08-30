import React from 'react'
import { Search, Castle, Shield, BookOpen, Trophy, Target, Microscope, Crown, Sword } from 'lucide-react'
import { FaChessKnight } from 'react-icons/fa'
import type { EndgameCategoriesProps } from '@/types/endgameLibrary'

/**
 * Icon mapping for endgame categories
 */
const categoryIcons: Record<string, React.ComponentType<any>> = {
  'castle': Castle,
  'castle-turret': Castle,
  'crown': Crown,
  'chess-knight': FaChessKnight,
  'chess-bishop': FaChessKnight,
  'horse': FaChessKnight,
  'chess-pawn': FaChessKnight,
  'scroll': BookOpen,
  'shield': Shield,
  'microscope': Microscope,
  'sword': Sword,
  'trophy': Trophy,
  'target': Target
}

/**
 * EndgameCategories Component
 * Displays filterable list of endgame categories with progress tracking
 * Features fortress-themed gaming aesthetic with progress indicators
 */
export const EndgameCategories: React.FC<EndgameCategoriesProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  searchFilter,
  onSearchChange,
  progress,
  theme
}) => {
  /**
   * Filter categories based on search
   */
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    category.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    category.description.toLowerCase().includes(searchFilter.toLowerCase())
  )

  /**
   * Get icon component for category
   */
  const getCategoryIcon = (iconName: string) => {
    const IconComponent = categoryIcons[iconName] || BookOpen
    return IconComponent
  }

  /**
   * Get difficulty badge color
   */
  const getDifficultyColor = (_min: string, max: string) => {
    if (max === 'Grandmaster' || max === 'Master') return 'text-red-400'
    if (max === 'Advanced') return 'text-orange-400'
    if (max === 'Intermediate') return 'text-yellow-400'
    return 'text-green-400'
  }

  /**
   * Format study time display
   */
  const formatStudyTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`
  }

  return (
    <div className="space-y-4">
      {/* Search Section */}
      <div className="relative">
        <Search 
          className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.text} opacity-50`} 
          size={20} 
        />
        <input
          type="text"
          placeholder="Search fortress archives..."
          value={searchFilter}
          onChange={(e) => onSearchChange(e.target.value)}
          className={`
            w-full pl-10 pr-4 py-3 
            bg-slate-800/50 backdrop-blur-sm 
            border border-slate-700/50 
            rounded-xl text-white placeholder-slate-400 
            focus:outline-none focus:border-purple-500/50 
            focus:ring-2 focus:ring-purple-500/20
            transition-all duration-200
            hover:bg-slate-700/50
          `}
        />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-slate-700/10 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
      </div>

      {/* Categories Header */}
      <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className={`text-lg font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
            🏰 FORTRESS ARCHIVES
          </h3>
          <div className="text-xs text-slate-400">
            {filteredCategories.length} domains
          </div>
        </div>
        
        {searchFilter && (
          <div className="text-sm text-slate-400 mb-3">
            Searching: "<span className="text-white font-medium">{searchFilter}</span>"
          </div>
        )}

        {/* Category List */}
        <div className="space-y-2">
          {filteredCategories.map((category) => {
            const IconComponent = getCategoryIcon(category.icon)
            const isSelected = selectedCategory === category.name
            const categoryProgress = progress[category.name] || 0
            
            return (
              <button
                key={category.name}
                onClick={() => onCategorySelect(category.name)}
                disabled={!category.isUnlocked}
                className={`
                  w-full group relative overflow-hidden
                  rounded-lg border transition-all duration-300
                  ${isSelected
                    ? `bg-gradient-to-r ${category.color} border-transparent shadow-lg scale-102`
                    : category.isUnlocked
                    ? 'bg-slate-700/30 border-slate-600/50 hover:bg-slate-600/40 hover:border-slate-500/60 hover:scale-101'
                    : 'bg-slate-800/30 border-slate-700/30 opacity-60 cursor-not-allowed'
                  }
                `}
              >
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative p-3">
                  <div className="flex items-center gap-3">
                    {/* Category Icon */}
                    <div className={`
                      p-2 rounded-lg flex-shrink-0
                      ${isSelected
                        ? 'bg-white/20 shadow-inner'
                        : 'bg-slate-600/50 group-hover:bg-slate-500/60'
                      }
                      transition-all duration-200
                    `}>
                      <IconComponent 
                        size={20} 
                        className={`
                          ${isSelected ? 'text-white' : theme.text}
                          transition-colors duration-200
                        `}
                       
                      />
                    </div>

                    {/* Category Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          <h4 className={`
                            font-bold text-sm leading-tight
                            ${isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'}
                            transition-colors duration-200
                          `}>
                            {category.title}
                          </h4>
                          <p className={`
                            text-xs mt-0.5 leading-tight
                            ${isSelected ? 'text-white/80' : 'text-slate-400 group-hover:text-slate-300'}
                            transition-colors duration-200
                          `}>
                            {category.name}
                          </p>
                        </div>

                        {/* Position Count Badge */}
                        <div className={`
                          px-2 py-1 rounded text-xs font-bold
                          ${isSelected
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-600/50 text-slate-300 group-hover:bg-slate-500/60'
                          }
                          transition-all duration-200
                        `}>
                          {category.count}
                        </div>
                      </div>

                      {/* Category Stats */}
                      <div className="flex items-center gap-4 mt-2 text-xs">
                        <div className={`
                          flex items-center gap-1
                          ${isSelected ? 'text-white/70' : 'text-slate-500 group-hover:text-slate-400'}
                        `}>
                          <Target size={12} />
                          <span className={getDifficultyColor(category.difficultyRange.min, category.difficultyRange.max)}>
                            {category.difficultyRange.min}
                            {category.difficultyRange.min !== category.difficultyRange.max && ` - ${category.difficultyRange.max}`}
                          </span>
                        </div>

                        <div className={`
                          flex items-center gap-1
                          ${isSelected ? 'text-white/70' : 'text-slate-500 group-hover:text-slate-400'}
                        `}>
                          <BookOpen size={12} />
                          <span>{formatStudyTime(category.totalStudyTime)}</span>
                        </div>

                        {category.isUnlocked && (
                          <div className={`
                            flex items-center gap-1
                            ${isSelected ? 'text-white/70' : 'text-slate-500 group-hover:text-slate-400'}
                          `}>
                            <Trophy size={12} />
                            <span>{categoryProgress}%</span>
                          </div>
                        )}
                      </div>

                      {/* Progress Bar */}
                      {category.isUnlocked && (
                        <div className="mt-2">
                          <div className={`
                            w-full h-1 rounded-full overflow-hidden
                            ${isSelected ? 'bg-white/20' : 'bg-slate-600/50'}
                          `}>
                            <div 
                              className={`
                                h-full transition-all duration-500 ease-out
                                bg-gradient-to-r ${isSelected ? 'from-white/60 to-white/40' : category.color}
                              `}
                              style={{ width: `${categoryProgress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Locked Indicator */}
                      {!category.isUnlocked && (
                        <div className="flex items-center gap-1 mt-2 text-xs text-slate-500">
                          <Shield size={12} />
                          <span>Locked - Master previous domains</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Selection Highlight */}
                {isSelected && (
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
                )}
              </button>
            )
          })}
        </div>

        {/* No Results */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-8">
            <div className="text-slate-500 mb-2">
              <Search size={32} className="mx-auto mb-2 opacity-50" />
              <p>No fortress domains found</p>
            </div>
            <button
              onClick={() => onSearchChange('')}
              className={`text-sm bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent font-medium hover:opacity-80 transition-opacity`}
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  )
}