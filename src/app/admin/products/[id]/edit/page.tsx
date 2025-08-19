import React from 'react';
import Link from "next/link";
import Heading from "@/components/Heading";
import EditProductForm from "@/components/EditProductForm";
import ProductForm from "@/components/ProductForm";
import {notFound} from "next/navigation";
import {ProductByIdResponseSchema} from "@/types/shemas";

async function getProduct(id: string) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`;
    const request = await fetch(url);
    if (!request.ok) {
        notFound()
    }
    const res = await request.json();
    const product = ProductByIdResponseSchema.parse(res)
    return product;
}

type Params = Promise<{ id: string }>;

async function EditProductPage({params}: { params: Params }) {
    const {id} = await params;
    const product = await getProduct(id);

    return (
        <>
            <Link href={'/admin/products?page=1'}
                  className="rounded-md bg-teal-400 px-4 py-2 text-white font-semibold hover:bg-teal-500 transition-colors mb-4"
            >
                Volver a productos
            </Link>
            <Heading>Editar Producto {product.name}</Heading>

            <EditProductForm>
                <ProductForm product={product}/>
            </EditProductForm>

        </>
    );
}

export default EditProductPage;