"use client"

import { Button } from "@/components/ui/button";
import { OrganizationProps } from "@/types/organization";
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox"
import moment from "moment";
import Link from "next/link";
import { EditOrganization } from "./edit";
import { DeleteAlertDialog } from "@/components/admin/DeleteAlertDialog";
import { Badge } from "@/components/ui/badge";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Payment = {
//   id: string
//   amount: number
//   status: "pending" | "processing" | "success" | "failed"
//   email: string
// }

export const columns: ColumnDef<OrganizationProps>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
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
    cell: ({row}) => {
      const orgs = row.original as any;
      return (
        <div className="">
          {orgs === "0" ? <Badge variant="destructive">Inativo</Badge> : <Badge variant="secondary">Ativo</Badge>}</div>
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
      const orgs = row.original;
      return (
        <div className="flex items-center justify-end gap-2">
          <EditOrganization org={orgs} />
          <DeleteAlertDialog deleteId={orgs.id} />
        </div>
      )
    }
  }
]
