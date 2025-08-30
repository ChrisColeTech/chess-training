import React from 'react'
import { Target, Brain, Clock, Trophy } from 'lucide-react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { useDashboard } from '../../hooks/useDashboard'

export const DailyGoals: React.FC = () => {
  const { dailyGoals, isLoading } = useDashboard()

  const goals = [
    {
      id: 'games',
      icon: Target,
      label: 'Play Games',
      current: dailyGoals?.games.current || 0,
      target: dailyGoals?.games.target || 5,
      color: 'text-blue-500'
    },
    {
      id: 'puzzles',
      icon: Brain,
      label: 'Solve Puzzles',
      current: dailyGoals?.puzzles.current || 0,
      target: dailyGoals?.puzzles.target || 20,
      color: 'text-green-500'
    },
    {
      id: 'study',
      icon: Clock,
      label: 'Study Time',
      current: dailyGoals?.study_time?.current || 0,
      target: dailyGoals?.study_time?.target || 45,
      unit: 'min',
      color: 'text-purple-500'
    }
  ]

  return (
    <Card className="backdrop-blur-xl bg-black/20 border-white/10 hover:border-white/20 transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Daily Goals</h2>
          <Trophy className="w-5 h-5 text-yellow-400" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {goals.map((goal) => {
          const progress = (goal.current / goal.target) * 100
          const isCompleted = goal.current >= goal.target
          
          return (
            <div key={goal.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <goal.icon className={`w-4 h-4 ${goal.color}`} />
                  <span className="font-medium text-white">{goal.label}</span>
                </div>
                <div className={`text-sm font-semibold ${isCompleted ? 'text-green-400' : 'text-white/70'}`}>
                  {goal.current}/{goal.target}{goal.unit && ` ${goal.unit}`}
                </div>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all ${isCompleted ? 'bg-green-400' : 'bg-white/50'}`}
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}