# Senntivox Backend

Backend API for the Senntivox application, built with Node.js, Express, TypeScript, and MongoDB. This application provides the necessary APIs for user authentication, profile management, and other core functionalities of the Senntivox platform.

## 🚀 Features

- **User Authentication** (register, login, logout)
- **Password Management** (reset, update, forgot password)
- **Rate Limiting** to prevent abuse
- **Request Validation** using express-validator
- **Error Handling** with custom error responses
- **Logging** with Winston
- **Testing** with Jest and Supertest
- **Docker** support for containerization
- **MongoDB** for data storage
- **JWT** for authentication
- **TypeScript** for type safety
- **Environment-based** configuration
- **Health Check** endpoints
- **API Documentation** (Swagger/OpenAPI)

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher) or yarn (v1.22 or higher)
- MongoDB (v6.0 or higher) or MongoDB Atlas
- Docker and Docker Compose (optional, for containerization)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sentivox.git
   cd sentivox/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Set up environment variables**
   Copy the example environment file and update the values:
   ```bash
   cp .env.example .env
   ```
   Then edit the `.env` file with your configuration.

## 🔧 Configuration

Edit the `.env` file with your configuration. Here's an example:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# Database
MONGO_URI=mongodb://localhost:27017/sentivox

# JWT Authentication
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30

# Email Configuration
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
EMAIL_FROM='Senntivox <noreply@senntivox.com>'

# Frontend URLs
FRONTEND_BASE_URL=http://localhost:3000
PASSWORD_RESET_URL=/reset-password
EMAIL_VERIFICATION_URL=/verify-email
```

## 🚦 Running the Application

### Development Mode

```bash
# Start the development server with hot-reload
npm run dev

# Or with nodemon
npm run dev:nodemon
```

The server will be available at `http://localhost:5000` by default.

### Production Mode

```bash
# Build the application
npm run build

# Start the production server
npm start
```

### Using Docker

```bash
# Build and start all services
docker-compose up --build

# Run in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🧪 Testing

Integration tests use `mongodb-memory-server`, which requires the legacy
OpenSSL 1.1 libraries (`libssl.so.1.1` and `libcrypto.so.1.1`). Recent
distributions may not ship these libraries by default.

Install them manually before running the tests:

```bash
sudo apt-get update
sudo apt-get install libssl1.1
```

Alternatively you can run the test command with `INSTALL_LIBSSL=1` and the
script will attempt to install the package for you.

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run integration tests
npm run test:integration
```

## 🧹 Linting and Formatting

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Type checking
npm run type-check
```

## 🌐 API Documentation

API documentation is available at `/api-docs` when running in development mode. This uses Swagger UI to document all available API endpoints.

## 🏗️ Project Structure

```
src/
├── config/           # Configuration files
│   ├── db.ts         # Database connection
│   ├── passport.ts   # Passport configuration
│   └── swagger.ts    # Swagger/OpenAPI configuration
├── controllers/      # Route controllers
│   ├── auth.ts       # Authentication controller
│   └── health.ts     # Health check controller
├── middleware/       # Custom middleware
│   ├── auth.ts       # Authentication middleware
│   ├── error.ts      # Error handling middleware
│   └── validation.ts # Request validation
├── models/           # Database models
│   └── User.ts       # User model
├── routes/           # API routes
│   ├── auth.ts       # Auth routes
│   └── health.ts     # Health check routes
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
│   ├── errorResponse.ts
│   ├── logger.ts
│   └── sendEmail.ts
├── app.ts            # Express application setup
└── server.ts         # Server entry point
```

## 🔒 Security

- **Helmet** for securing HTTP headers
- **Rate limiting** to prevent brute force attacks
- **CORS** with whitelisted origins
- **JWT** for stateless authentication
- **Input validation** for all user inputs
- **Environment variables** for sensitive data
- **CSRF protection** (when using sessions)
- **Request sanitization**

## 📦 Dependencies

### Production Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **jsonwebtoken**: JWT implementation
- **bcryptjs**: Password hashing
- **dotenv**: Environment variable management
- **cors**: Cross-Origin Resource Sharing
- **helmet**: Secure HTTP headers
- **winston**: Logging
- **nodemailer**: Email sending
- **express-validator**: Request validation
- **express-rate-limit**: Rate limiting

### Development Dependencies

- **typescript**: Type checking and compilation
- **ts-node**: TypeScript execution
- **jest**: Testing framework
- **supertest**: HTTP assertions
- **eslint**: Linting
- **prettier**: Code formatting
- **nodemon**: Development server with hot-reload
- **husky**: Git hooks
- **lint-staged**: Run linters on git staged files

## 🚀 Deployment

### Prerequisites

- Node.js 18+ installed
- MongoDB instance (local or cloud)
- Nginx or similar reverse proxy (recommended)
- PM2 or similar process manager (recommended for production)

### Steps

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Set environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with production values
   ```

3. **Install production dependencies**
   ```bash
   npm ci --only=production
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   
   Or using PM2:
   ```bash
   npm install -g pm2
   pm2 start dist/server.js --name "sentivox-backend"
   pm2 save
   pm2 startup
   ```

### Using Docker

1. **Build the Docker image**
   ```bash
   docker build -t sentivox-backend .
   ```

2. **Run the container**
   ```bash
   docker run -p 5000:5000 --env-file .env sentivox-backend
   ```

   Or using Docker Compose:
   ```bash
   docker-compose up -d
   ```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/)
- [Docker](https://www.docker.com/)
- And all the amazing open-source libraries used in this project
