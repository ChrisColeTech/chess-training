/**
 * Help Center Types
 * Contains all TypeScript interfaces and types for the help center system
 */

/**
 * Help article category types
 */
export type HelpCategory = 
  | 'getting-started' 
  | 'gameplay' 
  | 'puzzles' 
  | 'training' 
  | 'account' 
  | 'technical' 
  | 'troubleshooting'
  | 'advanced'

/**
 * Article difficulty levels
 */
export type ArticleDifficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert'

/**
 * Search filter types
 */
export type SearchFilter = 'all' | 'articles' | 'videos' | 'faqs' | 'tutorials'

/**
 * Article content types
 */
export type ContentType = 'article' | 'video' | 'interactive' | 'faq' | 'tutorial'

/**
 * User feedback types
 */
export type FeedbackType = 'helpful' | 'not_helpful' | 'needs_update' | 'report_issue'

/**
 * Tutorial progress status
 */
export type TutorialStatus = 'not_started' | 'in_progress' | 'completed' | 'skipped'

/**
 * Represents a help article
 */
export interface HelpArticle {
  /** Unique identifier */
  id: string
  
  /** Article title */
  title: string
  
  /** Brief description/summary */
  description: string
  
  /** Full article content in markdown */
  content: string
  
  /** Article category */
  category: HelpCategory
  
  /** Content type */
  contentType: ContentType
  
  /** Difficulty level */
  difficulty: ArticleDifficulty
  
  /** Tags for improved searchability */
  tags: string[]
  
  /** Estimated reading time in minutes */
  readingTime: number
  
  /** Author information */
  author: {
    name: string
    role: string
    avatar?: string
  }
  
  /** Article metadata */
  metadata: {
    createdAt: number
    updatedAt: number
    version: string
    views: number
    helpfulVotes: number
    totalVotes: number
  }
  
  /** Related articles */
  relatedArticles: string[]
  
  /** Prerequisites (other article IDs) */
  prerequisites?: string[]
  
  /** Whether article is featured */
  isFeatured: boolean
  
  /** Whether article is trending */
  isTrending: boolean
  
  /** Video URL if content includes video */
  videoUrl?: string
  
  /** Video thumbnail URL */
  videoThumbnail?: string
  
  /** Video duration in seconds */
  videoDuration?: number
}

/**
 * FAQ item structure
 */
export interface FAQItem {
  /** Unique identifier */
  id: string
  
  /** Question text */
  question: string
  
  /** Answer content in markdown */
  answer: string
  
  /** Category */
  category: HelpCategory
  
  /** Tags */
  tags: string[]
  
  /** Popularity score */
  popularity: number
  
  /** Whether this is a featured FAQ */
  isFeatured: boolean
  
  /** Related articles */
  relatedArticles: string[]
  
  /** Metadata */
  metadata: {
    createdAt: number
    updatedAt: number
    views: number
    helpfulVotes: number
    totalVotes: number
  }
}

/**
 * Interactive tutorial step
 */
export interface TutorialStep {
  /** Step number */
  stepNumber: number
  
  /** Step title */
  title: string
  
  /** Step description */
  description: string
  
  /** Instructions for the user */
  instructions: string
  
  /** Visual aid (image/video) */
  visualAid?: {
    type: 'image' | 'video' | 'interactive'
    url: string
    alt?: string
  }
  
  /** Interactive element configuration */
  interaction?: {
    type: 'click' | 'input' | 'selection' | 'navigation'
    target: string
    validation?: string
  }
  
  /** Tips or hints */
  tips?: string[]
}

/**
 * Interactive tutorial
 */
export interface Tutorial {
  /** Unique identifier */
  id: string
  
  /** Tutorial title */
  title: string
  
  /** Brief description */
  description: string
  
  /** Category */
  category: HelpCategory
  
  /** Difficulty level */
  difficulty: ArticleDifficulty
  
  /** Tutorial steps */
  steps: TutorialStep[]
  
  /** Estimated completion time */
  estimatedTime: number
  
  /** Prerequisites */
  prerequisites?: string[]
  
  /** Completion rewards */
  rewards?: {
    points: number
    badges: string[]
    achievements: string[]
  }
  
  /** Tutorial metadata */
  metadata: {
    createdAt: number
    updatedAt: number
    completions: number
    averageRating: number
    totalRatings: number
  }
  
