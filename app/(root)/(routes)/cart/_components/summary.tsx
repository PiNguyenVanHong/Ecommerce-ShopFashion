"use client";

import axios from "axios";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import Button from "@/components/user/ui/Button";
import Currency from "@/components/user/ui/currency";
import useCart from "@/hooks/use-cart";
import { useOrigin } from "@/hooks/use-origin";

const Summary = () => {
    const origin = useOrigin();
    const router = useRouter();
    const searchParams = useSearchParams();
    const items = useCart((state) => state.items);
    const removeAll = useCart((state) => state.removeAll);

    useEffect(() => {
        if(searchParams.get("success")) {
            toast.success("Payment completed.");
            removeAll();
        }

        if(searchParams.get("canceled")) {
            toast.error("Something went wrong.")
        }
    }, [searchParams, removeAll]);

    const totalPrice = items.reduce((total, item) => {
        return total + Number(item.price)
    }, 0);
    
    const onCheckout = async () => {
        const response = await axios.post(`/api/${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
            productIds: items.map((item) => item.id),
            url: origin,
        });

        router.push(response.data.url);
    }

    return ( 
        <div className="mt-16 rounded-lg bg-gray-50 dark:bg-card px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900 dark:text-primary">
                Order Summary
            </h2>
            <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-base font-medium text-gray-900 dark:text-primary">
                        Order total
                    </div>
                    <Currency value={totalPrice} />
                </div>
            </div>
            <Button disabled={items.length === 0} onClick={onCheckout} className="w-full mt-6">
                Checkout
            </Button>
        </div>
     );
}
 
export default Summary;