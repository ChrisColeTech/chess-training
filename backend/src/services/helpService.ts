import { Database } from '../utils/database';

export interface HelpContentQuery {
  category?: string;
  topic?: string;
  search?: string;
  status?: string;
  limit?: number;
  offset?: number;
}

export interface CreateHelpContentData {
  title: string;
  content: string;
  category: string;
  tags?: string[];
}

export interface UpdateHelpContentData {
  title?: string;
  content?: string;
  category?: string;
  tags?: string[];
}

export interface HelpSearchQuery {
  query: string;
  category?: string;
  limit?: number;
}

export class HelpService {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  // Help Content
  async getAllHelpContent(query: HelpContentQuery) {
    const { category, topic, search, status, limit = 50, offset = 0 } = query;
    
    let sqlQuery = 'SELECT * FROM help_content WHERE 1=1';
    const params: any[] = [];
    
    if (category) {
      sqlQuery += ' AND category = ?';
      params.push(category);
    }
    
    if (topic) {
      sqlQuery += ' AND topic = ?';
      params.push(topic);
    }
    
    if (search) {
      sqlQuery += ' AND (title LIKE ? OR content LIKE ? OR tags LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }
    
    if (status) {
      sqlQuery += ' AND status = ?';
      params.push(status);
    }
    
    sqlQuery += ' ORDER BY view_count DESC, created_at DESC LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));
    
    const helpContent = await this.db.getAll(sqlQuery, params);
    
    const totalQuery = 'SELECT COUNT(*) as total FROM help_content WHERE 1=1' + 
      (category ? ' AND category = ?' : '') +
      (topic ? ' AND topic = ?' : '') +
      (search ? ' AND (title LIKE ? OR content LIKE ? OR tags LIKE ?)' : '') +
      (status ? ' AND status = ?' : '');
    
    const countParams: any[] = [];
    if (category) countParams.push(category);
    if (topic) countParams.push(topic);
    if (search) countParams.push(`%${search}%`, `%${search}%`, `%${search}%`);
    if (status) countParams.push(status);
    
    const totalResult = await this.db.get(totalQuery, countParams);
    
    return {
      helpContent,
      total: totalResult.total,
      limit: Number(limit),
      offset: Number(offset)
    };
  }

  async getHelpContentById(id: string) {
    const helpContent = await this.db.get('SELECT * FROM help_content WHERE id = ?', [id]);
    
    if (!helpContent) {
      throw new Error('Help content not found');
    }
    
    // Get related articles if they exist
    let relatedArticles = [];
    if (helpContent.related_articles) {
      try {
        const relatedIds = JSON.parse(helpContent.related_articles);
        if (relatedIds.length > 0) {
          const placeholders = relatedIds.map(() => '?').join(',');
          relatedArticles = await this.db.getAll(
            `SELECT id, title, category, topic FROM help_content WHERE id IN (${placeholders}) AND status = 'published'`,
            relatedIds
          );
        }
      } catch (error) {
        console.warn('Failed to parse related articles:', error);
      }
    }
    
    // Increment view count
    await this.db.run(
      'UPDATE help_content SET view_count = view_count + 1 WHERE id = ?',
      [id.toString()]
    );
    
    return {
      ...helpContent,
      related_articles: relatedArticles
    };
  }

  async createHelpContent(data: CreateHelpContentData) {
    const { title, content, category, tags } = data;
    
    const contentId = await this.db.run(`
      INSERT INTO help_content (title, content, category, tags, view_count)
      VALUES (?, ?, ?, ?, 0)
    `, [title, content, category, JSON.stringify(tags || [])]);
    
    return await this.getHelpContentById(contentId.toString());
  }

  async updateHelpContent(id: string, data: UpdateHelpContentData) {
    const existing = await this.getHelpContentById(id);
    
    const { title, content, category, tags } = data;
    
    await this.db.run(`
      UPDATE help_content 
      SET title = ?, content = ?, category = ?, tags = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [title || existing.title, content || existing.content, category || existing.category,
        JSON.stringify(tags) || existing.tags, id]);
    
    return await this.getHelpContentById(id);
  }

  async deleteHelpContent(id: string) {
    const helpContent = await this.getHelpContentById(id);
    
    await this.db.run('DELETE FROM help_content WHERE id = ?', [id]);
    
    return helpContent;
  }

  async getHelpContentByCategory(category: string) {
    const content = await this.db.getAll(`
      SELECT * FROM help_content 
      WHERE category = ?
      ORDER BY view_count DESC, created_at DESC
    `, [category]);
    
    return content;
  }

  async getHelpContentByTopic(topic: string) {
    const content = await this.db.getAll(`
      SELECT * FROM help_content 
      WHERE tags LIKE ?
      ORDER BY view_count DESC, created_at DESC
    `, [`%${topic}%`]);
    
    return content;
  }

  async getFeaturedHelpContent(limit: number = 10) {
    const content = await this.db.getAll(`
      SELECT * FROM help_content 
      ORDER BY helpful_votes DESC, view_count DESC
      LIMIT ?
    `, [limit]);
    
    return content;
  }

  async getPopularHelpContent(limit: number = 10) {
    const content = await this.db.getAll(`
      SELECT * FROM help_content 
      ORDER BY view_count DESC, created_at DESC
      LIMIT ?
    `, [limit]);
    
    return content;
  }

  async searchHelpContent(query: HelpSearchQuery) {
    const { query: searchTerm, category, limit = 20 } = query;
    
    let sqlQuery = `
      SELECT *, 
             CASE 
               WHEN title LIKE ? THEN 3
               WHEN content LIKE ? THEN 2
               WHEN tags LIKE ? THEN 1
               ELSE 0
             END as relevance_score
      FROM help_content 
      WHERE status = 'published' 
        AND (title LIKE ? OR content LIKE ? OR tags LIKE ?)
    `;
    
    const searchPattern = `%${searchTerm}%`;
    const params = [searchPattern, searchPattern, searchPattern, searchPattern, searchPattern, searchPattern];
    
    if (category) {
      sqlQuery += ' AND category = ?';
      params.push(category);
    }
    
    sqlQuery += ' ORDER BY relevance_score DESC, view_count DESC, created_at DESC LIMIT ?';
    params.push(Number(limit).toString());
    
    const results = await this.db.getAll(sqlQuery, params);
    
    return results;
  }

  async getHelpCategories() {
    const categories = await this.db.getAll(`
      SELECT 
        category,
        COUNT(*) as article_count,
        COUNT(DISTINCT topic) as topic_count,
        SUM(view_count) as total_views,
        MAX(updated_at) as last_updated
      FROM help_content 
      WHERE status = 'published'
      GROUP BY category 
      ORDER BY article_count DESC
    `);
    
    return categories;
  }

  async getHelpTopics(category?: string) {
    let sqlQuery = `
      SELECT 
        topic,
        category,
        COUNT(*) as article_count,
        SUM(view_count) as total_views,
        MAX(updated_at) as last_updated
      FROM help_content 
      WHERE status = 'published'
    `;
    const params: any[] = [];
    
    if (category) {
      sqlQuery += ' AND category = ?';
      params.push(category);
    }
    
    sqlQuery += ' GROUP BY topic, category ORDER BY article_count DESC';
    
    const topics = await this.db.getAll(sqlQuery, params);
    
    return topics;
  }

  async getRecentlyUpdatedContent(limit: number = 10) {
    const content = await this.db.getAll(`
      SELECT * FROM help_content 
      WHERE status = 'published'
      ORDER BY updated_at DESC
      LIMIT ?
    `, [limit]);
    
    return content;
  }

  async getHelpContentStats() {
    const stats = await this.db.get(`
      SELECT 
        COUNT(*) as total_articles,
        COUNT(CASE WHEN status = 'published' THEN 1 END) as published_articles,
        COUNT(CASE WHEN status = 'draft' THEN 1 END) as draft_articles,
        COUNT(CASE WHEN is_featured = 1 THEN 1 END) as featured_articles,
        COUNT(DISTINCT category) as categories,
        COUNT(DISTINCT topic) as topics,
        SUM(view_count) as total_views,
        AVG(view_count) as avg_views_per_article
      FROM help_content
    `);
    
    return {
      totalArticles: stats.total_articles || 0,
      publishedArticles: stats.published_articles || 0,
      draftArticles: stats.draft_articles || 0,
      featuredArticles: stats.featured_articles || 0,
      categories: stats.categories || 0,
      topics: stats.topics || 0,
      totalViews: stats.total_views || 0,
      avgViewsPerArticle: Math.round(stats.avg_views_per_article || 0)
    };
  }

  async getSuggestedContent(currentArticleId: string, limit: number = 5) {
    // Get current article to find related content
    const currentArticle = await this.db.get(
      'SELECT category, topic, tags FROM help_content WHERE id = ?',
      [currentArticleId]
    );
    
    if (!currentArticle) {
      return [];
    }
    
    // Find related content based on category, topic, and tags
    let suggestions = await this.db.getAll(`
      SELECT *, 
             CASE 
               WHEN category = ? AND topic = ? THEN 3
               WHEN category = ? THEN 2
               WHEN topic = ? THEN 1
               ELSE 0
             END as relevance_score
      FROM help_content 
      WHERE status = 'published' AND id != ?
      ORDER BY relevance_score DESC, view_count DESC
      LIMIT ?
    `, [currentArticle.category, currentArticle.topic, currentArticle.category, 
        currentArticle.topic, currentArticleId, limit]);
    
    return suggestions;
  }

  async incrementViewCount(id: string) {
    await this.db.run(
      'UPDATE help_content SET view_count = view_count + 1 WHERE id = ?',
      [id]
    );
    
    return true;
  }

  async updateContentOrder(updates: { id: string; order_index: number }[]) {
    for (const update of updates) {
      await this.db.run(
        'UPDATE help_content SET order_index = ? WHERE id = ?',
        [update.order_index, update.id]
      );
    }
    
    return true;
  }
}