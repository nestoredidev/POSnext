import React from 'react';

interface AmountProps {
    label: string;
    total: number;
    discount?: boolean;

}

function Amount({label, total, discount}: AmountProps) {
    return (
        <div
            className={`${discount ? 'bg-green-400 font-bold' : 'bg-amber-200'} flex justify-between px-2 py-2 rounded-lg`}>
            <dt className="font-bold">
                {label}:
            </dt>
            <dd className="text-gray-900">
                {discount && '-'} {total}
            </dd>
        </div>
    );
}

export default Amount;