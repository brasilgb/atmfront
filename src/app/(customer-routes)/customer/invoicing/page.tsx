'use client'
import React, { useEffect, useState } from 'react'
import { useAppContext } from '@/contexts/AppContext';

export default function Invoicing() {

    const { companyNumber, loading, setLoading, user } = useAppContext();
    const [sales, setSales] = useState<any>([]);

    useEffect(() => {
        setLoading(true);
        const getSales = async () => {
            await fetch(`http://localhost:3000/data-sale?org=${user?.organizationId}&com=${companyNumber}&dat=20240503`, {
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
        }, [user, companyNumber]);

    return (
        <div>{JSON.stringify(sales)}</div>
    )
}
