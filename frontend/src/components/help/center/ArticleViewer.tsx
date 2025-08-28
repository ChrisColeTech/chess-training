import React, { useState } from 'react'
import { ArrowLeft, BookOpen, Bookmark, Clock, Eye, Play, Share, Star, ThumbsDown, ThumbsUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { ArticleViewerProps, FeedbackType } from '@/types/helpCenter'

export const ArticleViewer: React.FC<ArticleViewerProps> = ({
  article,
  isLoading,
  userProgress,
  relatedArticles,
  onArticleNavigate,
  onFeedbackSubmit,
  onBookmarkToggle,
  theme
}) => {
  const [showFeedbackThanks, setShowFeedbackThanks] = useState(false)

  if (isLoading) {
    return <LoadingSkeleton theme={theme} />
  }

  if (!article) {
    return (
      <Card className="bg-gray-800/50 border-gray-600 p-8 text-center">
        <div className="space-y-4">
          <BookOpen size={48} className={`${theme.text} opacity-40 mx-auto`} />
          <div>
            <h3 className={`text-lg font-medium ${theme.text} mb-2`}>
              Article not found
            </h3>
            <p className={`${theme.text} opacity-60`}>
              The article you're looking for could not be found or may have been moved.
            </p>
          </div>
        </div>
      </Card>
    )
  }

  const isBookmarked = userProgress.bookmarks.includes(article.id)
  const userFeedback = userProgress.feedbackGiven[article.id]

  // Handle feedback submission
  const handleFeedback = (feedback: FeedbackType) => {
    onFeedbackSubmit(article.id, feedback)
    setShowFeedbackThanks(true)
    setTimeout(() => setShowFeedbackThanks(false), 3000)
  }

  // Format content (in a real app, you'd use a markdown parser)
  const formatContent = (content: string) => {
    // Simple markdown-like formatting for demo
    return content
      .split('\n\n')
      .map((paragraph, index) => {
        if (paragraph.startsWith('# ')) {
          return (
            <h1 key={index} className={`text-3xl font-bold ${theme.text} mb-6 mt-8 first:mt-0`}>
              {paragraph.replace('# ', '')}
            </h1>
          )
        }
        if (paragraph.startsWith('## ')) {
          return (
            <h2 key={index} className={`text-2xl font-semibold ${theme.text} mb-4 mt-8`}>
              {paragraph.replace('## ', '')}
            </h2>
          )
        }
        if (paragraph.startsWith('### ')) {
          return (
            <h3 key={index} className={`text-xl font-medium ${theme.text} mb-3 mt-6`}>
              {paragraph.replace('### ', '')}
            </h3>
          )
        }
        if (paragraph.startsWith('- **') || paragraph.startsWith('### ')) {
          // Handle bullet points with bold
          const items = paragraph.split('\n').filter(item => item.trim())
          return (
            <ul key={index} className={`${theme.text} opacity-90 mb-4 space-y-2`}>
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
        if (paragraph.includes('1. **') || paragraph.includes('2. **')) {
          // Handle numbered lists with bold
          const items = paragraph.split('\n').filter(item => item.trim())
          return (
            <ol key={index} className={`${theme.text} opacity-90 mb-4 space-y-2 list-decimal list-inside`}>
              {items.map((item, itemIndex) => (
                <li key={itemIndex} dangerouslySetInnerHTML={{ 
                  __html: item.replace(/^\d+\.\s*\*\*(.*?)\*\*:\s*/, '<strong>$1:</strong> ')
                }} />
              ))}
            </ol>
          )
        }
        
        // Regular paragraph
        return (
          <p key={index} className={`${theme.text} opacity-90 mb-4 leading-relaxed`}>
            {paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
          </p>
        )
      })
  }

  return (
    <div className="space-y-6">
      {/* Article Header */}
      <div className="space-y-4">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => window.history.back()}
          className={`${theme.text} hover:bg-gray-700 -ml-2`}
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Help Center
        </Button>

        {/* Article Metadata */}
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Badge className={getContentTypeBadge(article.contentType).color}>
                {getContentTypeBadge(article.contentType).label}
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-400 capitalize">
                {article.category.replace('-', ' ')}
              </Badge>
              <Badge 
                className={getDifficultyColor(article.difficulty)} 
                variant="outline"
              >
                {article.difficulty}
              </Badge>
              {article.isFeatured && (
                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                  <Star size={12} className="mr-1 fill-current" />
                  Featured
                </Badge>
              )}
            </div>

            <h1 className={`text-3xl font-bold ${theme.text} leading-tight`}>
              {article.title}
            </h1>

            <p className={`text-lg ${theme.text} opacity-80 max-w-3xl`}>
              {article.description}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBookmarkToggle(article.id)}
              className={`${
                isBookmarked 
                  ? 'bg-blue-500/20 border-blue-500 text-blue-400' 
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <Bookmark size={16} />
            </Button>
            <Button variant="outline" size="sm" className="border-gray-600 hover:border-gray-500">
              <Share size={16} />
            </Button>
          </div>
        </div>

        {/* Article Stats */}
        <div className="flex items-center space-x-6 text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <Clock size={16} />
            <span>{article.readingTime} min read</span>
          </div>
          <div className="flex items-center space-x-2">
            <Eye size={16} />
            <span>{article.metadata.views.toLocaleString()} views</span>
          </div>
          <div className="flex items-center space-x-2">
            <ThumbsUp size={16} />
            <span>{article.metadata.helpfulVotes}/{article.metadata.totalVotes} helpful</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>By</span>
            <span className="font-medium">{article.author.name}</span>
            <Badge variant="secondary" className="bg-gray-700 text-gray-300 text-xs">
              {article.author.role}
            </Badge>
          </div>
        </div>

        {/* Video Preview (if available) */}
        {article.videoUrl && (
          <Card className="bg-gray-800/50 border-gray-600 overflow-hidden">
            <div className="relative">
              <div 
                className="w-full h-64 bg-gray-700 bg-cover bg-center flex items-center justify-center"
                style={{ 
                  backgroundImage: article.videoThumbnail ? `url(${article.videoThumbnail})` : 'none' 
                }}
              >
                <Button
                  size="lg"
                  className={`bg-black/50 hover:bg-black/70 text-white border-0 shadow-xl`}
                >
                  <Play size={24} className="mr-2" />
                  Play Video ({Math.round((article.videoDuration || 0) / 60)} min)
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Article Content */}
      <Card className="bg-gray-800/30 border-gray-600">
        <div className="p-8">
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="space-y-4">
              {formatContent(article.content)}
            </div>
          </div>
        </div>
      </Card>

      {/* Article Footer */}
      <Card className="bg-gray-800/50 border-gray-600 p-6">
        <div className="space-y-6">
          {/* Feedback Section */}
          <div className="text-center space-y-4">
            <h3 className={`text-lg font-semibold ${theme.text}`}>
              Was this article helpful?
            </h3>
            
            {showFeedbackThanks ? (
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                <p className="text-green-400">Thank you for your feedback!</p>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => handleFeedback('helpful')}
                  className={`${
                    userFeedback === 'helpful'
                      ? 'bg-green-500/20 border-green-500 text-green-400'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                  disabled={!!userFeedback}
                >
                  <ThumbsUp size={16} className="mr-2" />
                  Yes, helpful
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleFeedback('not_helpful')}
                  className={`${
                    userFeedback === 'not_helpful'
                      ? 'bg-red-500/20 border-red-500 text-red-400'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                  disabled={!!userFeedback}
                >
                  <ThumbsDown size={16} className="mr-2" />
                  No, not helpful
                </Button>
              </div>
            )}
          </div>

          {/* Article Tags */}
          {article.tags.length > 0 && (
            <div className="space-y-2">
              <p className={`text-sm font-medium ${theme.text} opacity-80`}>Tags:</p>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-gray-700 text-gray-300">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="space-y-4">
          <h3 className={`text-xl font-semibold ${theme.text}`}>
            Related Articles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedArticles.slice(0, 6).map((related) => (
              <Card
                key={related.id}
                className="bg-gray-800/50 border-gray-600 hover:border-gray-500 cursor-pointer transition-all duration-300"
                onClick={() => onArticleNavigate(related.id)}
              >
                <div className="p-4 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Badge className={getContentTypeBadge(related.contentType).color}>
                      {getContentTypeBadge(related.contentType).label}
                    </Badge>
                    <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
                      {related.difficulty}
                    </Badge>
                  </div>
                  <h4 className={`font-medium ${theme.text} line-clamp-2`}>
                    {related.title}
                  </h4>
                  <p className={`text-sm ${theme.text} opacity-70 line-clamp-2`}>
                    {related.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{related.readingTime} min read</span>
                    <span>{related.metadata.views.toLocaleString()} views</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Helper functions
const getContentTypeBadge = (type: string) => {
  switch (type) {
    case 'article':
      return { label: '📄 Article', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' }
    case 'video':
      return { label: '🎥 Video', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' }
    case 'tutorial':
      return { label: '<GraduationCap className="w-4 h-4 inline" /> Tutorial', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' }
    case 'faq':
      return { label: '❓ FAQ', color: 'bg-green-500/20 text-green-400 border-green-500/30' }
    default:
      return { label: '📋 Content', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' }
  }
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner':
      return 'border-green-500 text-green-400'
    case 'intermediate':
      return 'border-yellow-500 text-yellow-400'
    case 'advanced':
      return 'border-orange-500 text-orange-400'
    case 'expert':
      return 'border-red-500 text-red-400'
    default:
      return 'border-gray-500 text-gray-400'
  }
}

// Loading skeleton component
const LoadingSkeleton: React.FC<{ theme: any }> = () => (
  <div className="space-y-6 animate-pulse">
    <div className="space-y-4">
      <div className="w-24 h-6 bg-gray-700 rounded" />
      <div className="flex items-center space-x-3">
        <div className="w-16 h-6 bg-gray-700 rounded-full" />
        <div className="w-20 h-6 bg-gray-700 rounded-full" />
        <div className="w-18 h-6 bg-gray-700 rounded-full" />
      </div>
      <div className="w-3/4 h-8 bg-gray-700 rounded" />
      <div className="w-full h-16 bg-gray-700 rounded" />
    </div>
    
    <div className="bg-gray-800/50 border-gray-600 rounded-lg p-8">
      <div className="space-y-4">
        <div className="w-full h-4 bg-gray-700 rounded" />
        <div className="w-5/6 h-4 bg-gray-700 rounded" />
        <div className="w-4/6 h-4 bg-gray-700 rounded" />
        <div className="w-full h-4 bg-gray-700 rounded" />
        <div className="w-3/4 h-4 bg-gray-700 rounded" />
      </div>
    </div>
  </div>
)