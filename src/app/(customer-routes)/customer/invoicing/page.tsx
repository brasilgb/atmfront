import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import React from 'react'

export default async function Invoicing() {

  const session = await getServerSession(nextAuthOptions);

  let data = await fetch('http://localhost:3000/data-sale?org_id=77544b4c-1cc9-4751-8c2e-21226ae497b6&comp_id=0002', {
    method: 'GET',
    headers: {
      'Content-type': 'Application/json',
      Authorization: `Bearer ${session?.user?.token}`
    }
  });
  let sales = await data.json()
  console.log(sales);

  return (
    <div>Invoicing</div>
  )
}
