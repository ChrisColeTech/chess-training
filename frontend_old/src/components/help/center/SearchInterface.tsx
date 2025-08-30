import React, { useState, useRef } from 'react'
import { Clock, Filter, Search, ArrowUpDown, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { SearchInterfaceProps, SearchResult } from '@/types/helpCenter'

export const SearchInterface: React.FC<SearchInterfaceProps> = ({
  query,
  results,
  filters,
  isLoading,
  suggestions,
  onQueryChange,
  onFiltersChange,
  onSuggestionSelect,
  theme
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Handle input focus/blur for suggestions
  const handleInputFocus = () => {
    setShowSuggestions(true)
  }

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => setShowSuggestions(false), 150)
  }

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      setShowSuggestions(false)
    }
  }

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion: string) => {
    onSuggestionSelect(suggestion)
    setShowSuggestions(false)
    searchInputRef.current?.blur()
  }

  // Clear search
  const handleClearSearch = () => {
    onQueryChange('')
    searchInputRef.current?.focus()
  }

  // Toggle filters
  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  // Highlight search terms in text
  const highlightSearchTerm = (text: string, searchTerm: string) => {
    if (!searchTerm.trim()) return text
    
    const regex = new RegExp(`(${searchTerm})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-gray-900 px-1 rounded">
          {part}
        </mark>
      ) : part
    )
  }

  return (
    <div className="space-y-4">
      {/* Main Search Bar */}
      <div className="relative">
        <form onSubmit={handleSearchSubmit} className="relative">
          <div className="relative">
            <Search 
              size={20} 
              className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.text} opacity-60`} 
            />
            <Input
              ref={searchInputRef}
              type="text"
              placeholder="Search help articles, FAQs, and tutorials..."
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              className={`pl-12 pr-24 py-4 text-lg bg-gray-800/50 border-gray-600 ${theme.text} 
                placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 
                transition-all duration-300 rounded-xl`}
            />
            
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
              {query && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleClearSearch}
                  className={`p-2 hover:bg-gray-700 ${theme.text} opacity-60 hover:opacity-100`}
                >
                  <X size={16} />
                </Button>
              )}
              
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={toggleFilters}
                className={`p-2 hover:bg-gray-700 ${theme.text} ${showFilters ? 'opacity-100' : 'opacity-60'}`}
              >
                <Filter size={16} />
              </Button>
            </div>
          </div>
        </form>

        {/* Search Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <Card className="absolute top-full left-0 right-0 z-50 mt-2 bg-gray-800 border-gray-600 shadow-2xl">
            <div className="p-2">
              <div className={`text-xs font-medium ${theme.text} opacity-60 px-3 py-2 mb-2`}>
                Suggested Searches
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-700 
                    transition-colors duration-200 ${theme.text} text-sm flex items-center space-x-3`}
                >
                  <Clock size={14} className="opacity-60" />
                  <span>{suggestion}</span>
                </button>
              ))}
            </div>
          </Card>
        )}
      </div>

      {/* Search Filters */}
      {showFilters && (
        <Card className="bg-gray-800/50 border-gray-600 p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Content Type Filter */}
            <div>
              <label className={`block text-sm font-medium ${theme.text} mb-2`}>
                Content Type
              </label>
              <select
                value={filters.contentType}
                onChange={(e) => onFiltersChange({ contentType: e.target.value as any })}
                className="w-full bg-gray-700 border-gray-600 text-white rounded-lg px-3 py-2 text-sm"
              >
                <option value="all">All Content</option>
                <option value="article">Articles</option>
                <option value="video">Videos</option>
                <option value="faq">FAQs</option>
                <option value="tutorial">Tutorials</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className={`block text-sm font-medium ${theme.text} mb-2`}>
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => onFiltersChange({ category: e.target.value as any })}
                className="w-full bg-gray-700 border-gray-600 text-white rounded-lg px-3 py-2 text-sm"
              >
                <option value="all">All Categories</option>
                <option value="getting-started">Getting Started</option>
                <option value="gameplay">Gameplay</option>
                <option value="puzzles">Puzzles</option>
                <option value="training">Training</option>
                <option value="account">Account</option>
                <option value="technical">Technical</option>
                <option value="troubleshooting">Troubleshooting</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className={`block text-sm font-medium ${theme.text} mb-2`}>
                Difficulty
              </label>
              <select
                value={filters.difficulty}
                onChange={(e) => onFiltersChange({ difficulty: e.target.value as any })}
                className="w-full bg-gray-700 border-gray-600 text-white rounded-lg px-3 py-2 text-sm"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>

            {/* Sort Options */}
            <div>
              <label className={`block text-sm font-medium ${theme.text} mb-2`}>
                Sort By
              </label>
              <div className="flex space-x-2">
                <select
                  value={filters.sortBy}
                  onChange={(e) => onFiltersChange({ sortBy: e.target.value as any })}
                  className="flex-1 bg-gray-700 border-gray-600 text-white rounded-lg px-3 py-2 text-sm"
                >
                  <option value="relevance">Relevance</option>
                  <option value="date">Date</option>
                  <option value="popularity">Popularity</option>
                  <option value="title">Title</option>
                </select>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onFiltersChange({ 
                    sortOrder: filters.sortOrder === 'desc' ? 'asc' : 'desc' 
                  })}
                  className="px-3 bg-gray-700 border-gray-600 hover:bg-gray-600"
                >
                  <ArrowUpDown 
                    size={14} 
                    className={filters.sortOrder === 'desc' ? 'rotate-180' : ''} 
                  />
                </Button>
              </div>
            </div>
          </div>

          {/* Featured Only Toggle */}
          <div className="mt-4 flex items-center space-x-3">
            <input
              type="checkbox"
              id="featuredOnly"
              checked={filters.featuredOnly}
              onChange={(e) => onFiltersChange({ featuredOnly: e.target.checked })}
              className="rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500/50"
            />
            <label htmlFor="featuredOnly" className={`text-sm ${theme.text}`}>
              Show only featured content
            </label>
          </div>
        </Card>
      )}

      {/* Search Results */}
      {query && (
        <div className="space-y-4">
          {/* Results Header */}
          <div className={`flex items-center justify-between ${theme.text}`}>
            <h3 className="text-lg font-semibold">
              {isLoading ? (
                'Searching...'
              ) : (
                `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`
              )}
            </h3>
            {results.length > 0 && (
              <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                {Math.round(results.reduce((acc, r) => acc + r.relevance, 0) / results.length * 100)}% relevance
              </Badge>
            )}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="space-y-4 text-center">
                <div className={`w-8 h-8 border-2 ${theme.accent} border-t-transparent rounded-full animate-spin mx-auto`}></div>
                <p className={`${theme.text} opacity-60`}>Searching knowledge base...</p>
              </div>
            </div>
          )}

          {/* No Results */}
          {!isLoading && results.length === 0 && query && (
            <Card className="bg-gray-800/50 border-gray-600 p-8 text-center">
              <div className="space-y-4">
                <Search size={48} className={`${theme.text} opacity-40 mx-auto`} />
                <div>
                  <h4 className={`text-lg font-medium ${theme.text} mb-2`}>
                    No results found
                  </h4>
                  <p className={`${theme.text} opacity-60 mb-4`}>
                    We couldn't find any content matching "{query}". Try:
                  </p>
                  <ul className={`${theme.text} opacity-80 text-sm space-y-1`}>
                    <li>• Checking your spelling</li>
                    <li>• Using fewer or different keywords</li>
                    <li>• Browsing categories instead</li>
                    <li>• Checking our frequently asked questions</li>
                  </ul>
                </div>
              </div>
            </Card>
          )}

          {/* Results List */}
          {!isLoading && results.length > 0 && (
            <div className="space-y-3">
              {results.map((result) => (
                <SearchResultItem
                  key={result.id}
                  result={result}
                  searchQuery={query}
                  theme={theme}
                  highlightSearchTerm={highlightSearchTerm}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Search Result Item Component
interface SearchResultItemProps {
  result: SearchResult
  searchQuery: string
  theme: any
  highlightSearchTerm: (text: string, searchTerm: string) => React.ReactNode
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({
  result,
  searchQuery,
  theme,
  highlightSearchTerm
}) => {
  // Content type icons and colors
  const getContentTypeInfo = (type: string) => {
    switch (type) {
      case 'article':
        return { icon: '📄', color: 'bg-blue-500/20 text-blue-400', label: 'Article' }
      case 'video':
        return { icon: '🎥', color: 'bg-purple-500/20 text-purple-400', label: 'Video' }
      case 'faq':
        return { icon: '❓', color: 'bg-green-500/20 text-green-400', label: 'FAQ' }
      case 'tutorial':
        return { icon: '<GraduationCap className="w-4 h-4 inline" />', color: 'bg-orange-500/20 text-orange-400', label: 'Tutorial' }
      default:
        return { icon: '📋', color: 'bg-gray-500/20 text-gray-400', label: 'Content' }
    }
  }

  const contentInfo = getContentTypeInfo(result.type)

  return (
    <Card className="bg-gray-800/50 border-gray-600 hover:border-gray-500 transition-all duration-300 hover:shadow-lg cursor-pointer">
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Badge className={`${contentInfo.color} border-0`}>
              <span className="mr-1">{contentInfo.icon}</span>
              {contentInfo.label}
            </Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-400 capitalize">
              {result.category.replace('-', ' ')}
            </Badge>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            {result.metadata.readingTime && (
              <span>{result.metadata.readingTime} min read</span>
            )}
            {result.metadata.videoDuration && (
              <span>{Math.round(result.metadata.videoDuration / 60)} min video</span>
            )}
          </div>
        </div>

        <h4 className={`text-lg font-semibold ${theme.text} mb-2`}>
          {highlightSearchTerm(result.title, searchQuery)}
        </h4>

        <p className={`${theme.text} opacity-80 text-sm mb-3 line-clamp-2`}>
          {highlightSearchTerm(result.description, searchQuery)}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {result.metadata.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-gray-700 text-gray-300 text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <span>Relevance:</span>
            <div className="w-16 bg-gray-700 rounded-full h-1.5">
              <div 
                className={`h-full rounded-full bg-gradient-to-r ${theme.accent}`}
                style={{ width: `${result.relevance * 100}%` }}
              />
            </div>
            <span>{Math.round(result.relevance * 100)}%</span>
          </div>
        </div>
      </div>
    </Card>
  )
}