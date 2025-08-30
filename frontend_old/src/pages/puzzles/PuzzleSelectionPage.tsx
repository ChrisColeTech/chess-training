import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle, Clock, PlayCircle, Star, Target, TrendingUp, Trophy, Zap } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useThemeStore } from '@/stores/themeStore'

// Architecture-compliant imports
import { usePuzzleSelection } from '@/hooks/usePuzzleSelection'
import { usePuzzlesPage } from "@/hooks/pages/usePuzzlesPage"
import { GiSwordsPower } from 'react-icons/gi'

const PuzzleSelectionPage: React.FC = () => {
  const navigate = useNavigate()
  // API hooks for puzzle data
  const {
    categories: puzzleCategories,
    trainingModes,
    progressData,
    isLoading,
    error
  } = usePuzzlesPage()

  // Use custom hook for all business logic
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()

  // Use custom hook for all business logic
  const {
    filteredCategories,
    overallProgress,
    recommendedCategory,
    achievementSummary,
    dailyGoals,
    handleCategoryClick,
    handleQuickStart,
    handleContinueRecent
  } = usePuzzleSelection()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="text-slate-400 hover:text-white"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Choose Your Puzzle Challenge
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Test your tactical skills with puzzles ranging from beginner to master level
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 border-blue-700/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <PlayCircle size={20} />
                Quick Start
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 mb-4">Jump right into a puzzle matched to your level</p>
              <Button onClick={handleQuickStart} className="w-full">
                Start Now
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/50 to-green-800/30 border-green-700/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock size={20} />
                Daily Challenge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 mb-4">Complete today's special puzzle challenge</p>
              <Button variant="secondary" className="w-full">
                Daily Puzzle
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-700/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp size={20} />
                Continue Recent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 mb-4">Pick up where you left off</p>
              <Button onClick={handleContinueRecent} variant="outline" className="w-full">
                Continue
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {puzzleCategories.map((category) => (
            <Card 
              key={category.id}
              className="bg-slate-800/50 border-slate-700/50 hover:border-slate-600/50 transition-colors cursor-pointer"
              onClick={() => handleCategoryClick(category.id)}
            >
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target size={20} />
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-4">{category.description}</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Progress</span>
                  <span className="text-sm text-slate-300">{category.solved}/{category.total}</span>
                </div>
                <Progress value={(category.solved / category.total) * 100} className="mb-3" />
                <Badge variant="secondary">{category.difficulty}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PuzzleSelectionPage
