import {CategoriesResponseSchema, ProductById} from "@/types/shemas";
import UploadProductImage from "@/components/UploadProductImage";

async function getCategories() {
    const url = `${process.env.API_URL}/categories`;
    const res = await fetch(url);
    const json = await res.json();
    const category = CategoriesResponseSchema.parse(json);
    return category;
}

async function ProductForm({product}: { product?: ProductById }) {
    const categories = await getCategories();

    return (
        <>
            <div className="space-y-2 ">
                <label
                    htmlFor="name"
                    className="block"
                >Nombre Producto</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Nombre Producto"
                    className="border-2 border-primary w-full p-2 rounded-lg focus:outline-none focus:border-teal-400"
                    name="name"
                    defaultValue={product?.name}
                />
            </div>

            <div className="space-y-2 ">
                <label
                    htmlFor="price"
                    className="block"
                >Precio</label>
                <input
                    id="price"
                    type="number"
                    placeholder="Precio Producto"
                    className="border-2 border-primary w-full p-2 rounded-lg focus:outline-none focus:border-teal-400"
                    name="price"
                    min={0}
                    defaultValue={product?.price}
                />
            </div>

            <div className="space-y-2 ">
                <label
                    htmlFor="inventory"
                    className="block"
                >Inventario</label>
                <input
                    id="inventory"
                    type="number"
                    placeholder="Cantidad Disponible"
                    className="border-2 border-primary w-full p-2 rounded-lg focus:outline-none focus:border-teal-400"
                    name="inventory"
                    min={0}
                    defaultValue={product?.inventory}
                />
            </div>

            <div className="space-y-2 ">
                <label
                    htmlFor="categoryId"
                    className="block"
                >Categoría</label>
                <select
                    id="categoryId"
                    className="border-2 border-primary w-full p-2 rounded-lg focus:outline-none focus:border-teal-400"
                    name="categoryId"
                    defaultValue={product?.category.id}
                >
                    <option value="">Seleccionar Categoría</option>
                    {categories.map((category: {
                        id: number,
                        name: string
                    }) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <UploadProductImage currentImage={product?.image}/>

        </>
    )
}

export default ProductForm;