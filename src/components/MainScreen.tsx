'use client';

import { useState, useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import type { User, ChatMessage as TChatMessage } from '@/lib/types';
import UserName from './UserName';
import ChatMessage from './ChatMessage';

export default function MainScreen({ user }: { user: User }) {
  const initialized = useRef(false);
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<TChatMessage[]>([]);

  useEffect(function initSocket() {
    // In strict mode this effect is called twice in dev mode
    if (initialized.current) return;
    initialized.current = true;

    Promise.all([
      fetch('/api/messages')
        .then((resp) => resp.json())
        .then(setMessages),

      fetch('/api/socket'),
    ]).then(() => {
      const socket = io();
      setSocket(socket);

      socket.on('connect', () => {
        console.log('socket connected');
      });

      socket.on('chatMessage', (msg: TChatMessage) => {
        setMessages(oldMessages => [...oldMessages, msg]);
      });
    });
  }, []);

  return (
    <main className="container mx-auto h-svh flex flex-col">
      <div className="px-5 py-5 flex justify-between items-center border-b-2">
        <div className="font-semibold text-2xl">Verbose Meme</div>
        <div className="w-1/2">
          <input
            type="text"
            name=""
            id=""
            placeholder="Search messages"
            className="rounded-2xl py-3 px-5 w-full border"
          />
        </div>
        <UserName user={user} showLogout className="ml-4" />
      </div>
      <div className="flex flex-row flex-grow justify-between">
        <div className="w-full flex flex-col justify-between">
          <div className="flex flex-col mt-5">
            {messages.map((message) => (
              <ChatMessage
                key={message._id}
                messages={[message.message]}
                user={user}
                author={message.author}
              />
            ))}
          </div>

          <div className="py-5">
            <input
              className="w-full py-5 px-3 rounded-xl border"
              type="text"
              placeholder="type your message here..."
              onKeyDown={({ currentTarget, key }) => {
                if (key === 'Enter') {
                  socket?.emit('chatMessage', currentTarget.value);
                  currentTarget.value = '';
                }
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
