import {TransactionsResponseSchema} from "@/types/shemas";

export async function getSaleByDate(date: string) {
    const url = `${process.env.NEXT_PUBLIC_DOMAIN}/admin/sales/api?transactionDate=${date}`;
    const req = await fetch(url);
    const response = await req.json();
    const transactions = TransactionsResponseSchema.parse(response);
    return transactions;
}

export function getImagePath(image: string) {
    const claudinaryBaseUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL
    if (image.startsWith(claudinaryBaseUrl!)) {
        return image
    } else {
        if (process.env.API_URL) {
            return `${process.env.API_URL}/img/${image}`
        } else {
            return `${process.env.NEXT_PUBLIC_API_URL}/img/${image}`
        }

    }
}

export const isAvailable = (inventory: number) => {
    return inventory > 0;
}