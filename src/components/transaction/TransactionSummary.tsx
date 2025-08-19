import {Transaction} from "@/types/shemas";
import Image from "next/image";
import {getImagePath} from "@/utils/api";

interface TransactionSummaryProps {
    transaction: Transaction
}

export default function TransactionSummary({transaction}: TransactionSummaryProps) {

    // const transaction = {
    //     contents: []
    // }

    return (
        <>
            <div
                className='mb-6  text-sm font-medium text-gray-500 border-2 border-primary'>
                <p className='text-sm font-black text-gray-900 p-2 bg-gray-200 '>ID:{transaction.id} </p>
                <ul
                    role="list"
                    className="divide-y divide-primary border-t-2 border-primary border-b"
                >
                    {transaction.contents.map((item) => (
                        <li className="p-5" key={item.id}>
                            <div className='flex items-center space-x-6 '>
                                <div className='relative w-32 h-32'>
                                    <Image
                                        src={getImagePath(item.product.image)}
                                        alt={item.product.name}
                                        width={100} height={100}/>
                                </div>
                                <div className="flex-auto space-y-1 ">
                                    <h3 className="text-gray-900">
                                        {item.product.name}
                                    </h3>
                                    <p className="text-lg font-extrabold  text-gray-900"></p>
                                    <p className="text-lg  text-gray-900">Cantidad: {item.quantity}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

                <dl className="space-y-6  text-sm font-medium text-gray-500 p-5">

                    <div className="flex justify-between">
                        <dt>Cupón Utilizado</dt>
                        <dd className="text-gray-900">
                            {transaction.coupon ? transaction.coupon : 'No se utilizó cupón'}
                        </dd>
                    </div>

                    <div className="flex justify-between">
                        <dt>Descuento</dt>
                        <dd className="text-gray-900">-{transaction.discount}</dd>
                    </div>

                    <div className="flex justify-between">
                        <dt className="text-lg text-black font-black">Total</dt>
                        <dd className="text-lg text-black font-black">
                            S/.{transaction.total}
                        </dd>
                    </div>
                </dl>
            </div>
        </>
    )
}