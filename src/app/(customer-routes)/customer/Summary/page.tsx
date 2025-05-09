import React from 'react'
import { Payment, columns } from "./columns"
import { DataTable } from "../../../../components/data-table"

export default function Summary({data}: any) {

  return (
    <div><DataTable columns={columns} data={data} /></div>
  )
}
