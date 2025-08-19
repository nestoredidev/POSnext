"use client"
import {redirect, useParams} from "next/navigation"
import Products from "@/components/Products";
import {CategoryWithProductsResponseSchema} from "@/types/shemas";
import {useQuery} from "@tanstack/react-query";

type Params = Promise<{ categoryId: string }>

async function getProducts(categoryId: string) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}?products=true`
    const req = await fetch(url)
    const json = await req.json()
    if (!req.ok) {
        redirect(`${categoryId}`)
    }
    const products = CategoryWithProductsResponseSchema.parse(json)
    return products
}

export default function StorePage() {
    const {categoryId} = useParams()
    const {data: category} = useQuery({
        queryKey: ['products-by-category', categoryId],
        queryFn: () => getProducts(categoryId as string),
        enabled: !!categoryId,
    })
    return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {category?.products.map(product => (
                <Products
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    )
}