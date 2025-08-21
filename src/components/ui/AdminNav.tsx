import Link from 'next/link'
import Logo from '@/components/ui/Logo'

export default function AdminNav() {
    return (
        <header className="px-10 py-5 bg-gray-700 flex justify-between">
            <div className="flex gap-5 text-white">
                <Logo/>
            </div>

            <div className="flex gap-2 items-center">
                <Link
                    href={'/admin/products'}
                    className="rounded text-white font-bold p-2 hover:text-secondary"
                >Productos</Link>

                <Link
                    href={'/admin/sales'}
                    className="rounded text-white font-bold p-2 hover:text-secondary"
                >Ventas</Link>
                <Link
                    href={'/admin/coupon'}
                    className="rounded text-white font-bold p-2 hover:text-secondary"
                >Cupones</Link>

                <Link
                    href={'/'}
                    className="rounded bg-teal-500 font-bold py-2 px-10 hover:bg-teal-500 text-white hover:text-secondary"
                >Tienda</Link>
            </div>
        </header>
    )
}