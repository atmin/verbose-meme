import type { DefaultSession } from 'next-auth';

export type User = DefaultSession['user'];

export type ChatMessage = {
  _id: string;
  author: User;
  message: string;
};
