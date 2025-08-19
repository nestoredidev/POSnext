import {FormEvent} from "react";
import {useCartStore} from "@/store/usecart";

function CouponForm() {
    const {applyCoupon, coupon} = useCartStore()
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const cuponName = formData.get('coupon_name')?.toString().toUpperCase();

        if (typeof cuponName !== 'string' || !cuponName.trim() || !cuponName.length) {
            console.warn("El nombre del cupón no es válido");
            return;
        }
        await applyCoupon(cuponName)
    }
    return (
        <>
            <p className="py-5 font-bold border-t border-gray-300">Canjear
                Cupón</p>
            <form
                className="flex"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    className="p-2 bg-gray-200 border-gray-300 w-full"
                    placeholder="Ingresa un cupón"
                    name="coupon_name"
                />
                <input
                    type="submit"
                    className="p-3 bg-green-400 font-bold hover:cursor-pointer"
                    value='Canjear'
                />
            </form>
            {
                coupon.message ? (
                    <p className={`text-sm ${coupon.status === 200 ? 'text-green-600' : 'text-red-600'} font-semibold uppercase text-[10px] text-center pt-1`}>
                        {coupon.message}
                    </p>
                ) : null
            }
        </>
    )
}

export default CouponForm;