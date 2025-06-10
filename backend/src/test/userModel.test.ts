import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

describe('User Model', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    // Start MongoDB Memory Server
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    // Connect to the in-memory database
    await mongoose.connect(mongoUri);
  });

  afterEach(async () => {
    // Clear all test data after each test
    await User.deleteMany({});
  });

  afterAll(async () => {
    // Close the mongoose connection and stop the MongoDB Memory Server
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('should create and save a user successfully', async () => {
    const userData: Partial<IUser> = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'testpassword123',
      role: 'user' as const
    };

    const user = new User(userData);
    const savedUser = await user.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.password).not.toBe(userData.password); // Should be hashed
    expect(savedUser.role).toBe('user');
    expect(savedUser.isEmailVerified).toBe(false);
  });

  it('should allow setting email verification status', async () => {
    const userData: Partial<IUser> = {
      name: 'Verified User',
      email: 'verified@example.com',
      password: 'securepassword',
      role: 'user',
      isEmailVerified: true,
    };

    const user = new User(userData);
    const savedUser = await user.save();

    expect(savedUser.isEmailVerified).toBe(true);
  });

  it('should not save a user without required fields', async () => {
    let error: mongoose.Error.ValidationError | undefined;
    try {
      const user = new User({ name: '', email: 'invalid-email', password: '123' });
      await user.validate();
    } catch (err) {
      error = err as mongoose.Error.ValidationError;
    }

    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    if (error instanceof mongoose.Error.ValidationError) {
      expect(error.errors.name).toBeDefined();
      expect(error.errors.email).toBeDefined();
      expect(error.errors.password).toBeDefined();
    }
  });

  it('should not save a user with duplicate email', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'testpassword123',
      role: 'user' as const
    };

    // Save first user
    const user1 = new User(userData);
    await user1.save();

    // Try to save second user with same email
    let error: Error & { code?: number } | undefined;
    try {
      await User.create(userData);
    } catch (err) {
      error = err as Error & { code?: number };
    }

    expect(error).toBeDefined();
    expect(error?.code).toBe(11000); // Duplicate key error
  });

  it('should match passwords correctly', async () => {
    const password = 'testpassword123';
    const user = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: password,
      role: 'user' as const
    });

    await user.save();

    // Test correct password
    const isMatch = await user.matchPassword(password);
    expect(isMatch).toBe(true);

    // Test wrong password
    const isWrongMatch = await user.matchPassword('wrongpassword');
    expect(isWrongMatch).toBe(false);
  });

  it('should generate a signed JWT token', async () => {
    const user = new User({
      name: 'JWT User',
      email: 'jwt@example.com',
      password: 'jwtpassword',
      role: 'user' as const
    });

    await user.save();

    const token = user.getSignedJwtToken();
    expect(typeof token).toBe('string');

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };
    expect(decoded.id).toBe(user._id.toString());
  });
});
