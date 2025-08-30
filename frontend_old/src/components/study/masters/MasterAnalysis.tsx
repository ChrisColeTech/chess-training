import React from 'react'
import { BookOpen, BarChart3, Trophy, Lightbulb, Star, Target, TrendingUp, Clock, Quote } from 'lucide-react'
import { FaCrown, FaBrain } from 'react-icons/fa'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { MasterAnalysisProps } from '@/types/masterGames'

/**
 * MasterAnalysis Component
 * Displays detailed game analysis with multiple tabs
 */
export const MasterAnalysis: React.FC<MasterAnalysisProps> = ({
  game,
  currentMove,
  mode,
  onModeChange,
  theme
}) => {
  if (!game) {
    return (
      <div className="bg-black/30 backdrop-blur-md border-white/10 rounded-2xl p-6 h-full">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <FaBrain className="mx-auto text-white/30 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-white/70 mb-2">
              Master Analysis
            </h3>
            <p className="text-white/50">Select a game to view detailed analysis</p>
          </div>
        </div>
      </div>
    )
  }

  const getCurrentAnnotation = () => {
    const annotation = game.annotations.find(ann => ann.moveNumber === Math.floor((currentMove + 1) / 2))
    return annotation?.comment || 'No annotation available for this move.'
  }

  const getCurrentAssessment = () => {
    const annotation = game.annotations.find(ann => ann.moveNumber === Math.floor((currentMove + 1) / 2))
    return annotation?.assessment || null
  }

  const tabs = [
    { id: 'annotations', label: 'Annotations', icon: BookOpen },
    { id: 'analysis', label: 'Analysis', icon: BarChart3 },
    { id: 'database', label: 'Database', icon: Trophy },
    { id: 'themes', label: 'Themes', icon: Lightbulb }
  ]

  return (
    <div className="h-full flex flex-col">
      {/* Tab Navigation */}
      <Card className="bg-black/30 backdrop-blur-md border-white/10 rounded-b-none">
        <CardContent className="p-0">
          <div className="flex">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant="ghost"
                onClick={() => onModeChange(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 font-medium transition-all duration-200 rounded-none ${
                  mode === tab.id
                    ? `${theme.accent} text-white border-b-2 border-current`
                    : 'text-white/60 hover:text-white hover:bg-black/20'
                }`}
              >
                <tab.icon size={18} />
                <span className="hidden sm:inline">{tab.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tab Content */}
      <Card className="bg-black/30 backdrop-blur-md border-white/10 rounded-t-none flex-1 overflow-hidden">
        <CardContent className="p-6 h-full overflow-y-auto">
          {mode === 'annotations' && (
            <div className="space-y-6">
              {/* Current Move Annotation */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <BookOpen size={20} />
                  Move {currentMove} Analysis
                </h3>
                <Card className="bg-black/30 border-white/10">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-white/90 leading-relaxed">
                        {getCurrentAnnotation()}
                      </div>
                      {getCurrentAssessment() && (
                        <Badge 
                          variant="outline" 
                          className={`ml-3 ${
                            getCurrentAssessment()?.includes('!') 
                              ? 'border-green-400 text-green-400'
                              : 'border-yellow-400 text-yellow-400'
                          }`}
                        >
                          {getCurrentAssessment()}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Key Moments */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Star size={20} />
                  Key Moments
                </h3>
                <div className="space-y-2">
                  {game.keyMoments.map((moveNum) => {
                    const annotation = game.annotations.find(ann => ann.moveNumber === moveNum)
                    return (
                      <Card 
                        key={moveNum}
                        className="bg-black/30 border-white/10 cursor-pointer hover:bg-black/40 transition-colors"
                        onClick={() => {}} // This would jump to the move
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-white">Move {moveNum}</span>
                            <div className="flex items-center gap-2">
                              <Star className="text-yellow-400" size={16} />
                              {annotation?.assessment && (
                                <Badge variant="outline" className="text-xs border-green-400 text-green-400">
                                  {annotation.assessment}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-white/80">
                            {annotation?.comment || 'Critical moment in the game'}
                          </p>
                          {annotation?.themes && (
                            <div className="flex gap-1 mt-2">
                              {annotation.themes.slice(0, 2).map(theme => (
                                <Badge key={theme} variant="secondary" className="text-xs">
                                  {theme}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {mode === 'analysis' && (
            <div className="space-y-6">
              {/* Game Quality */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <TrendingUp size={20} />
                  Game Quality
                </h3>
                <Card className="bg-black/30 border-white/10">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white/80">Overall Rating</span>
                      <span className="text-2xl font-bold text-white">{game.analysis.quality}/10</span>
                    </div>
                    <Progress 
                      value={game.analysis.quality * 10} 
                      className="h-2 mb-4"
                    />
                    <div className="flex items-center gap-2">
                      <FaCrown className="text-yellow-400" size={16} />
                      <span className="text-white/60 text-sm">
                        {game.analysis.quality >= 9 ? 'Masterpiece' : 
                         game.analysis.quality >= 8 ? 'Excellent' :
                         game.analysis.quality >= 7 ? 'Very Good' : 'Good'}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Phase Analysis */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Game Phases</h3>
                <div className="grid gap-3">
                  <Card className="bg-black/30 border-white/10">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-white">Opening</span>
                        <Badge variant="outline" className="text-green-400 border-green-400">
                          {game.analysis.phases.opening.assessment}
                        </Badge>
                      </div>
                      <div className="text-sm text-white/60">
                        Key moves: {game.analysis.phases.opening.keyMoves.join(', ')}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-black/30 border-white/10">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-white">Middlegame</span>
                        <Badge variant="outline" className="text-green-400 border-green-400">
                          {game.analysis.phases.middlegame.assessment}
                        </Badge>
                      </div>
                      <div className="text-sm text-white/60">
                        Key moves: {game.analysis.phases.middlegame.keyMoves.join(', ')}
                      </div>
                      {game.analysis.phases.middlegame.tacticalMotifs && (
                        <div className="flex gap-1 mt-2">
                          {game.analysis.phases.middlegame.tacticalMotifs.slice(0, 3).map(motif => (
                            <Badge key={motif} variant="secondary" className="text-xs">
                              {motif}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {game.analysis.phases.endgame && (
                    <Card className="bg-black/30 border-white/10">
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-white">Endgame</span>
                          <Badge variant="outline" className="text-green-400 border-green-400">
                            {game.analysis.phases.endgame.assessment}
                          </Badge>
                        </div>
                        <div className="text-sm text-white/60">
                          Technique: {game.analysis.phases.endgame.technique}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              {/* Educational Value */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Target size={20} />
                  Educational Value
                </h3>
                <Card className="bg-black/30 border-white/10">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white/80">Learning Potential</span>
                      <span className="text-xl font-bold text-white">{game.analysis.educationalValue}/10</span>
                    </div>
                    <Progress 
                      value={game.analysis.educationalValue * 10} 
                      className="h-2"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {mode === 'database' && (
            <div className="space-y-6">
              {/* Player Information */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <FaCrown size={20} />
                  Players
                </h3>
                <div className="grid gap-3">
                  <Card className="bg-black/30 border-white/10">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-white">{game.white.name} (White)</h4>
                        <div className="text-white/60">{game.white.rating}</div>
                      </div>
                      <div className="text-sm text-white/60 mb-2">
                        {game.white.titles.join(', ')} • {game.white.country}
                      </div>
                      <div className="text-sm text-white/50">
                        {game.white.playingStyle}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-black/30 border-white/10">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-white">{game.black.name} (Black)</h4>
                        <div className="text-white/60">{game.black.rating}</div>
                      </div>
                      <div className="text-sm text-white/60 mb-2">
                        {game.black.titles.join(', ')} • {game.black.country}
                      </div>
                      <div className="text-sm text-white/50">
                        {game.black.playingStyle}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Tournament Details */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Trophy size={20} />
                  Tournament
                </h3>
                <Card className="bg-black/30 border-white/10">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-white/60">Event</span>
                        <span className="text-white font-medium">{game.tournament.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Location</span>
                        <span className="text-white">{game.tournament.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Year</span>
                        <span className="text-white">{game.tournament.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Type</span>
                        <Badge variant="outline" className="border-blue-400 text-blue-400">
                          {game.tournament.type}
                        </Badge>
                      </div>
                      {game.tournament.significance && (
                        <div className="pt-2 border-t border-white/10">
                          <div className="text-sm text-white/80 italic">
                            "{game.tournament.significance}"
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Opening Details */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Opening Information</h3>
                <Card className="bg-black/30 border-white/10">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-lg">{game.opening.eco}</span>
                      <Badge variant="outline" className="border-purple-400 text-purple-400">
                        Popularity: {game.opening.popularity}/10
                      </Badge>
                    </div>
                    <div className="text-white font-medium mb-2">{game.opening.name}</div>
                    <div className="text-sm text-white/60 mb-3">
                      Category: {game.opening.category}
                    </div>
                    {game.opening.characteristics && (
                      <div className="flex gap-2 flex-wrap">
                        {game.opening.characteristics.map(char => (
                          <Badge key={char} variant="secondary" className="text-xs">
                            {char}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Historical Significance */}
              {game.analysis.historicalSignificance && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Clock size={20} />
                    Historical Context
                  </h3>
                  <Card className="bg-black/30 border-white/10">
                    <CardContent className="p-4">
                      <p className="text-white/80 leading-relaxed">
                        {game.analysis.historicalSignificance}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Famous Quotes */}
              {game.analysis.quotes && game.analysis.quotes.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Quote size={20} />
                    Famous Quotes
                  </h3>
                  <div className="space-y-3">
                    {game.analysis.quotes.map((quote, index) => (
                      <Card key={index} className="bg-black/30 border-white/10">
                        <CardContent className="p-4">
                          <blockquote className="text-white/90 italic mb-2">
                            "{quote.text}"
                          </blockquote>
                          <div className="text-sm text-white/60">
                            — {quote.author}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {mode === 'themes' && (
            <div className="space-y-6">
              {/* Strategic Themes */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <FaBrain size={20} />
                  Strategic Themes
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {game.analysis.strategicThemes.map((theme) => (
                    <Badge
                      key={theme}
                      variant="outline"
                      className="px-3 py-1 border-blue-400 text-blue-300"
                    >
                      {theme}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Tactical Themes */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Target size={20} />
                  Tactical Themes
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {game.analysis.tacticalThemes.map((theme) => (
                    <Badge
                      key={theme}
                      variant="outline"
                      className="px-3 py-1 border-red-400 text-red-300"
                    >
                      {theme}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Learning Objectives */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Lightbulb size={20} />
                  What You'll Learn
                </h3>
                <Card className="bg-black/30 border-white/10">
                  <CardContent className="p-4">
                    <ul className="space-y-2">
                      {game.analysis.learningObjectives.map((objective, index) => (
                        <li key={index} className="flex items-start gap-3 text-white/80">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Study Recommendations */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Study Recommendations</h3>
                <div className="space-y-2">
                  {game.analysis.studyRecommendations.map((recommendation, index) => (
                    <Card key={index} className="bg-black/30 border-white/10">
                      <CardContent className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Lightbulb size={16} className="text-purple-400" />
                          </div>
                          <div>
                            <div className="font-medium text-white text-sm mb-1">
                              Recommendation {index + 1}
                            </div>
                            <div className="text-sm text-white/70">
                              {recommendation}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default MasterAnalysis