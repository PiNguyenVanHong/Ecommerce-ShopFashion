"use client";

import { formatter2 } from "@/lib/utils";
import { useEffect, useState } from "react";

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
            {formatter2.format(Number(value))}
        </p>
     );
}
 
export default Currency;