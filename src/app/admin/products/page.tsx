import Pagination from "@/components/ui/Pagination";
import Link from "next/link";
import { redirect } from "next/navigation";
import {ProductsResponseSchema} from "@/types/shemas";
import {isValidPage} from "@/utils/pagination";
import Heading from "@/components/Heading";
import ProductsTable from "@/components/ProductsTable";

async function getProducts(take : number, skip : number) {
    const url = `${process.env.API_URL}/products?take=${take}&skip=${skip}`
    const req = await fetch(url)
    const json = await req.json()
    const data = ProductsResponseSchema.parse(json)
    return {
        products: data.products,
        total: data.total
    }
}

type SearchParams = Promise<{page: string}>

export default async function ProductsPage({searchParams} : {searchParams: SearchParams}) {

    const {page} = await searchParams
    if(!isValidPage(+page)) redirect('/admin/products?page=1')
    const productsPerPage = 10
    const skip = (+page - 1) * productsPerPage
    const {products, total} = await getProducts(productsPerPage, skip)
    const totalPages = Math.ceil(total / productsPerPage)
    if(+page > totalPages) redirect('/admin/products?page=1')

    return (
        <>
            <Link
                href='/admin/products/new'
                className="rounded bg-teal-400 font-bold py-2 px-10 "
            >Nuevo Producto</Link>

            <Heading>Administrar Productos</Heading>

            <ProductsTable
                products={products}
            />

            <Pagination
                page={+page}
                totalPages={totalPages}
                baseUrl="/admin/products"
            />
        </>
    )
}
