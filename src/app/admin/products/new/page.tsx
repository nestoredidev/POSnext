import Heading from "@/components/Heading";
import Link from "next/link";
import ProductForm from "@/components/ProductForm";
import AddProductForm from "@/components/AddProductForm";

function NewProductPage() {
    return (
        <>
            <Link href={'/admin/products?page=1'}
                  className="rounded-md bg-teal-400 px-4 py-2 text-white font-semibold hover:bg-teal-500 transition-colors mb-4"
            >
                Volver a productos
            </Link>
            <Heading>
                Nuevo Producto
            </Heading>
            <AddProductForm>
                <ProductForm/>
            </AddProductForm>
        </>
    );
}

export default NewProductPage;