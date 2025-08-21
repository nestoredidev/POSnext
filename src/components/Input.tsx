import React from 'react';

interface Props {
    placeholder?: string;

}

function Input({placeholder, ...rest}: Props) {
    return (
        <input  type="text" placeholder={placeholder}
        {...rest}
               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    );
}

export default Input;