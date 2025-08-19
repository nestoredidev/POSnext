import React from 'react';
import Heading from "@/components/Heading";
import Transactionfilter from "@/components/transaction/Transactionfilter";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {format} from "date-fns";
import {getSaleByDate} from "@/utils/api";

async function SalesPage() {
    const queryClient = new QueryClient()
    const date = new Date();
    const today = format(date, 'yyyy-MM-dd')
    await queryClient.prefetchQuery({
        queryKey: ['sales', today],
        queryFn: () => getSaleByDate(today)
    })
    return (
        <>
            <Heading>Ventas</Heading>
            <p>
                En esta seccion apareceran las ventas, utliza el calendario para
                filtrar para fecha.
            </p>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Transactionfilter/>
            </HydrationBoundary>

        </>
    );
}

export default SalesPage;