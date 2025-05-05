'use client'
import React, { useEffect, useState } from 'react'
import { useAppContext } from '@/contexts/AppContext';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartLine, ChartNoAxesCombined, HandCoins, TrendingUpIcon } from 'lucide-react';
import { maskMoney } from '@/lib/utils';
import { RadialChartApp } from '@/components/charts/RadialChartApp';
import CompositeChartApp from '@/components/charts/CompositeChartApp';
import Loading from '@/components/loading';

export default function Customer() {
    const { companyNumber, loading, setLoading, user } = useAppContext();
    
    const [totais, setTotais] = useState<any>([]);
    const [graficos, setGraficos] = useState<any>([]);

    useEffect(() => {
        setLoading(true);
        const getTotais = async () => {
            await fetch(`http://localhost:3000/data-total?org=${user?.organizationId}&com=${companyNumber}&dat=20240503`, {
                method: 'GET',
                headers: {
                    'Content-type': 'Application/json',
                    Authorization: `Bearer ${user?.token}`
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    setTotais(data);
                    setLoading(false);
                });
        }
        getTotais();
    }, [user, companyNumber]);

    useEffect(() => {
        setLoading(true);
        const getGraficos = async () => {
            await fetch(`http://localhost:3000/data-chart?org=${user?.organizationId}&com=${companyNumber}&my=202405`, {
                method: 'GET',
                headers: {
                    'Content-type': 'Application/json',
                    Authorization: `Bearer ${user?.token}`
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    setLoading(false);
                    setGraficos(data?data:[]);
                });
        }
        getGraficos();
    }, [user, companyNumber]);

    if(loading){
        return <Loading />
    }

    return (
        <div className='flex flex-col gap-4 p-4 w-full'>
            <div className="grid grid-cols-4 gap-4">
                <Card className="">
                    <CardHeader className="relative">
                        <CardDescription>Meta</CardDescription>
                        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                            R$ {maskMoney(totais?.total_meta)}
                        </CardTitle>
                        <div className="absolute right-4 top-4">
                            <ChartLine className="size-8" />
                        </div>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1 text-sm">
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            Meta Mensal {('20250504').slice(0, 6)}
                        </div>
                    </CardFooter>
                </Card>
                <Card className="">
                    <CardHeader className="relative">
                        <CardDescription>Faturamento</CardDescription>
                        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                            R$ {maskMoney(totais?.total_valven)}
                        </CardTitle>
                        <div className="absolute right-4 top-4">
                            <HandCoins className="size-8" />
                        </div>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1 text-sm">
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            Faturamento período
                        </div>
                    </CardFooter>
                </Card>
                <Card className="">
                    <CardHeader className="relative">
                        <CardDescription>Margem</CardDescription>
                        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                            R$ {maskMoney(totais?.total_margem)}
                        </CardTitle>
                        <div className="absolute right-4 top-4">
                            <ChartNoAxesCombined className="size-8" />
                        </div>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1 text-sm">
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            Valor juro
                        </div>
                    </CardFooter>
                </Card>
                <Card className="">
                    <CardHeader className="relative">
                        <CardDescription>Inadimplência</CardDescription>
                        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                            R$ {maskMoney(totais?.total_valina)}
                        </CardTitle>
                        <div className="absolute right-4 top-4">
                            <TrendingUpIcon className="size-8" />
                        </div>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1 text-sm">
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            Valor inadimplência
                        </div>
                    </CardFooter>
                </Card>
            </div>
            <div className="grid grid-cols-4 gap-4">
                <RadialChartApp data={totais?.total_margem} title="Margem" />
                <RadialChartApp data={totais?.total_permet} title="Meta" />
                <RadialChartApp data={totais?.total_margem} title="Margem" />
                <RadialChartApp data={totais?.total_permet} title="Meta" />
            </div>

            <div className='h-96'>
                {graficos.length > 0 && <CompositeChartApp data={graficos} />}
            </div>
        </div>
    )
}
