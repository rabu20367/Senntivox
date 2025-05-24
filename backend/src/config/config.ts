interface JwtConfig {
  secret: string;
  expiresIn: string;
  cookieExpire: number;
}

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
}

interface Config {
  port: number;
  nodeEnv: string;
  mongoUri: string;
  jwt: JwtConfig;
  email: EmailConfig;
  frontendUrl: string;
}

const config: Config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/sentivox',
  jwt: {
    secret: process.env.JWT_SECRET || 'dev-secret',
    expiresIn: process.env.JWT_EXPIRE || '30d',
    cookieExpire: parseInt(process.env.JWT_COOKIE_EXPIRE || '30', 10)
  },
  email: {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    secure: process.env.EMAIL_SECURE === 'true',
    user: process.env.EMAIL_USERNAME || '',
    pass: process.env.EMAIL_PASSWORD || ''
  },
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000'
};

// Export config as default
export { config };
// Export types separately
export type { Config, JwtConfig, EmailConfig };
