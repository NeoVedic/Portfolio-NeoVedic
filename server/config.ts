import dotenv from 'dotenv';
import { createServer } from 'http';

// Load environment variables
dotenv.config();

// Debug environment loading
console.log('🔍 Environment variables loaded:');
console.log(`   NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`   PORT: ${process.env.PORT}`);
console.log(`   HOST: ${process.env.HOST}`);
console.log(`   MONGODB_URI: ${process.env.MONGODB_URI ? 'configured' : 'not set'}`);
console.log(`   ENABLE_MOCK_DATA: ${process.env.ENABLE_MOCK_DATA}`);

export interface AppConfig {
  port: number;
  host: string;
  nodeEnv: 'development' | 'production';
  mongoUri?: string;
  enableMockData: boolean;
  logLevel: string;
  sessionSecret?: string;
}

// Port availability checker
export async function findAvailablePort(startPort: number, maxAttempts: number = 10): Promise<number> {
  for (let i = 0; i < maxAttempts; i++) {
    const port = startPort + i;
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const server = createServer();
    
    server.listen(port, () => {
      server.close(() => {
        resolve(true);
      });
    });
    
    server.on('error', () => {
      resolve(false);
    });
  });
}

function validateConfig(): AppConfig {
  
  const config: AppConfig = {
    port: parseInt(process.env.PORT || '5000', 10),
    // Use 0.0.0.0 for better Windows compatibility and container support
    host: process.env.HOST || '0.0.0.0',
    nodeEnv: (process.env.NODE_ENV as 'development' | 'production') || 'development',
    mongoUri: process.env.MONGODB_URI,
    enableMockData: process.env.ENABLE_MOCK_DATA === 'true' || !process.env.MONGODB_URI,
    logLevel: process.env.LOG_LEVEL || 'info',
    sessionSecret: process.env.SESSION_SECRET,
  };

  // Validation and helpful error messages
  if (config.port < 1 || config.port > 65535) {
    throw new Error(`Invalid PORT: ${config.port}. Must be between 1 and 65535.`);
  }

  if (!config.mongoUri && !config.enableMockData) {
    console.warn('⚠️  No MONGODB_URI provided. Enabling mock data mode.');
    config.enableMockData = true;
  }

  if (config.nodeEnv === 'production' && !config.sessionSecret) {
    console.warn('⚠️  No SESSION_SECRET provided for production. Using default (not secure).');
  }

  return config;
}

export const config = validateConfig();

// Log configuration on startup
console.log('📋 Configuration loaded:');
console.log(`   Environment: ${config.nodeEnv}`);
console.log(`   Port: ${config.port}`);
console.log(`   Host: ${config.host}`);
console.log(`   MongoDB: ${config.mongoUri ? '✅ Configured' : '❌ Not configured'}`);
console.log(`   Mock Data: ${config.enableMockData ? '✅ Enabled' : '❌ Disabled'}`);