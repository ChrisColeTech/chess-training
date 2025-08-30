import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { ChevronDown, ChevronUp, Filter, Search, Star, X } from 'lucide-react'
import type { CustomPuzzleFilters as CustomPuzzleFiltersType, CustomPuzzleDifficulty, PuzzleSource } from '@/types/customPuzzles'
// Default puzzle configurations'
// Default source mappings'

interface CustomPuzzleFiltersComponentProps {
  filters: CustomPuzzleFiltersType
  searchQuery: string
  onFiltersChange: (filters: Partial<CustomPuzzleFiltersType>) => void
  onSearchChange: (query: string) => void
  onClearAll: () => void
  availableThemes: string[]
  availableTags: string[]
  theme: any
}

/**
 * Custom puzzle filters and search component
 * Handles advanced filtering and searching of custom puzzles
 * Follows SRP - only handles filter UI and state management
 */
export const CustomPuzzleFilters: React.FC<CustomPuzzleFiltersComponentProps> = ({
  filters,
  searchQuery,
  onFiltersChange,
  onSearchChange,
  onClearAll,
  availableThemes,
  availableTags,
  theme
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [ratingRange, setRatingRange] = useState<[number, number]>([
    filters.rating?.min || 400,
    filters.rating?.max || 2800
  ])

  // Use extracted configuration data
  // Default puzzle configurations
  const difficulties: CustomPuzzleDifficulty[] = ["Beginner", "Intermediate", "Advanced", "Expert"]
  const sources: PuzzleSource[] = ["lichess", "chess.com", "user_created", "imported"]

  const handleDifficultyToggle = (difficulty: CustomPuzzleDifficulty) => {
    const current = filters.difficulty || []
    const updated = current.includes(difficulty)
      ? current.filter(d => d !== difficulty)
      : [...current, difficulty]
    
    onFiltersChange({ 
      difficulty: updated.length > 0 ? updated : undefined 
    })
  }

  const handleSourceToggle = (source: PuzzleSource) => {
    const current = filters.source || []
    const updated = current.includes(source)
      ? current.filter(s => s !== source)
      : [...current, source]
    
    onFiltersChange({ 
      source: updated.length > 0 ? updated : undefined 
    })
  }

  const handleThemeToggle = (theme: string) => {
    const current = filters.themes || []
    const updated = current.includes(theme)
      ? current.filter(t => t !== theme)
      : [...current, theme]
    
    onFiltersChange({ 
      themes: updated.length > 0 ? updated : undefined 
    })
  }

  const handleTagToggle = (tag: string) => {
    const current = filters.tags || []
    const updated = current.includes(tag)
      ? current.filter(t => t !== tag)
      : [...current, tag]
    
    onFiltersChange({ 
      tags: updated.length > 0 ? updated : undefined 
    })
  }

  const handleRatingRangeChange = (values: number[]) => {
    setRatingRange([values[0], values[1]])
    onFiltersChange({
      rating: { min: values[0], max: values[1] }
    })
  }

  const hasActiveFilters = Object.values(filters).some(filter => 
    filter !== undefined && 
    (Array.isArray(filter) ? filter.length > 0 : true)
  ) || searchQuery.trim() !== ''

  const activeFilterCount = Object.values(filters).filter(filter => 
    filter !== undefined && 
    (Array.isArray(filter) ? filter.length > 0 : true)
  ).length

  return (
    <Card className="backdrop-blur-xl bg-black/20 border-white/10 hover:border-white/20 transition-all duration-500">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold text-white flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Search & Filters
            {activeFilterCount > 0 && (
              <Badge className="ml-2 bg-cyan-500 text-white">
                {activeFilterCount}
              </Badge>
            )}
          </CardTitle>
          <div className="flex space-x-2">
            {hasActiveFilters && (
              <Button
                onClick={onClearAll}
                size="sm"
                variant="outline"
                className="bg-black/30 border-red-500/30 text-red-300 hover:bg-red-500/10 hover:border-red-500/50"
              >
                <X className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            )}
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              size="sm"
              variant="outline"
              className="bg-black/30 border-white/20 text-white hover:bg-white/10 hover:border-white/30"
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search puzzles by title, theme, author, or tags..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-black/30 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all duration-300"
          />
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-4">
          {/* Difficulty Filter */}
          <div>
            <div className="text-sm font-medium text-white mb-2">Difficulty</div>
            <div className="flex flex-wrap gap-2">
              {difficulties.map(difficulty => {
                const isSelected = filters.difficulty?.includes(difficulty) || false
                const colorClass = (() => {
                  switch (difficulty) {
                    case 'Beginner': return isSelected ? 'bg-green-500 text-white border-green-500' : 'border-green-500/30 text-green-300 hover:bg-green-500/10'
                    case 'Intermediate': return isSelected ? 'bg-yellow-500 text-white border-yellow-500' : 'border-yellow-500/30 text-yellow-300 hover:bg-yellow-500/10'
                    case 'Advanced': return isSelected ? 'bg-orange-500 text-white border-orange-500' : 'border-orange-500/30 text-orange-300 hover:bg-orange-500/10'
                    case 'Expert': return isSelected ? 'bg-red-500 text-white border-red-500' : 'border-red-500/30 text-red-300 hover:bg-red-500/10'
                    default: return 'border-white/20 text-white hover:bg-white/10'
                  }
                })()
                
                return (
                  <Button
                    key={difficulty}
                    size="sm"
                    variant="outline"
                    onClick={() => handleDifficultyToggle(difficulty)}
                    className={`${colorClass} transition-all duration-200 hover-grow active:animate-button-press gpu-accelerated`}
                  >
                    {difficulty}
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Rating Range */}
          <div>
            <div className="text-sm font-medium text-white mb-2">
              Rating Range: {ratingRange[0]} - {ratingRange[1]}
            </div>
            <Slider
              value={ratingRange}
              onValueChange={handleRatingRangeChange}
              min={400}
              max={2800}
              step={50}
              className="w-full"
            />
          </div>

          {/* Source Filter */}
          <div>
            <div className="text-sm font-medium text-white mb-2">Source</div>
            <div className="flex flex-wrap gap-2">
              {sources.map(source => {
                const isSelected = filters.source?.includes(source) || false
                // Using imported source mapping function
                
                return (
                  <Button
                    key={source}
                    size="sm"
                    variant="outline"
                    onClick={() => handleSourceToggle(source)}
                    className={`transition-all duration-200 hover-grow active:animate-button-press gpu-accelerated ${
                      isSelected 
                        ? `bg-gradient-to-r ${theme.primary} text-white border-transparent`
                        : 'border-white/20 text-white hover:bg-white/10 hover:border-white/30'
                    }`}
                  >
                    {source.charAt(0).toUpperCase() + source.slice(1).replace("_", " ")}
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Themes Filter */}
          {availableThemes.length > 0 && (
            <div>
              <div className="text-sm font-medium text-white mb-2">Themes</div>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {availableThemes.map(themeItem => {
                  const isSelected = filters.themes?.includes(themeItem) || false
                  
                  return (
                    <Button
                      key={themeItem}
                      size="sm"
                      variant="outline"
                      onClick={() => handleThemeToggle(themeItem)}
                      className={`transition-all duration-200 hover-grow active:animate-button-press gpu-accelerated ${
                        isSelected 
                          ? 'bg-purple-500 text-white border-purple-500'
                          : 'border-white/20 text-white hover:bg-white/10 hover:border-white/30'
                      }`}
                    >
                      {themeItem}
                    </Button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Tags Filter */}
          {availableTags.length > 0 && (
            <div>
              <div className="text-sm font-medium text-white mb-2">Tags</div>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {availableTags.slice(0, 20).map(tag => {
                  const isSelected = filters.tags?.includes(tag) || false
                  
                  return (
                    <Button
                      key={tag}
                      size="sm"
                      variant="outline"
                      onClick={() => handleTagToggle(tag)}
                      className={`transition-all duration-200 hover-grow active:animate-button-press gpu-accelerated ${
                        isSelected 
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'border-white/20 text-white hover:bg-white/10 hover:border-white/30'
                      }`}
                    >
                      #{tag}
                    </Button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Additional Options */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onFiltersChange({ bookmarkedOnly: !filters.bookmarkedOnly })}
              className={`transition-all duration-200 hover-grow active:animate-button-press gpu-accelerated ${
                filters.bookmarkedOnly
                  ? 'bg-yellow-500 text-white border-yellow-500'
                  : 'border-white/20 text-white hover:bg-white/10 hover:border-white/30'
              }`}
            >
              📋 Bookmarked Only
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={() => onFiltersChange({ featuredOnly: !filters.featuredOnly })}
              className={`transition-all duration-200 hover-grow active:animate-button-press gpu-accelerated ${
                filters.featuredOnly
                  ? 'bg-yellow-500 text-white border-yellow-500'
                  : 'border-white/20 text-white hover:bg-white/10 hover:border-white/30'
              }`}
            >
              <Star className="w-4 h-4 inline" /> Featured Only
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

