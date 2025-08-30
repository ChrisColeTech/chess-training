import React from 'react'
import { Search, Database, Target, Flame, TrendingUp, Equal, TrendingDown } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import type { OpeningSearchProps } from '@/types/openingExplorer'

/**
 * Opening search and filter component
 * Handles database searching and filtering by category, difficulty, popularity
 */
const OpeningSearch: React.FC<OpeningSearchProps> = ({
  filters,
  onFiltersChange,
  results,
  isLoading
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Intermediate': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'Advanced': return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'Master': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'Grandmaster': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getPopularityIcon = (popularity: string) => {
    switch (popularity) {
      case 'Very High': return Flame
      case 'High': return TrendingUp
      case 'Medium': return Equal
      case 'Low': return TrendingDown
      default: return Target
    }
  }

  return (
    <div className="space-y-6">
      {/* Search & filters */}
      <div className="backdrop-blur-2xl bg-black/30 border-white/20 rounded-2xl border-2 p-6">
        <h3 className="font-bold mb-4 uppercase tracking-wider flex items-center gap-2">
          <Search className="w-5 h-5" />
          Search Database
        </h3>
        
        <div className="space-y-4">
          <Input
            placeholder="Search openings or ECO codes..."
            value={filters.searchQuery}
            onChange={(e) => onFiltersChange({ searchQuery: e.target.value })}
            className="backdrop-blur-xl bg-black/20 border-white/10"
            disabled={isLoading}
          />

          <div className="grid grid-cols-2 gap-2">
            <Select 
              value={filters.category} 
              onValueChange={(value) => onFiltersChange({ category: value as any })}
            >
              <SelectTrigger className="backdrop-blur-xl bg-black/20 border-white/10">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Types</SelectItem>
                <SelectItem value="Defense">Defense</SelectItem>
                <SelectItem value="Game">Game</SelectItem>
                <SelectItem value="Gambit">Gambit</SelectItem>
                <SelectItem value="System">System</SelectItem>
                <SelectItem value="Opening">Opening</SelectItem>
              </SelectContent>
            </Select>

            <Select 
              value={filters.difficulty} 
              onValueChange={(value) => onFiltersChange({ difficulty: value as any })}
            >
              <SelectTrigger className="backdrop-blur-xl bg-black/20 border-white/10">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
                <SelectItem value="Master">Master</SelectItem>
                <SelectItem value="Grandmaster">Grandmaster</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Select 
            value={filters.popularity} 
            onValueChange={(value) => onFiltersChange({ popularity: value as any })}
          >
            <SelectTrigger className="backdrop-blur-xl bg-black/20 border-white/10">
              <SelectValue placeholder="Popularity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Popularity</SelectItem>
              <SelectItem value="Very High">Very High</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Rare">Rare</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search stats */}
        {results && (
          <div className="mt-4 text-sm opacity-75">
            Found {results.totalResults} openings in {results.searchTime.toFixed(0)}ms
          </div>
        )}
      </div>

      {/* Results list */}
      <div className="backdrop-blur-2xl bg-black/30 border-white/20 rounded-2xl border-2 p-6">
        <h3 className="font-bold mb-4 uppercase tracking-wider flex items-center gap-2">
          <Database className="w-5 h-5" />
          Openings ({results?.totalResults || 0})
        </h3>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
          ) : results?.openings.length === 0 ? (
            <div className="text-center py-8 opacity-75">
              <div className="text-lg mb-2">No openings found</div>
              <div className="text-sm">Try adjusting your search criteria</div>
              {results.suggestions && (
                <div className="mt-3 space-y-1">
                  {results.suggestions.map((suggestion, i) => (
                    <div key={i} className="text-xs opacity-60">• {suggestion}</div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            results?.openings.map((opening, index) => {
              const PopularityIcon = getPopularityIcon(opening.popularity)
              return (
                <div
                  key={index}
                  className="p-4 backdrop-blur-xl bg-black/20 border border-white/10 rounded-lg cursor-pointer transition-all hover:bg-black/30 hover:border-white/20"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-semibold text-sm mb-1">{opening.name}</div>
                      <div className="text-xs opacity-75">ECO: {opening.eco}</div>
                    </div>
                    <PopularityIcon className="w-4 h-4 opacity-75" />
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getDifficultyColor(opening.difficulty)}>
                      {opening.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-xs border-white/20">
                      {opening.category}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <div className="font-bold text-green-400">{opening.whiteWins.toFixed(1)}%</div>
                      <div className="opacity-75">White</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-yellow-400">{opening.draws.toFixed(1)}%</div>
                      <div className="opacity-75">Draw</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-red-400">{opening.blackWins.toFixed(1)}%</div>
                      <div className="opacity-75">Black</div>
                    </div>
                  </div>

                  <div className="mt-2 text-xs opacity-60">
                    {opening.games.toLocaleString()} games • Avg: {opening.avgRating}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default OpeningSearch