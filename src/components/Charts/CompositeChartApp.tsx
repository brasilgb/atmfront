'use client'
import { SquareCheck, TrendingUp } from "lucide-react"
import { Area, Bar, CartesianGrid, ComposedChart, Legend, Line, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import moment from "moment"

export const description = "A bar chart"


const chartConfig = {
    vendas: {
        label: "Vendas",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

interface ComposeChartProps {
    data: any;
}
export default function CompositeChartApp({ data }: ComposeChartProps) {

    const chartData = data?.map((value: any) => ({
        diasemana: moment(value?.resumo_datmvt).format("DD"),
        vendas: parseFloat(value?.resumo_valven),
        meta: (parseFloat(value?.resumo_metdia) * parseFloat(value?.resumo_valven)) / 100,
        margem: parseFloat(value?.resumo_margem)
    }));

    return (
        <Card>
            <CardHeader>
                <CardTitle>Vendas no período</CardTitle>
                <CardDescription>{moment(data[0]?.anomes).format("MM/YYYY")}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="max-h-[180px] w-full">
                    <ComposedChart width={730} height={180} data={chartData}>
                        <XAxis dataKey="diasemana" />
                        <YAxis />
                        {/* //console.log("V", value, "N", name, "P", payload) */}
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel formatter={(value: any, name, props: any) => (
                                <div>
                                    <p className="flex items-center gap-2">
                                        {name == 'vendas' && <SquareCheck color={props.color} className={`w-4 h-4`} />}
                                        {name == 'vendas' && name + ': ' + (value)}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        {name == 'meta' && <SquareCheck color={props.color} className={`w-4 h-4`} />}
                                        {name == 'meta' && name + ': ' + (value)}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        {name == 'margem' && <SquareCheck color={props.color} className={`w-4 h-4`} />}
                                        {name == 'margem' && name + ': '  + ((value / props.payload.vendas) * 100).toFixed(2) + '%'}
                                    </p>
                                </div>
                            )} />}
                        />
                        <Legend />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Area type="monotone" dataKey="margem" fill="#d2d884" stroke="#cbd884" />
                        <Line type="monotone" dataKey="meta" stroke="#ff7300" />
                        <Bar dataKey="vendas" barSize={20} fill="#413ea0" />
                    </ComposedChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Sendo a meta de {(data[0]?.valmeta)} para este mês. <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Mostrando as vendas e as margens alcançadas para os {data?.length} dias do mês
                </div>
            </CardFooter>
        </Card>
    )
}
