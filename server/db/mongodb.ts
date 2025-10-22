import mongoose from 'mongoose';
import { config } from '../config';

let isConnected = false;
let connectionAttempts = 0;
const maxRetries = 3;

export async function connectToMongoDB(): Promise<void> {
  if (isConnected) {
    return;
  }

  if (!config.mongoUri) {
    throw new Error('MongoDB URI not configured - using mock data mode');
  }

  while (connectionAttempts < maxRetries && !isConnected) {
    try {
      connectionAttempts++;
      console.log(`🔄 Attempting MongoDB connection (${connectionAttempts}/${maxRetries})...`);
      
      await mongoose.connect(config.mongoUri, {
        serverSelectionTimeoutMS: 5000, // 5 second timeout
        socketTimeoutMS: 45000, // 45 second socket timeout
      });
      
      isConnected = true;
      connectionAttempts = 0; // Reset on successful connection
      console.log('✅ Connected to MongoDB successfully');
      return;
    } catch (error) {
      console.error(`❌ MongoDB connection attempt ${connectionAttempts} failed:`, error);
      
      if (connectionAttempts >= maxRetries) {
        console.error('❌ Max MongoDB connection attempts reached. Falling back to mock data.');
        throw error;
      }
      
      // Wait before retrying (exponential backoff)
      const delay = Math.pow(2, connectionAttempts) * 1000;
      console.log(`⏳ Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

export function getConnectionStatus(): { isConnected: boolean; attempts: number } {
  return { isConnected, attempts: connectionAttempts };
}

mongoose.connection.on('connected', () => {
  isConnected = true;
  connectionAttempts = 0;
  console.log('🔗 MongoDB connection established');
});

mongoose.connection.on('disconnected', () => {
  isConnected = false;
  console.log('🔌 MongoDB disconnected');
});

mongoose.connection.on('error', (error) => {
  isConnected = false;
  console.error('❌ MongoDB connection error:', error);
});

mongoose.connection.on('reconnected', () => {
  isConnected = true;
  console.log('🔄 MongoDB reconnected');
});
