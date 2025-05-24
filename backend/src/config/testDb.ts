import mongoose from 'mongoose';

const TEST_MONGO_URI = 'mongodb://localhost:27017/sentivox-test';

export const connectTestDB = async () => {
  try {
    // Close any existing connections to avoid test interference
    await mongoose.disconnect();
    
    // Connect to the test database
    const conn = await mongoose.connect(TEST_MONGO_URI);
    
    console.log(`MongoDB Test DB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Test DB Error: ${error.message}`);
    } else {
      console.error('An unknown error occurred with the test database');
    }
    process.exit(1);
  }
};

export const closeTestDB = async () => {
  try {
    // Drop the test database
    await mongoose.connection.dropDatabase();
    // Close the connection
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error closing test database:', error);
    throw error;
  }
};

export const clearTestDB = async () => {
  try {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  } catch (error) {
    console.error('Error clearing test database:', error);
    throw error;
  }
};
