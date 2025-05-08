'use client'
import React, { useEffect, useState } from 'react'
import { useAppContext } from '@/contexts/AppContext';
import moment from 'moment';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Summary from '../Summary/page';
import Association from '../Association/page';

export default function Invoicing() {

    const { selectedDate, companyNumber, loading, setLoading, user } = useAppContext();
    const [sales, setSales] = useState<any>([]);

    useEffect(() => {
        setLoading(true);
        const getSales = async () => {
            await fetch(`http://localhost:3000/data-sale?org=${user?.organizationId}&com=${companyNumber}&dat=${moment(selectedDate).format('YYYYMMDD')}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'Application/json',
                    Authorization: `Bearer ${user?.token}`
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    setSales(data);
                    setLoading(false);
                });
        };
        getSales();
    }, [user, companyNumber, selectedDate]);

    return (
        <Tabs defaultValue="summary" className="w-[400px]">
            <TabsList>
                <TabsTrigger value="summary">Resumo</TabsTrigger>
                <TabsTrigger value="association">Associação</TabsTrigger>
            </TabsList>
            <TabsContent value="summary">
                <Summary />
            </TabsContent>
            <TabsContent value="association">
                <Association />
            </TabsContent>
        </Tabs>
    )
}
