import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

declare global {
  // eslint-disable-next-line no-var
  var __MONGO_SERVER__: MongoMemoryServer | undefined;
}

/**
 * Global teardown function for tests
 * Cleans up MongoDB connections and in-memory server
 */
async function globalTeardown() {
  try {
    // Disconnect from MongoDB if connected
    if (mongoose.connection.readyState !== 0) { // 0 = disconnected
      await mongoose.disconnect();
    }
    
    // Stop the in-memory MongoDB server if it exists
    if (global.__MONGO_SERVER__) {
      try {
        // Use the force option as a separate object to satisfy TypeScript
        await global.__MONGO_SERVER__.stop({ doCleanup: true, force: true });
      } catch (error) {
        console.error('Error stopping MongoDB server:', error);
      } finally {
        global.__MONGO_SERVER__ = undefined;
      }
    }
  } catch (error) {
    console.error('Error during teardown:', error);
    throw error; // Ensure the test fails if teardown fails
  }
}

// Export for CommonJS compatibility
module.exports = globalTeardown;

// Export for ES modules
export default globalTeardown;
