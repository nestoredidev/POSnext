"use client";
import React, {useActionState, useEffect} from 'react';
import {addProduct} from "@/actions/add-product-action";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

function AddProductForm({children}: { children: React.ReactNode }) {
    const router = useRouter()
    const [state, dispach] = useActionState(addProduct, {
        errors: [],
        success: ''
    })
    useEffect(() => {
        if (state.errors) {
            state.errors.forEach(err => {
                toast.error(err)
            });
        }
        if (state.success) {
            toast.success(state.success);
            router.push('/admin/products?page=1');
        }
    }, [state])
    return (
        <form className="space-y-5"
              action={dispach}
        >
            {children}
            <input type="submit"
                   className="rounded bg-green-400 font-bold py-2 w-full cursor-pointer"
                   value="Agregar Producto"
            />
        </form>
    );
}

export default AddProductForm;