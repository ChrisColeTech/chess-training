import { Database } from '../utils/database';

export interface TutorialQuery {
  category?: string;
  difficulty?: string;
  status?: string;
  limit?: number;
  offset?: number;
}

export interface TutorialStepQuery {
  tutorialId: string;
  stepNumber?: number;
}

export interface UserProgressQuery {
  userId: string;
  tutorialId?: string;
  completed?: boolean;
}

export interface CreateTutorialData {
  title: string;
  description: string;
  category: string;
  difficulty: string;
  estimated_duration?: number;
  prerequisites?: string;
  tags?: string[];
}

export interface UpdateTutorialData {
  title?: string;
  description?: string;
  category?: string;
  difficulty?: string;
  estimated_duration?: number;
  prerequisites?: string;
  tags?: string[];
  status?: string;
}

export interface CreateTutorialStepData {
  step_number: number;
  title: string;
  content: string;
  step_type: string;
  interactive_data?: any;
  hints?: string[];
  validation_criteria?: any;
}

export interface CompleteStepData {
  timeSpent?: number;
  score?: number;
  attempts?: number;
}

export class TutorialService {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  // Tutorials
  async getAllTutorials(query: TutorialQuery) {
    const { category, difficulty, status, limit = 50, offset = 0 } = query;
    
    let sqlQuery = 'SELECT * FROM tutorials WHERE 1=1';
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
    
    const tutorials = await this.db.getAll(sqlQuery, params);
    
    const totalQuery = 'SELECT COUNT(*) as total FROM tutorials WHERE 1=1' + 
      (category ? ' AND category = ?' : '') +
      (difficulty ? ' AND difficulty = ?' : '') +
      (status ? ' AND status = ?' : '');
    
    const countParams: any[] = [];
    if (category) countParams.push(category);
    if (difficulty) countParams.push(difficulty);
    if (status) countParams.push(status);
    
    const totalResult = await this.db.get(totalQuery, countParams);
    
    return {
      tutorials,
      total: totalResult.total,
      limit: Number(limit),
      offset: Number(offset)
    };
  }

  async getTutorialsByDifficulty(difficulty: string, query: any = {}) {
    return await this.getAllTutorials({ difficulty, ...query });
  }

  async getTutorialById(id: string) {
    const tutorial = await this.db.get('SELECT * FROM tutorials WHERE id = ?', [id]);
    
    if (!tutorial) {
      throw new Error('Tutorial not found');
    }
    
    // Get tutorial steps
    const steps = await this.db.getAll(
      'SELECT * FROM tutorial_steps WHERE tutorial_id = ? ORDER BY step_number',
      [id]
    );
    
    return {
      ...tutorial,
      steps: steps || []
    };
  }

  async createTutorial(data: CreateTutorialData) {
    const { title, description, category, difficulty, estimated_duration, prerequisites, tags } = data;
    
    const tutorialId = await this.db.run(`
      INSERT INTO tutorials (title, description, category, difficulty, estimated_duration, prerequisites, tags, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'draft')
    `, [title, description, category, difficulty, estimated_duration, prerequisites, JSON.stringify(tags || [])]);
    
    return await this.getTutorialById(tutorialId.toString());
  }