  /** Whether tutorial is interactive */
  isInteractive: boolean
  
  /** Thumbnail image */
  thumbnail: string
}

/**
 * Search result item
 */
export interface SearchResult {
  /** Item ID */
  id: string
  
  /** Result type */
  type: ContentType
  
  /** Title with search highlights */
  title: string
  
  /** Description with search highlights */
  description: string
  
  /** Category */
  category: HelpCategory
  
  /** Relevance score (0-1) */
  relevance: number
  
  /** URL or navigation path */
  url: string
  
  /** Thumbnail if available */
  thumbnail?: string
  
  /** Additional metadata */
  metadata: {
    readingTime?: number
    videoDuration?: number
    difficulty: ArticleDifficulty
    tags: string[]
  }
}

/**
 * Category information
 */
export interface CategoryInfo {
  /** Category ID */
  id: HelpCategory
  
  /** Display name */
  name: string
  
  /** Category description */
  description: string
  
  /** Category icon (Phosphor icon name) */
  icon: string
  
  /** Category color theme */
  color: string
  
  /** Number of articles in category */
  articleCount: number
  
  /** Featured articles in this category */
  featuredArticles: string[]
  
  /** Whether category is popular */
  isPopular: boolean
  
  /** Subcategories if applicable */
  subcategories?: {
    id: string
    name: string
    count: number
  }[]
}

/**
 * User progress tracking
 */
export interface UserProgress {
  /** Articles read */
  articlesRead: string[]
  
  /** Tutorials completed */
  tutorialsCompleted: string[]
  
  /** Bookmarked articles */
  bookmarks: string[]
  
  /** Recent searches */
  recentSearches: string[]
  
  /** Feedback given */
  feedbackGiven: Record<string, FeedbackType>
  
  /** Progress statistics */
  stats: {
    totalArticlesRead: number
    totalTutorialsCompleted: number
    totalTimeSpent: number
    favoriteCategories: HelpCategory[]
  }
}

/**
 * Help center configuration
 */
export interface HelpCenterConfig {
  /** Featured articles */
  featuredArticles: string[]
  
  /** Popular articles */
  popularArticles: string[]
  
  /** Trending topics */
  trendingTopics: string[]
  
  /** Quick actions */
  quickActions: {
    id: string
    title: string
    description: string
    icon: string
    url: string
  }[]
  
  /** Contact options */
  contactOptions: {
    id: string
    title: string
    description: string
    icon: string
    available: boolean
    responseTime?: string
  }[]
  
  /** Search suggestions */
  searchSuggestions: string[]
  
  /** Announcement banner */
  announcement?: {
    id: string
    title: string
    message: string
    type: 'info' | 'warning' | 'success' | 'error'
    isActive: boolean
  }
}

/**
 * Search filters configuration
 */
export interface SearchFilters {
  /** Content type filter */
  contentType: SearchFilter
  
  /** Category filter */
  category: HelpCategory | 'all'
  
  /** Difficulty filter */
  difficulty: ArticleDifficulty | 'all'
  
  /** Sort by option */
  sortBy: 'relevance' | 'date' | 'popularity' | 'title'
  
  /** Sort order */
  sortOrder: 'asc' | 'desc'
  
  /** Show only featured content */
  featuredOnly: boolean
}

/**
 * Props for search interface component
 */
export interface SearchInterfaceProps {
  /** Current search query */
  query: string
  
  /** Search results */
  results: SearchResult[]
  
  /** Current filters */
  filters: SearchFilters
  
  /** Whether search is loading */
  isLoading: boolean
  
  /** Search suggestions */
  suggestions: string[]
  
  /** Callback for search query change */
  onQueryChange: (query: string) => void
  
  /** Callback for filter change */
  onFiltersChange: (filters: Partial<SearchFilters>) => void
  
  /** Callback for search suggestion selection */
  onSuggestionSelect: (suggestion: string) => void
  
  /** Theme from store */
  theme: any
}

/**
 * Props for category browser component
 */
export interface CategoryBrowserProps {
  /** Available categories */
  categories: CategoryInfo[]
  
  /** Currently selected category */
  selectedCategory: HelpCategory | null
  
  /** Callback when category is selected */
  onCategorySelect: (category: HelpCategory) => void
  
  /** Theme from store */
  theme: any
}

/**
 * Props for article viewer component
 */
