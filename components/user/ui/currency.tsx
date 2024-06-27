"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.NumberFormat("vi-VN", {
    style: 'currency',
    currency: 'VND',
});

interface CurrencyProps {
    value?: string | number;
};

const Currency: React.FC<CurrencyProps> = ({
    value,
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted) {
        return null;
    }

    return ( 
        <p key={value} className="font-semibold">
            {formatter.format(Number(value))}
        </p>
     );
}
 
export default Currency;