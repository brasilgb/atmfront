"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    assoc_datmvt: string
    assoc_valdev: string
    assoc_margem: string
    assoc_presen: string
    assoc_metdia: string
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "assoc_datmvt",
        header: "Data",
    },
    {
        accessorKey: "assoc_ass",
        header: "Assoc",
    },
    {
        accessorKey: "assoc_valdev",
        header: "Devolução",
    },
    {
        accessorKey: "assoc_valven",
        header: "Venda",
    },
    {
        accessorKey: "assoc_margem",
        header: "Margem",
    },
    {
        accessorKey: "assoc_repres",
        header: "Representa%",
    },
    {
        accessorKey: "assoc_metdia",
        header: "Meta dia",
    },
]