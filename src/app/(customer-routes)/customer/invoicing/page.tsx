'use client'
import React, { useEffect, useState } from 'react'
import { useAppContext } from '@/contexts/AppContext';
import moment from 'moment';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Summary from '../Summary/page';
import Association from '../Association/page';
import Loading from '@/components/loading';

export default function Invoicing() {

    const { selectedDate, companyNumber, loading, setLoading, user, status } = useAppContext();
    const [sales, setSales] = useState<any>([]);
    const [associations, setAssociations] = useState<any>([]);

    useEffect(() => {
        setLoading(true);
        const getSales = async () => {
            await fetch(`http://localhost:3000/data-sale?org=${user?.organizationId}&com=${companyNumber}&dat=${moment(selectedDate).format('YYYYMM')}`, {
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

    useEffect(() => {
        setLoading(true);
        const getAssociations = async () => {
            await fetch(`http://localhost:3000/data-assoc?org=${user?.organizationId}&com=${companyNumber}&dat=${moment(selectedDate).format('YYYYMMDD')}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'Application/json',
                    Authorization: `Bearer ${user?.token}`
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    setAssociations(data);
                    setLoading(false);
                });
        };
        getAssociations();
    }, [user, companyNumber, selectedDate]);


    if (status === 'loading' && loading) {
        return <Loading />;
    }
    if (status === 'authenticated' && user) {
        return (
            <Tabs defaultValue="summary" className="w-full">
                <TabsList className='w-full'>
                    <TabsTrigger value="summary" className='text-base font-semibold text-gray-600 cursor-pointer'>Resumo</TabsTrigger>
                    <TabsTrigger value="association" className='text-base font-semibold text-gray-600 cursor-pointer'>Associação</TabsTrigger>
                </TabsList>
                <TabsContent value="summary">
                    <Summary data={sales} />
                </TabsContent>
                <TabsContent value="association">
                    <Association data={associations} />
                </TabsContent>
            </Tabs>
        );
    }
}
