import { getServerSession } from 'next-auth';
import React, { ReactNode } from 'react'
import { nextAuthOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Footer from '@/components/admin/Footer';
import Header from '@/components/admin/Header';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/admin/AppSidebar';

interface PrivateLayoutProps {
  children: ReactNode;
}
export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className='flex flex-col w-full'>
        <SidebarTrigger className='absolute top-2 cursor-pointer' />
        <Header />
        <main className='flex-grow p-4'>
          {children}
        </main>
        <Footer />
      </div>
    </SidebarProvider>
  )
}
