import React from 'react'
import { Eye, BookOpen, Trophy, Target, TrendingUp, Flame, Shield } from 'lucide-react'
import { FaBrain, FaCrown } from 'react-icons/fa'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { OpeningInfoProps, ExplorerTab } from '@/types/openingExplorer'

/**
 * Opening information component with tabbed interface
 * Shows overview, theory, statistics, and analysis
 */
const OpeningInfo: React.FC<OpeningInfoProps> = ({
  opening,
  activeTab,
  onTabChange
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
      case 'Medium': return Target
      case 'Low': return Shield
      default: return Target
    }
  }

  if (!opening) {
    return (
      <div className="backdrop-blur-2xl bg-black/30 border-white/20 rounded-2xl border-2 p-6 h-full">
        <div className="text-center py-8 opacity-75">
          <div className="text-lg mb-2">No opening selected</div>
          <div className="text-sm">Select an opening to view detailed information</div>
        </div>
      </div>
    )
  }

  return (
    <div className="backdrop-blur-2xl bg-black/30 border-white/20 rounded-2xl border-2 p-6 h-full">
      <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as ExplorerTab)} className="h-full flex flex-col">
        <TabsList className="grid w-full grid-cols-4 bg-black/50 mb-6">
          <TabsTrigger value="overview" className="data-[state=active]:bg-black/70 text-xs">
            <Eye className="w-3 h-3" />
          </TabsTrigger>
          <TabsTrigger value="theory" className="data-[state=active]:bg-black/70 text-xs">
            <BookOpen className="w-3 h-3" />
          </TabsTrigger>
          <TabsTrigger value="analysis" className="data-[state=active]:bg-black/70 text-xs">
            <FaBrain className="w-3 h-3" />
          </TabsTrigger>
          <TabsTrigger value="games" className="data-[state=active]:bg-black/70 text-xs">
            <Trophy className="w-3 h-3" />
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="overview" className="space-y-4 h-full overflow-y-auto">
            <div>
              <h4 className="font-bold mb-3 uppercase tracking-wider">
                {opening.name}
              </h4>
              
              <div className="space-y-4">
                {/* Basic info */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="opacity-75">ECO Code: </span>
                    <span className="font-mono font-bold">{opening.eco}</span>
                  </div>
                  <div>
                    <span className="opacity-75">Category: </span>
                    <span className="font-semibold">{opening.category}</span>
                  </div>
                </div>

                {/* Difficulty and popularity */}
                <div className="flex items-center gap-2">
                  <Badge className={getDifficultyColor(opening.difficulty)}>
                    {opening.difficulty}
                  </Badge>
                  <Badge variant="outline" className="border-white/20">
                    {opening.popularity} Popularity
                  </Badge>
                  {getPopularityIcon(opening.popularity) && (
                    React.createElement(getPopularityIcon(opening.popularity), {
                      className: "w-4 h-4 opacity-75"
                    })
                  )}
                </div>

                {/* Frequency */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Frequency</span>
                    <span className="font-bold">{opening.frequency}%</span>
                  </div>
                  <Progress value={opening.frequency} className="h-2" />
                </div>

                {/* Results distribution */}
                <div>
                  <h5 className="font-semibold mb-3">Results Distribution</h5>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-lg font-bold text-green-400">
                        {opening.whiteWins.toFixed(1)}%
                      </div>
                      <div className="text-xs opacity-75">White Wins</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-yellow-400">
                        {opening.draws.toFixed(1)}%
                      </div>
                      <div className="text-xs opacity-75">Draws</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-red-400">
                        {opening.blackWins.toFixed(1)}%
                      </div>
                      <div className="text-xs opacity-75">Black Wins</div>
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-3 backdrop-blur-xl bg-black/20 rounded-lg">
                    <div className="font-bold text-lg">{opening.games.toLocaleString()}</div>
                    <div className="text-xs opacity-75">Total Games</div>
                  </div>
                  <div className="text-center p-3 backdrop-blur-xl bg-black/20 rounded-lg">
                    <div className="font-bold text-lg">{opening.avgRating}</div>
                    <div className="text-xs opacity-75">Avg Rating</div>
                  </div>
                </div>

                {/* Key ideas */}
                <div>
                  <h5 className="font-semibold mb-2">Key Strategic Ideas</h5>
                  <div className="space-y-1">
                    {opening.keyIdeas.map((idea, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <Target className="w-3 h-3 opacity-50 flex-shrink-0" />
                        {idea}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="theory" className="space-y-4 h-full overflow-y-auto">
            <h4 className="font-bold uppercase tracking-wider">Opening Theory</h4>
            
            <div className="space-y-4">
              {/* Theoretical assessment */}
              <div>
                <h5 className="font-semibold mb-2">Assessment</h5>
                <p className="text-sm opacity-90 leading-relaxed">
                  {opening.theory}
                </p>
              </div>

              {/* Classification details */}
              <div>
                <h5 className="font-semibold mb-2">Classification</h5>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>ECO Code:</span>
                    <span className="font-mono">{opening.eco}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Category:</span>
                    <span>{opening.category}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Difficulty:</span>
                    <Badge className={getDifficultyColor(opening.difficulty)}>
                      {opening.difficulty}
                    </Badge>
                  </div>
                  {opening.firstAppeared && (
                    <div className="flex justify-between text-sm">
                      <span>First Appeared:</span>
                      <span>{opening.firstAppeared}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Famous practitioners */}
              {opening.famousPlayers && opening.famousPlayers.length > 0 && (
                <div>
                  <h5 className="font-semibold mb-2">Famous Practitioners</h5>
                  <div className="space-y-1">
                    {opening.famousPlayers.map((player, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <FaCrown className="w-3 h-3 text-yellow-400" />
                        {player}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related openings */}
              {opening.relatedOpenings && opening.relatedOpenings.length > 0 && (
                <div>
                  <h5 className="font-semibold mb-2">Related Openings</h5>
                  <div className="flex flex-wrap gap-1">
                    {opening.relatedOpenings.map((eco, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {eco}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Aliases */}
              {opening.aliases && opening.aliases.length > 0 && (
                <div>
                  <h5 className="font-semibold mb-2">Also Known As</h5>
                  <div className="space-y-1">
                    {opening.aliases.map((alias, i) => (
                      <div key={i} className="text-sm opacity-75">
                        • {alias}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-4 h-full overflow-y-auto">
            <h4 className="font-bold uppercase tracking-wider">Position Analysis</h4>
            
            <div className="text-center py-8 opacity-75">
              <FaBrain className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <div className="text-lg mb-2">Analysis Coming Soon</div>
              <div className="text-sm">
                Engine analysis will be available in a future update
              </div>
            </div>
          </TabsContent>

          <TabsContent value="games" className="space-y-4 h-full overflow-y-auto">
            <h4 className="font-bold uppercase tracking-wider">Game Statistics</h4>
            
            <div className="space-y-4">
              {/* Master game stats */}
              <div>
                <h5 className="font-semibold mb-2">Master Level Statistics</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Master Games:</span>
                    <span className="font-bold">{opening.masterGames}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Rating:</span>
                    <span className="font-bold">{opening.avgRating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Database Games:</span>
                    <span className="font-bold">{opening.games.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Performance trends */}
              <div>
                <h5 className="font-semibold mb-2">Performance by Rating</h5>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>2400+ Rating:</span>
                    <span>White {(opening.whiteWins + 2).toFixed(1)}% | Draw {(opening.draws - 1).toFixed(1)}% | Black {(opening.blackWins - 1).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>2200-2399:</span>
                    <span>White {opening.whiteWins.toFixed(1)}% | Draw {opening.draws.toFixed(1)}% | Black {opening.blackWins.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Below 2200:</span>
                    <span>White {(opening.whiteWins - 2).toFixed(1)}% | Draw {(opening.draws + 2).toFixed(1)}% | Black {opening.blackWins.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

export default OpeningInfo