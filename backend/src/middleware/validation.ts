import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain, body, param, query } from 'express-validator';
import { ErrorResponse } from '../utils/errorResponse';

declare global {
  namespace Express {
    interface Request {
      files?: any;
    }
  }
}

// Middleware function that validates the request against the provided validation chains
export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const errorMessages = errors.array().map(err => ({
      [(err as any).param]: err.msg
    }));

    return next(new ErrorResponse('Validation failed', 400, errorMessages));
  };
};

// Common validation chains
export const commonValidations = {
  email: () => 
    body('email')
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage('Please provide a valid email address'),
      
  password: (field = 'password', min = 6) => 
    body(field)
      .isLength({ min })
      .withMessage(`Password must be at least ${min} characters long`)
      .matches(/\d/)
      .withMessage('Password must contain at least one number')
      .matches(/[a-z]/)
      .withMessage('Password must contain at least one lowercase letter')
      .matches(/[A-Z]/)
      .withMessage('Password must contain at least one uppercase letter'),
      
  name: (field = 'name') => 
    body(field)
      .trim()
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ max: 50 })
      .withMessage('Name cannot be longer than 50 characters'),
      
  objectId: (field: string, name: string) => 
    param(field)
      .isMongoId()
      .withMessage(`Invalid ${name} ID format`),
      
  pagination: () => ({
    page: query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Page must be a positive integer')
      .toInt(),
    limit: query('limit')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('Limit must be between 1 and 100')
      .toInt()
  })
};

// Helper function to validate file uploads
export const validateFile = (field: string, allowedTypes: string[], maxSizeMB: number) => 
  (req: Request, _res: Response, next: NextFunction) => {
    if (!req.files || !req.files[field]) {
      return next(new ErrorResponse(`Please upload a file for ${field}`, 400));
    }

    const file = Array.isArray(req.files[field]) 
      ? req.files[field][0] 
      : req.files[field];

    // Check file type
    if (!allowedTypes.includes(file.mimetype)) {
      return next(
        new ErrorResponse(
          `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`,
          400
        )
      );
    }

    // Check file size (in bytes)
    const maxSize = maxSizeMB * 1024 * 1024;
    if (file.size > maxSize) {
      return next(
        new ErrorResponse(
          `File size too large. Maximum size is ${maxSizeMB}MB`,
          400
        )
      );
    }

    next();
  };

// Middleware to validate query parameters
export const validateQueryParams = (validations: Record<string, any>) => 
  (req: Request, _res: Response, next: NextFunction) => {
    const errors: Record<string, string> = {};
    
    Object.entries(validations).forEach(([param, validation]) => {
      if (validation.required && !req.query[param]) {
        errors[param] = `${param} is required`;
      }
      
      if (req.query[param] && validation.type === 'number') {
        const num = Number(req.query[param]);
        if (isNaN(num)) {
          errors[param] = `${param} must be a number`;
        } else if (validation.min !== undefined && num < validation.min) {
          errors[param] = `${param} must be at least ${validation.min}`;
        } else if (validation.max !== undefined && num > validation.max) {
          errors[param] = `${param} must be at most ${validation.max}`;
        }
      }
      
      if (req.query[param] && validation.type === 'string' && validation.enum) {
        if (!validation.enum.includes(req.query[param])) {
          errors[param] = `${param} must be one of: ${validation.enum.join(', ')}`;
        }
      }
    });
    
    if (Object.keys(errors).length > 0) {
      return next(new ErrorResponse('Invalid query parameters', 400, errors));
    }
    
    next();
  };
