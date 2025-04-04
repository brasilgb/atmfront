'use client'
import React from 'react'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

interface ButtonLogoutProps {
  variant?: any;
  icon?: boolean;
}
export default function ButtonLogout({ variant, icon }: ButtonLogoutProps) {

  const router = useRouter();
  async function logout() {
    await signOut({
      redirect: false
    })

    router.replace('/auth/login')

  }

  return (
    <Button
      variant={variant}
      className={`${icon ? 'w-full justify-start' : ''} cursor-pointer`}
      onClick={() => logout()}
    >
      {icon && <LogOut className='h-4 w-4' />}Logout
    </Button>
  )
}
