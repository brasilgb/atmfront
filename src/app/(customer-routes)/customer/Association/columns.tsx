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
/*
"assoc_cnpj": "01141021000190",
		"assoc_filial": "2",
		"assoc_datmvt": "20240502",
		"assoc_ass": "AL",
		"assoc_desass": "ALIMENTOS",
		"assoc_valdev": "000000000000.00",
		"assoc_valven": "000000008091.51",
		"assoc_margem": "0047.24",
		"assoc_repres": "0000.43",
		"assoc_metdia": "000000000.00",
*/