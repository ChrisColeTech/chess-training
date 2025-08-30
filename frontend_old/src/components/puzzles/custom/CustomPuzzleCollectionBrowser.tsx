import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Download, Star, Eye, Users, Lock, BarChart3, Calendar } from 'lucide-react'
import type { CustomPuzzleCollectionBrowserProps } from '@/types/customPuzzles'
// Default collection browser tabs'

/**
 * Custom puzzle collection browser component
 * Handles collection browsing, searching, and selection
 * Follows SRP - only handles collection browser UI and interactions
 */
export const CustomPuzzleCollectionBrowser: React.FC<CustomPuzzleCollectionBrowserProps> = ({
  collections,
  userCollections,
  onSelectCollection,
  onCreateCollection,
  onImportCollection,
  theme,
  isLoading
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTab, setSelectedTab] = useState<'all' | 'my' | 'featured' | 'popular'>('all')

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case 'public': return <Users className="w-4 h-4" />
      case 'shared': return <Eye className="w-4 h-4" />
      case 'private': return <Lock className="w-4 h-4" />
      default: return <Users className="w-4 h-4" />
    }
  }

  const getVisibilityColor = (visibility: string) => {
    switch (visibility) {
      case 'public': return 'text-green-400'
      case 'shared': return 'text-blue-400'
      case 'private': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  const filterCollections = () => {
    let filtered = collections

    // Tab filtering
    switch (selectedTab) {
      case 'my':
        filtered = userCollections
        break
      case 'featured':
        filtered = collections.filter(c => c.isFeatured)
        break
      case 'popular':
        filtered = [...collections].sort((a, b) => b.accessCount - a.accessCount).slice(0, 10)
        break
      default:
        filtered = collections
    }

    // Search filtering
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(collection =>
        collection.name.toLowerCase().includes(query) ||
        collection.description.toLowerCase().includes(query) ||
        collection.author.name.toLowerCase().includes(query) ||
        collection.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    return filtered
  }

  const filteredCollections = filterCollections()

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold text-white">
            Puzzle Collections
          </CardTitle>
          <div className="flex space-x-2">
            <Button
              onClick={onImportCollection}
              size="sm"
              variant="outline"
              className="bg-black/30 border-purple-500/30 text-purple-300 hover:bg-purple-500/10 hover:border-purple-500/50 hover-grow active:animate-button-press transition-all duration-300 gpu-accelerated"
            >
              <Download className="w-4 h-4 mr-1" />
              Import
            </Button>
            <Button
              onClick={onCreateCollection}
              size="sm"
              className={`bg-gradient-to-r ${theme.primary} hover:opacity-90 text-white font-semibold hover-glow active:animate-button-press transition-all duration-300 gpu-accelerated`}
            >
              <Plus className="w-4 h-4 mr-1" />
              Create
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search collections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-black/30 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all duration-300"
          />
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-black/20 p-1 rounded-lg">
          {[
            { key: 'all', label: 'All', icon: Users },
            { key: 'my', label: 'My Collections', icon: Eye },
            { key: 'featured', label: 'Featured', icon: Star },
            { key: 'popular', label: 'Popular', icon: BarChart3 }
          ].map(tab => {
            const Icon = tab.icon
            return (
              <Button
                key={tab.key}
                size="sm"
                variant={selectedTab === tab.key ? "default" : "ghost"}
                onClick={() => setSelectedTab(tab.key as any)}
                className={`flex-1 ${
                  selectedTab === tab.key
                    ? `bg-gradient-to-r ${theme.primary} text-white`
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                } transition-all duration-200`}
              >
                <Icon className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">{tab.label}</span>
              </Button>
            )
          })}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {filteredCollections.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">No collections found</div>
            <Button
              onClick={onCreateCollection}
              variant="outline"
              size="sm"
              className="bg-black/30 border-white/20 text-white hover:bg-white/10 hover:border-white/30"
            >
              <Plus className="w-4 h-4 mr-1" />
              Create your first collection
            </Button>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredCollections.map((collection) => (
              <Card
                key={collection.id}
                className="cursor-pointer bg-black/10 border-white/10 hover:border-white/20 hover:bg-black/20 transition-all duration-300 hover-grow"
                onClick={() => onSelectCollection(collection)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-white text-sm">
                      {collection.name}
                    </h3>
                    <div className="flex items-center space-x-1 ml-2">
                      {collection.isFeatured && (
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      )}
                      <div className={getVisibilityColor(collection.visibility)}>
                        {getVisibilityIcon(collection.visibility)}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-xs mb-3 line-clamp-2">
                    {collection.description}
                  </p>
                  
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-xs text-gray-400 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {collection.createdAt.toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-400">
                      by {collection.author.name}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-3 text-xs text-gray-400">
                      <span>{collection.puzzleIds.length} puzzles</span>
                      <span>★ {collection.averageRating}</span>
                      <span>{collection.accessCount} plays</span>
                    </div>
                  </div>
                  
                  {collection.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {collection.tags.slice(0, 3).map((tag, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="text-xs border-white/20 text-gray-300"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {collection.tags.length > 3 && (
                        <Badge 
                          variant="outline" 
                          className="text-xs border-white/20 text-gray-400"
                        >
                          +{collection.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        <div className="text-center text-xs text-gray-500 pt-2">
          Showing {filteredCollections.length} of {collections.length} collections
        </div>
      </CardContent>
    </Card>
  )
}

export default CustomPuzzleCollectionBrowser