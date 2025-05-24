import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User';
import logger from './logger';

// Load environment variables
dotenv.config();

// Connect to database
const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/sentivox';
    await mongoose.connect(mongoUri);
    logger.info('MongoDB Connected...');
  } catch (err) {
    logger.error('Database connection error:', err);
    process.exit(1);
  }
};

// Clear existing data
const clearData = async (): Promise<void> => {
  try {
    await User.deleteMany({});
    logger.info('Data cleared successfully');
  } catch (err) {
    logger.error('Error clearing data:', err);
    process.exit(1);
  }
};

// Hash password helper
const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Seed users
const seedUsers = async (): Promise<void> => {
  try {
    // Create admin user
    const admin = new User({
      name: 'Admin User',
      email: 'admin@sentivox.com',
      password: await hashPassword('admin123'),
      role: 'admin',
      isEmailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Create regular users
    const users = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: await hashPassword('password123'),
        role: 'user',
        isEmailVerified: true
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: await hashPassword('password123'),
        role: 'user',
        isEmailVerified: false
      },
      {
        name: 'Test User',
        email: 'test@example.com',
        password: await hashPassword('test123'),
        role: 'user',
        isEmailVerified: true
      }
    ];

    // Save admin user
    await admin.save();
    logger.info('Admin user created successfully');

    // Save regular users
    const createdUsers = await User.insertMany(users);
    logger.info(`${createdUsers.length} regular users created successfully`);

    logger.info('Users seeded successfully');
  } catch (err) {
    logger.error('Error seeding users:', err);
    process.exit(1);
  }
};

// Main seed function
const seedDB = async (): Promise<void> => {
  try {
    logger.info('Starting database seeding...');
    
    await connectDB();
    await clearData();
    await seedUsers();
    
    logger.info('Database seeded successfully');
    process.exit(0);
  } catch (err) {
    logger.error('Error seeding database:', err);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  logger.error('Unhandled Rejection:', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  logger.error('Uncaught Exception:', err);
  process.exit(1);
});

// Run the seed function
seedDB();
