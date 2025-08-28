import React from 'react'
import { Search, Filter, Trophy, Calendar, MapPin, Star, BookOpen } from 'lucide-react'
import { FaCrown } from 'react-icons/fa'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { GameLibraryProps } from '@/types/masterGames'

/**
 * GameLibrary Component
 * Displays searchable and filterable list of master games
 */
export const GameLibrary: React.FC<GameLibraryProps> = ({
  games,
  filters,
  isLoading,
  selectedGameId,
  onGameSelect,
  onFiltersChange,
  theme
}) => {
  const getResultColor = (result: string) => {
    switch (result) {
      case '1-0': return 'text-green-400'
      case '0-1': return 'text-red-400'
      case '1/2-1/2': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  const getResultIcon = (result: string) => {
    switch (result) {
      case '1-0': return '1-0'
      case '0-1': return '0-1'  
      case '1/2-1/2': return '½-½'
      default: return result
    }
  }

  if (isLoading) {
    return (
      <div className="bg-black/30 backdrop-blur-md border-white/10 rounded-2xl p-6 h-full">
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <p className="text-white/70">Loading master games...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 h-full flex flex-col">
      {/* Search and Filters Header */}
      <Card className="bg-black/30 backdrop-blur-md border-white/10">
        <CardContent className="p-4">
          {/* Search Input */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 text-white/50" size={20} />
            <Input
              type="text"
              placeholder="Search games, players, openings..."
              value={filters.searchTerm}
              onChange={(e) => onFiltersChange({ searchTerm: e.target.value })}
              className="pl-10 bg-black/20 border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
            />
          </div>

          {/* Filter Controls */}
          <div className="grid grid-cols-2 gap-3">
            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => onFiltersChange({ sortBy: e.target.value as any })}
                className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
              >
                <option value="quality">Quality</option>
                <option value="date">Date</option>
                <option value="rating">Rating</option>
                <option value="name">Player</option>
              </select>
            </div>

            {/* Filter Button */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Filters</label>
              <Button 
                variant="outline" 
                size="sm"
                className="w-full bg-black/20 border-white/20 text-white hover:bg-black/40"
              >
                <Filter size={16} className="mr-2" />
                Advanced
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          {(filters.bookmarkedOnly || filters.themes.length > 0) && (
            <div className="mt-3 flex flex-wrap gap-2">
              {filters.bookmarkedOnly && (
                <Badge 
                  variant="secondary" 
                  className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                >
                  Bookmarked
                </Badge>
              )}
              {filters.themes.map(theme => (
                <Badge 
                  key={theme}
                  variant="secondary" 
                  className="bg-purple-500/20 text-purple-300 border-purple-500/30"
                >
                  {theme}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Games List */}
      <div className="bg-black/30 backdrop-blur-md border-white/10 rounded-2xl p-4 flex-1 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Trophy size={20} />
            Games ({games.length})
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFiltersChange({ bookmarkedOnly: !filters.bookmarkedOnly })}
            className={`text-white/70 hover:text-white ${filters.bookmarkedOnly ? 'bg-yellow-500/20' : ''}`}
          >
            <BookOpen size={16} />
          </Button>
        </div>

        <div className="space-y-3 overflow-y-auto max-h-[600px] pr-2">
          {games.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-white/60 mb-2">No games found</div>
              <div className="text-sm text-white/40">Try adjusting your search or filters</div>
            </div>
          ) : (
            games.map((game) => (
              <Card
                key={game.id}
                className={`cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                  selectedGameId === game.id
                    ? `${theme.accent} border-current bg-white/10`
                    : 'bg-black/30 border-white/10 hover:bg-black/40 hover:border-white/20'
                }`}
                onClick={() => onGameSelect(game)}
              >
                <CardContent className="p-4">
                  {/* Player Names and Result */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <FaCrown className="text-yellow-400" size={14} />
                        <span className="font-semibold text-white text-sm">
                          {game.white.name}
                        </span>
                      </div>
                      <span className="text-white/50 text-xs">vs</span>
                      <div className="flex items-center gap-1">
                        <FaCrown className="text-yellow-400" size={14} />
                        <span className="font-semibold text-white text-sm">
                          {game.black.name}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${getResultColor(game.result)}`}>
                        {getResultIcon(game.result)}
                      </span>
                      {game.isBookmarked && (
                        <Star className="text-yellow-400" size={14} fill="currentColor" />
                      )}
                    </div>
                  </div>

                  {/* Ratings */}
                  <div className="flex justify-between text-xs text-white/60 mb-2">
                    <span>White: {game.white.rating}</span>
                    <span>Black: {game.black.rating}</span>
                  </div>

                  {/* Tournament and Date */}
                  <div className="flex items-center gap-3 text-xs text-white/60 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin size={12} />
                      <span>{game.tournament.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{game.tournament.year}</span>
                    </div>
                  </div>

                  {/* Opening */}
                  <div className="text-xs text-white/70 mb-3">
                    <span className="font-mono bg-black/30 px-2 py-1 rounded mr-2">
                      {game.opening.eco}
                    </span>
                    {game.opening.name}
                  </div>

                  {/* Quality and Themes */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="text-yellow-400" size={12} />
                      <span className="text-xs text-white/60">
                        {game.analysis.quality}/10
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {game.analysis.strategicThemes.slice(0, 2).map(theme => (
                        <Badge
                          key={theme}
                          variant="secondary"
                          className="text-xs bg-purple-500/20 text-purple-300 border-purple-500/30"
                        >
                          {theme}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Study Progress Indicator */}
                  {game.studyProgress.viewed && (
                    <div className="mt-2 flex items-center gap-1">
                      <div className="flex gap-1">
                        <div className={`w-2 h-2 rounded-full ${game.studyProgress.viewed ? 'bg-blue-400' : 'bg-white/20'}`} />
                        <div className={`w-2 h-2 rounded-full ${game.studyProgress.analyzed ? 'bg-green-400' : 'bg-white/20'}`} />
                        <div className={`w-2 h-2 rounded-full ${game.studyProgress.practiced ? 'bg-purple-400' : 'bg-white/20'}`} />
                      </div>
                      <span className="text-xs text-white/50 ml-2">
                        {game.studyProgress.analyzed ? 'Analyzed' : game.studyProgress.viewed ? 'Viewed' : 'New'}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default GameLibrary