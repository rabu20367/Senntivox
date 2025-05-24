import { Request, Response, NextFunction } from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { testUser, testAdmin } from '../__fixtures__/testData';

// Mock Express Request
export const mockRequest = (options: Partial<Request> = {}): Partial<Request> => ({
  body: {},
  params: {},
  query: {},
  headers: {},
  ...options,
});

// Mock Express Response
export const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

// Mock Express Next Function
export const mockNext: NextFunction = jest.fn();

// Generate JWT Token
export const generateAuthToken = (userId: string, role = 'user'): string => {
  return jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET || 'test-secret',
    { expiresIn: '1h' }
  );
};

// Setup Test Database
export const setupTestDB = async (): Promise<MongoMemoryServer> => {
  const mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
  return mongoServer;
};

// Clear Test Database
export const clearTestDB = async (): Promise<void> => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};

// Close Test Database
export const closeTestDB = async (mongoServer: MongoMemoryServer): Promise<void> => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};

// Generate Test User
export const createTestUser = async (userData = {}) => {
  const User = (await import('../../models/User')).default;
  const user = new User({
    ...testUser,
    ...userData,
  });
  await user.save();
  return user;
};

// Generate Test Admin
export const createTestAdmin = async () => {
  return createTestUser(testAdmin);
};
