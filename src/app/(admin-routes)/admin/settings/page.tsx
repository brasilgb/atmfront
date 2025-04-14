import React from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Settings } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { EditConfiguracoes } from './edit'
export default async function Organizacoes() {
  const session = await getServerSession(nextAuthOptions);

  let data = await fetch('http://localhost:3000/setting/show', {
    method: 'GET',
    headers: {
      'Content-type': 'Application/json',
      Authorization: `Bearer ${session?.user?.token}`
    }
  });
  let settings = await data.json()

  return (
    <section>
      <div className='flex items-start justify-between h-14'>
        <div className='flex items-center justify-start gap-2 text-gray-600'>
          <Settings />
          <h1 className='text-2xl font-semibold'>Configurações</h1>
        </div>
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Configurações</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <Card className='p-4'>
        <CardContent>
          <Image width={150} height={60} src={`${settings.logo ? 'http://localhost:3000/public/images/'+settings.logo : '/images/not-image.jpg'}`} alt='' />
        </CardContent>
        <CardFooter className='flex items-center justify-end border-t'>
          <EditConfiguracoes org={settings} />
        </CardFooter>
      </Card>

    </section>
  )
}