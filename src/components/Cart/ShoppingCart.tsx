"use client";
import React from 'react';
import {useCartStore} from "@/store/usecart";
import ShoppingCartItem from "@/components/Cart/ShoppingCartItem";
import Amount from "@/components/Cart/Amount";
import CouponForm from "@/components/Cart/CouponForm";
import SubmitOderForm from "@/components/Cart/SubmitOderForm";

function ShoppingCart() {
    const {content, total, discount} = useCartStore()
    return (
        <>
            {
                content.length ? (
                    <>
                        <h2 className="text-4xl font-semibold text-gray-800">
                            Resumen de venta
                        </h2>
                        <ul className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm">
                            {content.map((item) => (
                                <ShoppingCartItem key={item.productId}
                                                  content={item}/>
                            ))}
                        </ul>
                        <dl className="space-y-6 pt-1 border-teal-400 border-t-2 text-sm font-medium text-gray-700">
                            {
                                discount ? (
                                    <Amount label={'Descuento'}
                                            total={Number(discount.toFixed(2))}
                                            discount={true}/>

                                ) : null
                            }
                            <Amount label={'Total'}
                                    total={total}/>
                        </dl>
                        <CouponForm/>
                        <SubmitOderForm/>
                    </>
                ) : (
                    <li className="text-gray-500 text-lg text-center">
                        No hay productos en el carrito
                    </li>
                )
            }
        </>
    );
}

export default ShoppingCart;