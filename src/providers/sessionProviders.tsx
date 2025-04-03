'use client'
import React, { ReactNode } from 'react'
import { SessionProvider } from "next-auth/react"

interface NextAuthSessionProvidersProps {
    children: ReactNode;
}
export default function NextAuthSessionProviders({children}: NextAuthSessionProvidersProps) {
  return <SessionProvider>{children}</SessionProvider>
}
