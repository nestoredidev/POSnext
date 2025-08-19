import {ShoppingCart} from "@/types/shemas";
import Image from "next/image";
import {formatCurrency} from "@/utils/formatCurrency";
import {useCartStore} from "@/store/usecart";
import {getImagePath} from "@/utils/api";

interface ShoppingCartItemProps {
    content: ShoppingCart
}


export default function ShoppingCartItem({content}: ShoppingCartItemProps) {
    const {updateQuantity, removeFromCart} = useCartStore()
    return (
        <li className="flex items-center space-x-6 py-6 relative">
            <div className='h-24 w-24'>
                <Image
                    src={`${getImagePath(content.image)}`}
                    alt={content.name} width={100} height={100} priority={true}
                    className="rounded-lg object-cover"/>
            </div>
            <div className="flex-auto space-y-2">
                <h3 className="text-gray-900">
                    {content.name}
                </h3>
                <p>{formatCurrency(content.price)}</p>
                <select
                    className="w-32 text-center p-2 rounded-lg bg-white"
                    value={content.quantity}
                    onChange={(e) => updateQuantity(content.productId, +e.target.value)}
                >
                    {
                        Array.from({length: content.inventory}, (_, index) => index + 1).map(num => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className='absolute top-10 -right-0'>
                <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => removeFromCart(content.productId)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="w-8 h-8 text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                </button>
            </div>
        </li>
    )
}