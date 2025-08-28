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
import { 
  mockPuzzleCategories, 
  mockPuzzleStats, 
  mockRecentPuzzles, 
  mockAchievements,
  getCategoryProgress
} from '@/data/puzzleCategories'
import { GiSwordsPower } from 'react-icons/gi'

export const PuzzleSelectionPage: React.FC = () => {
  const navigate = useNavigate()
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
  } = usePuzzleSelection(
    mockPuzzleCategories,
    mockPuzzleStats,
    mockRecentPuzzles,
    mockAchievements
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Gaming background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs */}
        <div className={`absolute top-20 left-20 w-32 h-32 bg-gradient-to-br ${theme.primary} rounded-full opacity-20 blur-xl animate-pulse-glow`}></div>
        <div className={`absolute top-40 right-40 w-24 h-24 bg-gradient-to-br ${theme.accent} rounded-full opacity-15 blur-lg animate-pulse-glow delay-1000`}></div>
        <div className={`absolute bottom-32 left-1/3 w-40 h-40 bg-gradient-to-br ${theme.secondary} rounded-full opacity-10 blur-2xl animate-pulse-glow delay-2000`}></div>
        
        {/* Chess piece decorations */}
        <div className="absolute top-10 right-10 text-6xl opacity-5 animate-bounce-subtle delay-500">♛</div>
        <div className="absolute bottom-20 left-10 text-4xl opacity-8 animate-bounce-subtle delay-1500"><GiSwordsPower className="w-4 h-4 inline" /></div>
        <div className="absolute top-1/3 left-10 text-5xl opacity-6 animate-bounce-subtle delay-3000"><Trophy className="w-4 h-4 inline" /></div>
        
        {/* Sparkle effects */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="backdrop-blur-xl bg-black/20 border-white/10 hover:bg-black/30"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            
            <div>
              <h1 className={`text-4xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                🏟️ PUZZLE ARENA
              </h1>
              <p className="text-gray-300 mt-1">Choose your battlefield and sharpen your skills</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              onClick={handleQuickStart}
              className={`bg-gradient-to-r ${theme.primary} text-white shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <PlayCircle className="w-4 h-4 mr-2" />
              Quick Start
            </Button>
            
            <Button
              onClick={handleContinueRecent}
              variant="outline"
              className="backdrop-blur-xl bg-black/20 border-white/10 hover:bg-black/30"
            >
              <Clock className="w-4 h-4 mr-2" />
              Continue Recent
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Statistics & Goals */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            {/* Overall Progress */}
            <Card className="backdrop-blur-xl bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Overall Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-300 mb-2">
                      <span>Completed Puzzles</span>
                      <span>{overallProgress.totalCompleted}/{overallProgress.totalPuzzles}</span>
                    </div>
                    <Progress value={overallProgress.overallProgress} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className={`text-2xl font-bold bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent`}>
                        {mockPuzzleStats.currentRating}
                      </div>
                      <div className="text-xs text-gray-400">Current Rating</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}>
                        {mockPuzzleStats.currentStreak}
                      </div>
                      <div className="text-xs text-gray-400">Current Streak</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Daily Goals */}
            <Card className="backdrop-blur-xl bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Target className="w-5 h-5 mr-2" />
                  Daily Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dailyGoals.map((goal, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-gray-300">{goal}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements Preview */}
            <Card className="backdrop-blur-xl bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Trophy className="w-5 h-5 mr-2" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {achievementSummary.recentUnlocks.slice(0, 3).map((achievement) => (
                    <div key={achievement.id} className="flex items-center space-x-2">
                      <span className="text-lg">{achievement.icon}</span>
                      <div>
                        <div className="text-sm font-medium text-white">{achievement.title}</div>
                        <div className="text-xs text-gray-400">{achievement.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Center Column - Puzzle Categories */}
          <div className="col-span-12 lg:col-span-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCategories.map((category) => (
                <Card 
                  key={category.id}
                  className="backdrop-blur-xl bg-black/20 border-white/10 hover:bg-black/30 transition-all duration-300 cursor-pointer group"
                  onClick={() => handleCategoryClick(category.route)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`text-3xl`}>{category.icon}</div>
                        <div>
                          <CardTitle className="text-white group-hover:text-cyan-300 transition-colors">
                            {category.name}
                          </CardTitle>
                          <p className="text-sm text-gray-400">{category.description}</p>
                        </div>
                      </div>
                      <Badge className={`bg-gradient-to-r ${category.gradient} text-white`}>
                        {getCategoryProgress(category)}%
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      {/* Progress Bar */}
                      <div>
                        <div className="flex justify-between text-sm text-gray-300 mb-2">
                          <span>Progress</span>
                          <span>{category.completedPuzzles}/{category.totalPuzzles}</span>
                        </div>
                        <Progress value={getCategoryProgress(category)} className="h-2" />
                      </div>
                      
                      {/* Stats Grid */}
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <div className={`text-lg font-bold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                            {category.personalBest}
                          </div>
                          <div className="text-xs text-gray-400">Best Rating</div>
                        </div>
                        <div>
                          <div className={`text-lg font-bold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                            {category.difficulty[0]?.accuracy || 0}%
                          </div>
                          <div className="text-xs text-gray-400">Accuracy</div>
                        </div>
                        <div>
                          <div className={`text-lg font-bold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                            {category.lastPlayed ? Math.floor((Date.now() - category.lastPlayed.getTime()) / (1000 * 60 * 60 * 24)) : 0}d
                          </div>
                          <div className="text-xs text-gray-400">Last Played</div>
                        </div>
                      </div>
                      
                      {/* Action Button */}
                      <Button 
                        className={`w-full bg-gradient-to-r ${category.gradient} hover:opacity-90 transition-opacity`}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleCategoryClick(category.route)
                        }}
                      >
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Continue Training
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Column - Recent Activity */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            {/* Recent Puzzles */}
            <Card className="backdrop-blur-xl bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Clock className="w-5 h-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockRecentPuzzles.slice(0, 5).map((puzzle) => (
                    <div key={puzzle.id} className="flex items-center justify-between p-2 rounded bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white truncate">{puzzle.title}</div>
                        <div className="text-xs text-gray-400">{puzzle.category} • {puzzle.difficulty}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {puzzle.completed ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <Clock className="w-4 h-4 text-yellow-400" />
                        )}
                        <Badge variant="outline" className="text-xs">
                          {puzzle.rating}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommendation */}
            {recommendedCategory && (
              <Card className="backdrop-blur-xl bg-black/20 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Star className="w-5 h-5 mr-2" />
                    Recommended
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="text-2xl">{recommendedCategory.icon}</div>
                    <div>
                      <div className="text-lg font-semibold text-white">{recommendedCategory.name}</div>
                      <div className="text-sm text-gray-300">{recommendedCategory.description}</div>
                    </div>
                    <Button 
                      onClick={() => handleCategoryClick(recommendedCategory.route)}
                      className={`w-full bg-gradient-to-r ${recommendedCategory.gradient}`}
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Start Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PuzzleSelectionPage