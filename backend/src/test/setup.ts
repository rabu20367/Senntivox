import { config } from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

// Extend NodeJS global type
declare global {
  // eslint-disable-next-line no-var
  var __MONGO_SERVER__: MongoMemoryServer | undefined;
}

// Load environment variables
config({ path: '.env.test' });

// Set test environment variables
process.env.NODE_ENV = 'test';

/**
 * Global test setup function for Jest
 * This runs once before all tests start
 */
async function globalSetup() {
  try {
    // Start MongoDB in-memory server
    const instance = await MongoMemoryServer.create({
      instance: {
        port: 27017, // Use default MongoDB port for testing
        dbName: 'testdb',
      },
      binary: {
        version: '4.4.1', // Specify MongoDB version for consistency
      },
    });

    // Set the MongoDB URI for testing
    const uri = instance.getUri();
    process.env.MONGO_URI = uri.endsWith('/') ? `${uri}test` : `${uri}/test`;

    // Store the instance globally for teardown
    global.__MONGO_SERVER__ = instance;

    // Configure mongoose options
    const mongooseOpts = {
      serverSelectionTimeoutMS: 10000, // Increase timeout for CI environments
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    };

    // Connect to the in-memory database
    await mongoose.connect(process.env.MONGO_URI, mongooseOpts);

    // Set mongoose Promise
    mongoose.Promise = global.Promise;

    // Get the default connection
    const db = mongoose.connection;

    // Bind connection to error event
    db.on('error', (error) => {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    });

    // Log successful connection
    db.once('open', () => {
      console.log('Connected to MongoDB in-memory server');
    });

    // Handle process termination
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        if (global.__MONGO_SERVER__) {
          await global.__MONGO_SERVER__.stop({ doCleanup: true });
        }
        process.exit(0);
      } catch (error) {
        console.error('Error during cleanup:', error);
        process.exit(1);
      }
    });
  } catch (error) {
    console.error('Error setting up test environment:', error);
    process.exit(1);
  }
}

// Export for CommonJS compatibility (Jest expects this)
module.exports = globalSetup;
export default globalSetup;
