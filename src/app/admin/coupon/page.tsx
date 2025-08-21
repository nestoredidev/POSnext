"use client";
import React from 'react';
import Heading from "@/components/Heading";

import {useQuery} from "@tanstack/react-query";
import {CouponsResponseSchema} from "@/types/shemas";
import CouponCart from "@/components/coupons/CouponCart";
import Link from "next/link";

function CouponPage() {
    const getCoupons = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/coupons`
        const req = await fetch(url)
        const json = await req.json()
        if (!req.ok) {
            throw new Error('Error fetching coupons')
        }
        const coupons = CouponsResponseSchema.parse(json)
        console.log(coupons)
        return coupons;
    }

    const {data: coupons, isLoading, error} = useQuery({
        queryKey: ['coupons'],
        queryFn: getCoupons,
        refetchOnWindowFocus: false,
    })

    return (
        <div>
            <Heading>Cupones de descuento</Heading>
            <button  className="mb-4 rounded bg-teal-400 text-white p-2 font-semibold hover:text-secondary hover:bg-teal-600 transition">
            <Link href="/admin/coupon/new">
                Crear cupón
            </Link>
            </button>
            <div>
                {
                    isLoading ? (
                        <p>Cargando cupones...</p>
                    ) : error ? (
                        <p>Error al cargar los cupones: {error.message}</p>
                    ) : (
                        <div
                            className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                            {
                                coupons?.map((coupon) => (
                                    <CouponCart
                                        key={coupon.id}
                                        id={coupon.id}
                                        name={coupon.name}
                                        percentage={coupon.percentage}
                                        expirationDate={coupon.expirationDate}
                                    />

                                ))
                            }
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default CouponPage;