export interface ArticleViewerProps {
  /** Article to display */
  article: HelpArticle | null
  
  /** Whether article is loading */
  isLoading: boolean
  
  /** User progress data */
  userProgress: UserProgress
  
  /** Related articles */
  relatedArticles: HelpArticle[]
  
  /** Callback for article navigation */
  onArticleNavigate: (articleId: string) => void
  
  /** Callback for feedback submission */
  onFeedbackSubmit: (articleId: string, feedback: FeedbackType) => void
  
  /** Callback for bookmark toggle */
  onBookmarkToggle: (articleId: string) => void
  
  /** Theme from store */
  theme: any
}

/**
 * Props for FAQ section component
 */
export interface FAQSectionProps {
  /** FAQ items to display */
  faqs: FAQItem[]
  
  /** Current search query for highlighting */
  searchQuery?: string
  
  /** Selected category filter */
  categoryFilter: HelpCategory | 'all'
  
  /** Callback for category filter change */
  onCategoryFilterChange: (category: HelpCategory | 'all') => void
  
  /** Callback for FAQ item vote */
  onFAQVote: (faqId: string, helpful: boolean) => void
  
  /** Theme from store */
  theme: any
}

/**
 * Props for tutorial browser component
 */
export interface TutorialBrowserProps {
  /** Available tutorials */
  tutorials: Tutorial[]
  
  /** User progress */
  userProgress: UserProgress
  
  /** Current filter */
  filter: {
    category: HelpCategory | 'all'
    difficulty: ArticleDifficulty | 'all'
    completedOnly: boolean
  }
  
  /** Callback for filter change */
  onFilterChange: (filter: any) => void
  
  /** Callback to start tutorial */
  onTutorialStart: (tutorialId: string) => void
  
  /** Theme from store */
  theme: any
}

/**
 * Hook return type for useHelpCenter
 */
export interface HelpCenterHookReturn {
  // Content data
  articles: HelpArticle[]
  faqs: FAQItem[]
  tutorials: Tutorial[]
  categories: CategoryInfo[]
  config: HelpCenterConfig
  
  // Current state
  currentArticle: HelpArticle | null
  searchResults: SearchResult[]
  searchQuery: string
  searchFilters: SearchFilters
  userProgress: UserProgress
  
  // UI state
  isLoading: boolean
  isSearching: boolean
  selectedCategory: HelpCategory | null
  showSearchFilters: boolean
  
  // Search functionality
  performSearch: (query: string, filters?: Partial<SearchFilters>) => Promise<void>
  clearSearch: () => void
  updateFilters: (filters: Partial<SearchFilters>) => void
  getSuggestions: (query: string) => string[]
  
  // Navigation
  navigateToArticle: (articleId: string) => void
  navigateToCategory: (category: HelpCategory) => void
  goBack: () => void
  
  // User interactions
  submitFeedback: (contentId: string, feedback: FeedbackType) => void
  toggleBookmark: (contentId: string) => void
  markAsRead: (contentId: string) => void
  startTutorial: (tutorialId: string) => void
  
  // Content retrieval
  getFeaturedContent: () => (HelpArticle | Tutorial)[]
  getPopularContent: () => (HelpArticle | Tutorial)[]
  getRelatedContent: (contentId: string) => (HelpArticle | Tutorial)[]
  getCategoryContent: (category: HelpCategory) => (HelpArticle | Tutorial)[]
  
  // Analytics
  trackPageView: (contentId: string) => void
  trackSearch: (query: string) => void
  trackUserAction: (action: string, contentId?: string) => void
  
  // Error handling
  error: string | null
  
  // UI event handlers
  handleViewChange: (view: string) => void
  handleSearch: (query: string) => void
  handleCategorySelect: (category: HelpCategory) => void
  handleArticleSelect: (articleId: string) => void
  handleFAQVote: (faqId: string, helpful: boolean) => void
  clearError: () => void
}

/**
 * Search query analysis result
 */
export interface SearchAnalysis {
  /** Detected intent */
  intent: 'navigation' | 'information' | 'troubleshooting' | 'tutorial'
  
  /** Suggested content types */
  suggestedTypes: ContentType[]
  
  /** Suggested categories */
  suggestedCategories: HelpCategory[]
  
  /** Query complexity */
  complexity: 'simple' | 'complex'
  
  /** Extracted keywords */
  keywords: string[]
}