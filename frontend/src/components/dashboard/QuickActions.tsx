import React from 'react'
import { Play, Brain, BookOpen, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader } from '../ui/card'

export const QuickActions: React.FC = () => {
  const actions = [
    {
      icon: Play,
      label: 'Play Now',
      description: 'Challenge the AI',
      color: 'bg-primary hover:bg-primary/80',
      href: '/play/computer',
      isPrimary: true
    },
    {
      icon: Brain,
      label: 'Daily Puzzles',
      description: 'Train tactics',
      color: 'bg-green-500 hover:bg-green-600',
      href: '/puzzles'
    },
    {
      icon: BookOpen,
      label: 'Continue Study',
      description: 'Learn from masters',
      color: 'bg-purple-500 hover:bg-purple-600',
      href: '/play/analysis'
    },
    {
      icon: TrendingUp,
      label: 'Review',
      description: 'Analyze games',
      color: 'bg-orange-500 hover:bg-orange-600',
      href: '/play/review'
    }
  ]

  return (
    <Card className="backdrop-blur-xl bg-black/20 border-white/10 hover:border-white/20 transition-all duration-300">
      <CardHeader className="pb-4">
        <h2 className="text-xl font-bold text-white">Quick Actions</h2>
      </CardHeader>
      <CardContent>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`p-4 rounded-lg text-white transition-all duration-300 ${action.color} flex flex-col items-center text-center hover:scale-105 hover:shadow-lg ${action.isPrimary ? 'ring-2 ring-primary/50 shadow-lg' : ''}`}
          >
            <action.icon className="w-8 h-8 mb-2" />
            <div className="font-semibold">{action.label}</div>
            <div className="text-sm opacity-90">{action.description}</div>
          </button>
        ))}
      </div>
      </CardContent>
    </Card>
  )
}