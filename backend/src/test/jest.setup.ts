import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

// Set up in-memory database before tests
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

// Clear all test data after each test
afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

// Disconnect and close the in-memory database after all tests
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// Mock the config to use test environment
jest.mock('../config/config', () => ({
  config: {
    port: 5000,
    nodeEnv: 'test',
    mongoUri: 'mongodb://localhost:27017/test',
    jwt: {
      secret: 'testsecret',
      expiresIn: '1d',
      cookieExpire: 30
    },
    email: {
      host: 'smtp.test.com',
      port: 587,
      secure: false,
      user: 'test@test.com',
      pass: 'testpass'
    },
    frontendUrl: 'http://localhost:3000'
  }
}));
