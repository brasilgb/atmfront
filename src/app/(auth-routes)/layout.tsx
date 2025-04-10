
import React, { ReactNode } from 'react'
import { nextAuthOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

interface PrivateLayoutProps {
  children: ReactNode;
}
export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await getServerSession(nextAuthOptions);

  if (session) {
    redirect('/admin')
  }

  return (
    <div className='min-h-screen bg-sky-500 flex items-center justify-center'>
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  )
}
