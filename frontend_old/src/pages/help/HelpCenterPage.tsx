import React, { useState } from 'react'
import { BookOpen, Brain, MessageCircle, GraduationCap, Grid3X3, HelpCircle, Lightbulb, Play, Rocket, Search, Star, TrendingUp, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useThemeStore } from '@/stores/themeStore'
import { useHelpCenter } from '@/hooks/useHelpCenter'
import { 
  SearchInterface, 
  CategoryBrowser, 
  ArticleViewer, 
  FAQSection 
} from '@/components/help/center'
import type { HelpCategory, HelpArticle } from '@/types/helpCenter'

/**
 * Help Center Page Component
 * 
 * KNOWLEDGE BASE themed help center with comprehensive search functionality,
 * categorized help articles, FAQs, interactive tutorials, and user support options.
 * 
 * Features:
 * - Comprehensive search with instant results and filters
 * - Categorized help articles and documentation
 * - FAQ section with expandable answers
 * - Featured and trending content highlights
 * - Quick access to common tasks and shortcuts
 * - Contact options and community support
 * - Interactive tutorials and video content
 * - User feedback and rating system
 * - Gaming aesthetic with theme integration
 */
export const HelpCenterPage: React.FC = () => {
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()
  
  // Help center state and functionality
  const {
    // Content data
    articles,
    faqs,
    tutorials,
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
    // Search functionality
    updateFilters,
    getSuggestions,
    
    
    // User interactions
    submitFeedback,
    toggleBookmark,
    startTutorial,
    
    // Content retrieval
    getFeaturedContent,
    getPopularContent,
    getRelatedContent,
    
    // Presentation handlers (business logic extracted to hook)
    handleViewChange,
    handleSearch,
    handleCategorySelect,
    handleArticleSelect,
    handleFAQVote,
    
    // Error handling
    error,
    clearError
  } = useHelpCenter()

  // Local UI state
  const [activeView, _setActiveView] = useState<'home' | 'search' | 'category' | 'article' | 'faq'>('home')

  // Get suggestions for search
  const searchSuggestions = searchQuery ? getSuggestions(searchQuery) : config.searchSuggestions

  return (
    <div className="min-h-full p-4 relative">
      {/* Gaming Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-20 w-32 h-32 bg-gradient-to-br ${theme.accent} rounded-full opacity-10 blur-xl animate-pulse-glow`}></div>
        <div className={`absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br ${theme.highlight} rounded-full opacity-15 blur-2xl animate-pulse-glow animation-delay-1000`}></div>
        <div className={`absolute top-1/2 left-10 w-24 h-16 bg-gradient-to-br ${theme.secondary} rounded-full opacity-10 blur-lg animate-pulse-glow animation-delay-2000`}></div>
        
        {/* Floating Knowledge Icons */}
        <div className="absolute top-10 right-10 text-4xl opacity-5 animate-float"><BookOpen className="w-4 h-4 inline" /></div>
        <div className="absolute bottom-10 left-10 text-3xl opacity-5 animate-float animation-delay-1000"><Brain className="w-4 h-4 inline" /></div>
        <div className="absolute top-1/3 right-1/4 text-2xl opacity-5 animate-float animation-delay-1500"><Lightbulb className="w-4 h-4 inline" /></div>
        <div className="absolute bottom-1/3 left-1/4 text-5xl opacity-5 animate-float animation-delay-2000"><GraduationCap className="w-4 h-4 inline" /></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10">
        {/* Header Section */}
        <div className="border-b border-gray-700/50 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center space-y-6">
              {/* Hero Section */}
              <div className="space-y-4">
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${theme.primary} rounded-2xl shadow-2xl mb-4`}>
                  <BookOpen size={40} className="text-white" />
                </div>
                
                <h1 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                  Knowledge Base
                </h1>
                
                <p className={`text-xl ${theme.text} opacity-80 max-w-2xl mx-auto leading-relaxed`}>
                  Your comprehensive guide to chess training mastery. Find answers, learn techniques, and unlock your potential.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="flex items-center justify-center space-x-8 text-sm">
                <div className={`flex items-center space-x-2 ${theme.text} opacity-80`}>
                  <BookOpen size={16} />
                  <span>{articles.length} Articles</span>
                </div>
                <div className={`flex items-center space-x-2 ${theme.text} opacity-80`}>
                  <HelpCircle size={16} />
                  <span>{faqs.length} FAQs</span>
                </div>
                <div className={`flex items-center space-x-2 ${theme.text} opacity-80`}>
                  <Play size={16} />
                  <span>{tutorials.length} Tutorials</span>
                </div>
                <div className={`flex items-center space-x-2 ${theme.text} opacity-80`}>
                  <Users size={16} />
                  <span>{categories.length} Categories</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-700/50 bg-black/10 backdrop-blur-sm sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center space-x-1 py-4">
              <Button
                variant={activeView === 'home' ? 'default' : 'ghost'}
                onClick={() => handleViewChange('home')}
                className={activeView === 'home' 
                  ? `bg-gradient-to-r ${theme.primary} text-white shadow-lg`
                  : `${theme.text} hover:bg-gray-700`
                }
              >
                <Rocket size={16} className="mr-2" />
                Home
              </Button>
              
              <Button
                variant={activeView === 'search' ? 'default' : 'ghost'}
                onClick={() => handleViewChange('search')}
                className={activeView === 'search' 
                  ? `bg-gradient-to-r ${theme.primary} text-white shadow-lg`
                  : `${theme.text} hover:bg-gray-700`
                }
              >
                <Search size={16} className="mr-2" />
                Search
              </Button>
              
              <Button
                variant={activeView === 'category' ? 'default' : 'ghost'}
                onClick={() => handleViewChange('category')}
                className={activeView === 'category' 
                  ? `bg-gradient-to-r ${theme.primary} text-white shadow-lg`
                  : `${theme.text} hover:bg-gray-700`
                }
              >
                <Grid3X3 size={16} className="mr-2" />
                Categories
              </Button>
              
              <Button
                variant={activeView === 'faq' ? 'default' : 'ghost'}
                onClick={() => handleViewChange('faq')}
                className={activeView === 'faq' 
                  ? `bg-gradient-to-r ${theme.primary} text-white shadow-lg`
                  : `${theme.text} hover:bg-gray-700`
                }
              >
                <HelpCircle size={16} className="mr-2" />
                FAQs
              </Button>

              {/* Active Indicators */}
              {searchQuery && (
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 ml-4">
                  <Search size={12} className="mr-1" />
                  Searching: "{searchQuery}"
                </Badge>
              )}
              
              {selectedCategory && (
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 ml-4">
                  <Grid3X3 size={12} className="mr-1" />
                  Category: {selectedCategory.replace('-', ' ')}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="max-w-7xl mx-auto px-4 py-4">
            <Card className="bg-red-500/20 border-red-500/30 p-4">
              <div className="flex items-center justify-between">
                <p className="text-red-400">{error}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearError}
                  className="text-red-400 hover:bg-red-500/20"
                >
                  ×
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Home View */}
          {activeView === 'home' && (
            <HomeView
              theme={theme}
              config={config}
              featuredContent={getFeaturedContent()}
              popularContent={getPopularContent()}
              categories={categories}
              onSearch={handleSearch}
              onCategorySelect={handleCategorySelect}
              onArticleSelect={handleArticleSelect}
              onTutorialStart={startTutorial}
            />
          )}

          {/* Search View */}
          {activeView === 'search' && (
            <SearchInterface
              query={searchQuery}
              results={searchResults}
              filters={searchFilters}
              isLoading={isSearching}
              suggestions={searchSuggestions}
              onQueryChange={handleSearch}
              onFiltersChange={updateFilters}
              onSuggestionSelect={handleSearch}
              theme={theme}
            />
          )}

          {/* Category View */}
          {activeView === 'category' && (
            <CategoryBrowser
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={handleCategorySelect}
              theme={theme}
            />
          )}

          {/* Article View */}
          {activeView === 'article' && (
            <ArticleViewer
              article={currentArticle}
              isLoading={isLoading}
              userProgress={userProgress}
              relatedArticles={currentArticle ? getRelatedContent(currentArticle.id).filter((item): item is HelpArticle => 'content' in item) : []}
              onArticleNavigate={handleArticleSelect}
              onFeedbackSubmit={submitFeedback}
              onBookmarkToggle={toggleBookmark}
              theme={theme}
            />
          )}

          {/* FAQ View */}
          {activeView === 'faq' && (
            <FAQSection
              faqs={faqs}
              searchQuery=""
              categoryFilter="all"
              onCategoryFilterChange={(category) => console.log('Category filter:', category)}
              onFAQVote={handleFAQVote}
              theme={theme}
            />
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-700/50 bg-black/10 backdrop-blur-sm mt-16">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Contact Options */}
              <div className="space-y-4">
                <h4 className={`font-semibold ${theme.text}`}>Get Help</h4>
                <div className="space-y-2">
                  {config.contactOptions.map((option) => (
                    <Button
                      key={option.id}
                      variant="ghost"
                      size="sm"
                      className={`${theme.text} hover:bg-gray-700 justify-start w-full`}
                      disabled={!option.available}
                    >
                      <MessageCircle size={14} className="mr-2" />
                      {option.title}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <h4 className={`font-semibold ${theme.text}`}>Quick Actions</h4>
                <div className="space-y-2">
                  {config.quickActions.map((action) => (
                    <Button
                      key={action.id}
                      variant="ghost"
                      size="sm"
                      className={`${theme.text} hover:bg-gray-700 justify-start w-full`}
                    >
                      <Lightbulb size={14} className="mr-2" />
                      {action.title}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Popular Categories */}
              <div className="space-y-4">
                <h4 className={`font-semibold ${theme.text}`}>Popular Topics</h4>
                <div className="space-y-2">
                  {categories.filter(cat => cat.isPopular).slice(0, 4).map((category) => (
                    <Button
                      key={category.id}
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCategorySelect(category.id)}
                      className={`${theme.text} hover:bg-gray-700 justify-start w-full`}
                    >
                      <Grid3X3 size={14} className="mr-2" />
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-4">
                <h4 className={`font-semibold ${theme.text}`}>Knowledge Base</h4>
                <div className="space-y-2 text-sm">
                  <div className={`${theme.text} opacity-80`}>
                    {articles.length} comprehensive articles
                  </div>
                  <div className={`${theme.text} opacity-80`}>
                    {faqs.length} frequently asked questions
                  </div>
                  <div className={`${theme.text} opacity-80`}>
                    {tutorials.length} interactive tutorials
                  </div>
                  <div className={`${theme.text} opacity-80`}>
                    {categories.length} organized categories
                  </div>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-700/50 mt-8 pt-8 text-center">
              <p className={`${theme.text} opacity-60 text-sm`}>
                © 2024 Chess Training Platform. Empowering chess players worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Home View Component
interface HomeViewProps {
  theme: any
  config: any
  featuredContent: any[]
  popularContent: any[]
  categories: any[]
  onSearch: (query: string) => void
  onCategorySelect: (categoryId: HelpCategory) => void
  onArticleSelect: (articleId: string) => void
  onTutorialStart: (tutorialId: string) => void
}

const HomeView: React.FC<HomeViewProps> = ({
  theme,
  config,
  featuredContent,
  // popularContent,
  categories,
  onSearch,
  onCategorySelect,
  onArticleSelect,
  onTutorialStart
}) => {
  const [searchInput, setSearchInput] = useState('')

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      onSearch(searchInput)
    }
  }

  return (
    <div className="space-y-12">
      {/* Hero Search */}
      <div className="text-center space-y-8">
        <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto">
          <div className="relative">
            <Search 
              size={24} 
              className={`absolute left-6 top-1/2 -translate-y-1/2 ${theme.text} opacity-60`} 
            />
            <input
              type="text"
              placeholder="What do you need help with today?"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className={`w-full pl-16 pr-6 py-6 text-lg bg-gray-800/50 border-gray-600 ${theme.text} 
                placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 
                rounded-2xl transition-all duration-300 shadow-xl`}
            />
          </div>
        </form>

        {/* Search Suggestions */}
        <div className="flex flex-wrap justify-center gap-2">
          {config.searchSuggestions.slice(0, 6).map((suggestion: string) => (
            <Button
              key={suggestion}
              variant="outline"
              size="sm"
              onClick={() => onSearch(suggestion)}
              className="border-gray-600 hover:border-gray-500 text-gray-300"
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>

      {/* Announcement Banner */}
      {config.announcement?.isActive && (
        <Card className="bg-blue-500/20 border-blue-500/30 p-6 text-center">
          <div className="space-y-2">
            <h3 className={`font-semibold ${theme.text} text-blue-400`}>
              {config.announcement.title}
            </h3>
            <p className={`${theme.text} opacity-80`}>
              {config.announcement.message}
            </p>
          </div>
        </Card>
      )}

      {/* Featured Content */}
      {featuredContent.length > 0 && (
        <div className="space-y-6">
          <div className={`flex items-center space-x-3`}>
            <Star size={24} className="text-yellow-400 fill-current" />
            <h2 className={`text-2xl font-bold ${theme.text}`}>Featured Content</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredContent.slice(0, 6).map((content) => (
              <ContentCard
                key={content.id}
                content={content}
                theme={theme}
                onSelect={content.contentType === 'tutorial' ? onTutorialStart : onArticleSelect}
              />
            ))}
          </div>
        </div>
      )}

      {/* Popular Categories */}
      <div className="space-y-6">
        <div className={`flex items-center space-x-3`}>
          <TrendingUp size={24} className="text-orange-400" />
          <h2 className={`text-2xl font-bold ${theme.text}`}>Popular Categories</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.filter(cat => cat.isPopular).map((category) => (
            <Card
              key={category.id}
              className="bg-gray-800/50 border-gray-600 hover:border-gray-500 cursor-pointer transition-all duration-300 hover:shadow-lg"
              onClick={() => onCategorySelect(category.id)}
            >
              <div className="p-6 text-center space-y-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} mx-auto flex items-center justify-center`}>
                  <span className="text-2xl">
                    {category.id === 'getting-started' && '🚀'}
                    {category.id === 'gameplay' && '♟️'}
                    {category.id === 'puzzles' && '🧩'}
                    {category.id === 'training' && '<GraduationCap className="w-4 h-4 inline" />'}
                    {category.id === 'troubleshooting' && '<AlertTriangle className="w-4 h-4 inline" />'}
                  </span>
                </div>
                <div>
                  <h3 className={`font-semibold ${theme.text}`}>{category.name}</h3>
                  <p className={`text-sm ${theme.text} opacity-70 mt-1`}>
                    {category.articleCount} articles
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

// Content Card Component
interface ContentCardProps {
  content: any
  theme: any
  onSelect: (id: string) => void
}

const ContentCard: React.FC<ContentCardProps> = ({ content, theme, onSelect }) => {
  const getContentIcon = (type: string) => {
    switch (type) {
      case 'article': return '📄'
      case 'video': return '🎥'
      case 'tutorial': return '<GraduationCap className="w-4 h-4 inline" />'
      case 'faq': return '❓'
      default: return '📋'
    }
  }

  return (
    <Card
      className="bg-gray-800/50 border-gray-600 hover:border-gray-500 cursor-pointer transition-all duration-300 hover:shadow-xl"
      onClick={() => onSelect(content.id)}
    >
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            {getContentIcon(content.contentType || 'article')} {content.contentType || 'Article'}
          </Badge>
          {content.isFeatured && (
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
              <Star size={12} className="mr-1 fill-current" />
              Featured
            </Badge>
          )}
        </div>
        
        <h3 className={`font-semibold ${theme.text} line-clamp-2`}>
          {content.title}
        </h3>
        
        <p className={`text-sm ${theme.text} opacity-70 line-clamp-3`}>
          {content.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{content.readingTime || content.estimatedTime || 5} min</span>
          <span>{content.metadata?.views?.toLocaleString() || '1.2k'} views</span>
        </div>
      </div>
    </Card>
  )
}

// Default export for routing
export default HelpCenterPage