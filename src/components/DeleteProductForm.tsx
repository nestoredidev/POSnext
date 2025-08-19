import {revalidatePath} from "next/cache";

function DeleteProductForm({productId}: { productId: number }) {
    const handleDelete = async () => {
        "use server"
        const url = `${process.env.API_URL}/products/${productId}`;
        const req = await fetch(url, {
            method: 'DELETE',
        })
        await req.json()
        console.log(req.ok)
        revalidatePath('/admin/products')

    }
    return (
        <form action={handleDelete}>
            <input type="submit"
                   className="text-red-500 hover:text-red-700 cursor-pointer"
                   value="Eliminar"/>
        </form>
    );
}

export default DeleteProductForm;