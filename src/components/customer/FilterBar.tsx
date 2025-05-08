'use client'
import React, { useEffect, useState } from 'react'
import { FilterDate } from './FilterDate'
import FilterCompany from './FilterCompany'
import { useAppContext } from '@/contexts/AppContext';

export default function FilterBAr() {
  const { user } = useAppContext();
  const [companyOrg, setCompanyOrg] = useState<any>([]);

  useEffect(() => {
    const getCompanyOrg = async () => {
      await fetch(`http://localhost:3000/company/org?orgid=${user?.organizationId}`, {
        method: 'GET',
        headers: {
          'Content-type': 'Application/json',
          Authorization: `Bearer ${user?.token}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setCompanyOrg(data);
        });
    }
    getCompanyOrg();
  }, [user]);

  return (
    <div className='flex items-center justify-start gap-6 px-4 py-4'>
      <FilterDate />
      <FilterCompany data={companyOrg} />
    </div>
  )
}

