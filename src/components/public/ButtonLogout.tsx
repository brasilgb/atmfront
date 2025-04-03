'use client'
import React from 'react'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation';

export default function ButtonLogout() {

    const router = useRouter();
    async function logout() {
        await signOut({
            redirect: false
        })

        router.replace('/auth/login')

    }

  return (
    <Button
    onClick={() => logout()}
    >
        Logout
    </Button>
  )
}
