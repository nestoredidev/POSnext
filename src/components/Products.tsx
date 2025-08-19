import React from 'react';
import {Product} from "@/types/shemas";
import {formatCurrency} from "@/utils/formatCurrency";
import Image from "next/image";
import AddProductButton from "@/components/AddProductButton";
import {getImagePath, isAvailable} from "@/utils/api";

function Products({product}: { product: Product }) {
    return (
        <div
            className='rounded-md bg-white border-2 border-primary shadow relative p-5'
        >
            <div
                className={`${!isAvailable(product.inventory) && 'opacity-40'}`}>
                <Image src={getImagePath(product.image)}
                       width={400}
                       height={600}
                       priority={true}
                       alt={product.name}/>
                <div className="p-3 space-y-2">
                    <h3 className="text-xl font-bold text-gray-600">{product.name}</h3>
                    <p className="text-gray-500">Disponibles:
                        {" "}{product.inventory}
                    </p>
                    <p className="text-2xl font-extrabold  text-gray-900">S/.{product.price}</p>
                </div>
            </div>
            {isAvailable(product.inventory) ? (
                <AddProductButton product={product}/>
            ) : (
                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white opacity-60 text-center py-5 text-2xl uppercase font-black w-full">Agotado</p>
            )}

        </div>
    );
}

export default Products;