'use client'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import React, { useEffect, useState } from 'react'
import { useAppContext } from '@/contexts/AppContext';
import { useSession } from 'next-auth/react';

export default async function Invoicing() {

    const { companyNumber } = useAppContext();
    const { data: session } = useSession();
    const [sales, setSales] = useState<any>([]);

    useEffect(() => {
        fetch(`http://localhost:3000/data-sale?org=${session?.user?.organizationId}&com=${companyNumber}&dat=20240503`, {
            method: 'GET',
            headers: {
                'Content-type': 'Application/json',
                Authorization: `Bearer ${session?.user?.token}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setSales(data);
            });
    }, [session]);

  return (
    <div>Invoicing</div>
  )
}
