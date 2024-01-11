import { Server } from 'socket.io';

export default function handler(req: any, res: any) {
  if (!res.socket.server.io) {
    console.log('Socket is initializing');
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log('client connected');

      socket.on('chatMessage', (msg: string) => {
        console.log(`chat message: ${msg}`);
        socket.emit('chatMessage', 'ack')
      });

      socket.on('disconnect', () => {
        console.log('client disconnected');
      });
    });
  }
  res.end();
}
