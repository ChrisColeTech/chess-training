import express from 'express';
import { Database } from '../utils/database';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';

const router = express.Router();
const db = Database.getInstance();

// GET /api/game-reviews - Get all game reviews
router.get('/', async (req, res) => {
  try {
    const { limit = 50, offset = 0 } = req.query;
    const reviews = await db.getAll('SELECT * FROM game_reviews ORDER BY review_date DESC LIMIT ? OFFSET ?', [Number(limit), Number(offset)]);
    
    res.json({
      success: true,
      data: reviews,
      limit: Number(limit),
      offset: Number(offset)
    });
  } catch (error) {
    console.error('Error fetching game reviews:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch game reviews'
    });
  }
});

// GET /api/game-reviews/:id - Get specific game review
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const review = await db.get('SELECT * FROM game_reviews WHERE id = ?', [id]);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        error: 'Game review not found'
      });
    }
    
    res.json({
      success: true,
      data: review
    });
  } catch (error) {
    console.error('Error fetching game review:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch game review'
    });
  }
});

// GET /api/game-reviews/:id/moves - Get moves for a specific game review
router.get('/:id/moves', async (req, res) => {
  try {
    const { id } = req.params;
    const moves = await db.getAll('SELECT * FROM game_review_moves WHERE review_id = ? ORDER BY move_number', [id]);
    
    res.json({
      success: true,
      data: moves
    });
  } catch (error) {
    console.error('Error fetching game review moves:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch game review moves'
    });
  }
});

export default router;