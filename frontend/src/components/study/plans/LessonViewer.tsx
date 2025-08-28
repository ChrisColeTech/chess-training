import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle, Clock, Lightbulb, Pause, Play, Star, Target, Trophy } from 'lucide-react'
import { FaBrain } from 'react-icons/fa'
import { Chessboard } from 'react-chessboard'
import type { LessonViewerProps } from '@/types/studyPlans'

/**
 * LessonViewer Component
 * Interactive lesson viewer with chess positions and content sections
 */
export const LessonViewer: React.FC<LessonViewerProps> = ({
  lesson,
  onLessonComplete,
  onNextLesson,
  onPrevLesson,
  isLoading,
  theme
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [userScore, setUserScore] = useState<number | null>(null)
  const [chessPosition, setChessPosition] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-gray-600 border-t-blue-500 rounded-full mx-auto mb-4"></div>
          <p className={`${theme.text} opacity-80`}>Loading lesson...</p>
        </div>
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="text-center p-12">
        <BookOpen size={48} className="mx-auto mb-4 text-gray-500" />
        <h3 className={`text-xl font-semibold mb-2 ${theme.text}`}>No Lesson Selected</h3>
        <p className={`${theme.text} opacity-60`}>
          Select a lesson from the curriculum to begin studying
        </p>
      </div>
    )
  }

  const getLessonTypeIcon = (type: string) => {
    switch (type) {
      case 'Theory': return <BookOpen size={20} />
      case 'Practice': return <Target size={20} />
      case 'Interactive': return <FaBrain size={20} />
      case 'Video': return <Play size={20} />
      case 'Tactics': return <Trophy size={20} />
      default: return <BookOpen size={20} />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-400'
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400'
      case 'Advanced': return 'bg-orange-500/20 text-orange-400'
      case 'Expert': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const handleCompleteLesson = () => {
    // Simulate lesson completion with random score
    const score = Math.floor(Math.random() * 30) + 70 // 70-100%
    setUserScore(score)
    onLessonComplete(lesson.id, score)
  }

  const simulateInteractiveElement = () => {
    setIsPlaying(true)
    // Simulate interactive lesson progress
    setTimeout(() => {
      setIsPlaying(false)
      // Change position to show progression
      setChessPosition('rnbqkb1r/pppp1ppp/5n2/4p3/2B1P3/8/PPPP1PPP/RNBQK1NR w KQkq - 4 4')
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* Lesson Header */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <div className={`${theme.text}`}>
                  {getLessonTypeIcon(lesson.type)}
                </div>
                <Badge className={getDifficultyColor(lesson.difficulty)}>
                  {lesson.difficulty}
                </Badge>
                <Badge variant="outline" className="text-gray-400 border-gray-600">
                  {lesson.type}
                </Badge>
              </div>
              <CardTitle className={`text-2xl font-bold ${theme.text} mb-2`}>
                {lesson.title}
              </CardTitle>
              <CardDescription className={`${theme.text} opacity-80`}>
                {lesson.description}
              </CardDescription>
            </div>
            
            {lesson.completion.status === 'completed' && (
              <div className="text-center">
                <CheckCircle size={32} className="text-green-400 mx-auto mb-1" />
                <div className="text-sm text-green-400 font-medium">
                  {lesson.completion.score}%
                </div>
              </div>
            )}
          </div>

          {/* Lesson Stats */}
          <div className="flex items-center space-x-6 mt-4 pt-4 border-t border-gray-700">
            <div className="flex items-center space-x-2 text-gray-400">
              <Clock size={16} />
              <span className="text-sm">{lesson.estimatedTime} min</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Star size={16} />
              <span className="text-sm">{lesson.gamification.xpReward} XP</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Target size={16} />
              <span className="text-sm">{lesson.objectives.length} objectives</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Learning Objectives */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className={`text-lg ${theme.text} flex items-center`}>
            <Lightbulb size={20} className="mr-2" />
            Learning Objectives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {lesson.objectives.map((objective, index) => (
              <li key={index} className={`flex items-start space-x-3 ${theme.text} opacity-80`}>
                <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{objective}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Interactive Chess Board */}
      {(lesson.type === 'Practice' || lesson.type === 'Interactive' || lesson.type === 'Tactics') && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className={`text-lg ${theme.text} flex items-center justify-between`}>
                <span className="flex items-center">
                  <Target size={20} className="mr-2" />
                  Interactive Practice
                </span>
                <Button
                  size="sm"
                  onClick={simulateInteractiveElement}
                  disabled={isPlaying}
                  className={`bg-gradient-to-r ${theme.primary}`}
                >
                  {isPlaying ? (
                    <>
                      <Pause size={16} className="mr-2" />
                      Thinking...
                    </>
                  ) : (
                    <>
                      <Play size={16} className="mr-2" />
                      Start
                    </>
                  )}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                <Chessboard
                  position={chessPosition}
                  arePiecesDraggable={!isPlaying}
                  boardWidth={300}
                  customBoardStyle={{
                    borderRadius: '8px'
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className={`text-lg ${theme.text}`}>
                Instructions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className={`${theme.text} opacity-80`}>
                <p className="text-sm mb-4">
                  In this interactive lesson, you'll practice the concepts you've learned. 
                  Follow the instructions and make moves on the board.
                </p>
                
                {isPlaying && (
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                    <p className="text-blue-400 text-sm font-medium">
                      🤔 Analyzing your position...
                    </p>
                  </div>
                )}
              </div>

              {/* Lesson Progress */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Lesson Progress</span>
                  <span className="text-sm font-medium text-gray-300">
                    {isPlaying ? '65%' : '45%'}
                  </span>
                </div>
                <Progress value={isPlaying ? 65 : 45} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Lesson Content Sections */}
      {lesson.content.sections.length > 0 && (
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className={`text-lg ${theme.text}`}>
              Lesson Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`${theme.text} opacity-80 space-y-4`}>
              <p className="leading-relaxed">
                Understanding chess opening principles is crucial for developing a strong foundation in your game. 
                The center squares (e4, e5, d4, d5) are the most important squares on the chessboard because they 
                allow your pieces to have maximum influence over the game.
              </p>
              
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
                <h4 className="font-semibold mb-2 text-yellow-400"><Lightbulb className="w-4 h-4 inline" /> Key Concept</h4>
                <p className="text-sm">
                  Control the center early with pawns and pieces. This gives you more space and better 
                  piece coordination throughout the game.
                </p>
              </div>

              <p className="leading-relaxed">
                When developing your pieces, remember the principle: "Knights before Bishops." 
                Knights are generally developed to f3/f6 and c3/c6, from where they can control 
                important central squares.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lesson Completion */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`text-lg font-semibold ${theme.text} mb-2`}>
                Ready to Complete This Lesson?
              </h3>
              <p className={`text-sm ${theme.text} opacity-60`}>
                You'll earn {lesson.gamification.xpReward} XP for completing this lesson
              </p>
            </div>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={onPrevLesson}
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <ArrowLeft size={16} className="mr-2" />
                Previous
              </Button>
              
              {lesson.completion.status === 'completed' ? (
                <Button
                  onClick={onNextLesson}
                  className={`bg-gradient-to-r ${theme.primary} text-white`}
                >
                  Next Lesson
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleCompleteLesson}
                  className={`bg-gradient-to-r ${theme.secondary} text-white`}
                >
                  <CheckCircle size={16} className="mr-2" />
                  Complete Lesson
                </Button>
              )}
            </div>
          </div>

          {userScore !== null && (
            <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <Trophy size={20} className="text-green-400" />
                <span className="text-green-400 font-medium">
                  Lesson completed with {userScore}% score! 
                  {userScore >= 90 && ' Excellent work! <Star className="w-4 h-4 inline" />'}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}