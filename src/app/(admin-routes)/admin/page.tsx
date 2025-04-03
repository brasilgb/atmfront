import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import ButtonLogout from '@/components/public/ButtonLogout';
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function Admin() {
const session = await getServerSession(nextAuthOptions);
  return (
    <div>
      <p>Olá {session?.user.name}, bem vindo!</p>
      <div>
        <ButtonLogout/>
      </div>
    </div>
  )
}
