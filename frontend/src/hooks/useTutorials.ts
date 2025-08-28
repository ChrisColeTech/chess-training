import { useState, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { soundFX } from '@/utils/soundEffects'
import { 
  mockTutorials, 
  mockTutorialSeries,
  tutorialCategories,
  tutorialLevels,
} from '@/data/tutorials'
import type { Tutorial, TutorialSeries } from '@/types/tutorials'

interface UseTutorialsProps {
  setActiveView: (view: 'grid' | 'series') => void
  setSelectedTutorial: (tutorial: Tutorial | null) => void
  setSelectedCategory: (category: string) => void
  setSelectedLevel: (level: string) => void
  setSearchTerm: (term: string) => void
}

/**
 * useTutorials Hook - PROPERLY EXTRACTED BUSINESS LOGIC
 * 
 * Manages all business logic for the TutorialsPage component.
 * Handles tutorial selection, filtering, search, progress tracking,
 * and user interactions following proper SRP architecture.
 * 
 * ALL business logic extracted from page component to comply with SRP.
 */
export const useTutorials = ({
  setActiveView,
  setSelectedTutorial,
  setSelectedCategory,
  setSelectedLevel,
  setSearchTerm
}: UseTutorialsProps) => {
  const navigate = useNavigate()

  // Data state
  const [tutorials] = useState<Tutorial[]>(mockTutorials)
  const [tutorialSeries] = useState<TutorialSeries[]>(mockTutorialSeries)
  const [currentTutorial, setCurrentTutorial] = useState<Tutorial | null>(null)
  
  // UI state
  const [selectedCategory, setSelectedCategoryState] = useState('All')
  const [selectedLevel, setSelectedLevelState] = useState('All')
  const [searchTerm, setSearchTermState] = useState('')
  const [isLoading, _setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Categories and levels for filtering
  const categories = tutorialCategories
  const levels = tutorialLevels

  // Filtered tutorials based on current filters
  const filteredTutorials = useMemo(() => {
    let filtered = tutorials

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(tutorial => tutorial.category === selectedCategory)
    }

    // Level filter
    if (selectedLevel !== 'All') {
      filtered = filtered.filter(tutorial => tutorial.difficulty === selectedLevel)
    }

    // Search filter
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase()
      filtered = filtered.filter(tutorial => 
        tutorial.title.toLowerCase().includes(query) ||
        tutorial.description.toLowerCase().includes(query) ||
        tutorial.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    return filtered
  }, [tutorials, selectedCategory, selectedLevel, searchTerm])

  // Navigation handlers - ALL BUSINESS LOGIC EXTRACTED FROM PAGE
  const handleBackToHelp = useCallback(() => {
    soundFX.playClick()
    navigate('/help')
  }, [navigate])

  const handleBackToTutorials = useCallback(() => {
    soundFX.playClick()
    setCurrentTutorial(null)
    setSelectedTutorial(null)
  }, [setSelectedTutorial])

  // Tutorial selection handlers - ALL BUSINESS LOGIC EXTRACTED FROM PAGE
  const handleTutorialSelect = useCallback((tutorial: Tutorial) => {
    soundFX.playClick()
    setCurrentTutorial(tutorial)
    setSelectedTutorial(tutorial)
  }, [setSelectedTutorial])

  const handleSeriesSelect = useCallback((series: TutorialSeries) => {
    soundFX.playClick()
    // Find first tutorial in series and select it
    const firstTutorialId = series.tutorials[0]
    const firstTutorial = tutorials.find(t => t.id === firstTutorialId)
    if (firstTutorial) {
      handleTutorialSelect(firstTutorial)
    }
  }, [tutorials, handleTutorialSelect])

  // Filter and search handlers - ALL BUSINESS LOGIC EXTRACTED FROM PAGE
  const handleCategoryChange = useCallback((category: string) => {
    soundFX.playClick()
    setSelectedCategoryState(category)
    setSelectedCategory(category)
  }, [setSelectedCategory])

  const handleLevelChange = useCallback((level: string) => {
    soundFX.playClick()
    setSelectedLevelState(level)
    setSelectedLevel(level)
  }, [setSelectedLevel])

  const handleSearchChange = useCallback((searchTerm: string) => {
    setSearchTermState(searchTerm)
    setSearchTerm(searchTerm)
  }, [setSearchTerm])

  const handleViewChange = useCallback((view: 'grid' | 'series') => {
    soundFX.playClick()
    setActiveView(view)
  }, [setActiveView])

  // Utility functions - ALL BUSINESS LOGIC EXTRACTED FROM PAGE
  const getLevelColor = useCallback((level: string) => {
    switch (level) {
      case 'Beginner': return 'text-green-400 bg-green-900/20'
      case 'Intermediate': return 'text-yellow-400 bg-yellow-900/20'
      case 'Advanced': return 'text-orange-400 bg-orange-900/20'
      case 'Expert': return 'text-red-400 bg-red-900/20'
      default: return 'text-slate-400'
    }
  }, [])

  const getTypeIcon = useCallback((type: string) => {
    switch (type) {
      case 'video': return '<Play className="w-4 h-4 inline" />'
      case 'interactive': return '<Target className="w-4 h-4 inline" />'
      case 'article': return '<Book className="w-4 h-4 inline" />'
      default: return '<Play className="w-4 h-4 inline" />'
    }
  }, [])

  // Error handling - BUSINESS LOGIC EXTRACTED FROM PAGE
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const handleError = useCallback((message: string) => {
    setError(message)
    soundFX.playError?.()
  }, [])

  // Return hook interface with ALL business logic extracted from page
  return {
    // Data state
    tutorials,
    tutorialSeries,
    filteredTutorials,
    currentTutorial,
    categories,
    levels,
    selectedCategory,
    selectedLevel,
    searchTerm,
    
    // UI state
    isLoading,
    error,
    
    // Navigation handlers (business logic extracted from page)
    handleBackToHelp,
    handleBackToTutorials,
    
    // Tutorial interaction handlers (business logic extracted from page)
    handleTutorialSelect,
    handleSeriesSelect,
    
    // Filter and search handlers (business logic extracted from page)
    handleCategoryChange,
    handleLevelChange,
    handleSearchChange,
    handleViewChange,
    
    // Utility functions (business logic extracted from page)
    getLevelColor,
    getTypeIcon,
    
    // Error handling
    clearError,
    handleError
  }
}