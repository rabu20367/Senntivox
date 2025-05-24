import { Request, Response, NextFunction } from 'express';
import { sign, SignOptions } from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User, { IUser } from '../models/User';

// Simplified MockResponse type for testing
interface MockResponse extends Omit<Response, keyof Response> {
  status: jest.Mock<this, [code: number]>;
  json: jest.Mock<this, [body?: any]>;
  send: jest.Mock<this, [body?: any]>;
  cookie: jest.Mock<this, [name: string, val: string, options?: any]>;
  clearCookie: jest.Mock<this, [name: string, options?: any]>;
  set: jest.Mock<this, [field: string, value?: string | string[]]>;
  end: jest.Mock<this, [data?: any, encoding?: any, cb?: () => void]>;
  redirect: jest.Mock<this, [url: string]>;
  sendStatus: jest.Mock<this, [statusCode: number]>;
  type: jest.Mock<this, [type: string]>;
  format: jest.Mock<this, [obj: any]>;
  attachment: jest.Mock<this, [filename?: string]>;
  download: jest.Mock<Response, any>; // Simplified to avoid complex type issues
  links: jest.Mock<this, [links: any]>;
  location: jest.Mock<this, [path: string]>;
  vary: jest.Mock<this, [field: string]>;
  headersSent: boolean;
  locals: Record<string, any>;
  [key: string]: any;
}

/**
 * Creates a mock Express request object
 */
export const mockRequest = (
  body: any = {},
  params: any = {},
  query: any = {},
  headers: any = {},
  cookies: any = {}
): Request => {
  return {
    body,
    params,
    query,
    headers: {
      'user-agent': 'jest-test',
      ...headers,
    },
    cookies,
    get(name: string) {
      return headers[name.toLowerCase()] || null;
    },
    // Add other required Express request methods with default implementations
    accepts: jest.fn().mockReturnValue(true),
    acceptsCharsets: jest.fn().mockReturnValue(['utf-8']),
    acceptsEncodings: jest.fn().mockReturnValue(['gzip', 'deflate']),
    acceptsLanguages: jest.fn().mockReturnValue(['en']),
    header: jest.fn((name: string) => headers[name.toLowerCase()]),
    is: jest.fn().mockReturnValue('application/json'),
    protocol: 'http',
    secure: false,
    ip: '::1',
    ips: ['::1'],
    path: '/',
    hostname: 'localhost',
    method: 'GET',
    originalUrl: '/',
    xhr: false,
  } as unknown as Request;
};

/**
 * Creates a mock Express response object
 */
export const mockResponse = (): MockResponse => {
  const res = {} as MockResponse;
  
  // Mock response methods
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.cookie = jest.fn().mockReturnValue(res);
  res.clearCookie = jest.fn().mockReturnValue(res);
  res.set = jest.fn().mockReturnValue(res);
  res.end = jest.fn().mockReturnValue(res);
  
  // Add other commonly used response methods
  res.redirect = jest.fn().mockReturnValue(res);
  res.sendStatus = jest.fn().mockReturnValue(res);
  res.type = jest.fn().mockReturnValue(res);
  res.format = jest.fn().mockReturnValue(res);
  res.attachment = jest.fn().mockReturnValue(res);
  res.download = jest.fn().mockReturnValue(res);
  res.links = jest.fn().mockReturnValue(res);
  res.location = jest.fn().mockReturnValue(res);
  res.vary = jest.fn().mockReturnValue(res);
  
  // Add response properties
  res.headersSent = false;
  res.locals = {};
  
  return res;
};

/**
 * Creates a mock Express next function
 */
export const mockNext = (): jest.Mock<NextFunction> => {
  return jest.fn() as unknown as jest.Mock<NextFunction>;
};

/**
 * Creates a test user in the database
 */
export const createTestUser = async (userData: Partial<IUser> = {}): Promise<{ user: IUser; token: string }> => {
  const hashedPassword = await bcrypt.hash(userData.password || 'test1234', 10);
  
  const user = await User.create({
    name: 'Test User',
    email: `test-${Date.now()}@example.com`,
    password: hashedPassword,
    role: 'user',
    ...userData
  });

  // Generate token
  const token = sign(
    { id: user._id.toString(), role: user.role },
    process.env.JWT_SECRET || 'test-secret',
    { expiresIn: process.env.JWT_EXPIRE || '30d' } as SignOptions
  );
  
  return { user, token };
};

/**
 * Generates a JWT token for testing
 */
export const generateAuthToken = (userId: string | mongoose.Types.ObjectId, role: string = 'user'): string => {
  return sign(
    { id: userId.toString(), role },
    process.env.JWT_SECRET || 'your_jwt_secret',
    { expiresIn: process.env.JWT_EXPIRE || '30d' } as any
  );
};

/**
 * Clears all collections in the test database
 */
export const clearTestDatabase = async (): Promise<void> => {
  const collections = mongoose.connection.collections;
  
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};

/**
 * Waits for a specified number of milliseconds
 */
export const wait = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Creates a mock authenticated request
 */
export const createAuthenticatedRequest = async (
  userData: Partial<IUser> = {},
  requestData: {
    body?: any;
    params?: any;
    query?: any;
    headers?: any;
    cookies?: any;
  } = {}
) => {
  const { user, token } = await createTestUser(userData);
  
  return {
    req: mockRequest(
      requestData.body || {},
      requestData.params || {},
      requestData.query || {},
      {
        ...requestData.headers,
        authorization: `Bearer ${token}`,
      },
      {
        ...requestData.cookies,
        token,
      }
    ),
    user,
    token,
  };
};
