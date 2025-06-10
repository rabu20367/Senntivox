import rateLimit from 'express-rate-limit';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ErrorResponse } from '../utils/errorResponse';
import logger from '../utils/logger';

// Simple rate limiter factory function
const createRateLimiter = (options: {
  windowMs: number;
  max: number;
  message: string;
  skip?: (req: Request) => boolean;
}) => {
  const limiter = rateLimit({
    windowMs: options.windowMs,
    max: options.max,
    message: options.message,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, _res, next) => {
      logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
      next(new ErrorResponse(options.message, 429));
    }
  });
  
  // Add skip function if provided
  if (options.skip) {
    (limiter as any).skip = options.skip;
  }
  
  return limiter;
};

// Skip rate limiting for localhost and test environments
const skipRateLimit = (req: Request) => {
  const isLocalhost = req.ip === '127.0.0.1' || req.ip === '::1' || req.ip === '::ffff:127.0.0.1';
  return process.env.NODE_ENV === 'test' || isLocalhost;
};

// Rate limiting values from environment variables with sensible defaults
const DEFAULT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const DEFAULT_MAX = 100;
const RATE_LIMIT_WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '', 10) || DEFAULT_WINDOW_MS;
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || '', 10) || DEFAULT_MAX;

// API rate limiter
const apiLimiter = createRateLimiter({
  windowMs: RATE_LIMIT_WINDOW_MS,
  max: RATE_LIMIT_MAX,
  message: 'Too many requests from this IP, please try again after 15 minutes',
  skip: skipRateLimit
});

// More aggressive rate limiting for auth routes
const authLimiter = createRateLimiter({
  windowMs: RATE_LIMIT_WINDOW_MS,
  max: RATE_LIMIT_MAX,
  message: 'Too many login attempts, please try again after 15 minutes',
  skip: skipRateLimit
});

// Rate limiting for public API endpoints
const publicApiLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 1000, // Limit each IP to 1000 requests per hour
  message: 'Too many requests, please try again later',
  skip: skipRateLimit
});

// Rate limiting for sensitive operations (password reset, etc.)
const sensitiveOperationLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 requests per hour
  message: 'Too many attempts, please try again later',
  skip: skipRateLimit
});

// Wrapper function to apply rate limiting conditionally
export const conditionalRateLimit = (limiter: any): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (limiter.skip && limiter.skip(req)) {
      return next();
    }
    return limiter(req, res, next);
  };
};

export { 
  apiLimiter, 
  authLimiter, 
  publicApiLimiter, 
  sensitiveOperationLimiter 
};

// Middleware to check API key for external API access
export const apiKeyAuth = (req: Request, _res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'] || req.query.apiKey;
  
  if (!apiKey) {
    logger.warn('API key missing from request');
    return next(new ErrorResponse('API key is required', 401));
  }
  
  if (apiKey !== process.env.API_KEY) {
    logger.warn(`Invalid API key attempt from IP: ${req.ip}`);
    return next(new ErrorResponse('Invalid API key', 401));
  }
  
  next();
};
