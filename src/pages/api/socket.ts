import { Server } from 'socket.io';
import { decode } from 'next-auth/jwt';
import getDb from '@/lib/db';
import type { ChatMessage } from '@/lib/types';

export default async function handler(req: any, res: any) {
  if (!res.socket.server.io) {
    console.log('Socket is initializing');
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', async (socket) => {
      const { cookie } = socket.handshake.headers;
      const sessionToken = cookie?.match(/next-auth.session-token=([^;]*)/);
      const jwt = await decode({
        token: sessionToken![1],
        secret: process.env.NEXTAUTH_SECRET!,
      });
      console.log(`${jwt?.name} connected`);

      const db = await getDb();

      socket.on('chatMessage', (msg: string) => {
        // Save to DB
        const chatMessage: Omit<ChatMessage, '_id'> = {
          author: { name: jwt?.name, email: jwt?.email, image: jwt?.picture },
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
        console.log(`${jwt?.name} disconnected`);
      });
    });
  }
  res.end();
}
