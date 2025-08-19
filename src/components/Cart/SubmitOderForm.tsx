import React, {useActionState, useEffect} from 'react';
import {submitOrder} from "@/actions/submit-order-action";
import {useCartStore} from "@/store/usecart";
import {toast} from "react-toastify";


function SubmitOderForm() {
    const {
        total, content, clearOrder
    } = useCartStore()
    const coupon = useCartStore((state) => state.coupon.name)

    const order = {
        total,
        coupon,
        contents: content
    }
    const submitOrderWithData = submitOrder.bind(null, order)
    const [state, dispach] = useActionState(submitOrderWithData, {
        error: [],
        success: ''
    })
    useEffect(() => {
        if (state.errors) {
            state.errors.forEach(err => {
                toast.error(err)
            })
        }
        if (state.success) {
            toast.success(state.success)
            clearOrder()
        }
    }, [state])
    return (
        <form action={dispach}>
            <input type="submit"
                   className='mt-5 w-full py-2 px-2 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md'
                   value={'Confirmar compra'}/>
        </form>
    );
}

export default SubmitOderForm;