import { DataTable } from '@/components/data-table';
import React from 'react'
import { columns } from './columns';

export default function Association({data}: any) {
  
  return (
    <div><DataTable columns={columns} data={data} /></div>
  )
}
