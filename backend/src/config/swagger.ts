import swaggerJSDoc from 'swagger-jsdoc';
import { SwaggerDefinition } from 'swagger-jsdoc';

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Chess Training API',
    version: '1.0.0',
    description: 'Backend API for Chess Training POC - A comprehensive chess training platform with puzzles, games, analysis, and learning features.',
    contact: {
      name: 'Chess Training API Support',
      email: 'support@chesstraining.com'
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
    {
      url: 'http://localhost:3001',
      description: 'Alternative development server',
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT Bearer token for authentication'
      }
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid', description: 'Unique user identifier' },
          username: { type: 'string', description: 'User\'s username' },
          email: { type: 'string', format: 'email', description: 'User\'s email address' },
          rating: { type: 'integer', description: 'User\'s chess rating' },
          created_at: { type: 'string', format: 'date-time', description: 'Account creation timestamp' },
          updated_at: { type: 'string', format: 'date-time', description: 'Last profile update timestamp' }
        }
      },
      Game: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid', description: 'Unique game identifier' },
          white_player_id: { type: 'string', format: 'uuid', description: 'White player user ID' },
          black_player_id: { type: 'string', format: 'uuid', description: 'Black player user ID' },
          moves: { type: 'string', description: 'Game moves in PGN format' },
          result: { type: 'string', enum: ['1-0', '0-1', '1/2-1/2', '*'], description: 'Game result' },
          status: { type: 'string', enum: ['active', 'completed', 'abandoned'], description: 'Game status' },
          created_at: { type: 'string', format: 'date-time' },
          updated_at: { type: 'string', format: 'date-time' }
        }
      },
      Puzzle: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid', description: 'Unique puzzle identifier' },
          fen: { type: 'string', description: 'Chess position in FEN notation' },
          moves: { type: 'string', description: 'Solution moves' },
          rating: { type: 'integer', description: 'Puzzle difficulty rating' },
          themes: { type: 'string', description: 'Comma-separated puzzle themes' },
          source: { type: 'string', description: 'Puzzle source (e.g., Lichess, custom)' },
          created_at: { type: 'string', format: 'date-time' }
        }
      },
      ApiResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', description: 'Indicates if the request was successful' },
          data: { type: 'object', description: 'Response data' },
          error: { type: 'string', description: 'Error message if success is false' },
          message: { type: 'string', description: 'Additional response message' }
        }
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          error: { type: 'string', description: 'Error message' },
          details: { type: 'object', description: 'Additional error details' },
          timestamp: { type: 'string', format: 'date-time' }
        }
      }
    }
  },
  security: [
    {
      BearerAuth: []
    }
  ]
};

const options = {
  definition: swaggerDefinition,
  apis: [
    // All route files explicitly listed
    'src/routes/auth.ts',
    'src/routes/games.ts',
    'src/routes/puzzles.ts',
    'src/routes/users.ts',
    'src/routes/stats.ts',
    'src/routes/openings.ts',
    'src/routes/tutorials.ts',
    'src/routes/achievements.ts',
    'src/routes/learning.ts',
    'src/routes/analysis.ts',
    'src/routes/help.ts',
    'src/routes/subscriptions.ts',
    'src/routes/profiles.ts',
    'src/routes/game-reviews.ts',
    'src/routes/game-review-moves.ts',
    'src/routes/opening-moves.ts',
    'src/routes/puzzle-sources.ts',
    'src/routes/user-puzzle-preferences.ts',
    'src/routes/settings.ts',
    'src/routes/notifications.ts',
    'src/routes/search.ts',
    'src/routes/progress.ts',
    'src/routes/ai-opponents.ts',
    'src/controllers/*.ts', // Controller files
    'src/app.ts' // Main app file
  ],
};

export const swaggerSpec = swaggerJSDoc(options);