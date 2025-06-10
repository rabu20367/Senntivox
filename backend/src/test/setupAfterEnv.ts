import mongoose from 'mongoose';
import { clearTestDB } from './__utils__/testUtils';

/**
 * Ensures that the mongoose connection is fully open before
 * attempting to clear the test database. This prevents errors
 * when tests start before the connection is ready.
 */
async function waitForConnection(): Promise<void> {
  if (mongoose.connection.readyState === 1) return;
  await new Promise<void>((resolve) => {
    mongoose.connection.once('open', () => resolve());
  });
}

// Set up the test environment before all tests
beforeAll(async () => {
  // Set test environment
  process.env.NODE_ENV = 'test';
  
  // Mock console methods to reduce test noise
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'debug').mockImplementation(() => {});

  // Set JWT secret for testing
  process.env.JWT_SECRET = 'test-secret';
  process.env.JWT_EXPIRE = '1h';
  process.env.JWT_COOKIE_EXPIRE = '30';
});

// Clean up database between tests
afterEach(async () => {
  await waitForConnection();
  await clearTestDB();
  jest.clearAllMocks();
});

// Clean up after all tests are done
afterAll(async () => {
  jest.restoreAllMocks();
});

// Mock the logger to prevent logging during tests
jest.mock('../utils/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
  http: jest.fn()
}));

// Mock the sendEmail utility to prevent actual emails from being sent
jest.mock('../utils/sendEmail', () => ({
  sendEmail: jest.fn().mockResolvedValue(true),
}));
