"use client"

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Edit } from "lucide-react";
import moment from "moment";
import { DeleteAlertDialog } from "@/components/admin/DeleteAlertDialog";
import { Badge } from "@/components/ui/badge";
import * as cnpj from "validation-br/dist/cnpj";
import Link from "next/link";
import { CompanyProps } from "@/types/company";

export const columns: ColumnDef<CompanyProps>[] = [
  {
    accessorKey: "Organization.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Organização
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "subname",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Filial
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "subnumber",
    header: () => <div className="text-left">N° Filial</div>,
  },
  {
    accessorKey: "cnpj",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CNPJ
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const fcnpj = row.original.cnpj
      return (
        <span>{cnpj.mask(fcnpj)}</span>
      )
    }
  },
  {
    accessorKey: "telefone",
    header: () => <div className="text-left">Telefone</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const orgs = row.original.status;
      return (
        <div className="">
          {orgs ? <Badge variant="active">Ativo</Badge> : <Badge variant="destructive">Inativo</Badge>}</div>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-left">Cadastro</div>,
    cell: ({ row }) => {
      const dataa = new Date(row.getValue("createdAt"))
      const formatted = moment(dataa).format("DD/MM/YYYY")

      return <div className="text-left font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: " ",
    cell: ({ row }) => {
      const comp = row.original;
      return (
        <div className="flex items-center justify-end gap-2">
          <Link 
          className="flex items-center justify-center gap-2 p-2.5 whitespace-nowrap rounded-md text-sm font-medium transition-all bg-orange-500 text-primary-foreground shadow-xs hover:bg-orange-500/90"
          href={{ pathname: "/admin/companies/edit", query: {id: comp.id} }}><Edit className="h-4 w-4" /></Link>
          <DeleteAlertDialog deleteId={comp.id} />
        </div>
      )
    }
  }
]
