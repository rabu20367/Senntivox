import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { describe, beforeAll, afterAll, afterEach, it, expect } from '@jest/globals';
import { app } from '../server';

// Extend the default timeout for tests
jest.setTimeout(60000);

const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123',
};

// Use a different port for testing to avoid conflicts
const TEST_PORT = 5001;
process.env.PORT = TEST_PORT.toString();

describe('Auth API Integration Tests', () => {
  const baseUrl = `http://localhost:${TEST_PORT}/api/v1`;

  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    // Create a new MongoDB Memory Server instance
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    // Connect to the in-memory database
    await mongoose.connect(mongoUri);
  });

  afterEach(async () => {
    // Clear all test data after each test
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  afterAll(async () => {
    // Close the mongoose connection and stop the MongoDB Memory Server
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  describe('POST /auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post(`${baseUrl}/auth/register`)
        .send(testUser);

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBeDefined();
      expect(res.body.user.email).toBe(testUser.email);
      expect(res.body.user.name).toBe(testUser.name);
    });

    it('should return 400 if email is already registered', async () => {
      // First register a user
      await request(app)
        .post(`${baseUrl}/auth/register`)
        .send(testUser);

      // Try to register the same user again
      const res = await request(app)
        .post(`${baseUrl}/auth/register`)
        .send(testUser);

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('POST /auth/login', () => {
    beforeEach(async () => {
      // Register a user first
      await request(app)
        .post(`${baseUrl}/auth/register`)
        .send(testUser);
    });

    it('should login an existing user', async () => {
      const res = await request(app)
        .post(`${baseUrl}/auth/login`)
        .send({
          email: testUser.email,
          password: testUser.password,
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBeDefined();
      expect(res.body.user.email).toBe(testUser.email);
    });

    it('should return 401 for invalid credentials', async () => {
      const res = await request(app)
        .post(`${baseUrl}/auth/login`)
        .send({
          email: testUser.email,
          password: 'wrongpassword',
        });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /auth/me', () => {
    let token: string;

    beforeEach(async () => {
      // Register and login a user
      await request(app)
        .post(`${baseUrl}/auth/register`)
        .send(testUser);

      const loginRes = await request(app)
        .post(`${baseUrl}/auth/login`)
        .send({
          email: testUser.email,
          password: testUser.password,
        });

      token = loginRes.body.token;
    });

    it('should get current user profile', async () => {
      const res = await request(app)
        .get(`${baseUrl}/auth/me`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.email).toBe(testUser.email);
      expect(res.body.data.name).toBe(testUser.name);
    });

    it('should return 401 if no token provided', async () => {
      const res = await request(app).get(`${baseUrl}/auth/me`);
      expect(res.status).toBe(401);
    });
  });
});
