// Simple test file to verify Jest is working
import { describe, it, expect } from '@jest/globals';

describe('Basic Test Suite', () => {
  it('should pass a basic assertion', () => {
    const result = 1 + 1;
    console.log('Basic assertion test: 1 + 1 =', result);
    expect(result).toBe(2);
  });

  it('should have test environment set up', () => {
    console.log('NODE_ENV:', process.env.NODE_ENV);
    expect(process.env.NODE_ENV).toBe('test');
  });

  it('should pass another simple test', () => {
    expect(true).toBe(true);
  });
});
