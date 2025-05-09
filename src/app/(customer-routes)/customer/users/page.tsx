'use client'
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Card } from '@/components/ui/card'
import { Building } from 'lucide-react'
import { getServerSession } from 'next-auth'
import React, { useEffect, useState } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { useAppContext } from '@/contexts/AppContext'
import Loading from '@/components/loading'

export default function Usuarios() {
  const { user, status, loading } = useAppContext();
  const [userOrg, setUserOrg] = useState<any>([]);

  useEffect(() => {
    const getUserOrg = async () => {
      await fetch(`http://localhost:3000/user/org?orgid=${user?.organizationId}`, {
        method: 'GET',
        headers: {
          'Content-type': 'Application/json',
          Authorization: `Bearer ${user?.token}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          setUserOrg(data);
        });
    };
    getUserOrg();
  }, [user]);

  if (status === 'loading' && loading) {
    return <Loading />;
  }
  if (status === 'authenticated' && user) {
    return (
      <section className='px-4 w-full'>
        <div className='flex items-start justify-between h-14 '>
          <div className='flex items-center justify-start gap-2 text-gray-600'>
            <Building />
            <h1 className='text-2xl font-semibold'>Usuários</h1>
          </div>
          <div>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Usuários</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        <Card className='p-4'>
          <DataTable columns={columns} data={userOrg} />
        </Card>
      </section>
    );
  }
}
