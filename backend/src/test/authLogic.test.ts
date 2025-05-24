// Test authentication logic without making actual API calls
import { hashPassword, comparePasswords } from '../utils/auth';

describe('Authentication Logic', () => {
  describe('Password Hashing', () => {
    it('should hash a password', async () => {
      const password = 'testpassword';
      const hashed = await hashPassword(password);
      
      expect(hashed).toBeDefined();
      expect(hashed).not.toBe(password);
      expect(hashed.length).toBeGreaterThan(0);
    });

    it('should compare passwords correctly', async () => {
      const password = 'testpassword';
      const hashed = await hashPassword(password);
      
      const match = await comparePasswords(password, hashed);
      expect(match).toBe(true);
      
      const noMatch = await comparePasswords('wrongpassword', hashed);
      expect(noMatch).toBe(false);
    });
  });

  // Add more authentication logic tests here
});
