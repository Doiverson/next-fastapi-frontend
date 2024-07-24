'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import useSWR, { mutate } from 'swr';
import Spinner from '@/components/spinner';

const Detail = () => {
    const pathname = usePathname();
    const detail_id = pathname.split('/').pop();

    const { data, error, isLoading } = useSWR(
        `/api/details/${detail_id}`,
        async (url: string) => {
            const response = await fetch(url);
            return response.json();
        }
    );

    if (error) return <div>Failed to load</div>;
    if (isLoading) return <Spinner />;

    return <div>{data.description}</div>;
};

export default Detail;
