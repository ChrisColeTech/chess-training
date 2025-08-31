import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { Database } from './utils/database';
import { errorHandler } from './middleware/errorHandler';
import { swaggerSpec } from './config/swagger';

// Route imports
import authRoutes from './routes/auth';
import gameRoutes from './routes/games';
import puzzleRoutes from './routes/puzzles';
import userRoutes from './routes/users';
import statsRoutes from './routes/stats';
import openingsRoutes from './routes/openings';
import tutorialsRoutes from './routes/tutorials';
import aiOpponentsRoutes from './routes/ai-opponents';
import achievementsRoutes from './routes/achievements';
import learningRoutes from './routes/learning';
import analysisRoutes from './routes/analysis';
import helpRoutes from './routes/help';
import subscriptionsRoutes from './routes/subscriptions';
import profilesRoutes from './routes/profiles';
import gameReviewsRoutes from './routes/game-reviews';
import gameReviewMovesRoutes from './routes/game-review-moves';
import openingMovesRoutes from './routes/opening-moves';
import puzzleSourcesRoutes from './routes/puzzle-sources';
import userPuzzlePreferencesRoutes from './routes/user-puzzle-preferences';
import settingsRoutes from './routes/settings';
import notificationsRoutes from './routes/notifications';
import searchRoutes from './routes/search';
import progressRoutes from './routes/progress';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Allow for local development
  crossOriginEmbedderPolicy: false // Allow for Electron integration
}));

app.use(cors({
  origin: [
    'http://localhost:5173', // Vite dev server
    'http://localhost:3000', // Production build
    'file://', // Electron
    'app://' // Electron with custom protocol
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Swagger UI setup - serve at root /
app.use('/', swaggerUi.serve);
app.get('/', swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customSiteTitle: 'Chess Training API Documentation',
  customCss: `
    .swagger-ui .topbar { display: none; }
    .swagger-ui .info .title { color: #2c3e50; font-size: 2.5em; }
    .swagger-ui .info .description { font-size: 1.2em; color: #34495e; }
  `,
  customfavIcon: '/favicon.ico',
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    docExpansion: 'list',
    filter: true,
    showRequestHeaders: true,
    tryItOutEnabled: true
  }
}));

// Also serve swagger.json for API clients
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Comprehensive logging for troubleshooting - ALL requests, responses, and errors
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const requestId = Math.random().toString(36).substring(7);
  
  console.log(`\n🌐 [${timestamp}] [${requestId}] ${req.method} ${req.path}`);
  console.log(`📋 [${requestId}] Headers:`, JSON.stringify({
    'content-type': req.headers['content-type'],
    'authorization': req.headers.authorization ? '***Bearer token present***' : 'No auth header',
    'origin': req.headers.origin,
    'user-agent': req.headers['user-agent']?.substring(0, 80),
    'accept': req.headers.accept,
    'cache-control': req.headers['cache-control']
  }, null, 2));
  
  // Log ALL request bodies
  if (req.body && Object.keys(req.body).length > 0) {
    console.log(`📦 [${requestId}] Request Body:`, JSON.stringify(req.body, (key, value) => 
      key.toLowerCase().includes('password') ? '***hidden***' : value, 2));
  }
  
  // Log query parameters
  if (Object.keys(req.query).length > 0) {
    console.log(`🔍 [${requestId}] Query Params:`, JSON.stringify(req.query, null, 2));
  }
  
  // Store request ID for response logging
  (req as any).requestId = requestId;
  
  // Intercept ALL responses
  const originalSend = res.send;
  res.send = function(data) {
    const responseTime = Date.now() - new Date(timestamp).getTime();
    console.log(`\n📤 [${requestId}] Response ${res.statusCode} ${req.method} ${req.path} (${responseTime}ms)`);
    
    // Log ALL response bodies (truncate if too long)
    try {
      const responseData = typeof data === 'string' ? data : JSON.stringify(data);
      if (responseData.length > 1000) {
        console.log(`📄 [${requestId}] Response Body (truncated):`, responseData.substring(0, 1000) + '...');
      } else {
        console.log(`📄 [${requestId}] Response Body:`, responseData);
      }
    } catch (e) {
      console.log(`📄 [${requestId}] Response Body: [Unable to stringify response]`);
    }
    
    // Mark errors clearly
    if (res.statusCode >= 400) {
      console.log(`❌ [${requestId}] ERROR RESPONSE ${res.statusCode}`);
    } else {
      console.log(`✅ [${requestId}] SUCCESS RESPONSE ${res.statusCode}`);
    }
    
    console.log(`─────────────────────────────────────────────────────`);
    return originalSend.call(this, data);
  };
  
  next();
});

