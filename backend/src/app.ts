import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { Database } from './utils/database';
import { errorHandler } from './middleware/errorHandler';

// Route imports
import authRoutes from './routes/auth';
import gameRoutes from './routes/games';
import puzzleRoutes from './routes/puzzles';
import userRoutes from './routes/users';
import statsRoutes from './routes/stats';

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

// Request logging in development
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
  });
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/puzzles', puzzleRoutes);
app.use('/api/user', userRoutes);
app.use('/api/stats', statsRoutes);

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
app.use(errorHandler);

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