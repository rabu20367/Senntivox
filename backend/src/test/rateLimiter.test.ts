import { describe, it, expect, beforeEach } from '@jest/globals';
import { mockRequest, mockResponse } from './testUtils';

let authLimiter: any;

const loadLimiter = () => {
  jest.resetModules();
  authLimiter = require('../middleware/rateLimiter').authLimiter;
};

// helper to run limiter
const runLimiter = async (req: any, res: any) => new Promise((resolve) => {
  authLimiter(req, res, (err?: any) => resolve(err));
});

describe('Auth rate limiter environment variables', () => {
  beforeEach(() => {
    process.env.NODE_ENV = 'development';
    process.env.RATE_LIMIT_WINDOW_MS = '1000';
    process.env.RATE_LIMIT_MAX = '2';
    loadLimiter();
  });

  it('limits requests based on RATE_LIMIT_MAX', async () => {
    const res = mockResponse();
    const req = mockRequest();
    req.ip = '1.1.1.1';

    const err1 = await runLimiter(req, res);
    expect(err1).toBeUndefined();
    const err2 = await runLimiter(req, res);
    expect(err2).toBeUndefined();
    const err3 = await runLimiter(req, res);
    expect(err3).toBeInstanceOf(Error);
    // Should indicate rate limit exceeded
    expect((err3 as any).statusCode).toBe(429);
  });
});
