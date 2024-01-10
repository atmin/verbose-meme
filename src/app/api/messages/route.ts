import type { NextRequest } from 'next/server';
import getDb from '@/lib/db';

export async function GET(request: NextRequest) {
  const db = await getDb();
  const result = db.collection('messages').find();
  return new Response(JSON.stringify(result));
}

export async function POST(request: NextRequest) {
    
}
