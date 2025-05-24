// Test data and fixtures for testing
export const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123',
  role: 'user',
};

export const testAdmin = {
  name: 'Admin User',
  email: 'admin@example.com',
  password: 'admin123',
  role: 'admin',
};

export const invalidUser = {
  name: '',
  email: 'invalid-email',
  password: 'short',
};

export const mockConversation = {
  userId: '507f1f77bcf86cd799439011',
  title: 'Test Conversation',
  messages: [
    {
      role: 'user',
      content: 'Hello, how are you?',
      timestamp: new Date(),
    },
  ],
};

export const generateRandomEmail = () => {
  return `test-${Math.random().toString(36).substring(2, 10)}@example.com`;
};

export const generateRandomString = (length: number) => {
  return Math.random().toString(36).substring(2, length + 2);
};
