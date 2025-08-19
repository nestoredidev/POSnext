import {create} from "zustand/react";
import {
    Coupon,
    CouponResponseSchema,
    Product,
    ShoppingCart
} from "@/types/shemas";

interface Store {
    total: number;
    discount: number;
    content: ShoppingCart[]
    coupon: Coupon
    addToCart: (product: Product) => void;
    updateQuantity: (id: Product['id'], quantity: number) => void;
    removeFromCart: (id: Product['id']) => void;
    applyCoupon: (couponName: string) => Promise<void>;
    applyDiscount: () => void;
    calculateTotal: () => void;
    clearOrder: () => void;

}

const initialState = {
    total: 0,
    content: [],
    coupon: {
        percentage: 0,
        name: '',
        message: '',
        status: 0
    },
    discount: 0,
}

export const useCartStore = create<Store>((set, get) => ({
    ...initialState,
    addToCart: (product) => {
        const {id: productId, ...data} = product
        let content: ShoppingCart[] = [];
        const duplicateProduct = get().content.find(item => item.productId === productId);
        if (duplicateProduct) {
            if (duplicateProduct.quantity >= duplicateProduct.inventory) {
                console.warn("No hay suficiente inventario para este producto");
                return;
            }

            content = get().content.map(item => {
                if (item.productId === productId) {
                    return {...item, quantity: item.quantity + 1};
                }
                return item;
            });
            set(() => ({
                content,
                total: content.reduce((acc, item) => acc + (item.price * item.quantity), 0)
            }));
            return;
        }
        content = [...get().content, {
            ...data, quantity: 1, productId
        }]
        set(() => ({
            content,
        }))
        get().calculateTotal();
    },

    updateQuantity: (id, quantity) => {
        const content = get().content.map(item => item.productId === id ? {
            ...item,
            quantity
        } : item);
        set(() => ({
            content,
        }))
        get().calculateTotal();
    },
    removeFromCart: (id) => {
        set((state) => ({
            content: state.content.filter(item => item.productId !== id),
        }))
        if (get().content.length === 0) {
            get().clearOrder();
        }
        get().calculateTotal();
    },
    calculateTotal: () => {
        const content = get().content;
        const total = content.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        set(() => ({
            total
        }))
        if (get().coupon.percentage) {
            get().applyDiscount();
        }
    },
    applyCoupon: async (couponName) => {
        const req = await fetch('/coupon/api', {
            method: 'POST',
            body: JSON.stringify({
                coupon_name: couponName
            })
        })
        const response = await req.json();
        const coupon = CouponResponseSchema.parse(response);
        set(() => ({
            coupon
        }))
        if (coupon.percentage) {
            get().applyDiscount();
        }
    },
    applyDiscount: async () => {
        const subtototalAmount = get().content.reduce((acc, item) => acc + (item.price * item.quantity), 0)
        const discount = (get().coupon.percentage / 100) * subtototalAmount;
        const total = subtototalAmount - discount;
        set(() => ({
            discount, total
        }))
    },
    clearOrder: () => set(() => ({
        ...initialState
    }))
}))