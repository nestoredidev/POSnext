"use client";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"
import {useState} from "react";
import {format} from "date-fns";
import {useQuery} from "@tanstack/react-query";
import {getSaleByDate} from "@/utils/api";
import TransactionSummary from "@/components/transaction/TransactionSummary";
import Loading from "@/components/Loading";


type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece];

function Transactionfilter() {
    const [date, setDate] = useState<Value>(new Date());
    const formattedDate = format(date?.toString() || new Date(), 'yyyy-MM-dd')
    console.log(formattedDate)
    const {data, isLoading} = useQuery({
        queryKey: ['sales', formattedDate],
        queryFn: () => getSaleByDate(formattedDate)
    })
    const total = data?.reduce((acc, transaction) => acc + +transaction.total, 0) || 0;
    return (
        <div
            className="grid grid-cols-1 gap-6 mt-10 lg:grid-cols-2 relative items-start">
            <div className="lg:sticky lg:top-10">
                <Calendar value={date} onChange={setDate} locale='es'/>
            </div>
            <div>
                {isLoading ? <Loading/> : 'Total ventas del dia'}
                {
                    data?.length ? data.map((transaction) => (
                        <TransactionSummary key={transaction.id}
                                            transaction={transaction}/>
                    )) : (
                        <p className="text-gray-500">
                            No hay ventas para esta fecha
                        </p>
                    )
                }
                <span>
                    <p className="text-lg font-bold text-gray-900">
                        Total del día: S/.{total.toFixed(2)}
                    </p>
                </span>
            </div>
        </div>
    );
}

export default Transactionfilter;