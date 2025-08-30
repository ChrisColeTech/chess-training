/**
 * Collection Browser Tab Configurations
 * Extracted from CustomPuzzleCollectionBrowser.tsx component
 */

export type CollectionBrowserTabKey = 'all' | 'my' | 'featured' | 'popular'

export interface CollectionBrowserTab {
  key: CollectionBrowserTabKey
  label: string
  icon: string
  description?: string
}

export const collectionBrowserTabs: CollectionBrowserTab[] = [
  {
    key: 'all',
    label: 'All',
    icon: 'Users',
    description: 'Browse all available puzzle collections'
  },
  {
    key: 'my',
    label: 'My Collections',
    icon: 'Eye',
    description: 'Collections you created or own'
  },
  {
    key: 'featured',
    label: 'Featured',
    icon: 'Star',
    description: 'Curated collections recommended by the community'
  },
  {
    key: 'popular',
    label: 'Popular',
    icon: 'BarChart3',
    description: 'Most accessed collections'
  }
] as const

// Configuration for popular collections
export const popularCollectionsConfig = {
  sortBy: 'accessCount',
  sortOrder: 'desc' as const,
  limit: 10
} as const

// Utility functions
export const getTabByKey = (key: CollectionBrowserTabKey): CollectionBrowserTab | undefined => {
  return collectionBrowserTabs.find(tab => tab.key === key)
}

export const getTabLabel = (key: CollectionBrowserTabKey): string => {
  const tab = getTabByKey(key)
  return tab?.label || key
}

export const getTabIcon = (key: CollectionBrowserTabKey): string => {
  const tab = getTabByKey(key)
  return tab?.icon || 'Users'
}

export const getDefaultTabKey = (): CollectionBrowserTabKey => 'all'

// Filter logic for different tabs
export const filterCollectionsByTab = <T extends { isFeatured?: boolean; accessCount?: number }>(
  collections: T[], 
  userCollections: T[], 
  tabKey: CollectionBrowserTabKey
): T[] => {
  switch (tabKey) {
    case 'my':
      return userCollections
    case 'featured':
      return collections.filter(c => c.isFeatured)
    case 'popular':
      return [...collections]
        .sort((a, b) => (b.accessCount || 0) - (a.accessCount || 0))
        .slice(0, popularCollectionsConfig.limit)
    case 'all':
    default:
      return collections
  }
}