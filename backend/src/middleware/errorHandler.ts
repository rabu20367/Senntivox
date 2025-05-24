import { Request, Response, NextFunction } from 'express';

// Interface for error response
interface ErrorResponse {
  statusCode: number;
  message: string;
  stack?: string;
  name?: string;
}

// Error handler middleware
export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Default error status code
  const statusCode = err.statusCode || 500;
  
  // Default error message
  const message = err.message || 'Internal Server Error';

  // Send error response
  res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
};

// 404 Not Found handler
export const notFound = (req: Request, _res: Response, next: NextFunction): void => {
  const error = new Error(`Not Found - ${req.originalUrl}`) as ErrorResponse;
  error.statusCode = 404;
  next(error);
};
