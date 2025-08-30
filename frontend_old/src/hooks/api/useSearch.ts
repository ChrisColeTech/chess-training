import { useState, useCallback } from 'react'
import type { SearchResult, SearchFilters } from '@/types/helpCenter'

interface UseSearchReturn {
  searchResults: SearchResult[]
  isLoading: boolean
  performSearch: (query: string, filters?: SearchFilters) => Promise<SearchResult[]>
}

export const useSearch = (): UseSearchReturn => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const performSearch = useCallback(async (query: string, filters?: SearchFilters): Promise<SearchResult[]> => {
    setIsLoading(true)
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300))
      
      // Mock search results - in real app this would call API
      const mockResults: SearchResult[] = [
        {
          id: 'search-1',
          title: `Results for "${query}"`,
          content: `Search content related to ${query}`,
          type: 'article',
          category: 'general',
          relevance: 1,
          metadata: {
            difficulty: 'beginner',
            readTime: 5
          }
        }
      ]
      
      setSearchResults(mockResults)
      return mockResults
    } catch (error) {
      console.error('Search failed:', error)
      setSearchResults([])
      return []
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    searchResults,
    isLoading,
    performSearch
  }
}