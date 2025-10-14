import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import env from './env.js';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import goldRoutes from './routes/goldRoutes.js';

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: env.CORS_ORIGIN,
  credentials: true,
}));
// Configure Morgan logging format based on environment
app.use(morgan( env.isProd ? 'combined' : 'dev', {
  skip: () => env.isTest, // Skip logging in test environment
}));
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/gold', goldRoutes);

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        message: 'Server is running'
    });
});

// Detailed health check
app.get('/health/detailed', async (req, res) => {
    try {
      // Check database connection
      await db.raw('SELECT 1')
      
      // Check external services
      const redisStatus = await redis.ping()
      
      res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        services: {
          database: 'connected',
          redis: redisStatus === 'PONG' ? 'connected' : 'disconnected',
        },
        version: process.env.APP_VERSION,
        uptime: process.uptime(),
      })
    } catch (error) {
      res.status(503).json({
        status: 'ERROR',
        message: 'Service unhealthy',
        error: error.message,
      })
    }
})

// 404 - Catch all for unmatched API routes
app.use('/api', (req, res) => {
    res.status(404).json({
      error: 'Not Found',
      message: `Cannot ${req.method} ${req.originalUrl}`,
      timestamp: new Date().toISOString(),
    })
})
  
export default app;
