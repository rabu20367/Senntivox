// Simple test to debug the test environment
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

describe('Debug Test Environment', () => {
  beforeAll(async () => {
    // Start in-memory MongoDB server
    console.log('BeforeAll: Starting MongoMemoryServer...');
    try {
      mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();

      await mongoose.connect(mongoUri);
      console.log('MongoDB (memory server) connected successfully');
    } catch (error) {
      console.error('MongoDB memory server connection error:', error);
    }
  });

  afterAll(async () => {
    // Disconnect from MongoDB and stop in-memory server
    console.log('AfterAll: Stopping MongoMemoryServer...');
    await mongoose.disconnect();
    if (mongoServer) {
      await mongoServer.stop();
    }
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
