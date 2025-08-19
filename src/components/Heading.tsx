import React from 'react';

interface HeadingProps {
    children: React.ReactNode;
}

function Heading({children}: HeadingProps) {
    return (
        <h1 className="text-2xl my-10">{children}</h1>
    );
}

export default Heading;