import {NextRequest} from "next/server";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const trasactionDate = searchParams.get('transactionDate');
    const url = `${process.env.API_URL}/transactions?transactionDate=${trasactionDate}`;
    const res = await fetch(url)
    const response = await res.json();
    console.log(response)
    return Response.json(response)
}