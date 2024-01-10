import mongoose from 'mongoose';

let mongo: typeof mongoose | null = null;

export default async function getDB() {
  if (mongo) return Promise.resolve(mongo);
  if (!process.env.MONGODB_URI) {
    throw new Error('env var MONGODB_URI is required');
  }
  const db = await mongoose.connect(process.env.MONGODB_URI);
  mongo = db;
  return mongo;
}
