import { Database } from '../utils/database';

export interface LearningPathQuery {
  category?: string;
  difficulty?: string;
  status?: string;
  limit?: number;
  offset?: number;
}

export interface LearningModuleQuery {
  learningPathId?: string;
  category?: string;
  difficulty?: string;
  status?: string;
  limit?: number;
  offset?: number;
}

export interface UserLearningProgressQuery {
  userId: string;
  learningPathId?: string;
  learningModuleId?: string;
  completed?: boolean;
}

export interface CreateLearningPathData {
  title: string;
  description: string;
  category: string;
  difficulty: string;
  estimated_duration?: number;
  prerequisites?: string;
  tags?: string[];
  is_guided?: boolean;
}

export interface CreateLearningModuleData {
  learning_path_id: string;
  title: string;
  description: string;
  content: string;
  module_type: string;
  order_index: number;
  estimated_duration?: number;
  interactive_elements?: any;
  assessment_criteria?: any;
}

export interface UpdateProgressData {
  progress_percentage?: number;
  time_spent?: number;
  score?: number;
  notes?: string;
  completed?: boolean;
}

export class LearningService {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  // Learning Paths
  async getAllLearningPaths(query: LearningPathQuery) {
    const { category, difficulty, status, limit = 50, offset = 0 } = query;
    
    let sqlQuery = 'SELECT * FROM learning_paths WHERE 1=1';
    const params: any[] = [];
    
    if (category) {
      sqlQuery += ' AND category = ?';
      params.push(category);
    }
    
    if (difficulty) {
      sqlQuery += ' AND difficulty = ?';
      params.push(difficulty);
    }
    
    if (status) {
      sqlQuery += ' AND status = ?';
      params.push(status);
    }
    
    sqlQuery += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));
    
    const learningPaths = await this.db.getAll(sqlQuery, params);
    
    const totalQuery = 'SELECT COUNT(*) as total FROM learning_paths WHERE 1=1' + 
      (category ? ' AND category = ?' : '') +
      (difficulty ? ' AND difficulty = ?' : '') +
      (status ? ' AND status = ?' : '');
    
    const countParams: any[] = [];
    if (category) countParams.push(category);
    if (difficulty) countParams.push(difficulty);
    if (status) countParams.push(status);
    
    const totalResult = await this.db.get(totalQuery, countParams);
    
    return {
      learningPaths,
      total: totalResult.total,
      limit: Number(limit),
      offset: Number(offset)
    };
  }

  async getLearningPathById(id: string) {
    const learningPath = await this.db.get('SELECT * FROM learning_paths WHERE id = ?', [id]);
    
    if (!learningPath) {
      throw new Error('Learning path not found');
    }
    
    // Get associated modules
    const modules = await this.db.getAll(
      'SELECT * FROM learning_modules WHERE learning_path_id = ? ORDER BY order_index',
      [id]
    );
    
    return {
      ...learningPath,
      modules: modules || []
    };
  }

  async createLearningPath(data: CreateLearningPathData) {
    const { title, description, category, difficulty, estimated_duration, prerequisites, tags, is_guided } = data;
    
    const pathId = await this.db.run(`
      INSERT INTO learning_paths (title, description, category, difficulty, estimated_duration, prerequisites, tags, is_guided, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'draft')
    `, [title, description, category, difficulty, estimated_duration, prerequisites, 
        JSON.stringify(tags || []), is_guided ? 1 : 0]);
    
    return await this.getLearningPathById(pathId.toString());
  }

  async updateLearningPath(id: string, data: Partial<CreateLearningPathData & { status?: string }>) {
    const existing = await this.getLearningPathById(id);
    
    const { title, description, category, difficulty, estimated_duration, prerequisites, tags, is_guided, status } = data;
    
    await this.db.run(`
      UPDATE learning_paths 
      SET title = ?, description = ?, category = ?, difficulty = ?, estimated_duration = ?, 
          prerequisites = ?, tags = ?, is_guided = ?, status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [title || existing.title, description || existing.description, category || existing.category,
        difficulty || existing.difficulty, estimated_duration || existing.estimated_duration,
        prerequisites || existing.prerequisites, JSON.stringify(tags) || existing.tags,
        is_guided !== undefined ? (is_guided ? 1 : 0) : existing.is_guided, 
        status || existing.status, id]);
    
    return await this.getLearningPathById(id);
  }

  async deleteLearningPath(id: string) {
    const learningPath = await this.getLearningPathById(id);
    
    // Delete modules first
    await this.db.run('DELETE FROM learning_modules WHERE learning_path_id = ?', [id]);
    
    // Delete the learning path
    await this.db.run('DELETE FROM learning_paths WHERE id = ?', [id]);
    
    return learningPath;
  }

  // Learning Modules
  async getAllLearningModules(query: LearningModuleQuery) {
    const { learningPathId, category, difficulty, status, limit = 50, offset = 0 } = query;
    
    let sqlQuery = `
      SELECT lm.*, lp.title as path_title, lp.category as path_category
      FROM learning_modules lm
      JOIN learning_paths lp ON lm.learning_path_id = lp.id
      WHERE 1=1
    `;
    const params: any[] = [];
    
    if (learningPathId) {
      sqlQuery += ' AND lm.learning_path_id = ?';
      params.push(learningPathId);
    }
    
    if (category) {
      sqlQuery += ' AND lp.category = ?';
      params.push(category);
    }
    
    if (difficulty) {
      sqlQuery += ' AND lp.difficulty = ?';
      params.push(difficulty);
    }
    
    if (status) {
      sqlQuery += ' AND lm.status = ?';
      params.push(status);
    }
    
    sqlQuery += ' ORDER BY lm.order_index, lm.created_at LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));
    
    const modules = await this.db.getAll(sqlQuery, params);
    
    return modules;
  }

  async getLearningModuleById(id: string) {
    const module = await this.db.get(`
      SELECT lm.*, lp.title as path_title, lp.category as path_category
      FROM learning_modules lm
      JOIN learning_paths lp ON lm.learning_path_id = lp.id
      WHERE lm.id = ?
    `, [id]);
    
    if (!module) {
      throw new Error('Learning module not found');
    }
    
    return module;
  }

  async createLearningModule(data: CreateLearningModuleData) {
    const { learning_path_id, title, description, content, module_type, order_index, 
            estimated_duration, interactive_elements, assessment_criteria } = data;
    
    const moduleId = await this.db.run(`
      INSERT INTO learning_modules (learning_path_id, title, description, content, module_type, order_index, 
                                   estimated_duration, interactive_elements, assessment_criteria, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'draft')
    `, [learning_path_id, title, description, content, module_type, order_index,
        estimated_duration, JSON.stringify(interactive_elements), JSON.stringify(assessment_criteria)]);
    
    return await this.getLearningModuleById(moduleId.toString());
  }

  async updateLearningModule(id: string, data: Partial<CreateLearningModuleData & { status?: string }>) {
    const existing = await this.getLearningModuleById(id);
    
    const { title, description, content, module_type, order_index, estimated_duration, 
            interactive_elements, assessment_criteria, status } = data;
    
    await this.db.run(`
      UPDATE learning_modules 
      SET title = ?, description = ?, content = ?, module_type = ?, order_index = ?, 
          estimated_duration = ?, interactive_elements = ?, assessment_criteria = ?, status = ?, 
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [title || existing.title, description || existing.description, content || existing.content,
        module_type || existing.module_type, order_index !== undefined ? order_index : existing.order_index,
        estimated_duration || existing.estimated_duration, JSON.stringify(interactive_elements) || existing.interactive_elements,
        JSON.stringify(assessment_criteria) || existing.assessment_criteria, status || existing.status, id]);
    
    return await this.getLearningModuleById(id);
  }

  async deleteLearningModule(id: string) {
    const module = await this.getLearningModuleById(id);
    
    await this.db.run('DELETE FROM learning_modules WHERE id = ?', [id]);
    
    return module;
  }

  // User Progress Tracking
  async getUserLearningProgress(query: UserLearningProgressQuery) {
    const { userId, learningPathId, learningModuleId, completed } = query;
    
    if (learningModuleId) {
      // Get progress for specific module
      const progress = await this.db.get(`
        SELECT lm.*, lp.title as path_title, ulp.progress_percentage, ulp.time_spent, 
               ulp.score, ulp.notes, ulp.completed, ulp.completed_at, ulp.last_accessed
        FROM learning_modules lm
        JOIN learning_paths lp ON lm.learning_path_id = lp.id
        LEFT JOIN user_learning_progress ulp ON lm.id = ulp.learning_module_id AND ulp.user_id = ?
        WHERE lm.id = ?
      `, [userId, learningModuleId]);
      
      if (!progress) {
        throw new Error('Learning module not found');
      }
      
      return progress;
    } else if (learningPathId) {
      // Get progress for entire learning path
      const pathProgress = await this.db.getAll(`
        SELECT lm.*, ulp.progress_percentage, ulp.time_spent, ulp.score, 
               ulp.completed, ulp.completed_at, ulp.last_accessed
        FROM learning_modules lm
        LEFT JOIN user_learning_progress ulp ON lm.id = ulp.learning_module_id AND ulp.user_id = ?
        WHERE lm.learning_path_id = ?
        ORDER BY lm.order_index
      `, [userId, learningPathId]);
      
      return pathProgress;
    } else {
      // Get all user progress
      let sqlQuery = `
        SELECT lp.*, lm.id as module_id, lm.title as module_title, ulp.progress_percentage, 
               ulp.time_spent, ulp.score, ulp.completed, ulp.completed_at, ulp.last_accessed
        FROM learning_paths lp
        JOIN learning_modules lm ON lp.id = lm.learning_path_id
        LEFT JOIN user_learning_progress ulp ON lm.id = ulp.learning_module_id AND ulp.user_id = ?
        WHERE 1=1
      `;
      const params: any[] = [userId];
      
      if (completed !== undefined) {
        if (completed) {
          sqlQuery += ' AND ulp.completed = 1';
        } else {
          sqlQuery += ' AND (ulp.completed IS NULL OR ulp.completed = 0)';
        }
      }
      
      sqlQuery += ' ORDER BY ulp.last_accessed DESC';
      
      const allProgress = await this.db.getAll(sqlQuery, params);
      
      return allProgress;
    }
  }

  async startLearningPath(userId: string, learningPathId: string) {
    const learningPath = await this.getLearningPathById(learningPathId);
    
    // Get first module
    const firstModule = await this.db.get(`
      SELECT * FROM learning_modules 
      WHERE learning_path_id = ? 
      ORDER BY order_index 
      LIMIT 1
    `, [learningPathId]);
    
    if (!firstModule) {
      throw new Error('Learning path has no modules');
    }
    
    // Record that user started this module (if not already started)
    const existing = await this.db.get(`
      SELECT * FROM user_learning_progress 
      WHERE user_id = ? AND learning_module_id = ?
    `, [userId, firstModule.id]);
    
    if (!existing) {
      await this.db.run(`
        INSERT INTO user_learning_progress (user_id, learning_module_id, progress_percentage, last_accessed)
        VALUES (?, ?, 0, CURRENT_TIMESTAMP)
      `, [userId, firstModule.id]);
    }
    
    return {
      learningPath,
      currentModule: firstModule,
      progress: await this.getUserLearningProgress({ userId, learningPathId })
    };
  }

  async updateModuleProgress(userId: string, learningModuleId: string, data: UpdateProgressData) {
    const { progress_percentage, time_spent, score, notes, completed } = data;
    
    // Check if module exists
    await this.getLearningModuleById(learningModuleId);
    
    const existingProgress = await this.db.get(`
      SELECT * FROM user_learning_progress 
      WHERE user_id = ? AND learning_module_id = ?
    `, [userId, learningModuleId]);
    
    if (existingProgress) {
      await this.db.run(`
        UPDATE user_learning_progress 
        SET progress_percentage = ?, time_spent = COALESCE(time_spent, 0) + COALESCE(?, 0), 
            score = ?, notes = ?, completed = ?, 
            completed_at = CASE WHEN ? = 1 THEN CURRENT_TIMESTAMP ELSE completed_at END,
            last_accessed = CURRENT_TIMESTAMP
        WHERE user_id = ? AND learning_module_id = ?
      `, [progress_percentage || existingProgress.progress_percentage, time_spent || 0,
          score !== undefined ? score : existingProgress.score, notes || existingProgress.notes,
          completed !== undefined ? (completed ? 1 : 0) : existingProgress.completed,
          completed ? 1 : 0, userId, learningModuleId]);
    } else {
      await this.db.run(`
        INSERT INTO user_learning_progress (user_id, learning_module_id, progress_percentage, time_spent, score, notes, completed, completed_at, last_accessed)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `, [userId, learningModuleId, progress_percentage || 0, time_spent || 0, score,
          notes, completed ? 1 : 0, completed ? new Date().toISOString() : null]);
    }
    
    return await this.getUserLearningProgress({ userId, learningModuleId });
  }

  async getLearningPathStats(userId: string, learningPathId: string) {
    const stats = await this.db.get(`
      SELECT 
        COUNT(lm.id) as total_modules,
        COUNT(ulp.learning_module_id) as started_modules,
        SUM(CASE WHEN ulp.completed = 1 THEN 1 ELSE 0 END) as completed_modules,
        AVG(ulp.progress_percentage) as avg_progress,
        SUM(ulp.time_spent) as total_time_spent,
        MAX(ulp.last_accessed) as last_accessed
      FROM learning_modules lm
      LEFT JOIN user_learning_progress ulp ON lm.id = ulp.learning_module_id AND ulp.user_id = ?
      WHERE lm.learning_path_id = ?
    `, [userId, learningPathId]);
    
    return {
      totalModules: stats.total_modules || 0,
      startedModules: stats.started_modules || 0,
      completedModules: stats.completed_modules || 0,
      completionPercentage: stats.total_modules > 0 ? 
        Math.round((stats.completed_modules / stats.total_modules) * 100) : 0,
      avgProgress: Math.round(stats.avg_progress || 0),
      totalTimeSpent: stats.total_time_spent || 0,
      lastAccessed: stats.last_accessed
    };
  }

  async getLearningCategories() {
    const categories = await this.db.getAll(`
      SELECT 
        category,
        COUNT(*) as path_count,
        AVG(estimated_duration) as avg_duration,
        COUNT(lm.id) as total_modules
      FROM learning_paths lp
      LEFT JOIN learning_modules lm ON lp.id = lm.learning_path_id
      WHERE lp.status = 'published'
      GROUP BY category 
      ORDER BY path_count DESC
    `);
    
    return categories;
  }
}