/**
 * TutorialsPage Component - PROPER SRP ARCHITECTURE
 * 
 * Interactive learning tutorials interface with video content, series, and progress tracking.
 * Follows TUTORIAL ACADEMY theme with comprehensive learning management.
 * 
 * ARCHITECTURE COMPLIANCE:
 * <CheckCircle className="w-4 h-4 inline" /> Page handles ONLY presentation logic
 * <CheckCircle className="w-4 h-4 inline" /> ALL business logic extracted to useTutorials hook
 * <CheckCircle className="w-4 h-4 inline" /> Page-specific components in /src/components/help/tutorials/
 * <CheckCircle className="w-4 h-4 inline" /> Mock data in /src/data/tutorials.ts
 * <CheckCircle className="w-4 h-4 inline" /> Types in /src/types/tutorials.ts
 * <CheckCircle className="w-4 h-4 inline" /> NO inline handlers with business logic
 */

import React, { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useTutorials } from '@/hooks/useTutorials'
import { 
  TutorialGrid, 
  TutorialSeries as TutorialSeriesComponent, 
  TutorialPlayer, 
  TutorialFilters 
} from '@/components/help/tutorials'
import type { Tutorial } from '@/types/tutorials'

/**
 * TutorialsPage Component - PRESENTATION LOGIC ONLY
 * 
 * ALL business logic has been extracted to useTutorials hook.
 * This component handles ONLY UI rendering and presentation concerns.
 */

const TutorialsPage: React.FC = () => {
  // UI state (presentation only)
  const [activeView, setActiveView] = useState<'grid' | 'series'>('grid')
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedLevel, setSelectedLevel] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  // ALL business logic extracted to useTutorials hook
  const {
    // Data from hook
    tutorialSeries,
    filteredTutorials,
    categories,
    levels,
    isLoading,
    error,
    
    // Business logic handlers from hook (NO inline handlers in page)
    handleBackToHelp,
    handleBackToTutorials,
    handleTutorialSelect,
    handleSeriesSelect,
    handleCategoryChange,
    handleLevelChange,
    handleSearchChange,
    handleViewChange,
    
    // Utility functions from hook
    getLevelColor,
    getTypeIcon,
    
    // Error handling from hook
    clearError
  } = useTutorials({
    setActiveView,
    setSelectedTutorial,
    setSelectedCategory,
    setSelectedLevel,
    setSearchTerm
  })

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-3 border-slate-600 border-t-purple-500 rounded-full mx-auto mb-4"></div>
          <p className="text-slate-300">Loading tutorials...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Gaming Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-white rounded-full opacity-20 animate-bounce animation-delay-1000"></div>
      <div className="absolute top-40 right-32 w-3 h-3 bg-purple-300 rounded-full opacity-30 animate-bounce animation-delay-2000"></div>
      <div className="absolute bottom-32 left-40 w-2 h-2 bg-blue-300 rounded-full opacity-25 animate-bounce animation-delay-3000"></div>
      <div className="absolute bottom-20 right-20 w-5 h-5 bg-indigo-300 rounded-full opacity-20 animate-bounce animation-delay-4000"></div>

      {/* Sparkle effects */}
      <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-white rounded-full opacity-40 animate-ping animation-delay-1000"></div>
      <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-yellow-300 rounded-full opacity-50 animate-ping animation-delay-3000"></div>
      <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-purple-300 rounded-full opacity-30 animate-ping animation-delay-5000"></div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBackToHelp}
              className="p-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl hover:bg-slate-700/50 transition-all duration-200 text-slate-300 hover:text-white"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                TUTORIAL ACADEMY
              </h1>
              <p className="text-slate-400 mt-1">Interactive lessons to master chess skills</p>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
            <div className="flex items-center justify-between">
              <p className="text-sm text-red-400">{error}</p>
              <button
                onClick={clearError}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {!selectedTutorial ? (
          <>
            {/* Filters and Search - EXTRACTED TO COMPONENT */}
            <TutorialFilters
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
              selectedLevel={selectedLevel}
              categories={categories}
              levels={levels}
              activeView={activeView}
              onSearchChange={handleSearchChange}
              onCategoryChange={handleCategoryChange}
              onLevelChange={handleLevelChange}
              onViewChange={handleViewChange}
            />

            {/* Tutorial Series View - EXTRACTED TO COMPONENT */}
            {activeView === 'series' && (
              <TutorialSeriesComponent
                series={tutorialSeries}
                onSeriesSelect={handleSeriesSelect}
                getLevelColor={getLevelColor}
              />
            )}

            {/* Tutorials Grid - EXTRACTED TO COMPONENT */}
            {activeView === 'grid' && (
              <TutorialGrid
                tutorials={filteredTutorials}
                onTutorialSelect={handleTutorialSelect}
                getLevelColor={getLevelColor}
                getTypeIcon={getTypeIcon}
              />
            )}
          </>
        ) : (
          /* Tutorial Player - EXTRACTED TO COMPONENT */
          <TutorialPlayer
            tutorial={selectedTutorial}
            onBackToTutorials={handleBackToTutorials}
            getLevelColor={getLevelColor}
          />
        )}
      </div>
    </div>
  )
}

export default TutorialsPage
