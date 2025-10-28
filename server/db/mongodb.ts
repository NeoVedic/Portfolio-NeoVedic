import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { config } from '../config';
import { AdminUser } from './models/AdminUser';

let isConnected = false;
let connectionAttempts = 0;
const maxRetries = 3;
let isSeeded = false;

async function seedDefaultAdmin(): Promise<void> {
  if (isSeeded) return;
  
  try {
    const existingAdmin = await AdminUser.findOne({ email: 'admin@neovedic.com' });
    
    if (!existingAdmin) {
      const passwordHash = await bcrypt.hash('admin123', 10);
      const defaultAdmin = new AdminUser({
        email: 'admin@neovedic.com',
        passwordHash,
        name: 'Admin User',
        role: 'admin',
      });
      
      await defaultAdmin.save();
      console.log('✅ Default admin user created (admin@neovedic.com / admin123)');
    }
    
    isSeeded = true;
  } catch (error) {
    console.error('⚠️ Error seeding default admin:', error);
  }
}

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
      
      // Seed default admin user
      await seedDefaultAdmin();
      
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
