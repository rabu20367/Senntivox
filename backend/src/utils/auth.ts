import bcrypt from 'bcryptjs';
import { IUser } from '../models/User';

/**
 * Hashes a password using bcrypt
 * @param password The password to hash
 * @returns A promise that resolves to the hashed password
 */
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

/**
 * Compares a plain text password with a hashed password
 * @param password The plain text password
 * @param hashedPassword The hashed password to compare against
 * @returns A promise that resolves to a boolean indicating if the passwords match
 */
export const comparePasswords = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

/**
 * Generates a JWT token for a user
 * @param user The user object
 * @returns A JWT token
 */
export const generateToken = (user: IUser): string => {
  // In a real application, you would use a JWT library here
  // This is a simplified version for testing
  return `token-${user._id}-${Date.now()}`;
};

export default {
  hashPassword,
  comparePasswords,
  generateToken,
};
