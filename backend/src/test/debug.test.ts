// Simple test to debug the test environment
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import mongoose from 'mongoose';

describe('Debug Test Environment', () => {
  beforeAll(async () => {
    // Check if we can connect to MongoDB
    console.log('BeforeAll: Checking MongoDB connection...');
    try {
      await mongoose.connect('mongodb://localhost:27017/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as any);
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('MongoDB connection error:', error);
    }
  });

  afterAll(async () => {
    // Disconnect from MongoDB
    console.log('AfterAll: Disconnecting from MongoDB...');
    await mongoose.disconnect();
  });

  it('should pass a simple test', () => {
    console.log('Running simple test...');
    expect(1 + 1).toBe(2);
  });

  it('should have a valid MongoDB connection', () => {
    console.log('Checking MongoDB connection state...');
    const state = mongoose.connection.readyState;
    console.log('MongoDB connection state:', state);
    // 1 = connected, 2 = connecting, 3 = disconnecting, 0 = disconnected
    expect(state).toBe(1);
  });
});
