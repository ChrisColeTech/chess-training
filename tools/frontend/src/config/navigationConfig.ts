/**
 * Navigation and menu configurations
 * 
 * Generated: 2025-08-29T00:52:22.208Z
 * Consolidated from: 4 UI interface(s)
 * Source files: collectionBrowserTabs.ts, navigationConfig.ts, endgameLibrary.ts, openingExplorer.ts
 */

// From: /mnt/c/Projects/chess-training/frontend/src/data/collectionBrowserTabs.ts
export interface CollectionBrowserTab {
  key: CollectionBrowserTabKey;
  label: string;
  icon: string;
  description?: string;
}

// From: /mnt/c/Projects/chess-training/frontend/src/data/navigationConfig.ts
export interface NavItem {
  id: string;
  title: string;
  icon: any;
  path?: string;
  children?: NavItem[];
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/endgameLibrary.ts
export interface TablebaseQueryResult {
  fen: string; // Position FEN
  result: TablebaseResult; // Tablebase result
  dtm?: number; // Distance to mate (if winning/losing)
  dtz?: number; // Distance to zeroing move (if drawn)
  bestMove?: string; // Best move in the position
  moves: {
    move: string
    result: TablebaseResult
    dtm?: number
    dtz?: number
  }[]; // All legal moves with evaluations
  is7man: boolean; // Whether result is from 7-man tablebase
  timestamp: number; // Query timestamp
  error?: string; // Error message if query failed
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/openingExplorer.ts
export interface OpeningDatabaseService {
  searchOpenings: (filters: OpeningFilters) => Promise<SearchResults>; // Search for openings
  getOpeningByECO: (eco: ECOCode) => Promise<ChessOpening | null>; // Get opening by ECO code
  getVariations: (fen: string) => Promise<MoveVariation[]>; // Get variations for position
  getMasterGames: (eco: ECOCode) => Promise<MasterGame[]>; // Get master games for opening
  analyzePosition: (fen: string) => Promise<PositionAnalysis>; // Analyze position
  getStatistics: () => Promise<OpeningStatistics>; // Get opening statistics
  getRelatedOpenings: (eco: ECOCode) => Promise<ChessOpening[]>; // Get related openings
}

// Consolidated NavigationConfig
export const NavigationConfig = {
  collectionBrowserTab: {} as CollectionBrowserTab,
  navItem: {} as NavItem,
  tablebaseQueryResult: {} as TablebaseQueryResult,
  openingDatabaseService: {} as OpeningDatabaseService,
} as const;

// Type exports
export type CollectionBrowserTabType = CollectionBrowserTab;
export type NavItemType = NavItem;
export type TablebaseQueryResultType = TablebaseQueryResult;
export type OpeningDatabaseServiceType = OpeningDatabaseService;
