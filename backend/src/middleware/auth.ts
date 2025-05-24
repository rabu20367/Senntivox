import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { IUserRequest } from '../types/express';

// Protect routes
export const protect = async (req: IUserRequest, res: Response, next: NextFunction): Promise<void> => {
  let token: string | undefined;

  if (
    req.headers.authorization && 
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  } 
  // Set token from cookie
  else if (req.cookies?.token) {
    token = req.cookies.token as string;
  }

  // Make sure token exists
  if (!token) {
    res.status(401).json({ success: false, error: 'Not authorized to access this route' });
    return;
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    
    // Get user from the token
    const user = await User.findById(decoded.id).select('-password').exec();
    
    if (!user) {
      res.status(401).json({ success: false, error: 'Not authorized, user not found' });
      return;
    }

    // Add user to request object
    (req as any).user = user;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.status(401).json({ success: false, error: 'Not authorized, token failed' });
  }
};

// Grant access to specific roles
export const authorize = (...roles: string[]) => {
  return (req: IUserRequest, res: Response, next: NextFunction): void => {
    // Check if user is authenticated
    if (!req.user) {
      res.status(401).json({ 
        success: false, 
        error: 'Not authorized to access this route' 
      });
      return;
    }
    
    // Check if user role is authorized
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ 
        success: false, 
        error: `User role ${req.user.role} is not authorized to access this route` 
      });
      return;
    }
    
    next();
  };
};
