import { Database } from '../utils/database';

export interface SearchResult {
  id: string;
  type: string;
  title: string;
  description: string;
  relevance: number;
  metadata?: any;
}

export interface PaginatedResults<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export class SearchService {
  private db = Database.getInstance();

  async globalSearch(query: string, options: {
    type?: string;
    page: number;
    limit: number;
  }): Promise<PaginatedResults<SearchResult>> {
    const { type, page, limit } = options;
    const offset = (page - 1) * limit;
    const searchTerm = `%${query}%`;

    let results: SearchResult[] = [];

    // Search puzzles
    if (!type || type === 'puzzles') {
      const puzzles = await this.db.db.all(`
        SELECT id, 'puzzle' as type, description as title, description, rating
        FROM puzzles 
        WHERE description LIKE ? 
        ORDER BY rating DESC
        LIMIT ?
      `, [searchTerm, type ? limit : Math.floor(limit / 4)]);

      results = results.concat(puzzles.map((puzzle: any) => ({
        id: puzzle.id,
        type: 'puzzle',
        title: puzzle.title || 'Chess Puzzle',
        description: puzzle.description,
        relevance: this.calculateRelevance(query, puzzle.description),
        metadata: { rating: puzzle.rating }
      })));
    }

    // Search games (if games table exists)
    if (!type || type === 'games') {
      try {
        const games = await this.db.db.all(`
          SELECT id, 'game' as type, white_player as title, 
                 (white_player || ' vs ' || black_player) as description
          FROM games 
          WHERE white_player LIKE ? OR black_player LIKE ?
          ORDER BY tournament_date DESC
          LIMIT ?
        `, [searchTerm, searchTerm, type ? limit : Math.floor(limit / 4)]);

        results = results.concat(games.map((game: any) => ({
          id: game.id,
          type: 'game',
          title: game.title,
          description: game.description,
          relevance: this.calculateRelevance(query, `${game.title} ${game.description}`),
          metadata: {}
        })));
      } catch (error) {
        // Games table might not exist yet
        console.log('Games table not found, skipping games search');
      }
    }

    // Search tutorials (if tutorials table exists)
    if (!type || type === 'tutorials') {
      try {
        const tutorials = await this.db.db.all(`
          SELECT id, 'tutorial' as type, title, description
          FROM tutorials 
          WHERE title LIKE ? OR description LIKE ?
          ORDER BY created_at DESC
          LIMIT ?
        `, [searchTerm, searchTerm, type ? limit : Math.floor(limit / 4)]);

        results = results.concat(tutorials.map((tutorial: any) => ({
          id: tutorial.id,
          type: 'tutorial',
          title: tutorial.title,
          description: tutorial.description,
          relevance: this.calculateRelevance(query, `${tutorial.title} ${tutorial.description}`),
          metadata: {}
        })));
      } catch (error) {
        // Tutorials table might not exist yet
        console.log('Tutorials table not found, skipping tutorials search');
      }
    }

    // Sort by relevance and paginate
    results.sort((a, b) => b.relevance - a.relevance);
    const total = results.length;
    const paginatedResults = results.slice(offset, offset + limit);

    return {
      data: paginatedResults,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async searchPuzzles(query: string, options: {
    difficulty?: string;
    themes?: string;
    ratingMin?: number;
    ratingMax?: number;
    page: number;
    limit: number;
  }): Promise<PaginatedResults<SearchResult>> {
    const { difficulty, themes, ratingMin, ratingMax, page, limit } = options;
    const offset = (page - 1) * limit;
    const searchTerm = `%${query}%`;

    let whereClause = 'WHERE description LIKE ?';
    const params = [searchTerm];

    // Add difficulty filter
    if (difficulty) {
      const difficultyRanges = {
        beginner: [800, 1200],
        intermediate: [1200, 1600],
        advanced: [1600, 2000],
        expert: [2000, 3000]
      };
      const range = difficultyRanges[difficulty.toLowerCase() as keyof typeof difficultyRanges];
      if (range) {
        whereClause += ' AND rating BETWEEN ? AND ?';
        params.push(range[0].toString(), range[1].toString());
      }
    }

    // Add rating range filters
    if (ratingMin) {
      whereClause += ' AND rating >= ?';
      params.push(ratingMin.toString());
    }
    if (ratingMax) {
      whereClause += ' AND rating <= ?';
      params.push(ratingMax.toString());
    }

    // Add themes filter
    if (themes) {
      whereClause += ' AND themes LIKE ?';
      params.push(`%"${themes}"%`);
    }

    // Get total count
    const totalResult = await this.db.db.get(
      `SELECT COUNT(*) as total FROM puzzles ${whereClause}`,
      params
    );
    const total = totalResult?.total || 0;

    // Get puzzles
    const puzzles = await this.db.db.all(`
      SELECT * FROM puzzles 
      ${whereClause} 
      ORDER BY rating ASC 
      LIMIT ? OFFSET ?
    `, [...params, limit, offset]);

    const results = puzzles.map((puzzle: any) => ({
      id: puzzle.id,
      type: 'puzzle',
      title: puzzle.description,
      description: puzzle.description,
      relevance: this.calculateRelevance(query, puzzle.description),
      metadata: {
        rating: puzzle.rating,
        themes: JSON.parse(puzzle.themes || '[]'),
        fen: puzzle.fen
      }
    }));

    return {
      data: results,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async searchGames(query: string, options: {
    player?: string;
    opening?: string;
    result?: string;
    yearMin?: number;
    yearMax?: number;
    page: number;
    limit: number;
  }): Promise<PaginatedResults<SearchResult>> {
    const { page, limit } = options;
    const offset = (page - 1) * limit;

    // Return empty results if games table doesn't exist
    // This is a placeholder implementation
    return {
      data: [],
      pagination: {
        page,
        limit,
        total: 0,
        totalPages: 0
      }
    };
  }

  async searchTutorials(query: string, options: {
    category?: string;
    difficulty?: string;
    page: number;
    limit: number;
  }): Promise<PaginatedResults<SearchResult>> {
    const { page, limit } = options;
    const offset = (page - 1) * limit;

    // Return empty results if tutorials table doesn't exist
    // This is a placeholder implementation
    return {
      data: [],
      pagination: {
        page,
        limit,
        total: 0,
        totalPages: 0
      }
    };
  }

  async getSearchSuggestions(query: string, limit: number): Promise<string[]> {
    const searchTerm = `%${query}%`;
    
    // Get puzzle-related suggestions
    const puzzleSuggestions = await this.db.db.all(`
      SELECT DISTINCT description as suggestion
      FROM puzzles 
      WHERE description LIKE ? 
      LIMIT ?
    `, [searchTerm, Math.floor(limit / 2)]);

    // Get theme-based suggestions from puzzles
    const themeSuggestions = await this.db.db.all(`
      SELECT DISTINCT themes as suggestion
      FROM puzzles 
      WHERE themes LIKE ? 
      LIMIT ?
    `, [searchTerm, Math.floor(limit / 2)]);

    const suggestions: string[] = [];
    
    // Add puzzle description suggestions
    puzzleSuggestions.forEach((row: any) => {
      if (row.suggestion && suggestions.length < limit) {
        suggestions.push(row.suggestion);
      }
    });

    // Add theme suggestions
    themeSuggestions.forEach((row: any) => {
      if (row.suggestion && suggestions.length < limit) {
        try {
          const themes = JSON.parse(row.suggestion);
          themes.forEach((theme: string) => {
            if (theme.toLowerCase().includes(query.toLowerCase()) && 
                !suggestions.includes(theme) && 
                suggestions.length < limit) {
              suggestions.push(theme);
            }
          });
        } catch (e) {
          // Ignore malformed JSON
        }
      }
    });

    return suggestions.slice(0, limit);
  }

  async getPopularSearches(limit: number): Promise<string[]> {
    // This would typically come from a search analytics table
    // For now, return common chess terms
    return [
      'checkmate',
      'tactics',
      'opening',
      'endgame',
      'sacrifice',
      'fork',
      'pin',
      'skewer',
      'discovered attack',
      'back rank mate'
    ].slice(0, limit);
  }

  async searchLearningPaths(query: string, options: {
    category?: string;
    difficulty?: string;
    page: number;
    limit: number;
  }): Promise<PaginatedResults<SearchResult>> {
    const { page, limit } = options;
    const offset = (page - 1) * limit;

    // Return empty results if learning_paths table doesn't exist
    // This is a placeholder implementation
    return {
      data: [],
      pagination: {
        page,
        limit,
        total: 0,
        totalPages: 0
      }
    };
  }

  async saveSearch(userId: string, query: string, filters: any): Promise<{ id: string }> {
    try {
      const result = await this.db.db.run(`
        INSERT INTO saved_searches (user_id, query, filters, created_at)
        VALUES (?, ?, ?, datetime('now'))
      `, [userId, query, JSON.stringify(filters)]);

      return { id: result.lastID!.toString() };
    } catch (error) {
      // Table might not exist, create placeholder response
      return { id: Date.now().toString() };
    }
  }

  async getSavedSearches(userId: string): Promise<Array<{
    id: string;
    query: string;
    filters: any;
    createdAt: string;
  }>> {
    try {
      const searches = await this.db.db.all(`
        SELECT * FROM saved_searches 
        WHERE user_id = ? 
        ORDER BY created_at DESC
      `, [userId]);

      return searches.map((search: any) => ({
        id: search.id.toString(),
        query: search.query,
        filters: JSON.parse(search.filters || '{}'),
        createdAt: search.created_at
      }));
    } catch (error) {
      // Table might not exist
      return [];
    }
  }

  async deleteSavedSearch(userId: string, searchId: string): Promise<void> {
    try {
      await this.db.db.run(`
        DELETE FROM saved_searches 
        WHERE id = ? AND user_id = ?
      `, [searchId, userId]);
    } catch (error) {
      // Table might not exist, ignore error
    }
  }

  private calculateRelevance(query: string, text: string): number {
    const queryLower = query.toLowerCase();
    const textLower = text.toLowerCase();
    
    let score = 0;
    
    // Exact match gets highest score
    if (textLower === queryLower) {
      score += 100;
    }
    
    // Text starts with query gets high score
    if (textLower.startsWith(queryLower)) {
      score += 50;
    }
    
    // Text contains query gets medium score
    if (textLower.includes(queryLower)) {
      score += 25;
    }
    
    // Word boundary matches get bonus
    const words = queryLower.split(' ');
    words.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'i');
      if (regex.test(textLower)) {
        score += 10;
      }
    });
    
    return score;
  }
}