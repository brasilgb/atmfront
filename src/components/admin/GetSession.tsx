import React from 'react'
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route';
export default async function GetSession() {
    const session = await getServerSession(nextAuthOptions);
  return (
    <span>{session?.user.name}</span>
  )
}
