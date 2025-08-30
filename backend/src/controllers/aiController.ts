import { Request, Response } from 'express';
import { AIService } from '../services/aiService';
import { Database } from '../utils/database';

const aiService = new AIService();
const db = Database.getInstance();

export const getAIOpponents = async (req: Request, res: Response) => {
  try {
    const { level, personality, active, limit = 50, offset = 0 } = req.query;
    
    let sqlQuery = 'SELECT * FROM ai_opponents WHERE 1=1';
    const params: any[] = [];
    
    if (level) {
      sqlQuery += ' AND strength_rating = ?';
      params.push(Number(level));
    }
    
    if (personality) {
      sqlQuery += ' AND personality = ?';
      params.push(personality);
    }
    
    if (active !== undefined) {
      sqlQuery += ' AND is_active = ?';
      params.push(active === 'true' ? 1 : 0);
    }
    
    sqlQuery += ' ORDER BY strength_rating, name LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));
    
    const opponents = await db.getAll(sqlQuery, params);
    
    const totalQuery = 'SELECT COUNT(*) as total FROM ai_opponents WHERE 1=1' + 
      (level ? ' AND strength_rating = ?' : '') +
      (personality ? ' AND personality = ?' : '') +
      (active !== undefined ? ' AND is_active = ?' : '');
    
    const countParams: any[] = [];
    if (level) countParams.push(Number(level));
    if (personality) countParams.push(personality);
    if (active !== undefined) countParams.push(active === 'true' ? 1 : 0);
    
    const totalResult = await db.get(totalQuery, countParams);
    
    res.json({
      success: true,
      data: opponents,
      total: totalResult.total,
      limit: Number(limit),
      offset: Number(offset)
    });
  } catch (error) {
    console.error('Error fetching AI opponents:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch AI opponents'
    });
  }
};

export const getAIOpponentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const opponent = await db.get('SELECT * FROM ai_opponents WHERE id = ?', [id]);
    
    if (!opponent) {
      return res.status(404).json({
        success: false,
        error: 'AI opponent not found'
      });
    }
    
    res.json({
      success: true,
      data: opponent
    });
  } catch (error) {
    console.error('Error fetching AI opponent:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch AI opponent'
    });
  }
};

export const createAIOpponent = async (req: Request, res: Response) => {
  try {
    const { name, description, strength_rating, personality, playing_style, avatar_url } = req.body;
    
    const opponentId = await db.run(`
      INSERT INTO ai_opponents (name, description, strength_rating, personality, playing_style, avatar_url, is_available)
      VALUES (?, ?, ?, ?, ?, ?, 1)
    `, [name, description, strength_rating, personality, playing_style, avatar_url]);
    
    const newOpponent = await db.get('SELECT * FROM ai_opponents WHERE id = ?', [opponentId]);
    
    res.status(201).json({
      success: true,
      data: newOpponent
    });
  } catch (error) {
    console.error('Error creating AI opponent:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create AI opponent'
    });
  }
};

export const updateAIOpponent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, strength_rating, personality, playing_style, avatar_url, is_available } = req.body;
    
    const existing = await db.get('SELECT * FROM ai_opponents WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({
        success: false,
        error: 'AI opponent not found'
      });
    }
    
    await db.run(`
      UPDATE ai_opponents 
      SET name = ?, description = ?, strength_rating = ?, personality = ?, playing_style = ?, 
          avatar_url = ?, is_available = ?
      WHERE id = ?
    `, [name || existing.name, description || existing.description, 
        strength_rating !== undefined ? strength_rating : existing.strength_rating,
        personality || existing.personality, 
        playing_style || existing.playing_style,
        avatar_url || existing.avatar_url,
        is_available !== undefined ? (is_available ? 1 : 0) : existing.is_available, id]);
    
    const updatedOpponent = await db.get('SELECT * FROM ai_opponents WHERE id = ?', [id]);
    
    res.json({
      success: true,
      data: updatedOpponent
    });
  } catch (error) {
    console.error('Error updating AI opponent:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update AI opponent'
    });
  }
};

export const deleteAIOpponent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const opponent = await db.get('SELECT * FROM ai_opponents WHERE id = ?', [id]);
    
    if (!opponent) {
      return res.status(404).json({
        success: false,
        error: 'AI opponent not found'
      });
    }
    
    await db.run('DELETE FROM ai_opponents WHERE id = ?', [id]);
    
    res.json({
      success: true,
      data: opponent,
      message: 'AI opponent deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting AI opponent:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete AI opponent'
    });
  }
};

export const getBestMove = async (req: Request, res: Response) => {
  try {
    const { fen, aiLevel } = req.body;
    
    if (!fen) {
      return res.status(400).json({
        success: false,
        error: 'FEN position is required'
      });
    }
    
    const level = aiLevel || 3;
    const bestMove = await aiService.getBestMove(fen, level);
    
    res.json({
      success: true,
      data: {
        move: bestMove,
        fen,
        aiLevel: level,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error getting best move:', error);
    
    if ((error as any).message === 'No legal moves available') {
      return res.status(400).json({
        success: false,
        error: 'No legal moves available in this position'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to get best move'
    });
  }
};

export const getAIOpponentsByLevel = async (req: Request, res: Response) => {
  try {
    const { level } = req.params;
    const opponents = await db.getAll(`
      SELECT * FROM ai_opponents 
      WHERE strength_rating = ? AND is_available = 1
      ORDER BY name
    `, [Number(level)]);
    
    res.json({
      success: true,
      data: opponents
    });
  } catch (error) {
    console.error('Error fetching AI opponents by level:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch AI opponents by level'
    });
  }
};

export const getAIOpponentStats = async (req: Request, res: Response) => {
  try {
    const stats = await db.get(`
      SELECT 
        COUNT(*) as total_opponents,
        COUNT(CASE WHEN is_available = 1 THEN 1 END) as active_opponents,
        MIN(strength_rating) as min_strength_rating,
        MAX(strength_rating) as max_strength_rating,
        COUNT(DISTINCT strength_rating) as strength_levels,
        COUNT(DISTINCT personality) as personalities
      FROM ai_opponents
    `);
    
    const levelBreakdown = await db.getAll(`
      SELECT 
        strength_rating,
        COUNT(*) as opponent_count,
        COUNT(DISTINCT personality) as personalities
      FROM ai_opponents
      WHERE is_available = 1
      GROUP BY strength_rating
      ORDER BY strength_rating
    `);
    
    res.json({
      success: true,
      data: {
        overview: {
          totalOpponents: stats.total_opponents || 0,
          activeOpponents: stats.active_opponents || 0,
          minStrengthRating: stats.min_strength_rating || 1,
          maxStrengthRating: stats.max_strength_rating || 5,
          strengthLevels: stats.strength_levels || 0,
          personalities: stats.personalities || 0
        },
        levelBreakdown
      }
    });
  } catch (error) {
    console.error('Error fetching AI opponent stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch AI opponent stats'
    });
  }
};