  async updateTutorial(id: string, data: UpdateTutorialData) {
    const { title, description, category, difficulty, estimated_duration, prerequisites, tags, status } = data;
    
    await this.db.run(`
      UPDATE tutorials 
      SET title = ?, description = ?, category = ?, difficulty = ?, estimated_duration = ?, 
          prerequisites = ?, tags = ?, status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [title, description, category, difficulty, estimated_duration, prerequisites, 
        JSON.stringify(tags), status, id]);
    
    return await this.getTutorialById(id);
  }

  async deleteTutorial(id: string) {
    const tutorial = await this.getTutorialById(id);
    
    // Delete tutorial steps first
    await this.db.run('DELETE FROM tutorial_steps WHERE tutorial_id = ?', [id]);
    
    // Delete the tutorial
    await this.db.run('DELETE FROM tutorials WHERE id = ?', [id]);
    
    return tutorial;
  }

  async getTutorialsByCategory(category: string) {
    const tutorials = await this.db.getAll(`
      SELECT * FROM tutorials 
      WHERE category = ? AND status = 'published'
      ORDER BY difficulty, created_at
    `, [category]);
    
    return tutorials;
  }

  // Tutorial Steps
  async getTutorialSteps(query: TutorialStepQuery) {
    const { tutorialId, stepNumber } = query;
    
    let sqlQuery = 'SELECT * FROM tutorial_steps WHERE tutorial_id = ?';
    const params: any[] = [tutorialId];
    
    if (stepNumber !== undefined) {
      sqlQuery += ' AND step_number = ?';
      params.push(Number(stepNumber));
      
      const step = await this.db.get(sqlQuery, params);
      if (!step) {
        throw new Error('Tutorial step not found');
      }
      return step;
    }
    
    sqlQuery += ' ORDER BY step_number';
    const steps = await this.db.getAll(sqlQuery, params);
    
    return steps;
  }

  async createTutorialStep(tutorialId: string, data: CreateTutorialStepData) {
    const { step_number, title, content, step_type, interactive_data, hints, validation_criteria } = data;
    
    const stepId = await this.db.run(`
      INSERT INTO tutorial_steps (tutorial_id, step_number, title, content, step_type, interactive_data, hints, validation_criteria)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [tutorialId, step_number, title, content, step_type, 
        JSON.stringify(interactive_data), JSON.stringify(hints || []), JSON.stringify(validation_criteria)]);
    
    return await this.getTutorialSteps({ tutorialId, stepNumber: step_number });
  }

