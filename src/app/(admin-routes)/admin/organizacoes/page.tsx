import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Building2 } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import { columns } from "./columns"
import { DataTable } from "./data-table"
export default async function Organizacoes() {
  const session = await getServerSession(nextAuthOptions);

  let data = await fetch('http://localhost:3000/organization/all', {
    method: 'GET',
    headers: {
      'Content-type': 'Application/json',
      Authorization: `Bearer ${session?.user?.token}`
    }
  });
  let organizations = await data.json()

  return (
    <section>
      <div className='flex items-start justify-between h-14'>
        <div className='flex items-center justify-start gap-2 text-gray-600'>
          <Building2 />
          <h1 className='text-2xl font-semibold'>Organizações</h1>
        </div>
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Organizações</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <Card className='p-4'>
        <DataTable columns={columns} data={organizations} />
      </Card>

    </section>
  )
}
