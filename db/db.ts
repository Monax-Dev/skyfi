import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

const uri = process.env.MONGO_URI!;

if (!uri) {
  throw new Error('MongoDB URI not found in environment variables');
}

const options = {
  serverSelectionTimeoutMS: 5000
};

export function connectToDB() {
  return mongoose.connect(uri, options)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));
}