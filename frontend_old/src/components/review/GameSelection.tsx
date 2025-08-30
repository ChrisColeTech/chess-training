import React from 'react'
import { Calendar, Clock, Trophy, Target, Upload, Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { GameSelectionProps } from '@/types/gameReview'

/**
 * Game Selection Component
 * Allows users to browse, search, and select games for analysis in the Game Laboratory
 */
export const GameSelection: React.FC<GameSelectionProps> = ({
  games,
  selectedGame,
  onGameSelect,
  onImportGame,
  searchQuery,
  onSearchChange,
  theme
}) => {
  const getResultBadgeColor = (result: string) => {
    switch (result) {
      case '1-0':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case '0-1':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case '1/2-1/2':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getAnalysisStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'In_Progress':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'Pending':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'Failed':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }


  const formatAccuracy = (game: any) => {
    // Calculate player's best accuracy from both sides
    const whiteAccuracy = game.performance.white.overallAccuracy
    const blackAccuracy = game.performance.black.overallAccuracy
    const playerAccuracy = Math.max(whiteAccuracy, blackAccuracy)
    return playerAccuracy > 0 ? `${playerAccuracy.toFixed(1)}%` : 'N/A'
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className={`p-6 rounded-xl bg-gradient-to-r ${theme.glassMorphism}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className={`text-2xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
              Game Laboratory Archive
            </h2>
            <p className={`${theme.text} opacity-80 mt-1`}>
              Select a game to analyze and learn from your chess journey
            </p>
          </div>
          <Button
            onClick={onImportGame}
            className={`bg-gradient-to-r ${theme.primary} hover:opacity-90 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
          >
            <Upload size={18} className="mr-2" />
            Import Game
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search size={20} className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.text} opacity-60`} />
            <Input
              placeholder="Search games by player, opening, event..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
            />
          </div>
          <Button
            variant="outline"
            className={`bg-gray-800/30 border-gray-600 ${theme.text} hover:bg-gray-700/50`}
          >
            <Filter size={18} className="mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {games.map((game) => (
          <Card
            key={game.id}
            className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${
              selectedGame?.id === game.id
                ? `bg-gradient-to-br ${theme.primary} border-2 border-blue-400 shadow-blue-400/20 shadow-lg`
                : 'bg-gray-900 border-gray-700 hover:border-gray-600'
            }`}
            onClick={() => onGameSelect(game)}
          >
            <CardHeader className="pb-3">
              {/* Game Header */}
              <div className="flex items-center justify-between">
                <CardTitle className={`text-lg font-semibold ${
                  selectedGame?.id === game.id ? 'text-white' : `bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`
                }`}>
                  {game.gameInfo.white} vs {game.gameInfo.black}
                </CardTitle>
                <Badge className={getResultBadgeColor(game.gameInfo.result)}>
                  {game.gameInfo.result}
                </Badge>
              </div>

              {/* Game Info */}
              <div className={`text-sm ${selectedGame?.id === game.id ? 'text-white/80' : `${theme.text} opacity-80`} space-y-1`}>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {game.gameInfo.date}
                  </div>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    {game.gameInfo.timeControl}
                  </div>
                </div>
                <div className="flex items-center">
                  <Trophy size={14} className="mr-1" />
                  {game.gameInfo.event}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Opening */}
              <div>
                <div className={`text-sm font-medium ${selectedGame?.id === game.id ? 'text-white' : theme.text}`}>
                  {game.opening.name}
                </div>
                <div className={`text-xs ${selectedGame?.id === game.id ? 'text-white/70' : `${theme.text} opacity-70`}`}>
                  {game.opening.eco} • {game.opening.moves.slice(0, 4).join(' ')}...
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-black/20 rounded-lg">
                  <div className={`text-lg font-bold ${selectedGame?.id === game.id ? 'text-white' : `bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}`}>
                    {formatAccuracy(game)}
                  </div>
                  <div className={`text-xs ${selectedGame?.id === game.id ? 'text-white/70' : `${theme.text} opacity-70`}`}>
                    Accuracy
                  </div>
                </div>
                <div className="text-center p-3 bg-black/20 rounded-lg">
                  <div className={`text-lg font-bold ${selectedGame?.id === game.id ? 'text-white' : `bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}`}>
                    {game.summary.gameLength}
                  </div>
                  <div className={`text-xs ${selectedGame?.id === game.id ? 'text-white/70' : `${theme.text} opacity-70`}`}>
                    Moves
                  </div>
                </div>
              </div>

              {/* Analysis Status */}
              <div className="flex items-center justify-between">
                <Badge className={getAnalysisStatusColor(game.analysisStatus)}>
                  {game.analysisStatus === 'In_Progress' 
                    ? `${game.analysisProgress}%` 
                    : game.analysisStatus
                  }
                </Badge>
                {game.improvements.length > 0 && (
                  <div className="flex items-center">
                    <Target size={14} className={`mr-1 ${selectedGame?.id === game.id ? 'text-white/70' : `${theme.text} opacity-70`}`} />
                    <span className={`text-xs ${selectedGame?.id === game.id ? 'text-white/70' : `${theme.text} opacity-70`}`}>
                      {game.improvements.length} insights
                    </span>
                  </div>
                )}
              </div>

              {/* Key Moments Preview */}
              {game.keyPositions.length > 0 && (
                <div className={`text-xs ${selectedGame?.id === game.id ? 'text-white/70' : `${theme.text} opacity-70`}`}>
                  Key moments: {game.keyPositions.map(pos => `Move ${pos.moveNumber}`).join(', ')}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {games.length === 0 && (
        <div className={`text-center py-16 ${theme.glassMorphism} rounded-xl`}>
          <div className={`w-24 h-24 mx-auto mb-6 bg-gradient-to-br ${theme.primary} rounded-xl flex items-center justify-center opacity-50`}>
            <Trophy size={32} className="text-white" />
          </div>
          <h3 className={`text-xl font-semibold ${theme.text} mb-2`}>
            No Games Found
          </h3>
          <p className={`${theme.text} opacity-70 mb-6`}>
            Import your first game to start analyzing and improving your chess
          </p>
          <Button
            onClick={onImportGame}
            className={`bg-gradient-to-r ${theme.primary} hover:opacity-90 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
          >
            <Upload size={18} className="mr-2" />
            Import Game
          </Button>
        </div>
      )}
    </div>
  )
}