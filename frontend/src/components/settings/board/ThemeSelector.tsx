import React, { useState, useMemo } from 'react'
import { Palette, Lock, Check, Star, Search, Gamepad2, Castle, Zap, Sparkles } from 'lucide-react'
import { FaCrown } from 'react-icons/fa'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ThemeSelectorProps, BoardTheme } from '@/types/boardSettings'

/**
 * ThemeSelector Component
 * Allows users to browse and select from available board themes
 */
export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  themes,
  selectedTheme,
  onThemeSelect,
  showPremium,
  categoryFilter,
  theme
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryFilter || 'all')

  // Filter themes based on search and category
  const filteredThemes = useMemo(() => {
    let filtered = themes

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(boardTheme =>
        boardTheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        boardTheme.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        boardTheme.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(boardTheme => boardTheme.category === selectedCategory)
    }

    // Filter by premium status if specified
    if (!showPremium) {
      filtered = filtered.filter(boardTheme => !boardTheme.isPremium)
    }

    return filtered
  }, [themes, searchQuery, selectedCategory, showPremium])

  // Group themes by category for display
  const themesByCategory = useMemo(() => {
    const grouped = filteredThemes.reduce((acc, boardTheme) => {
      if (!acc[boardTheme.category]) {
        acc[boardTheme.category] = []
      }
      acc[boardTheme.category].push(boardTheme)
      return acc
    }, {} as Record<string, BoardTheme[]>)

    return grouped
  }, [filteredThemes])

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'classic': return <FaCrown size={16} />
      case 'modern': return <Zap size={16} />
      case 'fantasy': return <Castle size={16} />
      case 'neon': return <Gamepad2 size={16} />
      case 'luxury': return <Sparkles size={16} />
      case 'minimal': return <Star size={16} />
      default: return <Palette size={16} />
    }
  }

  // Get category display name
  const getCategoryName = (category: string) => {
    switch (category) {
      case 'classic': return 'Classic'
      case 'modern': return 'Modern'
      case 'fantasy': return 'Fantasy'
      case 'neon': return 'Neon/Cyber'
      case 'luxury': return 'Luxury'
      case 'minimal': return 'Minimal'
      default: return category
    }
  }

  // Handle theme selection
  const handleThemeSelect = (boardTheme: BoardTheme) => {
    if (!boardTheme.isUnlocked) {
      return // Don't allow selection of locked themes
    }
    onThemeSelect(boardTheme)
  }

  // Get available categories
  const categories = ['all', ...new Set(themes.map(t => t.category))]

  return (
    <Card className={`${theme.glassMorphism} border-white/10`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${theme.accent} bg-opacity-20`}>
              <Palette size={20} className={theme.text} />
            </div>
            <div>
              <CardTitle className={`text-lg font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                Board Themes
              </CardTitle>
              <p className={`text-sm ${theme.text} opacity-60`}>
                Choose your perfect board style
              </p>
            </div>
          </div>
          
          <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
            {filteredThemes.length} Available
          </Badge>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <div className="relative flex-1">
            <Search 
              size={16} 
              
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme.text} opacity-50`} 
            />
            <Input
              placeholder="Search themes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-6 bg-gray-800/50">
            {categories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="text-xs data-[state=active]:bg-white/10 data-[state=active]:text-white"
              >
                <div className="flex items-center space-x-1">
                  {category !== 'all' && getCategoryIcon(category)}
                  <span>{category === 'all' ? 'All' : getCategoryName(category)}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="space-y-6">
            {selectedCategory === 'all' ? (
              // Show all categories
              Object.entries(themesByCategory).map(([category, categoryThemes]) => (
                <div key={category} className="space-y-4">
                  <div className="flex items-center space-x-2 pb-2 border-b border-white/10">
                    {getCategoryIcon(category)}
                    <h3 className={`font-semibold ${theme.text}`}>
                      {getCategoryName(category)}
                    </h3>
                    <Badge variant="outline" className="text-xs border-white/20 text-white/70">
                      {categoryThemes.length}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {categoryThemes.map((boardTheme) => (
                      <ThemeCard
                        key={boardTheme.id}
                        boardTheme={boardTheme}
                        isSelected={selectedTheme.id === boardTheme.id}
                        onSelect={handleThemeSelect}
                        theme={theme}
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              // Show selected category
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredThemes.map((boardTheme) => (
                  <ThemeCard
                    key={boardTheme.id}
                    boardTheme={boardTheme}
                    isSelected={selectedTheme.id === boardTheme.id}
                    onSelect={handleThemeSelect}
                    theme={theme}
                  />
                ))}
              </div>
            )}

            {filteredThemes.length === 0 && (
              <div className="text-center py-12">
                <Palette size={48} className={`${theme.text} opacity-30 mx-auto mb-4`} />
                <p className={`${theme.text} opacity-60`}>
                  No themes found matching your criteria
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                  }}
                  className="mt-4 border-white/20 text-white hover:bg-white/10"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

/**
 * Individual Theme Card Component
 */
interface ThemeCardProps {
  boardTheme: BoardTheme
  isSelected: boolean
  onSelect: (theme: BoardTheme) => void
  theme: any
}

const ThemeCard: React.FC<ThemeCardProps> = ({ 
  boardTheme, 
  isSelected, 
  onSelect,
  theme 
}) => {
  return (
    <div
      className={`
        relative p-4 rounded-lg border transition-all duration-200 cursor-pointer group
        ${isSelected 
          ? `border-white/30 bg-gradient-to-br ${theme.primary} bg-opacity-20 shadow-lg` 
          : 'border-white/10 bg-black/20 hover:border-white/20 hover:bg-black/30'
        }
        ${!boardTheme.isUnlocked ? 'opacity-60 cursor-not-allowed' : ''}
      `}
      onClick={() => onSelect(boardTheme)}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div className={`absolute top-2 right-2 p-1 rounded-full bg-gradient-to-br ${theme.accent}`}>
          <Check size={12} className="text-white" />
        </div>
      )}

      {/* Lock Indicator */}
      {!boardTheme.isUnlocked && (
        <div className="absolute top-2 left-2 p-1 rounded-full bg-black/50 backdrop-blur-sm">
          <Lock size={12} className="text-white/70" />
        </div>
      )}

      {/* Theme Preview */}
      <div className="mb-3">
        <div className="grid grid-cols-8 gap-0.5 aspect-square rounded-md overflow-hidden border border-white/10">
          {Array.from({ length: 64 }).map((_, index) => {
            const row = Math.floor(index / 8)
            const col = index % 8
            const isLight = (row + col) % 2 === 0
            return (
              <div
                key={index}
                className="aspect-square"
                style={{
                  backgroundColor: isLight ? boardTheme.lightSquare : boardTheme.darkSquare,
                }}
              />
            )
          })}
        </div>
      </div>

      {/* Theme Info */}
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <h4 className={`font-semibold ${theme.text} text-sm leading-tight`}>
            {boardTheme.name}
          </h4>
          {boardTheme.isPremium && (
            <Badge className="ml-1 text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-black">
              <FaCrown size={10} className="mr-1" />
              Pro
            </Badge>
          )}
        </div>
        
        <p className={`text-xs ${theme.text} opacity-60 line-clamp-2`}>
          {boardTheme.description}
        </p>

        <div className="flex items-center justify-between">
          <Badge 
            variant="outline" 
            className="text-xs border-white/20 text-white/70"
          >
            {getCategoryName(boardTheme.category)}
          </Badge>
          
          <div className="flex space-x-1">
            <div 
              className="w-3 h-3 rounded-full border border-white/20"
              style={{ backgroundColor: boardTheme.lightSquare }}
              title="Light squares"
            />
            <div 
              className="w-3 h-3 rounded-full border border-white/20"
              style={{ backgroundColor: boardTheme.darkSquare }}
              title="Dark squares"
            />
          </div>
        </div>

        {/* Author and Date */}
        <div className={`text-xs ${theme.text} opacity-40 pt-1 border-t border-white/5`}>
          by {boardTheme.author}
        </div>
      </div>

      {/* Hover Effect */}
      {boardTheme.isUnlocked && (
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      )}
    </div>
  )
}

// Helper function from the previous component
const getCategoryName = (category: string) => {
  switch (category) {
    case 'classic': return 'Classic'
    case 'modern': return 'Modern'
    case 'fantasy': return 'Fantasy'
    case 'neon': return 'Neon'
    case 'luxury': return 'Luxury'
    case 'minimal': return 'Minimal'
    default: return category
  }
}