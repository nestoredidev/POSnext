import React from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {DeleteCoupon} from "@/actions/cupons-action";

interface DeleteCouponButtonProps {
    couponId: number;
    couponName: string;
}

function DeleteCouponButton({couponId, couponName}: DeleteCouponButtonProps) {
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: (id: number) => DeleteCoupon(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['coupons']});
            toast.success(`Cupón "${couponName}" eliminado correctamente`);
        },
        onError: (error: string) => {
            toast.error(error || 'Error al eliminar el cupón');
        }
    });

    const handleDelete = () => {
        deleteMutation.mutate(couponId);
    };

    return (
        <button
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className={`w-full px-4 py-2 rounded-lg transition-colors duration-300 ${
                deleteMutation.isPending
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-red-500 hover:bg-red-600'
            } text-white font-semibold`}
        >
            {deleteMutation.isPending ? 'Eliminando...' : 'Eliminar Cupón'}
        </button>
    );
}

export default DeleteCouponButton;