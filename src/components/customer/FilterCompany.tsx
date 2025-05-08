'use client'
import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAppContext } from '@/contexts/AppContext';

export default function FilterCompany({ data }: any) {
  const { setCompanyNumber } = useAppContext();
  const handleValueCity = (value: string) => {
    setCompanyNumber(value)
  };

  return (
    <>
      <Select onValueChange={handleValueCity}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filial" />
        </SelectTrigger>
        <SelectContent>
          {data?.map((comp: any, idx: number) => (
            <SelectItem key={idx} value={comp.subnumber}>{comp.subname}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  )
}