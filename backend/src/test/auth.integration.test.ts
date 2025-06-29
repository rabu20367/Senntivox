import request from 'supertest';
import { describe, beforeEach, it, expect } from '@jest/globals';
import app from '../app';
import User from '../models/User';

// Test user data
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

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('token');
    });

    it('should not register a user with duplicate email', async () => {
      // First registration
      await request(app)
        .post(`${baseUrl}/auth/register`)
        .send(testUser);

      // Second registration with same email
      const res = await request(app)
        .post(`${baseUrl}/auth/register`)
        .send(testUser);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('success', false);
    });
  });

  describe('POST /auth/login', () => {
    beforeEach(async () => {
      // Register a test user
      await request(app)
        .post(`${baseUrl}/auth/register`)
        .send(testUser);
    });

    it('should login a registered user', async () => {
      const res = await request(app)
        .post(`${baseUrl}/auth/login`)
        .send({
          email: testUser.email,
          password: testUser.password,
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('token');
    });

    it('should not login with invalid credentials', async () => {
      const res = await request(app)
        .post(`${baseUrl}/auth/login`)
        .send({
          email: testUser.email,
          password: 'wrongpassword',
        });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('success', false);
    });
  });

  describe('GET /auth/me', () => {
    let authToken: string;

    beforeEach(async () => {
      // Register and login a test user
      await request(app)
        .post(`${baseUrl}/auth/register`)
        .send(testUser);

      const loginRes = await request(app)
        .post(`${baseUrl}/auth/login`)
        .send({
          email: testUser.email,
          password: testUser.password,
        });

      authToken = loginRes.body.token;
    });

    it('should get current user profile with valid token', async () => {
      const res = await request(app)
        .get(`${baseUrl}/auth/me`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.data).toHaveProperty('email', testUser.email);
      expect(res.body.data).not.toHaveProperty('password');
    });

    it('should not get profile without token', async () => {
      const res = await request(app)
        .get(`${baseUrl}/auth/me`);

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('success', false);
    });
  });
});
