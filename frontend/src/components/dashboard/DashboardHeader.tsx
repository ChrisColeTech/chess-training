import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import { useDashboard } from '../../hooks/useDashboard'

export const DashboardHeader: React.FC = () => {
  const { stats, recentActivity, isLoading } = useDashboard()

  const headerStats = [
    {
      label: 'ELO',
      value: stats?.chess_elo || 1200,
      change: 12,
      icon: TrendingUp
    },
    {
      label: 'Puzzles',
      value: stats?.puzzle_rating || 1000,
      change: 8,
      icon: TrendingUp
    },
    {
      label: 'Games',
      value: stats?.games_played || 0,
      change: 0
    },
    {
      label: 'Hours',
      value: `${stats?.study_hours || 0}h`,
      change: 0
    }
  ]

  return (
    <Card className="transition-all duration-300">
      <CardContent className="p-6">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-foreground">Welcome back, Chess Master!</h1>
          <p className="text-muted-foreground mt-1">Ready to improve your chess skills today?</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-6 text-sm mb-3">
          {headerStats.map((stat, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="text-muted-foreground">{stat.label}:</span>
              <span className="font-bold text-lg text-foreground">{stat.value}</span>
              {stat.change !== 0 && (
                <div className={`flex items-center text-xs ${stat.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {stat.change > 0 ? '+' : ''}{stat.change}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Recent Activity */}
        <div className="text-sm text-muted-foreground border-t border-border pt-3">
          <span className="font-medium text-foreground">Recent: </span>
          {recentActivity && recentActivity.length > 0 ? (
            recentActivity.slice(0, 2).map((activity, index) => (
              <span key={index} className="mr-4">
                • {activity.description}
              </span>
            ))
          ) : (
            <span>No recent activity</span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}