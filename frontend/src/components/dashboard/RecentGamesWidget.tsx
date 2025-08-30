import React from 'react'
import { GamepadIcon, Clock, Trophy } from 'lucide-react'
import { Card, CardContent, CardHeader } from '../ui/card'

export const RecentGamesWidget: React.FC = () => {
  // This will show empty state until games are played
  const recentGames: any[] = []

  return (
    <Card className="backdrop-blur-xl bg-black/20 border-white/10 hover:border-white/20 transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Recent Games</h2>
          <GamepadIcon className="w-5 h-5 text-white/70" />
        </div>
      </CardHeader>
      <CardContent>
      
      {recentGames.length === 0 ? (
        <div className="text-center py-8">
          <GamepadIcon className="w-12 h-12 text-white/50 mx-auto mb-3 opacity-50" />
          <p className="text-white/70">No games played yet</p>
          <p className="text-sm text-white/70 mt-1">
            Start playing to see your recent games here
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {recentGames.map((game, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${game.result === 'win' ? 'bg-green-500' : game.result === 'loss' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                <div>
                  <div className="font-medium">vs {game.opponent}</div>
                  <div className="text-sm text-muted-foreground">{game.timeControl}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{game.duration}</span>
                </div>
                <div className="text-sm font-medium">{game.rating}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      </CardContent>
    </Card>
  )
}