"use server"

import {
    ErrorResponseSchema,
    OrderSchema,
    SuccessResponseSchema
} from "@/types/shemas";
import {revalidateTag} from "next/cache";

export async function submitOrder(data: unknown) {
    const order = OrderSchema.parse(data)
    const url = `${process.env.API_URL}/transactions`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...order})
    });

    const json = await response.json();
    if (!response.ok) {
        const errors = ErrorResponseSchema.parse(json)
        return {
            errors: errors.message.map(issue => issue),
            success: ''
        }
    }
    const success = SuccessResponseSchema.parse(json)
    revalidateTag('product-by-category')

    return {
        error: [],
        success: success.message
    }
}