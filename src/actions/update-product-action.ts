"use server"
import {ErrorResponseSchema, Product, ProductFormSchema} from "@/types/shemas";

interface PrevStateProps {
    errors: string[];
    success: string;
}

export async function updateProduct(productId: Product['id'], prevState: PrevStateProps, formData: FormData) {
    const product = ProductFormSchema.safeParse({
        name: formData.get('name'),
        price: formData.get('price'),
        image: formData.get('image'),
        inventory: formData.get('inventory'),
        categoryId: formData.get('categoryId')
    });

    if (!product.success) {
        return {
            errors: product.error.issues.map(err => err.message),
            success: ''
        }
    }

    const url = `${process.env.API_URL}/products/${productId}`;
    const res = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product.data)
    });
    const json = await res.json();
    if (!res.ok) {
        const errors = ErrorResponseSchema.parse(json);
        return {
            errors: errors.message.map(issue => issue),
            success: ''
        }
    }

    return {
        errors: [],
        success: 'Producto actualizado correctamente'
    }
}