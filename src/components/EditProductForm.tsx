"use client";
import React, {useActionState, useEffect} from 'react';

import {toast} from "react-toastify";
import {useParams, useRouter} from "next/navigation";
import {updateProduct} from "@/actions/update-product-action";

function EditProductForm({children}: { children: React.ReactNode }) {
    const router = useRouter()
    const {id} = useParams<{ id: string }>()

    const updateProductId = updateProduct.bind(null, +id)
    const [state, dispatch] = useActionState(updateProductId, {
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
    }, [state]);


    return (
        <form className="space-y-5"
              action={dispatch}
        >
            {children}
            <input type="submit"
                   className="rounded bg-green-400 font-bold py-2 w-full cursor-pointer"
                   value="Editar Producto"
            />
        </form>
    );
}

export default EditProductForm;