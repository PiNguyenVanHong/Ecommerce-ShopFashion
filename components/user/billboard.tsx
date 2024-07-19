"use client";

import { pusherClient } from "@/lib/pusher";
import { Billboard as BillboardType } from "@prisma/client";
import { useEffect, useState } from "react";

interface BillboardProps {
    data?: BillboardType | null;
};

const Billboard: React.FC<BillboardProps> = ({
    data,
}) => {
    const [dataBillboard, setDataBillboard] = useState(data);
    useEffect(() => {
        pusherClient.subscribe(data?.storeId!);

        const billboardUpdateHandler = (billboard: BillboardType) => {
            setDataBillboard((current: any) => {
                if(current.id === billboard.id) {
                    return billboard;
                }
                
                return current;
            });
        };

    pusherClient.bind('billboard:update', billboardUpdateHandler);

        return () => {
            pusherClient.unsubscribe(data?.storeId!);
      pusherClient.unbind('billboard:update', billboardUpdateHandler);
        }
    }, [data?.storeId]);

    useEffect(() => {
        setDataBillboard(data);
    }, [data]);

    return ( 
        <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
            <div
                className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url(${dataBillboard?.imageUrl})` }}
            >
                <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
                    <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
                        {dataBillboard?.label}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Billboard;