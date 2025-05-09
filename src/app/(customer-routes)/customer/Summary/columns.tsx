"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    resumo_datmvt: string
    resumo_valdev: string
    resumo_margem: string
    resumo_presen: string
    resumo_metdia: string
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "resumo_datmvt",
        header: "Data",
    },
    {
        accessorKey: "resumo_valdev",
        header: "Devolução",
    },
    {
        accessorKey: "resumo_margem",
        header: "Margem",
    },
    {
        accessorKey: "resumo_presen",
        header: "Representa%",
    },
    {
        accessorKey: "resumo_metdia",
        header: "Meta dia",
    },
]

/*
"resumo_cnpj": "01141021000190",
        "resumo_codfil": "0002",
        "resumo_desfil": "SOLAR COMERCIO E AGROINDUSTRIA LTDA",
        "resumo_datmvt": "20240502",
        "resumo_valdev": "000000000000.00",
        "resumo_valven": "000000036356.46",
        "resumo_margem": "0044.19",
        "resumo_presen": "0001.96",
        "resumo_metdia":
*/