import request from 'supertest';
import { describe, beforeEach, it, expect } from '@jest/globals';
import app from '../app';

// Extend the default timeout for tests
jest.setTimeout(60000);

const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123',
};

describe('Auth API Integration Tests', () => {
  const baseUrl = '/api/v1';



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
