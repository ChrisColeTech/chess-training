import express from 'express';
import { Database } from '../utils/database';

const router = express.Router();
const db = Database.getInstance();

// GET /api/game-review-moves - Get all game review moves
router.get('/', async (req, res) => {
  try {
    const { review_id, limit = 100, offset = 0 } = req.query;
    
    let query = 'SELECT * FROM game_review_moves';
    let params: any[] = [];
    
    if (review_id) {
      query += ' WHERE review_id = ?';
      params.push(review_id);
    }
    
    query += ' ORDER BY review_id, move_number LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));
    
    const moves = await db.getAll(query, params);
    
    res.json({
      success: true,
      data: moves,
      limit: Number(limit),
      offset: Number(offset)
    });
  } catch (error) {
    console.error('Error fetching game review moves:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch game review moves'
    });
  }
});

// GET /api/game-review-moves/:id - Get specific game review move
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const move = await db.get('SELECT * FROM game_review_moves WHERE id = ?', [id]);
    
    if (!move) {
      return res.status(404).json({
        success: false,
        error: 'Game review move not found'
      });
    }
    
    res.json({
      success: true,
      data: move
    });
  } catch (error) {
    console.error('Error fetching game review move:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch game review move'
    });
  }
});

export default router;