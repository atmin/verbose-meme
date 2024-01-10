'use client';

import { DefaultSession } from 'next-auth';
import { trpc } from '@/lib/client/trpc';
import UserName from './UserName';
import ChatMessage from './ChatMessage';

export default function MainScreen({ user }: { user: DefaultSession['user'] }) {
  const result = trpc.greeting.useQuery({ name: 'client' });

  if (!result.data) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div>
      {/**
       * The type is defined and can be autocompleted
       * 💡 Tip: Hover over `data` to see the result type
       * 💡 Tip: CMD+Click (or CTRL+Click) on `text` to go to the server definition
       * 💡 Tip: Secondary click on `text` and "Rename Symbol" to rename it both on the client & server
       */}
      <h1>{result.data.text}</h1>
    </div>
  );

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
            <ChatMessage
              messages={['Welcome to group everyone !']}
              user={user}
              author={user}
            />
            <ChatMessage
              messages={[
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat at praesentium, aut ullam delectus odio error sit rem. Architecto nulla doloribus laborum illo rem enim dolor odio saepe, consequatur quas?',
              ]}
              user={user}
              author={{
                email: '@@@',
                name: 'Someone',
                image: 'https://placekitten.com/32/32',
              }}
            />
            <ChatMessage
              messages={[
                'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam, repudiandae.',
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, reiciendis!',
              ]}
              user={user}
              author={user}
            />
            <ChatMessage
              messages={['something not too long']}
              user={user}
              author={{
                email: '@@@',
                name: 'Someone Else',
                image: 'https://placekitten.com/32/32',
              }}
            />
          </div>

          <div className="py-5">
            <input
              className="w-full py-5 px-3 rounded-xl border"
              type="text"
              placeholder="type your message here..."
            />
          </div>
        </div>
      </div>
    </main>
  );
}
