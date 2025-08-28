import React from 'react'
import { ArrowLeft, BarChart3, Book, BookOpen,  Database, Lightbulb, Play, Shield, Star, Target, Trophy } from 'lucide-react'
import { useThemeStore } from '@/stores/themeStore'
import { useEndgameLibrary } from '@/hooks/useEndgameLibrary'
import { EndgameCategories } from '@/components/study/endgames/EndgameCategories'
import { PositionViewer } from '@/components/study/endgames/PositionViewer'
import { TablebaseQuery } from '@/components/study/endgames/TablebaseQuery'
import { EndgameAnalysis } from '@/components/study/endgames/EndgameAnalysis'
import type { StudyMode } from '@/types/endgameLibrary'
import { GiSwordsPower } from 'react-icons/gi'

/**
 * EndgameLibraryPage Component
 * Professional endgame library interface with fortress theme
 * Features comprehensive position browsing, analysis, and study tools
 * 
 * Architecture:
 * - Uses useEndgameLibrary hook for business logic
 * - Extracted components for SRP compliance  
 * - Gaming aesthetic with ENDGAME FORTRESS theme
 * - Full TypeScript typing with proper interfaces
 */

export const EndgameLibraryPage: React.FC = () => {
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()
  
  // Use the endgame library hook for all business logic
  const {
    // Data state
    categories,
    filteredPositions,
    selectedCategory,
    selectedPosition,
    
    // UI state
    activeTab,
    searchFilter,
    
    // Analysis state
    currentAnalysis,
    isAnalyzing,
    tablebaseResult,
    isQuerying,
    
    // Practice state
    studyProgress,
    
    // Actions
    selectCategory,
    selectPosition,
    setSearchFilter,
    
    // Analysis actions
    analyzePosition,
    queryTablebase,
    
    // Presentation handlers (business logic extracted to hook)
    handleBack,
    handleTabChange,
    handleStartPractice,
    getCategoryProgress,
    
    // Error handling
    error,
    clearError
  } = useEndgameLibrary()

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} relative overflow-hidden`}>
      {/* ENDGAME FORTRESS Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Fortress Towers */}
        <div className={`absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br ${theme.accent} rounded-full opacity-20 blur-xl animate-pulse-glow`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br ${theme.highlight} rounded-full opacity-25 blur-2xl animate-pulse-glow animation-delay-1000`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br ${theme.secondary} rounded-full opacity-15 blur-3xl animate-pulse-glow animation-delay-2000`}></div>
        
        {/* Moving Castle Elements */}
        <div className={`absolute top-10 right-1/3 w-16 h-16 bg-gradient-to-br ${theme.primary} rounded-full opacity-30 blur-md animate-float`}></div>
        <div className={`absolute bottom-1/4 left-1/4 w-20 h-20 bg-gradient-to-br ${theme.accent} rounded-full opacity-20 blur-lg animate-float animation-delay-3000`}></div>
        
        {/* Fortress Sparkles */}
        <div className="absolute inset-0">
          <div className={`absolute top-1/4 right-1/4 w-2 h-2 bg-white rounded-full animate-twinkle`}></div>
          <div className={`absolute top-3/4 left-1/3 w-1 h-1 bg-white rounded-full animate-twinkle animation-delay-500`}></div>
          <div className={`absolute top-1/2 right-1/2 w-1.5 h-1.5 bg-white rounded-full animate-twinkle animation-delay-1500`}></div>
          <div className={`absolute bottom-1/3 left-1/5 w-1 h-1 bg-white rounded-full animate-twinkle animation-delay-2500`}></div>
        </div>
        
        {/* Chess Piece Silhouettes */}
        <div className="absolute top-10 right-10 text-6xl opacity-5 animate-bounce-subtle delay-500">♜</div>
        <div className="absolute bottom-10 left-10 text-5xl opacity-5 animate-bounce-subtle delay-1000">♞</div>
        <div className="absolute top-1/3 right-1/4 text-4xl opacity-5 animate-bounce-subtle delay-1500">♝</div>
        <div className="absolute bottom-1/3 left-1/4 text-7xl opacity-5 animate-bounce-subtle delay-2000">♛</div>
      </div>

      <div className="relative z-10 p-6">
        {/* Fortress Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className={`
                p-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 
                rounded-xl hover:bg-slate-700/50 transition-all duration-200 
                ${theme.text} hover:text-white hover-glow active:scale-95
              `}
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className={`text-4xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent flex items-center gap-3`}>
                🏰 ENDGAME FORTRESS
              </h1>
              <p className={`${theme.text} opacity-80 mt-1`}>Master the theoretical foundations of chess endings</p>
            </div>
          </div>
          
          {/* Fortress Stats */}
          <div className="flex items-center gap-4">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl px-4 py-2">
              <div className={`text-sm ${theme.text} opacity-70`}>Positions Studied</div>
              <div className={`text-lg font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                {Object.values(studyProgress).filter(p => p.masteryLevel > 0).length}
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl px-4 py-2">
              <div className={`text-sm ${theme.text} opacity-70`}>Fortress Level</div>
              <div className={`text-lg font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                Apprentice
              </div>
            </div>
          </div>
        </div>
        
        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-xl animate-slide-down">
            <div className="flex items-center justify-between">
              <p className="text-red-400">{error}</p>
              <button 
                onClick={clearError}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
          {/* Left Fortress - Categories and Positions */}
          <div className="col-span-3 space-y-4">
            <EndgameCategories
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={selectCategory}
              searchFilter={searchFilter}
              onSearchChange={setSearchFilter}
              progress={{
                'Basic Endgames': getCategoryProgress('Basic Endgames'),
                'Rook Endgames': getCategoryProgress('Rook Endgames'),
                'Queen Endgames': getCategoryProgress('Queen Endgames'),
                'Minor Piece Endgames': getCategoryProgress('Minor Piece Endgames'),
                'Bishop Endgames': getCategoryProgress('Bishop Endgames'),
                'Knight Endgames': getCategoryProgress('Knight Endgames'),
                'Pawn Endgames': getCategoryProgress('Pawn Endgames'),
                'Classical Positions': getCategoryProgress('Classical Positions'),
                'Fortress Positions': getCategoryProgress('Fortress Positions'),
                'Theoretical Studies': getCategoryProgress('Theoretical Studies')
              }}
              theme={theme}
            />
            
            {/* Position List */}
            <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 flex-1 overflow-y-auto`}>
              <h3 className={`text-lg font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent mb-3 flex items-center gap-2`}>
                <Target size={20} className={theme.text} />
                Battle Positions
              </h3>
              <div className="space-y-2">
                {filteredPositions.map((position) => {
                  const progress = studyProgress[position.id]
                  const mastery = progress?.masteryLevel || 0
                  
                  return (
                    <button
                      key={position.id}
                      onClick={() => selectPosition(position)}
                      disabled={!position.isUnlocked}
                      className={`
                        w-full text-left p-3 rounded-lg transition-all duration-200
                        ${selectedPosition?.id === position.id
                          ? `bg-gradient-to-r ${theme.primary.replace('from-', 'from-').replace('to-', 'to-')}/20 border border-purple-500/50`
                          : position.isUnlocked
                          ? 'bg-slate-700/30 hover:bg-slate-600/30 hover:scale-101'
                          : 'bg-slate-800/30 opacity-60 cursor-not-allowed'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`font-medium text-sm ${position.isUnlocked ? 'text-white' : 'text-slate-500'}`}>
                          {position.subtitle ? `${position.title}: ${position.subtitle}` : position.title}
                        </h4>
                        <div className="flex items-center gap-1">
                          {!position.isUnlocked && <Shield size={12} className="text-slate-500" />}
                          <span className={`text-xs font-medium ${
                            position.difficulty === 'Beginner' ? 'text-green-400' :
                            position.difficulty === 'Intermediate' ? 'text-yellow-400' :
                            position.difficulty === 'Advanced' ? 'text-orange-400' :
                            position.difficulty === 'Master' ? 'text-red-400' :
                            'text-purple-400'
                          }`}>
                            {position.difficulty}
                          </span>
                        </div>
                      </div>
                      
                      {mastery > 0 && (
                        <div className="mb-2">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-slate-400">Mastery</span>
                            <span className={theme.text}>{mastery}%</span>
                          </div>
                          <div className="w-full bg-slate-600/50 rounded-full h-1">
                            <div 
                              className={`bg-gradient-to-r ${theme.primary} h-1 rounded-full transition-all duration-500`}
                              style={{ width: `${mastery}%` }}
                            />
                          </div>
                        </div>
                      )}
                      
                      <p className="text-xs text-slate-400 mb-2 line-clamp-2">{position.description}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Trophy size={12} />
                          {position.winRate}%
                        </span>
                        <span className="flex items-center gap-1">
                          <Star size={12} />
                          {position.evaluation}
                        </span>
                      </div>
                    </button>
                  )
                })}
                
                {filteredPositions.length === 0 && (
                  <div className="text-center py-8">
                    <Shield size={32} className={`${theme.text} opacity-30 mx-auto mb-2`} />
                    <p className="text-slate-400 text-sm">No positions found in this fortress domain</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Center Fortress - Position Display */}
          <div className="col-span-4 flex flex-col">
            {selectedPosition ? (
              <PositionViewer
                position={selectedPosition}
                theme={theme}
              />
            ) : (
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 flex-1 flex flex-col items-center justify-center">
                <Shield size={64} className={`${theme.text} opacity-30 mb-4`} />
                <h3 className={`text-xl font-bold ${theme.text} opacity-70 mb-2`}>
                  Select a Position
                </h3>
                <p className="text-slate-400 text-center max-w-md">
                  Choose a fortress domain and position to begin your endgame mastery journey
                </p>
              </div>
            )}

            {/* Fortress Practice Controls */}
            {selectedPosition && (
              <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 mt-4`}>
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => selectedPosition && handleStartPractice(selectedPosition, 'guided_study')}
                    className={`
                      flex items-center gap-2 px-6 py-3 
                      bg-gradient-to-r from-green-600 to-emerald-600 
                      hover:from-green-700 hover:to-emerald-700
                      rounded-xl text-white font-bold 
                      transition-all duration-200 hover-glow
                      hover:scale-105 active:scale-95
                    `}
                  >
                    <Play size={18} />
                    🏰 Enter the Fortress
                  </button>
                  <div className="flex gap-2">
                    <button 
                      className={`
                        px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 
                        rounded-lg ${theme.text} transition-all duration-200
                        hover:scale-105 active:scale-95
                      `}
                    >
                      <GiSwordsPower className="w-4 h-4 inline" /> Analyze
                    </button>
                    <button 
                      className={`
                        px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 
                        rounded-lg ${theme.text} transition-all duration-200
                        hover:scale-105 active:scale-95
                      `}
                    >
                      <BookOpen className="w-4 h-4 inline" /> Study
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Fortress - Knowledge Vault */}
          <div className="col-span-5 flex flex-col">
            {/* Fortress Tab Navigation */}
            <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-t-xl`}>
              <div className="flex">
                {[
                  { id: 'overview', label: 'Overview', icon: BookOpen, emoji: '<Book className="w-4 h-4 inline" />' },
                  { id: 'analysis', label: 'Analysis', icon: BarChart3, emoji: '<Brain className="w-4 h-4 inline" />' },
                  { id: 'tablebase', label: 'Tablebase', icon: Database, emoji: '🔮' },
                  { id: 'theory', label: 'Theory', icon: Lightbulb, emoji: '<BookOpen className="w-4 h-4 inline" />' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id as StudyMode)}
                    className={`
                      flex-1 flex items-center justify-center gap-2 px-4 py-3 
                      font-bold text-sm transition-all duration-200 relative
                      ${activeTab === tab.id
                        ? `bg-gradient-to-r ${theme.primary} text-white border-b-2 border-purple-400 shadow-lg`
                        : `${theme.text} opacity-70 hover:opacity-100 hover:bg-slate-700/30`
                      }
                    `}
                  >
                    <span className="text-base">{tab.emoji}</span>
                    <tab.icon size={16} />
                    <span>{tab.label}</span>
                    {activeTab === tab.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Fortress Content Vault */}
            <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 border-t-0 rounded-b-xl p-6 flex-1 overflow-y-auto`}>
              {!selectedPosition ? (
                <div className="text-center py-12">
                  <BookOpen size={48} className={`${theme.text} opacity-30 mx-auto mb-4`} />
                  <h4 className={`${theme.text} opacity-70 text-lg font-medium mb-2`}>
                    Knowledge Awaits
                  </h4>
                  <p className="text-slate-400 text-sm max-w-md mx-auto">
                    Select a position from the fortress archives to unlock its secrets and master its techniques
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      {/* Position Overview */}
                      <div>
                        <h3 className={`text-lg font-bold ${theme.text} mb-3 flex items-center gap-2`}>
                          <Book className="w-4 h-4 inline" /> Fortress Archives
                        </h3>
                        <p className={`${theme.text} opacity-90 leading-relaxed mb-4`}>
                          {selectedPosition.description}
                        </p>
                      </div>

                      {/* Key Learning Points */}
                      <div>
                        <h4 className={`font-semibold ${theme.text} mb-3 flex items-center gap-2`}>
                          <Target className="w-4 h-4 inline" /> Battle Tactics
                        </h4>
                        <ul className="space-y-3">
                          {selectedPosition.keyPoints.map((point, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                              <span className={`${theme.text} opacity-80`}>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Position Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-700/30 rounded-lg p-4 text-center">
                          <div className={`text-2xl font-bold ${theme.text} mb-1`}>
                            {selectedPosition.masterGames.toLocaleString()}
                          </div>
                          <div className="text-sm text-slate-400"><GiSwordsPower className="w-4 h-4 inline" /> Master Battles</div>
                        </div>
                        <div className="bg-slate-700/30 rounded-lg p-4 text-center">
                          <div className={`text-2xl font-bold ${theme.text} mb-1`}>
                            {selectedPosition.winRate}%
                          </div>
                          <div className="text-sm text-slate-400"><Trophy className="w-4 h-4 inline" /> Victory Rate</div>
                        </div>
                      </div>

                      {/* Progress */}
                      {studyProgress[selectedPosition.id] && (
                        <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-lg p-4">
                          <h4 className={`font-semibold text-purple-300 mb-2 flex items-center gap-2`}>
                            🏰 Your Fortress Progress
                          </h4>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-purple-200">Mastery Level</span>
                            <span className="text-white font-bold">
                              {studyProgress[selectedPosition.id].masteryLevel}%
                            </span>
                          </div>
                          <div className="w-full bg-purple-900/50 rounded-full h-2">
                            <div 
                              className={`bg-gradient-to-r ${theme.primary} h-2 rounded-full transition-all duration-500`}
                              style={{ width: `${studyProgress[selectedPosition.id].masteryLevel}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'analysis' && (
                    <EndgameAnalysis
                      position={selectedPosition}
                      analysis={currentAnalysis}
                      isAnalyzing={isAnalyzing}
                      onAnalyze={() => analyzePosition(selectedPosition)}
                      onAnalyzeVariation={() => {}}
                      engineDepth={20}
                      onDepthChange={() => {}}
                      theme={theme}
                    />
                  )}

                  {activeTab === 'tablebase' && (
                    <TablebaseQuery
                      position={selectedPosition.fen}
                      onQuery={queryTablebase}
                      result={tablebaseResult}
                      isLoading={isQuerying}
                      history={[]}
                      theme={theme}
                    />
                  )}

                  {activeTab === 'theory' && (
                    <div className="space-y-6">
                      {/* Theoretical Foundation */}
                      <div>
                        <h3 className={`text-lg font-bold ${theme.text} mb-3 flex items-center gap-2`}>
                          <BookOpen className="w-4 h-4 inline" /> Fortress Knowledge
                        </h3>
                        <p className={`${theme.text} opacity-90 leading-relaxed mb-4`}>
                          This endgame represents one of the most important theoretical positions in chess. 
                          Understanding the underlying principles is essential for practical play and fortress mastery.
                        </p>
                      </div>

                      {/* Historical Context */}
                      <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4">
                        <h4 className="font-semibold text-amber-300 mb-2 flex items-center gap-2">
                          ⏳ Historical Legacy
                        </h4>
                        <p className="text-amber-200 text-sm leading-relaxed">
                          First analyzed in depth by classical endgame theorists, this position has been refined 
                          through centuries of analysis and practical play in tournament battles.
                          {selectedPosition.author && (
                            <><br /><br />Key contributions by: <strong>{selectedPosition.author}</strong></>
                          )}
                          {selectedPosition.source && (
                            <><br />Source: <em>{selectedPosition.source}</em></>
                          )}
                        </p>
                      </div>

                      {/* Related Positions */}
                      <div>
                        <h4 className={`font-semibold ${theme.text} mb-3 flex items-center gap-2`}>
                          🔗 Connected Fortresses
                        </h4>
                        <div className="space-y-2">
                          {selectedPosition.relatedPositions.map((relatedId, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-600/30 transition-colors">
                              <span className={theme.text}>{relatedId.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                              <button className={`bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent font-medium hover:opacity-80 transition-opacity`}>
                                Explore →
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tags */}
                      {selectedPosition.tags && (
                        <div>
                          <h4 className={`font-semibold ${theme.text} mb-3 flex items-center gap-2`}>
                            🏷️ Battle Tags
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedPosition.tags.map((tag, index) => (
                              <span
                                key={index}
                                className={`
                                  px-3 py-1 rounded-lg text-sm font-medium
                                  bg-gradient-to-r ${theme.primary.replace('from-', 'from-').replace('to-', 'to-')}/20 
                                  border border-purple-500/30 text-purple-300
                                `}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Default export for routing
export default EndgameLibraryPage
