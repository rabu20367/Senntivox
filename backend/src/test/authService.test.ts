import { hashPassword, comparePasswords } from '../utils/auth';

describe('Authentication Service', () => {
  describe('Password Hashing', () => {
    it('should hash a password', async () => {
      const password = 'testpassword123';
      const hashed = await hashPassword(password);
      
      expect(hashed).toBeDefined();
      expect(hashed).not.toBe(password);
      expect(hashed.length).toBeGreaterThan(0);
    });

    it('should compare passwords correctly', async () => {
      const password = 'testpassword123';
      const wrongPassword = 'wrongpassword';
      const hashed = await hashPassword(password);
      
      // Test correct password
      const isMatch = await comparePasswords(password, hashed);
      expect(isMatch).toBe(true);
      
      // Test wrong password
      const isWrongMatch = await comparePasswords(wrongPassword, hashed);
      expect(isWrongMatch).toBe(false);
    });
  });
});