// System health endpoint
app.get('/api/system/health', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: '1.0.0'
    }
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/puzzles', puzzleRoutes);
app.use('/api/user', userRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/openings', openingsRoutes);
app.use('/api/tutorials', tutorialsRoutes);
app.use('/api/ai-opponents', aiOpponentsRoutes);
app.use('/api/achievements', achievementsRoutes);
app.use('/api/learning', learningRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/help', helpRoutes);
app.use('/api/subscriptions', subscriptionsRoutes);
app.use('/api/profiles', profilesRoutes);
app.use('/api/game-reviews', gameReviewsRoutes);
app.use('/api/game-review-moves', gameReviewMovesRoutes);
app.use('/api/opening-moves', openingMovesRoutes);
app.use('/api/puzzle-sources', puzzleSourcesRoutes);
app.use('/api/user-puzzle-preferences', userPuzzlePreferencesRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/progress', progressRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API info endpoint
app.get('/api', (req, res) => {
  res.json({
    success: true,
    name: 'Chess Training API',
    version: '1.0.0',
    description: 'Backend API for Chess Training POC',
    endpoints: {
      auth: '/api/auth',
      games: '/api/games',
      puzzles: '/api/puzzles',
      user: '/api/user',
      stats: '/api/stats',
      openings: '/api/openings',
      tutorials: '/api/tutorials',
      aiOpponents: '/api/ai-opponents',
      achievements: '/api/achievements',
      learning: '/api/learning',
      analysis: '/api/analysis',
      help: '/api/help',
      subscriptions: '/api/subscriptions',
      profiles: '/api/profiles',
      gameReviews: '/api/game-reviews',
      gameReviewMoves: '/api/game-review-moves',
      openingMoves: '/api/opening-moves',
      puzzleSources: '/api/puzzle-sources',
      userPuzzlePreferences: '/api/user-puzzle-preferences',
      settings: '/api/settings',
      notifications: '/api/notifications',
      search: '/api/search',
      progress: '/api/progress',
      health: '/api/health'
    }
  });
});

// Handle 404 for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'API endpoint not found'
  });
});

// Error handling middleware (must be last)
// Global error handler - catch ALL unhandled errors
app.use((err: any, req: any, res: any, next: any) => {
  const requestId = req.requestId || 'unknown';
  console.log(`\n💥 [${requestId}] UNHANDLED ERROR:`, {
    name: err.name,
    message: err.message,
    stack: err.stack?.split('\n').slice(0, 5), // First 5 lines of stack trace
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });
  
  if (!res.headersSent) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      requestId: requestId,
      timestamp: new Date().toISOString()
    });
  }
});

app.use(errorHandler);

// Process-level error handling
process.on('uncaughtException', (error) => {
  console.log('\n🚨 UNCAUGHT EXCEPTION:', {
    name: error.name,
    message: error.message,
    stack: error.stack?.split('\n').slice(0, 10),
    timestamp: new Date().toISOString()
  });
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('\n🚨 UNHANDLED PROMISE REJECTION:', {
    reason: reason,
    promise: promise,
    timestamp: new Date().toISOString()
  });
});

// Initialize database and start server
async function startServer() {
  try {
    console.log('Starting Chess Training API server...');
    
    // Initialize database
    const db = Database.getInstance();
    await db.connect();
    console.log('✓ Database connected and initialized');

    // Start server
    const server = app.listen(PORT, () => {
      console.log(`✓ Chess Training API running on port ${PORT}`);
      console.log(`✓ Health check: http://localhost:${PORT}/api/health`);
      console.log(`✓ API info: http://localhost:${PORT}/api`);
      
      if (process.env.NODE_ENV === 'development') {
        console.log('✓ Development mode - CORS enabled for localhost');
        console.log('✓ Request logging enabled');
      }
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM received, shutting down gracefully...');
      server.close(async () => {
        console.log('HTTP server closed');
        await db.close();
        console.log('Database connection closed');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      console.log('SIGINT received, shutting down gracefully...');
      server.close(async () => {
        console.log('HTTP server closed');
        await db.close();
        console.log('Database connection closed');
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
startServer();

export default app;