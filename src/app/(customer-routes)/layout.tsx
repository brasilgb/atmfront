import FilterBAr from '@/components/customer/FilterBar';
import Footer from '@/components/customer/Footer';
import Header from '@/components/customer/Header';
import React from 'react'

interface CustomerLayoutProps {
  children: React.ReactNode;
}
export default function CustomerLayout({ children }: CustomerLayoutProps) {
  return (
    <main className='flex flex-col min-h-screen'>
      <Header />
      <FilterBAr />
      <div className='flex-grow flex justify-start items-start'>
        {children}
      </div>
      <Footer />
    </main>

  )
}