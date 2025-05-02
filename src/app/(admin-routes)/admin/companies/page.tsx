import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Card } from '@/components/ui/card'
import { Building } from 'lucide-react'
import React from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'

export default async function Filiais() {
  const session = await getServerSession(nextAuthOptions);

  let data = await fetch('http://localhost:3000/company/all', {
    method: 'GET',
    headers: {
      'Content-type': 'Application/json',
      Authorization: `Bearer ${session?.user?.token}`
    }
  });
  let companies = await data.json()

  return (
    <section>
      <div className='flex items-start justify-between h-14'>
        <div className='flex items-center justify-start gap-2 text-gray-600'>
          <Building />
          <h1 className='text-2xl font-semibold'>Filiais</h1>
        </div>
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Filiais</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <Card className='p-4'>
        <DataTable columns={columns} data={companies} />
      </Card>
    </section>
  )
}
