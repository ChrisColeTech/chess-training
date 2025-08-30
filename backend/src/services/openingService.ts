import { Database } from '../utils/database';

export interface OpeningQuery {
  search?: string;
  eco?: string;
  difficulty?: string;
  limit?: number;
  offset?: number;
}

export class OpeningService {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  async getAllOpenings(query: OpeningQuery) {
    const { search, eco, difficulty, limit = 50, offset = 0 } = query;
    
    let sqlQuery = 'SELECT * FROM openings WHERE 1=1';
    const params: any[] = [];
    
    if (search) {
      sqlQuery += ' AND (name LIKE ? OR description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }
    
    if (eco) {
      sqlQuery += ' AND eco_code = ?';
      params.push(eco);
    }
    
    if (difficulty) {
      sqlQuery += ' AND difficulty_level = ?';
      params.push(difficulty);
    }
    
    sqlQuery += ' ORDER BY popularity_score DESC LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));
    
    const openings = await this.db.getAll(sqlQuery, params);
    
    const totalQuery = 'SELECT COUNT(*) as total FROM openings WHERE 1=1' + 
      (search ? ' AND (name LIKE ? OR description LIKE ?)' : '') +
      (eco ? ' AND eco_code = ?' : '') +
      (difficulty ? ' AND difficulty_level = ?' : '');
    
    const countParams = search ? [`%${search}%`, `%${search}%`] : [];
    if (eco) countParams.push(eco);
    if (difficulty) countParams.push(difficulty);
    
    const totalResult = await this.db.get(totalQuery, countParams);
    
    return {
      openings,
      total: totalResult.total,
      limit: Number(limit),
      offset: Number(offset)
    };
  }

  async getOpeningById(id: string) {
    const opening = await this.db.get('SELECT * FROM openings WHERE id = ?', [id]);
    
    if (!opening) {
      throw new Error('Opening not found');
    }
    
    const moves = await this.db.getAll('SELECT * FROM opening_moves WHERE opening_id = ? ORDER BY move_number', [id]);
    
    return {
      ...opening,
      moves: moves || []
    };
  }

  async getOpeningsByEco(eco: string) {
    return await this.db.getAll('SELECT * FROM openings WHERE eco_code = ? ORDER BY popularity_score DESC', [eco]);
  }
}