  async updateTutorialStep(id: string, data: Partial<CreateTutorialStepData>) {
    const existingStep = await this.db.get('SELECT * FROM tutorial_steps WHERE id = ?', [id]);
    if (!existingStep) {
      throw new Error('Tutorial step not found');
    }
    
    const { title, content, step_type, interactive_data, hints, validation_criteria } = data;
    
    await this.db.run(`
      UPDATE tutorial_steps 
      SET title = ?, content = ?, step_type = ?, interactive_data = ?, hints = ?, validation_criteria = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [title || existingStep.title, content || existingStep.content, step_type || existingStep.step_type,
        JSON.stringify(interactive_data || JSON.parse(existingStep.interactive_data || '{}')),
        JSON.stringify(hints || JSON.parse(existingStep.hints || '[]')),
        JSON.stringify(validation_criteria || JSON.parse(existingStep.validation_criteria || '{}')), id]);
    
    return await this.db.get('SELECT * FROM tutorial_steps WHERE id = ?', [id]);
  }

  async deleteTutorialStep(id: string) {
    const step = await this.db.get('SELECT * FROM tutorial_steps WHERE id = ?', [id]);
    if (!step) {
      throw new Error('Tutorial step not found');
    }
    
    await this.db.run('DELETE FROM tutorial_steps WHERE id = ?', [id]);
    
    return step;
  }

  // User Progress Tracking
  async getUserTutorialProgress(query: UserProgressQuery) {
    const { userId, tutorialId, completed } = query;
    
    if (tutorialId) {
      // Get progress for specific tutorial
      const progress = await this.db.get(`
        SELECT 
          t.*,
          COALESCE(progress.completed_steps, 0) as completed_steps,
          COALESCE(progress.total_time_spent, 0) as total_time_spent,
          COALESCE(progress.last_accessed, t.created_at) as last_accessed,
          CASE WHEN progress.completed_steps = t.total_steps THEN 1 ELSE 0 END as is_completed
        FROM tutorials t
        LEFT JOIN (
          SELECT 
            tutorial_id,
            COUNT(*) as completed_steps,
            SUM(time_spent) as total_time_spent,
            MAX(completed_at) as last_accessed
          FROM tutorial_steps ts
          WHERE EXISTS (
            SELECT 1 FROM user_tutorial_progress utp 
            WHERE utp.tutorial_id = ts.tutorial_id 
            AND utp.step_id = ts.id 
            AND utp.user_id = ?
            AND utp.completed = 1
          )
          GROUP BY tutorial_id
        ) progress ON t.id = progress.tutorial_id
        WHERE t.id = ?
      `, [userId, tutorialId]);
      
      if (!progress) {
        throw new Error('Tutorial not found');
      }
      
      return progress;
    } else {
      // Get progress for all tutorials
      let sqlQuery = `
        SELECT 
          t.*,
          COALESCE(progress.completed_steps, 0) as completed_steps,
          COALESCE(progress.total_time_spent, 0) as total_time_spent,
          COALESCE(progress.last_accessed, t.created_at) as last_accessed,
          CASE WHEN progress.completed_steps = t.total_steps THEN 1 ELSE 0 END as is_completed
        FROM tutorials t
        LEFT JOIN (
          SELECT 
            tutorial_id,
            COUNT(*) as completed_steps,
            SUM(time_spent) as total_time_spent,
            MAX(completed_at) as last_accessed
          FROM tutorial_steps ts
          WHERE EXISTS (
            SELECT 1 FROM user_tutorial_progress utp 
            WHERE utp.tutorial_id = ts.tutorial_id 
            AND utp.step_id = ts.id 
            AND utp.user_id = ?
            AND utp.completed = 1
          )
          GROUP BY tutorial_id
        ) progress ON t.id = progress.tutorial_id
        WHERE 1=1
      `;
      const params: any[] = [userId];
      
      if (completed !== undefined) {
        sqlQuery += completed 
          ? ' AND progress.completed_steps = t.total_steps'
          : ' AND (progress.completed_steps IS NULL OR progress.completed_steps < t.total_steps)';
      }
      
      sqlQuery += ' ORDER BY progress.last_accessed DESC';
      
      const tutorials = await this.db.getAll(sqlQuery, params);
      
      return tutorials;
    }
  }

  async startTutorial(userId: string, tutorialId: string) {
    // Check if tutorial exists
    const tutorial = await this.getTutorialById(tutorialId);
    
    // Get first step
    const firstStep = await this.db.get(`
      SELECT * FROM tutorial_steps 
      WHERE tutorial_id = ? 
      ORDER BY step_number 
      LIMIT 1
    `, [tutorialId]);
    
    if (!firstStep) {
      throw new Error('Tutorial has no steps');
    }
    
    // Record that user started this tutorial (if not already started)
    const existing = await this.db.get(`
      SELECT * FROM user_tutorial_progress 
      WHERE user_id = ? AND tutorial_id = ? AND step_id = ?
    `, [userId, tutorialId, firstStep.id]);
    
    if (!existing) {
      await this.db.run(`
        INSERT INTO user_tutorial_progress (user_id, tutorial_id, step_id, started_at)
        VALUES (?, ?, ?, CURRENT_TIMESTAMP)
      `, [userId, tutorialId, firstStep.id]);
    }
    
    return {
      tutorial,
      currentStep: firstStep,
      progress: await this.getUserTutorialProgress({ userId, tutorialId })
    };
  }

  async completeStep(userId: string, tutorialId: string, stepId: string, data: CompleteStepData) {
    const { timeSpent = 0, score = 100, attempts = 1 } = data;
    
    // Update or insert progress record
    const existingProgress = await this.db.get(`
      SELECT * FROM user_tutorial_progress 
      WHERE user_id = ? AND tutorial_id = ? AND step_id = ?
    `, [userId, tutorialId, stepId]);
    
    if (existingProgress) {
      await this.db.run(`
        UPDATE user_tutorial_progress 
        SET completed = 1, completed_at = CURRENT_TIMESTAMP, time_spent = ?, score = ?, attempts = ?
        WHERE user_id = ? AND tutorial_id = ? AND step_id = ?
      `, [timeSpent, score, attempts, userId, tutorialId, stepId]);
    } else {
      await this.db.run(`
        INSERT INTO user_tutorial_progress (user_id, tutorial_id, step_id, completed, completed_at, time_spent, score, attempts, started_at)
        VALUES (?, ?, ?, 1, CURRENT_TIMESTAMP, ?, ?, ?, CURRENT_TIMESTAMP)
      `, [userId, tutorialId, stepId, timeSpent, score, attempts]);
    }
    
    // Get next step
    const currentStep = await this.db.get('SELECT step_number FROM tutorial_steps WHERE id = ?', [stepId]);
    const nextStep = await this.db.get(`
      SELECT * FROM tutorial_steps 
      WHERE tutorial_id = ? AND step_number > ?
      ORDER BY step_number 
      LIMIT 1
    `, [tutorialId, currentStep.step_number]);
    
    return {
      completed: true,
      nextStep,
      progress: await this.getUserTutorialProgress({ userId, tutorialId })
    };
  }

  async getTutorialCategories() {
    const categories = await this.db.getAll(`
      SELECT 
        category,
        COUNT(*) as tutorial_count,
        AVG(estimated_duration) as avg_duration
      FROM tutorials 
      WHERE status = 'published'
      GROUP BY category 
      ORDER BY tutorial_count DESC
    `);
    
    return categories;
  }
}