"use server";
import {CouponFormSchema} from "@/types/shemas";

interface PrevStateProps {
    errors: string[];
    success: string;
}

export async function ApplyCoupon(couponName: string) {
    const url = `${process.env.API_URL}/coupons/apply-coupon`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({coupon_name: couponName})
    });

    const json = await response.json();
    if (!response.ok) {
        return {
            error: json.message || 'Error al aplicar el cupón',
            data: null
        };
    }
    return {
        error: null,
        data: json,
        status: response.status
    };
}

export async function DeleteCoupon(id: number) {
    const url = `${process.env.API_URL}/coupons/${id}`;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const json = await response.json();
    if (!response.ok) {
        return {
            error: json.message || 'Error al eliminar el cupón',
            data: null
        };
    }
    return {
        error: null,
        data: json,
        status: response.status
    };


}

export async function createCoupon(prevState: PrevStateProps, formData: FormData) {
    const coupon = CouponFormSchema.safeParse({
        name: formData.get('name'),
        percentage: formData.get('percentage'),
        expirationDate: formData.get('expirationDate')
    })
    if (!coupon.success) {
        return {
            errors: coupon.error.issues.map(err => err.message),
            success: ''
        }
    }
    const url = `${process.env.API_URL}/coupons`;
    const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(coupon.data)
        }
    );
    const json = await res.json();
    if (!res.ok) {
        return {
            errors: json.message || 'Error al crear el cupón',
            success: ''
        }
    }
    return {
        errors: [],
        success: 'Cupón creado correctamente'
    };
}
