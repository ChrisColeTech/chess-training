import React, { useState } from 'react'
import { HelpCircle, ChevronDown, ChevronUp, ThumbsUp, ThumbsDown, Star, Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import type { FAQSectionProps, FAQItem, HelpCategory } from '@/types/helpCenter'

export const FAQSection: React.FC<FAQSectionProps> = ({
  faqs,
  searchQuery = '',
  categoryFilter,
  onCategoryFilterChange,
  onFAQVote,
  theme
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery)
  const [showFilters, setShowFilters] = useState(false)

  // Filter and search FAQs
  const filteredFAQs = faqs.filter(faq => {
    // Category filter
    if (categoryFilter !== 'all' && faq.category !== categoryFilter) {
      return false
    }

    // Search filter
    if (localSearchQuery.trim()) {
      const query = localSearchQuery.toLowerCase()
      return (
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    return true
  })

  // Sort FAQs by popularity and featured status
  const sortedFAQs = [...filteredFAQs].sort((a, b) => {
    // Featured items first
    if (a.isFeatured && !b.isFeatured) return -1
    if (!a.isFeatured && b.isFeatured) return 1
    
    // Then by popularity
    return b.popularity - a.popularity
  })

  // Toggle expanded state
  const toggleExpanded = (faqId: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(faqId)) {
      newExpanded.delete(faqId)
    } else {
      newExpanded.add(faqId)
    }
    setExpandedItems(newExpanded)
  }

  // Highlight search terms
  const highlightText = (text: string, searchTerm: string) => {
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

  // Get category stats
  const getCategoryStats = () => {
    const stats: Record<string, number> = { all: faqs.length }
    faqs.forEach(faq => {
      stats[faq.category] = (stats[faq.category] || 0) + 1
    })
    return stats
  }

  const categoryStats = getCategoryStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className={`text-2xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
          Frequently Asked Questions
        </h2>
        <p className={`${theme.text} opacity-80`}>
          Quick answers to the most common questions
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search 
            size={20} 
            className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.text} opacity-60`} 
          />
          <Input
            type="text"
            placeholder="Search FAQs..."
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
            className={`pl-12 pr-12 bg-gray-800/50 border-gray-600 ${theme.text} 
              placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50`}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-700 ${theme.text}`}
          >
            <Filter size={16} />
          </Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <Card className="bg-gray-800/50 border-gray-600 p-4">
            <div className="space-y-4">
              <h4 className={`font-medium ${theme.text}`}>Filter by Category</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(categoryStats).map(([category, count]) => (
                  <Button
                    key={category}
                    variant={categoryFilter === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => onCategoryFilterChange(category as HelpCategory | 'all')}
                    className={
                      categoryFilter === category 
                        ? `bg-gradient-to-r ${theme.primary} text-white`
                        : 'border-gray-600 hover:border-gray-500'
                    }
                  >
                    {category === 'all' ? 'All Categories' : category.replace('-', ' ')}
                    <Badge 
                      variant="secondary" 
                      className="ml-2 bg-gray-600 text-gray-300 text-xs"
                    >
                      {count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {/* Results Summary */}
        <div className={`flex items-center justify-between ${theme.text} opacity-80`}>
          <p className="text-sm">
            Showing {sortedFAQs.length} of {faqs.length} FAQs
          </p>
          {localSearchQuery && (
            <p className="text-sm">
              Search results for "{localSearchQuery}"
            </p>
          )}
        </div>

        {/* No Results */}
        {sortedFAQs.length === 0 && (
          <Card className="bg-gray-800/50 border-gray-600 p-8 text-center">
            <div className="space-y-4">
              <HelpCircle size={48} className={`${theme.text} opacity-40 mx-auto`} />
              <div>
                <h4 className={`text-lg font-medium ${theme.text} mb-2`}>
                  No FAQs found
                </h4>
                <p className={`${theme.text} opacity-60`}>
                  {localSearchQuery 
                    ? `No FAQs match your search for "${localSearchQuery}"`
                    : `No FAQs available for the selected category`
                  }
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* FAQ Items */}
        {sortedFAQs.map((faq) => (
          <FAQItem
            key={faq.id}
            faq={faq}
            isExpanded={expandedItems.has(faq.id)}
            onToggle={() => toggleExpanded(faq.id)}
            onVote={onFAQVote}
            searchQuery={localSearchQuery}
            highlightText={highlightText}
            theme={theme}
          />
        ))}
      </div>

      {/* Featured FAQs Summary */}
      {sortedFAQs.some(faq => faq.isFeatured) && (
        <Card className="bg-gray-800/30 border-gray-600 p-6">
          <div className="text-center space-y-4">
            <div className={`flex items-center justify-center space-x-2 ${theme.text}`}>
              <Star size={20} className="text-yellow-400 fill-current" />
              <h3 className="text-lg font-semibold">Popular Questions</h3>
            </div>
            <p className={`${theme.text} opacity-80 text-sm`}>
              These are the most frequently asked questions by our community
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {sortedFAQs
                .filter(faq => faq.isFeatured)
                .slice(0, 3)
                .map(faq => (
                  <div key={faq.id} className="text-center space-y-2">
                    <h4 className={`font-medium ${theme.text} text-sm`}>
                      {faq.question}
                    </h4>
                    <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
                      <span>{faq.metadata.views.toLocaleString()} views</span>
                      <span>{Math.round((faq.metadata.helpfulVotes / faq.metadata.totalVotes) * 100)}% helpful</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

// Individual FAQ Item Component
interface FAQItemProps {
  faq: FAQItem
  isExpanded: boolean
  onToggle: () => void
  onVote: (faqId: string, helpful: boolean) => void
  searchQuery: string
  highlightText: (text: string, searchTerm: string) => React.ReactNode
  theme: any
}

const FAQItem: React.FC<FAQItemProps> = ({
  faq,
  isExpanded,
  onToggle,
  onVote,
  searchQuery,
  highlightText,
  theme
}) => {
  const [hasVoted, setHasVoted] = useState(false)
  const [userVote, setUserVote] = useState<boolean | null>(null)

  const handleVote = (helpful: boolean) => {
    if (hasVoted) return
    
    onVote(faq.id, helpful)
    setHasVoted(true)
    setUserVote(helpful)
  }

  // Format the answer content
  const formatAnswer = (answer: string) => {
    return answer.split('\n\n').map((paragraph, index) => {
      if (paragraph.includes('1. **') || paragraph.includes('- **')) {
        // Handle lists
        const items = paragraph.split('\n').filter(item => item.trim())
        if (paragraph.includes('1. **')) {
          // Numbered list
          return (
            <ol key={index} className="list-decimal list-inside space-y-2 mb-4">
              {items.map((item, itemIndex) => (
                <li key={itemIndex} className="pl-2">
                  <span dangerouslySetInnerHTML={{ 
                    __html: item.replace(/^\d+\.\s*\*\*(.*?)\*\*:\s*/, '<strong>$1:</strong> ')
                  }} />
                </li>
              ))}
            </ol>
          )
        } else {
          // Bullet list
          return (
            <ul key={index} className="space-y-2 mb-4">
              {items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start space-x-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span dangerouslySetInnerHTML={{ 
                    __html: item.replace(/^\s*-\s*\*\*(.*?)\*\*:\s*/, '<strong>$1:</strong> ')
                  }} />
                </li>
              ))}
            </ul>
          )
        }
      }
      
      // Regular paragraph
      return (
        <p key={index} className="mb-4 leading-relaxed">
          {highlightText(paragraph.replace(/\*\*(.*?)\*\*/g, '$1'), searchQuery)}
        </p>
      )
    })
  }

  return (
    <Card className="bg-gray-800/50 border-gray-600 transition-all duration-300 hover:border-gray-500">
      <div className="p-6">
        {/* FAQ Header */}
        <div 
          className="flex items-start justify-between cursor-pointer"
          onClick={onToggle}
        >
          <div className="flex-1 space-y-2">
            <div className="flex items-center space-x-3">
              {faq.isFeatured && (
                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                  <Star size={12} className="mr-1 fill-current" />
                  Popular
                </Badge>
              )}
              <Badge variant="outline" className="border-gray-600 text-gray-400 capitalize text-xs">
                {faq.category.replace('-', ' ')}
              </Badge>
            </div>
            
            <h3 className={`text-lg font-semibold ${theme.text} pr-4`}>
              {highlightText(faq.question, searchQuery)}
            </h3>
            
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>{faq.metadata.views.toLocaleString()} views</span>
              <span>
                {Math.round((faq.metadata.helpfulVotes / faq.metadata.totalVotes) * 100)}% helpful
              </span>
              <span>
                {faq.metadata.helpfulVotes}/{faq.metadata.totalVotes} votes
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className={`${theme.text} opacity-60 hover:opacity-100`}
            >
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </Button>
          </div>
        </div>

        {/* FAQ Answer */}
        {isExpanded && (
          <div className="mt-6 space-y-4">
            <div className={`${theme.text} opacity-90 border-t border-gray-700 pt-6`}>
              {formatAnswer(faq.answer)}
            </div>

            {/* Tags */}
            {faq.tags.length > 0 && (
              <div className="space-y-2">
                <p className={`text-sm font-medium ${theme.text} opacity-80`}>Related Topics:</p>
                <div className="flex flex-wrap gap-2">
                  {faq.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-gray-700 text-gray-300 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Voting */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-700">
              <p className={`text-sm ${theme.text} opacity-80`}>
                Was this answer helpful?
              </p>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleVote(true)}
                  disabled={hasVoted}
                  className={`${
                    userVote === true
                      ? 'bg-green-500/20 border-green-500 text-green-400'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <ThumbsUp size={14} className="mr-1" />
                  Yes
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleVote(false)}
                  disabled={hasVoted}
                  className={`${
                    userVote === false
                      ? 'bg-red-500/20 border-red-500 text-red-400'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <ThumbsDown size={14} className="mr-1" />
                  No
                </Button>
              </div>
            </div>

            {hasVoted && (
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
                <p className="text-blue-400 text-sm">
                  Thank you for your feedback! This helps us improve our help content.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}