import express from 'express';
import { Database } from '../utils/database';

const router = express.Router();
const db = Database.getInstance();

// GET /api/opening-moves - Get all opening moves
router.get('/', async (req, res) => {
  try {
    const { opening_id, limit = 50, offset = 0 } = req.query;
    
    let query = 'SELECT * FROM opening_moves';
    let params: any[] = [];
    
    if (opening_id) {
      query += ' WHERE opening_id = ?';
      params.push(opening_id);
    }
    
    query += ' ORDER BY opening_id, move_number LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));
    
    const moves = await db.getAll(query, params);
    
    res.json({
      success: true,
      data: moves,
      limit: Number(limit),
      offset: Number(offset)
    });
  } catch (error) {
    console.error('Error fetching opening moves:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch opening moves'
    });
  }
});

// GET /api/opening-moves/:id - Get specific opening move
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const move = await db.get('SELECT * FROM opening_moves WHERE id = ?', [id]);
    
    if (!move) {
      return res.status(404).json({
        success: false,
        error: 'Opening move not found'
      });
    }
    
    res.json({
      success: true,
      data: move
    });
  } catch (error) {
    console.error('Error fetching opening move:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch opening move'
    });
  }
});

export default router;