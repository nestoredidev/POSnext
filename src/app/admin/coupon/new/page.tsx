"use client"
import React, {useActionState, useEffect} from 'react';
import Heading from "@/components/Heading";
import {createCoupon} from "@/actions/cupons-action";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {useQueryClient} from "@tanstack/react-query";


function NewCoupon() {
    const router = useRouter()
    const queryClient = useQueryClient();

    const [state, dispach] = useActionState(createCoupon, {
            errors: [],
            success: ''
        }
    );
    useEffect(() => {
        if (state.errors) {
            state.errors.forEach((err: null) => {
                toast.error(err)
            });
        }
        if (state.success) {
            toast.success(state.success);
            queryClient.invalidateQueries({queryKey: ['coupons']});
            router.push("/admin/coupon");
        }
    }, [state]);

    return (
        <div className="flex justify-center flex-col items-center gap-4">
            <Heading>Crea un nuevo cupon de descuento</Heading>
            <form className="space-y-4" action={dispach}>
                <div>
                    <label htmlFor="name"
                           className="block text-sm font-medium text-gray-700">Nombre
                        del cupón</label>
                    <input
                        id="price"
                        type="text"
                        placeholder="Nombre del cupón"
                        name="name"
                        className="border-2 border-primary w-full p-2 rounded-lg focus:outline-none focus:border-teal-400"
                    />
                </div>
                <div>
                    <label htmlFor="percentage"
                           className="block text-sm font-medium text-gray-700">Descuento
                        (%)</label>
                    <input
                        id="percentage"
                        type="number"
                        placeholder="Porcentaje de descuento"
                        name="percentage"
                        className="border-2 border-primary w-full p-2 rounded-lg focus:outline-none focus:border-teal-400"
                        min={0}
                        max={100}
                    />
                </div>
                <div>
                    <label htmlFor="expirationDate"
                           className="block text-sm font-medium text-gray-700">Fecha
                        de expiración</label>
                    <input
                        id="expirationDate"
                        type="date"
                        name="expirationDate"
                        className="border-2 border-primary w-full p-2 rounded-lg focus:outline-none
                        focus:border-teal-400"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                    Crear cupón
                </button>
            </form>
        </div>
    );
}

export default NewCoupon;