import { DefaultSession } from 'next-auth';
import UserName from './UserName';

export default function ChatMessage({
  user,
  messages,
  author,
}: {
  user: DefaultSession['user'];
  messages: string[];
  author: DefaultSession['user'];
}) {
  const isAuthor = user?.email === author?.email;
  return (
    <div>
      <div
        className={[
          'flex',
          'mb-1',
          isAuthor ? 'justify-end' : 'justify-start',
        ].join(' ')}
      >
        <UserName user={author} />
      </div>
      <div
        className={[
          'flex',
          'mb-4',
          isAuthor ? 'justify-end' : 'justify-start',
        ].join(' ')}
      >
        {/* {!isAuthor && (
          <div className="mr-2 flex-shrink-0">
            <UserName user={author} />
          </div>
        )} */}
        <div>
          {messages.map((message, i) => (
            <div
              key={i}
              className={[
                i < messages.length - 1 ? 'mb-2' : '',
                'py-3 px-4',
                isAuthor ? 'bg-blue-400' : 'bg-gray-400',
                'rounded-3xl',
                // isAuthor ? 'rounded-tr-none' : 'rounded-tl-none',
                'text-white',
              ].join(' ')}
            >
              {message}
            </div>
          ))}
        </div>
        {/* {isAuthor && (
          <div className="ml-2 flex-shrink-0">
            <UserName user={author} />
          </div>
        )} */}
      </div>
    </div>
  );
}
