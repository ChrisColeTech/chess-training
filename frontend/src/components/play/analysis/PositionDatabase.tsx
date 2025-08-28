// Position Database Component - Following SRP for position management only
import React, { useState } from 'react'
import { FolderOpen, Search, Plus, Trash, Upload, Flame, Target, BookOpen, Crown, Sword } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { PositionDatabaseProps, AnalysisPosition } from '@/types/analysisBoard'
import { useThemeStore } from '@/stores/themeStore'
import { soundFX } from '@/utils/soundEffects'

export const PositionDatabase: React.FC<PositionDatabaseProps> = ({
  positions,
  onLoadPosition,
  onSavePosition,
  onDeletePosition,
  className = ''
}) => {
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'category'>('rating')

  // Single responsibility: Filter and search logic
  const filteredPositions = positions.filter(position => {
    const matchesSearch = position.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         position.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         position.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'All' || position.category === selectedCategory
    
    return matchesSearch && matchesCategory
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'rating':
        return b.rating - a.rating
      case 'category':
        return a.category.localeCompare(b.category)
      default:
        return 0
    }
  })

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(positions.map(p => p.category)))]

  // Get category icon
  const getCategoryIcon = (category: AnalysisPosition['category']) => {
    switch (category) {
      case 'Opening': return BookOpen
      case 'Middlegame': return Sword
      case 'Endgame': return Crown
      case 'Tactical': return Flame
      default: return Target
    }
  }

  // Get rating color
  const getRatingColor = (rating: number) => {
    if (rating >= 2000) return 'text-purple-400'
    if (rating >= 1700) return 'text-blue-400'
    if (rating >= 1400) return 'text-green-400'
    return 'text-yellow-400'
  }

  // Get difficulty badge
  const getDifficultyBadge = (rating: number) => {
    if (rating >= 2200) return { label: 'Master', color: 'border-purple-400 text-purple-400' }
    if (rating >= 1900) return { label: 'Expert', color: 'border-blue-400 text-blue-400' }
    if (rating >= 1600) return { label: 'Advanced', color: 'border-green-400 text-green-400' }
    if (rating >= 1300) return { label: 'Intermediate', color: 'border-yellow-400 text-yellow-400' }
    return { label: 'Beginner', color: 'border-gray-400 text-gray-400' }
  }

  const handleLoadPosition = (position: AnalysisPosition) => {
    onLoadPosition(position)
    soundFX.playSuccess()
  }

  const handleDeletePosition = (index: number) => {
    if (onDeletePosition) {
      onDeletePosition(index.toString())
      soundFX.playClick()
    }
  }

  return (
    <div className={`backdrop-blur-2xl bg-black/30 border-white/20 rounded-2xl border-2 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold uppercase tracking-wider flex items-center gap-2">
          <FolderOpen className="w-5 h-5" />
          Position Database
        </h3>
        <Badge variant="outline" className="text-xs">
          {filteredPositions.length} positions
        </Badge>
      </div>

      {/* Search and Filter Controls */}
      <div className="space-y-4 mb-6">
        {/* Search */}
        <div className="relative">
          <Input
            placeholder="Search positions, descriptions, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="backdrop-blur-xl bg-black/20 border-white/10 pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-60" />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              size="sm"
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="text-xs"
            >
              {category !== 'All' && React.createElement(getCategoryIcon(category as any), { className: "w-3 h-3 mr-1" })}
              {category}
            </Button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Sort by:</span>
          <div className="flex gap-1">
            {[
              { value: 'rating', label: 'Rating' },
              { value: 'name', label: 'Name' },
              { value: 'category', label: 'Category' }
            ].map((option) => (
              <Button
                key={option.value}
                size="sm"
                variant={sortBy === option.value ? 'default' : 'ghost'}
                onClick={() => setSortBy(option.value as any)}
                className="text-xs h-7"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Position List */}
      <ScrollArea className="h-80 w-full rounded-lg">
        {filteredPositions.length === 0 ? (
          <div className="text-center py-12 opacity-60">
            <FolderOpen className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <h4 className="font-medium mb-2">No positions found</h4>
            <p className="text-sm opacity-75">
              {searchQuery || selectedCategory !== 'All' 
                ? 'Try adjusting your search or filters'
                : 'Your position database is empty'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-3 pr-3">
            {filteredPositions.map((position, index) => {
              const CategoryIcon = getCategoryIcon(position.category)
              const difficulty = getDifficultyBadge(position.rating)
              
              return (
                <div
                  key={index}
                  className="group p-4 backdrop-blur-xl bg-black/20 border-white/10 rounded-lg border hover:bg-black/30 hover:border-white/20 transition-all duration-300 cursor-pointer"
                  onClick={() => handleLoadPosition(position)}
                >
                  <div className="flex items-start gap-3">
                    {/* Category Icon */}
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${theme.accent} bg-opacity-20 flex-shrink-0`}>
                      <CategoryIcon className="w-4 h-4" />
                    </div>

                    {/* Position Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm group-hover:text-white transition-colors truncate">
                            {position.name}
                          </h4>
                          {position.description && (
                            <p className="text-xs opacity-75 mt-1 line-clamp-2">
                              {position.description}
                            </p>
                          )}
                        </div>
                        
                        {/* Delete button for custom positions */}
                        {onDeletePosition && position.tags?.includes('custom') && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeletePosition(index)
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto text-red-400 hover:text-red-300"
                          >
                            <Trash className="w-3 h-3" />
                          </Button>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {position.category}
                          </Badge>
                          <Badge variant="outline" className={`text-xs ${difficulty.color}`}>
                            {difficulty.label}
                          </Badge>
                        </div>
                        
                        <div className={`text-sm font-bold ${getRatingColor(position.rating)}`}>
                          {position.rating}
                        </div>
                      </div>

                      {/* Tags */}
                      {position.tags && position.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {position.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span 
                              key={tagIndex}
                              className="text-xs px-2 py-0.5 bg-black/30 rounded border border-white/10 opacity-75"
                            >
                              {tag}
                            </span>
                          ))}
                          {position.tags.length > 3 && (
                            <span className="text-xs opacity-60">
                              +{position.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </ScrollArea>

      {/* Database Actions */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="grid grid-cols-2 gap-2">
          {onSavePosition && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                // This would typically open a modal or form
                const name = prompt('Position name:')
                if (name) {
                  onSavePosition(name, 'Tactical')
                }
              }}
              className="text-xs"
            >
              <Plus className="w-4 h-4 mr-1" />
              Save Current
            </Button>
          )}
          
          <Button
            size="sm"
            variant="outline"
            onClick={() => soundFX.playClick()}
            className="text-xs opacity-50"
            disabled
          >
            <Upload className="w-4 h-4 mr-1" />
            Import
          </Button>
        </div>

        {/* Database Stats */}
        <div className="mt-4 grid grid-cols-4 gap-2 text-xs">
          {categories.slice(1).map((category) => {
            const count = positions.filter(p => p.category === category).length
            const CategoryIcon = getCategoryIcon(category as any)
            
            return (
              <div key={category} className="text-center p-2 bg-black/20 rounded">
                <CategoryIcon className="w-4 h-4 mx-auto mb-1 opacity-75" />
                <div className="font-bold">{count}</div>
                <div className="opacity-60">{category}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default PositionDatabase