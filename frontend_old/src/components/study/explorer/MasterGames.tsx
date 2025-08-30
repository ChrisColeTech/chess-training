import React from 'react'
import { Trophy, Play, Calendar, MapPin } from 'lucide-react'
import { FaCrown } from 'react-icons/fa'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { MasterGamesProps } from '@/types/openingExplorer'

/**
 * Master games component for viewing historical games
 * Shows games from famous players with this opening
 */
const MasterGames: React.FC<MasterGamesProps> = ({
  opening,
  games,
  onGameSelect,
  isLoading
}) => {
  const getResultColor = (result: string) => {
    switch (result) {
      case '1-0': return 'text-green-400'
      case '0-1': return 'text-red-400'
      case '1/2-1/2': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }


  const getRatingClass = (rating: number) => {
    if (rating >= 2700) return 'text-purple-400'
    if (rating >= 2600) return 'text-red-400'
    if (rating >= 2500) return 'text-orange-400'
    if (rating >= 2400) return 'text-yellow-400'
    return 'text-blue-400'
  }

  if (isLoading) {
    return (
      <div className="backdrop-blur-2xl bg-black/30 border-white/20 rounded-2xl border-2 p-6">
        <h4 className="font-bold mb-4 uppercase tracking-wider flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Master Games
        </h4>
        <div className="flex items-center justify-center py-8">
          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="backdrop-blur-2xl bg-black/30 border-white/20 rounded-2xl border-2 p-6 h-full">
      <h4 className="font-bold mb-4 uppercase tracking-wider flex items-center gap-2">
        <Trophy className="w-5 h-5" />
        Master Games
      </h4>
      
      {games.length === 0 ? (
        <div className="text-center py-8 opacity-75">
          <div className="text-lg mb-2">No master games found</div>
          <div className="text-sm">This opening may be less common at the master level</div>
        </div>
      ) : (
        <>
          {/* Opening context */}
          {opening && (
            <div className="mb-4 p-3 backdrop-blur-xl bg-black/20 border-white/10 rounded-lg border">
              <div className="text-sm font-semibold mb-1">{opening.name}</div>
              <div className="text-xs opacity-75">
                {opening.masterGames} master games in database
              </div>
            </div>
          )}

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {games.map((game, i) => (
              <div
                key={i}
                className="p-4 backdrop-blur-xl bg-black/20 border-white/10 rounded-lg border cursor-pointer hover:bg-black/30 transition-all group"
                onClick={() => onGameSelect(game)}
              >
                {/* Players and result */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold">
                      {game.white} vs {game.black}
                    </div>
                    {game.avgRating >= 2600 && (
                      <FaCrown className="w-4 h-4 text-yellow-400" />
                    )}
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getResultColor(game.result)} border-current`}
                  >
                    {game.result}
                  </Badge>
                </div>

                {/* Ratings */}
                {(game.whiteRating || game.blackRating) && (
                  <div className="flex justify-between text-xs mb-2">
                    <div className={game.whiteRating ? getRatingClass(game.whiteRating) : 'opacity-50'}>
                      White: {game.whiteRating || 'Unrated'}
                    </div>
                    <div className={game.blackRating ? getRatingClass(game.blackRating) : 'opacity-50'}>
                      Black: {game.blackRating || 'Unrated'}
                    </div>
                  </div>
                )}
                
                {/* Event and date */}
                <div className="flex items-center gap-4 text-xs opacity-75 mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {game.event}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {game.year}
                  </div>
                  {game.round && (
                    <div>Round {game.round}</div>
                  )}
                </div>

                {/* Game stats */}
                <div className="flex justify-between items-center text-xs mb-3">
                  <div>
                    <span className="opacity-75">Avg Rating: </span>
                    <span className={getRatingClass(game.avgRating)}>
                      {game.avgRating}
                    </span>
                  </div>
                  <div>
                    <span className="opacity-75">Moves: </span>
                    <span className="font-semibold">{game.moves}</span>
                  </div>
                </div>

                {/* Significance */}
                {game.significance && (
                  <div className="text-xs opacity-75 italic mb-3">
                    "{game.significance}"
                  </div>
                )}

                {/* Study button */}
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full text-xs group-hover:bg-white/10 transition-all"
                  onClick={(e) => {
                    e.stopPropagation()
                    onGameSelect(game)
                  }}
                >
                  <Play className="w-3 h-3 mr-1" />
                  Study Game
                </Button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="text-xs opacity-75 text-center">
              {games.length} games • Avg rating: {Math.round(games.reduce((sum, g) => sum + g.avgRating, 0) / games.length)}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default MasterGames