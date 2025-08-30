import { useState, useEffect, useCallback, useRef } from 'react'
import { soundFX } from '@/utils/soundEffects'
import { useSearch } from '@/hooks/api/useSearch'
import type {
  HelpArticle,
  FAQItem,
  Tutorial,
  CategoryInfo,
  HelpCenterConfig,
  UserProgress,
  SearchResult,
  SearchFilters,
  HelpCategory,
  FeedbackType,
  HelpCenterHookReturn
} from '@/types/helpCenter'

/**
 * Custom hook for managing help center state and functionality
 * Handles search, navigation, user progress, and content management
 */
export const useHelpCenter = (): HelpCenterHookReturn => {
  // Use API hooks instead of static data
  const { searchResults: searchData, isLoading: searchLoading, performSearch: apiSearch } = useSearch()
  
  // Local data that would come from API in a real application
  const [articles] = useState<HelpArticle[]>([])
  const [faqs] = useState<FAQItem[]>([])
  const [tutorialList] = useState<Tutorial[]>([])
  const [categories] = useState<CategoryInfo[]>([])
  const [config] = useState<HelpCenterConfig>({
    featuredArticles: [],
    searchSuggestions: ['Getting Started', 'How to Play', 'Chess Rules', 'Settings', 'Account Issues']
  })
  
  // Current state
  const [currentArticle, setCurrentArticle] = useState<HelpArticle | null>(null)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [userProgress, setUserProgress] = useState<UserProgress>({
    articlesRead: [],
    bookmarks: [],
    recentSearches: [],
    feedbackGiven: {},
    stats: {
      totalArticlesRead: 0,
      totalTimeSpent: 0,
      streakDays: 0,
      completionRate: 0
    }
  })
  
  // Search filters
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    contentType: 'all',
    category: 'all',
    difficulty: 'all',
    sortBy: 'relevance',
    sortOrder: 'desc',
    featuredOnly: false
  })
  
  // UI state
  const [isLoading, setIsLoading] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<HelpCategory | null>(null)
  const [showSearchFilters, setShowSearchFilters] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Search debounce
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  /**
   * Perform search with debouncing
   */
  const performSearch = useCallback(async (query: string, filters?: Partial<SearchFilters>): Promise<void> => {
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }
    
    // Update query immediately for UI responsiveness
    setSearchQuery(query)
    
    // If query is empty, clear results
    if (!query.trim()) {
      setSearchResults([])
      setIsSearching(false)
      return
    }
    
    setIsSearching(true)
    setError(null)
    
    // Apply any filter updates
    if (filters) {
      setSearchFilters(prev => ({ ...prev, ...filters }))
    }
    
    // Debounce the actual search
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        // Simulate API delay for realistic feel
        await new Promise(resolve => setTimeout(resolve, 300))
        
        const currentFilters = filters ? { ...searchFilters, ...filters } : searchFilters
        const results = await apiSearch(query, currentFilters) || []
        
        // Apply filters to results
        let filteredResults = results
        
        if (currentFilters.contentType !== 'all') {
          filteredResults = filteredResults.filter(r => r.type === currentFilters.contentType)
        }
        
        if (currentFilters.category !== 'all') {
          filteredResults = filteredResults.filter(r => r.category === currentFilters.category)
        }
        
        if (currentFilters.difficulty !== 'all') {
          filteredResults = filteredResults.filter(r => r.metadata.difficulty === currentFilters.difficulty)
        }
        
        if (currentFilters.featuredOnly) {
          filteredResults = filteredResults.filter(r => 
            config.featuredArticles.includes(r.id)
          )
        }
        
        // Sort results
        filteredResults.sort((a, b) => {
          switch (currentFilters.sortBy) {
            case 'relevance':
              return currentFilters.sortOrder === 'desc' 
                ? b.relevance - a.relevance 
                : a.relevance - b.relevance
            case 'title':
              return currentFilters.sortOrder === 'desc'
                ? b.title.localeCompare(a.title)
                : a.title.localeCompare(b.title)
            case 'date':
              // Mock date sorting based on article order
              return currentFilters.sortOrder === 'desc' ? -1 : 1
            case 'popularity':
              // Mock popularity sorting
              return currentFilters.sortOrder === 'desc' ? -1 : 1
            default:
              return 0
          }
        })
        
        setSearchResults(filteredResults)
        trackSearch(query)
        
        // Play search sound
        soundFX.playClick()
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Search failed')
        soundFX.playError()
      } finally {
        setIsSearching(false)
      }
    }, 300)
  }, [searchFilters, config])
  
  /**
   * Clear search results and query
   */
  const clearSearch = useCallback(() => {
    setSearchQuery('')
    setSearchResults([])
    setIsSearching(false)
    
    // Clear timeout if active
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }
    
    soundFX.playClick()
  }, [])
  
  /**
   * Update search filters
   */
  const updateFilters = useCallback((filters: Partial<SearchFilters>) => {
    setSearchFilters(prev => ({ ...prev, ...filters }))
    
    // Re-run search with new filters if there's an active query
    if (searchQuery.trim()) {
      performSearch(searchQuery, filters)
    }
    
    soundFX.playClick()
  }, [searchQuery, performSearch])
  
  /**
   * Get search suggestions based on query
   */
  const getSuggestions = useCallback((query: string): string[] => {
    if (!query.trim()) return config.searchSuggestions.slice(0, 5)
    
    const queryLower = query.toLowerCase()
    const suggestions = config.searchSuggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(queryLower)
    )
    
    // Add dynamic suggestions from article titles
    const articleTitles = articles
      .filter(article => article.title.toLowerCase().includes(queryLower))
      .map(article => article.title)
      .slice(0, 3)
    
    return [...suggestions, ...articleTitles].slice(0, 8)
  }, [config.searchSuggestions, articles])
  
  /**
   * Navigate to a specific article
   */
  const navigateToArticle = useCallback((articleId: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const article = articles.find(a => a.id === articleId)
      if (!article) {
        setError('Article not found')
        return
      }
      
      setCurrentArticle(article)
      markAsRead(articleId)
      trackPageView(articleId)
      
      // Clear search if active
      if (searchQuery) {
        clearSearch()
      }
      
      soundFX.playClick()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load article')
      soundFX.playError()
    } finally {
      setIsLoading(false)
    }
  }, [searchQuery, clearSearch])
  
  /**
   * Navigate to a category view
   */
  const navigateToCategory = useCallback((category: HelpCategory) => {
    setSelectedCategory(category)
    setCurrentArticle(null)
    
    // Clear search
    clearSearch()
    
    trackUserAction('navigate_category', category)
    soundFX.playClick()
  }, [clearSearch])
  
  /**
   * Go back to previous view
   */
  const goBack = useCallback(() => {
    if (currentArticle) {
      setCurrentArticle(null)
    } else if (selectedCategory) {
      setSelectedCategory(null)
    }
    
    soundFX.playClick()
  }, [currentArticle, selectedCategory])
  
  /**
   * Submit feedback for content
   */
  const submitFeedback = useCallback((contentId: string, feedback: FeedbackType) => {
    setUserProgress(prev => ({
      ...prev,
      feedbackGiven: {
        ...prev.feedbackGiven,
        [contentId]: feedback
      }
    }))
    
    trackUserAction('submit_feedback', contentId)
    soundFX.playClick()
    
    // Show temporary success message (in real app, this would be a toast)
    console.log(`Feedback "${feedback}" submitted for ${contentId}`)
  }, [])
  
  /**
   * Toggle bookmark status for content
   */
  const toggleBookmark = useCallback((contentId: string) => {
    setUserProgress(prev => {
      const isBookmarked = prev.bookmarks.includes(contentId)
      const newBookmarks = isBookmarked
        ? prev.bookmarks.filter(id => id !== contentId)
        : [...prev.bookmarks, contentId]
      
      return {
        ...prev,
        bookmarks: newBookmarks
      }
    })
    
    trackUserAction('toggle_bookmark', contentId)
    soundFX.playClick()
  }, [])
  
  /**
   * Mark content as read
   */
  const markAsRead = useCallback((contentId: string) => {
    setUserProgress(prev => {
      if (prev.articlesRead.includes(contentId)) return prev
      
      return {
        ...prev,
        articlesRead: [...prev.articlesRead, contentId],
        stats: {
          ...prev.stats,
          totalArticlesRead: prev.stats.totalArticlesRead + 1
        }
      }
    })
  }, [])
  
  /**
   * Start a tutorial
   */
  const startTutorial = useCallback((tutorialId: string) => {
    const tutorial = tutorialList.find(t => t.id === tutorialId)
    if (!tutorial) {
      setError('Tutorial not found')
      return
    }
    
    trackUserAction('start_tutorial', tutorialId)
    soundFX.playSuccess()
    
    // In a real app, this would navigate to the tutorial interface
    console.log(`Starting tutorial: ${tutorial.title}`)
  }, [])
  
  /**
   * Get featured content
   */
  const getFeaturedContentList = useCallback(() => {
    return articles.filter(article => config.featuredArticles.includes(article.id))
  }, [articles, config])
  
  /**
   * Get popular content
   */
  const getPopularContentList = useCallback(() => {
    // Return most viewed articles as popular content
    return articles.slice(0, 5) // Mock implementation
  }, [articles])
  
  /**
   * Get related content based on current content
   */
  const getRelatedContent = useCallback((contentId: string): (HelpArticle | Tutorial)[] => {
    const article = articles.find(a => a.id === contentId)
    if (!article) return []
    
    const related = (article.relatedArticles || [])
      .map(id => articles.find(a => a.id === id))
      .filter(Boolean) as HelpArticle[]
    
    // Add tutorials from same category if needed
    const categoryTutorials = tutorialList
      .filter(t => t.category === article.category)
      .slice(0, 2)
    
    return [...related, ...categoryTutorials].slice(0, 5)
  }, [articles, tutorialList])
  
  /**
   * Get content by category
   */
  const getCategoryContent = useCallback((category: HelpCategory): (HelpArticle | Tutorial)[] => {
    const categoryArticles = articles.filter(article => article.category === category)
    const categoryTutorials = tutorialList.filter(tutorial => tutorial.category === category)
    
    return [...categoryArticles, ...categoryTutorials]
  }, [articles, tutorialList])
  
  /**
   * Track page view for analytics
   */
  const trackPageView = useCallback((contentId: string) => {
    // In a real app, this would send analytics data
    console.log(`Page view tracked: ${contentId}`)
    
    // Update recent searches if this came from search
    if (searchQuery) {
      setUserProgress(prev => ({
        ...prev,
        recentSearches: [
          searchQuery,
          ...prev.recentSearches.filter(s => s !== searchQuery)
        ].slice(0, 10)
      }))
    }
  }, [searchQuery])
  
  /**
   * Track search for analytics
   */
  const trackSearch = useCallback((query: string) => {
    // In a real app, this would send analytics data
    console.log(`Search tracked: ${query}`)
  }, [])
  
  /**
   * Track user action for analytics
   */
  const trackUserAction = useCallback((action: string, contentId?: string) => {
    // In a real app, this would send analytics data
    console.log(`User action tracked: ${action}${contentId ? ` for ${contentId}` : ''}`)
  }, [])
  
  /**
   * Clear error message
   */
  const clearError = useCallback(() => {
    setError(null)
  }, [])
  
  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [])
  
  // Toggle search filters visibility
  const toggleSearchFilters = useCallback(() => {
    setShowSearchFilters(prev => !prev)
    soundFX.playClick()
  }, [])
  
  return {
    // Content data
    articles,
    faqs,
    tutorials: tutorialList,
    categories,
    config,
    
    // Current state
    currentArticle,
    searchResults,
    searchQuery,
    searchFilters,
    userProgress,
    
    // UI state
    isLoading,
    isSearching,
    selectedCategory,
    showSearchFilters,
    
    // Search functionality
    performSearch,
    clearSearch,
    updateFilters,
    getSuggestions,
    
    // Navigation
    navigateToArticle,
    navigateToCategory,
    goBack,
    
    // User interactions
    submitFeedback,
    toggleBookmark,
    markAsRead,
    startTutorial,
    
    // Content retrieval
    getFeaturedContent: getFeaturedContentList,
    getPopularContent: getPopularContentList,
    getRelatedContent,
    getCategoryContent,
    
    // Analytics
    trackPageView,
    trackSearch,
    trackUserAction,
    
    // Error handling
    error,
    clearError,
    
    // Additional utilities
    toggleSearchFilters
  } as HelpCenterHookReturn & { toggleSearchFilters: () => void }
}