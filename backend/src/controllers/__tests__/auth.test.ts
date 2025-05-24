import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { register, login, getMe } from '../auth';
import User from '../../models/User';
import { testUser } from '../../test/__fixtures__/testData';

// Define a simple IUserRequest interface for testing
interface IUserRequest extends Request {
  user?: any; // Simplified for testing
}

// Mock the User model
jest.mock('../../models/User');

describe('Auth Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.MockedFunction<NextFunction>;
  let mockUser: any;

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Create a fresh mock user for each test
    mockUser = {
      _id: new mongoose.Types.ObjectId(),
      name: testUser.name,
      email: testUser.email,
      role: 'user',
      password: testUser.password,
      getSignedJwtToken: jest.fn().mockReturnValue('signed-jwt-token'),
      matchPassword: jest.fn().mockResolvedValue(true),
      save: jest.fn().mockResolvedValue(true)
    };
    
    // Mock User model methods
    (User as jest.Mocked<typeof User>).findOne = jest.fn();
    (User as jest.Mocked<typeof User>).create = jest.fn().mockResolvedValue(mockUser);
    
    // Setup request and response objects
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn() as jest.MockedFunction<NextFunction>;
  });

  describe('register', () => {
    it('should register a new user', async () => {
      // Mock User.findOne to return null (user doesn't exist)
      (User as jest.Mocked<typeof User>).findOne.mockResolvedValueOnce(null);
      
      // Setup request body
      req.body = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };

      await register(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        token: expect.any(String)
      });
      expect(User.create).toHaveBeenCalledWith({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });
    });
  });

  describe('login', () => {
    it('should login a user with valid credentials', async () => {
      // Mock User.findOne to return a user
      (User as jest.Mocked<typeof User>).findOne.mockResolvedValueOnce(mockUser);
      
      req.body = {
        email: 'test@example.com',
        password: 'password123'
      };

      await login(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        token: expect.any(String)
      });
    });

    it('should return 401 for invalid credentials', async () => {
      // Mock User.findOne to return null (user not found)
      (User as jest.Mocked<typeof User>).findOne.mockResolvedValueOnce(null);
      
      req.body = {
        email: 'nonexistent@example.com',
        password: 'wrongpassword'
      };

      await login(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
      const error = next.mock.calls[0][0] as unknown as Error & { statusCode?: number };
      expect(error.statusCode).toBe(401);
    });
  });

  describe('getMe', () => {
    it('should return the current user', async () => {
      const mockUserData = {
        _id: new mongoose.Types.ObjectId(),
        name: 'Test User',
        email: 'test@example.com',
        role: 'user',
        getSignedJwtToken: jest.fn().mockReturnValue('test-token'),
        matchPassword: jest.fn().mockResolvedValue(true)
      };

      const req = {
        user: mockUserData
      } as unknown as IUserRequest;

      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getMe(req as IUserRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: mockUserData
      });
    });
  });

  // Add more test cases for other controller methods...
});
