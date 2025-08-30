import React from 'react'
import { Award, Star, Target } from 'lucide-react'
import { Card, CardContent, CardHeader } from '../ui/card'

export const AchievementProgress: React.FC = () => {
  const achievements = [
    {
      id: 'first-game',
      title: 'First Game',
      description: 'Play your first game',
      progress: 0,
      target: 1,
      unlocked: false,
      icon: Target
    },
    {
      id: 'puzzle-solver',
      title: 'Puzzle Solver',
      description: 'Solve 100 puzzles',
      progress: 0,
      target: 100,
      unlocked: false,
      icon: Star
    },
    {
      id: 'chess-student',
      title: 'Chess Student',
      description: 'Study for 10 hours',
      progress: 0,
      target: 10,
      unlocked: false,
      icon: Award
    }
  ]

  return (
    <Card className="backdrop-blur-xl bg-black/20 border-white/10 hover:border-white/20 transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Achievements</h2>
          <Award className="w-5 h-5 text-yellow-400" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {achievements.map((achievement) => {
          const progressPercent = (achievement.progress / achievement.target) * 100
          
          return (
            <div key={achievement.id} className={`p-4 rounded-lg border-2 ${achievement.unlocked ? 'border-yellow-400 bg-yellow-400/10' : 'border-white/20 bg-white/5'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <achievement.icon className={`w-5 h-5 ${achievement.unlocked ? 'text-yellow-400' : 'text-white/70'}`} />
                  <div>
                    <div className="font-semibold text-white">{achievement.title}</div>
                    <div className="text-sm text-white/70">{achievement.description}</div>
                  </div>
                </div>
                <div className="text-sm font-medium text-white">
                  {achievement.progress}/{achievement.target}
                </div>
              </div>
              
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all ${achievement.unlocked ? 'bg-yellow-400' : 'bg-white/50'}`}
                  style={{ width: `${Math.min(progressPercent, 100)}%` }}
                />
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}