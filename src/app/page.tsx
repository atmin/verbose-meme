'use server';

// import getDB from '@/lib/db';
import MainScreen from '@/components/MainScreen';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession();
  if (!session) return redirect('/api/auth/signin');

  // const db = await getDB();
  // console.log(db);
  return <MainScreen user={session.user} />;
}
