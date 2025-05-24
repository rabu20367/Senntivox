import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import { connectDB } from './config/db';
import errorHandler from './middleware/error';
import logger from './utils/logger';
import { conditionalRateLimit, publicApiLimiter } from './middleware/rateLimiter';

// Import routes
import authRoutes from './routes/auth';
import healthRoutes from './routes/health';

// Load environment variables
require('dotenv').config();

// Connect to database
connectDB();

// Initialize express
const app = express();

// Set security headers
app.use(helmet());

// Enable CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

// Body parser
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Cookie parser
app.use(cookieParser());

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Use winston for logging in production
app.use((req: Request, _res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

// Rate limiting for all routes
app.use(conditionalRateLimit(publicApiLimiter));

// Mount routers
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', healthRoutes);

// Root route
app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Sentivox API',
    version: '1.0.0',
    documentation: 'Please use /api/v1/ endpoints',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Test route
app.get('/api/v1/test', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'API is working!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../public')));

  // Handle SPA
  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
  });
}

// Error handling middleware
app.use(errorHandler);

// Handle 404
app.use((_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({
    success: false,
    error: 'Not found',
  });
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

export { server, app };

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  console.error(`Unhandled Rejection: ${err.message}`);
  
  // Close server & exit process
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  logger.error(`Uncaught Exception: ${err.message}`);
  console.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

export default app;
