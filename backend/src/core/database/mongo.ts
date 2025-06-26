// src/core/database/mongo.ts
import mongoose from 'mongoose';

export async function connectToMongoDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydb';
  await mongoose.connect(uri);
  console.log('🟢 Connected to MongoDB');
}
