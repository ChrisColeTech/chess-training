import React from 'react'
import { TrendingUp, TrendingDown, Crown, Zap, Target } from 'lucide-react'
import { useAuth } from '../../hooks/auth/useAuth'
import { Card, CardContent, CardHeader } from '../ui/card'

export const PerformanceAnalytics: React.FC = () => {
  const { user } = useAuth()

  const stats = [
    {
      label: 'Chess ELO',
      value: user?.chess_elo || 1200,
      change: 0,
      icon: Crown,
      color: 'text-yellow-500'
    },
    {
      label: 'Puzzle Rating',
      value: user?.puzzle_rating || 1000,
      change: 0,
      icon: Zap,
      color: 'text-blue-500'
    },
    {
      label: 'Games Played',
      value: 0,
      change: 0,
      icon: Target,
      color: 'text-green-500'
    },
    {
      label: 'Win Rate',
      value: '0%',
      change: 0,
      icon: TrendingUp,
      color: 'text-purple-500'
    }
  ]

  return (
    <Card className="backdrop-blur-xl bg-black/20 border-white/10 hover:border-white/20 transition-all duration-300">
      <CardHeader className="pb-4">
        <h2 className="text-xl font-bold text-white">Performance Analytics</h2>
      </CardHeader>
      <CardContent>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-secondary/50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              {stat.change !== 0 && (
                <div className={`flex items-center text-xs ${stat.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {Math.abs(stat.change)}
                </div>
              )}
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
      </CardContent>
    </Card>
  )
}