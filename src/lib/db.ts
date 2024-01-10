import { MongoClient, Db } from 'mongodb';

let _db: Db;

export default async function getDb(): Promise<Db> {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI missing in .env.local');
  }
  if (!process.env.MONGODB_DB) {
    throw new Error('MONGODB_DB missing in .env.local');
  }
  if (!_db) {
    const client = new MongoClient(process.env.MONGODB_URI);
    const conn = await client.connect();
    const db = client.db(process.env.MONGODB_DB);
    _db = db;
  }
  return _db;
}
