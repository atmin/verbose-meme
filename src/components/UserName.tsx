import { DefaultSession } from 'next-auth';
import { signOut } from 'next-auth/react';

export default function UserName({
  user,
  className,
  showLogout = false,
}: {
  user: DefaultSession['user'];
  className?: string;
  showLogout?: boolean;
}) {
  return (
    <div className={`flex items-center ${className ?? ''}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="rounded-full w-8 h-8"
        src={user?.image ?? ''}
        alt={user?.name ?? ''}
      />
      <div className="pl-2">{user?.name}</div>
      {showLogout && <a href="#" className="ml-2 text-sm" onClick={() => signOut() }>logout</a>}
    </div>
  );
}
