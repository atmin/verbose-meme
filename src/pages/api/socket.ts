import { Server } from 'socket.io';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import getDb from '@/lib/db';
import type { ChatMessage } from '@/lib/types';

export default async function handler(req: any, res: any) {
  if (!res.socket.server.io) {
    console.log('Socket is initializing');
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', async (socket) => {
      const session = await getServerSession(req, res, authOptions);
      const { user } = session!;
      console.log(`${user?.name} connected`);

      const db = await getDb();

      socket.on('chatMessage', (msg: string) => {
        // Save to DB
        const chatMessage: Omit<ChatMessage, '_id'> = {
          author: user,
          message: msg,
        };

        db.collection('messages')
          .insertOne(chatMessage)
          .then(({ insertedId: _id }) => {
            // Notify all clients, including message sender
            const savedMessage = { _id, ...chatMessage };
            socket.broadcast.emit('chatMessage', savedMessage);
            socket.emit('chatMessage', savedMessage);
          });
      });

      socket.on('disconnect', () => {
        console.log(`${user?.name} disconnected`);
      });
    });
  }
  res.end();
}
