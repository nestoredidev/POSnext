import React from 'react';
import {z} from "zod";
import {CouponResponseDataSchema} from "@/types/shemas";
import DeleteCouponButton from "@/components/coupons/DeleteCouponButton";

type CouponData = z.infer<typeof CouponResponseDataSchema>;

function CouponCart({id, name, percentage, expirationDate}: CouponData) {
    return (
        <div
            className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-indigo-200 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex justify-between items-start mb-4">
        <span
            className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
            ID: {id}
        </span>
                <div
                    className="bg-teal-500 text-white text-lg font-bold px-3 py-1 rounded-lg">
                    {percentage}% OFF
                </div>
            </div>

            <h4 className="text-xl font-bold text-gray-800 mb-3 truncate">
                {name}
            </h4>

            <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="currentColor"
                         viewBox="0 0 20 20">
                        <path fillRule="evenodd"
                              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                              clipRule="evenodd"/>
                    </svg>
                    <span
                        className="text-sm">Expira: {expirationDate || 'Sin vencimiento'}</span>
                </div>
            </div>
            <DeleteCouponButton couponId={id} couponName={name}/>
        </div>
    );
}

export default CouponCart;