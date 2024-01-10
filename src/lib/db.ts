import mongoose, { ConnectionStates } from 'mongoose';

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  const db = await mongoose.connect(process.env.MONGODB_URI!);
  isConnected = db.connections[0].readyState === ConnectionStates.connected;
  console.log(`isConnected ${isConnected}`);
}

export default connectDB;
