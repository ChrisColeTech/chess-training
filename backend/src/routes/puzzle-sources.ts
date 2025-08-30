import express from 'express';
import { Database } from '../utils/database';

const router = express.Router();
const db = Database.getInstance();

// GET /api/puzzle-sources - Get all puzzle sources
router.get('/', async (req, res) => {
  try {
    const { is_active, limit = 50, offset = 0 } = req.query;
    
    let query = 'SELECT * FROM puzzle_sources';
    let params: any[] = [];
    
    if (is_active !== undefined) {
      query += ' WHERE is_active = ?';
      params.push(is_active === 'true' ? 1 : 0);
    }
    
    query += ' ORDER BY name LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));
    
    const sources = await db.getAll(query, params);
    
    res.json({
      success: true,
      data: sources,
      limit: Number(limit),
      offset: Number(offset)
    });
  } catch (error) {
    console.error('Error fetching puzzle sources:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch puzzle sources'
    });
  }
});

// GET /api/puzzle-sources/:id - Get specific puzzle source
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const source = await db.get('SELECT * FROM puzzle_sources WHERE id = ?', [id]);
    
    if (!source) {
      return res.status(404).json({
        success: false,
        error: 'Puzzle source not found'
      });
    }
    
    res.json({
      success: true,
      data: source
    });
  } catch (error) {
    console.error('Error fetching puzzle source:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch puzzle source'
    });
  }
});

// GET /api/puzzle-sources/stats - Get puzzle sources statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await db.get(`
      SELECT 
        COUNT(*) as total_sources,
        COUNT(CASE WHEN is_active = 1 THEN 1 END) as active_sources,
        SUM(total_puzzles) as total_puzzles,
        AVG(average_rating) as avg_rating
      FROM puzzle_sources
    `);
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching puzzle source stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch puzzle source stats'
    });
  }
});

export default router;